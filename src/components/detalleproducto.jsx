import React from 'react';
import './agregarproductoAdmi.css';

function detalleproducto() {
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
        <h1 className="title">Editar producto</h1>
        <div className="form-card">
          <div className="form-left">
            <label>Nombre del producto</label>
            <input type="text" value="Uvas" />

            <label>Presentación</label>
            <input type="text" value="0.8 kg" />

            <label>Categoría</label>
            <div className="input-group">
              <select defaultValue="Frutas y verduras">
                <option>Frutas y verduras</option>
                <option>Lácteos</option>
                <option>Bebidas</option>
              </select>
              <button className="btn-danger">➕</button>
            </div>

            <label>Descripción</label>
            <textarea>Fruta fresca de temporada, ideal para postres.</textarea>
          </div>

          <div className="form-right">
            <label>Imagen</label>
            <div className="dropzone">
              <img src="https://via.placeholder.com/100" alt="Producto" style={{ marginBottom: "10px" }} />
              <p>Arrastra una nueva imagen o selecciona otra</p>
              <button className="btn">Cambiar imagen</button>
            </div>

            <label>Stock</label>
            <div className="input-group">
              <select defaultValue="10">
                <option>10</option>
                <option>20</option>
                <option>30</option>
              </select>
              <button className="btn-primary">💾 Guardar cambios</button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default detalleproducto;
