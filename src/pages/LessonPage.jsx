import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import './styles/LessonPage.css';

// Dados mockados para simular aulas e seu conteúdo
const mockCourseLessons = {
  '1': { // courseId '1' (Fundamentos de React)
    '101': {
      title: 'Introdução ao React',
      videoUrl: 'https://www.youtube.com/embed/videoseries?list=PLHz_ArekwmknHh_i0TjK6P7NnCqA-ptQ-', // Exemplo de vídeo
      description: 'Nesta aula, faremos uma introdução ao React, seus principais conceitos e como configurar seu ambiente de desenvolvimento.',
      nextLessonId: '102',
    },
    '102': {
      title: 'Componentes e Props',
      videoUrl: 'https://www.youtube.com/embed/videoseries?list=PLHz_ArekwmknHh_i0TjK6P7NnCqA-ptQ-',
      description: 'Aprenda a criar componentes funcionais e de classe, e como passar dados entre eles utilizando props.',
      prevLessonId: '101',
      nextLessonId: '103',
    },
    '103': {
        title: 'Estado e Ciclo de Vida',
        videoUrl: 'https://www.youtube.com/embed/videoseries?list=PLHz_ArekwmknHh_i0TjK6P7NnCqA-ptQ-',
        description: 'Entenda o conceito de estado em React e como gerenciar o ciclo de vida dos componentes.',
        prevLessonId: '102',
        nextLessonId: '104',
    },
    '104': {
        title: 'Trabalhando com Hooks',
        videoUrl: 'https://www.youtube.com/embed/videoseries?list=PLHz_ArekwmknHh_i0TjK6P7NnCqA-ptQ-',
        description: 'Explore os principais Hooks do React, como useState, useEffect e useContext, para otimizar seus componentes funcionais.',
        prevLessonId: '103',
    },
  },
  // ... outros cursos e suas aulas
};

function LessonPage() {
  const { courseId, lessonId } = useParams();
  const lesson = mockCourseLessons[courseId]?.[lessonId];

  // Estado para anotações
  const [notes, setNotes] = useState('');
  const handleNotesChange = (e) => {
    setNotes(e.target.value);
  };

  // Estado para novos comentários
  const [newComment, setNewComment] = useState('');
  const [comments, setComments] = useState([
    { id: 1, author: 'Aluno A', text: 'Ótima aula, bem explicada!', timestamp: 'Há 2 dias' },
    { id: 2, author: 'Aluno B', text: 'Poderiam detalhar mais sobre o ciclo de vida.', timestamp: 'Há 1 dia' },
  ]);

  const handleCommentChange = (e) => {
    setNewComment(e.target.value);
  };

  const addComment = () => {
    if (newComment.trim()) {
      setComments([...comments, { id: comments.length + 1, author: 'Você', text: newComment, timestamp: 'Agora' }]);
      setNewComment('');
    }
  };

  if (!lesson) {
    return <div className="lesson-page">Aula não encontrada.</div>;
  }

  const { prevLessonId, nextLessonId } = mockCourseLessons[courseId][lessonId];

  return (
    <div className="lesson-page">
      <div className="lesson-video-section">
        <h1>{lesson.title}</h1>
        <p className="lesson-description">{lesson.description}</p>
        <div className="video-player-container">
          <iframe
            width="100%"
            height="450"
            src={lesson.videoUrl}
            title={lesson.title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
        <div className="progress-bar-container">
          <div className="progress-bar-fill" style={{ width: '75%' }}></div> {/* Exemplo de progresso */}
          <span>75% Concluído</span>
        </div>
        <div className="lesson-navigation">
          {prevLessonId && (
            <Link to={`/courses/${courseId}/lesson/${prevLessonId}`} className="nav-button prev">
              &lt; Aula Anterior
            </Link>
          )}
          {nextLessonId && (
            <Link to={`/courses/${courseId}/lesson/${nextLessonId}`} className="nav-button next">
              Próxima Aula &gt;
            </Link>
          )}
        </div>
      </div>

      <div className="lesson-interaction-section">
        <div className="notes-section">
          <h2>Minhas Anotações</h2>
          <textarea
            className="notes-textarea"
            placeholder="Escreva suas anotações aqui..."
            value={notes}
            onChange={handleNotesChange}
          ></textarea>
          <button className="save-notes-button">Salvar Anotações</button>
        </div>

        <div className="comments-section">
          <h2>Comentários</h2>
          <div className="comment-list">
            {comments.map(comment => (
              <div key={comment.id} className="comment-item">
                <p className="comment-author">{comment.author} <span className="comment-timestamp">{comment.timestamp}</span></p>
                <p className="comment-text">{comment.text}</p>
              </div>
            ))}
          </div>
          <div className="new-comment-form">
            <textarea
              placeholder="Adicione um comentário..."
              value={newComment}
              onChange={handleCommentChange}
            ></textarea>
            <button onClick={addComment}>Enviar Comentário</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LessonPage;