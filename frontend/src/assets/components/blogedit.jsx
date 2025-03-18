import React, { useState, useEffect } from 'react';
import { Container, Typography, TextField, Button, Box, Paper, Grid } from '@mui/material';
import MDEditor from '@uiw/react-md-editor';
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeMathjax from 'rehype-mathjax';
import axios from '../../api';
import { useNavigate, useParams } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';

export default function BlogWriter() {
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      const fetchBlogPost = async () => {
        try {
          const response = await axios.get(`/blog/single/${id}`);
          const blogData = response.data.blog;
          
          setTitle(blogData.title);
          setContent(blogData.content);
          setCategory(blogData.category);
          setLoading(false);
        } catch (error) {
          console.error('Error fetching blog post:', error);
          setLoading(false);
        }
      };
      fetchBlogPost();
    } else {
      setLoading(false);
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const endpoint = id ? '/blog/edit' : '/blog/create';
      const payload = id 
        ? { id, title, content, category }
        : { title, content, category };

      const response = await axios.post(endpoint, payload);

      if (!id) {
        // For new posts, navigate to the created blog
        navigate(`/blog/${response.data.blog.id}`);
      } else {
        // For edits, navigate back to the blog post
        navigate(`/blog/${id}`);
      }

      setError(null);
    } catch (err) {
      if (err.response?.data) {
        setError(err.response.data);
      } else {
        console.error('Error submitting blog post:', err);
      }
    }
  };

  if (loading) {
    return (
      <Container maxWidth="lg">
        <Box sx={{ my: 4, textAlign: 'center' }}>
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          {id ? 'Edit Blog Post' : 'Write a New Blog Post'}
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
                helperText={error?.title?.[0] || ''}
              />
              <TextField
                fullWidth
                label="Category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                margin="normal"
                required
                error={!!error?.category}
                helperText={error?.category?.[0] || ''}
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
                {id ? 'Update Blog Post' : 'Publish Blog Post'}
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