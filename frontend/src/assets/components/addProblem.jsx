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
  const [answer, setAnswer] = useState('');
  const [note, setNote] = useState('');
  const [tags, setTags] = useState('number theory, math, addition'); // Default example tags

  const handleSubmit = async (e) => {
    e.preventDefault();

    const requestBody = [
      { key: "title", value: questionTitle },
      { key: "description", value: questionBody },
      { key: "xp", value: xp },
      { key: "answer", value: answer },
      { key: "note", value: note },
      {
        key: "tags",
        value: JSON.stringify({
          target: "v5",
          topics: tags.split(',').map((tag) => tag.trim()),
        }),
      },
    ];

    try {
      const response = await fetch("http://127.0.0.1:8000/api/problem/create/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      const data = await response.json();
      if (response.ok) {
        alert(`Success: ${data.message}`);
      } else {
        alert(`Error: ${data.message || "Something went wrong"}`);
      }
    } catch (error) {
      console.error("Error submitting the problem:", error);
      alert("Failed to submit the problem. Please try again.");
    }
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
            <TextField
              fullWidth
              label="Answer"
              variant="outlined"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
            />
            <TextField
              fullWidth
              label="Note"
              variant="outlined"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              multiline
              rows={4}
            />
            <TextField
              fullWidth
              label="Tags (comma-separated)"
              variant="outlined"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
            />
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
