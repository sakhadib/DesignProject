"use client"

import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { Box, Typography, Container as MuiContainer } from "@mui/material"
import { styled } from "@mui/material/styles"
import axios from "../../api"

const Container = styled(Box)({
  padding: "20px",
  maxWidth: "100%",
  overflowX: "auto",
})

const Title = styled(Typography)({
  fontSize: "24px",
  fontWeight: 500,
  color: "#B0269B",
  marginBottom: "24px",
})

const HeatmapWrapper = styled(Box)({
  display: "flex",
  flexDirection: "column",
  padding: "10px",
  backgroundColor: "#f9f9f9",
  borderRadius: "8px",
})

const MonthsRow = styled(Box)({
  display: "grid",
  gridTemplateColumns: "repeat(13, 1fr)",
  marginLeft: "40px", // Reduced margin
  marginBottom: "4px", // Reduced gap
  gap: "0px",
})

const MonthLabel = styled(Typography)({
  fontSize: "12px",
  color: "#57606a",
  textAlign: "start",
})

const GridContainer = styled(Box)({
  display: "flex",
  gap: "8px",
})

const DayLabels = styled(Box)({
  display: "grid",
  gridTemplateRows: "repeat(7, 20px)", // Increased height
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
  gridTemplateColumns: "repeat(53, 20px)", // Increased size
  gridTemplateRows: "repeat(7, 20px)", // Increased size
  gap: "0px",
})

const Cell = styled(Box)(({ intensity }) => {
  const getColor = () => {
    if (intensity === 0) return "#ebedf0"
    if (intensity === 1) return "#9be9a8"
    if (intensity === 2) return "#40c463"
    if (intensity === 3) return "#30a14e"
    return "#216e39"
  }

  return {
    width: "18px",
    height: "18px",
    backgroundColor: getColor(),
    borderRadius: "2px",
    "&:hover": {
      outline: "1px solid #959DA5",
    },
  }
})

const Legend = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: "4px",
  marginTop: "16px",
})

const LegendText = styled(Typography)({
  fontSize: "12px",
  color: "#57606a",
  marginRight: "4px",
})

const DAYS = ["S", "M", "T", "W", "T", "F", "S"]
const MONTHS = ["Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar"]

export default function SubmissionHeatmap() {
  const { id } = useParams()
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const response = await axios.get(`/user/submission/heatmap/${id}`)
        setData(response.data)
        setLoading(false)
      } catch (err) {
        setError(err.response?.data?.message || err.message)
        setLoading(false)
      }
    }

    if (id) {
      fetchData()
    }
  }, [id])

  const generateCalendarData = () => {
    const endDate = new Date()
    const startDate = new Date(endDate)
    startDate.setFullYear(endDate.getFullYear() - 1)
    startDate.setMonth(2)

    const days = []
    for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
      const dateStr = d.toISOString().split("T")[0]
      days.push({
        date: new Date(d),
        count: data?.dateWiseSubmissionCount[dateStr] || 0,
        dateStr,
      })
    }

    return days
  }

  const getCalendarWeeks = () => {
    const days = generateCalendarData()
    const weeks = Array(53).fill().map(() => Array(7).fill(null))

    days.forEach((day) => {
      const weekIndex = Math.floor(days.indexOf(day) / 7)
      const dayIndex = day.date.getDay()
      if (weekIndex < 53) {
        weeks[weekIndex][dayIndex] = day
      }
    })

    return weeks
  }

  if (loading) {
    return <Box>Loading...</Box>
  }

  if (error) {
    return <Box color="error">Error: {error}</Box>
  }

  if (!data) {
    return <Box>No data available</Box>
  }

  const weeks = getCalendarWeeks()

  return (
    <MuiContainer>
      <Container>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold", color: "#8d256f" }}>
  Submission Activity
</Typography>



        <HeatmapWrapper>
          <MonthsRow>
            {MONTHS.map((month) => (
              <MonthLabel key={month}>{month}</MonthLabel>
            ))}
          </MonthsRow>

          <GridContainer>
            <DayLabels>
              {DAYS.map((day) => (
                <DayLabel key={day}>{day}</DayLabel>
              ))}
            </DayLabels>

            <Grid>
              {weeks.map((week, weekIndex) =>
                week.map((day, dayIndex) => (
                  <Cell
                    key={`${weekIndex}-${dayIndex}`}
                    intensity={day ? Math.min(4, Math.ceil(day.count / 2)) : 0}
                    title={day ? `${day.count} submissions on ${day.date.toLocaleDateString()}` : "No submissions"}
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
      </Container>
    </MuiContainer>
  )
}
