import React from 'react';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import LockIcon from '@mui/icons-material/Lock';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import SvgIcon from '@mui/material/SvgIcon';
import Grid from '@mui/material/Grid';

export default function Component() {
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

        {/* GitHub and Google Sign-In Buttons */}
        <Box mt={3}>
          <Button
            variant="outlined"
            fullWidth
            startIcon={
              <SvgIcon>
                <svg viewBox="0 0 24 24" className="w-5 h-5" aria-hidden="true">
                  <path
                    fill="currentColor"
                    d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
                  />
                </svg>
              </SvgIcon>
            }
            sx={{ mb: 2, justifyContent: 'flex-start', textTransform: 'none', color: '#333', borderColor: '#d1d5db' }}
          >
            Sign In With GitHub
          </Button>

          <Button
            variant="outlined"
            fullWidth
            startIcon={
              <SvgIcon>
                <svg viewBox="0 0 24 24" className="w-5 h-5" aria-hidden="true">
                  <path
                    fill="currentColor"
                    d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387 .307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                  />
                </svg>
              </SvgIcon>
            }
            sx={{ mb: 3, justifyContent: 'flex-start', textTransform: 'none', color: '#333', borderColor: '#d1d5db' }}
          >
            Sign In With Google
          </Button>
        </Box>

        {/* Divider */}
        <Divider>or</Divider>

        {/* Sign In Form */}
        <Box mt={3}>
          <TextField
            type="email"
            placeholder="Email Address *"
            fullWidth
            variant="outlined"
            sx={{ mb: 2 }}
          />
          <TextField
            type="password"
            placeholder="Password *"
            fullWidth
            variant="outlined"
            sx={{ mb: 2 }}
          />
          <Grid container alignItems="center">
            <Checkbox id="remember" />
            <Typography variant="body2">Remember me</Typography>
          </Grid>
          <Button variant="contained" color="primary" fullWidth sx={{ mt: 2, py: 1.5 }}>
            Sign In
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
