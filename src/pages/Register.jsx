import { useNavigate } from 'react-router-dom';
import { AuthForm } from '../components'; // Asegúrate que AuthForm tenga los estilos modernos aplicados
import { useAuth } from '../context/AuthContext';
// No es necesario useError aquí si AuthForm maneja la UI del error
// import { useError } from '../context/ErrorContext';

export const Register = () => {
    const { register } = useAuth(); // Hook para la función de registro del contexto
    const navigate = useNavigate(); // Hook para la navegación
    // const { setError } = useError(); // Quitado

    // Función que se pasa a AuthForm para manejar el submit
    const handleRegister = async (userData) => {
        try {
            const response = await register(userData); // Llama a la función de registro del AuthContext
            // Opcional: Mostrar un mensaje de éxito (ej: con una librería de toasts)
            // toast.success('¡Registro exitoso! Ahora puedes iniciar sesión.');
            console.log("Registro exitoso:", response); // Loguear la respuesta si es útil
            navigate('/login'); // Redirige a la página de login después del registro exitoso
        } catch (err) {
            // AuthForm capturará y mostrará el error lanzado por register().
            console.error("Fallo en el registro (capturado en Register.jsx):", err);
            // No necesitas setError aquí, AuthForm se encarga.
        }
    };

    return (
        // Contenedor principal con pantalla completa, centrado y fondo moderno
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-neutral-lighter to-neutral-light p-4">
             {/* Tarjeta contenedora del formulario */}
            <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-md">
                {/* Título del formulario */}
                <h1 className="text-2xl font-bold mb-6 text-center text-neutral-darkest">
                    Crear Cuenta
                </h1>
                 {/* Componente de formulario reutilizable */}
                <AuthForm
                    onSubmit={handleRegister} // Pasa la función de manejo
                    isRegister={true} // Indica que es el formulario de registro (mostrará campo de nombre)
                    buttonText="Registrarse" // Texto del botón
                    // Link para ir a la página de login
                    footerLink={{
                        path: '/login',
                        text: '¿Ya tienes cuenta? Inicia sesión aquí'
                    }}
                />
            </div>
        </div>
    );
};