import React from "react";
import { FaHeart } from "react-icons/fa";
import { useGlobalContext } from "../context/GlobalContext";
import { useLocation } from "react-router-dom"; // Se importa useLocation
import "./productcard.css";

const ProductCard = ({ product, onAddToCart }) => {
  const { cart, setCart, favorites, setFavorites } = useGlobalContext();
  const location = useLocation(); // Obtenemos la ruta actual

  const isFavorite = favorites.some((fav) => fav.id === product.id);

  const toggleFavorite = () => {
    if (isFavorite) {
      setFavorites(favorites.filter((fav) => fav.id !== product.id));
    } else {
      setFavorites([...favorites, product]);
    }
  };

  const handleAddToCart = () => {
    const existingProduct = cart.find((item) => item.id === product.id);
    if (existingProduct) {
      setCart(
        cart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      );
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  return (
    <div className={`product-card`}>
      <div className="product-image">
        <img src={product.imagen_url} alt={product.name} />
      </div>
      <div className="product-info">
        <h3>{product.nombre}</h3>
        <p>{product.descripcion}</p>
        <div className="price">
          <span className="discount-price">{product.precio}</span>
        </div>
        <button className="cart-btn" onClick={handleAddToCart}>
          Agregar al carrito
        </button>
      </div>
      <div className="favorite-btn" onClick={toggleFavorite}>
        <FaHeart color={isFavorite ? "#F6378F" : "#ccc"} size={24} />
      </div>
    </div>
  );
};

export default ProductCard;
