import React, { useState } from 'react';
import './Checkout.css';

function Checkout({ cartItems, onBackToCart, onOrderComplete }) {
  const [form, setForm] = useState({
    name: '', address: '', phone: '',
    cardNumber: '', cardName: '', expiry: '', cvv: ''
  });
  const [showModal, setShowModal] = useState(false);
  const [completedOrderData, setCompletedOrderData] = useState(null); 
  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const calculateSummary = () => {
    const subtotal = cartItems.reduce((s, i) => {
      const priceString = i.price.replace(/[^0-9.,]/g, '').replace(',', '.');
      const num = parseFloat(priceString);
      return s + (isNaN(num) ? 0 : num) * i.quantity;
    }, 0);
    const delivery = 0; 
    const discounts = 0.00; 
    const total = subtotal + delivery - discounts;
    return { subtotal, delivery, discounts, total };
  };

  const summary = calculateSummary();

  const handleSubmit = e => {
    e.preventDefault();
    if (!form.name || !form.address || !form.phone || !form.cardNumber || !form.cardName || !form.expiry || !form.cvv) {
        alert("Por favor, completa todos los campos de envío y pago.");
        return;
    }

    const orderDetailsToComplete = {
      cliente: {
        nombre: form.name,
        correo: 'usuario@example.com', 
        telefono: form.phone,
      },
      direccionEnvio: {
        calle: form.address,

        distrito: 'Distrito Ejemplo',
        ciudad: 'Ciudad Ejemplo',
        pais: 'Perú',
      },
      items: cartItems.map(item => ({
        id: item.id,
        nombre: item.name,
        imageUrl: item.imageUrl,
        presentacion: item.category,
        precioUnitario: parseFloat(item.price.replace(/[^0-9.,]/g, '').replace(',', '.')),
        cantidad: item.quantity,
        precioTotalItem: parseFloat(item.price.replace(/[^0-9.,]/g, '').replace(',', '.')) * item.quantity,
      })),
      resumenCosto: {
        subtotal: summary.subtotal,
        envio: summary.delivery,
        descuentos: summary.discounts,
        totalGeneral: summary.total,
      },
      metodoPago: `Tarjeta de Crédito ${form.cardName} **** **** **** ${form.cardNumber.slice(-4)}`,
      notasPedido: form.notes || '', 
    };
    
    setCompletedOrderData(orderDetailsToComplete); 
    setShowModal(true); 
  };

  const handleModalConfirmAndCompleteOrder = () => {
    if (completedOrderData) {
      onOrderComplete(completedOrderData); 
    }
  }

  return (
    <div className="checkout-page">
      {showModal && completedOrderData && ( 
        <div className="modal-overlay">
          <div className="order-modal">
            <h2>¡Gracias por tu compra, {completedOrderData.cliente.nombre}!</h2>
            <p>Tu orden #{} ha sido procesada.</p>
            <div className="modal-items">
              {completedOrderData.items.map(item => (
                <div key={item.id} className="modal-cart-item">
                  <img src={item.imageUrl} alt={item.name} 
                       onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/50x50/CCCCCC/FFFFFF?text=Img"; }}
                  />
                  <span>{item.name} (x{item.quantity})</span>
                </div>
              ))}
            </div>
            <button
              className="modal-button"
              onClick={handleModalConfirmAndCompleteOrder} 
            >
              Ver Detalle de mi Orden
            </button>
          </div>
        </div>
      )}

      <div className={showModal ? 'checkout-container blurred' : 'checkout-container'}>
        <button className="back-button" onClick={onBackToCart}>
          ← Volver al carrito
        </button>
        <h1>Checkout</h1>
        <div className="checkout-content">
            <form className="checkout-form" onSubmit={handleSubmit}>
                {}
                <label>Nombre completo</label>
                <input type="text" name="name" value={form.name} onChange={handleChange} placeholder="Juan Pérez" required />
                <label>Dirección de casa</label>
                <input type="text" name="address" value={form.address} onChange={handleChange} placeholder="Av. Siempre Viva 742" required />
                <label>Teléfono celular</label>
                <input type="tel" name="phone" value={form.phone} onChange={handleChange} placeholder="999-999-999" required />
                
                <h2 className="form-section-title">Datos de Pago</h2>
                <label>Número de tarjeta</label>
                <input type="text" name="cardNumber" value={form.cardNumber} onChange={handleChange} placeholder="1234-5678-9012-3456" required />
                <label>Nombre del titular</label>
                <input type="text" name="cardName" value={form.cardName} onChange={handleChange} placeholder="Juan Pérez" required />
                <div className="form-row">
                  <div>
                    <label>Vencimiento (MM/AA)</label>
                    <input type="text" name="expiry" value={form.expiry} onChange={handleChange} placeholder="05/25" required />
                  </div>
                  <div>
                    <label>CVV</label>
                    <input type="text" name="cvv" value={form.cvv} onChange={handleChange} placeholder="123" required />
                  </div>
                </div>
                <button type="submit" className="pay-button">
                  Pagar S/ {summary.total.toFixed(2)}
                </button>
            </form>
            <aside className="checkout-summary">
                <h2>Resumen de la Compra</h2>
                {cartItems.map(item => (
                    <div key={item.id} className="summary-item">
                        <span>{item.name} (x{item.quantity})</span>
                        <span>S/ {(parseFloat(item.price.replace(/[^0-9.,]/g, '').replace(',', '.')) * item.quantity).toFixed(2)}</span>
                    </div>
                ))}
                <hr />
                <div className="summary-row"><span>Subtotal:</span> <span>S/ {summary.subtotal.toFixed(2)}</span></div>
                <div className="summary-row"><span>Envío:</span> <span>S/ {summary.delivery.toFixed(2)}</span></div>
                <div className="summary-row"><span>Descuentos:</span> <span>-S/ {summary.discounts.toFixed(2)}</span></div>
                <div className="summary-row total"><strong>Total:</strong> <strong>S/ {summary.total.toFixed(2)}</strong></div>
            </aside>
        </div>
      </div>
    </div>
  );
}

export default Checkout;

