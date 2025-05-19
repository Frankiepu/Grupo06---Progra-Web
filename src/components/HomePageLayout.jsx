import React from 'react';
import Header from './Header';
import Navbar from './Navbar';
import HomePage from './HomePage'; 
import Footer from './Footer';

function HomePageLayout() {
  return (
    <div className="homepage-layout">
      <Header />
      <Navbar />
      <main className="main-content container">
        <HomePage />
      </main>
      <Footer />
    </div>
  );
}

export default HomePageLayout;
