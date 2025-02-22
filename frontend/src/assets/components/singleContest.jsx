// import { Box, Typography, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
// import FlipTimer from './flip-timer';

// // Sample problem set data - replace with your actual data
// const problems = [
//   { id: 1, title: 'Problem A', difficulty: 'Easy', points: 100 },
//   { id: 2, title: 'Problem B', difficulty: 'Medium', points: 200 },
//   { id: 3, title: 'Problem C', difficulty: 'Hard', points: 300 },
// ];

// const ContestPage = ({ contestTitle = "Contest Title", initialTime = 37230 }) => {
//   return (
//     <Box sx={{ 
//       maxWidth: 1200, 
//       mx: 'auto', 
//       p: 4,
//       position: 'relative'
//     }}>
//       {/* Contest Title */}
//       <Typography 
//         variant="h2" 
//         component="h1" 
//         align="center" 
//         sx={{ mb: 4, fontWeight: 'bold' }}
//       >
//         {contestTitle}
//       </Typography>

//       {/* Timer Section */}
//       <Box sx={{ mb: 2 }}>
//         <FlipTimer initialTime={initialTime} />
//         <Typography 
//           variant="subtitle1" 
//           align="center" 
//           sx={{ mt: 1 }}
//         >
//           To start / to end
//         </Typography>
//       </Box>

//       {/* Problem Set Section */}
//       <Typography 
//         variant="h4" 
//         component="h2" 
//         sx={{ mb: 2 }}
//       >
//         Problem Set
//       </Typography>
      
//       <TableContainer component={Paper} sx={{ mb: 4 }}>
//         <Table>
//           <TableHead>
//             <TableRow>
//               <TableCell>Problem</TableCell>
//               <TableCell>Title</TableCell>
//               <TableCell>Difficulty</TableCell>
//               <TableCell align="right">Points</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {problems.map((problem) => (
//               <TableRow key={problem.id}>
//                 <TableCell>{`Problem ${problem.id}`}</TableCell>
//                 <TableCell>{problem.title}</TableCell>
//                 <TableCell>{problem.difficulty}</TableCell>
//                 <TableCell align="right">{problem.points}</TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>

//       {/* Register Button */}
//       <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
//         <Button 
//           variant="contained" 
//           size="large"
//           sx={{
//             px: 4,
//             py: 1.5,
//             borderRadius: 1,
//             textTransform: 'none',
//             fontSize: '1.1rem'
//           }}
//         >
//           Register
//         </Button>
//       </Box>
//     </Box>
//   );
// };

// export default ContestPage;




import { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  Box, Typography, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow 
} from '@mui/material';
import FlipTimer from './flip-timer';

const ContestPage = ({ contestId }) => {
  const [contest, setContest] = useState(null);
  const [timeRemaining, setTimeRemaining] = useState(0);

  useEffect(() => {
    const fetchContestData = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/contest/single/${contestId}`);
        console.log('API Response:', response.data); // ✅ Log the response to debug

        const contestData = response.data?.contest; 

        if (contestData) {
          setContest(contestData);

          const now = new Date().getTime();
          const startTime = new Date(contestData.start_time).getTime();
          const endTime = new Date(contestData.end_time).getTime();

          if (now < startTime) {
            setTimeRemaining(Math.floor((startTime - now) / 1000));
          } else if (now >= startTime && now < endTime) {
            setTimeRemaining(Math.floor((endTime - now) / 1000));
          } else {
            setTimeRemaining(0);
          }
        }
      } catch (error) {
        console.error('Error fetching contest data:', error);
      }
    };

    fetchContestData();
  }, [contestId]);

  if (!contest) {
    return <Typography variant="h5" align="center">Loading...</Typography>;
  }

  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto', p: 4, position: 'relative' }}>
      <Typography variant="h2" component="h1" align="center" sx={{ mb: 4, fontWeight: 'bold' }}>
        {contest.title}
      </Typography>

      <Box sx={{ mb: 2 }}>
        <FlipTimer initialTime={timeRemaining} />
        <Typography variant="subtitle1" align="center" sx={{ mt: 1 }}>
          {timeRemaining === 0 
            ? 'Contest ended' 
            : new Date().getTime() < new Date(contest.start_time).getTime() 
            ? 'Time to start' 
            : 'Time remaining'}
        </Typography>
      </Box>

      <Typography variant="h4" component="h2" sx={{ mb: 2 }}>
        Problem Set
      </Typography>
      
      <TableContainer component={Paper} sx={{ mb: 4 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Problem</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Difficulty</TableCell>
              <TableCell align="right">Points</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {contest.full_problems?.map((problemData, index) => (
              <TableRow key={problemData.id}>
                <TableCell>{`Problem ${index + 1}`}</TableCell>
                <TableCell>{problemData.problem?.title || 'N/A'}</TableCell>
                <TableCell>{problemData.problem?.tags?.topics?.join(', ') || 'N/A'}</TableCell>
                <TableCell align="right">{problemData.points}</TableCell>
              </TableRow>
            )) || <TableRow><TableCell colSpan={4}>No problems available</TableCell></TableRow>}
          </TableBody>
        </Table>
      </TableContainer>

      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button variant="contained" size="large" sx={{ px: 4, py: 1.5, borderRadius: 1, textTransform: 'none', fontSize: '1.1rem' }}>
          Register
        </Button>
      </Box>
    </Box>
  );
};

export default ContestPage;
