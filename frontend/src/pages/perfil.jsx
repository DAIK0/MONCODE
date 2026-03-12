import { useUser } from "../context/useUser";
import { useAuth } from "../context/Authcontext";
import { useState } from "react";
import { User, Mail, Lock } from "lucide-react";
import { useNavigate } from "react-router";

const Perfil = () => {
  const { user, updateUser } = useUser();
  const { logOut } = useAuth();
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: user?.username || "",
    email: user?.email || "",
    password: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await updateUser(formData);

      if (!formData.username || !formData.email || !formData.password) {
        setMessage("Por favor, completa todos los campos");
        return;
      }

      setMessage("Perfil actualizado con éxito, se cerrará sesión para aplicar cambios.");


      setTimeout(() => {
        logOut();
        navigate("/login", {
          replace: true,
          state: { message: "Perfil actualizado, por favor inicia sesión nuevamente." }
        });
      }, 2000);


    } catch (error) {
      const errorMsg = error.response?.data?.message;

      if (errorMsg) {
        setMessage(errorMsg);
        return;
      }

      setMessage("Error al actualizar perfil");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4">

      <div className="w-full max-w-md">

        {/* TARJETA */}
        <div className="bg-white/10 backdrop-blur-xl border border-white/10 shadow-2xl rounded-3xl overflow-hidden">

          {/* HEADER */}
          <div className="flex flex-col items-center pt-10 pb-6">

            {/* AVATAR */}
            <div className="w-20 h-20 rounded-2xl bg-white/10 flex items-center justify-center shadow-lg mb-3">
              <User className="w-10 h-10 text-white" />
            </div>

            <h2 className="text-xl font-bold text-white">
              {user?.username}
            </h2>

            <p className="text-slate-400 text-sm">
              Edita tu información
            </p>

          </div>

          <div className="px-8 pb-8">

            {message && (
              <div className="bg-yellow-50 border border-yellow-300 text-yellow-800 p-4 rounded-xl text-sm mb-6 text-center">
                {message}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">

              {/* USERNAME */}
              <div>
                <label className="text-sm text-slate-300 font-medium">
                  Usuario
                </label>

                <div className="relative mt-1">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />

                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    placeholder="Tu usuario"
                    className="w-full bg-white/10 border border-white/10 text-white placeholder:text-slate-400 rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                  />
                </div>
              </div>

              {/* EMAIL */}
              <div>
                <label className="text-sm text-slate-300 font-medium">
                  Email
                </label>

                <div className="relative mt-1">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />

                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="correo@email.com"
                    className="w-full bg-white/10 border border-white/10 text-white placeholder:text-slate-400 rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                  />
                </div>
              </div>

              {/* PASSWORD */}
              <div>
                <label className="text-sm text-slate-300 font-medium">
                  Nueva contraseña
                </label>

                <div className="relative mt-1">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />

                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="********"
                    className="w-full bg-white/10 border border-white/10 text-white placeholder:text-slate-400 rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                  />
                </div>
              </div>

              {/* BOTON */}
              <button
                type="submit"
                className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition duration-200 shadow-lg hover:shadow-xl"
              >
                Actualizar perfil
              </button>

            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Perfil;