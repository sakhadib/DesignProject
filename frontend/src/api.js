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
        const response = await api.post('/auth/login/', credentials);

        // Use the correct keys from the response
        const { access_token, token_type, expires_in } = response.data;

        if (access_token) {
            // Save access token in localStorage for authentication
            localStorage.setItem('token', access_token);
            attachToken(access_token); // Attach access token to subsequent requests
        } else {
            console.error('Access token is missing in the response');
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
