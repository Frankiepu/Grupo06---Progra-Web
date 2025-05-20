import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './ListadoCategoriasAdmin.css';

const mockCategories = [
  { 
    id: 'CAT001', 
    nombre: 'Electrónicos', 
    descripcion: 'Smartphones, laptops, audífonos, smartwatches y más gadgets de última generación.' 
  },
  { 
    id: 'CAT002', 
    nombre: 'Libros y Revistas', 
    descripcion: 'Amplia variedad de géneros literarios, bestsellers, textos académicos y revistas de actualidad.' 
  },
  { 
    id: 'CAT003', 
    nombre: 'Moda y Accesorios', 
    descripcion: 'Ropa para damas, caballeros y niños. Calzado y accesorios para complementar tu estilo.' 
  },
  { 
    id: 'CAT004', 
    nombre: 'Hogar y Muebles', 
    descripcion: 'Artículos para decorar, organizar y equipar todas las áreas de tu casa con estilo y funcionalidad.' 
  },
  { 
    id: 'CAT005', 
    nombre: 'Deportes y Aire Libre', 
    descripcion: 'Equipamiento, ropa y accesorios para tus actividades deportivas y aventuras al aire libre.' 
  },
  { 
    id: 'CAT006', 
    nombre: 'Salud y Belleza', 
    descripcion: 'Productos para el cuidado personal, higiene, cosméticos, fragancias y bienestar. Incluye shampoos, cremas, etc.' 
  },
  { 
    id: 'CAT007', 
    nombre: 'Abarrotes', 
    descripcion: 'Alimentos básicos de despensa: arroz, azúcar, aceite, conservas, fideos, menestras, leche, avena, café y más.' 
  },
  { 
    id: 'CAT008', 
    nombre: 'Frutas y Verduras', 
    descripcion: 'Selección fresca de frutas de temporada y verduras para una alimentación saludable y balanceada.' 
  },
  { 
    id: 'CAT009', 
    nombre: 'Carnes, Aves y Pescado', 
    descripcion: 'Cortes frescos de carne de res, cerdo, pollo entero y en presas, pescados y mariscos.' 
  },
  { 
    id: 'CAT010', 
    nombre: 'Lácteos y Embutidos', 
    descripcion: 'Leche, quesos, yogures, mantequillas, jamones, salchichas y otros productos refrigerados.' 
  },
  { 
    id: 'CAT011', 
    nombre: 'Bebidas', 
    descripcion: 'Gaseosas, jugos, aguas, cervezas, vinos, licores y otras bebidas para toda ocasión.' 
  },
  { 
    id: 'CAT012', 
    nombre: 'Limpieza del Hogar', 
    descripcion: 'Detergentes, desinfectantes, lavavajillas, y todo lo necesario para mantener tu hogar impecable.' 
  }
];

function ListadoCategoriasAdmin() {
  const [categorias, setCategorias] = useState([]);
  const [categoriasFiltradas, setCategoriasFiltradas] = useState([]);
  const [filtroId, setFiltroId] = useState('');
  const [filtroNombre, setFiltroNombre] = useState('');
  const [filtroDescripcion, setFiltroDescripcion] = useState('');

  useEffect(() => {
    setCategorias(mockCategories);
    setCategoriasFiltradas(mockCategories);
  }, []);

  useEffect(() => {
    let resultado = categorias;
    if (filtroId) {
      resultado = resultado.filter(cat => cat.id.toLowerCase().includes(filtroId.toLowerCase()));
    }
    if (filtroNombre) {
      resultado = resultado.filter(cat => cat.nombre.toLowerCase().includes(filtroNombre.toLowerCase()));
    }
    if (filtroDescripcion) {
      resultado = resultado.filter(cat => cat.descripcion.toLowerCase().includes(filtroDescripcion.toLowerCase()));
    }
    setCategoriasFiltradas(resultado);
  }, [filtroId, filtroNombre, filtroDescripcion, categorias]);

  const limpiarFiltros = () => {
    setFiltroId('');
    setFiltroNombre('');
    setFiltroDescripcion('');
  };

  return (
    <div className="admin-page-container">
      <header className="admin-navbar-standalone">
        <div className="admin-logo-standalone">MiTienda <span className="admin-dot-standalone">•</span></div>
        <input className="admin-search-standalone" type="text" placeholder="Buscar en admin..." />
        <div className="admin-right-buttons-standalone">
          <button className="admin-panel-btn-standalone">Panel Admin</button>
          <div className="admin-user-icon-standalone">👤 Admin</div>
        </div>
      </header>

      <nav className="admin-menu-bar-standalone">
        <Link to="/admin/dashboard" className="admin-menu-button">Dashboard</Link>
        <Link to="/admin/productos" className="admin-menu-button">Productos</Link>
        <Link to="/admin/categorias" className="admin-menu-button active">Categorías</Link>
        <Link to="/admin/ordenes" className="admin-menu-button">Órdenes</Link>
        <span className="admin-promo-standalone">Administrador</span>
      </nav>

      <main className="admin-content-area">
        <div className="listado-categorias-content">
          <div className="admin-page-header">
            <h1 className="admin-page-title">Listado de Categorías</h1>
            <Link to="/admin/categorias/nueva" className="admin-button-primary">
              ➕ Nueva Categoría
            </Link>
          </div>

          <div className="admin-filters-panel">
            <input type="text" placeholder="Filtrar por ID" className="admin-input-filter" value={filtroId} onChange={(e) => setFiltroId(e.target.value)} />
            <input type="text" placeholder="Filtrar por Nombre" className="admin-input-filter" value={filtroNombre} onChange={(e) => setFiltroNombre(e.target.value)} />
            <input type="text" placeholder="Filtrar por Descripción" className="admin-input-filter" value={filtroDescripcion} onChange={(e) => setFiltroDescripcion(e.target.value)} />
            <button onClick={limpiarFiltros} className="admin-button-secondary">Limpiar Filtros</button>
          </div>

          <div className="admin-table-responsive-wrapper">
            <table className="admin-data-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nombre</th>
                  <th>Descripción</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {categoriasFiltradas.length > 0 ? (
                  categoriasFiltradas.map((categoria) => (
                    <tr key={categoria.id}>
                      <td>{categoria.id}</td>
                      <td>{categoria.nombre}</td>
                      <td className="description-cell">{categoria.descripcion}</td>
                      <td className="actions-cell">
                        <Link to={`/admin/categorias/detalle/${categoria.id}`} className="admin-button-link">
                          Ver Detalles
                        </Link>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr><td colSpan="4" className="no-results-cell">No se encontraron categorías.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}

export default ListadoCategoriasAdmin;
