import { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './styles/LoginRegister.css';
import axios from 'axios';


const Register = () => {


  const [formData, setFormData] = useState({
    email: '',
    password: '',
    password_confirmation: '', // Corresponde ao Laravel
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // 2. Lida com a mudança nos inputs para atualizar o state
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleConfirmPasswordVisibility = () => setShowConfirmPassword(!showConfirmPassword);

  // 3. Lida com o envio do formulário de forma assíncrona
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Opcional: Validação básica do lado do cliente
    if (formData.password !== formData.password_confirmation) {
      alert('As senhas não coincidem!');
      return;
    }

    try {
      // 4. Faz a requisição POST com Axios
      const response = await axios.post('http://127.0.0.1:8000/api/register', formData);
      
      // 5. Lida com a resposta de sucesso
      console.log('Cadastro bem-sucedido!', response.data);
      alert('Cadastro realizado com sucesso! Redirecionando para a página de login...');
      // Ex: Redirecionar para a página de login
      // window.location.href = '/login'; 
    
    } catch (error) {
      // 6. Lida com erros da requisição
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
            <Link to='/login'>
              <button type="submit" className="primary-button">Cadastrar</button>
            </Link>
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