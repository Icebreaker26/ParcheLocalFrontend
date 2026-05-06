import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, Zap, ArrowRight, Loader2 } from 'lucide-react';
import { AuthContext } from '../context/AuthContext'; // Ajusta esta ruta si tu contexto está en otra carpeta
import api from '../api'; // Importa la instancia de Axios que apunta a http://localhost:4000/api
import { NavBar } from './navbar';

const Login = () => {
  const [credenciales, setCredenciales] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [cargando, setCargando] = useState(false);
  
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleChange = (e) => {
    setCredenciales({
      ...credenciales,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setCargando(true);

    try {
      // Hacemos el POST usando tu instancia 'api'
      const res = await api.post('/auth/login', credenciales);

      // Axios automáticamente parsea el JSON y lo guarda en 'res.data'
      // Tu backend devuelve un objeto con la propiedad 'data' que contiene token y usuario
      const { token, usuario } = res.data.data;

      // Guardamos la sesión globalmente usando el contexto
      login(usuario, token);

      // Redirección según el rol
      if (usuario.rol === 'comercio') {
        navigate('/dashboard');
      } else {
        console.log(token);
        navigate('/');
      }

    } catch (err) {
      // Axios captura los errores HTTP (401, 404, 500) y los envía al catch.
      // err.response.data.message busca el mensaje exacto que enviaste desde Node.js
      setError(err.response?.data?.message || 'Error al iniciar sesión. Revisa tus credenciales.');
    } finally {
      setCargando(false);
    }
  };
  return (
    <div className="min-h-screen bg-[#0a0a0c] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Decoración de fondo */}
                              <NavBar />

      <div className="absolute top-1/4 -left-20 w-72 h-72 bg-pink-600/10 rounded-full blur-[100px]" />
      <div className="absolute bottom-1/4 -right-20 w-72 h-72 bg-purple-600/10 rounded-full blur-[100px]" />

      <div className="w-full max-w-md relative z-10">
        {/* Tarjeta de Login */}
        <div className="bg-[#111114] border border-white/5 rounded-[2rem] p-8 md:p-10 shadow-2xl">
          
          {/* Header del form */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-pink-500/10 text-pink-500 mb-6">
              <Zap size={24} className="fill-pink-500" />
            </div>
            <h2 className="text-3xl font-black text-white mb-2">Bienvenido de vuelta</h2>
            <p className="text-gray-400 text-sm">Ingresa a tu panel de control</p>
          </div>

          {/* Formulario */}
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Input Email */}
            <div className="space-y-2">
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
                  value={credenciales.email}
                  onChange={handleChange}
                  required
                  className="w-full bg-[#0a0a0c] border border-white/10 text-white rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:border-pink-500 transition-colors"
                  placeholder="ejemplo@correo.com"
                />
              </div>
            </div>

            {/* Input Password */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-bold text-gray-300 uppercase tracking-wider text-[10px]">
                  Contraseña
                </label>
                <a href="#" className="text-[10px] text-pink-500 hover:text-pink-400 font-bold">
                  ¿Olvidaste tu contraseña?
                </a>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-500">
                  <Lock size={18} />
                </div>
                <input
                  type="password"
                  name="password"
                  value={credenciales.password}
                  onChange={handleChange}
                  required
                  className="w-full bg-[#0a0a0c] border border-white/10 text-white rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:border-pink-500 transition-colors"
                  placeholder="••••••••"
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
              className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-400 hover:to-purple-500 text-white font-bold py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 transition-all disabled:opacity-70"
            >
              {cargando ? (
                <Loader2 className="animate-spin" size={20} />
              ) : (
                <>
                  Entrar al sistema
                  <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>

          {/* Footer del form */}
          <div className="mt-8 text-center border-t border-white/5 pt-6">
            <p className="text-gray-500 text-sm">
              ¿Aún no tienes cuenta?{' '}
              <Link to="/registro" className="text-white font-bold hover:text-pink-400 transition-colors">
                Regístrate aquí
              </Link>
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Login;