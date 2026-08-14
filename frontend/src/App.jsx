import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage/LandingPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegistrationPage from "./pages/RegistrationPage/RegistrationPage";
import PlaceholderPage from "./pages/PlaceholderPage/PlaceholderPage";
<<<<<<< HEAD
import QuadrasPage from "./pages/QuadrasPage/QuadrasPage";
=======
import ReservaPage from "./pages/ReservaPage/ReservaPage";
>>>>>>> 0c1ab3aeaccf1f5ba0b43c65a53ee40c01f9b4e8

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
<<<<<<< HEAD
      <Route path="/login" element={<PlaceholderPage titulo="Login" />} />
      <Route path="/cadastro" element={<PlaceholderPage titulo="Criar Conta" />} />
      <Route path="/quadras" element={<QuadrasPage />} />
      <Route path="/reservar" element={<PlaceholderPage titulo="Reservar Horário" />} />
=======
      <Route path="/login" element={<LoginPage />} />
      <Route path="/cadastro" element={<RegistrationPage />} />
      <Route path="/quadras" element={<PlaceholderPage titulo="Quadras" />} />
      <Route path="/reservar" element={<ReservaPage  />} />
>>>>>>> 0c1ab3aeaccf1f5ba0b43c65a53ee40c01f9b4e8
      <Route path="/perfil" element={<PlaceholderPage titulo="Meu Perfil" />} />
    </Routes>
  );
}

export default App;
