import express from "express";
import bcrypt from 'bcryptjs';
import {JogadorService, unicJogadorServiceInstance} from "../service/JogadorService.ts";
import type {jogador} from "../generated/prisma/client.ts";
import {HttpError} from "../exception/HttpError.ts";

export class JogadorController {

    private jogadorService: JogadorService;
    constructor( provided_jogadorService: JogadorService) {
        this.jogadorService = provided_jogadorService;
    }

    async insertJogador(request: express.Request, response: express.Response):Promise<void> {
        const { nome, email, telefone, senha } = request.body;
        const hashSenha = bcrypt.hashSync(senha, 10);

        const requestOutput: jogador | HttpError = await this.jogadorService
            .insertJogador(nome, email, telefone, hashSenha);

        requestOutput instanceof HttpError
            ? response.status(requestOutput.statusCode).json(requestOutput)
            : response.status(201).json(requestOutput);
    }

    async findByID(request: express.Request, response: express.Response):Promise<HttpError | void> {
        const { id } = request.params;

        if(!id || isNaN(Number(id)) || Array.isArray(id)) {
            response.status(400).json(new HttpError(400, 'Invalid path parameter', "controller"));
            return;
        }

        const requestOutput: jogador | HttpError | null = await this.jogadorService
            .findByID(Number(id));

        requestOutput instanceof HttpError
            ? response.status(requestOutput.statusCode).json(requestOutput)
            : response.status(200).json(requestOutput);
    }

    async findByEmail(request: express.Request, response: express.Response):Promise<HttpError | void> {
        const { email } = request.params;

        if(!email || typeof email !== "string" || Array.isArray(email) ){
            response.status(400).json(new HttpError(400, 'Invalid path parameter', "controller"));
            return;
        }

        const requestOutput: jogador | HttpError | null = await this.jogadorService
            .findByEmail(email);

        requestOutput instanceof HttpError
            ? response.status(requestOutput.statusCode).json(requestOutput)
            : response.status(200).json(requestOutput);
    }

    async findAll(_request: express.Request, response: express.Response):Promise<void> {
        const requestOutput: jogador[] | HttpError | null = await this.jogadorService.findAll();

        requestOutput instanceof HttpError
            ? response.status(requestOutput.statusCode).json(requestOutput)
            : response.status(200).json(requestOutput);
    }

    async updateJogador(request: express.Request, response: express.Response):Promise<HttpError | void> {
        const { id } = request.params;
        const { nome, email, telefone, senha } = request.body;

        if(!id || isNaN(Number(id)) || Array.isArray(id)) {
            response.status(400).json(new HttpError(400, 'Invalid path parameter', "controller"));
            return;
        }
        const hashSenha = bcrypt.hashSync(senha, 10);

        const requestOutput: jogador | HttpError = await this.jogadorService
            .updateJogador(Number(id), nome, email, telefone, hashSenha);

        requestOutput instanceof HttpError
            ? response.status(requestOutput.statusCode).json(requestOutput)
            : response.status(202).json(requestOutput);
    }

    async deleteJogador(request: express.Request, response: express.Response):Promise<HttpError | void> {
        const { id } = request.params;

        if(!id || isNaN(Number(id)) || Array.isArray(id)) {
            response.status(400).json(new HttpError(400, 'Invalid path parameter', "controller"));
            return;
        }

        const requestOutput: jogador | HttpError = await this.jogadorService
            .deleteJogador(Number(id));

        requestOutput instanceof HttpError
            ? response.status(requestOutput.statusCode).json(requestOutput)
            : response.status(204).json();
    }

}

export const unicJogadorControllerInstance = new JogadorController(unicJogadorServiceInstance);