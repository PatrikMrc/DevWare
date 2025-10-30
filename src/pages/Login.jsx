import './styles/LoginRegister.css';    
import axios from 'axios';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
  // 1. Use state para gerenciar os dados do formulário
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  // 2. Lida com a mudança nos inputs para atualizar o state
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  // 3. Lida com o envio do formulário, agora de forma assíncrona
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // 4. Faz a requisição POST com Axios
      const response = await axios.post('http://127.0.0.1:8000/api/login', formData);
      
      const token = response.data?.token;

      if (token) {
        localStorage.setItem('authToken', token); // salva o token
        alert('Login realizado com sucesso!');

        // redireciona
        window.location.href = '/plataform'; 
      } else {
        alert('Nenhum token recebido. Verifique o backend.');
      }
      
    } catch (error) {
      // 6. Lida com erros da requisição
      console.error('Erro no login!', error.response ? error.response.data : error.message);
      alert('Erro no login! Verifique suas credenciais.');
    }
  };

  return (
    <div className="page-container">
      <div className="main-content">
        <div className="header-banner">
          <h1 className="banner-title">Junte-se à Plataforma DevWare</h1>
          <p className="banner-subtitle">Crie sua conta e comece a aprender.</p>
        </div>
        <div className="auth-card">
          <h2 className="auth-title-card">Bem-vindo de volta!</h2>
          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" required />
            </div>
            <div className="form-group">
              <label htmlFor="password">Senha</label>
              <input type="password" id="password" required />
            </div>
            <Link to='/plataform'>
              <button type="submit" className="primary-button">Entrar</button>
            </Link>
          </form>
          <div className="auth-links">
            <a href="/forgot-password">Esqueceu sua senha?</a>
          </div>
          <div className="auth-links">
            Não tem uma conta? <a href="/register">Cadastre-se</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;