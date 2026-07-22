import { ReservaRepository, unicReservaRepositoryInstance } from "../repository/ReservaRepository.ts";
import type { reserva } from "../generated/prisma/client.ts";
import { HttpError } from "../exception/HttpError.ts";

export class ReservaService {
  private reservaRepository: ReservaRepository = unicReservaRepositoryInstance;

  private mesmaData(primeira: Date, segunda: Date): boolean {
    return primeira.toISOString().slice(0, 10) === segunda.toISOString().slice(0, 10);
  }

  private haConflito(reservas: reserva[], data: Date, inicio: Date, fim: Date, ignorarId?: number): boolean {
    return reservas.some((existente) => existente.id !== ignorarId && this.mesmaData(existente.data, data) && inicio.getTime() < existente.horario_fim.getTime() && fim.getTime() > existente.horario_inicio.getTime());
  }

  private async validarReferencias(jogadorId: number, quadraId: number): Promise<HttpError | null> {
    const [jogador, quadra] = await Promise.all([this.reservaRepository.jogadorExiste(jogadorId), this.reservaRepository.quadraExiste(quadraId)]);
    if (jogador instanceof HttpError) return jogador;
    if (quadra instanceof HttpError) return quadra;
    if (!jogador) return new HttpError(404, "Jogador não encontrado.", "service");
    if (!quadra) return new HttpError(404, "Quadra não encontrada.", "service");
    return null;
  }

  private async validarConflitos(jogadorId: number, quadraId: number, data: Date, inicio: Date, fim: Date, ignorarId?: number): Promise<HttpError | null> {
    const [reservasQuadra, reservasJogador] = await Promise.all([this.reservaRepository.findByQuadraID(quadraId), this.reservaRepository.findByJogadorID(jogadorId)]);
    if (reservasQuadra instanceof HttpError) return reservasQuadra;
    if (reservasJogador instanceof HttpError) return reservasJogador;
    if (this.haConflito(reservasQuadra, data, inicio, fim, ignorarId)) return new HttpError(409, "Quadra já possui uma reserva neste horário.", "service");
    if (this.haConflito(reservasJogador, data, inicio, fim, ignorarId)) return new HttpError(409, "Jogador já possui uma reserva neste horário.", "service");
    return null;
  }

  async insertReserva(jogadorId: number, quadraId: number, data: Date, inicio: Date, fim: Date): Promise<reserva | HttpError> {
    const referencias = await this.validarReferencias(jogadorId, quadraId);
    if (referencias) return referencias;
    const conflitos = await this.validarConflitos(jogadorId, quadraId, data, inicio, fim);
    if (conflitos) return conflitos;
    return this.reservaRepository.insertReserva(jogadorId, quadraId, data, inicio, fim);
  }

  async findByID(id: number): Promise<reserva | HttpError> {
    const encontrada = await this.reservaRepository.findByID(id);
    if (encontrada instanceof HttpError) return encontrada;
    return encontrada ?? new HttpError(404, "Reserva não encontrada.", "service");
  }
  async findByJogadorId(id: number): Promise<reserva[] | HttpError> { return this.reservaRepository.findByJogadorID(id); }
  async findByQuadraId(id: number): Promise<reserva[] | HttpError> { return this.reservaRepository.findByQuadraID(id); }
  async findByData(data: Date): Promise<reserva[] | HttpError> { return this.reservaRepository.findByData(data); }
  async findAll(): Promise<reserva[] | HttpError> { return this.reservaRepository.findAll(); }

  async updateReserva(id: number, data: Date, inicio: Date, fim: Date): Promise<reserva | HttpError> {
    const existente = await this.reservaRepository.findByID(id);
    if (existente instanceof HttpError) return existente;
    if (!existente) return new HttpError(404, "Reserva não encontrada.", "service");
    const conflitos = await this.validarConflitos(existente.jogador_id, existente.quadra_id, data, inicio, fim, id);
    if (conflitos) return conflitos;
    return this.reservaRepository.updateReserva(id, existente.jogador_id, existente.quadra_id, data, inicio, fim);
  }

  async deleteReserva(id: number): Promise<reserva | HttpError> { return this.reservaRepository.deleteReserva(id); }
}

export const unicReservaServiceInstance = new ReservaService();
