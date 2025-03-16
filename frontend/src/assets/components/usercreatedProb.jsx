"use client"

import { useState, useEffect } from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
  Chip,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  CircularProgress,
  Pagination,
} from "@mui/material"

export default function ProblemTable() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [targetFilter, setTargetFilter] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [page, setPage] = useState(1)
  const rowsPerPage = 10

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)

        // Extract user ID from URL
        const urlParams = new URLSearchParams(window.location.search)
        const userId = urlParams.get("userId") || window.location.pathname.split("/").pop()

        if (!userId) {
          throw new Error("User ID not found in URL")
        }

        const response = await fetch(`http://127.0.0.1:8000/api/user/problem/all/${userId}`)

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`)
        }

        const result = await response.json()
        setData(result)
        setLoading(false)
      } catch (err) {
        setError(err.message)
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  // Filter problems based on target and search query
  const filteredProblems =
    data?.problems?.filter((problem) => {
      const matchesTarget = targetFilter === "all" || problem.tags.target === targetFilter
      const matchesSearch =
        problem.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        problem.tags.topics.some((topic) => topic.toLowerCase().includes(searchQuery.toLowerCase()))

      return matchesTarget && matchesSearch
    }) || []

  // Get unique target values for filter dropdown
  const targetOptions = data?.problems
    ? ["all", ...new Set(data.problems.map((problem) => problem.tags.target))]
    : ["all"]

  // Pagination
  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const paginatedProblems = filteredProblems.slice((page - 1) * rowsPerPage, (page - 1) * rowsPerPage + rowsPerPage)

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "50vh" }}>
        <CircularProgress />
      </Box>
    )
  }

  if (error) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography color="error" variant="h6">
          Error: {error}
        </Typography>
        <Typography>Please check if the API server is running at http://127.0.0.1:8000</Typography>
      </Box>
    )
  }

  return (
    <Box sx={{ width: "100%", p: 2 }}>
      {data?.user && (
        <Box sx={{ mb: 3 }}>
          <Typography variant="h5" gutterBottom>
            Problems for {data.user.username}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            User ID: {data.user.id} | Email: {data.user.email}
          </Typography>
        </Box>
      )}

      <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
        <FormControl sx={{ minWidth: 150 }}>
          <InputLabel id="target-filter-label">Target Level</InputLabel>
          <Select
            labelId="target-filter-label"
            value={targetFilter}
            label="Target Level"
            onChange={(e) => {
              setTargetFilter(e.target.value)
              setPage(1)
            }}
          >
            {targetOptions.map((option) => (
              <MenuItem key={option} value={option}>
                {option === "all" ? "All Levels" : option}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          label="Search problems or topics"
          variant="outlined"
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value)
            setPage(1)
          }}
          sx={{ flexGrow: 1 }}
        />
      </Box>

      <TableContainer component={Paper} sx={{ mb: 2 }}>
        <Table sx={{ minWidth: 650 }} aria-label="problems table">
          <TableHead>
            <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
              <TableCell>ID</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Target</TableCell>
              <TableCell>Topics</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Contest ID</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedProblems.length > 0 ? (
              paginatedProblems.map((problem) => (
                <TableRow key={problem.id} hover>
                  <TableCell>{problem.id}</TableCell>
                  <TableCell>{problem.title}</TableCell>
                  <TableCell>
                    <Chip
                      label={problem.tags.target}
                      color={
                        problem.tags.target === "v0"
                          ? "primary"
                          : problem.tags.target === "v1"
                            ? "secondary"
                            : problem.tags.target === "v2"
                              ? "success"
                              : problem.tags.target === "v3"
                                ? "info"
                                : problem.tags.target === "v4"
                                  ? "warning"
                                  : "error"
                      }
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                      {problem.tags.topics.map((topic, index) => (
                        <Chip key={index} label={topic} size="small" variant="outlined" />
                      ))}
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={problem.status}
                      color={problem.status === "published" ? "success" : "warning"}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>{problem.contest_id || "-"}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  <Typography variant="body1" sx={{ py: 2 }}>
                    No problems found matching your filters
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Typography variant="body2" color="text.secondary">
          Showing {paginatedProblems.length} of {filteredProblems.length} problems
        </Typography>
        <Pagination
          count={Math.ceil(filteredProblems.length / rowsPerPage)}
          page={page}
          onChange={handleChangePage}
          color="primary"
        />
      </Box>
    </Box>
  )
}

