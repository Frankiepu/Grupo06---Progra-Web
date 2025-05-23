import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './layoutAdmin.css';

function LayoutAdmin() {
  const { pathname } = useLocation();

  const isActive = (path) => pathname === path ? 'activo' : '';

  return (
    <nav className="navbar-admin">
      <div className="logo">
        🛒 MiTienda <span className="dot">•</span>
      </div>
      <ul className="nav-links">
        <li><Link to="/admin/dashboard" className={isActive('/admin/dashboard')}>Dashboard</Link></li>
        <li><Link to="/admin/productos" className={isActive('/admin/productos')}>Productos</Link></li>
        <li><Link to="/admin/categorias" className={isActive('/admin/categorias')}>Categorías</Link></li>
        <li><Link to="/admin/ordenes" className={isActive('/admin/ordenes')}>Órdenes</Link></li>
      </ul>
      <div className="admin-panel">👨‍💼 Admin</div>
    </nav>
  );
}

export default LayoutAdmin;
