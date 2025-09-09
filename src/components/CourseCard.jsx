import React from 'react';
import { Link } from 'react-router-dom';
import './styles/CourseCard.css';

function CourseCard({ course }) {
  return (
    <Link to={`/courses/${course.id}`} className="course-card">
      <img src={course.image} alt={course.title} className="course-card-image" />
      <div className="course-card-content">
        <h3 className="course-card-title">{course.title}</h3>
        <p className="course-card-description">{course.description}</p>
        <div className="course-card-info">
          <span>{course.lessons} Aulas</span>
          <span>{course.duration}</span>
        </div>
      </div>
    </Link>
  );
}

export default CourseCard;