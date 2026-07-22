import express from "express";
import { ReservaService, unicReservaServiceInstance } from "../service/ReservaService.ts";
import type { reserva } from "../generated/prisma/client.ts";
import { HttpError } from "../exception/HttpError.ts";

type DadosHorarioReserva = { data: Date; horarioInicio: Date; horarioFim: Date };
type DadosReserva = DadosHorarioReserva & { jogadorId: number; quadraId: number };

export class ReservaController {
  private reservaService: ReservaService;

  constructor(providedReservaService: ReservaService = unicReservaServiceInstance) {
    this.reservaService = providedReservaService;
  }

  private idValido(value: unknown): number | null {
    const id = Number(value);
    return Number.isInteger(id) && id > 0 ? id : null;
  }

  private dataValida(value: unknown): Date | null {
    if (typeof value !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return null;
    const data = new Date(`${value}T00:00:00.000Z`);
    return Number.isNaN(data.getTime()) || data.toISOString().slice(0, 10) !== value ? null : data;
  }

  private horarioValido(value: unknown): Date | null {
    if (typeof value !== "string") return null;
    const horario = value.match(/^(\d{2}):(\d{2})(?::(\d{2}))?$/);
    if (horario) {
      const [, hora, minuto, segundo = "00"] = horario;
      if (Number(hora) > 23 || Number(minuto) > 59 || Number(segundo) > 59) return null;
      return new Date(`1970-01-01T${hora}:${minuto}:${segundo}.000Z`);
    }
    const data = new Date(value);
    return Number.isNaN(data.getTime()) ? null : data;
  }

  private dadosReserva(body: unknown): DadosReserva | HttpError {
    if (!body || typeof body !== "object") return new HttpError(400, "O corpo da requisição é obrigatório.", "controller");
    const { jogador_id, quadra_id, data, horario_inicio, horario_fim } = body as Record<string, unknown>;
    const jogadorId = this.idValido(jogador_id);
    const quadraId = this.idValido(quadra_id);
    const dataReserva = this.dataValida(data);
    const horarioInicio = this.horarioValido(horario_inicio);
    const horarioFim = this.horarioValido(horario_fim);
    if (!jogadorId || !quadraId || !dataReserva || !horarioInicio || !horarioFim) {
      return new HttpError(400, "Informe jogador_id, quadra_id, data (AAAA-MM-DD), horario_inicio e horario_fim válidos.", "controller");
    }
    if (horarioFim.getTime() <= horarioInicio.getTime()) {
      return new HttpError(400, "horario_fim deve ser posterior a horario_inicio.", "controller");
    }
    return { jogadorId, quadraId, data: dataReserva, horarioInicio, horarioFim };
  }

  private dadosAtualizacao(body: unknown): DadosHorarioReserva | HttpError {
    if (!body || typeof body !== "object") return new HttpError(400, "O corpo da requisição é obrigatório.", "controller");
    const campos = body as Record<string, unknown>;
    if ("jogador_id" in campos || "quadra_id" in campos) {
      return new HttpError(400, "jogador_id e quadra_id não podem ser alterados em uma reserva.", "controller");
    }
    const data = this.dataValida(campos.data);
    const horarioInicio = this.horarioValido(campos.horario_inicio);
    const horarioFim = this.horarioValido(campos.horario_fim);
    if (!data || !horarioInicio || !horarioFim) {
      return new HttpError(400, "Informe data (AAAA-MM-DD), horario_inicio e horario_fim válidos.", "controller");
    }
    if (horarioFim.getTime() <= horarioInicio.getTime()) {
      return new HttpError(400, "horario_fim deve ser posterior a horario_inicio.", "controller");
    }
    return { data, horarioInicio, horarioFim };
  }

  private responder(response: express.Response, output: reserva | reserva[] | HttpError | null, successStatus = 200): void {
    if (output instanceof HttpError) {
      response.status(output.statusCode).json(output);
      return;
    }
    response.status(successStatus).json(output);
  }

  async insertReserva(request: express.Request, response: express.Response): Promise<void> {
    const dados = this.dadosReserva(request.body);
    if (dados instanceof HttpError) return this.responder(response, dados);
    this.responder(response, await this.reservaService.insertReserva(dados.jogadorId, dados.quadraId, dados.data, dados.horarioInicio, dados.horarioFim), 201);
  }

  async findByID(request: express.Request, response: express.Response): Promise<void> {
    const id = this.idValido(request.params.id);
    if (!id) return this.responder(response, new HttpError(400, "ID inválido.", "controller"));
    this.responder(response, await this.reservaService.findByID(id));
  }

  async findByJogadorID(request: express.Request, response: express.Response): Promise<void> {
    const id = this.idValido(request.params.jogador_id);
    if (!id) return this.responder(response, new HttpError(400, "jogador_id inválido.", "controller"));
    this.responder(response, await this.reservaService.findByJogadorId(id));
  }

  async findByQuadraID(request: express.Request, response: express.Response): Promise<void> {
    const id = this.idValido(request.params.quadra_id);
    if (!id) return this.responder(response, new HttpError(400, "quadra_id inválido.", "controller"));
    this.responder(response, await this.reservaService.findByQuadraId(id));
  }

  async findByData(request: express.Request, response: express.Response): Promise<void> {
    const data = this.dataValida(request.query.data);
    if (!data) return this.responder(response, new HttpError(400, "O parâmetro data deve estar no formato AAAA-MM-DD.", "controller"));
    this.responder(response, await this.reservaService.findByData(data));
  }

  async findAll(_request: express.Request, response: express.Response): Promise<void> {
    this.responder(response, await this.reservaService.findAll());
  }

  async updateReserva(request: express.Request, response: express.Response): Promise<void> {
    const id = this.idValido(request.params.id);
    if (!id) return this.responder(response, new HttpError(400, "ID inválido.", "controller"));
    const dados = this.dadosAtualizacao(request.body);
    if (dados instanceof HttpError) return this.responder(response, dados);
    this.responder(response, await this.reservaService.updateReserva(id, dados.data, dados.horarioInicio, dados.horarioFim));
  }

  async deleteReserva(request: express.Request, response: express.Response): Promise<void> {
    const id = this.idValido(request.params.id);
    if (!id) return this.responder(response, new HttpError(400, "ID inválido.", "controller"));
    const output = await this.reservaService.deleteReserva(id);
    if (output instanceof HttpError) return this.responder(response, output);
    response.status(204).send();
  }
}

export const unicReservaController = new ReservaController();
