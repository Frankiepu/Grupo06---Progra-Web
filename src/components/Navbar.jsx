// src/components/Navbar.jsx
import React from 'react';

function Navbar() { // Asegúrate que el nombre de la función sea "Navbar" con N mayúscula
  const categories = ['Electrónicos', 'Moda', 'Hogar', 'Juguetes', 'Deportes', 'Libros'];

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

export default Navbar; // ¡ESTA LÍNEA ES CRUCIAL Y DEBE SER EXACTA!