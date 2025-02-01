// src/pages/Offers.jsx
import { useState } from "react";
import { Link } from "react-router-dom";  // Asegúrate de importar Link
import ProductCard from "../components/productcard"; // Importar el componente ProductCard
import mochiImage from "../assets/images/mochi.jpg"; // Imagen para los productos en ofertas

const Offers = () => {
  // Datos de productos en oferta (puedes agregar más productos si es necesario)
  const offerProducts = [
    { id: 1, name: "Ramen Picante", brand: "Shin Ramyun", price: "$5.990", discount: "$3.990", image: mochiImage },
    { id: 2, name: "Té Matcha", brand: "Ito En", price: "$9.990", discount: "$7.490", image: mochiImage },
    { id: 3, name: "Pocky Fresa", brand: "Glico", price: "$4.490", discount: "$3.290", image: mochiImage },
    { id: 4, name: "Sake Premium", brand: "Hakutsuru", price: "$19.990", discount: "$14.990", image: mochiImage },
  ];

  return (
    <div className="offers-container">
      <h2>Ofertas</h2>
      <div className="products-grid">
        {offerProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
       {/* Botón para volver al inicio */}
       <Link to="/" className="back-home-btn">Volver al Inicio</Link>
    </div>
  );
};

export default Offers;
