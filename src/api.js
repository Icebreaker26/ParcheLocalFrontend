import axios from 'axios';

const api = axios.create({
    // Si existe una variable de entorno la usa, si no, usa localhost (para desarrollo)
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:4000/api'
});

// 2. EL INTERCEPTOR: La magia ocurre aquí
api.interceptors.request.use(
  (config) => {
    // Buscamos el token que guardamos en el AuthContext al hacer login
    const token = localStorage.getItem('parche_token');
    
    // Si existe el token, lo inyectamos en la cabecera de Autorización
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => {
    // Si hay un error antes de enviar la petición, lo rechazamos
    return Promise.reject(error);
  }
);

export default api;