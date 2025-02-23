// import React, { useState, useEffect } from 'react';
// import {
//     Typography,
//     Container,
//     Box,
//     Card,
//     CardContent,
//     Avatar,
//     Chip,
//     Button,
//     TextField,
//     List,
//     ListItem,
//     ListItemText,
//     ListItemAvatar,
//     Divider,
//     IconButton,
//     Menu,
//     MenuItem,
//     Dialog,
//     DialogActions,
//     DialogContent,
//     DialogTitle
// } from '@mui/material';
// import {
//     ThumbUp as ThumbUpIcon,
//     ThumbDown as ThumbDownIcon,
//     Comment as CommentIcon,
//     Delete as DeleteIcon,
//     MoreVert as MoreVertIcon,
// } from '@mui/icons-material';
// import { useParams } from 'react-router-dom';
// import axios from '../../api';
// import ReactMarkdown from 'react-markdown';
// import remarkMath from 'remark-math';
// import rehypeKatex from 'rehype-katex';
// import 'katex/dist/katex.min.css';
// import Cookies from 'js-cookie';
// import { deepPurple, deepOrange, blue, green, red } from '@mui/material/colors';
// import EditIcon from '@mui/icons-material/Edit';

// const BlogPostPage = () => {
// const { id } = useParams();
// const [blogPost, setBlogPost] = useState(null);
// const [newComment, setNewComment] = useState('');
// const [localComments, setLocalComments] = useState([]);
// const [userVote, setUserVote] = useState(null);
// const [anchorEl, setAnchorEl] = useState(null); // Menu anchor element for comment options
// const [selectedComment, setSelectedComment] = useState(null); // Selected comment for editing
// const [isEditing, setIsEditing] = useState(false); // To manage comment editing state
// const username = Cookies.get('username');
// const [currentUser, setUsername] = useState(null);
// const [isDialogOpen, setIsDialogOpen] = useState(false); // Manage dialog visibility


// useEffect(() => {
//     const fetchCurrentUser = async () => {
//         try {
//             const token = Cookies.get('token'); // Assuming the token is stored in cookies
            
//             const response = await axios.post('/auth/me/', {
//                 headers: {
//                     Authorization: `Bearer ${token}`,
//                 },
//             });
//             setUsername(response.data.username);
//         } catch (error) {
//             console.error('Error fetching the current user:', error);
//         }
//     };


// const fetchBlogPost = async () => {
//     try {
//         const response = await axios.get(`/blog/single/${id}/`);
//         const blogData = response.data.blog;

//         setBlogPost({
//             ...blogData,
//             author: blogData.user.username, // Extract the author's name from the API response
//             upvote_count: blogData.votes.filter((vote) => vote.vote === 1).length,
//             downvote_count: blogData.votes.filter((vote) => vote.vote === 0).length,
//         });
//         setLocalComments(blogData.comments);

//         // Set user vote if available
//         const userVoteData = blogData.votes.find((vote) => vote.user_id === username);
//         if (userVoteData) {
//             setUserVote(userVoteData.vote);
//         }
//     } catch (error) {
//         console.error('Error fetching the blog post:', error);
//     }
// };

//     fetchBlogPost();
//     fetchCurrentUser();
// }, [id, username]);

// const handleCommentSubmit = async (e) => {
//     e.preventDefault();
//     if (newComment.trim()) {
//         try {
//             const commentData = {
//             blog_id: id,
//             content: newComment,
//         };
//         const response = await axios.post('/blog/comment/', commentData);

//         // Make sure to get the full user data from the response
//         const newCommentData = {
//             id: response.data.comment.id,
//             user: response.data.comment.user, // Take the user from the response data
//             content: newComment,
//             created_at: new Date().toISOString(), // Add a timestamp
//         };

//         // Update local state with the new comment
//         setLocalComments((prevComments) => [...prevComments, newCommentData]);
//         setNewComment('');
//         } catch (error) {
//             console.error('Error posting the comment:', error);
//         }
//     }
// };

// const handleDeleteComment = async (commentId) => {
//     try {
//         await axios.post('/blog/comment/delete/', { comment_id: commentId });
//         setLocalComments(localComments.filter((comment) => comment.id !== commentId));
//     } catch (error) {
//         console.error('Error deleting the comment:', error);
//     }
// };

// const handleEditComment = async () => {
//     if (selectedComment && selectedComment.content !== newComment.trim()) {
//         try {
//         await axios.post('/blog/comment/edit/', {
//             comment_id: selectedComment.id,
//             content: newComment.trim(),
//         });

//         setLocalComments((prevComments) =>
//             prevComments.map((comment) =>
//             comment.id === selectedComment.id
//             ? { ...comment, content: newComment.trim() }
//             : comment
//         ));

//         setIsEditing(false);
//         setNewComment('');
//         setIsDialogOpen(false); // Close the dialog
//         } catch (error) {
//         console.error('Error editing the comment:', error);
//         }
//     }
// };


// const handleVote = async (voteType) => {
//     if (userVote === voteType) return;

//     try {
//         await axios.post('/blog/vote/', {
//             blog_id: id,
//             vote: voteType,
//         });

//         if (voteType) {
//             setBlogPost((prev) => ({
//             ...prev,
//             upvote_count: prev.upvote_count + 1,
//             downvote_count: userVote === 0 ? prev.downvote_count - 1 : prev.downvote_count,
//             }));
//         } else {
//             setBlogPost((prev) => ({
//             ...prev,
//             downvote_count: prev.downvote_count + 1,
//             upvote_count: userVote === 1 ? prev.upvote_count - 1 : prev.upvote_count,
//             }));
//         }

//         setUserVote(voteType);
//     } catch (error) {
//         console.error('Error posting the vote:', error);
//     }
// };

//   // Function to generate a background color based on the first character
// const getBackgroundColor = (char) => {
//     const colors = [deepPurple[500], deepOrange[500], blue[500], green[500], red[500]];
//     const index = char.toLowerCase().charCodeAt(0) % colors.length; // Map the character to an index
//     return colors[index];
// };

// const handleMenuOpen = (event, comment) => {
//     // setAnchorEl(event.currentTarget);
//     setSelectedComment(comment);
//     setNewComment(comment.content); // Prefill the TextField with existing comment
//     setIsDialogOpen(true); // Open the dialog
// };



// const handleMenuClose = () => {
//     setAnchorEl(null);
//     setSelectedComment(null);
//     setIsEditing(false);
//     setNewComment('');
// };

// if (!blogPost) return <div>Loading...</div>;

// return (
//     <Box>
//         <Container maxWidth="md" sx={{ mt: 4 }}>
//             <Typography variant="h2" component="h1" gutterBottom sx={{ fontFamily: 'Raleway, Arial, sans-serif', fontWeight: 700, fontSize: '70px' }}>
//                 {blogPost.title}
//             </Typography>
//             <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
//                 <Box sx={{ display: 'flex', alignItems: 'center' }}>
//                     <Avatar
//                     sx={{
//                         mr: 2,
//                         bgcolor: getBackgroundColor(blogPost.user.username.charAt(0)),
//                         color: 'white',
//                     }}
//                     >
//                     {blogPost.author?.[0]?.toUpperCase()}
//                     </Avatar>
//                     <Box>
//                     <Typography variant="subtitle1">{blogPost.author}</Typography>
//                     <Typography variant="body2" color="text.secondary">
//                         {new Date(blogPost.created_at).toLocaleDateString()}
//                     </Typography>
//                     </Box>
//                 </Box>
//                 <Chip label={`Category: ${blogPost.category}`} />
//             </Box>
//             <Box sx={{ fontSize: '20px', mb: 4 }}>
//                 <ReactMarkdown remarkPlugins={[remarkMath]} rehypePlugins={[rehypeKatex]}>
//                     {blogPost.content}
//                 </ReactMarkdown>
//             </Box>
//             <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
//                 <IconButton color={userVote === 1 ? 'primary' : 'default'} onClick={() => handleVote(1)}>
//                     <ThumbUpIcon />
//                 </IconButton>
//                 <Typography sx={{ mr: 2 }}>{blogPost.upvote_count}</Typography>
//                 <IconButton color={userVote === 0 ? 'primary' : 'default'} onClick={() => handleVote(0)}>
//                     <ThumbDownIcon />
//                 </IconButton>
//                 <Typography sx={{ mr: 2 }}>{blogPost.downvote_count}</Typography>
//                 <IconButton>
//                     <CommentIcon />
//                 </IconButton>
//                 <Typography>{localComments.length}</Typography>
//             </Box>
//             <Typography variant="h5" gutterBottom>
//                 Comments
//             </Typography>
//             <Card sx={{ mb: 4 }}>
//                 <CardContent>
//                     <form onSubmit={handleCommentSubmit}>
//                     <TextField
//                         fullWidth
//                         multiline
//                         rows={3}
//                         variant="outlined"
//                         placeholder="Add a comment..."
//                         value={newComment}
//                         onChange={(e) => setNewComment(e.target.value)}
//                         sx={{ mb: 2 }}
//                     />
//                     <Button type="submit" variant="contained" color="primary">
//                         Post Comment
//                     </Button>
//                     </form>
//                 </CardContent>
//             </Card>
//             <List>
//             {localComments.map((comment) => (
//                 <React.Fragment key={comment.id}>
//                     <ListItem alignItems="flex-start">
//                         <ListItemAvatar>
//                             <Avatar
//                                 sx={{
//                                 bgcolor: comment.user?.username ? getBackgroundColor(comment.user.username.charAt(0)) : 'grey', // Default background color if user or username is missing
//                                 color: 'white',
//                                 }}
//                             >
//                                 {comment.user?.username ? comment.user.username.charAt(0).toUpperCase() : '?'} {/* Default '?' if username is missing */}
//                             </Avatar>
//                         </ListItemAvatar>
//                     <ListItemText
//                         secondary={
//                         <Box display="flex" alignItems="center" justifyContent="space-between">
//                             <Typography variant="body2" color="text.primary">
//                                 {comment.user?.username || 'Unknown User'} {/* Show 'Unknown User' if user or username is missing */}
//                             </Typography>
//                             {/* Show delete button only for comments authored by the current user */}
//                             {comment.user?.username === currentUser && (
//                                 <Box>
//                                     <IconButton onClick={(e) => handleMenuOpen(e, comment)} color="default">
//                                         <EditIcon />
//                                     </IconButton>
//                                     <IconButton onClick={() => handleDeleteComment(comment.id)} color="error">
//                                         <DeleteIcon />
//                                     </IconButton>
//                                 </Box>
//                             )}
//                         </Box>
//                         }
//                         primary={
//                             <>
//                                 <Typography component="span" variant="body2" color="text.primary">
//                                     {comment.content} {/* Comment content */}
//                                 </Typography>
//                                 <br />
//                                 <Typography variant="caption" color="text.secondary">
//                                     {new Date(comment.created_at).toLocaleString()} {/* Date */}
//                                 </Typography>
//                             </>
//                         }
//                     />
//                     </ListItem>
//                     <Divider variant="inset" component="li" />
//                 </React.Fragment>
//             ))}
//             </List>
//             <Menu
//                 anchorEl={anchorEl}
//                 open={Boolean(anchorEl)}
//                 onClose={handleMenuClose}
//                 >
//                 <MenuItem onClick={() => { setNewComment(selectedComment.content); setIsEditing(true); handleMenuClose();}}>Edit</MenuItem>
//                 <MenuItem onClick={() => { handleDeleteComment(selectedComment.id); handleMenuClose(); }}>Delete</MenuItem>
//             </Menu>

//             <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)}>
//                 <DialogTitle>Edit Comment</DialogTitle>
//                 <DialogContent>
//                     <TextField
//                     autoFocus
//                     margin="dense"
//                     label="Comment"
//                     type="text"
//                     fullWidth
//                     multiline
//                     rows={4}
//                     variant="outlined"
//                     value={newComment}
//                     onChange={(e) => setNewComment(e.target.value)}
//                     />
//                 </DialogContent>
//                 <DialogActions>
//                     <Button onClick={() => setIsDialogOpen(false)} color="primary">
//                     Cancel
//                     </Button>
//                     <Button onClick={handleEditComment} variant="contained" color="primary">
//                     Save
//                     </Button>
//                 </DialogActions>
//             </Dialog>
//         </Container>
//     </Box>
//     );
// };

// export default BlogPostPage;













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
    Menu,
    MenuItem,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
} from '@mui/material';
import {
    ThumbUp as ThumbUpIcon,
    ThumbDown as ThumbDownIcon,
    Comment as CommentIcon,
    Delete as DeleteIcon,
    MoreVert as MoreVertIcon,
} from '@mui/icons-material';
import { useParams } from 'react-router-dom';
import axios from '../../api';
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css';
import Cookies from 'js-cookie';
import { deepPurple, deepOrange, blue, green, red } from '@mui/material/colors';
import EditIcon from '@mui/icons-material/Edit';

const BlogPostPage = () => {
const { id } = useParams();
const [blogPost, setBlogPost] = useState(null);
const [newComment, setNewComment] = useState('');
const [localComments, setLocalComments] = useState([]);
const [userVote, setUserVote] = useState(null);
const [anchorEl, setAnchorEl] = useState(null);
const [selectedComment, setSelectedComment] = useState(null);
const [isEditing, setIsEditing] = useState(false);
const username = Cookies.get('username');
const [currentUser, setUsername] = useState(null);
const [isDialogOpen, setIsDialogOpen] = useState(false);

useEffect(() => {
    const fetchCurrentUser = async () => {
        try {
            const token = Cookies.get('token');
            const response = await axios.post('/auth/me/', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            });
            setUsername(response.data.username);
        } catch (error) {
            console.error('Error fetching the current user:', error);
        }
    };

    const fetchBlogPost = async () => {
        try {
            const response = await axios.get(`/blog/single/${id}/`);
            const blogData = response.data.blog;

            setBlogPost({
            ...blogData,
            author: blogData.user.username,
            upvote_count: blogData.up_votes_count,
            downvote_count: blogData.down_votes_count,
            });
            setLocalComments(blogData.comments);

            // Set user vote if available
            if (blogData.myvote && blogData.myvote.length > 0) {
            setUserVote(blogData.myvote[0].vote);
            }
        } catch (error) {
            console.error('Error fetching the blog post:', error);
        }
    };

    fetchBlogPost();
    fetchCurrentUser();
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

            const newCommentData = {
            id: response.data.comment.id,
            user: response.data.comment.user,
            content: newComment,
            created_at: new Date().toISOString(),
            };

            setLocalComments((prevComments) => [...prevComments, newCommentData]);
            setNewComment('');
        } catch (error) {
            console.error('Error posting the comment:', error);
        }
    }
};

const handleDeleteComment = async (commentId) => {
    try {
        await axios.post('/blog/comment/delete/', { comment_id: commentId });
        setLocalComments(localComments.filter((comment) => comment.id !== commentId));
    } catch (error) {
        console.error('Error deleting the comment:', error);
    }
};

const handleEditComment = async () => {
    if (selectedComment && newComment.trim() !== selectedComment.content) {
        try {
            await axios.post('/blog/comment/edit/', {
            comment_id: selectedComment.id,
            content: newComment.trim(),
            });

            setLocalComments((prevComments) =>
            prevComments.map((comment) =>
                comment.id === selectedComment.id
                ? { ...comment, content: newComment.trim() }
                : comment
            )
            );

            setIsDialogOpen(false);
            setNewComment('');
            setSelectedComment(null);
        } catch (error) {
            console.error('Error editing the comment:', error);
        }
    }
};

const handleVote = async (voteType) => {
    try {
        if (userVote === voteType) {
            // Delete the vote
            await axios.post('/blog/vote/delete/', { blog_id: id });
            setUserVote(null);
            setBlogPost((prev) => ({
            ...prev,
            upvote_count: voteType === 1 ? prev.upvote_count - 1 : prev.upvote_count,
            downvote_count: voteType === 0 ? prev.downvote_count - 1 : prev.downvote_count,
            }));
        } else {
            // Update the vote
            await axios.post('/blog/vote/', {
            blog_id: id,
            vote: voteType,
            });

            setUserVote(voteType);
            setBlogPost((prev) => ({
            ...prev,
            upvote_count:
                voteType === 1
                ? prev.upvote_count + 1
                : userVote === 1
                ? prev.upvote_count - 1
                : prev.upvote_count,
            downvote_count:
                voteType === 0
                ? prev.downvote_count + 1
                : userVote === 0
                ? prev.downvote_count - 1
                : prev.downvote_count,
            }));
        }
    } catch (error) {
        console.error('Error handling the vote:', error);
    }
};

const getBackgroundColor = (char) => {
    const colors = [deepPurple[500], deepOrange[500], blue[500], green[500], red[500]];
    const index = char.toLowerCase().charCodeAt(0) % colors.length;
    return colors[index];
};

const handleMenuOpen = (event, comment) => {
    setSelectedComment(comment);
    setNewComment(comment.content);
    setIsDialogOpen(true);
};

const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedComment(null);
    setIsEditing(false);
    setNewComment('');
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
                    <Avatar
                    sx={{
                        mr: 2,
                        bgcolor: getBackgroundColor(blogPost.user.username.charAt(0)),
                        color: 'white',
                    }}
                    >
                    {blogPost.author?.[0]?.toUpperCase()}
                    </Avatar>
                    <Box>
                    <Typography variant="subtitle1">{blogPost.author}</Typography>
                    <Typography variant="body2" color="text.secondary">
                        {new Date(blogPost.created_at).toLocaleDateString()}
                    </Typography>
                    </Box>
                </Box>
                <Chip label={`Category: ${blogPost.category}`} />
            </Box>
            <Box sx={{ fontSize: '20px', mb: 4 }}>
                <ReactMarkdown remarkPlugins={[remarkMath]} rehypePlugins={[rehypeKatex]}>
                    {blogPost.content}
                </ReactMarkdown>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
                <IconButton color={userVote === 1 ? 'primary' : 'default'} onClick={() => handleVote(1)}>
                    <ThumbUpIcon />
                </IconButton>
                <Typography sx={{ mr: 2 }}>{blogPost.upvote_count}</Typography>
                <IconButton color={userVote === 0 ? 'primary' : 'default'} onClick={() => handleVote(0)} >
                    <ThumbDownIcon />
                </IconButton>
                <Typography sx={{ mr: 2 }}>{blogPost.downvote_count}</Typography>
                <IconButton>
                    <CommentIcon />
                </IconButton>
                <Typography>{localComments.length}</Typography>
            </Box>
            <Typography variant="h5" gutterBottom> Comments </Typography>
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
                    <Avatar
                        sx={{
                        bgcolor: comment.user?.username ? getBackgroundColor(comment.user.username.charAt(0)) : 'grey',
                        color: 'white',
                        }}
                    >
                        {comment.user?.username ? comment.user.username.charAt(0).toUpperCase() : '?'}
                    </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                    secondary={
                        <Box display="flex" alignItems="center" justifyContent="space-between">
                        <Typography variant="body2" color="text.primary">
                            {comment.user?.username || 'Unknown User'}
                        </Typography>
                        {comment.user?.username === currentUser && (
                            <Box>
                            <IconButton onClick={(e) => handleMenuOpen(e, comment)} color="default">
                                <EditIcon />
                            </IconButton>
                            <IconButton onClick={() => handleDeleteComment(comment.id)} color="error">
                                <DeleteIcon />
                            </IconButton>
                            </Box>
                        )}
                        </Box>
                    }
                    primary={
                        <>
                        <Typography component="span" variant="body2" color="text.primary">
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
            <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)}>
            <DialogTitle>Edit Comment</DialogTitle>
            <DialogContent>
                <TextField
                autoFocus
                margin="dense"
                label="Comment"
                type="text"
                fullWidth
                multiline
                rows={4}
                variant="outlined"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={() => setIsDialogOpen(false)} color="primary">
                Cancel
                </Button>
                <Button onClick={handleEditComment} variant="contained" color="primary">
                Save
                </Button>
            </DialogActions>
            </Dialog>
        </Container>
    </Box>
  );
};

export default BlogPostPage;