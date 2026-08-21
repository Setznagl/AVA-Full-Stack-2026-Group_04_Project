import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import ModalConfirmacao from "../../components/ModalConfirmacao/ModalConfirmacao";
import { buscarReservasPorJogador, cancelarReserva } from "../../services/ReservaService";
import "./HomeLogadaPage.css";

const formatarMesDia = (dataIso) => {
  if (!dataIso) return { mes: "---", dia: "--" };
  const dataLimpa = dataIso.includes("T") ? dataIso.split("T")[0] : dataIso;
  const [ano, mesNum, dia] = dataLimpa.split("-");
  const data = new Date(Number(ano), Number(mesNum) - 1, Number(dia));

  const mesExtenso = data.toLocaleDateString("pt-BR", { month: "short" }).replace(".", "");
  return {
    mes: mesExtenso.toUpperCase(),
    dia: dia,
  };
};

const formatarHora = (horaIso) => {
  if (!horaIso) return "--:--";
  return horaIso.slice(11, 16);
};

function CardReservaAtiva({ reserva, onAbrirModalExclusao }) {
  const [menuAberto, setMenuAberto] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    function handleClickFora(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuAberto(false);
      }
    }
    if (menuAberto) {
      document.addEventListener("mousedown", handleClickFora);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickFora);
    };
  }, [menuAberto]);

  const handleEditar = () => {
    setMenuAberto(false);
    navigate("/reservar", {
      state: {
        quadra: {
          id: reserva.quadra_id || reserva.quadra?.id,
          nome: reserva.quadra?.nome || "Quadra",
          imagem: reserva.quadra?.imagem || "/placeholder-quadra.jpg",
          localizacao: reserva.quadra?.localizacao || reserva.quadra?.localidade || "Localização não informada",
          modalidade: reserva.quadra?.modalidade || "Modalidade",
        },
        reservaParaEditar: {
          id: reserva.id,
          data: reserva.data?.includes("T") ? reserva.data.split("T")[0] : reserva.data,
          horarioInicio: formatarHora(reserva.horarioInicio || reserva.horario_inicio),
          horarioFim: formatarHora(reserva.horarioFim || reserva.horario_fim),
        },
      },
    });
  };

  const handleExcluir = () => {
    setMenuAberto(false);
    onAbrirModalExclusao(reserva);
  };

  const { mes, dia } = formatarMesDia(reserva.data);
  const horaInicio = formatarHora(reserva.horarioInicio || reserva.horario_inicio);
  const horaFim = formatarHora(reserva.horarioFim || reserva.horario_fim);

  return (
    <div className="card-reserva-dashboard">
      <div className="card-data-badge">
        <span className="badge-mes">{mes}</span>
        <span className="badge-dia">{dia}</span>
      </div>

      <div className="card-conteudo-info">
        <h4 className="card-quadra-titulo">{reserva.quadra?.nome || "Nome da Quadra"}</h4>
        <p className="card-quadra-loc">{reserva.quadra?.localizacao || reserva.quadra?.localidade || "Localização"}</p>
        <div className="card-horario-tag">
          <span className="icone-relogio">🕒</span>
          <span>{horaInicio} - {horaFim}</span>
        </div>
      </div>

      <div className="card-menu-container" ref={menuRef}>
        <button
          type="button"
          className="btn-kebab"
          onClick={() => setMenuAberto((prev) => !prev)}
          aria-label="Opções da reserva"
        >
          ⋮
        </button>

        {menuAberto && (
          <div className="dropdown-kebab-menu">
            <button type="button" onClick={handleEditar} className="dropdown-opcao">
              Editar
            </button>
            <button type="button" onClick={handleExcluir} className="dropdown-opcao opcao-excluir">
              Excluir
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function HomeLogadaPage() {
  const [nomeUsuario] = useState(() => localStorage.getItem("nomeUsuario") || "Clara");
  const [reservas, setReservas] = useState([]);
  const [carregando, setCarregando] = useState(() => Boolean(localStorage.getItem("jogadorId")));
  
  const [reservaParaExcluir, setReservaParaExcluir] = useState(null);
  const [excluindo, setExcluindo] = useState(false);
  
  const navigate = useNavigate();

  useEffect(() => {
    let ativo = true;
    const jogadorId = localStorage.getItem("jogadorId");

    if (!jogadorId) {
      return;
    }

    async function buscarDados() {
      try {
        const dados = await buscarReservasPorJogador(Number(jogadorId));
        if (ativo && Array.isArray(dados)) {
          setReservas(dados);
        }
      } catch (erro) {
        console.error("Erro ao carregar reservas:", erro);
      } finally {
        if (ativo) {
          setCarregando(false);
        }
      }
    }

    buscarDados();

    return () => {
      ativo = false;
    };
  }, []);

  const handleConfirmarExclusao = async () => {
    if (!reservaParaExcluir) return;

    try {
      setExcluindo(true);
      await cancelarReserva(reservaParaExcluir.id);
      setReservas((prev) => prev.filter((r) => r.id !== reservaParaExcluir.id));
      setReservaParaExcluir(null);
    } catch (erro) {
      console.error("Erro ao cancelar reserva:", erro);
      alert("Não foi possível excluir a reserva. Tente novamente.");
    } finally {
      setExcluindo(false);
    }
  };

const proximoJogoInfo = reservas.length > 0 ? formatarMesDia(reservas[0].data) : null;
  const proximoJogoHora = reservas.length > 0 
    ? formatarHora(reservas[0].horarioInicio || reservas[0].horario_inicio) 
    : "";

  const proximoJogoTexto = reservas.length > 0
    ? `Próximo jogo: ${proximoJogoInfo.dia} de ${proximoJogoInfo.mes.toLowerCase()} às ${proximoJogoHora}`
    : "Você não possui jogos agendados";

  return (
    <div className="home-logada-wrapper">
      <Navbar />

      <main className="container home-logada-main">
        <section className="hero-banner-azul">
          <div className="hero-conteudo">
            <h1 className="hero-titulo">Bem-vindo, {nomeUsuario}!</h1>
            <p className="hero-descricao">
              Acompanhe seus próximos jogos, gerencie seus horários e agende novas partidas em poucos cliques.
            </p>

            <div className="hero-tag-proximo">
              <span>{proximoJogoTexto}</span>
            </div>

            <button
              type="button"
              className="btn-agendar-hero"
              onClick={() => navigate("/quadras")}
            >
              Agendar Horário
            </button>
          </div>

          <div className="hero-ilustracao" aria-hidden="true">
            <svg viewBox="0 0 200 200" className="svg-raquete">
              <circle cx="140" cy="140" r="24" fill="currentColor" opacity="0.3" />
              <path
                d="M120 40 C90 40 70 60 70 90 C70 110 80 125 95 135 L40 190 C35 195 30 195 25 190 C20 185 20 180 25 175 L80 120 C70 105 70 85 80 70 C90 55 105 40 120 40 Z"
                fill="currentColor"
                opacity="0.3"
              />
            </svg>
          </div>
        </section>

        <section className="secao-reservas-ativas">
          <h2 className="titulo-secao">Reservas Ativas</h2>

          {carregando ? (
            <p className="mensagem-status">Carregando suas reservas...</p>
          ) : reservas.length === 0 ? (
            <div className="sem-reservas-box">
              <p>Você não possui nenhuma reserva ativa no momento.</p>
              <button type="button" className="btn-link-agendar" onClick={() => navigate("/quadras")}>
                Buscar quadras disponíveis →
              </button>
            </div>
          ) : (
            <div className="carrossel-reservas-wrapper">
              <button
                type="button"
                className="btn-seta-nav seta-esquerda"
                onClick={() => {
                  document.getElementById("lista-cards-scroll")?.scrollBy({ left: -280, behavior: "smooth" });
                }}
                aria-label="Rolar para esquerda"
              >
                ‹
              </button>

              <div className="lista-cards-scroll" id="lista-cards-scroll">
                {reservas.map((reserva) => (
                  <CardReservaAtiva
                    key={reserva.id}
                    reserva={reserva}
                    onAbrirModalExclusao={(res) => setReservaParaExcluir(res)}
                  />
                ))}
              </div>

              <button
                type="button"
                className="btn-seta-nav seta-direita"
                onClick={() => {
                  document.getElementById("lista-cards-scroll")?.scrollBy({ left: 280, behavior: "smooth" });
                }}
                aria-label="Rolar para direita"
              >
                ›
              </button>
            </div>
          )}
        </section>
      </main>

      <ModalConfirmacao
        isOpen={Boolean(reservaParaExcluir)}
        carregando={excluindo}
        onCancelar={() => setReservaParaExcluir(null)}
        onConfirmar={handleConfirmarExclusao}
      />

      <Footer />
    </div>
  );
}

export default HomeLogadaPage;