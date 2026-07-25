import express from "express";
import { QuadraService, unicQuadraServiceInstance } from "../service/QuadraService.ts";
import type { quadra } from "../generated/prisma/client.ts";
import { HttpError } from "../exception/HttpError.ts";

export class QuadraController {

    private quadraService: QuadraService;
    constructor(providedQuadraService: QuadraService ) {
        this.quadraService = providedQuadraService;
    }

    async insertQuadra(request: express.Request, response: express.Response): Promise<void> {
        const { nome, modalidade, localizacao } = request.body;

        const requestOutput: quadra | HttpError = await this.quadraService
            .insertQuadra(nome, modalidade, localizacao);

        requestOutput instanceof HttpError
            ? response.status(requestOutput.statusCode).json(requestOutput)
            : response.status(201).json(requestOutput);
    }

    async findById(request: express.Request, response: express.Response): Promise<HttpError | void> {
        const { id } = request.params;

        if(typeof id !== "number" || Array.isArray(id)) {
            return new HttpError(400, 'Invalid path parameter', "controller");
        }

        const requestOutput = await this.quadraService
            .findById(Number(id));

        requestOutput instanceof HttpError
            ? response.status(requestOutput.statusCode).json(requestOutput)
            : response.status(200).json(requestOutput);

    }

    async findByNome(request: express.Request, response: express.Response): Promise<HttpError | void> {
        const { nome } = request.params;

        if(typeof nome !== "string" || Array.isArray(nome) ){
            return new HttpError(400, 'Invalid path parameter', "controller");
        }

        const requestOutput = await this.quadraService.findByNome(nome);

        requestOutput instanceof HttpError
            ? response.status(requestOutput.statusCode).json(requestOutput)
            : response.status(200).json(requestOutput);
    }

    async findByModalidade(request: express.Request, response: express.Response): Promise<HttpError | void> {
        const {modalidade} = request.params;

        if(typeof modalidade !== "string" || Array.isArray(modalidade) ){
            return new HttpError(400, 'Invalid path parameter', "controller");
        }

        const requestOutput = await this.quadraService.findByModalidade(modalidade);

        requestOutput instanceof HttpError
            ? response.status(requestOutput.statusCode).json(requestOutput)
            : response.status(200).json(requestOutput);
    }

    async findAll(_request: express.Request, response: express.Response): Promise<void> {
        const requestOutput = await this.quadraService.findAll();

        requestOutput instanceof HttpError
            ? response.status(requestOutput.statusCode).json(requestOutput)
            : response.status(200).json(requestOutput);
    }

    async updateQuadra(request: express.Request, response: express.Response): Promise<HttpError | void> {
        const {id} = request.params;
        const {nome, modalidade, localizacao} = request.body;

        if(typeof id !== "number" || Array.isArray(id)) {
            return new HttpError(400, 'Invalid path parameter', "controller");
        }

        const requestOutput = await this.quadraService.updateQuadra(id, nome, modalidade, localizacao);

        requestOutput instanceof HttpError
            ? response.status(requestOutput.statusCode).json(requestOutput)
            : response.status(202).json(requestOutput);
    }

    async deleteQuadra(request: express.Request, response: express.Response): Promise<HttpError | void> {
        const {id} = request.params;

        if(typeof id !== "number" || Array.isArray(id)) {
            return new HttpError(400, 'Invalid path parameter', "controller");
        }

        const requestOutput = await this.quadraService.deleteQuadra(id);

        requestOutput instanceof HttpError
            ? response.status(requestOutput.statusCode).json(requestOutput)
            : response.status(204).json(requestOutput);

    }

}

export const unicQuadraControllerInstance = new QuadraController(unicQuadraServiceInstance);