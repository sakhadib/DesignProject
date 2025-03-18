"use client"

import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import axios from "../../api"
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
  Container,
} from "@mui/material"

const UserSubmissions = () => {
  const [problems, setProblems] = useState([])
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const { id } = useParams()
  const theme = useTheme()

  useEffect(() => {
    const fetchUserProblems = async () => {
      try {
        setLoading(true)
        const { data } = await axios.get(`/user/submission/mini/${id}`)

        setUser(data.user)
        setProblems(data.problems || [])
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchUserProblems()
  }, [id])

  const handleChangePage = (_, newPage) => setPage(newPage)
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
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
    <Container maxWidth="lg">
      {user && (
        <Box mb={4} ml={{ xs: 2, md: 0 }}>
          <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold", color: "#8d256f" }}>
            {user.username}'s Submissions
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Viewing all problems attempted by the user
          </Typography>
        </Box>
      )}

      <Paper
        elevation={3}
        sx={{
          width: "100%",
          overflow: "hidden",
          borderRadius: 2,
          mb: 4,
        }}
      >
        <TableContainer sx={{ minWidth: "100%", maxHeight: 440, overflowX: "auto", alignItems: "left" }}>
          <Table stickyHeader aria-label="problems table">
            <TableHead>
              <TableRow>
                {["ID", "Title", "Tags"].map((heading, index) => (
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
              {problems.length > 0 ? (
                problems.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((problem) => (
                  <TableRow
                    hover
                    key={problem.id}
                    sx={{
                      "&:nth-of-type(odd)": { backgroundColor: alpha(theme.palette.primary.light, 0.05) },
                      "&:hover": { backgroundColor: alpha(theme.palette.primary.light, 0.1) },
                    }}
                  >
                    <TableCell sx={{ whiteSpace: "nowrap" }}>{problem.id}</TableCell>
                    <TableCell sx={{ whiteSpace: "nowrap" }}>
                      <Typography
                        variant="body2"
                        fontWeight="medium"
                        component={Link}
                        to={`/problem/single/${problem.id}`}
                        sx={{
                          textDecoration: "none",
                          color: theme.palette.primary.main,
                          "&:hover": { textDecoration: "underline" },
                        }}
                      >
                        {problem.title}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      {problem.tags?.topics?.map((tag, index) => (
                        <Chip key={index} label={tag} color="primary" size="small" variant="outlined" sx={{ mr: 0.5 }} />
                      ))}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={3} align="center">
                    <Typography variant="body1" py={3}>
                      No problems found for this user.
                    </Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        {problems.length > 0 && (
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={problems.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        )}
      </Paper>

      <Box sx={{ display: "flex", justifyContent: "flex-end", mr: { xs: 2, md: 10 }, mb: 3 }}>
        {user?.id && (
          <Link to={`/user/submission/all/${user.id}`} style={{ textDecoration: "none" }}>
            <Button variant="contained" color="primary">
              View All
            </Button>
          </Link>
        )}
      </Box>
    </Container>
  )
}

export default UserSubmissions
