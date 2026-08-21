import meu_Prisma_Client_Configurado from "../database/PrismaClient.ts";
import { PrismaClient } from "@prisma/client/extension";
import type { quadra } from "../generated/prisma/client.ts";
import { exceptionHandler } from "../exception/ExceptionHandler.ts";
import { HttpError } from "../exception/HttpError.ts";

export class QuadraRepository {
    
    private prisma: PrismaClient;
    constructor(providedPrisma: PrismaClient) {
        this.prisma = providedPrisma;
    }

    
    async insertQuadra(provided_nome: string, provided_modalidade: string, provided_localizacao: string)
    : Promise<quadra | HttpError> {

        if(
            typeof provided_nome !== "string" ||
            typeof provided_modalidade !== "string" ||
            typeof provided_localizacao !== "string"
        ) return new HttpError(502, "Invalid provided type for one or more parameters", "repository");

        try {
            return await this.prisma.quadra.create({ 
                data: {
                    nome: provided_nome.trim(),
                    modalidade: provided_modalidade.trim(),
                    localizacao: provided_localizacao.trim(),
                }
            }); 
        } catch (error: any) {
            console.log(error);
            return exceptionHandler.handle(error, "repository");
        }
    }

    async findAll(): Promise<quadra[] | HttpError> {
        try {
            return await this.prisma.quadra.findMany();
        } catch (error: any) {
            return exceptionHandler.handle(error, "repository");
        }
    }

    async findById(provided_id: number): Promise<quadra | null | HttpError> {

        if( typeof provided_id !== "number"
        ) return new HttpError(502, "Invalid provided type for one or more parameters", "repository");

        try {
            return await this.prisma.quadra.findUnique({
                where: { id: provided_id },
            });
        } catch (error: any) {
            return exceptionHandler.handle(error, "repository");
        }
    }

    async findByNome(provided_nome: string): Promise<quadra | null | HttpError> {

        if( typeof provided_nome !== "string"
        )return new HttpError(502, "Invalid provided type for one or more parameters", "repository");

        try {
            return await this.prisma.quadra.findFirst({
                where: { 
                    nome: {
                        contains: provided_nome.trim(), 
                        mode: 'insensitive' 
                    }
                },
            });
        } catch (error: any) {
            return exceptionHandler.handle(error, "repository");
        }
    }

    async findByModalidade(provided_modalidade: string): Promise<quadra[] | HttpError> {

        if( typeof provided_modalidade !== "string"
        ) return new HttpError(502, "Invalid provided type for one or more parameters", "repository");

        try {
            return await this.prisma.quadra.findMany({
                where: { modalidade: provided_modalidade.trim() },
            });
        } catch (error: any) {
            return exceptionHandler.handle(error, "repository");
        }
    }
    
    async updateQuadra(provided_id: number, provided_nome: string, provided_modalidade: string, provided_localizacao: string)
    : Promise<quadra | HttpError> {

        if(
            typeof provided_id !== "number" ||
            typeof provided_nome !== "string" ||
            typeof provided_modalidade !== "string" ||
            typeof provided_localizacao !== "string"
        ) {  return new HttpError(502, "Invalid provided type for one or more parameters", "repository");  }

        try {
            return await this.prisma.quadra.update({
                where: { id: provided_id },
                data: {
                    nome: provided_nome.trim(),
                    modalidade: provided_modalidade.trim(),
                    localizacao: provided_localizacao.trim()
                }
            });
        } catch (error: any) {
            return exceptionHandler.handle(error, "repository");
        }
    }
    
    async deleteQuadra(provided_id: number): Promise<quadra | HttpError> {

        if( typeof provided_id !== "number"
        ) return new HttpError(502, "Invalid provided type for one or more parameters", "repository");

        try {
            return await this.prisma.quadra.delete({
                where: { id: provided_id },
            });
        } catch (error: any) {
            return exceptionHandler.handle(error, "repository");
        }
    }

}

export const unicQuadraRepositoryInstance = new QuadraRepository(meu_Prisma_Client_Configurado);