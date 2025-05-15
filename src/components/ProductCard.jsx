// src/components/ProductCard.jsx
import React from 'react';

function ProductCard({ product }) {
  const ShoppingCartIcon = () => <span role="img" aria-label="Agregar al carrito">🛒</span>;

  return (
    <div className="product-card">
      <div className="product-image-container">
        <img
          src={product.imageUrl}
          alt={`Imagen de ${product.name}`}
          className="product-image"
          onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/300x300/cccccc/000000?text=Producto"; }}
        />
        {product.discount && (
          <span className="product-discount-badge">
            {product.discount} OFF
          </span>
        )}
      </div>
      <div className="product-info">
        <h3 className="product-name" title={product.name}>{product.name}</h3>
        <div className="product-pricing">
          <p className="product-price">{product.price}</p>
          {product.oldPrice && (
            <p className="product-old-price">{product.oldPrice}</p>
          )}
        </div>
        <button className="add-to-cart-button">
          <span className="cart-icon-button-inner">
            <ShoppingCartIcon />
          </span>
          Agregar al Carrito
        </button>
      </div>
    </div>
  );
}

export default ProductCard;