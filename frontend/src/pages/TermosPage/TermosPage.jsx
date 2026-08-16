import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

export default function TermosPage() {
  return (
    <>
      <Navbar />
      {/* Fundo com leve contraste para destacar a elevação do card */}
      <div style={{ backgroundColor: "#f8fafc", minHeight: "80vh", padding: "40px 20px" }}>
        <main
          style={{
            maxWidth: "850px",
            margin: "0 auto",
            backgroundColor: "#ffffff",
            borderRadius: "12px",
            border: "1px solid #e2e8f0",
            boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)",
            padding: "40px",
            fontFamily: "sans-serif",
            color: "#334155",
          }}
        >
          {/* Cabeçalho centralizado com divisor */}
          <div style={{ textAlign: "center", marginBottom: "32px", borderBottom: "1px solid #f1f5f9", paddingBottom: "24px" }}>
            <h1 style={{ color: "#002B49", fontSize: "2rem", marginBottom: "8px" }}>
              Termos de Uso e Convivência
            </h1>
            <p style={{ color: "#64748b", margin: 0, fontSize: "15px" }}>
              Regras e diretrizes para locação e utilização das quadras na plataforma.
            </p>
          </div>

          {/* Cláusulas formatadas */}
          <section style={{ marginBottom: "28px" }}>
            <h2 style={{ color: "#002B49", fontSize: "1.2rem", marginBottom: "8px" }}>
              1. Reservas e Cancelamentos
            </h2>
            <p style={{ lineHeight: "1.7", margin: 0 }}>
              O agendamento garante o uso exclusivo da quadra no horário selecionado. Cancelamentos sem incidência de taxa devem ser solicitados com no mínimo 24 horas de antecedência.
            </p>
          </section>

          <section style={{ marginBottom: "28px" }}>
            <h2 style={{ color: "#002B49", fontSize: "1.2rem", marginBottom: "8px" }}>
              2. Normas de Utilização e Conduta
            </h2>
            <ul style={{ lineHeight: "1.8", paddingLeft: "20px", margin: 0 }}>
              <li>Uso obrigatório de calçado apropriado para o tipo de piso da quadra.</li>
              <li>Respeito rigoroso aos horários de início e término contratados.</li>
              <li>Proibido o porte de garrafas ou recipientes de vidro dentro da área de jogo.</li>
            </ul>
          </section>

          <section style={{ marginBottom: "28px" }}>
            <h2 style={{ color: "#002B49", fontSize: "1.2rem", marginBottom: "8px" }}>
              3. Responsabilidade por Danos
            </h2>
            <p style={{ lineHeight: "1.7", margin: 0 }}>
              O locatário é responsável pela preservação de redes, iluminação e estrutura física durante o período reservado, arcando com eventuais danos decorrentes de mau uso.
            </p>
          </section>

          <section style={{ marginBottom: "12px" }}>
            <h2 style={{ color: "#002B49", fontSize: "1.2rem", marginBottom: "8px" }}>
              4. Condições Climáticas
            </h2>
            <p style={{ lineHeight: "1.7", margin: 0 }}>
              Em quadras descobertas, partidas interrompidas ou inviabilizadas por fortes chuvas geram crédito automático para reagendamento na plataforma.
            </p>
          </section>
        </main>
      </div>
      <Footer />
    </>
  );
}