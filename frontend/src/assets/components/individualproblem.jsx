"use client"

import { useState, useEffect, useRef } from "react"
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
  CircularProgress,
} from "@mui/material"
import SendIcon from "@mui/icons-material/Send"
import CloseIcon from "@mui/icons-material/Close"
import ReactMarkdown from "react-markdown"
import remarkMath from "remark-math"
import rehypeKatex from "rehype-katex"
import "katex/dist/katex.min.css" // Import KaTeX CSS for math rendering
import api from "../../api" // Using your existing API setup with authentication
import { useParams } from "react-router-dom"
import { BlockMath, InlineMath } from "react-katex"
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome"
// Add this import at the top of the file, after the other imports
// import '@fontsource/poppins';

// Add this after imports
const poppinsFontStyle = `
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');
`

const typingAnimationStyle = `
  .typing-dot {
    display: inline-block;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: #666;
    margin: 0 3px;
    animation: typing-animation 1.4s infinite ease-in-out both;
  }
  
  @keyframes typing-animation {
    0%, 80%, 100% { 
      transform: scale(0.6);
      opacity: 0.6;
    }
    40% { 
      transform: scale(1);
      opacity: 1;
    }
  }
`

// For development/testing when API is not available
const MOCK_CHAT_HISTORY = [
  { sender: "bot", message: "How can I help you today?" },
  { sender: "user", message: "I don't understand this problem." },
  {
    sender: "bot",
    message:
    "Let me explain it step by step. This problem is asking you to solve a linear equation. You need to find the value of x that makes the equation true.",
  },
]

const ProblemView = () => {
  const { id: problemId } = useParams() // Explicitly name the parameter for clarity
  const [open, setOpen] = useState(false)
  const [problem, setProblem] = useState(null)
  const [answer, setAnswer] = useState("")
  const [message, setMessage] = useState("")
  const [modalOpen, setModalOpen] = useState(false)
  const [modalContent, setModalContent] = useState("")
  const [chatMessages, setChatMessages] = useState([])
  const [loadingChat, setLoadingChat] = useState(false)
  const [apiError, setApiError] = useState(false)
  const chatContainerRef = useRef(null)
  const [isTyping, setIsTyping] = useState(false)
  
  const handleOpen = async () => {
    setOpen(true)
    await fetchChatHistory()
  }
  
  const handleClose = () => setOpen(false)
  const handleModalOpen = () => setModalOpen(true)
  const handleModalClose = () => setModalOpen(false)
  
  const fetchChatHistory = async () => {
    if (!problemId) return
    
    setLoadingChat(true)
    setApiError(false)
    
    try {
      // Use problemId directly from URL params
      const response = await api.get(`/chat/history/${problemId}`)
      
      if (response.data && Array.isArray(response.data)) {
        setChatMessages(response.data)
      } else {
        // If response is not as expected, set default message
        setChatMessages([{ sender: "bot", message: "How can I help you today?" }])
      }
    } catch (error) {
      console.error("Error fetching chat history:", error)
      
      // Check if it's a CORS or network error
      if (error.message?.includes("Network Error") || error.code === "ERR_NETWORK") {
        setApiError(true)
        // Use mock data for development/testing
        setChatMessages(MOCK_CHAT_HISTORY)
      } else if (error.response?.status === 401) {
        // Handle authentication error
        console.error("Authentication error. Please log in again.")
        // You might want to redirect to login page or show a login modal
        setChatMessages([{ sender: "bot", message: "Please log in to use the chat feature." }])
      } else {
        // For other errors, just show a welcome message
        setChatMessages([{ sender: "bot", message: "How can I help you today?" }])
      }
    } finally {
      setLoadingChat(false)
    }
  }
  
  useEffect(() => {
    const fetchProblem = async () => {
      if (!problemId) return
      
      try {
        const response = await api.get(`/problem/single/${problemId}`)
        setProblem(response.data.problem)
      } catch (error) {
        console.error("Error fetching the problem:", error)
        // For demo purposes, create a mock problem if API fails
        setProblem({
          id: problemId,
          title: "Sample Problem",
          description: "This is a sample problem description.",
          xp: 100,
          tags: {
            topics: ["Math", "Algebra"],
            target: "Beginner",
          },
        })
      }
    }
    
    fetchProblem()
  }, [problemId]) // Dependency on problemId
  
  const [isSubmitting, setIsSubmitting] = useState(false) // Cooldown state
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!answer.trim()) {
      setModalContent("Please enter an answer before submitting.")
      handleModalOpen()
      return
    }
    
    if (isSubmitting) return // Prevent multiple clicks
    
    setIsSubmitting(true) // Start cooldown
    try {
      const response = await api.post("/problem/submit/", {
        problem_id: problemId,
        answer: answer,
        contest_id: problem?.contest_id || null,
      })
      
      const { message, xp_recieved } = response.data
      setModalContent(`${message}\nXP Received: ${xp_recieved}`)
      handleModalOpen()
      setAnswer("")
    } catch (error) {
      console.error("Error submitting answer:", error)
      
      if (error.response?.status === 401) {
        setModalContent("Authentication error. Please log in again.")
      } else {
        setModalContent("Submission failed. Please try again.")
      }
      
      handleModalOpen()
    } finally {
      setIsSubmitting(false) // Re-enable button after response
    }
  }
  
  const handleSendMessage = async (e) => {
    e.preventDefault()
    if (!message.trim()) return
    
    // Add user message to chat
    const userMessage = { sender: "user", message: message }
    setChatMessages((prev) => [...prev, userMessage])
    
    // Store message to clear input field
    const sentMessage = message
    setMessage("")
    
    // Show typing indicator
    setIsTyping(true)
    
    try {
      if (apiError) {
        // If we know the API is not working, simulate a response
        setTimeout(() => {
          setIsTyping(false) // Hide typing indicator
          setChatMessages((prev) => [
            ...prev,
            {
              sender: "bot",
              message:
              "I understand your question. This is a simulated response since the API is currently unavailable. In a real environment, you would receive a helpful answer from the server.",
            },
          ])
        }, 1000)
        return
      }
      
      // Call the chat API with problemId from URL params
      console.log("Sending message to API:", { problem_id: problemId, message: sentMessage })
      const response = await api.post("/chat/send", {
        problem_id: problemId, // Use problemId from URL params
        message: sentMessage,
      })
      
      console.log("API response:", response.data)
      
      // Hide typing indicator
      setIsTyping(false)
      
      // Add bot response to chat
      setChatMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          message: response.data.message,
        },
      ])
    } catch (error) {
      console.error("Error sending message:", error)
      
      // Hide typing indicator
      setIsTyping(false)
      
      // If it's a network error, mark API as unavailable for future requests
      if (error.message?.includes("Network Error") || error.code === "ERR_NETWORK") {
        setApiError(true)
      }
      
      // Handle authentication errors
      if (error.response?.status === 401) {
        setChatMessages((prev) => [
          ...prev,
          {
            sender: "bot",
            message: "Authentication error. Please log in to continue the conversation.",
          },
        ])
      } else {
        setChatMessages((prev) => [
          ...prev,
          {
            sender: "bot",
            message: "Sorry, I couldn't process your message. The server might be unavailable. Please try again later.",
          },
        ])
      }
    }
  }
  
  useEffect(() => {
    // Scroll to the bottom of the chat when new messages arrive
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: "smooth",
      })
    }
  }, [chatMessages])
  
  // Check if user is authenticated
  const isAuthenticated = !!localStorage.getItem("token")
  
  if (!problem) return <Typography>Loading problem {problemId}...</Typography>
  
  const statistics = [
    { label: "XP", value: problem.xp },
    { label: "Topics", value: Array.isArray(problem.tags?.topics) ? problem.tags.topics.join(", ") : "N/A" },
    { label: "Target", value: problem.tags?.target || "N/A" },
  ]
  
  return (
    <Box sx={{ padding: 3, maxWidth: 1200, margin: "0 auto" }}>
    <style>{poppinsFontStyle}</style>
    <style>{typingAnimationStyle}</style>
    {/* Main content */}
    <Box sx={{ display: "flex", gap: 3, marginTop: "100px", marginBottom: "60px" }}>
    <Card sx={{ flex: 1 }}>
    <CardContent>
    <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold" }}>
    {problem.title}
    </Typography>
    <Typography variant="subtitle1" gutterBottom>
    <Box component="span" sx={{ display: "inline-flex", gap: 1, ml: 1 }}>
    {Array.isArray(problem.tags?.topics) &&
      problem.tags.topics.map((tag) => (
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
      
      <ReactMarkdown
      children={problem.description}
      remarkPlugins={[remarkMath]}
      rehypePlugins={[rehypeKatex]}
      sx={{ fontSize: "16px", fontFamily: "'Poppins', sans-serif" }}
      ></ReactMarkdown>
      
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
      <Button
      fullWidth
      variant="contained"
      type="submit"
      sx={{ bgcolor: "#1976d2", textTransform: "uppercase", py: 1.5 }}
      disabled={isSubmitting} // Disable while waiting
      >
      {isSubmitting ? <CircularProgress size={24} sx={{ color: "white" }} /> : "SUBMIT"}
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
      
      {/* Help Button with Star Icons */}
      <Button
      onClick={handleOpen}
      sx={{
        position: "fixed",
        bottom: 16,
        right: 16,
        zIndex: 10,
        height: 64,
        width: "auto", // Adjust width based on content
        minWidth: 120, // Ensure enough space
        borderRadius: "30px",
        paddingX: 2, // Add some padding
        boxShadow: 3,
        transition: "transform 0.2s ease-in-out",
        background: "linear-gradient(135deg, #82095B 0%,#c40464 100%)",
        "&:hover": {
          transform: "scale(1.05)",
          boxShadow: 5,
          background: "linear-gradient(135deg, #6a094b 0%, rgb(188, 3, 96) 100%)",
        },
      }}
      >
      <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "white" }}>
      <AutoAwesomeIcon sx={{ fontSize: 24 }} />
      <span style={{ fontSize: "16px", fontWeight: "500" }}>Chat</span>
      </div>
      </Button>
      
      {/* Chat Dialog */}
      <Dialog fullScreen open={open} onClose={handleClose}>
      <Box sx={{ height: "100%", width: "100vw", display: "flex", overflow: "hidden" }}>
      {/* Close Icon Button */}
      <IconButton
      onClick={handleClose}
      sx={{
        position: "absolute",
        right: 8,
        top: 8,
        zIndex: 1,
        color: "#333",
        bgcolor: "rgba(255, 255, 255, 0.8)",
        "&:hover": {
          bgcolor: "rgba(255, 255, 255, 0.9)",
        },
      }}
      aria-label="close"
      >
      <CloseIcon />
      </IconButton>
      
      {/* Left Panel - Problem */}
      <Box
      sx={{
        width: "50%",
        backgroundColor: "#ffffff",
        padding: "30px",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        overflowY: "auto",
      }}
      >
      <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold", mb: 2, marginTop: "100px" }}>
      {problem.title}
      </Typography>
      
      <Box sx={{ display: "flex", gap: 1, mb: 4 }}>
      {Array.isArray(problem.tags?.topics) &&
        problem.tags.topics.map((tag) => (
          <Chip
          key={tag}
          label={tag}
          sx={{
            borderRadius: "16px",
            fontSize: "14px",
            color: "white",
            backgroundColor: "#007FFF",
          }}
          />
        ))}
        </Box>
        
        <Typography variant="h5" sx={{ mb: 2 }}>
        Problem Statement
        </Typography>
        
        <Box sx={{ mb: 4, fontFamily: "'Poppins', sans-serif" }}> 
        <ReactMarkdown
        children={problem.description}
        remarkPlugins={[remarkMath]}
        rehypePlugins={[rehypeKatex]}
        components={{
          p: ({ children }) => (
            <p style={{ fontSize: "16px", fontFamily: "'Poppins', sans-serif", lineHeight: "1.5" }}>
            {children}
            </p>
          ),
        }}
        />
        </Box>
        
        <Typography variant="h5" sx={{ mb: 2 }}>
        Submit Answer
        </Typography>
        
        <Box component="form" onSubmit={handleSubmit} sx={{ width: "100%" }}>
        <TextField
        fullWidth
        placeholder="Enter your answer here..."
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        sx={{ mb: 2 }}
        multiline
        rows={4}
        />
        <Button
        fullWidth
        variant="contained"
        type="submit"
        sx={{
          bgcolor: "#1976d2",
          textTransform: "uppercase",
          py: 1.5,
        }}
        >
        SUBMIT
        </Button>
        </Box>
        </Box>
        
        {/* Right Panel - Chat */}
        <Box
        sx={{
          width: "50%",
          background: "linear-gradient(135deg, #1976d2, #64b5f6)",
          display: "flex",
          flexDirection: "column",
          height: "100vh",
          color: "#ffffff",
        }}
        className="chat-interface"
        >
        <Typography
        variant="h4"
        sx={{
          p: 2,
          borderBottom: 1,
          borderColor: "rgba(255, 255, 255, 0.3)",
          color: "#ffffff",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
        >
        <Box sx={{ display: "flex", alignItems: "center" }}>
        <Box sx={{ display: "flex", mr: 1 }}></Box>
        Welcome to ChatBot
        </Box>
        <Box>
        {!isAuthenticated && (
          <Chip
          label="Not Logged In"
          size="small"
          sx={{
            mr: 1,
            bgcolor: "rgba(255, 200, 200, 0.3)",
            color: "white",
          }}
          />
        )}
        {apiError && (
          <Chip
          label="Offline Mode"
          size="small"
          sx={{
            bgcolor: "rgba(255, 255, 255, 0.2)",
            color: "white",
          }}
          />
        )}
        </Box>
        </Typography>
        
        {/* Chat Messages Container - Scrollable */}
        <Box
        ref={chatContainerRef}
        sx={{
          flex: 1,
          overflowY: "auto",
          p: 2,
          display: "flex",
          flexDirection: "column",
          gap: 2,
          mb: 4, // Ensure no extra margin at the bottom
        }}
        >
        {loadingChat ? (
          <Box sx={{ display: "flex", justifyContent: "center", my: 4 }}>
          <CircularProgress sx={{ color: "white" }} />
          </Box>
        ) : chatMessages.length === 0 ? (
          <Box sx={{ textAlign: "center", my: 4 }}>
          <Typography>No messages yet. Start a conversation!</Typography>
          </Box>
        ) : (
          chatMessages.map((msg, index) => (
            <Box
            key={index}
            sx={{
              display: "flex",
              justifyContent: msg.sender === "user" ? "flex-end" : "flex-start",
              width: "100%",
            }}
            >
            <Paper
            elevation={1}
            sx={{
              p: 2,
              bgcolor: msg.sender === "user" ? "rgba(255, 255, 255, 0.9)" : "rgba(230, 240, 255, 0.9)",
              color: "#333",
              maxWidth: "80%",
              borderRadius: msg.sender === "user" ? "20px 20px 5px 20px" : "20px 20px 20px 5px",
            }}
            >
            <ReactMarkdown
            components={{
              math: ({ value }) => <BlockMath math={value} />,
              inlineMath: ({ value }) => <InlineMath math={value} />,
              p: ({ children }) => (
                <p
                style={{
                  fontSize: "16px",
                  fontFamily: "'Poppins', sans-serif",
                  lineHeight: "1.5",
                }}
                >
                {children}
                </p>
              ),
            }}
            remarkPlugins={[remarkMath]}
            rehypePlugins={[rehypeKatex]}
            >
            {msg.message}
            </ReactMarkdown>
            </Paper>
            </Box>
          ))
        )}
        {isTyping && (
          <Box
          sx={{
            display: "flex",
            justifyContent: "flex-start",
            width: "100%",
            mb: 1,
          }}
          >
          <Paper
          elevation={1}
          sx={{
            p: 2,
            bgcolor: "rgba(230, 240, 255, 0.9)",
            color: "#333",
            maxWidth: "80%",
            borderRadius: "20px 20px 20px 5px",
          }}
          >
          <Box sx={{ display: "flex", alignItems: "center" }}>
          <span className="typing-dot" style={{ animationDelay: "0s" }}></span>
          <span className="typing-dot" style={{ animationDelay: "0.2s" }}></span>
          <span className="typing-dot" style={{ animationDelay: "0.4s" }}></span>
          </Box>
          </Paper>
          </Box>
        )}
        </Box>
        
        {/* Message Input - Fixed at bottom */}
        <Box
        component="form"
        onSubmit={handleSendMessage}
        sx={{
          p: 2,
          borderTop: 1,
          borderColor: "rgba(255, 255, 255, 0.3)",
          bgcolor: "rgba(255, 255, 255, 0.2)",
          display: "flex",
          gap: 1,
          mb: 2,
        }}
        >
        <TextField
        fullWidth
        placeholder="Write here..."
        size="small"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        sx={{
          "& .MuiOutlinedInput-root": {
            bgcolor: "rgba(255, 255, 255, 0.9)",
            fontFamily: "'Poppins', sans-serif",
          },
          "& .MuiOutlinedInput-input": {
            fontFamily: "'Poppins', sans-serif",
          },
        }}
        />
        <IconButton type="submit" disabled={!message.trim()} sx={{ color: "#ffffff" }}>
        <SendIcon />
        </IconButton>
        </Box>
        </Box>
        </Box>
        </Dialog>
        
        {/* Modal for submission feedback */}
        <Modal open={modalOpen} onClose={handleModalClose}>
        <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          textAlign: "center",
        }}
        >
        <Typography variant="h6" sx={{ mb: 2 }}>
        {modalContent}
        </Typography>
        <Button variant="contained" onClick={handleModalClose}>
        OK
        </Button>
        </Box>
        </Modal>
        <style jsx global>{`
        .chat-interface {
          font-family: 'Poppins', sans-serif;
        }
      `}</style>
          </Box>
        )
      }
      
      export default ProblemView
      
