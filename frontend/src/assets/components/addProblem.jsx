import React, { useState } from 'react';
import {
  Box,
  Container,
  TextField,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Paper,
  Button,
} from '@mui/material';
import MDEditor from '@uiw/react-md-editor';
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';






export default function AddProblem() {
  const [setterId, setSetterId] = useState('');
  const [setterName, setSetterName] = useState('');
  const [contestId, setContestId] = useState('');
  const [contestName, setContestName] = useState('');
  const [questionTitle, setQuestionTitle] = useState('');
  const [questionId, setQuestionId] = useState('');
  const [xp, setXp] = useState('');
  const [questionBody, setQuestionBody] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle the submission logic here (e.g., sending data to a server).
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h3" component="h1" sx={{ mb: 4, color: 'primary.main' }}>
        Add New Question
      </Typography>

      <form onSubmit={handleSubmit}>
        <Paper sx={{ p: 3, mb: 4 }}>
          <Typography variant="h5" component="h2" sx={{ mb: 3 }}>
            Problem Setter Details
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, mb: 4 }}>
            <TextField
              fullWidth
              label="Setter ID"
              variant="outlined"
              value={setterId}
              onChange={(e) => setSetterId(e.target.value)}
            />
            <TextField
              fullWidth
              label="Setter Name"
              variant="outlined"
              value={setterName}
              onChange={(e) => setSetterName(e.target.value)}
            />
          </Box>
        </Paper>

        <Paper sx={{ p: 3, mb: 4 }}>
          <Typography variant="h5" component="h2" sx={{ mb: 3 }}>
            Contest Details
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, mb: 4 }}>
            <FormControl fullWidth>
              <InputLabel>Contest ID</InputLabel>
              <Select
                label="Contest ID"
                value={contestId}
                onChange={(e) => setContestId(e.target.value)}
              >
                <MenuItem value="">Select contest ID</MenuItem>
                <MenuItem value="1">Contest 1</MenuItem>
                <MenuItem value="2">Contest 2</MenuItem>
              </Select>
            </FormControl>
            <TextField
              fullWidth
              label="Contest Name"
              variant="outlined"
              value={contestName}
              onChange={(e) => setContestName(e.target.value)}
            />
          </Box>
        </Paper>

        <Paper sx={{ p: 3, mb: 4 }}>
          <Typography variant="h5" component="h2" sx={{ mb: 3 }}>
            Question Details
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <TextField
              fullWidth
              label="Question Title"
              variant="outlined"
              value={questionTitle}
              onChange={(e) => setQuestionTitle(e.target.value)}
            />
            <Box sx={{ display: 'flex', gap: 2 }}>
              <TextField
                fullWidth
                label="Question ID"
                variant="outlined"
                value={questionId}
                onChange={(e) => setQuestionId(e.target.value)}
              />
              <TextField
                fullWidth
                label="XP"
                variant="outlined"
                value={xp}
                onChange={(e) => setXp(e.target.value)}
                type="number"
              />
            </Box>
            <Box sx={{ my: 2 }}>
              <Typography variant="h6" gutterBottom>
                Question Body
              </Typography>
              <MDEditor
                value={questionBody}
                onChange={setQuestionBody}
                preview="edit"
                height={400}
              />
            </Box>
          </Box>
        </Paper>

        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 4, mb: 4 }}
        >
          Submit Question
        </Button>
      </form>

      <Paper elevation={3} sx={{ p: 3, mt: 4 }}>
        <Typography variant="h6" gutterBottom>
          Preview
        </Typography>
        <Typography variant="h5" gutterBottom>
          {questionTitle || 'Your Question Title Here'}
        </Typography>
        <ReactMarkdown
          remarkPlugins={[remarkMath]}
          rehypePlugins={[rehypeKatex]}
        >
          {questionBody || 'Your question content will be displayed here in Markdown format...'}
        </ReactMarkdown>
      </Paper>
    </Container>
  );
}
