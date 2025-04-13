// src/pages/Dashboard.jsx
import { useState } from 'react';
import { TaskList, TaskForm } from '../components'; // Asegúrate que TaskList y TaskForm también usen estilos modernos
import { useTasks } from '../context/TaskContext';
import { useError } from '../context/ErrorContext'; // Aunque no uses setError directamente aquí, es bueno saber que está disponible

export const Dashboard = () => {
    // Obtenemos todo lo necesario del contexto de tareas
    // Ya no necesitamos 'error' aquí porque ErrorModal lo manejará globalmente
    const { tasks, loading, deleteTask, updateTask, fetchTasks } = useTasks();
    const { setError } = useError(); // Lo obtenemos por si quisiéramos setear un error específico desde aquí, aunque es mejor que lo hagan las funciones del context

    // Estado local para manejar la visibilidad del formulario y la tarea a editar
    const [showForm, setShowForm] = useState(false);
    const [taskToEdit, setTaskToEdit] = useState(null);

    // Función para abrir el formulario en modo edición
    const handleEdit = (task) => {
        setTaskToEdit(task);
        setShowForm(true); // Muestra el formulario al editar
    };

    // Función para manejar el borrado de tareas (llama a la función del contexto)
    const handleDelete = async (taskId) => {
        try {
            // Opcional: Confirmación antes de borrar
            // if (!window.confirm('¿Estás seguro de que quieres eliminar esta tarea?')) {
            //     return;
            // }
            await deleteTask(taskId);
            // El manejo de errores (mostrar modal) lo hará el ErrorContext porque deleteTask llama a setError internamente
        } catch (error) {
            // Opcional: Loguear el error aquí si necesitas depuración específica del Dashboard
            console.error("Error al intentar eliminar tarea desde Dashboard:", error);
            // No necesitas llamar a setError(error) aquí si deleteTask ya lo hace
        }
    };

    // Función para manejar el cambio de estado (llama a la función del contexto)
    const handleStatusChange = async (taskId, newStatus) => {
        try {
            await updateTask(taskId, { status: newStatus });
            // El manejo de errores lo hará el ErrorContext
        } catch (error) {
            console.error('Error al intentar actualizar estado desde Dashboard:', error);
            // No necesitas llamar a setError(error) aquí si updateTask ya lo hace
        }
    };

    // Función para cerrar el formulario (resetea estados)
    const handleCloseForm = () => {
        setShowForm(false);
        setTaskToEdit(null);
    };

    // Función para manejar el click del botón 'Nueva Tarea' / 'Cancelar'
    const handleToggleForm = () => {
        if (showForm) {
            handleCloseForm(); // Si el form está abierto, ciérralo
        } else {
            setTaskToEdit(null); // Asegúrate que no hay tarea para editar
            setShowForm(true);  // Abre el form para crear
        }
    };

    return (
        // Contenedor principal con padding responsivo
        <div className="container mx-auto p-4 md:p-6 lg:p-8">
            {/* Cabecera: Título y botón de acción */}
            <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
                <h1 className="text-2xl md:text-3xl font-bold text-neutral-darkest">
                    Mis Tareas
                </h1>
                <button
                    onClick={handleToggleForm}
                    // Estilo moderno para el botón primario
                    className={`
                        ${showForm ? 'bg-neutral-dark hover:bg-neutral-darker' : 'bg-primary hover:bg-primary-dark'}
                        text-white px-5 py-2 rounded-lg font-medium transition-all duration-200
                        flex items-center gap-2 shadow-sm hover:shadow-md transform active:scale-95
                    `}
                >
                    {/* Icono cambia según el estado */}
                    {showForm ? (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                        </svg>
                    )}
                    {/* Texto del botón cambia según el estado */}
                    {showForm ? 'Cancelar' : 'Nueva Tarea'}
                </button>
            </div>

            {/* Renderizado condicional del formulario de Tareas */}
            {/* Añadimos una transición suave */}
            <div className={`transition-all duration-300 ease-in-out ${showForm ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
                {showForm && <TaskForm taskToEdit={taskToEdit} onClose={handleCloseForm} />}
            </div>


            {/* Área de contenido principal: Loading, Lista de Tareas o Estado Vacío */}
            <div className="mt-6"> {/* Espacio entre form (si visible) y contenido */}
                {loading ? (
                    // Estado de Carga
                    <div className="text-center p-10 text-neutral-dark font-medium">
                        <p>Cargando tareas...</p>
                        {/* Podrías añadir un spinner SVG o un componente aquí */}
                    </div>
                ) : tasks.length > 0 ? (
                    // Lista de Tareas (si no está cargando y hay tareas)
                    <TaskList
                        tasks={tasks}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                        onStatusChange={handleStatusChange}
                    />
                ) : (
                    // Estado Vacío (si no está cargando y NO hay tareas)
                    <div className="text-center p-10 bg-neutral-lightest rounded-lg border-2 border-dashed border-neutral-light mt-6">
                        <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12 text-neutral-light" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        <p className="mt-4 text-neutral-dark font-medium">No tienes tareas pendientes.</p>
                        <p className="text-sm text-neutral">¡Añade una nueva para empezar!</p>
                    </div>
                )}
            </div>
        </div>
    );
};