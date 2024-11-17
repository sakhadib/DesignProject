import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Container, Typography, Paper, TextField, Button, Box, Chip, Grid, Table, TableBody, TableCell, TableContainer, TableRow, Divider, Dialog } from '@mui/material';
import { styled } from '@mui/system';
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css';
import SplitPane from 'react-split';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  marginTop: theme.spacing(3),
}));

const StyledChip = styled(Chip)(({ theme }) => ({
  marginRight: theme.spacing(1),
  marginBottom: theme.spacing(1),
}));

const ProblemDetail = () => {
  const [problem, setProblem] = useState(null); // State to hold the fetched problem
  const [answer, setAnswer] = useState('');
  const [openSplitView, setOpenSplitView] = useState(false); // State to manage split view
  const { id } = useParams();
  const navigate = useNavigate();

  // Fetch problem details from API on component mount or when ID changes
  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/problem/${id}/`)
      .then(response => response.json())
      .then(data => setProblem(data))
      .catch(error => console.error('Error fetching problem:', error));
  }, [id]);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Submitted answer:', answer);
  };

  if (!problem) {
    return <Typography variant="h5">Loading problem details...</Typography>;
  }

  return (
    <Container maxWidth="lg">
      {/** Main Content */}
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

      {/** Help Button */}
      <Button
        variant="contained"
        color="primary"
        style={{
          position: 'fixed',
          bottom: '16px',
          right: '16px',
          zIndex: 10,
        }}
        onClick={() => setOpenSplitView(true)}
      >
        Help
      </Button>

      {/** Split View Dialog */}
      <Dialog
        fullScreen
        open={openSplitView}
        onClose={() => setOpenSplitView(false)}
      >
        <Box style={{ height: '100vh', position: 'relative' }}>
          <Button
            onClick={() => setOpenSplitView(false)}
            style={{
              position: 'absolute',
              right: '8px',
              top: '8px',
              zIndex: 1,
            }}
          >
            Close
          </Button>
          <SplitPane
            split="vertical"
            minSize={200}
            defaultSize="50%"
            style={{ height: '100%' }}
          >
            <Box
              style={{
                height: '100%',
                backgroundColor: '#f0f0f0',
                overflow: 'auto',
                padding: '16px',
              }}
            >
              <Typography variant="h5">Problem Details</Typography>
              <ReactMarkdown
                remarkPlugins={[remarkMath]}
                rehypePlugins={[rehypeKatex]}
              >
                {problem.description}
              </ReactMarkdown>
            </Box>
            <Box
              style={{
                height: '100%',
                backgroundColor: '#e0e0e0',
                overflow: 'auto',
                padding: '16px',
              }}
            >
              <Typography variant="h5">Help Content</Typography>
              <p>Here you can add hints, references, or other helpful information related to the problem.</p>
            </Box>
          </SplitPane>
        </Box>
      </Dialog>
    </Container>
  );
};

export default ProblemDetail;
