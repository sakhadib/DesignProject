import React, { useState, useEffect } from "react";
import { Box, Typography, TextField, Checkbox, FormControlLabel, FormControl, Button, Container } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom"; // Import useNavigate and useParams
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import axios from "../../api";


const ContestRegistration = () => {
  const { id } = useParams(); // Get the dynamic contest ID from URL
  const [contest, setContest] = useState(null); // Store contest data
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate(); // To handle redirection

  useEffect(() => {
    const fetchContestDetails = async () => {
      try {
        const response = await axios.get(`/contest/single/${id}`);
        setContest(response.data?.contest[0]); // Store contest details
      } catch (err) {
        console.error("Error fetching contest:", err);
      }
    };

    fetchContestDetails();
  }, [id]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setSuccess("");

    const requestData = { contest_id: id }; // Use dynamic contest ID from URL
    if (password) requestData.password = password;

    try {
      const token = localStorage.getItem("token"); // Get the token from localStorage
      const response = await axios.post("/contest/join/", requestData, {
        headers: {
          Authorization: `Bearer ${token}`, // Send the token with the request
        },
      });

      setSuccess(response.data.message);

      // Redirect to the contest single page after success
      setTimeout(() => {
        navigate(`/contest/single/${id}`); // Use dynamic id for redirection
      }, 2000);
    } catch (err) {
      console.error("Registration Error:", err.response?.data);
      setError(err.response?.data?.message || "Registration failed. Try again.");
    }
  };

  return (
    <Container maxWidth="md">
      <Box component="form" onSubmit={handleSubmit} sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Registration for the contest
        </Typography>

        {/* Display Contest Title */}
        <Typography variant="h5" component="h2" gutterBottom>
          {contest ? contest.title : "Loading..."}
        </Typography>

        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" component="h3" gutterBottom>
            Terms of agreement:
          </Typography>
          <TextField
  multiline
  fullWidth
  rows={10}
  value={`
    1. Eligibility:
       - Open to all registered MathXplorer users with accurate account details.
    
    2. Fair Play:
       - Cheating, sharing solutions, or using unauthorized aids is strictly prohibited.
    
    3. Contest Structure:
       - Solve problems within the specified contest duration.
       - Follow the submission format; incorrect formats may result in disqualification.
       - Points are awarded based on correctness and difficulty, with ties broken by submission time.
    
    4. Code of Conduct:
       - Maintain respectful communication with other participants.
       - Do not share solutions or attempt to exploit the system.

    5. Disqualification:
       - Plagiarism, multiple accounts, or rule violations may lead to disqualification.
       - Appeals must be submitted within 48 hours of disqualification.

    6. Prizes and Recognition:
       - Only rule-compliant participants are eligible for prizes and leaderboard rankings.

    7. Technical Guidelines:
       - Ensure stable internet connectivity.
       - Report any technical issues promptly; contests may be paused if necessary.

    8. Final Decision:
       - Administrators’ decisions are final. Rules may be updated before contests.
  `}
  InputProps={{
    readOnly: true,
  }}
  variant="outlined"
  sx={{
    backgroundColor: "#f5f5f5",
    "& .MuiInputBase-input": {
      fontFamily: "monospace",
    },
  }}
/>

        </Box>

        <Box sx={{ mb: 3 }}>
          <FormControl required error={false}>
            <FormControlLabel
              control={
                <Checkbox checked={acceptTerms} onChange={(e) => setAcceptTerms(e.target.checked)} />
              }
              label="I accept"
            />
          </FormControl>
        </Box>

        <Box sx={{ mb: 3 }}>
          <TextField
            label="Password (if required)"
            type="password"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            variant="outlined"
            sx={{ mb: 2 }}
          />
        </Box>

        {error && <Typography color="error">{error}</Typography>}
        {success && <Typography color="primary">{success}</Typography>}

        <Button type="submit" variant="contained" color="primary" size="large" disabled={!acceptTerms}>
          Register
        </Button>
      </Box>
    </Container>
  );
};

export default ContestRegistration;
