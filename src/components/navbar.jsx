import { MessageCircle, MapPin, Clock, Star, Music, Utensils, Coffee, Hammer } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { Zap, Timer} from 'lucide-react'; // Iconos llamativos
import {  Mail} from 'lucide-react';
import { Link } from 'react-router-dom';


export const NavBar = () => {


    return(
        <>
        {/* Header */}
              <header className="fixed top-0 w-full z-50 bg-[#0a0a0c]/80 backdrop-blur-md border-b border-white/5">
                <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    
                    <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center shadow-lg shadow-purple-500/20">
                       <Link to="/" >   
                      <Music size={18} />
                      </Link>

                    </div>
                    <div>
                        <Link to="/" > 
                      <h1 className="text-xl font-bold leading-none">El Parche Local</h1>
                      </Link>
                    </div>
                  </div>
                  <button className="flex items-center gap-2 bg-white/5 hover:bg-white/10 px-3 py-1.5 rounded-full border border-white/10 transition-all">
                    <MapPin size={14} className="text-purple-400" />
                    <span className="text-sm font-medium">La Virginia</span>
                  </button>
                </div>
              </header>
    
        </>
    );
};