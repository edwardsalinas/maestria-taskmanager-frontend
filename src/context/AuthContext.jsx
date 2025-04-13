import { createContext, useContext, useEffect, useState } from 'react';
import { authAPI } from '../api/auth';
import { useError } from './ErrorContext';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const { setError } = useError();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      authAPI.getMe(token)
        .then(res => setUser(res.data))
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const register = async (userData) => {
    const { data } = await authAPI.register(userData);
    return data;  // Return the response data but don't log in automatically
  };

  const login = async (credentials) => {

    try {
      const { data } = await authAPI.login(credentials);
      localStorage.setItem('token', data.token);
      setUser(data.user);
    } catch (err) {
      setError(err.response?.data?.message || 'Error en el login');
      throw err;
    }
  };

  const logout = () => {
    try {
      localStorage.removeItem('token');
      setUser(null);
    } catch (err) {
      setError(err.response?.data?.message || 'Error en el login');
      throw err;
    }

  };

  return (
    <AuthContext.Provider value={{ user, loading, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
