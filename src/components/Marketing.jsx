export const Marketing = () => {


    return(


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

    )

};