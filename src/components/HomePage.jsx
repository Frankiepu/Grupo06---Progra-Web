import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import CategoryCard from './CategoryCard';
import './HomePage.css';

// Importaciones de imágenes
import imgpollo from '../assets/polloentero.png';
import imgzanahoria from '../assets/zanahoria.png';
import imgazucar from '../assets/azucar.png';
import imgavena from '../assets/avena.png';
import imgArroz from '../assets/arroz.png'; 
import imgLeche from '../assets/lechegloria.png'; 



import imgfrutas from '../assets/frutas.png';
import imgcarnes from '../assets/carnes.png';
import imgabarrotes from '../assets/abarrotes.png';

import bannerPrincipal from '../assets/bannerpromocional.png';

const bannerImages = [
  bannerPrincipal,
  "https://placehold.co/1200x400/A8D8C0/FFFFFF?text=Ofertas+Frescas+de+Verano", 
  "https://placehold.co/1200x400/FFDAB9/8B4513?text=Descuentos+Especiales", 
  "https://placehold.co/1200x400/E6E6FA/483D8B?text=Novedades+del+Mes", 
];

export const featuredProducts = [ 
  {
    id: 'prod1', 
    name: 'Pollo Entero Fresco',
    price: 'S/ 9.40 x KG',
    imageUrl: imgpollo,
    oldPrice: null,
    discount: null,
    category: 'Carnes, aves y pescado',
    description: 'Pollo entero fresco y de corral, ideal para tus preparaciones diarias. Calidad garantizada y frescura incomparable para tus comidas familiares. Perfecto para hornear, asar o guisar.',
    presentation: 'Aprox. 1.8 - 2.2 kg por unidad'
  },
  {
    id: 'prod2',
    name: 'Zanahoria Fresca',
    price: 'S/ 2.99 x KG',
    imageUrl: imgzanahoria,
    oldPrice: null,
    discount: null,
    category: 'Frutas y verduras',
    description: 'Zanahorias frescas, dulces y crujientes, seleccionadas de los mejores cultivos. Ricas en vitaminas y perfectas para ensaladas, jugos, guisos o como un snack saludable y delicioso.',
    presentation: 'Venta por kilogramo'
  },
  {
    id: 'prod3',
    name: 'Azúcar Rubia BELL',
    price: 'S/ 8.99 un',
    imageUrl: imgazucar,
    oldPrice: 'S/ 15.00',
    discount: '40%',
    category: 'Abarrotes',
    description: 'Azúcar rubia de caña de la reconocida marca BELL. Endulza tus bebidas, postres y preparaciones con un toque natural y un sabor más profundo. Bolsa de 1kg.',
    presentation: 'Bolsa 1 kg'
  },
  {
    id: 'prod4',
    name: 'Avena Quaker Tradicional',
    price: 'S/ 12.80 un',
    imageUrl: imgavena,
    oldPrice: null,
    discount: null,
    category: 'Abarrotes',
    description: 'Avena Quaker tradicional, la opción clásica para un desayuno nutritivo. Fuente de fibra y energía para empezar bien el día. Ideal para preparar atoles, galletas o añadir a tus batidos.',
    presentation: 'Caja 800g'
  },
  {
    id: 'prod5',
    name: 'Arroz Costeño Graneadito',
    price: 'S/ 4.50 x KG', 
    imageUrl: imgArroz,
    oldPrice: null,
    discount: null,
    category: 'Abarrotes',
    description: 'Arroz extra largo de la marca Costeño, seleccionado por su calidad superior para un graneado perfecto en todas tus comidas. El acompañante indispensable en tu mesa.',
    presentation: 'Bolsa 750g (precio por KG de referencia)'
  },
  {
    id: 'prod6',
    name: 'Leche Gloria Evaporada Entera',
    price: 'S/ 3.80 un',
    imageUrl: imgLeche,
    oldPrice: 'S/ 4.20',
    discount: '10%',
    category: 'Lácteos',
    description: 'Leche evaporada entera Gloria, la tradicional y preferida por las familias peruanas. Ideal para tus postres, café, o para beber sola. Enriquecida con vitaminas A y D para una nutrición completa.',
    presentation: 'Lata 400g'
  },
];

export const categories = [ 
  { id: 'cat1', name: 'Frutas y Verduras', imageUrl: imgfrutas, description: 'Las frutas y verduras más frescas y de temporada, directas del campo a tu mesa.' },
  { id: 'cat2', name: 'Carnes, Aves y Pescado', imageUrl: imgcarnes, description: 'Cortes selectos de carnes rojas, pollo fresco y una variedad de pescados y mariscos.' },
  { id: 'cat3', name: 'Abarrotes', imageUrl: imgabarrotes, description: 'Todo lo que necesitas para tu despensa, desde granos y pastas hasta conservas y snacks.' },
];

const PRODUCTS_PER_PAGE = 3; 

function HomePage({ addToCart }) {
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);
  const [currentProductPage, setCurrentProductPage] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentBannerIndex((prevIndex) => (prevIndex + 1) % bannerImages.length);
    }, 4000); 
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
