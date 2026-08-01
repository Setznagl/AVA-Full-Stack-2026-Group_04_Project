import bcrypt from "bcryptjs";
import meu_Prisma_Client_Configurado from "../database/PrismaClient.ts";
import {PrismaClient} from "@prisma/client/extension";
import type {jogador} from "../generated/prisma/client.ts";
import {exceptionHandler} from "../exception/ExceptionHandler.ts";
import {HttpError} from "../exception/HttpError.ts";

export class JogadorRepository {

    private prisma: PrismaClient;
    constructor(providedPrisma: PrismaClient) {
        this.prisma = providedPrisma;
    }

    async insertJogador(provided_nome: string, provided_email: string, provided_telefone: string, provided_senha: string)
        :Promise<jogador | HttpError> {

        if(
            typeof provided_nome !== "string" ||
            typeof provided_email !== "string" ||
            typeof provided_telefone !== "string" ||
            typeof provided_senha !== "string"
        ){  return new HttpError(502, "Invalid provided type for one or more parameters", "repository");  }

        try{ 
            const senhaHasheada = await bcrypt.hash(provided_senha, 10);
            return await this.prisma.jogador.create({
            data: {
                nome: provided_nome,
                email: provided_email,
                telefone: provided_telefone,
                senha: senhaHasheada
            }})
        }catch(exception: any){
            return exceptionHandler.handle(exception, "repository");
        }

    }

    async findByEmail(provided_email: string)
        :Promise<jogador | HttpError | null> {

        if(typeof provided_email !== "string"){  return new HttpError(502, "Invalid provided type for 'email'", "repository");  }

        try{ return await this.prisma.jogador.findUnique({  where: {email: provided_email},  })
        }catch(exception: any){
            return exceptionHandler.handle(exception, "repository");
        }

    }

    async findById(provided_id: number)
        :Promise<jogador | HttpError | null > {

        if(typeof provided_id !== "number"){  return new HttpError(502, "Invalid provided type for 'id'", "repository");  }

        try{ return await this.prisma.jogador.findUnique({  where: {id: provided_id},  })
        } catch(exception: any){
            return  exceptionHandler.handle(exception, "repository");
        }

    }

    async findAll()
        : Promise<jogador[] | HttpError > {

        try{ return await this.prisma.jogador.findMany()
        } catch(exception: any){
            return exceptionHandler.handle(exception, "repository");
        }

    }

    async updateJogador(provided_id: number, provided_nome: string, provided_email: string, provided_telefone: string, provided_senha: string)
        :Promise<jogador | HttpError> {

        if(
            typeof provided_id !== "number" ||
            typeof provided_nome !== "string" ||
            typeof provided_email !== "string" ||
            typeof provided_telefone !== "string" ||
            typeof provided_senha !== "string"
        ){  return new HttpError(502, "Invalid provided type for one or more parameters", "repository");  }

        try{  
            const senhaHasheada = await bcrypt.hash(provided_senha, 10);
            return await this.prisma.jogador.update({  where: { id: provided_id },
                data: {
                    nome: provided_nome,
                    email: provided_email,
                    telefone: provided_telefone,
                    senha: senhaHasheada
                }})
        }catch (exception: any){
            return exceptionHandler.handle(exception, "repository");
        }

    }

    async deleteJogador(provided_id: number)
        :Promise<jogador | HttpError> {

        if(typeof provided_id !== "number"){  return new HttpError(502, "Invalid provided type for 'id'", "repository");  }

        try { return await this.prisma.jogador.delete({  where: {id: provided_id}  })
        }catch (exception: any){
            return exceptionHandler.handle(exception, "repository");
        }
    }



}

export const unicJogadorRepositoryInstance = new JogadorRepository(meu_Prisma_Client_Configurado);