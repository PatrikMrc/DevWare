// src/components/CourseCard.js
import React from 'react';
import { Link } from 'react-router-dom';
import './styles/CourseCard.css'; // Assumindo este caminho

function CourseCard({ course }) {
  // Ajuste as URLs de imagem/ícone conforme seu back-end
  const iconFallback = course.image ? course.image : 'caminho/para/icone-padrao.png';

  return (
    <Link to={`/courses/${course.id}`} className="course-card">
      {/* Aqui você pode usar a imagem ou ícone do curso */}
      <div className="course-card-image-container">
          <img src={iconFallback} alt={course.title} className="course-card-image" />
      </div>
      
      <div className="course-card-content">
        <h3 className="course-card-title">{course.title}</h3>
        
        {/* Usamos a descrição ou a exibição de duração/aulas no lugar */}
        <p className="course-card-description">{course.description}</p> 

        <div className="course-card-info">
          {/* Se a duração for o Nível, ajuste a prop name do seu backend */}
          <span className="info-item">{course.lessons} Aulas</span>
          <span className="info-item">{course.duration}</span> 
        </div>

        {/* Botão "Ver Detalhes" para manter o visual do card, mesmo sendo um Link */}
        <button className="details-button-link">Ver Detalhes</button> 
      </div>
    </Link>
  );
}

export default CourseCard;