import { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // <-- 1. Importas el hook
import api from '../api'; // Importa la instancia de Axios que apunta a http://localhost:4000/api

// Creamos el contexto
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);
  const [cargandoAuth, setCargandoAuth] = useState(true);

  const [favoritosIds, setFavoritosIds] = useState([]);

  const navigate = useNavigate(); // <-- 2. Lo inicializas aquí


 const cargarFavoritosGlobales = async (userId) => {
  // 1. Validación preventiva: Si ya tenemos IDs en el estado, no llamamos a la API
  if (!userId || favoritosIds.length > 0) return;

  try {
    const res = await api.get(`/usuarios/favoritos/usuario/${userId}`); 
    
    if (res.data && res.data.data) {
      const ids = res.data.data.map(fav => Number(fav.comercio_id));
      setFavoritosIds(ids);
    }
  } catch (error) {
    // 2. Manejo silencioso del 429 para no saturar la consola
    if (error.response?.status === 429) {
      console.warn("Límite de peticiones alcanzado. Reintentando en la próxima sesión.");
      return;
    }
    console.error("Error cargando favoritos globales", error);
  }
};


  useEffect(() => {
    const token = localStorage.getItem('parche_token');
    const userGuardado = localStorage.getItem('parche_user');
    
    if (token && userGuardado) {
      const userData = JSON.parse(userGuardado);
      setUsuario(userData);
      
      // LA CLAVE ESTÁ AQUÍ: Disparamos la búsqueda apenas sabemos quién es el usuario
      cargarFavoritosGlobales(userData.id);
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
    <AuthContext.Provider value={{ usuario, login, logout, cargandoAuth, favoritosIds, setFavoritosIds }}>
      {children}
    </AuthContext.Provider>
  );
};