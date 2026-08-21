import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";

const LandingPage = lazy(() =>
  import("./pages/LandingPage/LandingPage")
);

const LoginPage = lazy(() =>
  import("./pages/LoginPage/LoginPage")
);

const RegistrationPage = lazy(() =>
  import("./pages/RegistrationPage/RegistrationPage")
);

const QuadrasPage = lazy(() =>
  import("./pages/QuadrasPage/QuadrasPage")
);

const ReservaPage = lazy(() =>
  import("./pages/ReservaPage/ReservaPage")
);

const ProfilePage = lazy(() =>
  import("./pages/ProfilePage/ProfilePage")
);

const HomeLogadaPage = lazy(() =>
  import("./pages/HomeLogadaPage/HomeLogadaPage")
);

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
        <Route path="/home" element={<HomeLogadaPage />} />
        <Route path="/termos" element={<TermosPage />} />
        <Route path="/privacidade" element={<PrivacidadePage />} />
        <Route path="/contato" element={<ContatoPage />} />
      </Routes>
      <WhatsAppButton />
    </>
  );
}

export default App;