import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom"; // Import useNavigate
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  CircularProgress,
  Chip,
  Card,
  CardContent,
  Divider,
  TextField,
  Container,
  Button, // Import Button
} from "@mui/material";
import axios from "../../api";
import FlipTimer from "./flip-timer";

export default function ContestDetails() {
  const { id } = useParams();
  const navigate = useNavigate(); // Initialize useNavigate
  const [contest, setContest] = useState(null);
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [canEdit, setCanEdit] = useState(true); // State to track if Edit button should be visible
  const [contestStatus, setContestStatus] = useState("upcoming");
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [meUser, setMeUser] = useState(null);



useEffect(() => {
  const fetchContestDetails = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Authorization token missing.");
        setLoading(false);
        return;
      }

      // Fetch user details
      const userResponse = await axios.post("/auth/me/", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (userResponse.data.id) {
        setMeUser(userResponse.data.id);
      }

      // Fetch contest details

      const contestResponse = await axios.get(`/contest/single/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (contestResponse.data.contest.length > 0) {
        const contestData = contestResponse.data.contest[0];
        setContest(contestData);

        const contestStartTime = new Date(contestData.start_time.replace(' ', 'T') + 'Z'); // Convert to ISO format
        console.log("Start Time (Formatted) : ", formatLocalTime(contestStartTime.toISOString()));

        const contestEndTime = new Date(contestData.end_time.replace(' ', 'T') + 'Z'); // Convert to ISO format
        console.log("End Time (Formatted) : ", formatLocalTime(contestEndTime.toISOString()));

        // Fetch contest problems

        let problemsResponse;

        if(userResponse.data.id && userResponse.data.id == contestData.created_by) {          
          problemsResponse = await axios.get(`/contest/my/problems/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
          });        
        }
        else {
          problemsResponse = await axios.get(`/contest/problems/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
        }
        

        if (problemsResponse.data.problems) {
          setProblems(problemsResponse.data.problems);
        }

        // Current time and comparison
        const currentTime = new Date();
        console.log("Current Time:", currentTime);

        console.log("Start Time : ", contestStartTime);
        const diff = currentTime - contestStartTime;
        console.log("Difference: ", diff);

        const timefin = contestEndTime - currentTime;

        // Calculate time remaining for the timer
        const timeRemaining = contestStartTime - currentTime;

        // Set contest status based on current time
        if (diff > 0) {
          if (timefin > 0) {
            setContestStatus("active");
            setTimeRemaining(Math.floor(timefin / 1000));
          } else {
            setContestStatus("finished");
          }
        } else {
          setContestStatus("upcoming");
          setTimeRemaining(Math.floor(timeRemaining / 1000));
        }
        
        // Check if the current user is the creator of the contest
        console.log("Contest Creator: ", contestData.created_by);
        console.log("Current User: ", userResponse.data.id);

        if (contestStartTime > currentTime) {
          if(userResponse.data.id && userResponse.data.id !== contestData.created_by) {
            setCanEdit(false); // Disable edit if the user is not the creator
          }
        }
        else {
          setCanEdit(false); // Disable edit if the contest has started
        }

        

      } else {
        setError("Contest not found.");
      }

    } catch (err) {
      setError("Failed to fetch contest details.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  fetchContestDetails();
}, [id]);


  const formatLocalTime = (utcTime) => {
    if (!utcTime) return "N/A";
    try {
      // Ensuring the time string is in a full ISO 8601 format with 'Z' to indicate UTC
      const utcDate = new Date(utcTime.replace(" ", "T") + "Z");
      if (isNaN(utcDate)) throw new Error("Invalid date"); // This will catch invalid dates
  
      const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      return new Intl.DateTimeFormat(undefined, {
        weekday: 'short', // "Fri"
        year: 'numeric', // "2025"
        month: 'short', // "Mar"
        day: 'numeric', // "07"
        hour: '2-digit', // "00"
        minute: '2-digit', // "10"
        second: '2-digit', // "05"
        hour12: false, // use 24-hour time without AM/PM
        timeZone: userTimezone
      }).format(utcDate);
    } catch (e) {
      // console.error("Error formatting date:", e);
      return "Invalid date format";
    }
  };


  const formatLocalTime12H = (utcTime) => {
    if (!utcTime) return "N/A";
    try {
      // Ensuring the time string is in a full ISO 8601 format with 'Z' to indicate UTC
      const utcDate = new Date(utcTime.replace(" ", "T") + "Z");
      if (isNaN(utcDate)) throw new Error("Invalid date"); // This will catch invalid dates
  
      const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      return new Intl.DateTimeFormat(undefined, {
        weekday: 'short', // "Fri"
        year: 'numeric', // "2025"
        month: 'short', // "Mar"
        day: 'numeric', // "07"
        hour: '2-digit', // "00"
        minute: '2-digit', // "10"
        second: '2-digit', // "05"
        hour12: true, // use 12-hour time with AM/PM
        timeZone: userTimezone
      }).format(utcDate);
    } catch (e) {
      console.error("Error formatting date:", e);
      return "Invalid date format";
    }
  };
  

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "80vh" }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ textAlign: "center", mt: 4 }}>
        <Typography variant="h5" sx={{ color: "red" }}>
          {error}
        </Typography>
      </Box>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h3" component="h1" align="center" gutterBottom>
          {contest?.title || ""}
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
            <strong>Start Time:</strong> {contest ? formatLocalTime12H(contest.start_time) : "Loading..."}
          </Typography>
    
          <Typography variant="body1">
            <strong>End Time:</strong> {contest ? formatLocalTime12H(contest.end_time) : "Loading..."}
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
        
        {/* <Typography variant="h6" gutterBottom sx={{ color: "#1565C0", fontSize: "2rem", textAlign: "justify" }}>
          Description
        </Typography> */}
        <Box sx={{ minHeight:"10vh", textAlign: "justify", mb: 2, p: 2, border: "1px solid #1565C0", borderRadius: "5px" }}>
          <Typography variant="body1">{contest?.description || "No description available."}</Typography>
        </Box>




        {canEdit && (
          <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <TextField
              fullWidth
              label="Contest URL"
              variant="outlined"
              value={`http://localhost:5173/contest/registration/${id}`}
              InputProps={{
                readOnly: true,
              }}
              
            />
            <Button
              variant="contained"
              color="secondary"
              onClick={() => navigator.clipboard.writeText(`http://localhost:5173/contest/registration/${id}`)}
              sx={{ width: "20vh", ml: 2,
                "&:hover": {
                  backgroundColor: "#8d256f",
                },
              }}
              
            >
              Copy
            </Button>
            
          </Box>
        )}

        <Divider sx={{ my: 4 }} />
      
      <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
        Problem Set
      </Typography>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#1E90FF" }}>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>ID</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>Problem Title</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>XP</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>Points</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>Tags</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {problems.length > 0 ? (
              problems.map((problem, index) => (
                <TableRow key={problem.id} sx={{ backgroundColor: index % 2 === 0 ? "#f9f9f9" : "white" }}>
                  <TableCell>{problem.problem.id}</TableCell>
                  <TableCell>{problem.problem.title}</TableCell>
                  <TableCell>{problem.problem.xp}</TableCell>
                  <TableCell>{problem.points}</TableCell>
                  <TableCell>
                    {problem.problem.tags?.topics?.map((tag, idx) => (
                      <Chip key={idx} label={tag} size="small" sx={{ mr: 0.5, mb: 0.5 }} />
                    )) || "No tags"}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  <Typography variant="h6" sx={{ color: "red", padding: "20px" }}>
                    No problems selected.
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Edit and Back Buttons */}
      <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3 }}>
        <Button
          variant="outlined"
          color="primary"
          onClick={() => navigate(`/contest/all`)}  // Navigate back to contests list
          sx={{
            fontSize: "12px",
            fontWeight: "bold",
            padding: "10px 20px",
            backgroundColor: "#FFFFFF",
            "&:hover": {
              backgroundColor: "#1565C0",
              color: "#FFFFFF",
            },
          }}
        >
          Back
        </Button>
        {canEdit && (
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate(`/contests/private/edit/${id}`)} // Navigate to the edit page
            sx={{
              fontSize: "12px",
              fontWeight: "bold",
              padding: "10px 40px",
              backgroundColor: "#1E90FF",
              "&:hover": {
                backgroundColor: "#1565C0",
              },
              marginLeft: "10px",
            }}
          >
            Edit
          </Button>
        )}
      </Box>
    </Container>
  );
}

