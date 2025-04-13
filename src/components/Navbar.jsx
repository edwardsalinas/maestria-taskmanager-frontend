import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/dashboard" className="text-xl font-bold text-primary">
          Task Manager
        </Link>
        
        <div className="flex items-center gap-4">
          {user && (
            <>
              <Link to="/dashboard" className="hover:text-primary">
                Dashboard
              </Link>
              <Link to="/profile" className="hover:text-primary">
                Perfil
              </Link>
              <button
                onClick={logout}
                className="bg-danger text-white px-4 py-2 rounded hover:bg-danger-dark"
              >
                Cerrar Sesión
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};