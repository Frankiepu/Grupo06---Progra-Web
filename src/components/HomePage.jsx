// src/components/HomePage.jsx
import React from 'react';
import ProductCard from './ProductCard';
import CategoryCard from './CategoryCard';

function HomePage() {
  const featuredProducts = [
    { id: 1, name: 'Smartphone X1000 Avanzado con IA y Pantalla OLED', price: 'S/ 1200', imageUrl: 'https://placehold.co/300x300/E8AA42/ffffff?text=Smartphone', oldPrice: 'S/ 1500', discount: '20%' },
    { id: 2, name: 'Laptop ProMax Ultraligera para Profesionales Creativos', price: 'S/ 3500', imageUrl: 'https://placehold.co/300x300/4A90E2/ffffff?text=Laptop', oldPrice: null, discount: null },
    { id: 3, name: 'Auriculares SoundWave Pro con Cancelación de Ruido Activa', price: 'S/ 250', imageUrl: 'https://placehold.co/300x300/2ECC71/ffffff?text=Auriculares', oldPrice: 'S/ 300', discount: '16%' },
    { id: 4, name: 'Smartwatch FitGo Series 5 con GPS y Monitor Cardíaco', price: 'S/ 450', imageUrl: 'https://placehold.co/300x300/E74C3C/ffffff?text=Smartwatch', oldPrice: null, discount: null },
  ];

  const categories = [
    { id: 'cat1', name: 'Tecnología de Punta', imageUrl: 'https://placehold.co/400x300/5DADE2/ffffff?text=Tecnología' },
    { id: 'cat2', name: 'Moda y Accesorios Exclusivos', imageUrl: 'https://placehold.co/400x300/AF7AC5/ffffff?text=Moda' },
    { id: 'cat3', name: 'Hogar Inteligente y Decoración', imageUrl: 'https://placehold.co/400x300/48C9B0/ffffff?text=Hogar' },
  ];

  return (
    <div className="homepage-content">
      <section className="banner-section">
         <img
          src="https://placehold.co/1200x450/4A90E2/ffffff?text=Gran+Venta+de+Temporada"
          alt="Banner Principal de Ofertas"
          className="banner-image"
          onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/1200x450/cccccc/000000?text=Banner+Error"; }}
        />
        <div className="banner-text">
          <h1>¡Las Mejores Ofertas!</h1>
          <p>Descubre productos increíbles a precios inigualables esta temporada.</p>
          <button className="banner-button">Ver Todas las Ofertas</button>
        </div>
      </section>

      <section className="products-section">
        <h2 className="section-title">Productos Destacados</h2>
        <div className="products-grid">
          {featuredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <section className="categories-section">
        <h2 className="section-title">Explorar Categorías</h2>
        <div className="categories-grid">
          {categories.map(category => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </section>
    </div>
  );
}

export default HomePage;
