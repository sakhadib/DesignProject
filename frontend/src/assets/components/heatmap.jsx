"use client"

import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { Box, Typography, Container as MuiContainer, Skeleton, Paper } from "@mui/material"
import { styled } from "@mui/material/styles"
import axios from "../../api"

// Removed the Container styled component and will use MuiContainer directly
// with proper styling

// Changed from Box to Paper for better background control
const HeatmapWrapper = styled(Paper)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  padding: "20px",
  backgroundColor: "#f9f9f9",
  borderRadius: "8px",
  boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
  width: "100%",
  marginLeft: 0,
  marginRight: 0,
  // Explicitly set the width to stretch across the container
  boxSizing: "border-box",
}))

const MonthsRow = styled(Box)({
  display: "grid",
  gridTemplateColumns: "repeat(53, 20px)",
  marginLeft: "50px",
  marginBottom: "8px",
  gap: "1px",
})

const MonthLabel = styled(Typography)({
  fontSize: "12px",
  color: "#57606a",
  textAlign: "left",
  fontWeight: 500,
})

const GridContainer = styled(Box)({
  display: "flex",
  gap: "8px",
  width: "100%", // Ensure this container takes full width
})

const DayLabels = styled(Box)({
  display: "grid",
  gridTemplateRows: "repeat(7, 20px)",
  gap: "4px",
  marginTop: "4px",
})

const DayLabel = styled(Typography)({
  fontSize: "12px",
  color: "#57606a",
  height: "20px",
  lineHeight: "20px",
  textAlign: "right",
  paddingRight: "8px",
})

const Grid = styled(Box)({
  display: "grid",
  gridTemplateColumns: "repeat(53, 20px)",
  gridTemplateRows: "repeat(7, 20px)",
  gap: "1px",
})

const Cell = styled(Box)(({ intensity }) => {
  const colors = ["#ebedf0", "#9be9a8", "#40c463", "#30a14e", "#216e39"]
  return {
    width: "18px",
    height: "18px",
    backgroundColor: colors[intensity] || colors[0],
    borderRadius: "2px",
    transition: "background-color 0.1s ease",
    "&:hover": {
      outline: "1px solid #959DA5",
      cursor: "pointer",
    },
  }
})

const Legend = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: "4px",
  marginTop: "16px",
  justifyContent: "flex-end",
})

const LegendText = styled(Typography)({
  fontSize: "12px",
  color: "#57606a",
  marginRight: "4px",
})

const TooltipBox = styled(Box)({
  position: "absolute",
  backgroundColor: "#24292e",
  color: "white",
  padding: "8px 10px",
  borderRadius: "3px",
  fontSize: "12px",
  zIndex: 1000,
  pointerEvents: "none",
  boxShadow: "0 1px 5px rgba(0,0,0,0.2)",
  maxWidth: "200px",
  whiteSpace: "nowrap",
  "&::after": {
    content: '""',
    position: "absolute",
    top: "100%",
    left: "50%",
    marginLeft: "-5px",
    borderWidth: "5px",
    borderStyle: "solid",
    borderColor: "#24292e transparent transparent transparent",
  },
})

// These are the first letters of each day
const DAYS = ["S", "M", "T", "W", "T", "F", "S"]

export default function SubmissionHeatmap() {
  const { id } = useParams()
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [tooltip, setTooltip] = useState({ show: false, text: "", x: 0, y: 0 })

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const response = await axios.get(`/user/submission/heatmap/${id}`)
        setData(response.data)
      } catch (err) {
        setError(err.response?.data?.message || err.message)
      } finally {
        setLoading(false)
      }
    }

    if (id) {
      fetchData()
    }
  }, [id])

  const generateCalendarData = () => {
    if (!data?.dateWiseSubmissionCount) return []

    const endDate = new Date()
    const startDate = new Date(endDate)
    startDate.setFullYear(endDate.getFullYear() - 1)

    // Adjust to start from the beginning of the week
    const dayOfWeek = startDate.getDay()
    startDate.setDate(startDate.getDate() - dayOfWeek)

    const days = []
    for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
      const dateStr = d.toISOString().split("T")[0]
      days.push({
        date: new Date(d),
        count: data.dateWiseSubmissionCount[dateStr] || 0,
        dateStr,
      })
    }

    return days
  }

  const getCalendarWeeks = () => {
    const days = generateCalendarData()
    const weeks = Array(53)
      .fill()
      .map(() => Array(7).fill(null))

    days.forEach((day, index) => {
      const weekIndex = Math.floor(index / 7)
      const dayIndex = day.date.getDay()
      if (weekIndex < 53) {
        weeks[weekIndex][dayIndex] = day
      }
    })

    return weeks
  }

  const getMonthPositions = () => {
    const days = generateCalendarData()
    const months = []
    let currentMonth = -1

    days.forEach((day, index) => {
      const month = day.date.getMonth()
      const weekIndex = Math.floor(index / 7)

      if (month !== currentMonth) {
        months.push({
          name: day.date.toLocaleString("default", { month: "short" }),
          position: weekIndex,
        })
        currentMonth = month
      }
    })

    return months
  }

  const handleMouseOver = (event, day) => {
    if (!day) return

    const rect = event.currentTarget.getBoundingClientRect()
    const text = `${day.count} submission${day.count !== 1 ? "s" : ""} on ${day.date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })}`

    setTooltip({
      show: true,
      text,
      x: rect.left + window.scrollX + rect.width / 2,
      y: rect.top + window.scrollY - 10,
    })
  }

  const handleMouseOut = () => {
    setTooltip({ show: false, text: "", x: 0, y: 0 })
  }

  if (loading)
    return (
      <MuiContainer maxWidth="lg" disableGutters sx={{ px: 2 }}>
        <Box sx={{ my: 4 }}>
          <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold", color: "#8d256f" }}>
            Submission Activity
          </Typography>
          <Skeleton variant="rectangular" height={180} width="100%" />
        </Box>
      </MuiContainer>
    )

  if (error)
    return (
      <MuiContainer maxWidth="lg" disableGutters sx={{ px: 2 }}>
        <Box sx={{ my: 4 }}>
          <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold", color: "#8d256f" }}>
            Submission Activity
          </Typography>
          <Box color="error.main" p={2} bgcolor="#fff3f3" borderRadius={1}>
            Error: {error}
          </Box>
        </Box>
      </MuiContainer>
    )

  if (!data)
    return (
      <MuiContainer maxWidth="lg" disableGutters sx={{ px: 2 }}>
        <Box sx={{ my: 4 }}>
          <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold", color: "#8d256f" }}>
            Submission Activity
          </Typography>
          <Box p={2} bgcolor="#f5f5f5" borderRadius={1}>
            No submission data available
          </Box>
        </Box>
      </MuiContainer>
    )

  const weeks = getCalendarWeeks()
  const monthPositions = getMonthPositions()

  return (
    <MuiContainer maxWidth="lg" disableGutters sx={{ px: 2 }}>
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold", color: "#8d256f" }}>
          Submission Activity
        </Typography>

        {/* Changed to Paper component with elevation for better background control */}
        <HeatmapWrapper elevation={0}>
          <MonthsRow>
            {monthPositions.map((month, index) => (
              <MonthLabel
                key={index}
                style={{
                  gridColumnStart: month.position + 1,
                  gridColumnEnd: index < monthPositions.length - 1 ? monthPositions[index + 1].position + 1 : 54,
                }}
              >
                {month.name}
              </MonthLabel>
            ))}
          </MonthsRow>

          <GridContainer>
            <DayLabels>
              {DAYS.map((day, index) => (
                <DayLabel key={index}>{day}</DayLabel>
              ))}
            </DayLabels>

            <Grid>
              {weeks.map((week, weekIndex) =>
                week.map((day, dayIndex) => (
                  <Cell
                    key={`${weekIndex}-${dayIndex}`}
                    intensity={day ? Math.min(4, Math.ceil(day.count / 2)) : 0}
                    onMouseOver={(e) => handleMouseOver(e, day)}
                    onMouseOut={handleMouseOut}
                  />
                )),
              )}
            </Grid>
          </GridContainer>

          <Legend>
            <LegendText>Less</LegendText>
            {[0, 1, 2, 3, 4].map((intensity) => (
              <Cell key={intensity} intensity={intensity} style={{ cursor: "default" }} />
            ))}
            <LegendText>More</LegendText>
          </Legend>
        </HeatmapWrapper>

        {tooltip.show && (
          <TooltipBox
            style={{
              top: `${tooltip.y - 40}px`,
              left: `${tooltip.x - 100}px`,
            }}
          >
            {tooltip.text}
          </TooltipBox>
        )}
      </Box>
    </MuiContainer>
  )
}

