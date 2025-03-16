import React, { useState, useEffect, useMemo } from 'react';
import {
    TextField,
    Button,
    IconButton,
    Typography,
    Box,
    Grid,
    Card,
    CardContent,
    Avatar,
    Pagination,
    Container,
    Collapse,
    Chip,
    CircularProgress,
} from '@mui/material';
import { Search as SearchIcon, Add as AddIcon } from '@mui/icons-material';
import { useTheme, useMediaQuery } from '@mui/material';
import Cookies from 'js-cookie';
import axios from '../../api';
import { useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css';
import { deepPurple, deepOrange, blue, green, red } from '@mui/material/colors';

const BlogLayout = () => {
    const navigate = useNavigate();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const [blogPosts, setBlogPosts] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState([]);
    const [expanded, setExpanded] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(true);
    const postsPerPage = 10;

    // Check if user is signed in
    const token = Cookies.get('token') || localStorage.getItem('token');
    const isSignedIn = Boolean(token);

    // Fetch all blog posts
    useEffect(() => {
        const fetchBlogPosts = async () => {
            try {
                const response = await axios.get('/blog/all');
                const sortedPosts = response.data.blogs.sort(
                    (a, b) => new Date(b.created_at) - new Date(a.created_at)
                ); // Sort blogs by created_at in descending order
                setBlogPosts(sortedPosts);
            } catch (error) {
                console.error('Error fetching blog posts:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchBlogPosts();
    }, []);

    const handleCategoryToggle = (category) => {
        setSelectedCategory((prev) =>
            prev.includes(category)
                ? prev.filter((c) => c !== category)
                : [...prev, category]
        );
        setCurrentPage(1);
    };

    const handleToggleExpand = () => {
        setExpanded(!expanded);
    };

    const categoryCounts = useMemo(() => {
        const counts = {};
        blogPosts.forEach((post) => {
            counts[post.category] = (counts[post.category] || 0) + 1;
        });
        return counts;
    }, [blogPosts]);

    const categories = useMemo(() => {
        return ['All Categories', ...Object.keys(categoryCounts)];
    }, [categoryCounts]);

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
        setCurrentPage(1);
    };

    const handleBlogClick = (id) => {
        navigate(`/blog/${id}`);
    };

    const handleWriteBlogClick = () => {
        navigate('/blog/write');
    };

    const filteredPosts = blogPosts.filter((post) => {
        const matchesCategory =
            selectedCategory.length === 0 ||
            selectedCategory.includes('All Categories') ||
            selectedCategory.includes(post.category);
        const matchesSearch =
            post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
            post.category.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

    const handlePageChange = (event, value) => {
        setCurrentPage(value);
    };

    // Function to generate a background color based on the first character
    const getBackgroundColor = (char) => {
        const colors = [deepPurple[500], deepOrange[500], blue[500], green[500], red[500]];
        const index = char.toLowerCase().charCodeAt(0) % colors.length; // Map the character to an index
        return colors[index];
    };

    return (
        <Container>
            <Box sx={{ backgroundColor: '#ffffff', color: 'black', p: 4 }}>
                <Box
                    component="header"
                    mb={4}
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                >
                    <Typography variant="h3" component="h1" fontWeight="bold" gutterBottom>
                        Blog
                    </Typography>
                    {isSignedIn && (
                        isMobile ? (
                            <IconButton
                                onClick={handleWriteBlogClick}
                                color="primary"
                                sx={{ backgroundColor: '#f0f0f0' }}
                            >
                                <AddIcon />
                            </IconButton>
                        ) : (
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleWriteBlogClick}
                            >
                                Write Blog
                            </Button>
                        )
                    )}
                </Box>

                <Box component="nav" mb={4}>
                    <TextField
                        variant="outlined"
                        placeholder="Search..."
                        size="small"
                        fullWidth
                        value={searchQuery}
                        onChange={handleSearchChange}
                        InputProps={{
                            endAdornment: (
                                <IconButton>
                                    <SearchIcon />
                                </IconButton>
                            ),
                            sx: {
                                backgroundColor: '#f0f0f0',
                                color: 'black',
                                borderRadius: '25px',
                            },
                        }}
                        sx={{ mb: 2 }}
                    />

                    <Box>
                        <Collapse in={expanded} collapsedSize={40} timeout="auto">
                            <Grid container spacing={1}>
                                {categories.map((category) => (
                                    <Grid item key={category}>
                                        <Chip
                                            label={
                                                category === 'All Categories'
                                                    ? 'All Categories'
                                                    : `${category} (${categoryCounts[category] || 0})`
                                            }
                                            onClick={() =>
                                                category === 'All Categories'
                                                    ? setSelectedCategory([])
                                                    : handleCategoryToggle(category)
                                            }
                                            color={
                                                selectedCategory.includes(category) ||
                                                (category === 'All Categories' &&
                                                    selectedCategory.length === 0)
                                                    ? 'primary'
                                                    : 'default'
                                            }
                                            variant={
                                                selectedCategory.includes(category) ||
                                                (category === 'All Categories' &&
                                                    selectedCategory.length === 0)
                                                    ? 'filled'
                                                    : 'outlined'
                                            }
                                            sx={{ cursor: 'pointer' }}
                                        />
                                    </Grid>
                                ))}
                            </Grid>
                        </Collapse>
                        <Box textAlign="center" mt={2}>
                            <Button onClick={handleToggleExpand} variant="text">
                                {expanded ? 'Collapse ▲' : 'Expand ▼'}
                            </Button>
                        </Box>
                    </Box>
                </Box>

                {loading ? (
                    <Box display="flex" justifyContent="center" alignItems="center" height="50vh">
                        <CircularProgress />
                    </Box>
                ) : (
                    <>
                        <Grid container spacing={4}>
                            {currentPosts.map((post) => (
                                <Grid item xs={12} md={6} key={post.id}>
                                    <Card
                                        onClick={() => handleBlogClick(post.id)}
                                        sx={{
                                            cursor: 'pointer',
                                            backgroundColor: '#f9f9f9',
                                        }}
                                    >
                                        <CardContent>
                                            <Typography variant="subtitle2" color="textSecondary">
                                                {post.category}
                                            </Typography>
                                            <Typography variant="h6" fontWeight="bold" gutterBottom>
                                                {post.title}
                                            </Typography>
                                            <ReactMarkdown
                                                remarkPlugins={[remarkMath]}
                                                rehypePlugins={[rehypeKatex]}
                                            >
                                                {post.content.slice(0, 100) + '...'}
                                            </ReactMarkdown>
                                            <Box display="flex" alignItems="center" mt={2}>
                                                <Avatar
                                                    alt={post.user.username}
                                                    sx={{
                                                        bgcolor: getBackgroundColor(post.user.username.charAt(0)),
                                                        color: 'white',
                                                    }}
                                                >
                                                    {post.user.username.charAt(0).toUpperCase()}
                                                </Avatar>
                                                <Box ml={2}>
                                                    <Typography variant="body2">{post.user.username}</Typography>
                                                    <Typography variant="caption" color="textSecondary">
                                                        {new Date(post.created_at).toLocaleDateString()}
                                                    </Typography>
                                                </Box>
                                            </Box>

                                            <Typography variant="body2" mt={2}>
                                                Comments: {post.comments_count} | Votes: {post.votes_count}
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>

                        {totalPages > 1 && (
                            <Box display="flex" justifyContent="center" mt={4}>
                                <Pagination
                                    count={totalPages}
                                    page={currentPage}
                                    onChange={handlePageChange}
                                    color="primary"
                                    shape="rounded"
                                />
                            </Box>
                        )}
                    </>
                )}
            </Box>
        </Container>
    );
};

export default BlogLayout;
