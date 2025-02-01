// src/pages/Favorites.jsx
import React from "react";
import { Link } from "react-router-dom";  // Asegúrate de tener el enlace para volver al home
import { FaArrowLeft } from "react-icons/fa";  // Usamos un icono de flecha para el botón
import "./favorites.css"; 

const Favorites = () => {
  return (
    <div className="favorites-container">
      <h2 className="favorites-title">Favoritos</h2>
      {/* Mostrar los productos favoritos aquí */}
      <div className="favorites-grid">
        {/* Aquí agregarás las tarjetas de productos favoritos */}
      </div>
      <Link to="/" className="back-home-btn">
        <FaArrowLeft className="icon" /> Volver al Inicio
      </Link>
    </div>
  );
};

export default Favorites;
