import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useGlobalContext } from "../context/GlobalContext";
import { FaArrowLeft } from "react-icons/fa";
import "./profile.css";

const Profile = () => {
  const { user, favorites, cart, logout } = useGlobalContext(); // Obtenemos el usuario y las acciones desde el contexto
  const [location, setLocation] = useState(null);
  const [currentDateTime, setCurrentDateTime] = useState(new Date().toLocaleString());
  const navigate = useNavigate();

  // Obtener la ubicación del usuario con Geolocation
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        setLocation(`Lat: ${latitude.toFixed(2)}, Lon: ${longitude.toFixed(2)}`);
      });
    } else {
      setLocation("Ubicación no disponible");
    }

    // Actualización de la hora cada minuto
    const interval = setInterval(() => {
      setCurrentDateTime(new Date().toLocaleString());
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  const handleLogout = () => {
    logout(); // Llamamos a la función logout del contexto
    navigate("/login"); // Redirigimos al login después de cerrar sesión
  };

  return (
    <div className="profile-container">
      <h2 className="profile-title">Perfil de Usuario</h2>

      {user ? (
        <div className="profile-info">
          <p><strong>Bienvenido, @{user.username}</strong></p>
          <p><strong>Fecha y Hora:</strong> {currentDateTime}</p>
          <p><strong>Ubicación:</strong> {location}</p>
          <p><strong>Correo:</strong> {user.email}</p>
        </div>
      ) : (
        <p className="no-user">Debes iniciar sesión para ver tu perfil.</p>
      )}

      {user && (
        <div className="profile-actions">
          <Link to="/favorites" className="profile-btn">Ver Favoritos ({favorites.length})</Link>
          <Link to="/cart" className="profile-btn">Ver Carrito ({cart.length})</Link>
          <Link to="/sell" className="profile-btn sell-btn">Subir Artículos</Link>
          <button onClick={handleLogout} className="logout-btn">Cerrar Sesión</button>
        </div>
      )}

      {/* Si el usuario no está logueado, no se muestra el boton de volver */}
      {user && (
        <Link to="/" className="back-home-btn">
          <FaArrowLeft className="icon" /> Volver al Inicio
        </Link>
      )}
    </div>
  );
};

export default Profile;
