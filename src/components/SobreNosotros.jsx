import { Sparkles, Map, Heart, Coffee } from 'lucide-react';
import { NavBar } from './navbar';
import { Footer } from './Footer';

const SobreNosotros = () => {
  return (

       
    <section className="py-24 bg-[#0a0a0c] relative overflow-hidden">
    <div className="min-h-screen bg-[#0a0a0c] text-white font-sans selection:bg-purple-500/30">
                        <NavBar />
        
      {/* Luces de ambiente nocturno de fondo */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px] -z-10" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-pink-600/10 rounded-full blur-[120px] -z-10" />
      
      <div className="max-w-7xl mx-auto px-4">
        {/* Encabezado: El Problema y la Solución */}
        <div className="text-center mb-20">
          <span className="text-indigo-400 font-bold text-xs uppercase tracking-[0.4em] mb-4 block">Hecho por y para parceros</span>
          <h2 className="text-4xl md:text-6xl font-black text-white mb-8 leading-tight">
            ¿Cansado de no saber <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-500">
              a dónde salir hoy?
            </span>
          </h2>
          <p className="text-gray-400 max-w-3xl mx-auto text-xl leading-relaxed">
            Todos hemos estado ahí: viernes por la noche, el grupo de WhatsApp activo y nadie sabe a dónde ir. 
            En <strong>Parche Local</strong>, somos un equipo de apasionados por la cultura y la vida nocturna que decidió 
            mapear cada rincón de Colombia para que tu única preocupación sea disfrutar.
          </p>
        </div>

        {/* Los Pilares de la Experiencia */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-24">
          {[
            {
              icon: <Map className="text-blue-400" />,
              title: "Cero fronteras",
              desc: "Desde el pueblo más pequeño hasta la ciudad más grande. Si hay un parche, está aquí."
            },
            {
              icon: <Sparkles className="text-purple-400" />,
              title: "Curaduría real",
              desc: "Nuestro equipo revisa cada detalle para que lo que veas en la pantalla sea lo que encuentres al llegar."
            },
            {
              icon: <Coffee className="text-pink-400" />,
              title: "Economía Local",
              desc: "Apoyamos al negocio de barrio, a la terraza nueva y al evento cultural que merece ser visto."
            },
            {
              icon: <Heart className="text-red-400" />,
              title: "Pasión por parchar",
              desc: "No somos una base de datos fría; somos gente que, como tú, ama una buena charla y un buen ambiente."
            }
          ].map((pilar, index) => (
            <div key={index} className="bg-[#111114] p-8 rounded-[2rem] border border-white/5 hover:bg-[#16161a] transition-all">
              <div className="mb-6">{pilar.icon}</div>
              <h3 className="text-lg font-bold text-white mb-2">{pilar.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{pilar.desc}</p>
            </div>
          ))}
        </div>

        {/* El Equipo y la Filosofía */}
        <div className="bg-gradient-to-br from-[#16161a] to-[#0a0a0c] p-10 md:p-16 rounded-[3rem] border border-white/10 text-center relative overflow-hidden">
          <div className="relative z-10">
            <h4 className="text-3xl font-bold text-white mb-6">Un equipo pensando en tu noche</h4>
            <p className="text-gray-400 text-lg max-w-4xl mx-auto mb-8 leading-relaxed">
              Detrás de cada línea de código y de cada promo flash, hay un grupo de ingenieros, diseñadores y 
              "parchadores profesionales" trabajando para que nunca más vuelvas a decir <em>"no hay nada que hacer"</em>. 
              Nacimos en el corazón de Colombia y hoy trabajamos para conectar a todo el país, un local a la vez.
            </p>
           


                            {/* --- Efecto de Escaneo de Parches --- */}
                    <div className="relative inline-flex items-center gap-4 px-8 py-4 bg-white/5 rounded-full border border-white/10 overflow-hidden group">
                    
                    {/* Animación de "Barrido" (Línea de escáner) */}
                    <div className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-indigo-500/10 to-transparent -skew-x-12 animate-scan" />

                    {/* Iconos que pulsan simulando nodos/parches */}
                    <div className="flex -space-x-2">
                        <div className="w-2 h-2 bg-indigo-500 rounded-full animate-ping" />
                        <div className="w-2 h-2 bg-purple-500 rounded-full animate-ping [animation-delay:0.2s]" />
                        <div className="w-2 h-2 bg-pink-500 rounded-full animate-ping [animation-delay:0.4s]" />
                    </div>

                    <span className="relative z-10 text-sm font-mono text-gray-300 tracking-tight flex items-center gap-2">
                        <span className="flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-50"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                        </span>
                                    Monitoreando parches en tiempo real por toda Colombia

                    </span>

                    
                    </div>


          </div>
        </div>




      </div>
                  </div>
          <Footer />

    </section>

  );
};

export default SobreNosotros;