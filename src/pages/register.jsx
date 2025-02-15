import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import "./register.css";

const Register = () => {
  // Estado para almacenar los datos del formulario
  const [userData, setUserData] = useState({
    correo: "test@example.com",  // Campo de correo electrónico
    clave: "123456",   // Campo de contraseña
  });

  const [error, setError] = useState(null); // Estado para manejar errores
  const navigate = useNavigate(); // Hook para redireccionar después del registro

  // Maneja los cambios en los inputs y actualiza el estado
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  // Maneja el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault(); // Evita que la página se recargue
    setError(null); // Resetea el estado de error

    // Credenciales de prueba (comentadas para pruebas locales)
    const testCredentials = [
      { correo: "test@example.com", clave: "123456" },
      { correo: "user@example.com", clave: "password123" },
    ];

    // Comprobamos si las credenciales existen (simulando un registro local)
    if (testCredentials.some(user => user.correo === userData.correo && user.clave === userData.clave)) {
      alert("Credenciales de prueba registradas correctamente.");
      navigate("/login"); // Redirige al login después del "registro"
    } else {
      setError("Las credenciales no son válidas o ya están registradas.");
    }

    // Lo siguiente está comentado para evitar hacer la llamada al backend
    // try {
    //   // Enviamos los datos al backend (comentado por el momento)
    //   const response = await fetch("http://localhost:3000/api/register", {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify(userData),
    //   });

    //   const data = await response.json(); // Convertimos la respuesta a JSON

    //   if (response.ok) {
    //     alert("Registro exitoso. Ahora inicia sesión.");
    //     navigate("/login"); // Redirige al usuario al login después del registro
    //   } else {
    //     setError(data.error || "Error al registrarse."); // Muestra un error si el backend responde con un problema
    //   }
    // } catch (error) {
    //   setError("Error en el servidor. Inténtalo más tarde."); // Manejo de errores de conexión
    // }
  };

  return (
    <div className="register-container">
      <h2>Registrarse</h2>

      {/* Muestra mensaje de error si existe */}
      {error && <p className="error-message">{error}</p>}

      <form onSubmit={handleSubmit} className="register-form">
        {/* Campo de correo electrónico */}
        <div className="input-group">
          <label className="text-black">Correo electrónico</label>
          <input
            type="email"
            name="correo"
            value={userData.correo}
            onChange={handleChange}
            required
            className="input-field"
          />
        </div>

        {/* Campo de contraseña */}
        <div className="input-group">
          <label className="text-black">Contraseña</label>
          <input
            type="password"
            name="clave"
            value={userData.clave}
            onChange={handleChange}
            required
            className="input-field"
          />
        </div>

        {/* Botón para enviar el formulario */}
        <button type="submit" className="register-btn">Registrarse</button>
      </form>

      {/* Enlace para ir a la página de login si el usuario ya tiene cuenta */}
      <p className="signup-text text-black">
        ¿Ya tienes cuenta? <Link to="/login" className="signup-link text-black">Inicia sesión</Link>
      </p>

      {/* Botón para volver al inicio */}
      <Link to="/" className="back-home-btn">
        <FaArrowLeft className="icon" /> Volver al Inicio
      </Link>
    </div>
  );
};

export default Register;
