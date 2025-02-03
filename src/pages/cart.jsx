import React from "react";
import { Link } from "react-router-dom";
import { useGlobalContext } from "../context/GlobalContext";
import "./cart.css";

const Cart = () => {
  const { cart, setCart } = useGlobalContext();

  const calculateTotal = () => {
    return cart.reduce(
      (total, item) => total + parseInt(item.price.replace("$", "").replace(".", "")) * item.quantity,
      0
    );
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
          <table className="cart-table">
            <thead>
              <tr>
                <th>Producto</th>
                <th>Cantidad</th>
                <th>Precio</th>
                <th>Eliminar</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item) => (
                <tr key={item.id}>
                  <td>
                    <img src={item.image} alt={item.name} className="cart-product-image" />
                    {item.name}
                  </td>
                  <td>
                    <button onClick={() => updateQuantity(item.id, -1)}>-</button>
                    {item.quantity}
                    <button onClick={() => updateQuantity(item.id, 1)}>+</button>
                  </td>
                  <td>{item.price}</td>
                  <td>
                    <button onClick={() => removeFromCart(item.id)} className="remove-btn">
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="total">
            <p>Total: ${calculateTotal()}</p>
          </div>
          <button className="checkout-btn">Finalizar Compra</button>
        </div>
      )}
      <div className="back-home-container">
        <Link to="/" className="back-home-btn">Volver al Inicio</Link>
      </div>
    </div>
  );
};

export default Cart;
