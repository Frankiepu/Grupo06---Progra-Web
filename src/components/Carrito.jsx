
import React from 'react';
import './Carrito.css'; // Importe de los estilos de carrito 

function Carrito({ cartItems, onBack, onQuantityChange, onRemoveItem, onCheckout }) {
  
  const totalItems = cartItems.reduce((s, i) => s + i.quantity, 0);
  const subtotal = cartItems.reduce((s, i) => {
    const num = parseFloat(i.price.replace(/[^0-9.,]/g, '').replace(',', '.'));
    return s + num * i.quantity;
  }, 0);
  const delivery = 0;
  const discounts = 0;
  const total = subtotal + delivery - discounts;

  return (
    <div className="carrito-container">
      <div className="carrito-header">
        <h1>Carro ({totalItems} productos)</h1>
        <button className="back-button" onClick={onBack}>← Volver</button>
      </div>

      <div className="carrito-content container">
        <section className="cart-items">
          {cartItems.map(item => (
            <div key={item.id} className="cart-item">
              <input type="checkbox" checked readOnly />
              <img src={item.imageUrl} alt={item.name} />
              <div className="item-info">
                <h3>{item.name}</h3>
                <p className="presentation">Presentación: {item.category}</p>
                <p className="arrival">Llega mañana</p>
              </div>
              <div className="price">{item.price}</div>
              <div className="quantity-control">
                <button onClick={() => onQuantityChange(item.id, -1)}>-</button>
                <span>{item.quantity}</span>
                <button onClick={() => onQuantityChange(item.id, 1)}>+</button>
              </div>
              <button
                className="remove-button"
                onClick={() => onRemoveItem(item.id)}
              >🗑️</button>
            </div>
          ))}
        </section>

        <aside className="cart-summary">
          <h2>Resumen de la compra</h2>
          <div className="summary-row">
            <span>Productos ({totalItems})</span>
            <span>S/ {subtotal.toFixed(2)}</span>
          </div>
          <div className="summary-row">
            <span>Delivery</span>
            <span>GRATIS</span>
          </div>
          <div className="summary-row">
            <span>Descuentos</span>
            <span>-S/ {discounts.toFixed(2)}</span>
          </div>
          <hr />
          <div className="summary-row total">
            <span>Total</span>
            <span>S/ {total.toFixed(2)}</span>
          </div>
          <button
            className="checkout-button"
            onClick={onCheckout}
          >
            Continuar compra
          </button>
        </aside>
      </div>
    </div>
  );
}

export default Carrito;


