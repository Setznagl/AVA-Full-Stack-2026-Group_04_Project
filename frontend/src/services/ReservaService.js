import api from "./Api";

export const criarReserva = async ({
  jogador_id,
  jogadorId,
  quadra_id,
  quadraId,
  data,
  horario_inicio,
  horarioInicio,
  horario_fim,
  horarioFim,
}) => {
  const payload = {
    jogador_id: Number(jogador_id || jogadorId),
    quadra_id: Number(quadra_id || quadraId),
    data,
    horario_inicio: horario_inicio || horarioInicio,
    horario_fim: horario_fim || horarioFim,
    horarioInicio: horarioInicio || horario_inicio,
    horarioFim: horarioFim || horario_fim,
  };

  const { data: resposta } = await api.post("/v1/reserva", payload);
  return resposta;
};

export const buscarReservaPorId = async (id) => {
  const { data } = await api.get(`/v1/reserva/${id}`);
  return data;
};

export const buscarReservasPorJogador = async (jogadorId) => {
  const { data } = await api.get(`/v1/reserva/jogador/${jogadorId}`);
  return data;
};

export const buscarReservasPorQuadra = async (quadraId) => {
  const { data } = await api.get(`/v1/reserva/quadra/${quadraId}`);
  return data;
};

export const buscarReservasPorData = async (dataISO) => {
  const { data } = await api.get(`/v1/reserva/data/${dataISO}`);
  return data;
};

export const obterTodasReservas = async () => {
  const { data } = await api.get("/v1/reserva-many");
  return data;
};

export const atualizarReserva = async (
  id,
  { data: dataReserva, horario_inicio, horarioInicio, horario_fim, horarioFim }
) => {
  const payload = {
    data: dataReserva,
    horario_inicio: horario_inicio || horarioInicio,
    horario_fim: horario_fim || horarioFim,
  };

  const { data } = await api.put(`/v1/reserva/${id}`, payload);
  return data;
};

export const cancelarReserva = async (id) => {
  const { data } = await api.delete(`/v1/reserva/${id}`);
  return data;
}; 