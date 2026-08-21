import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import WhatsAppButton from "./components/WhatsAppButton/WhatsAppButton";

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

const TermosPage = lazy(() =>
  import("./pages/TermosPage/TermosPage")
);

const PrivacidadePage = lazy(() =>
  import("./pages/PrivacidadePage/PrivacidadePage")
);

const ContatoPage = lazy(() =>
  import("./pages/ContatoPage/ContatoPage")
);

const HomeLogadaPage = lazy(() =>
  import("./pages/HomeLogadaPage/HomeLogadaPage")
);

function App() {
  return (
    <>
      <Suspense fallback={<div>Carregando...</div>}>
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
      </Suspense>

      <WhatsAppButton />
    </>
  );
}

export default App;