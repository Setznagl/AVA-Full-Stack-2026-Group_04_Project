// DESCRIBE -> Declara bloco de testes

// IT or TEST -> Define um teste específico (test case)

// EXPECT -> Asserções sobre o resultado esperado
import {Request} from "express";
import {HttpError} from "../../src/exception/HttpError.ts"
import exceptionHandler from "../../src/exception/ExceptionHandler.ts";
import mock_Prisma_Client_Configurado from "../../src/tests/mock/mock_PrismaClient.ts"
import {JogadorRepository} from "../../src/repository/JogadorRepository.ts"
import {JogadorService} from "../../src/service/JogadorService.ts"
import {JogadorController} from "../../src/controller/JogadorController.ts"

beforeAll(async () => {
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
        const mockInsert = await mockJogadorRepository.insertJogador(
            "Jogador Mock",
            "jogador_mock@example.com",
            "1234567890",
            "1234567890"
        )

        expect(mockInsert).toHaveProperty("id");
        expect(mockInsert).toHaveProperty("nome", "Jogador Mock");
        expect(mockInsert).toHaveProperty("email", "jogador_mock@example.com");
        expect(mockInsert).toHaveProperty("telefone", "1234567890");
        expect(mockInsert).toHaveProperty("senha", "1234567890");

        console.log(`Jogador inserted with ID === ${mockInsert.id}`);
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

    it("Try to find an existing Jogador using field email", async () => {
        const mockFind = await mockJogadorRepository.findByEmail(mockJogadorEmail);
        expect(mockFind).toHaveProperty("email" , mockJogadorEmail)
    });

    it("Try to find an existing Jogador using field email, but sending a non-string value", async () => {
        const mockError: HttpError = await mockJogadorRepository.findByEmail(12345 as unknown as string)
        expect(mockError).toBeInstanceOf(HttpError);
        expect(mockError.statusCode).toBe(502);
        expect(mockError.message).toBe("Invalid provided type for 'email'", "repository");
    })

    it("Try to find an existing Jogador using field id" , async () => {
        const mockFind = await mockJogadorRepository.findByID(mockJogadorID);
        expect(mockFind).toHaveProperty("id" , mockJogadorID)
    })

    it("Try to find an existing Jogador using field id sending a non-number value", async () => {
        const mock: HttpError = await mockJogadorRepository.findByID("not_a_number" as unknown as number);
        expect(mock).toBeInstanceOf(HttpError);
        expect(mock.statusCode).toBe(502);
        expect(mock.message).toBe("Invalid provided type for 'id'", "repository");
    })

    it("Try to find a non-existing Jogador using field email", async () => {
        const mockFind = await mockJogadorRepository.findByEmail("non_existing@example.com");
        expect(mockFind).toBeNull();
    })

    it("Try to find a non-existing Jogador using field id" , async () => {
        const mockFind = await mockJogadorRepository.findByID(mockJogadorID + 1);
        expect(mockFind).toBeNull();
    })

    it("Try to receive multiple data using findAll", async () => {
        const mockFind = await mockJogadorRepository.findAll();
        expect(Array.isArray(mockFind)).toBe(true);
        expect(mockFind).toEqual([{
            "id": mockJogadorID,
            "nome": mockJogadorNome,
            "email": mockJogadorEmail,
            "telefone": mockJogadorTelefone,
            "senha": mockJogadorSenha
        }])
    })

    it("Try to update sending invalid types for any field", async () => {
        const mockFind = await mockJogadorRepository.updateJogador(
            mockJogadorID,
            "Jogador Mock Updated Failure",
            "updated_mock_jogador@example.com",
            "21341434",
            21893183.129 //invalid type value
        )
        expect(mockFind).toBeInstanceOf(HttpError);
        expect((mockFind as HttpError).statusCode).toBe(502);
        expect((mockFind as HttpError).message).toBe("Invalid provided type for one or more parameters", "repository");
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
        const mockFind = await mockJogadorRepository.updateJogador(
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

    it("Try to delete using sending an invalid type for id" , async () => {
        const mockError = await mockJogadorRepository.deleteJogador("not_a_number" as unknown as number);
        expect(mockError).toBeInstanceOf(HttpError);
        expect((mockError as HttpError).statusCode).toBe(502);
        expect((mockError as HttpError).message).toBe("Invalid provided type for 'id'", "repository");
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
        const undefinedRepository: JogadorRepository = new JogadorRepository();

        const mockError: HttpError = await undefinedRepository.findByEmail(mockJogadorEmail);
        expect(mockError).toBeInstanceOf(HttpError);
        expect(mockError.statusCode).toBe(500);
    })

    it("Receiving an unexpected error during findByID operation, should return HttpError 500", async () => {
        //Mocking a Prisma error by not providing Prisma client to the repository, which will cause an error when trying to access the database.
        const undefinedRepository: JogadorRepository = new JogadorRepository();

        const mockError: HttpError = await undefinedRepository.findByID(mockJogadorID);
        expect(mockError).toBeInstanceOf(HttpError);
        expect(mockError.statusCode).toBe(500);
    })

    it("Receiving an unexpected error during findAll operation, should return HttpError 500", async () => {
        //Mocking a Prisma error by not providing Prisma client to the repository, which will cause an error when trying to access the database.
        const undefinedRepository: JogadorRepository = new JogadorRepository();

        const mockError: HttpError = await undefinedRepository.findAll();
        expect(mockError).toBeInstanceOf(HttpError);
        expect(mockError.statusCode).toBe(500);
    })

    it("Receiving an unexpected error during updateJogador operation, should return HttpError 500", async () => {
        //Mocking a Prisma error by not providing Prisma client to the repository, which will cause an error when trying to access the database.
        const undefinedRepository: JogadorRepository = new JogadorRepository();

        const mockError: HttpError = await undefinedRepository.updateJogador(
            mockJogadorID,
            "Jogador Mock Updated",
            "updated_mock_jogador@example.com",
            "21341434",
            "21893183129"
        )
        expect(mockError).toBeInstanceOf(HttpError);
        expect(mockError.statusCode).toBe(500);
    })

    it("Receiving an unexpected error during deleteJogador operation, should return HttpError 500", async () => {
        //Mocking a Prisma error by not providing Prisma client to the repository, which will cause an error when trying to access the database.
        const undefinedRepository: JogadorRepository = new JogadorRepository();

        const mockError: HttpError = await undefinedRepository.deleteJogador(mockJogadorID);
        expect(mockError).toBeInstanceOf(HttpError);
        expect(mockError.statusCode).toBe(500);
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
            "jogador_mock@example.com",
            "1234567890",
            "1234567890"
        )

        expect(mockInsert).toHaveProperty("id");
        expect(mockInsert).toHaveProperty("nome", "Jogador Mock");
        expect(mockInsert).toHaveProperty("email", "jogador_mock@example.com");
        expect(mockInsert).toHaveProperty("telefone", "1234567890");
        expect(mockInsert).toHaveProperty("senha", "1234567890");

        console.log(`Jogador inserted with ID === ${mockInsert.id}`);
        mockJogadorID = mockInsert.id;
        mockJogadorNome = mockInsert.nome;
        mockJogadorEmail = mockInsert.email;
        mockJogadorTelefone = mockInsert.telefone;
        mockJogadorSenha = mockInsert.senha;
    })

    it("Retry insert: Should return HttpError 423 due unique constraint violation" +
        " (From Service layer)\n Custom Expected Message: " +
        "\"Não foi possível criar um novo jogador porque o email já está em uso\"", async () => {

        const mockError:HttpError = await mockJogadorService.insertJogador(
            mockJogadorNome,
            mockJogadorEmail,
            mockJogadorTelefone,
            mockJogadorSenha
        );

        expect(mockError.statusCode).toBe(423);
        expect(mockError.message).toBe("Não foi possível criar um novo jogador porque o email já está em uso");

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
        expect(mockFind).toEqual([{
            "id": mockJogadorID,
            "nome": mockJogadorNome,
            "email": mockJogadorEmail,
            "telefone": mockJogadorTelefone,
            "senha": mockJogadorSenha
        }])
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
            expect(mockError.statusCode).toBe(400);
            expect(mockError.message).toBe("Impossível atualizar os dados do jogador porque o registro informado não existe");
            expect(mockError.layer).toBe("service");
        } else {
            throw mockError;
        }

    })

    it("Try to delete unexisting Jogador (From Repository layer)" , async () => {
        const mockError:HttpError = await mockJogadorService.deleteJogador(mockJogadorID + 1);
        expect(mockError).toBeInstanceOf(HttpError);

        if(mockError.statusCode === 404){
            expect((mockError as HttpError).statusCode).toBe(404);
            expect((mockError as HttpError).message).toBe("Não foi possível deletar o jogador porque o registro não foi encontrado");
        }else{
            throw mockError;
        }
    })

    it("Receiving an unexpected error during deleteJogador operation, should return HttpError 500 (From Service layer)", async () => {
        //Mocking a Prisma error by not providing Prisma client to the repository, which will cause an error when trying to access the database.
        const undefinedService: JogadorService = new JogadorService(new JogadorRepository());

        const mockError: HttpError = await undefinedService.deleteJogador(mockJogadorID);
        expect(mockError).toBeInstanceOf(HttpError);
        expect(mockError.statusCode).toBe(500);
    })

    it("Try to updatedJogador from service, but forcing an unexpected error for (const oldData)", async() => {
        //If repository fails we'll receive a HttpErro in "const oldData: jogador | HttpError | null = await this.jogadorRepository.findByID(provided_id);"
        const undefinedService: JogadorService = new JogadorService(new JogadorRepository());

        const mockError:HttpError = await undefinedService.updateJogador(
            mockJogadorID + 1,
            "Jogador Mock Updated",
            "updated_mock_jogador@example.com",
            "21341434",
            "21893183129",
        )
        expect(mockError.statusCode).toBe(500);

    })

})

describe("JogadorController:" , () => {

    const mockJogadorController = new JogadorController(new JogadorService(new JogadorRepository(mock_Prisma_Client_Configurado)))

    let mockJogadorID: number;
    let mockJogadorNome: string;
    let mockJogadorEmail: string;
    let mockJogadorTelefone: string;
    let mockJogadorSenha: string;

    const response = {
        body: undefined,
        status: jest.fn().mockReturnThis(),
        json: jest.fn(function(data){
            this.body = data;
            return this;
        })
    } as any

    it("Should insert and return a new Jogador (From Controller layer)" , async () => {

        const mockRequest = {
            body: {
                "nome": "Jogador Mock",
                "email": "jogador_mock_from_controller@example.com",
                "telefone": "1234567890",
                "senha": "1234567890"
            }
        } as Request;

        mockJogadorNome = "Jogador Mock";
        mockJogadorEmail = "jogador_mock_from_controller@example.com";
        mockJogadorTelefone = "1234567890";
        mockJogadorSenha = "1234567890";


        await mockJogadorController.insertJogador(mockRequest, response);
        mockJogadorID = response.body.id;

        expect(response.status).toHaveBeenCalledWith(201);
        expect(response.json).toHaveBeenCalled();

    })

    it("Retry insert: Should return HttpError 423 due unique constraint violation (From Controller layer)" , async () => {
        const mockRequest = {
            body: {
                "nome": `${mockJogadorNome}`,
                "email": `${mockJogadorEmail}`,
                "telefone": `${mockJogadorTelefone}`,
                "senha": `${mockJogadorSenha}`
            }
        } as Request;

        await mockJogadorController.insertJogador(mockRequest, response);

        expect(response.status).toHaveBeenCalledWith(423);
        expect(response.json).toHaveBeenCalled();
    })

    it("Try to find an existing Jogador using field email (From Controller layer)", async () => {
        const mockRequest = {
            body: {
                "email": mockJogadorEmail,
            }
        }

        await mockJogadorController.findByEmail(mockRequest, response);
        expect(response.status).toHaveBeenCalledWith(200);
        expect(response.json).toHaveBeenCalled();
        expect(response.body.id).toBe(mockJogadorID);
        expect(response.body.email).toBe(mockJogadorEmail);
        expect(response.body.nome).toBe(mockJogadorNome);
        expect(response.body.telefone).toBe(mockJogadorTelefone);
        expect(response.body.senha).toBe(mockJogadorSenha);
    })

    it("Try to find an existing Jogador using field id (From Controller layer)", async () => {
        const mockRequest = {
            params: {
                id: mockJogadorID
            }
        }

        await mockJogadorController.findByID(mockRequest, response);
        expect(response.status).toHaveBeenCalledWith(200);
        expect(response.json).toHaveBeenCalled();
        expect(response.body.id).toBe(mockJogadorID);
        expect(response.body.email).toBe(mockJogadorEmail);
        expect(response.body.nome).toBe(mockJogadorNome);
        expect(response.body.telefone).toBe(mockJogadorTelefone);
        expect(response.body.senha).toBe(mockJogadorSenha);
    })

    it("Receiving an unexpected error during findByEmail operation, should return HttpError 500 (From Controller layer)", async () => {
        //Não passando o o driver e configs do banco, o banco irá falhar durante a operação de select
        const mockJogadorController = new JogadorController(new JogadorService(new JogadorRepository()))

        const mockRequest = {
            body: {
                "email": `"${mockJogadorEmail}"`,
            }
        }

        await mockJogadorController.findByEmail(mockRequest, response);
        expect(response.status).toHaveBeenCalledWith(500);
        expect(response.json).toHaveBeenCalled();


    })

    it("Receiving an unexpected error during findByID operation, should return HttpError 500 (From Controller layer)", async () => {
        //Não passando o o driver e configs do banco, o banco irá falhar durante a operação de select
        const mockJogadorController = new JogadorController(new JogadorService(new JogadorRepository()));

        const mockRequest = {
            params: {
                id: mockJogadorID
            }
        }

        await mockJogadorController.findByID(mockRequest, response);
        expect(response.status).toHaveBeenCalledWith(500);
        expect(response.json).toHaveBeenCalled();
    })



})
