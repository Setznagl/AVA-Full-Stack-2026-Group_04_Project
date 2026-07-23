/// <reference types="jest" />

import type { Request } from "express";
import { HttpError } from "../exception/HttpError.ts";
import mock_Prisma_Client_Configurado from "./mock/mock_PrismaClient.ts";
import { ReservaRepository } from "../repository/ReservaRepository.ts"; 
import { ReservaService } from "../service/ReservaService.ts";
import { ReservaController } from "../controller/ReservaController.ts";

let mockJogadorID: number;
let mockQuadraID: number;

beforeAll(async () => {
    await mock_Prisma_Client_Configurado.reserva.deleteMany();
    await mock_Prisma_Client_Configurado.jogador.deleteMany();
    await mock_Prisma_Client_Configurado.quadra.deleteMany();

    const jogador = await mock_Prisma_Client_Configurado.jogador.create({
        data: {
            nome: "Jogador Teste Reserva",
            email: "reserva_test@example.com",
            telefone: "22999999999",
            senha: "123"
        },
    });

    const quadra = await mock_Prisma_Client_Configurado.quadra.create({
        data: {
            nome: "Quadra Principal",
            modalidade: "Futebol",
            localizacao: "Bloco A"
        },
    });

    mockJogadorID = jogador.id;
    mockQuadraID = quadra.id;
});

describe("ReservaRepository:", () => {
    const mockReservaRepository = new ReservaRepository(mock_Prisma_Client_Configurado);

    let mockReservaID: number;
    
    const mockData = new Date("2026-05-10");
    const mockHorarioInicio = new Date("2026-05-10T14:00:00Z");
    const mockHorarioFim = new Date("2026-05-10T15:00:00Z");

    it("Should insert and return a new Reserva", async () => {
        const mockInsert = await mockReservaRepository.insertReserva(
            mockJogadorID,
            mockQuadraID,
            mockData,
            mockHorarioInicio,
            mockHorarioFim
        );

        expect(mockInsert).toHaveProperty("id");
        expect(mockInsert).toHaveProperty("jogador_id", mockJogadorID);
        expect(mockInsert).toHaveProperty("quadra_id", mockQuadraID);
        expect(mockInsert).toHaveProperty("data", mockData);

        if (mockInsert && "id" in mockInsert) {
            mockReservaID = mockInsert.id;
            console.log(`Reserva inserted with ID === ${mockReservaID}`);
        }
    });

    it("Try to find an existing Reserva using field id", async () => {
        const mockFind = await mockReservaRepository.findByID(mockReservaID);
        expect(mockFind).toHaveProperty("id", mockReservaID);
    });

    it("Try to find an existing Reserva sending non-number ID", async () => {
        const mockError = await mockReservaRepository.findByID("invalid_id" as unknown as number);
        expect(mockError).toBeInstanceOf(HttpError);
    });

    it("Try to find a non-existing Reserva using field id", async () => {
        const mockFind = await mockReservaRepository.findByID(mockReservaID + 999);
        expect(mockFind).toBeNull();
    });

    it("Try to find Reservas by jogador_id", async () => {
        const mockFind = await mockReservaRepository.findByJogadorID(mockJogadorID);
        expect(Array.isArray(mockFind)).toBe(true);
    });

    it("Try to find Reservas by quadra_id", async () => {
        const mockFind = await mockReservaRepository.findByQuadraID(mockQuadraID);
        expect(Array.isArray(mockFind)).toBe(true);
    });

    it("Try to find Reservas by data", async () => {
        const mockFind = await mockReservaRepository.findByData(mockData);
        expect(Array.isArray(mockFind)).toBe(true);
    });

    it("Try to receive multiple data using findAll", async () => {
        const mockFind = await mockReservaRepository.findAll();
        expect(Array.isArray(mockFind)).toBe(true);
    });

    it("Try to update an existing Reserva using field id", async () => {
        const novaData = new Date("2026-05-11");
        const mockUpdate = await mockReservaRepository.updateReserva(
            mockReservaID,
            mockJogadorID,
            mockQuadraID,
            novaData,
            mockHorarioInicio,
            mockHorarioFim
        );

        expect(mockUpdate).toHaveProperty("id", mockReservaID);
        expect(mockUpdate).toHaveProperty("data", novaData);
    });

    it("Try to delete an existing Reserva using field id", async () => {
        const mockDelete = await mockReservaRepository.deleteReserva(mockReservaID);
        expect(mockDelete).toHaveProperty("id", mockReservaID);
    });

    it("Receiving an unexpected error during findByID operation, should return HttpError 500", async () => {
        const undefinedRepository = new ReservaRepository({} as any);
        const mockError = await undefinedRepository.findByID(mockReservaID);
        expect(mockError).toBeInstanceOf(HttpError);
    });
});

describe("ReservaService:", () => {
    const mockReservaService = new ReservaService(new ReservaRepository(mock_Prisma_Client_Configurado));

    let mockReservaID: number;
    
    const mockData = new Date("2026-05-10");
    const mockHorarioInicio = new Date("2026-05-10T14:00:00Z");
    const mockHorarioFim = new Date("2026-05-10T15:00:00Z");

    it("Should insert and return a new Reserva (From Service layer)", async () => {
        const mockInsert = await mockReservaService.insertReserva(
            mockJogadorID,
            mockQuadraID,
            mockData,
            mockHorarioInicio,
            mockHorarioFim
        );

        expect(mockInsert).toHaveProperty("id");
        expect(mockInsert).toHaveProperty("jogador_id", mockJogadorID);
        expect(mockInsert).toHaveProperty("quadra_id", mockQuadraID);

        if (mockInsert && "id" in mockInsert) {
            mockReservaID = mockInsert.id;
        }
    });

    it("Try to receive multiple data using findAll (From Service layer)", async () => {
        const mockFind = await mockReservaService.findAll();
        expect(Array.isArray(mockFind)).toBe(true);
    });

    it("Try to delete unexisting Reserva (From Service layer)", async () => {
        const mockError = await mockReservaService.deleteReserva(999999);
        if (mockError instanceof HttpError) {
            expect(mockError.statusCode).toBe(404);
        }
    });
});

describe("ReservaController:", () => {
    const mockReservaController = new ReservaController(
        new ReservaService(new ReservaRepository(mock_Prisma_Client_Configurado))
    );

    const response = {
        body: undefined as any,
        status: (function(this: any, code: number) { return this; }),
        json: (function(this: any, data: any) {
            this.body = data;
            return this;
        })
    } as any;

    it("Should insert and return a new Reserva (From Controller layer)", async () => {
        const mockRequest = {
            body: {
                "jogador_id": mockJogadorID,
                "quadra_id": mockQuadraID,
                "data": "2026-05-10",
                "horario_inicio": "2026-05-10T14:00:00Z",
                "horario_fim": "2026-05-10T15:00:00Z"
            }
        } as Request;

        await mockReservaController.insertReserva(mockRequest, response);

        expect(response.body).toBeDefined();
    });
});

afterAll(async () => {
    await mock_Prisma_Client_Configurado.$disconnect();
});
