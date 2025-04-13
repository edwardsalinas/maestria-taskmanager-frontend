import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
});

export const tasksAPI = {
    getTasks: (params) => {
        const token = localStorage.getItem('token');
        return api.get('/tasks', {
            headers: { Authorization: `Bearer ${token}` },
            params
        });
    },

    getTaskById: (id) => {
        const token = localStorage.getItem('token');
        return api.get(`/tasks/${id}`, {
            headers: { Authorization: `Bearer ${token}` }
        });
    },

    createTask: (data) => {
        const token = localStorage.getItem('token');
        return api.post('/tasks', data, {
            headers: { Authorization: `Bearer ${token}` }
        });
    },

    updateTask: (id, data) => {
        const token = localStorage.getItem('token');
        return api.put(`/tasks/${id}`, data, {
            headers: { Authorization: `Bearer ${token}` }
        });
    },

    deleteTask: (id) => {
        const token = localStorage.getItem('token');
        return api.delete(`/tasks/${id}`, {
            headers: { Authorization: `Bearer ${token}` }
        });
    }
};