import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { featuredProducts } from './HomePage'; 
import ProductCard from './ProductCard'; 

import './ProductDetailPage.css'; 

function ProductDetailPage({ addToCart }) { 
  const { productId } = useParams(); 
  const navigate = useNavigate();

  const product = featuredProducts.find(p => p.id === productId);

  if (!product) {
    return (
      <div className="product-detail-page-container not-found-container">
        <h2>Producto no encontrado</h2>
        <p>Lo sentimos, el producto que buscas no existe o no está disponible.</p>
        <Link to="/" className="link-to-home">Volver a la página de inicio</Link>
      </div>
    );
  }

  const similarProducts = featuredProducts
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4); 

  return (
    <div className="product-detail-page-container">
      <button 
        onClick={() => navigate(-1)} 
        className="back-button" 
      >
        &larr; Volver
      </button>

      <div className="product-detail-main-content">
        <div className="product-detail-image-container">
          {product.imageUrl ? (
            <img 
              src={product.imageUrl} 
              alt={`Imagen de ${product.name}`}
              className="product-detail-image"
              onError={(e) => {
                  e.target.onerror = null; 
                  e.target.src="https://placehold.co/500x500/E0E0E0/B0B0B0?text=Imagen+No+Disponible";
              }}
            />
          ) : (
            <div className="product-detail-image-placeholder">
              <span>Imagen no disponible</span>
            </div>
          )}
        </div>
        <div className="product-detail-info">
          <h1 className="product-detail-name">{product.name}</h1>
          {product.category && <p className="product-detail-category">Categoría: {product.category}</p>}
          {product.presentation && <p className="product-detail-presentation">Presentación: {product.presentation}</p>}
          
          {/* Mostrar la descripción del producto */}
          <p className="product-detail-description">
            {product.description || "No hay descripción disponible para este producto."}
          </p>
          
          <div className="product-detail-price-section">
            <span className="product-detail-price">{product.price}</span>
            {product.oldPrice && <span className="product-detail-old-price">{product.oldPrice}</span>}
            {product.discount && <span className="product-detail-discount-badge">{product.discount} OFF</span>}
          </div>
          
          <button 
            onClick={() => addToCart(product)} 
            className="add-to-cart-detail-button" 
          >
            AGREGAR AL CARRITO
          </button>
        </div>
      </div>

      {similarProducts.length > 0 && (
        <section className="similar-products-section">
          <h2 className="similar-products-title">Productos Similares</h2>
          <div className="products-grid similar-products-grid"> 
            {similarProducts.map(p => (
              <ProductCard key={p.id} product={p} onAddToCart={addToCart} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

export default ProductDetailPage;
