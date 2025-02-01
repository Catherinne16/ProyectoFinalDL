// src/components/Carousel.jsx
import { useState, useEffect } from "react";
import banner1 from "../assets/images/banner1.jpg"; // Importa la imagen aquí
import "./carousel.css";

const Carousel = () => {
  const images = [banner1];
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="carousel">
      <img src={images[currentImage]} alt="banner" />
    </div>
  );
};

export default Carousel;
