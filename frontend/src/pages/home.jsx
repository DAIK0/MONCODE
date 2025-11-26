import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

function home() {
    return (
        <div className="min-h-screen bg-[#e5e5e5]">
            <Header />
            <Sidebar />

            {/* Contenido principal */}
            <main className="ml-32 mt-20 p-8">
                {/* Sección NOVEDADES */}
                <section className="mb-12">
                    <h2 className="text-3xl font-bold text-gray-800 mb-6">NOVEDADES</h2>
                    <div className="grid grid-cols-2 gap-6">
                        {/* Tarjeta 1 - Intel i9 */}
                        <div className="relative h-80 rounded-3xl overflow-hidden group cursor-pointer">
                            <img
                                src="/intel-i9.jpg"
                                alt="Intel Core i9"
                                className="w-full h-full object-cover transition-transform group-hover:scale-105"
                            />
                            {/* Precio */}
                            <div className="absolute top-6 right-6 bg-black/70 text-yellow-400 px-6 py-2 rounded-xl text-2xl font-bold">
                                $10,659
                            </div>
                            {/* Descripción */}
                            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-6">
                                <h3 className="text-white text-xl font-light">NUEVO I9 14400K 6.2 HZ</h3>
                            </div>
                        </div>

                        {/* Tarjeta 2 - RAM Kingston */}
                        <div className="relative h-80 rounded-3xl overflow-hidden group cursor-pointer">
                            <img
                                src="/ram-kingston.jpg"
                                alt="RAM Kingston"
                                className="w-full h-full object-cover transition-transform group-hover:scale-105"
                            />
                            {/* Precio */}
                            <div className="absolute top-6 right-6 bg-black/70 text-yellow-400 px-6 py-2 rounded-xl text-2xl font-bold">
                                $1,250
                            </div>
                            {/* Descripción */}
                            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-6">
                                <h3 className="text-white text-base font-light">
                                    Memoria Ram Kingston Fury Beast 16Gb (2 X 8Gb) Ddr4 3200Mhz Dimm Cl16 Non-Ecc Rgb Xmp
                                </h3>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Sección NOTICIAS */}
                <section>
                    <h2 className="text-3xl font-bold text-gray-800 mb-6">NOTICIAS</h2>
                    <div className="grid grid-cols-2 gap-6">
                        {/* Noticia 1 - RTX 5000 */}
                        <div className="relative h-64 rounded-3xl overflow-hidden group cursor-pointer">
                            <img
                                src="/rtx-5000.jpg"
                                alt="RTX 5000"
                                className="w-full h-full object-cover transition-transform group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-black/60 flex items-center justify-center p-8">
                                <h3 className="text-white text-xl font-light text-center">
                                    CES 2025: Nvidia presenta la revolucionaria serie GeForce RTX 5000
                                </h3>
                            </div>
                        </div>

                        {/* Noticia 2 - CPU */}
                        <div className="relative h-64 rounded-3xl overflow-hidden group cursor-pointer">
                            <img
                                src="/cpu-news.jpg"
                                alt="CPU News"
                                className="w-full h-full object-cover transition-transform group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-black/60 flex items-center justify-center p-8">
                                <h3 className="text-white text-xl font-light text-center">
                                    Muchos núcleos y mucho MHz, pero el rendimiento de las CPU está estancado
                                </h3>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    )
}

export default home