import React, { useState } from 'react';
import { Container, Typography, TextField, Button, Box, Paper, Grid } from '@mui/material';
import MDEditor from '@uiw/react-md-editor';
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeMathjax from 'rehype-mathjax';


export default function BlogWriter() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitting blog post:', { title, content });
    setTitle('');
    setContent('');
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
