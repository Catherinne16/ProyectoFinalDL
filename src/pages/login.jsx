import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { useAuth } from "../context/AuthContext"; // Importamos el contexto de autenticación
import "./login.css";

const Login = () => {
  const [credentials, setCredentials] = useState({ correo: "", clave: "" });
  const [error, setError] = useState(null);
  const { login } = useAuth(); // Accedemos a la función login del contexto
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

    // Credenciales de prueba
    const testCredentials = { correo: "test@example.com", clave: "123456" };

    // Verificamos si las credenciales coinciden
    if (
      credentials.correo === testCredentials.correo &&
      credentials.clave === testCredentials.clave
    ) {
      // Creamos un objeto de usuario ficticio con el token
      const userData = {
        correo: credentials.correo,
        token: "fake-jwt-token", // Este sería el token real si estuvieras usando JWT
      };

      // Guardamos el usuario en el contexto y en localStorage
      login(userData);
      navigate("/perfil"); // Redirigir al perfil
    } else {
      setError("Correo o contraseña incorrectos.");
    }
  };

  return (
    <div className="login-container">
      <h2>Iniciar sesión</h2>
      {error && <p className="error-message">{error}</p>} {/* Mostrar error si existe */}
      <form onSubmit={handleSubmit} className="login-form">
        <div className="input-group">
          <label className="text-black">Correo electrónico</label>
          <input
            type="email"
            name="correo"
            value={credentials.correo}
            onChange={handleChange} // Agregamos la función para manejar el cambio
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
            onChange={handleChange} // Agregamos la función para manejar el cambio
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
