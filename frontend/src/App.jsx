import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage/LandingPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegistrationPage from "./pages/RegistrationPage/RegistrationPage";
import QuadrasPage from "./pages/QuadrasPage/QuadrasPage";
import ReservaPage from "./pages/ReservaPage/ReservaPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import TermosPage from "./pages/TermosPage/TermosPage";
import PrivacidadePage from "./pages/PrivacidadePage/PrivacidadePage";
import ContatoPage from "./pages/ContatoPage/ContatoPage";
import WhatsAppButton from "./components/WhatsAppButton/WhatsAppButton";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/cadastro" element={<RegistrationPage />} />
        <Route path="/quadras" element={<QuadrasPage />} />
        <Route path="/reservar" element={<ReservaPage />} />
        <Route path="/perfil" element={<ProfilePage />} />
        <Route path="/termos" element={<TermosPage />} />
        <Route path="/privacidade" element={<PrivacidadePage />} />
        <Route path="/contato" element={<ContatoPage />} />
      </Routes>
      <WhatsAppButton />
    </>
  );
}

export default App;