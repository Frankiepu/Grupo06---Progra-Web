// src/components/Footer.jsx
import React from 'react';

function Footer() {
  const FacebookIcon = () => <span role="img" aria-label="Facebook">📘</span>;
  const InstagramIcon = () => <span role="img" aria-label="Instagram">📸</span>;
  const TwitterIcon = () => <span role="img" aria-label="Twitter">🐦</span>;
  const YoutubeIcon = () => <span role="img" aria-label="YouTube">▶️</span>;

  return (
    <footer className="app-footer">
      <div className="container footer-container">
        <div className="footer-grid">
          <div className="footer-column">
            <h5 className="footer-heading">MiTienda</h5>
            <p>
              Tu tienda online de confianza para encontrar los mejores productos a precios increíbles. Calidad y servicio garantizados.
            </p>
            <div className="social-icons">
              <a href="#" aria-label="Facebook"><FacebookIcon /></a>
              <a href="#" aria-label="Instagram"><InstagramIcon /></a>
              <a href="#" aria-label="Twitter"><TwitterIcon /></a>
              <a href="#" aria-label="Youtube"><YoutubeIcon /></a>
            </div>
          </div>

          <div className="footer-column">
            <h5 className="footer-heading">Enlaces Útiles</h5>
            <ul className="footer-links">
              <li><a href="#">Sobre Nosotros</a></li>
              <li><a href="#">Contáctanos</a></li>
              <li><a href="#">Preguntas Frecuentes (FAQ)</a></li>
              <li><a href="#">Política de Privacidad</a></li>
              <li><a href="#">Términos y Condiciones</a></li>
            </ul>
          </div>

          <div className="footer-column">
            <h5 className="footer-heading">Mi Cuenta</h5>
            <ul className="footer-links">
              <li><a href="#">Iniciar Sesión</a></li>
              <li><a href="#">Registrarse</a></li>
              <li><a href="#">Mis Pedidos</a></li>
              <li><a href="#">Seguimiento de Envío</a></li>
            </ul>
          </div>

          <div className="footer-column">
            <h5 className="footer-heading">Suscríbete a Novedades</h5>
            <p>Recibe ofertas exclusivas y las últimas noticias directamente en tu correo.</p>
            <form className="newsletter-form">
              <input type="email" placeholder="Tu correo electrónico" className="newsletter-input" />
              <button type="submit" className="newsletter-button">Suscribir</button>
            </form>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} MiTienda. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
