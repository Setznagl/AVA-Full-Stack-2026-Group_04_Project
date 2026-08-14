import { useState, useRef, useEffect } from "react";
import "./InputHorario.css";

const HORAS = Array.from({ length: 16 }, (_, i) => String(i + 7).padStart(2, "0")); // 07 a 21
const MINUTOS = Array.from({ length: 60 }, (_, i) => String(i).padStart(2, "0")); // 00 a 59

function InputHorario({ label, id, value, onChange }) {
  const [aberto, setAberto] = useState(false);
  const containerRef = useRef(null);

  const [horaAtual, minutoAtual] = value ? value.split(":") : ["", ""];

  useEffect(() => {
    function handleClickFora(event) {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setAberto(false);
      }
    }
    document.addEventListener("mousedown", handleClickFora);
    return () => document.removeEventListener("mousedown", handleClickFora);
  }, []);

  const handleSelectHora = (h) => {
    const min = minutoAtual || "00";
    onChange(`${h}:${min}`);
  };

  const handleSelectMinuto = (m) => {
    const h = horaAtual || "12";
    onChange(`${h}:${m}`);
  };

  return (
    <div className="input-horario-container" ref={containerRef}>
      {label && <label htmlFor={id}>{label}</label>}

      <div
        id={id}
        tabIndex={0}
        className={`input-horario-field ${aberto ? "ativo" : ""}`}
        onClick={() => setAberto(!aberto)}
        onKeyDown={(e) => e.key === "Enter" && setAberto(!aberto)}
      >
        <span className={value ? "valor-texto" : "placeholder-texto"}>
          {value || "--:--"}
        </span>
        <span className="icone-relogio">🕒</span>
      </div>

      {aberto && (
        <div className="horario-dropdown-popover">
          <div className="popover-coluna">
            <span className="popover-titulo">HORA</span>
            <div className="popover-grid horas-grid">
              {HORAS.map((h) => (
                <button
                  key={h}
                  type="button"
                  className={`btn-opcao-hora ${
                    horaAtual === h ? "selecionado-azul" : ""
                  }`}
                  onClick={() => handleSelectHora(h)}
                >
                  {h}
                </button>
              ))}
            </div>
          </div>

          <div className="popover-coluna">
            <span className="popover-titulo">MINUTO</span>
            <div className="popover-grid minutos-grid">
              {MINUTOS.map((m) => (
                <button
                  key={m}
                  type="button"
                  className={`btn-opcao-minuto ${
                    minutoAtual === m ? "selecionado-laranja" : ""
                  }`}
                  onClick={() => handleSelectMinuto(m)}
                >
                  :{m}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default InputHorario;