import { Link } from "react-router-dom";
import Button from "../Button/Button";
import "./Navbar.css";

function Navbar() {
  return (
    <header className="navbar">
      <div className="container navbar__content">
        <Link to="/" className="navbar__logo">
          AVAFS Quadras
        </Link>

        <Button to="/login">Entrar</Button>
      </div>
    </header>
  );
}

export default Navbar;
