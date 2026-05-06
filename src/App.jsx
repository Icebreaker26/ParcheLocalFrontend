import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { MessageCircle, MapPin, Clock, Star, Music, Utensils, Coffee, Hammer, Zap, Timer, Mail } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

//SERVICIO DEL API
import api from './api'; // Importa la instancia de Axios que apunta a http://localhost:4000/api

//COMPONENTES
import { NavBar } from './components/navbar';
import { Footer } from './components/Footer';
import BotonFavorito from './components/BotonFavorito';
import { Marketing } from './components/Marketing';
import { ComercioCard } from './components/ComercioCard';
import { ProximosEventosCard } from './components/ProximosEventosCard';
import { PromoFlashCard } from './components/PromoFlashCard';
import { ParcheVivoCard } from './components/ParcheVivoCard';

// Utilidad para manejar clases de Tailwind
function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const App = () => {
  const [comercios, setComercios] = useState([]);
  const [categoriaActiva, setCategoriaActiva] = useState('Todos');

  const [eventos, setEventos] = useState([]);
  const [cargandoEventos, setCargandoEventos] = useState(true);

  // Mock de eventos para el carrusel superior
  /*const eventos = [
    { id: 1, titulo: "Noche Tropical en Vivo", local: "La Terraza Club", fecha: "Hoy - 10:00 PM", imagen: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&q=80&w=800" },
    { id: 2, titulo: "Reggaeton Old School", local: "La Terraza Club", fecha: "Sáb 10 May - 9:00 PM", imagen: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&q=80&w=800" }
  ];*/

  useEffect(() => {
  const cargarEventos = async () => {
    try {
      setCargandoEventos(true);
      // Petición a la ruta que definiste: router.get('/', obtenerEventos);
      const response = await api.get('/eventos'); 
      
      // Acceso a la data siguiendo tu estándar de respuesta
      const eventosBackend = response.data?.data || [];
      
      setEventos(eventosBackend);
    } catch (error) {
      console.error("Error cargando eventos de Parche Local:", error);
      setEventos([]); 
    } finally {
      setCargandoEventos(false);
    }
  };

  cargarEventos();
}, []); // Se ejecuta una sola vez al cargar la app


useEffect(() => {
  const cargarDatos = async () => {
    try {
      // 1. Petición al backend usando el municipio_id=1
      const response = await api.get('/comercios?municipio_id=1');
      
      // 2. Acceso seguro a la data (usando el formato de tu controlador: response.data.data)
      const todosLosComercios = response.data?.data || [];

      // 3. Filtrado lógico
      if (categoriaActiva !== 'Todos') {
        // Importante: c.categoria viene del JOIN que hiciste en el SQL (cat.nombre as categoria)
        const filtrados = todosLosComercios.filter(c => 
          c.categoria?.toLowerCase() === categoriaActiva.toLowerCase()
        );
        setComercios(filtrados);
      } else {
        setComercios(todosLosComercios);
      }
    } catch (error) {
      // Logueamos el error pero mantenemos el estado como array vacío para evitar el crash de .length
      console.error("Error conectando con la API de Parche Local:", error);
      setComercios([]); 
    }
  };

  cargarDatos();
}, [categoriaActiva]); // Se dispara cada vez que el usuario toca una categoría en el frontend

const esHoy = (fechaISO) => {
  const fechaEvento = new Date(fechaISO);
  const hoy = new Date();
  
  return (
    fechaEvento.getDate() === hoy.getDate() &&
    fechaEvento.getMonth() === hoy.getMonth() &&
    fechaEvento.getFullYear() === hoy.getFullYear()
  );
};

const [promociones, setPromociones] = useState([]);

useEffect(() => {
  const cargarPromociones = async () => {
    try {
      // Llamada al endpoint que definiste en el router
      const response = await api.get('/eventos/promociones/flash');
      // Accedemos a la data (asumiendo tu estándar response.data.data)
      const promosActivas = response.data?.data || [];
      
      setPromociones(promosActivas);
    } catch (error) {
      console.error("Error cargando Promociones Flash:", error);
      setPromociones([]);
    }
  };

  cargarPromociones();
  
  // Opcional: Refrescar cada 5 minutos para ver si hay promos nuevas
  const intervalo = setInterval(cargarPromociones, 300000);
  return () => clearInterval(intervalo);
}, []);


  return (
      <div className="min-h-screen bg-[#0a0a0c] text-white font-sans selection:bg-purple-500/30">
      {/* Header */}
        
          <NavBar />
     
      <main className="pt-24 pb-12 px-4 max-w-7xl mx-auto">
        {/* Hero Section */}
        <section className="mb-12">
          <span className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 block">La Virginia · Risaralda</span>
          <h2 className="text-4xl md:text-6xl font-black mb-4 tracking-tight">
            Vive lo mejor de la <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">noche local</span>.
          </h2>
          <p className="text-gray-400 max-w-xl text-lg">Eventos, sitios para rumbear, comer y tomar café. Todo a un mensaje de distancia.</p>
        </section>



         {/* --- SECCIÓN 1: EVENTOS DE HOY (Slider con Aviso) --- */}
        <section className="mb-12">
          <div className="flex items-end justify-between mb-6">
            <div>
              <span className="text-purple-400 font-bold text-xs uppercase mb-1 block">Esta noche</span>
              <h3 className="text-2xl font-bold">Parches <span className="text-pink-500">en vivo</span></h3>
            </div>
            <button className="text-gray-500 hover:text-white text-sm font-medium transition-colors">Ver todos →</button>
          </div>
          
          <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
            {/* Primero filtramos para saber si hay algo que mostrar */}
            {eventos.filter(evento => esHoy(evento.fecha_inicio)).length > 0 ? (
              eventos
                .filter(evento => esHoy(evento.fecha_inicio))
                .map(evento => (
                  <ParcheVivoCard evento={evento} key={evento.id} />
                   
                ))
            ) : (
              /* AVISO: Cuando no hay eventos hoy */
              <div className="w-full flex flex-col items-center justify-center py-12 border-2 border-dashed border-gray-800 rounded-3xl bg-[#16161a]/30">
                <div className="text-gray-600 mb-2">
                  <Clock size={32} strokeWidth={1} />
                </div>
                <p className="text-gray-500 text-sm italic">No hay parches programados para hoy...</p>
                <p className="text-gray-700 text-xs uppercase font-bold mt-1">¡Mira los próximos eventos abajo!</p>
              </div>
            )}
          </div>
        </section>




          {/* --- SECCIÓN: PROMOCIONES FLASH --- */}
        <section className="mb-12">
          <div className="flex items-end justify-between mb-6">
            <div>
              <span className="text-amber-400 font-bold text-xs uppercase mb-1 block flex items-center gap-1">
                <Zap size={14} className="fill-amber-400" /> Ofertas limitadas
              </span>
              <h3 className="text-2xl font-bold">Promos <span className="text-amber-500 italic">Flash</span></h3>
            </div>
          </div>

          <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
            {promociones.length > 0 ? (
              promociones.map((promo) => (
                <PromoFlashCard promo={promo}
                  key={promo.id} 
                />
                
              ))
            ) : (
              /* Aviso cuando no hay promociones */
              <div className="w-full py-8 text-center border-2 border-dashed border-gray-800 rounded-3xl opacity-50">
                <p className="text-gray-500 text-sm italic">No hay ofertas flash en este momento...</p>
              </div>
            )}
          </div>
        </section>


        {/* --- SECCIÓN 2: PRÓXIMOS EVENTOS (Slider Idéntico) --- */}
        <section className="mb-12">
          <div className="flex items-end justify-between mb-6">
            <div>
              <span className="text-purple-400 font-bold text-xs uppercase mb-1 block">Agéndate</span>
              <h3 className="text-2xl font-bold">Próximos <span className="text-purple-500">Eventos</span></h3>
            </div>
          </div>
          
          <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
            {eventos
              .filter(evento => !esHoy(evento.fecha_inicio)) // Filtro para NO es Hoy
              .sort((a, b) => new Date(a.fecha_inicio) - new Date(b.fecha_inicio)) // Orden cronológico
              .map(evento => (
                <ProximosEventosCard key={evento.id} evento={evento} />
                  
              ))}
          </div>
        </section>


        {/* Categorías */}
        <nav className="flex gap-2 overflow-x-auto mb-10 pb-2 scrollbar-hide">
          {['Todos', 'Rumba y Discotecas', 'Gastronomía', 'Eventos y Cultura'].map(cat => (
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
              {cat === 'Rumba y Discotecas' && <Music size={14}/>}
              {cat === 'Gastronomía' && <Utensils size={14}/>}
              {cat === 'Eventos y Cultura' && <Coffee size={14}/>}
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
              <ComercioCard 
                key={negocio.id}
                negocio={negocio} 
                className={cn(
                  "group relative bg-[#131316] rounded-[2rem] overflow-hidden border transition-all duration-500 hover:translate-y-[-4px]",
                  negocio.es_premium ? "border-amber-500/30 shadow-xl shadow-amber-500/5" : "border-white/5"
                )}
              />
                
            ))}
          </div>
        </section>

        
            <Marketing />
            <Footer />
      </main>
    </div>

  );
};


export default App;