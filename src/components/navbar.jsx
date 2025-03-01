import { useState } from "react";
import { Link } from "react-router-dom";
import { FaSearch, FaUser, FaShoppingCart } from "react-icons/fa";
import { useGlobalContext } from "../context/GlobalContext";
import "./navbar.css";
import logo from "../assets/images/logonavbar.png";

const Navbar = () => {
  const [menuActive, setMenuActive] = useState(false);
  const { user, cart } = useGlobalContext();

  const toggleMenu = () => {
    setMenuActive(!menuActive);
  };

  return (
    <nav className="navbar">
      <div className="navbar-content">
        {/* Contenedor logo y menu hamburguesa */}
        <div className="logo-menu-container">
          <Link to="/">
            <img src={logo} alt="Logo" className="navbar-logo" />
          </Link>
          <div className="menu-toggle" onClick={toggleMenu}>
            <div className="bar"></div>
            <div className="bar"></div>
            <div className="bar"></div>
          </div>
        </div>

        {/* Menú principal */}
        <div className={`menu ${menuActive ? "active" : ""}`}>
          <ul>
            <li><Link to="/">Inicio</Link></li>
            <li><Link to="/contact">Contacto</Link></li>
            {user && (
              <>
                <li><Link to="/profile">Perfil</Link></li>
                <li><Link to="/sell">Vender</Link></li>
              </>
            )}
          </ul>
        </div>

        {/* Barra de búsqueda */}
        <div className="search-bar">
          <input type="text" placeholder="Buscar..." />
          <FaSearch className="icon" />
        </div>

        {/* Iconos de perfil y carrito */}
        <div className="profile-icons">
          {user ? (
            <>
              <Link to="/profile">
                <FaUser className="icon" />
              </Link>
              <Link to="/cart">
                <FaShoppingCart className="icon" />
                {cart.length > 0 && <span className="cart-badge">{cart.length}</span>}
              </Link>
            </>
          ) : (
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
