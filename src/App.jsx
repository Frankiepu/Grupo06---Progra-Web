
import React, { useState } from 'react';
import Header from './components/Header';
import Navbar from './components/Navbar';
import HomePage from './components/HomePage';
import Carrito from './components/Carrito';
import Checkout from './components/Checkout';
import Footer from './components/Footer';

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [viewCart, setViewCart] = useState(false);
  const [viewCheckout, setViewCheckout] = useState(false);

  //1)Añadir producto al carrito
  const handleAddToCart = (product) => {
    setCartItems(prev => {
      const exists = prev.find(item => item.id === product.id);
      if (exists) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  //2)Vistas: Home, Carrito, Checkout
  const showHome     = () => { setViewCart(false);    setViewCheckout(false); };
  const showCart     = () => { setViewCart(true);     setViewCheckout(false); };
  const showCheckout = () => { setViewCheckout(true); setViewCart(false); };

  //3)Cambiar cantidad y eliminar ítems
  const changeQuantity = (productId, delta) => {
    setCartItems(prev =>
      prev.map(item =>
        item.id === productId
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };
  const removeItem = (productId) => {
    setCartItems(prev => prev.filter(item => item.id !== productId));
  };

  //4)Badge del carrito
  const totalCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="App">
      <Header
        cartCount={totalCount}
        onCartClick={showCart}
      />

      <Navbar />

      <main className="main-content container">
        {viewCheckout ? (
          <Checkout
            cartItems={cartItems}
            onBackToCart={showCart}
            onOrderComplete={showHome}
          />
        ) : viewCart ? (
          <Carrito
            cartItems={cartItems}
            onBack={showHome}
            onQuantityChange={changeQuantity}
            onRemoveItem={removeItem}
            onCheckout={showCheckout}
          />
        ) : (
          <HomePage addToCart={handleAddToCart} />
        )}
      </main>

      <Footer />
    </div>
  );
}

export default App;



