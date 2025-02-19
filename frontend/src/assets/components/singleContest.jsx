import { Box, Typography, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import FlipTimer from './flip-timer';

// Sample problem set data - replace with your actual data
const problems = [
  { id: 1, title: 'Problem A', difficulty: 'Easy', points: 100 },
  { id: 2, title: 'Problem B', difficulty: 'Medium', points: 200 },
  { id: 3, title: 'Problem C', difficulty: 'Hard', points: 300 },
];

const ContestPage = ({ contestTitle = "Contest Title", initialTime = 37230 }) => {
  return (
    <Box sx={{ 
      maxWidth: 1200, 
      mx: 'auto', 
      p: 4,
      position: 'relative'
    }}>
      {/* Contest Title */}
      <Typography 
        variant="h2" 
        component="h1" 
        align="center" 
        sx={{ mb: 4, fontWeight: 'bold' }}
      >
        {contestTitle}
      </Typography>

      {/* Timer Section */}
      <Box sx={{ mb: 2 }}>
        <FlipTimer initialTime={initialTime} />
        <Typography 
          variant="subtitle1" 
          align="center" 
          sx={{ mt: 1 }}
        >
          To start / to end
        </Typography>
      </Box>

      {/* Problem Set Section */}
      <Typography 
        variant="h4" 
        component="h2" 
        sx={{ mb: 2 }}
      >
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
            {problems.map((problem) => (
              <TableRow key={problem.id}>
                <TableCell>{`Problem ${problem.id}`}</TableCell>
                <TableCell>{problem.title}</TableCell>
                <TableCell>{problem.difficulty}</TableCell>
                <TableCell align="right">{problem.points}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Register Button */}
      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button 
          variant="contained" 
          size="large"
          sx={{
            px: 4,
            py: 1.5,
            borderRadius: 1,
            textTransform: 'none',
            fontSize: '1.1rem'
          }}
        >
          Register
        </Button>
      </Box>
    </Box>
  );
};

export default ContestPage;