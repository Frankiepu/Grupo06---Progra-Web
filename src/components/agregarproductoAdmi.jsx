import React from 'react';
import './agregarproductoAdmi.css';

function agregarproductoAdmi() {
  return (
    <div>
      <header className="navbar">
        <div className="logo">Mi-Tiendita <span className="dot">•</span></div>
        <input className="search" type="text" placeholder="Buscar un producto..." />
        <div className="right-buttons">
          <button className="cart-btn">Carrito $0.00</button>
          <div className="user-icon">👤 usuario</div>
        </div>
      </header>

      <nav className="menu-bar">
        <button>Categorías</button>
        <button>Productos</button>
        <button>Nosotros</button>
        <span className="promo">OFERTAS 🥬</span>
      </nav>

      <main className="container">
        <h1 className="title">Agregar un producto</h1>
        <div className="form-card">
          <div className="form-left">
            <label>Nombre del producto</label>
            <input type="text" placeholder="Nombre del producto" />

            <label>Presentación</label>
            <input type="text" placeholder="Presentación" />

            <label>Categoría</label>
            <div className="input-group">
              <select>
                <option>Seleccione la categoría del producto</option>
              </select>
              <button className="btn-danger">➕</button>
            </div>

            <label>Descripción</label>
            <textarea placeholder="Descripción del producto..."></textarea>
          </div>

          <div className="form-right">
            <label>Imagen</label>
            <div className="dropzone">
              <div className="image-icon">🖼</div>
              <p>Arrastra la imagen a esta zona</p>
              <button className="btn">Seleccionar imagen</button>
            </div>

            <label>Stock</label>
            <div className="input-group">
              <select>
                <option>Stock</option>
              </select>
              <button className="btn-primary">➕ Crear producto</button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default agregarproductoAdmi;
