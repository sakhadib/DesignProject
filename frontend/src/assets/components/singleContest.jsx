import { useState, useEffect } from 'react';
import axios from '../../api';
import { 
  Box, Typography, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow 
} from '@mui/material';
import FlipTimer from './flip-timer';
import { useParams } from 'react-router-dom';

const ContestPage = () => {
  const { id } = useParams();
  const [contest, setContest] = useState(null);
  const [timeRemaining, setTimeRemaining] = useState(0);

  useEffect(() => {
    axios.get(/contest/single/${id})
      .then((response) => {
        const contestData = response.data?.contest[0]; // Get the first contest object
        setContest(contestData);

        console.log('API Response:', contestData);

        const currentTime = new Date().getTime();
        const startTime = new Date(contestData.start_time).getTime();
        const endTime = new Date(contestData.end_time).getTime();
        setTimeRemaining(currentTime < startTime ? startTime - currentTime : endTime - currentTime);
      })
      .catch((error) => {
        console.error('API Error:', error);
      });
  }, [id]);  

  if (!contest) {
    return <Typography variant="h5" align="center">Loading...</Typography>;
  }

  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto', p: 4, position: 'relative' }}>
      {/* Contest Title */}
      <Typography variant="h2" component="h1" align="center" sx={{ mb: 4, fontWeight: 'bold' }}>
        {contest.title}
      </Typography>

      {/* Timer Section */}
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

      {/* Contest Details */}
      <Typography variant="h5" sx={{ mb: 2 }}>Description</Typography>
      <Typography variant="body1" sx={{ mb: 3 }}>{contest.description}</Typography>

      <Typography variant="h5" sx={{ mb: 2 }}>Created By</Typography>
      <Typography variant="body1" sx={{ mb: 3 }}>{contest.user?.username || 'Unknown'}</Typography>

      {/* Problem Set Table */}
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
            {/* Since problems aren't provided in the API, handle empty data */}
            {contest.full_problems?.map((problemData, index) => (
              <TableRow key={problemData.id}>
                <TableCell>{Problem ${index + 1}}</TableCell>
                <TableCell>{problemData.problem?.title || 'N/A'}</TableCell>
                <TableCell>{problemData.problem?.tags?.topics?.join(', ') || 'N/A'}</TableCell>
                <TableCell align="right">{problemData.points}</TableCell>
              </TableRow>
            )) || (
              <TableRow>
                <TableCell colSpan={4} align="center">No problems available</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Register Button */}
      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button variant="contained" size="large" sx={{ px: 4, py: 1.5, borderRadius: 1, textTransform: 'none', fontSize: '1.1rem' }}>
          Register
        </Button>
      </Box>
    </Box>
  );
};

export default ContestPage;