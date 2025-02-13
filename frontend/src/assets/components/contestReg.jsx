"use client"

import { useState, useEffect } from "react"
import {
  Box,
  Typography,
  TextField,
  Checkbox,
  FormControlLabel,
  FormControl,
  Button,
  Container,
  Select,
  MenuItem,
  InputLabel,
  Snackbar,
  Alert,
} from "@mui/material"

const ContestRegistration = () => {
  const [acceptTerms, setAcceptTerms] = useState(false)
  const [contestType, setContestType] = useState("")
  const [contestId, setContestId] = useState("")
  const [contests, setContests] = useState({ upcoming: [], active: [], ended: [] })
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  })

  useEffect(() => {
    const fetchContests = async () => {
      try {
        const upcomingRes = await fetch("http://127.0.0.1:8000/api/contest/all/upcoming")
        const activeRes = await fetch("http://127.0.0.1:8000/api/contest/all/active")
        const endedRes = await fetch("http://127.0.0.1:8000/api/contest/all/end")
        
        const upcomingData = await upcomingRes.json()
        const activeData = await activeRes.json()
        const endedData = await endedRes.json()
        
        setContests({
          upcoming: upcomingData || [],
          active: activeData || [],
          ended: endedData || [],
        })
      } catch (error) {
        setSnackbar({
          open: true,
          message: "Failed to fetch contest data",
          severity: "error",
        })
      }
    }
    fetchContests()
  }, [])

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return
    }
    setSnackbar({ ...snackbar, open: false })
  }

  return (
    <Container maxWidth="md">
      <Typography variant="h4" component="h1" gutterBottom>
        Contest List
      </Typography>

      <Typography variant="h5" component="h2" gutterBottom>
        Upcoming Contests:
      </Typography>
      {contests.upcoming.length > 0 ? (
        contests.upcoming.map((contest, index) => (
          <Typography key={index}>{contest.name}</Typography>
        ))
      ) : (
        <Typography>No upcoming contests</Typography>
      )}

      <Typography variant="h5" component="h2" gutterBottom>
        Active Contests:
      </Typography>
      {contests.active.length > 0 ? (
        contests.active.map((contest, index) => (
          <Typography key={index}>{contest.name}</Typography>
        ))
      ) : (
        <Typography>No active contests</Typography>
      )}

      <Typography variant="h5" component="h2" gutterBottom>
        Ended Contests:
      </Typography>
      {contests.ended.length > 0 ? (
        contests.ended.map((contest, index) => (
          <Typography key={index}>{contest.name}</Typography>
        ))
      ) : (
        <Typography>No ended contests</Typography>
      )}

      <Snackbar open={snackbar.open} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: "100%" }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  )
}

export default ContestRegistration