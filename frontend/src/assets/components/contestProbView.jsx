import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../../api';
import {
  Box,
  Typography,
  TextField,
  Button,
  Chip,
  Paper,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Container,
  CircularProgress
} from '@mui/material';

const ContestProblemView = () => {
  const { id, contest_id } = useParams();  // ✅ Extract problem_id & contest_id from URL
  const [answer, setAnswer] = useState('');
  const [problem, setProblem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch problem data when component mounts
  useEffect(() => {
    const fetchProblem = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/problem/single/${id}`);
        console.log("Fetched problem data:", response.data);

        if (response.data && response.data.problem) {
          setProblem(response.data.problem);
        } else {
          setError("Problem data not found");
        }
      } catch (err) {
        console.error("Error fetching problem:", err);
        setError("Failed to load problem. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchProblem();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!id) {
      console.error("⚠️ Problem ID is missing. Cannot submit.");
      alert("Submission failed: Problem ID is missing.");
      return;
    }
  
    const payload = {
      problem_id: id,  // ✅ Use problem_id from URL
      answer: answer.trim(),  // Make sure the answer is trimmed
    };
  
    if (contest_id) {
      payload.contest_id = contest_id;  // ✅ Add contest_id if available
    }
  
    console.log("🚀 Submitting payload:", JSON.stringify(payload, null, 2));
  
    try {
      const response = await axios.post("/problem/submit/", payload, {
        headers: { "Content-Type": "application/json" },
      });
  
      console.log("✅ Response received:", response.data);
      alert(response.data.message + ` XP Received: ${response.data.xp_recieved}`);
      setAnswer("");  // Clear the answer field on successful submission
    } catch (error) {
      console.error("❌ Submission Error:", error);
      alert("Failed to submit answer. Please try again.");
    }
  };
  

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4, display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
        <CircularProgress />
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Paper sx={{ p: 3, textAlign: 'center' }}>
          <Typography variant="h6" color="error">{error}</Typography>
        </Paper>
      </Container>
    );
  }

  if (!problem) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Paper sx={{ p: 3, textAlign: 'center' }}>
          <Typography variant="h6">Problem not found</Typography>
        </Paper>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        {/* Main content area */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3, display: 'flex', flexDirection: 'column' }}>
            <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
              {problem.title}
            </Typography>

            <Box sx={{ mb: 3 }}>
              {problem.tags?.topics?.map((topic, index) => (
                <Chip
                  key={index}
                  label={topic}
                  sx={{
                    mr: 1,
                    mb: 1,
                    backgroundColor: '#1976d2',
                    color: 'white',
                    borderRadius: '16px'
                  }}
                />
              ))}
            </Box>

            <Typography variant="h5" component="h2" gutterBottom>
              Problem Statement
            </Typography>

            <Typography variant="body1" paragraph>
              {problem.description}
            </Typography>

            <Typography variant="h5" component="h2" gutterBottom sx={{ mt: 4 }}>
              Submit Answer
            </Typography>

            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                multiline
                rows={4}
                placeholder="Enter your answer here..."
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                variant="outlined"
                sx={{ mb: 2 }}
              />

              <Button
                type="submit"
                variant="contained"
                fullWidth
                sx={{
                  py: 1.5,
                  backgroundColor: '#1976d2',
                  '&:hover': {
                    backgroundColor: '#1565c0',
                  }
                }}
              >
                SUBMIT
              </Button>
            </form>
          </Paper>
        </Grid>

        {/* Statistics sidebar */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, display: 'flex', flexDirection: 'column' }}>
            <Typography variant="h5" component="h2" gutterBottom>
              Statistics
            </Typography>

            <Table>
              <TableBody>
                <TableRow>
                  <TableCell sx={{ border: 'none', pl: 0, py: 1.5 }}>
                    <Typography variant="body1">XP</Typography>
                  </TableCell>
                  <TableCell align="right" sx={{ border: 'none', pr: 0, py: 1.5 }}>
                    <Typography variant="body1" color="text.secondary">{problem.xp}</Typography>
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell sx={{ border: 'none', pl: 0, py: 1.5 }}>
                    <Typography variant="body1">Topics</Typography>
                  </TableCell>
                  <TableCell align="right" sx={{ border: 'none', pr: 0, py: 1.5 }}>
                    <Typography variant="body1" color="text.secondary">
                      {problem.tags?.topics?.join(', ') || 'N/A'}
                    </Typography>
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell sx={{ border: 'none', pl: 0, py: 1.5 }}>
                    <Typography variant="body1">Target</Typography>
                  </TableCell>
                  <TableCell align="right" sx={{ border: 'none', pr: 0, py: 1.5 }}>
                    <Typography variant="body1" color="text.secondary">
                      {problem.tags?.target || 'N/A'}
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ContestProblemView;
