import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import api from '../api'; // Importa la instancia de Axios que apunta a http://localhost:4000/api
import { NavBar } from './navbar';
import { Footer } from './Footer';

const EventoDetalle = () => {
  const { id } = useParams();
  const [evento, setEvento] = useState(null);

  useEffect(() => {
    const fetchDetalle = async () => {
      try {
        // Tu endpoint de backend para obtener un solo evento
        const res = await api.get(`/eventos/${id}`);
        setEvento(res.data.data);
      } catch (err) {
        console.error("Error al cargar detalle", err);
      }
    };
    fetchDetalle();
  }, [id]);

  if (!evento) return <div className="text-white">Cargando parche...</div>;

  return (

    <div className="min-h-screen bg-[#0a0a0c] text-white font-sans selection:bg-purple-500/30">
              <NavBar />

    <div className="min-h-screen bg-[#0a0a0c] text-white p-8">
      {/* Aquí diseñas la vista completa: imagen grande, descripción larga, 
          mapa del local y botón de reserva/contacto */}

        <main className="pt-24 pb-12 px-4 max-w-7xl mx-auto"> 

      <h1 className="text-4xl font-black">{evento.titulo}</h1>
      <p className="mt-4 text-gray-400">{evento.descripcion}</p>
      {/* ... */}

        <Footer />
      </main>
    </div>
    </div>
  );
};

export default EventoDetalle;