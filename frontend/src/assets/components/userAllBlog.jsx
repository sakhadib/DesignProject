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
  CircularProgress,
  Paper,
  Avatar,
  useTheme,
  Button,
  TextField,
  InputAdornment,
} from "@mui/material"
import { Person as PersonIcon, Search as SearchIcon, Add as AddIcon, NoEncryption } from "@mui/icons-material"
import { format } from "date-fns"
import { alpha } from "@mui/material/styles"
import axios from "../../api"
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css';

const UserBlogsPage = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const { id } = useParams()
  const theme = useTheme()

  const [searchQuery, setSearchQuery] = useState("")

  const filteredBlogs = blogs.filter((blog) => blog.title.toLowerCase().includes(searchQuery.toLowerCase()))

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
      return format(new Date(dateString), "M/d/yyyy")
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
            boxShadow: "none",
            display: "flex",
            alignItems: "center",
            gap: 2,
          }}
        >
          <Avatar sx={{ width: 70, height: 70, bgcolor: theme.palette.primary.main , fontSize: 30 }}>
            {user?.username ? user.username[0].toUpperCase() : <PersonIcon />}
          </Avatar>
          <Typography variant="h4" fontWeight="bold">
            {user?.username}'s Blogs
          </Typography>
        </Paper>
      )}

      {/* Action Bar with Search and New Button */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
          flexDirection: { xs: "column", sm: "row" },
          gap: 2,
        }}
      >
        <TextField
          placeholder="Search blogs by title..."
          variant="outlined"
          size="small"
          fullWidth
          sx={{ maxWidth: { sm: "400px" } }}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon fontSize="small" />
              </InputAdornment>
            ),
          }}
        />
        <Button
  variant="contained"
  color="primary"
  startIcon={<AddIcon />}
  href="/blog/write"
  sx={{
    minWidth: "100px",
    alignSelf: { xs: "flex-end", sm: "auto" },
    borderRadius: 2,
    mr: { xs: 0, md: 4 }, // 20px margin-right for md and larger screens
  }}
>
  New
</Button>

      </Box>

      {/* Blogs Grid */}
      {filteredBlogs.length > 0 ? (
        <Grid container spacing={3}>
          {filteredBlogs.map((blog) => (
            <Grid item xs={12} sm={6} md={4} key={blog.id}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  borderRadius: 1,
                  border: "1px solid #e0e0e0",
                  boxShadow: "none",
                  overflow: "visible",
                }}
              >
                <CardActionArea component="a" href={`/blog/${blog.id}`} sx={{ flexGrow: 1 }}>
                  <CardContent sx={{ p: 3 }}>
                    {/* Category label */}
                    <Typography variant="body2" component="div" sx={{ mb: 0.5, color: "text.secondary" }}>
                      {blog.category}
                    </Typography>

                    {/* Blog title */}
                    <Typography
                      variant="h6"
                      component="h2"
                      sx={{
                        fontWeight: "bold",
                        mb: 1.5,
                        fontSize: "1.5rem",
                      }}
                    >
                      {blog.title}
                    </Typography>

                    {/* Blog excerpt */}
                    <Typography variant="body1" color="text.primary" sx={{ mb: 2 }}>
                      <ReactMarkdown remarkPlugins={[remarkMath]} rehypePlugins={[rehypeKatex]}>
                      {blog.content?.substring(0, 50) }</ReactMarkdown>
                      
                    </Typography>

                    {/* Author info and date */}
                    <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                      <Avatar
                        sx={{
                          width: 40,
                          height: 40,
                          bgcolor: "#673ab7",
                          mr: 1.5,
                        }}
                      >
                        {user?.username ? user.username[0].toUpperCase() : "S"}
                      </Avatar>
                      <Box>
                        <Typography variant="body2" sx={{ fontWeight: "medium" }}>
                          {user?.username}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {formatDate(blog.created_at)}
                        </Typography>
                      </Box>
                    </Box>

                    {/* Stats */}
                    <Typography variant="body2" color="text.secondary">
                      Comments: {blog.comments_count} | Votes: {blog.votes_count}
                    </Typography>
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

