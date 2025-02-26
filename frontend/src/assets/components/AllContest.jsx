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
  Chip,
  CircularProgress,
  Button,
  Tabs,
  Tab,
  TablePagination,
} from "@mui/material";
import axios from '../../api';
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom"; // Import for navigation

// Function to get user's local timezone
const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

const formatLocalTime = (utcTime) => {
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
};

// =======================|| ALL CONTESTS COMPONENT ||======================= //

export default function AllContests() {
  const [upcomingContests, setUpcomingContests] = useState([]);
  const [previousContests, setPreviousContests] = useState([]);
  const [activeContests, setActiveContests] = useState([]);
  const [isLoadingUpcoming, setIsLoadingUpcoming] = useState(false);
  const [isLoadingPrevious, setIsLoadingPrevious] = useState(false);
  const [isLoadingActive, setIsLoadingActive] = useState(false);
  const [activeContest, setActiveContest] = useState(null);
  const [activeTab, setActiveTab] = useState(0);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const navigate = useNavigate(); // Initialize useNavigate

  // Fetching upcoming contests
  const fetchUpcomingContests = async () => {
    setIsLoadingUpcoming(true);
    try {
      const response = await axios.get("/contest/all/upcoming");
      setUpcomingContests(response.data.contests);
      setActiveContest(response.data.contests.find((contest) => contest.status === "active") || null);
    } catch (error) {
      console.error("Error fetching upcoming contests:", error);
    }
    setIsLoadingUpcoming(false);
  };

  // Fetching previous contests
  const fetchPreviousContests = async () => {
    setIsLoadingPrevious(true);
    try {
      const response = await axios.get("/contest/all/ended");
      setPreviousContests(response.data.contests);
    } catch (error) {
      console.error("Error fetching previous contests:", error);
    }
    setIsLoadingPrevious(false);
  };

  // Fetching active contests
  const fetchActiveContests = async () => {
    setIsLoadingActive(true);
    try {
      const response = await axios.get("/contest/all/active");
      setActiveContests(response.data.contests);
    } catch (error) {
      console.error("Error fetching active contests:", error);
    }
    setIsLoadingActive(false);
  };

  useEffect(() => {
    
    fetchUpcomingContests();
    fetchPreviousContests(); 
    fetchActiveContests();   
  }, []);

  






  // =======================|| HEADS UP SECTION ||======================= //

  const HeadsUp = () => {
    const buttonStyle = {
      backgroundColor: "#8d256f",
      "&:hover": {
        backgroundColor: "#6d1d55",
      },
      fontSize: "0.8rem",
      padding: "6px 12px",
    };

    const contest = activeContest || upcomingContests[0];

    return (
      <Box
        sx={{
          p: 2,
          bgcolor: "white",
          border: 3,
          borderColor: "#1E2761",
          borderRadius: 2,
          // boxShadow: 3,
          transition: "all 0.3s ease-in-out",
          "&:hover": {
            boxShadow: 6,
            transform: "translateY(-5px)",
          },
          maxHeight: "600px",
          overflowY: "auto",
        }}
      >
        <Typography
          variant="h5"
          gutterBottom
          sx={{ color: "#8d256f", fontWeight: "bold", textAlign: "center", fontSize: "28px", mb: 1, textShadow: "1px 1px 1px #ababab" }}
        >
          Heads Up
        </Typography>
        {contest ? (
          <Box>
            <Typography variant="subtitle1" sx={{ fontWeight: "bold", mb: 0.5, textAlign: "center", fontSize: "24px", color: "#1E2761" }}>
              {contest.title}
            </Typography>
            <Typography variant="body2" sx={{ mb: 1, color: "text.secondary", textAlign: "center", fontSize: "0.9rem" }}>
              {contest.description.substring(0, 80)}...
            </Typography>
            <Box sx={{ textAlign: "center", mb: 1 }}>
              <Typography variant="caption" display="block" sx={{ color: "text.secondary", fontSize: "0.8rem" }}>
                Starts: {formatLocalTime(contest.start_time)}
              </Typography>
              <Typography variant="caption" display="block" sx={{ color: "text.secondary", fontSize: "0.8rem" }}>
                Ends: {formatLocalTime(contest.end_time)}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
              <Button variant="contained" sx={buttonStyle}>
                <Link to={`/contest/single/${contest.id}`} style={{ textDecoration: "none", color: "white" }}>
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
    );
  };



  // =======================|| Active Contest SECTION ||======================= //

  const ActiveContest = () => {
    const buttonStyle = {
      backgroundColor: "#8d256f",
      "&:hover": {
        backgroundColor: "#6d1d55",
      },
      fontSize: "0.8rem",
      padding: "6px 12px",
    };

    const contest = activeContests[0];

    return (
      <Box
        sx={{
          p: 2,
          bgcolor: "white",
          border: 3,
          borderColor: "#1E2761",
          borderRadius: 2,
          mb: 3,
          // boxShadow: 3,
          transition: "all 0.3s ease-in-out",
          "&:hover": {
            boxShadow: 6,
            transform: "translateY(-5px)",
          },
          maxHeight: "600px",
          overflowY: "auto",
        }}
      >
        <Typography
          variant="h5"
          gutterBottom
          sx={{ color: "#8d256f", fontWeight: "bold", textAlign: "center", fontSize: "28px", mb: 1, textShadow: "1px 1px 1px #ababab" }}
        >
          Active Contest
        </Typography>
        {contest ? (
          <Box>
            <Typography variant="subtitle1" sx={{ fontWeight: "bold", mb: 0.5, textAlign: "center", fontSize: "24px", color: "#1E2761" }}>
              {contest.title}
            </Typography>
            <Typography variant="body2" sx={{ mb: 1, color: "text.secondary", textAlign: "center", fontSize: "0.9rem" }}>
              {contest.description.substring(0, 80)}...
            </Typography>
            <Box sx={{ textAlign: "center", mb: 1 }}>
              <Typography variant="caption" display="block" sx={{ color: "text.secondary", fontSize: "0.8rem" }}>
                Starts: {formatLocalTime(contest.start_time)}
              </Typography>
              <Typography variant="caption" display="block" sx={{ color: "text.secondary", fontSize: "0.8rem" }}>
                Ends: {formatLocalTime(contest.end_time)}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
              <Button variant="contained" sx={buttonStyle}>
                <Link to={`/contest/single/${contest.id}`} style={{ textDecoration: "none", color: "white" }}>
                  Participate
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
    );
  };

  // =======================|| CONTEST TABLE SECTION ||======================= //

  const ContestTable = ({ contests, type, isLoading }) => {
    if (isLoading) {
      return (
        <Box sx={{ display: "flex", justifyContent: "center", p: 4 }}>
          <CircularProgress />
        </Box>
      );
    }

    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
    
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
    };


    return (
      <Paper sx={{ width: "100%", mt: 2, mb: 4 }}>
        <TableContainer component={Paper} sx={{ mt: 2}}>
          <Typography variant="h6" sx={{ p: 2, color: "#1565C0", fontWeight: "bold", textAlign: "center" }}>
            {type} Contest Table
            <Typography variant="body2" sx={{ color: "gray", textAlign: "center" }}>
            Your Timezone: {userTimezone}
            </Typography>
          </Typography>        
          <Table>
            <TableHead>
              <TableRow sx={{ color: "white" }}>
                <TableCell sx={{ color: "#1565C0", fontWeight: "bold" , textAlign: "center" }}>Contest Name</TableCell>
                <TableCell sx={{ color: "#1565C0", fontWeight: "bold" , textAlign: "center" }}>Start Time</TableCell>            
                <TableCell sx={{ color: "#1565C0", fontWeight: "bold" , textAlign: "center" }}>Duration</TableCell>
                <TableCell sx={{ color: "#1565C0", fontWeight: "bold" , textAlign: "center" }}>Organizer</TableCell>
                <TableCell sx={{ color: "#1565C0", fontWeight: "bold" , textAlign: "center" }}>Participated</TableCell>
                <TableCell sx={{ color: "#1565C0", fontWeight: "bold" , textAlign: "center" }}>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {contests.length > 0 ? (
                contests.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((contest, index) => (
                <TableRow 
                hover
                key={contest.id}
                onClick={() => navigate(`/contest/single/${contest.id}`)} // Navigate on row click
                sx={{
                    cursor: "pointer",
                    backgroundColor: index % 2 === 0 ? "#f4f4f4" : "#ffffff", // Alternate row colors
                    "&:hover": {
                    backgroundColor: "#f1f1f1",
                    },
                }}>
                  <TableCell sx={{textAlign: "center"}}>{contest.title}</TableCell>
                  <TableCell sx={{textAlign: "center"}}>{formatLocalTime(contest.start_time)}</TableCell>
                  <TableCell sx={{textAlign: "center"}}>
                  {Math.round((new Date(contest.end_time) - new Date(contest.start_time)) / 60000)} minutes
                  </TableCell>
                  <TableCell sx={{textAlign: "center"}}>{contest.user.username}</TableCell>
                  <TableCell sx={{textAlign: "center"}}>{contest.participants_count}</TableCell>
                  <TableCell sx={{textAlign: "center"}}><Button variant="contained" size="small" color="primary">View</Button></TableCell>
                </TableRow>
                ))
              ) : (
                <TableRow>
                <TableCell colSpan={6} align="center">
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
            sx={{
            backgroundColor: "#ffffff",
            color: "#1565C0",
            "& .MuiTablePagination-actions": {
                color: "#1565C0",
            },
            "& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows": {
                color: "#1565C0",
            },
            "& .MuiTablePagination-select": {
                color: "#1565C0",
            },
            "& .MuiTablePagination-selectIcon": {
                color: "#1565C0",
            },
            }}
          />
      </Paper>
    );
  };

  return (
    <Box sx={{ width: "95%", p: 3 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={8}>
          <Box sx={{ width: "95%", p: 3 }}>
            <Tabs value={activeTab} onChange={(e, newValue) => setActiveTab(newValue)}>
              <Tab label="Upcoming" />
              <Tab label="Previous" />
            </Tabs>

            {activeTab === 0 && (
              <>
                <ContestTable contests={upcomingContests} type="Upcoming" isLoading={isLoadingUpcoming} />
              </>
            )}
            {activeTab === 1 && (
              <ContestTable contests={previousContests} type="Previous" isLoading={isLoadingPrevious} />
            )}
          </Box>
        </Grid>
        
        <Grid item xs={12} md={4} sx={{ mt: 11 }}>
          {!activeContests ? <HeadsUp />: <ActiveContest />}
        </Grid>
      </Grid>
    </Box>
  );
}

