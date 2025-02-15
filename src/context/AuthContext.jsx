import { createContext, useState, useEffect, useContext } from "react";

// Creamos el contexto de autenticación
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // El estado de user almacenará el objeto completo del usuario
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Verificamos si hay un usuario en el localStorage
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser)); //  Restauramos el usuario desde localStorage
    }
  }, []);

  // Función para hacer login
  const login = (userData) => {
    localStorage.setItem("user", JSON.stringify(userData)); // Guardamos el usuario completo en localStorage
    setUser(userData); // Actualizamos el estado de user
  };

  // Función para hacer logout
  const logout = () => {
    localStorage.removeItem("user"); // Eliminamos el usuario de localStorage
    setUser(null); // Restablecemos el estado de user a null
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook para acceder al contexto de autenticación
export const useAuth = () => useContext(AuthContext);
