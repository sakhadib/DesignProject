"use client"

import { useState, useEffect } from "react"
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
} from "@mui/material"
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown"
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp"
import api from "../../api"

const Row = ({ problem, handleSelectProblem }) => {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [problemDetails, setProblemDetails] = useState(null)

  const fetchProblemDetails = async () => {
    if (!open) {
      setLoading(true)
      try {
        const response = await api.get(`/problem/single/${problem.id}`)
        setProblemDetails(response.data.problem)
      } catch (error) {
        console.error("Error fetching problem details:", error)
      } finally {
        setLoading(false)
      }
    }
  }

  const handleToggle = () => {
    if (!open && !problemDetails) {
      fetchProblemDetails()
    }
    setOpen(!open)
  }

  return (
    <>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={handleToggle}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell>{problem.id}</TableCell>
        <TableCell>{problem.title}</TableCell>
        <TableCell>
          {problem.tags.topics.map((tag, index) => (
            <Chip key={index} label={tag} size="small" sx={{ mr: 0.5, mb: 0.5 }} />
          ))}
        </TableCell>
        <TableCell>{problem.xp || "N/A"}</TableCell>
        <TableCell align="right">
          <Button size="small" variant="outlined" onClick={() => handleSelectProblem(problem)}>
            Add
          </Button>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              {loading ? (
                <Box sx={{ display: "flex", justifyContent: "center", py: 2 }}>
                  <CircularProgress size={24} />
                </Box>
              ) : (
                <Typography variant="body2" sx={{ whiteSpace: "pre-wrap", mb: 2 }}>
                  {problemDetails?.description || "No description available."}
                </Typography>
              )}
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  )
}

export default function CreateContest() {
  const [formData, setFormData] = useState({
    title: "",
    startTime: "",
    endTime: "",
    description: "",
    password: "",
  })

  const [problems, setProblems] = useState([])
  const [allProblems, setAllProblems] = useState([])
  const [loading, setLoading] = useState(false)
  const [problemDialogOpen, setProblemDialogOpen] = useState(false)
  const [addedProblems, setAddedProblems] = useState(new Set())
  const [searchTerm, setSearchTerm] = useState("")

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const handleAddProblem = () => {
    setProblemDialogOpen(true)
    setSearchTerm("")
    if (allProblems.length === 0) {
      setLoading(true)
      api
        .get("/problem/all/")
        .then((response) => {
          console.log("API Response:", response.data)
          const problemsData = Array.isArray(response.data.problems) ? response.data.problems : []
          setAllProblems(
            problemsData.map((problem) => ({
              ...problem,
              isVisible: true,
            })),
          )
        })
        .catch((error) => {
          console.error("Error fetching problems:", error)
          setAllProblems([])
        })
        .finally(() => setLoading(false))
    } else {
      setAllProblems((prevProblems) => prevProblems.map((problem) => ({ ...problem, isVisible: true })))
    }
  }

  const handleCloseDialog = () => {
    setProblemDialogOpen(false)
  }

  const handleSelectProblem = (problem) => {
    if (!addedProblems.has(problem.id)) {
      setProblems((prev) => [...prev, { ...problem, xp: problem.xp || "N/A" }])
      setAddedProblems((prev) => new Set(prev).add(problem.id))
    }
  }

  const handleRemoveProblem = (id) => {
    setProblems(problems.filter((problem) => problem.id !== id))
    setAddedProblems((prev) => {
      const newSet = new Set(prev)
      newSet.delete(id)
      return newSet
    })
  }

  const handleStartContest = () => {
    if (problems.length > 0 && formData.title && formData.startTime && formData.endTime && formData.description) {
      const contestPayload = {
        title: formData.title,
        description: formData.description,
        start_time: formData.startTime,
        end_time: formData.endTime,
        password: formData.password,
      }

      setLoading(true)
      api
        .post("/contest/create/", contestPayload)
        .then((response) => {
          console.log("API Response:", response.data)

          if (response.data.message === "Contest created successfully") {
            alert("Contest created successfully!")
          } else {
            alert("Failed to create contest.")
          }
        })
        .catch((error) => {
          console.error("Error creating contest:", error)
          alert("An error occurred while creating the contest.")
        })
        .finally(() => setLoading(false))
    } else {
      alert("Please make sure all required fields are filled and problems are selected.")
    }
  }

  const handleSearch = (term) => {
    setAllProblems((prevProblems) =>
      prevProblems.map((problem) => ({
        ...problem,
        isVisible:
          problem.title.toLowerCase().includes(term.toLowerCase()) ||
          problem.tags.topics.some((tag) => tag.toLowerCase().includes(term.toLowerCase())),
      })),
    )
  }

  useEffect(() => {
    setAllProblems((prevAllProblems) =>
      prevAllProblems.map((problem) => ({
        ...problem,
        isAdded: addedProblems.has(problem.id),
      })),
    )
  }, [addedProblems])

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography
        variant="h4"
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

        <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
          <Typography sx={{ width: "120px" }}>Password (Optional)</Typography>
          <TextField
            fullWidth
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            variant="outlined"
            size="small"
            type="password"
            helperText="Enter a password to make the contest private"
          />
        </Box>

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

          <TableContainer component={Paper} sx={{ mt: 3 }}>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: "#1E90FF" }}>
                  <TableCell sx={{ color: "white", fontWeight: "bold" }}>ID</TableCell>
                  <TableCell sx={{ color: "white", fontWeight: "bold" }}>Problem Title</TableCell>
                  <TableCell sx={{ color: "white", fontWeight: "bold" }}>Tags</TableCell>
                  <TableCell sx={{ color: "white", fontWeight: "bold" }}>XP</TableCell>
                  <TableCell align="right" sx={{ color: "white", fontWeight: "bold" }}>
                    Actions
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {problems.length > 0 ? (
                  problems.map((problem, index) => (
                    <TableRow key={problem.id} sx={{ backgroundColor: index % 2 === 0 ? "white" : "grey.100" }}>
                      <TableCell>{problem.id}</TableCell>
                      <TableCell>{problem.title}</TableCell>
                      <TableCell>
                        {problem.tags.topics.map((tag, index) => (
                          <Chip key={index} label={tag} size="small" sx={{ mr: 0.5, mb: 0.5 }} />
                        ))}
                      </TableCell>
                      <TableCell>{problem.xp || "N/A"}</TableCell>
                      <TableCell align="right">
                        <Button size="small" color="error" onClick={() => handleRemoveProblem(problem.id)}>
                          Remove
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} align="center">
                      No problems selected.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>

        {problems.length > 0 && (
          <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3, mb: 5 }}>
            <Button variant="contained" color="primary" onClick={handleStartContest} sx={{ width: "200px", mb: 2 }}>
              Start Contest
            </Button>
          </Box>
        )}
      </Box>

      <Dialog open={problemDialogOpen} onClose={handleCloseDialog} fullWidth maxWidth="md">
        <DialogTitle>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Typography variant="h6">Select Problems</Typography>
            <TextField
              size="small"
              placeholder="Search problems..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value)
                handleSearch(e.target.value)
              }}
              sx={{ width: "50%" }}
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
                    <TableCell />
                    <TableCell>ID</TableCell>
                    <TableCell>Problem Title</TableCell>
                    <TableCell>Tags</TableCell>
                    <TableCell>XP</TableCell>
                    <TableCell align="right">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {Array.isArray(allProblems) &&
                    allProblems
                      .filter((problem) => !addedProblems.has(problem.id) && (problem.isVisible ?? true))
                      .map((problem) => (
                        <Row key={problem.id} problem={problem} handleSelectProblem={handleSelectProblem} />
                      ))}
                  {allProblems.filter((problem) => !addedProblems.has(problem.id) && (problem.isVisible ?? true))
                    .length === 0 && (
                    <TableRow>
                      <TableCell colSpan={6} align="center">
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
  )
}

