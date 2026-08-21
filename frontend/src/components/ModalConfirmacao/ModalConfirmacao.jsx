import "./ModalConfirmacao.css";

function ModalConfirmacao({
  isOpen,
  titulo = "Excluir Reserva",
  mensagem = "Tem certeza que deseja excluir reserva?",
  textoConfirmar = "Confirmar",
  textoCancelar = "Cancelar",
  tipo = "perigo",
  carregando = false,
  onConfirmar,
  onCancelar,
}) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onCancelar}>
      <div
        className="modal-container"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        <h3 className="modal-titulo">{titulo}</h3>
        <div className="modal-descricao">{mensagem}</div>

        <div className="modal-acoes">
          <button
            type="button"
            className="btn-modal-cancelar"
            onClick={onCancelar}
            disabled={carregando}
          >
            {textoCancelar}
          </button>

          <button
            type="button"
            className={`btn-modal-confirmar ${tipo === "perigo" ? "btn-perigo" : ""}`}
            onClick={onConfirmar}
            disabled={carregando}
          >
            {carregando ? "Processando..." : textoConfirmar}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ModalConfirmacao;
