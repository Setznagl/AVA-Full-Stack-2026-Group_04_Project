import express from "express";
import {JogadorService, unicJogadorServiceInstance} from "../service/JogadorService.ts";

export class JogadorController {

    //Injetando as dependências (camada anterior)
    private jogadorService: JogadorService;
    constructor( provided_jogadorService: JogadorService = unicJogadorServiceInstance) {
        this.jogadorService = provided_jogadorService;
    }

    async insertJogador(request: express.Request, response: express.Response) {
        const { nome, email, telefone, senha } = request.body;

        await this.jogadorService.insertJogador(nome, email, telefone, senha)
            .then(
                (result) => {
                    if (result instanceof Error) {
                        response.status(
                            //Enviei o código HTTP do erro pela mensagem do erro, estamos recuperando.
                            parseInt(result.message)
                        ).send({ message: result.message, cause: result.cause });
                    } else {
                        response.status(201).send(result);
                    }
            })
            .catch((error) => {
                response.status(500).send({ message: "Internal Server Error", error: error.message });
            });
    }

}