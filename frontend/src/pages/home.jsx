import { useEffect, useState } from "react";
import Header from "../components/HeaderUser";
import Sidebar from "../components/Sidebar";
import Cookies from "js-cookie";

function Home() {
    const [novedades, setNovedades] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const token = Cookies.get("token");

                if (!token) {
                    console.error("No hay token guardado");
                    return;
                }

                const res = await fetch("http://localhost:3000/api/products/getallproducts", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`, // ← TOKEN AQUÍ
                    },
                });

                if (!res.ok) {
                    console.error("Error de autenticación:", res.status);
                    return;
                }

                const data = await res.json();

                // Mezclar productos aleatoriamente
                const productosRandom = data.sort(() => Math.random() - 0.5);

                // Obtener solo 2 productos
                setNovedades(productosRandom.slice(0, 2));

            } catch (err) {
                console.error("Error al obtener productos", err);
            }
        };

        fetchProducts();
    }, []);

    return (
        <div className="min-h-screen bg-[#e5e5e5]">
            <Header />
            <Sidebar />

            <main className="ml-32 mt-20 p-8">
                {/* NOVEDADES */}
                <section className="mb-12">
                    <h2 className="text-3xl font-bold text-gray-800 mb-6">NOVEDADES</h2>

                    <div className="grid grid-cols-2 gap-6">

                        {novedades.length === 0 ? (
                            <p className="text-gray-600 text-lg">Cargando novedades...</p>
                        ) : (
                            novedades.map((p) => (
                                <div
                                    key={p._id}
                                    className="relative h-80 rounded-3xl overflow-hidden group cursor-pointer"
                                >
                                    <img
                                        src={p.image}
                                        alt={p.name}
                                        className="w-full h-full object-cover transition-transform group-hover:scale-105"
                                    />

                                    <div className="absolute top-6 right-6 bg-black/70 text-yellow-400 px-6 py-2 rounded-xl text-2xl font-bold">
                                        ${p.price}
                                    </div>

                                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-6">
                                        <h3 className="text-white text-xl font-light">
                                            {p.name}
                                        </h3>
                                    </div>
                                </div>
                            ))
                        )}

                    </div>
                </section>

                {/* NOTICIAS */}
                <section>
                    <h2 className="text-3xl font-bold text-gray-800 mb-6">NOTICIAS</h2>
                    <div className="grid grid-cols-2 gap-6">
                        <div className="relative h-64 rounded-3xl overflow-hidden group cursor-pointer">
                            <img src="/rtx-5000.jpg" className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-black/60 flex items-center justify-center p-8">
                                <h3 className="text-white text-xl font-light text-center">
                                    CES 2025: Nvidia presenta la serie GeForce RTX 5000
                                </h3>
                            </div>
                        </div>

                        <div className="relative h-64 rounded-3xl overflow-hidden group cursor-pointer">
                            <img src="/cpu-news.jpg" className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-black/60 flex items-center justify-center p-8">
                                <h3 className="text-white text-xl font-light text-center">
                                    Nuevos récords de GHz, pero el rendimiento sigue estancado
                                </h3>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}

export default Home;
