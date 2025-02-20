import React, { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useGlobalContext } from "../context/GlobalContext"; // Importa el contexto global
import "./Sell.css";

const Sell = () => {
  const [productData, setProductData] = useState({
    title: "",
    description: "",
    price: "",
    image: null,
  });
  const [isLoading, setIsLoading] = useState(false);
  const { addProduct, user } = useGlobalContext(); // Accede al usuario desde el contexto global
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
    let formattedValue = value.replace(/[^\d]/g, "");
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
    if (!productData.title || !productData.description || !productData.price || !productData.image) {
      toast.error("Por favor, completa todos los campos.");
      return;
    }

    if (!user) {
      toast.error("Debes estar autenticado para vender un producto.");
      return;
    }

    setIsLoading(true);
    try {
      // Incluye el correo del usuario automáticamente en los datos del producto
      const productWithUserEmail = { ...productData, correo: user.correo };
      await addProduct(productWithUserEmail); // Aquí se enviará el correo del usuario junto con los datos del producto
      toast.success("Producto subido exitosamente");
      navigate("/products");
    } catch (error) {
      toast.error(error.message || "Error al subir el producto");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="sell-container">
      <h2>Vende tu Producto</h2>
      <form onSubmit={handleSubmit} className="sell-form" encType="multipart/form-data">
        <div className="input-group">
          <label htmlFor="title">Título</label>
          <input type="text" id="title" name="title" value={productData.title} onChange={handleChange} required />
        </div>
        <div className="input-group">
          <label htmlFor="description">Descripción</label>
          <textarea id="description" name="description" value={productData.description} onChange={handleChange} required />
        </div>
        <div className="input-group">
          <label htmlFor="price">Precio</label>
          <input type="text" id="price" name="price" value={productData.price} onChange={handleChange} required />
        </div>
        <div className="input-group">
          <label htmlFor="image">Imagen del Producto</label>
          <input type="file" id="image" name="image" accept="image/*" onChange={handleFileChange} required />
        </div>

        {isLoading && <p>Subiendo producto...</p>}

        <button type="submit" disabled={isLoading}>
          {isLoading ? "Cargando..." : "Subir Producto"}
        </button>
      </form>
      <Link to="/">
        <FaArrowLeft /> Volver al Inicio
      </Link>
    </div>
  );
};

export default Sell;