import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; 
import './DatosUsuario.css';

const mockCurrentUserData = {
  id: 'USR1023',
  nombre: 'Ana Sofía',
  apellido: 'Paredes Gómez',
  correo: 'ana.paredes@example.com',
};

function DatosUsuario() {
  const [formData, setFormData] = useState({ nombre: '', apellido: '', correo: '' });
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  
  useEffect(() => {
    setIsLoading(true);
    setError(null);
    setSuccessMessage('');
    setTimeout(() => {
      setFormData({
        nombre: mockCurrentUserData.nombre,
        apellido: mockCurrentUserData.apellido,
        correo: mockCurrentUserData.correo,
      });
      setIsLoading(false);
    }, 500);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSaving(true);
    setError(null);
    setSuccessMessage('');

    if (!formData.nombre.trim() || !formData.apellido.trim() || !formData.correo.trim()) {
      setError("Todos los campos son obligatorios.");
      setIsSaving(false);
      return;
    }
    if (!/\S+@\S+\.\S+/.test(formData.correo)) {
        setError("El formato del correo electrónico no es válido.");
        setIsSaving(false);
        return;
    }
    
    console.log("Guardando datos del usuario:", formData);
    setTimeout(() => {
      if (Math.random() > 0.2) {
        setSuccessMessage('¡Datos actualizados con éxito!');
        mockCurrentUserData.nombre = formData.nombre;
        mockCurrentUserData.apellido = formData.apellido;
        mockCurrentUserData.correo = formData.correo;
      } else {
        setError('Error simulado al guardar los datos. Inténtalo de nuevo.');
      }
      setIsSaving(false);
    }, 1000);
  };
  
  if (isLoading) {
    return <div className="datos-usuario-page loading-container">Cargando tus datos...</div>;
  }

  return (
    <div className="datos-usuario-page">
      <div className="datos-usuario-container">
        <div className="datos-usuario-header">
          <h1 className="main-title">Mis Datos Personales</h1>
            {}
            <Link to="/" className="button-secondary">
              ← Volver a Inicio
            </Link>
        </div>

        <form onSubmit={handleSubmit} className="datos-usuario-form">
          {error && <div className="form-message error-message">{error}</div>}
          {successMessage && <div className="form-message success-message">{successMessage}</div>}

          <div className="form-group">
            <label htmlFor="nombre">Nombre</label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              className="form-input"
              value={formData.nombre}
              onChange={handleChange}
              required
              disabled={isSaving}
            />
          </div>

          <div className="form-group">
            <label htmlFor="apellido">Apellido</label>
            <input
              type="text"
              id="apellido"
              name="apellido"
              className="form-input"
              value={formData.apellido}
              onChange={handleChange}
              required
              disabled={isSaving}
            />
          </div>

          <div className="form-group">
            <label htmlFor="correo">Correo Electrónico</label>
            <input
              type="email"
              id="correo"
              name="correo"
              className="form-input"
              value={formData.correo}
              onChange={handleChange}
              required
              disabled={isSaving}
            />
          </div>

          <div className="form-actions">
            <button type="submit" className="button-primary save-button" disabled={isSaving}>
              {isSaving ? 'Guardando...' : 'Guardar Cambios'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default DatosUsuario;
