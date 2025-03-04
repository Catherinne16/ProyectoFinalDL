import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import ProductCard from "../components/productcard";
import Navbar from "../components/navbar";
import Carousel from "../components/carousel";
import Footer from "../components/footer";
import mochiImage from "../assets/images/mochi.jpg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useGlobalContext } from "../context/GlobalContext";
import "./home.css";

const Home = () => {
  const { fetchAllProducts, allProducts, setCart, cart } = useGlobalContext();

  const [productos, setProductos] = useState([]);
  const addToCart = (product) => setCart([...cart, product]);

  useEffect(() => {
    setProductos(fetchAllProducts());
    console.log(productos);
  }, [setProductos]);

  const handleAddToCart = (product) => {
    addToCart(product);
    toast.success(`¡${product.nombre} agregado al carrito!`, {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 3000,
    });
  };

  return (
    <div className="home-container">
      <div className="content"> {}
        <Carousel /> {/* Carrusel */}
        <div className="products-grid">
          {allProducts.map((product) => (
            <ProductCard 
              key={product.id} 
              product={{ 
                ...product, 
                precio: product.precio.replace(".00", "") 
              }} 
              onAddToCart={() => handleAddToCart(product)} 
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
