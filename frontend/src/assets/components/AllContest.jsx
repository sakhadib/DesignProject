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
  useMediaQuery,
  useTheme,
} from "@mui/material"
import axios from "axios"
import { format } from "date-fns"
import {Link} from "react-router-dom"

function ContestTable({ contests, type, isLoading }) {
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
            <TableCell> Action </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {contests && contests.length > 0 ? (
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
                      <Button variant="contained" size="small" color="primary">
                        <Link to={`/contest/single/${contest.id}`} style={{ textDecoration: 'none', color: 'white' }}>
                          Register
                        </Link>
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
function HeadsUp({ activeContest, upcomingContest }) {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"))

  const buttonStyle = {
    backgroundColor: "#8d256f",
    "&:hover": {
      backgroundColor: "#6d1d55",
    },
    fontSize: "0.8rem",
    padding: "6px 12px",
  }

  const contest = activeContest || upcomingContest

  return (
    <Box
      sx={{
        p: 2,
        bgcolor: "grey.100",
        borderRadius: 2,
        mb: 3,
        mt: { xs: 3, md: 8 },
        boxShadow: 3,
        transition: "all 0.3s ease-in-out",
        "&:hover": {
          boxShadow: 6,
          transform: "translateY(-5px)",
        },
        height: "auto",
        maxHeight: { xs: "none", md: "500px" },
        overflowY: "auto",
      }}
    >
      <Typography
        variant="h5"
        gutterBottom
        sx={{ color: "#8d256f", fontWeight: "bold", textAlign: "center", fontSize: "1.2rem", mb: 1 }}
      >
        Heads Up
      </Typography>
      {contest ? (
        <Box>
          <Typography variant="subtitle1" sx={{ fontWeight: "bold", mb: 0.5, textAlign: "center", fontSize: "1rem" }}>
            {contest.title}
          </Typography>
          <Typography variant="body2" sx={{ mb: 1, color: "text.secondary", textAlign: "center", fontSize: "0.9rem" }}>
            {contest.description.substring(0, 80)}...
          </Typography>
          <Box sx={{ textAlign: "center", mb: 1 }}>
            <Typography variant="caption" display="block" sx={{ color: "text.secondary", fontSize: "0.8rem" }}>
              Starts: {format(new Date(contest.start_time), "MMM dd, yyyy HH:mm")}
            </Typography>
            <Typography variant="caption" display="block" sx={{ color: "text.secondary", fontSize: "0.8rem" }}>
              Ends: {format(new Date(contest.end_time), "MMM dd, yyyy HH:mm")}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
          <Button variant="contained" sx={buttonStyle}>
            <Link to={`/contest/single/${contest.id}`} style={{ textDecoration: 'none', color: 'white' }}>
              {activeContest ? "Participate" : "Register"}
            </Link>
          </Button>

          </Box>
        </Box>
      ) : (
        <Typography variant="body2" sx={{ mt: 2, color: "text.secondary", textAlign: "center" }}>
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

  const theme = useTheme()
  //const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const fetchUpcomingContests = async () => {
    setIsLoadingUpcoming(true)
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/contest/all/upcoming")
      setUpcomingContests(response.data.contests)
      setActiveContest(response.data.contests.find((contest) => contest.status === "active") || null)
    } catch (error) {
      console.error("Error fetching upcoming contests:", error)
    }
    setIsLoadingUpcoming(false)
  }

  const fetchPreviousContests = async () => {
    setIsLoadingPrevious(true)
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/contest/all/ended")
      setPreviousContests(response.data.contests)
    } catch (error) {
      console.error("Error fetching previous contests:", error)
    }
    setIsLoadingPrevious(false)
  }

  useEffect(() => {
    fetchUpcomingContests()
    fetchPreviousContests()
  }, []) // Added dependency array

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue)
  }

  return (
    <Box sx={{ width: "95%", p: 3 }}>
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
              <ContestTable contests={upcomingContests} type="Upcoming" isLoading={isLoadingUpcoming} />
              <ContestTable contests={previousContests} type="Previous" isLoading={isLoadingPrevious} />
            </>
          )}
          {tabValue === 1 && <ContestTable contests={upcomingContests} type="Upcoming" isLoading={isLoadingUpcoming} />}
          {tabValue === 2 && <ContestTable contests={previousContests} type="Previous" isLoading={isLoadingPrevious} />}
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
          />
        </Box>
      </Box>
    </Box>
  )
}

