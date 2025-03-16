import React, { useState, useEffect, useRef } from 'react';
import {
  Box,
  Typography,
  Container,
  Grid,
  useMediaQuery
} from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import axios from 'axios';
import { KeyboardArrowUp, KeyboardArrowDown } from '@mui/icons-material';
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css';
import megaphoneVideo from '../img/megaphone.mp4';

const NoticeCard = styled(Box)(({ theme }) => ({
  position: 'relative',
  padding: theme.spacing(2),
  paddingLeft: theme.spacing(3),
  margin: theme.spacing(1, 0),
  borderLeft: `5px solid ${theme.palette.primary.main}`,
  backgroundColor: '#f9f9f9', // Adjust background color if needed
  boxShadow: 'none', // Remove box shadow for flat design
}));

const ScrollContainer = styled(Box)({
  height: '400px',
  overflowY: 'hidden',
  position: 'relative',
});

const VideoContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100%',
  opacity: 0, // Start with opacity 0
  transform: 'translateY(20px)', // Start with slight downward translation
  transition: 'opacity 1s ease-in-out, transform 1s ease-in-out', // Smooth fade-in and upward transition
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

const NoticeSection = () => {
  const [notices, setNotices] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false); // To control opacity change for notices
  const [isVideoVisible, setIsVideoVisible] = useState(false); // To control opacity change for the video
  const sectionRef = useRef(null); // Ref to the section
  const videoRef = useRef(null); // Ref to the video container
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/notice/top')
      .then(response => {
        setNotices(response.data.notices);
      })
      .catch(error => {
        console.error('Error fetching notices', error);
      });

    const timer = setInterval(() => {
      setActiveIndex((current) => 
        current === notices.length - 1 ? 0 : current + 1
      );
    }, 5000);

    return () => clearInterval(timer);
  }, [notices.length]);

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

  // Video fade-in observer
  useEffect(() => {
    const videoObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVideoVisible(true); // Fade in the video when it is in view
        } else {
          setIsVideoVisible(false); // Fade out the video when it is out of view
        }
      },
      { threshold: 0.5 } // Trigger when 50% of the video is in view
    );

    if (videoRef.current) {
      videoObserver.observe(videoRef.current);
    }

    return () => {
      if (videoRef.current) {
        videoObserver.unobserve(videoRef.current);
      }
    };
  }, []);

  const truncateContent = (content) => {
    return content.length > 100 ? content.substring(0, 100) + "..." : content;
  };

  return (
    <Container maxWidth="lg" sx={{ py: 8 }} ref={sectionRef}>
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

      <Grid container spacing={4} alignItems="center">
        <Grid item xs={12} md={5}>
          <VideoContainer
            ref={videoRef}
            sx={{
              opacity: isVideoVisible ? 1 : 0.1,
              transform: isVideoVisible ? 'translateY(0)' : 'translateY(20px)',
            }}
          >
            <video
              autoPlay
              loop
              muted
              playsInline
              src={megaphoneVideo}
              alt="Megaphone announcement"
            >
              Your browser does not support the video tag.
            </video>
          </VideoContainer>
        </Grid>

        <Grid item xs={12} md={7}>
          <Box
            sx={{
              position: 'relative',
              opacity: isVisible ? 1 : 0.1,
              transition: 'opacity 1s ease-in-out',
            }}
          >
            <ScrollContainer>
              <Box
                sx={{
                  transform: `translateY(-${activeIndex * 82}px)`,
                  transition: 'transform 0.5s ease-in-out',
                }}
              >
                {notices.map((notice, index) => (
                  <NoticeCard key={notice.id} elevation={0}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography variant="h6" component="h3" sx={{ color: 'primary.main', fontWeight: 'bold' }}>
                        {notice.title}
                      </Typography>
                      <Typography variant="body2" sx={{ color: 'text.secondary', textAlign: 'right', minWidth: '80px' }}>
                        {new Date(notice.created_at).toLocaleDateString()} <br />
                        {new Date(notice.created_at).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                      </Typography>
                    </Box>
                    <Typography variant="body1" color="text.secondary">
                      <ReactMarkdown
                        children={truncateContent(notice.content)}
                        remarkPlugins={[remarkMath]}
                        rehypePlugins={[rehypeKatex]}
                      />
                    </Typography>
                  </NoticeCard>
                ))}
              </Box>
            </ScrollContainer>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default NoticeSection;
