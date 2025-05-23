import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, Link as RouterLink } from 'react-router-dom';

import UserLayout from './components/UserLayout';

import HomePage from './components/HomePage';
import Login from './components/Login';
import Registro from "./components/Registro";
import Recuperar from './components/Recuperar';
import DetalleOrdenUsuario from './components/usuario/DetalleOrdenUsuario';
import DatosUsuario from './components/usuario/DatosUsuario';
import CambiarContrasena from './components/usuario/CambiarContrasena';
import ListaOrdenesUsuario from './components/usuario/ListaOrdenesUsuario';

import ListadoCategoriasAdmin from './components/admin/ListadoCategoriasAdmin';
import AgregarCategoriaAdmin from './components/admin/AgregarCategoriaAdmin';
import ListaOrdenesAdmin from './components/admin/ListaOrdenesAdmin';

import Carrito from './components/Carrito';
import Checkout from './components/Checkout';
import Header from './components/Header';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [viewCart, setViewCart] = useState(false);
  const [viewCheckout, setViewCheckout] = useState(false);
  const [completedOrders, setCompletedOrders] = useState([]);
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [showRecover, setShowRecover] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    console.log("Órdenes completadas actualizadas en App.jsx:", completedOrders);
  }, [completedOrders]);

  const handleAddToCart = (product) => {
    setCartItems(prev => {
      const exists = prev.find(item => item.id === product.id);
      if (exists) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const showHome = () => { setViewCart(false); setViewCheckout(false); setShowLogin(false); setShowRegister(false); setShowRecover(false); navigate('/'); };
  const showCartView = () => { setViewCheckout(false); setShowLogin(false); setShowRegister(false); setShowRecover(false); setViewCart(true); };
  const showCheckoutView = () => { setViewCart(false); setViewCheckout(true); };
  const showLoginScreen = () => { setViewCart(false); setViewCheckout(false); setShowRegister(false); setShowRecover(false); setShowLogin(true); };
  const showRegisterScreen = () => { setViewCart(false); setViewCheckout(false); setShowLogin(false); setShowRecover(false); setShowRegister(true); };
  const showRecoverScreen = () => { setViewCart(false); setViewCheckout(false); setShowLogin(false); setShowRegister(false); setShowRecover(true); };

  const changeQuantity = (productId, delta) => {
    setCartItems(prev => prev.map(item => item.id === productId ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item));
  };
  const removeItem = (productId) => {
    setCartItems(prev => prev.filter(item => item.id !== productId));
  };
  const totalCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const handleCompleteOrder = (orderDetailsFromCheckout) => {
    const newOrderId = `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 5).toUpperCase()}`;
    const newOrder = {
      ...orderDetailsFromCheckout,
      id: newOrderId,
      fecha: new Date().toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' }),
      fechaOriginal: new Date(),
      estado: 'Procesando',
    };
    setCompletedOrders(prevOrders => [...prevOrders, newOrder]);
    setCartItems([]);
    setViewCart(false);
    setViewCheckout(false);
    navigate(`/usuario/orden/detalle/${newOrderId}`);
    return newOrder;
  };

  const getOrderById = (orderId) => {
    return completedOrders.find(order => order.id === orderId);
  };


  const updateOrderStatus = (orderId, newStatus) => {
    setCompletedOrders(prevOrders =>
      prevOrders.map(order =>
        order.id === orderId ? { ...order, estado: newStatus } : order
      )
    );
    console.log(`Estado de orden ${orderId} actualizado a ${newStatus} en App.jsx`);
  };
  // Mostrar pantallas modales (sin rutas)
  if (showRecover || showRegister || showLogin) {
    return (
      <div className="App">
        <Header cartCount={totalCount} onCartClick={showCartView} onLoginClick={showLoginScreen} />
        <Navbar />
        <main className="main-content container">
          {showRecover ? (
            <Recuperar onBack={showHome} />
          ) : showRegister ? (
            <Registro onBack={showLoginScreen} />
          ) : (
            <Login
              onBack={showHome}
              onRegisterClick={showRegisterScreen}
              onRecoverClick={showRecoverScreen}
            />
          )}
        </main>
        <Footer />
      </div>
    );
  }
  if (viewCheckout) {
    return (
      <div className="App">
        <Header cartCount={totalCount} onCartClick={showCartView} onLoginClick={showLoginScreen} />
        <Navbar />
        <main className="main-content container">
          <Checkout
            cartItems={cartItems}
            onBackToCart={showCartView}
            onOrderComplete={handleCompleteOrder}
          />
        </main>
        <Footer />
      </div>
    );
  }
  if (viewCart) {
    return (
      <div className="App">
        <Header cartCount={totalCount} onCartClick={showCartView} onLoginClick={showLoginScreen}/>
        <Navbar />
        <main className="main-content container">
          <Carrito cartItems={cartItems} onBack={showHome} onQuantityChange={changeQuantity} onRemoveItem={removeItem} onCheckout={showCheckoutView} />
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={
          <UserLayout cartCount={totalCount} onCartClick={showCartView} onLoginClick={showLoginScreen}>
            <HomePage addToCart={handleAddToCart} />
          </UserLayout>
        } />
  
        <Route path="/usuario/ordenes" element={
          <UserLayout cartCount={totalCount} onCartClick={showCartView} onLoginClick={showLoginScreen}>
            <ListaOrdenesUsuario orders={completedOrders} />
          </UserLayout>
        } />
        <Route path="/usuario/orden/detalle/:orderId" element={
          <UserLayout cartCount={totalCount} onCartClick={showCartView} onLoginClick={showLoginScreen}>
            { }
            <DetalleOrdenUsuario getOrderById={getOrderById} updateOrderStatus={updateOrderStatus} onLoginClick={showLoginScreen}/>
          </UserLayout>
        } />
        <Route path="/usuario/datos" element={
          <UserLayout cartCount={totalCount} onCartClick={showCartView} onLoginClick={showLoginScreen}>
            <DatosUsuario />
          </UserLayout>
        } />
        <Route path="/usuario/cambiar-contrasena" element={
          <UserLayout cartCount={totalCount} onCartClick={showCartView} onLoginClick={showLoginScreen}>
            <CambiarContrasena />
          </UserLayout>
        } />

        <Route path="/admin/categorias" element={<ListadoCategoriasAdmin />} />
        <Route path="/admin/categorias/nueva" element={<AgregarCategoriaAdmin />} />
        <Route path="/admin/ordenes" element={
          <ListaOrdenesAdmin allOrders={completedOrders} />
        } />

        <Route path="*" element={
          <UserLayout cartCount={totalCount} onCartClick={showCartView} onLoginClick={showLoginScreen}>
            <div>
              <h2>Página no encontrada (404)</h2>
              <p><RouterLink to="/">Volver a la página de inicio</RouterLink></p>
            </div>
          </UserLayout>
        } />
      </Routes>
    </div>
  );
}

export default App;



