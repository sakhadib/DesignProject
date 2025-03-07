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
  TextField,
  Container,
  Button, // Import Button
} from "@mui/material";
import axios from "../../api";

export default function ContestDetails() {
  const { id } = useParams();
  const navigate = useNavigate(); // Initialize useNavigate
  const [contest, setContest] = useState(null);
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [canEdit, setCanEdit] = useState(true); // State to track if Edit button should be visible


useEffect(() => {
  const fetchContestDetails = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Authorization token missing.");
        setLoading(false);
        return;
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

        // Fetch contest problems
        const problemsResponse = await axios.get(`/contest/problems/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (problemsResponse.data.problems) {
          setProblems(problemsResponse.data.problems);
        }

        // Current time and comparison
        const currentTime = new Date();
        console.log("Current Time:", currentTime);

        console.log("Start Time : ", contestStartTime);
        const diff = currentTime - contestStartTime;
        console.log("Difference: ", diff);

        if (contestStartTime < currentTime) {
          setCanEdit(false); // Disable edit if the contest start time is in the past
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
      console.error("Error formatting date:", e);
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
      <Typography align="center" sx={{ fontSize: "2rem", fontWeight: 600, mb: 3 }}>
        Contest Details
      </Typography>

      <Paper sx={{ padding: 3, mb: 3 }}>
        <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
          Contest Information
        </Typography>

        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <TextField label="Title" value={contest?.title || ""} fullWidth variant="outlined" InputProps={{ readOnly: true }} />
          <TextField 
            label="Start Time" 
            value={contest ? formatLocalTime12H(contest.start_time) : "Loading..."} 
            fullWidth 
            variant="outlined" 
            InputProps={{ readOnly: true }} 
          />
          <TextField 
            label="End Time" 
            value={contest ? formatLocalTime12H(contest.end_time) : "Loading..."} 
            fullWidth 
            variant="outlined" 
            InputProps={{ readOnly: true }} 
          />

          <TextField
            label="Description"
            value={contest?.description || "No description available."}
            fullWidth
            variant="outlined"
            multiline
            rows={4}
            InputProps={{ readOnly: true }}
          />
        </Box>
      </Paper>

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
                  <TableCell>{problem.single_problem.id}</TableCell>
                  <TableCell>{problem.single_problem.title}</TableCell>
                  <TableCell>{problem.single_problem.xp}</TableCell>
                  <TableCell>{problem.points}</TableCell>
                  <TableCell>
                    {problem.single_problem.tags?.topics?.map((tag, idx) => (
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
          onClick={() => navigate(`/contests/`)}  // Navigate back to contests list
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

