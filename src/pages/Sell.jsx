import React, { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";  
import "./sell.css";

const Sell = () => {
  const [productData, setProductData] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    image: null,
  });
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "price") {
      const formattedPrice = formatPrice(value);
      setProductData({ ...productData, [name]: formattedPrice });
    } else {
      setProductData({ ...productData, [name]: value });
    }
  };

  const formatPrice = (value) => {
    // Remueve todo lo que no sea un número
    let formattedValue = value.replace(/[^\d]/g, "");
    // Agrega los separadores de miles con punto
    if (formattedValue.length > 3) {
      formattedValue = formattedValue.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
    }
    return formattedValue;
  };

  const handleFileChange = (e) => {
    setProductData({ ...productData, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!productData.title || !productData.description || !productData.price || !productData.category || !productData.image) {
      toast.error("Por favor, completa todos los campos.");
      return;
    }

    setIsLoading(true);

    const formData = new FormData();
    formData.append("title", productData.title);
    formData.append("description", productData.description);
    formData.append("price", productData.price.replace(/\./g, "")); // Elimina los puntos antes de enviarlo
    formData.append("category", productData.category);
    formData.append("image", productData.image);

    try {
      const response = await fetch("http://localhost:3000/api/products", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        toast.success("Producto subido exitosamente");
        navigate("/products");
      } else {
        const data = await response.json();
        setError(data.error || "Error al subir el producto");
        toast.error(data.error || "Error al subir el producto");
      }
    } catch (error) {
      setError("Error en el servidor");
      toast.error("Error en el servidor");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="sell-container">
      <h2>Vende tu Producto</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit} className="sell-form" encType="multipart/form-data">
        <div className="input-group">
          <label>Título</label>
          <input
            type="text"
            name="title"
            value={productData.title}
            onChange={handleChange}
            required
            className="input-field"
          />
        </div>
        <div className="input-group">
          <label>Descripción</label>
          <textarea
            name="description"
            value={productData.description}
            onChange={handleChange}
            required
            className="input-field"
          />
        </div>
        <div className="input-group">
          <label>Precio</label>
          <input
            type="text"
            name="price"
            value={productData.price}
            onChange={handleChange}
            required
            className="input-field"
            onBlur={(e) => setProductData({ ...productData, price: formatPrice(e.target.value) })} // Limpia el formato al salir del campo
          />
        </div>
        <div className="input-group">
          <label>Imagen del Producto</label>
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleFileChange}
            required
            className="input-field"
          />
        </div>

        {isLoading && (
          <div className="loading-bar">
            <div className="progress"></div>
          </div>
        )}

        <button type="submit" className="submit-btn" disabled={isLoading}>
          {isLoading ? "Cargando..." : "Subir Producto"}
        </button>
      </form>
      <Link to="/" className="back-home-btn">
        <FaArrowLeft className="icon" /> Volver al Inicio
      </Link>
    </div>
  );
};

export default Sell;