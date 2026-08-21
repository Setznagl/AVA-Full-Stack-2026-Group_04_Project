import { Link, useLocation, useNavigate } from "react-router-dom";
import Button from "../Button/Button";
import "./Navbar.css";
import avafsIcon from "../../assets/logo/avafs-icon.png";

function Navbar({ usuario: usuarioProp }) {
  const location = useLocation();
  const navigate = useNavigate();

  const isLandingPage = location.pathname === "/";

  const jogadorId = localStorage.getItem("jogadorId");
  const jogadorNome = localStorage.getItem("jogadorNome");

  const usuarioLogado =
    usuarioProp ||
    (jogadorId
      ? { id: jogadorId, nome: jogadorNome || "Usuário" }
      : null);

  const isHomeAtivo = location.pathname === "/home";

  const isQuadrasAtivo =
    location.pathname === "/quadras" || location.pathname.startsWith("/reservar");

  const handleLogout = () => {
    localStorage.removeItem("jogadorId");
    localStorage.removeItem("jogadorNome");
    localStorage.removeItem("token");

    navigate("/");
  };

  const obterIniciais = (nome) => {
    if (!nome) return "U";
    const partes = nome.trim().split(" ");
    if (partes.length === 1) return partes[0].charAt(0).toUpperCase();
    return (
      partes[0].charAt(0) + partes[partes.length - 1].charAt(0)
    ).toUpperCase();
  };

  return (
    <header className="navbar-header">
      <div className="container navbar-container">
        <div className="navbar-left">
          <Link to={usuarioLogado ? "/home" : "/"} className="navbar-logo">
            <img src={avafsIcon} alt="AVAFS Quadras" className="navbar-logo__icon" />
            <span>
              AVAFS <span className="navbar-logo__accent">Quadras</span>
            </span>
          </Link>

          {!isLandingPage && (
            <nav className="navbar-menu" aria-label="Navegação principal">
              <Link
                to="/home"
                className={`navbar-link ${isHomeAtivo ? "ativo" : ""}`}
              >
                Página Inicial
              </Link>
              <Link
                to="/quadras"
                className={`navbar-link ${isQuadrasAtivo ? "ativo" : ""}`}
              >
                Quadras
              </Link>
            </nav>
          )}
        </div>

        <div className="navbar-right">
          {usuarioLogado ? (
            <div className="navbar-perfil-wrapper">
              <div className="navbar-divisor" />
              <Link
                to="/perfil"
                className="usuario-perfil-link"
                title="Acessar meu perfil"
              >
                <span className="usuario-nome">{usuarioLogado.nome}</span>
                <div className="usuario-avatar">
                  {usuarioLogado.avatarUrl ? (
                    <img
                      src={usuarioLogado.avatarUrl}
                      alt={`Foto de ${usuarioLogado.nome}`}
                    />
                  ) : (
                    <span className="avatar-iniciais">
                      {obterIniciais(usuarioLogado.nome)}
                    </span>
                  )}
                </div>
              </Link>

              <button 
                onClick={handleLogout} 
                className="navbar-logout-btn"
                title="Sair da conta"
              >
                Sair
              </button>
            </div>
          ) : (
            <Link to="/login">
              <Button variant="primary">Entrar</Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}

export default Navbar;