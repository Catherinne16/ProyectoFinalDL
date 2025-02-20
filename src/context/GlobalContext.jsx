import { createContext, useState, useContext, useEffect } from "react";

const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [products, setProducts] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/productos`, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
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
  };

  useEffect(() => {
    if (user) {
      fetchProducts();
    }
  }, [user]);

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
        const userData = { correo: credentials.correo, token: data.token };
        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));
      } else {
        throw new Error(data.error || "Correo o contraseña incorrectos.");
      }
    } catch (error) {
      console.error(error);
      throw new Error("Error en el servidor. Inténtalo más tarde.");
    }
  };

  const logout = () => {
    setUser(null);
    setCart([]);
    setFavorites([]);
    setProducts([]);
    localStorage.removeItem("user");
  };

  const addProduct = async (productData) => {
    if (!productData.title || !productData.description || !productData.price || !productData.image) {
      throw new Error("Faltan datos");
    }

    // Asegúrate de que el usuario esté autenticado y tenga un correo
    if (!user || !user.correo) {
      throw new Error("Usuario no autenticado");
    }

    const formData = new FormData();
    formData.append("nombre", productData.title);
    formData.append("descripcion", productData.description);
    formData.append("precio", productData.price.replace(/\./g, ""));
    formData.append("image", productData.image);
    formData.append("usuario_email", user.correo); // Aquí estamos incluyendo el correo del usuario autenticado

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

      // Actualizamos el estado para eliminar el producto de la lista
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
        addProduct,
        deleteProduct, // Ahora incluimos deleteProduct en el contexto
        fetchProducts,
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