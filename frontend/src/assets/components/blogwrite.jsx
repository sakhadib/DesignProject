import React, { useState } from 'react';
import { Container, Typography, TextField, Button, Box, Paper, Grid } from '@mui/material';
import MDEditor from '@uiw/react-md-editor';
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeMathjax from 'rehype-mathjax';
import axios from '../../api';
import { useNavigate } from 'react-router-dom';

export default function BlogWriter() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [error, setError] = useState(null);

  const navigate = useNavigate(); // Initialize useNavigate

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/blog/', {
        title,
        content,
        category,
      });
      console.log('Blog post submitted:', response.data);

      // Clear the form and error state
      setTitle('');
      setContent('');
      setCategory('');
      setError(null);

      // Redirect to the newly created blog page
      navigate(`/blog/${response.data.id}`);
    } catch (err) {
      if (err.response && err.response.data) {
        setError(err.response.data); // Set the error response from the server
      } else {
        console.error('Error submitting blog post:', err);
      }
    }
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Write a New Blog Post
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                margin="normal"
                required
                error={!!error?.title}
                helperText={error?.title ? error.title[0] : ''}
              />
              <TextField
                fullWidth
                label="Category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                margin="normal"
                required
                error={!!error?.category}
                helperText={error?.category ? error.category[0] : ''}
              />
              <Box sx={{ my: 2 }}>
                <Typography variant="h6" gutterBottom>
                  Content
                </Typography>
                <MDEditor
                  value={content}
                  onChange={setContent}
                  preview="edit"
                  height={400}
                />
                {error?.content && (
                  <Typography color="error" variant="body2">
                    {error.content[0]}
                  </Typography>
                )}
              </Box>
              <Button 
                type="submit" 
                variant="contained" 
                color="primary"
                fullWidth
              >
                Publish Blog Post
              </Button>
            </form>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper elevation={3} sx={{ p: 2, height: '100%' }}>
              <Typography variant="h6" gutterBottom>
                Preview
              </Typography>
              <Typography variant="h5" gutterBottom>
                {title || 'Your Title Here'}
              </Typography>
              <ReactMarkdown
                remarkPlugins={[remarkMath]}
                rehypePlugins={[rehypeMathjax]}
              >
                {content || 'Your content here...'}
              </ReactMarkdown>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
