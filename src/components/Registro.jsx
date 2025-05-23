import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Registro.css";

function Register() {
    const navigate = useNavigate(); 
    const [formData, setFormData] = useState({
        nombre: "",
        apellido: "",
        email: "",
        dni: "",
        password: "",
        confirmPassword: "",
    });

    const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState("");

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleRegister = (e) => {
        e.preventDefault();

        const { nombre, apellido, email, dni, password, confirmPassword } = formData;

        if (!nombre || !apellido || !email || !dni || !password || !confirmPassword) {
            setMessage("Todos los campos son obligatorios");
            setMessageType("error");
            return;
        }

        if (password !== confirmPassword) {
            setMessage("Las contraseñas no coinciden");
            setMessageType("error");
            return;
        }

        // Simulación de registro guardando en localStorage
        const user = { nombre, apellido, email, dni, password };
        localStorage.setItem("registeredUser", JSON.stringify(user));

        setMessage("Usuario registrado con éxito");
        setMessageType("success");

        // Limpiar formulario
        setFormData({
            nombre: "",
            apellido: "",
            email: "",
            dni: "",
            password: "",
            confirmPassword: "",
        });

        // tiempo para poder ir al login
        setTimeout(() => {
            navigate("/login"); 
        }, 2000);
    };

    return (
        <div className="register-page">
            <div className="register-box">
                <h2>Registro</h2>

                {message && (
                    <div
                        style={{
                            color: messageType === "error" ? "red" : "green",
                            marginBottom: "10px",
                            textAlign: "center",
                        }}
                    >
                        {message}
                    </div>
                )}

                <form onSubmit={handleRegister}>
                    <div className="form-row">
                        <input
                            type="text"
                            name="nombre"
                            placeholder="Nombre"
                            value={formData.nombre}
                            onChange={handleChange}
                        />
                        <input
                            type="text"
                            name="apellido"
                            placeholder="Apellido"
                            value={formData.apellido}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-row">
                        <input
                            type="email"
                            name="email"
                            placeholder="usuario@gmail.com"
                            value={formData.email}
                            onChange={handleChange}
                        />
                        <input
                            type="text"
                            name="dni"
                            placeholder="DNI"
                            value={formData.dni}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-row">
                        <input
                            type="password"
                            name="password"
                            placeholder="Contraseña"
                            value={formData.password}
                            onChange={handleChange}
                        />
                        <input
                            type="password"
                            name="confirmPassword"
                            placeholder="Confirmar contraseña"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                        />
                    </div>

                    <button type="submit" className="register-button">
                        Registrarme
                    </button>
                </form>

                <button
                    onClick={() => navigate("/login")}
                    className="back-button"
                >
                    ⬅ Volver al inicio
                </button>
            </div>
        </div>
    );
}

export default Register;
