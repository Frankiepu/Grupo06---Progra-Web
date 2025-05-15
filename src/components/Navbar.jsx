
import React from 'react';

function Navbar() { 
  const categories = ['Nosotros', 'Productos', 'Categorias'];

  return (
    <nav className="main-navbar">
      <div className="container">
        <ul className="nav-list">
          {categories.map((category) => (
            <li key={category} className="nav-item">
              <a href="#" className="nav-link">
                {category}
              </a>
            </li>
          ))}
          <li className="nav-item">
            <a href="#" className="nav-link offers-link">
              Ofertas
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;