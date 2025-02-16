import { createContext, useState, useContext, useEffect } from "react";

// Crear el contexto global
const GlobalContext = createContext();

// El proveedor del contexto global
export const GlobalProvider = ({ children }) => {
  // Estado para el carrito de compras
  const [cart, setCart] = useState([]);
  
  // Estado para los productos favoritos
  const [favorites, setFavorites] = useState([]);
  
  // Estado para la lista de productos disponibles
  const [products, setProducts] = useState([]);
  
  // Estado para el usuario (null cuando no está logueado)
  const [user, setUser] = useState(null);

  // useEffect para manejar la persistencia del usuario en el localStorage
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser); // Recuperamos el usuario si existe en localStorage
    }
  }, []); // Este efecto se ejecuta solo una vez cuando el componente se monta

  // Función para manejar el login (cuando un usuario se loguea)
  const login = (userData) => {
    setUser(userData); // Establece el usuario en el estado global
    localStorage.setItem("user", JSON.stringify(userData)); // Guardamos el usuario en localStorage para persistencia
  };

  // Función para manejar el logout (cuando un usuario cierra sesión)
  const logout = () => {
    setUser(null); // Limpiamos el estado de usuario (lo deslogueamos)
    localStorage.removeItem("user"); // Eliminamos el usuario del localStorage
  };

  // Función para agregar productos a la lista de productos
  const addProduct = (product) => {
    setProducts((prevProducts) => [...prevProducts, product]); // Añadimos el nuevo producto al estado de productos
  };

  return (
    <GlobalContext.Provider
      value={{
        cart, // Proveemos el estado del carrito
        setCart, // Permitimos actualizar el estado del carrito
        favorites, // Proveemos el estado de los favoritos
        setFavorites, // Permitimos actualizar el estado de los favoritos
        products, // Proveemos el estado de productos
        addProduct, // Proveemos la función para agregar productos
        user, // Proveemos el estado del usuario
        login, // Función para loguearse
        logout, // Función para desloguearse
      }}
    >
      {children} {/* Renderizamos los componentes hijos dentro del contexto */}
    </GlobalContext.Provider>
  );
};

// Hook personalizado para consumir el contexto global desde cualquier componente
export const useGlobalContext = () => useContext(GlobalContext);
