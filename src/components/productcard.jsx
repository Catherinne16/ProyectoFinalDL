import React from "react";
import { FaHeart } from "react-icons/fa";
import { useGlobalContext } from "../context/GlobalContext"; // Importar el contexto
import "./productCard.css";

const ProductCard = ({ product }) => {
  const { cart, setCart, favorites, setFavorites } = useGlobalContext(); // Acceder al carrito y favoritos

  // Verificar si el producto está en favoritos
  const isFavorite = favorites.some((fav) => fav.id === product.id);

  const toggleFavorite = () => {
    if (isFavorite) {
      // Si ya está en favoritos, lo eliminamos
      setFavorites(favorites.filter((fav) => fav.id !== product.id));
    } else {
      // Si no está en favoritos, lo agregamos
      setFavorites([...favorites, product]);
    }
  };

  const handleAddToCart = () => {
    const existingProduct = cart.find((item) => item.id === product.id);
    if (existingProduct) {
      // Si el producto ya está en el carrito, aumenta su cantidad
      setCart(
        cart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      );
    } else {
      // Si no está en el carrito, agrégalo con cantidad 1
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  return (
    <div className="product-card">
      <div className="product-image">
        <img src={product.image} alt={product.name} />
      </div>
      <div className="product-info">
        <h3>{product.name}</h3>
        <p>{product.brand}</p>
        <div className="price">
          <span className="old-price">{product.price}</span>
          <span className="discount-price">{product.discount}</span>
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