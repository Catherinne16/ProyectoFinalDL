// src/components/ProductCard.jsx
import React, { useState } from "react";
import { FaHeart } from "react-icons/fa"; // Icono de corazón
import "./productCard.css";

const ProductCard = ({ product }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [inCart, setInCart] = useState(false); // Estado para saber si el producto está en el carrito

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);  // Cambia el estado de favorito al hacer clic
  };

  const handleAddToCart = () => {
    setInCart(!inCart);  // Alterna si el producto está en el carrito
    alert(`${product.name} ${inCart ? "eliminado del carrito" : "agregado al carrito"}`); // Muestra un mensaje para probar la funcionalidad
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
          {inCart ? "Eliminar del carrito" : "Agregar al carrito"}
        </button>
      </div>

      {/* Botón de agregar a favoritos */}
      <div className="favorite-btn" onClick={toggleFavorite}>
        <FaHeart 
          color={isFavorite ? "#e221b2" : "#ccc"}  // Cambia de color si es favorito o no
          size={24}  // Tamaño del icono
        />
      </div>
    </div>
  );
};

export default ProductCard;
