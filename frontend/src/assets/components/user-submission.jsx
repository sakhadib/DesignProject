"use client"

import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Box,
  CircularProgress,
  Chip,
  TablePagination,
  Button,
  useTheme,
  alpha,
} from "@mui/material"
import { format } from "date-fns"

const UserSubmissions = () => {
  const [submissions, setSubmissions] = useState([])
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const { id } = useParams()
  const theme = useTheme()

  useEffect(() => {
    const fetchUserSubmissions = async () => {
      try {
        setLoading(true)
        const response = await fetch(`http://127.0.0.1:8000/api/user/submission/mini/${id}`)

        if (!response.ok) {
          throw new Error("Failed to fetch user submissions")
        }

        const data = await response.json()
        setUser(data.user)
        setSubmissions(data.submissions || [])
        setLoading(false)
      } catch (err) {
        setError(err.message)
        setLoading(false)
      }
    }

    fetchUserSubmissions()
  }, [id])

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(Number.parseInt(event.target.value, 10))
    setPage(0)
  }

  const formatDate = (dateString) => {
    try {
      return format(new Date(dateString), "MMM dd, yyyy")
    } catch (e) {
      return dateString
    }
  }

  const getStatusChip = (status) => {
    let color = "default"

    switch (status?.toLowerCase()) {
      case "accepted":
        color = "success"
        break
      case "rejected":
        color = "error"
        break
      case "pending":
        color = "warning"
        break
      case "submitted":
        color = "info"
        break
      default:
        color = "default"
    }

    return <Chip label={status || "Unknown"} color={color} size="small" variant="filled" />
  }

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="300px">
        <CircularProgress />
      </Box>
    )
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="300px">
        <Typography color="error">{error}</Typography>
      </Box>
    )
  }

  return (
    <>
      {user && (
        <Box mb={4} ml={{ xs: 2, md: 10 }}>
          <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold", color: "#8d256f" }}>
            {user.username}'s Submissions
          </Typography>
          <Typography variant="body1" color="text.secondary" gutterBottom>
            Viewing all submission records
          </Typography>
        </Box>
      )}

      <Paper
        elevation={3}
        sx={{
          width: "90%",
          overflow: "hidden",
          borderRadius: 2,
          mb: 4,
          ml: { xs: 2, md: 10 },
        }}
      >
        {/* Responsive Table Wrapper */}
        <Box sx={{ overflowX: "auto" }}>
          <TableContainer sx={{ minWidth: 600, maxHeight: 440 }}>
            <Table stickyHeader aria-label="submissions table">
              <TableHead>
                <TableRow>
                  {["ID", "Title", "Status", "Submitted On", "Score"].map((heading, index) => (
                    <TableCell
                      key={index}
                      sx={{
                        fontWeight: "bold",
                        backgroundColor: theme.palette.primary.main,
                        color: theme.palette.primary.contrastText,
                        whiteSpace: "nowrap",
                      }}
                    >
                      {heading}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {submissions.length > 0 ? (
                  submissions.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((submission) => (
                    <TableRow
                      hover
                      key={submission.id}
                      sx={{
                        "&:nth-of-type(odd)": { backgroundColor: alpha(theme.palette.primary.light, 0.05) },
                        "&:last-child td, &:last-child th": { border: 0 },
                        transition: "background-color 0.2s",
                        "&:hover": { backgroundColor: alpha(theme.palette.primary.light, 0.1) },
                      }}
                    >
                      <TableCell sx={{ whiteSpace: "nowrap" }}>{submission.id}</TableCell>
                      <TableCell align="left" sx={{ whiteSpace: "nowrap" }}>
                        <Typography variant="body2" fontWeight="medium">
                          {submission.title || "Untitled Submission"}
                        </Typography>
                      </TableCell>
                      <TableCell>{getStatusChip(submission.status)}</TableCell>
                      <TableCell sx={{ whiteSpace: "nowrap" }}>
                        {formatDate(submission.created_at || submission.submitted_at)}
                      </TableCell>
                      <TableCell>
                        <Typography
                          variant="body2"
                          fontWeight="medium"
                          color={
                            submission.score > 80
                              ? "success.main"
                              : submission.score > 60
                              ? "info.main"
                              : submission.score > 40
                              ? "warning.main"
                              : "error.main"
                          }
                        >
                          {submission.score !== undefined ? `${submission.score}%` : "N/A"}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} align="center">
                      <Typography variant="body1" py={3}>
                        No submissions found for this user.
                      </Typography>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>

        {submissions.length > 0 && (
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={submissions.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        )}
      </Paper>

      {/* View All Button */}
      <Box sx={{ display: "flex", justifyContent: "flex-end", mr: { xs: 2, md: 10 }, mb: 3 }}>
        <Button variant="contained" color="primary" mr={8}>
          View All
        </Button>
      </Box>
    </>
  )
}

export default UserSubmissions
