import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

export default function PrivacidadePage() {
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
              Política de Privacidade
            </h1>
            <p style={{ color: "#64748b", margin: 0, fontSize: "15px" }}>
              Diretrizes de proteção e tratamento de dados dos usuários (LGPD).
            </p>
          </div>

          {/* Seções de dados */}
          <section style={{ marginBottom: "28px" }}>
            <h2 style={{ color: "#002B49", fontSize: "1.2rem", marginBottom: "8px" }}>
              1. Coleta de Informações
            </h2>
            <p style={{ lineHeight: "1.7", marginBottom: "8px" }}>
              Coletamos apenas as informações essenciais para autenticação e gestão de agendamentos:
            </p>
            <ul style={{ lineHeight: "1.8", paddingLeft: "20px", margin: 0 }}>
              <li>Nome completo para identificação do titular da reserva.</li>
              <li>E-mail para confirmação e envio de comprovantes.</li>
              <li>Telefone de contato para notificações operacionais da quadra.</li>
            </ul>
          </section>

          <section style={{ marginBottom: "28px" }}>
            <h2 style={{ color: "#002B49", fontSize: "1.2rem", marginBottom: "8px" }}>
              2. Armazenamento e Segurança
            </h2>
            <p style={{ lineHeight: "1.7", margin: 0 }}>
              Os dados cadastrais e o histórico de reservas são armazenados em ambiente seguro com criptografia, sendo utilizados unicamente para viabilizar as operações da plataforma.
            </p>
          </section>

          <section style={{ marginBottom: "28px" }}>
            <h2 style={{ color: "#002B49", fontSize: "1.2rem", marginBottom: "8px" }}>
              3. Compartilhamento Restrito
            </h2>
            <p style={{ lineHeight: "1.7", margin: 0 }}>
              Não comercializamos dados pessoais com terceiros. As informações repassadas aos gestores das quadras limitam-se ao estritamente necessário para controle de portaria e acesso.
            </p>
          </section>

          <section style={{ marginBottom: "12px" }}>
            <h2 style={{ color: "#002B49", fontSize: "1.2rem", marginBottom: "8px" }}>
              4. Direitos do Titular (LGPD)
            </h2>
            <p style={{ lineHeight: "1.7", margin: 0 }}>
              O usuário pode solicitar a correção, a exportação ou a exclusão definitiva dos seus dados cadastrais a qualquer momento por meio do nosso canal de suporte.
            </p>
          </section>
        </main>
      </div>
      <Footer />
    </>
  );
}