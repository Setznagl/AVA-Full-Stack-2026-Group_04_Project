import { Link } from "react-router-dom";
import "./Footer.css";
import avafsIcon from "../../assets/logo/avafs-icon.png";

function Footer() {
  const anoAtual = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container footer__content">
        <span className="footer__brand">
          <span className="footer__brand-badge">
            <img src={avafsIcon} alt="" aria-hidden="true" />
          </span>
          AVAFS Quadras
        </span>

        <nav className="footer__links">
          <Link to="/termos">Termos de Uso</Link>
          <Link to="/privacidade">Privacidade</Link>
          <Link to="/contato">Contato</Link>
        </nav>

        <span className="footer__copy">
          © {anoAtual} AVAFS Quadras. Todos os direitos reservados.
        </span>
      </div>
    </footer>
  );
}

export default Footer;