import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import Button from "../../components/Button/Button";
import "./LandingPage.css";
import voleiFoto from "../../assets/images/istockphoto-volei.jpg";
import marcandoFoto from "../../assets/images/istockphoto-marcando.jpg";
import calendarioFoto from "../../assets/images/istockphoto-calendario.jpg";
import camilaFoto from "../../assets/images/camila_vitoria.jpg";
import carlosFoto from "../../assets/images/carlos_leoneollo.jpg";
import claraFoto from "../../assets/images/clara_vianna.jpg";
import dennisFoto from "../../assets/images/dennis_eduardo.jpg";
import gabrielFoto from "../../assets/images/gabriel_mendonca.jpg";
import igorFoto from "../../assets/images/igor_ezequiel.png";
import vitorFoto from "../../assets/images/vitor_pantoja.jpeg";

const diferenciais = [
  {
    icon: "⏱️",
    titulo: "Reserva Rápida",
    descricao:
      "Escolha a quadra, o dia e o horário disponível e confirme sua reserva em menos de um minuto, sem ligações ou grupos de mensagens.",
    imagem: marcandoFoto,
  },
  {
    icon: "🤝",
    titulo: "Comunidade Ativa",
    descricao:
      "Conecte-se com outros jogadores da sua região, monte suas partidas e mantenha a quadra sempre em uso.",
    imagem: voleiFoto,
  },
  {
    icon: "📊",
    titulo: "Gestão Simples",
    descricao:
      "Acompanhe a agenda de cada quadra em tempo real e evite conflitos de horário com validação automática.",
    imagem: calendarioFoto,
  },
];

const depoimentos = [
  {
    texto:
      "Antes a gente combinava tudo por grupo de WhatsApp e sempre dava confusão de horário. Com o AVAFS Quadras isso acabou.",
    nome: "Camila Vitória",
    foto: camilaFoto,
  },
  {
    texto:
      "Consigo ver a agenda da quadra de vôlei em segundos e já reservo o horário livre direto pelo celular.",
    nome: "Carlos Leonello",
    foto: carlosFoto,
  },
  {
    texto:
      "Uso para organizar as partidas de tênis do condomínio. Simples, rápido e sem conflito de reservas.",
    nome: "Clara Vianna",
    foto: claraFoto,
  },
  {
    texto:
      "Consigo reservar com antecedencia pelo celular, é super fácil de usar.",
    nome: "Gabriel de Mendonça",
    foto: gabrielFoto,
  },
  {
    texto:
      "Nunca mais tivemos que ir correndo de manhã para pegar a quadra de basquete primeiro.",
    nome: "Dennis Eduardo Araújo",
    foto: dennisFoto,
  },
  {
    texto:
      "Jogar futebol com o pessoal do trabalho ficou muito mais fácil.",
    nome: "Igor Ezequiel Barreto",
    foto: igorFoto
  },
  {
    texto:
      "Eu reservo a quadra para jogar bola com minha filha. É muito prático.",
    nome: "Vitor Pantoja",
    foto: vitorFoto,
  },
];

function LandingPage() {
  return (
    <>
      <Navbar />

      {/* ---------- Hero ---------- */}
      <section className="hero">
        <div className="hero__overlay" />
        <div className="container hero__content">
          <h1 className="hero__title">
            Reserve sua quadra em poucos cliques
          </h1>
          <p className="hero__subtitle">
            Organize partidas, evite conflitos de horário e mantenha sua
            comunidade esportiva sempre ativa em um único lugar.
          </p>
          <Button to="/quadras">Agende Agora</Button>
        </div>
      </section>

      {/* ---------- Diferenciais ---------- */}
      <section className="section features">
        <div className="container">
          <h2 className="section__title">Por que usar o AVAFS Quadras</h2>
          <span className="section__underline" />

          <div className="features__grid">
            {diferenciais.map((item) => (
              <article className="feature-card" key={item.titulo}>
                <div className="feature-card__icon">{item.icon}</div>
                <h3 className="feature-card__title">{item.titulo}</h3>
                <p className="feature-card__text">{item.descricao}</p>
                <img
                  src={item.imagem}
                  alt={item.titulo}
                  className="feature-card__image"
              />
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Relatos ---------- */}
      <section className="section testimonials">
        <div className="container">
          <div className="testimonials__header">
            <div>
              <h2 className="testimonials__title">Relatos</h2>
              <p className="testimonials__subtitle">
                Quem já usa AVAFS Quadras conta como foi a experiência
              </p>
            </div>
          </div>

          <div className="testimonials__grid">
            {depoimentos.map((depoimento) => (
              <article className="testimonial-card" key={depoimento.nome}>
                <p className="testimonial-card__text">{depoimento.texto}</p>
                <div className="testimonial-card__author">
                  <img
                    src={depoimento.foto}
                    alt={depoimento.nome}
                    className="testimonial-card__avatar"
                  />
                  <span>{depoimento.nome}</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- CTA final ---------- */}
      <section className="section cta">
        <div className="container cta__content">
          <h2>Comece agora mesmo</h2>
          <p>
            Cadastre-se gratuitamente e organize as partidas da sua quadra hoje mesmo.
          </p>
          <Button to="/cadastro">Criar Conta</Button>
        </div>
      </section>

      <Footer />
    </>
  );
}

export default LandingPage;
