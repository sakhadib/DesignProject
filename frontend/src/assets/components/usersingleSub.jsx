"use client";

import { useState, useEffect } from "react";
import {
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  CircularProgress,
  Box,
  Card,
  CardContent,
  Chip,
} from "@mui/material";
import { format } from "date-fns";
import { useParams } from "react-router-dom";
import api from "../../api";

export default function SubmissionsTable() {
  const { id: problemId } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [submissionData, setSubmissionData] = useState(null);

  useEffect(() => {
    const fetchSubmissions = async () => {
      setLoading(true);
      setError(null);

      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("User not authenticated. Please log in.");

        const userResponse = await api.post("/auth/me/", {}, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        const userId = userResponse.data?.id;
        if (!userId) throw new Error("User ID not found. Please log in again.");

        const response = await api.get(`/submission/problem/${problemId}/user/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setSubmissionData(response.data || {});
      } catch (err) {
        console.error("Error fetching submissions:", err);
        setError(err.response?.data?.message || err.message || "Failed to load submissions.");
      } finally {
        setLoading(false);
      }
    };

    if (problemId) fetchSubmissions();
  }, [problemId]);

  const formatDate = (dateString) => {
    try {
      return format(new Date(dateString), "MMM d, yyyy 'at' h:mm a");
    } catch {
      return dateString;
    }
  };

  const calculateTotalXP = () => submissionData?.submissions?.reduce((total, sub) => total + sub.xp, 0) || 0;
  const getHighestXP = () => submissionData?.submissions?.length ? Math.max(...submissionData.submissions.map(sub => sub.xp)) : 0;

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", my: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Paper sx={{ p: 3, bgcolor: "#fff8f8", color: "#d32f2f", my: 2 }}>
        <Typography>{error}</Typography>
      </Paper>
    );
  }

  if (!submissionData || !submissionData.problem) {
    return (
      <Paper sx={{ p: 3, my: 2 }}>
        <Typography>No submission data available.</Typography>
      </Paper>
    );
  }

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h5" gutterBottom>Your Submissions</Typography>

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
            <Typography variant="h6">Problem: {submissionData.problem.title}</Typography>
            <Box>
              {submissionData.problem.tags?.topics?.map((topic) => (
                <Chip key={topic} label={topic} size="small" sx={{ ml: 1, bgcolor: "#007FFF", color: "white" }} />
              ))}
            </Box>
          </Box>

          <Box sx={{ display: "flex", gap: 4 }}>
            <Box>
              <Typography variant="body2" color="text.secondary">Total Submissions</Typography>
              <Typography variant="h6">{submissionData.submissions.length}</Typography>
            </Box>
            <Box>
              <Typography variant="body2" color="text.secondary">Total XP Earned</Typography>
              <Typography variant="h6">{calculateTotalXP()} / {submissionData.problem.xp * submissionData.submissions.length}</Typography>
            </Box>
            <Box>
              <Typography variant="body2" color="text.secondary">Highest XP</Typography>
              <Typography variant="h6">{getHighestXP()} / {submissionData.problem.xp}</Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>

      <TableContainer component={Paper}>
        <Table>
          <TableHead sx={{ bgcolor: "#f5f5f5" }}>
            <TableRow>
              <TableCell>Submission ID</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>XP Earned</TableCell>
              <TableCell>Contest</TableCell>
              <TableCell>Performance</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {submissionData.submissions.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} align="center">No submissions found</TableCell>
              </TableRow>
            ) : (
              submissionData.submissions.map((submission) => (
                <TableRow key={submission.id}>
                  <TableCell>#{submission.id}</TableCell>
                  <TableCell>{formatDate(submission.created_at)}</TableCell>
                  <TableCell>{submission.xp} / {submissionData.problem.xp}</TableCell>
                  <TableCell>{submission.contest_id ? `#${submission.contest_id}` : "N/A"}</TableCell>
                  <TableCell>
                    <Chip
                      label={submission.xp === submissionData.problem.xp ? "Perfect" : submission.xp >= submissionData.problem.xp * 0.8 ? "Good" : "Partial"}
                      size="small"
                      sx={{ bgcolor: submission.xp === submissionData.problem.xp ? "#4caf50" : submission.xp >= submissionData.problem.xp * 0.8 ? "#2196f3" : "#ff9800", color: "white" }}
                    />
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}