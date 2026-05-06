import { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { User, Mail, Calendar, Heart, Ticket, Settings, LogOut, Camera, MapPin, Loader2 } from 'lucide-react';
import { NavBar } from './navbar';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api'; // Importa la instancia de Axios que apunta a http://localhost:4000/api


const Perfil = () => {
  const { usuario, logout } = useContext(AuthContext);
  const [tabActivo, setTabActivo] = useState('actividad'); // 'actividad' | 'guardados' | 'ajustes'

  const [favoritos, setFavoritos] = useState([]);
  const [cargandoFavs, setCargandoFavs] = useState(false);
  
    // 2. Efecto para cargar los favoritos cuando cambie a la pestaña 'guardados'
  useEffect(() => {
      const cargarFavoritos = async () => {
        setCargandoFavs(true);
        try {
          const res = await api.get(`/usuarios/favoritos/usuario/${usuario.id}`);
          setFavoritos(res.data.data);
        } catch (error) {
          console.error("Error cargando favoritos", error);
        } finally {
          setCargandoFavs(false);
        }
      };
      cargarFavoritos();
    
  }, [usuario]);

  // Si por alguna razón entra sin estar logueado (aunque deberías proteger la ruta)
  if (!usuario) return null;

  const handleCerrarSesion = () => {

  logout(); // Limpia la sesión
};

  return (
    <div className="min-h-screen bg-[#0a0a0c] pt-24 pb-12 px-4 relative overflow-hidden">

                                      <NavBar />
        
      {/* Luces de fondo */}
      <div className="absolute top-20 left-10 w-96 h-96 bg-purple-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-pink-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 relative z-10">
        
        {/* COLUMNA IZQUIERDA: Tarjeta Principal del Usuario */}
        <div className="md:col-span-4 space-y-6">
          <div className="bg-[#111114] border border-white/5 rounded-[2rem] p-8 text-center relative overflow-hidden group">
            {/* Banner superior de la tarjeta */}
            <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-r from-purple-600/20 to-pink-600/20" />
            
            {/* Avatar */}
            <div className="relative w-28 h-28 mx-auto mt-4 mb-6">
              <div className="w-full h-full bg-[#1a1a24] rounded-full border-4 border-[#0a0a0c] flex items-center justify-center shadow-xl overflow-hidden">
                {/* Aquí iría la imagen real si tienes. Por ahora un placeholder o inicial */}
                <span className="text-4xl font-black text-white/50">{usuario.nombre?.charAt(0).toUpperCase()}</span>
              </div>
              <button className="absolute bottom-0 right-0 w-8 h-8 bg-pink-500 rounded-full flex items-center justify-center text-white border-2 border-[#0a0a0c] hover:bg-pink-400 transition-colors">
                <Camera size={14} />
              </button>
            </div>

            {/* Info Básica */}
            <h2 className="text-2xl font-bold text-white mb-1">{usuario.nombre}</h2>
            <div className="flex items-center justify-center gap-2 text-gray-400 mb-6">
              <Mail size={14} />
              <span className="text-sm">{usuario.email}</span>
            </div>

            {/* Badge de Rol */}
            <div className="inline-block px-4 py-1.5 bg-white/5 border border-white/10 rounded-full text-xs font-bold text-gray-300 uppercase tracking-wider mb-8">
              {usuario.rol === 'comercio' ? 'Administrador de Local' : 'Parchador Oficial'}
            </div>

            {/* Botón de Cerrar Sesión */}
            <button 
              onClick={handleCerrarSesion}
              className="w-full py-3 rounded-xl flex items-center justify-center gap-2 text-red-400 bg-red-500/10 hover:bg-red-500/20 transition-colors font-medium text-sm"
            >
              <LogOut size={16} />
              Cerrar Sesión
            </button>
          
          </div>
        </div>

        {/* COLUMNA DERECHA: Contenido y Estadísticas */}
        <div className="md:col-span-8 space-y-6">
          
          {/* Tarjetas de Estadísticas Rápidas */}
          <div className="grid grid-cols-3 gap-4">
            {[
              { icon: <Ticket className="text-purple-400" />, label: 'Eventos Asistidos', value: '12' },
              { icon: <Heart className="text-pink-400" />, label: 'Favoritos', value: favoritos.length },
              { icon: <MapPin className="text-indigo-400" />, label: 'Nuevos Lugares', value: '8' },
            ].map((stat, i) => (
              <div key={i} className="bg-[#111114] border border-white/5 rounded-2xl p-5 flex flex-col items-center justify-center text-center hover:bg-white/[0.02] transition-colors">
                <div className="mb-2">{stat.icon}</div>
                <span className="text-2xl font-black text-white">{stat.value}</span>
                <span className="text-xs text-gray-500 font-medium uppercase tracking-wider mt-1">{stat.label}</span>
              </div>
            ))}
          </div>

          {/* Menú de Navegación del Perfil */}
          <div className="flex gap-4 border-b border-white/10 pb-px">
            {[
              { id: 'actividad', label: 'Mi Actividad' },
              { id: 'guardados', label: 'Parches Guardados' },
              { id: 'ajustes', label: 'Ajustes de Cuenta' },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setTabActivo(tab.id)}
                className={`pb-4 px-2 text-sm font-bold transition-all relative ${
                  tabActivo === tab.id ? 'text-white' : 'text-gray-500 hover:text-gray-300'
                }`}
              >
                {tab.label}
                {tabActivo === tab.id && (
                  <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-purple-500 to-pink-500" />
                )}
              </button>
            ))}
          </div>

          {/* Contenedor Dinámico según el Tab Activo */}
          <div className="bg-[#111114] border border-white/5 rounded-[2rem] p-8 min-h-[300px]">
            {tabActivo === 'actividad' && (
              <div className="flex flex-col items-center justify-center h-full text-center py-10 opacity-70">
                <Calendar size={48} className="text-gray-600 mb-4" />
                <h3 className="text-lg font-bold text-white mb-2">Aún no tienes actividad</h3>
                <p className="text-sm text-gray-500">Asiste a tu primer parche para que aparezca aquí.</p>
              </div>
            )}

                    {tabActivo === 'guardados' && (
                <div className="h-full">
                    {cargandoFavs ? (
                    <div className="flex justify-center items-center py-20">
                        <Loader2 className="animate-spin text-pink-500" size={32} />
                    </div>
                    ) : favoritos.length === 0 ? (
                    <div className="flex flex-col items-center justify-center text-center py-10 opacity-70">
                        <Heart size={48} className="text-gray-600 mb-4" />
                        <h3 className="text-lg font-bold text-white mb-2">Sin lugares favoritos</h3>
                        <p className="text-sm text-gray-500">Guarda los comercios que más te gusten presionando el corazón.</p>
                    </div>
                    ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {favoritos.map((fav) => (
                        <div key={fav.favorito_id} className="bg-[#0a0a0c] border border-white/5 rounded-xl p-4 flex items-center gap-4 hover:border-pink-500/30 transition-colors">
                            <img 
                            src={fav.logo_url || 'https://via.placeholder.com/80'} 
                            alt={fav.nombre} 
                            className="w-16 h-16 rounded-lg object-cover bg-[#111114]"
                            />
                            <div className="flex-1">
                            <span className="text-[10px] font-bold text-pink-500 uppercase tracking-wider">{fav.categoria_nombre}</span>
                            <h4 className="text-white font-bold text-lg leading-tight">{fav.nombre}</h4>
                            <p className="text-xs text-gray-500 mt-1 truncate">{fav.direccion}</p>
                            </div>
                            {/* Opcional: Aquí podrías reutilizar el BotonFavorito pasándole initialState={true} */}
                        </div>
                        ))}
                    </div>
                    )}
                </div>
                )}

            {tabActivo === 'ajustes' && (
              <div className="space-y-6">
                <h3 className="text-lg font-bold text-white mb-4">Información Personal</h3>
                {/* Formulario de Ajustes (Mockup) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Nombre</label>
                    <input type="text" defaultValue={usuario.nombre} className="w-full bg-[#0a0a0c] border border-white/10 text-white rounded-xl py-2.5 px-4 focus:outline-none focus:border-purple-500" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Correo</label>
                    <input type="email" defaultValue={usuario.email} disabled className="w-full bg-[#0a0a0c] border border-white/5 text-gray-500 rounded-xl py-2.5 px-4 cursor-not-allowed" />
                  </div>
                </div>
                <button className="px-6 py-2.5 bg-white/10 hover:bg-white/20 text-white rounded-xl text-sm font-bold transition-all">
                  Guardar Cambios
                </button>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default Perfil;