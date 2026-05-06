import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { User, Mail, Lock, Rocket, ArrowRight, Loader2, CheckCircle2 } from 'lucide-react';
import api from '../api'; 
import { NavBar } from './navbar';

const Registro = () => {
  const [formulario, setFormulario] = useState({ nombre: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [exito, setExito] = useState(false);
  const [cargando, setCargando] = useState(false);
  
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormulario({
      ...formulario,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setCargando(true);

    try {
      // Apuntamos a tu endpoint de registro
      await api.post('/auth/registro', formulario);

      // Si pasa por aquí, fue un status 201 (éxito)
      setExito(true);
      
      // Esperamos 2 segundos para que el usuario lea el mensaje y lo enviamos al login
      setTimeout(() => {
        navigate('/login');
      }, 2000);

    } catch (err) {
      // Axios captura los errores 400 y 500.
      // Aquí atrapará tu 'EMAIL_DUPLICADO' o 'Email y password son obligatorios'
      setError(err.response?.data?.message || 'Error al conectar con el servidor.');
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0c] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Decoración de fondo (Tonos morados/azules para diferenciarlo un poco del login) */}
                                    <NavBar />

      <div className="absolute top-1/4 -right-20 w-72 h-72 bg-indigo-600/10 rounded-full blur-[100px]" />
      <div className="absolute bottom-1/4 -left-20 w-72 h-72 bg-purple-600/10 rounded-full blur-[100px]" />

      <div className="w-full max-w-md relative z-10">
        <div className="bg-[#111114] border border-white/5 rounded-[2rem] p-8 md:p-10 shadow-2xl">
          
          {/* Header del form */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-purple-500/10 text-purple-500 mb-6 shadow-lg shadow-purple-500/20">
              <Rocket size={24} className="fill-purple-500/50" />
            </div>
            <h2 className="text-3xl font-black text-white mb-2">Únete al Parche</h2>
            <p className="text-gray-400 text-sm">Crea tu cuenta y descubre qué hay pa' hacer</p>
          </div>

          {/* Mensaje de Éxito */}
          {exito ? (
            <div className="flex flex-col items-center justify-center py-8 space-y-4 animate-fade-in">
              <CheckCircle2 size={48} className="text-green-500" />
              <h3 className="text-xl font-bold text-white text-center">¡Cuenta creada!</h3>
              <p className="text-gray-400 text-sm text-center">
                Te estamos redirigiendo al inicio de sesión...
              </p>
            </div>
          ) : (
            /* Formulario */
            <form onSubmit={handleSubmit} className="space-y-5">
              
              {/* Input Nombre */}
              <div className="space-y-1.5">
                <label className="text-sm font-bold text-gray-300 uppercase tracking-wider text-[10px]">
                  Nombre o Apodo
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-500">
                    <User size={18} />
                  </div>
                  <input
                    type="text"
                    name="nombre"
                    value={formulario.nombre}
                    onChange={handleChange}
                    required
                    className="w-full bg-[#0a0a0c] border border-white/10 text-white rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:border-purple-500 transition-colors"
                    placeholder="¿Cómo te decimos?"
                  />
                </div>
              </div>

              {/* Input Email */}
              <div className="space-y-1.5">
                <label className="text-sm font-bold text-gray-300 uppercase tracking-wider text-[10px]">
                  Correo Electrónico
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-500">
                    <Mail size={18} />
                  </div>
                  <input
                    type="email"
                    name="email"
                    value={formulario.email}
                    onChange={handleChange}
                    required
                    className="w-full bg-[#0a0a0c] border border-white/10 text-white rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:border-purple-500 transition-colors"
                    placeholder="ejemplo@correo.com"
                  />
                </div>
              </div>

              {/* Input Password */}
              <div className="space-y-1.5">
                <label className="text-sm font-bold text-gray-300 uppercase tracking-wider text-[10px]">
                  Contraseña
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-500">
                    <Lock size={18} />
                  </div>
                  <input
                    type="password"
                    name="password"
                    value={formulario.password}
                    onChange={handleChange}
                    required
                    minLength="6"
                    className="w-full bg-[#0a0a0c] border border-white/10 text-white rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:border-purple-500 transition-colors"
                    placeholder="Mínimo 6 caracteres"
                  />
                </div>
              </div>

              {/* Mensaje de Error */}
              {error && (
                <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-500 text-sm text-center">
                  {error}
                </div>
              )}

              {/* Botón Submit */}
              <button
                type="submit"
                disabled={cargando}
                className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-purple-500/20 disabled:opacity-70 mt-4"
              >
                {cargando ? (
                  <Loader2 className="animate-spin" size={20} />
                ) : (
                  <>
                    Crear cuenta
                    <ArrowRight size={18} />
                  </>
                )}
              </button>
            </form>
          )}

          {/* Footer del form */}
          {!exito && (
            <div className="mt-8 text-center border-t border-white/5 pt-6">
              <p className="text-gray-500 text-sm">
                ¿Ya tienes una cuenta?{' '}
                <Link to="/login" className="text-white font-bold hover:text-purple-400 transition-colors">
                  Ingresa aquí
                </Link>
              </p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default Registro;