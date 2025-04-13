// src/App.jsx
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ErrorProvider } from './context/ErrorContext';
// Importa tanto AuthProvider como useAuth
import { AuthProvider, useAuth } from './context/AuthContext'; // <-- MODIFICA ESTA LÍNEA
import { TaskProvider } from './context/TaskContext';
import { ErrorModal } from './components/ErrorModal';
import { Login, Register, Dashboard, Profile } from './pages';
import './index.css'; 

export const App = () => {
  return (
    <BrowserRouter>
      <ErrorProvider>
        <AuthProvider> {/* AuthProvider provee el contexto */}
          <TaskProvider>
            <ErrorModal />
            <Routes>
              {/* Rutas públicas */}
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />

              {/* Rutas privadas (envueltas con PrivateRoute) */}
              <Route path="/dashboard" element={
                <PrivateRoute> {/* PrivateRoute ahora puede usar useAuth */}
                  <Dashboard />
                </PrivateRoute>
              } />
              <Route path="/profile" element={
                <PrivateRoute> {/* PrivateRoute ahora puede usar useAuth */}
                  <Profile />
                </PrivateRoute>
              } />

              {/* Redirección por defecto */}
              <Route path="/" element={<Navigate to="/dashboard" />} />
            </Routes>
          </TaskProvider>
        </AuthProvider>
      </ErrorProvider>
    </BrowserRouter>
  );
};

// Componente PrivateRoute (no necesita cambios, pero ahora useAuth está disponible)
const PrivateRoute = ({ children }) => {
  // useAuth ahora está definido gracias a la importación
  const { user, loading } = useAuth(); // Es buena idea considerar el estado 'loading'

  // Mientras carga la información del usuario, podrías mostrar un spinner o nada
  if (loading) {
    return <div>Cargando...</div>; // O un componente Spinner, o null
  }

  // Una vez que 'loading' es false, decide si mostrar el contenido o redirigir
  return user ? children : <Navigate to="/login" />;
};

// Asegúrate de exportar App si es necesario
// export default App;