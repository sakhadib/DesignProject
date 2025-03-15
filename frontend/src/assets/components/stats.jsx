import React, { useEffect, useState, useRef } from 'react';
import { Box, Typography, Container, Grid } from '@mui/material';
import { Person, EmojiEvents, Functions } from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import axios from 'axios'; // Import axios to handle HTTP requests

const StyledIcon = styled(Box)(({ theme }) => ({
  '& .MuiSvgIcon-root': {
    fontSize: '100px',
    color: '#1E2761', // Color 2 for icons
    marginRight: theme.spacing(3),
  }
}));

const CountItem = ({ icon, endValue, label }) => {
  const [count, setCount] = useState(0);
  const countRef = useRef(null); // Ref for each CountItem component

  useEffect(() => {
    const duration = 2000;
    const steps = 60;
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
    <Box
      ref={countRef}
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: { xs: 'center', md: 'flex-start' },
        opacity: 0, 
        transform: 'translateY(50px)', // Start off-screen
        transition: 'opacity 1s ease, transform 1s ease', // Slide up and fade-in
      }}
    >
      <StyledIcon>{icon}</StyledIcon>
      <Box>
        <Typography
          variant="h3"
          component="div"
          sx={{
            fontWeight: 'bold',
            lineHeight: 1.2,
            fontSize: { xs: '50px', sm: '62.5px', md: '75px' },
            color: '#1565C0' // Color 1 for numbers
          }}
        >
          {count}
        </Typography>
        <Typography
          variant="h6"
          component="div"
          sx={{
            color: 'text.primary',
            fontSize: { xs: '14px', sm: '18px' }
          }}
        >
          {label}
        </Typography>
      </Box>
    </Box>
  );
};

const CountSection = () => {
  const [counts, setCounts] = useState({
    userCount: 0,
    publicContestCount: 0,
    problemCount: 0,
  });

  const sectionRef = useRef(null); // Ref for the section to observe

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/common/count');
        setCounts({
          userCount: response.data.user_count,
          publicContestCount: response.data.public_contest_count,
          problemCount: response.data.problem_count,
        });
      } catch (error) {
        console.error('Failed to fetch data', error);
      }
    };
    fetchData();

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const items = sectionRef.current.querySelectorAll('div'); // Select all CountItem divs
          items.forEach(item => {
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)'; // Slide up to final position
          });
        } else {
          const items = sectionRef.current.querySelectorAll('div');
          items.forEach(item => {
            item.style.opacity = '0.1';
            item.style.transform = 'translateY(50px)'; // Reset position when out of view
          });
        }
      },
      { threshold: 0.2 } // Trigger when at least 20% of the section is in view
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <Container maxWidth="lg" sx={{ py: 8 }} ref={sectionRef}>
      <Grid container spacing={0} justifyContent="center" alignItems="center">
        <Grid item xs={12} sm={4}>
          <CountItem icon={<Person />} endValue={counts.userCount} label="Users" />
        </Grid>
        <Grid item xs={12} sm={4}>
          <CountItem icon={<EmojiEvents />} endValue={counts.publicContestCount} label="Contests" />
        </Grid>
        <Grid item xs={12} sm={4}>
          <CountItem icon={<Functions />} endValue={counts.problemCount} label="Problems" />
        </Grid>
      </Grid>
    </Container>
  );
};

export default CountSection;
