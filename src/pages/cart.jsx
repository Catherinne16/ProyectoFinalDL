import React from "react";
import { toast, ToastContainer } from "react-toastify";
import { Link } from "react-router-dom";
import { useGlobalContext } from "../context/GlobalContext";
import "./cart.css";

const Cart = () => {
  const { cart, setCart } = useGlobalContext();

  // Calcula el total del carrito, usando el precio con descuento si está disponible
  const calculateTotal = () => {
    return cart.reduce((total, item) => {
      const price = item.discount
        ? parseInt(item.discount.replace("$", "").replace(".", ""))
        : parseInt(item.price.replace("$", "").replace(".", ""));
      return total + price * item.quantity;
    }, 0);
  };

  // Función para actualizar la cantidad de un producto en el carrito
  const updateQuantity = (id, amount) => {
    setCart(
      cart
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity + amount } : item
        )
        .filter((item) => item.quantity > 0) // Elimina productos con cantidad 0
    );
    toast.info("Cantidad actualizada", {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 2000,
    });
  };


  // Función para eliminar un producto del carrito
  const removeFromCart = (id) => {
    setCart(cart.filter((item) => item.id !== id));
    toast.error("Producto eliminado del carrito", {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 2000,
    });
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
                  <td>
                    {item.discount ? (
                      <div className="price-container">
                        <span className="original-price">{item.price}</span>
                        <span className="discount-price">{item.discount}</span>
                      </div>
                    ) : (
                      <span className="normal-price">{item.price}</span>
                    )}
                  </td>
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
      <ToastContainer /> {/* Asegúrate de que ToastContainer esté presente para mostrar las notificaciones */}
    </div>
  );
};

export default Cart;
