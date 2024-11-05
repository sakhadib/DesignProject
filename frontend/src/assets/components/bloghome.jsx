// import React, { useState, useEffect } from 'react';
// import { TextField, Button, IconButton, Typography, Box, Grid, Card, CardMedia, CardContent, Avatar, Pagination, Container } from '@mui/material';
// import { Search as SearchIcon } from '@mui/icons-material';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom'; // Import useNavigate

// const BlogLayout = () => {
//     const categories = ['All categories', 'Company', 'Product', 'Design', 'Engineering'];

//     // State to store blog posts fetched from the backend
//     const [blogPosts, setBlogPosts] = useState([]);
//     const [selectedCategory, setSelectedCategory] = useState('All categories');
//     const [currentPage, setCurrentPage] = useState(1);
//     const [searchQuery, setSearchQuery] = useState('');
//     const postsPerPage = 10;

//     // Fetch blog posts from the backend when the component mounts
//     useEffect(() => {
//         const fetchBlogPosts = async () => {
//             try {
//                 const response = await axios.get('http://localhost:8000/api/blog/all');
//                 // console.log("Fetched blog posts:", response.data); // Check what data is being returned
//                 setBlogPosts(response.data);
//             } catch (error) {
//                 console.error("Error fetching blog posts:", error);
//             }
//         };

//         fetchBlogPosts();
//     }, []);

//     const handleCategoryClick = (category) => {
//         setSelectedCategory(category);
//         setCurrentPage(1); // Reset to the first page when the category changes
//     };

//     const handleSearchChange = (event) => {
//         setSearchQuery(event.target.value);
//         setCurrentPage(1); // Reset to the first page when a new search is performed
//     };

//     const handleBlogClick = (id) => {
//         navigate(`/blog/${id}`); // Navigate to the display page with the selected blog's ID
//     };

//     // Filter blog posts based on the selected category and search query
//     const filteredPosts = blogPosts.filter(post => {
//         const matchesCategory = selectedCategory === 'All categories' || post.category === selectedCategory;
//         const matchesSearch = 
//             post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
//             post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
//             post.category.toLowerCase().includes(searchQuery.toLowerCase());
//         return matchesCategory && matchesSearch;
//     });

//     const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
//     const indexOfLastPost = currentPage * postsPerPage;
//     const indexOfFirstPost = indexOfLastPost - postsPerPage;
//     const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

//     const handlePageChange = (event, value) => {
//         setCurrentPage(value);
//     };

//     return (
//         <Container>
//             <Box sx={{ minHeight: '100vh', backgroundColor: '#ffffff', color: 'black', p: 4 }}>
//                 <Box component="header" mb={4}>
//                     <Typography variant="h3" component="h1" fontWeight="bold" gutterBottom>
//                         Blog
//                     </Typography>
//                     <Typography color="textSecondary">Stay in the loop with the latest about our products</Typography>
//                 </Box>

//                 <Box component="nav" display="flex" flexDirection="column" mb={4}>
//                     {/* Search Bar */}
//                     <Box display="flex" alignItems="center" gap={1} mb={2} width="100%">
//                         <TextField
//                             variant="outlined"
//                             placeholder="Search..."
//                             size="small"
//                             fullWidth
//                             value={searchQuery}
//                             onChange={handleSearchChange}
//                             InputProps={{
//                                 endAdornment: (
//                                     <IconButton>
//                                         <SearchIcon />
//                                     </IconButton>
//                                 ),
//                                 sx: { backgroundColor: '#f0f0f0', color: 'black', borderRadius: '25px' },
//                             }}
//                         />
//                     </Box>

//                     {/* Horizontally Scrollable Category Chips */}
//                     <Box
//                         component="nav"
//                         display="flex"
//                         justifyContent="space-between"
//                         alignItems="center"
//                         mb={4}
//                         sx={{ overflowX: 'auto', width: '100%', whiteSpace: 'nowrap' }}
//                     >
//                         <Box display="flex" gap={2}>
//                             {categories.map((category, index) => (
//                                 <Button
//                                     key={index}
//                                     variant={selectedCategory === category ? 'contained' : 'outlined'}
//                                     color="primary"
//                                     onClick={() => handleCategoryClick(category)}
//                                     sx={{ borderRadius: 50, whiteSpace: 'nowrap' }}
//                                 >
//                                     {category}
//                                 </Button>
//                             ))}
//                         </Box>
//                     </Box>
//                 </Box>

//                 <Grid container spacing={4}>
//                     {currentPosts.map((post, index) => (
//                         <Grid item xs={12} md={6} key={index}>
//                             <Card
//                             onClick={() => handleBlogClick(post.id)} // Add onClick handler
//                             sx={{ cursor: 'pointer' , backgroundColor: '#f9f9f9' }} // Add pointer cursor
//                             >
//                                 {/* Placeholder for Image (use a placeholder or author's first initial) */}
//                                 <CardContent>
//                                     <Typography variant="subtitle2" color="textSecondary">
//                                         {post.category}
//                                     </Typography>
//                                     <Typography variant="h6" fontWeight="bold" gutterBottom>
//                                         {post.title}
//                                     </Typography>
//                                     <Typography variant="body2" color="textSecondary" paragraph>
//                                         {post.content.slice(0, 100)}... {/* Display a summary */}
//                                     </Typography>
//                                     <Box display="flex" alignItems="center">
//                                         <Avatar alt={post.author} src={`/placeholder.svg?text=${post.author.charAt(0)}`} />
//                                         <Box ml={2}>
//                                             <Typography variant="body2">{post.author}</Typography>
//                                             <Typography variant="caption" color="textSecondary">{new Date(post.created_at).toLocaleDateString()}</Typography>
//                                         </Box>
//                                     </Box>
//                                 </CardContent>
//                             </Card>
//                         </Grid>
//                     ))}
//                 </Grid>

//                 {/* Pagination Component */}
//                 {totalPages > 1 && (
//                     <Box display="flex" justifyContent="center" mt={4}>
//                         <Pagination
//                             count={totalPages}
//                             page={currentPage}
//                             onChange={handlePageChange}
//                             color="primary"
//                             shape="rounded"
//                         />
//                     </Box>
//                 )}
//             </Box>
//         </Container>
//     );
// };

// export default BlogLayout;


import React, { useState, useEffect } from 'react';
import { TextField, Button, IconButton, Typography, Box, Grid, Card, CardContent, Avatar, Pagination, Container } from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const BlogLayout = () => {
    const navigate = useNavigate(); // Initialize navigate here
    const categories = ['All categories', 'Company', 'Product', 'Design', 'Engineering'];

    // State to store blog posts fetched from the backend
    const [blogPosts, setBlogPosts] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('All categories');
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const postsPerPage = 10;

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

    const handleCategoryClick = (category) => {
        setSelectedCategory(category);
        setCurrentPage(1); // Reset to the first page when the category changes
    };

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
        setCurrentPage(1); // Reset to the first page when a new search is performed
    };

    const handleBlogClick = (id) => {
        navigate(`/blog/${id}`); // Navigate to the display page with the selected blog's ID
    };

    // Filter blog posts based on the selected category and search query
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
                                onClick={() => handleBlogClick(post.id)} // Add onClick handler
                                sx={{ cursor: 'pointer', backgroundColor: '#f9f9f9' }} // Add pointer cursor
                            >
                                <CardContent>
                                    <Typography variant="subtitle2" color="textSecondary">
                                        {post.category}
                                    </Typography>
                                    <Typography variant="h6" fontWeight="bold" gutterBottom>
                                        {post.title}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary" paragraph>
                                        {post.content.slice(0, 100)}... {/* Display a summary */}
                                    </Typography>
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
