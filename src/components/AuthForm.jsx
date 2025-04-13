import { useState } from 'react';
import { Link } from 'react-router-dom';

export const AuthForm = ({ onSubmit, buttonText, isRegister = false, footerLink }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = isRegister ? { name, email, password } : { email, password };
      await onSubmit(data);
    } catch (err) {
      setError(err.response?.data?.message || 'Error en la solicitud');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <p className="text-red-500 text-sm">{error}</p>}
      
      {isRegister && (
        <div>
          <label className="block text-white-700">Nombre</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
      )}

      <div>
        <label className="block text-white-700">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
      </div>

      <div>
        <label className="block text-white-700">Contraseña</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
      </div>

      <button
        type="submit"
        className="w-full bg-primary text-white py-2 rounded hover:bg-primary-dark"
      >
        {buttonText}
      </button>

      {footerLink && (
        <p className="text-center mt-4">
          <Link to={footerLink.path} className="text-primary hover:underline">
            {footerLink.text}
          </Link>
        </p>
      )}
    </form>
  );
};