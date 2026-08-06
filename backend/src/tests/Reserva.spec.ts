// noinspection DuplicatedCode

import type {Request} from "express";
import { HttpError } from "../exception/HttpError.ts";
import mock_Prisma_Client_Configurado from "./mock/mock_PrismaClient.ts";
import { ReservaRepository} from "../repository/ReservaRepository.ts";
import { ReservaService } from "../service/ReservaService.ts";
import { ReservaController } from "../controller/ReservaController.ts";
import { JogadorRepository } from "../repository/JogadorRepository.ts";
import { QuadraRepository } from "../repository/QuadraRepository.ts";

let mockJogadorID: number;
let mockQuadraID: number;

beforeAll(async () => {
    await mock_Prisma_Client_Configurado.reserva.deleteMany()
    await mock_Prisma_Client_Configurado.quadra.deleteMany()
    await mock_Prisma_Client_Configurado.jogador.deleteMany()

    const jogador = await mock_Prisma_Client_Configurado.jogador.create({
        data: {nome: "Jogador Teste Reserva", email: "reserva_test@example.com", telefone: "22999999999", senha: "123"},
    });mockJogadorID = jogador.id;

    const quadra = await mock_Prisma_Client_Configurado.quadra.create({
        data: {nome: "Quadra Principal Reserva", modalidade: "Futebol", localizacao: "Bloco B"},
    });mockQuadraID = quadra.id;
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

        // noinspection DuplicatedCode
        expect(mockInsert).toHaveProperty("id");
        expect(mockInsert).toHaveProperty("jogador_id", mockJogadorID);
        expect(mockInsert).toHaveProperty("quadra_id", mockQuadraID);
        expect(mockInsert).toHaveProperty("data", mockData);
        expect(mockInsert).toHaveProperty("horario_inicio", mockHorarioInicio);
        expect(mockInsert).toHaveProperty("horario_fim", mockHorarioFim);

        if (mockInsert && "id" in mockInsert) {
            mockReservaID = mockInsert.id;
            console.log(`Reserva inserted with ID === ${mockReservaID}`);
        }
    });

    it("Try to find an existing Reserva using field id", async () => {
        const mockFind = await mockReservaRepository.findByID(mockReservaID);
        expect(mockFind).toHaveProperty("id", mockReservaID);
        expect(mockFind).toHaveProperty("jogador_id", mockJogadorID);
        expect(mockFind).toHaveProperty("quadra_id", mockQuadraID);
        expect(mockFind).toHaveProperty("data", mockData);
        expect(mockFind).toHaveProperty("horario_inicio", mockHorarioInicio);
        expect(mockFind).toHaveProperty("horario_fim", mockHorarioFim);
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
        expect(mockFind).toEqual(expect.arrayContaining([
            expect.objectContaining({
                id: mockReservaID,
                jogador_id: mockJogadorID,
                quadra_id: mockQuadraID,
                data: mockData,
                horario_inicio: mockHorarioInicio,
                horario_fim: mockHorarioFim
            })
        ]));
    });

    it("Try to find Reservas by quadra_id", async () => {
        const mockFind = await mockReservaRepository.findByQuadraID(mockQuadraID);
        expect(Array.isArray(mockFind)).toBe(true);
        expect(mockFind).toEqual(expect.arrayContaining([
            expect.objectContaining({
                id: mockReservaID,
                jogador_id: mockJogadorID,
                quadra_id: mockQuadraID,
                data: mockData,
                horario_inicio: mockHorarioInicio,
                horario_fim: mockHorarioFim
            })
        ]));
    });

    it("Try to find Reservas by data", async () => {
        const mockFind = await mockReservaRepository.findByData(mockData);
        expect(Array.isArray(mockFind)).toBe(true);
        expect(mockFind).toEqual(expect.arrayContaining([
            expect.objectContaining({
                id: mockReservaID,
                jogador_id: mockJogadorID,
                quadra_id: mockQuadraID,
                data: mockData,
                horario_inicio: mockHorarioInicio,
                horario_fim: mockHorarioFim
            })
        ]));
    });

    it("Try to receive multiple data using findAll", async () => {
        const mockFind = await mockReservaRepository.findAll();
        expect(Array.isArray(mockFind)).toBe(true);
        expect(mockFind).toEqual(expect.arrayContaining([
            expect.objectContaining({
                id: mockReservaID,
                jogador_id: mockJogadorID,
                quadra_id: mockQuadraID,
                data: mockData,
                horario_inicio: mockHorarioInicio,
                horario_fim: mockHorarioFim
            })
        ]));
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

    it("Should throw HttpError when inserting Reserva with invalid jogador_id", async () => {
        const invalidJogadorID = -1;
        const mockError = await mockReservaRepository.insertReserva(
            invalidJogadorID,
            mockQuadraID,
            mockData,
            mockHorarioInicio,
            mockHorarioFim
        );
        expect(mockError).toBeInstanceOf(HttpError);
    });

    it("Should throw HttpError when inserting Reserva with invalid quadra_id", async () => {
        const invalidQuadraID = -1;
        const mockError = await mockReservaRepository.insertReserva(
            mockJogadorID,
            invalidQuadraID,
            mockData,
            mockHorarioInicio,
            mockHorarioFim
        );
        expect(mockError).toBeInstanceOf(HttpError);
    });

    it("Should throw HttpError when updating Reserva with invalid id", async () => {
        const invalidReservaID = -1;
        const mockError = await mockReservaRepository.updateReserva(
            invalidReservaID,
            mockJogadorID,
            mockQuadraID,
            mockData,
            mockHorarioInicio,
            mockHorarioFim
        );
        expect(mockError).toBeInstanceOf(HttpError);
    });

    it("Should throw HttpError when deleting Reserva with invalid id", async () => {
        const invalidReservaID = -1;
        const mockError = await mockReservaRepository.deleteReserva(invalidReservaID);
        expect(mockError).toBeInstanceOf(HttpError);
    });

    it("Receiving an unexpected error during 'findByJogadorID' operation, should return HttpError 500", async () => {
        const undefinedRepository = new ReservaRepository(undefined);
        const mockError = await undefinedRepository.findByJogadorID(mockJogadorID);
        expect(mockError).toBeInstanceOf(HttpError);
        if (mockError instanceof HttpError) {
            expect(mockError.statusCode).toBe(500);
        }
    });

    it("Receiving an unexpected error during 'findByQuadraID' operation, should return HttpError 500", async () => {
        const undefinedRepository = new ReservaRepository(undefined);
        const mockError = await undefinedRepository.findByQuadraID(mockQuadraID);
        expect(mockError).toBeInstanceOf(HttpError);
        if (mockError instanceof HttpError) {
            expect(mockError.statusCode).toBe(500);
        }
    });

    it("Receiving an unexpected error during 'findByData' operation, should return HttpError 500", async () => {
        const undefinedRepository = new ReservaRepository(undefined);
        const mockError = await undefinedRepository.findByData(mockData);
        expect(mockError).toBeInstanceOf(HttpError);
        if (mockError instanceof HttpError) {
            expect(mockError.statusCode).toBe(500);
        }
    });

    it("Receiving an unexpected error during 'findAll' operation, should return HttpError 500", async () => {
        const undefinedRepository = new ReservaRepository(undefined);
        const mockError = await undefinedRepository.findAll();
        expect(mockError).toBeInstanceOf(HttpError);
        if (mockError instanceof HttpError) {
            expect(mockError.statusCode).toBe(500);
        }
    });

    it("Receiving an unexpected error during 'updateReserva' operation, should return HttpError 500", async () => {
        const undefinedRepository = new ReservaRepository(undefined);
        const mockError = await undefinedRepository.updateReserva(
            mockReservaID,
            mockJogadorID,
            mockQuadraID,
            mockData,
            mockHorarioInicio,
            mockHorarioFim
        );
        expect(mockError).toBeInstanceOf(HttpError);
        if (mockError instanceof HttpError) {
            expect(mockError.statusCode).toBe(500);
        }
    });

    it("Receiving an unexpected error during 'deleteReserva' operation, should return HttpError 500", async () => {
        const undefinedRepository = new ReservaRepository(undefined);
        const mockError = await undefinedRepository.deleteReserva(mockReservaID);
        expect(mockError).toBeInstanceOf(HttpError);
        if (mockError instanceof HttpError) {
            expect(mockError.statusCode).toBe(500);
        }
    });

});

describe("ReservaService:" , () => {

    const mockReservaService = new ReservaService(
        new ReservaRepository(mock_Prisma_Client_Configurado),
        new JogadorRepository(mock_Prisma_Client_Configurado),
        new QuadraRepository(mock_Prisma_Client_Configurado),
    )

    let mockReservaID: number;

    const mockData = new Date("2026-05-12");
    const mockHorarioInicio = new Date("1970-01-01T16:00:00Z");
    const mockHorarioFim = new Date("1970-01-01T17:00:00Z");

    it("Should insert and return a new Reserva (From Service layer)", async () => {
        const mockInsert = await mockReservaService.insertReserva(
            mockJogadorID,
            mockQuadraID,
            mockData,
            mockHorarioInicio,
            mockHorarioFim
        );
        if(mockInsert instanceof HttpError){ throw mockInsert }

        expect(mockInsert).toHaveProperty("id");
        expect(mockInsert).toHaveProperty("jogador_id", mockJogadorID);
        expect(mockInsert).toHaveProperty("quadra_id", mockQuadraID);
        expect(mockInsert).toHaveProperty("data", mockData);
        expect(mockInsert).toHaveProperty("horario_inicio", mockHorarioInicio);
        expect(mockInsert).toHaveProperty("horario_fim", mockHorarioFim);

        if (mockInsert && "id" in mockInsert) {
            mockReservaID = mockInsert.id;
            console.log(`Reserva inserted with ID === ${mockReservaID}`);
        }
    });

    it("Try to insert a Reserva sending an invalid 'jogador_id', should return a 404 HttpError", async () => {
        const mockError = await mockReservaService.insertReserva(
            mockJogadorID + 999,
            mockQuadraID,
            mockData,
            mockHorarioInicio,
            mockHorarioFim
        );
        if (mockError instanceof HttpError) {
            expect(mockError.statusCode).toBe(404);
            expect(mockError.message).toBe("Jogador não encontrado.");
        } else {
            throw mockError;
        }
    });

    it("Try to insert a Reserva sending an invalid 'quadra_id', should return a 404 HttpError", async () => {
        const mockError = await mockReservaService.insertReserva(
            mockJogadorID,
            mockQuadraID + 999,
            mockData,
            mockHorarioInicio,
            mockHorarioFim
        );
        if (mockError instanceof HttpError) {
            expect(mockError.statusCode).toBe(404);
            expect(mockError.message).toBe("Quadra não encontrada.");
        } else {
            throw mockError;
        }
    });

    it("Retry insert: Should return HttpError 409 due unique constraint violation (From Service layer)", async () => {
        const mockError = await mockReservaService.insertReserva(
            mockJogadorID,
            mockQuadraID,
            mockData,
            mockHorarioInicio,
            mockHorarioFim
        );
        if (mockError instanceof HttpError) {
            expect(mockError.statusCode).toBe(409);
            expect(mockError.message).toBe("Quadra já possui uma reserva neste horário.");
        } else {
            throw mockError;
        }
    });

    it("Retry insert: Should return HttpError 409 due unique constraint violation (From Service layer)", async () => {
        const secQuadra: any = await mockReservaService.quadraRepository.insertQuadra("Quadra Secundária Reserva", "Futebol", "Bloco C");

        let secQuadraId: number = secQuadra.id;

        const mockError = await mockReservaService.insertReserva(
            mockJogadorID,
            secQuadraId,
            mockData,
            mockHorarioInicio,
            mockHorarioFim
        );
        if (mockError instanceof HttpError) {
            expect(mockError.statusCode).toBe(409);
            expect(mockError.message).toBe("Jogador já possui uma reserva neste horário.");
        } else {
            throw mockError;
        }
    });

    it("Try to find an existing Reserva using field id (From Service layer)", async () => {
        const mockFind = await mockReservaService.findById(mockReservaID);
        expect(mockFind).toHaveProperty("id", mockReservaID);
        expect(mockFind).toHaveProperty("jogador_id", mockJogadorID);
        expect(mockFind).toHaveProperty("quadra_id", mockQuadraID);
        expect(mockFind).toHaveProperty("data", mockData);
        expect(mockFind).toHaveProperty("horario_inicio", mockHorarioInicio);
        expect(mockFind).toHaveProperty("horario_fim", mockHorarioFim);
    });

    it("Try to find an existing Reserva using field id sending a non-number value (From Service layer)", async () => {
        const mockError = await mockReservaService.findById("invalid_id" as unknown as number);
        expect(mockError).toBeInstanceOf(HttpError);
    });

    it("Try to find a non-existing Reserva using field id (From Service layer)", async () => {
        const mockFind = await mockReservaService.findById(mockReservaID + 999);
        expect(mockFind).toBeNull();
    });

    it("Try to find an existing Reserva by jogador_id (From Service layer)", async () => {
        const mockFind: any = await mockReservaService.findByJogadorId(mockJogadorID);
        if (mockFind instanceof HttpError || mockFind === null) {throw mockFind;}
        expect(mockFind).toEqual(expect.arrayContaining([
            expect.objectContaining({
                id: mockReservaID,
                jogador_id: mockJogadorID,
                quadra_id: mockQuadraID,
                data: mockData,
                horario_inicio: mockHorarioInicio,
                horario_fim: mockHorarioFim
            })
        ]));
    });

    it("Try to find an existing Reserva by quadra_id (From Service layer)", async () => {
        const mockFind: any = await mockReservaService.findByQuadraId(mockQuadraID);
        if (mockFind instanceof HttpError || mockFind === null) {throw mockFind;}
        expect(mockFind).toEqual(expect.arrayContaining([
            expect.objectContaining({
                id: mockReservaID,
                jogador_id: mockJogadorID,
                quadra_id: mockQuadraID,
                data: mockData,
                horario_inicio: mockHorarioInicio,
                horario_fim: mockHorarioFim
            })
        ]));
    });

    it("Try to receive multiple data using findByData (From Service layer)" , async () => {
        const mockFind: any = await mockReservaService.findByData(mockData);
        if (mockFind instanceof HttpError || mockFind === null) {throw mockFind;}
        expect(mockFind).toEqual(expect.arrayContaining([
            expect.objectContaining({
                id: mockReservaID,
                jogador_id: mockJogadorID,
                quadra_id: mockQuadraID,
                data: mockData,
                horario_inicio: mockHorarioInicio,
                horario_fim: mockHorarioFim
            })
        ]));
    })

    it("Try to receive multiple data using findAll (From Service layer)", async () => {
        const mockFind: any = await mockReservaService.findAll();
        if (mockFind instanceof HttpError || mockFind === null) {throw mockFind;}
        expect(Array.isArray(mockFind)).toBe(true);
        expect(mockFind).toEqual(expect.arrayContaining([
            expect.objectContaining({
                id: mockReservaID,
                jogador_id: mockJogadorID,
                quadra_id: mockQuadraID,
                data: mockData,
                horario_inicio: mockHorarioInicio,
                horario_fim: mockHorarioFim
            })
        ]));
    });

    it("Try to update an existing Reserva using field id (From Service layer)", async () => {
        const novaData = new Date("2026-05-13");
        const mockUpdate = await mockReservaService.updateReserva(
            mockReservaID,
            novaData,
            mockHorarioInicio,
            mockHorarioFim
        );
        expect(mockUpdate).toHaveProperty("id", mockReservaID);
        expect(mockUpdate).toHaveProperty("data", novaData);
    });

    it("Try to update a non-existing Reserva using field id (From Service layer)", async () => {
        const mockError = await mockReservaService.updateReserva(
            mockReservaID + 999,
            mockData,
            mockHorarioInicio,
            mockHorarioFim
        );
        if (mockError instanceof HttpError) {
            expect(mockError.statusCode).toBe(404);
            expect(mockError.message).toBe("Reserva não encontrada.");
            expect(mockError.layer).toBe("service");
        } else {
            throw mockError;
        }
    });

    it("Try to update Should return HttpError 409 (Quadra) due data conflict (From Service layer)", async () => {
        /*
            Existing Reserva:
                Date("2026-05-13");
                Date("1970-01-01T16:00:00Z");
                Date("1970-01-01T17:00:00Z");
         */
        const secJogador = await mockReservaService.jogadorRepository.insertJogador(
            "sec jogador",
            "sec_jogador_reserva_test@example.com",
            "123",
            "123",
        )
        if(secJogador instanceof HttpError || secJogador === null) {throw secJogador;}
        const secJogadorId = secJogador.id

        const secReserva = await mockReservaService.insertReserva(
            secJogadorId,
            mockQuadraID,
            new Date("2026-05-13"),
            new Date("1970-01-01T12:00:00Z"),
            new Date("1970-01-01T13:00:00Z"),
        )
        if(secReserva instanceof HttpError || secReserva === null) {throw secReserva;}
        const secReservaId = secReserva.id;

        // Create a new date for the secReserva
        const newSecReservaDate = new Date("2026-05-13");
        const newSecReservaHorarioInicio = new Date("1970-01-01T15:00:00Z");
        const newSecReservaHorarioFim = new Date("1970-01-01T18:00:00Z");
        // Try to update the secReserva to conflict with updatedReserva schedule
        const mockError = await mockReservaService.updateReserva(
            secReservaId,
            newSecReservaDate,
            newSecReservaHorarioInicio,
            newSecReservaHorarioFim
        )

        expect(mockError).toBeInstanceOf(HttpError);
        if (mockError instanceof HttpError) {
            expect(mockError.statusCode).toBe(409);
            expect(mockError.message).toBe("Quadra já possui uma reserva neste horário.");
        }

    });

    it("Try to update Should return HttpError 409 (Jogador) due data conflict (From Service layer)", async () => {
        const secQuadra = await mockReservaService.quadraRepository.insertQuadra(
            "sec reserva quadra",
            "Futebol",
            "Bloco D"
        )
        if(secQuadra instanceof HttpError || secQuadra === null) {throw secQuadra;}
        const secQuadraId = secQuadra.id

        const ReservaDate = new Date("2026-05-13");
        const ReservaHorarioInicio = new Date("2026-05-13T20:00:00Z");
        const ReservaHorarioFim = new Date("2026-05-13T21:00:00Z");

        const secReservaHorarioInicio = new Date("2026-05-13T04:00:00Z");
        const secReservaHorarioFim = new Date("2026-05-13T05:00:00Z");

        const ConflictReservaHorarioInicio = new Date("2026-05-13T19:30:00Z");
        const ConflictReservaHorarioFim = new Date("2026-05-13T20:10:00Z");

        // Creating first reserva
        const firstReserva = await mockReservaService.insertReserva(
            mockJogadorID,
            mockQuadraID,
            ReservaDate,
            ReservaHorarioInicio,
            ReservaHorarioFim
        )
        if(firstReserva instanceof HttpError || firstReserva === null) {throw firstReserva;}
        const firstReservaId = firstReserva.id;

        expect(firstReserva).toHaveProperty("id", firstReservaId);
        expect(firstReserva).toHaveProperty("jogador_id", mockJogadorID);
        expect(firstReserva).toHaveProperty("quadra_id", mockQuadraID);
        expect(firstReserva).toHaveProperty("data", ReservaDate);
        expect(firstReserva).toHaveProperty("horario_inicio", ReservaHorarioInicio);
        expect(firstReserva).toHaveProperty("horario_fim", ReservaHorarioFim);

        // Creating second reserva, same Jogador, but different Quadra
        const secReserva = await mockReservaService.insertReserva(
            mockJogadorID,
            secQuadraId,
            ReservaDate,
            secReservaHorarioInicio,
            secReservaHorarioFim,
        )
        if(secReserva instanceof HttpError || secReserva === null) {throw secReserva;}
        const secReservaId = secReserva.id;

        expect(secReserva).toHaveProperty("id", secReservaId);
        expect(secReserva).toHaveProperty("jogador_id", mockJogadorID);
        expect(secReserva).toHaveProperty("quadra_id", secQuadraId);
        expect(secReserva).toHaveProperty("data", ReservaDate);
        expect(secReserva).toHaveProperty("horario_inicio", secReservaHorarioInicio);
        expect(secReserva).toHaveProperty("horario_fim", secReservaHorarioFim);

        // Try to update using conflict date and time, should return HttpError 409
        const mockError = await mockReservaService.updateReserva(
            secReservaId,
            ReservaDate,
            ConflictReservaHorarioInicio,
            ConflictReservaHorarioFim
        )

        expect(mockError).toBeInstanceOf(HttpError);
        if (mockError instanceof HttpError) {
            expect(mockError.statusCode).toBe(409);
            expect(mockError.message).toBe("Jogador já possui uma reserva neste horário.");
        }

    })

    it("Try to delete an existing Reserva using field id (From Service layer)", async () => {
        const mockDelete = await mockReservaService.deleteReserva(mockReservaID);
        expect(mockDelete).toHaveProperty("id", mockReservaID);
    });

    it("Try to delete a non-existing Reserva using field id (From Service layer)", async () => {
        const mockError = await mockReservaService.deleteReserva(mockReservaID + 999);
        if (mockError instanceof HttpError) {
            expect(mockError.statusCode).toBe(404);
            expect(mockError.message).toBe("Reserva não encontrada.");
            expect(mockError.layer).toBe("service");
        } else {
            throw mockError;
        }
    });

    it("Receiving an unexpected error during findByID operation, should return HttpError 500 (From Service layer)", async () => {
        const undefinedService: ReservaService = new ReservaService(new ReservaRepository(undefined), new JogadorRepository(undefined), new QuadraRepository(undefined));
        const mockError = await undefinedService.findById(mockReservaID);
        expect(mockError).toBeInstanceOf(HttpError);
        if (mockError instanceof HttpError) {
            expect(mockError.statusCode).toBe(500);
        }
    });

    it("Receiving an unexpected error during findAll operation, should return HttpError 500 (From Service layer)", async () => {
        const undefinedService: ReservaService = new ReservaService(new ReservaRepository(undefined), new JogadorRepository(undefined), new QuadraRepository(undefined));
        const mockError = await undefinedService.findAll();
        expect(mockError).toBeInstanceOf(HttpError);
        if (mockError instanceof HttpError) {
            expect(mockError.statusCode).toBe(500);
        }
    });

    it("Receiving an unexpected error during updateReserva operation, should return HttpError 500 (From Service layer)", async () => {
        const undefinedService: ReservaService =
            new ReservaService(
                new ReservaRepository(undefined),
                new JogadorRepository(undefined),
                new QuadraRepository(undefined)
            );
        const mockError = await undefinedService.updateReserva(
            mockReservaID,
            mockData,
            mockHorarioInicio,
            mockHorarioFim
        );
        expect(mockError).toBeInstanceOf(HttpError);
        if (mockError instanceof HttpError) {
            expect(mockError.statusCode).toBe(500);
        }
    });

    it("Receiving an unexpected error during deleteReserva operation, should return HttpError 500 (From Service layer)", async () => {
        const undefinedService: ReservaService = new ReservaService(new ReservaRepository(undefined), new JogadorRepository(undefined), new QuadraRepository(undefined));
        const mockError = await undefinedService.deleteReserva(mockReservaID);
        expect(mockError).toBeInstanceOf(HttpError);
        if (mockError instanceof HttpError) {
            expect(mockError.statusCode).toBe(500);
        }
    });
});