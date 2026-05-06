import { MessageCircle, MapPin, Clock, Star, Music, Utensils, Coffee, Hammer, Zap, Timer, Mail } from 'lucide-react';

export const PromoFlashCard = ({promo}) => {



    return(
        <div 
          key={promo.id} 
          className="relative min-w-[280px] md:min-w-[320px] p-[2px] rounded-3xl bg-gradient-to-br from-amber-500 to-orange-600 animate-border-pulse"
        >
          <div className="bg-[#0a0a0c] rounded-[22px] p-6 h-full flex flex-col justify-between relative overflow-hidden">
            <Zap className="absolute -right-2 -top-2 text-amber-500/5" size={100} />
            
            <div>
              <div className="flex justify-between items-center mb-4">
                <span className="bg-amber-500 text-black text-[10px] font-black px-2 py-0.5 rounded uppercase">
                  Solo hoy
                </span>
                <div className="flex items-center gap-1 text-amber-500 font-mono text-xs font-bold">
                  <Timer size={12} />
                  Faltan: {new Date(promo.expira_en).getHours() - new Date().getHours()}h
                </div>
              </div>
              
              <h4 className="text-lg font-bold text-white mb-1 leading-tight">
                {promo.descripcion}
              </h4>
            </div>

            <div className="mt-4 pt-4 border-t border-white/5 flex items-center gap-2">
              <MapPin size={14} className="text-pink-500" />
              <span className="text-xs text-gray-400 font-bold truncate">
                {promo.comercio_nombre}
              </span>
            </div>
          </div>
        </div>
       

    );
};