import React from 'react';
import { useParams, Link } from 'react-router-dom';
import './styles/CourseDetail.css';

// Dados mockados para simular detalhes do curso e aulas
const mockCourses = [
  { 
    id: '1', 
    title: 'Fundamentos de React', 
    description: 'Aprenda os conceitos essenciais do React, desde componentes e props até hooks e gerenciamento de estado. Ideal para quem está começando no desenvolvimento front-end com React.', 
    image: 'https://via.placeholder.com/600x300?text=React+Course', 
    lessons: [
      { id: '101', title: 'Introdução ao React', duration: '15min' },
      { id: '102', title: 'Componentes e Props', duration: '20min' },
      { id: '103', title: 'Estado e Ciclo de Vida', duration: '25min' },
      { id: '104', title: 'Trabalhando com Hooks', duration: '30min' },
    ],
    duration: '20h',
    level: 'Iniciante',
    instructor: 'João Silva',
  },
  // ... outros cursos mockados
];

function CourseDetail() {
  const { courseId } = useParams();
  const course = mockCourses.find(c => c.id === courseId);

  if (!course) {
    return <div className="course-detail-page">Curso não encontrado.</div>;
  }

  return (
    <div className="course-detail-page">
      <div className="course-header">
        <img src={course.image} alt={course.title} className="course-cover-image" />
        <div className="course-info">
          <h1>{course.title}</h1>
          <p className="course-description">{course.description}</p>
          <div className="course-meta">
            <span>Duração: {course.duration}</span>
            <span>Nível: {course.level}</span>
            <span>Instrutor: {course.instructor}</span>
          </div>
          <Link to="/subscribe"><button className="enroll-button">Assinar Agora</button></Link>
        </div>
      </div>

      <div className="course-content-section">
        <h2>Conteúdo do Curso</h2>
        <ul className="lesson-list">
          {course.lessons.map(lesson => (
            <li key={lesson.id} className="lesson-item">
              <div className="lesson-link">
                <span>Aula {lesson.id.slice(-2)}: {lesson.title}</span>
                <span className="lesson-duration">{lesson.duration}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="course-additional-info">
        <h2>O que você vai aprender</h2>
        <ul>
            <li>Criar componentes reutilizáveis.</li>
            <li>Gerenciar o estado da aplicação.</li>
            <li>Utilizar Hooks como useState e useEffect.</li>
            <li>Desenvolver aplicações SPA (Single Page Application).</li>
        </ul>
        <h2>Pré-requisitos</h2>
        <ul>
            <li>Conhecimentos básicos de HTML, CSS e JavaScript.</li>
        </ul>
      </div>
    </div>
  );
}

export default CourseDetail;