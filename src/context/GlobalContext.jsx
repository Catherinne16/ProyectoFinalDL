import { createContext, useState, useContext, useEffect } from "react";

// Creamos el contexto global para manejar el estado de la aplicación
const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  // Establecemos el estado para el carrito, favoritos, productos y usuario
  const [cart, setCart] = useState([]); // Estado para el carrito de compras
  const [favorites, setFavorites] = useState([]); // Estado para los favoritos
  const [products, setProducts] = useState([]); // Estado para los productos
  const [user, setUser] = useState(null); // Estado para el usuario (null indica que no está logueado)

  // useEffect para manejar la persistencia del usuario desde el localStorage
  useEffect(() => {
    // Intentamos recuperar al usuario almacenado en el localStorage (si existe)
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser); // Si el usuario existe, lo cargamos en el estado
    }
  }, []); // Este efecto solo se ejecuta una vez cuando se monta el componente

  // Función para manejar el login (cuando un usuario se loguea)
  const login = (userData) => {
    setUser(userData); // Establecemos el usuario en el estado global
    localStorage.setItem("user", JSON.stringify(userData)); // Guardamos el usuario en el localStorage para persistencia
  };

  // Función para manejar el logout (cuando un usuario cierra sesión)
  const logout = () => {
    setUser(null); // Limpiamos el estado de usuario (lo deslogueamos)
    localStorage.removeItem("user"); // Eliminamos al usuario del localStorage
  };

  // Función para agregar productos a la lista de productos
  const addProduct = (product) => {
    setProducts((prevProducts) => [...prevProducts, product]); // Añadimos un nuevo producto al estado de productos
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
        user, // Proveemos el estado del usuario (si está logueado o no)
        login, // Proveemos la función de login
        logout, // Proveemos la función de logout
      }}
    >
      {children} {/* Renderizamos los componentes hijos dentro del contexto */}
    </GlobalContext.Provider>
  );
};

// Hook personalizado para consumir el contexto global desde cualquier componente
export const useGlobalContext = () => useContext(GlobalContext);
