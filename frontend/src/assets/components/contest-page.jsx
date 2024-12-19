import { Box, Typography, Container } from '@mui/material';
import { styled } from '@mui/material/styles';
import FlipTimer from './flip-timer';

const TimerWrapper = styled(Box)(({ theme }) => ({
  perspective: '1000px',
  display: 'flex',
  justifyContent: 'center',
  marginTop: theme.spacing(4)
}));

const ContestPage = () => {
  return (
    <Container maxWidth="md">
      <Box
        sx={{
          minHeight: '40vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          paddingTop: 10
        }}
      >
        <Typography
          variant="h2"
          component="h1"
          gutterBottom
          sx={{
            fontWeight: 'bold',
            textAlign: 'center'
          }}
        >
          Contest Name
        </Typography>
        
        <TimerWrapper>
          <FlipTimer initialTime={3600} /> {/* 1 hour in seconds */}
        </TimerWrapper>
      </Box>
    </Container>
  );
};

export default ContestPage;

