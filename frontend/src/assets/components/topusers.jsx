import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Crown } from 'lucide-react';
import { Avatar, Box, Card, Typography, Container, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';

// Players data
const players = [
  {
    id: 1,
    name: "Davis Curtis",
    points: 2569,
    avatar: "/placeholder.svg?height=100&width=100", // Placeholder avatar
    country: "PT",
    position: 1
  },
  {
    id: 2,
    name: "Alena Donin",
    points: 1469,
    avatar: "/placeholder.svg?height=100&width=100", // Placeholder avatar
    country: "FR",
    position: 2
  },
  {
    id: 3,
    name: "Craig Gouse",
    points: 1053,
    avatar: "/placeholder.svg?height=100&width=100", // Placeholder avatar
    country: "CA",
    position: 3
  }
];

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
}));

const PodiumBar = styled(Box)(({ theme }) => ({
  backgroundColor: '#ffffff80',
  borderRadius: '12px',
  padding: theme.spacing(1),
  marginTop: theme.spacing(2),
  width: '80%',
  textAlign: 'center',
}));

const LeaderboardPodium = () => {
  const [hoveredPlayer, setHoveredPlayer] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  // Helper function to get podium order
  const getPodiumOrder = () => {
    const ordered = [...players];
    return [
      ordered.find(p => p.position === 2),
      ordered.find(p => p.position === 1),
      ordered.find(p => p.position === 3),
    ];
  };

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
        background: 'linear-gradient(135deg, #6a1b9a, #d32f2f)', // Keeping gradient background
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

      <Grid container spacing={4} justifyContent="center" alignItems="center">
        {/* Player Cards */}
        {getPodiumOrder().map((player) => (
          <Grid item xs={12} sm={4} key={player.id}>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: player.position * 0.2 }}
              onHoverStart={() => setHoveredPlayer(player.id)}
              onHoverEnd={() => setHoveredPlayer(null)}
            >
              <PodiumCard>
                <Avatar
                  sx={{
                    width: player.position === 1 ? 96 : 80,
                    height: player.position === 1 ? 96 : 80,
                    border: '4px solid #1E2761',
                    backgroundColor: '#1E2761',
                    fontSize: '50px',
                    marginBottom: 2,
                    '& img': {
                      borderRadius: '50%',
                    },
                  }}
                  alt={player.name}
                  src={player.avatar}
                >
                  {player.name[0]}
                </Avatar>

                {player.position === 1 && (
                  <motion.div
                    className="absolute -top-6 left-1/2 -translate-x-1/2"
                    animate={{ y: [0, -4, 0] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  >
                    <Crown className="w-8 h-8 text-yellow-400 drop-shadow-lg" />
                  </motion.div>
                )}

                <Typography variant="h6" color="white" align="center" sx={{ mb: 1 }}>
                  {player.name}
                </Typography>

                <PodiumBar>
                  <Typography variant="body2" color="text.primary">
                    {player.points} QP
                  </Typography>
                </PodiumBar>

                <PodiumBar sx={{ marginTop: 2 }}>
                  <Typography variant="h4" color="white" fontWeight="bold">
                    {player.position}
                  </Typography>
                </PodiumBar>
              </PodiumCard>
            </motion.div>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default LeaderboardPodium;
