"use client"

import { useState, useEffect } from "react"
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
  Modal,
} from "@mui/material"
import SendIcon from "@mui/icons-material/Send"
import ReactMarkdown from "react-markdown"
import remarkMath from "remark-math"
import rehypeKatex from "rehype-katex"
import "katex/dist/katex.min.css" // Import KaTeX CSS for math rendering
import axios from "../../api"
import { useParams } from "react-router-dom"
import CloseIcon from "@mui/icons-material/Close";


const ProblemView = () => {
  const { id } = useParams()
  const [open, setOpen] = useState(false)
  const [problem, setProblem] = useState(null)
  const [answer, setAnswer] = useState("")
  const [message, setMessage] = useState("")
  const [modalOpen, setModalOpen] = useState(false)
  const [modalContent, setModalContent] = useState("")
  
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  const handleModalOpen = () => setModalOpen(true)
  const handleModalClose = () => setModalOpen(false)
  
  useEffect(() => {
    const fetchProblem = async () => {
      try {
        const response = await axios.get(`/problem/single/${id}`)
        setProblem(response.data.problem)
      } catch (error) {
        console.error("Error fetching the problem:", error)
      }
    }
    
    fetchProblem()
  }, [id])
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!answer.trim()) {
      setModalContent("Please enter an answer before submitting.")
      handleModalOpen()
      return
    }
    
    try {
      const response = await axios.post("/problem/submit/", {
        problem_id: problem.id,
        answer: answer,
        contest_id: problem.contest_id || null,
      })
      
      const { message, xp_recieved } = response.data
      
      setModalContent(`${message}\nXP Received: ${xp_recieved}`)
      handleModalOpen()
      setAnswer("")
    } catch (error) {
      console.error("Error submitting answer:", error)
      setModalContent("Submission failed. Please try again.")
      handleModalOpen()
    }
  }
  
  const handleSendMessage = (e) => {
    e.preventDefault()
    if (message.trim()) {
      console.log("Sent message:", message)
      setMessage("")
    }
  }
  
  if (!problem) return <Typography>Loading...</Typography>
  
  const statistics = [
    { label: "XP", value: problem.xp },
    { label: "Topics", value: problem.tags.topics.join(", ") },
    { label: "Target", value: problem.tags.target },
  ]
  
  return (
    <Box sx={{ padding: 3, maxWidth: 1200, margin: "0 auto" }}>
    {/* Main content */}
    <Box sx={{ display: "flex", gap: 3, marginTop: "100px", marginBottom: "60px" }}>
    <Card sx={{ flex: 1 }}>
    <CardContent>
    <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold" }}>
    {problem.title}
    </Typography>
    <Typography variant="subtitle1" gutterBottom>
    <Box component="span" sx={{ display: "inline-flex", gap: 1, ml: 1 }}>
    {problem.tags.topics.map((tag) => (
      <Chip
      key={tag}
      label={tag}
      sx={{
        cursor: "pointer",
        borderRadius: "16px",
        fontSize: "14px",
        color: "white",
        backgroundColor: "#007FFF",
      }}
      />
    ))}
    </Box>
    </Typography>
    <Typography variant="h5" sx={{ mt: 3, mb: 2 }}>
    Problem Statement
    </Typography>
    
    <ReactMarkdown children={problem.description} remarkPlugins={[remarkMath]} rehypePlugins={[rehypeKatex]}>
   
    </ReactMarkdown>
    
    
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
    <ReactMarkdown children={problem.description} remarkPlugins={[remarkMath]} rehypePlugins={[rehypeKatex]} />
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
    
    {/* Modal for submission feedback */}
    <Modal open={modalOpen} onClose={handleModalClose}>
    <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', boxShadow: 24, p: 4, textAlign: 'center' }}>
    <Typography variant="h6" sx={{ mb: 2 }}>{modalContent}</Typography>
    <Button variant="contained" onClick={handleModalClose}>OK</Button>
    </Box>
    </Modal>
    
    
    </Box>
  )
}

export default ProblemView

