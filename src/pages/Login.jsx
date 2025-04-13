import { useNavigate } from 'react-router-dom';
import { AuthForm } from '../components'; // Asegúrate que AuthForm tenga los estilos modernos aplicados
import { useAuth } from '../context/AuthContext';
// Ya no necesitas useError aquí si AuthForm maneja los errores localmente
// import { useError } from '../context/ErrorContext';

export const Login = () => {
    const { login } = useAuth(); // Hook para la función de login del contexto
    const navigate = useNavigate(); // Hook para la navegación
    // const { setError } = useError(); // Quitado: AuthForm se encarga del error de UI

    // Función que se pasa a AuthForm para manejar el submit
    const handleLogin = async (credentials) => {
        try {
            await login(credentials); // Llama a la función de login del AuthContext
            navigate('/dashboard'); // Redirige al dashboard si el login es exitoso
        } catch (err) {
            // AuthForm ya tiene un try-catch y mostrará el error que 'login' lance.
            // Aquí solo necesitas hacer algo adicional si es necesario, como loguear.
            console.error("Fallo en el inicio de sesión (capturado en Login.jsx):", err);
            // No necesitas llamar a setError(err) aquí si AuthForm lo maneja visualmente.
            // El error se lanzará desde login() en AuthContext y será capturado por AuthForm.
        }
    };

    return (
        // Contenedor principal con pantalla completa, centrado y fondo moderno
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-neutral-lighter to-neutral-light p-4">
            {/* Tarjeta contenedora del formulario */}
            <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-md">
                {/* Título del formulario */}
                <h1 className="text-2xl font-bold mb-6 text-center text-neutral-darkest">
                    Iniciar Sesión
                </h1>
                {/* Componente de formulario reutilizable */}
                <AuthForm
                    onSubmit={handleLogin} // Pasa la función de manejo
                    buttonText="Ingresar" // Texto del botón
                    // No es registro, así que isRegister es false (por defecto)
                    // Link para ir a la página de registro
                    footerLink={{
                        path: '/register',
                        text: '¿No tienes cuenta? Regístrate aquí'
                    }}
                />
            </div>
        </div>
    );
};