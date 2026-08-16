import { useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

export default function ContatoPage() {
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    assunto: "Dúvidas Gerais",
    mensagem: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Payload de contato enviado:", formData);
  };

  return (
    <>
      <Navbar />
      <div style={{ backgroundColor: "#f8fafc", minHeight: "80vh", padding: "48px 20px" }}>
        <main
          style={{
            maxWidth: "1000px",
            margin: "0 auto",
            backgroundColor: "#ffffff",
            borderRadius: "16px",
            border: "1px solid #e2e8f0",
            boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(0, 0, 0, 0.03)",
            overflow: "hidden",
            fontFamily: "sans-serif",
            display: "flex",
            flexWrap: "wrap",
          }}
        >
          {/* Coluna 1: Painel Institucional e Informações de Suporte */}
          <section
            style={{
              flex: "1 1 340px",
              backgroundColor: "#002B49",
              color: "#ffffff",
              padding: "40px 32px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <div>
              <span
                style={{
                  display: "inline-block",
                  padding: "4px 10px",
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                  borderRadius: "20px",
                  fontSize: "12px",
                  fontWeight: "600",
                  letterSpacing: "0.5px",
                  textTransform: "uppercase",
                  color: "#EA580C",
                  marginBottom: "16px",
                }}
              >
                Central de Ajuda
              </span>
              <h1 style={{ fontSize: "1.85rem", fontWeight: "700", margin: "0 0 12px 0", color: "#ffffff" }}>
                Fale Conosco
              </h1>
              <p style={{ color: "#94a3b8", fontSize: "14px", lineHeight: "1.6", margin: "0 0 32px 0" }}>
                Tem alguma dúvida sobre locação de quadras, cancelamentos ou parcerias? Nossa equipe está pronta para atender.
              </p>

              {/* Detalhes de Contato */}
              <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                <div>
                  <h3 style={{ fontSize: "13px", textTransform: "uppercase", color: "#94a3b8", margin: "0 0 4px 0", letterSpacing: "0.5px" }}>
                    Atendimento das Quadras
                  </h3>
                  <p style={{ margin: 0, fontSize: "14px", fontWeight: "500" }}>
                    Segunda a Domingo: 06h às 23h
                  </p>
                </div>

                <div>
                  <h3 style={{ fontSize: "13px", textTransform: "uppercase", color: "#94a3b8", margin: "0 0 4px 0", letterSpacing: "0.5px" }}>
                    E-mail Oficial
                  </h3>
                  <p style={{ margin: 0, fontSize: "14px", fontWeight: "500", color: "#38bdf8" }}>
                    contato@avafsquadras.com.br
                  </p>
                </div>

                <div>
                  <h3 style={{ fontSize: "13px", textTransform: "uppercase", color: "#94a3b8", margin: "0 0 4px 0", letterSpacing: "0.5px" }}>
                    Tempo Médio de Resposta
                  </h3>
                  <p style={{ margin: 0, fontSize: "14px", fontWeight: "500" }}>
                    Em até 2 horas úteis
                  </p>
                </div>
              </div>
            </div>

            <div style={{ marginTop: "40px", paddingTop: "20px", borderTop: "1px solid rgba(255, 255, 255, 0.1)" }}>
              <p style={{ fontSize: "12px", color: "#64748b", margin: 0 }}>
                AVAFS Quadras • Sistema de Gestão e Reservas Esportivas
              </p>
            </div>
          </section>

          {/* Coluna 2: Formulário de Contato Controlado */}
          <section
            style={{
              flex: "2 1 400px",
              padding: "40px",
              backgroundColor: "#ffffff",
            }}
          >
            <h2 style={{ color: "#002B49", fontSize: "1.4rem", margin: "0 0 8px 0" }}>
              Envie sua mensagem
            </h2>
            <p style={{ color: "#64748b", fontSize: "14px", margin: "0 0 24px 0" }}>
              Preencha os campos abaixo para abrir uma solicitação.
            </p>

            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: "18px" }}>
                <label
                  htmlFor="nome"
                  style={{ display: "block", marginBottom: "6px", fontWeight: "600", fontSize: "13px", color: "#334155" }}
                >
                  Nome Completo *
                </label>
                <input
                  type="text"
                  id="nome"
                  name="nome"
                  value={formData.nome}
                  onChange={handleChange}
                  required
                  placeholder="Ex: Dennys Araújo"
                  style={{
                    width: "100%",
                    padding: "10px 12px",
                    borderRadius: "8px",
                    border: "1px solid #cbd5e1",
                    boxSizing: "border-box",
                    fontSize: "14px",
                    outline: "none",
                  }}
                />
              </div>

              <div style={{ marginBottom: "18px" }}>
                <label
                  htmlFor="email"
                  style={{ display: "block", marginBottom: "6px", fontWeight: "600", fontSize: "13px", color: "#334155" }}
                >
                  E-mail de Contato *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="exemplo@email.com"
                  style={{
                    width: "100%",
                    padding: "10px 12px",
                    borderRadius: "8px",
                    border: "1px solid #cbd5e1",
                    boxSizing: "border-box",
                    fontSize: "14px",
                    outline: "none",
                  }}
                />
              </div>

              <div style={{ marginBottom: "18px" }}>
                <label
                  htmlFor="assunto"
                  style={{ display: "block", marginBottom: "6px", fontWeight: "600", fontSize: "13px", color: "#334155" }}
                >
                  Assunto
                </label>
                <select
                  id="assunto"
                  name="assunto"
                  value={formData.assunto}
                  onChange={handleChange}
                  style={{
                    width: "100%",
                    padding: "10px 12px",
                    borderRadius: "8px",
                    border: "1px solid #cbd5e1",
                    boxSizing: "border-box",
                    fontSize: "14px",
                    backgroundColor: "#ffffff",
                    outline: "none",
                  }}
                >
                  <option value="Dúvidas Gerais">Dúvidas Gerais</option>
                  <option value="Suporte a Reservas">Suporte a Reservas / Cancelamentos</option>
                  <option value="Problemas de Acesso">Problemas de Acesso / Conta</option>
                  <option value="Parcerias e Quadras">Cadastrar Minha Quadra</option>
                </select>
              </div>

              <div style={{ marginBottom: "24px" }}>
                <label
                  htmlFor="mensagem"
                  style={{ display: "block", marginBottom: "6px", fontWeight: "600", fontSize: "13px", color: "#334155" }}
                >
                  Sua Mensagem *
                </label>
                <textarea
                  id="mensagem"
                  name="mensagem"
                  rows="4"
                  value={formData.mensagem}
                  onChange={handleChange}
                  required
                  placeholder="Como podemos te ajudar?"
                  style={{
                    width: "100%",
                    padding: "10px 12px",
                    borderRadius: "8px",
                    border: "1px solid #cbd5e1",
                    boxSizing: "border-box",
                    fontSize: "14px",
                    resize: "vertical",
                    outline: "none",
                  }}
                />
              </div>

              <button
                type="submit"
                style={{
                  width: "100%",
                  padding: "12px",
                  backgroundColor: "#EA580C",
                  color: "#ffffff",
                  border: "none",
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontWeight: "bold",
                  fontSize: "15px",
                  transition: "background-color 0.2s ease",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#c2410c")}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#EA580C")}
              >
                Enviar Mensagem
              </button>
            </form>
          </section>
        </main>
      </div>
      <Footer />
    </>
  );
}