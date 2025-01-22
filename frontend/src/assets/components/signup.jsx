import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import constants from '../../constants';

export default function SignUpForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value  // Update the state key corresponding to the input's name attribute
    }));
  
    // You can also handle real-time validation here if necessary, for example:
    if (name === 'confirmPassword') {
      const doesMatch = value === formData.password;
      setFormErrors(prevErrors => ({
        ...prevErrors,
        confirmPasswordError: !doesMatch
      }));
    }
  };

  const [formErrors, setFormErrors] = useState({
    confirmPasswordError: false
  })

  const handleSubmit = (event) => {
    event.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

  const validateForm = () => {
    const errors = {};
    errors.confirmPasswordError = formData.confirmPassword !== formData.password;
    setFormErrors(errors);
    return !Object.values(errors).some(e => e); // returns true if no errors
  }

  console.log({
    username: formData.name,
    email: formData.email,
    password: formData.password,
  });
  
  axios.post(constants.API_BASE_URL + '/auth/signup/', {
    username: formData.name,
    email: formData.email,
    password: formData.password,
  }).then(response => {
    navigate('/signin');
  }).catch(error => {
    setError(error.response?.data?.detail || 'Error during registration');
  });
  };

  const passwordError = formData.confirmPassword && formData.password !== formData.confirmPassword;

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
        }}
      >
        {error && <Alert severity="error">{error}</Alert>}
        <Box textAlign="center" mb={3}>
          <Typography variant="h4" fontWeight="bold">
            MathXplorer
          </Typography>
          <Typography variant="h5" fontWeight="medium">
            Sign up
          </Typography>
          <Typography variant="body2" color="textSecondary">
            or{' '}
            <Link to="/signin" style={{ textDecoration: 'none', color: '#1976d2' }}>
              sign in to your account
            </Link>
          </Typography>
        </Box>


        <form onSubmit={handleSubmit}>
        <Box mb={3}>
          <Typography htmlFor="name" variant="subtitle2">
            Name<span style={{ color: 'red' }}>*</span>
          </Typography>
          <TextField
            name="name" // Ensure name attribute is used and matches state keys
            id="name"
            variant="outlined"
            fullWidth
            required
            placeholder="Enter your name"
            value={formData.name} // Bind value
            onChange={handleInputChange} // Attach change handler
          />
        </Box>
        <Box mb={3}>
          <Typography htmlFor="email" variant="subtitle2">
            Email address<span style={{ color: 'red' }}>*</span>
          </Typography>
          <TextField
            name="email"
            id="email"
            variant="outlined"
            fullWidth
            type="email"
            required
            placeholder="Enter your email address"
            value={formData.email} // Bind value
            onChange={handleInputChange} // Attach change handler
          />
        </Box>
        <Box mb={3}>
          <Typography htmlFor="password" variant="subtitle2">
            Password<span style={{ color: 'red' }}>*</span>
          </Typography>
          <TextField
            name="password"
            id="password"
            variant="outlined"
            fullWidth
            type="password"
            required
            placeholder="Enter your password"
            value={formData.password} // Bind value
            onChange={handleInputChange} // Attach change handler
          />
        </Box>

        <Box mb={3}>
          <TextField
            name="confirmPassword"  // This should match the state's key
            id="confirm-password"
            variant="outlined"
            fullWidth
            type="password"
            required
            placeholder="Re-enter your password"
            value={formData.confirmPassword}  // Bind value to formData.confirmPassword
            onChange={handleInputChange}  // Attach change handler
            error={formErrors.confirmPasswordError}
            helperText={formErrors.confirmPasswordError ? "Passwords do not match" : ""}
            sx={passwordError ? { input: { color: 'red', borderColor: 'red' } } : {}}
        />
        </Box>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ paddingY: 1.5 }}
          >
            Sign up
          </Button>
        </form>
      </Box>
    </Box>
  );
}
