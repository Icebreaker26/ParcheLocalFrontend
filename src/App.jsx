import React, { useState, useEffect } from 'react';
import { MessageCircle, MapPin, Clock, Star, Music, Utensils, Coffee, Hammer } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import api from './api'; // Importa la instancia de Axios que apunta a http://localhost:4000/api
import { Zap, Timer} from 'lucide-react'; // Iconos llamativos
import {  Mail} from 'lucide-react';

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
                <div key={evento.id} className="relative min-w-[320px] md:min-w-[450px] aspect-video rounded-3xl overflow-hidden group">
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
                    Contactar por WhatsApp
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>


        
      {/* --- SECCIÓN DE MARKETING / CAPTACIÓN --- */}
<section className="mb-16 mt-8">
  <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-purple-900 via-indigo-900 to-black p-8 md:p-12 border border-white/10">
    
    {/* Decoración abstracta de fondo */}
    <div className="absolute -right-10 -top-10 w-64 h-64 bg-pink-500/20 rounded-full blur-3xl" />
    <div className="absolute -left-10 -bottom-10 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl" />

    <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
      <div className="max-w-2xl text-center md:text-left">
        <h3 className="text-3xl md:text-4xl font-black text-white mb-4 leading-tight">
          ¿Aún no estás publicando <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-400">
            tus parches?
          </span>
        </h3>
        <p className="text-gray-300 text-lg">
          Únete a la plataforma que mueve la movida en La Virginia. Haz que tu negocio sea el centro de atención esta noche.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <a 
          href="https://wa.me/573217467837" // Reemplaza con tu número
          target="_blank"
          rel="noopener noreferrer"
          className="px-8 py-4 bg-white text-black font-bold rounded-full hover:bg-pink-500 hover:text-white transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2 shadow-xl shadow-white/5"
        >
          Contactar por WhatsApp
        </a>
        <button className="px-8 py-4 bg-transparent border border-white/20 text-white font-bold rounded-full hover:bg-white/5 transition-all">
          Saber más
        </button>
      </div>
    </div>
  </div>
</section>


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
              <li><a href="#" className="text-gray-500 hover:text-purple-400 transition-colors">Publicar mi negocio</a></li>
              <li><a href="#" className="text-gray-500 hover:text-purple-400 transition-colors">Términos y condiciones</a></li>
              <li><a href="#" className="text-gray-500 hover:text-purple-400 transition-colors">Privacidad</a></li>
              <li><a href="#" className="text-gray-500 hover:text-purple-400 transition-colors">Preguntas frecuentes</a></li>
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
      </main>



    </div>




  );
};




export default App;