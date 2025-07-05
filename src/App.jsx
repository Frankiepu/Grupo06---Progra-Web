import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, Link as RouterLink } from 'react-router-dom';
import { AuthProvider } from './components/autenticacion';

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
import ListaOrdenes2 from './components/admin/ListaOrdenes2';
import DashboardAdmin from './components/admin/DashboardAdmin';
import AgregarproductoAdmi from './components/admin/AgregarproductoAdmi';
import ListaProductos from './components/admin/ListaProductos';
import ListaUsuarios from './components/admin/ListaUsuario';
import DetalleUsuario from './components/admin/DetalleUsuario';
import CategoriesPage from './components/CategoriesPage';
import ProtectedRoute from './components/ProtectedRoute';

const ProductsPagePlaceholder = ({ addToCart }) => (
  <div>
    <h2>Página de Productos</h2>
    <p>Contenido de productos o resultados de búsqueda irá aquí.</p>
  </div>
);

function AppContent() {
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
        {/* Rutas públicas */}
        <Route path="/" element={<UserLayout {...userLayoutProps}><HomePage addToCart={handleAddToCart} /></UserLayout>}/>
        <Route path="/login" element={<UserLayout {...userLayoutProps}><Login onRegisterClick={goToRegister} onRecoverClick={goToRecover} onBack={goToHome} /></UserLayout>}/>
        <Route path="/registro" element={<UserLayout {...userLayoutProps}><Registro onLoginClick={goToLogin} /></UserLayout>}/>
        <Route path="/recuperar" element={<UserLayout {...userLayoutProps}><Recuperar onLoginClick={goToLogin} /></UserLayout>}/>
        <Route path="/productos" element={<UserLayout {...userLayoutProps}><ProductsPagePlaceholder addToCart={handleAddToCart} /></UserLayout>}/>
        <Route path="/categorias" element={<UserLayout {...userLayoutProps}><CategoriesPage addToCart={handleAddToCart} /></UserLayout>}/>
        <Route 
          path="/producto/:productId" 
          element={
            <UserLayout {...userLayoutProps}>
              <ProductDetailPage addToCart={handleAddToCart} />
            </UserLayout>
          }
        />

        {/* Rutas protegidas para usuarios autenticados */}
        <Route path="/carrito" element={
          <ProtectedRoute>
            <UserLayout {...userLayoutProps}>
              <Carrito cartItems={cartItems} onBack={goToHome} onQuantityChange={changeQuantityInCart} onRemoveItem={removeFromCart} onCheckout={goToCheckout} />
            </UserLayout>
          </ProtectedRoute>
        }/>
        <Route path="/checkout" element={
          <ProtectedRoute>
            <UserLayout {...userLayoutProps}>
              <Checkout cartItems={cartItems} onBackToCart={goToCart} onOrderComplete={handleCompleteOrder}/>
            </UserLayout>
          </ProtectedRoute>
        }/>
        <Route path="/usuario/ordenes" element={
          <ProtectedRoute>
            <UserLayout {...userLayoutProps}>
              <ListaOrdenesUsuario orders={completedOrders} />
            </UserLayout>
          </ProtectedRoute>
        }/>
        <Route path="/usuario/orden/detalle/:orderId" element={
          <ProtectedRoute>
            <UserLayout {...userLayoutProps}>
              <DetalleOrdenUsuario getOrderById={getOrderById} updateOrderStatus={updateOrderStatus} />
            </UserLayout>
          </ProtectedRoute>
        }/>
        <Route path="/usuario/datos" element={
          <ProtectedRoute>
            <UserLayout {...userLayoutProps}>
              <DatosUsuario />
            </UserLayout>
          </ProtectedRoute>
        }/>
        <Route path="/usuario/cambiar-contrasena" element={
          <ProtectedRoute>
            <UserLayout {...userLayoutProps}>
              <CambiarContrasena />
            </UserLayout>
          </ProtectedRoute>
        }/>

        {/* Rutas protegidas para administradores */}
        <Route path="/admin" element={<ProtectedRoute requireAdmin><DashboardAdmin /></ProtectedRoute>} />
        <Route path="/admin/dashboard" element={<ProtectedRoute requireAdmin><DashboardAdmin /></ProtectedRoute>} />
        <Route path="/admin/categorias" element={<ProtectedRoute requireAdmin><ListadoCategoriasAdmin /></ProtectedRoute>} />
        <Route path="/admin/categorias/nueva" element={<ProtectedRoute requireAdmin><AgregarCategoriaAdmin /></ProtectedRoute>} />
        <Route path="/admin/ordenes" element={<ProtectedRoute requireAdmin><ListaOrdenesAdmin allOrders={completedOrders} updateOrderStatus={updateOrderStatus} /></ProtectedRoute>}/> 
        <Route path="/admin/productos" element={<ProtectedRoute requireAdmin><ListaProductos /></ProtectedRoute>} />
        <Route path="/admin/productos/nuevo" element={<ProtectedRoute requireAdmin><AgregarproductoAdmi /></ProtectedRoute>} />
        <Route path="/admin/productos/editar" element={<ProtectedRoute requireAdmin><AgregarproductoAdmi /></ProtectedRoute>} />
        <Route path="/admin/ordenes2" element={<ProtectedRoute requireAdmin><ListaOrdenes2 /></ProtectedRoute>} /> 
        <Route path="/admin/usuarios/:id" element={<ProtectedRoute requireAdmin><DetalleUsuario /></ProtectedRoute>} />
        <Route path="/admin/ListaUsuario" element={<ProtectedRoute requireAdmin><ListaUsuarios /></ProtectedRoute>} /> 

        {/* Ruta 404 */}
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

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
