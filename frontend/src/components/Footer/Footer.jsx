import "./Footer.css";

function Footer() {
  const anoAtual = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container footer__content">
        <span className="footer__brand">AVAFS Quadras</span>

        <nav className="footer__links">
          <a href="/termos-de-uso">Termos de Uso</a>
          <a href="/privacidade">Privacidade</a>
          <a href="/contato">Contato</a>
        </nav>

        <span className="footer__copy">
          © {anoAtual} AVAFS Quadras. Todos os direitos reservados.
        </span>
      </div>
    </footer>
  );
}

export default Footer;
