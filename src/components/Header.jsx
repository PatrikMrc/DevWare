import React, { useContext } from 'react';
// 👈 Adicione useLocation
import { Link, useNavigate, useLocation } from 'react-router-dom';
import './styles/Header.css';
import logo from '../assets/Logo2.png';
import { AuthContext } from '../contexts/AuthContext';

function Header() {
  const { token, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  // 👈 Use o hook useLocation
  const location = useLocation(); 

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Verifica se o usuário está logado
  const isAuthenticated =
    token && token.trim() !== '' && token !== 'null' && token !== 'undefined';

  // 🚨 1. Defina o caminho da rota onde 'Planos' deve sumir.
  // Se a rota principal dos cursos (onde a lista é exibida) é '/courses', use ela.
  // Se você tiver uma rota específica como '/plataform', use-a.
  const routeToHidePlans = '/plataform'; // Exemplo: escondendo em /courses
  
  // 🚨 2. Verifica se a rota atual corresponde ao caminho de esconder 'Planos'.
  const shouldHidePlans = location.pathname === routeToHidePlans;

  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="logo">
          <img src={logo} alt="Logo da Empresa" />
        </Link>

        <nav className="nav-menu">
          <ul>
            {!shouldHidePlans && (
            <li><Link to="/">Início</Link></li>
            )}
            {!shouldHidePlans && (
            <li><Link to="/courses">Cursos</Link></li>
            )}
            {/* 🚨 3. Renderização Condicional: Mostra 'Planos' SOMENTE se shouldHidePlans for FALSE */}
            {!shouldHidePlans && (
              <li><Link to="/subscribe">Planos</Link></li>
            )}

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