import React, { useEffect, useRef, useState } from 'react';
import { Box, Typography, Button, Container } from '@mui/material';
import { motion } from 'framer-motion';
import { styled } from '@mui/material/styles';

// Create a styled component for the gradient background
const GradientBackground = styled(Box)(({ theme }) => ({
  background: 'linear-gradient(135deg, rgba(232, 245, 233, 0.7) 0%, rgba(255, 255, 255, 1) 50%, rgba(237, 231, 246, 0.7) 100%)',
  minHeight: '80vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  overflow: 'hidden',
  padding: theme.spacing(4, 0)
}));

// Styled button with hover effect
const BlackButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#000',
  color: '#fff',
  borderRadius: '28px',
  padding: theme.spacing(1.5, 4),
  fontSize: '1.125rem',
  fontWeight: 500,
  textTransform: 'none',
  '&:hover': {
    backgroundColor: '#333',
  },
}));

// Wrap MUI components with motion for animations
const MotionTypography = motion(Typography);
const MotionBox = motion(Box);

const HeroSection = () => {
  const sectionRef = useRef(null); // Ref for the HeroSection
  const [isVisible, setIsVisible] = useState(false); // To control opacity change

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true); // Fade-in when section is in view
        } else {
          setIsVisible(false); // Fade-out when section is out of view
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
    <GradientBackground ref={sectionRef}>
      <Container maxWidth="lg">
        <Box sx={{ textAlign: 'center', opacity: isVisible ? 1 : 0.1, transition: 'opacity 1s ease-in-out' }}>
          <MotionTypography
            variant="h1"
            sx={{
              fontSize: { xs: '3rem', sm: '4rem', md: '5rem', lg: '6rem' },
              fontWeight: 500,
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
              mb: 4,
              color: 'text.primary'
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Explore the Universe of  
            <br />
            Mathematics
          </MotionTypography>

          <MotionTypography
            variant="h5"
            sx={{
              maxWidth: '800px',
              mx: 'auto',
              mb: 6,
              color: 'text.secondary',
              fontSize: { xs: '1.125rem', md: '1.5rem' }
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Challenge yourself, compete with others, and unlock your mathematical potential!
          </MotionTypography>

          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <BlackButton
              variant="contained"
              size="large"
              disableElevation
              onClick={() => window.location.href = '/signup'}
            >
              Get Started
            </BlackButton>
          </MotionBox>

          <MotionTypography
            variant="body1"
            sx={{
              mt: 8,
              color: 'text.secondary',
              fontSize: '1.125rem'
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            Join our community and unlock your mathematical potential.
          </MotionTypography>
        </Box>
      </Container>
    </GradientBackground>
  );
};

export default HeroSection;
