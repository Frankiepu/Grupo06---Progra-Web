import React from "react";
import { useParams } from "react-router-dom";
import './DetalleUsuario.css';

const usuarios = [
  {
    id: 'USR-001',
    nombre: "Carlos Pérez",
    correo: "carlos@example.com",
    fechaRegistro: "01/01/2025",
    estado: "Activo",
    foto: "/src/assets/photo-1664871475935-39a9b861514f.jpeg",
    ordenes: [
      { id: "1001", fecha: "20/01/2025", total: 120.0 },
      { id: "1002", fecha: "25/01/2025", total: 199.0 },
    ],
  },
  {
    id: 'USR-002',
    nombre: "Lucía García",
    correo: "lucia@example.com",
    fechaRegistro: "02/01/2025",
    estado: "Activo",
    foto: "/src/assets/premium_photo-1689530775582-83b8abdb5020.jpeg",
    ordenes: [
      { id: "2001", fecha: "15/02/2025", total: 89.0 },
    ],
  },
  {
    id: 'USR-003',
    nombre: "Sebastián López",
    correo: "sebastian@example.com",
    fechaRegistro: "03/01/2025",
    estado: "Activo",
    foto: "/src/assets/premium_photo-1689551670902-19b441a6afde.jpeg",
    ordenes: [
      { id: "3001", fecha: "10/03/2025", total: 149.0 },
      { id: "3002", fecha: "18/03/2025", total: 75.0 },
    ],
  },
];

const DetalleUsuario = () => {
  const { id } = useParams();
  const usuario = usuarios.find(u => u.id === id);

  if (!usuario) return <p>Usuario no encontrado</p>;

  return (
    <div className="dashboard-container">
      <h2>Detalles de usuario</h2>
      <div className="user-detail">
        <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap" }}>
          <div>
            <h2>{usuario.nombre}</h2>
            <p><strong>Correo:</strong> <a href={`mailto:${usuario.correo}`}>{usuario.correo}</a></p>
            <p><strong>Fecha de registro:</strong> {usuario.fechaRegistro}</p>
            <p><strong>Estado:</strong> {usuario.estado}</p>
          </div>
          <img src={usuario.foto} alt="Usuario" className="foto-usuario" />
        </div>

        <h2 style={{ marginTop: "2rem" }}>Últimas órdenes</h2>
        <div className="table-card">
          <table>
            <thead>
              <tr>
                <th>#ID</th>
                <th>Fecha</th>
                <th>Total</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {usuario.ordenes.slice(0, 10).map((orden, idx) => (
                <tr key={idx}>
                  <td><a href={`/orden/${orden.id}`} style={{ color: "#d63636", textDecoration: "underline" }}>#{orden.id}</a></td>
                  <td>{orden.fecha}</td>
                  <td>S/{orden.total.toFixed(2)}</td>
                  <td><button className="btn-tabla">Ver detalle</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DetalleUsuario;
