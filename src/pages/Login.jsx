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

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const sanitize = (str) => {
    return String(str).replace(/</g, "&lt;").replace(/>/g, "&gt;");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading) return;

    if (!validateEmail(formData.email)) {
      toast.error("Email inválido!", { position: "top-center" });
      return;
    }

    if (formData.password.length < 6) {
      toast.error("A senha deve ter no mínimo 6 caracteres.", { position: "top-center" });
      return;
    }

    setLoading(true);

    await new Promise(resolve => setTimeout(resolve, 400));

    try {
      const response = await axios.post('https://devwareapi.contadinheiro.com/api/login',
        formData,
        { timeout: 10000 }
      );

      const token = response.data?.token;

      // Agora aceita qualquer token válido (string não vazia)
      if (!token || typeof token !== "string") {
        toast.error("Token inválido recebido do servidor.", {
          position: "top-center",
        });
        setLoading(false);
        return;
      }

      // Salva o token
      setToken(token);

      toast.success("✅ Login realizado com sucesso!", {
        position: "top-center",
        autoClose: 2000,
        theme: "colored",
      });

      setTimeout(() => navigate("/plataform"), 2000);

    } catch (error) {
      console.error("Erro no login:", error);

      const backendMessage =
        error.response?.data?.message ||
        error.response?.data?.error ||
        "Erro no login! Verifique seus dados e tente novamente.";

      toast.error(sanitize(backendMessage), {
        position: "top-center",
        autoClose: 3000,
        theme: "colored",
      });
    }

    setLoading(false);
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

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                required
                disabled={loading}
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Senha</label>
              <input
                type="password"
                id="password"
                value={formData.password}
                onChange={handleChange}
                required
                disabled={loading}
              />
            </div>

            <button
              type="submit"
              className="primary-button"
              disabled={loading}
            >
              {loading ? "Entrando..." : "Entrar"}
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

      <ToastContainer />
    </div>
  );
};

export default Login;
