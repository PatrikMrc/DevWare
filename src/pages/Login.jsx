import './styles/LoginRegister.css';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();

  // State para armazenar os dados do formulário
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  // Atualiza o state conforme o usuário digita
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  // Envia o formulário
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Faz a requisição POST para o backend
      const response = await axios.post('http://127.0.0.1:8000/api/login', formData);

      const token = response.data?.token;

      if (token) {
        localStorage.setItem('authToken', token); // salva o token
        navigate('/plataform'); // redireciona para a plataforma
      } else {
        alert('Nenhum token recebido. Verifique o backend.');
      }

    } catch (error) {
      console.error('Erro no login!', error.response ? error.response.data : error.message);
      alert('Erro no login! Verifique suas credenciais ou tente novamente.');
    }
  };

  return (
    <div className="page-container">
      <div className="main-content">
        <div className="header-banner">
          <h1 className="banner-title">Bem-vindo à DevWare</h1>
          <p className="banner-subtitle">Acesse sua conta e continue aprendendo.</p>
        </div>

        <div className="auth-card">
          <h2 className="auth-title-card">Fazer Login</h2>

          <form onSubmit={handleSubmit} className="auth-form">
            {/* EMAIL */}
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            {/* SENHA */}
            <div className="form-group">
              <label htmlFor="password">Senha</label>
              <input
                type="password"
                id="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            {/* BOTÃO */}
            <button type="submit" className="primary-button">
              Entrar
            </button>
          </form>

          <div className="auth-links">
            <a href="/forgot-password">Esqueceu sua senha?</a>
          </div>

          <div className="auth-links">
            Não tem uma conta? <Link to="/register">Cadastre-se</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
