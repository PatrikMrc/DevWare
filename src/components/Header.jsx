import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './styles/Header.css';
import logo from '../assets/Logo2.png';
import { AuthContext } from '../contexts/AuthContext';

function Header() {
  const { token, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Verifica se o usuário está logado
  const isAuthenticated =
    token && token.trim() !== '' && token !== 'null' && token !== 'undefined';

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
            <li><Link to="/subscribe">Planos</Link></li>
          </ul>
        </nav>

        <div className="auth-buttons">
          {isAuthenticated ? (
            <button className="btn logout" onClick={handleLogout}>
              Sair
            </button>
          ) : (
            <>
              <Link to="/login">
                <button className="btn primary">Login</button>
              </Link>
              <Link to="/register">
                <button className="btn secondary">Cadastre-se</button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
export default Header;
