"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import { ChevronLeft, FileText, Target, Search, Filter, Calendar, Eye } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Mock submissions data
const allSubmissions = [
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
  {
    problem_id: 212,
    title: "Polynomial Root Finding",
    target: "v3",
    tags: ["Algebra", "Numerical Methods"],
    achieved_xp: 180,
    max_xp: 190,
    date: "2024-03-05",
  },
  {
    problem_id: 225,
    title: "Graph Coloring Problem",
    target: "v5",
    tags: ["Graph Theory", "Algorithms"],
    achieved_xp: 230,
    max_xp: 250,
    date: "2024-02-28",
  },
  {
    problem_id: 234,
    title: "Integral Approximation",
    target: "v2",
    tags: ["Calculus", "Numerical Integration"],
    achieved_xp: 160,
    max_xp: 160,
    date: "2024-02-20",
  },
  {
    problem_id: 245,
    title: "Probability Distribution Functions",
    target: "v3",
    tags: ["Probability", "Statistics"],
    achieved_xp: 170,
    max_xp: 180,
    date: "2024-02-15",
  },
  {
    problem_id: 256,
    title: "Linear Programming",
    target: "v4",
    tags: ["Optimization", "Linear Algebra"],
    achieved_xp: 200,
    max_xp: 220,
    date: "2024-02-10",
  },
]

// Extract unique tags and targets
const allTags = Array.from(new Set(allSubmissions.flatMap((submission) => submission.tags)))
const allTargets = Array.from(new Set(allSubmissions.map((submission) => submission.target)))

export default function UserSubmissionsPage() {
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

  // Filter submissions based on search term, selected target, and selected tag
  const filteredSubmissions = allSubmissions.filter((submission) => {
    const matchesSearch = submission.title.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesTarget = selectedTarget === "All" || submission.target === selectedTarget
    const matchesTag = selectedTag === "All" || submission.tags.includes(selectedTag)
    return matchesSearch && matchesTarget && matchesTag
  })

  if (isLoading) {
    return (
      <div className="container py-12 flex items-center justify-center min-h-[50vh]">
        <div className="flex flex-col items-center gap-4">
          <div className="h-12 w-12 rounded-full border-4 border-primary border-t-transparent animate-spin" />
          <p className="text-muted-foreground">Loading submissions...</p>
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
          <h1 className="text-3xl font-bold">Submissions</h1>
          <p className="text-muted-foreground">All submissions by {username}</p>
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

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-primary" />
            All Submissions ({filteredSubmissions.length})
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
              {filteredSubmissions.map((submission) => (
                <TableRow key={`${submission.problem_id}`} className="group">
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
                  <TableCell className="text-right text-muted-foreground">
                    <div className="flex items-center justify-end gap-1">
                      <Calendar className="h-3 w-3" />
                      {submission.date}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm" className="gap-1">
                      <Eye className="h-4 w-4" />
                      <span className="hidden sm:inline">View</span>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}

              {filteredSubmissions.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                    No submissions found matching your search criteria.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

