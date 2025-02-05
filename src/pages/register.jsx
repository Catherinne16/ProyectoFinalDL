import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa"; 
import "./register.css";

const Register = () => {
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("User registered:", userData);
  };

  return (
    <div className="register-container">
      <h2>Registrarse</h2>
      <form onSubmit={handleSubmit} className="register-form">
        <div className="input-group">
          <label className="text-black">Nombre de usuario</label>
          <input
            type="text"
            name="username"
            value={userData.username}
            onChange={handleChange}
            required
            className="input-field"
          />
        </div>
        <div className="input-group">
          <label className="text-black">Correo electrónico</label>
          <input
            type="email"
            name="email"
            value={userData.email}
            onChange={handleChange}
            required
            className="input-field"
          />
        </div>
        <div className="input-group">
          <label className="text-black">Contraseña</label>
          <input
            type="password"
            name="password"
            value={userData.password}
            onChange={handleChange}
            required
            className="input-field"
          />
        </div>
        <button type="submit" className="register-btn">Registrarse</button>
      </form>
      <p className="signup-text text-black">
        ¿Ya tienes cuenta? <Link to="/login" className="signup-link text-black">Inicia sesión</Link>
      </p>
      <Link to="/" className="back-home-btn">
        <FaArrowLeft className="icon" /> Volver al Inicio
      </Link>
    </div>
  );
};

export default Register;
