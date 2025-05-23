import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard'; // Asegúrate que las rutas y el componente estén correctos
import CategoryCard from './CategoryCard'; // Asegúrate que las rutas y el componente estén correctos
import './HomePage.css'; // Importamos los estilos que crearemos

// Importaciones de imágenes (asegúrate que las rutas sean correctas)
import imgpollo from '../assets/polloentero.png';
import imgzanahoria from '../assets/zanahoria.png';
import imgazucar from '../assets/azucar.png';
import imgavena from '../assets/avena.png';
import imgArroz from '../assets/arroz.png'; 
import imgLeche from '../assets/lechegloria.png'; 
// import imgShampoo from '../assets/shampoo.png'; // Descomenta si tienes esta imagen


import imgfrutas from '../assets/frutas.png';
import imgcarnes from '../assets/carnes.png';
import imgabarrotes from '../assets/abarrotes.png';

import bannerPrincipal from '../assets/bannerpromocional.png';

const bannerImages = [
  bannerPrincipal,
  "https://placehold.co/1200x400/A8D8C0/FFFFFF?text=Ofertas+Frescas+de+Verano", // Tono pastel verde menta
  "https://placehold.co/1200x400/FFDAB9/8B4513?text=Descuentos+Especiales", // Tono pastel melocotón
  "https://placehold.co/1200x400/E6E6FA/483D8B?text=Novedades+del+Mes", // Tono pastel lavanda
];

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
    imageUrl: imgArroz,
    oldPrice: null,
    discount: null,
    category: 'Abarrotes',
  },
  {
    id: 6,
    name: 'Leche Gloria Evaporada Entera',
    price: 'S/ 3.80 un',
    imageUrl: imgLeche,
    oldPrice: 'S/ 4.20',
    discount: '10%',
    category: 'Lácteos',
  },
  // Puedes agregar más productos aquí si es necesario
];

const categories = [
  { id: 'cat1', name: 'Frutas y Verduras', imageUrl: imgfrutas },
  { id: 'cat2', name: 'Carnes, Aves y Pescado', imageUrl: imgcarnes },
  { id: 'cat3', name: 'Abarrotes', imageUrl: imgabarrotes },
];

const PRODUCTS_PER_PAGE = 3; 

function HomePage({ addToCart }) {
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);
  const [currentProductPage, setCurrentProductPage] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentBannerIndex((prevIndex) => (prevIndex + 1) % bannerImages.length);
    }, 4000); // Aumentado el tiempo del carrusel de banner
    return () => clearInterval(timer);
  }, []);

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
            disabled={featuredProducts.length <= PRODUCTS_PER_PAGE}
          >
            &lt;
          </button>
          {/* Título de sección con span interno para estilos de subrayado */}
          <h2 className="section-title"><span>Productos Destacados</span></h2>
          <button
            className="arrow-button next-arrow"
            onClick={handleNextProducts}
            disabled={featuredProducts.length <= PRODUCTS_PER_PAGE}
          >
            &gt;
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
         {/* Título de sección con span interno para estilos de subrayado */}
        <h2 className="section-title"><span>Explorar Categorías</span></h2>
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
