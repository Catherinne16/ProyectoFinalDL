import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx"; // Usamos el contexto de autenticación
import { FaArrowLeft } from "react-icons/fa";
import "./login.css";

const Login = () => {
  const [credentials, setCredentials] = useState({ correo: "", clave: "" });
  const [error, setError] = useState(null);
  const { login } = useAuth();
  const navigate = useNavigate();

  // Función para manejar los cambios en los inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  // Función para manejar el submit del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Limpiar error previo

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      const data = await response.json();

      if (response.ok) {
        const userData = { correo: credentials.correo, token: data.token };
        login(userData); // Guardar usuario en el contexto y localStorage
        navigate("/profile"); // Redirigir a la página del perfil
      } else {
        setError(data.error || "Correo o contraseña incorrectos.");
      }
    } catch (error) {
      setError("Error en el servidor. Inténtalo más tarde.");
    }
  };

  return (
    <div className="login-container">
      <h2>Iniciar sesión</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit} className="login-form">
        <div className="input-group">
          <label className="text-black">Correo electrónico</label>
          <input
            type="email"
            name="correo"
            value={credentials.correo}
            onChange={handleChange}
            required
            className="input-field"
          />
        </div>
        <div className="input-group">
          <label className="text-black">Contraseña</label>
          <input
            type="password"
            name="clave"
            value={credentials.clave}
            onChange={handleChange}
            required
            className="input-field"
          />
        </div>
        <button type="submit" className="login-btn">Iniciar sesión</button>
      </form>
      <p className="signup-text text-black">
        ¿No tienes cuenta? <Link to="/register" className="signup-link text-black">Regístrate aquí</Link>
      </p>
      <Link to="/" className="back-home-btn text-black">
        <FaArrowLeft className="icon" /> Volver al Inicio
      </Link>
    </div>
  );
};

export default Login;