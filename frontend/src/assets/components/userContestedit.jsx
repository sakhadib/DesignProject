import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress,
  IconButton,
  Chip,
  Grid,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";


// Function to get user's local timezone
const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

// Convert UTC+0 to Local Time in YYYY-MM-DD HH:MM:SS format
const formatLocalTime = (utcTime) => {
  if (!utcTime) return "";
  const utcDate = new Date(utcTime + " UTC");

  // Format to YYYY-MM-DD HH:MM:SS
  return utcDate.toLocaleString("en-GB", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false, // Use 24-hour format
    timeZone: userTimezone,
  }).replace(",", "");
};

// Convert Local Time to UTC+0 Before Sending API Request in YYYY-MM-DD HH:MM:SS format
const convertLocalToUTC = (localTime) => {
  if (!localTime) return "";
  
  // Ensure localTime is parsed correctly
  const localDate = new Date(localTime);
  
  // Check if the date is valid
  if (isNaN(localDate.getTime())) {
    // console.error("Invalid Date Format:", localTime);
    return "";
  }

  return localDate.toISOString().slice(0, 19).replace("T", " ");
};



export default function EditContest() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    startTime: "",
    endTime: "",
    description: "",
    password: "",
  });

  const [problems, setProblems] = useState([]);
  const [allProblems, setAllProblems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [problemDialogOpen, setProblemDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch Contest Data
  useEffect(() => {
    const fetchContest = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;
    
        const response = await axios.get(`http://127.0.0.1:8000/api/contest/single/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
    
        const contest = response.data.contest[0];
        setFormData({
          title: contest.title,
          description: contest.description,
          startTime: formatLocalTime(contest.start_time), // ✅ Formatted display time
          endTime: formatLocalTime(contest.end_time), // ✅ Formatted display time
          password: contest.type === "admin-created" ? "" : contest.password,
        });
      } catch (error) {
        console.error("Error fetching contest:", error);
      }
    };
    
    

    // Fetch Problems Data
    const fetchProblems = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const response = await axios.get(`http://127.0.0.1:8000/api/contest/my/problems/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        // Extract problem details correctly
        const formattedProblems = response.data.problems.map((problem) => ({
          id: problem.problem_id,
          title: problem.problem?.title || "N/A",
          xp: problem.problem?.xp || 0,
        }));

        setProblems(formattedProblems);
      } catch (error) {
        console.error("Error fetching problems:", error);
      }
    };

    fetchContest();
    fetchProblems();
  }, [id]);

  // Handle Form Input Change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle Save Edit
  const handleSaveEdit = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;
  
    // Debugging: Log raw input before conversion
    console.log("Raw Start Time from Form:", formData.startTime);
    console.log("Raw End Time from Form:", formData.endTime);
  
    // Convert times to UTC+0 format
    const formattedStartTime = convertLocalToUTC(formData.startTime);
    const formattedEndTime = convertLocalToUTC(formData.endTime);
  
    // Get the user's timezone
    const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  
    // Debugging: Log formatted output
    // console.log(`Formatted Start Time: ${formattedStartTime} (TimeZone: ${userTimezone})`);
    // console.log(`Formatted End Time: ${formattedEndTime} (TimeZone: ${userTimezone})`);
  
    try {
      await axios.post(
        "http://127.0.0.1:8000/api/contest/edit/",
        {
          contest_id: id,
          title: formData.title,
          description: formData.description,
          start_time: formattedStartTime, // ✅ Correct format
          end_time: formattedEndTime, // ✅ Correct format
          password: formData.password || undefined,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
  
      navigate(`/contests/private/${id}`);
    } catch (error) {
      console.error("Error saving contest:", error);
    }
  };
  
  
  
  

  // Open Problem Dialog
  const handleAddProblem = async () => {
    setProblemDialogOpen(true);
    setLoading(true);
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const response = await axios.get("http://127.0.0.1:8000/api/problem/all/", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAllProblems(response.data.problems || []);
    } catch (error) {
      console.error("Error fetching problems:", error);
    } finally {
      setLoading(false);
    }
  };

  // Close Problem Dialog
  const handleCloseDialog = () => {
    setProblemDialogOpen(false);
  };

  // Add Problem to Contest and Remove it from the Available Problems Table
  const handleSelectProblem = async (problem) => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      // First, add the problem to the contest
      await axios.post(
        "http://127.0.0.1:8000/api/contest/problem/add",
        {
          contest_id: id,
          problem_id: problem.id,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Remove the selected problem from the available problems list
      setAllProblems((prev) =>
        prev.filter((p) => p.id !== problem.id)
      );

      // Optionally, you can also add the problem to the contest's problems list
      setProblems((prev) => [
        ...prev,
        { id: problem.id, title: problem.title, xp: problem.xp },
      ]);

    } catch (error) {
      console.error("Error adding problem:", error);
    }
  };

  
  // Remove Problem from Contest
  const handleRemoveProblem = async (problemId) => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      await axios.post(
        "http://127.0.0.1:8000/api/contest/problem/remove",
        {
          contest_id: id,  // Contest ID from useParams()
          problem_id: problemId,  // Problem ID to be removed
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Remove problem from state after successful deletion
      setProblems((prev) => prev.filter((problem) => problem.id !== problemId));

      console.log(`Problem ID ${problemId} removed successfully.`);
    } catch (error) {
      console.error("Error removing problem:", error);
    }
  };


  return (
    
    
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography align="center" sx={{ fontSize: "24px", fontWeight: 600, mb: 4 }}>
        Edit Contest
      </Typography> 

      <Grid container spacing={4}>
        <Grid item xs={12} sm={12}>
          <TextField
            fullWidth
            name="title"
            label="Title"
            value={formData.title}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <TextField
            fullWidth
            name="description"
            label="Description"
            value={formData.description}
            onChange={handleInputChange}
            multiline
            rows={4}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField 
            label="Current Start Time" 
            value={formData.startTime} 
            fullWidth 
            variant="outlined" 
            InputProps={{ readOnly: true }} 
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField 
            label="Current End Time" 
            value={formData.endTime} 
            fullWidth 
            variant="outlined" 
            InputProps={{ readOnly: true }} 
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            name="startTime"
            type="datetime-local"
            label="New Start Time"
            value={formData.startTime ? formData.startTime.replace(" ", "T") : ""}
            onChange={handleInputChange}
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            name="endTime"
            type="datetime-local"
            label="New End Time"
            value={formData.endTime ? formData.endTime.replace(" ", "T") : ""}
            onChange={handleInputChange}
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
      </Grid>
      

    <Box sx={{ mt: 4, display: "flex", flexDirection: "column", gap: 3 }}>
      
      <Typography variant="h6">Problem Set</Typography>
      <Button variant="outlined" onClick={handleAddProblem}>+ ADD PROBLEM</Button>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow >
              <TableCell sx={{ color: "#8d256f", fontWeight: "bold" , textAlign: "center" }}>ID</TableCell>
              <TableCell sx={{ color: "#8d256f", fontWeight: "bold" , textAlign: "center" }}>Title</TableCell>
              <TableCell sx={{ color: "#8d256f", fontWeight: "bold" , textAlign: "center" }}>XP</TableCell>
              <TableCell sx={{ color: "#8d256f", fontWeight: "bold" , textAlign: "center" }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {problems.length ? (
              problems.map((problem) => (
                <TableRow key={problem.id}>
                  <TableCell sx={{ textAlign: "center" }}>{problem.id}</TableCell>
                  <TableCell sx={{ textAlign: "center" }}></TableCell>
                  <TableCell sx={{ textAlign: "center" }}>{problem.xp}</TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    <Button color="error" onClick={() => handleRemoveProblem(problem.id)}>Remove</Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} align="center">No problems selected</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>

      <Box sx={{ mt: 4, display: "flex", flexDirection: "column", gap: 3 }}>
        {/* <Button variant="outlined" onClick={handleAddProblem}>+ ADD PROBLEM</Button> */}

        {/* Problem Selection Dialog */}
        {/* Problem Selection Dialog */}
        <Dialog open={problemDialogOpen} onClose={handleCloseDialog} fullWidth maxWidth="md">
          <DialogTitle>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography variant="h6">Select Problems</Typography>
              <TextField
                size="small"
                placeholder="Search problems..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </Box>
          </DialogTitle>
          <DialogContent>
            {loading ? (
              <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
                <CircularProgress />
              </Box>
            ) : (
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ color: "#1565C0", fontWeight: "bold"}}>ID</TableCell>
                      <TableCell sx={{ color: "#1565C0", fontWeight: "bold"}}>Problem Title</TableCell>
                      <TableCell sx={{ color: "#1565C0", fontWeight: "bold"}}>XP</TableCell>
                      <TableCell align="right" sx={{ color: "#1565C0", fontWeight: "bold"}}>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {allProblems
                      .filter((problem) =>
                        problem.title.toLowerCase().includes(searchTerm.toLowerCase())
                      )
                      .map((problem) => (
                        <TableRow key={problem.id}>
                          <TableCell>{problem.id}</TableCell>
                          <TableCell>{problem.title}</TableCell>
                          <TableCell>{problem.xp}</TableCell>
                          <TableCell align="right">
                            <Button
                              size="small"
                              variant="outlined"
                              onClick={() => handleSelectProblem(problem)}
                            >
                              Add
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Close</Button>
          </DialogActions>
        </Dialog>
      </Box>
      <Box>
        <Button variant="contained" color="primary" onClick={handleSaveEdit}>Save</Button>
      </Box>
    </Container>

  );
}

