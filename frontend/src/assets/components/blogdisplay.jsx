import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Container, Box, Card, CardContent, Avatar, Chip, Button, TextField, List, ListItem, ListItemText, ListItemAvatar, Divider, IconButton } from '@mui/material';
import { ThumbUp as ThumbUpIcon, ThumbDown as ThumbDownIcon, Comment as CommentIcon } from '@mui/icons-material';
import '@fontsource/raleway/700.css'; // Import Raleway with weight 700
import '@fontsource/raleway/200.css'; // Import Raleway with weight 400


const blogPost = {
    id: 1,
    title: "WWWWTTTTFFFFF",
    author: "sakhadib",
    email: "sakhadib@example.com",
    category: "1",
    comment_count: 1,
    upvote_count: 1,
    downvote_count: 0,
    created_at: "2024-10-18T09:09:02.783807Z",
    updated_at: "2024-10-18T09:09:02.783807Z",
    content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.`,
};

const comments = [
    {
        id: 1,
        author: "John Doe",
        content: "Great post! Very informative.",
        created_at: "2024-10-19T10:00:00Z",
    },
];

const BlogPostPage = () => {
    const [newComment, setNewComment] = useState('');
    const [localComments, setLocalComments] = useState(comments);

    const handleCommentSubmit = (e) => {
        e.preventDefault();
        if (newComment.trim()) {
            const comment = {
                id: localComments.length + 1,
                author: "Current User",
                content: newComment,
                created_at: new Date().toISOString(),
            };
            setLocalComments([...localComments, comment]);
            setNewComment('');
        }
    };

    return (
        <Box>
            <Container maxWidth="md" sx={{ mt: 4 }}>
            <Typography
                variant="h2"
                component="h1"
                gutterBottom
                sx={{
                    fontFamily: 'Raleway, Arial, sans-serif',
                    fontWeight: 700,
                    fontSize: '70px',
                }}
                >
                {blogPost.title}
            </Typography>


                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Avatar sx={{ mr: 2 }}>{blogPost.author[0].toUpperCase()}</Avatar>
                        <Box>
                            <Typography variant="subtitle1">{blogPost.author}</Typography>
                            <Typography variant="body2" color="text.secondary">
                                {new Date(blogPost.created_at).toLocaleDateString()}
                            </Typography>
                        </Box>
                    </Box>
                    <Chip label={`Category: ${blogPost.category}`} />
                </Box>

                <Typography sx={{
                    fontSize: '20px',
                }} variant="body1" paragraph>
                    {blogPost.content}
                </Typography>

                <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
                    <IconButton>
                        <ThumbUpIcon />
                    </IconButton>
                    <Typography sx={{ mr: 2 }}>{blogPost.upvote_count}</Typography>
                    <IconButton>
                        <ThumbDownIcon />
                    </IconButton>
                    <Typography sx={{ mr: 2 }}>{blogPost.downvote_count}</Typography>
                    <IconButton>
                        <CommentIcon />
                    </IconButton>
                    <Typography>{blogPost.comment_count}</Typography>
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
                        <React.Fragment key={comment.id}>
                            <ListItem alignItems="flex-start">
                                <ListItemAvatar>
                                    <Avatar>{comment.author[0].toUpperCase()}</Avatar>
                                </ListItemAvatar>
                                <ListItemText
                                    primary={comment.author}
                                    secondary={
                                        <>
                                            <Typography
                                                component="span"
                                                variant="body2"
                                                color="text.primary"
                                            >
                                                {comment.content}
                                            </Typography>
                                            <br />
                                            <Typography variant="caption" color="text.secondary">
                                                {new Date(comment.created_at).toLocaleString()}
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
