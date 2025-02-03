// src/components/Navbar.jsx
import { useState } from "react"; // Asegúrate de importar useState
import { Link } from "react-router-dom"; 
import { FaSearch, FaUser, FaHeart, FaShoppingCart } from "react-icons/fa";
import "./navbar.css";

const Navbar = () => {
  // Estado para controlar la visibilidad del menú en dispositivos móviles
  const [menuActive, setMenuActive] = useState(false);

  // Función para alternar el estado del menú
  const toggleMenu = () => {
    setMenuActive(!menuActive);
  };

  return (
    <nav className="navbar">
      <div className="navbar-content">
        <div className="menu-toggle" onClick={toggleMenu}>
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
        </div>
        <div className={`menu ${menuActive ? "active" : ""}`}>
          <ul>
            <li><Link to="/">Inicio</Link></li>
            <li><Link to="/favorites">Favoritos</Link></li>
            <li><Link to="/offers">Ofertas</Link></li>
            <li><Link to="/contact">Contacto</Link></li>
          </ul>
        </div>
        <div className="search-bar">
          <input type="text" placeholder="Buscar..." />
          <FaSearch className="icon" />
        </div>
        <div className="profile-icons">
          <Link to="/login">
            <FaUser className="icon" />
          </Link>
          <Link to="/cart">
            <FaShoppingCart className="icon" />
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;