import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
});

export const authAPI = {
    register: (data) => api.post('/auth/register', data),
    login: (data) => api.post('/auth/login', data),
    getMe: (token) => api.get('/auth/me', {
        headers: { Authorization: `Bearer ${token}` }
    }),
};
