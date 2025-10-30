import React from 'react';
import { Link } from 'react-router-dom';
import './styles/Home.css';

function Home() {
  return (
    <div className="home-page">
      <section className="hero-section">
        <h1>Bem-vindo à Plataforma de Cursos DevWare!</h1>
        <p>Aprenda, cresça e domine novas habilidades com nossos cursos especializados.</p>
        <Link to="/courses" className="btn-primary">Explorar Cursos</Link>
      </section>

      <section className="features-section">
        <h2>Por que escolher nossa plataforma?</h2>
        <div className="features-grid">
          <div className="feature-item">
            <h3>Conteúdo de Qualidade</h3>
            <p>Aulas elaboradas por especialistas do mercado.</p>
          </div>
          <div className="feature-item">
            <h3>Flexibilidade</h3>
            <p>Estude no seu ritmo, de qualquer lugar e a qualquer hora.</p>
          </div>
          <div className="feature-item">
            <h3>Suporte Dedicado</h3>
            <p>Tire suas dúvidas e interaja com a comunidade.</p>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <h2>Pronto para começar sua jornada de aprendizado?</h2>
        <Link to="/courses" className="btn-secondary">Ver todos os cursos</Link>
      </section>
    </div>
  );
}

export default Home;