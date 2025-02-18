import React, { useState } from "react";
import { Link } from "react-router-dom";  // Asegúrate de importar Link
import "./contact.css";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    console.log("Formulario enviado", formData);
  };

  return (
    <div className="contact-container">
      <h2>Contacto</h2>
      <p>¿Tienes preguntas? Contáctanos.</p>
      <form className="contact-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Nombre</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Ingresa tu nombre"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Correo Electrónico</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Ingresa tu correo electrónico"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="message">Mensaje</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Escribe tu mensaje"
            required
          />
        </div>
        <button type="submit" className="submit-btn">
          Enviar
        </button>
      </form>
      {/* Botón para volver al inicio */}
      <Link to="/" className="back-home-btn">Volver al Inicio</Link>
    </div>
  );
};

export default Contact;


