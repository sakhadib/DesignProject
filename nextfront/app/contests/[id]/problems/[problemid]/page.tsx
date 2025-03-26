"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { ChevronLeft, Trophy, Target, CheckCircle, Timer, Play, Info, Send } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import ReactMarkdown from "react-markdown"
import remarkMath from "remark-math"
import rehypeKatex from "rehype-katex"
import "katex/dist/katex.min.css"

// Sample problem data
const problems = [
  {
    problem_id: 201,
    contest_id: 2,
    title: "Limits and Continuity",
    target: "v3",
    tags: ["Calculus", "Limits"],
    xp: 150,
    submission_count: 12,
    description: `
# Limits and Continuity

## Problem Statement

Consider the function $f(x)$ defined as:

$$f(x) = 
\\begin{cases} 
\\frac{x^2 - 4}{x - 2} & \\text{if } x \\neq 2 \\\\
k & \\text{if } x = 2
\\end{cases}$$

### Part A
Find the value of $k$ that makes $f(x)$ continuous at $x = 2$.

### Part B
For the value of $k$ found in Part A, determine whether $f(x)$ is differentiable at $x = 2$. If it is, find $f'(2)$.

### Part C
Find the values of $x$ where $f(x)$ is not continuous, if any.

## Input Format

This is a proof-based problem. No input is required.

## Output Format

For Part A: The value of $k$.
For Part B: "Yes" or "No" followed by the value of $f'(2)$ if applicable.
For Part C: A list of $x$ values where $f(x)$ is not continuous, or "None" if $f(x)$ is continuous everywhere.

## Constraints

- Your solution should include mathematical reasoning and proofs.
- For numerical answers, provide exact values (e.g., fractions or radicals) rather than decimal approximations.

## Example

For a similar function $g(x) = \\frac{x^2 - 9}{x - 3}$ if $x \\neq 3$ and $g(3) = k$:

Part A: $k = 6$
Part B: Yes, $g'(3) = 6$
Part C: None
`,
    difficulty: "Hard",
  },
  {
    problem_id: 202,
    contest_id: 2,
    title: "Differentiation Techniques",
    target: "v3",
    tags: ["Calculus", "Differentiation"],
    xp: 180,
    submission_count: 8,
    description: `
# Differentiation Techniques

## Problem Statement

Consider the function $h(x) = \\sin(e^{x^2}) \\cdot \\ln(1 + \\tan(x))$.

### Part A
Find the first derivative $h'(x)$ using the product rule and chain rule.

### Part B
Evaluate $h'(0)$.

### Part C
Find all values of $x$ in the interval $[0, \\pi/4]$ where $h'(x) = 0$, if any.

## Input Format

This is a proof-based problem. No input is required.

## Output Format

For Part A: The expression for $h'(x)$ in simplified form.
For Part B: The exact value of $h'(0)$.
For Part C: A list of $x$ values in $[0, \\pi/4]$ where $h'(x) = 0$, or "None" if no such values exist.

## Constraints

- Your solution should include mathematical reasoning and steps.
- For numerical answers, provide exact values rather than decimal approximations.

## Example

For a similar function $g(x) = \\sin(x) \\cdot \\ln(1 + x)$:

Part A: $g'(x) = \\cos(x) \\cdot \\ln(1 + x) + \\frac{\\sin(x)}{1 + x}$
Part B: $g'(0) = 0$
Part C: $x = 0$
`,
    difficulty: "Hard",
  },
]

// Helper function to format time remaining
interface TimeRemaining {
    days: number
    hours: number
    minutes: number
    seconds: number
}

const formatTimeRemaining = (targetTime: Date): TimeRemaining => {
    const now = new Date()
    const diff = targetTime.getTime() - now.getTime()

    if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24))
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
    const seconds = Math.floor((diff % (1000 * 60)) / 1000)

    return { days, hours, minutes, seconds }
}

export default function ContestProblemPage() {
  const { id, problemid } = useParams()
  interface Problem {
    problem_id: number
    contest_id: number
    title: string
    target: string
    tags: string[]
    xp: number
    submission_count: number
    description: string
    difficulty: string
  }

  const [problem, setProblem] = useState<Problem | null>(null)
  const [solution, setSolution] = useState("")
  const [timeRemaining, setTimeRemaining] = useState<TimeRemaining | null>(null)
  const [isActive, setIsActive] = useState(true)

  useEffect(() => {
    // Find the problem with the matching ID
    const foundProblem = problems.find((p) => p.problem_id.toString() === problemid && p.contest_id.toString() === id)
    if (foundProblem) {
      setProblem(foundProblem)
    }
  }, [id, problemid])

  // Update time remaining
  useEffect(() => {
    if (!isActive) return

    // Mock end time (5 hours from now)
    const endTime = new Date(Date.now() + 5 * 60 * 60 * 1000)

    const timer = setInterval(() => {
      setTimeRemaining(formatTimeRemaining(endTime))
    }, 1000)

    return () => clearInterval(timer)
  }, [isActive])

interface SubmitEvent extends React.FormEvent<HTMLFormElement> {}

const handleSubmit = (e: SubmitEvent): void => {
    e.preventDefault()
    alert("Solution submitted! (This is just a demo)")
}

  if (!problem) {
    return (
      <div className="container py-12 text-center">
        <p>Loading...</p>
      </div>
    )
  }

  return (
    <div className="container py-12">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Main Content */}
        <div className="flex-1">
          <Link
            href={`/contests/${id}`}
            className="flex items-center text-sm text-muted-foreground hover:text-primary mb-6"
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            Back to contest
          </Link>

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="default" className="animate-pulse">
                  <Play className="h-3 w-3 mr-1" />
                  Active
                </Badge>
                <Badge variant="outline" className="flex items-center gap-1">
                  <Target className="h-3 w-3" />
                  {problem.target}
                </Badge>
                <Badge variant="secondary" className="flex items-center gap-1">
                  <Trophy className="h-3 w-3" />
                  {problem.xp} XP
                </Badge>
              </div>
              <h1 className="text-3xl font-bold">{problem.title}</h1>
            </div>
          </div>

          {/* Problem Description */}
          <Card className="mb-8">
            <CardContent className="pt-6">
              <div className="flex flex-wrap gap-2 mb-4">
                {problem.tags.map((tag) => (
                  <Badge key={tag} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>

              <div className="prose prose-purple dark:prose-invert max-w-none prose-lg leading-relaxed">
                <ReactMarkdown remarkPlugins={[remarkMath]} rehypePlugins={[rehypeKatex]}>
                  {problem.description}
                </ReactMarkdown>
              </div>
            </CardContent>
          </Card>

          {/* Solution Submission */}
          <Card>
            <CardHeader>
              <CardTitle>Submit Your Solution</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <Textarea
                  placeholder="Enter your solution here..."
                  className="min-h-[200px] font-mono"
                  value={solution}
                  onChange={(e) => setSolution(e.target.value)}
                />
                <div className="flex justify-end">
                  <Button type="submit" disabled={!solution.trim()} className="gap-1">
                    <Send className="h-4 w-4" />
                    Submit Solution
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="w-full md:w-80 space-y-6">
          {/* Contest Timer Card */}
          {isActive && timeRemaining && (
            <Card className="border-primary/20 bg-primary/5">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Timer className="h-4 w-4 text-primary animate-pulse" />
                  Contest Ends In
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-4 gap-2">
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
                  <div className="bg-background rounded-lg p-3 text-center">
                    <div className="text-2xl font-bold">0</div>
                    <div className="text-xs text-muted-foreground">Ms</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Problem Info Card */}
          <Card>
            <CardHeader>
              <CardTitle>Problem Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Difficulty</span>
                  <Badge variant="outline">{problem.difficulty}</Badge>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm">Target</span>
                  <Badge variant="outline" className="flex items-center gap-1">
                    <Target className="h-3 w-3" />
                    {problem.target}
                  </Badge>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm">XP Value</span>
                  <Badge variant="secondary" className="flex items-center gap-1">
                    <Trophy className="h-3 w-3" />
                    {problem.xp} XP
                  </Badge>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm">Submissions</span>
                  <span className="font-medium">{problem.submission_count}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contest Navigation Card */}
          <Card>
            <CardHeader>
              <CardTitle>Contest Problems</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Link
                  href={`/contests/${id}/problems/201`}
                  className={`flex items-center justify-between p-2 rounded-md transition-colors ${
                    problemid === "201" ? "bg-primary/10 text-primary" : "hover:bg-muted"
                  }`}
                >
                  <span className="font-medium">1. Limits and Continuity</span>
                  {problemid === "201" && <CheckCircle className="h-4 w-4" />}
                </Link>
                <Link
                  href={`/contests/${id}/problems/202`}
                  className={`flex items-center justify-between p-2 rounded-md transition-colors ${
                    problemid === "202" ? "bg-primary/10 text-primary" : "hover:bg-muted"
                  }`}
                >
                  <span className="font-medium">2. Differentiation Techniques</span>
                  {problemid === "202" && <CheckCircle className="h-4 w-4" />}
                </Link>
                <Link
                  href={`/contests/${id}/problems/203`}
                  className={`flex items-center justify-between p-2 rounded-md transition-colors ${
                    problemid === "203" ? "bg-primary/10 text-primary" : "hover:bg-muted"
                  }`}
                >
                  <span className="font-medium">3. Integration Methods</span>
                  {problemid === "203" && <CheckCircle className="h-4 w-4" />}
                </Link>
                <Link
                  href={`/contests/${id}/problems/204`}
                  className={`flex items-center justify-between p-2 rounded-md transition-colors ${
                    problemid === "204" ? "bg-primary/10 text-primary" : "hover:bg-muted"
                  }`}
                >
                  <span className="font-medium">4. Applications of Derivatives</span>
                  {problemid === "204" && <CheckCircle className="h-4 w-4" />}
                </Link>
                <Link
                  href={`/contests/${id}/problems/205`}
                  className={`flex items-center justify-between p-2 rounded-md transition-colors ${
                    problemid === "205" ? "bg-primary/10 text-primary" : "hover:bg-muted"
                  }`}
                >
                  <span className="font-medium">5. Improper Integrals</span>
                  {problemid === "205" && <CheckCircle className="h-4 w-4" />}
                </Link>
                <Link
                  href={`/contests/${id}/problems/206`}
                  className={`flex items-center justify-between p-2 rounded-md transition-colors ${
                    problemid === "206" ? "bg-primary/10 text-primary" : "hover:bg-muted"
                  }`}
                >
                  <span className="font-medium">6. Series and Convergence</span>
                  {problemid === "206" && <CheckCircle className="h-4 w-4" />}
                </Link>
              </div> 
            </CardContent>
          </Card>

          {/* Tips Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Info className="h-4 w-4" />
                Tips
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start gap-2">
                  <div className="bg-primary/10 p-1 rounded-full mt-0.5">
                    <CheckCircle className="h-3 w-3 text-primary" />
                  </div>
                  <span>For calculus problems, always check edge cases and domain restrictions.</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="bg-primary/10 p-1 rounded-full mt-0.5">
                    <CheckCircle className="h-3 w-3 text-primary" />
                  </div>
                  <span>Show all steps of your solution for maximum points.</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="bg-primary/10 p-1 rounded-full mt-0.5">
                    <CheckCircle className="h-3 w-3 text-primary" />
                  </div>
                  <span>Use LaTeX notation for mathematical expressions in your solution.</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

