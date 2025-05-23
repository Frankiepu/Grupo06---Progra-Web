import React, { useEffect, useState } from 'react';

function Header({ cartCount, onCartClick, onLoginClick }) {
  const [userName, setUserName] = useState(null);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    const user = JSON.parse(localStorage.getItem("registeredUser"));

    if (isLoggedIn && user) {
      setUserName(`${user.nombre} ${user.apellido}`);
    } else {
      setUserName(null);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userEmail");
    setUserName(null);
    window.location.reload(); // Refresca para volver a estado sin sesión
  };

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
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "https://placehold.co/150x50/cccccc/000000?text=Logo+Error";
            }}
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
          {userName ? (
            <>
              <div style={{ color: "#fff", marginRight: "10px" }}>
                <UserIcon /> {userName}
              </div>
              <button
                onClick={handleLogout}
                style={{
                  background: "#ff4d4f",
                  color: "#fff",
                  padding: "5px 10px",
                  borderRadius: "8px",
                  border: "none",
                  cursor: "pointer"
                }}
              >
                Cerrar sesión
              </button>
            </>
          ) : (
            <button
              className="action-button user-button"
              onClick={onLoginClick}
              aria-label="Cuenta de usuario"
            >
              <div className="user-info">
                <UserIcon />
                <span className="user-label">Mi Cuenta</span>
              </div>
            </button>
          )}
          {/* Botón de carrito actualizado */}
          <button
            className="action-button cart-button"
            aria-label="Carrito de compras"
            onClick={onCartClick}
          >
            <ShoppingCartIcon />
            <span className="cart-badge">{cartCount}</span>
          </button>

          <button
            className="action-button menu-button-mobile"
            aria-label="Menú"
          >
            <MenuIcon />
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;

