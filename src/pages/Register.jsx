import { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import './styles/LoginRegister.css';
import axios from 'axios';

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    password_confirmation: '', // nome esperado pelo Laravel
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Atualiza o state conforme o usuário digita
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  // Mostra/oculta senha
  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleConfirmPasswordVisibility = () => setShowConfirmPassword(!showConfirmPassword);

  // Envia o formulário
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validação básica
    if (formData.password !== formData.password_confirmation) {
      alert('As senhas não coincidem!');
      return;
    }

    try {
      // Faz a requisição para a API Laravel
      const response = await axios.post('http://127.0.0.1:8000/api/store', formData);

      console.log('Cadastro bem-sucedido!', response.data);

      // Redireciona para a tela de login
      navigate('/login');
    } catch (error) {
      console.error('Erro no cadastro!', error.response ? error.response.data : error.message);
      const errorMessage = error.response?.data?.message || 'Erro no cadastro! Tente novamente.';
      alert(errorMessage);
    }
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
              <div className="password-input-container">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  value={formData.password}
                  onChange={handleChange}
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

            {/* CONFIRMAR SENHA */}
            <div className="form-group">
              <label htmlFor="password_confirmation">Confirmar Senha</label>
              <div className="password-input-container">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  id="password_confirmation"
                  value={formData.password_confirmation}
                  onChange={handleChange}
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

            {/* BOTÃO DE ENVIO */}
            <button type="submit" className="primary-button">
              Cadastrar
            </button>
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
