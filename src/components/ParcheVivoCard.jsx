import { MessageCircle, MapPin, Clock, Star, Music, Utensils, Coffee, Hammer, Zap, Timer, Mail } from 'lucide-react';


export const ParcheVivoCard = ({evento}) =>{

    return(

                <div key={evento.id} className="relative min-w-[320px] md:min-w-[450px] aspect-video rounded-3xl overflow-hidden group">
                    <img src={evento.imagen_url} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt={evento.titulo} />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0c] via-[#0a0a0c]/20 to-transparent" />
                    
                    <div className="absolute top-4 left-4 flex gap-2">
                      <span className="bg-purple-600 text-[10px] font-bold px-3 py-1 rounded-full flex items-center gap-1 uppercase tracking-wider">
                        <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" /> 
                        Hoy
                      </span>
                    </div>

                    <div className="absolute bottom-6 left-6">
                      <div className="flex items-center gap-2 text-purple-300 text-xs font-bold mb-1">
                        <Clock size={12} /> 
                        <span className="capitalize">
                          {new Date(evento.fecha_inicio).toLocaleString('es-CO', { 
                            weekday: 'short', day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit'
                          }).replace('.', '')}
                        </span>
                      </div>
                      <h4 className="text-xl font-bold mb-1">{evento.titulo}</h4>
                      <div className="flex items-center gap-1 text-gray-400 text-sm italic">
                        <MapPin size={12} /> {evento.comercio_nombre}
                      </div>
                    </div>
                  </div>
             

    );
};