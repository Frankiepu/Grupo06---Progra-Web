import React from 'react';
import './listaproductoAdmi.css'; 

function listadoProductoAdmi() {
  return (
    <div>
      <header className="navbar">
        <div className="logo">Mi-Tiendita <span className="dot">•</span></div>
        <input className="search" type="text" placeholder="Buscar un producto..." />
        <div className="right-buttons">
          <button className="cart-btn">Carrito (3)</button>
          <div className="user-icon">👤</div>
        </div>
      </header>

      <nav className="menu-bar">
        <button>Categorías</button>
        <button>Productos</button>
        <button>Nosotros</button>
        <span className="promo">OFERTAS 🥬</span>
      </nav>

      <main className="container">
        <div className="header-row">
          <h1 className="title">Listado de productos</h1>
          <div className="actions">
            <input className="search-box" type="text" placeholder="Buscar un producto..." />
            <button className="btn">Buscar</button>
            <button className="btn-primary">➕ Agregar producto</button>
          </div>
        </div>

        <table className="product-table">
          <thead>
            <tr>
              <th>Id</th>
              <th>Nombre</th>
              <th>Presentación</th>
              <th>Descripción</th>
              <th>Categoría</th>
              <th>Stock</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>#8123</td>
              <td>
                <img src="https://via.placeholder.com/32" alt="Uvas" /> Uvas
              </td>
              <td>0.8 kg</td>
              <td>Lorem ipsum dolor sit amet...</td>
              <td><strong>Frutas y verduras</strong></td>
              <td>10</td>
              <td className="actions">✏️ 🗑️</td>
            </tr>
            <tr>
              <td>#3434</td>
              <td>
                <img src="https://via.placeholder.com/32" alt="Peras" /> Peras
              </td>
              <td>0.1 kg</td>
              <td>Lorem ipsum dolor sit amet...</td>
              <td><strong>Frutas y verduras</strong></td>
              <td>23</td>
              <td className="actions">✏️ 🗑️</td>
            </tr>
          </tbody>
        </table>

        <div className="pagination">
          <button disabled>◀</button>
          <button className="active">1</button>
          <button>2</button>
          <button>3</button>
          <button>▶</button>
        </div>
      </main>
    </div>
  );
}

export default listaProductoAdmi;
