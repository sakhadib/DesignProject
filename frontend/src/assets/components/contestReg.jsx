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
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  })

  useEffect(() => {
    // Get the contest ID from the URL
    const urlParams = new URLSearchParams(window.location.search)
    const id = urlParams.get("id")
    if (id) {
      setContestId(id)
      // You might want to fetch contest details here to determine if it's public or private
      // For now, we'll leave the type empty until the user selects it
      setContestType("")
    }
  }, [])

  const termsText = `The registration confirms that you:

* Eligibility:
    -Open to all registered MathXplorer users with accurate account details.
*Fair Play:
    -Cheating, sharing solutions, or using unauthorized aids is prohibited.
*Contest Structure:
    -Solve problems within the contest duration.
    -Follow the specified submission format; incorrect formats may be disqualified.
    -Points are based on correctness and difficulty, with ties broken by submission time.
    
*Code of Conduct:
    -Maintain respectful communication.
    -Do not share solutions or attempt to exploit the system.
    
*Disqualification:
    -Plagiarism, multiple accounts, or rule violations may lead to disqualification.
    -Appeals must be submitted within 48 hours of disqualification.
    
*Prizes and Recognition:
    -Only rule-compliant participants are eligible for prizes and leaderboard rankings.
    
*Technical Guidelines:
    -Ensure stable internet connectivity.
    -Report any technical issues promptly; contests may be paused if necessary.
    
*Final Decision:
    -Administrators' decisions are final. Rules may be updated before contests.
`

  const handleSubmit = async (event) => {
    event.preventDefault()
    setIsLoading(true)

    const payload = [
      { key: "contest_id", value: contestId },
      ...(contestType === "private" ? [{ key: "password", value: password }] : []),
    ]

    try {
      const response = await fetch("http://127.0.0.1:8000/api/contest/join/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      })

      const data = await response.json()

      if (response.ok) {
        setSnackbar({
          open: true,
          message: data.message,
          severity: "success",
        })
        // You might want to redirect the user or update the UI here
      } else {
        throw new Error(data.message || "Failed to register for contest")
      }
    } catch (error) {
      setSnackbar({
        open: true,
        message: error.message || "An unexpected error occurred",
        severity: "error",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return
    }
    setSnackbar({ ...snackbar, open: false })
  }

  return (
    <Container maxWidth="md">
      <Box component="form" onSubmit={handleSubmit} sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Registration for the contest
        </Typography>

        <Typography variant="h5" component="h2" gutterBottom>
          Contest ID: {contestId}
        </Typography>

        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" component="h3" gutterBottom>
            Terms of agreement:
          </Typography>
          <TextField
            multiline
            fullWidth
            rows={10}
            value={termsText}
            InputProps={{
              readOnly: true,
            }}
            variant="outlined"
            sx={{
              backgroundColor: "#e6f1ff",
              "& .MuiInputBase-input": {
                fontFamily: "monospace",
              },
            }}
          />
        </Box>

        <Box sx={{ mb: 3 }}>
          <FormControl required error={false}>
            <FormControlLabel
              control={<Checkbox checked={acceptTerms} onChange={(e) => setAcceptTerms(e.target.checked)} />}
              label="I accept all terms and conditions"
            />
          </FormControl>
        </Box>

        {acceptTerms && (
          <Box sx={{ mb: 3 }}>
            <FormControl fullWidth margin="normal">
              <InputLabel id="contest-type-label">Contest Type</InputLabel>
              <Select
                labelId="contest-type-label"
                id="contest-type"
                value={contestType}
                label="Contest Type"
                onChange={(e) => setContestType(e.target.value)}
                required
              >
                <MenuItem value="public">Public</MenuItem>
                <MenuItem value="private">Private</MenuItem>
              </Select>
            </FormControl>
            {contestType === "private" && (
              <TextField
                fullWidth
                margin="normal"
                id="password"
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            )}
          </Box>
        )}

        <Button
          type="submit"
          variant="contained"
          color="primary"
          size="large"
          disabled={!acceptTerms || !contestType || !contestId || (contestType === "private" && !password) || isLoading}
        >
          {isLoading ? "Registering..." : "Register"}
        </Button>
      </Box>
      <Snackbar open={snackbar.open} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: "100%" }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  )
}

export default ContestRegistration

