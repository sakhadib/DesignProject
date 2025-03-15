import React, { useState } from 'react';
import { Avatar, Box, Card, Typography, Container } from '@mui/material';
import { styled } from '@mui/material/styles';

// Sample Blogs Data
const blogs = [
  {
    id: 1,
    title: "Exploring Series: The Building Blocks of Mathematics",
    description: "A series is the sum of terms in a sequence. It can be finite or infinite, with infinite series playing an important role in modern mathematics.",
    author: "mama",
    date: "1/22/2025",
    comments: 0,
    votes: 0,
    avatar: "/placeholder.svg?height=100&width=100" // Placeholder avatar
  },
  {
    id: 2,
    title: "Introduction to Calculus",
    description: "Calculus is the branch of mathematics that studies continuous change. It has applications in a variety of fields like physics, economics, and engineering.",
    author: "john_doe",
    date: "2/14/2025",
    comments: 3,
    votes: 5,
    avatar: "/placeholder.svg?height=100&width=100"
  },
  {
    id: 3,
    title: "Understanding Algebraic Structures",
    description: "Algebraic structures like groups, rings, and fields provide a framework for solving many mathematical problems in abstract ways.",
    author: "alice_smith",
    date: "3/10/2025",
    comments: 5,
    votes: 12,
    avatar: "/placeholder.svg?height=100&width=100"
  },
  {
    id: 4,
    title: "Real Analysis: A Deeper Dive",
    description: "Real analysis is the study of real-valued sequences and functions, focusing on limits, continuity, and differentiability in calculus.",
    author: "charles_wang",
    date: "4/12/2025",
    comments: 2,
    votes: 8,
    avatar: "/placeholder.svg?height=100&width=100"
  },
  {
    id: 5,
    title: "Discrete Mathematics: The Essentials",
    description: "Discrete mathematics is the study of mathematical structures that are fundamentally discrete rather than continuous. It includes topics like graphs, combinatorics, and logic.",
    author: "jane_doe",
    date: "5/20/2025",
    comments: 6,
    votes: 7,
    avatar: "/placeholder.svg?height=100&width=100"
  }
];

// Styled Components for Card
const BlogCard = styled(Card)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  padding: theme.spacing(2),
  backgroundColor: 'white',
  borderRadius: '8px',
  minWidth: 250,
  maxWidth: 350,
  marginRight: theme.spacing(3),
  boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
  transition: 'transform 0.3s ease',
  '&:hover': {
    transform: 'scale(1.05)',
  },
}));

// Styled Components for auto-scroll
const ScrollContainer = styled(Box)({
  display: 'flex',
  overflowX: 'auto',
  scrollBehavior: 'smooth',
  animation: 'scroll 30s linear infinite',
  '@keyframes scroll': {
    '0%': {
      transform: 'translateX(0)',
    },
    '100%': {
      transform: 'translateX(-100%)',
    },
  },
});

const TopBlogSection = () => {
  return (
    <Container maxWidth="xl" sx={{ py: 8 }}>
      <Typography variant="h4" align="center" color="black" gutterBottom>
        Top Blogs
      </Typography>

      <ScrollContainer>
        {blogs.map((blog) => (
          <BlogCard key={blog.id}>
            <Avatar alt={blog.author} src={blog.avatar} sx={{ width: 40, height: 40, marginBottom: 2 }} />
            <Typography variant="h6" color="black" gutterBottom>
              {blog.title}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              {blog.description.substring(0, 100)}...
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {blog.author} | {blog.date}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              Comments: {blog.comments} | Votes: {blog.votes}
            </Typography>
          </BlogCard>
        ))}
      </ScrollContainer>
    </Container>
  );
};

export default TopBlogSection;
