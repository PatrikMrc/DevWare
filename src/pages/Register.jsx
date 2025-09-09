import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import './styles/LoginRegister.css';

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleConfirmPasswordVisibility = () => setShowConfirmPassword(!showConfirmPassword);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Tentativa de cadastro!');
  };

  return (
    <div className="page-container">
      <div className="main-content">
        <div className="header-banner">
          <h1 className="banner-title">Crie sua conta e comece a aprender.</h1>
          <p className="banner-subtitle">Preencha os campos abaixo para criar seu perfil.</p>
        </div>
        <div className="auth-card">
          <h2 className="auth-title-card">Cadastrar</h2>
          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" required />
            </div>
            <div className="form-group">
              <label htmlFor="password">Senha</label>
              <div className="password-input-container">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  required
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="toggle-password"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirmar Senha</label>
              <div className="password-input-container">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  id="confirmPassword"
                  required
                />
                <button
                  type="button"
                  onClick={toggleConfirmPasswordVisibility}
                  className="toggle-password"
                >
                  {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>
            <button type="submit" className="primary-button">Cadastrar</button>
          </form>
          <div className="auth-links">
            Já tem uma conta? <a href="/login">Clique aqui para fazer login</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;