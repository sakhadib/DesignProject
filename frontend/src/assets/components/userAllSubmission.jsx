"use client"

import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import {
  Box,
  Typography,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  CircularProgress,
  Alert,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import { format } from "date-fns"
import axios from "../../api"

export default function SubmissionTable() {
  const { id } = useParams()
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const response = await axios.get(`/submission/user/${id}`)
        setData(response.data)
      } catch (err) {
        console.error("Error fetching submission data:", err)
        setError(err.response?.data?.message || "Failed to load submission data")
      } finally {
        setLoading(false)
      }
    }

    if (id) {
      fetchData()
    }
  }, [id])

  const formatDate = (dateString) => {
    try {
      return format(new Date(dateString), "MMM dd, yyyy HH:mm")
    } catch {
      return "Invalid Date"
    }
  }

  // Calculate XP percentage for progress indicator
  const calculateXpPercentage = (earned, total) => {
    if (!total) return 0
    const percentage = (earned / total) * 100
    return Math.min(percentage, 100) // Cap at 100%
  }

  if (loading) {
    return (
      <Container maxWidth="lg">
        <Box sx={{ my: 4, display: "flex", justifyContent: "center" }}>
          <CircularProgress />
        </Box>
      </Container>
    )
  }

  if (error) {
    return (
      <Container maxWidth="lg">
        <Box sx={{ my: 4 }}>
          <Alert severity="error">{error}</Alert>
        </Box>
      </Container>
    )
  }

  if (!data || !data.problems || data.problems.length === 0) {
    return (
      <Container maxWidth="lg">
        <Box sx={{ my: 4 }}>
          <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold", color: "#8d256f" }}>
            Submission History
          </Typography>
          <Alert severity="info">No submissions found for this user.</Alert>
        </Box>
      </Container>
    )
  }

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        
        <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold", color: "#8d256f" }}>
          Submission History for {data.user.username}
        </Typography>

        {data.problems.map((problemData) => (
          <Accordion key={problemData.problem_id} sx={{ mb: 2 }}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls={`panel-${problemData.problem_id}-content`}
              id={`panel-${problemData.problem_id}-header`}
            >
              <Box sx={{ display: "flex", alignItems: "center", width: "100%", justifyContent: "space-between" }}>
                <Typography sx={{ fontWeight: "medium", flexGrow: 1 }}>{problemData.problem.title}</Typography>
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <Chip
                    label={`${problemData.submissions.length} submission${problemData.submissions.length !== 1 ? "s" : ""}`}
                    size="small"
                    color="primary"
                    variant="outlined"
                  />
                  <Chip
                  label={`${problemData.problem.xp} XP`}
                  size="small"
                  sx={{
                    bgcolor: "#1976D2",  // Updated color
                    color: "white",
                    fontWeight: "bold",
                }}
                />

                </Box>
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              <TableContainer component={Paper} variant="outlined">
                <Table size="small">
                  <TableHead>
                    <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
                      <TableCell>Submission ID</TableCell>
                      <TableCell>Date</TableCell>
                      <TableCell>XP Earned</TableCell>
                      <TableCell>Contest</TableCell>
                      <TableCell>Performance</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {problemData.submissions.map((submission) => {
                      const xpPercentage = calculateXpPercentage(submission.xp, problemData.problem.xp)

                      return (
                        <TableRow key={submission.id} hover>
                          <TableCell>#{submission.id}</TableCell>
                          <TableCell>{formatDate(submission.created_at)}</TableCell>
                          <TableCell>
                            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                              <Typography variant="body2">
                                {submission.xp} / {problemData.problem.xp}
                              </Typography>
                            </Box>
                          </TableCell>
                          <TableCell>
                            {submission.contest_id ? (
                              <Chip
                                label={`Contest #${submission.contest_id}`}
                                size="small"
                                color="secondary"
                                variant="outlined"
                              />
                            ) : (
                              <Typography variant="body2" color="text.secondary">
                                Practice
                              </Typography>
                            )}
                          </TableCell>
                          <TableCell>
                            <Box sx={{ display: "flex", alignItems: "center", width: "100%" }}>
                              <Box
                                sx={{
                                  width: "100%",
                                  bgcolor: "#f0f0f0",
                                  borderRadius: 1,
                                  height: 8,
                                }}
                              >
                                <Box
                                  sx={{
                                    width: `${xpPercentage}%`,
                                    bgcolor:
                                      xpPercentage >= 90 ? "#4caf50" : xpPercentage >= 70 ? "#ff9800" : "#f44336",
                                    height: 8,
                                    borderRadius: 1,
                                    transition: "width 0.5s ease-in-out",
                                  }}
                                />
                              </Box>
                              <Typography variant="caption" sx={{ ml: 1, minWidth: "40px" }}>
                                {Math.round(xpPercentage)}%
                              </Typography>
                            </Box>
                          </TableCell>
                        </TableRow>
                      )
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>
    </Container>
  )
}

