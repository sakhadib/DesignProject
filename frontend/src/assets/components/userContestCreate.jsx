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
  Collapse,
  IconButton,
  Chip,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import axios from "../../api";
import ReactMarkdown from "react-markdown"; // For rendering Markdown
import rehypeKatex from "rehype-katex"; // LaTeX support
import remarkMath from "remark-math"; // Markdown math support
import "katex/dist/katex.min.css"; // Required CSS for LaTeX rendering
import { useNavigate } from "react-router-dom"; // Import for navigation

export default function CreateContest() {
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
  const [addedProblems, setAddedProblems] = useState(new Set());
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate(); // For navigation

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

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
    console.error("Invalid Date Format:", localTime);
    return "";
  }

  return localDate.toISOString().slice(0, 19).replace("T", " ");
};


  const handleCreateContest = () => {
    if (formData.title && formData.startTime && formData.endTime && formData.description && formData.password) {
      // Convert Start and End time to UTC+0 format
      const startTimeUTC = convertLocalToUTC(formData.startTime);
      const endTimeUTC = convertLocalToUTC(formData.endTime);
  
      const contestPayload = {
        title: formData.title,
        description: formData.description,
        start_time: startTimeUTC,  // Use converted start time
        end_time: endTimeUTC,      // Use converted end time
        password: formData.password,
      };
  
      setLoading(true);
      const token = localStorage.getItem("token"); // Get token from localStorage
      if (!token) {
        console.error("No token found");
        return;
      }
  
      axios
        .post("/contest/create/", contestPayload, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
  
          if (response.data.message === "Contest Created Successfully") {
            const contestId = response.data.contest.id; // ✅ Extract the contest ID
            alert("Contest created successfully!");
            navigate(`/contests/private/${contestId}`); // ✅ Navigate using the correct ID
          } else {
            alert("Failed to create contest.");
          }
        })
        .catch((error) => {
          console.error("Error creating contest:", error);
          alert("An error occurred while creating the contest.");
        })
        .finally(() => setLoading(false));
    } else {
      alert("Please make sure all required fields are filled.");
    }
  };
  
  

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography
        align="center"
        gutterBottom
        sx={{
          color: "primary.main",
          fontWeight: "bold",
          fontSize: "2.25rem",
        }}
      >
        Create Contest
      </Typography>

      <Box component="form" sx={{ mt: 4, display: "flex", flexDirection: "column", gap: 3 }}>
        <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
          {/* <Typography sx={{ width: "120px" }}>Title</Typography> */}
          <TextField
            fullWidth
            name="title"
            label="Title"
            value={formData.title}
            onChange={handleInputChange}
            variant="outlined"
            size="small"
          />
        </Box>

        <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
          {/* <Typography sx={{ width: "120px" }}>Start Time</Typography> */}
          <TextField
            fullWidth
            name="startTime"
            label="Start Time"
            type="datetime-local"
            value={formData.startTime}
            onChange={handleInputChange}
            variant="outlined"
            size="small"
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Box>

        <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
          {/* <Typography sx={{ width: "120px" }}>End Time</Typography> */}
          <TextField
            fullWidth
            name="endTime"
            label="End Time"
            type="datetime-local"
            value={formData.endTime}
            onChange={handleInputChange}
            variant="outlined"
            size="small"
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Box>

        <Box sx={{ display: "flex", gap: 2, alignItems: "flex-start" }}>
          {/* <Typography sx={{ width: "120px" }}>Description</Typography> */}
          <TextField
            fullWidth
            name="description"
            label="Description"
            value={formData.description}
            onChange={handleInputChange}
            variant="outlined"
            multiline
            rows={4}
          />
        </Box>

        <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
          {/* <Typography sx={{ width: "120px" }}>Password</Typography> */}
          <TextField
            fullWidth
            name="password"
            label="Password"
            value={formData.password}
            onChange={handleInputChange}
            variant="outlined"
            size="small"
          />
        </Box>

        <Box sx={{ mt: 2 }}>
          <Box sx={{ display: "flex", justifyContent: "right", alignItems: "center", mt: 4 }}>
            <Button
              variant="outlined"
              onClick={handleCreateContest}
              sx={{
                color: "white",
                width: "200px",
                backgroundColor: "#1E90FF",
                "&:hover": {
                  backgroundColor: "#1565C0",
                  color: "white",
                },
              }}
            >
              Create
            </Button>
          </Box>
        </Box>
      </Box>
    </Container>
  );
}

