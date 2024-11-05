import React, { useState, useEffect } from 'react';
import { Typography, Container, Box, Card, CardContent, Avatar, Chip, Button, TextField, List, ListItem, ListItemText, ListItemAvatar, Divider, IconButton } from '@mui/material';
import { ThumbUp as ThumbUpIcon, ThumbDown as ThumbDownIcon, Comment as CommentIcon } from '@mui/icons-material';
import { useParams } from 'react-router-dom';
import axios from '../../api';
import ReactMarkdown from 'react-markdown';
import '@fontsource/raleway/700.css';
import '@fontsource/raleway/200.css';
import Cookies from 'js-cookie';

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
                const response = await axios.get(`http://127.0.0.1:8000/api/blog/${id}/`);
                setBlogPost(response.data);
                setLocalComments(response.data.comments);

                // Fetch user's vote status for this blog post
                const voteResponse = await axios.get(`http://127.0.0.1:8000/api/vote/${id}`);
                const userVoteData = voteResponse.data.find(vote => vote.author === username);
                
                if (userVoteData) {
                    setUserVote(userVoteData.vote);
                }
                
                // Calculate vote counts
                const upvotes = voteResponse.data.filter(vote => vote.vote === true).length;
                const downvotes = voteResponse.data.filter(vote => vote.vote === false).length;
                setBlogPost((prev) => ({
                    ...prev,
                    upvote_count: upvotes,
                    downvote_count: downvotes
                }));
            } catch (error) {
                console.error("Error fetching the blog post or votes:", error);
            }
        };
        fetchBlogPost();
    }, [id, username]);

    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        if (newComment.trim()) {
            try {
                const commentData = {
                    blog: id,
                    content: newComment
                };
                const response = await axios.post('/comment/', commentData);
                const newCommentData = {
                    id: response.data.id,
                    author: username,
                    content: newComment,
                    created_at: new Date().toISOString(),
                };
                setLocalComments([...localComments, newCommentData]);
                setNewComment('');
            } catch (error) {
                console.error("Error posting the comment:", error);
            }
        }
    };

    const handleVote = async (voteType) => {
        if (userVote === voteType) return; // Prevent voting multiple times for the same type

        try {
            // Submit vote to backend
            await axios.post('http://127.0.0.1:8000/api/vote/', {
                blog: id,
                vote: voteType
            });

            // Update counts based on vote type and previous vote
            if (voteType) { // Upvote
                setBlogPost((prev) => ({
                    ...prev,
                    upvote_count: prev.upvote_count + 1,
                    downvote_count: userVote === false ? prev.downvote_count - 1 : prev.downvote_count
                }));
            } else { // Downvote
                setBlogPost((prev) => ({
                    ...prev,
                    downvote_count: prev.downvote_count + 1,
                    upvote_count: userVote === true ? prev.upvote_count - 1 : prev.upvote_count
                }));
            }

            setUserVote(voteType); // Update user vote status
        } catch (error) {
            console.error("Error posting the vote:", error);
        }
    };

    if (!blogPost) return <div>Loading...</div>;

    return (
        <Box>
            <Container maxWidth="md" sx={{ mt: 4 }}>
                <Typography variant="h2" component="h1" gutterBottom sx={{ fontFamily: 'Raleway, Arial, sans-serif', fontWeight: 700, fontSize: '70px' }}>
                    {blogPost.title}
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Avatar sx={{ mr: 2 }}>{blogPost.author[0].toUpperCase()}</Avatar>
                        <Box>
                            <Typography variant="subtitle1">{blogPost.author}</Typography>
                            <Typography variant="body2" color="text.secondary">{new Date(blogPost.created_at).toLocaleDateString()}</Typography>
                        </Box>
                    </Box>
                    <Chip label={`Category: ${blogPost.category}`} />
                </Box>
                <Box sx={{ fontSize: '20px', mb: 4 }}>
                    <ReactMarkdown>{blogPost.content}</ReactMarkdown>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
                    <IconButton color={userVote === true ? "primary" : "default"} onClick={() => handleVote(true)}>
                        <ThumbUpIcon />
                    </IconButton>
                    <Typography sx={{ mr: 2 }}>{blogPost.upvote_count}</Typography>
                    <IconButton color={userVote === false ? "primary" : "default"} onClick={() => handleVote(false)}>
                        <ThumbDownIcon />
                    </IconButton>
                    <Typography sx={{ mr: 2 }}>{blogPost.downvote_count}</Typography>
                    <IconButton><CommentIcon /></IconButton>
                    <Typography>{blogPost.comment_count}</Typography>
                </Box>
                <Typography variant="h5" gutterBottom>Comments</Typography>
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
                            <Button type="submit" variant="contained" color="primary">Post Comment</Button>
                        </form>
                    </CardContent>
                </Card>
                <List>
                    {localComments.map((comment) => (
                        <React.Fragment key={comment.id}>
                            <ListItem alignItems="flex-start">
                                <ListItemAvatar>
                                    <Avatar>{comment.author[0].toUpperCase()}</Avatar>
                                </ListItemAvatar>
                                <ListItemText
                                    primary={comment.author}
                                    secondary={
                                        <>
                                            <Typography component="span" variant="body2" color="text.primary">{comment.content}</Typography>
                                            <br />
                                            <Typography variant="caption" color="text.secondary">{new Date(comment.created_at).toLocaleString()}</Typography>
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
