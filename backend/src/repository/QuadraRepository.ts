import meu_Prisma_Client_Configurado from "../database/PrismaClient.ts";
import { PrismaClient } from "@prisma/client/extension";
import type { quadra } from "../generated/prisma/client.ts";
import { exceptionHandler } from "../exception/ExceptionHandler.ts";
import { HttpError } from "../exception/HttpError.ts";

export class QuadraRepository {
    
    private prisma: PrismaClient;

    constructor() {
        this.prisma = meu_Prisma_Client_Configurado;
    }

    
    async insertQuadra(provided_nome: string, provided_modalidade: string, provided_localizacao: string)
    : Promise<quadra | HttpError> {
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
            console.log(error);
            return exceptionHandler.handle(error, "repository");
        }
    }

    async findById(provided_id: number): Promise<quadra | null | Error> {
        try {
            return await this.prisma.quadra.findUnique({
                where: { id: provided_id },
            });
        } catch (error: any) {
            console.log(error);
            return exceptionHandler.handle(error, "repository");
        }
    }

    async findByNome(provided_nome: string): Promise<quadra | null | Error> {
        try {
            return await this.prisma.quadra.findFirst({
                where: { nome: provided_nome.trim() },
            });
        } catch (error: any) {
            console.log(error);
            return exceptionHandler.handle(error, "repository");
        }
    }

    async findByModalidade(provided_modalidade: string): Promise<quadra[] | Error> {
        try {
            return await this.prisma.quadra.findMany({
                where: { modalidade: provided_modalidade.trim() },
            });
        } catch (error: any) {
            console.log(error);
            return exceptionHandler.handle(error, "repository");
        }
    }
    
    
    async updateQuadra(provided_id: number, provided_nome: string, provided_modalidade: string, provided_localizacao: string)
    : Promise<quadra | Error> {
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
            console.log(error);
            return exceptionHandler.handle(error, "repository");
        }
    }

    
    async deleteQuadra(provided_id: number): Promise<quadra | Error> {
        try {
            return await this.prisma.quadra.delete({
                where: { id: provided_id },
            });
        } catch (error: any) {
            console.log(error);
            return exceptionHandler.handle(error, "repository");
        }
    }
}

export const QuadraRepositoryInstance = new QuadraRepository();