import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom' // Cambiado a react-router-dom
import './index.css'
import App from './App.jsx'
import EventoDetalle from './components/EventoDetalle.jsx' // Asegúrate de importar el componente
import TerminosCondiciones from './components/TerminosCondiciones.jsx'
import SobreNosotros from './components/SobreNosotros.jsx'
import Registro from './components/Registro.jsx'
import { AuthProvider } from './context/AuthContext.jsx' // <-- Importas el Provider
import Login from './components/Login.jsx'
import Perfil from './components/Perfil.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
        <BrowserRouter>
    <AuthProvider>
      <Routes>
        {/* Tu Home o App principal */}
        <Route path="/" element={<App />} />
        
        {/* Ruta para el detalle del evento */}
        <Route path="/evento/:id" element={<EventoDetalle />} />

        <Route path="/terminoscondiciones" element ={<TerminosCondiciones />} />

        <Route path="/sobrenosotros" element ={<SobreNosotros />} />

        <Route path="/login" element ={<Login />} />

        <Route path="/registro" element ={<Registro />} />

        <Route path="/perfil" element ={<Perfil />} />





      </Routes>
    </AuthProvider>
        </BrowserRouter>

  </StrictMode>
)