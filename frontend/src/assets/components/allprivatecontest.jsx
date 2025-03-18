import { useState, useEffect } from "react";
import {
  Box,
  Grid,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Button,
  Tabs,
  Tab,
  TablePagination,
} from "@mui/material";
import axios from '../../api';
import { Link, useNavigate } from "react-router-dom";

// Function to get user's local timezone
const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

const formatLocalTime = (utcTime) => {
  if (!utcTime) return "Invalid Date";  // Validate that utcTime is provided
  try {
    // Ensure the time is treated as UTC by appending " UTC"
    const utcDate = new Date(utcTime + " UTC");
    return new Intl.DateTimeFormat(undefined, {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
      timeZone: userTimezone,
    }).format(utcDate);
  } catch (error) {
    console.error("Error formatting date:", error);
    return "Invalid Date";  // Return default error message
  }
};

export default function AllContests() {
  const [upcomingContests, setUpcomingContests] = useState([]);
  const [previousContests, setPreviousContests] = useState([]);
  const [myContests, setMyContests] = useState([]);
  const [isLoadingUpcoming, setIsLoadingUpcoming] = useState(false);
  const [isLoadingPrevious, setIsLoadingPrevious] = useState(false);
  const [isLoadingMy, setIsLoadingMy] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const navigate = useNavigate(); // Initialize useNavigate

  const fetchUpcomingContests = async () => {
    setIsLoadingUpcoming(true);
    try {
      const response = await axios.get(`/contest/upcoming/private/my`);
      const contests = response.data.contests;

      // Log the contests to inspect their time format
      console.log(contests);

      setUpcomingContests(contests);
    } catch (error) {
      console.error("Error fetching upcoming contests:", error);
    }
    setIsLoadingUpcoming(false);
  };

  const fetchPreviousContests = async () => {
    setIsLoadingPrevious(true);
    try {
      const response = await axios.get("/contest/past/private/my");
      const contests = response.data.contests;

      // Log the contests to inspect their time format
      console.log(contests);

      setPreviousContests(contests);
    } catch (error) {
      console.error("Error fetching previous contests:", error);
    }
    setIsLoadingPrevious(false);
  };

  const fetchMyContests = async () => {
    setIsLoadingMy(true);
    try {
      const response = await axios.post("/contest/all/my");
      const contests = response.data.contests;

      // Log the contests to inspect their time format
      console.log(contests);

      setMyContests(contests);
    } catch (error) {
      console.error("Error fetching my contests:", error);
    }
    setIsLoadingMy(false);
  };

  useEffect(() => {
    fetchUpcomingContests();
    fetchPreviousContests();
    fetchMyContests();
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const ContestTable = ({ contests, type, isLoading }) => {
    if (isLoading) {
      return (
        <Box sx={{ display: "flex", justifyContent: "center", p: 4 }}>
          <CircularProgress />
        </Box>
      );
    }
  
    // Log the contests array to inspect data structure
    console.log("Contest Data:", contests);
  
    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
    };
  
    // Helper function to extract contest data based on structure
    const getContestData = (contest) => {
      // Check if the contest is from 'past' or 'upcoming' contests, which have a nested 'contest' field
      if (contest.contest) {
        return contest.contest; // Return the nested contest object
      }
      // If not nested, return the contest directly (e.g., from 'my created contests')
      return contest;
    };
  
    return (
      <Paper sx={{ width: "100%", mt: 2, mb: 4 }}>
        <TableContainer component={Paper} sx={{ mt: 2 }}>
          <Typography variant="h6" sx={{ p: 2, color: "#1565C0", fontWeight: "bold", textAlign: "center" }}>
            {type} Contest Table
            <Typography variant="body2" sx={{ color: "gray", textAlign: "center" }}>
              Your Timezone: {userTimezone}
            </Typography>
          </Typography>
          <Table>
            <TableHead>
              <TableRow sx={{ color: "white" }}>
                <TableCell sx={{ color: "#1565C0", fontWeight: "bold", textAlign: "center" }}>ID</TableCell>
                <TableCell sx={{ color: "#1565C0", fontWeight: "bold", textAlign: "center" }}>Contest Name</TableCell>
                <TableCell sx={{ color: "#1565C0", fontWeight: "bold", textAlign: "center" }}>Start Time</TableCell>
                <TableCell sx={{ color: "#1565C0", fontWeight: "bold", textAlign: "center" }}>Duration</TableCell>
                <TableCell sx={{ color: "#1565C0", fontWeight: "bold", textAlign: "center" }}>Organizer</TableCell>
                <TableCell sx={{ color: "#1565C0", fontWeight: "bold", textAlign: "center" }}>Participated</TableCell>
                <TableCell sx={{ color: "#1565C0", fontWeight: "bold", textAlign: "center" }}>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {contests.length > 0 ? (
                contests
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((contestData, index) => {
                    // Get the contest data from the appropriate structure
                    const contest = getContestData(contestData);
  
                    // Check if contest and necessary fields exist
                    if (!contest || !contest.id || !contest.title || !contest.user) {
                      console.log("Invalid Contest Data:", contest); // Log invalid contests
                      return (
                        <TableRow
                          key={index}
                          sx={{
                            cursor: "not-allowed",
                            backgroundColor: "#f9f9f9",
                          }}
                        >
                          <TableCell colSpan={7} sx={{ textAlign: "center" }}>
                            Invalid Contest Data
                          </TableCell>
                        </TableRow>
                      );
                    }
  
                    return (
                      <TableRow
                        hover
                        key={contest.id}  // Use contest.id directly
                        onClick={() => {
                          if (type === "My") {
                            navigate(`/contests/private/${contest.id}`);
                          } else {
                            navigate(`/contest/single/${contest.id}`);
                          }
                        }}
                        sx={{
                          cursor: "pointer",
                          backgroundColor: index % 2 === 0 ? "#f4f4f4" : "#ffffff",
                          "&:hover": {
                            backgroundColor: "#f1f1f1",
                          },
                        }}
                      >
                        <TableCell sx={{ textAlign: "center" }}>{contest.id}</TableCell>
                        <TableCell sx={{ textAlign: "center" }}>{contest.title}</TableCell>
                        <TableCell sx={{ textAlign: "center" }}>
                          {formatLocalTime(contest.start_time)}
                        </TableCell>
                        <TableCell sx={{ textAlign: "center" }}>
                          {Math.round((new Date(contest.end_time) - new Date(contest.start_time)) / 60000)}{" "}
                          minutes
                        </TableCell>
                        <TableCell sx={{ textAlign: "center" }}>
                          {contest.user ? contest.user.username : "Unknown"}
                        </TableCell>
                        <TableCell sx={{ textAlign: "center" }}>{contest.participants_count}</TableCell>
                        <TableCell sx={{ textAlign: "center" }}>
                          <Button variant="contained" size="small" color="primary">
                            View
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })
              ) : (
                <TableRow>
                  <TableCell colSpan={12} align="center">
                    No contest available now
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
  
        <TablePagination
          rowsPerPageOptions={[5, 25, 50, 100]}
          component="div"
          count={contests.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    );
  };
  

  return (
    <Box sx={{ width: "96%", p: 3 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={12}>
          <Box sx={{ width: "97%", p: 3 }}>
            {/* Create Contest Button */}
                  <Box sx={{ mb: 2, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2, textAlign: "center" }}>
                      All Private Contests
                    </Typography>
                    <Button variant="contained" color="primary" onClick={() => navigate("/contest/create")}>
                      Create Contest
                    </Button>
                  </Box>

                  <Tabs value={activeTab} onChange={(e, newValue) => setActiveTab(newValue)}>
                    <Tab label="Upcoming" />
                    <Tab label="Previous" />
                    <Tab label="My Contests" />
                  </Tabs>

                  {activeTab === 0 && (
                    <ContestTable contests={upcomingContests} type="Upcoming" isLoading={isLoadingUpcoming} />
                  )}
                  {activeTab === 1 && (
                    <ContestTable contests={previousContests} type="Previous" isLoading={isLoadingPrevious} />
                  )}
                  {activeTab === 2 && (
                    <ContestTable contests={myContests} type="My" isLoading={isLoadingMy} />
                  )}
                  </Box>
                </Grid>

                <Grid item xs={12} md={4} sx={{ mt: 11 }}>
                  {/* Active Contest Section (Keep as is, or adjust as needed) */}
        </Grid>
      </Grid>
    </Box>
  );
}
