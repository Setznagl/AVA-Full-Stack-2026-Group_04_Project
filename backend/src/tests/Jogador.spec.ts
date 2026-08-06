// noinspection DuplicatedCode

// DESCRIBE -> Declara bloco de testes
// IT or TEST -> Define um teste específico (test case)
// EXPECT -> Asserções sobre o resultado esperado

import type {Request} from "express";
import {HttpError} from "../exception/HttpError.ts"
import mock_Prisma_Client_Configurado from "../../src/tests/mock/mock_PrismaClient.ts"
import type {jogador} from "../generated/prisma/client.ts"
import {JogadorRepository} from "../repository/JogadorRepository.ts"
import {JogadorService} from "../service/JogadorService.ts"
import {JogadorController, unicJogadorControllerInstance} from "../controller/JogadorController.ts"

beforeAll( async () => {
    await mock_Prisma_Client_Configurado.reserva.deleteMany()
    await mock_Prisma_Client_Configurado.jogador.deleteMany()
})

describe("JogadorRepository:", () => {

    const mockJogadorRepository: JogadorRepository = new JogadorRepository(mock_Prisma_Client_Configurado);

    let mockJogadorID: number;
    let mockJogadorNome: string;
    let mockJogadorEmail: string;
    let mockJogadorTelefone: string;
    let mockJogadorSenha: string;

    it("Should insert and return a new Jogador", async () => {
        let mockInsert = await mockJogadorRepository.insertJogador(
            "Jogador Mock",
            "jogador_mock@example.com",
            "1234567890",
            "1234567890"
        )
        if(mockInsert instanceof HttpError){throw mockInsert}

        expect(mockInsert).toHaveProperty("id");
        expect(mockInsert).toHaveProperty("nome", "Jogador Mock");
        expect(mockInsert).toHaveProperty("email", "jogador_mock@example.com");
        expect(mockInsert).toHaveProperty("telefone", "1234567890");
        expect(mockInsert).toHaveProperty("senha", "1234567890");

        mockJogadorID = mockInsert.id;
        mockJogadorNome = mockInsert.nome;
        mockJogadorEmail = mockInsert.email;
        mockJogadorTelefone = mockInsert.telefone;
        mockJogadorSenha = mockInsert.senha;


    })

    it("Retry insert: Should return HttpError 423 due unique constraint violation", async () => {
        try {
            await mockJogadorRepository.insertJogador(
                "Jogador Mock",
                "jogador_mock@example.com",
                "1234567890",
                "1234567890"
            );
        } catch (error) {
            if (error instanceof HttpError) {
                expect(error.statusCode).toBe(423);
                expect(error.message).toBe("Register already exists.");
            } else {
                throw error;
            }
        }
    });

    it("Try to insert sending invalid types for any field" , async () => {
        let mockInsert = await mockJogadorRepository.insertJogador(
            "Jogador Mock",
            // @ts-expect-error
            1231.2121,
            "1234567890",
            "1234567890"
        )
        expect(mockInsert).toBeInstanceOf(HttpError);
        if(mockInsert instanceof HttpError){
            expect(mockInsert.statusCode).toBe(502);
            expect(mockInsert.message).toBe("Invalid provided type for one or more parameters");
        }else{
            throw mockInsert;
        }
    })

    it("Try to find an existing Jogador using field email", async () => {
        const mockFind = await mockJogadorRepository.findByEmail(mockJogadorEmail);
        expect(mockFind).toHaveProperty("email" , mockJogadorEmail)
        expect(mockFind).toHaveProperty("id" , mockJogadorID)
        expect(mockFind).toHaveProperty("telefone" , mockJogadorTelefone)
        expect(mockFind).toHaveProperty("senha" , mockJogadorSenha)
        expect(mockFind).toHaveProperty("nome" , mockJogadorNome)
    });

    it("Try to find an existing Jogador using field email, but sending a non-string value", async () => {
        const mockError = await mockJogadorRepository.findByEmail(12345 as unknown as string)
        if(mockError instanceof HttpError){
            expect(mockError).toBeInstanceOf(HttpError);
            expect(mockError.statusCode).toBe(502);
            expect(mockError.message).toBe("Invalid provided type for 'email'");
        }else {
            throw mockError;
        }

    })

    it("Try to find an existing Jogador using field id" , async () => {
        const mockFind = await mockJogadorRepository.findById(mockJogadorID);
        expect(mockFind).toHaveProperty("id" , mockJogadorID)
        expect(mockFind).toHaveProperty("email" , mockJogadorEmail)
        expect(mockFind).toHaveProperty("telefone" , mockJogadorTelefone)
        expect(mockFind).toHaveProperty("senha" , mockJogadorSenha)
        expect(mockFind).toHaveProperty("nome" , mockJogadorNome)
    })

    it("Try to find an existing Jogador using field id sending a non-number value", async () => {
        const mockError = await mockJogadorRepository.findById("not_a_number" as unknown as number);
        expect(mockError).toBeInstanceOf(HttpError);
        if(mockError instanceof HttpError){
            expect(mockError.statusCode).toBe(502);
            expect(mockError.message).toBe("Invalid provided type for 'id'");
        }else{
            throw mockError;
        }

    })

    it("Try to find a non-existing Jogador using field email", async () => {
        const mockFind = await mockJogadorRepository.findByEmail("non_existing@example.com");
        expect(mockFind).toBeNull();
    })

    it("Try to find a non-existing Jogador using field id" , async () => {
        const mockFind = await mockJogadorRepository.findById(mockJogadorID + 1);
        expect(mockFind).toBeNull();
    })

    it("Try to receive multiple data using findAll", async () => {
        const mockFind = await mockJogadorRepository.findAll();
        expect(Array.isArray(mockFind)).toBe(true);
        expect(mockFind).toEqual(expect.arrayContaining([
            expect.objectContaining({
                "id": mockJogadorID,
                "nome": mockJogadorNome,
                "email": mockJogadorEmail,
                "telefone": mockJogadorTelefone,
                "senha": mockJogadorSenha
            })
        ]));
    })

    it("Try to update sending invalid types for any field", async () => {
        const mockFind = await mockJogadorRepository.updateJogador(mockJogadorID,
            "Jogador Mock Updated Failure",
            "updated_mock_jogador@example.com",
            "21341434",
            // @ts-expect-error
            21893183.129 //invalid type value
        )
        expect(mockFind).toBeInstanceOf(HttpError);
        expect((mockFind as HttpError).statusCode).toBe(502);
        expect((mockFind as HttpError).message).toBe("Invalid provided type for one or more parameters");
    })

    it("Try to update a non-existing Jogador using field id", async () => {
        try {
            await mockJogadorRepository.updateJogador(
                mockJogadorID + 1,
                "Jogador Mock Updated",
                "updated_mock_jogador@example.com",
                "21341434",
                "21893183129"
            );
        } catch (error) {
            if (error instanceof HttpError) {
                expect(error.statusCode).toBe(404);
                expect(error.message).toBe("Register not found.");
            } else {
                throw error;
            }
        }
    })

    it("Try to update an existing Jogador using field id", async () => {
        const mockFind:jogador | HttpError = await mockJogadorRepository.updateJogador(
            mockJogadorID,
            "Jogador Mock Updated",
            "updated_mock_jogador@example.com",
            "21341434",
            "21893183129"
        )
        if(mockFind instanceof HttpError) {
            throw mockFind;
        }
        expect(mockFind).toHaveProperty("nome" , "Jogador Mock Updated")
        expect(mockFind).toHaveProperty("email" , "updated_mock_jogador@example.com")
        expect(mockFind).toHaveProperty("telefone" , "21341434")
        expect(mockFind).toHaveProperty("senha" , "21893183129")
        mockJogadorNome = "Jogador Mock Updated"
        mockJogadorEmail = "updated_mock_jogador@example.com"
        mockJogadorTelefone = "21341434"
        mockJogadorSenha = "21893183129"
    })

    it("Try to delete using sending an invalid type for id" , async () => {
        const mockError = await mockJogadorRepository.deleteJogador("not_a_number" as unknown as number);
        expect(mockError).toBeInstanceOf(HttpError);
        expect((mockError as HttpError).statusCode).toBe(502);
        expect((mockError as HttpError).message).toBe("Invalid provided type for 'id'");
    })

    it("Try to delete an existing Jogador using field id" , async () => {
        const mockError = await mockJogadorRepository.deleteJogador(mockJogadorID);
        expect(mockError).toHaveProperty("id" , mockJogadorID) // O Prisma devolve o objeto para confirmar a deleção
        expect(mockError).toHaveProperty("nome" , mockJogadorNome)
        expect(mockError).toHaveProperty("email" , mockJogadorEmail)
        expect(mockError).toHaveProperty("telefone" , mockJogadorTelefone)
        expect(mockError).toHaveProperty("senha" , mockJogadorSenha)

    })

    it("Receiving an unexpected error during findByEmail operation, should return HttpError 500", async () => {
        //Mocking a Prisma error by not providing Prisma client to the repository, which will cause an error when trying to access the database.
        const undefinedRepository: JogadorRepository = new JogadorRepository(undefined);

        const mockError = await undefinedRepository.findByEmail(mockJogadorEmail);
        expect(mockError).toBeInstanceOf(HttpError);
        if(mockError instanceof HttpError) {
            expect(mockError.statusCode).toBe(500);
        }

    })

    it("Receiving an unexpected error during findByID operation, should return HttpError 500", async () => {
        //Mocking a Prisma error by not providing Prisma client to the repository, which will cause an error when trying to access the database.
        const undefinedRepository: JogadorRepository = new JogadorRepository(undefined);

        const mockError= await undefinedRepository.findById(mockJogadorID);
        if(mockError instanceof HttpError) {
            expect(mockError).toBeInstanceOf(HttpError);
            expect(mockError.statusCode).toBe(500);
        }else {
            throw mockError;
        }

    })

    it("Receiving an unexpected error during findAll operation, should return HttpError 500", async () => {
        //Mocking a Prisma error by not providing Prisma client to the repository, which will cause an error when trying to access the database.
        const undefinedRepository: JogadorRepository = new JogadorRepository(undefined);

        const mockError = await undefinedRepository.findAll();
        if(mockError instanceof HttpError) {
            expect(mockError).toBeInstanceOf(HttpError);
            expect(mockError.statusCode).toBe(500);
        }else{
            throw mockError;
        }
    })

    it("Receiving an unexpected error during updateJogador operation, should return HttpError 500", async () => {
        //Mocking a Prisma error by not providing Prisma client to the repository, which will cause an error when trying to access the database.
        const undefinedRepository: JogadorRepository = new JogadorRepository(undefined);

        const mockError = await undefinedRepository.updateJogador(
            mockJogadorID,
            "Jogador Mock Updated",
            "updated_mock_jogador@example.com",
            "21341434",
            "21893183129"
        )
        if(mockError instanceof HttpError) {
            expect(mockError).toBeInstanceOf(HttpError);
            expect(mockError.statusCode).toBe(500);
        }else{
            throw mockError;
        }
    })

    it("Receiving an unexpected error during deleteJogador operation, should return HttpError 500", async () => {
        //Mocking a Prisma error by not providing Prisma client to the repository, which will cause an error when trying to access the database.
        const undefinedRepository: JogadorRepository = new JogadorRepository(undefined);

        const mockError = await undefinedRepository.deleteJogador(mockJogadorID);
        if(mockError instanceof HttpError) {
            expect(mockError).toBeInstanceOf(HttpError);
            expect(mockError.statusCode).toBe(500);
        }else{
            throw mockError;
        }
    })

});

describe("JogadorService:" , () => {

    const mockJogadorService = new JogadorService(new JogadorRepository(mock_Prisma_Client_Configurado))

    let mockJogadorID: number;
    let mockJogadorNome: string;
    let mockJogadorEmail: string;
    let mockJogadorTelefone: string;
    let mockJogadorSenha: string;

    it("Should insert and return a new Jogador (From Service layer)", async () => {
        const mockInsert = await mockJogadorService.insertJogador(
            "Jogador Mock",
            "jogador_mock_2@example.com",
            "1234567890",
            "1234567890"
        )

        if(mockInsert instanceof HttpError){throw mockInsert;}

        expect(mockInsert).toHaveProperty("id");
        expect(mockInsert).toHaveProperty("nome", "Jogador Mock");
        expect(mockInsert).toHaveProperty("email", "jogador_mock_2@example.com");
        expect(mockInsert).toHaveProperty("telefone", "1234567890");
        expect(mockInsert).toHaveProperty("senha", "1234567890");

        mockJogadorID = mockInsert.id;
        mockJogadorNome = mockInsert.nome;
        mockJogadorEmail = mockInsert.email;
        mockJogadorTelefone = mockInsert.telefone;
        mockJogadorSenha = mockInsert.senha;
    })

    it("Retry insert: Should return HttpError 423 due unique constraint violation" +
        " (From Service layer)\n Custom Expected Message: " +
        "\"Não foi possível criar um novo jogador porque o email já está em uso\"", async () => {

        const mockError = await mockJogadorService.insertJogador(
            mockJogadorNome,
            mockJogadorEmail,
            mockJogadorTelefone,
            mockJogadorSenha
        );

        if(mockError instanceof HttpError){
            expect(mockError.statusCode).toBe(423);
            expect(mockError.message).toBe("Não foi possível criar um novo jogador porque o email já está em uso");
        }else {
            throw mockError;
        }

    });

    it("Try to find an existing Jogador using field email (From Service layer)", async () => {
        const mockFind = await mockJogadorService.findByEmail(mockJogadorEmail);
        expect(mockFind).toHaveProperty("email" , mockJogadorEmail)
    });

    it("Try to find an existing Jogador using field id (From Service layer)" , async () => {
        const mockFind = await mockJogadorService.findByID(mockJogadorID);
        expect(mockFind).toHaveProperty("id" , mockJogadorID)
    })

    it("Try to receive multiple data using findAll (From Service layer)", async () => {
        const mockFind = await mockJogadorService.findAll();
        expect(Array.isArray(mockFind)).toBe(true);
        expect(mockFind).toEqual(expect.arrayContaining([
            expect.objectContaining({
                "id": mockJogadorID,
                "nome": mockJogadorNome,
                "email": mockJogadorEmail,
                "telefone": mockJogadorTelefone,
                "senha": mockJogadorSenha
            })
        ]));
    })

    it("Try to update an existing Jogador using field id (From Service layer)", async () => {
        const mockFind = await mockJogadorService.updateJogador(
            mockJogadorID,
            "Jogador Mock Updated",
            "updated_mock_jogador@example.com",
            "21341434",
            "21893183129"
        )
        expect(mockFind).toHaveProperty("nome" , "Jogador Mock Updated")
        expect(mockFind).toHaveProperty("email" , "updated_mock_jogador@example.com")
        expect(mockFind).toHaveProperty("telefone" , "21341434")
        expect(mockFind).toHaveProperty("senha" , "21893183129")
        mockJogadorNome = "Jogador Mock Updated"
        mockJogadorEmail = "updated_mock_jogador@example.com"
        mockJogadorTelefone = "21341434"
        mockJogadorSenha = "21893183129"
    })

    it("Retry to update with the same data to check if (oldData.nome === provided_nome)", async () => {
        const mockFind = await mockJogadorService.updateJogador(
            mockJogadorID,
            mockJogadorNome,
            mockJogadorEmail,
            mockJogadorTelefone,
            mockJogadorSenha
        )
        expect(mockFind).toHaveProperty("id" , mockJogadorID)
        expect(mockFind).toHaveProperty("nome" , mockJogadorNome)
        expect(mockFind).toHaveProperty("email" , mockJogadorEmail)
        expect(mockFind).toHaveProperty("telefone" , mockJogadorTelefone)
        expect(mockFind).toHaveProperty("senha" , mockJogadorSenha)

    })

    it("Try to update a non-existing Jogador using field id (From Service layer)\n" +
        "Custom Expected Message: Impossível atualizar os dados do jogador porque o registro informado não existe", async () => {

        const mockError = await mockJogadorService.updateJogador(
            mockJogadorID + 1,
            "Jogador Mock Updated",
            "updated_mock_jogador@example.com",
            "21341434",
            "21893183129",
        )



        if (mockError instanceof HttpError) {
            expect(mockError.statusCode).toBe(404);
            expect(mockError.message).toBe("Impossível atualizar os dados do jogador porque o registro informado não existe");
            expect(mockError.layer).toBe("service");
        } else {
            throw mockError;
        }

    })

    it("Try to delete unexisting Jogador (From Service layer)" , async () => {
        const mockError = await mockJogadorService.deleteJogador(mockJogadorID + 1);
        expect(mockError).toBeInstanceOf(HttpError);
        if(mockError instanceof HttpError){
            if(mockError.statusCode === 404){
                expect((mockError as HttpError).statusCode).toBe(404);
                expect((mockError as HttpError).message).toBe("Não foi possível deletar o jogador porque o registro não foi encontrado");
            }else {
                throw mockError;
            }
        } else{
            throw mockError;
        }
    })

    it("Receiving an unexpected error during deleteJogador operation, should return HttpError 500 (From Service layer)", async () => {
        //Mocking a Prisma error by not providing Prisma client to the repository, which will cause an error when trying to access the database.
        const undefinedService: JogadorService = new JogadorService(new JogadorRepository(undefined));

        const mockError = await undefinedService.deleteJogador(mockJogadorID);
        expect(mockError).toBeInstanceOf(HttpError);
        if(mockError instanceof HttpError) {
            expect(mockError.statusCode).toBe(500);
        }

    })

    it("Try to updatedJogador from service, but forcing an unexpected error for (const oldData)", async() => {
        //If repository fails we'll receive a HttpErro in "const oldData: jogador | HttpError | null = await this.jogadorRepository.findByID(provided_id);"
        const undefinedService: JogadorService = new JogadorService(new JogadorRepository(undefined));

        const mockError = await undefinedService.updateJogador(
            mockJogadorID + 1,
            "Jogador Mock Updated",
            "updated_mock_jogador@example.com",
            "21341434",
            "21893183129",
        )
        expect(mockError).toBeInstanceOf(HttpError);
        if(mockError instanceof HttpError){
            expect(mockError.statusCode).toBe(500);
        }else{
            throw mockError;
        }
    })

})
