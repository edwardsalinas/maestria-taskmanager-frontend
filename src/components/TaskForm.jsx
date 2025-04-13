import { useState, useEffect } from 'react';
import { useTasks } from '../context/TaskContext';

export const TaskForm = ({ taskToEdit, onClose }) => {
  const { createTask, updateTask } = useTasks();
  const [taskData, setTaskData] = useState({
    title: '',
    description: '',
    status: 'pendiente',
    dueDate: ''
  });

  useEffect(() => {
    if (taskToEdit) {
      setTaskData({
        title: taskToEdit.title,
        description: taskToEdit.description,
        status: taskToEdit.status,
        dueDate: taskToEdit.dueDate?.split('T')[0] || ''
      });
    }
  }, [taskToEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (taskToEdit) {
        await updateTask(taskToEdit._id, taskData);
      } else {
        await createTask(taskData);
      }
      onClose();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="bg-gray-100 p-4 rounded-lg mb-4">
      <h2 className="text-xl font-bold mb-4">
        {taskToEdit ? 'Editar Tarea' : 'Nueva Tarea'}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <label className="block mb-1">Título</label>
          <input
            type="text"
            value={taskData.title}
            onChange={(e) => setTaskData({ ...taskData, title: e.target.value })}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block mb-1">Descripción</label>
          <textarea
            value={taskData.description}
            onChange={(e) => setTaskData({ ...taskData, description: e.target.value })}
            className="w-full p-2 border rounded"
            rows="3"
          />
        </div>

        <div>
          <label className="block mb-1">Estado</label>
          <select
            value={taskData.status}
            onChange={(e) => setTaskData({ ...taskData, status: e.target.value })}
            className={`w-full p-2 border rounded ${
              !taskToEdit ? "cursor-not-allowed" : ""
            }`} 
            disabled={!taskToEdit} 
          >
            <option value="pendiente">Pendiente</option>
            <option value="en progreso">En Progreso</option>
            <option value="completada">Completada</option>
          </select>
        </div>

        <div>
          <label className="block mb-1">Fecha Límite</label>
          <input
            type="date"
            value={taskData.dueDate}
            onChange={(e) => setTaskData({ ...taskData, dueDate: e.target.value })}
            className="w-full p-2 border rounded"
            min={new Date().toISOString().split('T')[0]}
          />
        </div>

        <div className="flex gap-2 justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:text-gray-800"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark"
          >
            {taskToEdit ? 'Actualizar' : 'Crear'}
          </button>
        </div>
      </form>
    </div>
  );
};