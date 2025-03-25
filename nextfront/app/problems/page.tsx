"use client"

import { useState } from "react"
import Link from "next/link"
import { Search, Trophy, Target, ArrowUpRight } from "lucide-react"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Sample problems data
const problems: {
  id: number;
  title: string;
  description: string;
  tags: string[];
  xp: number;
  target: string;
  difficulty: "Easy" | "Medium" | "Hard" | "Very Hard" | "Expert";
  submissions: number;
  successRate: number;
}[] = [
  {
    id: 1,
    title: "Prime Number Factorization",
    description:
      "Develop an efficient algorithm to find the prime factorization of a given integer n. Your solution should handle large numbers efficiently.",
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
      "Implement Euler's method to solve a first-order ordinary differential equation. Compare the numerical solution with the analytical solution when available.",
    tags: ["Calculus", "Differential Equations", "Numerical Methods"],
    xp: 200,
    target: "v3",
    difficulty: "Hard",
    submissions: 187,
    successRate: 52,
  },
  {
    id: 3,
    title: "Matrix Eigenvalues and Eigenvectors",
    description:
      "Write a program to compute the eigenvalues and eigenvectors of a given square matrix using the power iteration method.",
    tags: ["Linear Algebra", "Matrices", "Numerical Methods"],
    xp: 180,
    target: "v3",
    difficulty: "Hard",
    submissions: 215,
    successRate: 47,
  },
  {
    id: 4,
    title: "Fibonacci Sequence Optimization",
    description:
      "Implement an efficient algorithm to compute the nth Fibonacci number. Your solution should work for large values of n (up to 10^6).",
    tags: ["Algorithms", "Dynamic Programming", "Number Theory"],
    xp: 100,
    target: "v1",
    difficulty: "Easy",
    submissions: 523,
    successRate: 85,
  },
  {
    id: 5,
    title: "Probability of Dice Rolls",
    description:
      "Calculate the probability of getting a sum of k when rolling n dice, each with m sides. Implement an efficient solution for large values of n, m, and k.",
    tags: ["Probability", "Combinatorics", "Dynamic Programming"],
    xp: 220,
    target: "v4",
    difficulty: "Very Hard",
    submissions: 142,
    successRate: 38,
  },
  {
    id: 6,
    title: "Graph Coloring Problem",
    description:
      "Implement an algorithm to color the vertices of a graph such that no two adjacent vertices have the same color, using the minimum number of colors possible.",
    tags: ["Graph Theory", "Algorithms", "NP-Complete"],
    xp: 250,
    target: "v5",
    difficulty: "Expert",
    submissions: 98,
    successRate: 29,
  },
  {
    id: 7,
    title: "Integral Approximation",
    description:
      "Implement the trapezoidal rule and Simpson's rule to approximate definite integrals. Compare the accuracy of both methods for various functions.",
    tags: ["Calculus", "Numerical Integration", "Approximation"],
    xp: 160,
    target: "v2",
    difficulty: "Medium",
    submissions: 276,
    successRate: 71,
  },
  {
    id: 8,
    title: "Polynomial Root Finding",
    description:
      "Implement Newton's method to find the roots of a polynomial equation. Your solution should handle cases where the method might not converge.",
    tags: ["Algebra", "Numerical Methods", "Root Finding"],
    xp: 190,
    target: "v3",
    difficulty: "Hard",
    submissions: 203,
    successRate: 55,
  },
]

// Extract unique tags and targets
const allTags = Array.from(new Set(problems.flatMap((problem) => problem.tags)))
const allTargets = Array.from(new Set(problems.map((problem) => problem.target)))
const difficulties = ["Easy", "Medium", "Hard", "Very Hard", "Expert"]

export default function ProblemsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("All")
  const [selectedTarget, setSelectedTarget] = useState("All")
  const [selectedDifficulty, setSelectedDifficulty] = useState("All")

  // Filter problems based on search term, active tab, selected target, and difficulty
  const filteredProblems = problems.filter((problem) => {
    const matchesSearch =
      problem.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      problem.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesTag = activeTab === "All" || problem.tags.includes(activeTab)
    const matchesTarget = selectedTarget === "All" || problem.target === selectedTarget
    const matchesDifficulty = selectedDifficulty === "All" || problem.difficulty === selectedDifficulty

    return matchesSearch && matchesTag && matchesTarget && matchesDifficulty
  })

  return (
    <div className="container py-12">
      <div className="flex flex-col space-y-4 md:flex-row md:justify-between md:space-y-0 mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Mathematical Problems</h1>
          <p className="text-muted-foreground">Challenge yourself with these mathematical problems</p>
        </div>
        <div className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search problems..."
              className="pl-8 w-full sm:w-[250px]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-6 mb-8">
        <div className="w-full md:w-64 space-y-4">
          <div className="space-y-2">
            <h3 className="text-sm font-medium">Filter by Target</h3>
            <Select value={selectedTarget} onValueChange={setSelectedTarget}>
              <SelectTrigger>
                <SelectValue placeholder="Select target" />
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
          </div>

          <div className="space-y-2">
            <h3 className="text-sm font-medium">Filter by Difficulty</h3>
            <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
              <SelectTrigger>
                <SelectValue placeholder="Select difficulty" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Difficulties</SelectItem>
                {difficulties.map((difficulty) => (
                  <SelectItem key={difficulty} value={difficulty}>
                    {difficulty}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <h3 className="text-sm font-medium">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {allTags.slice(0, 10).map((tag) => (
                <Badge
                  key={tag}
                  variant={activeTab === tag ? "default" : "outline"}
                  className="cursor-pointer transition-all"
                  onClick={() => setActiveTab(tag === activeTab ? "All" : tag)}
                >
                  {tag}
                </Badge>
              ))}
              {allTags.length > 10 && (
                <Badge variant="outline" className="cursor-pointer">
                  +{allTags.length - 10} more
                </Badge>
              )}
            </div>
          </div>
        </div>

        <div className="flex-1">
          <Tabs defaultValue="All" className="w-full" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-4 flex flex-wrap h-auto">
              <TabsTrigger value="All">All Problems</TabsTrigger>
              {allTags.slice(0, 5).map((tag) => (
                <TabsTrigger key={tag} value={tag}>
                  {tag}
                </TabsTrigger>
              ))}
            </TabsList>

            <TabsContent value="All" className="mt-0">
              <div className="grid gap-6 sm:grid-cols-1 lg:grid-cols-2">
                {filteredProblems.map((problem) => (
                  <ProblemCard key={problem.id} problem={problem} />
                ))}
              </div>

              {filteredProblems.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">
                    No problems match your filters. Try adjusting your search criteria.
                  </p>
                </div>
              )}
            </TabsContent>

            {allTags.map((tag) => (
              <TabsContent key={tag} value={tag} className="mt-0">
                <div className="grid gap-6 sm:grid-cols-1 lg:grid-cols-2">
                  {filteredProblems.map((problem) => (
                    <ProblemCard key={problem.id} problem={problem} />
                  ))}
                </div>

                {filteredProblems.length === 0 && (
                  <div className="text-center py-12">
                    <p className="text-muted-foreground">
                      No problems match your filters. Try adjusting your search criteria.
                    </p>
                  </div>
                )}
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </div>
    </div>
  )
}

function ProblemCard({ problem }: { problem: { id: number; title: string; description: string; tags: string[]; xp: number; target: string; difficulty: "Easy" | "Medium" | "Hard" | "Very Hard" | "Expert"; submissions: number; successRate: number } }) {
  // Map difficulty to color
  const difficultyColor = {
    Easy: "bg-green-500",
    Medium: "bg-yellow-500",
    Hard: "bg-orange-500",
    "Very Hard": "bg-red-500",
    Expert: "bg-purple-500",
  }

  return (
    <Card className="overflow-hidden transition-all hover:shadow-md group">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded-full ${difficultyColor[problem.difficulty]}`} />
            <span className="text-sm text-muted-foreground">{problem.difficulty}</span>
          </div>
          <div className="flex items-center gap-2">
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
        <Link href={`/problems/${problem.id}`}>
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
          <span>{problem.submissions} submissions</span>
          <span>•</span>
          <span>{problem.successRate}% success rate</span>
        </div>
        <Link href={`/problems/${problem.id}`}>
          <Button
            variant="ghost"
            size="sm"
            className="group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
          >
            Solve
            <ArrowUpRight className="ml-1 h-4 w-4" />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  )
}

