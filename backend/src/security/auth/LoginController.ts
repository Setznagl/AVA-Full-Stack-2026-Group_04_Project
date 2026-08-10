import {HttpError} from "../../exception/HttpError.ts";
import {unicJogadorServiceInstance} from "../../service/JogadorService.ts";
import type {jogador, RefreshToken} from "../../generated/prisma/client.ts";
import "dotenv/config";
import bcrypt from "bcryptjs";
import jwt, {type JwtPayload} from "jsonwebtoken";
import express from "express";
import meu_Prisma_Client_Configurado from "../../database/PrismaClient.ts";
import type {PrismaClient} from "@prisma/client/extension";

export class LoginController {

    private prisma: PrismaClient;
    constructor(providedPrisma: PrismaClient) {
        this.prisma = providedPrisma;
    }

    async sign(request: express.Request, response: express.Response) {
        const {email, senha} = request.body;

        try {
            const userExist: jogador | HttpError | null = await unicJogadorServiceInstance.findByEmail(email);

            if (userExist instanceof HttpError) {return response.status(userExist.statusCode).json(userExist);}
            if (!userExist) {return response.status(401).json(new HttpError(401, 'Invalid email or password', "controller"));}

            const isMatch: boolean = bcrypt.compareSync(senha, userExist.senha);
            if (!isMatch) {return response.status(401).json(new HttpError(401, 'Password incorrect', "controller"));}

            const payload = {
                id: userExist.id,
                nome: userExist.nome,
                email: userExist.email
            };
            const accessToken = jwt.sign(payload , process.env.ACCESS_SECRET_JWT as string, { expiresIn: '15m' });
            const refreshToken = jwt.sign(payload, process.env.REFRESH_SECRET_JWT as string, { expiresIn: '7d' });

            await this.prisma.refreshToken.create({
                data: {
                    token: refreshToken,
                    userId: userExist.id,
                    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days
                }
            });

            return response.status(200)
                .cookie('refreshToken', refreshToken, {
                    httpOnly: true, //previne acesso via JS
                    secure: false, //com "true" envia apenas com HTTPS ( "secure: process.env.NODE_ENV === "production"" )
                    sameSite: "lax",
                    maxAge: 7 * 24 * 60 * 60 * 1000 // 7 dias
                })
                .json({accessToken});

        } catch (error: any) {
            response.status(500).json(new HttpError(500, error.message, "controller"));
        }

    }

    async refresh(request: express.Request, response: express.Response) {
        const refreshToken:string = request.cookies.refreshToken;
        if (!refreshToken) {return response.status(401).json(new HttpError(401, 'Refresh token is required', "controller"));}

        try{
            // Verify signature
            const verifiedPayload = jwt.verify(refreshToken, process.env.REFRESH_SECRET_JWT as string) as JwtPayload;
            const payload = {
                id: verifiedPayload.id,
                nome: verifiedPayload.nome,
                email: verifiedPayload.email
            }

            // Exists in database ?
            const tokenDB: RefreshToken | null = await this.prisma.refreshToken.findUnique({  where: {  token: refreshToken  }  });
            if (!tokenDB) {return response.status(401).json(new HttpError(401, 'Invalid refresh token', "controller"));}
            // Is it expired ?
            if(tokenDB.expiresAt < new Date()){
                await this.prisma.refreshToken.delete({ where: { token: refreshToken } });
                return response.status(401).json(new HttpError(401, 'Expired refresh token', "controller"));
            }

            // Deleting old token
            await this.prisma.refreshToken.deleteMany({  where: { userId: payload.id }  });

            // Generate new tokens
            const newAccessToken = jwt.sign( payload, process.env.ACCESS_SECRET_JWT as string, { expiresIn: '15m' });
            const newRefreshToken = jwt.sign( payload, process.env.REFRESH_SECRET_JWT as string, { expiresIn: '7d' });

            // Saving new token reference in database
            await this.prisma.refreshToken.create({
                data: {
                    token: newRefreshToken,
                    userId: payload.id,
                    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
                }
            });

            return response.status(200)
                .cookie('refreshToken', newRefreshToken, {
                    httpOnly: true,
                    secure: false,
                    sameSite: "lax",
                    maxAge: 7 * 24 * 60 * 60 * 1000
                })
                .json({accessToken: newAccessToken});


        }catch (error) {
            return response.status(401).json(new HttpError(401, 'Invalid refresh token', "controller"));
        }
    }

    /*
    sugestão IA "Envie o refresh token em um cookie HttpOnly + Secure"

    Access Token → enviado no corpo da resposta e armazenado na memória da aplicação (ou, se necessário, no localStorage).
    Refresh Token → armazenado automaticamente pelo navegador em um cookie HttpOnly, que o JavaScript não consegue ler.

    Assim, mesmo que um atacante consiga executar JavaScript na sua página (XSS), ele não consegue roubar o refresh token.

    logout: res.clearCookie("refreshToken");
     */
}

export const unicLoginControllerInstance = new LoginController(meu_Prisma_Client_Configurado);