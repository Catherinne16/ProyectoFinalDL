import React from "react";
import { Link } from "react-router-dom";
import { useGlobalContext } from "../context/GlobalContext";
import "./cart.css";

const Cart = () => {
  const { cart, setCart } = useGlobalContext();

  const calculateTotal = () => {
    return cart.reduce(
      (total, item) => total + parseFloat(item.price.replace("$", "")) * item.quantity,
      0
    ).toFixed(2);
  };

  const updateQuantity = (id, amount) => {
    setCart(
      cart
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity + amount } : item
        )
        .filter((item) => item.quantity > 0) // Elimina productos con cantidad 0
    );
  };

  const removeFromCart = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  return (
    <div className="cart-container">
      <h2>Tu Carrito</h2>
      {cart.length === 0 ? (
        <p>Tu carrito está vacío</p>
      ) : (
        <div>
          <ul>
            {cart.map((item) => (
              <li key={item.id}>
                <span>{item.name}</span>
                <span>{item.quantity} x {item.price}</span>
                <button onClick={() => updateQuantity(item.id, -1)}>-</button>
                <button onClick={() => updateQuantity(item.id, 1)}>+</button>
                <button onClick={() => removeFromCart(item.id)}>Eliminar</button>
              </li>
            ))}
          </ul>
          <div className="total">
            <p>Total: ${calculateTotal()}</p>
          </div>
          <button className="checkout-btn">Finalizar Compra</button>
        </div>
      )}
      <Link to="/" className="back-home-btn">Volver al Inicio</Link>
    </div>
  );
};

export default Cart;