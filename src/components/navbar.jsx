// src/components/Navbar.jsx
import { useState } from "react";
import { Link } from "react-router-dom";
import { FaSearch, FaUser, FaShoppingCart } from "react-icons/fa";
import "./navbar.css";
import logo from "../assets/images/logonavbar.png";

const Navbar = () => {
  const [menuActive, setMenuActive] = useState(false);

  const toggleMenu = () => {
    setMenuActive(!menuActive);
  };

  return (
    <nav className="navbar">
      <div className="navbar-content">
        {/* Logo */}
        <Link to="/">
          <img src={logo} alt="Logo" className="navbar-logo" />
        </Link>

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
            <li><Link to="/Profile">Perfil</Link></li>
            <li><Link to="/Sell">Venta</Link></li>
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