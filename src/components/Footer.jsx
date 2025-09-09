import React from 'react';
import './styles/Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <p>&copy; {new Date().getFullYear()} Nome da Empresa. Todos os direitos reservados.</p>
        <nav className="footer-nav">
          <ul>
            <li><a href="#privacy">Política de Privacidade</a></li>
            <li><a href="#terms">Termos de Uso</a></li>
            <li><a href="#contact">Contato</a></li>
          </ul>
        </nav>
      </div>
    </footer>
  );
}

export default Footer;