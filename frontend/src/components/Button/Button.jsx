import { Link } from "react-router-dom";
import "./Button.css";

/**
 * Botão reutilizável do CourtConnect.
 *
 * Uso:
 *   <Button to="/cadastro">Criar Conta</Button>          -> vira um <Link>
 *   <Button as="button" onClick={fn}>Salvar</Button>      -> vira um <button>
 *   <Button variant="outline" to="/login">Entrar</Button> -> variante contornada
 */
function Button({
  children,
  to,
  href,
  onClick,
  variant = "primary",
  type = "button",
  as,
}) {
  const className = `btn btn--${variant}`;

  if (as !== "button" && to) {
    return (
      <Link to={to} className={className}>
        {children}
      </Link>
    );
  }

  if (as !== "button" && href) {
    return (
      <a href={href} className={className}>
        {children}
      </a>
    );
  }

  return (
    <button type={type} onClick={onClick} className={className}>
      {children}
    </button>
  );
}

export default Button;
