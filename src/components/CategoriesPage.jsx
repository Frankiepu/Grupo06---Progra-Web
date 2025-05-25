
import React, { useState } from 'react';
import { featuredProducts } from './HomePage';      // array de productos destacados :contentReference[oaicite:0]{index=0}
import ProductCard from './ProductCard';            // tu tarjeta de producto :contentReference[oaicite:1]{index=1}
import './CategoriesPage.css';

const categoryMap = {
  'Lácteos'  : 'Lácteos',
  'Pollo'    : 'Carnes, aves y pescado',
  'Fruta'    : 'Frutas y verduras',
  'Abarrotes': 'Abarrotes',
};

export default function CategoriesPage({ addToCart }) {
  const fixedCats = ['Lácteos', 'Pollo', 'Fruta', 'Abarrotes'];
  const [selectedCat, setSelectedCat] = useState(fixedCats[0]);

  const filtered = featuredProducts.filter(
    p => p.category === categoryMap[selectedCat]
  );

  return (
    <div className="categories-page">
      <aside className="categories-sidebar">
        <h2>Categorías</h2>
        <ul>
          {fixedCats.map(cat => (
            <li
              key={cat}
              className={cat === selectedCat ? 'active' : ''}
              onClick={() => setSelectedCat(cat)}
            >
              {cat}
            </li>
          ))}
        </ul>
      </aside>

      <main className="categories-content">
        <h2>{selectedCat}</h2>
        <div className="products-grid">
          {filtered.length > 0 ? (
            filtered.map(prod => (
              <ProductCard
                key={prod.id}
                product={prod}
                onAddToCart={addToCart}
              />
            ))
          ) : (
            <p className="no-products">No hay productos en esta categoría.</p>
          )}
        </div>
      </main>
    </div>
  );
}
