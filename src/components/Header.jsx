import React from 'react';
import { Link } from 'react-router-dom';
import './styles/Header.css';
import logo from '../assets/Logo2.png'; // Certifique-se de ter um logo na pasta assets
function Header() {
  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="logo">
          <img src={logo} alt="Logo da Empresa" />
        </Link>
        <nav className="nav-menu">
          <ul>
            <li><Link to="/">Início</Link></li>
            <li><Link to="/courses">Cursos</Link></li>
            {/* Adicione outros links aqui, como "Planos", "Sobre", etc. */}
          </ul>
        </nav>
        <div className="auth-buttons">
          <button className="btn primary">Login</button>
          <button className="btn secondary">Cadastre-se</button>
        </div>
      </div>
    </header>
  );
}

export default Header;