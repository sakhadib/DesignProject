import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Checkbox, TextField, Box, Typography, Grid } from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import axios from '../../api'; // Use axios instance configured with baseURL
import Cookies from 'js-cookie';

export default function SignInComponent() {
    const [credentials, setCredentials] = useState({
        email: '', // Initialize email
        password: '' // Initialize password
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (event) => {
        const { name, value } = event.target;
        setCredentials((prevCredentials) => ({
            ...prevCredentials,
            [name]: value,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!credentials.email || !credentials.password) {
            setError('Please enter all fields');
            return;
        }

        try {
            // Send POST request to login endpoint
            const response = await axios.post('/auth/login/', {
                email: credentials.email,
                password: credentials.password,
            });

            // Parse response
            const { access_token, token_type, expires_in } = response.data;

            if (access_token) {
                // Save token in localStorage for authentication
                localStorage.setItem('token', access_token);

                // Store additional information in cookies if needed
                Cookies.set('token_type', token_type, { expires: expires_in / (60 * 24) });
                Cookies.set('access_token', access_token, { expires: expires_in / (60 * 24) });

                // Redirect to the home page upon successful login
                navigate('/home');
            } else {
                setError('Login failed: Missing access token in response.');
            }
        } catch (error) {
            console.error('Login error:', error.response || error);
            setError(
                error.response?.data?.message || 'Failed to login. Please check your credentials.'
            );
        }
    };

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '100vh',
                backgroundColor: '#f3f4f6',
                padding: 2,
            }}
        >
            <Box
                sx={{
                    width: '100%',
                    maxWidth: 400,
                    padding: 4,
                    backgroundColor: 'white',
                    borderRadius: 2,
                    boxShadow: 3,
                    textAlign: 'center',
                }}
            >
                <Box className="flex flex-col items-center space-y-2">
                    <Box className="p-2 bg-blue-500 rounded-full">
                        <LockIcon sx={{ fontSize: 32, color: 'white' }} />
                    </Box>
                    <Typography variant="h5" className="text-2xl font-semibold">
                        Sign in
                    </Typography>
                    <Typography variant="body2" className="text-sm text-gray-500">
                        Welcome user, please sign in to continue
                    </Typography>
                </Box>

                <Box mt={3} justifyContent="center" alignItems="center">
                    <TextField
                        name="email"
                        type="email"
                        placeholder="Email *"
                        fullWidth
                        variant="outlined"
                        value={credentials.email}
                        onChange={handleChange}
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        name="password"
                        type="password"
                        placeholder="Password *"
                        fullWidth
                        variant="outlined"
                        value={credentials.password}
                        onChange={handleChange}
                        sx={{ mb: 2 }}
                    />
                    {error && (
                        <Typography color="error" sx={{ mb: 2 }}>
                            {error}
                        </Typography>
                    )}
                    <Grid container alignItems="center">
                        <Checkbox id="remember" />
                        <Typography variant="body2">Remember me</Typography>
                    </Grid>
                    <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        sx={{ mt: 2, py: 1.5 }}
                        onClick={handleSubmit}
                    >
                        Sign In
                    </Button>
                </Box>
            </Box>
        </Box>
    );
}
