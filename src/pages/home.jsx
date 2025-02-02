import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import ProductCard from "../components/productcard"; 
import Navbar from "../components/navbar"; 
import Carousel from "../components/carousel"; 
import Footer from "../components/footer"; 
import mochiImage from "../assets/images/mochi.jpg"; 
import "./home.css";

const Home = () => {
  // Datos de productos
  const products = [
    { id: 1, name: "Ramen Picante", brand: "Shin Ramyun", price: "$5.990", discount: "$3.990", image: mochiImage },
    { id: 2, name: "Té Matcha", brand: "Ito En", price: "$9.990", discount: "$7.490", image: mochiImage },
    { id: 3, name: "Pocky Fresa", brand: "Glico", price: "$4.490", discount: "$3.290", image: mochiImage },
    { id: 4, name: "Dorayaki", brand: "Tsubaki", price: "$3.990", discount: "$2.990", image: mochiImage },
    { id: 5, name: "Mochi Variado", brand: "Yuki & Love", price: "$6.990", discount: "$4.990", image: mochiImage },
    { id: 6, name: "Sake Premium", brand: "Hakutsuru", price: "$19.990", discount: "$14.990", image: mochiImage },
    { id: 7, name: "Mascarilla Pepino", brand: "Haokali", price: "$1.990", discount: "$1.450", image: mochiImage },
    { id: 8, name: "Ampolla Centella", brand: "Skin10004", price: "$29.990", discount: "$20.990", image: mochiImage },
    
  ];

  return (
    <div className="home-container">
      <div className="content"> {/* Contenido con padding */}
        <Carousel /> {/* Carrusel */}
        <div className="products-grid">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
