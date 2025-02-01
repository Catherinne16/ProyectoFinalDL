import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Login from "./pages/login";
import Register from "./pages/register";
import Cart from "./pages/cart";
import ProductCard from "./components/productcard";
import Favorites from "./pages/favorites"; // Si tienes la página de favoritos
import Offers from "./pages/offers"; // Si tienes la página de ofertas
import Contact from "./pages/contact"; // Si tienes la página de contacto

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/product/:id" element={<ProductCard />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/offers" element={<Offers />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </Router>
  );
}

export default App;
