import React, { useState, useEffect, useRef } from 'react';
import {
    Box,
    Typography,
    Container,
    Grid,
    useMediaQuery,
    Avatar,
    Card,
    CardContent,
    Stack
} from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css';
import { Link } from 'react-router-dom'; // Import Link component
import megaphoneVideo from '../img/writing.mp4';

const ScrollContainer = styled(Box)({
    height: '400px',
    overflowY: 'hidden',
    position: 'relative',
});

const VideoContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    opacity: 1, // Set to 1 initially to avoid low opacity on load
    transform: 'translateY(0)', // Set initial transform to 0 for immediate positioning
    transition: 'opacity 1s ease-in-out, transform 1s ease-in-out', // Smooth transition
    '& video': {
        maxWidth: '100%',
        maxHeight: '300px',
        objectFit: 'contain',
        borderRadius: theme.shape.borderRadius,
    },
    [theme.breakpoints.down('md')]: {
        marginBottom: theme.spacing(4),
    }
}));

const BlogCard = styled(Card)(({ theme }) => ({
    position: 'relative',
    marginBottom: theme.spacing(3),
    border: '1px solid #EEFBFF', // Add a 1px border with color #EEFBFF
    borderRadius: '12px', // Rounded corners
    overflow: 'hidden', // Ensuring the contents stay within the rounded corners
    backgroundColor: '#e1e1e8', // Change background color to #f9f9f9
    '&:hover': {
        // Removed box-shadow on hover
        border: '1px solid #1565C0', // Optional: add border color on hover
    },
}));

const BlogCardContent = styled(CardContent)(({ theme }) => ({
    padding: theme.spacing(2),
}));

const BlogSection = () => {
    const [blogs, setBlogs] = useState([]);
    const [activeIndex, setActiveIndex] = useState(0);
    const [isVisible, setIsVisible] = useState(true); // Start with visibility true
    const [isVideoVisible, setIsVideoVisible] = useState(true); // Start with visibility true
    const sectionRef = useRef(null); // Ref to the section
    const videoRef = useRef(null); // Ref to the video container
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/home/top/blogs')
            .then(response => {
                const filteredBlogs = response.data.blogs.filter(blog => blog !== null);
                setBlogs(filteredBlogs);
            })
            .catch(error => {
                console.error('Error fetching blogs', error);
            });

        const timer = setInterval(() => {
            setActiveIndex((current) => 
                current === blogs.length - 1 ? 0 : current + 1
            );
        }, 5000);

        return () => clearInterval(timer);
    }, [blogs.length]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true); // Fade in when section is in view
                } else {
                    setIsVisible(false); // Fade out when section is out of view
                }
            },
            { threshold: 0.5 } // Lower threshold for quicker visibility trigger
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => {
            if (sectionRef.current) {
                observer.unobserve(sectionRef.current);
            }
        };
    }, []);

    useEffect(() => {
        const videoObserver = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVideoVisible(true); // Fade in the video when it is in view
                } else {
                    setIsVideoVisible(false); // Fade out the video when it is out of view
                }
            },
            { threshold: 0.5 } // Lower threshold for quicker video visibility trigger
        );

        if (videoRef.current) {
            videoObserver.observe(videoRef.current);
        }

        return () => {
            if (videoRef.current) {
                videoObserver.unobserve(videoRef.current);
            }
        };
    }, []);

    const truncateContent = (content) => {
        return content.length > 100 ? content.substring(0, 100) + "..." : content;
    };

    return (
        <Container maxWidth="lg" sx={{ py: 8 }} ref={sectionRef}>
            <Typography 
                variant="h4" 
                component="h2" 
                gutterBottom 
                sx={{ 
                    fontWeight: 'bold',
                    mb: 4,
                    textAlign: 'center'
                }}
            >
                Latest Blogs
            </Typography>

            <Grid container spacing={4} alignItems="center">
                <Grid item xs={12} md={5}>
                    <VideoContainer
                        ref={videoRef}
                        sx={{
                            opacity: isVideoVisible ? 1 : 0.1,
                            transform: isVideoVisible ? 'translateY(0)' : 'translateY(20px)',
                        }}
                    >
                        <video
                            autoPlay
                            loop
                            muted
                            playsInline
                            src={megaphoneVideo}
                            alt="Blog Writing"
                        >
                            Your browser does not support the video tag.
                        </video>
                    </VideoContainer>
                </Grid>

                <Grid item xs={12} md={7}>
                    <Box
                        sx={{
                            position: 'relative',
                            opacity: isVisible ? 1 : 0.1,
                            transition: 'opacity 1s ease-in-out',
                        }}
                    >
                        <ScrollContainer>
                            <Box
                                sx={{
                                    transform: `translateY(-${activeIndex * 82}px)`,
                                    transition: 'transform 0.5s ease-in-out',
                                }}
                            >
                                {blogs.map((blog, index) => (
                                    <Link to={`/blog/${blog.id}`} key={blog.id} style={{ textDecoration: 'none' }}>
                                        <BlogCard>
                                            <BlogCardContent>
                                                <Typography variant="subtitle2" color="#1565C0" sx={{ fontWeight: 'bold', fontSize: "24px" }} >
                                                    {blog.title}
                                                </Typography>
                                                <Stack direction="row" spacing={2} alignItems="center">
                                                    <Avatar sx={{ bgcolor: '#ff5252', width: 30, height: 30 }}>
                                                        {blog.user.username[0].toUpperCase()}
                                                    </Avatar>
                                                    <Box>
                                                        <Typography variant="subtitle1" sx={{ fontWeight: 'bold', fontSize: "12px" }}>
                                                            {blog.user.username}
                                                        </Typography>
                                                        <Typography variant="caption" color="text.secondary">
                                                            {new Date(blog.created_at).toLocaleDateString()}
                                                        </Typography>
                                                    </Box>
                                                </Stack>
                                            </BlogCardContent>
                                        </BlogCard>
                                    </Link>
                                ))}
                            </Box>
                        </ScrollContainer>
                    </Box>
                </Grid>
            </Grid>
        </Container>
    );
};

export default BlogSection;
