// import React from 'react';
// import { Container, Typography, Box, Paper, Chip, Divider, Grid } from '@mui/material';
// import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
// import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
// import CommentIcon from '@mui/icons-material/Comment';
// import { format } from 'date-fns';

// export default function BlogPostDisplay({ post = {} }) {
//     const defaultPost = {
//         id: 1,
//         title: "This is a simple blog",
//         author: "sakhadib",
//         category: "1",
//         comment_count: 1,
//         upvote_count: 1,
//         downvote_count: 0,
//         created_at: "2024-10-18T09:09:02.783807Z",
//         updated_at: "2024-10-18T09:09:02.783807Z",
//         content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam a nisi iaculis, imperdiet libero quis,fringilla erat. Morbi non ipsum purus. Donec varius ornare pulvinar. Mauris auctor libero a sollicitudin efficitur. Nunc ullamcorper mi quam, vitae consequat justo auctor in. Quisque pellentesque nunc ut quam cursus dignissim. Nullam eu vehicula purus. Etiam condimentum pellentesque arcu vitae pellentesque. Curabitur vitae efficitur libero, id ultrices libero. Nam at magna et risus finibus rutrum. Nam facilisis fringilla lectus, nec dictum sem scelerisque vitae. Sed mattis leo et luctus bibendum. Nullam vestibulum at ante in rhoncus. Integer tincidunt dolor eu dolor posuere, et tempus erat vehicula. Nunc dictum, ligula at tempor condimentum, urna risus porttitor dolor, egestas tincidunt ex odio quis tellus."
//     };

//     const {
//         title,
//         author,
//         category,
//         comment_count,
//         upvote_count,
//         downvote_count,
//         created_at,
//         updated_at,
//         content
//     } = post.id ? post : defaultPost;

//     const formatDate = (dateString) => {
//         return format(new Date(dateString), 'MMMM d, yyyy h:mm a');
//     };

//     return (
//         <Container maxWidth="md">
//         <Box sx={{ my: 4 }}>
//             <Paper elevation={0} sx={{ p: 4 }}>
//             <Typography variant="h4" component="h1" gutterBottom>
//                 {title}
//             </Typography>
//             <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
//                 <Typography variant="subtitle1" color="text.secondary">
//                 By {author}
//                 </Typography>
//                 <Chip label={`Category ${category}`} color="primary" size="small" />
//             </Box>
//             <Typography variant="body2" color="text.secondary" gutterBottom>
//                 Created: {formatDate(created_at)}
//             </Typography>
//             <Typography variant="body2" color="text.secondary" gutterBottom>
//                 Updated: {formatDate(updated_at)}
//             </Typography>
//             <Divider sx={{ my: 2 }} />
//             <Typography variant="body1" paragraph>
//                 {content}
//             </Typography>
//             <Divider sx={{ my: 2 }} />
//             <Grid container spacing={2} justifyContent="center" alignItems="center">
//                 <Grid item xs={4} sx={{ textAlign: 'center' }}>
//                 <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
//                     <CommentIcon color="action" sx={{ mr: 1 }} />
//                     <Typography variant="body2">
//                     {comment_count} {comment_count === 1 ? 'Comment' : 'Comments'}
//                     </Typography>
//                 </Box>
//                 </Grid>
//                 <Grid item xs={4} sx={{ textAlign: 'center' }}>
//                 <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
//                     <ThumbUpAltIcon color="success" sx={{ mr: 1 }} />
//                     <Typography variant="body2">
//                     {upvote_count} {upvote_count === 1 ? 'Upvote' : 'Upvotes'}
//                     </Typography>
//                 </Box>
//                 </Grid>
//                 <Grid item xs={4} sx={{ textAlign: 'center' }}>
//                 <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
//                     <ThumbDownAltIcon color="error" sx={{ mr: 1 }} />
//                     <Typography variant="body2">
//                     {downvote_count} {downvote_count === 1 ? 'Downvote' : 'Downvotes'}
//                     </Typography>
//                 </Box>
//                 </Grid>
//             </Grid>
//             </Paper>
//         </Box>
//         </Container>
//     );
//     }


import React, { useState } from 'react';
import { Container, Typography, Box, Paper, Chip, Divider, Grid, Avatar, TextField, Button } from '@mui/material';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
import CommentIcon from '@mui/icons-material/Comment';
import { format } from 'date-fns';
import { Send as SendIcon } from '@mui/icons-material';
import md5 from 'md5';


    // Function to generate Gravatar URL
    const getGravatarUrl = (email, size = 80) => {
    const hash = md5(email.trim().toLowerCase());
    return `https://www.gravatar.com/avatar/${hash}?s=${size}&d=identicon`;
};


    export default function BlogPostDisplay({ post = {} }) {
    const defaultPost = {
        id: 1,
        title: "This is a simple blog",
        author: "sakhadib",
        email: "sakhadib@example.com",
        category: "1",
        comment_count: 1,
        upvote_count: 1,
        downvote_count: 0,
        created_at: "2024-10-18T09:09:02.783807Z",
        updated_at: "2024-10-18T09:09:02.783807Z",
        content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam a nisi iaculis, imperdiet libero quis, fringilla erat. Morbi non ipsum purus...`
    };

    const {
        title,
        author,
        email,
        category,
        comment_count,
        upvote_count,
        downvote_count,
        created_at,
        updated_at,
        content
    } = post.id ? post : defaultPost;

    const formatDate = (dateString) => {
        return format(new Date(dateString), 'MMMM d, yyyy h:mm a');
    };

    const gravatarUrl = getGravatarUrl(email);

    return (
        <Container maxWidth="md">
        <Box sx={{ my: 4 }}>
            <Paper elevation={0} sx={{ p: 4 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Avatar src={gravatarUrl} alt={author} sx={{ mr: 2 }} />
                <Typography variant="subtitle1" color="text.secondary">
                By {author}
                </Typography>
            </Box>
            <Typography variant="h4" component="h1" gutterBottom>
                {title}
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Chip label={`Category ${category}`} color="primary" size="small" />
            </Box>
            <Typography variant="body2" color="text.secondary" gutterBottom>
                Created: {formatDate(created_at)}
            </Typography>
            <Typography variant="body2" color="text.secondary" gutterBottom>
                Updated: {formatDate(updated_at)}
            </Typography>
            <Divider sx={{ my: 2 }} />
            <Typography variant="body1" paragraph>
                {content}
            </Typography>
            <Divider sx={{ my: 2 }} />
            <Grid container spacing={2} justifyContent="center" alignItems="center">
                <Grid item xs={4} sx={{ textAlign: 'center' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <CommentIcon color="action" sx={{ mr: 1 }} />
                    <Typography variant="body2">
                    {comment_count} {comment_count === 1 ? 'Comment' : 'Comments'}
                    </Typography>
                </Box>
                </Grid>
                <Grid item xs={4} sx={{ textAlign: 'center' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <ThumbUpAltIcon color="success" sx={{ mr: 1 }} />
                    <Typography variant="body2">
                    {upvote_count} {upvote_count === 1 ? 'Upvote' : 'Upvotes'}
                    </Typography>
                </Box>
                </Grid>
                <Grid item xs={4} sx={{ textAlign: 'center' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <ThumbDownAltIcon color="error" sx={{ mr: 1 }} />
                    <Typography variant="body2">
                    {downvote_count} {downvote_count === 1 ? 'Downvote' : 'Downvotes'}
                    </Typography>
                </Box>
                </Grid>
            </Grid>
            </Paper>

            {/* Comment Section */}
            <Box sx={{ mt: 4 }}>
            <Paper elevation={3} sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom>
                Add a Comment
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Avatar src={gravatarUrl} alt={author} sx={{ mr: 2 }} />
                <TextField
                    fullWidth
                    variant="outlined"
                    placeholder="Write a comment..."
                    multiline
                    rows={3}
                />
                </Box>
                <Box sx={{ textAlign: 'right', mt: 2 }}>
                <Button variant="contained" color="primary">
                    Submit
                </Button>
                </Box>
            </Paper>
            </Box>
        </Box>
        </Container>
    );
    }

