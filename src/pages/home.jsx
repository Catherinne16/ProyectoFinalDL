import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import ProductCard from "../components/productcard"; 
import Navbar from "../components/navbar"; 
import Carousel from "../components/carousel"; 
import Footer from "../components/footer"; 
import mochiImage from "../assets/images/mochi.jpg"; 
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Para los estilos
import "./home.css";

const Home = () => {
  // Datos de productos
  const products = [
    { id: 1, name: "Pantalón Cargo Coreano", brand: "Seoul Street", price: "$19.990", discount: "$15.990", image: mochiImage },
    { id: 2, name: "Serum Hidratante", brand: "Laneige", price: "$25.990", discount: "$19.990", image: mochiImage },
    { id: 3, name: "Pocky Fresa", brand: "Glico", price: "$4.490", discount: "$3.290", image: mochiImage },
    { id: 4, name: "Dorayaki", brand: "Tsubaki", price: "$3.990", discount: "$2.990", image: mochiImage },
    { id: 5, name: "Mochi Variado", brand: "Yuki & Love", price: "$6.990", discount: "$4.990", image: mochiImage },
    { id: 6, name: "Sake Premium", brand: "Hakutsuru", price: "$19.990", discount: "$14.990", image: mochiImage },
    { id: 7, name: "Mascarilla Pepino", brand: "Haokali", price: "$1.990", discount: "$1.450", image: mochiImage },
    { id: 8, name: "Ampolla Centella", brand: "Skin10004", price: "$29.990", discount: "$20.990", image: mochiImage },
    { id: 9, name: "Juguete para Perro", brand: "Puppy Toys", price: "$2.990", discount: "$2.490", image: mochiImage },
    { id: 10, name: "Chaqueta Coreana", brand: "Seoul Fashion", price: "$29.990", discount: "$24.990", image: mochiImage },
    { id: 11, name: "Toner Facial", brand: "Innisfree", price: "$12.990", discount: "$9.990", image: mochiImage },
    { id: 12, name: "Collar para Gato", brand: "CatLife", price: "$1.990", discount: "$1.490", image: mochiImage },
  ];

  // Función para manejar la adición del producto al carrito y mostrar el toast
  const handleAddToCart = (product) => {
    // Aquí iría la lógica para agregar el producto al carrito (por ejemplo, actualizando un contexto)
    toast.success(`¡${product.name} agregado al carrito!`, {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 3000,
    });
  };

  return (
    <div className="home-container">
      <div className="content"> {/* Contenido con padding */}
        <Carousel /> {/* Carrusel */}
        <div className="products-grid">
          {products.map((product) => (
            <ProductCard 
              key={product.id} 
              product={product} 
              onAddToCart={handleAddToCart} // Se pasa la función al componente
            />
          ))}
        </div>
      </div>
     </div>
  );
};

export default Home;
