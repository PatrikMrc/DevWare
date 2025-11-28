//Envio de dados via HTTPS, criptografado em trânsito
//Senhas não são logadas, Você não imprime formData.password
//Validação mínima de senha, verifica se coincidem, maior q 8 caracteres, 1 maiúscula, 1 minúscula, 1 número
//Uso de toast para evitar alert() Não afeta segurança, mas evita XSS via alert injection.
//brute-force responsavel e o servidor


//melhorias futuras: esconder rota da api. back-end precisa validar senhas de forma correta, não só no front-end. Melhorar armazenamento de token (cookies httpOnly) urgentemente.
// token em local storage pode ajudar ataques XSS

import { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import './styles/LoginRegister.css';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    password_confirmation: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);



  // Atualiza os campos
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  // Validação forte de senha
  const validatePassword = () => {
    const { password, password_confirmation } = formData;

    if (password !== password_confirmation) {
      toast.error('As senhas não coincidem!');
      return false;
    }

    if (password.length < 8) {
      toast.error('A senha deve ter no mínimo 8 caracteres.');
      return false;
    }

    if (!/[A-Z]/.test(password)) {
      toast.error('A senha deve conter ao menos uma letra maiúscula.');
      return false;
    }

    if (!/[a-z]/.test(password)) {
      toast.error('A senha deve conter ao menos uma letra minúscula.');
      return false;
    }

    if (!/[0-9]/.test(password)) {
      toast.error('A senha deve conter ao menos um número.');
      return false;
    }

    return true;
  };

  // Validação de email
  const validateEmail = () => {
    const { email } = formData;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      toast.error('Digite um email válido.');
      return false;
    }

    return true;
  };

  // Envia o formulário
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateEmail()) return;
    if (!validatePassword()) return;

    try {
      const response = await axios.post('https://devwareapi.contadinheiro.com/api/store', formData);

      toast.success('Cadastro realizado com sucesso!', {
        autoClose: 2000,
        onClose: () => navigate('/login'),
      });

    } catch (error) {
      console.error('Erro no cadastro:', error);

      const errorMessage =
        error.response?.data?.message ||
        error.response?.data?.error ||
        'Erro no cadastro! Tente novamente.';

      toast.error(errorMessage);
    }
  };

  return (
    <div className="page-container">
      <ToastContainer />

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
                  aria-label="Mostrar/ocultar senha"
                  onClick={() => setShowPassword(!showPassword)}
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
                  aria-label="Mostrar/ocultar confirmar senha"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
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
