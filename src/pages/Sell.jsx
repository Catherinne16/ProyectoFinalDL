import React, { useState } from "react";
import { useGlobalContext } from "../context/GlobalContext";
import "./sell.css";

const Sell = () => {
  const { addProduct } = useGlobalContext();
  const [product, setProduct] = useState({
    name: "",
    price: "",
    category: "",
    description: "",
    image: "",
  });

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!product.name || !product.price || !product.image) {
      alert("Por favor, completa los campos obligatorios.");
      return;
    }
    addProduct(product);
    alert("Producto agregado con éxito");
    setProduct({ name: "", price: "", category: "", description: "", image: "" });
  };

  return (
    <div className="sell-container">
      <h2 className="sell-title">Subir un Nuevo Producto</h2>
      <form className="sell-form" onSubmit={handleSubmit}>
        <label>Nombre del Producto:</label>
        <input type="text" name="name" value={product.name} onChange={handleChange} required />

        <label>Precio:</label>
        <input type="number" name="price" value={product.price} onChange={handleChange} required />

        <label>Categoría:</label>
        <select name="category" value={product.category} onChange={handleChange}>
          <option value="">Selecciona una categoría</option>
          <option value="ropa">Ropa</option>
          <option value="accesorios">Accesorios</option>
          <option value="tecnologia">Tecnología</option>
          <option value="otros">Otros</option>
        </select>

        <label>Descripción:</label>
        <textarea name="description" value={product.description} onChange={handleChange} />

        <label>Imagen (URL):</label>
        <input type="text" name="image" value={product.image} onChange={handleChange} required />

        <button type="submit" className="sell-btn">Subir Producto</button>
      </form>
    </div>
  );
};

export default Sell;
