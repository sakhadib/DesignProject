import React, { useState, useEffect } from "react";
import {
  Button,
  TextField,
  Typography,
  Paper,
  Box,
  Dialog,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Card,
  CardContent,
  IconButton,
  Chip,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import ReactMarkdown from "react-markdown";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import "katex/dist/katex.min.css"; // Import KaTeX CSS for math rendering
import axios from "../../api";
import { useParams } from "react-router-dom";

const ProblemView = () => {
  const { id } = useParams();
  const [open, setOpen] = useState(false);
  const [problem, setProblem] = useState(null);
  const [answer, setAnswer] = useState("");
  const [message, setMessage] = useState("");

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    const fetchProblem = async () => {
      try {
        const response = await axios.get(`/problem/single/${id}`);
        setProblem(response.data.problem);
      } catch (error) {
        console.error("Error fetching the problem:", error);
      }
    };

    fetchProblem();
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted answer:", answer);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (message.trim()) {
      console.log("Sent message:", message);
      setMessage("");
    }
  };

  if (!problem) return <Typography>Loading...</Typography>;

  const statistics = [
    { label: "XP", value: problem.xp },
    { label: "Topics", value: problem.tags.topics.join(", ") },
    { label: "Target", value: problem.tags.target },
  ];

  return (
    <Box sx={{ padding: 3, maxWidth: 1200, margin: "0 auto" }}>
      {/* Main content */}
      <Box sx={{ display: "flex", gap: 3, marginTop: "100px", marginBottom: "60px" }}>
        <Card sx={{ flex: 1 }}>
          <CardContent>
            <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold" }}>
              {problem.title}
            </Typography>
            {/* <Typography variant="body2" color="text.secondary" gutterBottom>
              Tags: {problem.tags.topics.join(", ")}
            </Typography> */}
            <Typography variant="subtitle1" gutterBottom>
              <Box component="span" sx={{ display: "inline-flex", gap: 1, ml: 1 }}>
                {problem.tags.topics.map((tag) => (
                  <Chip
                    key={tag}
                    label={tag}
                    sx={{
                      cursor: "pointer",
                      borderRadius: "16px", // Fully rounded
                      // padding: "8px 16px", // Padding for a nicer look.
                      fontSize: "14px",
                      // fontWeight: "bold", // Bold text
                      color: "white", // White text
                      backgroundColor: "#007FFF", // Blue background
                      // "&:hover": {
                      //   backgroundColor: "#135ab3", // Darker blue on hover
                      // },
                    }}
                  />
                ))}
              </Box>
            </Typography>
            <Typography variant="h5" sx={{ mt: 3, mb: 2 }}>
              Problem Statement
            </Typography>

            {/* Render markdown description */}
            <ReactMarkdown
              children={problem.description}
              remarkPlugins={[remarkMath]}
              rehypePlugins={[rehypeKatex]}
            />

            <Typography variant="h5" sx={{ mt: 4, mb: 2 }}>
              Submit Answer
            </Typography>
            <Box component="form" onSubmit={handleSubmit}>
              <TextField
                fullWidth
                placeholder="Enter your answer here..."
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                sx={{ mb: 2 }}
              />
              <Button fullWidth variant="contained" type="submit" sx={{ bgcolor: "#1976d2" }}>
                SUBMIT
              </Button>
            </Box>
          </CardContent>
        </Card>

        {/* Statistics Card */}
        <Card sx={{ width: 300 }}>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              Statistics
            </Typography>
            <Table>
              <TableBody>
                {statistics.map((stat) => (
                  <TableRow key={stat.label}>
                    <TableCell component="th" scope="row">
                      {stat.label}
                    </TableCell>
                    <TableCell align="right">{stat.value}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </Box>

      {/* Help Button */}
      <Button
        variant="contained"
        color="primary"
        onClick={handleOpen}
        sx={{
          position: "fixed",
          bottom: 16,
          right: 16,
          zIndex: 10,
        }}
      >
        HELP
      </Button>

      {/* Chat Dialog */}
      <Dialog fullScreen open={open} onClose={handleClose}>
        <Box sx={{ height: "100vh", display: "flex", marginTop: "80px" }}>
          <Button
            onClick={handleClose}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              zIndex: 1,
            }}
          >
            Close
          </Button>

          {/* Left Panel - Problem */}
          <Box
            sx={{
              width: "50%",
              backgroundColor: "#f0f0f0",
              padding: "20px",
              overflow: "auto",
            }}
          >
            <Typography variant="h5" gutterBottom>
              {problem.title}
            </Typography>
            <ReactMarkdown
              children={problem.description}
              remarkPlugins={[remarkMath]}
              rehypePlugins={[rehypeKatex]}
            />
            <Box sx={{ mt: 4 }}>
              <Typography variant="subtitle1" gutterBottom>
                Statistic
              </Typography>
              <Table>
                <TableBody>
                  {statistics.map((stat) => (
                    <TableRow key={stat.label}>
                      <TableCell>{stat.label}</TableCell>
                      <TableCell align="right">{stat.value}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Box>

          {/* Right Panel - Chat */}
          <Box
            sx={{
              width: "50%",
              backgroundColor: "#ffffff",
              display: "flex",
              flexDirection: "column",
              padding: "20px",
              overflow: "auto",
            }}
          >
            <Typography
              variant="h4"
              sx={{
                p: 2,
                borderBottom: 1,
                borderColor: "divider",
              }}
            >
              Welcome to ChatBot
            </Typography>

            <Box
              sx={{
                flex: 1,
                overflow: "auto",
                p: 2,
              }}
            >
              <Paper
                elevation={1}
                sx={{
                  p: 2,
                  bgcolor: "#f5f5f5",
                  maxWidth: "80%",
                }}
              >
                How can I help you today?
              </Paper>
            </Box>

            <Box
              component="form"
              onSubmit={handleSendMessage}
              sx={{
                p: 2,
                borderTop: 1,
                borderColor: "divider",
                bgcolor: "#f5f5f5",
                display: "flex",
                gap: 1,
              }}
            >
              <TextField
                fullWidth
                placeholder="Write here..."
                size="small"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <IconButton type="submit" disabled={!message.trim()}>
                <SendIcon />
              </IconButton>
            </Box>
          </Box>
        </Box>
      </Dialog>
    </Box>
  );
};

export default ProblemView;
