import axios from 'axios';
import constants from './constants';

const api = axios.create({
    baseURL: constants.API_BASE_URL
});

// Function to attach JWT token to every request
export const attachToken = token => {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

export const login = async (credentials) => {
    try {
        const response = await api.post('/token/', credentials);
        const { token } = response.data; // Assuming the response includes a JWT token
        localStorage.setItem('token', token); // Save the token in localStorage
        attachToken(token); // Attach token to subsequent requests
        return response.data; // You might return user data or just the token
    } catch (error) {
        console.error('Login error:', error.response || error);
        throw error;
    }
};


export default api;