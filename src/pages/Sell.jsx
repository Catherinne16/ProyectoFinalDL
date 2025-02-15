import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import "./sell.css";

const Sell = () => {
  // Estado para los datos del producto y errores
  const [productData, setProductData] = useState({
    title: "",
    description: "",
    image: null,
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Actualiza los campos de texto
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData({ ...productData, [name]: value });
  };

  // Guarda el archivo seleccionado
  const handleFileChange = (e) => {
    setProductData({ ...productData, image: e.target.files[0] });
  };

  // Envía el formulario usando FormData para incluir el archivo
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!productData.image) {
      setError("¡Sube una imagen, porfa!");
      return;
    }

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
        alert("Producto subido exitosamente");
        navigate("/products");
      } else {
        const data = await response.json();
        setError(data.error || "Error al subir el producto");
      }
    } catch (error) {
      setError("Error en el servidor");
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
        <button type="submit" className="submit-btn">
          Subir Producto
        </button>
      </form>
      <button onClick={() => navigate(-1)} className="back-btn">
        <FaArrowLeft /> Volver
      </button>
    </div>
  );
};

export default Sell;
