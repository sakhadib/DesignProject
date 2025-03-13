"use client"

import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import { Container, Card, CardContent, Typography, Grid, Box, CircularProgress, Divider, Button, Alert } from "@mui/material"
import { format } from "date-fns"
import axios from "../../api" // Ensure axios is properly configured

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
      return format(new Date(dateString), "MMM dd, yyyy")
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
                    }}
                  >
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography variant="h6" component="h2" gutterBottom noWrap sx={{ textAlign: "left" }}>
                        {blog.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ textAlign: "left" }}>
                        Posted on {formatDate(blog.created_at)}
                      </Typography>
                    </CardContent>
                  </Card>
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
