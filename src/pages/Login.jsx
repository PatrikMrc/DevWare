import './styles/LoginRegister.css';
import axios from 'axios';
import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const navigate = useNavigate();
  const { setToken } = useContext(AuthContext);

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
      const response = await axios.post('https://devwareapi.contadinheiro.com/api/login', formData);
      const token = response.data?.token;

      if (token) {
        setToken(token);

        // Toast de sucesso
        toast.success('✅ Login realizado com sucesso!', {
          position: 'top-center',
          autoClose: 2000,
          theme: 'colored',
        });

        // Redireciona após o toast
        setTimeout(() => navigate('/plataform'), 2000);
      } else {
        toast.warning('⚠️ Nenhum token recebido. Verifique o backend.', {
          position: 'top-center',
          autoClose: 3000,
          theme: 'colored',
        });
      }
    } catch (error) {
      console.error('Erro no login!', error.response ? error.response.data : error.message);

      toast.error('❌ Erro no login! Verifique suas credenciais e tente novamente.', {
        position: 'top-center',
        autoClose: 3000,
        theme: 'colored',
      });
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

      {/* Container obrigatório do Toastify */}
      <ToastContainer />
    </div>
  );
};

export default Login;
