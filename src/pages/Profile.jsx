import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // Usamos el contexto de autenticación
import { FaArrowLeft, FaMapPin } from "react-icons/fa";
import "./Profile.css";

const Profile = () => {
  const { user, logout } = useAuth();
  const [location, setLocation] = useState("Ubicación no disponible");
  const [currentDateTime, setCurrentDateTime] = useState(new Date().toLocaleString());
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login"); // Redirige al login si no hay usuario
      return;
    }

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const apiKey = import.meta.env.VITE_OPENCAGE_API_KEY; // Usar variable de entorno

          fetch(`https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${apiKey}`)
            .then((res) => res.json())
            .then((data) => {
              const city = data.results[0]?.components.city || data.results[0]?.components.town || "Desconocido";
              const country = data.results[0]?.components.country || "Desconocido";
              setLocation(`${city}, ${country}`);
            })
            .catch(() => setLocation("Ubicación no disponible"));
        },
        () => setLocation("Ubicación no disponible")
      );
    }

    const interval = setInterval(() => {
      setCurrentDateTime(new Date().toLocaleString());
    }, 60000);

    return () => clearInterval(interval);
  }, [user, navigate]);

  const handleLogout = () => {
    logout();
    navigate("/"); // Redirigir a la página de inicio después de cerrar sesión
  };

  if (!user) {
    return null; // Si no hay usuario, no renderiza el perfil
  }

  return (
    <div className="profile-container">
      <h2 className="profile-title">Perfil de Usuario</h2>
      <div className="profile-info">
        <p><strong>Bienvenido, @{user.correo}</strong></p>
        <p><strong>Fecha y Hora:</strong> {currentDateTime}</p>
        <div className="location-info">
          <FaMapPin className="location-icon" /> <strong>Ubicación:</strong> {location}
        </div>
        <p><strong>Correo:</strong> {user.correo}</p>
      </div>

      <div className="profile-actions">
        <button onClick={handleLogout} className="logout-btn">Cerrar Sesión</button>
      </div>

      <Link to="/" className="back-home-btn">
        <FaArrowLeft className="icon" /> Volver al Inicio
      </Link>
    </div>
  );
};

export default Profile;