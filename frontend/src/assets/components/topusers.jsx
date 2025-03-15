import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Crown } from 'lucide-react';
import { Avatar, Box, Card, Typography, Container, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
import axios from 'axios';
import megaphoneVideo from '../img/ranking.mp4'; // Video file

// Styled Components
const PodiumCard = styled(Card)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: theme.spacing(2),
  backgroundColor: 'rgba(255, 255, 255, 0.2)',
  borderRadius: '12px',
  backdropFilter: 'blur(10px)',
  position: 'relative',
  width: '150px', // Adjust the width for horizontal alignment
}));

const PodiumBar = styled(Box)(({ theme }) => ({
  backgroundColor: '#ffffff',
  borderRadius: '12px',
  padding: theme.spacing(1),
  marginTop: theme.spacing(2),
  width: '80%',
  textAlign: 'center',
}));

const VideoContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100%',
  opacity: 1, // Set to 1 initially to avoid low opacity on load
  transform: 'translateY(0)', // Set initial transform to 0 for immediate positioning
  transition: 'opacity 1s ease-in-out, transform 1s ease-in-out', // Smooth transition
  '& video': {
    maxWidth: '100%',
    maxHeight: '300px',
    objectFit: 'contain',
    borderRadius: theme.shape.borderRadius,
  },
  [theme.breakpoints.down('md')]: {
    marginBottom: theme.spacing(4),
  }
}));

const LeaderboardPodium = () => {
  const [users, setUsers] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  // Fetch leaderboard users from the API
  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/home/top/users')
      .then(response => {
        setUsers(response.data.users);
      })
      .catch(error => {
        console.error('Error fetching leaderboard users', error);
      });
  }, []);

  // IntersectionObserver to trigger opacity and scroll transition
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true); // Fade in when section is in view
        } else {
          setIsVisible(false); // Fade out when section is out of view
        }
      },
      { threshold: 0.5 } // Trigger when 50% of the section is in view
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
    <Container
        maxWidth="xl"
        sx={{
            py: 8,
            borderRadius: 1,
            width: '100%', // Full width of the screen
            height: '90vh', // 90% of the viewport height
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            opacity: isVisible ? 1 : 0.1, // Opacity transition
            transform: isVisible ? 'translateY(0)' : 'translateY(50px)', // Slide-up effect
            transition: 'opacity 1s ease-in-out, transform 1s ease-in-out', // Smooth transition
        }}
        ref={sectionRef}
    >
        <Grid container spacing={4} justifyContent="center" alignItems="center" sx={{ width: '100%' }}>
            
            {/* Left Column: Leaderboard */}
                  <Grid item xs={12} md={6}>
                    <Grid container spacing={4} direction="row" justifyContent="center" alignItems="center">
                      {users.map((user, index) => (
                        <Grid item xs={12} sm={4} key={user.id}>
                          <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.2 }}
                          >
                            <PodiumCard
                              sx={{ backgroundColor: "#1565C0", textDecoration: 'none' }} // Remove underline
                              component="a"
                              href={`/profile/${user.id}`}
                            >
                              <Avatar
                                sx={{
                                  width: 80,
                                  height: 80,
                                  border: '4px solid #1E2761',
                                  backgroundColor: '#1E2761',
                                  fontSize: '50px',
                                  marginBottom: 2,
                                  '& img': {
                                    borderRadius: '50%',
                                  },
                                }}
                                alt={user.username}
                                src={user.avatar || '/placeholder.svg?height=100&width=100'} // Placeholder avatar
                              >
                                {user.username[0].toUpperCase()}    
                              </Avatar>

                              {index === 0 && (
                                <motion.div
                                  className="absolute -top-6 left-1/2 -translate-x-1/2"
                                  animate={{ y: [0, -4, 0] }}
                                  transition={{ duration: 1, repeat: Infinity }}
                                >
                                  <Crown className="w-8 h-8 text-yellow-400 drop-shadow-lg"/>
                                </motion.div>
                              )}

                              <Typography variant="h6" color="white" align="center" sx={{ mb: 1 }}>
                                {user.username}
                              </Typography>

                              <PodiumBar>
                                <Typography variant="body2" color="text.primary">
                                  {user.total_rating}
                                </Typography>
                              </PodiumBar>

                              <PodiumBar sx={{ marginTop: 2 }}>
                                <Typography variant="h4" color="#1565C0" fontWeight="bold">
                                  {index + 1}
                                </Typography>
                              </PodiumBar>
                            </PodiumCard>
                          </motion.div>
                        </Grid>
                      ))}
                    </Grid>
                  </Grid>

                  {/* Right Column: Video */}
            <Grid item xs={12} md={6}>
                <VideoContainer
                    sx={{
                        opacity: isVisible ? 1 : 0.1,
                        transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                    }}
                >
                    <video
                        autoPlay
                        loop
                        muted
                        playsInline
                        src={megaphoneVideo}
                        alt="Ranking Video"
                    >
                        Your browser does not support the video tag.
                    </video>
                </VideoContainer>
            </Grid>
        </Grid>
    </Container>
  );
};

export default LeaderboardPodium;