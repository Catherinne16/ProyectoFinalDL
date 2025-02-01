import { Link } from "react-router-dom";  // Asegúrate de importar Link
import { useState, useEffect } from "react";
import ProductCard from "../components/productcard"; 
import Navbar from "../components/navbar"; 
import Carousel from "../components/carousel"; 
import Footer from "../components/footer"; 
import mochiImage from "../assets/images/mochi.jpg"; 
import "./Home.css";

const Home = () => {
  // Datos de productos
  const products = [
    { id: 1, name: "Ramen Picante", brand: "Shin Ramyun", price: "$5.990", discount: "$3.990", image: mochiImage },
    { id: 2, name: "Té Matcha", brand: "Ito En", price: "$9.990", discount: "$7.490", image: mochiImage },
    { id: 3, name: "Pocky Fresa", brand: "Glico", price: "$4.490", discount: "$3.290", image: mochiImage },
    { id: 4, name: "Dorayaki", brand: "Tsubaki", price: "$3.990", discount: "$2.990", image: mochiImage },
    { id: 5, name: "Mochi Variado", brand: "Yuki & Love", price: "$6.990", discount: "$4.990", image: mochiImage },
    { id: 6, name: "Sake Premium", brand: "Hakutsuru", price: "$19.990", discount: "$14.990", image: mochiImage },
  ];

  return (
    <div className="home-container">
      <Navbar /> {/* Navbar */}
      <div className="content"> {/* Contenido con padding */}
        <Carousel /> {/* Carrusel */}
        <div className="products-grid">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
      <Footer /> {/* Footer */}
    </div>
  );
};

export default Home;
