import { BrowserRouter, Routes, Route } from "react-router";
import RegisterPage from "./pages/register.jsx";
import LoginPage from "./pages/login.jsx";
import { AuthProvider } from "./context/Authcontext.jsx";
import HomePage from "./pages/home.jsx";
import Protected_Router from "./protected_Router.jsx";
function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>

          <Route path="/" element={<h1>Home</h1>} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/home" element={<HomePage />} />

          //rutas protegidas
          <Route element={<Protected_Router />}>
            <Route path="/carrito" element={<h1>Carrito</h1>} />
            <Route path="/perfil" element={<h1>Perfil</h1>} />
            <Route path="/inventario" element={<h1>Logout</h1>} />

          </Route>

        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App;
