import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function ListaOrdenesAdmin({ allOrders }) { 
  const [ordenes, setOrdenes] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    if (allOrders) {
      setOrdenes(allOrders);
      setCargando(false);
    } else {
      setCargando(true); 
      const timer = setTimeout(() => {
        if (!allOrders) { 
            setOrdenes([]); 
        }
        setCargando(false)
      }, 500); 
      return () => clearTimeout(timer);
    }
  }, [allOrders]); 

  if (cargando) {
    return (
        <div className="admin-page-container">
            <header className="admin-navbar-standalone">
                <div className="admin-logo-standalone">MiTienda <span className="admin-dot-standalone">•</span></div>
                <input className="admin-search-standalone" type="text" placeholder="Buscar órdenes..." />
                <div className="admin-right-buttons-standalone">
                <button className="admin-panel-btn-standalone">Panel Admin</button>
                <div className="admin-user-icon-standalone">👤 Admin</div>
                </div>
            </header>
            <nav className="admin-menu-bar-standalone">
                <Link to="/admin/dashboard" className="admin-menu-button">Dashboard</Link>
                <Link to="/admin/productos" className="admin-menu-button">Productos</Link>
                <Link to="/admin/categorias" className="admin-menu-button">Categorías</Link>
                <Link to="/admin/ordenes" className="admin-menu-button active">Órdenes</Link>
                <span className="admin-promo-standalone">Administrador</span>
            </nav>
            <main className="admin-content-area">
                <div className="lista-ordenes-admin-container loading-container">Cargando órdenes del sistema...</div>
            </main>
        </div>
    );
  }

  return (
    <div className="admin-page-container">
      <header className="admin-navbar-standalone">
        <div className="admin-logo-standalone">MiTienda <span className="admin-dot-standalone">•</span></div>
        <input className="admin-search-standalone" type="text" placeholder="Buscar órdenes..." />
        <div className="admin-right-buttons-standalone">
          <button className="admin-panel-btn-standalone">Panel Admin</button>
          <div className="admin-user-icon-standalone">👤 Admin</div>
        </div>
      </header>
      <nav className="admin-menu-bar-standalone">
        <Link to="/admin/dashboard" className="admin-menu-button">Dashboard</Link>
        <Link to="/admin/productos" className="admin-menu-button">Productos</Link>
        <Link to="/admin/categorias" className="admin-menu-button">Categorías</Link>
        <Link to="/admin/ordenes" className="admin-menu-button active">Órdenes</Link>
        <span className="admin-promo-standalone">Administrador</span>
      </nav>

      <main className="admin-content-area">
        <div className="lista-ordenes-admin-content">
          <div className="admin-page-header">
            <h1 className="admin-page-title">Gestión de Órdenes</h1>
          </div>

          <div className="admin-table-responsive-wrapper">
            <table className="admin-data-table">
              <thead>
                <tr>
                  <th>ID Orden</th>
                  <th>Fecha</th>
                  <th>Cliente</th>
                  <th>Estado</th>
                  <th>Total</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {ordenes.length > 0 ? (
                  [...ordenes].sort((a, b) => new Date(b.fechaOriginal || b.id.split('-')[1]) - new Date(a.fechaOriginal || a.id.split('-')[1])).map(orden => (
                    <tr key={orden.id}>
                      <td>{orden.id}</td>
                      <td>{orden.fecha}</td>
                      <td>{orden.cliente.nombre}</td> {}
                      <td><span className={`status-badge status-${orden.estado.toLowerCase().replace(/\s+/g, '-').replace(/[()]/g, '')}`}>{orden.estado}</span></td>
                      <td>S/ {orden.resumenCosto.totalGeneral.toFixed(2)}</td> {}
                      <td className="actions-cell">
                        <Link to={`/usuario/orden/detalle/${orden.id}`} className="admin-button-link">
                          Ver Detalle
                        </Link>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr><td colSpan="6" className="no-results-cell">No hay órdenes en el sistema.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}

export default ListaOrdenesAdmin;
