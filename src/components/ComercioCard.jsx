import BotonFavorito from "./BotonFavorito";
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { MessageCircle, MapPin, Clock, Star, Music, Utensils, Coffee, Hammer } from 'lucide-react';

// Utilidad para manejar clases de Tailwind
function cn(...inputs) {
  return twMerge(clsx(inputs));
}
export const ComercioCard = ({negocio}) => {



    return(
        <>
              <div 
                key={negocio.id} 
                className={cn(
                  "group relative bg-[#131316] rounded-[2rem] overflow-hidden border transition-all duration-500 hover:translate-y-[-4px]",
                  negocio.es_premium ? "border-amber-500/30 shadow-xl shadow-amber-500/5" : "border-white/5"
                )}
              >
                <div className="aspect-[4/3] overflow-hidden relative">
                  <img src={negocio.logo_url || 'https://via.placeholder.com/400x300?text=Sin+Imagen'} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={negocio.nombre} />
                  <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter text-gray-300">
                     <BotonFavorito comercioId={negocio.id}/> {negocio.categoria}                  

                  </div>
                  {negocio.es_premium && (
                    <div className="absolute top-4 right-4 bg-amber-500 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter text-black flex items-center gap-1">
                      <Star size={10} fill="black" /> Recomendado
                    </div>
                  )}
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <div className={cn("w-2 h-2 rounded-full", negocio.abierto ? "bg-green-500 animate-pulse" : "bg-red-500")} />
                    <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500">
                      {negocio.abierto ? "Abierto ahora" : "Cerrado"}
                    </span>
                  </div>
                  
                  <h4 className="text-xl font-bold mb-1">{negocio.nombre}</h4>
                  <div className="flex items-center gap-1 text-gray-500 text-xs mb-3">
                    <MapPin size={12} /> {negocio.direccion}
                  </div>
                  <p className="text-gray-400 text-sm line-clamp-2 mb-6 h-10 leading-relaxed">
                    {negocio.descripcion}
                  </p>

                  <button className="w-full bg-[#25D366] hover:bg-[#20bd5b] text-black font-bold py-4 rounded-2xl flex items-center justify-center gap-2 transition-all active:scale-95 shadow-lg shadow-green-500/10">
                    Contactar por WhatsApp
                  </button>

                </div>
              </div>
          
            </>
    );
};