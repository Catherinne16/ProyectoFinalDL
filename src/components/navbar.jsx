import { useState } from "react";
import { Link } from "react-router-dom";
import { FaSearch, FaUser, FaShoppingCart } from "react-icons/fa";
import { useAuth } from "../context/AuthContext"; // Usamos el contexto de autenticación
import { useGlobalContext } from "../context/GlobalContext"; // Usamos el contexto del carrito
import "./navbar.css";
import logo from "../assets/images/logonavbar.png";

const Navbar = () => {
  const [menuActive, setMenuActive] = useState(false);
  const { user } = useAuth(); // Obtenemos el usuario desde AuthContext
  const { cartItems } = useGlobalContext(); // Obtenemos la cantidad de productos en el carrito desde GlobalContext

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
            <li><Link to="/offers">Ofertas</Link></li>
            <li><Link to="/contact">Contacto</Link></li>

            {/* Mostrar enlaces solo si el usuario está logueado */}
            {user && (
              <>
                <li><Link to="/favorites">Favoritos</Link></li>
                <li><Link to="/profile">Perfil</Link></li>
                <li><Link to="/sell">Venta</Link></li>
              </>
            )}
          </ul>
        </div>

        <div className="search-bar">
          <input type="text" placeholder="Buscar..." />
          <FaSearch className="icon" />
        </div>

        <div className="profile-icons">
          {/* Si el usuario está logueado, mostrar íconos de carrito y perfil */}
          {user ? (
            <>
              <Link to="/profile">
                <FaUser className="icon" />
              </Link>
              <Link to="/cart">
                <FaShoppingCart className="icon">
                  {cartItems > 0 && (
                    <span className="cart-badge">{cartItems}</span> // Mostramos el badge con el número de productos
                  )}
                </FaShoppingCart>
              </Link>
            </>
          ) : (
            // Si no está logueado, mostrar solo el icono de login
            <Link to="/login">
              <FaUser className="icon" />
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
