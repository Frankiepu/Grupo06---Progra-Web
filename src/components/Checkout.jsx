
import React, { useState } from 'react';
import './Checkout.css';

function Checkout({ cartItems, onBackToCart, onOrderComplete }) {
  const [form, setForm] = useState({
    name: '', address: '', phone: '',
    cardNumber: '', cardName: '', expiry: '', cvv: ''
  });
  const [showModal, setShowModal] = useState(false);

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    setShowModal(true);
  };

  return (
    <div className="checkout-page">
      {/*si el modal está activo, mostrar overlay más el modal*/}
      {showModal && (
        <div className="modal-overlay">
          <div className="order-modal">
            <h2>¡Gracias por tu compra!</h2>
            <div className="modal-items">
              {cartItems.map(item => (
                <div key={item.id} className="modal-cart-item">
                  <img src={item.imageUrl} alt={item.name} />
                  <span>{item.name} x{item.quantity}</span>
                </div>
              ))}
            </div>
            <button
              className="modal-button"
              onClick={onOrderComplete}
            >
              Seguir comprando
            </button>
          </div>
        </div>
      )}

      {/*fondo borroso si el modal está activo*/}
      <div className={showModal ? 'checkout-container blurred' : 'checkout-container'}>
        <button className="back-button" onClick={onBackToCart}>
          ← Volver al carrito
        </button>
        <h1>Checkout</h1>
        <form className="checkout-form" onSubmit={handleSubmit}>
          <label>Nombre completo</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Juan Pérez"
            required
          />

          <label>Dirección de casa</label>
          <input
            type="text"
            name="address"
            value={form.address}
            onChange={handleChange}
            placeholder="Av. Siempre Viva 742"
            required
          />

          <label>Teléfono celular</label>
          <input
            type="tel"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="999-999-999"
            required
          />

          <label>Número de tarjeta</label>
          <input
            type="text"
            name="cardNumber"
            value={form.cardNumber}
            onChange={handleChange}
            placeholder="1234-5678-9012-3456"
            required
          />

          <label>Nombre del titular</label>
          <input
            type="text"
            name="cardName"
            value={form.cardName}
            onChange={handleChange}
            placeholder="Juan Pérez"
            required
          />

          <div className="form-row">
            <div>
              <label>Vencimiento (MM/AA)</label>
              <input
                type="text"
                name="expiry"
                value={form.expiry}
                onChange={handleChange}
                placeholder="05/25"
                required
              />
            </div>
            <div>
              <label>CVV</label>
              <input
                type="text"
                name="cvv"
                value={form.cvv}
                onChange={handleChange}
                placeholder="123"
                required
              />
            </div>
          </div>

          <button type="submit" className="pay-button">
            Pagar
          </button>
        </form>
      </div>
    </div>
  );
}

export default Checkout;

