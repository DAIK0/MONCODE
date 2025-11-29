import { BrowserRouter, Routes, Route } from "react-router";
import RegisterPage from "./pages/register.jsx";
import LoginPage from "./pages/login.jsx";
import { AuthProvider } from "./context/Authcontext.jsx";
import HomePage from "./pages/home.jsx";
import HelpPage from "./pages/ayuda.jsx";
import Protected_Router from "./protected_Router.jsx";
import InventarioPage from "./pages/inventario.jsx";
import PerfilPage from "./pages/perfil.jsx";
import CarritoPage from "./pages/carrito.jsx";
import CategoriaPage from "./pages/categoria.jsx";
function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>

          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/ayuda" element={<HelpPage />} />
          <Route path="/categoria" element={<CategoriaPage />} />

          //rutas protegidas
          <Route element={<Protected_Router />}>
            <Route path="/carrito" element={<CarritoPage />} />
            <Route path="/perfil" element={<PerfilPage />} />
            <Route path="/inventario" element={<InventarioPage />} />

          </Route>

        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App;
