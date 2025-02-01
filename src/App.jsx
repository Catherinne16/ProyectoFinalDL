import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { GlobalProvider } from "./context/GlobalContext";
import Home from "./pages/home";
import Login from "./pages/login";
import Register from "./pages/register";
import Cart from "./pages/cart";
import ProductDetails from "./pages/productDetails";
import Favorites from "./pages/favorites";
import Offers from "./pages/offers";
import Contact from "./pages/contact";
import Navbar from "./components/navbar";
import Footer from "./components/footer";

function App() {
  return (
    <GlobalProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/offers" element={<Offers />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </Router>
    </GlobalProvider>
  );
}

export default App;
