import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Paper, Avatar,} from '@mui/material';
import { Send as SendIcon } from '@mui/icons-material';

    export default function CommentBox({ onSubmit = () => {} }) {
    const [comment, setComment] = useState('');
    const [error, setError] = useState('');

    const handleCommentChange = (event) => {
        setComment(event.target.value);
        if (error) setError('');
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (comment.trim() === '') {
        setError('Comment cannot be empty');
        return;
        }
        onSubmit(comment);
        setComment('');
    };

    return (
        <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
            Add a Comment
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
            <Avatar sx={{ mr: 2 }} alt="User" src="/placeholder.svg?height=40&width=40" />
            <TextField
                fullWidth
                multiline
                rows={3}
                variant="outlined"
                placeholder="Write your comment here..."
                value={comment}
                onChange={handleCommentChange}
                error={!!error}
                helperText={error}
            />
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button
                type="submit"
                variant="contained"
                color="primary"
                endIcon={<SendIcon />}
                disabled={!comment.trim()}
            >
                Post Comment
            </Button>
            </Box>
        </Box>
        </Paper>
    );
    }