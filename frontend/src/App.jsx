import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage/LandingPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegistrationPage from "./pages/RegistrationPage/RegistrationPage";
import PlaceholderPage from "./pages/PlaceholderPage/PlaceholderPage";
import QuadrasPage from "./pages/QuadrasPage/QuadrasPage";
import ReservaPage from "./pages/ReservaPage/ReservaPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/quadras" element={<QuadrasPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/cadastro" element={<RegistrationPage />} />
      <Route path="/reservar" element={<ReservaPage />} />
      <Route path="/perfil" element={<PlaceholderPage titulo="Meu Perfil" />} />
    </Routes>
  );
}

export default App;
