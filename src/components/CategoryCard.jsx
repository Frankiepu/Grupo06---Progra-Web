import React from 'react';

function CategoryCard({ category }) {
  return (
    <a href="#" className="category-card">
      <img
        src={category.imageUrl}
        alt={`Explorar categoría ${category.name}`}
        className="category-image"
        onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/400x300/cccccc/000000?text=Categoría"; }}
      />
      <div className="category-name-overlay">
        <h3>{category.name}</h3>
      </div>
    </a>
  );
}

export default CategoryCard;