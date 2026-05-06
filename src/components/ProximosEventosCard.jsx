import { Link } from 'react-router-dom';
import { MessageCircle, MapPin, Clock, Star, Music, Utensils, Coffee, Hammer } from 'lucide-react';


export const ProximosEventosCard = ({evento})  => {


    return(

                    <div key={evento.id} className="relative min-w-[320px] md:min-w-[450px] aspect-video rounded-3xl overflow-hidden group">
                      <Link 
                          to={`/evento/${evento.id}`} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="absolute inset-0 z-20" // Un overlay invisible para que toda la tarjeta sea clickable
                        />
                  <img src={evento.imagen_url} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt={evento.titulo} />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0c] via-[#0a0a0c]/20 to-transparent" />
                  
                  {/* Aquí podrías poner un badge de precio en lugar del de "Hoy" */}
                  <div className="absolute top-4 left-4">
                    <span className="bg-gray-900/80 backdrop-blur-sm text-[10px] font-bold px-3 py-1 rounded-full text-white uppercase tracking-wider border border-white/10">
                      {evento.precio_cover > 0 ? `$${Number(evento.precio_cover).toLocaleString('es-CO')}` : 'Entrada Libre'}
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