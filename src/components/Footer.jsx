import { MessageCircle, MapPin, Clock, Star, Music, Utensils, Coffee, Hammer } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { Zap, Timer} from 'lucide-react'; // Iconos llamativos
import {  Mail} from 'lucide-react';
import { Link } from 'react-router-dom';

export const Footer = () => {


    return(
        <>
        {/* Header */}
             
<footer className="bg-[#0a0a0c] border-t border-gray-800 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          
          {/* Columna 1: Branding */}
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-pink-500 p-1.5 rounded-lg">
                <Zap size={20} className="text-white fill-white" />
              </div>
              <span className="text-xl font-black tracking-tighter text-white uppercase">
                Parche<span className="text-pink-500">Local</span>
              </span>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed mb-6">
              La plataforma oficial de los mejores eventos, promociones y parches en La Virginia, Risaralda. No te pierdas de nada.
            </p>
           
          </div>

          {/* Columna 2: Navegación */}
          <div>
            <h4 className="text-white font-bold mb-6 uppercase text-xs tracking-widest">Explorar</h4>
            <ul className="space-y-4 text-sm">
              <li><a href="#" className="text-gray-500 hover:text-purple-400 transition-colors">Comercios</a></li>
              <li><a href="#" className="text-gray-500 hover:text-purple-400 transition-colors">Eventos de Hoy</a></li>
              <li><a href="#" className="text-gray-500 hover:text-purple-400 transition-colors">Promos Flash</a></li>
              <li><a href="#" className="text-gray-500 hover:text-purple-400 transition-colors">Mapa del Parche</a></li>
            </ul>
          </div>

          {/* Columna 3: Soporte/Legal */}
          <div>
            <h4 className="text-white font-bold mb-6 uppercase text-xs tracking-widest">Plataforma</h4>
            <ul className="space-y-4 text-sm">            
             <li>
             <Link 
                to="/terminoscondiciones" 
                className="text-gray-500 hover:text-purple-400 transition-colors"
            >
                Publicar mi negocio
            </Link></li>

         
              <li>
             <Link 
                to="/terminoscondiciones" 
                className="text-gray-500 hover:text-purple-400 transition-colors"
            >
                Términos y condiciones
            </Link></li>
              <li>
             <Link 
                to="/sobrenosotros" 
                className="text-gray-500 hover:text-purple-400 transition-colors"
            >
                Sobre Nosotros
            </Link></li>
              <li>
             <Link 
                to="/terminoscondiciones" 
                className="text-gray-500 hover:text-purple-400 transition-colors"
            >
                Preguntas Frecuentes
            </Link></li>
            </ul>
          </div>

          {/* Columna 4: Contacto Local */}
          <div>
            <h4 className="text-white font-bold mb-6 uppercase text-xs tracking-widest">Contacto</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3 text-gray-500">
                <MapPin size={18} className="text-pink-500 shrink-0" />
                <span>La Virginia, Risaralda, Colombia</span>
              </li>
              <li className="flex items-center gap-3 text-gray-500">
                <Mail size={18} className="text-pink-500 shrink-0" />
                <span>contacto@parchelocal.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Línea final y Copyright */}
        <div className="pt-8 border-t border-gray-900 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-600 text-xs text-center md:text-left">
            © {new Date().getFullYear()} Parche Local. Todos los derechos reservados.
          </p>
          <div className="flex items-center gap-2">
             <span className="text-gray-600 text-[10px] uppercase font-bold tracking-widest">Desarrollado por Icebreaker26</span>
             <div className="w-2 h-2 bg-pink-500 rounded-full animate-pulse" />
          </div>
        </div>
      </div>
    </footer>
        </>
    );
};