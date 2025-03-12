"use client"

import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import { Card, CardContent, Typography, Grid, Box, CircularProgress, Divider, Button } from "@mui/material"
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
        const { data } = await axios.get(`/api/user/blog/mini/${id}`)
        setUser(data.user)
        setBlogs(data.blogs.slice(0, 3)) // Limit to the last 3 blogs
      } catch (err) {
        console.error("API fetch failed, using demo data", err)
        setError("Failed to fetch user blogs, displaying demo data.")

        // Fallback demo data
        setUser({
          id: 1,
          username: "demo_user",
          email: "demo@example.com",
        })
        setBlogs([
          { id: 1, title: "Test Blog", created_at: "2025-01-07T19:21:49.000000Z" },
          { id: 2, title: "Fun of Primes (Edited)", created_at: "2025-01-07T15:34:15.000000Z" },
          { id: 3, title: "Demo Blog 3", created_at: "2025-03-06T08:45:10.000Z" },
        ])
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
    <Box display="flex" flexDirection="column" alignItems="left" justifyContent="left" width="95%" mt={4}>
      {user && (
        <Box mb={3} width="100%" textAlign="left" ml={12}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold", color: "#8d256f" }}>
          {user.username}'s Recent Blogs
        </Typography>
        <Divider sx={{ width: "90%", marginLeft: 0 }} />
      </Box>
      
      )}

      <Box display="flex" justifyContent="center" width="100%">
        <Grid container spacing={3} justifyContent="center" sx={{ maxWidth: "1200px" }}>
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

      {/* View All Button - Positioned Bottom Right */}
      {blogs.length > 0 && (
        <Box sx={{ display: "flex", justifyContent: "flex-end", mr: { xs: 2, md: 10 }, mb: 3 ,mt:4}}>
                <Button variant="contained" color="primary">
                  View All
                </Button>
              </Box>
      )}
    </Box>
  )
}

export default UserBlogs
