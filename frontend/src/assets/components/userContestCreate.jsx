import React, { useState } from "react";
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
} from "@mui/material";
import axios from '../../api';

export default function CreateContest() {
  const [formData, setFormData] = useState({
    title: "",
    startTime: "",
    endTime: "",
    description: "",
    status: "upcoming", // default status
    type: "private", // always private
    visibility: "visible", // default visibility
    password: "1234", // default password
  });

  const [problems, setProblems] = useState([]); // selected problems
  const [allProblems, setAllProblems] = useState([]); // all available problems
  const [loading, setLoading] = useState(false); // loading state
  const [problemDialogOpen, setProblemDialogOpen] = useState(false); // dialog state

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleAddProblem = () => {
    setProblemDialogOpen(true);
    if (allProblems.length === 0) {
      setLoading(true);
      axios
        .get("/problem/all/") // fetch all problems
        .then((response) => {
          console.log("API Response:", response.data); // Log full response
          const problemsData = Array.isArray(response.data.problems)
            ? response.data.problems
            : [];
          setAllProblems(problemsData);
        })
        .catch((error) => {
          console.error("Error fetching problems:", error);
          setAllProblems([]); // Handle errors gracefully
        })
        .finally(() => setLoading(false));
    }
  };

  const handleCloseDialog = () => {
    setProblemDialogOpen(false);
  };

  const handleSelectProblem = (problem) => {
    if (!problems.some((p) => p.id === problem.id)) {
      setProblems([...problems, problem]);
    }
  };

  const handleRemoveProblem = (id) => {
    setProblems(problems.filter((problem) => problem.id !== id));
  };

  const handleStartContest = () => {
    if (
      problems.length > 0 &&
      formData.title &&
      formData.startTime &&
      formData.endTime &&
      formData.description
    ) {
      // Construct the payload for creating a contest
      const contestPayload = [
        { key: "title", value: formData.title },
        { key: "description", value: formData.description },
        { key: "start_time", value: formData.startTime },
        { key: "end_time", value: formData.endTime },
        { key: "status", value: formData.status },
        { key: "type", value: formData.type },
        { key: "visibility", value: formData.visibility },
        { key: "password", value: formData.password },
      ];

      // Send the POST request to create the contest
      setLoading(true); // Show loading state
      axios
        .post("/contest/create/", contestPayload)
        .then((response) => {
          console.log("API Response:", response.data);

          if (response.data.message === "Contest created successfully") {
            alert("Contest created successfully!");
            // Optionally, reset form or redirect
          } else {
            alert("Failed to create contest.");
          }
        })
        .catch((error) => {
          console.error("Error creating contest:", error);
          alert("An error occurred while creating the contest.");
        })
        .finally(() => setLoading(false)); // Hide loading state
    } else {
      alert("Please make sure all required fields are filled and problems are selected.");
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography
        variant="h4"
        align="center"
        gutterBottom
        sx={{
          color: "primary.main", // Assuming you're using Material-UI theme for primary color or define blue manually
          fontWeight: "bold",
          fontSize: "2.25rem", // Equivalent to the xl size in Material-UI typography scale
        }}
      >
        Create Contest
      </Typography>

      <Box component="form" sx={{ mt: 4, display: "flex", flexDirection: "column", gap: 3 }}>
        {/* Title Input */}
        <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
          <Typography sx={{ width: "120px" }}>Title</Typography>
          <TextField
            fullWidth
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            variant="outlined"
            size="small"
          />
        </Box>

        {/* Start Time Input */}
        <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
          <Typography sx={{ width: "120px" }}>Start Time</Typography>
          <TextField
            fullWidth
            name="startTime"
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

        {/* End Time Input */}
        <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
          <Typography sx={{ width: "120px" }}>End Time</Typography>
          <TextField
            fullWidth
            name="endTime"
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

        {/* Description Input */}
        <Box sx={{ display: "flex", gap: 2, alignItems: "flex-start" }}>
          <Typography sx={{ width: "120px" }}>Description</Typography>
          <TextField
            fullWidth
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            variant="outlined"
            multiline
            rows={4}
          />
        </Box>

        {/* Status Input */}
        <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
          <Typography sx={{ width: "120px" }}>Status</Typography>
          <TextField
            fullWidth
            name="status"
            value={formData.status}
            onChange={handleInputChange}
            variant="outlined"
            size="small"
          />
        </Box>

        {/* Type Input */}
        <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
          <Typography sx={{ width: "120px" }}>Type</Typography>
          <TextField
            fullWidth
            name="type"
            value={formData.type}
            onChange={handleInputChange}
            variant="outlined"
            size="small"
          />
        </Box>

        {/* Visibility Input */}
        <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
          <Typography sx={{ width: "120px" }}>Visibility</Typography>
          <TextField
            fullWidth
            name="visibility"
            value={formData.visibility}
            onChange={handleInputChange}
            variant="outlined"
            size="small"
          />
        </Box>

        {/* Password Input */}
        <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
          <Typography sx={{ width: "120px" }}>Password</Typography>
          <TextField
            fullWidth
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            variant="outlined"
            size="small"
          />
        </Box>

        {/* Problem Set */}
        <Box sx={{ mt: 2 }}>
          <Typography variant="h6" gutterBottom>
            Problem Set
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "right", alignItems: "center", mt: 4 }}>
            <Button
              variant="outlined"
              onClick={handleAddProblem}
              sx={{
                color: "white",
                width: "200px",
                backgroundColor: "#1E90FF",
                "&:hover": {
                  backgroundColor: "#1565C0",
                },
              }}
            >
              + ADD PROBLEM
            </Button>
          </Box>

          <TableContainer component={Paper} sx={{ backgroundColor: "#e0e0e0", mt: 3 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Problem Title</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {problems.length > 0 ? (
                  problems.map((problem) => (
                    <TableRow key={problem.id}>
                      <TableCell>{problem.id}</TableCell>
                      <TableCell>{problem.title}</TableCell>
                      <TableCell align="right">
                        <Button size="small" color="error" onClick={() => handleRemoveProblem(problem.id)}>
                          Remove
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={3} align="center">
                      No problems selected.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>

        {/* Start Button */}
        {problems.length > 0 && (
       <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3, mb: 5 }}>
       <Button variant="contained" color="primary" onClick={handleStartContest} sx={{ width: "200px", mb: 2 }}>
         Start Contest
       </Button>
     </Box>
     
        )}
      </Box>

      <Dialog open={problemDialogOpen} onClose={handleCloseDialog} fullWidth maxWidth="md">
        <DialogTitle>Select Problems</DialogTitle>
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
                    <TableCell>ID</TableCell>
                    <TableCell>Problem Title</TableCell>
                    <TableCell align="right">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {Array.isArray(allProblems) && allProblems.map((problem) => (
                    <TableRow key={problem.id}>
                      <TableCell>{problem.id}</TableCell>
                      <TableCell>{problem.title}</TableCell>
                      <TableCell align="right">
                        <Button size="small" variant="outlined" onClick={() => handleSelectProblem(problem)}>
                          Add
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                  {allProblems.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={3} align="center">
                        No problems available.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Close</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
