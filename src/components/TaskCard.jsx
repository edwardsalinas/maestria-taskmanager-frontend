export const TaskCard = ({ task, onEdit, onDelete, onStatusChange }) => {
    const statusOptions = {
        pendiente: ['en progreso'],
        'en progreso': ['completada'],
        completada: []
    };

    const statusColors = {
        pendiente: 'bg-yellow-100 text-yellow-800',
        'en progreso': 'bg-blue-100 text-blue-800',
        completada: 'bg-green-100 text-green-800'
    };

    const handleStatusChange = async (newStatus) => {
        try {
            await onStatusChange(task._id, newStatus);
        } catch (error) {
            console.error('Error al actualizar estado:', error);
        }
    };

    return (
        <div className="bg-white rounded-lg shadow-md p-4 mb-4">
            <div className="flex justify-between items-start">
                <div>
                    <h3 className="text-lg font-semibold">{task.title}</h3>
                    <p className="text-white-600 mt-1">{task.description}</p>
                    <div className="mt-2 flex items-center gap-2">
                        <select
                            value={task.status}
                            onChange={(e) => handleStatusChange(e.target.value)}
                            className={`px-2 py-1 rounded-full text-sm ${statusColors[task.status]} ${task.status === 'completada' ? 'cursor-not-allowed' : 'cursor-pointer'
                                }`}
                            disabled={task.status === 'completada'}
                        >
                            <option value={task.status}>{task.status}</option>
                            {statusOptions[task.status].map((option) => (
                                <option key={option} value={option}>
                                    {option}
                                </option>
                            ))}
                        </select>
                        {task.dueDate && (
                            <span className="text-sm text-white-500">
                                {new Date(task.dueDate).toLocaleDateString()}
                            </span>
                        )}
                    </div>
                </div>
                <div className="flex gap-2">
                    <button
                        onClick={() => onEdit(task)}
                        // className="text-primary hover:text-primary-dark"
                        className={`text-primary hover:text-primary-dark ${
                            task.status === 'completada' ? "cursor-not-allowed" : ""
                          }`} 
                        disabled={task.status === 'completada'}
                    >
                        ✏️
                    </button>
                    <button
                        onClick={() => onDelete(task._id)}
                        className="text-danger hover:text-danger-dark"
                    >
                        🗑️
                    </button>
                </div>
            </div>
        </div>
    );
};