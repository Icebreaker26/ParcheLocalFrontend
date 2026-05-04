import axios from 'axios';

const api = axios.create({
    // Si existe una variable de entorno la usa, si no, usa localhost (para desarrollo)
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:4000/api'
});

export default api;