import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Checkbox, TextField, Box, Typography, Grid } from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import { login } from '../../api'; // Adjust the path to your api.js correctly

export default function SignInComponent() {
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCredentials(prevCredentials => ({
      ...prevCredentials,
      [name]: value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!credentials.username || !credentials.password) {
      setError('Please enter all fields');
      return;
    }

    try {
      const user = await login(credentials);
      // console.log('Login successful:', user); // Assuming 'login' function handles setting the token
      navigate('/home'); // Redirect the user to the dashboard upon successful login
    } catch (error) {
      setError('Failed to login. Please check your credentials and try again.');
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
            name="username"
            type="text"
            placeholder="Username *"
            fullWidth
            variant="outlined"
            value={credentials.username}
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
