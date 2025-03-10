"use client"

import { useState, useEffect, useRef } from "react"
import { Box, Typography, Paper, Tooltip, CircularProgress, useTheme, useMediaQuery } from "@mui/material"
import axios from "axios"

// Add this demo data constant at the top of the file, after the imports
const DEMO_DATA = {
  user: {
    id: 1,
    username: "demouser",
    email: "demo@example.com",
    email_verified_at: null,
    created_at: "2025-01-07T12:11:26.000000Z",
    updated_at: "2025-01-07T12:11:26.000000Z",
  },
  dateWiseSubmissionCount: {
    // Generate some random data for the past few months
    "2025-03-10": 8,
    "2025-03-09": 4,
    "2025-03-07": 2,
    "2025-03-04": 6,
    "2025-02-28": 3,
    "2025-02-25": 5,
    "2025-02-20": 7,
    "2025-02-14": 1,
    "2025-02-13": 2,
    "2025-02-12": 1,
    "2025-01-30": 4,
    "2025-01-25": 2,
    "2025-01-20": 3,
    "2025-01-15": 5,
    "2025-01-09": 1,
    "2025-01-05": 2,
    "2024-12-28": 3,
    "2024-12-20": 4,
    "2024-12-15": 6,
    "2024-12-10": 2,
    "2024-12-05": 1,
    "2024-11-30": 3,
    "2024-11-25": 5,
    "2024-11-20": 2,
    "2024-11-15": 4,
  },
}

// Define green color palette
const greenColors = {
  empty: "#ebedf0",
  level1: "#e6ffed",
  level2: "#acf2bd",
  level3: "#39d353",
  level4: "#26a641",
  level5: "#006d32",
}

const SubmissionHeatmap = () => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const theme = useTheme()
  const scrollRef = useRef(null)

  // Responsive breakpoints
  const isXsScreen = useMediaQuery(theme.breakpoints.down("sm"))
  const isMdScreen = useMediaQuery(theme.breakpoints.between("sm", "md"))

  // Adjust cell size based on screen size
  const cellSize = isXsScreen ? 10 : isMdScreen ? 12 : 14
  const dayLabelWidth = isXsScreen ? 20 : 30

  // Modify the useEffect hook to use demo data if the API fails
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/user/submission/heatmap/id")
        setData(response.data)
        setLoading(false)
      } catch (err) {
        console.warn("API request failed, using demo data instead:", err)
        setData(DEMO_DATA)
        setError(null) // Set error to null instead of showing a message
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const getColorIntensity = (count) => {
    if (!count) return greenColors.empty

    // Define color scale based on submission count using green colors
    if (count === 0) return greenColors.empty
    if (count <= 1) return greenColors.level1
    if (count <= 3) return greenColors.level2
    if (count <= 5) return greenColors.level3
    if (count <= 7) return greenColors.level4
    return greenColors.level5
  }

  const generateCalendarData = () => {
    if (!data) return []

    // Get current date and go back 1 year
    const endDate = new Date()
    const startDate = new Date()
    startDate.setFullYear(endDate.getFullYear() - 1)

    // Generate all dates between start and end
    const allDates = []
    const currentDate = new Date(startDate)

    while (currentDate <= endDate) {
      const dateStr = currentDate.toISOString().split("T")[0]
      allDates.push({
        date: dateStr,
        count: data.dateWiseSubmissionCount[dateStr] || 0,
      })
      currentDate.setDate(currentDate.getDate() + 1)
    }

    // Group by month and week for display
    const months = []
    let currentMonth = -1
    let currentWeek = []

    allDates.forEach((dateObj, index) => {
      const date = new Date(dateObj.date)
      const month = date.getMonth()
      const dayOfWeek = date.getDay()

      // Start a new month
      if (month !== currentMonth) {
        currentMonth = month
        months.push({
          name: date.toLocaleString("default", { month: isXsScreen ? "narrow" : "short" }),
          weeks: [],
        })
      }

      // Start a new week
      if (dayOfWeek === 0 || index === 0) {
        currentWeek = Array(7).fill(null)
        months[months.length - 1].weeks.push(currentWeek)
      }

      // Add date to current week
      currentWeek[dayOfWeek] = dateObj
    })

    return months
  }

  // Scroll to the right end of the calendar to show most recent data first on mobile
  useEffect(() => {
    if (scrollRef.current && isXsScreen) {
      setTimeout(() => {
        scrollRef.current.scrollLeft = scrollRef.current.scrollWidth
      }, 100)
    }
  }, [data, isXsScreen])

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="200px">
        <CircularProgress />
      </Box>
    )
  }

  const calendarData = generateCalendarData()

  return (
    <Paper elevation={2} sx={{ p: { xs: 2, sm: 3 }, borderRadius: 2 }}>
      <Typography variant="h6" gutterBottom>
        Submission Activity
      </Typography>

      {data && (
        <Box sx={{ mt: 2 }}>
          {/* Scrollable container for the entire calendar */}
          <Box
            ref={scrollRef}
            sx={{
              overflowX: "auto",
              WebkitOverflowScrolling: "touch", // For smooth scrolling on iOS
              pb: 1, // Add padding to show scrollbar
              "::-webkit-scrollbar": {
                height: "8px",
              },
              "::-webkit-scrollbar-thumb": {
                backgroundColor: "rgba(0,0,0,0.2)",
                borderRadius: "4px",
              },
            }}
          >
            <Box sx={{ minWidth: "max-content", display: "flex", flexDirection: "column" }}>
              {/* Month labels */}
              <Box sx={{ display: "flex", mb: 1 }}>
                <Box sx={{ width: dayLabelWidth }} /> {/* Space for day labels */}
                {calendarData.map((month, i) => (
                  <Typography
                    key={i}
                    variant="caption"
                    sx={{
                      flex: `0 0 ${month.weeks.length * cellSize}px`,
                      textAlign: "center",
                      fontSize: isXsScreen ? "0.6rem" : "0.75rem",
                    }}
                  >
                    {month.name}
                  </Typography>
                ))}
              </Box>

              {/* Calendar grid */}
              <Box sx={{ display: "flex" }}>
                {/* Day of week labels */}
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-around",
                    pr: 1,
                    height: 7 * cellSize,
                    width: dayLabelWidth,
                  }}
                >
                  {["S", "M", "T", "W", "T", "F", "S"].map((day, i) => (
                    <Typography
                      key={i}
                      variant="caption"
                      sx={{
                        fontSize: isXsScreen ? "0.5rem" : "0.6rem",
                        height: cellSize,
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      {day}
                    </Typography>
                  ))}
                </Box>

                {/* Calendar cells */}
                <Box sx={{ display: "flex" }}>
                  {calendarData.map((month, monthIndex) => (
                    <Box key={monthIndex} sx={{ display: "flex" }}>
                      {month.weeks.map((week, weekIndex) => (
                        <Box key={weekIndex} sx={{ display: "flex", flexDirection: "column" }}>
                          {week.map((day, dayIndex) => (
                            <Tooltip
                              key={dayIndex}
                              title={day ? `${day.date}: ${day.count} submissions` : "No data"}
                              arrow
                              enterTouchDelay={50}
                              leaveTouchDelay={1500}
                            >
                              <Box
                                sx={{
                                  width: cellSize,
                                  height: cellSize,
                                  bgcolor: day ? getColorIntensity(day.count) : greenColors.empty,
                                  border: "1px solid #1b1f2326",
                                  borderRadius: 0,
                                  transition: "transform 0.2s",
                                  "&:hover": {
                                    transform: "scale(1.1)",
                                    zIndex: 1,
                                  },
                                  "@media (hover: none)": {
                                    "&:active": {
                                      transform: "scale(1.1)",
                                    },
                                  },
                                }}
                              />
                            </Tooltip>
                          ))}
                        </Box>
                      ))}
                    </Box>
                  ))}
                </Box>
              </Box>
            </Box>
          </Box>

          {/* Legend */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              mt: 2,
              flexWrap: "wrap",
              justifyContent: isXsScreen ? "center" : "flex-start",
            }}
          >
            <Typography variant="caption" sx={{ mr: 1 }}>
              Less
            </Typography>
            {[0, 1, 3, 5, 7, 9].map((count, i) => (
              <Box
                key={i}
                sx={{
                  width: cellSize,
                  height: cellSize,
                  bgcolor: getColorIntensity(count),
                  border: "1px solid #1b1f2326",
                  borderRadius: 0,
                }}
              />
            ))}
            <Typography variant="caption" sx={{ ml: 1 }}>
              More
            </Typography>
          </Box>
        </Box>
      )}
    </Paper>
  )
}

export default SubmissionHeatmap

