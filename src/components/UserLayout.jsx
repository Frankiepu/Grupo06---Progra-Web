import React from 'react';
import Header from './Header';
import Navbar from './Navbar';
import Footer from './Footer';

function UserLayout({ children, cartCount, onCartClick, onLoginClick }) {
  return (
    <>
      <Header
        cartCount={cartCount}
        onCartClick={onCartClick}
        onLoginClick={onLoginClick}
      />
      <Navbar />
      <main className="main-content container">{children}</main>
      <Footer />
    </>
  );
}

export default UserLayout;