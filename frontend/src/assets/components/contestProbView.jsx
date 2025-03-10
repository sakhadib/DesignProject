import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
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
  CircularProgress,
  Modal
} from '@mui/material';
import ReactMarkdown from "react-markdown"
import remarkMath from "remark-math"
import rehypeKatex from "rehype-katex"
import "katex/dist/katex.min.css" // Import KaTeX CSS for math rendering

const ContestProblemView = () => {
  const { id, contest_id } = useParams();
  const navigate = useNavigate();
  const [answer, setAnswer] = useState('');
  const [problem, setProblem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  useEffect(() => {
    const fetchProblem = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/problem/single/${id}`);
        if (response.data && response.data.problem) {
          setProblem(response.data.problem);
        } else {
          setError("Problem data not found");
        }
      } catch (err) {
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
      return;
    }
    const payload = {
      problem_id: id,
      answer: answer.trim(),
    };
    if (contest_id) {
      payload.contest_id = contest_id;
    }
    try {
      const response = await axios.post("/problem/submit/", payload, {
        headers: { "Content-Type": "application/json" },
      });
      setModalMessage(`${response.data.message} XP Received: ${response.data.xp_recieved}`);
      setModalOpen(true);
      setAnswer("");
    } catch (error) {
      setModalMessage("Failed to submit answer. Please try again.");
      setModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    if (contest_id) {
      navigate(`/contest/single/${contest_id}`);
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
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3, display: 'flex', flexDirection: 'column' }}>
            <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>{problem.title}</Typography>
            <Box sx={{ mb: 3 }}>
              {problem.tags?.topics?.map((topic, index) => (
                <Chip key={index} label={topic} sx={{ mr: 1, mb: 1, backgroundColor: '#1976d2', color: 'white', borderRadius: '16px' }} />
              ))}
            </Box>
            <Typography variant="h5" component="h2" gutterBottom>Problem Statement</Typography>
            <ReactMarkdown children={problem.description} remarkPlugins={[remarkMath]} rehypePlugins={[rehypeKatex]}>
               </ReactMarkdown>
            <Typography variant="h5" component="h2" gutterBottom sx={{ mt: 4 }}>Submit Answer</Typography>
            <form onSubmit={handleSubmit}>
              <TextField fullWidth multiline rows={4} placeholder="Enter your answer here..." value={answer} onChange={(e) => setAnswer(e.target.value)} variant="outlined" sx={{ mb: 2 }} />
              <Button type="submit" variant="contained" fullWidth sx={{ py: 1.5, backgroundColor: '#1976d2', '&:hover': { backgroundColor: '#1565c0' } }}>SUBMIT</Button>
            </form>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, display: 'flex', flexDirection: 'column' }}>
            <Typography variant="h5" component="h2" gutterBottom>Statistics</Typography>
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell>XP</TableCell>
                  <TableCell align="right">{problem.xp}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Topics</TableCell>
                  <TableCell align="right">{problem.tags?.topics?.join(', ') || 'N/A'}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Target</TableCell>
                  <TableCell align="right">{problem.tags?.target || 'N/A'}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Paper>
        </Grid>
      </Grid>
      <Modal open={modalOpen} onClose={handleCloseModal}>
        <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', boxShadow: 24, p: 4, textAlign: 'center' }}>
          <Typography variant="h6" sx={{ mb: 2 }}>{modalMessage}</Typography>
          <Button variant="contained" onClick={handleCloseModal}>OK</Button>
        </Box>
      </Modal>
    </Container>
  );
};

export default ContestProblemView;
