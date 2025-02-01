import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useGlobalContext } from "../context/GlobalContext";
import ProductCard from "../components/productcard";
import "./productDetails.css"; // Asegurar consistencia con los estilos

const ProductDetails = () => {
  const { id } = useParams();
  const { cart, setCart, favorites, setFavorites } = useGlobalContext();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3000/api/productos/${id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data));
  }, [id]);

  const addToCart = () => setCart([...cart, product]);
  const addToFavorites = () => setFavorites([...favorites, product]);

  if (!product) return <p>Cargando...</p>;

  return (
    <div className="product-details">
      <ProductCard product={product} />
      <button onClick={addToCart}>Agregar al carrito</button>
      <button onClick={addToFavorites}>Agregar a favoritos</button>
    </div>
  );
};

export default ProductDetails;