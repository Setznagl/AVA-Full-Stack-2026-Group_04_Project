import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import CardQuadra from "../../components/CardQuadra/CardQuadra";
import Button from "../../components/Button/Button";
import "./QuadrasPage.css";

// Importando TODAS as imagens do seu repositório
import imgFutebol01 from "../../assets/images/quadra_futebol_01.jpg";
import imgFutebol02 from "../../assets/images/quadra_futebol_02.jpg";
import imgTenis01 from "../../assets/images/quadra_tenis_01.jpg";
import imgTenis02 from "../../assets/images/quadra_tenis_02.jpg";
import imgBasquete01 from "../../assets/images/quadra_basquete_01.jpg";
import imgBasquete02 from "../../assets/images/quadra_basquete_02.jpg";

function QuadrasPage() {
  const [quadras, setQuadras] = useState([]);
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState(null);

  // Estados para controlar a barra de busca
  const [tipoBusca, setTipoBusca] = useState("TODAS"); 
  const [valorBusca, setValorBusca] = useState("");
  
  // Estado para guardar as modalidades que vieram do banco
  const [modalidadesDisponiveis, setModalidadesDisponiveis] = useState([]);

  // Função recebe a modalidade e o ID da quadra
  const getImagemPorModalidade = (modalidade, id) => {
    // Verifica se o ID é par ou ímpar (retorna true ou false)
    const isPar = id % 2 === 0;

    switch (modalidade?.toLowerCase()) {
      case "futebol": 
        return isPar ? imgFutebol02 : imgFutebol01;
      case "tênis": 
        return isPar ? imgTenis02 : imgTenis01;
      case "basquete": 
        return isPar ? imgBasquete02 : imgBasquete01;
      default: 
        return imgFutebol01; // Imagem padrão de segurança
    }
  };

  const realizarBusca = async (tipo, valor) => {
    setLoading(true);
    setErro(null);
    setQuadras([]);

    try {
      let url = `${import.meta.env.VITE_API_URL}/v1/quadra-many`; 

      if (tipo === "MODALIDADE" && valor) {
        url = `${import.meta.env.VITE_API_URL}/v1/quadra/modalidade/${valor}`; 
      } else if (tipo === "NOME" && valor) {
        url = `${import.meta.env.VITE_API_URL}/v1/quadra/nome/${valor}`; 
      } 

      // MUDANÇA AQUI: Adicionado as credenciais para enviar o token (cookie) nas rotas protegidas!
      const resposta = await fetch(url, {
        credentials: 'include'
      });
      
      if (!resposta.ok) {
        if (resposta.status === 404) throw new Error("Nenhuma quadra encontrada com este filtro.");
        if (resposta.status === 401) throw new Error("Acesso negado. Você precisa fazer login.");
        throw new Error("Erro na comunicação com o servidor.");
      }
      
      const dadosDoBanco = await resposta.json();

      // Se a busca for "TODAS", descobrimos quais modalidades existem no banco
      if (tipo === "TODAS") {
        const modalidadesUnicas = [...new Set(dadosDoBanco.map(quadra => quadra.modalidade))];
        setModalidadesDisponiveis(modalidadesUnicas);
      }

      if (tipo === "NOME") {
        setQuadras([dadosDoBanco]); 
      } else {
        setQuadras(dadosDoBanco); 
      }
      
    } catch (err) {
      setErro(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Carrega tudo ao abrir a página
  useEffect(() => {
    realizarBusca("TODAS", "");
  }, []);

  const handleBuscar = (e) => {
    e.preventDefault(); 
    realizarBusca(tipoBusca, valorBusca);
  };

  return (
    <div className="quadras-page">
      <Navbar />
      
      <main className="container quadras-page__conteudo">
        <div className="quadras-page__header">
          <h1 className="quadras-page__titulo">Quadras Disponíveis</h1>
          
          <form className="barra-filtros" onSubmit={handleBuscar}>
            
            <select 
              className="select-filtro"
              value={tipoBusca} 
              onChange={(e) => {
                setTipoBusca(e.target.value);
                setValorBusca(""); 
                if (e.target.value === "TODAS") realizarBusca("TODAS", "");
              }}
            >
              <option value="TODAS">Buscar Todas</option>
              <option value="MODALIDADE">Por Modalidade</option>
              <option value="NOME">Por Nome</option>
            </select>

            {tipoBusca === "MODALIDADE" && (
              <select className="select-filtro" value={valorBusca} onChange={(e) => setValorBusca(e.target.value)}>
                <option value="">Selecione...</option>
                {modalidadesDisponiveis.map((mod) => (
                  <option key={mod} value={mod}>
                    {mod}
                  </option>
                ))}
              </select>
            )}

            {tipoBusca === "NOME" && (
              <input 
                type="text" 
                className="input-filtro" 
                placeholder="Qual o nome da quadra?"
                value={valorBusca}
                onChange={(e) => setValorBusca(e.target.value)}
              />
            )}

            {tipoBusca !== "TODAS" && (
              <Button type="submit" variant="outline">Filtrar</Button>
            )}
          </form>

        </div>
        
        {loading && <p style={{ textAlign: "center" }}>Procurando quadras...</p>}
        {erro && <p style={{ textAlign: "center", color: "red", fontWeight: "bold" }}>{erro}</p>}
        
        {!loading && !erro && (
          <div className="quadras-grid">
            {quadras.length > 0 ? (
              quadras.map((quadra) => (
                <CardQuadra 
                  key={quadra.id}
                  id={quadra.id}
                  imagem={getImagemPorModalidade(quadra.modalidade, quadra.id)}
                  modalidade={quadra.modalidade}
                  nome={quadra.nome}
                  localizacao={quadra.localizacao}
                />
              ))
            ) : (
              <p>Nenhuma quadra na lista.</p>
            )}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

export default QuadrasPage;
