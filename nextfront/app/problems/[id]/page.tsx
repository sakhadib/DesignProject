"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import {
  ChevronLeft,
  Target,
  Trophy,
  Send,
  X,
  Sparkles,
  Save,
  Clock,
  Calendar,
  CheckCircle2,
  GripVertical,
} from "lucide-react"
import ReactMarkdown from "react-markdown"
import remarkMath from "remark-math"
import rehypeKatex from "rehype-katex"
import "katex/dist/katex.min.css"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Sample problems data
const problems = [
  {
    id: 1,
    title: "Prime Number Factorization",
    description:
      "Develop an efficient algorithm to find the prime factorization of a given integer n. Your solution should handle large numbers efficiently.\n\n## Input\n\nA positive integer n (1 ≤ n ≤ 10^12).\n\n## Output\n\nThe prime factorization of n in the format: p₁^a₁ × p₂^a₂ × ... × pₖ^aₖ, where p₁, p₂, ..., pₖ are prime numbers and a₁, a₂, ..., aₖ are positive integers.\n\n## Example\n\nInput: 60\nOutput: 2^2 × 3^1 × 5^1\n\nInput: 100\nOutput: 2^2 × 5^2\n\n## Note\n\nYour algorithm should be efficient enough to handle large inputs. Consider using optimizations such as trial division up to the square root of n, the Sieve of Eratosthenes for generating primes, or more advanced techniques for very large numbers.",
    tags: ["Number Theory", "Algorithms", "Prime Numbers"],
    xp: 150,
    target: "v2",
    difficulty: "Medium",
    submissions: 342,
    successRate: 68,
  },
  {
    id: 2,
    title: "Euler's Method for Differential Equations",
    description:
      "Implement Euler's method to solve a first-order ordinary differential equation. Compare the numerical solution with the analytical solution when available.\n\n## Problem Statement\n\nConsider the differential equation:\n\n$$\\frac{dy}{dx} = f(x, y)$$\n\nwith the initial condition $y(x_0) = y_0$.\n\n## Task\n\n1. Implement Euler's method to approximate the solution of the differential equation.\n2. Apply your implementation to solve the following specific problem:\n   $$\\frac{dy}{dx} = y - x^2 + 1$$\n   with the initial condition $y(0) = 0.5$ on the interval $[0, 2]$.\n3. Compare your numerical solution with the analytical solution, which is:\n   $$y(x) = (x + 1)^2 - 0.5e^x$$\n\n## Requirements\n\n- Use a step size of h = 0.1 for your numerical solution.\n- Calculate and report the global error at x = 2.\n- Discuss how the error changes if you decrease the step size to h = 0.05.\n\n## Submission\n\nYour submission should include:\n1. The algorithm implementation\n2. A table of values showing x, the numerical solution y, the analytical solution, and the error\n3. A brief discussion of the results and the effect of step size on accuracy",
    tags: ["Calculus", "Differential Equations", "Numerical Methods"],
    xp: 200,
    target: "v3",
    difficulty: "Hard",
    submissions: 187,
    successRate: 52,
  },
]

// Sample user submissions
const userSubmissions = [
  {
    id: "sub_001",
    problem_id: 1,
    date: "2024-03-15",
    time: "14:32:45",
    gained_xp: 120,
    status: "Attempted",
  },
  {
    id: "sub_002",
    problem_id: 1,
    date: "2024-03-16",
    time: "09:15:22",
    gained_xp: 135,
    status: "Completed",
  },
  {
    id: "sub_003",
    problem_id: 1,
    date: "2024-03-18",
    time: "16:45:10",
    gained_xp: 150,
    status: "Completed",
  },
]

// Sample AI chat messages
const initialMessages = [
  {
    role: "assistant",
    content: "Hello! I'm your math assistant. How can I help you with this problem?",
  },
]

export default function ProblemPage() {
  const { id } = useParams()
  const [problem, setProblem] = useState<{
    id: number
    title: string
    description: string
    tags: string[]
    xp: number
    target: string
    difficulty: keyof typeof difficultyColor
    submissions: number
    successRate: number
  } | null>(null)
  const [solution, setSolution] = useState("")
  const [isChatOpen, setIsChatOpen] = useState(false)
  const [messages, setMessages] = useState(initialMessages)
  const [newMessage, setNewMessage] = useState("")
  const [activeTab, setActiveTab] = useState("problem")
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const [sidebarWidth, setSidebarWidth] = useState(350)
  const [isResizing, setIsResizing] = useState(false)

const handleResizeStart = (e: React.MouseEvent<HTMLDivElement>): void => {
    e.preventDefault()
    setIsResizing(true)
    document.addEventListener("mousemove", handleResizeMove)
    document.addEventListener("mouseup", handleResizeEnd)
}

  const handleResizeMove = (e: MouseEvent) => {
    if (!isResizing) return
    const newWidth = window.innerWidth - e.clientX
    if (newWidth > 250 && newWidth < 600) {
      setSidebarWidth(newWidth)
    }
  }

  const handleResizeEnd = () => {
    setIsResizing(false)
    document.removeEventListener("mousemove", handleResizeMove)
    document.removeEventListener("mouseup", handleResizeEnd)
  }

  useEffect(() => {
    return () => {
      document.removeEventListener("mousemove", handleResizeMove)
      document.removeEventListener("mouseup", handleResizeEnd)
    }
  }, [isResizing])

  // Find user submissions for this problem
  const mySubmissions = userSubmissions.filter((sub) => sub.problem_id.toString() === id)
  const totalSubmissions = mySubmissions.length
  const maxXp = mySubmissions.length > 0 ? Math.max(...mySubmissions.map((sub) => sub.gained_xp)) : 0

  useEffect(() => {
    // Find the problem with the matching ID
    const foundProblem = problems.find((problem) => problem.id.toString() === id)
    if (foundProblem) {
      setProblem({
        ...foundProblem,
        difficulty: foundProblem.difficulty as keyof typeof difficultyColor,
      })
    }
  }, [id])

  useEffect(() => {
    // Scroll to bottom of messages when new message is added
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [messages])

interface SubmitEvent extends React.FormEvent<HTMLFormElement> {}

const handleSubmit = (e: SubmitEvent): void => {
    e.preventDefault()
    // In a real app, you would submit the solution to your backend
    alert("Solution submitted! (This is just a demo)")
}

interface Message {
    role: "user" | "assistant";
    content: string;
}

interface SendMessageEvent extends React.SyntheticEvent {
    preventDefault: () => void;
}

const handleSendMessage = (e: SendMessageEvent): void => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    // Add user message
    const userMessage: Message = {
        role: "user",
        content: newMessage,
    };
    setMessages([...messages, userMessage]);
    setNewMessage("");

    // Simulate AI response
    setTimeout(() => {
        const aiResponse: Message = {
            role: "assistant",
            content: `I'll help you with that! Let's break down the problem step by step. ${
                newMessage.includes("hint")
                    ? "Consider starting with the fundamental theorem of arithmetic, which states that every integer greater than 1 is either a prime number or can be uniquely expressed as a product of prime numbers."
                    : "What specific part are you struggling with?"
            }`,
        };
        setMessages((prev) => [...prev, aiResponse]);
    }, 1000);
};

  if (!problem) {
    return (
      <div className="container py-12 text-center">
        <p>Loading...</p>
      </div>
    )
  }

  // Map difficulty to color
  const difficultyColor = {
    Easy: "bg-green-500",
    Medium: "bg-yellow-500",
    Hard: "bg-orange-500",
    "Very Hard": "bg-red-500",
    Expert: "bg-purple-500",
  }

  return (
    <div className="container py-12 relative">
      <div className={`flex transition-all duration-300 ${isChatOpen ? "mr-[350px]" : ""}`}>
        <div className="flex-1">
          <div className="mb-6">
            <Link href="/problems" className="flex items-center text-sm text-muted-foreground hover:text-primary mb-4">
              <ChevronLeft className="h-4 w-4 mr-1" />
              Back to all problems
            </Link>

            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
              <h1 className="text-3xl font-bold">{problem.title}</h1>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  <div className={`w-3 h-3 rounded-full ${difficultyColor[problem.difficulty]}`} />
                  <span className="text-sm">{problem.difficulty}</span>
                </div>
                <Badge variant="outline" className="flex items-center gap-1">
                  <Target className="h-3 w-3" />
                  {problem.target}
                </Badge>
                <Badge variant="secondary" className="flex items-center gap-1">
                  <Trophy className="h-3 w-3" />
                  {problem.xp} XP
                </Badge>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-6">
              {problem.tags.map((tag) => (
                <Badge key={tag} variant="outline">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList>
              <TabsTrigger value="problem">Problem</TabsTrigger>
              <TabsTrigger value="solution">Solution</TabsTrigger>
              <TabsTrigger value="statistics">My Statistics</TabsTrigger>
            </TabsList>

            <TabsContent value="problem" className="mt-6">
              <Card>
                <CardContent className="pt-6">
                  <div className="prose prose-purple dark:prose-invert max-w-none prose-lg leading-relaxed">
                    <ReactMarkdown remarkPlugins={[remarkMath]} rehypePlugins={[rehypeKatex]}>
                      {problem.description}
                    </ReactMarkdown>
                  </div>
                </CardContent>
              </Card>

              <div className="mt-8">
                <h2 className="text-xl font-bold mb-4">Submit Your Solution</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <Textarea
                    placeholder="Enter your solution here..."
                    className="min-h-[200px]"
                    value={solution}
                    onChange={(e) => setSolution(e.target.value)}
                  />
                  <div className="flex justify-end">
                    <Button type="submit" disabled={!solution.trim()}>
                      Submit Solution
                    </Button>
                  </div>
                </form>
              </div>
            </TabsContent>

            <TabsContent value="solution" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Your Submissions</CardTitle>
                </CardHeader>
                <CardContent>
                  {mySubmissions.length > 0 ? (
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Submission ID</TableHead>
                          <TableHead>Date</TableHead>
                          <TableHead>Time</TableHead>
                          <TableHead>XP Gained</TableHead>
                          <TableHead>Status</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {mySubmissions.map((submission) => (
                          <TableRow key={submission.id}>
                            <TableCell className="font-mono">{submission.id}</TableCell>
                            <TableCell>{submission.date}</TableCell>
                            <TableCell>{submission.time}</TableCell>
                            <TableCell>{submission.gained_xp}</TableCell>
                            <TableCell>
                              <Badge variant="outline" className="bg-green-500/10 text-green-600 border-green-600/20">
                                <CheckCircle2 className="h-3 w-3 mr-1" />
                                {submission.status}
                              </Badge>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-muted-foreground">You haven't submitted any solutions yet.</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="statistics" className="mt-6">
              <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-3">
                <StatCard title="Total Submissions" value={totalSubmissions} icon={<Save className="h-4 w-4" />} />
                <StatCard title="Max XP Gained" value={maxXp} icon={<Trophy className="h-4 w-4" />} />
                <StatCard
                  title="Progress"
                  value={`${maxXp}/${problem.xp}`}
                  icon={<Target className="h-4 w-4" />}
                  progress={(maxXp / problem.xp) * 100}
                />
              </div>

              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Submission History</CardTitle>
                </CardHeader>
                <CardContent>
                  {mySubmissions.length > 0 ? (
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Submission ID</TableHead>
                          <TableHead>Date</TableHead>
                          <TableHead>Time</TableHead>
                          <TableHead>XP Gained</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {mySubmissions.map((submission) => (
                          <TableRow key={submission.id}>
                            <TableCell className="font-mono">{submission.id}</TableCell>
                            <TableCell>
                              <div className="flex items-center">
                                <Calendar className="h-3 w-3 mr-1" />
                                {submission.date}
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center">
                                <Clock className="h-3 w-3 mr-1" />
                                {submission.time}
                              </div>
                            </TableCell>
                            <TableCell>
                              <Badge variant={submission.gained_xp === problem.xp ? "default" : "secondary"}>
                                {submission.gained_xp} XP
                              </Badge>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-muted-foreground">No submission history available.</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* AI Chat Button */}
    {!isChatOpen && (
      <Button
        variant="outline"
        size="icon"
        className="fixed bottom-6 right-6 rounded-full h-12 w-12 shadow-lg transition-all duration-300 z-50 animate-pulse-slow hover:animate-none"
        onClick={() => setIsChatOpen(true)}
      >
        <Sparkles className="h-5 w-5" />
      </Button>
    )}

      {/* AI Chat Sidebar - Resizable */}
      {isChatOpen && (
        <div
          className="fixed top-0 right-0 h-full bg-background border-l shadow-lg z-40 animate-in slide-in-from-right flex"
          style={{ width: sidebarWidth }}
        >
          {/* Resize Handle */}
          <div
            className="absolute left-0 top-0 h-full w-1 cursor-ew-resize flex items-center justify-center hover:bg-primary/20"
            onMouseDown={handleResizeStart}
          >
            <GripVertical className="h-6 w-6 text-muted-foreground opacity-0 hover:opacity-100" />
          </div>

          {/* <div className="flex flex-col h-full w-full">
            <div className="p-4 border-b flex items-center justify-between">
              <h3 className="font-bold">Math Assistant</h3>
              <Button variant="ghost" size="sm" onClick={() => setIsChatOpen(false)}>
                <X className="h-4 w-4" />
              </Button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message, index) => (
                <div key={index} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[80%] rounded-lg p-3 ${
                      message.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
                    }`}
                  >
                    {message.content}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            <form onSubmit={handleSendMessage} className="p-4 border-t">
              <div className="flex gap-2">
                <Textarea
                  placeholder="Ask for help..."
                  className="min-h-[60px] resize-none"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault()
                      handleSendMessage(e)
                    }
                  }}
                />
                <Button type="submit" size="icon" disabled={!newMessage.trim()}>
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </form>
          </div> */}

            <div className="flex flex-col h-full w-full">
                <div className="p-4 border-b flex items-center justify-between">
                    <h3 className="font-bold">Math Assistant</h3>
                    {/* Move the close button here */}
                    <Button variant="ghost" size="sm" onClick={() => setIsChatOpen(false)}>
                    <X className="h-4 w-4" />
                    </Button>
                </div>

                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {messages.map((message, index) => (
                    <div key={index} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                        <div
                        className={`max-w-[80%] rounded-lg p-3 ${
                            message.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
                        }`}
                        >
                        {message.content}
                        </div>
                    </div>
                    ))}
                    <div ref={messagesEndRef} />
                </div>

                <form onSubmit={handleSendMessage} className="p-4 border-t">
                    <div className="flex gap-2">
                    <Textarea
                        placeholder="Ask for help..."
                        className="min-h-[60px] resize-none"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                            e.preventDefault()
                            handleSendMessage(e)
                        }
                        }}
                    />
                    <Button type="submit" size="icon" disabled={!newMessage.trim()}>
                        <Send className="h-4 w-4" />
                    </Button>
                    </div>
                </form>
            </div>

        </div>
      )}
    </div>
  )
}

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  progress?: number;
}

function StatCard({ title, value, icon, progress }: StatCardProps) {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
          <div className="bg-primary/10 p-2 rounded-full">{icon}</div>
        </div>
        <div className="text-2xl font-bold">{value}</div>
        {progress !== undefined && (
          <div className="mt-2">
            <Progress value={progress} className="h-2" />
          </div>
        )}
      </CardContent>
    </Card>
  )
}

