import { BrowserRouter, Routes, Route } from "react-router";
import RegisterPage from "./pages/register.jsx";
import LoginPage from "./pages/login.jsx";
import { AuthProvider } from "./context/Authcontext.jsx";
import HomePage from "./pages/home.jsx";
function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>

          <Route path="/" element={<h1>Home</h1>} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/home" element={<HomePage />} />

        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App;
