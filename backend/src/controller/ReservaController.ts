import express from "express";
import { ReservaService, unicReservaServiceInstance } from "../service/ReservaService.ts";
import type { reserva } from "../generated/prisma/client.ts";
import { HttpError } from "../exception/HttpError.ts";

export class ReservaController {

  private reservaService: ReservaService;
  constructor(providedService: ReservaService) {
    this.reservaService = providedService;
  }

    async insertReserva(request: express.Request, response: express.Response): Promise<HttpError | void> {
        const { jogador_id, quadra_id, data, horarioInicio, horarioFim } = request.body;

        const requestOutput: reserva | HttpError = await this.reservaService
            .insertReserva(jogador_id, quadra_id, data, horarioInicio, horarioFim);

        requestOutput instanceof HttpError
            ? response.status(requestOutput.statusCode).json(requestOutput)
            : response.status(201).json(requestOutput);
    }

    async findById (request: express.Request, response: express.Response): Promise<HttpError | void> {
        const { id } = request.params;

        if(!id || isNaN(Number(id)) || Array.isArray(id)) {
          response.status(400).json(new HttpError(400, 'Invalid path parameter', "controller"));
          return;
        }

        const requestOutput: reserva | HttpError | null = await this.reservaService.findById(Number(id));

        requestOutput instanceof HttpError
            ? response.status(requestOutput.statusCode).json(requestOutput)
            : response.status(200).json(requestOutput);
    }

    async findByJogadorId (request: express.Request, response: express.Response): Promise<HttpError | void> {
        const { jogador_id } = request.params;

        if(!jogador_id || isNaN(Number(jogador_id)) || Array.isArray(jogador_id)) {
          response.status(400).json(new HttpError(400, 'Invalid path parameter', "Controller"));
          return;
        }

        const requestOutput: reserva[] | HttpError | null = await this.reservaService.findByJogadorId(Number(jogador_id));

        requestOutput instanceof HttpError
            ? response.status(requestOutput.statusCode).json(requestOutput)
            : response.status(200).json(requestOutput);
    }

    async findByQuadraId (request: express.Request, response: express.Response): Promise<HttpError | void> {
        const { quadra_id } = request.params;

        if(!quadra_id || isNaN(Number(quadra_id)) || Array.isArray(quadra_id)) {
          response.status(400).json(new HttpError(400, 'Invalid path parameter', "controller"));
          return;
        }

        const requestOutput: reserva[] | null | HttpError = await this.reservaService.findByQuadraId(Number(quadra_id));

        requestOutput instanceof HttpError
            ? response.status(requestOutput.statusCode).json(requestOutput)
            : response.status(200).json(requestOutput);
    }

    async findByData (request: express.Request, response: express.Response): Promise<HttpError | void> {
        const { data } = request.params;

        if (typeof data !== "string" || Array.isArray(data)) {
            response.status(400).json(new HttpError(400, 'Invalid path parameter', "controller"));
            return;
        }

        const requestOutput: reserva[] | HttpError | null = await this.reservaService.findByData(new Date(data));

        requestOutput instanceof HttpError
            ? response.status(requestOutput.statusCode).json(requestOutput)
            : response.status(200).json(requestOutput);
    }

    async findAll (_request: express.Request, response: express.Response): Promise<HttpError | void> {
        const requestOutput: reserva[] | HttpError | null = await this.reservaService.findAll();

        requestOutput instanceof HttpError
            ? response.status(requestOutput.statusCode).json(requestOutput)
            : response.status(200).json(requestOutput);
    }

    async updateReserva(request: express.Request, response: express.Response): Promise<HttpError | void> {
        const { id } = request.params;
        const { data, horario_inicio, horario_fim } = request.body;

        const numericId = Number(id);
        if (Array.isArray(id) || isNaN(numericId)) {
            response.status(400).json(new HttpError(400, 'Invalid path parameter', "controller"));
            return;
        }

        if (
            !(data instanceof Date) || Array.isArray(data) ||
            !(horario_inicio instanceof Date) || Array.isArray(horario_inicio) ||
            !(horario_fim instanceof Date) || Array.isArray(horario_fim)
        ) {
            response.status(400).json(new HttpError(400, 'Invalid body parameter', "controller"));
            return;
        }

        const requestOutput: reserva | HttpError = await this.reservaService.updateReserva(
            numericId,
            data,
            horario_inicio,
            horario_fim
        );

        requestOutput instanceof HttpError
            ? response.status(requestOutput.statusCode).json(requestOutput)
            : response.status(202).json(requestOutput);
    }

    async deleteReserva (request: express.Request, response: express.Response): Promise<HttpError | void> {
        const { id } = request.params;

        if(!id || isNaN(Number(id)) || Array.isArray(id)) {
          response.status(400).json(new HttpError(400, 'Invalid path parameter', "controller"));
          return;
        }

        const requestOutput: reserva | HttpError = await this.reservaService.deleteReserva(Number(id));

        requestOutput instanceof HttpError
            ? response.status(requestOutput.statusCode).json(requestOutput)
            : response.status(204).json(requestOutput);
    }

}

export const unicReservaControllerInstance = new ReservaController(unicReservaServiceInstance);
