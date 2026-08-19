import { useState } from "react";
import { Link } from "react-router-dom";
import api from "../../services/Api";
import "./LoginPage.css";

function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = usenavigate();

  function decodeJwtPayload(token) {
    const payloadBase64 = token.split(".")[1];
    const decoded = atob(payloadBase64.replace(/-/g, "+").replace(/_/g, "/"));
    return JSON.parse(decoded);
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const form = event.currentTarget;
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const data = new FormData(form);
    const email = data.get("email");
    const senha = data.get("password");

    try {
      const resposta = await api.post("/v1/login", { email, senha });
      const { accessToken } = resposta.data;
      const payload = decodeJwtPayload(accessToken);

      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("jogadorId", payload.id);
      localStorage.setItem("jogadorNome", payload.nome);

      navigate("/quadras");
    } catch (err) {
      const mensagemErro = err.response?.data?.message || "Não foi possível entrar. Tente novamente.";
      setMessage(mensagemErro);
    }
  }

  return (
    <main className="login-page">
      <div className="login-shell">
        <Link className="login-brand" to="/" aria-label="Voltar para a página inicial">
          AVAFS Quadras
        </Link>

        <section className="login-card" aria-labelledby="login-title">
          <header className="login-header">
            <h1 id="login-title">Bem-vindo de volta</h1>
            <p>Entre na sua conta para agendar quadras.</p>
          </header>

          <form className="login-form" onSubmit={handleSubmit}>
            <div className="login-field-group">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="nome@exemplo.com"
                autoComplete="email"
                required
              />
            </div>

            <div className="login-field-group">
              <div className="login-password-row">
                <label htmlFor="password">Senha</label>
                <a href="#recuperar-senha">Esqueci minha senha</a>
              </div>

              <div className="login-password-input">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  autoComplete="current-password"
                  minLength="6"
                  required
                />
                <button
                  className="login-password-toggle"
                  type="button"
                  aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
                  aria-pressed={showPassword}
                  onClick={() => setShowPassword((current) => !current)}
                >
                  <span className="login-eye-icon" aria-hidden="true" />
                </button>
              </div>
            </div>

            <label className="login-remember-row">
              <input name="remember" type="checkbox" />
              <span>Lembrar de mim</span>
            </label>

            <button className="login-submit-button" type="submit">
              Entrar
            </button>

            {message && (
              <p className="login-form-message" role="status">
                {message}
              </p>
            )}
          </form>

          <div className="login-divider" aria-hidden="true">
            <span>ou</span>
          </div>

          <p className="login-signup-prompt">
            Não tem uma conta? <Link to="/cadastro">Cadastre-se</Link>
          </p>
        </section>
      </div>
    </main>
  );
}

export default LoginPage;
