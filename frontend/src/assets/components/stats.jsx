import React, { useEffect, useState } from 'react';
import { Box, Typography, Container, Grid } from '@mui/material';
import { Person, EmojiEvents, Functions } from '@mui/icons-material';
import { styled } from '@mui/material/styles';

const StyledIcon = styled(Box)(({ theme }) => ({
  '& .MuiSvgIcon-root': {
    fontSize: '3.5rem', // Increased icon size
    color: '#000', // Black color to match the image
    marginRight: theme.spacing(3),
  }
}));

const CountItem = ({ icon, endValue, label }) => {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    const duration = 2000; // 2 seconds duration
    const steps = 60; // 60 steps (for smooth animation)
    const stepValue = endValue / steps;
    const stepTime = duration / steps;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep += 1;
      if (currentStep === steps) {
        setCount(endValue);
        clearInterval(timer);
      } else {
        setCount(Math.floor(stepValue * currentStep));
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [endValue]);

  return (
    <Box sx={{ 
      display: 'flex', 
      alignItems: 'center',
      justifyContent: { xs: 'center', md: 'flex-start' }
    }}>
      <StyledIcon>
        {icon}
      </StyledIcon>
      <Box>
        <Typography 
          variant="h3" 
          component="div" 
          sx={{ 
            fontWeight: 'bold',
            lineHeight: 1.2,
            fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' }
          }}
        >
          {count}
        </Typography>
        <Typography 
          variant="h6" 
          component="div"
          sx={{ 
            color: 'text.primary',
            fontWeight: 'bold',
            fontSize: { xs: '1.25rem', sm: '1.5rem' }
          }}
        >
          {label}
        </Typography>
      </Box>
    </Box>
  );
};

const CountSection = () => {
  const stats = [
    { icon: <Person />, value: 100, label: 'Users' },
    { icon: <EmojiEvents />, value: 100, label: 'Contests' },
    { icon: <Functions />, value: 100, label: 'Problems' }
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Grid 
        container 
        spacing={6} 
        justifyContent="center" 
        alignItems="center"
      >
        {stats.map((stat, index) => (
          <Grid item xs={12} sm={4} key={index}>
            <CountItem
              icon={stat.icon}
              endValue={stat.value}
              label={stat.label}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default CountSection;