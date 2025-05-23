import React from 'react';
import { useNavigate } from 'react-router-dom'; // PASO 1: Importar useNavigate

// Asumimos que tienes un archivo ProductCard.css para los estilos específicos de la tarjeta
// import './ProductCard.css'; 

function ProductCard({ product, onAddToCart }) {
  const navigate = useNavigate(); // PASO 2: Obtener la función navigate

  if (!product || !product.id) { // Verificación básica del producto y su ID
    // Puedes renderizar un placeholder o nada si el producto no es válido
    console.warn("ProductCard recibió un producto inválido:", product);
    return null; 
  }

  // PASO 3: Crear el manejador para el clic en la tarjeta
  const handleCardClick = () => {
    // Navega a la página de detalles del producto, usando el ID del producto en la URL
    // Asegúrate de tener una ruta como "/producto/:productId" definida en tu App.jsx
    navigate(`/producto/${product.id}`); 
  };

  // PASO 4: Manejador para el botón de agregar al carrito, evitando la navegación de la tarjeta
  const handleAddToCartClick = (e) => {
    e.stopPropagation(); 
    onAddToCart(product);
  };

  const ShoppingCartIcon = () => <span role="img" aria-label="Agregar al carrito">🛒</span>;

  return (
    <div 
      className="product-card" 
      onClick={handleCardClick} 
      style={{ cursor: 'pointer' }}
      role="link" 
      tabIndex={0} 
      onKeyPress={(e) => { if (e.key === 'Enter' || e.key === ' ') handleCardClick(); }} // Para activación con teclado
    >
      <div className="product-image-container">
        {/* La imagen también es parte del área clickeable de la tarjeta */}
        <img
          src={product.imageUrl}
          alt={`Imagen de ${product.name}`}
          className="product-image"
          onError={(e) => { 
            e.target.onerror = null; 
            e.target.src = "https://placehold.co/300x300/cccccc/000000?text=Producto"; 
          }}
        />
        {product.discount && (
          <span className="product-discount-badge">
            {product.discount} OFF
          </span>
        )}
      </div>
      <div className="product-info">
        <h3 className="product-name" title={product.name}>{product.name}</h3>

        {product.category && (
          <p className="product-category">{product.category}</p>
        )}

        <div className="product-pricing">
          <p className="product-price">{product.price}</p>
          {product.oldPrice && (
            <p className="product-old-price">{product.oldPrice}</p>
          )}
        </div>

        {/* Botón para agregar al carrito */}
        <button
          className="add-to-cart-button"
          onClick={handleAddToCartClick} 
        >
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
