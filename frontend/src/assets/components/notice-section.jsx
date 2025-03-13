import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Card, 
  Typography, 
  Container,
  IconButton
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { KeyboardArrowUp, KeyboardArrowDown } from '@mui/icons-material';

const NoticeCard = styled(Card)(({ theme }) => ({
  position: 'relative',
  padding: theme.spacing(3),
  marginBottom: theme.spacing(2),
  borderLeft: `4px solid ${theme.palette.primary.main}`,
  transition: 'transform 0.3s ease',
  '&:hover': {
    transform: 'translateX(10px)',
  }
}));

const ScrollContainer = styled(Box)({
  height: '400px',
  overflowY: 'hidden',
  position: 'relative',
});

const notices = [
  {
    id: 1,
    title: "Upcoming Seminar on Cryptography & Blockchain",
    content: "Greetings, Math Enthusiasts! We are excited to announce an interactive seminar on Advanced Mathematical Concepts in Cryptography. In this session, we'll dive into the core principles of mathematical foundations that secure digital transactions.",
    date: "Feb 12, 2025",
    time: "02:22 PM"
  },
  {
    id: 2,
    title: "Mathematics Olympiad Registration Open",
    content: "Get ready for the annual Mathematics Olympiad! This year's competition will feature challenging problems from algebra, geometry, and number theory. Early bird registration is now open with special discounts.",
    date: "Feb 15, 2025",
    time: "03:00 PM"
  },
  {
    id: 3,
    title: "New Problem Set Released",
    content: "We've just released a new set of challenging mathematics problems! This collection includes advanced calculus, linear algebra, and probability problems designed to test your problem-solving skills.",
    date: "Feb 18, 2025",
    time: "10:00 AM"
  },
  {
    id: 4,
    title: "Workshop on Advanced Calculus",
    content: "Join us for an intensive workshop on Advanced Calculus. Topics will include multivariable calculus, vector analysis, and differential equations. Perfect for students preparing for competitive exams.",
    date: "Feb 20, 2025",
    time: "04:30 PM"
  },
  {
    id: 5,
    title: "Mathematics Quiz Competition",
    content: "Participate in our monthly mathematics quiz competition! Test your skills against other mathematics enthusiasts. Exciting prizes await the winners. Register now to secure your spot.",
    date: "Feb 25, 2025",
    time: "01:00 PM"
  }
];

const NoticeSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((current) => 
        current === notices.length - 1 ? 0 : current + 1
      );
    }, 5000); // Change notice every 5 seconds

    return () => clearInterval(timer);
  }, []);

  const truncateContent = (content, maxLength = 150) => {
    return content.length > maxLength 
      ? `${content.substring(0, maxLength)}...` 
      : content;
  };

  return (
    <Container maxWidth="md" sx={{ py: 8 }}>
      <Typography 
        variant="h4" 
        component="h2" 
        gutterBottom 
        sx={{ 
          fontWeight: 'bold',
          mb: 4,
          textAlign: 'center'
        }}
      >
        Latest Notices
      </Typography>

      <Box sx={{ position: 'relative' }}>
        <ScrollContainer>
          <Box
            sx={{
              transform: `translateY(-${activeIndex * 82}px)`,
              transition: 'transform 0.5s ease-in-out',
            }}
          >
            {notices.map((notice, index) => (
              <NoticeCard key={notice.id} elevation={2}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="h6" component="h3" sx={{ color: 'primary.main', fontWeight: 'bold' }}>
                    {notice.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    {notice.date} <br /> {notice.time}
                  </Typography>
                </Box>
                <Typography variant="body1" color="text.secondary">
                  {truncateContent(notice.content)}
                </Typography>
              </NoticeCard>
            ))}
          </Box>
        </ScrollContainer>

        <Box sx={{ 
          position: 'absolute', 
          right: -48, 
          top: '50%', 
          transform: 'translateY(-50%)',
          display: 'flex',
          flexDirection: 'column'
        }}>
          <IconButton 
            onClick={() => setActiveIndex(prev => prev === 0 ? notices.length - 1 : prev - 1)}
            sx={{ mb: 1 }}
          >
            <KeyboardArrowUp />
          </IconButton>
          <IconButton 
            onClick={() => setActiveIndex(prev => prev === notices.length - 1 ? 0 : prev + 1)}
          >
            <KeyboardArrowDown />
          </IconButton>
        </Box>
      </Box>
    </Container>
  );
};

export default NoticeSection;