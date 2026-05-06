import { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // <-- 1. Importas el hook
// Creamos el contexto
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);
  const [cargandoAuth, setCargandoAuth] = useState(true);

  const navigate = useNavigate(); // <-- 2. Lo inicializas aquí

  // Verificamos si ya hay una sesión activa al cargar la app
  useEffect(() => {
    const token = localStorage.getItem('parche_token');
    const userGuardado = localStorage.getItem('parche_user');
    
    if (token && userGuardado) {
      setUsuario(JSON.parse(userGuardado));
    }
    setCargandoAuth(false);
  }, []);

  // Función para iniciar sesión (la llamaremos desde Login.jsx)
  const login = (userData, token) => {
    localStorage.setItem('parche_token', token);
    localStorage.setItem('parche_user', JSON.stringify(userData));
    setUsuario(userData);
  };

  // Función para cerrar sesión
  const logout = () => {
    localStorage.removeItem('parche_token');
    localStorage.removeItem('parche_user');
    setUsuario(null);
    navigate('/');

  };

  return (
    <AuthContext.Provider value={{ usuario, login, logout, cargandoAuth }}>
      {children}
    </AuthContext.Provider>
  );
};