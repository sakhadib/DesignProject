import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaUsers, FaTrophy, FaClipboardList } from 'react-icons/fa';
import { Box, Container, Typography, Button, Paper, Grid, Avatar, Card, CardContent, CardMedia,} from '@mui/material';

    const LandingPage = () => {
    const [count, setCount] = useState({ users: 0, contests: 0, problems: 0 });

    useEffect(() => {
        const interval = setInterval(() => {
        setCount((prevCount) => ({
            users: Math.min(prevCount.users + 100, 10000),
            contests: Math.min(prevCount.contests + 1, 50),
            problems: Math.min(prevCount.problems + 10, 1000),
        }));
        }, 20);

        return () => clearInterval(interval);
    }, []);

    const notices = [
        { id: 1, title: 'Upcoming Math Olympiad', date: '2024-03-15' },
        { id: 2, title: 'New Problem Set Released', date: '2024-03-10' },
        { id: 3, title: 'Workshop on Advanced Calculus', date: '2024-03-20' },
    ];

    const leaderboard = [
        {
        id: 1,
        name: 'Alex Johnson',
        score: 2500,
        avatar: '/placeholder.svg?height=50&width=50',
        },
        {
        id: 2,
        name: 'Samantha Lee',
        score: 2450,
        avatar: '/placeholder.svg?height=50&width=50',
        },
        {
        id: 3,
        name: 'Michael Chen',
        score: 2400,
        avatar: '/placeholder.svg?height=50&width=50',
        },
    ];

    const blogs = [
        { id: 1, title: 'Mastering Combinatorics', author: 'Dr. Emma Watson' },
        { id: 2, title: 'The Beauty of Prime Numbers', author: 'Prof. Alan Turing' },
        { id: 3, title: 'Geometry in Everyday Life', author: 'Sarah Connor' },
    ];

    return (
        <Box>
        {/* Introductory Section */}
        <Box
            sx={{
            py: 8,
            background: 'linear-gradient(to right, #2196F3, #9C27B0)',
            color: 'white',
            textAlign: 'center',
            }}
        >
            <Container>
            <motion.div
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <Typography variant="h2" fontWeight="bold" gutterBottom>
                Explore the World of Mathematics
                </Typography>
            </motion.div>
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
            >
                <Typography variant="h5" gutterBottom>
                Challenge yourself, compete with others, and unlock your mathematical potential!
                </Typography>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                variant="contained"
                color="primary"
                sx={{ mt: 4, py: 1.5, px: 6, borderRadius: 5 }}
                >
                Get Started
                </Button>
            </motion.div>
            </Container>
        </Box>

        {/* Statistics Section */}
        <Box sx={{ py: 8, backgroundColor: '#fff' }}>
            <Container>
            <Grid container spacing={4} justifyContent="center">
                <Grid item xs={12} md={4} textAlign="center">
                <FaUsers style={{ fontSize: '80px', color: '#1976d2' }} className="text-5xl text-blue-500" />
                <Typography variant="h3" fontWeight="bold">
                    {count.users.toLocaleString()}+
                </Typography>
                <Typography variant="h6" color="textSecondary">
                    Total Users
                </Typography>
                </Grid>
                <Grid item xs={12} md={4} textAlign="center">
                <FaTrophy style={{ fontSize: '80px', color: '#1976d2' }} className="text-5xl text-blue-500" />
                <Typography variant="h3" fontWeight="bold">
                    {count.contests}+
                </Typography>
                <Typography variant="h6" color="textSecondary">
                    Contests Held
                </Typography>
                </Grid>
                <Grid item xs={12} md={4} textAlign="center">
                <FaClipboardList style={{ fontSize: '80px', color: '#1976d2' }} className="text-5xl text-blue-500" />
                <Typography variant="h3" fontWeight="bold">
                    {count.problems.toLocaleString()}+
                </Typography>
                <Typography variant="h6" color="textSecondary">
                    Total Problems
                </Typography>
                </Grid>
            </Grid>
            </Container>
        </Box>

        {/* Notice Board Section */}
        <Box sx={{ py: 8, backgroundColor: '#f7f7f7' }}>
            <Container>
            <Typography variant="h4" fontWeight="bold" textAlign="center" gutterBottom>
                Notice Board
            </Typography>
            <Grid container spacing={3}>
                {notices.map((notice) => (
                <Grid item xs={12} key={notice.id}>
                    <Paper sx={{ p: 3 }}>
                    <Typography variant="h6">{notice.title}</Typography>
                    <Typography color="textSecondary">{notice.date}</Typography>
                    </Paper>
                </Grid>
                ))}
            </Grid>
            <Box textAlign="center" mt={4}>
                <Button variant="contained" color="primary">
                See More
                </Button>
            </Box>
            </Container>
        </Box>

        {/* Leaderboard Section */}
        <Box sx={{ py: 8, backgroundColor: '#fff' }}>
            <Container>
            <Typography variant="h4" fontWeight="bold" textAlign="center" gutterBottom>
                Leaderboard
            </Typography>
            <Grid container spacing={4} justifyContent="center">
                {leaderboard.map((user, index) => (
                <Grid item xs={12} md={4} key={user.id} textAlign="center">
                    <Avatar
                    alt={user.name}
                    src={user.avatar}
                    sx={{ width: 80, height: 80, mx: 'auto', mb: 2 }}
                    />
                    <Typography variant="h6">{user.name}</Typography>
                    <Typography color="textSecondary">Score: {user.score}</Typography>
                    <Typography
                    sx={{ fontSize: 24 }}
                    color={
                        index === 0 ? 'gold' : index === 1 ? 'silver' : 'chocolate'
                    }
                    >
                    {index === 0 ? '🥇' : index === 1 ? '🥈' : '🥉'}
                    </Typography>
                </Grid>
                ))}
            </Grid>
            </Container>
        </Box>

        {/* Blog Section */}
        <Box sx={{ py: 8, backgroundColor: '#f7f7f7' }}>
            <Container>
            <Typography variant="h4" fontWeight="bold" textAlign="center" gutterBottom>
                Latest Blogs
            </Typography>
            <Grid container spacing={3}>
                {blogs.map((blog) => (
                <Grid item xs={12} md={4} key={blog.id}>
                    <Card>
                    <CardContent>
                        <Typography variant="h6" gutterBottom>
                        {blog.title}
                        </Typography>
                        <Typography color="textSecondary">By {blog.author}</Typography>
                    </CardContent>
                    </Card>
                </Grid>
                ))}
            </Grid>
            <Box textAlign="center" mt={4}>
                <Button
                variant="contained"
                color="primary"
                onClick={() => (window.location.href = '/bloghome')}
                >
                See More
                </Button>
            </Box>
            </Container>
        </Box>
        </Box>
    );
    };

    export default LandingPage;
