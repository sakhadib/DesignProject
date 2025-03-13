"use client"

import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import {
  Box,
  Card,
  CardContent,
  CardActionArea,
  Typography,
  Grid,
  Divider,
  CircularProgress,
  Paper,
  Avatar,
  useTheme,
} from "@mui/material"
import { Person as PersonIcon } from "@mui/icons-material"
import { format } from "date-fns"
import { alpha } from "@mui/material/styles"
import axios from "../../api"

const UserBlogsPage = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const { id } = useParams()
  const theme = useTheme()

  useEffect(() => {
    const fetchUserBlogs = async () => {
      try {
        setLoading(true)
        const response = await axios.get(`/user/blog/all/${id}`)

        if (response.status === 200) {
          setUser(response.data.user)
          setBlogs(response.data.blogs || [])
        } else {
          throw new Error("Failed to fetch user blogs")
        }
      } catch (err) {
        console.error("Error fetching blogs:", err)
        setError(err.message || "An error occurred while fetching blogs")
      } finally {
        setLoading(false)
      }
    }

    if (id) {
      fetchUserBlogs()
    }
  }, [id])

  const formatDate = (dateString) => {
    try {
      return format(new Date(dateString), "MMM dd, yyyy")
    } catch (e) {
      return dateString
    }
  }

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
        <CircularProgress />
      </Box>
    )
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
        <Paper elevation={3} sx={{ p: 3, maxWidth: 500, textAlign: "center" }}>
          <Typography color="error" variant="h6">
            Error: {error}
          </Typography>
          <Typography color="textSecondary" sx={{ mt: 1 }}>
            Please try again later or contact support if the problem persists.
          </Typography>
        </Paper>
      </Box>
    )
  }

  return (
    <Box sx={{ py: 4, px: { xs: 2, md: 4 } }}>
      {/* User Info Header */}
      {user && (
        <Paper
          elevation={2}
          sx={{
            p: 3,
            mb: 4,
            borderRadius: 2,
            background: `linear-gradient(to right, ${alpha(theme.palette.primary.main, 0.1)}, ${alpha(theme.palette.background.paper, 0.7)})`,
            display: "flex",
            alignItems: "center",
            gap: 2,
          }}
        >
          <Avatar sx={{ width: 60, height: 60, bgcolor: theme.palette.primary.main }}>
            {user?.username ? user.username[0].toUpperCase() : <PersonIcon />}
          </Avatar>
          <Typography variant="h5" fontWeight="bold">
            {user?.username}'s Blogs
          </Typography>
        </Paper>
      )}

      {/* Blogs Grid */}
      {blogs.length > 0 ? (
        <Grid container spacing={3}>
          {blogs.map((blog) => (
            <Grid item xs={12} sm={6} md={4} key={blog.id}>
              <Card sx={{ height: "100%", display: "flex", flexDirection: "column", borderRadius: 2 }}>
                <CardActionArea component="a" href={`/blog/${blog.id}`} sx={{ flexGrow: 1 }}>
                  <CardContent sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
                    <Typography variant="h6" component="h2" gutterBottom>
                      {blog.title}
                    </Typography>
                    <Box sx={{ mt: "auto", pt: 2 }}>
                      <Divider sx={{ mb: 2 }} />
                      <Typography variant="body2" color="text.secondary">
                        {formatDate(blog.created_at)}
                      </Typography>
                    </Box>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Paper elevation={1} sx={{ p: 4, textAlign: "center", borderRadius: 2 }}>
          <Typography variant="h6">No Blogs Found</Typography>
          <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
            This user hasn't published any blogs yet.
          </Typography>
        </Paper>
      )}
    </Box>
  )
}

export default UserBlogsPage
