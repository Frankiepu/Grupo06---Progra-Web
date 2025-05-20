import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import './DetalleOrdenUsuario.css';

function DetalleOrdenUsuario({ getOrderById, updateOrderStatus }) { 
  const { orderId } = useParams();

  const [orden, setOrden] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {

    const cargarOrden = () => {
      if (orderId && getOrderById) {
        const foundOrder = getOrderById(orderId);
        if (foundOrder) {
          setOrden(foundOrder);
          setError(null); 
        } else {

          setOrden(null); 
        }
      } else {
        setError('No se pudo cargar la información de la orden (ID o función no provistos).');
        setOrden(null);
      }
      setCargando(false);
    };

    setCargando(true);

    const timer = setTimeout(() => {
        cargarOrden();
    }, 100); 

    return () => clearTimeout(timer);

  }, [orderId, getOrderById]); 


  useEffect(() => {
    if (orderId && getOrderById) {
        const currentOrderDataFromApp = getOrderById(orderId);
        if (currentOrderDataFromApp && JSON.stringify(currentOrderDataFromApp) !== JSON.stringify(orden)) {
            setOrden(currentOrderDataFromApp);
        } else if (!currentOrderDataFromApp && orden) { 
            setError('La orden solicitada ya no está disponible.');
            setOrden(null);
        }
    }

  }, [orderId, getOrderById, orden]);


  const handleCancelarOrden = () => {
    if (orden && orden.estado === 'Procesando') {
      if (window.confirm('¿Estás seguro de que deseas cancelar esta orden? Esta acción no se puede deshacer.')) {
        console.log(`Intentando cancelar orden: ${orden.id} desde DetalleOrdenUsuario`);
        if (updateOrderStatus) {
          updateOrderStatus(orden.id, 'Cancelado (Pendiente)');
        }
        alert(`Simulación: Solicitud de cancelación para la orden ${orden.id} enviada. El estado se actualizará.`);
      }
    } else {
      alert('Esta orden no se puede cancelar en su estado actual.');
    }
  };
  
  if (cargando) return <div className="detalle-orden-container loading-container">Cargando detalles de la orden...</div>;
  if (error && !orden) return <div className="detalle-orden-container error-container">{error}</div>;
  if (!orden) return <div className="detalle-orden-container error-container">No se encontró la orden solicitada o no hay datos para mostrar.</div>;

  const sePuedeCancelar = orden.estado === 'Procesando';

  return (
    <div className="detalle-orden-page">
      <div className="detalle-orden-container">
        <div className="detalle-orden-header">
          <h1 className="main-title">Detalle de la Orden: #{orden.id}</h1>
          <Link to="/usuario/ordenes" className="button-secondary">
            ← Volver a Mis Órdenes
          </Link>
        </div>

        <section className="orden-info-section">
          <div className="info-block">
            <h2 className="section-title">Información General</h2>
            <p><strong>ID de Orden:</strong> {orden.id}</p>
            <p><strong>Fecha de Pedido:</strong> {orden.fecha}</p>
            <p><strong>Estado:</strong> <span className={`status-badge status-${orden.estado.toLowerCase().replace(/\s+/g, '-').replace(/[()]/g, '')}`}>{orden.estado}</span></p>
          </div>
          <div className="info-block">
            <h2 className="section-title">Cliente</h2>
            <p><strong>Nombre:</strong> {orden.cliente.nombre}</p>
            <p><strong>Correo:</strong> {orden.cliente.correo}</p>
            <p><strong>Teléfono:</strong> {orden.cliente.telefono}</p>
          </div>
        </section>

        <section className="orden-direccion-section">
          <h2 className="section-title">Dirección de Envío</h2>
          <p>{orden.direccionEnvio.calle}, {orden.direccionEnvio.distrito}</p>
          <p>{orden.direccionEnvio.ciudad}, {orden.direccionEnvio.pais}</p>
          {orden.direccionEnvio.referencia && <p><em>Referencia: {orden.direccionEnvio.referencia}</em></p>}
        </section>

        <section className="orden-items-section">
          <h2 className="section-title">Artículos en la Orden ({orden.items.reduce((acc, item) => acc + item.cantidad, 0)} productos)</h2>
          <div className="items-list">
            {orden.items.map(item => (
              <div key={item.id + '-' + item.nombre} className="orden-item-card"> {}
                <img 
                  src={item.imageUrl} 
                  alt={item.nombre} 
                  className="item-image" 
                  onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/80x80/CCCCCC/FFFFFF?text=Img"; }}
                />
                <div className="item-details">
                  <h3 className="item-name">{item.nombre}</h3>
                  <p className="item-presentation">Presentación: {item.presentacion}</p>
                  <p className="item-price-quantity">
                    {item.cantidad} x S/ {item.precioUnitario.toFixed(2)}
                  </p>
                </div>
                <div className="item-total-price">
                  S/ {item.precioTotalItem.toFixed(2)}
                </div>
              </div>
            ))}
          </div>
        </section>
        
        <section className="orden-pago-section">
          <h2 className="section-title">Información de Pago</h2>
          <p><strong>Método de Pago:</strong> {orden.metodoPago}</p>
          {orden.notasPedido && (
              <>
                  <h3 className="subsection-title">Notas Adicionales del Pedido:</h3>
                  <p className="notas-pedido-text">{orden.notasPedido}</p>
              </>
          )}
        </section>

        <section className="orden-resumen-costo-section">
          <h2 className="section-title">Resumen del Costo</h2>
          <div className="costo-grid">
            <span>Subtotal:</span><span>S/ {orden.resumenCosto.subtotal.toFixed(2)}</span>
            <span>Costo de Envío:</span><span>S/ {orden.resumenCosto.envio.toFixed(2)}</span>
            <span>Descuentos:</span><span className="descuento-valor">- S/ {orden.resumenCosto.descuentos.toFixed(2)}</span>
            <strong className="total-label">Total General:</strong><strong className="total-valor">S/ {orden.resumenCosto.totalGeneral.toFixed(2)}</strong>
          </div>
        </section>

        <div className="orden-acciones">
          {sePuedeCancelar && (
            <button onClick={handleCancelarOrden} className="button-danger cancel-button">
              Cancelar Orden
            </button>
          )}
          {!sePuedeCancelar && orden.estado !== 'Cancelado' && orden.estado !== 'Cancelado (Pendiente)' && (
             <p className="info-cancelacion">Esta orden ya no puede ser cancelada.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default DetalleOrdenUsuario;
