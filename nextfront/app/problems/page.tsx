"use client"

import { useState, useEffect } from "react"
import axios from "axios"
import Link from "next/link"
import { Search, Trophy, Target, ArrowUpRight, Plus } from "lucide-react"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

import ReactMarkdown from "react-markdown"
import remarkMath from "remark-math"
import rehypeKatex from "rehype-katex"
import "katex/dist/katex.min.css"

export default function ProblemsPage() {
  const [problems, setProblems] = useState<any[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("All")
  const [selectedTarget, setSelectedTarget] = useState("All")
  const [selectedDifficulty, setSelectedDifficulty] = useState("All")
  const [allTags, setAllTags] = useState<string[]>([])
  const [allTargets, setAllTargets] = useState<string[]>([])
  const difficulties = ["Easy", "Medium", "Hard", "Very Hard", "Expert"]

  // Fetch problems data from API
  useEffect(() => {
    const fetchProblems = async () => {
      try {
        const res = await axios.get("http://127.0.0.1:8000/api/problem/all/")
        setProblems(res.data.problems)

        // Extract unique tags and targets
        const tags = Array.from(
          new Set(res.data.problems.flatMap((problem: any) => problem.tags.topics as string[]))
        ) as string[]
        const targets = Array.from(new Set(res.data.problems.map((problem: any) => problem.tags.target))) as string[]

        setAllTags(tags)
        setAllTargets(targets)
      } catch (error) {
        console.error("Error fetching problems:", error)
      }
    }
    fetchProblems()
  }, [])

  // Filter problems based on search term, active tab, selected target, and difficulty
  const filteredProblems = problems.filter((problem) => {
    const matchesSearch =
      problem.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      problem.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesTag = activeTab === "All" || problem.tags.topics.includes(activeTab)
    const matchesTarget = selectedTarget === "All" || problem.tags.target === selectedTarget
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
          <div className="flex items-center gap-2">
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
            <Link href="/problems/add">
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                Add Problem
              </Button>
            </Link>
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
                  <div className="flex flex-col items-center gap-4">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                    <p className="text-muted-foreground">Loading problems...</p>
                  </div>
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

function ProblemCard({ problem }: { problem: any }) {
  type Difficulty = "Easy" | "Medium" | "Hard" | "Very Hard" | "Expert";
  
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
            <div className={`w-3 h-3 rounded-full ${difficultyColor[problem.difficulty as Difficulty]}`} />
            <span className="text-sm text-muted-foreground">{problem.difficulty}</span>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="flex items-center gap-1">
              <Target className="h-3 w-3" />
              {problem.tags.target}
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
        <div className="text-muted-foreground line-clamp-2">
        <ReactMarkdown remarkPlugins={[remarkMath]} rehypePlugins={[rehypeKatex]}>
            {problem.description}
        </ReactMarkdown>
        </div>
        <div className="flex flex-wrap gap-2 mt-3">
          {problem.tags.topics.map((tag: string) => (
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
          <span>{problem.success_rate}% success rate</span>
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
