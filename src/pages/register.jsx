import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa"; // Asegúrate de importar el icono

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
    // Aquí puedes agregar la lógica de envío de datos, como una llamada a la API
    console.log("User registered:", userData);
  };

  return (
    <div className="register-container">
      <h2>Registrarse</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Nombre de usuario</label>
          <input
            type="text"
            name="username"
            value={userData.username}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Correo electrónico</label>
          <input
            type="email"
            name="email"
            value={userData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Contraseña</label>
          <input
            type="password"
            name="password"
            value={userData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Registrarse</button>
      </form>
      <p>
        ¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link>
      </p>
      <Link to="/" className="back-home-btn">
        <FaArrowLeft className="icon" /> Volver al Inicio
      </Link>
    </div>
  );
};

export default Register;
