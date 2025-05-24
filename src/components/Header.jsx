import React, { useEffect, useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { featuredProducts } from './HomePage'; 
import './Header.css'; 

function Header({ cartCount, onCartClick }) {
  const [userName, setUserName] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchSuggestions, setSearchSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  
  const navigate = useNavigate();
  const searchContainerRef = useRef(null);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    const user = JSON.parse(localStorage.getItem("registeredUser"));
    if (isLoggedIn && user) {
      setUserName(`${user.nombre} ${user.apellido}`);
    } else {
      setUserName(null);
    }
  }, []);

  useEffect(() => {
    function handleClickOutside(event) {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [searchContainerRef]);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("registeredUser");
    setUserName(null);
    navigate('/');
  };

  const handleAccountNavigation = () => {
    if (userName) {
      navigate('/usuario/datos');
    } else {
      navigate('/login');
    }
  };
  
  const handleSearchInputChange = (event) => {
    const query = event.target.value;
    setSearchTerm(query);

    if (query.length > 1) {
      const filtered = featuredProducts.filter(product =>
        product.name.toLowerCase().includes(query.toLowerCase())
      );
      setSearchSuggestions(filtered.slice(0, 5));
      setShowSuggestions(true);
    } else {
      setSearchSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (productId) => {
    setSearchTerm(''); 
    setSearchSuggestions([]); 
    setShowSuggestions(false); 
    navigate(`/producto/${productId}`);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault(); 
    setShowSuggestions(false); 

    if (searchTerm.trim() === '') {
      navigate('/productos');
      return;
    }

    const exactMatch = featuredProducts.find(p => p.name.toLowerCase() === searchTerm.trim().toLowerCase());
    if (exactMatch) {
      navigate(`/producto/${exactMatch.id}`);
      setSearchTerm(''); 
    } else if (searchSuggestions.length === 1) {
      navigate(`/producto/${searchSuggestions[0].id}`);
      setSearchTerm(''); 
    } else {
      navigate(`/productos?q=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  // Componentes de íconos (se mantienen igual)
  const SearchIcon = () => <span role="img" aria-label="Buscar">🔍</span>;
  const UserIcon = () => <span role="img" aria-label="Usuario">👤</span>;
  const ShoppingCartIcon = () => <span role="img" aria-label="Carrito">🛒</span>;
  const MenuIcon = () => <span role="img" aria-label="Menú">☰</span>;

  return (
    <header className="app-header"> 
      <div className="container header-container"> 
        <div className="logo-container"> 
          <Link to="/" className="mitienda-logo-button"> 
            MiTienda
          </Link>
        </div>

        <div className="search-bar-wrapper" ref={searchContainerRef}> 
          <form className="search-bar-container" onSubmit={handleSearchSubmit}> 
            <input
              type="search"
              placeholder="Buscar productos..."
              className="search-input"
              value={searchTerm}
              onChange={handleSearchInputChange}
              onFocus={() => { 
                if (searchTerm.length > 1 && searchSuggestions.length > 0) {
                  setShowSuggestions(true);
                }
              }}
            />
            <button 
              type="submit"
              className="search-icon-wrapper" 
              aria-label="Buscar productos"
            >
              <SearchIcon />
            </button>
          </form>
          {showSuggestions && searchSuggestions.length > 0 && (
            <ul className="search-suggestions-list"> 
              {searchSuggestions.map(product => (
                <li 
                  key={product.id} 
                  onClick={() => handleSuggestionClick(product.id)}
                  className="search-suggestion-item" 
                  tabIndex={0}
                  onKeyPress={(e) => { if (e.key === 'Enter' || e.key === ' ') handleSuggestionClick(product.id);}}
                >
                  <img 
                    src={product.imageUrl || "https://placehold.co/40x40/E0E0E0/B0B0B0?text=N/A"} 
                    alt={product.name} 
                    className="suggestion-item-image" 
                    onError={(e) => {
                        e.target.onerror = null; 
                        e.target.src="https://placehold.co/40x40/E0E0E0/B0B0B0?text=Error";
                    }}
                  />
                  <span className="suggestion-item-name">{product.name}</span> 
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="header-actions"> 
          {userName ? (
            <>
              <div 
                className="user-display" 
                onClick={() => navigate('/usuario/datos')}
                role="button" 
                tabIndex={0} 
                onKeyPress={(e) => { if (e.key === 'Enter' || e.key === ' ') navigate('/usuario/datos');}}
              >
                <UserIcon /> <span>{userName}</span> 
              </div>
              <button onClick={handleLogout} className="logout-button"> 
                Cerrar sesión
              </button>
            </>
          ) : (
            <button className="action-button user-button" onClick={handleAccountNavigation} aria-label="Iniciar Sesión"> 
              <div className="user-info"> 
                <UserIcon />
                <span className="user-label">Login</span>
              </div>
            </button>
          )}
          <button className="action-button cart-button" aria-label="Carrito de compras" onClick={onCartClick}> 
            <ShoppingCartIcon />
            <span className="cart-badge">{cartCount > 0 ? cartCount : '0'}</span> 
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
