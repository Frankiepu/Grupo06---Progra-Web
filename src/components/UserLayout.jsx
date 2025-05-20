import React from 'react';
import Header from './Header';
import Navbar from './Navbar';
import Footer from './Footer';

function UserLayout({ children, cartCount, onCartClick }) {
  return (
    <div className="user-layout-container"> {}
      <Header cartCount={cartCount} onCartClick={onCartClick} />
      <Navbar />
      <main className="main-content container">
        {children}
      </main>
      <Footer />
    </div> 
  );
}

export default UserLayout;
