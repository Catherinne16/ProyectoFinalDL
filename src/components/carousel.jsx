// src/components/Carousel.jsx
import { useState, useEffect } from "react";
import banner2 from "../assets/images/banner2.jpg";
import banner3 from "../assets/images/banner3.jpg";
import banner4 from "../assets/images/banner4.jpg";
import banner5 from "../assets/images/banner5.jpg";


import "./carousel.css";

const Carousel = () => {
  const images = [banner2, banner3, banner4, banner5];
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      nextImage();
    }, 5000);
    return () => clearInterval(interval);
  }, [currentImage]);

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="carousel">
      <button className="prev" onClick={prevImage}>❮</button>
      <img src={images[currentImage]} alt="banner" />
      <button className="next" onClick={nextImage}>❯</button>
    </div>
  );
};

export default Carousel;