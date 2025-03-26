"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import {
  Calendar,
  Clock,
  Trophy,
  Users,
  CheckCircle,
  AlertTriangle,
  Timer,
  Play,
  FileText,
  BarChart,
  BookOpen,
  Filter,
  Search,
  PlusCircle,
  Copy,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

// Sample contest data
const contests: Array<{
  contest_id: number
  title: string
  problem_count: number
  start_time: string
  end_time: string
  description: string
  difficulty: keyof typeof difficultyColor
  registered_users: number
  is_registered: boolean
}> = [
  {
    contest_id: 1,
    title: "Spring Mathematics Challenge",
    problem_count: 8,
    start_time: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days in future
    end_time: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
    description:
      "Test your mathematical skills in this seasonal challenge covering algebra, geometry, and number theory.",
    difficulty: "Medium",
    registered_users: 156,
    is_registered: false,
  },
  {
    contest_id: 2,
    title: "Advanced Calculus Competition",
    problem_count: 6,
    start_time: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000).toISOString(), // 25 days ago
    end_time: new Date(Date.now() + 26 * 24 * 60 * 60 * 1000).toISOString(), // 26 days in future
    description:
        "A challenging contest focused on differential and integral calculus, with problems ranging from moderate to difficult.",
    difficulty: "Easy",
    registered_users: 89,
    is_registered: true,
    },
    {
    contest_id: 3,
    title: "Probability and Statistics Showdown",
    problem_count: 7,
    start_time: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days in future
    end_time: new Date(Date.now() + 6 * 24 * 60 * 60 * 1000).toISOString(),
    description:
      "Dive into the world of probability and statistics with this engaging contest featuring real-world applications.",
    difficulty: "Medium",
    registered_users: 112,
    is_registered: false,
  },
  {
    contest_id: 4,
    title: "Number Theory Masters",
    problem_count: 5,
    start_time: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(), // 15 days ago
    end_time: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
    description:
      "A contest dedicated to number theory enthusiasts, featuring problems on prime numbers, modular arithmetic, and more.",
    difficulty: "Expert",
    registered_users: 78,
    is_registered: true,
  },
  {
    contest_id: 5,
    title: "Geometry Challenge",
    problem_count: 6,
    start_time: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days ago
    end_time: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
    description:
      "Test your geometric intuition and proof-writing skills in this contest focused on Euclidean and non-Euclidean geometry.",
    difficulty: "Hard",
    registered_users: 94,
    is_registered: false,
  },
  {
    contest_id: 6,
    title: "Algebra and Linear Algebra Contest",
    problem_count: 7,
    start_time: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString(), // 10 days in future
    end_time: new Date(Date.now() + 11 * 24 * 60 * 60 * 1000).toISOString(),
    description: "Explore the beauty of algebraic structures and linear transformations in this comprehensive contest.",
    difficulty: "Medium",
    registered_users: 67,
    is_registered: true,
  },
]


const userCreatedContests = [
  {
    contest_id: 11,
    title: "Linear Algebra Workshop",
    problem_count: 5,
    start_time: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    end_time: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000 + 3 * 60 * 60 * 1000),
    description: "A focused workshop on linear algebra concepts with practical problems.",
    difficulty: "Medium",
    registered_users: 12,
    is_creator: true,
    share_link: "https://mathxploter.com/contests/custom-12",
  },
  {
    contest_id: 21,
    title: "Calculus Mastery Test",
    problem_count: 8,
    start_time: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
    end_time: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000 + 4 * 60 * 60 * 1000),
    description:
      "Test your calculus skills with this comprehensive set of problems covering differentiation and integration.",
    difficulty: "Hard",
    registered_users: 8,
    is_creator: true,
    share_link: "https://mathxploter.com/contests/custom-21",
  },
]


// Helper function to determine contest status
interface ContestStatusParams {
    startTime: Date
    endTime: Date
}
const getContestStatus = ({ startTime, endTime }: ContestStatusParams): "upcoming" | "past" | "active" | "useless" => {
    const now = new Date();
    if (now < startTime) return "upcoming";
    if (now > endTime) return "past";
    if (now >= startTime && now <= endTime) return "active";
    return "useless";
}



// Helper function to format time remaining
interface TimeRemaining {
    days: number
    hours: number
    minutes: number
    seconds: number
}

const formatTimeRemaining = (targetTime: Date): TimeRemaining => {
    const now = new Date();
    const diff = targetTime.getTime() - now.getTime();

    if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    return { days, hours, minutes, seconds };
}


// Map difficulty to color
const difficultyColor = {
  Easy: "bg-green-500",
  Medium: "bg-yellow-500",
  Hard: "bg-orange-500",
  "Very Hard": "bg-red-500",
  Expert: "bg-purple-500",
}

export default function ContestsPage() {
  const [activeTab, setActiveTab] = useState("upcoming")
  const [searchTerm, setSearchTerm] = useState("")
  const [difficultyFilter, setDifficultyFilter] = useState("All")
  const [timeRemaining, setTimeRemaining] = useState<Record<number, TimeRemaining>>({})
  const [registrationOpen, setRegistrationOpen] = useState(false)
  const [selectedContest, setSelectedContest] = useState<Contest | null>(null)
  const [copiedLink, setCopiedLink] = useState("")

  // Filter contests based on status and search term
  const filteredContests = contests.filter((contest) => {
    const status = getContestStatus({ startTime: new Date(contest.start_time), endTime: new Date(contest.end_time) })
    const matchesTab =
      (activeTab === "upcoming" && status === "upcoming") ||
      (activeTab === "past" && status === "past") ||
      (activeTab === "my" && contest.is_registered)

    const matchesSearch = contest.title.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesDifficulty = difficultyFilter === "All" || contest.difficulty === difficultyFilter

    return matchesTab && matchesSearch && matchesDifficulty
  })

  // Update time remaining for contests
  useEffect(() => {
    const timer = setInterval(() => {
      const updatedTimeRemaining: Record<number, TimeRemaining> = {}

      contests.forEach((contest) => {
        const status = getContestStatus({ startTime: new Date(contest.start_time), endTime: new Date(contest.end_time) })
        if (status === "upcoming") {
          updatedTimeRemaining[contest.contest_id] = formatTimeRemaining(new Date(contest.start_time))
        } else if (status === "active") {
          updatedTimeRemaining[contest.contest_id] = formatTimeRemaining(new Date(contest.end_time))
        }
      })

      userCreatedContests.forEach((contest) => {
        const status = getContestStatus({ startTime: contest.start_time, endTime: contest.end_time })
        if (status === "upcoming") {
          updatedTimeRemaining[contest.contest_id] = formatTimeRemaining(contest.start_time)
        } else if (status === "active") {
          updatedTimeRemaining[contest.contest_id] = formatTimeRemaining(contest.end_time)
        }
      })

      setTimeRemaining(updatedTimeRemaining)
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  // Handle contest registration
interface Contest {
    contest_id: number
    title: string
    problem_count: number
    start_time: string
    end_time: string
    description: string
    difficulty: string
    registered_users: number
    is_registered: boolean
}

const handleRegister = (contest: Contest): void => {
    setSelectedContest(contest)
    setRegistrationOpen(true)
}

  const confirmRegistration = () => {
    if (selectedContest) {
      alert(`You have successfully registered for ${selectedContest.title}!`)
    }
    setRegistrationOpen(false)
  }

  // Handle link copying
  interface CopyLinkParams {
    link: string
  }

  const handleCopyLink = ({ link }: CopyLinkParams): void => {
    navigator.clipboard.writeText(link)
    setCopiedLink(link)
    setTimeout(() => setCopiedLink(""), 2000)
  }

  return (
    <div className="container py-12">
      <div className="flex flex-col space-y-4 md:flex-row md:justify-between md:space-y-0 mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Mathematics Contests</h1>
          <p className="text-muted-foreground">Participate in timed competitions and test your mathematical skills</p>
        </div>
        <div className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search contests..."
              className="pl-8 w-full sm:w-[250px]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Select value={difficultyFilter} onValueChange={setDifficultyFilter}>
            <SelectTrigger className="w-full lg">
              <div className="flex items-center">
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Filter" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All Difficulties</SelectItem>
              <SelectItem value="Easy">Easy</SelectItem>
              <SelectItem value="Medium">Medium</SelectItem>
              <SelectItem value="Hard">Hard</SelectItem>
              <SelectItem value="Very Hard">Very Hard</SelectItem>
              <SelectItem value="Expert">Expert</SelectItem>
            </SelectContent>
          </Select>
          <Link href="/contests/create">
            <Button className="w-full sm:w-auto gap-2">
              <PlusCircle className="h-4 w-4" />
              Create Contest
            </Button>
          </Link>
        </div>
      </div>

      <Tabs defaultValue="upcoming" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-8">
          <TabsTrigger value="upcoming" className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            Upcoming
          </TabsTrigger>
          <TabsTrigger value="past" className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            Past
          </TabsTrigger>
          <TabsTrigger value="my" className="flex items-center gap-2">
            <Trophy className="h-4 w-4" />
            My Contests
          </TabsTrigger>
          <TabsTrigger value="created" className="flex items-center gap-2">
            <PlusCircle className="h-4 w-4" />
            Created by Me
          </TabsTrigger>
        </TabsList>

        {/* Upcoming Contests Tab */}
        <TabsContent value="upcoming" className="space-y-6">
          {filteredContests.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {filteredContests.map((contest) => (
                <Card
                  key={contest.contest_id}
                  className="overflow-hidden transition-all hover:shadow-md group animate-fade-in"
                >
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-2">
                        <div className={`w-3 h-3 rounded-full ${difficultyColor[contest.difficulty as keyof typeof difficultyColor]}`} />
                        <span className="text-sm text-muted-foreground">{contest.difficulty}</span>
                      </div>
                      <Badge variant="outline" className="flex items-center gap-1">
                        <FileText className="h-3 w-3" />
                        {contest.problem_count} Problems
                      </Badge>
                    </div>
                    <Link href={`/contests/${contest.contest_id}`}>
                      <CardTitle className="text-xl hover:text-primary transition-colors">{contest.title}</CardTitle>
                    </Link>
                    <p className="text-sm text-muted-foreground line-clamp-2 mt-2">{contest.description}</p>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span>Starts: {new Date(contest.start_time).toLocaleString()}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="h-4 w-4 text-muted-foreground" />
                          <span>{contest.registered_users} registered</span>
                        </div>
                      </div>

                      {/* Countdown Timer */}
                      {timeRemaining[contest.contest_id] && (
                        <div className="bg-muted/50 rounded-lg p-3">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium">Starts in:</span>
                            <Timer className="h-4 w-4 text-primary animate-pulse" />
                          </div>
                          <div className="flex justify-between text-center">
                            <div className="bg-background rounded p-2 flex-1 mx-1">
                              <div className="text-lg font-bold">{timeRemaining[contest.contest_id].days}</div>
                              <div className="text-xs text-muted-foreground">Days</div>
                            </div>
                            <div className="bg-background rounded p-2 flex-1 mx-1">
                              <div className="text-lg font-bold">{timeRemaining[contest.contest_id].hours}</div>
                              <div className="text-xs text-muted-foreground">Hours</div>
                            </div>
                            <div className="bg-background rounded p-2 flex-1 mx-1">
                              <div className="text-lg font-bold">{timeRemaining[contest.contest_id].minutes}</div>
                              <div className="text-xs text-muted-foreground">Mins</div>
                            </div>
                            <div className="bg-background rounded p-2 flex-1 mx-1">
                              <div className="text-lg font-bold">{timeRemaining[contest.contest_id].seconds}</div>
                              <div className="text-xs text-muted-foreground">Secs</div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between pt-3 border-t">
                    <Link href={`/contests/${contest.contest_id}`}>
                      <Button variant="outline" size="sm" className="gap-1">
                        <BookOpen className="h-4 w-4" />
                        Details
                      </Button>
                    </Link>
                    {contest.is_registered ? (
                      <Button variant="secondary" size="sm" className="gap-1" disabled>
                        <CheckCircle className="h-4 w-4" />
                        Registered
                      </Button>
                    ) : (
                      <Button
                        size="sm"
                        className="gap-1 group-hover:animate-pulse"
                        onClick={() => handleRegister(contest)}
                      >
                        <Trophy className="h-4 w-4" />
                        Register
                      </Button>
                    )}
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-muted/30 rounded-lg">
              <Calendar className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-xl font-bold mb-2">No Upcoming Contests</h3>
              <p className="text-muted-foreground max-w-md mx-auto">
                There are no upcoming contests matching your search criteria. Check back later or adjust your filters.
              </p>
            </div>
          )}
        </TabsContent>

        {/* Past Contests Tab */}
        <TabsContent value="past" className="space-y-6">
          {filteredContests.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {filteredContests.map((contest) => (
                <Card
                  key={contest.contest_id}
                  className="overflow-hidden transition-all hover:shadow-md group animate-fade-in"
                >
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-2">
                        <div className={`w-3 h-3 rounded-full ${difficultyColor[contest.difficulty as keyof typeof difficultyColor]}`} />
                        <span className="text-sm text-muted-foreground">{contest.difficulty}</span>
                      </div>
                      <Badge variant="outline" className="flex items-center gap-1">
                        <FileText className="h-3 w-3" />
                        {contest.problem_count} Problems
                      </Badge>
                    </div>
                    <Link href={`/contests/${contest.contest_id}`}>
                      <CardTitle className="text-xl hover:text-primary transition-colors">{contest.title}</CardTitle>
                    </Link>
                    <p className="text-sm text-muted-foreground line-clamp-2 mt-2">{contest.description}</p>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex flex-col gap-2 text-sm">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span>Started: {contest.start_time.toLocaleString()}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span>Ended: {new Date(contest.end_time).toLocaleString()}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="h-4 w-4 text-muted-foreground" />
                          <span>{contest.registered_users} participants</span>
                        </div>
                      </div>

                      {/* Contest Status */}
                      <div className="bg-muted/50 rounded-lg p-3 flex items-center justify-between">
                        <span className="text-sm font-medium">Contest Ended</span>
                        <Badge variant="secondary">Results Available</Badge>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between pt-3 border-t">
                    <Link href={`/contests/${contest.contest_id}`}>
                      <Button variant="outline" size="sm" className="gap-1">
                        <BookOpen className="h-4 w-4" />
                        Details
                      </Button>
                    </Link>
                    <Link href={`/contests/${contest.contest_id}/results`}>
                      <Button variant="secondary" size="sm" className="gap-1">
                        <BarChart className="h-4 w-4" />
                        Results
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-muted/30 rounded-lg">
              <Clock className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-xl font-bold mb-2">No Past Contests</h3>
              <p className="text-muted-foreground max-w-md mx-auto">
                There are no past contests matching your search criteria. Adjust your filters to see more contests.
              </p>
            </div>
          )}
        </TabsContent>

        {/* My Contests Tab */}
        <TabsContent value="my" className="space-y-6">
          {filteredContests.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {filteredContests.map((contest) => {
                const status = getContestStatus({ startTime: new Date(contest.start_time), endTime: new Date(contest.end_time) })

                // console.log(contest.contest_id, status)
                
                return (
                  <Card
                    key={contest.contest_id}
                    className={`overflow-hidden transition-all hover:shadow-md group animate-fade-in ${
                      status === "active" ? "border-primary/50 shadow-md" : ""
                    }`}
                  >
                    <CardHeader className="pb-3">
                      <div className="flex justify-between items-start">
                        <div className="flex items-center gap-2">
                          <div className={`w-3 h-3 rounded-full ${difficultyColor[contest.difficulty as keyof typeof difficultyColor]}`} />
                          <span className="text-sm text-muted-foreground">{contest.difficulty}</span>
                        </div>
                        {status === "active" && (
                          <Badge variant="default" className="animate-pulse">
                            <Play className="h-3 w-3 mr-1" />
                            Active
                          </Badge>
                        )}
                        {status === "upcoming" && (
                          <Badge variant="outline">
                            <Calendar className="h-3 w-3 mr-1" />
                            Upcoming
                          </Badge>
                        )}
                        {status === "past" && (
                          <Badge variant="secondary">
                            <Clock className="h-3 w-3 mr-1" />
                            Completed
                          </Badge>
                        )}
                      </div>
                      <Link href={`/contests/${contest.contest_id}`}>
                        <CardTitle className="text-xl hover:text-primary transition-colors">{contest.title}</CardTitle>
                      </Link>
                      <p className="text-sm text-muted-foreground line-clamp-2 mt-2">{contest.description}</p>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex flex-col gap-2 text-sm">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <span>Starts: {contest.start_time.toLocaleString()}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            <span>Ends: {contest.end_time.toLocaleString()}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <FileText className="h-4 w-4 text-muted-foreground" />
                            <span>{contest.problem_count} Problems</span>
                          </div>
                        </div>

                        {/* Timer for active contests */}
                        {status === "active" && timeRemaining[contest.contest_id] && (
                          <div className="bg-primary/10 rounded-lg p-3 border border-primary/20">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-sm font-medium text-primary">Ends in:</span>
                              <Timer className="h-4 w-4 text-primary animate-pulse" />
                            </div>
                            <div className="grid grid-cols-4 gap-2 text-center">
                              <div className="bg-background rounded p-2">
                                <div className="text-lg font-bold">{timeRemaining[contest.contest_id].days}</div>
                                <div className="text-xs text-muted-foreground">Days</div>
                              </div>
                              <div className="bg-background rounded p-2">
                                <div className="text-lg font-bold">{timeRemaining[contest.contest_id].hours}</div>
                                <div className="text-xs text-muted-foreground">Hours</div>
                              </div>
                              <div className="bg-background rounded p-2">
                                <div className="text-lg font-bold">{timeRemaining[contest.contest_id].minutes}</div>
                                <div className="text-xs text-muted-foreground">Mins</div>
                              </div>
                              <div className="bg-background rounded p-2">
                                <div className="text-lg font-bold">{timeRemaining[contest.contest_id].seconds}</div>
                                <div className="text-xs text-muted-foreground">Secs</div>
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Timer for upcoming contests */}
                        {status === "upcoming" && timeRemaining[contest.contest_id] && (
                          <div className="bg-muted/50 rounded-lg p-3">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-sm font-medium">Starts in:</span>
                              <Timer className="h-4 w-4 text-muted-foreground" />
                            </div>
                            <div className="grid grid-cols-4 gap-2 text-center">
                              <div className="bg-background rounded p-2">
                                <div className="text-lg font-bold">{timeRemaining[contest.contest_id].days}</div>
                                <div className="text-xs text-muted-foreground">Days</div>
                              </div>
                              <div className="bg-background rounded p-2">
                                <div className="text-lg font-bold">{timeRemaining[contest.contest_id].hours}</div>
                                <div className="text-xs text-muted-foreground">Hours</div>
                              </div>
                              <div className="bg-background rounded p-2">
                                <div className="text-lg font-bold">{timeRemaining[contest.contest_id].minutes}</div>
                                <div className="text-xs text-muted-foreground">Mins</div>
                              </div>
                              <div className="bg-background rounded p-2">
                                <div className="text-lg font-bold">{timeRemaining[contest.contest_id].seconds}</div>
                                <div className="text-xs text-muted-foreground">Secs</div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between pt-3 border-t">
                      {status === "active" ? (
                        <Link href={`/contests/${contest.contest_id}`} className="w-full">
                          <Button className="w-full gap-1 group-hover:animate-pulse">
                            <Play className="h-4 w-4" />
                            Enter Contest
                          </Button>
                        </Link>
                      ) : status === "upcoming" ? (
                        <Link href={`/contests/${contest.contest_id}`} className="w-full">
                          <Button variant="outline" className="w-full gap-1">
                            <BookOpen className="h-4 w-4" />
                            View Details
                          </Button>
                        </Link>
                      ) : (
                        <>
                          <Link href={`/contests/${contest.contest_id}`}>
                            <Button variant="outline" size="sm" className="gap-1">
                              <BookOpen className="h-4 w-4" />
                              Details
                            </Button>
                          </Link>
                          <Link href={`/contests/${contest.contest_id}/results`}>
                            <Button variant="secondary" size="sm" className="gap-1">
                              <BarChart className="h-4 w-4" />
                              Results
                            </Button>
                          </Link>
                        </>
                      )}
                    </CardFooter>
                  </Card>
                )
              })}
            </div>
          ) : (
            <div className="text-center py-12 bg-muted/30 rounded-lg">
              <Trophy className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-xl font-bold mb-2">No Registered Contests</h3>
              <p className="text-muted-foreground max-w-md mx-auto">
                You haven't registered for any contests yet. Browse upcoming contests and register to participate.
              </p>
              <Button className="mt-4" onClick={() => setActiveTab("upcoming")}>
                View Upcoming Contests
              </Button>
            </div>
          )}
        </TabsContent>
        {/* Created by Me Tab */}
        <TabsContent value="created" className="space-y-6">
          {userCreatedContests.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {userCreatedContests.map((contest) => {
                const status = getContestStatus({ startTime: contest.start_time, endTime: contest.end_time })

                return (
                  <Card
                    key={contest.contest_id}
                    className={`overflow-hidden transition-all hover:shadow-md group animate-fade-in ${
                      status === "active" ? "border-primary/50 shadow-md" : ""
                    }`}
                  >
                    <CardHeader className="pb-3">
                      <div className="flex justify-between items-start">
                        <div className="flex items-center gap-2">
                          <div className={`w-3 h-3 rounded-full ${difficultyColor[contest.difficulty as keyof typeof difficultyColor]}`} />
                          <span className="text-sm text-muted-foreground">{contest.difficulty}</span>
                        </div>
                        <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                          <PlusCircle className="h-3 w-3 mr-1" />
                          Created by You
                        </Badge>
                      </div>
                      <Link href={`/contests/${contest.contest_id}`}>
                        <CardTitle className="text-xl hover:text-primary transition-colors">{contest.title}</CardTitle>
                      </Link>
                      <p className="text-sm text-muted-foreground line-clamp-2 mt-2">{contest.description}</p>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex flex-col gap-2 text-sm">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <span>Starts: {contest.start_time.toLocaleString()}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            <span>Ends: {contest.end_time.toLocaleString()}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Users className="h-4 w-4 text-muted-foreground" />
                            <span>{contest.registered_users} participants</span>
                          </div>
                        </div>

                        {/* Share Link */}
                        <div className="bg-muted/50 rounded-lg p-3">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium">Share Link:</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Input value={contest.share_link} readOnly className="text-xs font-mono" />
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Button
                                    variant="outline"
                                    size="icon"
                                    onClick={() => handleCopyLink({ link: contest.share_link })}
                                    className={
                                      copiedLink === contest.share_link
                                        ? "bg-green-500/10 text-green-600 border-green-600/20"
                                        : ""
                                    }
                                  >
                                    <Copy className="h-4 w-4" />
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                  {copiedLink === contest.share_link ? "Copied!" : "Copy link"}
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          </div>
                        </div>

                        {/* Timer for active or upcoming contests */}
                        {(status === "active" || status === "upcoming") && timeRemaining[contest.contest_id] && (
                          <div
                            className={`rounded-lg p-3 ${status === "active" ? "bg-primary/10 border border-primary/20" : "bg-muted/50"}`}
                          >
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-sm font-medium">
                                {status === "active" ? "Ends in:" : "Starts in:"}
                              </span>
                              <Timer
                                className={`h-4 w-4 ${status === "active" ? "text-primary animate-pulse" : "text-muted-foreground"}`}
                              />
                            </div>
                            <div className="grid grid-cols-4 gap-2 text-center">
                              <div className="bg-background rounded p-2">
                                <div className="text-lg font-bold">{timeRemaining[contest.contest_id].days}</div>
                                <div className="text-xs text-muted-foreground">Days</div>
                              </div>
                              <div className="bg-background rounded p-2">
                                <div className="text-lg font-bold">{timeRemaining[contest.contest_id].hours}</div>
                                <div className="text-xs text-muted-foreground">Hours</div>
                              </div>
                              <div className="bg-background rounded p-2">
                                <div className="text-lg font-bold">{timeRemaining[contest.contest_id].minutes}</div>
                                <div className="text-xs text-muted-foreground">Mins</div>
                              </div>
                              <div className="bg-background rounded p-2">
                                <div className="text-lg font-bold">{timeRemaining[contest.contest_id].seconds}</div>
                                <div className="text-xs text-muted-foreground">Secs</div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between pt-3 border-t">
                      <Link href={`/contests/${contest.contest_id}`}>
                        <Button variant="outline" size="sm" className="gap-1">
                          <BookOpen className="h-4 w-4" />
                          View Details
                        </Button>
                      </Link>
                      <Link href={`/contests/${contest.contest_id}/edit`}>
                        <Button variant="secondary" size="sm" className="gap-1">
                          <PlusCircle className="h-4 w-4" />
                          Edit Contest
                        </Button>
                      </Link>
                    </CardFooter>
                  </Card>
                )
              })}
            </div>
          ) : (
            <div className="text-center py-12 bg-muted/30 rounded-lg">
              <PlusCircle className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-xl font-bold mb-2">No Created Contests</h3>
              <p className="text-muted-foreground max-w-md mx-auto">
                You haven't created any contests yet. Create your own custom contest to share with others.
              </p>
              <Link href="/contests/create">
                <Button className="mt-4 gap-2">
                  <PlusCircle className="h-4 w-4" />
                  Create Contest
                </Button>
              </Link>
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* Registration Dialog */}
      <Dialog open={registrationOpen} onOpenChange={setRegistrationOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Contest Registration</DialogTitle>
            <DialogDescription>
              You are registering for <span className="font-medium">{selectedContest?.title}</span>
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="bg-muted rounded-lg p-4 text-sm">
              <h4 className="font-medium mb-2 flex items-center">
                <FileText className="h-4 w-4 mr-2" />
                Contest Rules
              </h4>
              <ul className="space-y-2 list-disc pl-5">
                <li>The contest will start at the scheduled time and last for the specified duration.</li>
                <li>You must solve the problems independently without external help.</li>
                <li>You can submit solutions multiple times, but only the highest-scoring submission will count.</li>
                <li>Partial credit may be awarded for partially correct solutions.</li>
                <li>The leaderboard will be updated in real-time during the contest.</li>
                <li>Academic integrity violations will result in disqualification.</li>
              </ul>
            </div>

            <div className="bg-muted rounded-lg p-4 text-sm">
              <h4 className="font-medium mb-2 flex items-center">
                <AlertTriangle className="h-4 w-4 mr-2" />
                Important Information
              </h4>
              <p>
                By registering for this contest, you agree to abide by the rules and code of conduct of mathXplorer.
                Violation of these rules may result in disqualification and potential account restrictions.
              </p>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setRegistrationOpen(false)}>
              Cancel
            </Button>
            <Button onClick={confirmRegistration} className="gap-1">
              <CheckCircle className="h-4 w-4" />
              Accept & Register
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

