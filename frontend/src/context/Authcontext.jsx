import { createContext, useContext, useState, useEffect } from "react";
import { register, login } from "../api/auth";
import { set } from "zod";


export const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context)
        throw new Error("useAuth debe estar dentro de un AuthProvider");
    return context;
} //fin de useAuth

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [errors, setErrors] = useState([]);


    const signUp = async (user) => {
        try {
            const res = await register(user);
            console.log(res.data);
            setUser(res.data);
            setIsAuthenticated(true);
        } catch (error) {
            console.log(error);
        }
    }//fin de signUp

    const singIn = async (user) => {
        try {
            const res = await login(user);
            console.log(res.data);
            if (res.data.role === ROLE_ADMIN) {
                setIsAdmin(true);
            }
            setErrors([]);
            setUser(res.data);
            setIsAuthenticated(true);
        } catch (error) {
            const data = error.response?.data;
            const mensaje = data?.message || data?.errors?.[0] || "Error al iniciar sesión";
            setErrors([mensaje]);
        }
    }

    useEffect(() => {
        if (errors.length > 0) {
            const timer = setTimeout(() => {
                setErrors([]);
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [errors]);
    return (
        <AuthContext.Provider value={{
            user,
            isAuthenticated,
            errors,
            signUp,
            singIn

        }}>
            {children}
        </AuthContext.Provider>
    )
};//fin de AuthProvider

