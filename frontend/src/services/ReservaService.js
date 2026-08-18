import api from "./Api";

/**
 * Cria uma nova reserva
 * POST /v1/reserva
 */
export const criarReserva = async ({
  jogador_id,
  quadra_id,
  data,
  horarioInicio,
  horarioFim,
}) => {
  const payload = {
    jogador_id: Number(jogador_id),
    quadra_id: Number(quadra_id),
    data,          // ISOString ex: "2026-08-10T00:00:00"
    horarioInicio, // ISOString ex: "2026-08-10T14:00:00"
    horarioFim,    // ISOString ex: "2026-08-10T15:00:00"
  };

  const { data: resposta } = await api.post("/v1/reserva", payload);
  return resposta;
};

/**
 * Busca uma reserva por ID
 * GET /v1/reserva/:id
 */
export const buscarReservaPorId = async (id) => {
  const { data } = await api.get(`/v1/reserva/${id}`);
  return data;
};

/**
 * Lista reservas por ID do Jogador
 * GET /v1/reserva/jogador/:jogador_id
 */
export const buscarReservasPorJogador = async (jogadorId) => {
  const { data } = await api.get(`/v1/reserva/jogador/${jogadorId}`);
  return data;
};

/**
 * Lista reservas por ID da Quadra
 * GET /v1/reserva/quadra/:quadra_id
 */
export const buscarReservasPorQuadra = async (quadraId) => {
  const { data } = await api.get(`/v1/reserva/quadra/${quadraId}`);
  return data;
};

/**
 * Lista reservas por data específica
 * GET /v1/reserva/data/:data
 */
export const buscarReservasPorData = async (dataISO) => {
  const { data } = await api.get(`/v1/reserva/data/${dataISO}`);
  return data;
};

/**
 * Obtém todas as reservas
 * GET /v1/reserva-many
 */
export const obterTodasReservas = async () => {
  const { data } = await api.get("/v1/reserva-many");
  return data;
};

/**
 * Atualiza uma reserva existente
 * PUT /v1/reserva/:id
 */
export const atualizarReserva = async (
  id,
  { data: dataReserva, horario_inicio, horario_fim }
) => {
  const payload = {
    data: dataReserva,
    horario_inicio,
    horario_fim,
  };

  const { data } = await api.put(`/v1/reserva/${id}`, payload);
  return data;
};

/**
 * Deleta uma reserva por ID
 * DELETE /v1/reserva/:id
 */
export const cancelarReserva = async (id) => {
  const { data } = await api.delete(`/v1/reserva/${id}`);
  return data;
};