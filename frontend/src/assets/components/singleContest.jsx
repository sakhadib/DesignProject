"use client"
import React from "react"
import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import axios from "../../api"
import {
  Box,
  Typography,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Card,
  CardContent,
  Chip,
  Divider,
} from "@mui/material"
import FlipTimer from "./flip-timer"
import ReactMarkdown from "react-markdown"
import remarkMath from "remark-math"
import rehypeKatex from "rehype-katex"
import "katex/dist/katex.min.css" // Import KaTeX CSS for math rendering
import { CircularProgress } from "@mui/material"


class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.log("Error caught:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong. Please try again later.</h1>;
    }

    return this.props.children;
  }
}

const ContestPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [contest, setContest] = useState(null)
  const [timeRemaining, setTimeRemaining] = useState(0)
  const [contestStatus, setContestStatus] = useState("upcoming")
  const [isParticipant, setIsParticipant] = useState(false)
  const [loadingParticipant, setLoadingParticipant] = useState(true)
  const [contestProblems, setContestProblems] = useState([])
  const [localStartTime, setLocalStartTime] = useState("") // ✅ Added this
  const [localEndTime, setLocalEndTime] = useState("") // ✅ Added this

  // Function to get user's local timezone
  const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone

  const formatLocalTime = (utcTime) => {
    // Ensure utcTime is in proper format
    const utcDate = new Date(`${utcTime}Z`) // Append "Z" to ensure it's treated as UTC
    return new Intl.DateTimeFormat(undefined, {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
      timeZone: userTimezone, // Convert to user's timezone
    }).format(utcDate)
  }

  // Fetch contest details
  useEffect(() => {
    const fetchContestDetails = async () => {
      try {
        const response = await axios.get(`/contest/single/${id}`)
        const contestData = response.data?.contest[0]
        setContest(contestData)

        // Convert UTC times to local timezone
        if (contestData.start_time) {
          setLocalStartTime(formatLocalTime(contestData.start_time))
        }
        if (contestData.end_time) {
          setLocalEndTime(formatLocalTime(contestData.end_time))
        }

        // Get UTC timestamps for comparison
        const currentTime = new Date().getTime() // Current local timestamp
        const startTimeUTC = new Date(contestData.start_time + " UTC").getTime()
        const endTimeUTC = new Date(contestData.end_time + " UTC").getTime()

        if (currentTime < startTimeUTC) {
          setContestStatus("upcoming")
          setTimeRemaining(Math.floor((startTimeUTC - currentTime) / 1000))
        } else if (currentTime >= startTimeUTC && currentTime < endTimeUTC) {
          setContestStatus("active")
          setTimeRemaining(Math.floor((endTimeUTC - currentTime) / 1000))
        } else {
          setContestStatus("previous")
        }

        await checkParticipant(contestData.id)
      } catch (error) {
        console.error("API Error fetching contest:", error)
      }
    }

    fetchContestDetails()
  }, [id, userTimezone])

  // Check if user is a participant
  const checkParticipant = async (contestId) => {
    try {
      const res = await axios.post(
        `/contest/isparticipant`,
        { contest_id: contestId },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        },
      )
      if (res.data.message !== "User is not registered in the contest") {
        setIsParticipant(true)
      }
    } catch (error) {
      console.error("Error checking participation:", error)
    } finally {
      setLoadingParticipant(false)
    }
  }

  // Fetch problems if user is registered & contest is active or previous
  useEffect(() => {
    const fetchContestProblems = async () => {
      try {
        const response = await axios.get(`/contest/problems/${id}`)
        if (response.data && response.data.problems) {
          setContestProblems(response.data.problems)
        }
      } catch (error) {
        console.error("Error fetching problems:", error)
      }
    }

    if ((contestStatus === "active" || contestStatus === "previous") && isParticipant) {
      fetchContestProblems()
    }
  }, [contestStatus, isParticipant, id])

  if (!contest) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
      <CircularProgress />
      </Box>
    )
  }

  return (
    <Box sx={{ maxWidth: 1200, mx: "auto", p: 4 }}>
 <Card sx={{ mb: 4 }}>
  <CardContent>
    <Typography variant="h3" component="h1" align="center" gutterBottom>
      {contest.title}
    </Typography>
    <Typography variant="subtitle1" align="center" gutterBottom>
      Created by: {contest.user?.username || "Unknown"}
    </Typography>
    <Box display="flex" justifyContent="center" mb={2}>
      <Chip
        label={contestStatus.charAt(0).toUpperCase() + contestStatus.slice(1)}
        sx={{
          backgroundColor:
            contestStatus === "active" ? "#6AA121" : contestStatus === "upcoming" ? "#8d256f" : "#B0BEC5",
          color: "#fff",
        }}
      />
    </Box>

    {/* Display local start and end times */}
    <Box sx={{ textAlign: "center", mb: 2 }}>
      <Typography variant="body1">
        <strong>Start Time:</strong> {localStartTime}
      </Typography>

      <Typography variant="body1">
        <strong>End Time:</strong> {localEndTime}
      </Typography>
    </Box>

    {/* Show timer for active or upcoming contests */}
    {(contestStatus === "upcoming" || contestStatus === "active") && (
      <Box mb={2}>
        <FlipTimer initialTime={timeRemaining} />
        <Typography variant="subtitle1" align="center">
          {contestStatus === "upcoming" ? "Time to start" : "Time remaining"}
        </Typography>
      </Box>
    )}
    <Divider sx={{ my: 2 }} />
    <Typography variant="h6" gutterBottom sx={{ color: "#1565C0", fontSize: "2rem", textAlign: "justify" }}>
      Description
    </Typography>
    <Typography variant="body1">{contest.description}</Typography>

   
  </CardContent>
</Card>
 {/* Leaderboard Button */}
    <Box sx={{ display: "flex", justifyContent: "right", mt: 2 }}>
      <Button
        variant="contained"
        sx={{
          px: 4, py: 1.5, borderRadius: 1, fontSize: "1.1rem" , backgroundColor:"#8d256f"
        }}
        onClick={() => navigate(`/contest/${id}/leaderboard`)} // Redirect to leaderboard page
      >
        Leaderboard
      </Button>
    </Box>

      {/* Problem Set Table */}
      <Card>
        <CardContent>
          <Typography variant="h4" component="h2" gutterBottom>
            Problem Set
          </Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Problem</TableCell>
                  <TableCell>Title</TableCell>
                  <TableCell>Topics</TableCell>
                  <TableCell align="right">Points</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {contestProblems.length > 0 ? (
                  contestProblems.map((problemData, index) => (
                    <TableRow key={problemData.id}>
                      <TableCell>{`Problem ${index + 1}`}</TableCell>

                      <TableCell>
                        {/* Only allow redirection for active contests */}
                        {contestStatus === "active" ? (
                          <a
                            href={`/contest/${id}/problem/${problemData.problem_id}`}
                            style={{ textDecoration: "none", color: "#1976D2", fontWeight: "bold" }}
                          >
                            <ErrorBoundary>
                              <ReactMarkdown remarkPlugins={[remarkMath]} rehypePlugins={[rehypeKatex]}>
                                {typeof problemData.problem?.title === "string" ? problemData.problem?.title : "N/A"}
                              </ReactMarkdown>
                            </ErrorBoundary>
                          </a>
                        ) : (
                          <ErrorBoundary>
                            <ReactMarkdown remarkPlugins={[remarkMath]} rehypePlugins={[rehypeKatex]}>
                              {typeof problemData.problem?.title === "string" ? problemData.problem?.title : "N/A"}
                            </ReactMarkdown>
                          </ErrorBoundary>
                          
                        )}
                      </TableCell>

                      <TableCell>{problemData.problem?.tags?.topics?.join(", ") || "N/A"}</TableCell>
                      <TableCell align="right">{problemData.points}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={4} align="center">
                      {loadingParticipant
                        ? "Checking participation..."
                        : contestStatus === "upcoming"
                          ? isParticipant
                            ? "Problems will be shown after the contest starts"
                            : "Register to view problems"
                          : isParticipant
                            ? "No problems available"
                            : "Register to view problems"}
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>

      {/* Register Button */}
      <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 4 }}>
        {contestStatus === "upcoming" ? (
          isParticipant ? (
            <Button
              variant="contained"
              size="large"
              disabled
              sx={{ px: 4, py: 1.5, borderRadius: 1, fontSize: "1.1rem" }}
            >
              Registered
            </Button>
          ) : (
            <Button
              variant="contained"
              size="large"
              onClick={() => navigate(`/contest/registration/${id}`)}
              sx={{ px: 4, py: 1.5, borderRadius: 1, fontSize: "1.1rem" }}
            >
              Register
            </Button>
          )
        ) : (
          <Button
            variant="contained"
            size="large"
            disabled
            sx={{ px: 4, py: 1.5, borderRadius: 1, fontSize: "1.1rem" }}
          >
            {contestStatus === "previous" ? "Contest Ended" : "Contest Started"}
          </Button>
        )}
      </Box>
    </Box>
  )
}

export default ContestPage;


