// src/context/ErrorContext.jsx
import { createContext, useContext, useState } from 'react';

// 1. Crea el contexto con valor por defecto undefined
const ErrorContext = createContext(undefined);

// 2. Define el proveedor
export const ErrorProvider = ({ children }) => {
  const [error, setError] = useState(null);
  
  const clearError = () => setError(null);

  return (
    <ErrorContext.Provider value={{ error, setError, clearError }}>
      {children}
    </ErrorContext.Provider>
  );
};

// 3. Hook personalizado con validación
export const useError = () => {
  const context = useContext(ErrorContext);
  if (context === undefined) {
    throw new Error('useError debe usarse dentro de ErrorProvider');
  }
  return context;
};