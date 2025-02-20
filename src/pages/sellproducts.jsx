import React, { useEffect } from "react";
import "./sellproducts.css";
import { useGlobalContext } from "../context/GlobalContext";
import { FaArrowLeft } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

const SellProducts = () => {
  const { products, fetchProducts, deleteProduct, user } = useGlobalContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      // Si el usuario no está autenticado, redirige al inicio
      navigate("/login");
    } else {
      fetchProducts();
    }
  }, [fetchProducts, user, navigate]);

  return (
    <div className="sell-products-container">
      <h2>Mis Productos en Venta</h2>
      <div className="products-grid">
        {products.length > 0 ? (
          products.map((product) => (
            <div key={product.id} className="product-card">
              <img src={product.imagen_url} alt={product.nombre} />
              <h3>{product.nombre}</h3>
              <p>{product.descripcion}</p>
              <span>Precio: ${product.precio}</span>
              <button
                className="delete-btn"
                onClick={() => deleteProduct(product.id)}
              >
                Eliminar
              </button>
            </div>
          ))
        ) : (
          <p>No hay productos disponibles.</p>
        )}
      </div>
      <Link to="/profile" className="back-home-btn">
        <FaArrowLeft className="icon" /> Volver a Perfil
      </Link>
    </div>
  );
};

export default SellProducts;