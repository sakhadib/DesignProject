// import React, { useState, useEffect } from 'react';
// import { 
//   Box, 
//   Card, 
//   Typography, 
//   Container,
//   IconButton,
//   Grid,
//   useMediaQuery
// } from '@mui/material';
// import { styled, useTheme } from '@mui/material/styles';
// import { KeyboardArrowUp, KeyboardArrowDown } from '@mui/icons-material';
// // Import the video
// import megaphoneVideo from '../img/megaphone.mp4';

// const NoticeCard = styled(Card)(({ theme }) => ({
//   position: 'relative',
//   padding: theme.spacing(3),
//   marginBottom: theme.spacing(2),
//   borderLeft: `4px solid ${theme.palette.primary.main}`,
//   transition: 'transform 0.3s ease',
//   '&:hover': {
//     transform: 'translateX(10px)',
//   }
// }));

// const ScrollContainer = styled(Box)({
//   height: '400px',
//   overflowY: 'hidden',
//   position: 'relative',
// });

// // Video container styling
// const VideoContainer = styled(Box)(({ theme }) => ({
//   display: 'flex',
//   justifyContent: 'center',
//   alignItems: 'center',
//   height: '100%',
//   '& video': {
//     maxWidth: '100%',
//     maxHeight: '300px',
//     objectFit: 'contain',
//     borderRadius: theme.shape.borderRadius,
//   },
//   [theme.breakpoints.down('md')]: {
//     marginBottom: theme.spacing(4),
//   }
// }));

// const notices = [
//   {
//     id: 1,
//     title: "Upcoming Seminar on Cryptography & Blockchain",
//     content: "Greetings, Math Enthusiasts! We are excited to announce an interactive seminar on Advanced Mathematical Concepts in Cryptography. In this session, we'll dive into the core principles of mathematical foundations that secure digital transactions.",
//     date: "Feb 12, 2025",
//     time: "02:22 PM"
//   },
//   {
//     id: 2,
//     title: "Mathematics Olympiad Registration Open",
//     content: "Get ready for the annual Mathematics Olympiad! This year's competition will feature challenging problems from algebra, geometry, and number theory. Early bird registration is now open with special discounts.",
//     date: "Feb 15, 2025",
//     time: "03:00 PM"
//   },
//   {
//     id: 3,
//     title: "New Problem Set Released",
//     content: "We've just released a new set of challenging mathematics problems! This collection includes advanced calculus, linear algebra, and probability problems designed to test your problem-solving skills.",
//     date: "Feb 18, 2025",
//     time: "10:00 AM"
//   },
//   {
//     id: 4,
//     title: "Workshop on Advanced Calculus",
//     content: "Join us for an intensive workshop on Advanced Calculus. Topics will include multivariable calculus, vector analysis, and differential equations. Perfect for students preparing for competitive exams.",
//     date: "Feb 20, 2025",
//     time: "04:30 PM"
//   },
//   {
//     id: 5,
//     title: "Mathematics Quiz Competition",
//     content: "Participate in our monthly mathematics quiz competition! Test your skills against other mathematics enthusiasts. Exciting prizes await the winners. Register now to secure your spot.",
//     date: "Feb 25, 2025",
//     time: "01:00 PM"
//   }
// ];

// const NoticeSection = () => {
//   const [activeIndex, setActiveIndex] = useState(0);
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down('md'));

//   useEffect(() => {
//     const timer = setInterval(() => {
//       setActiveIndex((current) => 
//         current === notices.length - 1 ? 0 : current + 1
//       );
//     }, 5000); // Change notice every 5 seconds

//     return () => clearInterval(timer);
//   }, []);

//   const truncateContent = (content, maxLength = 150) => {
//     return content.length > maxLength 
//       ? `${content.substring(0, maxLength)}...` 
//       : content;
//   };

//   return (
//     <Container maxWidth="lg" sx={{ py: 8 }}>
//       <Typography 
//         variant="h4" 
//         component="h2" 
//         gutterBottom 
//         sx={{ 
//           fontWeight: 'bold',
//           mb: 4,
//           textAlign: 'center'
//         }}
//       >
//         Latest Notices
//       </Typography>

//       <Grid container spacing={4} alignItems="center">
//         {/* Video Column */}
//         <Grid item xs={12} md={5}>
//           <VideoContainer>
//             <video
//               autoPlay
//               loop
//               muted
//               playsInline
//               src={megaphoneVideo}
//               alt="Megaphone announcement"
//             >
//               Your browser does not support the video tag.
//             </video>
//           </VideoContainer>
//         </Grid>

//         {/* Notices Column */}
//         <Grid item xs={12} md={7}>
//           <Box sx={{ position: 'relative' }}>
//             <ScrollContainer>
//               <Box
//                 sx={{
//                   transform: `translateY(-${activeIndex * 82}px)`,
//                   transition: 'transform 0.5s ease-in-out',
//                 }}
//               >
//                 {notices.map((notice, index) => (
//                   <NoticeCard key={notice.id} elevation={2}>
//                     <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
//                       <Typography variant="h6" component="h3" sx={{ color: 'primary.main', fontWeight: 'bold' }}>
//                         {notice.title}
//                       </Typography>
//                       <Typography variant="body2" sx={{ color: 'text.secondary', textAlign: 'right', minWidth: '80px' }}>
//                         {notice.date} <br /> {notice.time}
//                       </Typography>
//                     </Box>
//                     <Typography variant="body1" color="text.secondary">
//                       {truncateContent(notice.content)}
//                     </Typography>
//                   </NoticeCard>
//                 ))}
//               </Box>
//             </ScrollContainer>

//             <Box sx={{ 
//               position: 'absolute', 
//               right: -48, 
//               top: '50%', 
//               transform: 'translateY(-50%)',
//               display: 'flex',
//               flexDirection: 'column'
//             }}>
//               <IconButton 
//                 onClick={() => setActiveIndex(prev => prev === 0 ? notices.length - 1 : prev - 1)}
//                 sx={{ mb: 1 }}
//               >
//                 <KeyboardArrowUp />
//               </IconButton>
//               <IconButton 
//                 onClick={() => setActiveIndex(prev => prev === notices.length - 1 ? 0 : prev + 1)}
//               >
//                 <KeyboardArrowDown />
//               </IconButton>
//             </Box>
//           </Box>
//         </Grid>
//       </Grid>
//     </Container>
//   );
// };

// export default NoticeSection;






// import React, { useState, useEffect } from 'react';
// import {
//   Box,
//   Card,
//   Typography,
//   Container,
//   IconButton,
//   Grid,
//   useMediaQuery
// } from '@mui/material';
// import { styled, useTheme } from '@mui/material/styles';
// import { KeyboardArrowUp, KeyboardArrowDown } from '@mui/icons-material';
// import axios from 'axios'; // Import axios to handle HTTP requests
// import megaphoneVideo from '../img/megaphone.mp4';

// const NoticeCard = styled(Card)(({ theme }) => ({
//   position: 'relative',
//   padding: theme.spacing(3),
//   marginBottom: theme.spacing(2),
//   borderLeft: `4px solid ${theme.palette.primary.main}`,
//   transition: 'transform 0.3s ease',
//   '&:hover': {
//     transform: 'translateX(10px)',
//   }
// }));

// const ScrollContainer = styled(Box)({
//   height: '400px',
//   overflowY: 'hidden',
//   position: 'relative',
// });

// const VideoContainer = styled(Box)(({ theme }) => ({
//   display: 'flex',
//   justifyContent: 'center',
//   alignItems: 'center',
//   height: '100%',
//   '& video': {
//     maxWidth: '100%',
//     maxHeight: '300px',
//     objectFit: 'contain',
//     borderRadius: theme.shape.borderRadius,
//   },
//   [theme.breakpoints.down('md')]: {
//     marginBottom: theme.spacing(4),
//   }
// }));

// const NoticeSection = () => {
//   const [notices, setNotices] = useState([]);
//   const [activeIndex, setActiveIndex] = useState(0);
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down('md'));

//   useEffect(() => {
//     axios.get('http://127.0.0.1:8000/api/notice/top')
//       .then(response => {
//         setNotices(response.data.notices);
//       })
//       .catch(error => {
//         console.error('Error fetching notices', error);
//       });

//     const timer = setInterval(() => {
//       setActiveIndex((current) => 
//         current === notices.length - 1 ? 0 : current + 1
//       );
//     }, 5000); // Change notice every 5 seconds

//     return () => clearInterval(timer);
//   }, [notices.length]);

//   const truncateContent = (content, maxLength = 150) => {
//     return content.length > maxLength 
//       ? `${content.substring(0, maxLength)}...` 
//       : content;
//   };

//   return (
//     <Container maxWidth="lg" sx={{ py: 8 }}>
//       <Typography 
//         variant="h4" 
//         component="h2" 
//         gutterBottom 
//         sx={{ 
//           fontWeight: 'bold',
//           mb: 4,
//           textAlign: 'center'
//         }}
//       >
//         Latest Notices
//       </Typography>

//       <Grid container spacing={4} alignItems="center">
//         <Grid item xs={12} md={5}>
//           <VideoContainer>
//             <video
//               autoPlay
//               loop
//               muted
//               playsInline
//               src={megaphoneVideo}
//               alt="Megaphone announcement"
//             >
//               Your browser does not support the video tag.
//             </video>
//           </VideoContainer>
//         </Grid>

//         <Grid item xs={12} md={7}>
//           <Box sx={{ position: 'relative' }}>
//             <ScrollContainer>
//               <Box
//                 sx={{
//                   transform: `translateY(-${activeIndex * 82}px)`,
//                   transition: 'transform 0.5s ease-in-out',
//                 }}
//               >
//                 {notices.map((notice, index) => (
//                   <NoticeCard key={notice.id} elevation={2}>
//                     <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
//                       <Typography variant="h6" component="h3" sx={{ color: 'primary.main', fontWeight: 'bold' }}>
//                         {notice.title}
//                       </Typography>
//                       <Typography variant="body2" sx={{ color: 'text.secondary', textAlign: 'right', minWidth: '80px' }}>
//                         {new Date(notice.created_at).toLocaleDateString()} <br />
//                         {new Date(notice.created_at).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
//                       </Typography>
//                     </Box>
//                     <Typography variant="body1" color="text.secondary">
//                       {truncateContent(notice.content)}
//                     </Typography>
//                   </NoticeCard>
//                 ))}
//               </Box>
//             </ScrollContainer>

//             <Box sx={{ 
//               position: 'absolute', 
//               right: -48, 
//               top: '50%', 
//               transform: 'translateY(-50%)',
//               display: 'flex',
//               flexDirection: 'column'
//             }}>
//               <IconButton 
//                 onClick={() => setActiveIndex(prev => prev === 0 ? notices.length - 1 : prev - 1)}
//                 sx={{ mb: 1 }}
//               >
//                 <KeyboardArrowUp />
//               </IconButton>
//               <IconButton 
//                 onClick={() => setActiveIndex(prev => prev === notices.length - 1 ? 0 : prev + 1)}
//               >
//                 <KeyboardArrowDown />
//               </IconButton>
//             </Box>
//           </Box>
//         </Grid>
//       </Grid>
//     </Container>
//   );
// };

// export default NoticeSection;





import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  Typography,
  Container,
  IconButton,
  Grid,
  useMediaQuery
} from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import { KeyboardArrowUp, KeyboardArrowDown } from '@mui/icons-material';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css'; // LaTeX styles
import megaphoneVideo from '../img/megaphone.mp4';

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

const VideoContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100%',
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

  const truncateContent = (content) => {
    return content.length > 100 ? content.substring(0, 100) + "..." : content;
  };

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
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
          <VideoContainer>
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
          <Box sx={{ position: 'relative'}}>
            <ScrollContainer>
              <Box
                sx={{
                  transform: `translateY(-${activeIndex * 82}px)`,
                  transition: 'transform 0.5s ease-in-out',
                }}
              >
                {notices.map((notice, index) => (
                  <NoticeCard key={notice.id} elevation={2}  sx={{backgroundColor: '#E6E6E6'}}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1}}>
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
