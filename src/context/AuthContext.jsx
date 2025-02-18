import React, { createContext, useContext, useState, useEffect } from "react";

// Crear el contexto de autenticación
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Estado para el usuario autenticado
  const [user, setUser] = useState(null);

  // Estado para carrito y favoritos
  const [cart, setCart] = useState([]);
  const [favorites, setFavorites] = useState([]);

  // 🔥 Recuperar usuario de localStorage al cargar la aplicación
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser)); // Cargar el usuario desde localStorage si existe
    }
  }, []);

  // Función para iniciar sesión y guardar usuario en localStorage
  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  // Función para cerrar sesión, limpiar estados y eliminar localStorage
  const logout = () => {
    setUser(null);
    setCart([]);
    setFavorites([]);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, cart, favorites, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook personalizado para usar el contexto de autenticación
export const useAuth = () => useContext(AuthContext);