"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import {
  ChevronLeft,
  Calendar,
  Clock,
  Trophy,
  FileText,
  PlusCircle,
  Save,
  Search,
  CheckCircle,
  Info,
  AlertTriangle,
  Copy,
  ArrowRight,
  Filter,
  Trash2,
  Target,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Sample problems data
const availableProblems = [
  {
    id: 1,
    title: "Prime Number Factorization",
    description:
      "Develop an efficient algorithm to find the prime factorization of a given integer n. Your solution should handle large numbers efficiently.",
    tags: ["Number Theory", "Algorithms", "Prime Numbers"],
    target: "v2",
    difficulty: "Medium",
  },
  {
    id: 2,
    title: "Euler's Method for Differential Equations",
    description:
      "Implement Euler's method to solve a first-order ordinary differential equation. Compare the numerical solution with the analytical solution when available.",
    tags: ["Calculus", "Differential Equations", "Numerical Methods"],
    target: "v3",
    difficulty: "Hard",
  },
  {
    id: 3,
    title: "Matrix Eigenvalues and Eigenvectors",
    description:
      "Write a program to compute the eigenvalues and eigenvectors of a given square matrix using the power iteration method.",
    tags: ["Linear Algebra", "Matrices", "Numerical Methods"],
    target: "v3",
    difficulty: "Hard",
  },
  {
    id: 4,
    title: "Fibonacci Sequence Optimization",
    description:
      "Implement an efficient algorithm to compute the nth Fibonacci number. Your solution should work for large values of n (up to 10^6).",
    tags: ["Algorithms", "Dynamic Programming", "Number Theory"],
    target: "v1",
    difficulty: "Easy",
  },
  {
    id: 5,
    title: "Probability of Dice Rolls",
    description:
      "Calculate the probability of getting a sum of k when rolling n dice, each with m sides. Implement an efficient solution for large values of n, m, and k.",
    tags: ["Probability", "Combinatorics", "Dynamic Programming"],
    target: "v4",
    difficulty: "Very Hard",
  },
  {
    id: 6,
    title: "Graph Coloring Problem",
    description:
      "Implement an algorithm to color the vertices of a graph such that no two adjacent vertices have the same color, using the minimum number of colors possible.",
    tags: ["Graph Theory", "Algorithms", "NP-Complete"],
    target: "v5",
    difficulty: "Expert",
  },
  {
    id: 7,
    title: "Integral Approximation",
    description:
      "Implement the trapezoidal rule and Simpson's rule to approximate definite integrals. Compare the accuracy of both methods for various functions.",
    tags: ["Calculus", "Numerical Integration", "Approximation"],
    target: "v2",
    difficulty: "Medium",
  },
  {
    id: 8,
    title: "Polynomial Root Finding",
    description:
      "Implement Newton's method to find the roots of a polynomial equation. Your solution should handle cases where the method might not converge.",
    tags: ["Algebra", "Numerical Methods", "Root Finding"],
    target: "v3",
    difficulty: "Hard",
  },
]

// Extract unique tags and targets
const allTags = Array.from(new Set(availableProblems.flatMap((problem) => problem.tags)))
const allTargets = Array.from(new Set(availableProblems.map((problem) => problem.target)))
const difficulties = ["Easy", "Medium", "Hard", "Very Hard", "Expert"]

export default function CreateContestPage() {
  const router = useRouter()

  // Contest details state
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [difficulty, setDifficulty] = useState("")
  const [startDate, setStartDate] = useState<Date | undefined>(undefined)
  const [startTime, setStartTime] = useState("")
  const [endDate, setEndDate] = useState<Date | undefined>(undefined)
  const [endTime, setEndTime] = useState("")
  const [duration, setDuration] = useState({ hours: 0, minutes: 0 })

  // Problem selection state
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedTag, setSelectedTag] = useState("All")
  const [selectedTarget, setSelectedTarget] = useState("All")
  const [selectedProblems, setSelectedProblems] = useState<typeof availableProblems>([])
  const [viewingProblem, setViewingProblem] = useState<Problem | null>(null)

  // UI state
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false)
  const [contestLink, setContestLink] = useState("")
  const [formErrors, setFormErrors] = useState<FormErrors>({})
  const [activeTab, setActiveTab] = useState("details")

  // Filter problems based on search term, selected tag, and selected target
  const filteredProblems = availableProblems
    .filter((problem) => !selectedProblems.some((p) => p.id === problem.id))
    .filter((problem) => {
      const matchesSearch =
        problem.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        problem.description.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesTag = selectedTag === "All" || problem.tags.includes(selectedTag)
      const matchesTarget = selectedTarget === "All" || problem.target === selectedTarget
      return matchesSearch && matchesTag && matchesTarget
    })

  // Calculate duration whenever start or end date/time changes
  useEffect(() => {
    if (startDate && startTime && endDate && endTime) {
      const start = new Date(`${format(startDate, "yyyy-MM-dd")}T${startTime}`)
      const end = new Date(`${format(endDate, "yyyy-MM-dd")}T${endTime}`)

      if (end > start) {
        const diffMs = end.getTime() - start.getTime()
        const diffHrs = Math.floor(diffMs / (1000 * 60 * 60))
        const diffMins = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60))

        setDuration({ hours: diffHrs, minutes: diffMins })
        setFormErrors((prev) => ({ ...prev, dates: undefined }))
      } else {
        setDuration({ hours: 0, minutes: 0 })
        setFormErrors((prev) => ({ ...prev, dates: "End time must be after start time" }))
      }
    }
  }, [startDate, startTime, endDate, endTime])

  // Handle viewing a problem's details
interface Problem {
    id: number
    title: string
    description: string
    tags: string[]
    target: string
    difficulty: string
}

const handleViewProblem = (problem: Problem): void => {
    setViewingProblem(problem)
}

  // Handle adding a problem to the contest
  const handleAddProblem = (problem: Problem) => {
    setSelectedProblems((prev) => [...prev, problem])
    setViewingProblem(null)
  }

  // Handle removing a problem from the contest
const handleRemoveProblem = (problemId: number): void => {
    setSelectedProblems((prev: Problem[]) => prev.filter((p: Problem) => p.id !== problemId))
}

  // Validate form before submission
  const validateForm = () => {
    const errors: {
      title?: string
      description?: string
      difficulty?: string
      startDate?: string
      startTime?: string
      endDate?: string
      endTime?: string
      problems?: string
      dates?: string
    } = {}

    if (!title.trim()) errors.title = "Title is required"
    if (!description.trim()) errors.description = "Description is required"
    if (!difficulty) errors.difficulty = "Difficulty is required"
    if (!startDate) errors.startDate = "Start date is required"
    if (!startTime) errors.startTime = "Start time is required"
    if (!endDate) errors.endDate = "End date is required"
    if (!endTime) errors.endTime = "End time is required"
    if (selectedProblems.length === 0) errors.problems = "At least one problem is required"

    // Check if end is after start
    if (startDate && startTime && endDate && endTime) {
      const start = new Date(`${format(startDate, "yyyy-MM-dd")}T${startTime}`)
      const end = new Date(`${format(endDate, "yyyy-MM-dd")}T${endTime}`)

      if (end <= start) {
        errors.dates = "End time must be after start time"
      }
    }

    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  // Handle form submission
interface FormErrors {
    title?: string
    description?: string
    difficulty?: string
    startDate?: string
    startTime?: string
    endDate?: string
    endTime?: string
    problems?: string
    dates?: string
}

const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault()

    if (validateForm()) {
        // In a real app, you would submit to your backend here

        // Generate a mock contest link
        const contestId = `custom-${Math.floor(Math.random() * 1000)}`
        setContestLink(`https://mathxploter.com/contests/${contestId}`)

        // Show success modal
        setIsSuccessModalOpen(true)
    }
}

  // Handle copying the contest link
  const handleCopyLink = () => {
    navigator.clipboard.writeText(contestLink)
  }

  return (
    <div className="container py-12">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/contests">
          <Button variant="ghost" size="icon" className="rounded-full">
            <ChevronLeft className="h-5 w-5" />
            <span className="sr-only">Back</span>
          </Button>
        </Link>

        <div>
          <h1 className="text-3xl font-bold">Create Contest</h1>
          <p className="text-muted-foreground">Design your own mathematical contest</p>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
        <TabsList>
          <TabsTrigger value="details" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Contest Details
          </TabsTrigger>
          <TabsTrigger value="problems" className="flex items-center gap-2">
            <Trophy className="h-4 w-4" />
            Select Problems
          </TabsTrigger>
        </TabsList>

        {/* Contest Details Tab */}
        <TabsContent value="details" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" />
                Contest Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="title">Contest Title</Label>
                  <Input
                    id="title"
                    placeholder="Enter contest title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className={formErrors.title ? "border-red-500" : ""}
                  />
                  {formErrors.title && <p className="text-sm text-red-500">{formErrors.title}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe your contest"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className={formErrors.description ? "border-red-500" : ""}
                    rows={4}
                  />
                  {formErrors.description && <p className="text-sm text-red-500">{formErrors.description}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="difficulty">Difficulty</Label>
                  <Select value={difficulty} onValueChange={setDifficulty}>
                    <SelectTrigger id="difficulty" className={formErrors.difficulty ? "border-red-500" : ""}>
                      <SelectValue placeholder="Select difficulty" />
                    </SelectTrigger>
                    <SelectContent>
                      {difficulties.map((diff) => (
                        <SelectItem key={diff} value={diff}>
                          {diff}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {formErrors.difficulty && <p className="text-sm text-red-500">{formErrors.difficulty}</p>}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="text-sm font-medium flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      Start Date & Time
                    </h3>

                    <div className="space-y-2">
                      <Label htmlFor="start-date">Date</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full justify-start text-left font-normal",
                              !startDate && "text-muted-foreground",
                              formErrors.startDate && "border-red-500",
                            )}
                          >
                            <Calendar className="mr-2 h-4 w-4" />
                            {startDate ? format(startDate, "PPP") : "Select date"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <CalendarComponent mode="single" selected={startDate} onSelect={setStartDate} initialFocus />
                        </PopoverContent>
                      </Popover>
                      {formErrors.startDate && <p className="text-sm text-red-500">{formErrors.startDate}</p>}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="start-time">Time</Label>
                      <Input
                        id="start-time"
                        type="time"
                        value={startTime}
                        onChange={(e) => setStartTime(e.target.value)}
                        className={formErrors.startTime ? "border-red-500" : ""}
                      />
                      {formErrors.startTime && <p className="text-sm text-red-500">{formErrors.startTime}</p>}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-sm font-medium flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      End Date & Time
                    </h3>

                    <div className="space-y-2">
                      <Label htmlFor="end-date">Date</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full justify-start text-left font-normal",
                              !endDate && "text-muted-foreground",
                              formErrors.endDate && "border-red-500",
                            )}
                          >
                            <Calendar className="mr-2 h-4 w-4" />
                            {endDate ? format(endDate, "PPP") : "Select date"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <CalendarComponent mode="single" selected={endDate} onSelect={setEndDate} initialFocus />
                        </PopoverContent>
                      </Popover>
                      {formErrors.endDate && <p className="text-sm text-red-500">{formErrors.endDate}</p>}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="end-time">Time</Label>
                      <Input
                        id="end-time"
                        type="time"
                        value={endTime}
                        onChange={(e) => setEndTime(e.target.value)}
                        className={formErrors.endTime ? "border-red-500" : ""}
                      />
                      {formErrors.endTime && <p className="text-sm text-red-500">{formErrors.endTime}</p>}
                    </div>
                  </div>
                </div>

                {formErrors.dates && (
                  <div className="bg-red-500/10 text-red-600 p-3 rounded-md flex items-start gap-2">
                    <AlertTriangle className="h-5 w-5 mt-0.5 flex-shrink-0" />
                    <p>{formErrors.dates}</p>
                  </div>
                )}

                {duration.hours > 0 || duration.minutes > 0 ? (
                  <div className="bg-muted rounded-md p-4">
                    <h3 className="text-sm font-medium flex items-center gap-2 mb-2">
                      <Clock className="h-4 w-4 text-primary" />
                      Contest Duration
                    </h3>
                    <p className="text-2xl font-bold">
                      {duration.hours > 0 && `${duration.hours} hour${duration.hours !== 1 ? "s" : ""}`}
                      {duration.hours > 0 && duration.minutes > 0 && " and "}
                      {duration.minutes > 0 && `${duration.minutes} minute${duration.minutes !== 1 ? "s" : ""}`}
                    </p>
                  </div>
                ) : null}
              </form>
            </CardContent>
            <CardFooter className="flex justify-between border-t pt-6">
              <Button variant="outline" onClick={() => router.push("/contests")}>
                Cancel
              </Button>
              <Button onClick={() => setActiveTab("problems")} disabled={Object.keys(formErrors).length > 0}>
                Continue to Problem Selection
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Problem Selection Tab */}
        <TabsContent value="problems" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Available Problems */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-primary" />
                  Available Problems
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-2">
                    <div className="relative flex-1">
                      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        type="search"
                        placeholder="Search problems..."
                        className="pl-8 w-full"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
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
                  </div>

                  {filteredProblems.length > 0 ? (
                    <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2">
                      {filteredProblems.map((problem) => (
                        <Card key={problem.id} className="overflow-hidden transition-all hover:shadow-sm group">
                          <CardContent className="p-4">
                            <div className="flex justify-between items-start">
                              <div>
                                <h3 className="font-medium group-hover:text-primary transition-colors">
                                  {problem.title}
                                </h3>
                                <div className="flex flex-wrap gap-1 mt-1">
                                  {problem.tags.map((tag) => (
                                    <Badge key={tag} variant="outline" className="text-xs">
                                      {tag}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                <Badge variant="outline" className="flex items-center gap-1">
                                  <Target className="h-3 w-3" />
                                  {problem.target}
                                </Badge>
                              </div>
                            </div>
                            <div className="flex justify-between items-center mt-3">
                              <Button
                                variant="ghost"
                                size="sm"
                                className="text-xs"
                                onClick={() => handleViewProblem(problem)}
                              >
                                View Details
                              </Button>
                              <Button size="sm" className="gap-1" onClick={() => handleAddProblem(problem)}>
                                <PlusCircle className="h-3 w-3" />
                                Add
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 bg-muted/30 rounded-lg">
                      <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                      <h3 className="text-lg font-bold mb-2">No Problems Found</h3>
                      <p className="text-muted-foreground max-w-md mx-auto">
                        No problems match your search criteria. Try adjusting your filters or search term.
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Selected Problems */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="h-5 w-5 text-primary" />
                  Contest Problems ({selectedProblems.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                {selectedProblems.length > 0 ? (
                  <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2">
                    {selectedProblems.map((problem) => (
                      <Card key={problem.id} className="overflow-hidden transition-all hover:shadow-sm group">
                        <CardContent className="p-4">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-medium group-hover:text-primary transition-colors">
                                {problem.title}
                              </h3>
                              <div className="flex flex-wrap gap-1 mt-1">
                                {problem.tags.map((tag) => (
                                  <Badge key={tag} variant="outline" className="text-xs">
                                    {tag}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Badge variant="outline" className="flex items-center gap-1">
                                <Target className="h-3 w-3" />
                                {problem.target}
                              </Badge>
                            </div>
                          </div>
                          <div className="flex justify-end items-center mt-3">
                            <Button
                              variant="outline"
                              size="sm"
                              className="gap-1 text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20"
                              onClick={() => handleRemoveProblem(problem.id)}
                            >
                              <Trash2 className="h-3 w-3" />
                              Remove
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 bg-muted/30 rounded-lg">
                    <Trophy className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <h3 className="text-lg font-bold mb-2">No Problems Selected</h3>
                    <p className="text-muted-foreground max-w-md mx-auto">
                      Add problems from the available list to include them in your contest.
                    </p>
                  </div>
                )}

                {formErrors.problems && (
                  <div className="mt-4 bg-red-500/10 text-red-600 p-3 rounded-md flex items-start gap-2">
                    <AlertTriangle className="h-5 w-5 mt-0.5 flex-shrink-0" />
                    <p>{formErrors.problems}</p>
                  </div>
                )}
              </CardContent>
              <CardFooter className="flex justify-between border-t pt-6">
                <Button variant="outline" onClick={() => setActiveTab("details")}>
                  Back to Details
                </Button>
                <Button onClick={() => handleSubmit(new Event('submit') as unknown as React.FormEvent<HTMLFormElement>)} disabled={selectedProblems.length === 0}>
                  <Save className="mr-2 h-4 w-4" />
                  Publish Contest
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Problem Details Dialog */}
      <Dialog open={!!viewingProblem} onOpenChange={() => setViewingProblem(null)}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>{viewingProblem?.title}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="flex flex-wrap gap-2">
              {viewingProblem?.tags.map((tag) => (
                <Badge key={tag} variant="outline">
                  {tag}
                </Badge>
              ))}
              <Badge variant="secondary" className="flex items-center gap-1">
                <Target className="h-3 w-3" />
                {viewingProblem?.target}
              </Badge>
            </div>

            <div className="text-sm">
              <p>{viewingProblem?.description}</p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setViewingProblem(null)}>
              Close
            </Button>
            <Button onClick={() => viewingProblem && handleAddProblem(viewingProblem)} className="gap-1">
              <PlusCircle className="h-4 w-4" />
              Add to Contest
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Success Modal */}
      <Dialog open={isSuccessModalOpen} onOpenChange={setIsSuccessModalOpen}>
        <DialogContent className="sm:max-w-md">
          <div className="flex flex-col items-center justify-center py-6">
            <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/20 flex items-center justify-center mb-4 animate-in zoom-in-50 duration-300">
              <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-500" />
            </div>
            <h2 className="text-xl font-bold mb-2">Contest Created Successfully!</h2>
            <p className="text-center text-muted-foreground mb-6">
              Your contest has been published. Share the link below to invite participants.
            </p>

            <div className="w-full space-y-4">
              <div className="flex items-center gap-2">
                <Input value={contestLink} readOnly className="font-mono text-sm" />
                <Button variant="outline" size="icon" onClick={handleCopyLink}>
                  <Copy className="h-4 w-4" />
                </Button>
              </div>

              <div className="bg-muted rounded-md p-4 text-sm">
                <div className="flex items-start gap-2">
                  <Info className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <p>
                    This contest will only be accessible to users with the link. It won't be listed in the public
                    contests.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => router.push("/contests")}>
              Go to Contests
            </Button>
            <Link href={`/contests/${contestLink.split("/").pop()}`}>
              <Button>
                View Contest
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

