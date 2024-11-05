// import React, { useState } from 'react';
// import { useNavigate, useParams } from 'react-router-dom';
// import { Container, 
//   Typography, 
//   Paper,
//   TextField,
//   Button,
//   Box,
//   Chip,
//   Grid,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableRow,
//   Divider
// } from '@mui/material';
// import { styled } from '@mui/system';

// const StyledPaper = styled(Paper)(({ theme }) => ({
//   padding: theme.spacing(3),
//   marginTop: theme.spacing(3),
// }));

// const StyledChip = styled(Chip)(({ theme }) => ({
//   marginRight: theme.spacing(1),
//   marginBottom: theme.spacing(1),
// }));

// const ProblemDetail = () => {
//   const [answer, setAnswer] = useState('');
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const problem = {
//     id: 1,
//     title: "Why absent?",
//     author: "Tahsin Islam",
//     contest: "Contest 99v2",
//     description: "The average marks of 24 students is 42. If the student having 88 marks were absent, then what would be the average mark of the students?",
//     tags: ["Average", "Arithmetic", "Mean"],
//     statistics: {
//       maxXP: 100,
//       availableXP: 100,
//       attempts: 632,
//       solved: 21,
//       firstSolve: "@Rayshu"
//     }
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     // Handle submission logic here
//     console.log('Submitted answer:', answer);
//   };

//   return (
//     <Container maxWidth="lg">
//       <Grid container spacing={3}>
//         {/* Problem Content */}
//         <Grid item xs={12} md={8}>
//           <StyledPaper elevation={3}>
//             <Typography variant="h4" gutterBottom>
//               {problem.title}
//             </Typography>
//             <Typography variant="subtitle1" color="textSecondary" gutterBottom>
//               Created by {problem.author} - For {problem.contest}
//             </Typography>
//             <Box my={2}>
//               {problem.tags.map((tag) => (
//                 <StyledChip key={tag} label={tag} color="primary" variant="outlined" />
//               ))}
//             </Box>
//             <Divider />
//             <Box my={3}>
//               <Typography variant="h5" gutterBottom>
//                 Problem Statement
//               </Typography>
//               <Typography variant="body1" paragraph>
//                 {problem.description}
//               </Typography>
//             </Box>
//             <Divider />
//             <Box my={3}>
//               <Typography variant="h5" gutterBottom>
//                 Submit Answer
//               </Typography>
//               <form onSubmit={handleSubmit}>
//                 <TextField
//                   fullWidth
//                   multiline
//                   rows={4}
//                   variant="outlined"
//                   value={answer}
//                   onChange={(e) => setAnswer(e.target.value)}
//                   placeholder="Enter your answer here..."
//                   margin="normal"
//                 />
//                 <Button 
//                   type="submit" 
//                   variant="contained" 
//                   color="primary"
//                   fullWidth
//                   size="large"
//                 >
//                   Submit
//                 </Button>
//               </form>
//             </Box>
//           </StyledPaper>
//         </Grid>

//         {/* Statistics Sidebar */}
//         <Grid item xs={12} md={4}>
//           <StyledPaper elevation={3}>
//             <Typography variant="h5" gutterBottom>
//               Statistics
//             </Typography>
//             <TableContainer>
//               <Table>
//                 <TableBody>
//                   <TableRow>
//                     <TableCell>Max XP</TableCell>
//                     <TableCell align="right">{problem.statistics.maxXP}</TableCell>
//                   </TableRow>
//                   <TableRow>
//                     <TableCell>Available XP</TableCell>
//                     <TableCell align="right">{problem.statistics.availableXP}</TableCell>
//                   </TableRow>
//                   <TableRow>
//                     <TableCell>Attempts</TableCell>
//                     <TableCell align="right">{problem.statistics.attempts}</TableCell>
//                   </TableRow>
//                   <TableRow>
//                     <TableCell>Solved</TableCell>
//                     <TableCell align="right">{problem.statistics.solved}</TableCell>
//                   </TableRow>
//                   <TableRow>
//                     <TableCell>First Solve</TableCell>
//                     <TableCell align="right">{problem.statistics.firstSolve}</TableCell>
//                   </TableRow>
//                 </TableBody>
//               </Table>
//             </TableContainer>
//           </StyledPaper>
//         </Grid>
//       </Grid>
//     </Container>
//   );
// };

// export default ProblemDetail;


// ------------ EI PART KAJ KORE ------------


// import React, { useState, useEffect } from 'react';
// import { useNavigate, useParams } from 'react-router-dom';
// import { Container, Typography, Paper, TextField, Button, Box, Chip, Grid, Table, TableBody, TableCell, TableContainer, TableRow, Divider } from '@mui/material';
// import { styled } from '@mui/system';

// const problems = [
//   {
//     id: 1,
//     title: "Test Problem 1",
//     author: "avro",
//     category: "simpleMath",
//     created_at: "2024-11-03T09:54:52.681262Z",
//     updated_at: "2024-11-03T12:43:31.880479Z",
//     description : "The average marks of 24 students is 42. If the student having 88 marks were absent, then what would be the average mark of the students?",
//   },
  
//   {
//     id: 2,
//     title: "Advanced Algebra",
//     author: "mathwhiz",
//     category: "algebra",
//     created_at: "2024-11-04T10:00:00.000000Z",
//     updated_at: "2024-11-04T11:30:00.000000Z",
//     description : "Solve the following equation: 2x^2 + 3x - 5 = 0",
//   },

//   {
//     id: 3,
//     title: "Geometry Basics",
//     author: "shapemaster",
//     category: "geometry",
//     created_at: "2024-11-05T14:30:00.000000Z",
//     updated_at: "2024-11-05T15:45:00.000000Z",
//     description : "Calculate the area of a circle with radius 5 units.",
//   },

//   {
//     id: 4,
//     title: "Test Problem 2",
//     author: "avro",
//     category: "simpleMath",
//     created_at: "2024-11-03T09:54:52.681262Z",
//     updated_at: "2024-11-03T12:43:31.880479Z",
//     description : "What is the sum of the first 100 positive integers?",
//   },

//   {
//     id: 5,
//     title: "Test Problem 3",
//     author: "avro",
//     category: "simpleMath",
//     created_at: "2024-11-03T09:54:52.681262Z",
//     updated_at: "2024-11-03T12:43:31.880479Z",
//     description : "If a car travels at 60 km/h, how far will it travel in 5 hours?",
//   },

//   {
//     id: 6,
//     title: "Test Problem 4",
//     author: "shapemaster",
//     category: "geometry",
//     created_at: "2024-11-05T14:30:00.000000Z",
//     updated_at: "2024-11-05T15:45:00.000000Z",
//     description : "Calculate the volume of a sphere with radius 3 units.",
//   }
// ];

// const StyledPaper = styled(Paper)(({ theme }) => ({
//   padding: theme.spacing(3),
//   marginTop: theme.spacing(3),
// }));

// const StyledChip = styled(Chip)(({ theme }) => ({
//   marginRight: theme.spacing(1),
//   marginBottom: theme.spacing(1),
// }));

// const ProblemDetail = () => {
//   const [answer, setAnswer] = useState('');
//   const { id } = useParams();
//   const navigate = useNavigate();
  
//   const problem = problems.find((p) => p.id === parseInt(id)); // Find problem by ID

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     console.log('Submitted answer:', answer);
//   };

//   if (!problem) {
//     return <Typography variant="h5">Problem not found</Typography>; // Display if problem is missing
//   }

//   return (
//     <Container maxWidth="lg">
//       <Grid container spacing={3}>
//         {/* Problem Content */}
//         <Grid item xs={12} md={8}>
//           <StyledPaper elevation={3}>
//             <Typography variant="h4" gutterBottom>
//               {problem.title}
//             </Typography>
//             <Typography variant="subtitle1" color="textSecondary" gutterBottom>
//               Created by {problem.author} - For {problem.category}
//             </Typography>
//             <Box my={2}>
//               {problem.tags && problem.tags.map((tag) => (
//                 <StyledChip key={tag} label={tag} color="primary" variant="outlined" />
//               ))}
//             </Box>
//             <Divider />
//             <Box my={3}>
//               <Typography variant="h5" gutterBottom>
//                 Problem Statement
//               </Typography>
//               <Typography variant="body1" paragraph>
//                 {problem.description}
//               </Typography>
//             </Box>
//             <Divider />
//             <Box my={3}>
//               <Typography variant="h5" gutterBottom>
//                 Submit Answer
//               </Typography>
//               <form onSubmit={handleSubmit}>
//                 <TextField
//                   fullWidth
//                   multiline
//                   rows={4}
//                   variant="outlined"
//                   value={answer}
//                   onChange={(e) => setAnswer(e.target.value)}
//                   placeholder="Enter your answer here..."
//                   margin="normal"
//                 />
//                 <Button 
//                   type="submit" 
//                   variant="contained" 
//                   color="primary"
//                   fullWidth
//                   size="large"
//                 >
//                   Submit
//                 </Button>
//               </form>
//             </Box>
//           </StyledPaper>
//         </Grid>

//         {/* Statistics Sidebar */}
//         <Grid item xs={12} md={4}>
//           <StyledPaper elevation={3}>
//             <Typography variant="h5" gutterBottom>
//               Statistics
//             </Typography>
//             <TableContainer>
//               <Table>
//                 <TableBody>
//                   <TableRow>
//                     <TableCell>Max XP</TableCell>
//                     <TableCell align="right">{problem.statistics?.maxXP || 'N/A'}</TableCell>
//                   </TableRow>
//                   <TableRow>
//                     <TableCell>Available XP</TableCell>
//                     <TableCell align="right">{problem.statistics?.availableXP || 'N/A'}</TableCell>
//                   </TableRow>
//                   <TableRow>
//                     <TableCell>Attempts</TableCell>
//                     <TableCell align="right">{problem.statistics?.attempts || 'N/A'}</TableCell>
//                   </TableRow>
//                   <TableRow>
//                     <TableCell>Solved</TableCell>
//                     <TableCell align="right">{problem.statistics?.solved || 'N/A'}</TableCell>
//                   </TableRow>
//                   <TableRow>
//                     <TableCell>First Solve</TableCell>
//                     <TableCell align="right">{problem.statistics?.firstSolve || 'N/A'}</TableCell>
//                   </TableRow>
//                 </TableBody>
//               </Table>
//             </TableContainer>
//           </StyledPaper>
//         </Grid>
//       </Grid>
//     </Container>
//   );
// };

// export default ProblemDetail;



import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Container, Typography, Paper, TextField, Button, Box, Chip, Grid, Table, TableBody, TableCell, TableContainer, TableRow, Divider } from '@mui/material';
import { styled } from '@mui/system';
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css';


const problems = [
  {
    id: 1,
    title: "Test Problem 1",
    author: "avro",
    category: "simpleMath",
    created_at: "2024-11-03T09:54:52.681262Z",
    updated_at: "2024-11-03T12:43:31.880479Z",
    description: "The average marks of 24 students is 42. If the student having **88 marks** were absent, then what would be the average mark of the students?",
  },
  {
    id: 2,
    title: "Advanced Algebra",
    author: "mathwhiz",
    category: "algebra",
    created_at: "2024-11-04T10:00:00.000000Z",
    updated_at: "2024-11-04T11:30:00.000000Z",
    description: "Solve the following equation: $2x^2 + 3x - 5 = 0$",
  },
  // Additional problem objects...
];

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  marginTop: theme.spacing(3),
}));

const StyledChip = styled(Chip)(({ theme }) => ({
  marginRight: theme.spacing(1),
  marginBottom: theme.spacing(1),
}));

const ProblemDetail = () => {
  const [answer, setAnswer] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();
  
  const problem = problems.find((p) => p.id === parseInt(id)); // Find problem by ID

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Submitted answer:', answer);
  };

  if (!problem) {
    return <Typography variant="h5">Problem not found</Typography>; // Display if problem is missing
  }

  return (
    <Container maxWidth="lg">
      <Grid container spacing={3}>
        {/* Problem Content */}
        <Grid item xs={12} md={8}>
          <StyledPaper elevation={3}>
            <Typography variant="h4" gutterBottom>
              {problem.title}
            </Typography>
            <Typography variant="subtitle1" color="textSecondary" gutterBottom>
              Created by {problem.author} - For {problem.category}
            </Typography>
            <Box my={2}>
              {problem.tags && problem.tags.map((tag) => (
                <StyledChip key={tag} label={tag} color="primary" variant="outlined" />
              ))}
            </Box>
            <Divider />
            <Box my={3}>
              <Typography variant="h5" gutterBottom>
                Problem Statement
              </Typography>
              <ReactMarkdown
                  remarkPlugins={[remarkMath]}
                  rehypePlugins={[rehypeKatex]}
                >
                  {problem.description}
              </ReactMarkdown>

            </Box>
            <Divider />
            <Box my={3}>
              <Typography variant="h5" gutterBottom>
                Submit Answer
              </Typography>
              <form onSubmit={handleSubmit}>
                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  variant="outlined"
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  placeholder="Enter your answer here..."
                  margin="normal"
                />
                <Button 
                  type="submit" 
                  variant="contained" 
                  color="primary"
                  fullWidth
                  size="large"
                >
                  Submit
                </Button>
              </form>
            </Box>
          </StyledPaper>
        </Grid>

        {/* Statistics Sidebar */}
        <Grid item xs={12} md={4}>
          <StyledPaper elevation={3}>
            <Typography variant="h5" gutterBottom>
              Statistics
            </Typography>
            <TableContainer>
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell>Max XP</TableCell>
                    <TableCell align="right">{problem.statistics?.maxXP || 'N/A'}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Available XP</TableCell>
                    <TableCell align="right">{problem.statistics?.availableXP || 'N/A'}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Attempts</TableCell>
                    <TableCell align="right">{problem.statistics?.attempts || 'N/A'}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Solved</TableCell>
                    <TableCell align="right">{problem.statistics?.solved || 'N/A'}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>First Solve</TableCell>
                    <TableCell align="right">{problem.statistics?.firstSolve || 'N/A'}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </StyledPaper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ProblemDetail;
