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
    image: null,
  });
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false); // Nuevo estado para la animación de carga
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData({ ...productData, [name]: value });
  };

  const handleFileChange = (e) => {
    setProductData({ ...productData, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!productData.title || !productData.description || !productData.image) {
      toast.error("Por favor, completa todos los campos.");
      return;
    }

    setIsLoading(true); // Activar la barra de carga

    const formData = new FormData();
    formData.append("title", productData.title);
    formData.append("description", productData.description);
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
      setIsLoading(false); // Desactivar la barra de carga
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

        {/* Barra de carga */}
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
