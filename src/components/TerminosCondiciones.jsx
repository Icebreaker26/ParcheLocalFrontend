import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import api from '../api'; // Importa la instancia de Axios que apunta a http://localhost:4000/api
import { NavBar } from './navbar';
import { Footer } from './Footer';

const TerminosCondiciones = () => {
  const { id } = useParams();
  const [evento, setEvento] = useState(null);

 
  return (

    <div className="min-h-screen bg-[#0a0a0c] text-white font-sans selection:bg-purple-500/30">
              <NavBar />

    <div className="min-h-screen bg-[#0a0a0c] text-white p-8">
      {/* Aquí diseñas la vista completa: imagen grande, descripción larga, 
          mapa del local y botón de reserva/contacto */}

       <main className="pt-24 pb-12 px-4 max-w-4xl mx-auto">
  <h1 className="text-4xl font-black mb-8 bg-gradient-to-r from-purple-500 to-indigo-400 bg-clip-text text-transparent">
    TÉRMINOS Y CONDICIONES
  </h1>

  <div className="space-y-8 text-gray-300 leading-relaxed">
    <section>
      <h2 className="text-xl font-bold text-white mb-3">1. Aceptación de los Términos</h2>
      <p>
        Al acceder y utilizar la plataforma Parche Local, el usuario acepta cumplir con los presentes términos y condiciones. Esta plataforma actúa como un puente digital entre los comercios locales y los usuarios.
      </p>
    </section>

    <section>
      <h2 className="text-xl font-bold text-white mb-3">2. Uso de la Plataforma</h2>
      <p>
        El usuario se compromete a utilizar el sitio para fines legales. Queda prohibido el uso de la plataforma para publicar contenido falso, engañoso o que atente contra la integridad de los comercios locales o de terceros.
      </p>
    </section>

    <section>
      <h2 className="text-xl font-bold text-white mb-3">3. Responsabilidad de Contenido</h2>
      <p>
        Parche Local no es responsable directo por la calidad de los productos, servicios o la veracidad de los eventos publicados por los comercios. Cada establecimiento es responsable de la información que suministra y del cumplimiento de sus ofertas.
      </p>
    </section>

    <section>
      <h2 className="text-xl font-bold text-white mb-3">4. Propiedad Intelectual</h2>
      <p>
        El diseño, código fuente y logotipos de la plataforma son propiedad exclusiva de sus desarrolladores. Los logos e imágenes de los comercios pertenecen a sus respectivos dueños.
      </p>
    </section>

    <section>
      <h2 className="text-xl font-bold text-white mb-3">5. Privacidad y Datos</h2>
      <p>
        La información recopilada se utilizará exclusivamente para mejorar la experiencia del usuario y facilitar el contacto con los locales. No compartiremos datos personales con terceros sin consentimiento previo, cumpliendo con la normativa de protección de datos vigente en Colombia.
      </p>
    </section>

    <section className="pt-6 border-t border-white/10">
      <p className="text-sm italic">
        Última actualización: Mayo de 2026. Parche Local se reserva el derecho de modificar estos términos en cualquier momento para ajustarse a nuevas funcionalidades o legislaciones.
      </p>

    </section>

    
    <section className="pt-6 border-t border-white/10">
      

    </section>
  </div>
          <Footer />

</main>

    </div>
    </div>
  );
};

export default TerminosCondiciones;