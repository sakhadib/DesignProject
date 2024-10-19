import React from 'react';
import { Link } from 'react-router-dom'; // Make sure this is correctly imported
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export default function SignUpForm() {
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
        <Box textAlign="center" mb={3}>
          <Typography variant="h4" fontWeight="bold">
            Laravel
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
        <form className="space-y-4">
          <Box mb={3}>
            <Typography htmlFor="name" variant="subtitle2">
              Name<span style={{ color: 'red' }}>*</span>
            </Typography>
            <TextField
              id="name"
              variant="outlined"
              fullWidth
              required
              placeholder="Enter your name"
            />
          </Box>
          <Box mb={3}>
            <Typography htmlFor="email" variant="subtitle2">
              Email address<span style={{ color: 'red' }}>*</span>
            </Typography>
            <TextField
              id="email"
              variant="outlined"
              fullWidth
              type="email"
              required
              placeholder="Enter your email address"
            />
          </Box>
          <Box mb={3}>
            <Typography htmlFor="password" variant="subtitle2">
              Password<span style={{ color: 'red' }}>*</span>
            </Typography>
            <TextField
              id="password"
              variant="outlined"
              fullWidth
              type="password"
              required
              placeholder="Enter your password"
            />
          </Box>
          <Box mb={3}>
            <Typography htmlFor="confirm-password" variant="subtitle2">
              Confirm password<span style={{ color: 'red' }}>*</span>
            </Typography>
            <TextField
              id="confirm-password"
              variant="outlined"
              fullWidth
              type="password"
              required
              placeholder="Re-enter your password"
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
