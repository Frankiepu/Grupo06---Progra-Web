import React, { useState } from "react";
import "./Login.css";

function Login({ onBack, onRegisterClick, onRecoverClick }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();

    // LOCAL STORAGE : de aca se obtiene el usuario que guardamos en el localstorage pero primero TENEMOS que 
    // registrarnos para que se guarde
    const storedUser = JSON.parse(localStorage.getItem("registeredUser"));

    if (!storedUser) {
      setMessage("No hay ningún usuario registrado.");
      setMessageType("error");
      return;
    }

    if (email === storedUser.email && password === storedUser.password) {
      setMessage("Inicio de sesión exitoso");
      setMessageType("success");

      // Guardar sesión
      localStorage.setItem("userEmail", email);
      localStorage.setItem("isLoggedIn", "true");

      // Regresar al inicio después de 1 segundo
      setTimeout(() => {
        onBack(); // esto oculta el login y vuelve a la vista principal
      }, 1000);

    } else {
      setMessage("Correo o contraseña incorrectos");
      setMessageType("error");
    }
  };
  return (
    <div className="login-page">
      <div className="login-box">
        <h2>Iniciar Sesión</h2>
        {message && (
          <div
            style={{
              color: messageType === "error" ? "red" : "green",
              marginBottom: "10px",
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            {message}
          </div>
        )}
        {/* FORMULARIO DE LOGIN */}
        <form onSubmit={handleLogin}>
          <label htmlFor="email">Correo</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="usuario@gmail.com"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label htmlFor="password">Contraseña</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Contraseña"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit" className="login-button">Iniciar sesión</button>
        </form>
        {/* BOTONES FUERA DEL FORMULARIO */}
        <p className="register-link" style={{ marginTop: "10px", textAlign: "center" }}>
          ¿No tienes cuenta?{" "}
          <button
            onClick={onRegisterClick}
            style={{ background: "none", border: "none", color: "#007BFF", cursor: "pointer" }}
          >
            Regístrate
          </button>
          <br />
          <button
            onClick={onRecoverClick}
            style={{
              background: "none",
              border: "none",
              color: "#007BFF",
              cursor: "pointer",
              marginTop: "10px",
              display: "inline-block",
              padding: 0
            }}
          >
            ¿Olvidaste tu contraseña?
          </button>
        </p>

        {/* BOTÓN VOLVER */}
        <button
          onClick={onBack}
          style={{
            marginTop: "20px",
            backgroundColor: "#ddd",
            padding: "10px",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          ⬅ Volver al inicio
        </button>
      </div>
    </div>
  );
}

export default Login;
