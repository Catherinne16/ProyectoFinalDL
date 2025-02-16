import React, { createContext, useContext, useState } from 'react';

// Crear el contexto
const AuthContext = createContext();

// Crear el proveedor del contexto
export const AuthProvider = ({ children }) => {
  // Estados para la gestión del carrito, favoritos, y perfil de usuario
  const [user, setUser] = useState(null); // Usuario autenticado
  const [cart, setCart] = useState([]); // Carrito de compras
  const [favorites, setFavorites] = useState([]); // Productos favoritos

  // Función para iniciar sesión
  const login = (userData) => {
    setUser(userData); // Establece los datos del usuario al iniciar sesión
  };

  // Función para cerrar sesión
  const logout = () => {
    setUser(null); // Elimina el usuario autenticado
    setCart([]); // Limpiar el carrito
    setFavorites([]); // Limpiar los favoritos
  };

  // Función para agregar productos al carrito
  const addToCart = (product) => {
    setCart((prevCart) => [...prevCart, product]); // Agregar producto al carrito
  };

  // Función para agregar productos a favoritos
  const addToFavorites = (product) => {
    setFavorites((prevFavorites) => [...prevFavorites, product]); // Agregar producto a favoritos
  };

  return (
    <AuthContext.Provider
      value={{
        user, // Datos del usuario logueado
        cart, // El carrito de compras
        favorites, // Productos favoritos
        login, // Función para iniciar sesión
        logout, // Función para cerrar sesión
        addToCart, // Función para agregar al carrito
        addToFavorites, // Función para agregar a favoritos
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Hook para acceder al contexto de autenticación
export const useAuth = () => useContext(AuthContext);
