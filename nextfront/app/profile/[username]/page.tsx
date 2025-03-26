"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import {
  Mail,
  Building,
  MapPin,
  Trophy,
  Target,
  CheckCircle,
  XCircle,
  BookOpen,
  ThumbsUp,
  MessageSquare,
  FileText,
  Calendar,
  ChevronRight,
  Star,
  BarChart2,
  Activity,
  PenTool,
  Eye,
  Github,
  Twitter,
  Linkedin,
  ExternalLink,
  Edit,
  Share2,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Progress } from "@/components/ui/progress"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

// Mock user data
const userData = {
  username: "MathWizard42",
  fullname: "Alex Johnson",
  email: "alex.johnson@example.com",
  showEmail: false,
  institution: "Stanford University",
  city: "Palo Alto",
  country: "United States",
  avatar: "/placeholder.svg?height=200&width=200",
  socialLinks: {
    github: "https://github.com/mathwizard42",
    twitter: "https://twitter.com/mathwizard42",
    linkedin: "https://linkedin.com/in/mathwizard42",
  },
  joinDate: "January 2023",
}

// Mock competition data
const competitionData = {
  currentRating: 3750,
  maxRating: 3850,
  title: "Supreme Mugwump",
  titleColor: "text-amber-500",
  ratingHistory: [
    { date: "2023-01-15", rating: 1200 },
    { date: "2023-02-10", rating: 1450 },
    { date: "2023-03-05", rating: 1800 },
    { date: "2023-04-20", rating: 2200 },
    { date: "2023-05-15", rating: 2600 },
    { date: "2023-06-10", rating: 2900 },
    { date: "2023-07-05", rating: 3100 },
    { date: "2023-08-20", rating: 3300 },
    { date: "2023-09-15", rating: 3500 },
    { date: "2023-10-10", rating: 3650 },
    { date: "2023-11-05", rating: 3750 },
    { date: "2023-12-20", rating: 3850 },
    { date: "2024-01-15", rating: 3800 },
    { date: "2024-02-10", rating: 3750 },
  ],
  // Activity heatmap data (submissions per day)
  activityData: {
    "2024-01-01": 2,
    "2024-01-03": 1,
    "2024-01-05": 5,
    "2024-01-10": 3,
    "2024-01-15": 7,
    "2024-01-20": 2,
    "2024-01-25": 4,
    "2024-01-30": 1,
    "2024-02-02": 3,
    "2024-02-05": 6,
    "2024-02-10": 2,
    "2024-02-15": 8,
    "2024-02-20": 4,
    "2024-02-25": 3,
    "2024-03-01": 5,
    "2024-03-05": 7,
    "2024-03-10": 2,
    "2024-03-15": 4,
    "2024-03-20": 6,
    "2024-03-25": 3,
  },
}

// Mock practice data
const practiceData = {
  totalAttempted: 187,
  totalSolved: 156,
  totalUnsolved: 31,
  totalXP: 28450,
  // Distribution by difficulty
  difficultyDistribution: {
    Easy: 45,
    Medium: 62,
    Hard: 38,
    "Very Hard": 9,
    Expert: 2,
  },
  // Distribution by topic
  topicDistribution: {
    "Number Theory": 32,
    Algebra: 28,
    Calculus: 25,
    Geometry: 20,
    Probability: 18,
    Combinatorics: 15,
    "Linear Algebra": 12,
    Other: 6,
  },
}

// Mock contribution data
const contributionData = {
  blogsWritten: 28,
  totalLikes: 1245,
  totalComments: 342,
  problemsAdded: 15,
  problemsAddedXP: 2800,
}

// Mock recent submissions
const recentSubmissions = [
  {
    problem_id: 123,
    title: "Prime Number Factorization",
    target: "v2",
    tags: ["Number Theory", "Algorithms"],
    achieved_xp: 150,
    max_xp: 150,
    date: "2024-03-25",
  },
  {
    problem_id: 145,
    title: "Euler's Method for Differential Equations",
    target: "v3",
    tags: ["Calculus", "Differential Equations"],
    achieved_xp: 180,
    max_xp: 200,
    date: "2024-03-22",
  },
  {
    problem_id: 167,
    title: "Matrix Eigenvalues and Eigenvectors",
    target: "v3",
    tags: ["Linear Algebra", "Matrices"],
    achieved_xp: 170,
    max_xp: 180,
    date: "2024-03-18",
  },
  {
    problem_id: 189,
    title: "Fibonacci Sequence Optimization",
    target: "v1",
    tags: ["Algorithms", "Dynamic Programming"],
    achieved_xp: 100,
    max_xp: 100,
    date: "2024-03-15",
  },
  {
    problem_id: 201,
    title: "Probability of Dice Rolls",
    target: "v4",
    tags: ["Probability", "Combinatorics"],
    achieved_xp: 190,
    max_xp: 220,
    date: "2024-03-10",
  },
]

// Mock recent added problems
const recentAddedProblems = [
  {
    problem_id: 234,
    title: "Integral Approximation Methods",
    tags: ["Calculus", "Numerical Methods"],
    target: "v3",
    max_xp: 180,
    date: "2024-03-20",
  },
  {
    problem_id: 228,
    title: "Graph Coloring Algorithms",
    tags: ["Graph Theory", "Algorithms"],
    target: "v4",
    max_xp: 220,
    date: "2024-03-15",
  },
  {
    problem_id: 219,
    title: "Polynomial Root Finding",
    tags: ["Algebra", "Numerical Methods"],
    target: "v3",
    max_xp: 190,
    date: "2024-03-05",
  },
  {
    problem_id: 212,
    title: "Probability Distribution Functions",
    tags: ["Probability", "Statistics"],
    target: "v3",
    max_xp: 180,
    date: "2024-02-28",
  },
]

// Mock recent blogs
const recentBlogs = [
  {
    id: 45,
    title: "Understanding the Riemann Hypothesis",
    category: "Number Theory",
    likes: 87,
    comments: 23,
    date: "2024-03-18",
  },
  {
    id: 42,
    title: "Exploring Euler's Identity",
    category: "Complex Analysis",
    likes: 124,
    comments: 35,
    date: "2024-03-05",
  },
  {
    id: 38,
    title: "Introduction to Group Theory",
    category: "Abstract Algebra",
    likes: 76,
    comments: 19,
    date: "2024-02-20",
  },
  {
    id: 35,
    title: "The Beauty of Fibonacci Sequences",
    category: "Number Theory",
    likes: 92,
    comments: 27,
    date: "2024-02-10",
  },
]

// Map difficulty to color
const difficultyColor = {
  Easy: "bg-green-500",
  Medium: "bg-yellow-500",
  Hard: "bg-orange-500",
  "Very Hard": "bg-red-500",
  Expert: "bg-purple-500",
}

export default function UserProfilePage() {
  const { username } = useParams()
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("overview")

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 800)
    return () => clearTimeout(timer)
  }, [])

  // Generate rating chart
  const generateRatingChart = () => {
    const width = 800
    const height = 300
    const padding = 40

    // Calculate scales
    const xScale = (width - padding * 2) / (competitionData.ratingHistory.length - 1)
    const yMin = Math.min(...competitionData.ratingHistory.map((d) => d.rating))
    const yMax = Math.max(...competitionData.ratingHistory.map((d) => d.rating))
    const yScale = (height - padding * 2) / (yMax - yMin)

    // Generate path
    const points = competitionData.ratingHistory.map((d, i) => {
      const x = padding + i * xScale
      const y = height - padding - (d.rating - yMin) * yScale
      return `${x},${y}`
    })

    const path = `M ${points.join(" L ")}`

    // Generate axis ticks
    const yTicks = []
    const numYTicks = 5
    for (let i = 0; i <= numYTicks; i++) {
      const value = yMin + (yMax - yMin) * (i / numYTicks)
      const y = height - padding - (value - yMin) * yScale
      yTicks.push({ value: Math.round(value), y })
    }

    const xTicks = []
    const numXTicks = 6
    const step = Math.floor(competitionData.ratingHistory.length / numXTicks)
    for (let i = 0; i < competitionData.ratingHistory.length; i += step) {
      const x = padding + i * xScale
      xTicks.push({ value: competitionData.ratingHistory[i].date, x })
    }

    return (
      <svg width="100%" height={height} viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none">
        {/* Y-axis */}
        <line x1={padding} y1={padding} x2={padding} y2={height - padding} stroke="currentColor" strokeOpacity="0.2" />

        {/* X-axis */}
        <line
          x1={padding}
          y1={height - padding}
          x2={width - padding}
          y2={height - padding}
          stroke="currentColor"
          strokeOpacity="0.2"
        />

        {/* Y-axis ticks */}
        {yTicks.map((tick, i) => (
          <g key={`y-tick-${i}`}>
            <line x1={padding - 5} y1={tick.y} x2={padding} y2={tick.y} stroke="currentColor" strokeOpacity="0.2" />
            <text x={padding - 10} y={tick.y + 4} fontSize="10" textAnchor="end" fill="currentColor" fillOpacity="0.5">
              {tick.value}
            </text>
            <line
              x1={padding}
              y1={tick.y}
              x2={width - padding}
              y2={tick.y}
              stroke="currentColor"
              strokeOpacity="0.1"
              strokeDasharray="4,4"
            />
          </g>
        ))}

        {/* X-axis ticks */}
        {xTicks.map((tick, i) => (
          <g key={`x-tick-${i}`}>
            <line
              x1={tick.x}
              y1={height - padding}
              x2={tick.x}
              y2={height - padding + 5}
              stroke="currentColor"
              strokeOpacity="0.2"
            />
            <text
              x={tick.x}
              y={height - padding + 20}
              fontSize="10"
              textAnchor="middle"
              fill="currentColor"
              fillOpacity="0.5"
            >
              {tick.value.split("-").slice(1).join("/")}
            </text>
          </g>
        ))}

        {/* Rating path */}
        <path
          d={path}
          fill="none"
          stroke="hsl(var(--primary))"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Data points */}
        {competitionData.ratingHistory.map((d, i) => {
          const x = padding + i * xScale
          const y = height - padding - (d.rating - yMin) * yScale
          return <circle key={`point-${i}`} cx={x} cy={y} r="3" fill="hsl(var(--primary))" />
        })}

        {/* Max rating point */}
        {competitionData.ratingHistory.map((d, i) => {
          if (d.rating === competitionData.maxRating) {
            const x = padding + i * xScale
            const y = height - padding - (d.rating - yMin) * yScale
            return (
              <g key={`max-point-${i}`}>
                <circle cx={x} cy={y} r="5" fill="hsl(var(--primary))" stroke="white" strokeWidth="2" />
                <text x={x} y={y - 10} fontSize="10" textAnchor="middle" fill="currentColor">
                  Max: {d.rating}
                </text>
              </g>
            )
          }
          return null
        })}
      </svg>
    )
  }

  // Generate activity heatmap
  const generateActivityHeatmap = () => {
    const today = new Date()
    const startDate = new Date(today)
    startDate.setDate(startDate.getDate() - 90) // 3 months ago

    const days = []
    const currentDate = new Date(startDate)

    while (currentDate <= today) {
      days.push(new Date(currentDate))
      currentDate.setDate(currentDate.getDate() + 1)
    }

    // Group days by week
    const weeks = []
    let currentWeek: Date[] = []

    days.forEach((day) => {
      if (day.getDay() === 0 && currentWeek.length > 0) {
        weeks.push(currentWeek)
        currentWeek = []
      }
      currentWeek.push(day)
    })

    if (currentWeek.length > 0) {
      weeks.push(currentWeek)
    }

    // Find max activity for color scaling
    const maxActivity = Math.max(...Object.values(competitionData.activityData))

    // Get activity level for a day
    const getActivityLevel = (date: Date): number => {
      const dateString: string = date.toISOString().split("T")[0]
      return competitionData.activityData[dateString as keyof typeof competitionData.activityData] || 0
    }

    // Get color for activity level
    interface ActivityData {
      [date: string]: number;
    }

    const getActivityColor = (level: number): string => {
      if (level === 0) return "bg-muted hover:bg-muted/80";

      const intensity = Math.min(1, level / maxActivity);

      if (intensity < 0.25) return "bg-primary/20 hover:bg-primary/30";
      if (intensity < 0.5) return "bg-primary/40 hover:bg-primary/50";
      if (intensity < 0.75) return "bg-primary/60 hover:bg-primary/70";
      return "bg-primary hover:bg-primary/90";
    };

    // Get month labels
    interface Month {
      name: string;
      index: number;
    }

    const months: Month[] = [];
    let currentMonth = -1

    days.forEach((day) => {
      const month = day.getMonth()
      if (month !== currentMonth) {
        currentMonth = month
        months.push({
          name: day.toLocaleString("default", { month: "short" }),
          index: weeks.length,
        })
      }
    })

    return (
      <div className="space-y-2">
        <div className="flex justify-start space-x-2 text-xs text-muted-foreground">
          {months.map((month, i) => (
            <div key={i} style={{ marginLeft: i === 0 ? 0 : `${month.index * 16}px` }}>
              {month.name}
            </div>
          ))}
        </div>

        <div className="flex space-x-1">
          {weeks.map((week, weekIndex) => (
            <div key={weekIndex} className="flex flex-col space-y-1">
              {week.map((day, dayIndex) => {
                const activity = getActivityLevel(day)
                return (
                  <TooltipProvider key={dayIndex}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className={`h-3 w-3 rounded-sm ${getActivityColor(activity)} transition-colors`} />
                      </TooltipTrigger>
                      <TooltipContent side="top">
                        <div className="text-xs">
                          <div>{day.toLocaleDateString()}</div>
                          <div>{activity} submissions</div>
                        </div>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                )
              })}
            </div>
          ))}
        </div>

        <div className="flex items-center justify-end space-x-2 text-xs text-muted-foreground">
          <span>Less</span>
          <div className="h-3 w-3 rounded-sm bg-muted" />
          <div className="h-3 w-3 rounded-sm bg-primary/20" />
          <div className="h-3 w-3 rounded-sm bg-primary/40" />
          <div className="h-3 w-3 rounded-sm bg-primary/60" />
          <div className="h-3 w-3 rounded-sm bg-primary" />
          <span>More</span>
        </div>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="container py-12 flex items-center justify-center min-h-[50vh]">
        <div className="flex flex-col items-center gap-4">
          <div className="h-12 w-12 rounded-full border-4 border-primary border-t-transparent animate-spin" />
          <p className="text-muted-foreground">Loading profile...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container py-12 animate-fade-in">
      {/* Profile Header */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row gap-6 items-start">
          <div className="relative group">
            <Avatar className="h-32 w-32 border-4 border-background">
              <AvatarImage src={userData.avatar} alt={userData.username} />
              <AvatarFallback className="text-4xl">{userData.username.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="absolute inset-0 bg-black/50 rounded-full opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
              <Button variant="ghost" size="icon" className="text-white">
                <Edit className="h-5 w-5" />
              </Button>
            </div>
          </div>

          <div className="flex-1">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold flex items-center gap-2">
                  {userData.username}
                  <Badge className={`${competitionData.titleColor} ml-2`}>{competitionData.title}</Badge>
                </h1>
                <p className="text-xl text-muted-foreground">{userData.fullname}</p>
              </div>

              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="gap-1">
                  <Share2 className="h-4 w-4" />
                  <span className="hidden sm:inline">Share</span>
                </Button>
                <Button size="sm" className="gap-1">
                  <Edit className="h-4 w-4" />
                  <span className="hidden sm:inline">Edit Profile</span>
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
              {userData.institution && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Building className="h-4 w-4" />
                  <span>{userData.institution}</span>
                </div>
              )}

              {userData.city && userData.country && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span>
                    {userData.city}, {userData.country}
                  </span>
                </div>
              )}

              {userData.showEmail && userData.email && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Mail className="h-4 w-4" />
                  <span>{userData.email}</span>
                </div>
              )}

              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="h-4 w-4" />
                <span>Joined {userData.joinDate}</span>
              </div>
            </div>

            <div className="flex gap-2 mt-4">
              {userData.socialLinks.github && (
                <Link href={userData.socialLinks.github} target="_blank" rel="noopener noreferrer">
                  <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                    <Github className="h-4 w-4" />
                  </Button>
                </Link>
              )}

              {userData.socialLinks.twitter && (
                <Link href={userData.socialLinks.twitter} target="_blank" rel="noopener noreferrer">
                  <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                    <Twitter className="h-4 w-4" />
                  </Button>
                </Link>
              )}

              {userData.socialLinks.linkedin && (
                <Link href={userData.socialLinks.linkedin} target="_blank" rel="noopener noreferrer">
                  <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                    <Linkedin className="h-4 w-4" />
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Profile Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
        <TabsList className="w-full justify-start border-b rounded-none h-auto p-0 bg-transparent">
          <TabsTrigger
            value="overview"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent py-3 text-muted-foreground data-[state=active]:text-foreground"
          >
            Overview
          </TabsTrigger>
          <TabsTrigger
            value="submissions"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent py-3 text-muted-foreground data-[state=active]:text-foreground"
          >
            Submissions
          </TabsTrigger>
          <TabsTrigger
            value="problems"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent py-3 text-muted-foreground data-[state=active]:text-foreground"
          >
            Problems
          </TabsTrigger>
          <TabsTrigger
            value="blogs"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent py-3 text-muted-foreground data-[state=active]:text-foreground"
          >
            Blogs
          </TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-8">
          {/* Competition Data */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Trophy className="h-5 w-5 text-primary" />
                    Rating History
                  </CardTitle>
                </CardHeader>
                <CardContent>{generateRatingChart()}</CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="h-5 w-5 text-primary" />
                    Activity Heatmap
                  </CardTitle>
                </CardHeader>
                <CardContent>{generateActivityHeatmap()}</CardContent>
              </Card>
            </div>

            <div className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart2 className="h-5 w-5 text-primary" />
                    Competition Stats
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex flex-col items-center">
                    <div className="text-4xl font-bold">{competitionData.currentRating}</div>
                    <div className="text-sm text-muted-foreground">Current Rating</div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col items-center p-3 bg-muted rounded-lg">
                      <div className="text-2xl font-bold">{competitionData.maxRating}</div>
                      <div className="text-xs text-muted-foreground">Max Rating</div>
                    </div>

                    <div className="flex flex-col items-center p-3 bg-muted rounded-lg">
                      <div className={`text-2xl font-bold ${competitionData.titleColor}`}>{competitionData.title}</div>
                      <div className="text-xs text-muted-foreground">Title</div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Rating Progress</span>
                      <span>{competitionData.currentRating} / 4000</span>
                    </div>
                    <Progress value={(competitionData.currentRating / 4000) * 100} className="h-2" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-primary" />
                    Practice Stats
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col items-center p-3 bg-muted rounded-lg">
                      <div className="text-2xl font-bold">{practiceData.totalSolved}</div>
                      <div className="text-xs text-muted-foreground">Problems Solved</div>
                    </div>

                    <div className="flex flex-col items-center p-3 bg-muted rounded-lg">
                      <div className="text-2xl font-bold">{practiceData.totalXP}</div>
                      <div className="text-xs text-muted-foreground">Total XP</div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Solved</span>
                      <span>
                        {practiceData.totalSolved} / {practiceData.totalAttempted}
                      </span>
                    </div>
                    <Progress value={(practiceData.totalSolved / practiceData.totalAttempted) * 100} className="h-2" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Practice Data */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardContent className="pt-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-sm font-medium text-muted-foreground">Total Attempted</h3>
                  <div className="bg-primary/10 p-2 rounded-full">
                    <Target className="h-4 w-4 text-primary" />
                  </div>
                </div>
                <div className="text-2xl font-bold">{practiceData.totalAttempted}</div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-sm font-medium text-muted-foreground">Total Solved</h3>
                  <div className="bg-primary/10 p-2 rounded-full">
                    <CheckCircle className="h-4 w-4 text-primary" />
                  </div>
                </div>
                <div className="text-2xl font-bold">{practiceData.totalSolved}</div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-sm font-medium text-muted-foreground">Total Unsolved</h3>
                  <div className="bg-primary/10 p-2 rounded-full">
                    <XCircle className="h-4 w-4 text-primary" />
                  </div>
                </div>
                <div className="text-2xl font-bold">{practiceData.totalUnsolved}</div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-sm font-medium text-muted-foreground">Total XP</h3>
                  <div className="bg-primary/10 p-2 rounded-full">
                    <Star className="h-4 w-4 text-primary" />
                  </div>
                </div>
                <div className="text-2xl font-bold">{practiceData.totalXP}</div>
              </CardContent>
            </Card>
          </div>

          {/* Contribution Data */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardContent className="pt-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-sm font-medium text-muted-foreground">Blogs Written</h3>
                  <div className="bg-primary/10 p-2 rounded-full">
                    <BookOpen className="h-4 w-4 text-primary" />
                  </div>
                </div>
                <div className="text-2xl font-bold">{contributionData.blogsWritten}</div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-sm font-medium text-muted-foreground">Total Likes</h3>
                  <div className="bg-primary/10 p-2 rounded-full">
                    <ThumbsUp className="h-4 w-4 text-primary" />
                  </div>
                </div>
                <div className="text-2xl font-bold">{contributionData.totalLikes}</div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-sm font-medium text-muted-foreground">Total Comments</h3>
                  <div className="bg-primary/10 p-2 rounded-full">
                    <MessageSquare className="h-4 w-4 text-primary" />
                  </div>
                </div>
                <div className="text-2xl font-bold">{contributionData.totalComments}</div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-sm font-medium text-muted-foreground">Problems Added</h3>
                  <div className="bg-primary/10 p-2 rounded-full">
                    <PenTool className="h-4 w-4 text-primary" />
                  </div>
                </div>
                <div className="text-2xl font-bold">{contributionData.problemsAdded}</div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Submissions */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" />
                Recent Submissions
              </CardTitle>
              <Link href={`/profile/${username}/submissions`}>
                <Button variant="ghost" size="sm" className="gap-1">
                  <span>View All</span>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </Link>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Problem</TableHead>
                    <TableHead>Target</TableHead>
                    <TableHead>Tags</TableHead>
                    <TableHead className="text-right">XP</TableHead>
                    <TableHead className="text-right">Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentSubmissions.map((submission) => (
                    <TableRow key={submission.problem_id} className="group">
                      <TableCell>
                        <Link
                          href={`/problems/${submission.problem_id}`}
                          className="font-medium group-hover:text-primary transition-colors"
                        >
                          {submission.title}
                        </Link>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="flex items-center gap-1 w-fit">
                          <Target className="h-3 w-3" />
                          {submission.target}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {submission.tags.map((tag) => (
                            <Badge key={tag} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <span className="font-mono">
                          {submission.achieved_xp}/{submission.max_xp}
                        </span>
                      </TableCell>
                      <TableCell className="text-right text-muted-foreground">{submission.date}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Recent Added Problems and Blogs */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Recent Added Problems */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <PenTool className="h-5 w-5 text-primary" />
                  Recent Added Problems
                </CardTitle>
                <Link href={`/profile/${username}/problems`}>
                  <Button variant="ghost" size="sm" className="gap-1">
                    <span>View All</span>
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </Link>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentAddedProblems.map((problem) => (
                    <div key={problem.problem_id} className="flex items-start gap-4 group">
                      <div className="bg-muted p-2 rounded-md">
                        <FileText className="h-4 w-4 text-muted-foreground" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <Link
                          href={`/problems/${problem.problem_id}`}
                          className="font-medium group-hover:text-primary transition-colors line-clamp-1"
                        >
                          {problem.title}
                        </Link>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {problem.tags.map((tag) => (
                            <Badge key={tag} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div className="flex flex-col items-end text-sm">
                        <Badge variant="outline" className="flex items-center gap-1">
                          <Target className="h-3 w-3" />
                          {problem.target}
                        </Badge>
                        <span className="text-muted-foreground text-xs mt-1">{problem.date}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Blogs */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-primary" />
                  Recent Blogs
                </CardTitle>
                <Link href={`/profile/${username}/blogs`}>
                  <Button variant="ghost" size="sm" className="gap-1">
                    <span>View All</span>
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </Link>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentBlogs.map((blog) => (
                    <div key={blog.id} className="flex items-start gap-4 group">
                      <div className="bg-muted p-2 rounded-md">
                        <BookOpen className="h-4 w-4 text-muted-foreground" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <Link
                          href={`/blog/${blog.id}`}
                          className="font-medium group-hover:text-primary transition-colors line-clamp-1"
                        >
                          {blog.title}
                        </Link>
                        <Badge variant="secondary" className="mt-1">
                          {blog.category}
                        </Badge>
                      </div>
                      <div className="flex flex-col items-end text-sm">
                        <div className="flex items-center gap-2">
                          <div className="flex items-center">
                            <ThumbsUp className="h-3 w-3 mr-1 text-muted-foreground" />
                            <span>{blog.likes}</span>
                          </div>
                          <div className="flex items-center">
                            <MessageSquare className="h-3 w-3 mr-1 text-muted-foreground" />
                            <span>{blog.comments}</span>
                          </div>
                        </div>
                        <span className="text-muted-foreground text-xs mt-1">{blog.date}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Submissions Tab */}
        <TabsContent value="submissions">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" />
                All Submissions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Problem</TableHead>
                    <TableHead>Target</TableHead>
                    <TableHead>Tags</TableHead>
                    <TableHead className="text-right">XP</TableHead>
                    <TableHead className="text-right">Date</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[...recentSubmissions, ...recentSubmissions].map((submission, index) => (
                    <TableRow key={`${submission.problem_id}-${index}`} className="group">
                      <TableCell>
                        <Link
                          href={`/problems/${submission.problem_id}`}
                          className="font-medium group-hover:text-primary transition-colors"
                        >
                          {submission.title}
                        </Link>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="flex items-center gap-1 w-fit">
                          <Target className="h-3 w-3" />
                          {submission.target}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {submission.tags.map((tag) => (
                            <Badge key={tag} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <span className="font-mono">
                          {submission.achieved_xp}/{submission.max_xp}
                        </span>
                      </TableCell>
                      <TableCell className="text-right text-muted-foreground">{submission.date}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm" className="gap-1">
                          <Eye className="h-4 w-4" />
                          <span className="hidden sm:inline">View</span>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Problems Tab */}
        <TabsContent value="problems">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <PenTool className="h-5 w-5 text-primary" />
                Added Problems
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 sm:grid-cols-1 lg:grid-cols-2">
                {[...recentAddedProblems, ...recentAddedProblems].map((problem, index) => (
                  <Card
                    key={`${problem.problem_id}-${index}`}
                    className="overflow-hidden transition-all hover:shadow-md group"
                  >
                    <CardHeader className="pb-3">
                      <div className="flex justify-between items-start">
                        <Badge variant="outline" className="flex items-center gap-1">
                          <Target className="h-3 w-3" />
                          {problem.target}
                        </Badge>
                        <span className="text-sm text-muted-foreground">{problem.date}</span>
                      </div>
                      <Link href={`/problems/${problem.problem_id}`}>
                        <CardTitle className="text-xl hover:text-primary transition-colors">{problem.title}</CardTitle>
                      </Link>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2 mt-3">
                        {problem.tags.map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between pt-3 text-sm text-muted-foreground border-t">
                      <div className="flex items-center gap-2">
                        <span>{problem.max_xp} XP</span>
                      </div>
                      <Link href={`/problems/${problem.problem_id}`}>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                        >
                          View
                          <ExternalLink className="ml-1 h-4 w-4" />
                        </Button>
                      </Link>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Blogs Tab */}
        <TabsContent value="blogs">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-primary" />
                Published Blogs
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 sm:grid-cols-1 lg:grid-cols-2">
                {[...recentBlogs, ...recentBlogs].map((blog, index) => (
                  <Card key={`${blog.id}-${index}`} className="overflow-hidden transition-all hover:shadow-md">
                    <CardHeader className="pb-3">
                      <div className="flex justify-between items-start">
                        <Badge variant="secondary" className="mb-2">
                          {blog.category}
                        </Badge>
                        <span className="text-sm text-muted-foreground">{blog.date}</span>
                      </div>
                      <Link href={`/blog/${blog.id}`}>
                        <CardTitle className="text-xl hover:text-primary transition-colors">{blog.title}</CardTitle>
                      </Link>
                    </CardHeader>
                    <CardFooter className="flex justify-between pt-3 text-sm text-muted-foreground border-t">
                      <div className="flex space-x-4">
                        <div className="flex items-center">
                          <ThumbsUp className="h-4 w-4 mr-1" />
                          <span>{blog.likes}</span>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <MessageSquare className="h-4 w-4 mr-1" />
                        <span>{blog.comments} comments</span>
                      </div>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

