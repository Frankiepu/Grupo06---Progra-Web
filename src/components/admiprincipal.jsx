import React from 'react';
import './adminDashboard.css';

function admiprincipal() {
  const [data, setData] = useState({
    orders: 24,
    users: 8,
    income: 3400,
  });

  const [startDate, setStartDate] = useState(() => new Date().toISOString().split('T')[0]);
  const [endDate, setEndDate] = useState(() => new Date().toISOString().split('T')[0]);

  const handleFilter = (e) => {
    e.preventDefault();
    
    console.log("Filtrar entre:", startDate, endDate);
    
    setData({
      orders: 12,
      users: 4,
      income: 1900,
    });
  };

  return (
    <div>
      <header className="navbar">
        <div className="logo">Mi-Tiendita <span className="dot">•</span></div>
        <input className="search" type="text" placeholder="Buscar..." />
        <div className="right-buttons">
          <button className="cart-btn">Panel Admin</button>
          <div className="user-icon">👤 Admin</div>
        </div>
      </header>

      <nav className="menu-bar">
        <button>Dashboard</button>
        <button>Productos</button>
        <button>Órdenes</button>
        <span className="promo">Administrador</span>
      </nav>

      <main className="container">
        <h1 className="title">Dashboard del Administrador</h1>

        <section className="stats-grid">
          <div className="stat-card">
            <h2>Órdenes</h2>
            <p className="number">{data.orders}</p>
          </div>
          <div className="stat-card">
            <h2>Usuarios nuevos</h2>
            <p className="number">{data.users}</p>
          </div>
          <div className="stat-card">
            <h2>Ingresos totales</h2>
            <p className="number">${data.income}</p>
          </div>
        </section>

        <section className="filters">
          <form onSubmit={handleFilter}>
            <label>Seleccionar período:</label>
            <div className="date-group">
              <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} />
              <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} />
              <button className="btn-primary" type="submit">Aplicar</button>
            </div>
          </form>
        </section>
      </main>
    </div>
  );
}

export default admiprincipal;
