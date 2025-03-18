"use client"

import { useState, useEffect } from "react"
import axios from "../../api"
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
  Avatar,
  Container,
} from "@mui/material"
import { styled } from "@mui/material/styles"

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  "&.MuiTableCell-head": {
    backgroundColor: "#6b21a8", // Deep purple color
    color: theme.palette.common.white,
    fontWeight: "bold",
    fontSize: "1rem",
    padding: "16px 24px",
  },
}))

const StyledTableRow = styled(TableRow)(({ theme, rank }) => ({
  position: "relative",
  backgroundColor: rank <= 3 ? "rgba(107, 33, 168, 0.04)" : "transparent",
  "&:hover": {
    backgroundColor: "rgba(107, 33, 168, 0.08) !important",
  },
  "& td": {
    padding: "16px 24px",
    fontSize: "1rem",
  },
}))

const RankBadge = styled(Box)(({ rank }) => ({
  width: "32px",
  height: "32px",
  borderRadius: "50%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontWeight: "bold",
  color: "#fff",
  backgroundColor:
    rank === 1
      ? "#fbbf24" // Gold
      : rank === 2
        ? "#94a3b8" // Silver
        : rank === 3
          ? "#d97706" // Bronze
          : "#6b21a8", // Default purple
}))

const StyledAvatar = styled(Avatar)(({ rank }) => ({
  width: 40,
  height: 40,
  marginRight: 16,
  border: rank <= 3 ? "2px solid" : "none",
  borderColor: rank === 1 ? "#fbbf24" : rank === 2 ? "#94a3b8" : rank === 3 ? "#d97706" : "transparent",
}))

export default function Leaderboard() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        setLoading(true)
        const response = await axios.get("/rating/total")
        setUsers(response.data.users)
        setLoading(false)
      } catch (err) {
        setError(err.message)
        setLoading(false)
      }
    }

    fetchLeaderboard()
  }, [])

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "60vh" }}>
        <CircularProgress sx={{ color: "#6b21a8" }} size={48} />
      </Box>
    )
  }

  if (error) {
    return (
      <Typography color="error" variant="h6" sx={{ textAlign: "center", my: 8 }}>
        Error: {error}
      </Typography>
    )
  }

  return (
    <Container maxWidth="xl" sx={{ py: 6 }}>
      <Box sx={{ mb: 6, textAlign: "center" }}>
        <Typography
          variant="h3"
          sx={{
            color: "#6b21a8",
            fontWeight: 700,
            mb: 2,
          }}
        >
          Global Leaderboard
        </Typography>
        <Typography variant="subtitle1" sx={{ color: "text.secondary" }}>
          Top performers ranked by rating
        </Typography>
      </Box>

      <TableContainer
        component={Paper}
        sx={{
          boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
          borderRadius: 2,
          overflow: "hidden",
        }}
      >
        <Table sx={{ minWidth: 1000}}>
          <TableHead>
            <TableRow>
              <StyledTableCell>Rank</StyledTableCell>
              <StyledTableCell>Player</StyledTableCell>
              <StyledTableCell align="right">Rating</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user, index) => (
              <StyledTableRow key={user.id} rank={index + 1}>
                <TableCell>
                  <RankBadge rank={index + 1}>{index + 1}</RankBadge>
                </TableCell>
                <TableCell>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <StyledAvatar rank={index + 1}>{user.username.charAt(0).toUpperCase()}</StyledAvatar>
                    <Box>
                      <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                        {user.username}
                      </Typography>
                      {index < 3 && (
                        <Typography variant="caption" sx={{ color: "text.secondary" }}>
                          {index === 0 ? "🏆 Champion" : index === 1 ? "🥈 Runner-up" : "🥉 Third Place"}
                        </Typography>
                      )}
                    </Box>
                  </Box>
                </TableCell>
                <TableCell
                  align="right"
                  sx={{
                    fontWeight: 600,
                    color: index < 3 ? "#6b21a8" : "inherit",
                  }}
                >
                  {user.rating.toLocaleString()}
                </TableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  )
}

