import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./pages/home";
import Login from "./pages/login";
import Register from "./pages/register";
import Cart from "./pages/cart";
import ProductDetails from "./pages/productDetails";
import Favorites from "./pages/favorites";
import Contact from "./pages/contact";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import Sell from "./pages/Sell";
import Profile from "./pages/Profile";
import SellProducts from "./pages/sellproducts";
import { GlobalProvider, useGlobalContext } from "./context/GlobalContext";

function ProtectedRoute({ children }) {
  const { user } = useGlobalContext(); 
  return user ? children : <Navigate to="/login" />;
}

function App() {
  return (
    <Router>
      <GlobalProvider>
        <ToastContainer />
        <Navbar />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Rutas protegidas */}
            <Route path="/cart" element={<ProtectedRoute><Cart /></ProtectedRoute>} />
            <Route path="/favorites" element={<ProtectedRoute><Favorites /></ProtectedRoute>} />
            <Route path="/sell" element={<ProtectedRoute><Sell /></ProtectedRoute>} />
            <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
            <Route path="/sellproducts" element={<ProtectedRoute><SellProducts /></ProtectedRoute>} />

            {/* Otras rutas */}
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
        <Footer />
      </GlobalProvider>
    </Router>
  );
}

export default App;