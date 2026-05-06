import { useState, useContext } from 'react';
import { Heart, Loader2 } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';
import api from '../api';

const BotonFavorito = ({ comercioId }) => {
  const { usuario, favoritosIds, setFavoritosIds } = useContext(AuthContext);
  const [cargando, setCargando] = useState(false);

  // LA CURA: Forzamos el ID a ser un número entero para evitar problemas de tipos
  const idNumerico = Number(comercioId);

  // Ahora validamos de forma segura con el ID numérico
  const esFavorito = favoritosIds?.includes(idNumerico) || false;

  const toggleFavorito = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!usuario) {
      alert("Debes iniciar sesión para guardar tus parches favoritos.");
      return;
    }

    setCargando(true);

    try {
      if (esFavorito) {
        // RUTA DE BORRADO: Usamos el idNumerico
        await api.delete(`/usuarios/favoritos/${usuario.id}/${idNumerico}`);
        
        // Actualizamos el contexto sacando el ID (asegurándonos de comparar números)
        setFavoritosIds(prev => prev.filter(id => Number(id) !== idNumerico));
      } else {
        // RUTA DE CREACIÓN: Usamos el idNumerico
        await api.post('/usuarios/favoritos', {
          usuario_id: Number(usuario.id),
          comercio_id: idNumerico
        });
        
        // Actualizamos el contexto metiendo el ID
        setFavoritosIds(prev => [...prev, idNumerico]);
      }
    } catch (error) {
      console.error("Error al modificar favoritos", error);
      if (error.response?.status === 409) {
        // Si ya existía, igual pintamos el corazón
        setFavoritosIds(prev => [...prev, idNumerico]);
      }
    } finally {
      setCargando(false);
    }
  };

  return (
    <button
      onClick={toggleFavorito}
      disabled={cargando}
      className="p-2.5 rounded-full bg-black/40 backdrop-blur-md border border-white/10 hover:bg-black/60 transition-all group"
    >
      {cargando ? (
        <Loader2 size={18} className="animate-spin text-pink-500" />
      ) : (
        <Heart 
          size={18} 
          className={`transition-all duration-300 ${
            esFavorito 
              ? 'fill-pink-500 text-pink-500 drop-shadow-[0_0_8px_rgba(236,72,153,0.8)]' 
              : 'text-white group-hover:text-pink-400'
          }`} 
        />
      )}
    </button>
  );
};

export default BotonFavorito;