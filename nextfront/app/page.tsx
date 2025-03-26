// import Link from "next/link"
// import { ArrowRight } from "lucide-react"

// import { Button } from "@/components/ui/button"

// export default function Home() {
//   return (
//     <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] py-12">
//       <div className="container px-4 md:px-6">
//         <div className="flex flex-col items-center space-y-4 text-center">
//           <div className="space-y-2">
//             <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
//               Welcome to{" "}
//               <span className="bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
//                 mathXplorer
//               </span>
//             </h1>
//             <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
//               Explore the fascinating world of mathematics through challenging problems and exciting contests.
//             </p>
//           </div>
//           <div className="space-x-4">
//             <Link href="/signup">
//               <Button size="lg" className="group">
//                 Get Started
//                 <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
//               </Button>
//             </Link>
//             <Link href="/problems">
//               <Button variant="outline" size="lg">
//                 Explore Problems
//               </Button>
//             </Link>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

import Link from "next/link"
import Image from "next/image"
import {
  ArrowRight,
  BookOpen,
  Trophy,
  Medal,
  Target,
  CheckCircle,
  ThumbsUp,
  ThumbsDown,
  MessageSquare,
  Sparkles,
  Lightbulb,
  GraduationCap,
  Users,
  BookMarked,
  Award,
  ExternalLink,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

// Sample data for top problems
const topProblems = [
  {
    problem_id: 1,
    title: "Prime Number Factorization",
    target: "v2",
    tags: ["Number Theory", "Algorithms", "Prime Numbers"],
    xp: 150,
    submission_count: 342,
    difficulty: "Medium",
  },
  {
    problem_id: 5,
    title: "Probability of Dice Rolls",
    target: "v4",
    tags: ["Probability", "Combinatorics", "Dynamic Programming"],
    xp: 220,
    submission_count: 142,
    difficulty: "Very Hard",
  },
  {
    problem_id: 6,
    title: "Graph Coloring Problem",
    target: "v5",
    tags: ["Graph Theory", "Algorithms", "NP-Complete"],
    xp: 250,
    submission_count: 98,
    difficulty: "Expert",
  },
]

// Sample data for top blogs
const topBlogs = [
  {
    id: 2,
    title: "Exploring Euler's Identity",
    author: {
      name: "Prof. Michael Wong",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    category: "Complex Analysis",
    likes: 78,
    dislikes: 2,
    comments: 23,
    excerpt:
      "Euler's identity, $e^{i\\pi} + 1 = 0$, is often described as the most beautiful equation in mathematics. This blog explores the components of this equation and why it's so significant...",
  },
  {
    id: 1,
    title: "Understanding the Riemann Hypothesis",
    author: {
      name: "Dr. Julia Chen",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    category: "Number Theory",
    likes: 42,
    dislikes: 3,
    comments: 15,
    excerpt:
      "The Riemann hypothesis is one of the most important unsolved problems in mathematics. It concerns the distribution of prime numbers and has implications for various areas of mathematics...",
  },
  {
    id: 4,
    title: "The Beauty of Fibonacci Sequences",
    author: {
      name: "Dr. Lisa Patel",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    category: "Number Theory",
    likes: 62,
    dislikes: 1,
    comments: 18,
    excerpt:
      "The Fibonacci sequence appears in nature and has fascinating mathematical properties. This blog explores the sequence, the golden ratio, and their connections to various mathematical concepts...",
  },
]

// Sample data for top users
const topUsers = [
  {
    username: "MathWizard42",
    avatar: "/placeholder.svg?height=100&width=100",
    rating: 3750,
    contribution: 28,
    submission_count: 156,
    title: "Supreme Mugwump",
    color: "text-amber-500",
  },
  {
    username: "EulersFan",
    avatar: "/placeholder.svg?height=100&width=100",
    rating: 3420,
    contribution: 19,
    submission_count: 132,
    title: "Head of House",
    color: "text-fuchsia-600",
  },
  {
    username: "PythagorasLover",
    avatar: "/placeholder.svg?height=100&width=100",
    rating: 3210,
    contribution: 24,
    submission_count: 145,
    title: "Head of House",
    color: "text-fuchsia-600",
  },
]

// Sample announcements
const announcements = [
  {
    id: 1,
    title: "International Mathematics Competition",
    content:
      "Join our upcoming International Mathematics Competition starting next month. Register before June 15th to participate and win exciting prizes!",
    date: "May 20, 2024",
    type: "event",
  },
  {
    id: 2,
    title: "New Problem Set Released",
    content:
      "We've just released a new set of challenging problems in Graph Theory and Combinatorics. Check them out in the Problems section!",
    date: "May 15, 2024",
    type: "update",
  },
  {
    id: 3,
    title: "Platform Maintenance",
    content:
      "We'll be performing scheduled maintenance on May 25th from 2:00 AM to 4:00 AM UTC. The platform may experience brief downtime during this period.",
    date: "May 12, 2024",
    type: "maintenance",
  },
]

// Map difficulty to color
const difficultyColor = {
  Easy: "bg-green-500",
  Medium: "bg-yellow-500",
  Hard: "bg-orange-500",
  "Very Hard": "bg-red-500",
  Expert: "bg-purple-500",
}

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] py-12 bg-gradient-to-b from-background to-background/80">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                Welcome to{" "}
                <span className="bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                  mathXplorer
                </span>
              </h1>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                Explore the fascinating world of mathematics through challenging problems and exciting contests.
              </p>
            </div>
            <div className="space-x-4">
              <Link href="/signup">
                <Button size="lg" className="group">
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link href="/problems">
                <Button variant="outline" size="lg">
                  Explore Problems
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Top Problems Section */}
      <section className="py-16 bg-muted/30">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row mb-10">
            <div>
              <h2 className="text-3xl font-bold tracking-tight">Top Problems</h2>
              <p className="text-muted-foreground">Challenge yourself with our most popular mathematical problems</p>
            </div>
            <Link href="/problems">
              <Button variant="outline" className="group">
                View All Problems
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>

          <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {topProblems.map((problem) => (
              <Card key={problem.problem_id} className="overflow-hidden transition-all hover:shadow-md group">
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-2">
                      <div className={`w-3 h-3 rounded-full ${difficultyColor[problem.difficulty as keyof typeof difficultyColor]}`} />
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
                  <Link href={`/problems/${problem.problem_id}`}>
                    <CardTitle className="text-xl hover:text-primary transition-colors">{problem.title}</CardTitle>
                  </Link>
                </CardHeader>
                <CardContent>
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
                    <span>{problem.submission_count} submissions</span>
                  </div>
                  <Link href={`/problems/${problem.problem_id}`}>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                    >
                      Solve
                      <ArrowRight className="ml-1 h-4 w-4" />
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Top Blogs Section */}
      <section className="py-16">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row mb-10">
            <div>
              <h2 className="text-3xl font-bold tracking-tight">Featured Articles</h2>
              <p className="text-muted-foreground">Explore mathematical concepts through our top blog posts</p>
            </div>
            <Link href="/blog">
              <Button variant="outline" className="group">
                View All Articles
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>

          <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {topBlogs.map((blog) => (
              <Card key={blog.id} className="overflow-hidden transition-all hover:shadow-md">
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <Badge variant="secondary" className="mb-2">
                      {blog.category}
                    </Badge>
                  </div>
                  <Link href={`/blog/${blog.id}`}>
                    <CardTitle className="text-xl hover:text-primary transition-colors">{blog.title}</CardTitle>
                  </Link>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center mb-4">
                    <Avatar className="h-8 w-8 mr-2">
                      <AvatarImage src={blog.author.avatar} alt={blog.author.name} />
                      <AvatarFallback>{blog.author.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <span className="text-sm font-medium">{blog.author.name}</span>
                  </div>
                  <p className="text-muted-foreground line-clamp-3 text-sm">{blog.excerpt}</p>
                </CardContent>
                <CardFooter className="flex justify-between pt-3 text-sm text-muted-foreground border-t">
                  <div className="flex space-x-4">
                    <div className="flex items-center">
                      <ThumbsUp className="h-4 w-4 mr-1" />
                      <span>{blog.likes}</span>
                    </div>
                    <div className="flex items-center">
                      <ThumbsDown className="h-4 w-4 mr-1" />
                      <span>{blog.dislikes}</span>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <MessageSquare className="h-4 w-4 mr-1" />
                    <span>{blog.comments} comments</span>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Top Users Section */}
      <section className="py-16 bg-muted/30">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row mb-10">
            <div>
              <h2 className="text-3xl font-bold tracking-tight">Top Mathematicians</h2>
              <p className="text-muted-foreground">Meet our highest-rated community members</p>
            </div>
            <Link href="/leaderboard">
              <Button variant="outline" className="group">
                View Leaderboard
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>

          <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {topUsers.map((user, index) => (
              <Card key={user.username} className="overflow-hidden transition-all hover:shadow-md">
                <CardContent className="pt-6 flex flex-col items-center text-center">
                  <div className="relative mb-4">
                    <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-primary/20">
                      <Image
                        src={user.avatar || "/placeholder.svg"}
                        alt={user.username}
                        width={100}
                        height={100}
                        className="object-cover"
                      />
                    </div>
                    <div className="absolute -bottom-2 -right-2 bg-primary text-white rounded-full p-1.5">
                      <Medal className="h-5 w-5" />
                    </div>
                  </div>

                  <h3 className={`text-xl font-bold mb-1 ${user.color}`}>{user.username}</h3>
                  <p className="text-sm text-muted-foreground mb-2">{user.title}</p>
                  <div className="text-2xl font-bold mb-4">{user.rating}</div>

                  <div className="grid grid-cols-2 gap-4 w-full">
                    <div className="flex flex-col items-center p-2 rounded-md bg-muted/50">
                      <BookOpen className="h-4 w-4 mb-1 text-muted-foreground" />
                      <span className="text-sm font-medium">{user.contribution}</span>
                      <span className="text-xs text-muted-foreground">Blogs</span>
                    </div>
                    <div className="flex flex-col items-center p-2 rounded-md bg-muted/50">
                      <CheckCircle className="h-4 w-4 mb-1 text-muted-foreground" />
                      <span className="text-sm font-medium">{user.submission_count}</span>
                      <span className="text-xs text-muted-foreground">Submissions</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Announcements Section */}
      <section className="py-16">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold tracking-tight">Announcements</h2>
            <p className="text-muted-foreground">Stay updated with the latest news and events</p>
          </div>

          <div className="max-w-3xl mx-auto space-y-6">
            {announcements.map((announcement) => {
              // Set icon and color based on announcement type
              let icon = <Sparkles className="h-5 w-5" />
              let bgColor = "bg-blue-500/10 border-blue-500/20"
              let iconColor = "text-blue-500"

              if (announcement.type === "event") {
                icon = <Trophy className="h-5 w-5" />
                bgColor = "bg-amber-500/10 border-amber-500/20"
                iconColor = "text-amber-500"
              } else if (announcement.type === "maintenance") {
                icon = <Award className="h-5 w-5" />
                bgColor = "bg-red-500/10 border-red-500/20"
                iconColor = "text-red-500"
              }

              return (
                <div
                  key={announcement.id}
                  className={`p-6 rounded-lg border ${bgColor} transition-all hover:shadow-md animate-fade-in`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`p-2 rounded-full ${bgColor} ${iconColor}`}>{icon}</div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-lg font-bold">{announcement.title}</h3>
                        <span className="text-xs text-muted-foreground">{announcement.date}</span>
                      </div>
                      <p className="text-muted-foreground">{announcement.content}</p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="py-16 bg-muted/30">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight">How mathXplorer Helps You</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mt-2">
              Discover how our platform can enhance your mathematical journey
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            <div className="flex flex-col items-center text-center p-6 rounded-lg bg-card transition-all hover:shadow-md">
              <div className="p-3 rounded-full bg-primary/10 text-primary mb-4">
                <Lightbulb className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold mb-2">Problem Solving</h3>
              <p className="text-muted-foreground">
                Enhance your problem-solving skills with our diverse collection of mathematical challenges ranging from
                beginner to expert level.
              </p>
            </div>

            <div className="flex flex-col items-center text-center p-6 rounded-lg bg-card transition-all hover:shadow-md">
              <div className="p-3 rounded-full bg-primary/10 text-primary mb-4">
                <GraduationCap className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold mb-2">Learning Resources</h3>
              <p className="text-muted-foreground">
                Access high-quality articles and tutorials written by experts to deepen your understanding of
                mathematical concepts.
              </p>
            </div>

            <div className="flex flex-col items-center text-center p-6 rounded-lg bg-card transition-all hover:shadow-md">
              <div className="p-3 rounded-full bg-primary/10 text-primary mb-4">
                <Users className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold mb-2">Community</h3>
              <p className="text-muted-foreground">
                Connect with fellow mathematics enthusiasts, share insights, and collaborate on solving complex
                problems.
              </p>
            </div>

            <div className="flex flex-col items-center text-center p-6 rounded-lg bg-card transition-all hover:shadow-md">
              <div className="p-3 rounded-full bg-primary/10 text-primary mb-4">
                <Trophy className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold mb-2">Competitions</h3>
              <p className="text-muted-foreground">
                Participate in regular contests to test your skills, compete with others, and earn recognition in the
                mathematics community.
              </p>
            </div>

            <div className="flex flex-col items-center text-center p-6 rounded-lg bg-card transition-all hover:shadow-md">
              <div className="p-3 rounded-full bg-primary/10 text-primary mb-4">
                <BookMarked className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold mb-2">Personalized Learning</h3>
              <p className="text-muted-foreground">
                Track your progress, identify areas for improvement, and receive tailored problem recommendations based
                on your skill level.
              </p>
            </div>

            <div className="flex flex-col items-center text-center p-6 rounded-lg bg-card transition-all hover:shadow-md">
              <div className="p-3 rounded-full bg-primary/10 text-primary mb-4">
                <Award className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold mb-2">Recognition</h3>
              <p className="text-muted-foreground">
                Earn badges, titles, and climb the leaderboard as you demonstrate your mathematical prowess and
                contribute to the community.
              </p>
            </div>
          </div>

          {/* Affiliations */}
          <div className="mt-16">
            <h3 className="text-xl font-bold text-center mb-8">Trusted By</h3>
            <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
              <div className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
                <div className="w-8 h-8 bg-muted rounded-full"></div>
                <span className="font-medium">University of Mathematics</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
                <div className="w-8 h-8 bg-muted rounded-full"></div>
                <span className="font-medium">International Math Society</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
                <div className="w-8 h-8 bg-muted rounded-full"></div>
                <span className="font-medium">Global STEM Foundation</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
                <div className="w-8 h-8 bg-muted rounded-full"></div>
                <span className="font-medium">Tech Education Alliance</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      </div>
  )
}

