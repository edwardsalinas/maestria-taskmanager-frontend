import { useError } from '../context/ErrorContext';

export const ErrorModal = () => {
    const { error, clearError } = useError();

    if (!error) return null;

    return (
        // Overlay con transición suave
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 transition-opacity duration-300 ease-out" aria-modal="true" role="dialog">
            {/* Contenedor del modal con animación de entrada */}
            <div className="bg-white rounded-xl shadow-2xl p-6 max-w-md w-full transform transition-all duration-300 ease-out scale-95 opacity-0 animate-fade-in-scale">
                <div className="flex justify-between items-center mb-4 pb-3 border-b border-neutral-light">
                    <h3 className="text-lg font-semibold text-danger-dark flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}> {/* Icono de error */}
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Error
                    </h3>
                    <button
                        onClick={clearError}
                        className="text-neutral hover:text-neutral-dark transition-colors rounded-full p-1 focus:outline-none focus:ring-2 focus:ring-neutral-light"
                        aria-label="Cerrar modal"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                {/* Muestra el mensaje de error */}
                <p className="text-neutral-dark my-4 text-sm">{typeof error === 'string' ? error : 'Ha ocurrido un error inesperado.'}</p>
                <button
                    onClick={clearError}
                    className="mt-4 w-full bg-danger hover:bg-danger-dark text-white py-2.5 rounded-lg font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-danger focus:ring-offset-2"
                >
                    Cerrar
                </button>
            </div>
            {/* CSS para animación (añadir en index.css o App.css) */}
            <style jsx global>{`
              @keyframes fadeInScale {
                from { opacity: 0; transform: scale(0.95); }
                to { opacity: 1; transform: scale(1); }
              }
              .animate-fade-in-scale {
                animation: fadeInScale 0.3s ease-out forwards;
              }
            `}</style>
        </div>
    );
};