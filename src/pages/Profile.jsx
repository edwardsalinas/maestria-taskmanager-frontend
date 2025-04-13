import { useAuth } from '../context/AuthContext';

export const Profile = () => {
    const { user } = useAuth();

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Perfil de Usuario</h1>
            <div className="bg-white p-6 rounded-lg shadow-md">
                <p><strong>Nombre:</strong> {user?.name}</p>
                <p><strong>Email:</strong> {user?.email}</p>
            </div>
        </div>
    );
};