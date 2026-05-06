import { MessageCircle, MapPin, Clock, Star, Music, Utensils, Coffee, Hammer } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { Zap, Timer} from 'lucide-react'; // Iconos llamativos
import {  Mail} from 'lucide-react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

import { useContext } from 'react';
import { LogOut, User } from 'lucide-react'; // Agregamos los nuevos íconos

export const NavBar = () => {
  const { usuario, logout } = useContext(AuthContext);

  return(
    <>
      {/* Header */}
      <header className="fixed top-0 w-full z-50 bg-[#0a0a0c]/80 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          
          {/* Lado Izquierdo: Logo */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center shadow-lg shadow-purple-500/20">
              <Link to="/">   
                <Music size={18} className="text-white" />
              </Link>
            </div>
            <div>
              <Link to="/"> 
                <h1 className="text-xl font-bold leading-none text-white">El Parche Local</h1>
              </Link>
            </div>
          </div>

          {/* Lado Derecho: Ubicación y Auth */}
          <div className="flex items-center gap-3 md:gap-4">
            
            {/* Botón de Ubicación */}
            <button className="hidden md:flex items-center gap-2 bg-white/5 hover:bg-white/10 px-3 py-1.5 rounded-full border border-white/10 transition-all">
              <MapPin size={14} className="text-purple-400" />
              {/* Como acordamos expandir la visión, aquí podrías cambiar "La Virginia" por "Colombia" más adelante */}
              <span className="text-sm font-medium text-white">La Virginia</span>
            </button>

            {/* Divisor vertical (solo visible en escritorio) */}
            <div className="hidden md:block w-px h-6 bg-white/10"></div>

            {/* Lógica de Sesión */}
            {usuario ? (
              <div className="flex items-center gap-2">
                {/* Badge del Usuario */}
                <div className="flex items-center gap-2 px-3 py-1.5 bg-purple-500/10 border border-purple-500/20 rounded-full cursor-default">
                  <Link to="/perfil">
                  <User size={14} className="text-purple-400" />
                  </Link>
                                    <Link to="/perfil">

                  <span className="text-sm font-medium text-purple-100">
                    {/* Toma solo el primer nombre para no romper el diseño */}
                    {usuario.nombre?.split(' ')[0]} 
                  </span>
                  </Link>
                </div>
                
                {/* Botón de Cerrar Sesión (Solo el ícono para mantenerlo minimalista) */}
                <button 
                  onClick={logout}
                  title="Cerrar sesión"
                  className="p-2 text-gray-400 hover:text-pink-500 hover:bg-pink-500/10 rounded-full transition-all"
                >
                  <LogOut size={16} />
                </button>
              </div>
            ) : (
              /* Botón de Ingresar (Estado deslogueado) */
              <Link 
                to="/login"
                className="px-4 py-1.5 text-sm font-bold text-white bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-400 hover:to-purple-500 rounded-full transition-all shadow-lg shadow-purple-500/20"
              >
                Ingresar
              </Link>
            )}

          </div>
        </div>
      </header>
    </>
  );
};