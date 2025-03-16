"use client"

import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import {
  Avatar,
  Box,
  Card,
  Container,
  Divider,
  Grid,
  Paper,
  Typography,
  Skeleton,
  useTheme,
  useMediaQuery,
} from "@mui/material"
import {
  Person as PersonIcon,
  DateRange as DateRangeIcon,
  Article as ArticleIcon,
  Code as CodeIcon,
  EmojiEvents as EmojiEventsIcon,
  AssignmentTurnedIn as AssignmentTurnedInIcon,
} from "@mui/icons-material"
import axios from "../../api"

const ProfilePage = () => {
  const { id: userId } = useParams() // Get the userId from the URL
  const navigate = useNavigate() // For navigation
  const [userData, setUserData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"))

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`/user/details/${userId}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        })

        if (response.status === 200) {
          setUserData(response.data) // Assuming data is directly in the response
          setLoading(false)
        } else {
          throw new Error("Failed to fetch user data")
        }
      } catch (err) {
        setError(err.message)
        setLoading(false)
      }
    }

    if (userId) {
      fetchUserData()
    } else {
      setError("User ID is missing in the URL")
      setLoading(false)
    }
  }, [userId])

  if (error) {
    return (
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Paper elevation={3} sx={{ p: 3, textAlign: "center", bgcolor: "#ffebee" }}>
          <Typography variant="h6" color="error">
            Error: {error}
          </Typography>
        </Paper>
      </Container>
    )
  }

  const formatDate = (dateString) => {
    if (!dateString) return "Not available"
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const StatCard = ({ icon, title, value, color, onClick }) => (
    <Card
      elevation={2}
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        p: 2,
        borderTop: `4px solid ${color}`,
        transition: "transform 0.2s",
        cursor: "pointer",
        "&:hover": {
          transform: "translateY(-5px)",
          boxShadow: theme.shadows[8],
        },
      }}
      onClick={onClick}
    >
      <Box sx={{ color: color, mb: 1 }}>{icon}</Box>
      <Typography variant="h5" component="div" sx={{ fontWeight: "bold" }}>
        {loading ? <Skeleton width={30} /> : value}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {title}
      </Typography>
    </Card>
  )

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Paper
        elevation={3}
        sx={{
          p: isMobile ? 2 : 4,
          borderRadius: 2,
          overflow: "hidden",
          position: "relative",
          boxShadow: "none",
        }}
      >
        <Grid container spacing={4}>
          {/* Profile Info Section */}
          <Grid item xs={12}>
            <Box
              sx={{
                display: "flex",
                flexDirection: isMobile ? "column" : "row",
                alignItems: isMobile ? "center" : "flex-start",
                position: "relative",
                zIndex: 1,
                mb: 2,
              }}
            >
              <Avatar
                sx={{
                  width: 120,
                  height: 120,
                  bgcolor: theme.palette.secondary.main,
                  border: "4px solid white",
                  boxShadow: theme.shadows[3],
                  fontSize: "3rem",
                  mb: isMobile ? 2 : 0,
                  mr: isMobile ? 0 : 3,
                }}
              >
                {loading ? (
                  <Skeleton variant="circular" width={120} height={120} />
                ) : (
                  userData?.user?.username?.charAt(0).toUpperCase() || <PersonIcon fontSize="large" />
                )}
              </Avatar>

              <Box sx={{ mt: isMobile ? 2 : 4 }}>
                <Typography variant="h4" component="h1" sx={{ fontWeight: "bold", color: "#2A52BE" }}>
                  {loading ? <Skeleton width={200} /> : userData?.user?.username || "User"}
                </Typography>

                <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
                  <DateRangeIcon fontSize="small" sx={{ mr: 1, color: "text.secondary" }} />
                  <Typography variant="body2" color="text.secondary">
                    {loading ? <Skeleton width={120} /> : `Joined: ${formatDate(userData?.user?.created_at)}`}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12}>
            <Divider />
          </Grid>

          {/* Stats Section */}
          <Grid item xs={12}>
            <Grid container spacing={2} sx={{ mt: 4, mb: 4 }}>
              <Grid item xs={12} sm={6} md={3}>
                <StatCard
                  icon={<ArticleIcon fontSize="large" />}
                  title="Blogs"
                  value={userData?.blog_count}
                  color={theme.palette.primary.main}
                  onClick={() => navigate(`/user/blog/all/${userId}`)}
                />
              </Grid>

              <Grid item xs={12} sm={6} md={3}>
                <StatCard
                  icon={<CodeIcon fontSize="large" />}
                  title="Problems"
                  value={userData?.problem_count}
                  color={theme.palette.secondary.main}
                  onClick={() => navigate(`/problem/create/${userId}`)}
                />
              </Grid>

              <Grid item xs={12} sm={6} md={3}>
                <StatCard
                  icon={<EmojiEventsIcon fontSize="large" />}
                  title="Contests Created"
                  value={userData?.created_contest_count}
                  color="#FF9800" // Orange
                  onClick={() => navigate("/contest/private/all")}
                />
              </Grid>

              <Grid item xs={12} sm={6} md={3}>
                <StatCard
                  icon={<AssignmentTurnedInIcon fontSize="large" />}
                  title="Problems Attempted"
                  value={userData?.attempted_problems_count}
                  color="#4CAF50" // Green
                  onClick={() => navigate(`/user/submission/all/${userId}`)}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  )
}

export default ProfilePage

