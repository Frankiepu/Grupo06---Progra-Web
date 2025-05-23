import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; // Importamos Link para la navegación

// La prop onLoginClick se espera que sea una función que navegue a la página de login.
// La prop onCartClick se espera que sea una función que navegue a la página del carrito.
function Header({ cartCount, onCartClick, onLoginClick }) {
  const [userName, setUserName] = useState(null);

  useEffect(() => {
    // Lógica para verificar si el usuario está logueado desde localStorage
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    const user = JSON.parse(localStorage.getItem("registeredUser"));

    if (isLoggedIn && user) {
      setUserName(`${user.nombre} ${user.apellido}`);
    } else {
      setUserName(null);
    }
  }, []); // El array vacío asegura que esto se ejecute solo una vez al montar el componente

  const handleLogout = () => {
    // Lógica para cerrar sesión
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("registeredUser"); // Limpia también el objeto de usuario
    setUserName(null);
    // Considera usar navigate('/') de react-router-dom aquí si quieres una transición SPA
    // Para ello, necesitarías importar useNavigate y obtener la función navigate.
    // Por ahora, window.location.reload() fuerza una recarga completa.
    window.location.reload();
  };

  // Tus componentes de íconos
  const SearchIcon = () => <span role="img" aria-label="Buscar">🔍</span>;
  const UserIcon = () => <span role="img" aria-label="Usuario">👤</span>;
  const ShoppingCartIcon = () => <span role="img" aria-label="Carrito">🛒</span>;
  const MenuIcon = () => <span role="img" aria-label="Menú">☰</span>;

  return (
    <header className="app-header">
      <div className="container header-container">
        <div className="logo-container">
          {/* "MiTienda" ahora es un Link de texto a la página de inicio ("/") */}
          {/* Puedes añadir una clase a este Link para darle estilos de botón si lo deseas */}
          <Link to="/" className="mitienda-logo-button"> {/* Añadida clase para posible estilizado */}
            MiTienda
          </Link>
        </div>

        <div className="search-bar-container">
          <input
            type="search"
            placeholder="Buscar productos..."
            className="search-input"
          // Si quieres que la búsqueda navegue, necesitarías useNavigate y un manejador:
          // onKeyDown={(e) => { if (e.key === 'Enter') { /* const navigate = useNavigate(); navigate(`/productos?q=${e.target.value}`); */ } }}
          />
          <div
            className="search-icon-wrapper"
          // Si quieres que el ícono de búsqueda navegue:
          // onClick={() => { /* const navigate = useNavigate(); navigate('/productos'); */ }}
          // style={{ cursor: 'pointer' }}
          >
            <SearchIcon />
          </div>
        </div>

        <div className="header-actions">
          {userName ? (
            <>
              <div className="user-display" style={{ color: "#fff", marginRight: "10px", display: 'flex', alignItems: 'center' }}>
                <UserIcon /> <span style={{ marginLeft: '5px' }}>{userName}</span>
              </div>
              <button
                onClick={handleLogout}
                className="logout-button" // Considera añadir una clase para estilos más limpios
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
              onClick={onLoginClick} // Esta prop debe ser una función que navegue a /login
              aria-label="Cuenta de usuario"
            >
              <div className="user-info">
                <UserIcon />
                <Link to="/login" className="user-label" style={{ textDecoration: 'none' }}>
                  Mi Cuenta
                </Link>
              </div>
            </button>
          )}

          <button
            className="action-button cart-button"
            aria-label="Carrito de compras"
            onClick={onCartClick} // Esta prop debe navegar al carrito (ej. () => navigate('/carrito'))
          >
            <ShoppingCartIcon />
            <span className="cart-badge">{cartCount > 0 ? cartCount : '0'}</span>
          </button>

          <button
            className="action-button menu-button-mobile"
            aria-label="Menú"
          // Aquí iría la lógica para el menú móvil si es necesario
          >
            <MenuIcon />
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
