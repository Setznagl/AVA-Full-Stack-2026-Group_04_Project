// noinspection DuplicatedCode

import {HttpError} from "../exception/HttpError.js"
import mock_Prisma_Client_Configurado from "../../src/tests/mock/mock_PrismaClient.js"
import {unicQuadraControllerInstance} from "../controller/QuadraController.js";
import {QuadraRepository} from "../repository/QuadraRepository.js";
import {QuadraService} from "../service/QuadraService.js";
import {QuadraController} from "../controller/QuadraController.js";

beforeAll( async () => {
    await mock_Prisma_Client_Configurado.reserva.deleteMany()
    await mock_Prisma_Client_Configurado.quadra.deleteMany()
})

describe("QuadraRepository:", () => {

    const mockQuadraRepository = new QuadraRepository(mock_Prisma_Client_Configurado);

    let mockQuadraID = 0;
    let mockQuadraNome = "";
    let mockQuadraModalidade = "";
    let mockQuadraLocalizacao= "";

    it("Should insert and return a new Quadra", async () => {
        let mockInsert = await mockQuadraRepository.insertQuadra(
            "Quadra Teste",
            "Futebol",
            "Centro"
        )
        if (mockInsert instanceof HttpError) {
            throw mockInsert
        }

        expect(mockInsert).toHaveProperty("id");
        expect(mockInsert).toHaveProperty("nome", "Quadra Teste");
        expect(mockInsert).toHaveProperty("modalidade", "Futebol");
        expect(mockInsert).toHaveProperty("localizacao", "Centro");

        mockQuadraID = mockInsert.id;
        mockQuadraNome = mockInsert.nome;
        mockQuadraModalidade = mockInsert.modalidade;
        mockQuadraLocalizacao = mockInsert.localizacao;

    })

    it("Retry insert: Should return HttpError 423 due unique constraint violation", async () => {
        try {
            await mockQuadraRepository.insertQuadra(
                "Quadra Teste",
                "Futebol",
                "Centro"
            );
        } catch (error) {
            if (error instanceof HttpError) {
                expect(error.statusCode).toBe(423);
                expect(error.message).toBe("Register already exists.");
            } else {
                throw error;
            }
        }


    })

    it("Receiving an unexpected error during insertQuadra operation, should return HttpError 500", async () => {
        const mockQuadraRepository = new QuadraRepository(undefined);

        const mockError = await mockQuadraRepository.insertQuadra(
            "Quadra Teste",
            "Futebol",
            "Centro"
        );

        expect(mockError).toBeInstanceOf(HttpError);
        if (mockError instanceof HttpError) {
            expect(mockError.statusCode).toBe(500);
        }

    })

    it("Try to receive multiple data using findAll", async () => {
        const mockFind = await mockQuadraRepository.findAll();
        if (mockFind instanceof HttpError) {
            throw mockFind
        }

        expect(Array.isArray(mockFind)).toBe(true);
        expect(mockFind).toEqual(expect.arrayContaining([
            expect.objectContaining({
                id: mockQuadraID,
                nome: mockQuadraNome,
                modalidade: mockQuadraModalidade,
                localizacao: mockQuadraLocalizacao
            })
        ]));
    })

    it("Receiving an unexpected error during findAll operation, should return HttpError 500", async () => {
        const mockQuadraRepository = new QuadraRepository(undefined);

        const mockError = await mockQuadraRepository.findAll();

        expect(mockError).toBeInstanceOf(HttpError);
        if (mockError instanceof HttpError) {
            expect(mockError.statusCode).toBe(500);
        }

    })

    it("Try to find an existing Quadra using field id", async () => {
        const mockFind = await mockQuadraRepository.findById(mockQuadraID);
        if (mockFind instanceof HttpError) {
            throw mockFind
        }

        expect(mockFind).toHaveProperty("id", mockQuadraID);
        expect(mockFind).toHaveProperty("nome", mockQuadraNome);
        expect(mockFind).toHaveProperty("modalidade", mockQuadraModalidade);
        expect(mockFind).toHaveProperty("localizacao", mockQuadraLocalizacao);
    })

    it("Receiving an unexpected error during findById operation, should return HttpError 500", async () => {
        const mockQuadraRepository = new QuadraRepository(undefined);

        const mockError = await mockQuadraRepository.findById(mockQuadraID);
        expect(mockError).toBeInstanceOf(HttpError);
        if (mockError instanceof HttpError) {
            expect(mockError.statusCode).toBe(500);
        }
    })

    it("Try to find an existing Quadra using field nome", async () => {
        const mockFind = await mockQuadraRepository.findByNome(mockQuadraNome);
        if (mockFind instanceof HttpError) {
            throw mockFind
        }

        expect(mockFind).toHaveProperty("id", mockQuadraID);
        expect(mockFind).toHaveProperty("nome", mockQuadraNome);
        expect(mockFind).toHaveProperty("modalidade", mockQuadraModalidade);
        expect(mockFind).toHaveProperty("localizacao", mockQuadraLocalizacao);
    })

    it("Receiving an unexpected error during findByNome operation, should return HttpError 500", async () => {
        const mockQuadraRepository = new QuadraRepository(undefined);

        const mockError = await mockQuadraRepository.findByNome(mockQuadraNome);
        expect(mockError).toBeInstanceOf(HttpError);
        if (mockError instanceof HttpError) {
            expect(mockError.statusCode).toBe(500);
        }
    })

    it("Try to find an existing Quadra using field modalidade", async () => {
        const mockFind = await mockQuadraRepository.findByModalidade(mockQuadraModalidade);
        if (mockFind instanceof HttpError) {
            throw mockFind
        }

        expect(Array.isArray(mockFind)).toBe(true);
        expect(mockFind).toEqual(expect.arrayContaining([
            expect.objectContaining({
                id: mockQuadraID,
                nome: mockQuadraNome,
                modalidade: mockQuadraModalidade,
                localizacao: mockQuadraLocalizacao
            })
        ]));
    })

    it("Receiving an unexpected error during findByModalidade operation, should return HttpError 500", async () => {
        const mockQuadraRepository = new QuadraRepository(undefined);

        const mockError = await mockQuadraRepository.findByModalidade(mockQuadraModalidade);
        expect(mockError).toBeInstanceOf(HttpError);
        if (mockError instanceof HttpError) {
            expect(mockError.statusCode).toBe(500);
        }
    })

    it("Try to update an existing Quadra using field id", async () => {
        const mockFind = await mockQuadraRepository.updateQuadra(
            mockQuadraID,
            "Quadra Teste Atualizada",
            "Futebol",
            "Centro"
        )
        if (mockFind instanceof HttpError) {
            throw mockFind
        }

        expect(mockFind).toHaveProperty("id", mockQuadraID);
        expect(mockFind).toHaveProperty("nome", "Quadra Teste Atualizada");
        expect(mockFind).toHaveProperty("modalidade", mockQuadraModalidade);
        expect(mockFind).toHaveProperty("localizacao", mockQuadraLocalizacao);

        mockQuadraNome = "Quadra Teste Atualizada"
    })

    it("Try to update a non-existing Quadra using field id", async () => {
        const mockFind = await mockQuadraRepository.updateQuadra(
            mockQuadraID + 1,
            "Quadra Teste Atualizada",
            "Futebol",
            "Centro"
        )
        expect(mockFind).toBeInstanceOf(HttpError);
        if (mockFind instanceof HttpError) {
            expect(mockFind.statusCode).toBe(404);
            expect(mockFind.message).toBe("Register not found.");
        }
    })

    it("Try to delete an existing Jogador using field id", async () => {
        const mockDelete = await mockQuadraRepository.deleteQuadra(mockQuadraID)
        if (mockDelete instanceof HttpError) {
            throw mockDelete
        }

        expect(mockDelete).toHaveProperty("id", mockQuadraID);
        expect(mockDelete).toHaveProperty("nome", mockQuadraNome);
        expect(mockDelete).toHaveProperty("modalidade", mockQuadraModalidade);
        expect(mockDelete).toHaveProperty("localizacao", mockQuadraLocalizacao);
    })

    it("Receiving an unexpected error during deleteQuadra operation, should return HttpError 500", async () => {
        const mockQuadraRepository = new QuadraRepository(undefined);

        const mockError = await mockQuadraRepository.deleteQuadra(mockQuadraID);
        expect(mockError).toBeInstanceOf(HttpError);
        if (mockError instanceof HttpError) {
            expect(mockError.statusCode).toBe(500);
        }
    })

    it("Try to insert sending invalid types for any field", async () => {
        const mockInsert = await mockQuadraRepository.insertQuadra(
            "Quadra Teste 2 ",
            // @ts-expect-error
            123.9882,
            "Centro"
        )
        expect(mockInsert).toBeInstanceOf(HttpError);
        if (mockInsert instanceof HttpError) {
            expect(mockInsert.statusCode).toBe(502);
            expect(mockInsert.message).toBe("Invalid provided type for one or more parameters");
        }
    })

    it("Try to findById sending invalid types for any field", async () => {
        const mockFind = await mockQuadraRepository.findById(
            // @ts-expect-error
            "not_a_number"
        )
        expect(mockFind).toBeInstanceOf(HttpError);
        if (mockFind instanceof HttpError) {
            expect(mockFind.statusCode).toBe(502);
            expect(mockFind.message).toBe("Invalid provided type for one or more parameters");
        }
    })

    it("Try to findByNome sending invalid types for any field", async () => {
        const mockFind = await mockQuadraRepository.findByNome(
            // @ts-expect-error
            123.9882
        )
        expect(mockFind).toBeInstanceOf(HttpError);
        if (mockFind instanceof HttpError) {
            expect(mockFind.statusCode).toBe(502);
            expect(mockFind.message).toBe("Invalid provided type for one or more parameters");
        }
    })

    it("Try to findByModalidade sending invalid types for any field", async () => {
        const mockFind = await mockQuadraRepository.findByModalidade(
            // @ts-expect-error
            123.9882
        )
        expect(mockFind).toBeInstanceOf(HttpError);
        if (mockFind instanceof HttpError) {
            expect(mockFind.statusCode).toBe(502);
            expect(mockFind.message).toBe("Invalid provided type for one or more parameters");
        }
    })

    it("Try to update sending invalid types for any field", async () => {
        const mockFind = await mockQuadraRepository.updateQuadra(
            mockQuadraID,
            mockQuadraNome,
            // @ts-expect-error
            123.9882,
            "Centro"
        )
        expect(mockFind).toBeInstanceOf(HttpError);
        if (mockFind instanceof HttpError) {
            expect(mockFind.statusCode).toBe(502);
            expect(mockFind.message).toBe("Invalid provided type for one or more parameters");
        }
    })

    it("Try to delete sending invalid types for any field", async () => {
        const mockFind = await mockQuadraRepository.deleteQuadra(
            // @ts-expect-error
            "not_a_number"
        )
        expect(mockFind).toBeInstanceOf(HttpError);
        if (mockFind instanceof HttpError) {
            expect(mockFind.statusCode).toBe(502);
            expect(mockFind.message).toBe("Invalid provided type for one or more parameters");
        }
    })

})

describe("QuadraService:", () => {

    const mockQuadraService = new QuadraService(new QuadraRepository(mock_Prisma_Client_Configurado));

    let mockQuadraID = 0;
    let mockQuadraNome = "";
    let mockQuadraModalidade = "";
    let mockQuadraLocalizacao = "";

    it("Should insert and return a new Quadra (From Service layer)", async () => {
        const mockInsert = await mockQuadraService.insertQuadra(
            "Quadra Teste Service",
            "Futebol",
            "Centro"
        )
        if (mockInsert instanceof HttpError) {
            throw mockInsert
        }

        expect(mockInsert).toHaveProperty("id");
        expect(mockInsert).toHaveProperty("nome", "Quadra Teste Service");
        expect(mockInsert).toHaveProperty("modalidade", "Futebol");
        expect(mockInsert).toHaveProperty("localizacao", "Centro");

        mockQuadraID = mockInsert.id;
        mockQuadraNome = mockInsert.nome;
        mockQuadraModalidade = mockInsert.modalidade;
        mockQuadraLocalizacao = mockInsert.localizacao;
    })

    it("Retry insert: Should return HttpError 423 due unique constraint violation" +
        " (From Service layer)\n Custom Expected Message: " +
        "\"Não foi possível criar uma nova Quadra porque o nome já está em uso\"", async () => {

        const mockInsert = await mockQuadraService.insertQuadra(
            "Quadra Teste Service",
            "Futebol",
            "Centro"
        )
        expect(mockInsert).toBeInstanceOf(HttpError);
        if (mockInsert instanceof HttpError) {
            expect(mockInsert.statusCode).toBe(423);
            expect(mockInsert.message).toBe("Não foi possível criar uma nova Quadra porque o nome já está em uso");
        }
    })

    it("Try to find an existing Quadra using field 'id'(From Service layer)", async () => {
        const mockFind = await mockQuadraService.findById(mockQuadraID);
        if (mockFind instanceof HttpError) {
            throw mockFind
        }

        expect(mockFind).toHaveProperty("id", mockQuadraID);
        expect(mockFind).toHaveProperty("nome", mockQuadraNome);
        expect(mockFind).toHaveProperty("modalidade", mockQuadraModalidade);
        expect(mockFind).toHaveProperty("localizacao", mockQuadraLocalizacao);
    })

    it("Try to find an existing Quadra using field 'nome' (From Service layer)", async () => {
        const mockFind = await mockQuadraService.findByNome(mockQuadraNome);
        if (mockFind instanceof HttpError) {
            throw mockFind
        }

        expect(mockFind).toHaveProperty("id", mockQuadraID);
        expect(mockFind).toHaveProperty("nome", mockQuadraNome);
        expect(mockFind).toHaveProperty("modalidade", mockQuadraModalidade);
        expect(mockFind).toHaveProperty("localizacao", mockQuadraLocalizacao);
    })

    it("Try to find an existing Quadra using field 'modalidade' (From Service layer)", async () => {
        const mockFind = await mockQuadraService.findByModalidade(mockQuadraModalidade);
        if (mockFind instanceof HttpError) {
            throw mockFind
        }

        expect(Array.isArray(mockFind)).toBe(true);
        expect(mockFind).toEqual(expect.arrayContaining([
            expect.objectContaining({
                id: mockQuadraID,
                nome: mockQuadraNome,
                modalidade: mockQuadraModalidade,
                localizacao: mockQuadraLocalizacao
            })
        ]));
    })

    it("Try to receive multiple data using findAll (From Service layer)", async () => {
        const mockFind = await mockQuadraService.findAll();
        if (mockFind instanceof HttpError) {
            throw mockFind
        }

        expect(Array.isArray(mockFind)).toBe(true);
        expect(mockFind).toEqual(expect.arrayContaining([
            expect.objectContaining({
                id: mockQuadraID,
                nome: mockQuadraNome,
                modalidade: mockQuadraModalidade,
                localizacao: mockQuadraLocalizacao
            })
        ]));
    })

    it("Try to update an existing Quadra using field id (From Service layer)", async () => {
        const mockFind = await mockQuadraService.updateQuadra(
            mockQuadraID,
            "Quadra Teste Service Atualizada",
            mockQuadraModalidade,
            mockQuadraLocalizacao,
        )
        if (mockFind instanceof HttpError) {
            throw mockFind
        }

        expect(mockFind).toHaveProperty("id", mockQuadraID);
        expect(mockFind).toHaveProperty("nome", "Quadra Teste Service Atualizada");
        expect(mockFind).toHaveProperty("modalidade", mockQuadraModalidade);
        expect(mockFind).toHaveProperty("localizacao", mockQuadraLocalizacao);

        mockQuadraNome = mockFind.nome;
    })

    it("Retry to update with the same data to check if (oldData.nome === provided_nome) (From Service layer)", async () => {
        const mockFind = await mockQuadraService.updateQuadra(
            mockQuadraID,
            mockQuadraNome,
            "Volley",
            "Area Leste",
        )
        if (mockFind instanceof HttpError) {
            throw mockFind
        }

        expect(mockFind).toHaveProperty("id", mockQuadraID);
        expect(mockFind).toHaveProperty("nome", mockQuadraNome);
        expect(mockFind).toHaveProperty("modalidade", "Volley");
        expect(mockFind).toHaveProperty("localizacao", "Area Leste");

        mockQuadraModalidade = mockFind.modalidade;
        mockQuadraLocalizacao = mockFind.localizacao;
    })

    it("Try to update a non-existing Quadra using field id (From Service layer)\n" +
        "Custom Expected Message: Impossível atualizar os dados da Quadra porque o registro informado não existe", async () => {

        const mockFind = await mockQuadraService.updateQuadra(
            mockQuadraID + 1,
            "Quadra Teste Service Atualizada",
            mockQuadraModalidade,
            mockQuadraLocalizacao,
        )
        expect(mockFind).toBeInstanceOf(HttpError);
        if (mockFind instanceof HttpError) {
            expect(mockFind.statusCode).toBe(404);
            expect(mockFind.message).toBe("Impossível atualizar os dados da Quadra porque o registro informado não existe");
        }
    })

    it("Try to delete unexisting Quadra (From Service layer)", async () => {
        const mockError = await mockQuadraService.deleteQuadra(mockQuadraID + 1);
        expect(mockError).toBeInstanceOf(HttpError);
        if (mockError instanceof HttpError) {
            expect(mockError.statusCode).toBe(404);
            expect(mockError.message).toBe("Não foi possível deletar a Quadra porque o registro não foi encontrado");
        }
    })

    it("Try to delete a Quadra using field 'id' (From Service layer)", async () => {
        const mockFind = await mockQuadraService.deleteQuadra(mockQuadraID);
        if (mockFind instanceof HttpError) {
            throw mockFind
        }

        expect(mockFind).toHaveProperty("id", mockQuadraID);
        expect(mockFind).toHaveProperty("nome", mockQuadraNome);
        expect(mockFind).toHaveProperty("modalidade", mockQuadraModalidade);
        expect(mockFind).toHaveProperty("localizacao", mockQuadraLocalizacao);
    })

    it("Receiving an unexpected error during updateQuadra operation, should return HttpError 500 (From Service layer)", async () => {
        const mockQuadraService = new QuadraService(new QuadraRepository(undefined));

        const mockFind = await mockQuadraService.updateQuadra(
            mockQuadraID,
            "Quadra Teste Service Atualizada",
            mockQuadraModalidade,
            mockQuadraLocalizacao,
        )
        expect(mockFind).toBeInstanceOf(HttpError);
        if (mockFind instanceof HttpError) {
            expect(mockFind.statusCode).toBe(500);
        }
    })

})

describe("QuadraController:", () => {

    const mockQuadraController = unicQuadraControllerInstance;

    let mockQuadraID = 0;
    let mockQuadraNome = "";
    let mockQuadraModalidade = "";
    let mockQuadraLocalizacao = "";

    //Usei a IA pra me ajudar a simular o comportamento do Response do Express pros testes
    const response = {
        body: undefined,
        status: jest.fn().mockReturnThis(),
        json: jest.fn(function (data) {
            this.body = data;
            return this;
        })
    } as any;

    it("Should insert and return a new Quadra (From Controller layer)", async () => {

        const mockRequest = {
            body: {
                nome: "Quadra Teste Controller",
                modalidade: "Futebol",
                localizacao: "Centro"
            }
        } as any;

        await mockQuadraController.insertQuadra(mockRequest, response)

        expect(response.status).toHaveBeenCalledWith(201);
        expect(response.body).toHaveProperty("id");
        expect(response.body).toHaveProperty("nome", "Quadra Teste Controller");
        expect(response.body).toHaveProperty("modalidade", "Futebol");
        expect(response.body).toHaveProperty("localizacao", "Centro");

        mockQuadraID = response.body.id;
        mockQuadraNome = response.body.nome;
        mockQuadraModalidade = response.body.modalidade;
        mockQuadraLocalizacao = response.body.localizacao;

    })

    it("Retry insert: Should return HttpError 423 due unique constraint violation (From Controller layer)", async () => {
        const mockRequest = {
            body: {
                nome: mockQuadraNome,
                modalidade: mockQuadraModalidade,
                localizacao: mockQuadraLocalizacao,
            }
        } as any

        await mockQuadraController.insertQuadra(mockRequest, response)
        expect(response.status).toHaveBeenCalledWith(423);
        expect(response.body).toHaveProperty("message", "Não foi possível criar uma nova Quadra porque o nome já está em uso");
        expect(response.body).toHaveProperty("statusCode", 423);
    })

    it("Try to find an existing Quadra using field 'id'" , async () => {
        const mockRequest = {
            params: {
                id: mockQuadraID,
            }
        } as any;    

        await mockQuadraController.findById(mockRequest, response)
        expect(response.status).toHaveBeenCalledWith(200);
        expect(response.body).toHaveProperty("id", mockQuadraID);
        expect(response.body).toHaveProperty("nome", mockQuadraNome);
        expect(response.body).toHaveProperty("modalidade", mockQuadraModalidade);
        expect(response.body).toHaveProperty("localizacao", mockQuadraLocalizacao);
    })

    it("Try to find an existing Quadra using field 'nome'" , async () => {
        const mockRequest = {
            params: {
                nome: mockQuadraNome,
            }

        } as any;

        await mockQuadraController.findByNome(mockRequest, response)
        expect(response.status).toHaveBeenCalledWith(200);
        expect(response.body).toHaveProperty("id", mockQuadraID);
        expect(response.body).toHaveProperty("nome", mockQuadraNome);
        expect(response.body).toHaveProperty("modalidade", mockQuadraModalidade);
        expect(response.body).toHaveProperty("localizacao", mockQuadraLocalizacao);

    })

    it("Try to receive multiple data using findModalidade", async () =>{
        const mockRequest = {
            params: {
                modalidade: mockQuadraModalidade,
            }

        } as any

        await mockQuadraController.findByModalidade(mockRequest, response)
        expect(response.status).toHaveBeenCalledWith(200);
        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body).toEqual(expect.arrayContaining([
            expect.objectContaining({
                id: mockQuadraID,
                nome: mockQuadraNome,
                modalidade: mockQuadraModalidade,
                localizacao: mockQuadraLocalizacao
            })
        ]));
    })

    it("Try to receive multiple data using findAll", async () =>{
        const mockRequest = {
            body: {}
        } as any

        await mockQuadraController.findAll(mockRequest, response)
        expect(response.status).toHaveBeenCalledWith(200);
        expect(Array.isArray(response.body)).toBe(true);
    })

    it("Try to update an existing Jogador using field id", async () => {
        const mockRequest = {
            params: {
                id: mockQuadraID,
            }, body:{
                nome: "Quadra Teste Controller Atualizada",
                modalidade: mockQuadraModalidade,
                localizacao: mockQuadraLocalizacao,
            }
        } as any

        await mockQuadraController.updateQuadra(mockRequest, response)
        expect(response.status).toHaveBeenCalledWith(202);
        expect(response.body).toHaveProperty("id", mockQuadraID);
        expect(response.body).toHaveProperty("nome", "Quadra Teste Controller Atualizada");
        expect(response.body).toHaveProperty("modalidade", mockQuadraModalidade);
        expect(response.body).toHaveProperty("localizacao", mockQuadraLocalizacao);

        mockQuadraNome = "Quadra Teste Controller Atualizada";
    })

    it("Try to delete an existing Quadra using field id (From Controller layer)", async () => {
        const mockRequest = {
            params: {
                id: mockQuadraID,
            }
        } as any

        await mockQuadraController.deleteQuadra(mockRequest, response)
        expect(response.status).toHaveBeenCalledWith(204);
        expect(response.body).toHaveProperty("id");
        expect(response.body).toHaveProperty("nome");
        expect(response.body).toHaveProperty("modalidade");
        expect(response.body).toHaveProperty("localizacao");
    })

    it("Receiving an unexpected error during insertQuadra operation, should return HttpError 500 (From Controller layer)", async () => {
        const mockQuadraController: QuadraController = new QuadraController(new QuadraService(new QuadraRepository(undefined)));

        const mockRequest = {
            body: {
                nome: "Quadra Teste Controller",
                modalidade: "Futebol",
                localizacao: "Centro"
            }
        } as any;

        await mockQuadraController.insertQuadra(mockRequest, response)
        expect(response.status).toHaveBeenCalledWith(500);
        expect(response.json).toHaveBeenCalled();
    })

    it("Receiving an unexpected error during findById operation, should return HttpError 500 (From Controller layer)", async () => {
        const mockQuadraController = new QuadraController(new QuadraService(new QuadraRepository(undefined)));

        const mockRequest = {
            params: {
                id: mockQuadraID,
            }

        } as any;

        await mockQuadraController.findById(mockRequest, response)
        expect(response.status).toHaveBeenCalledWith(500);
        expect(response.json).toHaveBeenCalled();
    })

    it("Receiving an unexpected error during findByNome operation, should return HttpError 500 (From Controller layer)", async () => {
        const mockQuadraController: QuadraController = new QuadraController(new QuadraService(new QuadraRepository(undefined)));

        const mockRequest = {
            params: {
                nome: mockQuadraNome,
            }

        } as any;

        await mockQuadraController.findByNome(mockRequest, response)
        expect(response.status).toHaveBeenCalledWith(500);
        expect(response.json).toHaveBeenCalled();
    })

    it("Receiving an unexpected error during findByModalidade operation, should return HttpError 500 (From Controller layer)", async () => {
        const mockQuadraController: QuadraController = new QuadraController(new QuadraService(new QuadraRepository(undefined)));

        const mockRequest = {
            params: {
                modalidade: mockQuadraModalidade,
            }

        } as any;

        await mockQuadraController.findByModalidade(mockRequest, response)
        expect(response.status).toHaveBeenCalledWith(500);
        expect(response.json).toHaveBeenCalled();
    })

    it("Receiving an unexpected error during findAll operation, should return HttpError 500 (From Controller layer)", async () => {
        const mockQuadraController: QuadraController = new QuadraController(new QuadraService(new QuadraRepository(undefined)));

        const mockRequest = {
            body: {}
        } as any;

        await mockQuadraController.findAll(mockRequest, response)
        expect(response.status).toHaveBeenCalledWith(500);
        expect(response.json).toHaveBeenCalled();
    })

    it("Receiving an unexpected error during updateQuadra operation, should return HttpError 500 (From Controller layer)", async () => {
        const mockQuadraController: QuadraController = new QuadraController(new QuadraService(new QuadraRepository(undefined)));

        const mockRequest = {
            params: {
                id: mockQuadraID,
            }, body:{
                nome: mockQuadraNome,
                modalidade: mockQuadraModalidade,
                localizacao: mockQuadraLocalizacao,
            }

        } as any;

        await mockQuadraController.updateQuadra(mockRequest, response)
        expect(response.status).toHaveBeenCalledWith(500);
        expect(response.json).toHaveBeenCalled();

    })

    it("Receiving an unexpected error during deleteQuadra operation, should return HttpError 500 (From Controller layer)", async () => {
        const mockQuadraController: QuadraController = new QuadraController(new QuadraService(new QuadraRepository(undefined)));

        const mockRequest = {
            params: {
                id: mockQuadraID,
            }

        } as any;

        await mockQuadraController.deleteQuadra(mockRequest, response)
        expect(response.status).toHaveBeenCalledWith(500);
        expect(response.json).toHaveBeenCalled();
    })

    it("Try to find an existing Quadra using field 'id' but sending a non-number value" , async () => {
        const mockRequest = {
            params: {
                id: "not_a_number",
            }
        } as any;

        await mockQuadraController.findById(mockRequest, response)
        expect(response.status).toHaveBeenCalledWith(400);
        expect(response.body).toHaveProperty("statusCode", 400);
        expect(response.body).toHaveProperty("message", "Invalid path parameter");
    })

    it("Try to find an existing Quadra using field 'nome' but sending a non-string value" , async () => {
        const mockRequest = {
            params: {
                nome: 123.21,
            }
        } as any;

        const mockError = await mockQuadraController.findByNome(mockRequest, response)
        expect(mockError instanceof HttpError).toBe(true);
        if(mockError instanceof HttpError){
            expect(mockError.statusCode).toBe(400);
            expect(mockError.message).toBe("Invalid path parameter");
        }
    })

    it("Try to find an existing Quadra using field 'modalidade' but sending a non-string value" , async () => {
        const mockRequest = {
            params: {
                modalidade: 123.21,
            }
        } as any;

        const mockError = await mockQuadraController.findByModalidade(mockRequest, response)
        expect(mockError instanceof HttpError).toBe(true);
        if(mockError instanceof HttpError){
            expect(mockError.statusCode).toBe(400);
            expect(mockError.message).toBe("Invalid path parameter");
        }
    })

    it("Try to update an existing Quadra using field id but sending a non-number value" , async () => {
        const mockRequest = {
            params: {
                id: "not_a_number",
            },body:{
                nome: mockQuadraNome,
                modalidade: mockQuadraModalidade,
                localizacao: mockQuadraLocalizacao,
            }
        } as any;

        await mockQuadraController.updateQuadra(mockRequest, response)
        expect(response.status).toHaveBeenCalledWith(400);
        expect(response.body).toHaveProperty("statusCode", 400);
        expect(response.body).toHaveProperty("message", "Invalid path parameter");
    })

    it("Try to delete an existing Quadra using field id but sending a non-number value" , async () => {
        const mockRequest = {
            params: {
                id: "not_a_number",
            }
        } as any;

        await mockQuadraController.deleteQuadra(mockRequest, response)
        expect(response.status).toHaveBeenCalledWith(400);
        expect(response.body).toHaveProperty("statusCode", 400);
        expect(response.body).toHaveProperty("message", "Invalid path parameter");
    })


})

