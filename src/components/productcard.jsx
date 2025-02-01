import React, { useState } from "react";
import { FaHeart } from "react-icons/fa";
import { useGlobalContext } from "../context/GlobalContext"; // Importar el contexto
import "./productCard.css";

const ProductCard = ({ product }) => {
  const { cart, setCart } = useGlobalContext(); // Acceder al carrito global
  const [isFavorite, setIsFavorite] = useState(false);

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
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
        <FaHeart color={isFavorite ? "#e221b2" : "#ccc"} size={24} />
      </div>
    </div>
  );
};

export default ProductCard;