import { useNavigate } from "react-router-dom";
import Button from "../Button/Button";
import "./CardQuadra.css";

function CardQuadra({ id, imagem, modalidade, nome, localizacao }) {
  const navigate = useNavigate();

  const handleReservar = () => {
    navigate("/reservar", {
      state: {
        quadra: { id, nome, modalidade, localizacao, imagem },
      },
    });
  };
  
  return (
    <div className="card-quadra">
      {/* Imagem do topo */}
      <img src={imagem} alt={`Foto da ${nome}`} className="card-quadra__imagem" />

      {/* Conteúdo do card */}
      <div className="card-quadra__conteudo">
        <span className="card-quadra__modalidade">{modalidade}</span>
        
        <h3 className="card-quadra__nome">{nome}</h3>
        
        <div className="card-quadra__localizacao">
          {/* Ícone de Pin do mapa (SVG puro) */}
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
            <circle cx="12" cy="10" r="3"></circle>
          </svg>
          <span>{localizacao}</span>
        </div>

        {/* Linha separadora e Botão */}
        <div className="card-quadra__acao">
          <Button as="button" variant="primary" onClick={handleReservar}>Reservar</Button>
        </div>
      </div>
    </div>
  );
}

export default CardQuadra;
