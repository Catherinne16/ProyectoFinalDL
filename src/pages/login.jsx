import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useGlobalContext } from "../context/GlobalContext.jsx";
import { FaArrowLeft } from "react-icons/fa";
import "./login.css";

const Login = () => {
  const [credentials, setCredentials] = useState({ correo: "", clave: "" });
  const [error, setError] = useState(null);
  const { user, login } = useGlobalContext();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); 

    try {
      await login(credentials); // Usamos la función login del GlobalContext
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    if (user) {
      navigate("/profile");
    }
  }, [user, navigate]);

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