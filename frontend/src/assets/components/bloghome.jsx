import React, { useState, useEffect } from 'react';
import { TextField, Button, IconButton, Typography, Box, Grid, Card, CardContent, Avatar, Pagination, Container } from '@mui/material';
import { Search as SearchIcon, Add as AddIcon } from '@mui/icons-material';
import { useTheme, useMediaQuery } from '@mui/material';
import Cookies from 'js-cookie';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css';

const BlogLayout = () => {
    const navigate = useNavigate();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const [categories, setCategories] = useState(['All categories']);
    const [blogPosts, setBlogPosts] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('All categories');
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const postsPerPage = 10;

    // Check if user is signed in
    const token = Cookies.get('token') || localStorage.getItem('token');
    const isSignedIn = Boolean(token);
    // console.log("Is user signed in:", isSignedIn, "Token:", token); // Debugging log

    // Fetch blog posts from the backend when the component mounts
    useEffect(() => {
        const fetchBlogPosts = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/blog/all');
                setBlogPosts(response.data);
            } catch (error) {
                console.error("Error fetching blog posts:", error);
            }
        };

        fetchBlogPosts();
    }, []);

    // Fetch blog categories from the backend
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/blog/categories/');
                const fetchedCategories = response.data.map((item) => item.category);
                setCategories(['All categories', ...fetchedCategories]);
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        };

        fetchCategories();
    }, []);

    const handleCategoryClick = (category) => {
        setSelectedCategory(category);
        setCurrentPage(1);
    };

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

    const filteredPosts = blogPosts.filter(post => {
        const matchesCategory = selectedCategory === 'All categories' || post.category === selectedCategory;
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

    return (
        <Container>
            <Box sx={{ backgroundColor: '#ffffff', color: 'black', p: 4 }}>
                <Box component="header" mb={4} display="flex" justifyContent="space-between" alignItems="center">
                    <Typography variant="h3" component="h1" fontWeight="bold" gutterBottom>
                        Blog
                    </Typography>
                    {isSignedIn && ( // Show button only if user is signed in
                        isMobile ? (
                            <IconButton onClick={handleWriteBlogClick} color="primary" sx={{ backgroundColor: '#f0f0f0' }}>
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

                <Box component="nav" display="flex" flexDirection="column" mb={4}>
                    <Box display="flex" alignItems="center" gap={1} mb={2} width="100%">
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
                                sx: { backgroundColor: '#f0f0f0', color: 'black', borderRadius: '25px' },
                            }}
                        />
                    </Box>

                    <Box
                        component="nav"
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                        mb={4}
                        sx={{ overflowX: 'auto', width: '100%', whiteSpace: 'nowrap' }}
                    >
                        <Box display="flex" gap={2}>
                            {categories.map((category, index) => (
                                <Button
                                    key={index}
                                    variant={selectedCategory === category ? 'contained' : 'outlined'}
                                    color="primary"
                                    onClick={() => handleCategoryClick(category)}
                                    sx={{ borderRadius: 50, whiteSpace: 'nowrap' }}
                                >
                                    {category}
                                </Button>
                            ))}
                        </Box>
                    </Box>
                </Box>

                <Grid container spacing={4}>
                    {currentPosts.map((post, index) => (
                        <Grid item xs={12} md={6} key={index}>
                            <Card
                                onClick={() => handleBlogClick(post.id)}
                                sx={{ cursor: 'pointer', backgroundColor: '#f9f9f9' }}
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
                                    <Box display="flex" alignItems="center">
                                        <Avatar alt={post.author} src={`/placeholder.svg?text=${post.author.charAt(0)}`} />
                                        <Box ml={2}>
                                            <Typography variant="body2">{post.author}</Typography>
                                            <Typography variant="caption" color="textSecondary">{new Date(post.created_at).toLocaleDateString()}</Typography>
                                        </Box>
                                    </Box>
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
            </Box>
        </Container>
    );
};

export default BlogLayout;
