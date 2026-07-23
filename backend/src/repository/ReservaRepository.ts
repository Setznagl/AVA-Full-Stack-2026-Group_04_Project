import meu_Prisma_Client_Configurado from "../database/PrismaClient.ts";
import {PrismaClient} from "@prisma/client/extension";
import type {reserva} from "../generated/prisma/client.ts";
import {exceptionHandler} from "../exception/ExceptionHandler.ts";
import {HttpError} from "../exception/HttpError.ts";


export class ReservaRepository {
    private prisma: PrismaClient = meu_Prisma_Client_Configurado;
    constructor(providedPrisma: PrismaClient = meu_Prisma_Client_Configurado) {
        this.prisma = providedPrisma;
    }

    async jogadorExiste(id: number): Promise<boolean | HttpError> {
        try {
            return (await this.prisma.jogador.findUnique({ where: { id }, select: { id: true } })) !== null;
        } catch (exception: any) {
            console.error(exception);
            return exceptionHandler.handle(exception, "repository");
        }
    }

    async quadraExiste(id: number): Promise<boolean | HttpError> {
        try {
            return (await this.prisma.quadra.findUnique({ where: { id }, select: { id: true } })) !== null;
        } catch (exception: any) {
            console.error(exception);
            return exceptionHandler.handle(exception, "repository");
        }
    }

    async insertReserva(provided_jogador_id: number, provided_quadra_id: number, provided_data: Date, provided_horario_inicio: Date, provided_horario_fim: Date): Promise<reserva | HttpError> {
        try {
            return await this.prisma.reserva.create({
                data: {
                    jogador_id: provided_jogador_id,
                    quadra_id: provided_quadra_id,
                    data: provided_data,
                    horario_inicio: provided_horario_inicio,
                    horario_fim: provided_horario_fim
                }
            });
        } catch (exception: any) {
            console.error(exception);
            return exceptionHandler.handle(exception, "repository");
        }
    }

        // buscar por id
        async findByID(provided_id: number): Promise<reserva | HttpError | null> {
            try{
                return await this.prisma.reserva.findUnique({
                    where: {id: provided_id}
                });
            } catch (exception: any) {
                console.error(exception);
                return exceptionHandler.handle(exception, "repository");
            }
        }   

        // buscar reservar por jogador específico
        async findByJogadorID(provided_jogador_id: number): Promise<reserva[] | HttpError> {
            try{
                return await this.prisma.reserva.findMany({
                    where: {jogador_id: provided_jogador_id}
                });
            } catch (exception: any) {
                console.error(exception);
                return exceptionHandler.handle(exception, "repository");
            }
        }

        async findByQuadraID(provided_quadra_id: number): Promise<reserva[] | HttpError> {
            try{
                return await this.prisma.reserva.findMany({
                    where: {quadra_id: provided_quadra_id}
                });
            } catch (exception: any) {
                console.error(exception);
                return exceptionHandler.handle(exception, "repository");
            }
        }

        async findByData(provided_data: Date): Promise<reserva[] | HttpError>{
            try{
                return await this.prisma.reserva.findMany({ where: { data: provided_data } });
            } catch (exception: any) {
            console.error(exception);
            return exceptionHandler.handle(exception, "repository");
        }
        }

        async findAll(): Promise<reserva[] | HttpError> {
            try{
                return await this.prisma.reserva.findMany();
            } catch (exception: any) {
                console.error(exception);
                return exceptionHandler.handle(exception, "repository");
            }
        }

        async updateReserva(provided_id: number, provided_jogador_id: number, provided_quadra_id: number, provided_data: Date, provided_horario_inicio: Date, provided_horario_fim: Date): Promise<reserva | HttpError> {
            try{
                return await this.prisma.reserva.update({
                    where: {id: provided_id},
                    data: {
                        jogador_id: provided_jogador_id,
                        quadra_id: provided_quadra_id,
                        data: provided_data,
                        horario_inicio: provided_horario_inicio,
                        horario_fim: provided_horario_fim
                    }
                });
            } catch (exception: any) {
                console.error(exception);
                return exceptionHandler.handle(exception, "repository");
            }
        }

        async deleteReserva(provided_id: number): Promise<reserva | HttpError> {
            try{
                return await this.prisma.reserva.delete({
                    where: {id: provided_id}
                });
            } catch (exception: any) {
                console.error(exception);
                return exceptionHandler.handle(exception, "repository");
            }
        }
    }

    export const unicReservaRepositoryInstance = new ReservaRepository();


        
