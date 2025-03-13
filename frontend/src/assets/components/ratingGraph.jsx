"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, Typography, CircularProgress, Box } from "@mui/material"
import { styled } from "@mui/material/styles"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { format } from "date-fns"

// Styled components
const StyledCard = styled(Card)(({ theme }) => ({
    width: "100%",
    height: "500px",
    display: "flex",
    flexDirection: "column",
    boxShadow: "none", // Remove box-shadow
  }));
  

  const ChartContainer = styled(Box)({
    flex: 1,
    width: "90%", // Reduce the width to add blank space on both sides
    margin: "0 auto", // Center the chart horizontally
    height: "400px",
  });
  

const CustomTooltip = styled(({ className, payload, label, active }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload
    return (
      <Card className={className}>
        <CardContent>
          <Typography variant="body2">Date: {data.date}</Typography>
          <Typography variant="body2">Rating: {data.rating}</Typography>
          {data.contestId && <Typography variant="body2">Contest ID: {data.contestId}</Typography>}
          <Typography
            variant="body2"
            color={data.change > 0 ? "success.main" : data.change < 0 ? "error.main" : "text.primary"}
          >
            Change: {data.change > 0 ? `+${data.change}` : data.change}
          </Typography>
        </CardContent>
      </Card>
    )
  }
  return null
})(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  border: `1px solid ${theme.palette.divider}`,
  padding: theme.spacing(1),
  borderRadius: theme.shape.borderRadius,
}))

export default function MuiRatingHistoryChart() {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [chartData, setChartData] = useState([])
  const [user, setUser] = useState(null)

  useEffect(() => {
    const fetchRatingHistory = async () => {
      try {
        setLoading(true)

        // Try to fetch from the API
        try {
          const response = await fetch("http://127.0.0.1:8000/api/user/rating/history/id", {
            method: "GET",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            // Include credentials if your API requires authentication
            // credentials: 'include',
          })

          if (response.ok) {
            const data = await response.json()
            setUser(data.user)
            processRatingsData(data.ratings)
            return
          }
        } catch (fetchError) {
          console.error("API fetch error:", fetchError)
          // Continue to fallback data if fetch fails
        }

        // Fallback data for development/testing when API is unavailable
        console.warn("Using fallback data since API is unavailable")
        const fallbackData = {
          user: {
            id: 1,
            username: "sakhadib",
            email: "sakhadib@gmail.com",
          },
          ratings: [
            { id: 1, contest_id: null, rating_change: 1500, created_at: "2025-03-08T14:11:59.000000Z" },
            { id: 2, contest_id: 1, rating_change: 25, created_at: "2025-03-09T15:20:00.000000Z" },
            { id: 3, contest_id: 2, rating_change: -10, created_at: "2025-03-10T18:30:00.000000Z" },
            { id: 4, contest_id: 3, rating_change: 15, created_at: "2025-03-12T14:00:00.000000Z" },
            { id: 5, contest_id: 4, rating_change: 30, created_at: "2025-03-15T09:45:00.000000Z" },
            { id: 10, contest_id: 5, rating_change: -3, created_at: "2025-03-18T08:19:43.000000Z" },
          ],
        }

        setUser(fallbackData.user)
        processRatingsData(fallbackData.ratings)
      } catch (err) {
        setError("Error processing rating data: " + err.message)
        console.error("Error in rating history component:", err)
      } finally {
        setLoading(false)
      }
    }

    const processRatingsData = (ratings) => {
      const sortedRatings = [...ratings].sort((a, b) => new Date(a.created_at) - new Date(b.created_at))

      let currentRating = 0
      const processedData = sortedRatings.map((rating, index) => {
        if (index === 0 && rating.rating_change > 100) {
          currentRating = rating.rating_change
        } else {
          currentRating += rating.rating_change
        }

        return {
          date: format(new Date(rating.created_at), "MMM dd, yyyy"),
          timestamp: new Date(rating.created_at).getTime(),
          rating: currentRating,
          change: rating.rating_change,
          contestId: rating.contest_id,
        }
      })

      setChartData(processedData)
    }

    fetchRatingHistory()
  }, [])

  if (loading) {
    return (
      <StyledCard>
        <Box display="flex" justifyContent="center" alignItems="center" height="100%">
          <CircularProgress />
        </Box>
      </StyledCard>
    )
  }

  if (error) {
    return (
      <StyledCard>
        <Box display="flex" justifyContent="center" alignItems="center" height="100%">
          <Typography color="error">{error}</Typography>
        </Box>
      </StyledCard>
    )
  }

  return (
    <StyledCard>
      <CardHeader
  title={`Rating History for ${user?.username || "User"}`}
  titleTypographyProps={{
    variant: "h4",
    sx: {
      fontWeight: "bold", // Apply bold font weight directly to the title
    },
  }}
  sx={{
    marginLeft: "70px", // Add left margin
    color: "#8d256f",
  }}
/>

      <CardContent sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <ChartContainer>
        <ResponsiveContainer width="100%" height="100%">
  <LineChart
    data={chartData}
    margin={{ top: 10, right: 30, left: 0, bottom: 30 }}
    style={{ backgroundColor: "#f0f0f0" }} // Background color added here
  >
    <CartesianGrid strokeDasharray="3 3" vertical={false} />
    <XAxis 
      dataKey="date" 
      tickMargin={10} 
      tickFormatter={(value) => format(new Date(value), "MMM dd")} 
    />
    <YAxis domain={["dataMin - 100", "dataMax + 100"]} tickMargin={10} />
    <Tooltip content={<CustomTooltip />} />
    <Line
      type="monotone"
      dataKey="rating"
      stroke="#8884d8"
      strokeWidth={2}
      dot={{ r: 4, strokeWidth: 2, fill: "#fff" }}
      activeDot={{ r: 6, strokeWidth: 2, fill: "#fff" }}
    />
  </LineChart>
</ResponsiveContainer>


        </ChartContainer>
      </CardContent>
    </StyledCard>
  )
}

