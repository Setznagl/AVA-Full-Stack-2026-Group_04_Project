import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import api from "../../services/Api";
import "./ProfilePage.css";

const EMPTY_FORM = {
  name: "",
  email: "",
  phone: "",
  currentPassword: "",
  newPassword: "",
};

const MESSAGES = {
  loadError: "Não foi possível carregar seus dados. Tente novamente.",
  passwordRequired: "Informe sua senha atual para salvar as alterações.",
  passwordTooShort: "A nova senha deve ter pelo menos 6 caracteres.",
  phoneInvalid: "Informe um telefone válido no formato (00) 00000-0000.",
  saveSuccess: "Alterações salvas com sucesso!",
  saveError: "Não foi possível salvar as alterações. Verifique sua senha atual.",
  deactivatePasswordRequired: "Informe sua senha atual para desativar a conta.",
  deactivateConfirm:
    "Tem certeza que deseja desativar sua conta? Essa ação não pode ser desfeita.",
  deactivateError:
    "Não foi possível desativar a conta. Verifique sua senha atual.",
};

const ICONS = {
  back: (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path d="M3.1875 7.5L7.85417 12.1667L6.66667 13.3333L0 6.66667L6.66667 0L7.85417 1.16667L3.1875 5.83333H13.3333V7.5H3.1875Z" fill="currentColor" />
    </svg>
  ),
  user: (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path d="M6.66667 6.66667C5.75 6.66667 4.96528 6.34028 4.3125 5.6875C3.65972 5.03472 3.33333 4.25 3.33333 3.33333C3.33333 2.41667 3.65972 1.63194 4.3125 0.979167C4.96528 0.326389 5.75 0 6.66667 0C7.58333 0 8.36806 0.326389 9.02083 0.979167C9.67361 1.63194 10 2.41667 10 3.33333C10 4.25 9.67361 5.03472 9.02083 5.6875C8.36806 6.34028 7.58333 6.66667 6.66667 6.66667ZM0 13.3333V11C0 10.5278 0.121528 10.0938 0.364583 9.69792C0.607639 9.30208 0.930556 9 1.33333 8.79167C2.19444 8.36111 3.06944 8.03819 3.95833 7.82292C4.84722 7.60764 5.75 7.5 6.66667 7.5C7.58333 7.5 8.48611 7.60764 9.375 7.82292C10.2639 8.03819 11.1389 8.36111 12 8.79167C12.4028 9 12.7257 9.30208 12.9688 9.69792C13.2118 10.0938 13.3333 10.5278 13.3333 11V13.3333H0ZM1.66667 11.6667H11.6667V11C11.6667 10.8472 11.6285 10.7083 11.5521 10.5833C11.4757 10.4583 11.375 10.3611 11.25 10.2917C10.5 9.91667 9.74306 9.63542 8.97917 9.44792C8.21528 9.26042 7.44444 9.16667 6.66667 9.16667C5.88889 9.16667 5.11806 9.26042 4.35417 9.44792C3.59028 9.63542 2.83333 9.91667 2.08333 10.2917C1.95833 10.3611 1.85764 10.4583 1.78125 10.5833C1.70486 10.7083 1.66667 10.8472 1.66667 11V11.6667ZM6.66667 5C7.125 5 7.51736 4.83681 7.84375 4.51042C8.17014 4.18403 8.33333 3.79167 8.33333 3.33333C8.33333 2.875 8.17014 2.48264 7.84375 2.15625C7.51736 1.82986 7.125 1.66667 6.66667 1.66667C6.20833 1.66667 5.81597 1.82986 5.48958 2.15625C5.16319 2.48264 5 2.875 5 3.33333C5 3.79167 5.16319 4.18403 5.48958 4.51042C5.81597 4.83681 6.20833 5 6.66667 5Z" fill="currentColor" />
    </svg>
  ),
  email: (
    <svg width="17" height="14" viewBox="0 0 17 14" fill="none" aria-hidden="true">
      <path d="M1.66667 13.3333C1.20833 13.3333 0.815972 13.1701 0.489583 12.8438C0.163194 12.5174 0 12.125 0 11.6667V1.66667C0 1.20833 0.163194 0.815972 0.489583 0.489583C0.815972 0.163194 1.20833 0 1.66667 0H15C15.4583 0 15.8507 0.163194 16.1771 0.489583C16.5035 0.815972 16.6667 1.20833 16.6667 1.66667V11.6667C16.6667 12.125 16.5035 12.5174 16.1771 12.8438C15.8507 13.1701 15.4583 13.3333 15 13.3333H1.66667ZM8.33333 7.5L1.66667 3.33333V11.6667H15V3.33333L8.33333 7.5ZM8.33333 5.83333L15 1.66667H1.66667L8.33333 5.83333ZM1.66667 3.33333V1.66667V3.33333V11.6667V3.33333Z" fill="currentColor" />
    </svg>
  ),
  phone: (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true">
      <path d="M14.125 15C12.3889 15 10.6736 14.6215 8.97917 13.8646C7.28472 13.1076 5.74306 12.0347 4.35417 10.6458C2.96528 9.25694 1.89236 7.71528 1.13542 6.02083C0.378472 4.32639 0 2.61111 0 0.875C0 0.625 0.0833333 0.416667 0.25 0.25C0.416667 0.0833333 0.625 0 0.875 0H4.25C4.44444 0 4.61806 0.0659722 4.77083 0.197917C4.92361 0.329861 5.01389 0.486111 5.04167 0.666667L5.58333 3.58333C5.61111 3.80556 5.60417 3.99306 5.5625 4.14583C5.52083 4.29861 5.44444 4.43056 5.33333 4.54167L3.3125 6.58333C3.59028 7.09722 3.92014 7.59375 4.30208 8.07292C4.68403 8.55208 5.10417 9.01389 5.5625 9.45833C5.99306 9.88889 6.44444 10.2882 6.91667 10.6562C7.38889 11.0243 7.88889 11.3611 8.41667 11.6667L10.375 9.70833C10.5 9.58333 10.6632 9.48958 10.8646 9.42708C11.066 9.36458 11.2639 9.34722 11.4583 9.375L14.3333 9.95833C14.5278 10.0139 14.6875 10.1146 14.8125 10.2604C14.9375 10.4062 15 10.5694 15 10.75V14.125C15 14.375 14.9167 14.5833 14.75 14.75C14.5833 14.9167 14.375 15 14.125 15ZM2.52083 5L3.89583 3.625L3.54167 1.66667H1.6875C1.75694 2.23611 1.85417 2.79861 1.97917 3.35417C2.10417 3.90972 2.28472 4.45833 2.52083 5ZM9.97917 12.4583C10.5208 12.6944 11.0729 12.8819 11.6354 13.0208C12.1979 13.1597 12.7639 13.25 13.3333 13.2917V11.4583L11.375 11.0625L9.97917 12.4583Z" fill="currentColor" />
    </svg>
  ),
};

function formatPhone(value) {
  const digits = value.replace(/\D/g, "").slice(0, 11);

  if (digits.length <= 2) return digits ? `(${digits}` : "";
  if (digits.length <= 7) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  }

  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
}

function getInitials(name) {
  if (!name) return "U";
  const parts = name.trim().split(" ");
  if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
  return (
    parts[0].charAt(0) + parts[parts.length - 1].charAt(0)
  ).toUpperCase();
}

function getApiErrorMessage(error, fallback) {
  return error.response?.data?.message || fallback;
}

async function verifyPassword(email, password) {
  await api.post("/v1/login", { email, senha: password });
}

function clearSession() {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("jogadorId");
  localStorage.removeItem("jogadorNome");
}

function ProfileField({ id, label, icon, ...inputProps }) {
  const wrapClass = icon
    ? "profile-input-wrap profile-input-wrap--with-icon"
    : "profile-input-wrap";

  return (
    <div className="profile-field-group">
      <label htmlFor={id}>{label}</label>
      <div className={wrapClass}>
        {icon && <span className="profile-icon">{icon}</span>}
        <input id={id} {...inputProps} />
      </div>
    </div>
  );
}

function ProfilePage() {
  const navigate = useNavigate();
  const playerId = localStorage.getItem("jogadorId");

  const [form, setForm] = useState(EMPTY_FORM);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [feedback, setFeedback] = useState({ type: "", message: "" });

  function updateField(field, value) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  function setError(message) {
    setFeedback({ type: "error", message });
  }

  useEffect(() => {
    if (!playerId) {
      navigate("/login");
      return;
    }

    async function loadProfile() {
      try {
        const { data } = await api.get(`/v1/jogador/${playerId}`);
        setForm({
          ...EMPTY_FORM,
          name: data.nome || "",
          email: data.email || "",
          phone: formatPhone(data.telefone || ""),
        });
      } catch {
        setError(MESSAGES.loadError);
      } finally {
        setLoading(false);
      }
    }

    loadProfile();
  }, [playerId, navigate]);

  async function handleSubmit(event) {
    event.preventDefault();
    setFeedback({ type: "", message: "" });

    const formElement = event.currentTarget;
    if (!formElement.checkValidity()) {
      formElement.reportValidity();
      return;
    }

    if (form.phone.replace(/\D/g, "").length !== 11) {
      setError(MESSAGES.phoneInvalid);
      return;
    }

    if (!form.currentPassword) {
      setError(MESSAGES.passwordRequired);
      return;
    }

    if (form.newPassword && form.newPassword.length < 6) {
      setError(MESSAGES.passwordTooShort);
      return;
    }

    setSaving(true);

    try {
      await verifyPassword(form.email, form.currentPassword);

      const passwordToSend = form.newPassword || form.currentPassword;

      await api.put(`/v1/jogador/${playerId}`, {
        nome: form.name,
        email: form.email,
        telefone: form.phone,
        senha: passwordToSend,
      });

      localStorage.setItem("jogadorNome", form.name);
      setForm((current) => ({
        ...current,
        currentPassword: "",
        newPassword: "",
      }));
      setFeedback({ type: "success", message: MESSAGES.saveSuccess });
    } catch (error) {
      setError(getApiErrorMessage(error, MESSAGES.saveError));
    } finally {
      setSaving(false);
    }
  }

  async function handleDeactivateAccount() {
    if (!window.confirm(MESSAGES.deactivateConfirm)) return;

    if (!form.currentPassword) {
      setError(MESSAGES.deactivatePasswordRequired);
      return;
    }

    try {
      await verifyPassword(form.email, form.currentPassword);
      await api.delete(`/v1/jogador/${playerId}`);
      clearSession();
      navigate("/");
    } catch (error) {
      setError(getApiErrorMessage(error, MESSAGES.deactivateError));
    }
  }

  return (
    <div className="profile-page">
      <Navbar />

      <main className="profile-main">
        <nav className="profile-breadcrumb" aria-label="Navegação secundária">
          <Link to="/" className="profile-breadcrumb__back">
            <span className="profile-breadcrumb__arrow profile-breadcrumb__arrow--primary">
              {ICONS.back}
            </span>
            Configurações / Meu Perfil
          </Link>
        </nav>

        <section
          className="profile-card"
          aria-labelledby="profile-title"
          aria-busy={loading}
        >
          <h1 id="profile-title" className="profile-card__title">
            Meu Perfil
          </h1>

          {loading ? (
            <p className="profile-loading">Carregando perfil...</p>
          ) : (
            <>
              <div className="profile-avatar-section">
                <div className="profile-avatar" aria-hidden="true">
                  <span>{getInitials(form.name)}</span>
                </div>
                <button
                  type="button"
                  className="profile-change-photo"
                >
                  Alterar Foto
                </button>
              </div>

              <form className="profile-form" onSubmit={handleSubmit}>
                <ProfileField
                  id="profile-name"
                  label="Nome Completo"
                  icon={ICONS.user}
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={(event) => updateField("name", event.target.value)}
                  autoComplete="name"
                  minLength={3}
                  required
                />

                <ProfileField
                  id="profile-email"
                  label="Email"
                  icon={ICONS.email}
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={(event) => updateField("email", event.target.value)}
                  autoComplete="email"
                  required
                />

                <ProfileField
                  id="profile-phone"
                  label="Telefone"
                  icon={ICONS.phone}
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={(event) =>
                    updateField("phone", formatPhone(event.target.value))
                  }
                  autoComplete="tel"
                  placeholder="(00) 00000-0000"
                  pattern="\([0-9]{2}\) [0-9]{5}-[0-9]{4}"
                  title="Digite um telefone no formato (00) 00000-0000"
                  required
                />

                <hr className="profile-divider" />

                <h2 className="profile-section-title">Alterar Senha</h2>

                <div className="profile-password-row">
                  <ProfileField
                    id="profile-current-password"
                    label="Senha Atual"
                    type="password"
                    name="currentPassword"
                    value={form.currentPassword}
                    onChange={(event) =>
                      updateField("currentPassword", event.target.value)
                    }
                    autoComplete="current-password"
                    placeholder="••••••••"
                  />

                  <ProfileField
                    id="profile-new-password"
                    label="Nova Senha"
                    type="password"
                    name="newPassword"
                    value={form.newPassword}
                    onChange={(event) =>
                      updateField("newPassword", event.target.value)
                    }
                    autoComplete="new-password"
                    placeholder="••••••••"
                    minLength={6}
                  />
                </div>

                <button
                  className="profile-submit-button"
                  type="submit"
                  disabled={saving}
                >
                  {saving ? "Salvando..." : "Salvar Alterações"}
                </button>

                {feedback.message && (
                  <p
                    className={`profile-form-message profile-form-message--${feedback.type}`}
                    role="status"
                    aria-live="polite"
                  >
                    {feedback.message}
                  </p>
                )}
              </form>
            </>
          )}
        </section>

        {!loading && (
          <button
            type="button"
            className="profile-deactivate"
            onClick={handleDeactivateAccount}
            disabled={saving}
          >
            Desativar conta
          </button>
        )}
      </main>

      <Footer />
    </div>
  );
}

export default ProfilePage;
