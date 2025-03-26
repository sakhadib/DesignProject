"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import { ChevronLeft, PenTool, Target, Search, Filter, Calendar, ExternalLink } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Mock problems data
const allProblems = [
  {
    problem_id: 234,
    title: "Integral Approximation Methods",
    tags: ["Calculus", "Numerical Methods"],
    target: "v3",
    max_xp: 180,
    date: "2024-03-20",
    description:
      "Implement the trapezoidal rule and Simpson's rule to approximate definite integrals. Compare the accuracy of both methods for various functions.",
  },
  {
    problem_id: 228,
    title: "Graph Coloring Algorithms",
    tags: ["Graph Theory", "Algorithms"],
    target: "v4",
    max_xp: 220,
    date: "2024-03-15",
    description:
      "Implement an algorithm to color the vertices of a graph such that no two adjacent vertices have the same color, using the minimum number of colors possible.",
  },
  {
    problem_id: 219,
    title: "Polynomial Root Finding",
    tags: ["Algebra", "Numerical Methods"],
    target: "v3",
    max_xp: 190,
    date: "2024-03-05",
    description:
      "Implement Newton's method to find the roots of a polynomial equation. Your solution should handle cases where the method might not converge.",
  },
  {
    problem_id: 212,
    title: "Probability Distribution Functions",
    tags: ["Probability", "Statistics"],
    target: "v3",
    max_xp: 180,
    date: "2024-02-28",
    description:
      "Implement and analyze various probability distribution functions including normal, binomial, and Poisson distributions.",
  },
  {
    problem_id: 205,
    title: "Linear Programming Optimization",
    tags: ["Optimization", "Linear Algebra"],
    target: "v4",
    max_xp: 210,
    date: "2024-02-20",
    description:
      "Implement the simplex algorithm to solve linear programming problems. Test your implementation on various optimization scenarios.",
  },
  {
    problem_id: 198,
    title: "Differential Equation Solvers",
    tags: ["Calculus", "Differential Equations"],
    target: "v3",
    max_xp: 190,
    date: "2024-02-15",
    description:
      "Implement numerical methods for solving ordinary differential equations, including Euler's method, Runge-Kutta methods, and compare their accuracy.",
  },
  {
    problem_id: 187,
    title: "Prime Number Generation",
    tags: ["Number Theory", "Algorithms"],
    target: "v2",
    max_xp: 150,
    date: "2024-02-10",
    description:
      "Implement efficient algorithms for generating prime numbers, including the Sieve of Eratosthenes and probabilistic primality tests.",
  },
  {
    problem_id: 176,
    title: "Matrix Decomposition Techniques",
    tags: ["Linear Algebra", "Numerical Methods"],
    target: "v4",
    max_xp: 200,
    date: "2024-02-05",
    description:
      "Implement various matrix decomposition techniques including LU, QR, and Singular Value Decomposition (SVD).",
  },
]

// Extract unique tags and targets
const allTags = Array.from(new Set(allProblems.flatMap((problem) => problem.tags)))
const allTargets = Array.from(new Set(allProblems.map((problem) => problem.target)))

// Map difficulty to color
const difficultyColor = {
  v0: "bg-green-500",
  v1: "bg-green-500",
  v2: "bg-yellow-500",
  v3: "bg-orange-500",
  v4: "bg-red-500",
  v5: "bg-purple-500",
}

export default function UserProblemsPage() {
  const { username } = useParams()
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedTarget, setSelectedTarget] = useState("All")
  const [selectedTag, setSelectedTag] = useState("All")

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 800)
    return () => clearTimeout(timer)
  }, [])

  // Filter problems based on search term, selected target, and selected tag
  const filteredProblems = allProblems.filter((problem) => {
    const matchesSearch =
      problem.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      problem.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesTarget = selectedTarget === "All" || problem.target === selectedTarget
    const matchesTag = selectedTag === "All" || problem.tags.includes(selectedTag)
    return matchesSearch && matchesTarget && matchesTag
  })

  if (isLoading) {
    return (
      <div className="container py-12 flex items-center justify-center min-h-[50vh]">
        <div className="flex flex-col items-center gap-4">
          <div className="h-12 w-12 rounded-full border-4 border-primary border-t-transparent animate-spin" />
          <p className="text-muted-foreground">Loading problems...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container py-12 animate-fade-in">
      <div className="flex items-center gap-4 mb-8">
        <Link href={`/profile/${username}`}>
          <Button variant="ghost" size="icon" className="rounded-full">
            <ChevronLeft className="h-5 w-5" />
            <span className="sr-only">Back</span>
          </Button>
        </Link>

        <div>
          <h1 className="text-3xl font-bold">Added Problems</h1>
          <p className="text-muted-foreground">Problems created by {username}</p>
        </div>
      </div>

      <div className="flex flex-col space-y-4 md:flex-row md:justify-between md:items-center md:space-y-0 mb-6">
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search problems..."
              className="pl-8 w-full md:w-[250px]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-2">
          <Select value={selectedTarget} onValueChange={setSelectedTarget}>
            <SelectTrigger className="w-full sm:w-[150px]">
              <div className="flex items-center">
                <Target className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Target" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All Targets</SelectItem>
              {allTargets.map((target) => (
                <SelectItem key={target} value={target}>
                  {target}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={selectedTag} onValueChange={setSelectedTag}>
            <SelectTrigger className="w-full sm:w-[150px]">
              <div className="flex items-center">
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Tag" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All Tags</SelectItem>
              {allTags.map((tag) => (
                <SelectItem key={tag} value={tag}>
                  {tag}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-1 lg:grid-cols-2">
        {filteredProblems.map((problem) => (
          <Card key={problem.problem_id} className="overflow-hidden transition-all hover:shadow-md group">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${difficultyColor[problem.target as keyof typeof difficultyColor]}`} />
                  <span className="text-sm text-muted-foreground">{problem.target}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="flex items-center gap-1">
                    <Target className="h-3 w-3" />
                    {problem.target}
                  </Badge>
                </div>
              </div>
              <Link href={`/problems/${problem.problem_id}`}>
                <CardTitle className="text-xl hover:text-primary transition-colors">{problem.title}</CardTitle>
              </Link>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground line-clamp-2">{problem.description}</p>
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
                <Calendar className="h-4 w-4" />
                <span>{problem.date}</span>
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

        {filteredProblems.length === 0 && (
          <div className="col-span-full text-center py-12 bg-muted/30 rounded-lg">
            <PenTool className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-xl font-bold mb-2">No Problems Found</h3>
            <p className="text-muted-foreground max-w-md mx-auto">
              No problems match your search criteria. Try adjusting your filters or search term.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

