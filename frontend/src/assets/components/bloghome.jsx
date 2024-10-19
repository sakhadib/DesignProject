import React, { useState } from 'react';
import { TextField, Button, IconButton, Typography, Box, Grid, Card, CardMedia, CardContent, Avatar, Pagination, Container } from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';

const BlogLayout = () => {
const categories = ['All categories', 'Company', 'Product', 'Design', 'Engineering'];
const blogPosts = [
{
    category: 'Engineering',
    title: 'Revolutionizing software development with cutting-edge tools',
    description: 'Our latest engineering tools are designed to streamline workflows and boost productivity. Discover how these innovations are transforming the software...',
    image: '/placeholder.svg?height=200&width=400',
    authors: ['Remy Sharp'],
    date: 'July 14, 2021'
},
{
    category: 'Product',
    title: 'Innovative product features that drive success',
    description: 'Explore the key features of our latest product release that are helping businesses achieve their goals. From user-friendly interfaces to robust...',
    image: '/placeholder.svg?height=200&width=400',
    authors: ['Erica Johns'],
    date: 'July 14, 2021'
},
{
    category: 'Design',
    title: 'Revolutionizing software development with cutting-edge tools',
    description: 'Our latest engineering tools are designed to streamline workflows and boost productivity. Discover how these innovations are transforming the software...',
    image: '/placeholder.svg?height=200&width=400',
    authors: ['Remy Sharp'],
    date: 'July 14, 2021'
},
{
    category: 'Company',
    title: 'Innovative product features that drive success',
    description: 'Explore the key features of our latest product release that are helping businesses achieve their goals. From user-friendly interfaces to robust...',
    image: '/placeholder.svg?height=200&width=400',
    authors: ['Erica Johns'],
    date: 'July 14, 2021'
},
{
    category: 'Engineering',
    title: 'Revolutionizing software development with cutting-edge tools',
    description: 'Our latest engineering tools are designed to streamline workflows and boost productivity. Discover how these innovations are transforming the software...',
    image: '/placeholder.svg?height=200&width=400',
    authors: ['Remy Sharp'],
    date: 'July 14, 2021'
},
{
    category: 'Product',
    title: 'Innovative product features that drive success',
    description: 'Explore the key features of our latest product release that are helping businesses achieve their goals. From user-friendly interfaces to robust...',
    image: '/placeholder.svg?height=200&width=400',
    authors: ['Erica Johns'],
    date: 'July 14, 2021'
},
{
    category: 'Design',
    title: 'Revolutionizing software development with cutting-edge tools',
    description: 'Our latest engineering tools are designed to streamline workflows and boost productivity. Discover how these innovations are transforming the software...',
    image: '/placeholder.svg?height=200&width=400',
    authors: ['Remy Sharp'],
    date: 'July 14, 2021'
},
{
    category: 'Company',
    title: 'Innovative product features that drive success',
    description: 'Explore the key features of our latest product release that are helping businesses achieve their goals. From user-friendly interfaces to robust...',
    image: '/placeholder.svg?height=200&width=400',
    authors: ['Erica Johns'],
    date: 'July 14, 2021'
},
{
    category: 'Engineering',
    title: 'Revolutionizing software development with cutting-edge tools',
    description: 'Our latest engineering tools are designed to streamline workflows and boost productivity. Discover how these innovations are transforming the software...',
    image: '/placeholder.svg?height=200&width=400',
    authors: ['Remy Sharp'],
    date: 'July 14, 2021'
},
{
    category: 'Product',
    title: 'Innovative product features that drive success',
    description: 'Explore the key features of our latest product release that are helping businesses achieve their goals. From user-friendly interfaces to robust...',
    image: '/placeholder.svg?height=200&width=400',
    authors: ['Erica Johns'],
    date: 'July 14, 2021'
},
{
    category: 'Company',
    title: 'Revolutionizing software development with cutting-edge tools',
    description: 'Our latest engineering tools are designed to streamline workflows and boost productivity. Discover how these innovations are transforming the software...',
    image: '/placeholder.svg?height=200&width=400',
    authors: ['Remy Sharp'],
    date: 'July 14, 2021'
},
{
    category: 'Company',
    title: 'Innovative product features that drive success',
    description: 'Explore the key features of our latest product release that are helping businesses achieve their goals. From user-friendly interfaces to robust...',
    image: '/placeholder.svg?height=200&width=400',
    authors: ['Erica Johns'],
    date: 'July 14, 2021'
},
    // More blog posts...
];

    const [selectedCategory, setSelectedCategory] = useState('All categories');
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const postsPerPage = 10;

    const handleCategoryClick = (category) => {
        setSelectedCategory(category);
        setCurrentPage(1); // Reset to the first page when the category changes
    };

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
        setCurrentPage(1); // Reset to the first page when a new search is performed
    };

  // Filter blog posts based on the selected category and search query
    const filteredPosts = blogPosts.filter(post => {
        const matchesCategory = selectedCategory === 'All categories' || post.category === selectedCategory;
        const matchesSearch = 
            post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            post.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
            post.category.toLowerCase().includes(searchQuery.toLowerCase()); // New condition added
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
            <Box sx={{ minHeight: '100vh', backgroundColor: '#ffffff', color: 'black', p: 4 }}>
        <Box component="header" mb={4}>
            <Typography variant="h3" component="h1" fontWeight="bold" gutterBottom>
            Blog
            </Typography>
            <Typography color="textSecondary">Stay in the loop with the latest about our products</Typography>
        </Box>

        <Box component="nav" display="flex" flexDirection="column" mb={4}>
            {/* Search Bar */}
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

            {/* Horizontally Scrollable Category Chips */}
            <Box
                component="nav"
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                mb={4}
                sx={{ overflowX: 'auto', width: '100%', whiteSpace: 'nowrap' }} // Added styles
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
                <Card sx={{ backgroundColor: '#f9f9f9' }}>
                <CardMedia
                    component="img"
                    height="200"
                    image={post.image}
                    alt={post.title}
                />
                <CardContent>
                    <Typography variant="subtitle2" color="textSecondary">
                    {post.category}
                    </Typography>
                    <Typography variant="h6" fontWeight="bold" gutterBottom>
                    {post.title}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" paragraph>
                    {post.description}
                    </Typography>
                    <Box display="flex" alignItems="center">
                    <Box display="flex" gap={1} mr={2}>
                        {post.authors.map((author, i) => (
                        <Avatar key={i} alt={author} src={`/placeholder.svg?height=32&width=32&text=${author.charAt(0)}`} />
                        ))}
                    </Box>
                    <Box>
                        <Typography variant="body2">{post.authors.join(', ')}</Typography>
                        <Typography variant="caption" color="textSecondary">{post.date}</Typography>
                    </Box>
                    </Box>
                </CardContent>
                </Card>
            </Grid>
            ))}
        </Grid>

        {/* Pagination Component */}
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
