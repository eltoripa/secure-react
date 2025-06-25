import React from 'react';


const Footer = () => {
  //Pie de pagina de la pagina web que incluye las paginas de contacto.
  return (
    <footer className="pie">
      <div className="redes">
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
          <img
            src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/facebook/facebook-original.svg"
            alt="Facebook"
          />
        </a>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
          <img
            src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/twitter/twitter-original.svg"
            alt="Twitter"
          />
        </a>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
          <img src="ig.jpg" alt="Instagram" />
        </a>
      </div>
      <p className="mensaje-final">
        © 2025 Secure. Protegiendo lo que más importa. Todos los derechos reservados.
      </p>
    </footer>
  );
};

export default Footer;

