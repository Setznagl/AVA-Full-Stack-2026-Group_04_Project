import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage/LandingPage";
import PlaceholderPage from "./pages/PlaceholderPage/PlaceholderPage";
import QuadrasPage from "./pages/QuadrasPage/QuadrasPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<PlaceholderPage titulo="Login" />} />
      <Route path="/cadastro" element={<PlaceholderPage titulo="Criar Conta" />} />
      <Route path="/quadras" element={<QuadrasPage />} />
      <Route path="/reservar" element={<PlaceholderPage titulo="Reservar Horário" />} />
      <Route path="/perfil" element={<PlaceholderPage titulo="Meu Perfil" />} />
    </Routes>
  );
}

export default App;
