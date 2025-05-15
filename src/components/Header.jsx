// src/components/Header.jsx
import React from 'react';

function Header() {
  // Iconos temporales usando emojis.
  const SearchIcon = () => <span role="img" aria-label="Buscar">🔍</span>;
  const UserIcon = () => <span role="img" aria-label="Usuario">👤</span>;
  const ShoppingCartIcon = () => <span role="img" aria-label="Carrito">🛒</span>;
  const MenuIcon = () => <span role="img" aria-label="Menú">☰</span>;

  return (
    <header className="app-header">
      <div className="container header-container">
        <div className="logo-container">
          <img
            src="https://placehold.co/150x50/4A90E2/ffffff?text=MiTienda"
            alt="Logo MiTienda"
            className="logo-img"
            onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/150x50/cccccc/000000?text=Logo+Error"; }}
          />
        </div>

        <div className="search-bar-container">
          <input
            type="search"
            placeholder="Buscar productos..."
            className="search-input"
          />
          <div className="search-icon-wrapper">
            <SearchIcon />
          </div>
        </div>

        <div className="header-actions">
          <button className="action-button user-button" aria-label="Cuenta de usuario">
            <UserIcon />
          </button>
          <button className="action-button cart-button" aria-label="Carrito de compras">
            <ShoppingCartIcon />
            <span className="cart-badge">3</span>
          </button>
          <button className="action-button menu-button-mobile" aria-label="Menú">
            <MenuIcon />
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
