import React from 'react';
import './styles/PlanCard.css';
import { Link } from 'react-router-dom';
function PlanCard({ title, price, description, isFeatured, onSelect }) {
  return (
    <div className={`subs-card ${isFeatured ? 'featured' : ''}`}>
      {isFeatured && <span className="badge">Melhor Custo-Benefício</span>}
      <h2>{title}</h2>
      <p className="price">{price}</p>
      <p className="description">{description}</p>
      <button className="subs-btn" onClick={onSelect}>
        Assinar {title.split(' ')[1]}
      </button>
    </div>
  );
}

export default PlanCard;