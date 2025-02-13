import { useState, useEffect } from "react"
import {
  Box,
  Tabs,
  Tab,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  CircularProgress,
  Button,
  useTheme,
} from "@mui/material"
import axios from "axios"
import { format } from "date-fns"
import { useNavigate } from "react-router-dom"

function ContestTable({ contests, type, isLoading, handleRegister }) {
  if (isLoading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", p: 4 }}>
        <CircularProgress />
      </Box>
    )
  }

  return (
    <TableContainer component={Paper} sx={{ mt: 2, mb: 4 }}>
      <Typography variant="h6" sx={{ p: 2, bgcolor: "grey.100" }}>
        {type} Contest Table
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Contest Name</TableCell>
            <TableCell>Start Time</TableCell>
            <TableCell>Duration</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Created By</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {contests.length > 0 ? (
            contests.map((contest) => {
              const startTime = new Date(contest.start_time)
              const endTime = new Date(contest.end_time)
              const duration = (endTime - startTime) / (1000 * 60 * 60) // Duration in hours

              return (
                <TableRow key={contest.id}>
                  <TableCell>
                    <Typography variant="subtitle2">{contest.title}</Typography>
                    <Typography variant="body2" color="textSecondary" sx={{ mt: 0.5 }}>
                      {contest.description.substring(0, 100)}...
                    </Typography>
                  </TableCell>
                  <TableCell>{format(startTime, "MMM dd, yyyy HH:mm")}</TableCell>
                  <TableCell>{`${duration} hours`}</TableCell>
                  <TableCell>
                    <Chip
                      label={contest.status}
                      size="small"
                      color={contest.status === "pending" ? "warning" : "success"}
                    />
                  </TableCell>
                  <TableCell>{contest.user.username}</TableCell>
                  <TableCell>
                    {type === "Previous" ? (
                      <Typography variant="body2" color="textSecondary">
                        Not Available
                      </Typography>
                    ) : (
                      <Button
                        variant="contained"
                        size="small"
                        color="primary"
                        onClick={() => handleRegister(contest.id)}
                      >
                        Register
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              )
            })
          ) : (
            <TableRow>
              <TableCell colSpan={7} align="center">
                No contest available now
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

function HeadsUp({ activeContest, upcomingContest, handleRegister }) {
  const [errorMessage, setErrorMessage] = useState("")
  const contest = activeContest || upcomingContest

  const handleParticipation = () => {
    if (!contest) return
    handleRegister(contest.id)
  }

  return (
    <Box sx={{ p: 2, bgcolor: "grey.100", borderRadius: 2, mb: 3, boxShadow: 3 }}>
      <Typography variant="h5" sx={{ color: "#8d256f", fontWeight: "bold", textAlign: "center", mb: 1 }}>
        Heads Up
      </Typography>
      {contest ? (
        <>
          <Typography variant="subtitle1" sx={{ fontWeight: "bold", textAlign: "center" }}>
            {contest.title}
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary", textAlign: "center", mb: 1 }}>
            {contest.description.substring(0, 80)}...
          </Typography>
          <Typography variant="caption" sx={{ display: "block", textAlign: "center" }}>
            Starts: {format(new Date(contest.start_time), "MMM dd, yyyy HH:mm")}
          </Typography>
          <Typography variant="caption" sx={{ display: "block", textAlign: "center" }}>
            Ends: {format(new Date(contest.end_time), "MMM dd, yyyy HH:mm")}
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
            <Button variant="contained" onClick={handleParticipation}>
              {activeContest ? "Participate" : "Register"}
            </Button>
          </Box>
          {errorMessage && (
            <Typography variant="body2" color="error" sx={{ textAlign: "center", mt: 1 }}>
              {errorMessage}
            </Typography>
          )}
        </>
      ) : (
        <Typography variant="body2" sx={{ textAlign: "center" }}>
          No contest available at the moment.
        </Typography>
      )}
    </Box>
  )
}

export default function AllContests() {
  const [tabValue, setTabValue] = useState(0)
  const [upcomingContests, setUpcomingContests] = useState([])
  const [previousContests, setPreviousContests] = useState([])
  const [isLoadingUpcoming, setIsLoadingUpcoming] = useState(false)
  const [isLoadingPrevious, setIsLoadingPrevious] = useState(false)
  const [activeContest, setActiveContest] = useState(null)
  const [errorMessage, setErrorMessage] = useState("")

  const navigate = useNavigate()
  const theme = useTheme()

  const fetchUpcomingContests = async () => {
    setIsLoadingUpcoming(true)
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/contest/all/upcoming")
      setUpcomingContests(response.data.contests)
      setActiveContest(response.data.contests.find((contest) => contest.status === "active") || null)
    } catch (error) {
      console.error("Error fetching upcoming contests:", error)
      setErrorMessage("Failed to fetch upcoming contests. Please try again later.")
    } finally {
      setIsLoadingUpcoming(false)
    }
  }

  const fetchPreviousContests = async () => {
    setIsLoadingPrevious(true)
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/contest/all/ended")
      setPreviousContests(response.data.contests)
    } catch (error) {
      console.error("Error fetching previous contests:", error)
      setErrorMessage("Failed to fetch previous contests. Please try again later.")
    } finally {
      setIsLoadingPrevious(false)
    }
  }

  const handleRegister = async (contestId) => {
    try {
      const response = await axios.post("http://127.0.0.1:8000/api/contest/isparticipant", { contest_id: contestId })
      if (response.data.success) {
        navigate(`/contest/registration?id=${contestId}`)
      } else {
        setErrorMessage(response.data.message || "Failed to register for the contest. Please try again.")
      }
    } catch (error) {
      console.error("Error registering for contest:", error)
      setErrorMessage("An error occurred while registering. Please try again later.")
    }
  }

  useEffect(() => {
    fetchUpcomingContests()
    fetchPreviousContests()
  }, [])

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue)
  }

  return (
    <Box sx={{ width: "100%", p: 3 }}>
      {errorMessage && (
        <Typography variant="body2" color="error" sx={{ textAlign: "center", mb: 2 }}>
          {errorMessage}
        </Typography>
      )}
      <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, gap: 2 }}>
        <Box sx={{ width: { xs: "100%", md: "70%" } }}>
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            aria-label="contest tabs"
            variant="standard"
            sx={{
              "& .MuiTabs-flexContainer": {
                flexDirection: { xs: "column", sm: "row" },
              },
            }}
          >
            <Tab label="All" />
            <Tab label="Upcoming" />
            <Tab label="Previous" />
          </Tabs>
          {tabValue === 0 && (
            <>
              <ContestTable
                contests={upcomingContests}
                type="Upcoming"
                isLoading={isLoadingUpcoming}
                handleRegister={handleRegister}
              />
              <ContestTable
                contests={previousContests}
                type="Previous"
                isLoading={isLoadingPrevious}
                handleRegister={handleRegister}
              />
            </>
          )}
          {tabValue === 1 && (
            <ContestTable
              contests={upcomingContests}
              type="Upcoming"
              isLoading={isLoadingUpcoming}
              handleRegister={handleRegister}
            />
          )}
          {tabValue === 2 && (
            <ContestTable
              contests={previousContests}
              type="Previous"
              isLoading={isLoadingPrevious}
              handleRegister={handleRegister}
            />
          )}
        </Box>
        <Box
          sx={{
            width: { xs: "100%", md: "30%" },
            display: { xs: "block", md: "block" },
          }}
        >
          <HeadsUp
            activeContest={activeContest}
            upcomingContest={upcomingContests.length > 0 ? upcomingContests[0] : null}
            handleRegister={handleRegister}
          />
        </Box>
      </Box>
    </Box>
  )
}

