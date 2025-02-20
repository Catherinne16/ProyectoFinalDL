import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../context/GlobalContext";
import { FaArrowLeft, FaMapPin } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./Profile.css";

const Profile = () => {
  const { user, logout } = useGlobalContext();
  const [location, setLocation] = useState("Ubicación no disponible");
  const [currentDateTime, setCurrentDateTime] = useState(new Date().toLocaleString());
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const apiKey = import.meta.env.VITE_OPENCAGE_API_KEY;

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
    navigate("/");
  };

  if (!user) {
    return null;
  }

  return (
    <div className="profile-container">
      <h2 className="profile-title">Perfil de Usuario</h2>
      <div className="profile-info">
        <p><strong>Bienvenido, {user.correo}</strong></p>
        <p><strong>Fecha y Hora:</strong> {currentDateTime}</p>
        <div className="location-info">
          <FaMapPin className="location-icon" /> <strong>Ubicación:</strong> {location}
        </div>
      </div>
      <Link to="/sellproducts" className="sell-products-button">
        Productos en venta
      </Link>
      <div>
        <button onClick={handleLogout} className="logout-btn">Cerrar Sesión</button>
      </div>
      <Link to="/" className="back-home-btn">
        <FaArrowLeft className="icon" /> Volver al Inicio
      </Link>
    </div>
  );
};

export default Profile;