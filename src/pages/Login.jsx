import './styles/LoginRegister.css';    

const Login = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Tentativa de login!');
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
            <button type="submit" className="primary-button">Entrar</button>
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