// src/context/TaskContext.jsx
'use client';
import { createContext, useContext, useState, useEffect } from 'react';
import { tasksAPI } from '../api/tasks';
import { useError } from './ErrorContext'; // Asegúrate que ErrorProvider envuelve a TaskProvider

// --- AÑADE ESTA LÍNEA ---
const TaskContext = createContext();
// --------------------------

export const TaskProvider = ({ children }) => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true); // Inicializa en true si vas a cargar datos al montar
    const { setError } = useError(); // Obtén setError del contexto de errores

    const fetchTasks = async () => {
        setLoading(true); // Indicar que la carga ha comenzado
        try {
            const { data } = await tasksAPI.getTasks();
            setTasks(data);
            // Ya no necesitas setError('') aquí, ErrorContext manejará los errores
        } catch (err) {
            // Usa setError del ErrorContext para mostrar el error globalmente
            setError(err.response?.data?.message || 'Error al cargar las tareas');
        } finally {
            setLoading(false); // Indicar que la carga ha terminado (éxito o fallo)
        }
    };

    const createTask = async (taskData) => {
        try {
            const { data } = await tasksAPI.createTask(taskData);
            // Asume que la API devuelve el objeto de la tarea creada dentro de una propiedad 'task'
            setTasks(prev => [...prev, data.task]);
            // Podrías querer devolver la nueva tarea por si el formulario necesita hacer algo con ella
            return data.task;
        } catch (err) {
            setError(err.response?.data?.message || 'Error al crear la tarea');
            throw err; // Re-lanza el error para que el componente que llamó (TaskForm) pueda manejarlo si es necesario
        }
    };

    const updateTask = async (id, taskData) => {
        try {
            const { data } = await tasksAPI.updateTask(id, taskData);
             // Asume que la API devuelve el objeto de la tarea actualizada dentro de una propiedad 'task'
            setTasks(prev => prev.map(task =>
                task._id === id ? data.task : task
            ));
             // Podrías querer devolver la tarea actualizada
             return data.task;
        } catch (err) {
            setError(err.response?.data?.message || 'Error al actualizar la tarea');
            throw err;
        }
    };

    const deleteTask = async (id) => {
        try {
            await tasksAPI.deleteTask(id);
            setTasks(prev => prev.filter(task => task._id !== id));
        } catch (err) {
            setError(err.response?.data?.message || 'Error al eliminar la tarea');
            throw err;
        }
    };

    // Efecto para cargar las tareas cuando el componente se monta
    useEffect(() => {
        // Asegúrate que el usuario esté autenticado antes de llamar a fetchTasks si es necesario
        // Podrías obtener el token/usuario del AuthContext aquí si fuera preciso
        fetchTasks();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []); // Cuidado con las dependencias, si fetchTasks dependiera de algo más, añádelo aquí

    // Ahora TaskContext está definido y puedes usar TaskContext.Provider
    return (
        <TaskContext.Provider
            value={{
                tasks,
                loading,
                createTask,
                updateTask,
                deleteTask,
                fetchTasks // Es útil pasar fetchTasks por si necesitas recargar manualmente desde algún componente
            }}
        >
            {children}
        </TaskContext.Provider> // Esta línea (aprox 70) ya no dará error
    );
};

// Hook personalizado para consumir el contexto
export const useTasks = () => {
    const context = useContext(TaskContext);
    // Es buena práctica añadir una verificación aquí también
    if (context === undefined) {
        throw new Error('useTasks debe usarse dentro de un TaskProvider');
    }
    return context;
};