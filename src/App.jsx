import React, { useState, useEffect } from 'react';
import { MessageCircle, MapPin, Clock, Star, Music, Utensils, Coffee, Hammer } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import api from './api'; // Importa la instancia de Axios que apunta a http://localhost:4000/api

// Utilidad para manejar clases de Tailwind
function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const App = () => {
  const [comercios, setComercios] = useState([]);
  const [categoriaActiva, setCategoriaActiva] = useState('Todos');

  // Mock de eventos para el carrusel superior
  const eventos = [
    { id: 1, titulo: "Noche Tropical en Vivo", local: "La Terraza Club", fecha: "Hoy - 10:00 PM", imagen: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&q=80&w=800" },
    { id: 2, titulo: "Reggaeton Old School", local: "La Terraza Club", fecha: "Sáb 10 May - 9:00 PM", imagen: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&q=80&w=800" }
  ];

  // Simulamos la carga de datos que vendrá de tu PostgreSQL
  /*useEffect(() => {
    const mockComercios = [
      { id: 1, nombre: "La Terraza Club", categoria: "Rumba", direccion: "Cra 8 #6-32, Centro", descripcion: "Discoteca tropical con shows en vivo todos los fines de semana.", es_premium: true, abierto: true, imagen: "https://images.unsplash.com/photo-1566737236500-c8ac43014a67?auto=format&fit=crop&q=80&w=600" },
      { id: 2, nombre: "El Puerto Burger", categoria: "Restaurantes", direccion: "Cl 9 #4-21, Malecón", descripcion: "Hamburguesas artesanales a la parrilla, frente al malecón.", es_premium: false, abierto: true, imagen: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?auto=format&fit=crop&q=80&w=600" },
      { id: 3, nombre: "Café del Río", categoria: "Café", direccion: "Cra 7 #5-10, Parque Principal", descripcion: "Café de origen, repostería casera y wifi rápido.", es_premium: true, abierto: false, imagen: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80&w=600" }
    ];
    setComercios(mockComercios);
  }, []);
*/

useEffect(() => {
    const cargarDatos = async () => {
      try {
        // Hacemos el fetch a tu backend de Node.js
        // Filtramos por municipio_id=1 (La Virginia)
        const response = await api.get('/comercios?municipio_id=1');
        
        const todosLosComercios = response.data.data;

        // Si hay una categoría activa (que no sea "Todos"), filtramos en el cliente
        if (categoriaActiva !== 'Todos') {
          const filtrados = todosLosComercios.filter(c => c.categoria === categoriaActiva);
          setComercios(filtrados);
        } else {
          setComercios(todosLosComercios);
        }
      } catch (error) {
        console.error("Error conectando con la API:", error);
      }
    };

    cargarDatos();
  }, [categoriaActiva]); // Se vuelve a ejecutar cuando cambias de categoría

  return (
    <div className="min-h-screen bg-[#0a0a0c] text-white font-sans selection:bg-purple-500/30">
      {/* Header */}
      <header className="fixed top-0 w-full z-50 bg-[#0a0a0c]/80 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center shadow-lg shadow-purple-500/20">
              <Music size={18} />
            </div>
            <div>
              <h1 className="text-xl font-bold leading-none">El Parche Local</h1>
            </div>
          </div>
          <button className="flex items-center gap-2 bg-white/5 hover:bg-white/10 px-3 py-1.5 rounded-full border border-white/10 transition-all">
            <MapPin size={14} className="text-purple-400" />
            <span className="text-sm font-medium">La Virginia</span>
          </button>
        </div>
      </header>

      <main className="pt-24 pb-12 px-4 max-w-7xl mx-auto">
        {/* Hero Section */}
        <section className="mb-12">
          <span className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 block">La Virginia · Risaralda</span>
          <h2 className="text-4xl md:text-6xl font-black mb-4 tracking-tight">
            Vive lo mejor de la <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">noche local</span>.
          </h2>
          <p className="text-gray-400 max-w-xl text-lg">Eventos, sitios para rumbear, comer y tomar café. Todo a un mensaje de distancia.</p>
        </section>

        {/* Eventos Slider */}
        <section className="mb-12">
          <div className="flex items-end justify-between mb-6">
            <div>
              <span className="text-purple-400 font-bold text-xs uppercase mb-1 block">Esta noche</span>
              <h3 className="text-2xl font-bold">Rumba <span className="text-pink-500">en vivo</span></h3>
            </div>
            <button className="text-gray-500 hover:text-white text-sm font-medium transition-colors">Ver todos →</button>
          </div>
          <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
            {eventos.map(evento => (
              <div key={evento.id} className="relative min-w-[320px] md:min-w-[450px] aspect-video rounded-3xl overflow-hidden group">
                <img src={evento.imagen} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt={evento.titulo} />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0c] via-[#0a0a0c]/20 to-transparent" />
                <div className="absolute top-4 left-4 flex gap-2">
                   <span className="bg-purple-600 text-[10px] font-bold px-3 py-1 rounded-full flex items-center gap-1 uppercase tracking-wider">
                     <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" /> Hoy
                   </span>
                </div>
                <div className="absolute bottom-6 left-6">
                  <div className="flex items-center gap-2 text-purple-300 text-xs font-bold mb-1">
                    <Clock size={12} /> {evento.fecha}
                  </div>
                  <h4 className="text-xl font-bold mb-1">{evento.titulo}</h4>
                  <div className="flex items-center gap-1 text-gray-400 text-sm italic">
                    <MapPin size={12} /> {evento.local}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Categorías */}
        <nav className="flex gap-2 overflow-x-auto mb-10 pb-2 scrollbar-hide">
          {['Todos', 'Rumba', 'Restaurantes', 'Café', 'Servicios'].map(cat => (
            <button
              key={cat}
              onClick={() => setCategoriaActiva(cat)}
              className={cn(
                "flex items-center gap-2 px-6 py-2.5 rounded-full border text-sm font-bold transition-all",
                categoriaActiva === cat 
                  ? "bg-purple-600 border-purple-500 text-white shadow-lg shadow-purple-500/20" 
                  : "bg-white/5 border-white/10 text-gray-400 hover:bg-white/10"
              )}
            >
              {cat === 'Rumba' && <Music size={14}/>}
              {cat === 'Restaurantes' && <Utensils size={14}/>}
              {cat === 'Café' && <Coffee size={14}/>}
              {cat === 'Servicios' && <Hammer size={14}/>}
              {cat}
            </button>
          ))}
        </nav>

        {/* Listado de Comercios */}
        <section>
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-2xl font-bold italic">Comercios cerca de ti</h3>
            <span className="text-gray-600 text-sm font-medium">{comercios.length} lugares</span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {comercios.map(negocio => (
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
                    {negocio.categoria}
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
                    <MessageCircle size={20} fill="black" />
                    Contactar por WhatsApp
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default App;