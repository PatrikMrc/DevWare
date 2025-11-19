import React, { useState, useEffect } from 'react'; // 👈 Importe useState e useEffect
import CourseCard from '../components/CourseCard';
import './styles/Courses.css';

// 🚨 SUBSTITUA esta URL pela URL REAL da sua API que retorna a lista de cursos
const API_URL = 'https://suaapi.com.br/api/cursos'; 

function Courses() {
  // 1. Estado para armazenar os cursos da API
  const [courses, setCourses] = useState([]);
  // 2. Estado para controlar se os dados estão sendo carregados
  const [loading, setLoading] = useState(true);
  // 3. Estado para armazenar possíveis erros na requisição
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch(API_URL);
        
        // Verifica se a resposta HTTP foi bem-sucedida (status 200-299)
        if (!response.ok) {
          throw new Error(`Erro ao buscar dados: status ${response.status}`);
        }
        
        const data = await response.json();
        // Assume que a API retorna um array de cursos
        setCourses(data); 
      } catch (err) {
        console.error("Falha na requisição da API:", err);
        setError("Não foi possível carregar os cursos. Por favor, tente novamente.");
      } finally {
        // Define loading como false, independente do sucesso ou falha
        setLoading(false);
      }
    };

    fetchCourses();
  }, []); // O array vazio garante que a função execute apenas na montagem

  // Lógica de Renderização Condicional
  if (loading) {
    return <p className="loading-state">Carregando cursos...</p>;
  }

  if (error) {
    return <p className="error-state">{error}</p>;
  }

  // Se não houver cursos após o carregamento
  if (courses.length === 0) {
    return <p className="no-courses">Nenhum curso disponível no momento.</p>;
  }

  return (
    <div className="courses-page">
      <h1 className="page-title">Nossos Cursos</h1>
      <p className="page-description">Descubra uma variedade de cursos para impulsionar sua carreira.</p>

      <div className="courses-grid">
        {/* Mapeia os dados REAIS da API */}
        {courses.map(course => (
          <CourseCard 
            key={course.id || course.slug} // Use a propriedade que identifica unicamente o curso no seu DB
            course={course} 
          />
        ))}
      </div>
    </div>
  );
}

export default Courses;