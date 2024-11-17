import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import SendIcon from '@mui/icons-material/Send';
import IconButton from '@mui/material/IconButton';
import { toggleButtonClasses } from '@mui/material';

const ProblemView = () => {
  const [open, setOpen] = useState(false);
  const [answer, setAnswer] = useState('');
  const [message, setMessage] = useState('');
  const [leftPanelWidth, setLeftPanelWidth] = useState(50); // Percentage width of left panel

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitted answer:', answer);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (message.trim()) {
      console.log('Sent message:', message);
      setMessage('');
    }
  };

  const statistics = [
    { label: 'Max XP', value: 'N/A' },
    { label: 'Available XP', value: 'N/A' },
    { label: 'Attempts', value: 'N/A' },
    { label: 'Solved', value: 'N/A' },
    { label: 'First Solve', value: 'N/A' },
  ];

  return (
    <Box sx={{ padding: 3, maxWidth: 1200, margin: '0 auto' }}>
      {/* Main content */}
      <Box sx={{ display: 'flex', gap: 3, marginTop: '100px', marginBottom: '60px' }}>
        <Card sx={{ flex: 1 }}>
          <CardContent>
            <Typography variant="h4" gutterBottom>
              Test Problem 1
            </Typography>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              Created by avro - For simpleMath
            </Typography>

            <Typography variant="h5" sx={{ mt: 3, mb: 2 }}>
              Problem Statement
            </Typography>
            <Typography paragraph>
              What is 1 + 1?
            </Typography>

            <Typography variant="h5" sx={{ mt: 4, mb: 2 }}>
              Submit Answer
            </Typography>
            <Box component="form" onSubmit={handleSubmit}>
              <TextField
                fullWidth
                placeholder="Enter your answer here..."
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                sx={{ mb: 2 }}
              />
              <Button
                fullWidth
                variant="contained"
                type="submit"
                sx={{ bgcolor: '#1976d2' }}
              >
                SUBMIT
              </Button>
            </Box>
          </CardContent>
        </Card>

        {/* Statistics Card */}
        <Card sx={{ width: 300 }}>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              Statistics
            </Typography>
            <Table>
              <TableBody>
                {statistics.map((stat) => (
                  <TableRow key={stat.label}>
                    <TableCell component="th" scope="row">
                      {stat.label}
                    </TableCell>
                    <TableCell align="right">{stat.value}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </Box>

      {/* Help Button */}
      <Button
        variant="contained"
        color="primary"
        onClick={handleOpen}
        sx={{
          position: 'fixed',
          bottom: 16,
          right: 16,
          zIndex: 10,
        }}
      >
        HELP
      </Button>

      {/* Chat Dialog */}
      <Dialog fullScreen open={open} onClose={handleClose}>
        <Box sx={{ height: '100vh', display: 'flex', marginTop: '80px' }}>
          <Button
            onClick={handleClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              zIndex: 1
            }}
          >
            Close
          </Button>

          {/* Left Panel - Problem */}
          <Box
            sx={{
              width: `${leftPanelWidth}%`,
              backgroundColor: '#f0f0f0',
              padding: '20px',
              overflow: 'auto',
              transition: 'width 0.2s ease'
            }}
          >
            <Typography variant="h5" gutterBottom>
              TEST PROBLEM 1
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              Problem Statement
            </Typography>
            <Typography paragraph>
              What is 1+1?
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              Submit Answer
            </Typography>
            <TextField
              fullWidth
              placeholder="Write your answer here........"
              variant="outlined"
              sx={{ mb: 2 }}
            />
            <Button
              fullWidth
              variant="contained"
              sx={{ bgcolor: '#1976d2' }}
            >
              Submit
            </Button>

            <Box sx={{ mt: 4 }}>
              <Typography variant="subtitle1" gutterBottom>
                Statistic
              </Typography>
              <Table>
                <TableBody>
                  {statistics.map((stat) => (
                    <TableRow key={stat.label}>
                      <TableCell>{stat.label}</TableCell>
                      <TableCell align="right">{stat.value}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Box>

          {/* Right Panel - Chat */}
          <Box
            sx={{
              width: `${100 - leftPanelWidth}%`,
              backgroundColor: '#ffffff',
              display: 'flex',
              flexDirection: 'column',
              padding: '20px',
              overflow: 'auto'
            }}
          >
            <Typography
              variant="h4"
              sx={{
                p: 2,
                borderBottom: 1,
                borderColor: 'divider'
              }}
            >
              Welcome to ChatBot
            </Typography>

            <Box sx={{
              flex: 1,
              overflow: 'auto',
              p: 2
            }}>
              <Paper
                elevation={1}
                sx={{
                  p: 2,
                  bgcolor: '#f5f5f5',
                  maxWidth: '80%'
                }}
              >
                How can I help you today?
              </Paper>
            </Box>

            <Box
              component="form"
              onSubmit={handleSendMessage}
              sx={{
                p: 2,
                borderTop: 1,
                borderColor: 'divider',
                bgcolor: '#f5f5f5',
                display: 'flex',
                gap: 1
              }}
            >
              <TextField
                fullWidth
                placeholder="Write here..........."
                size="small"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <IconButton
                type="submit"
                disabled={!message.trim()}
              >
                <SendIcon />
              </IconButton>
            </Box>
          </Box>
        </Box>
      </Dialog>
    </Box>
  );
};

export default ProblemView;
