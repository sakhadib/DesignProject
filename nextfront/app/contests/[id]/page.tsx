"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import {
  ChevronLeft,
  Calendar,
  Clock,
  Trophy,
  Target,
  Users,
  ArrowRight,
  CheckCircle,
  AlertTriangle,
  Timer,
  Play,
  FileText,
  BarChart,
  Info,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Sample contest data
const contests = [
  {
    contest_id: 1,
    title: "Spring Mathematics Challenge",
    problem_count: 8,
    start_time: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // 2 days in future
    end_time: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
    description:
      "Test your mathematical skills in this seasonal challenge covering algebra, geometry, and number theory.",
    difficulty: "Medium",
    registered_users: 156,
    is_registered: false,
    problems: [
      {
        problem_id: 101,
        title: "Polynomial Roots",
        target: "v2",
        tags: ["Algebra", "Polynomials"],
        xp: 120,
        submission_count: 0,
      },
      {
        problem_id: 102,
        title: "Circle Geometry",
        target: "v2",
        tags: ["Geometry", "Circles"],
        xp: 150,
        submission_count: 0,
      },
      {
        problem_id: 103,
        title: "Prime Factorization",
        target: "v3",
        tags: ["Number Theory", "Primes"],
        xp: 180,
        submission_count: 0,
      },
      {
        problem_id: 104,
        title: "Sequence Patterns",
        target: "v2",
        tags: ["Sequences", "Patterns"],
        xp: 130,
        submission_count: 0,
      },
      {
        problem_id: 105,
        title: "Probability Problem",
        target: "v3",
        tags: ["Probability", "Combinatorics"],
        xp: 200,
        submission_count: 0,
      },
      {
        problem_id: 106,
        title: "Logarithmic Equations",
        target: "v3",
        tags: ["Algebra", "Logarithms"],
        xp: 170,
        submission_count: 0,
      },
      {
        problem_id: 107,
        title: "Vector Operations",
        target: "v4",
        tags: ["Vectors", "Linear Algebra"],
        xp: 220,
        submission_count: 0,
      },
      {
        problem_id: 108,
        title: "Trigonometric Identities",
        target: "v3",
        tags: ["Trigonometry", "Identities"],
        xp: 160,
        submission_count: 0,
      },
    ],
  },
  {
    contest_id: 2,
    title: "Advanced Calculus Competition",
    problem_count: 6,
    start_time: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
    end_time: new Date(Date.now() + 5 * 60 * 60 * 1000), // 5 hours in future
    description:
      "A challenging contest focused on differential and integral calculus, with problems ranging from moderate to difficult.",
    difficulty: "Hard",
    registered_users: 89,
    is_registered: true,
    problems: [
      {
        problem_id: 201,
        title: "Limits and Continuity",
        target: "v3",
        tags: ["Calculus", "Limits"],
        xp: 150,
        submission_count: 12,
      },
      {
        problem_id: 202,
        title: "Differentiation Techniques",
        target: "v3",
        tags: ["Calculus", "Differentiation"],
        xp: 180,
        submission_count: 8,
      },
      {
        problem_id: 203,
        title: "Integration Methods",
        target: "v4",
        tags: ["Calculus", "Integration"],
        xp: 200,
        submission_count: 5,
      },
      {
        problem_id: 204,
        title: "Applications of Derivatives",
        target: "v3",
        tags: ["Calculus", "Applications"],
        xp: 170,
        submission_count: 9,
      },
      {
        problem_id: 205,
        title: "Improper Integrals",
        target: "v4",
        tags: ["Calculus", "Integration"],
        xp: 220,
        submission_count: 3,
      },
      {
        problem_id: 206,
        title: "Series and Convergence",
        target: "v4",
        tags: ["Calculus", "Series"],
        xp: 210,
        submission_count: 4,
      },
    ],
  },
]

// Helper function to determine contest status
interface ContestStatusParams {
    startTime: Date;
    endTime: Date;
}

type ContestStatus = "upcoming" | "active" | "past";

const getContestStatus = ({ startTime, endTime }: ContestStatusParams): ContestStatus => {
    const now = new Date();
    if (now < startTime) return "upcoming";
    if (now > endTime) return "past";
    return "active";
};

// Helper function to format time remaining
interface TimeRemaining {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
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
};

// Statistics data
const statistics = {
  total_submission_count: 41,
  my_submission_count: 3,
  highest_xp_ever_reached: 780,
}

export default function ContestDetailPage() {
  const { id } = useParams()
  const [contest, setContest] = useState<{
    contest_id: number;
    title: string;
    problem_count: number;
    start_time: Date;
    end_time: Date;
    description: string;
    difficulty: string;
    registered_users: number;
    is_registered: boolean;
    problems: {
      problem_id: number;
      title: string;
      target: string;
      tags: string[];
      xp: number;
      submission_count: number;
    }[];
  } | null>(null)
  const [timeRemaining, setTimeRemaining] = useState<TimeRemaining | null>(null)
  const [registrationOpen, setRegistrationOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("problems")

  useEffect(() => {
    // Find the contest with the matching ID
    const foundContest = contests.find((c) => c.contest_id.toString() === id)
    if (foundContest) {
      setContest(foundContest)
    }
  }, [id])

  // Update time remaining
  useEffect(() => {
    if (!contest) return

    const timer = setInterval(() => {
      const status = getContestStatus({ startTime: contest.start_time, endTime: contest.end_time })
      if (status === "upcoming") {
        setTimeRemaining(formatTimeRemaining(contest.start_time))
      } else if (status === "active") {
        setTimeRemaining(formatTimeRemaining(contest.end_time))
      } else {
        setTimeRemaining(null)
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [contest])

  const confirmRegistration = () => {
    if (contest) {
      alert(`You have successfully registered for ${contest.title}!`)
    }
    setRegistrationOpen(false)
  }

  if (!contest) {
    return (
      <div className="container py-12 text-center">
        <p>Loading...</p>
      </div>
    )
  }

  const status = getContestStatus({ startTime: contest.start_time, endTime: contest.end_time })

  return (
    <div className="container py-12">
      <Link href="/contests" className="flex items-center text-sm text-muted-foreground hover:text-primary mb-6">
        <ChevronLeft className="h-4 w-4 mr-1" />
        Back to all contests
      </Link>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Main Content */}
        <div className="flex-1">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
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
                <Badge variant="outline" className="flex items-center gap-1">
                  <FileText className="h-3 w-3" />
                  {contest.problem_count} Problems
                </Badge>
              </div>
              <h1 className="text-3xl font-bold">{contest.title}</h1>
              <p className="text-muted-foreground mt-2">{contest.description}</p>
            </div>

            {status === "upcoming" && !contest.is_registered && (
              <Button onClick={() => setRegistrationOpen(true)} className="shrink-0 gap-1">
                <Trophy className="h-4 w-4" />
                Register for Contest
              </Button>
            )}

            {status === "active" && contest.is_registered && (
              <Button className="shrink-0 gap-1 animate-pulse">
                <Play className="h-4 w-4" />
                Enter Contest
              </Button>
            )}
          </div>

          {/* Contest Info Card */}
          <Card className="mb-8">
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex flex-col">
                  <span className="text-sm text-muted-foreground mb-1">Start Time</span>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2 text-primary" />
                    <span>{contest.start_time.toLocaleString()}</span>
                  </div>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm text-muted-foreground mb-1">End Time</span>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-2 text-primary" />
                    <span>{contest.end_time.toLocaleString()}</span>
                  </div>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm text-muted-foreground mb-1">Participants</span>
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-2 text-primary" />
                    <span>{contest.registered_users} registered</span>
                  </div>
                </div>
              </div>

              {/* Timer */}
              {timeRemaining && (
                <div
                  className={`mt-6 rounded-lg p-4 ${
                    status === "active" ? "bg-primary/10 border border-primary/20" : "bg-muted"
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-medium">
                      {status === "active" ? "Contest ends in:" : "Contest starts in:"}
                    </span>
                    <Timer className={`h-4 w-4 ${status === "active" ? "text-primary animate-pulse" : ""}`} />
                  </div>
                  <div className="grid grid-cols-4 gap-4">
                    <div className="bg-background rounded-lg p-3 text-center">
                      <div className="text-2xl font-bold">{timeRemaining.days}</div>
                      <div className="text-xs text-muted-foreground">Days</div>
                    </div>
                    <div className="bg-background rounded-lg p-3 text-center">
                      <div className="text-2xl font-bold">{timeRemaining.hours}</div>
                      <div className="text-xs text-muted-foreground">Hours</div>
                    </div>
                    <div className="bg-background rounded-lg p-3 text-center">
                      <div className="text-2xl font-bold">{timeRemaining.minutes}</div>
                      <div className="text-xs text-muted-foreground">Minutes</div>
                    </div>
                    <div className="bg-background rounded-lg p-3 text-center">
                      <div className="text-2xl font-bold">{timeRemaining.seconds}</div>
                      <div className="text-xs text-muted-foreground">Seconds</div>
                    </div>
                  </div>
                </div>
              )}

              {/* Contest Ended Notice */}
              {status === "past" && (
                <div className="mt-6 bg-muted rounded-lg p-4 flex items-center gap-4">
                  <div className="bg-muted-foreground/20 p-3 rounded-full">
                    <Clock className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Contest has ended</h3>
                    <p className="text-sm text-muted-foreground">
                      This contest is no longer active. You can view the problems and results, but new submissions are
                      not accepted.
                    </p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Tabs for Problems and Statistics */}
          <Tabs defaultValue="problems" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-6">
              <TabsTrigger value="problems" className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Problems
              </TabsTrigger>
              <TabsTrigger value="statistics" className="flex items-center gap-2">
                <BarChart className="h-4 w-4" />
                Statistics
              </TabsTrigger>
              {status !== "upcoming" && (
                <TabsTrigger value="leaderboard" className="flex items-center gap-2">
                  <Trophy className="h-4 w-4" />
                  Leaderboard
                </TabsTrigger>
              )}
            </TabsList>

            {/* Problems Tab */}
            <TabsContent value="problems">
              {status === "upcoming" && !contest.is_registered ? (
                <div className="text-center py-12 bg-muted/30 rounded-lg">
                  <AlertTriangle className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-xl font-bold mb-2">Registration Required</h3>
                  <p className="text-muted-foreground max-w-md mx-auto mb-6">
                    You need to register for this contest to view the problems. Registration is open until the contest
                    starts.
                  </p>
                  <Button onClick={() => setRegistrationOpen(true)}>Register Now</Button>
                </div>
              ) : (
                <Card>
                  <CardHeader>
                    <CardTitle>Contest Problems</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-12">#</TableHead>
                          <TableHead>Problem</TableHead>
                          <TableHead>Target</TableHead>
                          <TableHead>Tags</TableHead>
                          <TableHead className="text-right">XP</TableHead>
                          <TableHead className="text-right">Submissions</TableHead>
                          <TableHead></TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {contest.problems.map((problem, index) => (
                          <TableRow key={problem.problem_id} className="group">
                            <TableCell className="font-medium">{index + 1}</TableCell>
                            <TableCell>
                              <Link
                                href={`/contests/${contest.contest_id}/problems/${problem.problem_id}`}
                                className="font-medium hover:text-primary transition-colors"
                              >
                                {problem.title}
                              </Link>
                            </TableCell>
                            <TableCell>
                              <Badge variant="outline" className="flex items-center gap-1 w-fit">
                                <Target className="h-3 w-3" />
                                {problem.target}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <div className="flex flex-wrap gap-1">
                                {problem.tags.map((tag) => (
                                  <Badge key={tag} variant="secondary" className="text-xs">
                                    {tag}
                                  </Badge>
                                ))}
                              </div>
                            </TableCell>
                            <TableCell className="text-right font-mono">{problem.xp} XP</TableCell>
                            <TableCell className="text-right">{problem.submission_count}</TableCell>
                            <TableCell>
                              {status === "active" && contest.is_registered ? (
                                <Link href={`/contests/${contest.contest_id}/problems/${problem.problem_id}`}>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                                  >
                                    Solve
                                    <ArrowRight className="ml-1 h-4 w-4" />
                                  </Button>
                                </Link>
                              ) : (
                                <Link href={`/contests/${contest.contest_id}/problems/${problem.problem_id}`}>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                                  >
                                    View
                                    <ArrowRight className="ml-1 h-4 w-4" />
                                  </Button>
                                </Link>
                              )}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            {/* Statistics Tab */}
            <TabsContent value="statistics">
              <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-3 mb-8">
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-sm font-medium text-muted-foreground">Total Submissions</h3>
                      <div className="bg-primary/10 p-2 rounded-full">
                        <FileText className="h-4 w-4 text-primary" />
                      </div>
                    </div>
                    <div className="text-2xl font-bold">{statistics.total_submission_count}</div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-sm font-medium text-muted-foreground">My Submissions</h3>
                      <div className="bg-primary/10 p-2 rounded-full">
                        <CheckCircle className="h-4 w-4 text-primary" />
                      </div>
                    </div>
                    <div className="text-2xl font-bold">{statistics.my_submission_count}</div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-sm font-medium text-muted-foreground">Highest XP Reached</h3>
                      <div className="bg-primary/10 p-2 rounded-full">
                        <Trophy className="h-4 w-4 text-primary" />
                      </div>
                    </div>
                    <div className="text-2xl font-bold">{statistics.highest_xp_ever_reached}</div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Submission Progress</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {contest.problems.map((problem, index) => (
                      <div key={problem.problem_id}>
                        <div className="flex justify-between items-center mb-2">
                          <div className="flex items-center">
                            <span className="font-medium mr-2">{index + 1}.</span>
                            <span>{problem.title}</span>
                          </div>
                          <span className="text-sm text-muted-foreground">{problem.xp} XP</span>
                        </div>
                        <div className="flex items-center gap-4">
                          <Progress value={problem.submission_count > 0 ? 100 : 0} className="h-2 flex-1" />
                          <span className="text-sm font-medium w-24 text-right">
                            {problem.submission_count > 0 ? "Submitted" : "Not Attempted"}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Leaderboard Tab */}
            <TabsContent value="leaderboard">
              {status === "upcoming" ? (
                <div className="text-center py-12 bg-muted/30 rounded-lg">
                  <Trophy className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-xl font-bold mb-2">Leaderboard Not Available</h3>
                  <p className="text-muted-foreground max-w-md mx-auto">
                    The leaderboard will be available once the contest begins.
                  </p>
                </div>
              ) : (
                <Card>
                  <CardHeader>
                    <CardTitle>Contest Leaderboard</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-12">Rank</TableHead>
                          <TableHead>Participant</TableHead>
                          <TableHead className="text-right">Problems Solved</TableHead>
                          <TableHead className="text-right">Total XP</TableHead>
                          <TableHead className="text-right">Last Submission</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow className="bg-muted/30">
                          <TableCell className="font-medium">1</TableCell>
                          <TableCell className="font-medium">MathWizard42</TableCell>
                          <TableCell className="text-right">6/6</TableCell>
                          <TableCell className="text-right font-mono">1130 XP</TableCell>
                          <TableCell className="text-right">2h 15m ago</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">2</TableCell>
                          <TableCell className="font-medium">AlgorithmAce</TableCell>
                          <TableCell className="text-right">5/6</TableCell>
                          <TableCell className="text-right font-mono">980 XP</TableCell>
                          <TableCell className="text-right">1h 45m ago</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">3</TableCell>
                          <TableCell className="font-medium">CalculusKing</TableCell>
                          <TableCell className="text-right">5/6</TableCell>
                          <TableCell className="text-right font-mono">920 XP</TableCell>
                          <TableCell className="text-right">2h 30m ago</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">4</TableCell>
                          <TableCell className="font-medium">ProbabilityPro</TableCell>
                          <TableCell className="text-right">4/6</TableCell>
                          <TableCell className="text-right font-mono">750 XP</TableCell>
                          <TableCell className="text-right">1h 20m ago</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">5</TableCell>
                          <TableCell className="font-medium">NumberTheoryNerd</TableCell>
                          <TableCell className="text-right">4/6</TableCell>
                          <TableCell className="text-right font-mono">720 XP</TableCell>
                          <TableCell className="text-right">3h 10m ago</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
          </Tabs>
        </div>

        {/* Sidebar */}
        <div className="w-full md:w-80 space-y-6">
          {/* Contest Status Card */}
          <Card>
            <CardHeader>
              <CardTitle>Contest Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Status</span>
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

                <div className="flex items-center justify-between">
                  <span className="text-sm">Difficulty</span>
                  <Badge variant="outline">{contest.difficulty}</Badge>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm">Problems</span>
                  <span className="font-medium">{contest.problem_count}</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm">Registered</span>
                  <span className="font-medium">{contest.registered_users} users</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm">Your Status</span>
                  {contest.is_registered ? (
                    <Badge variant="outline" className="bg-green-500/10 text-green-600 border-green-600/20">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Registered
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="bg-yellow-500/10 text-yellow-600 border-yellow-600/20">
                      <AlertTriangle className="h-3 w-3 mr-1" />
                      Not Registered
                    </Badge>
                  )}
                </div>
              </div>

              {status === "upcoming" && !contest.is_registered && (
                <Button className="w-full mt-6 gap-1" onClick={() => setRegistrationOpen(true)}>
                  <Trophy className="h-4 w-4" />
                  Register Now
                </Button>
              )}

              {status === "active" && contest.is_registered && (
                <Button className="w-full mt-6 gap-1 animate-pulse">
                  <Play className="h-4 w-4" />
                  Enter Contest
                </Button>
              )}
            </CardContent>
          </Card>

          {/* Contest Rules Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Info className="h-4 w-4" />
                Contest Rules
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start gap-2">
                  <div className="bg-primary/10 p-1 rounded-full mt-0.5">
                    <CheckCircle className="h-3 w-3 text-primary" />
                  </div>
                  <span>The contest will start at the scheduled time and last for the specified duration.</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="bg-primary/10 p-1 rounded-full mt-0.5">
                    <CheckCircle className="h-3 w-3 text-primary" />
                  </div>
                  <span>You must solve the problems independently without external help.</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="bg-primary/10 p-1 rounded-full mt-0.5">
                    <CheckCircle className="h-3 w-3 text-primary" />
                  </div>
                  <span>
                    You can submit solutions multiple times, but only the highest-scoring submission will count.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="bg-primary/10 p-1 rounded-full mt-0.5">
                    <CheckCircle className="h-3 w-3 text-primary" />
                  </div>
                  <span>Partial credit may be awarded for partially correct solutions.</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="bg-primary/10 p-1 rounded-full mt-0.5">
                    <CheckCircle className="h-3 w-3 text-primary" />
                  </div>
                  <span>Academic integrity violations will result in disqualification.</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Related Contests Card */}
          <Card>
            <CardHeader>
              <CardTitle>Related Contests</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-3 group">
                  <div className="bg-muted p-2 rounded-md">
                    <Trophy className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div>
                    <Link href="/contests/3" className="font-medium group-hover:text-primary transition-colors">
                      Probability and Statistics Showdown
                    </Link>
                    <p className="text-xs text-muted-foreground">Starts in 5 days</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 group">
                  <div className="bg-muted p-2 rounded-md">
                    <Trophy className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div>
                    <Link href="/contests/6" className="font-medium group-hover:text-primary transition-colors">
                      Algebra and Linear Algebra Contest
                    </Link>
                    <p className="text-xs text-muted-foreground">Starts in 10 days</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 group">
                  <div className="bg-muted p-2 rounded-md">
                    <Trophy className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div>
                    <Link href="/contests/4" className="font-medium group-hover:text-primary transition-colors">
                      Number Theory Masters
                    </Link>
                    <p className="text-xs text-muted-foreground">Ended 14 days ago</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Registration Dialog */}
      <Dialog open={registrationOpen} onOpenChange={setRegistrationOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Contest Registration</DialogTitle>
            <DialogDescription>
              You are registering for <span className="font-medium">{contest.title}</span>
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

