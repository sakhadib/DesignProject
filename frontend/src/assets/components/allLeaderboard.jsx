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
  CircularProgress,
  Container,
  Grid,
} from "@mui/material"
import { styled } from "@mui/material/styles"
import axios from "../../api";

const StyledTableCell = styled(TableCell)(({ theme, tableType }) => ({
  "&.MuiTableCell-head": {
    backgroundColor: tableType === "contribution" ? "#0f766e" : "#6b21a8",
    color: theme.palette.common.white,
    fontWeight: "bold",
    fontSize: "1rem",
    padding: "16px 24px",
  },
}))

const StyledTableRow = styled(TableRow)(({ rank, tableType }) => ({
  position: "relative",
  backgroundColor:
    rank <= 3
      ? tableType === "contribution"
        ? "rgba(15, 118, 110, 0.04)"
        : "rgba(107, 33, 168, 0.04)"
      : "transparent",
  "&:hover": {
    backgroundColor:
      tableType === "contribution" ? "rgba(15, 118, 110, 0.08) !important" : "rgba(107, 33, 168, 0.08) !important",
  },
  "& td": {
    padding: "16px 24px",
    fontSize: "1rem",
  },
}))

export default function Leaderboard() {
  const [ratingUsers, setRatingUsers] = useState([])
  const [contributionUsers, setContributionUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        setLoading(true)
        const response = await axios.get("/rating/total")

        const allUsers = response.data.users

        // Sort users by rating for the main leaderboard
        const sortedRatingUsers = [...allUsers].sort((a, b) => b.rating - a.rating)

        // Sort users by blog count (desc), then by createdAt (asc)
        const sortedContributionUsers = [...allUsers]
        .filter(user => user.blog_count && user.blog_count > 0) // ✅ Remove blogCount === 0 users
        .sort((a, b) => {
          const blogA = Number(a.blog_count)
          const blogB = Number(b.blog_count)

          if (blogA !== blogB) {
            return blogB - blogA // Higher blogCount first
          }
          return new Date(a.createdAt) - new Date(b.createdAt) // Older accounts first if blogCount is tied
        })

        setRatingUsers(sortedRatingUsers)
        setContributionUsers(sortedContributionUsers)
        setLoading(false)
      } catch (err) {
        setError(err.message)
        setLoading(false)
      }
    }

    fetchLeaderboard()
  }, [])

  return (
    <Container maxWidth="xl" sx={{ py: 6 }}>
      <Grid container spacing={4}>
        {/* Global Leaderboard - 70% Width */}
        <Grid item xs={12} md={8}> 
          <Box sx={{ mb: 4, textAlign: "center" }}>
            <Typography variant="h4" sx={{ color: "#6b21a8", fontWeight: 700, mb: 2 }}>
              Global Leaderboard
            </Typography>
            <Typography variant="subtitle1" sx={{ color: "text.secondary" }}>
              Top performers ranked by rating
            </Typography>
          </Box>

          {loading ? (
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "400px" }}>
              <CircularProgress sx={{ color: "#6b21a8" }} size={48} />
            </Box>
          ) : error ? (
            <Typography color="error" variant="h6" sx={{ textAlign: "center", my: 8 }}>
              Error: {error}
            </Typography>
          ) : (
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <StyledTableCell tableType="rating">Rank</StyledTableCell>
                    <StyledTableCell tableType="rating">User</StyledTableCell>
                    <StyledTableCell align="right" tableType="rating">
                      Rating
                    </StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {ratingUsers.map((user, index) => (
                    <StyledTableRow key={user.id} rank={index + 1} tableType="rating">
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{user.username}</TableCell>
                      <TableCell align="right">{user.rating.toLocaleString()}</TableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Grid>

        {/* Contribution Leaderboard - 30% Width */}
        <Grid item xs={12} md={4}> 
          <Box sx={{ mb: 4, textAlign: "center" }}>
            <Typography variant="h4" sx={{ color: "#0f766e", fontWeight: 700, mb: 2 }}>
              Contribution Board
            </Typography>
            <Typography variant="subtitle1" sx={{ color: "text.secondary" }}>
              Top contributors ranked by blog count 
            </Typography>
          </Box>

          {loading ? (
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "400px" }}>
              <CircularProgress sx={{ color: "#0f766e" }} size={48} />
            </Box>
          ) : (
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <StyledTableCell tableType="contribution">Rank</StyledTableCell>
                    <StyledTableCell tableType="contribution">Contributor</StyledTableCell>
                    <StyledTableCell align="right" tableType="contribution">
                      Blogs
                    </StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {contributionUsers.map((user, index) => (
                    <StyledTableRow key={user.id} rank={index + 1} tableType="contribution">
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{user.username}</TableCell>
                      <TableCell align="right">{user.blog_count || 0}</TableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Grid>
      </Grid>
    </Container>
  )
}
