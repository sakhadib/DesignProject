import axios from 'axios';
import constants from './constants';

const api = axios.create({
    baseURL: constants.API_BASE_URL
});

// Function to attach JWT token to every request
export const attachToken = token => {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

// Login function that retrieves the access token and attaches it to the requests
export const login = async (credentials) => {
    try {
        const response = await api.post('/token/', credentials);
        // console.log('Login response:', response.data); // Log the response to confirm format

        const { access, refresh } = response.data; // Destructure access and refresh tokens

        if (access) {
            // Save access token in localStorage for authentication
            localStorage.setItem('token', access);
            attachToken(access); // Attach access token to subsequent requests
        } else {
            console.error('Access token is missing in the response');
        }

        // Optionally, save the refresh token for future use
        if (refresh) {
            localStorage.setItem('refresh_token', refresh);
        }

        return response.data;
    } catch (error) {
        console.error('Login error:', error.response || error);
        throw error;
    }
};

// Automatically attach token from localStorage if it exists
const token = localStorage.getItem('token');
if (token) {
    attachToken(token);
}

export default api;
