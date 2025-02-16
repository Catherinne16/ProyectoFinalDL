import { useState, useEffect } from "react";
import { Link } from "react-router-dom";  
import ProductCard from "../components/productcard"; 
import mochiImage from "../assets/images/mochi.jpg"; 
import "./offers.css";

// Lista completa de productos en oferta
const allOfferProducts = [
  { id: 1, name: "Ramen Picante", brand: "Shin Ramyun", price: "$5.990", discount: "$3.990", image: mochiImage },
  { id: 2, name: "Té Matcha", brand: "Ito En", price: "$9.990", discount: "$7.490", image: mochiImage },
  { id: 3, name: "Pocky Fresa", brand: "Glico", price: "$4.490", discount: "$3.290", image: mochiImage },
];

// Función para obtener 3 productos en oferta basados en el día del mes
const getDailyOffers = () => {
  const today = new Date();
  const day = today.getDate(); // Usamos el día del mes como semilla
  const productsCopy = [...allOfferProducts];
  productsCopy.sort((a, b) => Math.sin(a.id * day) - Math.sin(b.id * day));
  return productsCopy.slice(0, 3);
};

const Offers = () => {
  const [offerProducts, setOfferProducts] = useState([]);

  useEffect(() => {
    setOfferProducts(getDailyOffers());
  }, []);

  return (
    <div className="offers-container">
      <h2 className="offers-title">Ofertas del Día</h2>
      <div className="products-grid">
        {offerProducts.map((product) => (
          <ProductCard key={product.id} product={product} isOfferPage={true} />
        ))}
      </div>
      <Link to="/" className="back-home-btn">Volver al Inicio</Link>
    </div>
  );
};

export default Offers;
