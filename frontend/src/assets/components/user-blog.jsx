"use client"

import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import {
  Container,
  Card,
  CardContent,
  Typography,
  Grid,
  Box,
  CircularProgress,
  Divider,
  Button,
  Alert,
  Avatar,
  CardActions,
} from "@mui/material"
import { format } from "date-fns"
import axios from "../../api" // Ensure axios is properly configured
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css';

const UserBlogs = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const { id } = useParams()

  useEffect(() => {
    const fetchUserBlogs = async () => {
      try {
        setLoading(true)
        const { data } = await axios.get(`/user/blog/mini/${id}`)
        setUser(data.user)
        setBlogs(data.blogs || []) // Handle cases where blogs might be empty or undefined
      } catch (err) {
        console.error("API fetch error:", err)
        setError("Failed to fetch user blogs. Please try again later.")
      } finally {
        setLoading(false)
      }
    }

    fetchUserBlogs()
  }, [id])

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
        <CircularProgress />
      </Box>
    )
  }

  const formatDate = (dateString) => {
    try {
      return format(new Date(dateString), "M/d/yyyy")
    } catch {
      return "Invalid Date"
    }
  }

  return (
    <Container maxWidth="lg">
      <Box display="flex" flexDirection="column" alignItems="left" justifyContent="left" width="100%" mt={4}>
        {error && (
          <Box mb={3} width="100%" textAlign="center">
            <Alert severity="error">{error}</Alert>
          </Box>
        )}

        {user && (
          <Box mb={3} width="100%" textAlign="left">
            <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold", color: "#8d256f" }}>
              {user.username}'s Recent Blogs
            </Typography>
            <Divider sx={{ width: "100%" }} />
          </Box>
        )}

        <Box display="flex" justifyContent="center" width="100%">
          <Grid container spacing={3} justifyContent="center">
            {blogs.length > 0 ? (
              blogs.map((blog) => (
                <Grid item xs={12} sm={6} md={4} key={blog.id}>
                  <Link to={`/blog/${blog.id}`} style={{ textDecoration: "none" }}>
                    <Card
                      sx={{
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                        transition: "transform 0.2s, box-shadow 0.2s",
                        "&:hover": {
                          transform: "translateY(-5px)",
                          boxShadow: "0 10px 20px rgba(0,0,0,0.1)",
                        },
                        border: "1px solid #e0e0e0",
                        borderRadius: "4px",
                        cursor: "pointer",
                      }}
                    >
                      <CardContent sx={{ p: 3, pb: 1 }}>
                        <Typography
                          variant="h5"
                          component="h2"
                          gutterBottom
                          sx={{
                            fontWeight: "bold",
                            fontSize: "1.5rem",
                            mb: 1,
                            color: "#333",
                          }}
                        >
                          {blog.title}
                        </Typography>
                        <Typography variant="body1" color="text.primary" sx={{ mb: 2 }}>
                          <ReactMarkdown remarkPlugins={[remarkMath]} rehypePlugins={[rehypeKatex]}>
                          {blog.content?.substring(0, 50) }</ReactMarkdown>
                          
                        </Typography>

                        <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
                          <Avatar sx={{ bgcolor: "#673ab7", width: 36, height: 36, mr: 1.5 }}>
                            {user?.username?.charAt(0).toUpperCase() || "U"}
                          </Avatar>
                          <Box>
                            <Typography variant="subtitle2" sx={{ fontWeight: "medium", lineHeight: 1.2 }}>
                              {user?.username}
                            </Typography>
                            <Typography variant="caption" color="text.secondary" sx={{ fontSize: "0.75rem" }}>
                              {formatDate(blog.created_at)}
                            </Typography>
                          </Box>
                        </Box>
                      </CardContent>

                      <CardActions sx={{ p: 2, pt: 0, justifyContent: "flex-start" }}>
                        <Typography variant="caption" color="text.secondary" sx={{ fontSize: "0.75rem" }}>
                          Comments: {blog.comments_count} | Votes: {blog.votes_count}
                        </Typography>
                      </CardActions>
                    </Card>
                  </Link>
                </Grid>
              ))
            ) : (
              <Grid item xs={12}>
                <Typography variant="body1" align="center">
                  No blogs found for this user.
                </Typography>
              </Grid>
            )}
          </Grid>
        </Box>

        {blogs.length > 0 && (
          <Box display="flex" justifyContent="flex-end" mt={2}>
            <Link to={`/user/blog/all/${id}`} style={{ textDecoration: "none" }}>
              <Button variant="contained" color="primary">
                View All
              </Button>
            </Link>
          </Box>
        )}
      </Box>
    </Container>
  )
}

export default UserBlogs
