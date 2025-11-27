import { useForm } from "react-hook-form";
import { useAuth } from "../context/Authcontext";
import { useEffect, useState } from "react";
import { useNavigate, Link } from 'react-router';
import { zodResolver } from '@hookform/resolvers/zod'
import { loginSchema } from '../Schema/LoginSchema';
import { IoPersonAdd, IoLogIn, IoEyeSharp, IoEyeOffSharp } from 'react-icons/io5';


function Login() {
    const { register, handleSubmit,
        formState: { errors }
    } = useForm({
        resolver: zodResolver(loginSchema)
    });

    const { singIn, isAuthenticated, errors: loginErrors } = useAuth();
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(showPassword ? false : true);
    }


    useEffect(() => {

        if (isAuthenticated) {
            console.log("Sesion iniciada: ", isAuthenticated);
            navigate("/home");
        }
    }, [isAuthenticated]);//Fin de useEffect

    const onSubmit = async (values) => {
        console.log(values);
        singIn(values);
    }//Fin de onSubmit

    return (
        <div className="min-h-screen bg-[#4a4a4a] flex">
            {/* Lado izquierdo - Imagen de fondo y logo */}
            <div className="hidden lg:flex lg:w-1/2 relative">
                <img src="/images/image.png" alt="Background" className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/40" />

                {/* Logo MOON CODE */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                        <div className="mb-4 flex justify-center">
                            <div className="w-48 h-48 bg-[#5a5a5a]/90 rounded-lg flex items-center justify-center backdrop-blur-sm">
                                <div className="relative">
                                    <div className="text-[120px] font-bold text-gray-300">C</div>
                                    <div className="absolute top-8 left-8">
                                        <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center">
                                            <div className="text-4xl">🌙</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <h1 className="text-4xl font-bold text-white tracking-wide">
                            MOON <span className="font-light">CODE</span>
                        </h1>
                    </div>
                </div>
            </div>

            {/* Lado derecho - Formulario */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
                <div className="w-full max-w-md">
                    <h2 className="text-4xl font-light text-white mb-12 text-center lg:text-right">Iniciar Sesión </h2>
                    {loginErrors.length > 0 && (
                        loginErrors.map((error, i) => (
                            <div key={i} className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-full shadow-md w-fit mx-auto">
                                <span className="text-lg"><IoPersonAdd /></span>
                                <span className="font-semibold text-sm">{error} </span>
                            </div>
                        ))

                    )}
                    <form onSubmit={handleSubmit(onSubmit)}
                        className="space-y-6">
                        <label>Email</label>
                        {/* Campo Email */}
                        <div className="relative">
                            <input
                                {...register("email", { required: true })}
                                type="email"
                                placeholder="email"
                                style={{
                                    border: errors.email ? '1px solid red' : '1px solid #d1d5db',
                                }}
                                className="w-full px-4 py-3 bg-[#d1d5db] text-gray-700 placeholder-gray-500 rounded-full focus:outline-none focus:ring-2 focus:ring-[#8b7355]"
                            />
                            {
                                errors.email && (
                                    <p className="text-blue-500">{errors.email.message}</p>
                                )

                            }

                        </div>

                        {/* Campo Contraseña */}
                        <div className="relative">
                            <input
                                {...register("password", { required: true })}
                                type={showPassword ? "text" : "password"}
                                placeholder="Contraseña"
                                style={{
                                    border: errors.password ? '1px solid red' : '1px solid #d1d5db',
                                }}
                                className="w-full px-4 py-3 bg-[#d1d5db] text-gray-700 placeholder-gray-500 rounded-full focus:outline-none focus:ring-2 focus:ring-[#8b7355]"
                            />
                            {

                                showPassword ? <IoEyeSharp size={30} className="absolute mr-2 w-10"
                                    onClick={togglePasswordVisibility} /> :
                                    <IoEyeOffSharp size={30} className="absolute right-3 top-3 cursor-pointer"
                                        onClick={togglePasswordVisibility} />
                            }
                            {
                                errors.password && (
                                    <span className="text-blue-500">{errors.password.message}</span>
                                )
                            }
                        </div>
                        {/* Botón Registrarse */}
                        <div className="flex justify-center pt-4">
                            <button
                                type="submit"
                                className="px-12 py-3 bg-[#8b7355] text-white rounded-full hover:bg-[#7a6449] transition-colors font-medium"
                            >
                                Iniciar Sesión
                            </button>
                        </div>
                    </form>

                    {/* Link Iniciar Sesión */}
                    <div className="text-center mt-8">
                        <span className="text-gray-300 text-sm">
                            ¿No tienes una cuenta? </span>
                        <Link to="/register" className="text-[#4ade80] hover:text-[#3bc970] text-sm font-medium">
                            Registrarse
                            <IoLogIn size={30} className="mx-1" />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login