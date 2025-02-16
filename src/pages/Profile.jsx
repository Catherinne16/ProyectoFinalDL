import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useGlobalContext } from "../context/GlobalContext";
import { FaArrowLeft } from "react-icons/fa";
import { FaMapPin } from "react-icons/fa";  // Icono de ubicación
import "./profile.css";

const Profile = () => {
  const { user, cart, logout } = useGlobalContext();
  const [location, setLocation] = useState(null);  // Estado para almacenar la ubicación
  const [currentDateTime, setCurrentDateTime] = useState(new Date().toLocaleString());  // Estado para la fecha y hora actual
  const navigate = useNavigate();

  // useEffect para obtener la ubicación del usuario y actualizar la fecha/hora
  useEffect(() => {
    // Verificamos si el navegador soporta geolocalización
    if (navigator.geolocation) {
      // Obtenemos la ubicación del usuario
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;

        // Si estás implementando backend o deseas obtener la ciudad y país:
        // Usamos una API de geolocalización inversa como OpenCage
        const apiKey = "TU_API_KEY_DE_OPENCAGE"; // Asegúrate de tener tu propia clave de API
        fetch(`https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${apiKey}`)
          .then((response) => response.json())
          .then((data) => {
            // Extraemos ciudad y país de la respuesta de la API
            const city = data.results[0]?.components.city || data.results[0]?.components.town;
            const country = data.results[0]?.components.country;
            setLocation(`${city}, ${country}`);  // Establecemos la ubicación en el estado
          })
          .catch((error) => {
            console.error("Error en la geolocalización:", error);
            setLocation("Ubicación no disponible");  // Si ocurre un error, mostramos mensaje por defecto
          });
      });
    } else {
      // Si la geolocalización no está soportada
      setLocation("Ubicación no disponible");
    }

    // Actualizamos la hora cada minuto
    const interval = setInterval(() => {
      setCurrentDateTime(new Date().toLocaleString());
    }, 60000);

    // Limpiamos el intervalo al desmontar el componente
    return () => clearInterval(interval);
  }, []);

  // Función para manejar el cierre de sesión
  const handleLogout = () => {
    logout();           // Llamamos a la función de logout para cerrar la sesión
    navigate("/");      // Redirigimos al home después de cerrar sesión
  };

  return (
    <div className="profile-container">
      <h2 className="profile-title">Perfil de Usuario</h2>

      {user ? (
        <div className="profile-info">
          <p><strong>Bienvenido, @{user.username}</strong></p>
          <p><strong>Fecha y Hora:</strong> {currentDateTime}</p>
          
          {/* Mostrar la ubicación con un icono */}
          <div className="location-info">
            <FaMapPin className="location-icon" /> 
            <strong>Ubicación:</strong> {location}
          </div>

          <p><strong>Correo:</strong> {user.email}</p>
        </div>
      ) : (
        <p className="no-user">Debes iniciar sesión para ver tu perfil.</p>
      )}

      {user && (
        <div className="profile-actions">
          {/* Botón para ver el carrito de compras */}
          <Link to="/cart" className="profile-btn">Ver Carrito ({cart.length})</Link>
          
          {/* Botón para subir artículos */}
          <Link to="/sell" className="profile-btn sell-btn">Subir Artículos</Link>
          
          {/* Botón para cerrar sesión */}
          <button onClick={handleLogout} className="logout-btn">Cerrar Sesión</button>
        </div>
      )}

      {user && (
        <Link to="/" className="back-home-btn">
          <FaArrowLeft className="icon" /> Volver al Inicio
        </Link>
      )}
    </div>
  );
};

export default Profile;
