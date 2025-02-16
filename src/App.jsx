import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { GlobalProvider, useGlobalContext } from "./context/GlobalContext";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Importa el estilo de las notificaciones
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
import Carousel from "./components/carousel";
import Sell from "./pages/Sell";
import Profile from "./pages/Profile";

function ProtectedRoute({ element }) {
  const { user } = useGlobalContext(); // Extraemos el estado del usuario desde el contexto

  // Si no hay usuario, redirige a la página de login
  if (!user) {
    return <Navigate to="/login" />;
  }

  // Si el usuario está logueado, renderiza el componente
  return element;
}

function App() {
  return (
    <GlobalProvider>
      <Router>
      <ToastContainer/>
        <Navbar />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            {/* Rutas protegidas */}
            <Route path="/cart" element={<ProtectedRoute element={<Cart />} />} />
            <Route path="/favorites" element={<ProtectedRoute element={<Favorites />} />} />
            <Route path="/sell" element={<ProtectedRoute element={<Sell />} />} />
            <Route path="/profile" element={<ProtectedRoute element={<Profile />} />} />
            
            {/* Otras rutas */}
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/offers" element={<Offers />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </div>
        <Footer />
      </Router>
    </GlobalProvider>
  );
}

export default App;
