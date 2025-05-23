import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './layoutAdmin.css'; 

function LayoutAdmin() {
  const { pathname } = useLocation();

  const isActive = (path) => pathname === path ? 'activo' : '';

  return (
    <nav className="navbar-admin">
      <div className="logo">🛒 MiTienda <span className="dot">•</span></div>
      <ul className="nav-links">
        <li><Link to="/dashboard" className={isActive('/dashboard')}>Dashboard</Link></li>
        <li><Link to="/lista-productos" className={isActive('/lista-productos')}>Listado de productos</Link></li>
        <li><Link to="/agregar-producto" className={isActive('/agregar-producto')}>Agregar productos</Link></li>
      </ul>
      <div className="admin-panel">👨‍💼 Admin</div>
    </nav>
  );
}

export default LayoutAdmin;
