import React from 'react';
import './styles/PlanCard.css';

function PlanCard({ title, price, description, isFeatured }) {
  return (
    <div className={`subs-card ${isFeatured ? 'featured' : ''}`}>
      {isFeatured && <span className="badge">Melhor Custo-Benefício</span>}
      <h2>{title}</h2>
      <p className="price">{price}</p>
      <p className="description">{description}</p>
      <button className="subs-btn">
        Assinar {title.split(' ')[1]}
      </button>
    </div>
  );
}

export default PlanCard;