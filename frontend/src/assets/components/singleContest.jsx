import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../../api";
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
  const navigate = useNavigate();
  const [contest, setContest] = useState(null);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [contestStatus, setContestStatus] = useState("upcoming");
  const [isParticipant, setIsParticipant] = useState(false);
  const [loadingParticipant, setLoadingParticipant] = useState(true);
  const [contestProblems, setContestProblems] = useState([]);

  // Fetch contest details
  useEffect(() => {
    const fetchContestDetails = async () => {
      try {
        const response = await axios.get(`/contest/single/${id}`);
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

        // Check if user is a participant
        await checkParticipant(contestData.id);
      } catch (error) {
        console.error("API Error fetching contest:", error);
      }
    };

    fetchContestDetails();
  }, [id]);

  // Check if user is a participant
  const checkParticipant = async (contestId) => {
    try {
      const res = await axios.post(
        `/contest/isparticipant`,
        { contest_id: contestId },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (res.data.message !== "User is not registered in the contest") {
        setIsParticipant(true);
      }
    } catch (error) {
      console.error("Error checking participation:", error);
    } finally {
      setLoadingParticipant(false);
    }
  };

  // Fetch problems if user is registered & contest is active or previous
  useEffect(() => {
    const fetchContestProblems = async () => {
      try {
        const response = await axios.get(`/contest/problems/${id}`);
        if (response.data && response.data.problems) {
          setContestProblems(response.data.problems);
        }
      } catch (error) {
        console.error("Error fetching problems:", error);
      }
    };

    if ((contestStatus === "active" || contestStatus === "previous") && isParticipant) {
      fetchContestProblems();
    }
  }, [contestStatus, isParticipant, id]);

  if (!contest) {
    return <Typography variant="h5" align="center">Loading...</Typography>;
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
          <Box display="flex" justifyContent="center" mb={2}>
            <Chip
              label={contestStatus.charAt(0).toUpperCase() + contestStatus.slice(1)}
              sx={{
                backgroundColor:
                  contestStatus === "active"
                    ? "#6AA121"
                    : contestStatus === "upcoming"
                    ? "#8d256f"
                    : "#B0BEC5",
                color: "#fff",
              }}
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

      {/* Problem Set Table */}
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
                  <TableCell>Topics</TableCell>
                  <TableCell align="right">Points</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {contestProblems.length > 0 ? (
                  contestProblems.map((problemData, index) => (
                    <TableRow key={problemData.id}>
                      <TableCell>{`Problem ${index + 1}`}</TableCell>
                      <TableCell>{problemData.problem?.title || "N/A"}</TableCell>
                      <TableCell>
                        {problemData.problem?.tags?.topics?.join(", ") || "N/A"}
                      </TableCell>
                      <TableCell align="right">{problemData.points}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={4} align="center">
                      {loadingParticipant
                        ? "Checking participation..."
                        : contestStatus === "upcoming"
                        ? isParticipant
                          ? "Problems will be shown after the contest starts"
                          : "Register to view problems"
                        : isParticipant
                        ? "No problems available"
                        : "Register to view problems"}
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>

      {/* Register Button */}
      <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 4 }}>
        {contestStatus === "upcoming" ? (
          isParticipant ? (
            <Button variant="contained" size="large" disabled sx={{ px: 4, py: 1.5, borderRadius: 1, fontSize: "1.1rem" }}>
              Registered
            </Button>
          ) : (
            <Button
              variant="contained"
              size="large"
              onClick={() => navigate(`/contest/registration/${id}`)}
              sx={{ px: 4, py: 1.5, borderRadius: 1, fontSize: "1.1rem" }}
            >
              Register
            </Button>
          )
        ) : (
          <Button variant="contained" size="large" disabled sx={{ px: 4, py: 1.5, borderRadius: 1, fontSize: "1.1rem" }}>
            {contestStatus === "previous" ? "Contest Ended" : "Contest Started"}
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default ContestPage;
