"use client"

import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import axios from "../../api"
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Card,
  CardContent,
  CardHeader,
  Box,
  CircularProgress,
  TableSortLabel,
} from "@mui/material"

const LeaderboardPage = () => {
  const { id } = useParams()
  const [participants, setParticipants] = useState([])
  const [problems, setProblems] = useState([])
  const [loading, setLoading] = useState(true)
  const [contestTitle, setContestTitle] = useState("")
  const [sortConfig, setSortConfig] = useState({ key: "totalXP", direction: "desc" })

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await axios.get(`/rating/contest/${id}`)
        
        const uniqueProblems = [
          ...new Set(response.data.participants.flatMap((p) => p.submissions.map((s) => s.problem_id))),
        ].sort((a, b) => a - b)
        setProblems(uniqueProblems)
        
        const processedParticipants = response.data.participants.map((participant) => {
          const submissionMap = new Map(participant.submissions.map((s) => [s.problem_id, s]))
          const totalXP = participant.submissions.reduce((sum, sub) => sum + sub.xp, 0)
          const totalPenalty = participant.submissions.reduce((sum, sub) => sum + sub.penalty, 0)
          return {
            ...participant,
            submissionMap,
            totalXP,
            totalPenalty,
          }
        })
        
        setParticipants(processedParticipants)
        setContestTitle(response.data.contestTitle || `Contest ${id} Leaderboard`)
      } catch (error) {
        console.error("Error fetching leaderboard:", error)
      } finally {
        setLoading(false)
      }
    }
    
    fetchLeaderboard()
  }, [id])

  // Function to calculate background color for both XP and Penalty
  const getSubmissionColor = (value, maxValue, minValue) => {
    const mediumRange = (maxValue + minValue) / 2; // Calculate the midpoint (medium range)

    if (value === maxValue) return "#4caf50";  // High value (Green)
    if (value === minValue) return "#f44336";  // Low value (Red)

    if (value >= mediumRange) {
      return "#FFA500";  // Medium-high value (Yellow)
    } else {
      return "#ffeb3b";  // Medium-low value (Blue)
    }
  }

  // Sorting participants by XP or Penalty
  const sortParticipants = (key) => {
    let direction = "asc"
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc"
    }

    const sortedParticipants = [...participants].sort((a, b) => {
      if (key === "totalXP" || key === "totalPenalty") {
        return direction === "asc" ? a[key] - b[key] : b[key] - a[key]
      }
      return 0
    })

    setSortConfig({ key, direction })
    setParticipants(sortedParticipants)
  }

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress />
      </Box>
    )
  }

  const maxXP = Math.max(...participants.map(p => p.totalXP), 0)
  const minXP = Math.min(...participants.map(p => p.totalXP), 0)
  const maxPenalty = Math.max(...participants.map(p => p.totalPenalty), 0)
  const minPenalty = Math.min(...participants.map(p => p.totalPenalty), 0)

  return (
    <Card sx={{ maxWidth: "100%", margin: "auto", my: 4, overflowX: "auto" }}>
      <CardHeader
        title={contestTitle}
        subheader="Ranked by total XP earned and penalty time"
        sx={{
          "& .MuiCardHeader-title": {
            color: "#2A52BE",
            fontWeight: "bold",
            fontSize: "2.2rem",
          },
          "& .MuiCardHeader-subheader": {
            color: "#424242",
          },
        }}
      />
      <CardContent>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} size="small" aria-label="leaderboard table">
            <TableHead>
              <TableRow sx={{ backgroundColor: "#8d256f" }}>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>Rank</TableCell>
                <TableCell align="center" sx={{ color: "white", fontWeight: "bold" }}>
                  <TableSortLabel
                    active={sortConfig.key === "totalXP"}
                    direction={sortConfig.direction}
                    onClick={() => sortParticipants("totalXP")}
                  >
                    Total XP
                  </TableSortLabel>
                </TableCell>
                <TableCell align="center" sx={{ color: "white", fontWeight: "bold" }}>
                  <TableSortLabel
                    active={sortConfig.key === "totalPenalty"}
                    direction={sortConfig.direction}
                    onClick={() => sortParticipants("totalPenalty")}
                  >
                    Penalty
                  </TableSortLabel>
                </TableCell>
                {problems.map((problemId) => (
                  <TableCell key={problemId} align="center" sx={{ color: "white", fontWeight: "bold" }}>
                    Problem {problemId}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {participants.map((participant, index) => (
                <TableRow key={participant.id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                  <TableCell component="th" scope="row">
                    {index + 1}
                  </TableCell>

                  {/* Total XP Column */}
                  <TableCell
                    align="center"
                    sx={{
                      backgroundColor: getSubmissionColor(participant.totalXP, maxXP, minXP),
                      fontWeight: "bold",
                    }}
                  >
                    {participant.totalXP}
                  </TableCell>

                  {/* Total Penalty Column */}
                  <TableCell
                    align="center"
                    sx={{
                      backgroundColor: getSubmissionColor(participant.totalPenalty, maxPenalty, minPenalty),
                      fontWeight: "bold",
                    }}
                  >
                    {participant.totalPenalty}
                  </TableCell>

                  {/* Problem Columns */}
                  {problems.map((problemId) => {
                    const submission = participant.submissionMap.get(problemId)
                    return (
                      <TableCell
                        key={problemId}
                        align="center"
                        sx={{
                          backgroundColor: getSubmissionColor(submission?.xp || 0, maxXP, minXP),
                          color: "black", // Text color is always black
                          fontWeight: "bold",
                        }}
                      >
                        {submission ? submission.xp : "-"}
                      </TableCell>
                    )
                  })}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  )
}

export default LeaderboardPage
