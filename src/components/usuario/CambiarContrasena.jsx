import React, { useState } from 'react';
import { Link } from 'react-router-dom'; 
import './CambiarContrasena.css';

function CambiarContrasena() {
  const [formData, setFormData] = useState({ actual: '', nueva: '', confirmarNueva: '' });
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
    if (error) setError(null);
    if (successMessage) setSuccessMessage('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage('');

    if (!formData.actual || !formData.nueva || !formData.confirmarNueva) {
      setError("Todos los campos son obligatorios.");
      return;
    }
    if (formData.nueva.length < 6) {
        setError("La nueva contraseña debe tener al menos 6 caracteres.");
        return;
    }
    if (formData.nueva !== formData.confirmarNueva) {
      setError("La nueva contraseña y la confirmación no coinciden.");
      return;
    }
    if (formData.actual === formData.nueva) {
        setError("La nueva contraseña no puede ser igual a la contraseña actual.");
        return;
    }

    setIsSaving(true);
    console.log("Cambiando contraseña...");

    setTimeout(() => {
      if (formData.actual === "password123") {
        setSuccessMessage('¡Contraseña cambiada con éxito!');
        setFormData({ actual: '', nueva: '', confirmarNueva: '' });
      } else if (Math.random() > 0.3) {
        setError('La contraseña actual no es correcta.');
      } else {
        setError('Error simulado al cambiar la contraseña. Inténtalo de nuevo.');
      }
      setIsSaving(false);
    }, 1000);
  };

  return (
    <div className="cambiar-contrasena-page">
      <div className="cambiar-contrasena-container">
        <div className="cambiar-contrasena-header">
          <h1 className="main-title">Cambiar Contraseña</h1>
          {}
          <Link to="/" className="button-secondary">
            ← Volver a Inicio
          </Link>
        </div>

        <form onSubmit={handleSubmit} className="cambiar-contrasena-form">
          {error && <div className="form-message error-message">{error}</div>}
          {successMessage && <div className="form-message success-message">{successMessage}</div>}

          <div className="form-group">
            <label htmlFor="actual">Contraseña Actual</label>
            <input
              type="password"
              id="actual"
              name="actual"
              className="form-input"
              value={formData.actual}
              onChange={handleChange}
              required
              disabled={isSaving}
              placeholder="Ingresa tu contraseña actual"
            />
          </div>

          <div className="form-group">
            <label htmlFor="nueva">Nueva Contraseña</label>
            <input
              type="password"
              id="nueva"
              name="nueva"
              className="form-input"
              value={formData.nueva}
              onChange={handleChange}
              required
              disabled={isSaving}
              placeholder="Mínimo 6 caracteres"
            />
          </div>

          <div className="form-group">
            <label htmlFor="confirmarNueva">Confirmar Nueva Contraseña</label>
            <input
              type="password"
              id="confirmarNueva"
              name="confirmarNueva"
              className="form-input"
              value={formData.confirmarNueva}
              onChange={handleChange}
              required
              disabled={isSaving}
              placeholder="Repite tu nueva contraseña"
            />
          </div>

          <div className="form-actions">
            <button type="submit" className="button-primary save-button" disabled={isSaving}>
              {isSaving ? 'Actualizando...' : 'Actualizar Contraseña'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CambiarContrasena;
