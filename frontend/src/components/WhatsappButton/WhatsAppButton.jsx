export default function WhatsAppButton() {
  const numeroSuporte = "5585999999999";
  const mensagemPadrao = "Olá! Gostaria de tirar dúvidas sobre as reservas de quadras.";
  const urlFormatada = `https://wa.me/${numeroSuporte}?text=${encodeURIComponent(mensagemPadrao)}`;

  return (
    <a
      href={urlFormatada}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Fale Conosco pelo WhatsApp"
      style={{
        position: "fixed",
        bottom: "36px", // Elevado para não colar no rodapé
        right: "32px",  // Respiro da barra de rolagem
        backgroundColor: "#25D366",
        color: "#ffffff",
        borderRadius: "50%",
        width: "60px",
        height: "60px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: "0 6px 16px rgba(0, 0, 0, 0.2)",
        zIndex: 1000,
        textDecoration: "none",
        cursor: "pointer",
        transition: "transform 0.2s ease, box-shadow 0.2s ease",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.08)")}
      onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
    >
      <svg
        width="34"
        height="34"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2Z"
          fill="#ffffff"
        />
        <path
          d="M17.52 14.33C17.22 14.18 15.76 13.46 15.49 13.36C15.22 13.26 15.02 13.21 14.82 13.51C14.62 13.81 14.05 14.48 13.88 14.68C13.71 14.88 13.54 14.9 13.24 14.75C12.94 14.6 11.98 14.29 10.85 13.28C9.97 12.5 9.38 11.53 9.21 11.23C9.04 10.93 9.19 10.77 9.34 10.62C9.48 10.49 9.65 10.26 9.8 10.09C9.95 9.92 10 9.79 10.1 9.59C10.2 9.39 10.15 9.22 10.08 9.07C10 8.92 9.4 7.45 9.15 6.85C8.91 6.27 8.66 6.35 8.48 6.34H7.91C7.71 6.34 7.39 6.41 7.12 6.71C6.85 7.01 6.08 7.73 6.08 9.2C6.08 10.67 7.15 12.09 7.3 12.29C7.45 12.49 9.4 15.49 12.38 16.78C13.09 17.09 13.65 17.27 14.08 17.41C14.79 17.64 15.44 17.61 15.96 17.53C16.54 17.44 17.74 16.8 17.99 16.1C18.24 15.4 18.24 14.8 18.17 14.68C18.09 14.55 17.82 14.48 17.52 14.33Z"
          fill="#25D366"
        />
      </svg>
    </a>
  );
}