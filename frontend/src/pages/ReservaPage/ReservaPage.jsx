import { useCallback, useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import Button from "../../components/Button/Button";
import CalendarioCustom from "../../components/CalendarioCustom/CalendarioCustom";
import InputHorario from "../../components/InputHorario/InputHorario";
import { criarReserva, atualizarReserva } from "../../services/ReservaService";
import "./ReservaPage.css";

const getHoje = () => {
  const hoje = new Date();
  const ano = hoje.getFullYear();
  const mes = String(hoje.getMonth() + 1).padStart(2, "0");
  const dia = String(hoje.getDate()).padStart(2, "0");
  return `${ano}-${mes}-${dia}`;
};

const getHorarioAtual = () => {
  const agora = new Date();
  return `${String(agora.getHours()).padStart(2, "0")}:${String(
    agora.getMinutes(),
  ).padStart(2, "0")}`;
};

const formatarDataExtenso = (dataIso) => {
  if (!dataIso) return "";
  const [ano, mes, dia] = dataIso.split("-");
  const data = new Date(Number(ano), Number(mes) - 1, Number(dia));

  const texto = data.toLocaleDateString("pt-BR", {
    weekday: "short",
    day: "numeric",
    month: "long",
  });

  const textoSemPonto = texto.replace(".", "");
  return textoSemPonto.charAt(0).toUpperCase() + textoSemPonto.slice(1);
};

const criarData = (data) => `${data}T00:00:00Z`;
const criarDataHora = (data, horario) => `${data}T${horario}:00Z`;

const calcularDuracaoEmMinutos = (horarioInicio, horarioFim) => {
  const [inicioHora, inicioMinuto] = horarioInicio.split(":").map(Number);
  const [fimHora, fimMinuto] = horarioFim.split(":").map(Number);
  return fimHora * 60 + fimMinuto - (inicioHora * 60 + inicioMinuto);
};

const formatarDuracao = (minutos) => {
  if (minutos <= 0) return "";
  const horas = Math.floor(minutos / 60);
  const minutosRestantes = minutos % 60;
  if (horas === 0) return `${minutosRestantes}min`;
  if (minutosRestantes === 0) return `${horas}h`;
  return `${horas}h${String(minutosRestantes).padStart(2, "0")}min`;
};

const getJogadorId = () => {
  const valor = localStorage.getItem("jogadorId");
  const id = Number(valor);
  return valor !== null && Number.isInteger(id) && id > 0 ? id : null;
};

function ReservaForm({ quadraInfo, reservaParaEditar, navigate }) {
  const isEdicao = Boolean(reservaParaEditar?.id);
  const quadraId = quadraInfo?.id;
  const reservaId = reservaParaEditar?.id;

  const [dataSelecionada, setDataSelecionada] = useState(
    reservaParaEditar?.data || getHoje(),
  );
  const [horarioInicio, setHorarioInicio] = useState(
    reservaParaEditar?.horarioInicio || "",
  );
  const [horarioFim, setHorarioFim] = useState(
    reservaParaEditar?.horarioFim || "",
  );
  const [mensagemErro, setMensagemErro] = useState("");
  const [mensagemSucesso, setMensagemSucesso] = useState("");
  const [carregando, setCarregando] = useState(false);

  const localidade =
    quadraInfo?.localidade ??
    quadraInfo?.localizacao ??
    "Localização não informada";

  const hoje = getHoje();
  const ehHoje = dataSelecionada === hoje;
  const horarioAtual = getHorarioAtual();

  const horarioInicioNoPassado =
    ehHoje && Boolean(horarioInicio) && horarioInicio < horarioAtual;

  const horarioFimInvalido =
    Boolean(horarioInicio) &&
    Boolean(horarioFim) &&
    horarioFim <= horarioInicio;

  const duracaoEmMinutos =
    horarioInicio && horarioFim && !horarioFimInvalido
      ? calcularDuracaoEmMinutos(horarioInicio, horarioFim)
      : 0;

  const duracao = useMemo(
    () => formatarDuracao(duracaoEmMinutos),
    [duracaoEmMinutos],
  );

  const isHorarioInvalido = horarioInicioNoPassado || horarioFimInvalido;
  const reservaIncompleta =
    !dataSelecionada || !horarioInicio || !horarioFim || isHorarioInvalido;

  const limparMensagens = useCallback(() => {
    setMensagemErro("");
    setMensagemSucesso("");
  }, []);

  const validarFormulario = useCallback(() => {
    if (!dataSelecionada || !horarioInicio || !horarioFim) {
      return "Preencha a data e os horários para continuar.";
    }
    if (horarioInicioNoPassado) {
      return "O horário de início não pode estar no passado.";
    }
    if (horarioFimInvalido) {
      return "O horário de término deve ser posterior ao horário de início.";
    }
    if (duracaoEmMinutos < 60) {
      return "A reserva deve ter no mínimo 1 hora.";
    }
    return null;
  }, [
    dataSelecionada,
    horarioInicio,
    horarioFim,
    horarioInicioNoPassado,
    horarioFimInvalido,
    duracaoEmMinutos,
  ]);

  const handleSalvarReserva = useCallback(
    async (event) => {
      event.preventDefault();
      limparMensagens();

      const erroValidacao = validarFormulario();
      if (erroValidacao) {
        setMensagemErro(erroValidacao);
        return;
      }

      const jogadorId = getJogadorId();
      if (!jogadorId) {
        setMensagemErro("Faça login para continuar.");
        return;
      }

      try {
        setCarregando(true);

        if (isEdicao) {
          await atualizarReserva(reservaId, {
            data: criarData(dataSelecionada),
            horario_inicio: criarDataHora(dataSelecionada, horarioInicio),
            horario_fim: criarDataHora(dataSelecionada, horarioFim),
          });
          setMensagemSucesso("Reserva atualizada com sucesso!");
        } else {
          await criarReserva({
            jogador_id: jogadorId,
            quadra_id: quadraId,
            data: criarData(dataSelecionada),
            horarioInicio: criarDataHora(dataSelecionada, horarioInicio),
            horarioFim: criarDataHora(dataSelecionada, horarioFim),
          });
          setMensagemSucesso("Reserva confirmada com sucesso!");
          setHorarioInicio("");
          setHorarioFim("");
        }

        setTimeout(() => {
          navigate("/home");
        }, 1500);

      } catch (erro) {
        console.error("Erro ao salvar reserva:", erro);
        const mensagemApi =
          erro?.response?.data?.message ?? erro?.response?.data?.mensagem;
        const mensagemSegura =
          typeof mensagemApi === "string" ? mensagemApi : null;
        setMensagemErro(
          mensagemSegura ||
            mensagemApi ||
            "Não foi possível salvar a reserva. Tente novamente mais tarde.",
        );
      } finally {
        setCarregando(false);
      }
    },
    [
      limparMensagens,
      validarFormulario,
      isEdicao,
      reservaId,
      quadraId,
      dataSelecionada,
      horarioInicio,
      horarioFim,
      navigate,
    ],
  );

  return (
    <div className="reserva-page-wrapper">
      <Navbar />

      <main className="container reserva-main">
        <section className="quadra-card" aria-label="Informações da Quadra">
          <div className="quadra-imagem-container">
            <img
              src={quadraInfo.imagem}
              alt={`Imagem da ${quadraInfo.nome}`}
              className="quadra-imagem"
            />
          </div>
          <div className="quadra-detalhes">
            <h1 className="quadra-titulo">
              {isEdicao ? `Editar Reserva — ${quadraInfo.nome}` : quadraInfo.nome}
            </h1>
            <p className="quadra-localizacao">{localidade}</p>
            <span className="quadra-badge">{quadraInfo.modalidade}</span>
          </div>
        </section>

        <form onSubmit={handleSalvarReserva} noValidate>
          <div className="reserva-grid">
            <section className="reserva-box" aria-label="Selecione a data">
              <CalendarioCustom
                dataSelecionada={dataSelecionada}
                onSelectData={(novaData) => {
                  limparMensagens();
                  setDataSelecionada(novaData);
                }}
                minData={hoje}
              />
            </section>

            <section className="reserva-box" aria-labelledby="titulo-horario">
              <h2 className="box-titulo" id="titulo-horario">
                Horário da reserva
              </h2>

              <InputHorario
                label="Horário de início"
                id="horario-inicio"
                value={horarioInicio}
                onChange={(novoValor) => {
                  limparMensagens();
                  setHorarioInicio(novoValor);
                }}
              />

              <InputHorario
                label="Horário de término"
                id="horario-fim"
                value={horarioFim}
                onChange={(novoValor) => {
                  limparMensagens();
                  setHorarioFim(novoValor);
                }}
              />

              {isHorarioInvalido && (
                <p className="alerta-erro" role="alert">
                  Verifique se o horário final é maior que o inicial e se o
                  horário de início não está no passado.
                </p>
              )}
            </section>
          </div>

          {mensagemErro && (
            <div className="mensagem-erro-card" role="alert">
              {mensagemErro}
            </div>
          )}

          {mensagemSucesso && (
            <div className="mensagem-sucesso-card" role="status">
              {mensagemSucesso}
            </div>
          )}

          <section
            className="reserva-resumo-card"
            aria-label="Resumo e confirmação da reserva"
          >
            <div className="resumo-detalhes">
              <div className="resumo-coluna">
                <span className="resumo-label">DATA SELECIONADA</span>
                <span className="resumo-valor">
                  {formatarDataExtenso(dataSelecionada)}
                </span>
              </div>
              <div className="resumo-coluna">
                <span className="resumo-label">HORÁRIO E DURAÇÃO</span>
                <span className="resumo-valor">
                  {horarioInicio && horarioFim
                    ? `${horarioInicio} — ${horarioFim}${
                        duracao ? ` (${duracao})` : ""
                      }`
                    : "Selecione os horários"}
                </span>
              </div>
            </div>
            <div className="resumo-acao">
              <Button
                as="button"
                type="submit"
                disabled={reservaIncompleta || carregando}
              >
                {carregando
                  ? isEdicao
                    ? "Atualizando..."
                    : "Confirmando..."
                  : isEdicao
                  ? "Atualizar reserva"
                  : "Confirmar reserva →"}
              </Button>
            </div>
          </section>
        </form>
      </main>
      <Footer />
    </div>
  );
}

function ReservaPage() {
  const { state } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!state?.quadra) {
      navigate("/quadras", { replace: true });
    }
  }, [state, navigate]);

  if (!state?.quadra) {
    return null;
  }

  return (
    <ReservaForm
      quadraInfo={state.quadra}
      reservaParaEditar={state?.reservaParaEditar}
      navigate={navigate}
    />
  );
}

export default ReservaPage;