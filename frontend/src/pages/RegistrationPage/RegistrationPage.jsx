import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../services/Api";
import "./RegistrationPage.css";
import avafsLogo from "../../assets/logo/avafs-logo-full.png";

function formatPhone(value) {
  const digits = value.replace(/\D/g, "").slice(0, 11);

  if (digits.length <= 2) return digits ? `(${digits}` : "";
  if (digits.length <= 7) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  }

  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
}

  function RegistrationPage() {
    const [phone, setPhone] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [feedback, setFeedback] = useState({ type: "", message: "" });
    const navigate = useNavigate();

    async function handleSubmit(event) {
      event.preventDefault();

      const form = event.currentTarget;
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }

      const data = new FormData(form);
      if (data.get("password") !== data.get("passwordConfirmation")) {
        setFeedback({ type: "error", message: "As senhas não coincidem." });
        return;
      }

      try {
        await api.post("/v1/jogador", {
          nome: data.get("fullName"),
          email: data.get("email"),
          telefone: data.get("phone"),
          senha: data.get("password"),
        });

        setFeedback({
          type: "success",
          message: "Conta criada com sucesso! Redirecionando para o login...",
        });

        setTimeout(() => navigate("/login"), 1500);
      } catch (err) {
        const mensagemErro = err.response?.data?.message || "Não foi possível criar a conta. Tente novamente.";
        setFeedback({ type: "error", message: mensagemErro });
      }
    }

  return (
    <main className="registration-page">
      <div className="registration-shell">
        <Link
          className="registration-brand"
          to="/"
          aria-label="Voltar para a página inicial"
        >
          <img
            src={avafsLogo}
            alt="AVAFS Quadras"
            className="registration-brand__logo"
        />
      </Link>

        <section className="registration-card" aria-labelledby="registration-title">
          <h1 id="registration-title">Criar Conta</h1>

          <form className="registration-form" onSubmit={handleSubmit}>
            <div className="registration-field-group">
              <label htmlFor="fullName">Nome Completo</label>
              <div className="registration-input-wrap">
                <span className="registration-icon registration-icon--user" aria-hidden="true" />
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  placeholder="Seu nome aqui"
                  autoComplete="name"
                  minLength="3"
                  required
                />
              </div>
            </div>

            <div className="registration-field-group">
              <label htmlFor="registrationEmail">Email</label>
              <div className="registration-input-wrap">
                <span className="registration-icon registration-icon--email" aria-hidden="true" />
                <input
                  id="registrationEmail"
                  name="email"
                  type="email"
                  placeholder="exemplo@email.com"
                  autoComplete="email"
                  required
                />
              </div>
            </div>

            <div className="registration-field-group">
              <label htmlFor="phone">Telefone</label>
              <div className="registration-input-wrap">
                <span className="registration-icon registration-icon--phone" aria-hidden="true">
                  ☎
                </span>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="(00) 00000-0000"
                  autoComplete="tel"
                  value={phone}
                  onChange={(event) => setPhone(formatPhone(event.target.value))}
                  pattern="\([0-9]{2}\) [0-9]{5}-[0-9]{4}"
                  title="Digite um telefone no formato (00) 00000-0000"
                  required
                />
              </div>
            </div>

            <div className="registration-field-group">
              <label htmlFor="registrationPassword">Senha</label>
              <div className="registration-input-wrap">
                <span className="registration-icon registration-icon--lock" aria-hidden="true" />
                <input
                  id="registrationPassword"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  autoComplete="new-password"
                  minLength="6"
                  required
                />
                <button
                  className="registration-password-toggle"
                  type="button"
                  aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
                  aria-pressed={showPassword}
                  onClick={() => setShowPassword((current) => !current)}
                >
                  <span className="registration-eye-icon" aria-hidden="true" />
                </button>
              </div>
            </div>

            <div className="registration-field-group">
              <label htmlFor="passwordConfirmation">Confirmar Senha</label>
              <div className="registration-input-wrap">
                <span className="registration-icon registration-icon--lock" aria-hidden="true" />
                <input
                  id="passwordConfirmation"
                  name="passwordConfirmation"
                  type={showConfirmation ? "text" : "password"}
                  placeholder="••••••••"
                  autoComplete="new-password"
                  minLength="6"
                  required
                />
                <button
                  className="registration-password-toggle"
                  type="button"
                  aria-label={showConfirmation ? "Ocultar confirmação da senha" : "Mostrar confirmação da senha"}
                  aria-pressed={showConfirmation}
                  onClick={() => setShowConfirmation((current) => !current)}
                >
                  <span className="registration-eye-icon" aria-hidden="true" />
                </button>
              </div>
            </div>

            <button className="registration-submit-button" type="submit">
              <span>Criar Conta</span>
              <span className="registration-arrow" aria-hidden="true">→</span>
            </button>

            {feedback.message && (
              <p
                className={`registration-feedback registration-feedback--${feedback.type}`}
                role="status"
              >
                {feedback.message}
              </p>
            )}
          </form>

          <div className="registration-divider" aria-hidden="true" />

          <p className="registration-login-prompt">
            Já tem uma conta? <Link to="/login">Entre</Link>
          </p>
        </section>
      </div>
    </main>
  );
}

export default RegistrationPage;
