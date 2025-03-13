"use client"

import { useState, useEffect } from "react"
import axios from "../../api"
import { Container, Card, CardContent, CardHeader, Typography, CircularProgress, Box } from "@mui/material"
import { styled } from "@mui/material/styles"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { format } from "date-fns"
import { useParams } from "react-router-dom"

// Styled components
const StyledCard = styled(Card)(({ theme }) => ({
    width: "100%",
    height: "500px",
    display: "flex",
    flexDirection: "column",
    boxShadow: "none", 
}));

const ChartContainer = styled(Box)({
    flex: 1,
    width: "90%", 
    margin: "0 auto", 
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
    const { id } = useParams()

    useEffect(() => {
        const fetchRatingHistory = async () => {
            try {
                setLoading(true)
                const response = await axios.get(`/user/rating/history/${id}`)

                
                if (response.status === 200) {
                    const data = response.data
                    setUser(data.user)
                    processRatingsData(data.ratings)
                }
            } catch (err) {
                setError("Error fetching rating data: " + err.message)
                console.error("API fetch error:", err)
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
            <Container>
                <StyledCard>
                    <Box display="flex" justifyContent="center" alignItems="center" height="100%">
                        <CircularProgress />
                    </Box>
                </StyledCard>
            </Container>
        )
    }

    if (error) {
        return (
            <Container>
                <StyledCard>
                    <Box display="flex" justifyContent="center" alignItems="center" height="100%">
                        <Typography color="error">{error}</Typography>
                    </Box>
                </StyledCard>
            </Container>
        )
    }

    return (
        <Container>
            <StyledCard>
                <CardHeader
                    title={`Rating History for ${user?.username || "User"}`}
                    titleTypographyProps={{
                        variant: "h4",
                        sx: {
                            fontWeight: "bold", 
                        },
                    }}
                    sx={{
                       
                        color: "#8d256f",
                    }}
                />
                <CardContent sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
                    <ChartContainer>
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 30 }}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                <XAxis dataKey="date" tickMargin={10} tickFormatter={(value) => format(new Date(value), "MMM dd")} />
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
        </Container>
    )
}