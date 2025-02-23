import { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

const TimerCard = styled(Box)(({ theme }) => ({
  background: theme.palette.primary.main,
  borderRadius: theme.spacing(1),
  padding: theme.spacing(2, 3),
  color: theme.palette.primary.contrastText,
  display: 'inline-block',
  margin: theme.spacing(0, 1),
}));

const TimeUnit = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  margin: theme.spacing(0, 2)
}));

const FlipTimer = ({ initialTime }) => {
  const [timeLeft, setTimeLeft] = useState(initialTime || 0);


  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 0) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const hours = Math.floor(timeLeft / 3600);
  const minutes = Math.floor((timeLeft % 3600) / 60);
  const seconds = timeLeft % 60;

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
      <TimeUnit>
        <TimerCard>
          <Typography variant="h3">
            {String(hours).padStart(2, '0')}
          </Typography>
        </TimerCard>
        <Typography variant="subtitle1" sx={{ mt: 1 }}>Hours</Typography>
      </TimeUnit>

      <TimeUnit>
        <TimerCard>
          <Typography variant="h3">
            {String(minutes).padStart(2, '0')}
          </Typography>
        </TimerCard>
        <Typography variant="subtitle1" sx={{ mt: 1 }}>Minutes</Typography>
      </TimeUnit>

      <TimeUnit>
        <TimerCard>
          <Typography variant="h3">
            {String(seconds).padStart(2, '0')}
          </Typography>
        </TimerCard>
        <Typography variant="subtitle1" sx={{ mt: 1 }}>Seconds</Typography>
      </TimeUnit>
    </Box>
  );
};

export default FlipTimer;

