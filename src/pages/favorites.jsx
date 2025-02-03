import React from "react";
import { Link } from "react-router-dom";
import { FaArrowLeft, FaTrash } from "react-icons/fa";
import { useGlobalContext } from "../context/GlobalContext"; // Importamos el contexto
import "./favorites.css";

const Favorites = () => {
  const { favorites, setFavorites } = useGlobalContext();

  const removeFromFavorites = (id) => {
    setFavorites(favorites.filter((product) => product.id !== id));
  };

  return (
    <div className="favorites-container">
      <h2 className="favorites-title">Favoritos</h2>
      
      {favorites.length === 0 ? (
        <p className="empty-message">No tienes productos en favoritos.</p>
      ) : (
        <div className="favorites-grid">
          {favorites.map((product) => (
            <div key={product.id} className="favorite-card">
              <img src={product.image} alt={product.name} className="favorite-image" />
              <h3>{product.name}</h3>
              <p>{product.brand}</p>
              <button className="remove-fav-btn" onClick={() => removeFromFavorites(product.id)}>
                <FaTrash /> Eliminar
              </button>
            </div>
          ))}
        </div>
      )}

      <Link to="/" className="back-home-btn">
        <FaArrowLeft className="icon" /> Volver al Inicio
      </Link>
    </div>
  );
};

export default Favorites;