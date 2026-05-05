import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom' // Cambiado a react-router-dom
import './index.css'
import App from './App.jsx'
import EventoDetalle from './components/EventoDetalle.jsx' // Asegúrate de importar el componente
import TerminosCondiciones from './components/TerminosCondiciones.jsx'
import SobreNosotros from './components/SobreNosotros.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        {/* Tu Home o App principal */}
        <Route path="/" element={<App />} />
        
        {/* Ruta para el detalle del evento */}
        <Route path="/evento/:id" element={<EventoDetalle />} />

        <Route path="/terminoscondiciones" element ={<TerminosCondiciones />} />

        <Route path="/sobrenosotros" element ={<SobreNosotros />} />


      </Routes>
    </BrowserRouter>
  </StrictMode>
)