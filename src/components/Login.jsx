import React from 'react';
import Header from './Header';
import Navbar from './Navbar';
import '../Login.css';

function Login() {
  return (
    <>
      <Header />
      <Navbar />

      <div className="login-page">
        <div className="login-box">
          <h2>Iniciar Sesión</h2>

          <form>
            <label htmlFor="email">Correo</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="usuario@gmail.com"
              required
            />

            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Contraseña"
              required
            />

            <button type="submit" className="login-button">Iniciar sesión</button>

            <p className="register-link">
              ¿No tienes cuenta? <a href="#">Regístrate</a>
            </p>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
