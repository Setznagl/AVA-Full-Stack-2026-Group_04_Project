import { ReservaRepository, unicReservaRepositoryInstance } from "../repository/ReservaRepository.ts";
import { JogadorRepository, unicJogadorRepositoryInstance } from "../repository/JogadorRepository.ts";
import { QuadraRepository, unicQuadraRepositoryInstance } from "../repository/QuadraRepository.ts";
import type { reserva } from "../generated/prisma/client.ts";
import { HttpError } from "../exception/HttpError.ts";

export class ReservaService {

  reservaRepository: ReservaRepository;
  jogadorRepository: JogadorRepository;
  quadraRepository: QuadraRepository;

  constructor(
      providedReservaRepository: ReservaRepository,
      providedJogadorRepository: JogadorRepository,
      providedQuadraRepository: QuadraRepository,
  ) {
    this.reservaRepository = providedReservaRepository;
    this.jogadorRepository = providedJogadorRepository;
    this.quadraRepository = providedQuadraRepository;
  }

  async insertReserva(jogadorId: number, quadraId: number, data: Date, horarioInicio: Date, horarioFim: Date): Promise<reserva | HttpError> {
    const jogador = await this.jogadorRepository.findById(jogadorId);
    const quadra = await this.quadraRepository.findById(quadraId);

    if (!jogador || jogador instanceof HttpError) return new HttpError(404, "Jogador não encontrado.", "service");
    if (!quadra || quadra instanceof HttpError) return new HttpError(404, "Quadra não encontrada.", "service");

    const reservasQuadra: reserva[] = await this.reservaRepository.findByQuadraID(quadraId);
    const reservasJogador: reserva[] = await this.reservaRepository.findByJogadorID(jogadorId);

    if (reservasQuadra.some(reserva =>
        reserva.data.toISOString().slice(0, 10) === data.toISOString().slice(0, 10) &&
        horarioInicio.getTime() < reserva.horario_fim.getTime() &&
        horarioFim.getTime() > reserva.horario_inicio.getTime()
    )) {
        return new HttpError(409, "Quadra já possui uma reserva neste horário.", "service");
    }

    if (reservasJogador.some(reserva =>
        reserva.data.toISOString().slice(0, 10) === data.toISOString().slice(0, 10) &&
        horarioInicio.getTime() < reserva.horario_fim.getTime() &&
        horarioFim.getTime() > reserva.horario_inicio.getTime()
    )) {
        return new HttpError(409, "Jogador já possui uma reserva neste horário.", "service");
    }

    return this.reservaRepository.insertReserva(jogadorId, quadraId, data, horarioInicio, horarioFim);
  }

  async findById(id: number): Promise<reserva | HttpError | null> {
    return await this.reservaRepository.findByID(id);
  }

  async findByJogadorId(id: number): Promise<reserva[] | HttpError | null> {
    return this.reservaRepository.findByJogadorID(id);
  }

  async findByQuadraId(id: number): Promise<reserva[] | HttpError | null> {
    return this.reservaRepository.findByQuadraID(id);
  }

  async findByData(data: Date): Promise<reserva[] | HttpError | null> {
    return this.reservaRepository.findByData(data);
  }

  async findAll(): Promise<reserva[] | HttpError | null> {
    return this.reservaRepository.findAll();
  }

  async updateReserva(id: number, data: Date, horarioInicio: Date, horarioFim: Date): Promise<reserva | HttpError> {
    const existente = await this.reservaRepository.findByID(id);
    if (existente instanceof HttpError) return existente;
    if (!existente) return new HttpError(404, "Reserva não encontrada.", "service");

    const reservasQuadra: reserva[] = await this.reservaRepository.findByQuadraID(existente.quadra_id);
    const reservasJogador: reserva[] = await this.reservaRepository.findByJogadorID(existente.jogador_id);

    if (reservasQuadra.some(reserva =>
        reserva.id !== id &&
        reserva.data.toISOString().slice(0, 10) === data.toISOString().slice(0, 10) &&
        horarioInicio.getTime() < reserva.horario_fim.getTime() &&
        horarioFim.getTime() > reserva.horario_inicio.getTime()
    )) {
        return new HttpError(409, "Quadra já possui uma reserva neste horário.", "service");
    }

    if (reservasJogador.some(reserva =>
        reserva.id !== id &&
        reserva.data.toISOString().slice(0, 10) === data.toISOString().slice(0, 10) &&
        horarioInicio.getTime() < reserva.horario_fim.getTime() &&
        horarioFim.getTime() > reserva.horario_inicio.getTime()
    )) {
        return new HttpError(409, "Jogador já possui uma reserva neste horário.", "service");
    }

    return this.reservaRepository.updateReserva(id, existente.jogador_id, existente.quadra_id, data, horarioInicio, horarioFim);
  }

  async deleteReserva(id: number): Promise<reserva | HttpError> {
    const data: reserva | HttpError = await this.reservaRepository.deleteReserva(id);

    if (data instanceof HttpError && data.statusCode === 404) {
        data.message = "Reserva não encontrada.";
        data.layer = "service";
    }
    return data;

  }
}

export const unicReservaServiceInstance =
    new ReservaService(
        unicReservaRepositoryInstance,
        unicJogadorRepositoryInstance,
        unicQuadraRepositoryInstance
    );
