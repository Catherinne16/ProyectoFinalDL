import { useState } from "react";
import { Link } from "react-router-dom";
import { FaSearch, FaUser, FaShoppingCart } from "react-icons/fa";
import { useGlobalContext } from "../context/GlobalContext"; // Usamos GlobalContext para obtener el carrito y el usuario
import "./navbar.css";
import logo from "../assets/images/logonavbar.png";

const Navbar = () => {
  const [menuActive, setMenuActive] = useState(false);
  // Obtenemos el usuario y la cantidad de items del carrito desde GlobalContext
  const { user, cartItems } = useGlobalContext();

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
            {/* Enlaces públicos */}
            <li><Link to="/">Inicio</Link></li>
            <li><Link to="/offers">Ofertas</Link></li>
            <li><Link to="/contact">Contacto</Link></li>

            {/* Enlaces privados (solo si el usuario está logueado) */}
            {user && (
              <>
                <li><Link to="/profile">Perfil</Link></li>
                <li><Link to="/sell">Vender</Link></li>
              </>
            )}
          </ul>
        </div>

        <div className="search-bar">
          <input type="text" placeholder="Buscar..." />
          <FaSearch className="icon" />
        </div>

        <div className="profile-icons">
          {/* Si el usuario está logueado, se muestran el icono de perfil y el de carrito */}
          {user ? (
            <>
              <Link to="/profile">
                <FaUser className="icon" />
              </Link>
              <Link to="/cart">
                <FaShoppingCart className="icon" />
                {cartItems > 0 && (
                  <span className="cart-badge">{cartItems}</span>
                )}
              </Link>
            </>
          ) : (
            // Si no está logueado, se muestra el icono de login
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