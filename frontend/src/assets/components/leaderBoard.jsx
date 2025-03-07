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
} from "@mui/material"

const LeaderboardPage = () => {
  const { id } = useParams()
  const [participants, setParticipants] = useState([])
  const [problems, setProblems] = useState([])
  const [loading, setLoading] = useState(true)
  const [contestTitle, setContestTitle] = useState("")

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await axios.get(`/rating/contest/${id}`)

        // Extract unique problem IDs and sort them
        const uniqueProblems = [
          ...new Set(response.data.participants.flatMap((p) => p.submissions.map((s) => s.problem_id))),
        ].sort((a, b) => a - b)
        setProblems(uniqueProblems)

        // Process and sort participants
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

        const sortedParticipants = processedParticipants.sort((a, b) => {
          if (b.totalXP !== a.totalXP) return b.totalXP - a.totalXP
          return a.totalPenalty - b.totalPenalty
        })

        setParticipants(sortedParticipants)
        setContestTitle(response.data.contestTitle || `Contest ${id} Leaderboard`)
      } catch (error) {
        console.error("Error fetching leaderboard:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchLeaderboard()
  }, [id])

  const getSubmissionColor = (xp) => {
    if (xp > 80) return "#4caf50" // Green for high scores
    if (xp > 40) return "#ff9800" // Orange for medium scores
    if (xp > 0) return "#f44336" // Red for low scores
    return "#ffffff" // White for no submission
  }

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress />
      </Box>
    )
  }

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
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>Participant</TableCell>
                <TableCell align="center" sx={{ color: "white", fontWeight: "bold" }}>Total XP</TableCell>
                <TableCell align="center" sx={{ color: "white", fontWeight: "bold" }}>Penalty</TableCell>
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
                  <TableCell>{participant.username}</TableCell>
                  <TableCell align="center">{participant.totalXP}</TableCell>
                  <TableCell align="center">{participant.totalPenalty}</TableCell>
                  {problems.map((problemId) => {
                    const submission = participant.submissionMap.get(problemId)
                    return (
                      <TableCell
                        key={problemId}
                        align="center"
                        sx={{
                          backgroundColor: getSubmissionColor(submission?.xp || 0),
                          color: submission?.xp > 0 ? "#ffffff" : "#000000",
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
