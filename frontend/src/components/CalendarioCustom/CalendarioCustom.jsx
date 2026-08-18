import { useState } from "react";
import "./CalendarioCustom.css";

const MESES = [
  "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
  "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
];

const DIAS_SEMANA = ["D", "S", "T", "Q", "Q", "S", "S"];

function Calendar({ dataSelecionada, onSelectData, minData }) {
  const dataAtual = dataSelecionada ? new Date(`${dataSelecionada}T00:00:00`) : new Date();
  
  const [mesExibido, setMesExibido] = useState(dataAtual.getMonth());
  const [anoExibido, setAnoExibido] = useState(dataAtual.getFullYear());

  const handleMesAnterior = () => {
    if (mesExibido === 0) {
      setMesExibido(11);
      setAnoExibido(anoExibido - 1);
    } else {
      setMesExibido(mesExibido - 1);
    }
  };

  const handleMesProximo = () => {
    if (mesExibido === 11) {
      setMesExibido(0);
      setAnoExibido(anoExibido + 1);
    } else {
      setMesExibido(mesExibido + 1);
    }
  };

  const primeiroDiaDoMes = new Date(anoExibido, mesExibido, 1).getDay();
  const totalDiasMesAtual = new Date(anoExibido, mesExibido + 1, 0).getDate();
  const totalDiasMesAnterior = new Date(anoExibido, mesExibido, 0).getDate();

  const dias = [];

  for (let i = primeiroDiaDoMes - 1; i >= 0; i--) {
    dias.push({
      numero: totalDiasMesAnterior - i,
      outroMes: true,
      iso: null
    });
  }

  for (let d = 1; d <= totalDiasMesAtual; d++) {
    const mesStr = String(mesExibido + 1).padStart(2, "0");
    const diaStr = String(d).padStart(2, "0");
    const iso = `${anoExibido}-${mesStr}-${diaStr}`;
    
    const desabilitado = minData ? iso < minData : false;

    dias.push({
      numero: d,
      outroMes: false,
      iso,
      desabilitado
    });
  }

  return (
    <div className="calendario-custom">
      <div className="calendario-header">
        <h3 className="calendario-titulo">Selecione a Data</h3>
        <div className="calendario-navegacao">
          <button type="button" onClick={handleMesAnterior} aria-label="Mês anterior">
            ‹
          </button>
          <span className="calendario-mes-ano">
            {MESES[mesExibido]} {anoExibido}
          </span>
          <button type="button" onClick={handleMesProximo} aria-label="Próximo mês">
            ›
          </button>
        </div>
      </div>

      <div className="calendario-grid-dias">
        {DIAS_SEMANA.map((dia, index) => (
          <span key={index} className="calendario-dia-semana">
            {dia}
          </span>
        ))}
      </div>

      <div className="calendario-grid-numeros">
        {dias.map((diaObj, idx) => {
          if (diaObj.outroMes) {
            return (
              <span key={idx} className="dia-numero outro-mes">
                {diaObj.numero}
              </span>
            );
          }

          const isSelecionado = diaObj.iso === dataSelecionada;

          return (
            <button
              key={idx}
              type="button"
              disabled={diaObj.desabilitado}
              className={`dia-numero ${isSelecionado ? "selecionado" : ""}`}
              onClick={() => onSelectData(diaObj.iso)}
            >
              {diaObj.numero}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default Calendar;