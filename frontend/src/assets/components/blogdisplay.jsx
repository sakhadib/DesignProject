import React, { useState, useEffect } from 'react';
import {
    Typography,
    Container,
    Box,
    Card,
    CardContent,
    Avatar,
    Chip,
    Button,
    TextField,
    List,
    ListItem,
    ListItemText,
    ListItemAvatar,
    Divider,
    IconButton,
} from '@mui/material';
import {
    ThumbUp as ThumbUpIcon,
    ThumbDown as ThumbDownIcon,
    Comment as CommentIcon,
    Delete as DeleteIcon,
} from '@mui/icons-material';
import { useParams } from 'react-router-dom';
import axios from '../../api';
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css';
import '@fontsource/raleway/700.css';
import '@fontsource/raleway/200.css';
import Cookies from 'js-cookie';
import { deepPurple, deepOrange, blue, green, red } from '@mui/material/colors';

const BlogPostPage = () => {
    const { id } = useParams();
    const [blogPost, setBlogPost] = useState(null);
    const [newComment, setNewComment] = useState('');
    const [localComments, setLocalComments] = useState([]);
    const [userVote, setUserVote] = useState(null);
    const username = Cookies.get('username');

    useEffect(() => {
        const fetchBlogPost = async () => {
            try {
                const response = await axios.get(`/blog/single/${id}/`);
                const blogData = response.data.blog;
    
                setBlogPost({
                    ...blogData,
                    author: blogData.user.username, // Extract the author's name from the API response
                    upvote_count: blogData.votes.filter((vote) => vote.vote === 1).length,
                    downvote_count: blogData.votes.filter((vote) => vote.vote === 0).length,
                });
                setLocalComments(blogData.comments);
    
                // Set user vote if available
                const userVoteData = blogData.votes.find((vote) => vote.user_id === username);
                if (userVoteData) {
                    setUserVote(userVoteData.vote);
                }
            } catch (error) {
                console.error('Error fetching the blog post:', error);
            }
        };
    
        fetchBlogPost();
    }, [id, username]);
    

    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        if (newComment.trim()) {
            try {
                const commentData = {
                    blog_id: id,
                    content: newComment,
                };
                const response = await axios.post('/blog/comment/', commentData);
                
                // Make sure to get the full user data from the response
                const newCommentData = {
                    id: response.data.comment.id,
                    user: response.data.comment.user, // Take the user from the response data
                    content: newComment,
                    created_at: new Date().toISOString(), // Add a timestamp
                };
    
                // Update local state with the new comment
                setLocalComments((prevComments) => [...prevComments, newCommentData]);
                setNewComment('');
            } catch (error) {
                console.error('Error posting the comment:', error);
            }
        }
    };
    
    const handleDeleteComment = async (commentId) => {
        try {
            // Use POST instead of DELETE
            await axios.post('/blog/comment/delete/', {
                comment_id: commentId, // Pass the comment ID as part of the request body
            });
            // Remove the comment from the local state
            setLocalComments(localComments.filter((comment) => comment.id !== commentId));
        } catch (error) {
            console.error('Error deleting the comment:', error);
        }
    };
    

    const handleVote = async (voteType) => {
        if (userVote === voteType) return;

        try {
            await axios.post('/blog/vote/', {
                blog_id: id,
                vote: voteType,
            });

            if (voteType) {
                setBlogPost((prev) => ({
                    ...prev,
                    upvote_count: prev.upvote_count + 1,
                    downvote_count: userVote === 0 ? prev.downvote_count - 1 : prev.downvote_count,
                }));
            } else {
                setBlogPost((prev) => ({
                    ...prev,
                    downvote_count: prev.downvote_count + 1,
                    upvote_count: userVote === 1 ? prev.upvote_count - 1 : prev.upvote_count,
                }));
            }

            setUserVote(voteType);
        } catch (error) {
            console.error('Error posting the vote:', error);
        }
    };
    // Function to generate a background color based on the first character
    const getBackgroundColor = (char) => {
        const colors = [deepPurple[500], deepOrange[500], blue[500], green[500], red[500]];
        const index = char.toLowerCase().charCodeAt(0) % colors.length; // Map the character to an index
        return colors[index];
    };

    if (!blogPost) return <div>Loading...</div>;

    return (
        <Box>
            <Container maxWidth="md" sx={{ mt: 4 }}>
                <Typography
                    variant="h2"
                    component="h1"
                    gutterBottom
                    sx={{ fontFamily: 'Raleway, Arial, sans-serif', fontWeight: 700, fontSize: '70px' }}
                >
                    {blogPost.title}
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Avatar 
                            sx={{ mr: 2, bgcolor: getBackgroundColor(blogPost.user.username.charAt(0)),
                                color: 'white', }}>
                                {blogPost.author?.[0]?.toUpperCase()}
                        </Avatar>
                        <Box>
                            <Typography variant="subtitle1">{blogPost.author}</Typography> {/* Author's name */}
                            <Typography variant="body2" color="text.secondary">
                                {new Date(blogPost.created_at).toLocaleDateString()}
                            </Typography>
                        </Box>
                    </Box>
                    <Chip label={`Category: ${blogPost.category}`} />
                </Box>
                <Box sx={{ fontSize: '20px', mb: 4 }}>
                    <ReactMarkdown
                        remarkPlugins={[remarkMath]}
                        rehypePlugins={[rehypeKatex]}
                    >
                        {blogPost.content}
                    </ReactMarkdown>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
                    <IconButton
                        color={userVote === 1 ? 'primary' : 'default'}
                        onClick={() => handleVote(1)}
                    >
                        <ThumbUpIcon />
                    </IconButton>
                    <Typography sx={{ mr: 2 }}>{blogPost.upvote_count}</Typography>
                    <IconButton
                        color={userVote === 0 ? 'primary' : 'default'}
                        onClick={() => handleVote(0)}
                    >
                        <ThumbDownIcon />
                    </IconButton>
                    <Typography sx={{ mr: 2 }}>{blogPost.downvote_count}</Typography>
                    <IconButton>
                        <CommentIcon />
                    </IconButton>
                    <Typography>{localComments.length}</Typography>
                </Box>
                <Typography variant="h5" gutterBottom>
                    Comments
                </Typography>
                <Card sx={{ mb: 4 }}>
                    <CardContent>
                        <form onSubmit={handleCommentSubmit}>
                            <TextField
                                fullWidth
                                multiline
                                rows={3}
                                variant="outlined"
                                placeholder="Add a comment..."
                                value={newComment}
                                onChange={(e) => setNewComment(e.target.value)}
                                sx={{ mb: 2 }}
                            />
                            <Button type="submit" variant="contained" color="primary">
                                Post Comment
                            </Button>
                        </form>
                    </CardContent>
                </Card>
                <List>
                    {localComments.map((comment) => (
                        <React.Fragment key={comment.id}> {/* Ensure the key is unique */}
                            <ListItem alignItems="flex-start">
                                <ListItemAvatar>
                                    <Avatar
                                        sx={{
                                            bgcolor: comment.user?.username
                                                ? getBackgroundColor(comment.user.username.charAt(0))
                                                : 'grey', // Default background color if user or username is missing
                                            color: 'white',
                                        }}
                                    >
                                        {comment.user?.username
                                            ? comment.user.username.charAt(0).toUpperCase()
                                            : '?'} {/* Default '?' if username is missing */}
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText
                                    primary={
                                        <Box display="flex" alignItems="center" justifyContent="space-between">
                                            <Typography variant="body2" color="text.primary">
                                                {comment.user?.username || 'Unknown User'} {/* Show 'Unknown User' if user or username is missing */}
                                            </Typography>
                                            {/* Show delete button only for comments authored by the current user */}
                                            {comment.user?.username === username && (
                                                <IconButton
                                                    onClick={() => handleDeleteComment(comment.id)}
                                                    color="error"
                                                >
                                                    <DeleteIcon />
                                                </IconButton>
                                            )}
                                        </Box>
                                    }
                                    secondary={
                                        <>
                                            <Typography component="span" variant="body2" color="text.primary">
                                                {comment.content} {/* Comment content */}
                                            </Typography>
                                            <br />
                                            <Typography variant="caption" color="text.secondary">
                                                {new Date(comment.created_at).toLocaleString()} {/* Date */}
                                            </Typography>
                                        </>
                                    }
                                />
                            </ListItem>
                            <Divider variant="inset" component="li" />
                        </React.Fragment>
                    ))}
                </List>




            </Container>
        </Box>
    );
};

export default BlogPostPage;


