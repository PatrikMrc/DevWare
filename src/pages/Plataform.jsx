// src/pages/Plataform.js
import React, { useState, useEffect } from 'react';
import CourseCard from '../components/CourseCard';    // <-- NOVO: Importa o Header
import HeroBanner from '../components/HeroBanner'; // <-- NOVO: Importa o Banner                         // <-- Importa o CSS principal
import './styles/Plataform.css';
// Sua URL da API (ajuste se necessário)
const API_URL = 'https://devwareapi.contadinheiro.com/api/cursos'; 

function Plataform() {
  const [cursos, setCursos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCursos = async () => {
      try {
        const response = await fetch(API_URL);
        
        if (!response.ok) {
          throw new Error(`Erro HTTP: status ${response.status}`);
        }
        
        const data = await response.json();
        setCursos(data); 
      } catch (err) {
        console.error("Falha ao buscar cursos:", err);
        setError("Não foi possível carregar os cursos. Tente novamente mais tarde.");
      } finally {
        setLoading(false);
      }
    };

    fetchCursos();
  }, []);

  const renderContent = () => {
    if (loading) {
      // Adicione estilos para 'loading-state' no seu App.css
      return <p className="loading-state" style={{ textAlign: 'center', padding: '50px' }}>Carregando cursos...</p>;
    }

    if (error) {
      return <p className="error-state" style={{ textAlign: 'center', color: 'red', padding: '50px' }}>{error}</p>;
    }
    
    if (cursos.length === 0) {
      return <p className="no-courses" style={{ textAlign: 'center', padding: '50px' }}>Nenhum curso disponível no momento.</p>;
    }

    return (
      // Classe 'course-grid' definida no App.css para o layout de grade
      <div className="course-grid"> 
        {cursos.map(course => (
          <CourseCard 
            key={course.id || course.slug} 
            course={course} 
          />
        ))}
      </div>
    );
  };

  return (
    <div className="homepage-container">
      <HeroBanner />
      
      <main className="main-content">
        <h2 className="section-title">
          Explore Todos os Nossos Cursos Disponíveis
        </h2>
        
        {renderContent()}
      </main>
    </div>
  );
}

export default Plataform;