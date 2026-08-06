import express from "express";
import {JogadorService, unicJogadorServiceInstance} from "../service/JogadorService.ts";
import type {jogador} from "../generated/prisma/client.ts";
import {HttpError} from "../exception/HttpError.ts";
import bcrypt from "bcryptjs";

export class JogadorController {

    private jogadorService: JogadorService;
    constructor( provided_jogadorService: JogadorService) {
        this.jogadorService = provided_jogadorService;
    }

    async insertJogador(request: express.Request, response: express.Response):Promise<void> {
        const { nome, email, telefone, senha } = request.body;
        const senhaHash = await bcrypt.hash(senha, 10);

        const requestOutput: jogador | HttpError = await this.jogadorService
            .insertJogador(nome, email, telefone, senhaHash);

        if (requestOutput instanceof HttpError) {
            response.status(requestOutput.statusCode).json(requestOutput);
        } else {
            const { senha, ...jogadorSemSenha } = requestOutput;
            response.status(201).json(jogadorSemSenha);
        }
    }

    async findByID(request: express.Request, response: express.Response):Promise<void> {
        const { id } = request.params;
        const idNumero = Number(id);

        if (Array.isArray(id) || Number.isNaN(idNumero)) {
            response.status(400).json(new HttpError(400, 'Invalid path parameter', "controller"));
            return;
        }

        const requestOutput: jogador | HttpError | null = await this.jogadorService
            .findByID(idNumero);

        if (requestOutput instanceof HttpError || requestOutput === null) {
            response.status(requestOutput instanceof HttpError ? requestOutput.statusCode : 404).json(requestOutput);
        } else {
            const { senha, ...jogadorSemSenha } = requestOutput;
            response.status(200).json(jogadorSemSenha);
        }
    }

    async findByEmail(request: express.Request, response: express.Response):Promise<HttpError | void> {
        const { email } = request.params;

        if(typeof email !== "string" || Array.isArray(email) ){
            return new HttpError(400, 'Invalid path parameter', "controller");
        }

        const requestOutput: jogador | HttpError | null = await this.jogadorService
            .findByEmail(email);

        if (requestOutput instanceof HttpError || requestOutput === null) {
            response.status(requestOutput instanceof HttpError ? requestOutput.statusCode : 404).json(requestOutput);
        } else {
            const { senha, ...jogadorSemSenha } = requestOutput;
            response.status(200).json(jogadorSemSenha);
        }
    }

    async findAll(_request: express.Request, response: express.Response):Promise<void> {
        const requestOutput: jogador[] | HttpError | null = await this.jogadorService.findAll();

        if (requestOutput instanceof HttpError || requestOutput === null) {
            response.status(requestOutput instanceof HttpError ? requestOutput.statusCode : 404).json(requestOutput);
        } else {
            const listaSemSenha = requestOutput.map(({ senha, ...jogadorSemSenha }) => jogadorSemSenha);
            response.status(200).json(listaSemSenha);
        }
    }

    async updateJogador(request: express.Request, response: express.Response):Promise<void> {
        const { id } = request.params;
        const { nome, email, telefone, senha } = request.body;
        const idNumero = Number(id);

        if (Array.isArray(id) || Number.isNaN(idNumero)) {
            response.status(400).json(new HttpError(400, 'Invalid path parameter', "controller"));
            return;
        }
        const senhaHash = await bcrypt.hash(senha, 10);

        const requestOutput: jogador | HttpError = await this.jogadorService
            .updateJogador(idNumero, nome, email, telefone, senhaHash);

        if (requestOutput instanceof HttpError) {
            response.status(requestOutput.statusCode).json(requestOutput);
        } else {
            const { senha: _senha, ...jogadorSemSenha } = requestOutput;
            response.status(202).json(jogadorSemSenha);
        }
    }

    async deleteJogador(request: express.Request, response: express.Response):Promise<void> {
        const { id } = request.params;
        const idNumero = Number(id);

        if (Array.isArray(id) || Number.isNaN(idNumero)) {
            response.status(400).json(new HttpError(400, 'Invalid path parameter', "controller"));
            return;
        }

        const requestOutput: jogador | HttpError = await this.jogadorService
            .deleteJogador(idNumero);

        requestOutput instanceof HttpError
            ? response.status(requestOutput.statusCode).json(requestOutput)
            : response.status(204).json();
    }

}

export const unicJogadorControllerInstance = new JogadorController(unicJogadorServiceInstance);