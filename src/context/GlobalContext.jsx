import { createContext, useState, useContext, useEffect, useCallback } from "react";

const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [products, setProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [user, setUser] = useState(null);

  // Recuperar carrito desde localStorage al iniciar la app
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart"));
    if (storedCart) {
      setCart(storedCart);
    }
  }, []);

  // Guardar carrito en localStorage cada vez que cambie
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // Verificar sesión almacenada y su expiración
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      const currentTime = new Date().getTime();
      if (storedUser.expiresAt && storedUser.expiresAt < currentTime) {
        logout(); // Cierra sesión si el token ha expirado
      } else {
        setUser(storedUser);
      }
    }
  }, []);

  useEffect(() => {
    if (user?.expiresAt) {
      const timeLeft = user.expiresAt - new Date().getTime();
      if (timeLeft > 0) {
        const logoutTimer = setTimeout(() => {
          logout();
        }, timeLeft);

        return () => clearTimeout(logoutTimer);
      }
    }
  }, [user]);

  const fetchProducts = useCallback(async () => {
    if (!user?.token) return;

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/productos`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Error al obtener los productos");
      }

      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error(error);
    }
  }, [user?.token]);

  useEffect(() => {
    if (user) {
      fetchProducts();
    }
  }, [user]);

  const fetchAllProducts = useCallback(async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/productos-publicos`);

      if (!response.ok) {
        throw new Error("Error al obtener todos los productos");
      }

      const data = await response.json();
      setAllProducts(data);
    } catch (error) {
      console.error("Error al obtener los productos públicos:", error);
      return [];
    }
  }, []);

  const login = async (credentials) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      const data = await response.json();

      if (response.ok) {
        const expiresAt = new Date().getTime() + 60 * 60 * 1000;
        const userData = { correo: credentials.correo, token: data.token, expiresAt };
        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));
      } else {
        throw new Error(data.error || "Correo o contraseña incorrectos.");
      }
    } catch (error) {
      console.error(error);
      throw new Error("Contraseña incorrecta, ¡intente nuevamente!");
    }
  };

  const logout = () => {
    setUser(null);
    setFavorites([]);
    setProducts([]);
    localStorage.removeItem("user");
  };

  const addProduct = async (productData) => {
    if (!productData.title || !productData.description || !productData.price || !productData.image) {
      throw new Error("Faltan datos");
    }

    if (!user || !user.correo) {
      throw new Error("Usuario no autenticado");
    }

    const formData = new FormData();
    formData.append("nombre", productData.title);
    formData.append("descripcion", productData.description);
    formData.append("precio", productData.price.replace(/\./g, ""));
    formData.append("image", productData.image);
    formData.append("usuario_email", user.correo);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/productos`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Error al subir el producto");
      }

      const newProduct = await response.json();
      setProducts((prevProducts) => [...prevProducts, newProduct]);
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const deleteProduct = async (productId) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/productos/${productId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Error al eliminar el producto");
      }

      setProducts((prevProducts) => prevProducts.filter((product) => product.id !== productId));
    } catch (error) {
      console.error("Error al eliminar el producto:", error);
    }
  };

  return (
    <GlobalContext.Provider
      value={{
        cart,
        setCart,
        favorites,
        setFavorites,
        products,
        allProducts,
        addProduct,
        deleteProduct,
        fetchProducts,
        fetchAllProducts,
        user,
        login,
        logout,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
