"use client"

import { useState, useEffect } from "react";
import axios from "../../api";
import { useParams } from "react-router-dom";
import {
  Box,
  Typography,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Card,
  CardContent,
  Chip,
  Divider,
} from "@mui/material";
import FlipTimer from "./flip-timer";

const ContestPage = () => {
  const { id } = useParams();
  const [contest, setContest] = useState(null);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [contestStatus, setContestStatus] = useState("upcoming");

  useEffect(() => {
    axios
      .get(`/contest/single/${id}`)
      .then((response) => {
        const contestData = response.data?.contest[0];
        setContest(contestData);

        const currentTime = new Date().getTime();
        const startTime = new Date(contestData.start_time).getTime();
        const endTime = new Date(contestData.end_time).getTime();

        if (currentTime < startTime) {
          setContestStatus("upcoming");
          setTimeRemaining(Math.floor((startTime - currentTime) / 1000));
        } else if (currentTime >= startTime && currentTime < endTime) {
          setContestStatus("active");
          setTimeRemaining(Math.floor((endTime - currentTime) / 1000));
        } else {
          setContestStatus("previous");
        }
      })
      .catch((error) => {
        console.error("API Error:", error);
      });
  }, [id]);

  if (!contest) {
    return (
      <Typography variant="h5" align="center">
        Loading...
      </Typography>
    );
  }

  return (
    <Box sx={{ maxWidth: 1200, mx: "auto", p: 4 }}>
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="h3" component="h1" align="center" gutterBottom>
            {contest.title}
          </Typography>
          <Typography variant="subtitle1" align="center" gutterBottom>
            Created by: {contest.user?.username || "Unknown"}
          </Typography>
          <Typography variant="subtitle2" align="center" gutterBottom>
            Total Participants: {contest.participants_count}
          </Typography>
          <Box display="flex" justifyContent="center" mb={2}>
            <Chip
              label={contestStatus.charAt(0).toUpperCase() + contestStatus.slice(1)}
              color={
                contestStatus === "active"
                  ? "primary"
                  : contestStatus === "upcoming"
                  ? "secondary"
                  : "default"
              }
            />
          </Box>
          {(contestStatus === "upcoming" || contestStatus === "active") && (
            <Box mb={2}>
              <FlipTimer initialTime={timeRemaining} />
              <Typography variant="subtitle1" align="center">
                {contestStatus === "upcoming" ? "Time to start" : "Time remaining"}
              </Typography>
            </Box>
          )}
          <Divider sx={{ my: 2 }} />
          <Typography variant="h6" gutterBottom sx={{ color: "#1565C0", fontSize: "2rem", textAlign: "justify" }}>
            Description
          </Typography>
          <Typography variant="body1">{contest.description}</Typography>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <Typography variant="h4" component="h2" gutterBottom>
            Problem Set
          </Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Problem</TableCell>
                  <TableCell>Title</TableCell>
                  <TableCell>Difficulty</TableCell>
                  <TableCell align="right">Points</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {contest.full_problems?.length > 0 ? (
                  contest.full_problems.map((problemData, index) => (
                    <TableRow key={problemData.id}>
                      <TableCell>{`Problem ${index + 1}`}</TableCell>
                      <TableCell>{problemData.problem?.title || "N/A"}</TableCell>
                      <TableCell>{problemData.problem?.tags?.topics?.join(", ") || "N/A"}</TableCell>
                      <TableCell align="right">{problemData.points}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={4} align="center">
                      No problems available
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>

      <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 4 }}>
        <Button
          variant="contained"
          size="large"
          disabled={contestStatus === "previous"}
          sx={{ px: 4, py: 1.5, borderRadius: 1, textTransform: "none", fontSize: "1.1rem" }}
        >
          {contestStatus === "active" ? "Join Contest" : contestStatus === "upcoming" ? "Register" : "Contest Ended"}
        </Button>
      </Box>
    </Box>
  );
};

export default ContestPage;