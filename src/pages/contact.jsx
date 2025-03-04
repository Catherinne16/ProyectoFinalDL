import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./contact.css";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [responseMessage, setResponseMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "message" && value.length > 250) {
      return;
    }

    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(import.meta.env.VITE_API_URL)
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      setResponseMessage(data.message);

      if (response.ok) {
        setFormData({ name: "", email: "", message: "" });
      }
    } catch (error) {
      setResponseMessage("Error al enviar el mensaje.");
    }
  };

  return (
    <div className="contact-container">
      <h2>Contacto</h2>
      <p>¿Tienes preguntas? Contáctanos.</p>
      {responseMessage && <p className="response-message">{responseMessage}</p>}
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
          <label htmlFor="message">Mensaje (máx. 250 caracteres)</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Escribe tu mensaje"
            maxLength={250}
            required
          />
          <small>{formData.message.length}/250 caracteres</small>
        </div>
        <button type="submit" className="submit-btn">
          Enviar
        </button>
      </form>
      <Link to="/" className="back-home-btn">Volver al Inicio</Link>
    </div>
  );
};

export default Contact;
