// src/components/Cart.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";  // Importa Link
import "./cart.css";  // Añadir archivo CSS para el cart

const Cart = () => {
  const [cartItems, setCartItems] = useState([
    // Datos de ejemplo para los productos en el carrito
    { id: 1, name: "Ramen Picante", price: "$3.990", quantity: 2 },
    { id: 2, name: "Té Matcha", price: "$7.490", quantity: 1 },
    // Puedes agregar más productos de ejemplo
  ]);

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + parseFloat(item.price.replace("$", "")) * item.quantity, 0);
  };

  return (
    <div className="cart-container">
      <h2>Tu Carrito</h2>
      {cartItems.length === 0 ? (
        <p>Tu carrito está vacío</p>
      ) : (
        <div>
          <ul>
            {cartItems.map((item) => (
              <li key={item.id}>
                <span>{item.name}</span>
                <span>{item.quantity} x {item.price}</span>
              </li>
            ))}
          </ul>
          <div className="total">
            <p>Total: ${calculateTotal()}</p>
          </div>
          <button className="checkout-btn">Finalizar Compra</button>
        </div>
      )}
      {/* Botón para volver al inicio */}
      <Link to="/" className="back-home-btn">Volver al Inicio</Link>
    </div>
  );
};

export default Cart;
