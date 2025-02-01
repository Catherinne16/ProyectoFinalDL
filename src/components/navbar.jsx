// src/components/Navbar.jsx
import { Link } from "react-router-dom";  // Asegúrate de que estás importando Link
import { FaSearch, FaUser, FaHeart, FaShoppingCart } from "react-icons/fa";
import "./navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="menu">
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
        {/* Aquí envolvemos el icono de usuario con el Link */}
        <Link to="/login">
            <FaUser className="icon" />
        </Link>
        {/* Aquí se cerró correctamente el Link para el carrito */}
        <Link to="/cart">
            <FaShoppingCart className="icon" />
        </Link>
    </div>

    </nav>
  );
};


export default Navbar;
