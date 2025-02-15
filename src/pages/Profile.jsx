import React from "react";
import { Link } from "react-router-dom";
import { useGlobalContext } from "../context/GlobalContext";
import "./profile.css";

const Profile = () => {
  const { user, favorites, cart } = useGlobalContext();

  return (
    <div className="profile-container">
      <h2 className="profile-title">Perfil de Usuario</h2>

      {user ? (
        <div className="profile-info">
          <p><strong>Nombre:</strong> {user.username}</p>
          <p><strong>Correo:</strong> {user.email}</p>
        </div>
      ) : (
        <p className="no-user">Debes iniciar sesión para ver tu perfil.</p>
      )}

      <div className="profile-actions">
        <Link to="/favorites" className="profile-btn">Ver Favoritos ({favorites.length})</Link>
        <Link to="/cart" className="profile-btn">Ver Carrito ({cart.length})</Link>
        <Link to="/sell" className="profile-btn sell-btn">Subir Artículos</Link>
      </div>
    </div>
  );
};

export default Profile;
