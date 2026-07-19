import express from "express";
import {JogadorService, unicJogadorServiceInstance} from "../service/JogadorService.ts";
import type {jogador} from "../generated/prisma/client.ts";
import {HttpError} from "../exception/HttpError.ts";

export class JogadorController {

    //Injetando a dependência: Controller depende das funções do Service
    private jogadorService: JogadorService;
    constructor( provided_jogadorService: JogadorService = unicJogadorServiceInstance) {
        this.jogadorService = provided_jogadorService;
    }

    async insertJogador(request: express.Request, response: express.Response):Promise<void> {
        const { nome, email, telefone, senha } = request.body;

        const requestOutput: jogador | HttpError = await this.jogadorService
            .insertJogador(nome, email, telefone, senha);

        requestOutput instanceof HttpError
            ? response.status(requestOutput.statusCode).json(requestOutput)
            : response.status(201).json(requestOutput);
    }

    async findByEmail(request: express.Request, response: express.Response):Promise<void> {
        const { email } = request.body;

        const requestOutput: jogador | HttpError | null = await this.jogadorService
            .findByEmail(email);

        requestOutput instanceof HttpError
            ? response.status(requestOutput.statusCode).json(requestOutput)
            : response.status(200).json(requestOutput);
    }

    async findByID(request: express.Request, response: express.Response):Promise<void> {
        const { id } = request.params;

        const requestOutput: jogador | HttpError = await this.jogadorService
            .findByID(Number(id));

        requestOutput instanceof HttpError
            ? response.status(requestOutput.statusCode).json(requestOutput)
            : response.status(200).json(requestOutput);
    }

    async findAll(_request: express.Request, response: express.Response):Promise<void> {
        const requestOutput: jogador[] | HttpError = await this.jogadorService.findAll();

        requestOutput instanceof HttpError
            ? response.status(requestOutput.statusCode).json(requestOutput)
            : response.status(200).json(requestOutput);
    }

    async updateJogador(request: express.Request, response: express.Response):Promise<void> {
        const { id , nome, email, telefone, senha } = request.body;

        const requestOutput: jogador | HttpError = await this.jogadorService
            .updateJogador(Number(id), nome, email, telefone, senha);

        requestOutput instanceof HttpError
            ? response.status(requestOutput.statusCode).json(requestOutput)
            : response.status(202).json(requestOutput);
    }

    async deleteJogador(request: express.Request, response: express.Response):Promise<void> {
        const { id } = request.params;

        const requestOutput: jogador | HttpError = await this.jogadorService
            .deleteJogador(Number(id));

        requestOutput instanceof HttpError
            ? response.status(requestOutput.statusCode).json(requestOutput)
            : response.status(204).json();
    }

}

export const unicJogadorController = new JogadorController();