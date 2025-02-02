import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

const Login = () => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí iría la lógica para la autenticación
    console.log("Usuario autenticado:", credentials);
  };

  return (
    <div className="login-container">
      <Link to="/" className="back-home-btn">
        <FaArrowLeft className="icon" /> Volver al Inicio
      </Link>
      <h2>Iniciar sesión</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Correo electrónico</label>
          <input
            type="email"
            name="email"
            value={credentials.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Contraseña</label>
          <input
            type="password"
            name="password"
            value={credentials.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="login-btn">Iniciar sesión</button>
      </form>
      <p>
        ¿No tienes cuenta? <Link to="/register" className="signup-link">Regístrate aquí</Link>
      </p>
    </div>
  );
};

export default Login;
