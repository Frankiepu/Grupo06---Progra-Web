import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, Link as RouterLink } from 'react-router-dom';

import UserLayout from './components/UserLayout';
import HomePage from './components/HomePage';
import Login from './components/Login';
import Registro from "./components/Registro"; 
import Recuperar from './components/Recuperar';   
import Carrito from './components/Carrito';
import Checkout from './components/Checkout';
import ProductDetailPage from './components/ProductDetailPage'; 


import DetalleOrdenUsuario from './components/usuario/DetalleOrdenUsuario';
import DatosUsuario from './components/usuario/DatosUsuario';
import CambiarContrasena from './components/usuario/CambiarContrasena'; 
import ListaOrdenesUsuario from './components/usuario/ListaOrdenesUsuario'; 
import ListadoCategoriasAdmin from './components/admin/ListadoCategoriasAdmin';
import AgregarCategoriaAdmin from './components/admin/AgregarCategoriaAdmin';
import ListaOrdenesAdmin from './components/admin/ListaOrdenesAdmin';

const ProductsPagePlaceholder = ({ addToCart }) => (
  <div>
    <h2>Página de Productos</h2>
    <p>Contenido de productos o resultados de búsqueda irá aquí.</p>
  </div>
);

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [completedOrders, setCompletedOrders] = useState([]);
  const navigate = useNavigate();

  const handleAddToCart = (product) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      if (existingItem) {
        return prevItems.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevItems, { ...product, quantity: 1 }];
    });
  };

  const goToHome = () => navigate('/');
  const goToCart = () => navigate('/carrito');
  const goToCheckout = () => navigate('/checkout');
  const goToLogin = () => navigate('/login');
  const goToRegister = () => navigate('/registro');
  const goToRecover = () => navigate('/recuperar');
  const goToProducts = () => navigate('/productos');


  const changeQuantityInCart = (productId, delta) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === productId ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item
      ).filter(item => item.quantity > 0)
    );
  };

  const removeFromCart = (productId) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
  };

  const totalCartItemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const handleCompleteOrder = (orderDetailsFromCheckout) => {
    const newOrderId = `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 5).toUpperCase()}`;
    const newOrder = { id: newOrderId, fecha: new Date().toLocaleDateString('es-ES'), fechaOriginal: new Date(), estado: 'Procesando', ...orderDetailsFromCheckout };
    setCompletedOrders(prevOrders => [...prevOrders, newOrder]);
    setCartItems([]);
    navigate(`/usuario/orden/detalle/${newOrderId}`);
    return newOrder;
  };

  const getOrderById = (orderId) => completedOrders.find(order => order.id === orderId);
  const updateOrderStatus = (orderId, newStatus) => {
    setCompletedOrders(prevOrders =>
      prevOrders.map(order =>
        order.id === orderId ? { ...order, estado: newStatus } : order
      )
    );
  };
  
  const userLayoutProps = {
    cartCount: totalCartItemCount,
    onCartClick: goToCart,
  };

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<UserLayout {...userLayoutProps}><HomePage addToCart={handleAddToCart} /></UserLayout>}/>
        <Route path="/login" element={<UserLayout {...userLayoutProps}><Login onRegisterClick={goToRegister} onRecoverClick={goToRecover} onBack={goToHome} /></UserLayout>}/>
        <Route path="/registro" element={<UserLayout {...userLayoutProps}><Registro onLoginClick={goToLogin} /></UserLayout>}/>
        <Route path="/recuperar" element={<UserLayout {...userLayoutProps}><Recuperar onLoginClick={goToLogin} /></UserLayout>}/>
        <Route path="/productos" element={<UserLayout {...userLayoutProps}><ProductsPagePlaceholder addToCart={handleAddToCart} /></UserLayout>}/>
        <Route path="/carrito" element={<UserLayout {...userLayoutProps}><Carrito cartItems={cartItems} onBack={goToHome} onQuantityChange={changeQuantityInCart} onRemoveItem={removeFromCart} onCheckout={goToCheckout} /></UserLayout>}/>
        <Route path="/checkout" element={<UserLayout {...userLayoutProps}><Checkout cartItems={cartItems} onBackToCart={goToCart} onOrderComplete={handleCompleteOrder}/></UserLayout>}/>
        
        <Route 
          path="/producto/:productId" 
          element={
            <UserLayout {...userLayoutProps}>
              <ProductDetailPage addToCart={handleAddToCart} />
            </UserLayout>
          }
        />
        
        {/* (Tus rutas de /usuario y /admin se mantienen igual) */}
        <Route path="/usuario/ordenes" element={<UserLayout {...userLayoutProps}><ListaOrdenesUsuario orders={completedOrders} /></UserLayout>}/>
        <Route path="/usuario/orden/detalle/:orderId" element={<UserLayout {...userLayoutProps}><DetalleOrdenUsuario getOrderById={getOrderById} updateOrderStatus={updateOrderStatus} /></UserLayout>}/>
        <Route path="/usuario/datos" element={<UserLayout {...userLayoutProps}><DatosUsuario /></UserLayout>}/>
        <Route path="/usuario/cambiar-contrasena" element={<UserLayout {...userLayoutProps}><CambiarContrasena /></UserLayout>}/>
        <Route path="/admin/categorias" element={<ListadoCategoriasAdmin />} />
        <Route path="/admin/categorias/nueva" element={<AgregarCategoriaAdmin />} />
        <Route path="/admin/ordenes" element={<ListaOrdenesAdmin allOrders={completedOrders} updateOrderStatus={updateOrderStatus} />}/> 
        
        <Route path="*" element={
          <UserLayout {...userLayoutProps}>
            <div style={{ textAlign: 'center', padding: '50px' }}>
              <h2>Página no encontrada (404)</h2>
              <p>Lo sentimos, la página que buscas no existe.</p>
              <RouterLink to="/" style={{ color: '#007bff', textDecoration: 'underline' }}>
                Volver a la página de inicio
              </RouterLink>
            </div>
          </UserLayout>
        }/>
      </Routes>
    </div>
  );
}

export default App;
