import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import "./PlaceholderPage.css";

/**
 * Página modelo (template) para as próximas telas do figma:
 * Ela já vem com Navbar + Footer e o container padrão, seguindo o
 * mesmo esqueleto da LandingPage. Basta duplicar essa pasta,
 * renomear e substituir o conteúdo de dentro do <main>.
 */
function PlaceholderPage({ titulo }) {
  return (
    <>
      <Navbar />
      <main className="placeholder-page container">
        <h1>{titulo}</h1>
        <p>Tela em construção — próxima etapa do frontend.</p>
      </main>
      <Footer />
    </>
  );
}

export default PlaceholderPage;
