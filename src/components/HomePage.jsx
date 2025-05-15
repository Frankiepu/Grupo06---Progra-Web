
import React from 'react';
import ProductCard from './ProductCard';
import CategoryCard from './CategoryCard';
import imgpollo from '../assets/polloentero.png';
import imgzanahoria from '../assets/zanahoria.png';
import imgazucar from '../assets/azucar.png';
import imgavena from '../assets/avena.png';
import imgfrutas from '../assets/frutas.png';
import imgcarnes from '../assets/carnes.png';
import imgabarrotes from '../assets/abarrotes.png';
import banner from '../assets/bannerpromocional.png';

function HomePage() {
  const featuredProducts = [
    { id: 1, name: 'Pollo Entero Fresco', price: 'S/ 9.40 x KG', imageUrl: imgpollo, oldPrice: null, discount: null, category: 'Carnes, aves y pescado', },
    { id: 2, name: 'Zanahoria', price: 'S/ 2.99 x KG', imageUrl: imgzanahoria, oldPrice: null, discount: null, category: 'Frutas y verduras', },
    { id: 3, name: 'Azucar Rubia', price: 'S/ 8.99 un', imageUrl: imgazucar, oldPrice: 'S/ 15', discount: '40%', category: 'Abarrotes', },
    { id: 4, name: 'Avena Quaker Tradicional', price: 'S/ 12.80 un', imageUrl: imgavena, oldPrice: null, discount: null, category: 'Abarrotes', },
  ];

  const categories = [
    { id: 'cat1', name: 'Frutas y Verduras', imageUrl: imgfrutas },
    { id: 'cat2', name: 'Carnes, aves y pescado', imageUrl: imgcarnes },
    { id: 'cat3', name: 'Abarrotes', imageUrl: imgabarrotes },
  ];

  return (
    <div className="homepage-content">
      <section
  className="banner-section"
  style={{
    backgroundImage: `url(${banner})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '300px',
    borderRadius: '16px',  
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '40px',
    padding: '20px',
    position: 'relative',
    overflow: 'hidden',
  }}
>
  <div
    className="banner-text"
    style={{
      backgroundColor: 'rgba(0, 0, 0, 0.6)',
      padding: '40px',
      borderRadius: '12px',
      color: 'white',
      textAlign: 'center',
      maxWidth: '800px',
      width: '100%',
    }}
  >
    <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold' }}>¡Las Mejores Ofertas!</h1>
    <p style={{ margin: '16px 0', fontSize: '1.1rem' }}>
      Descubre productos increíbles a precios inigualables esta temporada.
    </p>
    <button
      style={{
        backgroundColor: '#ffc107',
        color: '#212529',
        border: 'none',
        borderRadius: '8px',
        padding: '12px 24px',
        fontWeight: 'bold',
        cursor: 'pointer',
      }}
    >
      VER TODAS LAS OFERTAS
    </button>
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
