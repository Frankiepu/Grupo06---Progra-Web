import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import CategoryCard from './CategoryCard';
import './HomePage.css';

// Importaciones de imágenes (asegúrate que las rutas sean correctas)
import imgpollo from '../assets/polloentero.png';
import imgzanahoria from '../assets/zanahoria.png';
import imgazucar from '../assets/azucar.png';
import imgavena from '../assets/avena.png';
import imgArroz from '../assets/arroz.png'; // Nueva imagen de ejemplo
import imgLeche from '../assets/lechegloria.png'; // Nueva imagen de ejemplo
import imgShampoo from '../assets/shampoo.png'; // Nueva imagen de ejemplo


import imgfrutas from '../assets/frutas.png';
import imgcarnes from '../assets/carnes.png';
import imgabarrotes from '../assets/abarrotes.png';

import bannerPrincipal from '../assets/bannerpromocional.png';
// Imágenes para el carrusel del banner
const bannerImages = [
  bannerPrincipal,
  "https://placehold.co/1200x400/3498db/ffffff?text=Anuncio+Supermercado+2",
  "https://placehold.co/1200x400/2ecc71/ffffff?text=Ofertas+Especiales+3",
];

// PRODUCTOS DESTACADOS - Ahora con más ejemplos
const featuredProducts = [
  {
    id: 1,
    name: 'Pollo Entero Fresco',
    price: 'S/ 9.40 x KG',
    imageUrl: imgpollo,
    oldPrice: null,
    discount: null,
    category: 'Carnes, aves y pescado',
  },
  {
    id: 2,
    name: 'Zanahoria Fresca',
    price: 'S/ 2.99 x KG',
    imageUrl: imgzanahoria,
    oldPrice: null,
    discount: null,
    category: 'Frutas y verduras',
  },
  {
    id: 3,
    name: 'Azúcar Rubia BELL',
    price: 'S/ 8.99 un',
    imageUrl: imgazucar,
    oldPrice: 'S/ 15.00',
    discount: '40%',
    category: 'Abarrotes',
  },
  {
    id: 4,
    name: 'Avena Quaker Tradicional',
    price: 'S/ 12.80 un',
    imageUrl: imgavena,
    oldPrice: null,
    discount: null,
    category: 'Abarrotes',
  },
  {
    id: 5,
    name: 'Arroz Costeño Graneadito',
    price: 'S/ 4.50 x KG',
    imageUrl: imgArroz, // Placeholder, reemplaza con tu imagen
    oldPrice: null,
    discount: null,
    category: 'Abarrotes',
  },
  {
    id: 6,
    name: 'Leche Gloria Evaporada Entera',
    price: 'S/ 3.80 un',
    imageUrl: imgLeche, // Placeholder
    oldPrice: 'S/ 4.20',
    discount: '10%',
    category: 'Lácteos',
  },
  // --- Sección de productos comentados para agregar a futuro ---
  /*
  {
    id: 7,
    name: 'Shampoo Head & Shoulders',
    price: 'S/ 18.90 un',
    imageUrl: imgShampoo, // Placeholder
    oldPrice: null,
    discount: null,
    category: 'Cuidado Personal',
  },
  /*
  {
    id: 8,
    name: 'Nuevo Producto Ejemplo 8',
    price: 'S/ X.XX',
    imageUrl: 'https://placehold.co/300x300/ffcc00/ffffff?text=Producto+8', // Placeholder
    oldPrice: null,
    discount: null,
    category: 'Nueva Categoría',
  },
  {
    id: 9,
    name: 'Nuevo Producto Ejemplo 9',
    price: 'S/ Y.YY',
    imageUrl: 'https://placehold.co/300x300/3399ff/ffffff?text=Producto+9', // Placeholder
    oldPrice: 'S/ Z.ZZ',
    discount: '15%',
    category: 'Otra Categoría',
  },
  {
    id: 10,
    name: 'Nuevo Producto Ejemplo 10',
    price: 'S/ A.AA',
    imageUrl: 'https://placehold.co/300x300/ff6666/ffffff?text=Producto+10', // Placeholder
    oldPrice: null,
    discount: null,
    category: 'Promociones',
  },
  */
];

const categories = [
  { id: 'cat1', name: 'Frutas y Verduras', imageUrl: imgfrutas },
  { id: 'cat2', name: 'Carnes, Aves y Pescado', imageUrl: imgcarnes },
  { id: 'cat3', name: 'Abarrotes', imageUrl: imgabarrotes },
];

const PRODUCTS_PER_PAGE = 3; // Número de productos a mostrar por página/vista

function HomePage({ addToCart }) {
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);
  const [currentProductPage, setCurrentProductPage] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentBannerIndex((prevIndex) => (prevIndex + 1) % bannerImages.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  // Lógica para paginación de productos destacados
  const totalProductPages = Math.ceil(featuredProducts.length / PRODUCTS_PER_PAGE);

  const handleNextProducts = () => {
    setCurrentProductPage((prevPage) => (prevPage + 1) % totalProductPages);
  };

  const handlePrevProducts = () => {
    setCurrentProductPage((prevPage) => (prevPage - 1 + totalProductPages) % totalProductPages);
  };

  const startIndex = currentProductPage * PRODUCTS_PER_PAGE;
  const endIndex = startIndex + PRODUCTS_PER_PAGE;
  const displayedProducts = featuredProducts.slice(startIndex, endIndex);

  return (
    <div className="homepage-container">
      <section
        className="banner-section"
        style={{ backgroundImage: `url(${bannerImages[currentBannerIndex]})` }}
      >
        <div className="banner-text-overlay">
          <h1>¡Las Mejores Ofertas!</h1>
          <p>Descubre productos increíbles a precios inigualables esta temporada.</p>
          <button className="promo-button">VER TODAS LAS OFERTAS</button>
        </div>
      </section>

      <section className="products-section">
        <div className="section-header-controls">
          <button
            className="arrow-button prev-arrow"
            onClick={handlePrevProducts}
            disabled={featuredProducts.length <= PRODUCTS_PER_PAGE} // Deshabilitar si no hay suficientes productos para paginar
          >
            &lt; {/* Flecha izquierda */}
          </button>
          <h2 className="section-title">Productos Destacados</h2>
          <button
            className="arrow-button next-arrow"
            onClick={handleNextProducts}
            disabled={featuredProducts.length <= PRODUCTS_PER_PAGE} // Deshabilitar si no hay suficientes productos para paginar
          >
            &gt; {/* Flecha derecha */}
          </button>
        </div>
        <div className="products-grid">
          {displayedProducts.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={addToCart}
            />
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
