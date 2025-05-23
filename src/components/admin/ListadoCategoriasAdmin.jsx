import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './ListadoCategoriasAdmin.css';
import ModalCategoria from './ModalCategoria.jsx';

const mockCategories = [
  { 
    id: 'CAT001', 
    nombre: 'Frutas y verduras', 
    descripcion: 'Variedad de frutas y verduras frescas de temporada.'
  },
  { 
    id: 'CAT002', 
    nombre: 'Carnes, aves y pescados', 
    descripcion: 'Cortes frescos de carnes, aves de corral y pescados.'
  },
  { 
    id: 'CAT003', 
    nombre: 'Desayunos', 
    descripcion: 'Productos para empezar el día con energía: cereales, panes, etc.' 
  },
  { 
    id: 'CAT004', 
    nombre: 'Lácteos y huevos', 
    descripcion: 'Leche, yogures, quesos, mantequillas y huevos frescos.'
  },
  { 
    id: 'CAT005', 
    nombre: 'Queso y fiambres', 
    descripcion: 'Selección de quesos nacionales e importados y variedad de fiambres.'
  },
  { 
    id: 'CAT006', 
    nombre: 'Abarrotes', 
    descripcion: 'Productos básicos de despensa: arroz, azúcar, aceite, conservas, etc.' 
  },
  { 
    id: 'CAT007', 
    nombre: 'Panadería', 
    descripcion: 'Pan fresco del día, pasteles, galletas y otros productos horneados.'
  },
  { 
    id: 'CAT008', 
    nombre: 'Congelados', 
    descripcion: 'Productos congelados listos para preparar: verduras, carnes, helados.'
  }
];

function ListadoCategoriasAdmin() {
  const [categorias, setCategorias] = useState([]);
  const [categoriasFiltradas, setCategoriasFiltradas] = useState([]);
  const [filtroId, setFiltroId] = useState('');
  const [filtroNombre, setFiltroNombre] = useState('');
  const [filtroDescripcion, setFiltroDescripcion] = useState('');
  const [mostrarModalAgregar, setMostrarModalAgregar] = useState(false);

  useEffect(() => {
    setCategorias(mockCategories);
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

  const handleAbrirModalAgregar = () => {
    setMostrarModalAgregar(true);
  };

  const handleCerrarModalAgregar = () => {
    setMostrarModalAgregar(false);
  };

  const handleGuardarNuevaCategoria = (nuevaCategoriaData) => {
    const maxId = categorias.reduce((max, cat) => {
        const currentIdNum = parseInt(cat.id.replace('CAT', ''), 10);
        return currentIdNum > max ? currentIdNum : max;
    }, 0);
    const nuevoIdNum = maxId + 1;
    const nuevoId = `CAT${String(nuevoIdNum).padStart(3, '0')}`;
    
    const categoriaConId = { 
        id: nuevoId,
        nombre: nuevaCategoriaData.nombre, 
        descripcion: nuevaCategoriaData.descripcion 
    };

    setCategorias(prevCategorias => [...prevCategorias, categoriaConId]);
    setMostrarModalAgregar(false);
  };

  const handleEliminarCategoria = (idCategoriaAEliminar) => {
    if (window.confirm(`¿Estás seguro de que deseas eliminar la categoría con ID ${idCategoriaAEliminar}?`)) {
      setCategorias(prevCategorias => prevCategorias.filter(cat => cat.id !== idCategoriaAEliminar));
    }
  };

  return (
    <div className="admin-page-container">
      <header className="admin-navbar-standalone">
        <div className="admin-logo-standalone">MiTienda <span className="admin-dot-standalone">•</span></div>
        <input className="admin-search-standalone" type="text" placeholder="Buscar en admin..." />
        <div className="admin-right-buttons-standalone">
          <button className="admin-panel-btn-standalone">Panel Admin</button>
          <div className="admin-user-icon-standalone">🧑‍💼 Admin</div>
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
            <button onClick={handleAbrirModalAgregar} className="admin-button-primary">
              ⊕ Nueva Categoría
            </button>
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
                        <button 
                          onClick={() => handleEliminarCategoria(categoria.id)} 
                          className="admin-button-link"
                          style={{ color: '#dc3545', marginLeft: '10px', background: 'none', border: 'none', padding: '5px 0', cursor: 'pointer', fontSize: '0.9rem', fontFamily: "'Inter', sans-serif" }}
                        >
                          Eliminar
                        </button>
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
      {mostrarModalAgregar && (
        <ModalCategoria
          onClose={handleCerrarModalAgregar}
          onSave={handleGuardarNuevaCategoria}
        />
      )}
    </div>
  );
}

export default ListadoCategoriasAdmin;
