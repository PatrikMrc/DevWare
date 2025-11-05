import React from 'react';
import CourseCard from '../components/CourseCard';
import './styles/Courses.css';
import reactImg from '../assets/react.svg';
import nodeImg from '../assets/node.jpg';
import uxuiImg from '../assets/uiux.jpg';
// Dados mockados para simular cursos
const mockCourses = [
  { id: '1', title: 'Fundamentos de React', description: 'Aprenda os conceitos essenciais do React.', image: reactImg, lessons: 10, duration: '20h' },
  { id: '2', title: 'Desenvolvimento Web com Node.js', description: 'Construa APIs robustas com Node.js e Express.', image: nodeImg, lessons: 15, duration: '30h' },
  { id: '3', title: 'Introdução ao UX/UI Design', description: 'Crie interfaces intuitivas e agradáveis.', image: uxuiImg, lessons: 8, duration: '15h' },
]
function Courses() {
  return (
    <div className="courses-page">
      <h1 className="page-title">Nossos Cursos</h1>
      <p className="page-description">Descubra uma variedade de cursos para impulsionar sua carreira.</p>

      <div className="courses-grid">
        {mockCourses.map(course => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </div>
  );
}

export default Courses;