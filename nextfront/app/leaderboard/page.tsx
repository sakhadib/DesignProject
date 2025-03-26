"use client"

import { useState, useEffect, JSX } from "react"
import Image from "next/image"
import { Search, Trophy, BookOpen, CheckCircle, Medal, Crown, ChevronUp, ChevronDown } from "lucide-react"

import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Rating titles and their color mappings
const ratingTitles = [
  { min: 400, max: 800, title: "Numerical Novice", color: "text-zinc-400" },
  { min: 800, max: 1200, title: "Arithmetic Ace", color: "text-slate-500" },
  { min: 1200, max: 1500, title: "Algebraic Authority", color: "text-blue-500" },
  { min: 1500, max: 1800, title: "Geometric Genius", color: "text-emerald-500" },
  { min: 1800, max: 2100, title: "Calculus Champion", color: "text-purple-500" },
  { min: 2100, max: 2500, title: "Theorem Titan", color: "text-indigo-600" },
  { min: 2500, max: 3000, title: "Mathematical Maestro", color: "text-amber-500" },
  { min: 3000, max: 3500, title: "Euler's Equal", color: "text-orange-500" },
  { min: 3500, max: 4000, title: "Proof Prodigy", color: "text-red-600" }
];

// Sample user data
const users = [
  {
    username: "MathWizard42",
    avatar: "/placeholder.svg?height=100&width=100",
    rating: 3750,
    contribution: 28,
    submission_count: 156,
  },
  {
    username: "EulersFan",
    avatar: "/placeholder.svg?height=100&width=100",
    rating: 3420,
    contribution: 19,
    submission_count: 132,
  },
  {
    username: "PythagorasLover",
    avatar: "/placeholder.svg?height=100&width=100",
    rating: 3210,
    contribution: 24,
    submission_count: 145,
  },
  {
    username: "AlgorithmAce",
    avatar: "/placeholder.svg?height=100&width=100",
    rating: 2890,
    contribution: 15,
    submission_count: 98,
  },
  {
    username: "NumberTheoryNerd",
    avatar: "/placeholder.svg?height=100&width=100",
    rating: 2650,
    contribution: 12,
    submission_count: 87,
  },
  {
    username: "CalculusKing",
    avatar: "/placeholder.svg?height=100&width=100",
    rating: 2340,
    contribution: 9,
    submission_count: 76,
  },
  {
    username: "ProbabilityPro",
    avatar: "/placeholder.svg?height=100&width=100",
    rating: 2180,
    contribution: 7,
    submission_count: 65,
  },
  {
    username: "StatisticsStella",
    avatar: "/placeholder.svg?height=100&width=100",
    rating: 1950,
    contribution: 5,
    submission_count: 54,
  },
  {
    username: "GeometryGenius",
    avatar: "/placeholder.svg?height=100&width=100",
    rating: 1720,
    contribution: 4,
    submission_count: 43,
  },
  {
    username: "AlgebraArtist",
    avatar: "/placeholder.svg?height=100&width=100",
    rating: 1580,
    contribution: 3,
    submission_count: 32,
  },
  {
    username: "TrigonometryTitan",
    avatar: "/placeholder.svg?height=100&width=100",
    rating: 1350,
    contribution: 2,
    submission_count: 28,
  },
  {
    username: "EquationExplorer",
    avatar: "/placeholder.svg?height=100&width=100",
    rating: 1120,
    contribution: 1,
    submission_count: 21,
  },
  {
    username: "FractionFriend",
    avatar: "/placeholder.svg?height=100&width=100",
    rating: 980,
    contribution: 0,
    submission_count: 15,
  },
  {
    username: "DecimalDude",
    avatar: "/placeholder.svg?height=100&width=100",
    rating: 750,
    contribution: 0,
    submission_count: 10,
  },
  {
    username: "MathNewbie",
    avatar: "/placeholder.svg?height=100&width=100",
    rating: 520,
    contribution: 0,
    submission_count: 5,
  },
]

// Helper function to get title and color based on rating
interface TitleInfo {
    min: number
    max: number
    title: string
    color: string
}

const getTitleAndColor = (rating: number): TitleInfo => {
    const titleInfo = ratingTitles.find((t) => rating >= t.min && rating <= t.max)
    return titleInfo || { title: "Unknown", color: "text-gray-500", min: 0, max: 0 }
}

// Helper function to get medal icon based on position
interface MedalIconProps {
    position: number
}

const getMedalIcon = (position: MedalIconProps["position"]): JSX.Element | null => {
    switch (position) {
        case 0:
            return <Crown className="h-6 w-6 text-amber-500" />
        case 1:
            return <Medal className="h-6 w-6 text-gray-400" />
        case 2:
            return <Medal className="h-6 w-6 text-amber-700" />
        default:
            return null
    }
}

export default function LeaderboardPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [sortField, setSortField] = useState<"rating" | "contribution" | "submission_count">("rating")
  const [sortDirection, setSortDirection] = useState("desc")
  const [filteredUsers, setFilteredUsers] = useState(users)
  const [isLoaded, setIsLoaded] = useState(false)

  // Sort and filter users
  useEffect(() => {
    let result = [...users]

    // Filter by search term
    if (searchTerm) {
      result = result.filter((user) => user.username.toLowerCase().includes(searchTerm.toLowerCase()))
    }

    // Sort by selected field
    result.sort((a, b) => {
      if (sortDirection === "asc") {
        return a[sortField] - b[sortField] as number
      } else {
        return b[sortField] - a[sortField] as number
      }
    })

    setFilteredUsers(result)
  }, [searchTerm, sortField, sortDirection])

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true)
    }, 500)
    return () => clearTimeout(timer)
  }, [])

  // Handle sort click
interface HandleSortProps {
    field: "rating" | "contribution" | "submission_count"
}

const handleSort = (field: HandleSortProps["field"]) => {
    if (sortField === field) {
        setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
        setSortField(field)
        setSortDirection("desc")
    }
}

  // Get top 3 users
  const topUsers = [...users].sort((a, b) => b.rating - a.rating).slice(0, 3)

  return (
    <div className="container py-12">
      <h1 className="text-3xl font-bold mb-2">Leaderboard</h1>
      <p className="text-muted-foreground mb-8">See who's leading the mathematical challenges</p>

      {/* Top 3 Users Podium */}
      <div className={`mb-12 transition-all duration-700 ${isLoaded ? "opacity-100" : "opacity-0 translate-y-10"}`}>
        <h2 className="text-xl font-bold mb-6 flex items-center">
          <Trophy className="mr-2 h-5 w-5 text-amber-500" />
          Top Mathematicians
        </h2>

        <div className="flex flex-col md:flex-row justify-center items-end gap-4 md:gap-8">
          {/* 2nd Place */}
          <div className="order-2 md:order-1 flex-1 md:flex-initial animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <Card className="relative overflow-hidden border-2 border-gray-300 dark:border-gray-700 transition-all hover:shadow-md">
              <div className="absolute top-0 right-0 bg-gray-400 text-white px-3 py-1 rounded-bl-lg font-bold">2</div>
              <CardContent className="pt-6 pb-4 flex flex-col items-center">
                <div className="relative mb-3">
                  <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-gray-300">
                    <Image
                      src={topUsers[1].avatar || "/placeholder.svg"}
                      alt={topUsers[1].username}
                      width={100}
                      height={100}
                      className="object-cover"
                    />
                  </div>
                  <div className="absolute -bottom-2 -right-2 bg-gray-400 text-white rounded-full p-1">
                    <Medal className="h-5 w-5" />
                  </div>
                </div>

                <h3 className={`text-lg font-bold mb-1 ${getTitleAndColor(topUsers[1].rating).color}`}>
                  {topUsers[1].username}
                </h3>
                <p className="text-sm text-muted-foreground mb-2">{getTitleAndColor(topUsers[1].rating).title}</p>
                <div className="text-2xl font-bold mb-2">{topUsers[1].rating}</div>
                <div className="flex gap-3 text-sm text-muted-foreground">
                  <span className="flex items-center">
                    <BookOpen className="h-3 w-3 mr-1" />
                    {topUsers[1].contribution}
                  </span>
                  <span className="flex items-center">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    {topUsers[1].submission_count}
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* 1st Place */}
          <div
            className="order-1 md:order-2 flex-1 md:flex-initial md:scale-110 z-10 animate-fade-in"
            style={{ animationDelay: "0s" }}
          >
            <Card className="relative overflow-hidden border-2 border-amber-500 dark:border-amber-600 transition-all hover:shadow-md">
              <div className="absolute top-0 right-0 bg-amber-500 text-white px-3 py-1 rounded-bl-lg font-bold">1</div>
              <CardContent className="pt-8 pb-6 flex flex-col items-center">
                <div className="relative mb-4">
                  <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-amber-500">
                    <Image
                      src={topUsers[0].avatar || "/placeholder.svg"}
                      alt={topUsers[0].username}
                      width={100}
                      height={100}
                      className="object-cover"
                    />
                  </div>
                  <div className="absolute -bottom-2 -right-2 bg-amber-500 text-white rounded-full p-1.5">
                    <Crown className="h-6 w-6" />
                  </div>
                </div>

                <h3 className={`text-xl font-bold mb-1 ${getTitleAndColor(topUsers[0].rating).color}`}>
                  {topUsers[0].username}
                </h3>
                <p className="text-sm text-muted-foreground mb-2">{getTitleAndColor(topUsers[0].rating).title}</p>
                <div className="text-3xl font-bold mb-2">{topUsers[0].rating}</div>
                <div className="flex gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center">
                    <BookOpen className="h-4 w-4 mr-1" />
                    {topUsers[0].contribution}
                  </span>
                  <span className="flex items-center">
                    <CheckCircle className="h-4 w-4 mr-1" />
                    {topUsers[0].submission_count}
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* 3rd Place */}
          <div className="order-3 flex-1 md:flex-initial animate-fade-in" style={{ animationDelay: "0.4s" }}>
            <Card className="relative overflow-hidden border-2 border-amber-700 dark:border-amber-800 transition-all hover:shadow-md">
              <div className="absolute top-0 right-0 bg-amber-700 text-white px-3 py-1 rounded-bl-lg font-bold">3</div>
              <CardContent className="pt-6 pb-4 flex flex-col items-center">
                <div className="relative mb-3">
                  <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-amber-700">
                    <Image
                      src={topUsers[2].avatar || "/placeholder.svg"}
                      alt={topUsers[2].username}
                      width={100}
                      height={100}
                      className="object-cover"
                    />
                  </div>
                  <div className="absolute -bottom-2 -right-2 bg-amber-700 text-white rounded-full p-1">
                    <Medal className="h-5 w-5" />
                  </div>
                </div>

                <h3 className={`text-lg font-bold mb-1 ${getTitleAndColor(topUsers[2].rating).color}`}>
                  {topUsers[2].username}
                </h3>
                <p className="text-sm text-muted-foreground mb-2">{getTitleAndColor(topUsers[2].rating).title}</p>
                <div className="text-2xl font-bold mb-2">{topUsers[2].rating}</div>
                <div className="flex gap-3 text-sm text-muted-foreground">
                  <span className="flex items-center">
                    <BookOpen className="h-3 w-3 mr-1" />
                    {topUsers[2].contribution}
                  </span>
                  <span className="flex items-center">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    {topUsers[2].submission_count}
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Leaderboard Table */}
      <div className={`transition-all duration-700 ${isLoaded ? "opacity-100" : "opacity-0 translate-y-10"}`}>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <h2 className="text-xl font-bold flex items-center">
            <Medal className="mr-2 h-5 w-5" />
            Full Leaderboard
          </h2>

          <div className="relative w-full md:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search by username..."
              className="pl-8 w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <Tabs defaultValue="all">
          <TabsList className="mb-4">
            <TabsTrigger value="all">All Users</TabsTrigger>
            <TabsTrigger value="supreme">Supreme Mugwump</TabsTrigger>
            <TabsTrigger value="head">Head of House</TabsTrigger>
            <TabsTrigger value="professor">Professors</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-12">Rank</TableHead>
                      <TableHead>User</TableHead>
                      <TableHead
                        className="cursor-pointer hover:text-primary transition-colors"
                        onClick={() => handleSort("rating")}
                      >
                        <div className="flex items-center">
                          Rating
                          {sortField === "rating" &&
                            (sortDirection === "desc" ? (
                              <ChevronDown className="ml-1 h-4 w-4" />
                            ) : (
                              <ChevronUp className="ml-1 h-4 w-4" />
                            ))}
                        </div>
                      </TableHead>
                      <TableHead
                        className="cursor-pointer hover:text-primary transition-colors"
                        onClick={() => handleSort("contribution")}
                      >
                        <div className="flex items-center">
                          Contributions
                          {sortField === "contribution" &&
                            (sortDirection === "desc" ? (
                              <ChevronDown className="ml-1 h-4 w-4" />
                            ) : (
                              <ChevronUp className="ml-1 h-4 w-4" />
                            ))}
                        </div>
                      </TableHead>
                      <TableHead
                        className="cursor-pointer hover:text-primary transition-colors"
                        onClick={() => handleSort("submission_count")}
                      >
                        <div className="flex items-center">
                          Submissions
                          {sortField === "submission_count" &&
                            (sortDirection === "desc" ? (
                              <ChevronDown className="ml-1 h-4 w-4" />
                            ) : (
                              <ChevronUp className="ml-1 h-4 w-4" />
                            ))}
                        </div>
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredUsers.map((user, index) => {
                      const { title, color } = getTitleAndColor(user.rating)
                      return (
                        <TableRow key={user.username} className="group transition-colors hover:bg-muted/50">
                          <TableCell className="font-medium">
                            <div className="flex items-center">
                            {index < 3 ? <div className="mr-1">{getMedalIcon(index)}</div> : <span>{index + 1}</span>}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center">
                              <div className="w-8 h-8 rounded-full overflow-hidden mr-3">
                                <Image
                                  src={user.avatar || "/placeholder.svg"}
                                  alt={user.username}
                                  width={32}
                                  height={32}
                                  className="object-cover"
                                />
                              </div>
                              <div>
                                <div className={`font-medium ${color} group-hover:underline transition-all`}>
                                  {user.username}
                                </div>
                                <div className="text-xs text-muted-foreground">{title}</div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline" className="font-mono">
                              {user.rating}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center">
                              <BookOpen className="h-3 w-3 mr-1 text-muted-foreground" />
                              {user.contribution}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center">
                              <CheckCircle className="h-3 w-3 mr-1 text-muted-foreground" />
                              {user.submission_count}
                            </div>
                          </TableCell>
                        </TableRow>
                      )
                    })}

                    {filteredUsers.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                          No users found matching your search criteria.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="supreme" className="space-y-4">
            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-12">Rank</TableHead>
                      <TableHead>User</TableHead>
                      <TableHead>Rating</TableHead>
                      <TableHead>Contributions</TableHead>
                      <TableHead>Submissions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredUsers
                      .filter((user) => user.rating >= 3500 && user.rating <= 4000)
                      .map((user, index) => {
                        const { title, color } = getTitleAndColor(user.rating)
                        return (
                          <TableRow key={user.username} className="group transition-colors hover:bg-muted/50">
                            <TableCell className="font-medium">{index + 1}</TableCell>
                            <TableCell>
                              <div className="flex items-center">
                                <div className="w-8 h-8 rounded-full overflow-hidden mr-3">
                                  <Image
                                    src={user.avatar || "/placeholder.svg"}
                                    alt={user.username}
                                    width={32}
                                    height={32}
                                    className="object-cover"
                                  />
                                </div>
                                <div>
                                  <div className={`font-medium ${color} group-hover:underline transition-all`}>
                                    {user.username}
                                  </div>
                                  <div className="text-xs text-muted-foreground">{title}</div>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <Badge variant="outline" className="font-mono">
                                {user.rating}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center">
                                <BookOpen className="h-3 w-3 mr-1 text-muted-foreground" />
                                {user.contribution}
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center">
                                <CheckCircle className="h-3 w-3 mr-1 text-muted-foreground" />
                                {user.submission_count}
                              </div>
                            </TableCell>
                          </TableRow>
                        )
                      })}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="head" className="space-y-4">
            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-12">Rank</TableHead>
                      <TableHead>User</TableHead>
                      <TableHead>Rating</TableHead>
                      <TableHead>Contributions</TableHead>
                      <TableHead>Submissions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredUsers
                      .filter((user) => user.rating >= 3000 && user.rating < 3500)
                      .map((user, index) => {
                        const { title, color } = getTitleAndColor(user.rating)
                        return (
                          <TableRow key={user.username} className="group transition-colors hover:bg-muted/50">
                            <TableCell className="font-medium">{index + 1}</TableCell>
                            <TableCell>
                              <div className="flex items-center">
                                <div className="w-8 h-8 rounded-full overflow-hidden mr-3">
                                  <Image
                                    src={user.avatar || "/placeholder.svg"}
                                    alt={user.username}
                                    width={32}
                                    height={32}
                                    className="object-cover"
                                  />
                                </div>
                                <div>
                                  <div className={`font-medium ${color} group-hover:underline transition-all`}>
                                    {user.username}
                                  </div>
                                  <div className="text-xs text-muted-foreground">{title}</div>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <Badge variant="outline" className="font-mono">
                                {user.rating}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center">
                                <BookOpen className="h-3 w-3 mr-1 text-muted-foreground" />
                                {user.contribution}
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center">
                                <CheckCircle className="h-3 w-3 mr-1 text-muted-foreground" />
                                {user.submission_count}
                              </div>
                            </TableCell>
                          </TableRow>
                        )
                      })}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="professor" className="space-y-4">
            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-12">Rank</TableHead>
                      <TableHead>User</TableHead>
                      <TableHead>Rating</TableHead>
                      <TableHead>Contributions</TableHead>
                      <TableHead>Submissions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredUsers
                      .filter((user) => user.rating >= 2500 && user.rating < 3000)
                      .map((user, index) => {
                        const { title, color } = getTitleAndColor(user.rating)
                        return (
                          <TableRow key={user.username} className="group transition-colors hover:bg-muted/50">
                            <TableCell className="font-medium">{index + 1}</TableCell>
                            <TableCell>
                              <div className="flex items-center">
                                <div className="w-8 h-8 rounded-full overflow-hidden mr-3">
                                  <Image
                                    src={user.avatar || "/placeholder.svg"}
                                    alt={user.username}
                                    width={32}
                                    height={32}
                                    className="object-cover"
                                  />
                                </div>
                                <div>
                                  <div className={`font-medium ${color} group-hover:underline transition-all`}>
                                    {user.username}
                                  </div>
                                  <div className="text-xs text-muted-foreground">{title}</div>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <Badge variant="outline" className="font-mono">
                                {user.rating}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center">
                                <BookOpen className="h-3 w-3 mr-1 text-muted-foreground" />
                                {user.contribution}
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center">
                                <CheckCircle className="h-3 w-3 mr-1 text-muted-foreground" />
                                {user.submission_count}
                              </div>
                            </TableCell>
                          </TableRow>
                        )
                      })}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Rating Titles Legend */}
      <div className={`mt-12 transition-all duration-700 ${isLoaded ? "opacity-100" : "opacity-0 translate-y-10"}`}>
        <h2 className="text-xl font-bold mb-6 flex items-center">
          <Trophy className="mr-2 h-5 w-5 text-primary" />
          Rating Titles
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {ratingTitles.map((title) => (
            <Card key={title.title} className="transition-all hover:shadow-md">
              <CardContent className="p-4 flex items-center justify-between">
                <div>
                  <h3 className={`font-bold ${title.color}`}>{title.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {title.min} - {title.max} rating
                  </p>
                </div>
                <Badge variant="outline" className={`${title.color} border-current/30`}>
                  {title.min}+
                </Badge>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

