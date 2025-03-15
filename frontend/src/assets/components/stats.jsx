// import React, { useEffect, useState } from 'react';
// import { Box, Typography, Container, Grid } from '@mui/material';
// import { Person, EmojiEvents, Functions } from '@mui/icons-material';
// import { styled } from '@mui/material/styles';

// const StyledIcon = styled(Box)(({ theme }) => ({
//   '& .MuiSvgIcon-root': {
//     fontSize: '3.5rem', // Increased icon size
//     color: '#000', // Black color to match the image
//     marginRight: theme.spacing(3),
//   }
// }));

// const CountItem = ({ icon, endValue, label }) => {
//   const [count, setCount] = useState(0);
  
//   useEffect(() => {
//     const duration = 2000; // 2 seconds duration
//     const steps = 60; // 60 steps (for smooth animation)
//     const stepValue = endValue / steps;
//     const stepTime = duration / steps;
//     let currentStep = 0;

//     const timer = setInterval(() => {
//       currentStep += 1;
//       if (currentStep === steps) {
//         setCount(endValue);
//         clearInterval(timer);
//       } else {
//         setCount(Math.floor(stepValue * currentStep));
//       }
//     }, stepTime);

//     return () => clearInterval(timer);
//   }, [endValue]);

//   return (
//     <Box sx={{ 
//       display: 'flex', 
//       alignItems: 'center',
//       justifyContent: { xs: 'center', md: 'flex-start' }
//     }}>
//       <StyledIcon>
//         {icon}
//       </StyledIcon>
//       <Box>
//         <Typography 
//           variant="h3" 
//           component="div" 
//           sx={{ 
//             fontWeight: 'bold',
//             lineHeight: 1.2,
//             fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' }
//           }}
//         >
//           {count}
//         </Typography>
//         <Typography 
//           variant="h6" 
//           component="div"
//           sx={{ 
//             color: 'text.primary',
//             fontWeight: 'bold',
//             fontSize: { xs: '1.25rem', sm: '1.5rem' }
//           }}
//         >
//           {label}
//         </Typography>
//       </Box>
//     </Box>
//   );
// };

// const CountSection = () => {
//   const stats = [
//     { icon: <Person />, value: 100, label: 'Users' },
//     { icon: <EmojiEvents />, value: 100, label: 'Contests' },
//     { icon: <Functions />, value: 100, label: 'Problems' }
//   ];

//   return (
//     <Container maxWidth="lg" sx={{ py: 8 }}>
//       <Grid 
//         container 
//         spacing={6} 
//         justifyContent="center" 
//         alignItems="center"
//       >
//         {stats.map((stat, index) => (
//           <Grid item xs={12} sm={4} key={index}>
//             <CountItem
//               icon={stat.icon}
//               endValue={stat.value}
//               label={stat.label}
//             />
//           </Grid>
//         ))}
//       </Grid>
//     </Container>
//   );
// };

// export default CountSection;




// import React, { useEffect, useState } from 'react';
// import { Box, Typography, Container, Grid } from '@mui/material';
// import { Person, EmojiEvents, Functions } from '@mui/icons-material';
// import { styled } from '@mui/material/styles';
// import axios from 'axios'; // Import axios to handle HTTP requests

// const StyledIcon = styled(Box)(({ theme }) => ({
//   '& .MuiSvgIcon-root': {
//     fontSize: '3.5rem',
//     color: '#000',
//     marginRight: theme.spacing(3),
//   }
// }));

// const CountItem = ({ icon, endValue, label }) => {
//   const [count, setCount] = useState(0);
  
//   useEffect(() => {
//     const duration = 2000;
//     const steps = 60;
//     const stepValue = endValue / steps;
//     const stepTime = duration / steps;
//     let currentStep = 0;

//     const timer = setInterval(() => {
//       currentStep += 1;
//       if (currentStep === steps) {
//         setCount(endValue);
//         clearInterval(timer);
//       } else {
//         setCount(Math.floor(stepValue * currentStep));
//       }
//     }, stepTime);

//     return () => clearInterval(timer);
//   }, [endValue]);

//   return (
//     <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: { xs: 'center', md: 'flex-start' } }}>
//       <StyledIcon>{icon}</StyledIcon>
//       <Box>
//         <Typography variant="h3" component="div" sx={{ fontWeight: 'bold', lineHeight: 1.2, fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' } }}>
//           {count}
//         </Typography>
//         <Typography variant="h6" component="div" sx={{ color: 'text.primary', fontWeight: 'bold', fontSize: { xs: '1.25rem', sm: '1.5rem' } }}>
//           {label}
//         </Typography>
//       </Box>
//     </Box>
//   );
// };

// const CountSection = () => {
//   const [counts, setCounts] = useState({
//     userCount: 0,
//     publicContestCount: 0,
//     problemCount: 0,
//   });

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get('http://127.0.0.1:8000/api/common/count');
//         setCounts({
//           userCount: response.data.user_count,
//           publicContestCount: response.data.public_contest_count,
//           problemCount: response.data.problem_count,
//         });
//       } catch (error) {
//         console.error('Failed to fetch data', error);
//       }
//     };
//     fetchData();
//   }, []);

//   return (
//     <Container maxWidth="lg" sx={{ py: 8 }}>
//       <Grid container spacing={6} justifyContent="center" alignItems="center">
//         <Grid item xs={12} sm={4}>
//           <CountItem icon={<Person />} endValue={counts.userCount} label="Users" />
//         </Grid>
//         <Grid item xs={12} sm={4}>
//           <CountItem icon={<EmojiEvents />} endValue={counts.publicContestCount} label="Contests" />
//         </Grid>
//         <Grid item xs={12} sm={4}>
//           <CountItem icon={<Functions />} endValue={counts.problemCount} label="Problems" />
//         </Grid>
//       </Grid>
//     </Container>
//   );
// };

// export default CountSection;




import React, { useEffect, useState } from 'react';
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
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: { xs: 'center', md: 'flex-start' } }}>
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
  }, []);

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
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
