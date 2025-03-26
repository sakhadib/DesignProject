// import Link from "next/link"
// import Image from "next/image"
// import {
//   ArrowRight,
//   BookOpen,
//   Trophy,
//   Medal,
//   Target,
//   CheckCircle,
//   ThumbsUp,
//   ThumbsDown,
//   MessageSquare,
//   Sparkles,
//   Lightbulb,
//   GraduationCap,
//   Users,
//   BookMarked,
//   Award,
//   ExternalLink,
// } from "lucide-react"

// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
// import { Badge } from "@/components/ui/badge"
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

// // Sample data for top problems
// const topProblems = [
//   {
//     problem_id: 1,
//     title: "Prime Number Factorization",
//     target: "v2",
//     tags: ["Number Theory", "Algorithms", "Prime Numbers"],
//     xp: 150,
//     submission_count: 342,
//     difficulty: "Medium",
//   },
//   {
//     problem_id: 5,
//     title: "Probability of Dice Rolls",
//     target: "v4",
//     tags: ["Probability", "Combinatorics", "Dynamic Programming"],
//     xp: 220,
//     submission_count: 142,
//     difficulty: "Very Hard",
//   },
//   {
//     problem_id: 6,
//     title: "Graph Coloring Problem",
//     target: "v5",
//     tags: ["Graph Theory", "Algorithms", "NP-Complete"],
//     xp: 250,
//     submission_count: 98,
//     difficulty: "Expert",
//   },
// ]

// // Sample data for top blogs
// const topBlogs = [
//   {
//     id: 2,
//     title: "Exploring Euler's Identity",
//     author: {
//       name: "Prof. Michael Wong",
//       avatar: "/placeholder.svg?height=40&width=40",
//     },
//     category: "Complex Analysis",
//     likes: 78,
//     dislikes: 2,
//     comments: 23,
//     excerpt:
//       "Euler's identity, $e^{i\\pi} + 1 = 0$, is often described as the most beautiful equation in mathematics. This blog explores the components of this equation and why it's so significant...",
//   },
//   {
//     id: 1,
//     title: "Understanding the Riemann Hypothesis",
//     author: {
//       name: "Dr. Julia Chen",
//       avatar: "/placeholder.svg?height=40&width=40",
//     },
//     category: "Number Theory",
//     likes: 42,
//     dislikes: 3,
//     comments: 15,
//     excerpt:
//       "The Riemann hypothesis is one of the most important unsolved problems in mathematics. It concerns the distribution of prime numbers and has implications for various areas of mathematics...",
//   },
//   {
//     id: 4,
//     title: "The Beauty of Fibonacci Sequences",
//     author: {
//       name: "Dr. Lisa Patel",
//       avatar: "/placeholder.svg?height=40&width=40",
//     },
//     category: "Number Theory",
//     likes: 62,
//     dislikes: 1,
//     comments: 18,
//     excerpt:
//       "The Fibonacci sequence appears in nature and has fascinating mathematical properties. This blog explores the sequence, the golden ratio, and their connections to various mathematical concepts...",
//   },
// ]

// // Sample data for top users
// const topUsers = [
//   {
//     username: "MathWizard42",
//     avatar: "/placeholder.svg?height=100&width=100",
//     rating: 3750,
//     contribution: 28,
//     submission_count: 156,
//     title: "Supreme Mugwump",
//     color: "text-amber-500",
//   },
//   {
//     username: "EulersFan",
//     avatar: "/placeholder.svg?height=100&width=100",
//     rating: 3420,
//     contribution: 19,
//     submission_count: 132,
//     title: "Head of House",
//     color: "text-fuchsia-600",
//   },
//   {
//     username: "PythagorasLover",
//     avatar: "/placeholder.svg?height=100&width=100",
//     rating: 3210,
//     contribution: 24,
//     submission_count: 145,
//     title: "Head of House",
//     color: "text-fuchsia-600",
//   },
// ]

// // Sample announcements
// const announcements = [
//   {
//     id: 1,
//     title: "International Mathematics Competition",
//     content:
//       "Join our upcoming International Mathematics Competition starting next month. Register before June 15th to participate and win exciting prizes!",
//     date: "May 20, 2024",
//     type: "event",
//   },
//   {
//     id: 2,
//     title: "New Problem Set Released",
//     content:
//       "We've just released a new set of challenging problems in Graph Theory and Combinatorics. Check them out in the Problems section!",
//     date: "May 15, 2024",
//     type: "update",
//   },
//   {
//     id: 3,
//     title: "Platform Maintenance",
//     content:
//       "We'll be performing scheduled maintenance on May 25th from 2:00 AM to 4:00 AM UTC. The platform may experience brief downtime during this period.",
//     date: "May 12, 2024",
//     type: "maintenance",
//   },
// ]

// // Map difficulty to color
// const difficultyColor = {
//   Easy: "bg-green-500",
//   Medium: "bg-yellow-500",
//   Hard: "bg-orange-500",
//   "Very Hard": "bg-red-500",
//   Expert: "bg-purple-500",
// }

// export default function Home() {
//   return (
//     <div className="flex flex-col">
//       {/* Hero Section */}
//       <section className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] py-12 bg-gradient-to-b from-background to-background/80">
//         <div className="container px-4 md:px-6">
//           <div className="flex flex-col items-center space-y-4 text-center">
//             <div className="space-y-2">
//               <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
//                 Welcome to{" "}
//                 <span className="bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
//                   mathXplorer
//                 </span>
//               </h1>
//               <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
//                 Explore the fascinating world of mathematics through challenging problems and exciting contests.
//               </p>
//             </div>
//             <div className="space-x-4">
//               <Link href="/signup">
//                 <Button size="lg" className="group">
//                   Get Started
//                   <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
//                 </Button>
//               </Link>
//               <Link href="/problems">
//                 <Button variant="outline" size="lg">
//                   Explore Problems
//                 </Button>
//               </Link>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Top Problems Section */}
//       <section className="py-16 bg-muted/30">
//         <div className="container px-4 md:px-6">
//           <div className="flex flex-col items-center justify-between gap-4 md:flex-row mb-10">
//             <div>
//               <h2 className="text-3xl font-bold tracking-tight">Top Problems</h2>
//               <p className="text-muted-foreground">Challenge yourself with our most popular mathematical problems</p>
//             </div>
//             <Link href="/problems">
//               <Button variant="outline" className="group">
//                 View All Problems
//                 <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
//               </Button>
//             </Link>
//           </div>

//           <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
//             {topProblems.map((problem) => (
//               <Card key={problem.problem_id} className="overflow-hidden transition-all hover:shadow-md group">
//                 <CardHeader className="pb-3">
//                   <div className="flex justify-between items-start">
//                     <div className="flex items-center gap-2">
//                       <div className={`w-3 h-3 rounded-full ${difficultyColor[problem.difficulty as keyof typeof difficultyColor]}`} />
//                       <span className="text-sm text-muted-foreground">{problem.difficulty}</span>
//                     </div>
//                     <div className="flex items-center gap-2">
//                       <Badge variant="outline" className="flex items-center gap-1">
//                         <Target className="h-3 w-3" />
//                         {problem.target}
//                       </Badge>
//                       <Badge variant="secondary" className="flex items-center gap-1">
//                         <Trophy className="h-3 w-3" />
//                         {problem.xp} XP
//                       </Badge>
//                     </div>
//                   </div>
//                   <Link href={`/problems/${problem.problem_id}`}>
//                     <CardTitle className="text-xl hover:text-primary transition-colors">{problem.title}</CardTitle>
//                   </Link>
//                 </CardHeader>
//                 <CardContent>
//                   <div className="flex flex-wrap gap-2 mt-3">
//                     {problem.tags.map((tag) => (
//                       <Badge key={tag} variant="outline" className="text-xs">
//                         {tag}
//                       </Badge>
//                     ))}
//                   </div>
//                 </CardContent>
//                 <CardFooter className="flex justify-between pt-3 text-sm text-muted-foreground border-t">
//                   <div className="flex items-center gap-2">
//                     <span>{problem.submission_count} submissions</span>
//                   </div>
//                   <Link href={`/problems/${problem.problem_id}`}>
//                     <Button
//                       variant="ghost"
//                       size="sm"
//                       className="group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
//                     >
//                       Solve
//                       <ArrowRight className="ml-1 h-4 w-4" />
//                     </Button>
//                   </Link>
//                 </CardFooter>
//               </Card>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Top Blogs Section */}
//       <section className="py-16">
//         <div className="container px-4 md:px-6">
//           <div className="flex flex-col items-center justify-between gap-4 md:flex-row mb-10">
//             <div>
//               <h2 className="text-3xl font-bold tracking-tight">Featured Articles</h2>
//               <p className="text-muted-foreground">Explore mathematical concepts through our top blog posts</p>
//             </div>
//             <Link href="/blog">
//               <Button variant="outline" className="group">
//                 View All Articles
//                 <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
//               </Button>
//             </Link>
//           </div>

//           <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
//             {topBlogs.map((blog) => (
//               <Card key={blog.id} className="overflow-hidden transition-all hover:shadow-md">
//                 <CardHeader className="pb-3">
//                   <div className="flex justify-between items-start">
//                     <Badge variant="secondary" className="mb-2">
//                       {blog.category}
//                     </Badge>
//                   </div>
//                   <Link href={`/blog/${blog.id}`}>
//                     <CardTitle className="text-xl hover:text-primary transition-colors">{blog.title}</CardTitle>
//                   </Link>
//                 </CardHeader>
//                 <CardContent>
//                   <div className="flex items-center mb-4">
//                     <Avatar className="h-8 w-8 mr-2">
//                       <AvatarImage src={blog.author.avatar} alt={blog.author.name} />
//                       <AvatarFallback>{blog.author.name.charAt(0)}</AvatarFallback>
//                     </Avatar>
//                     <span className="text-sm font-medium">{blog.author.name}</span>
//                   </div>
//                   <p className="text-muted-foreground line-clamp-3 text-sm">{blog.excerpt}</p>
//                 </CardContent>
//                 <CardFooter className="flex justify-between pt-3 text-sm text-muted-foreground border-t">
//                   <div className="flex space-x-4">
//                     <div className="flex items-center">
//                       <ThumbsUp className="h-4 w-4 mr-1" />
//                       <span>{blog.likes}</span>
//                     </div>
//                     <div className="flex items-center">
//                       <ThumbsDown className="h-4 w-4 mr-1" />
//                       <span>{blog.dislikes}</span>
//                     </div>
//                   </div>
//                   <div className="flex items-center">
//                     <MessageSquare className="h-4 w-4 mr-1" />
//                     <span>{blog.comments} comments</span>
//                   </div>
//                 </CardFooter>
//               </Card>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Top Users Section */}
//       <section className="py-16 bg-muted/30">
//         <div className="container px-4 md:px-6">
//           <div className="flex flex-col items-center justify-between gap-4 md:flex-row mb-10">
//             <div>
//               <h2 className="text-3xl font-bold tracking-tight">Top Mathematicians</h2>
//               <p className="text-muted-foreground">Meet our highest-rated community members</p>
//             </div>
//             <Link href="/leaderboard">
//               <Button variant="outline" className="group">
//                 View Leaderboard
//                 <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
//               </Button>
//             </Link>
//           </div>

//           <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
//             {topUsers.map((user, index) => (
//               <Card key={user.username} className="overflow-hidden transition-all hover:shadow-md">
//                 <CardContent className="pt-6 flex flex-col items-center text-center">
//                   <div className="relative mb-4">
//                     <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-primary/20">
//                       <Image
//                         src={user.avatar || "/placeholder.svg"}
//                         alt={user.username}
//                         width={100}
//                         height={100}
//                         className="object-cover"
//                       />
//                     </div>
//                     <div className="absolute -bottom-2 -right-2 bg-primary text-white rounded-full p-1.5">
//                       <Medal className="h-5 w-5" />
//                     </div>
//                   </div>

//                   <h3 className={`text-xl font-bold mb-1 ${user.color}`}>{user.username}</h3>
//                   <p className="text-sm text-muted-foreground mb-2">{user.title}</p>
//                   <div className="text-2xl font-bold mb-4">{user.rating}</div>

//                   <div className="grid grid-cols-2 gap-4 w-full">
//                     <div className="flex flex-col items-center p-2 rounded-md bg-muted/50">
//                       <BookOpen className="h-4 w-4 mb-1 text-muted-foreground" />
//                       <span className="text-sm font-medium">{user.contribution}</span>
//                       <span className="text-xs text-muted-foreground">Blogs</span>
//                     </div>
//                     <div className="flex flex-col items-center p-2 rounded-md bg-muted/50">
//                       <CheckCircle className="h-4 w-4 mb-1 text-muted-foreground" />
//                       <span className="text-sm font-medium">{user.submission_count}</span>
//                       <span className="text-xs text-muted-foreground">Submissions</span>
//                     </div>
//                   </div>
//                 </CardContent>
//               </Card>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Announcements Section */}
//       <section className="py-16">
//         <div className="container px-4 md:px-6">
//           <div className="text-center mb-10">
//             <h2 className="text-3xl font-bold tracking-tight">Announcements</h2>
//             <p className="text-muted-foreground">Stay updated with the latest news and events</p>
//           </div>

//           <div className="max-w-3xl mx-auto space-y-6">
//             {announcements.map((announcement) => {
//               // Set icon and color based on announcement type
//               let icon = <Sparkles className="h-5 w-5" />
//               let bgColor = "bg-blue-500/10 border-blue-500/20"
//               let iconColor = "text-blue-500"

//               if (announcement.type === "event") {
//                 icon = <Trophy className="h-5 w-5" />
//                 bgColor = "bg-amber-500/10 border-amber-500/20"
//                 iconColor = "text-amber-500"
//               } else if (announcement.type === "maintenance") {
//                 icon = <Award className="h-5 w-5" />
//                 bgColor = "bg-red-500/10 border-red-500/20"
//                 iconColor = "text-red-500"
//               }

//               return (
//                 <div
//                   key={announcement.id}
//                   className={`p-6 rounded-lg border ${bgColor} transition-all hover:shadow-md animate-fade-in`}
//                 >
//                   <div className="flex items-start gap-4">
//                     <div className={`p-2 rounded-full ${bgColor} ${iconColor}`}>{icon}</div>
//                     <div className="flex-1">
//                       <div className="flex justify-between items-start mb-2">
//                         <h3 className="text-lg font-bold">{announcement.title}</h3>
//                         <span className="text-xs text-muted-foreground">{announcement.date}</span>
//                       </div>
//                       <p className="text-muted-foreground">{announcement.content}</p>
//                     </div>
//                   </div>
//                 </div>
//               )
//             })}
//           </div>
//         </div>
//       </section>

//       {/* Use Cases Section */}
//       <section className="py-16 bg-muted/30">
//         <div className="container px-4 md:px-6">
//           <div className="text-center mb-12">
//             <h2 className="text-3xl font-bold tracking-tight">How mathXplorer Helps You</h2>
//             <p className="text-muted-foreground max-w-2xl mx-auto mt-2">
//               Discover how our platform can enhance your mathematical journey
//             </p>
//           </div>

//           <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
//             <div className="flex flex-col items-center text-center p-6 rounded-lg bg-card transition-all hover:shadow-md">
//               <div className="p-3 rounded-full bg-primary/10 text-primary mb-4">
//                 <Lightbulb className="h-8 w-8" />
//               </div>
//               <h3 className="text-xl font-bold mb-2">Problem Solving</h3>
//               <p className="text-muted-foreground">
//                 Enhance your problem-solving skills with our diverse collection of mathematical challenges ranging from
//                 beginner to expert level.
//               </p>
//             </div>

//             <div className="flex flex-col items-center text-center p-6 rounded-lg bg-card transition-all hover:shadow-md">
//               <div className="p-3 rounded-full bg-primary/10 text-primary mb-4">
//                 <GraduationCap className="h-8 w-8" />
//               </div>
//               <h3 className="text-xl font-bold mb-2">Learning Resources</h3>
//               <p className="text-muted-foreground">
//                 Access high-quality articles and tutorials written by experts to deepen your understanding of
//                 mathematical concepts.
//               </p>
//             </div>

//             <div className="flex flex-col items-center text-center p-6 rounded-lg bg-card transition-all hover:shadow-md">
//               <div className="p-3 rounded-full bg-primary/10 text-primary mb-4">
//                 <Users className="h-8 w-8" />
//               </div>
//               <h3 className="text-xl font-bold mb-2">Community</h3>
//               <p className="text-muted-foreground">
//                 Connect with fellow mathematics enthusiasts, share insights, and collaborate on solving complex
//                 problems.
//               </p>
//             </div>

//             <div className="flex flex-col items-center text-center p-6 rounded-lg bg-card transition-all hover:shadow-md">
//               <div className="p-3 rounded-full bg-primary/10 text-primary mb-4">
//                 <Trophy className="h-8 w-8" />
//               </div>
//               <h3 className="text-xl font-bold mb-2">Competitions</h3>
//               <p className="text-muted-foreground">
//                 Participate in regular contests to test your skills, compete with others, and earn recognition in the
//                 mathematics community.
//               </p>
//             </div>

//             <div className="flex flex-col items-center text-center p-6 rounded-lg bg-card transition-all hover:shadow-md">
//               <div className="p-3 rounded-full bg-primary/10 text-primary mb-4">
//                 <BookMarked className="h-8 w-8" />
//               </div>
//               <h3 className="text-xl font-bold mb-2">Personalized Learning</h3>
//               <p className="text-muted-foreground">
//                 Track your progress, identify areas for improvement, and receive tailored problem recommendations based
//                 on your skill level.
//               </p>
//             </div>

//             <div className="flex flex-col items-center text-center p-6 rounded-lg bg-card transition-all hover:shadow-md">
//               <div className="p-3 rounded-full bg-primary/10 text-primary mb-4">
//                 <Award className="h-8 w-8" />
//               </div>
//               <h3 className="text-xl font-bold mb-2">Recognition</h3>
//               <p className="text-muted-foreground">
//                 Earn badges, titles, and climb the leaderboard as you demonstrate your mathematical prowess and
//                 contribute to the community.
//               </p>
//             </div>
//           </div>

//           {/* Affiliations */}
//           <div className="mt-16">
//             <h3 className="text-xl font-bold text-center mb-8">Trusted By</h3>
//             <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
//               <div className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
//                 <div className="w-8 h-8 bg-muted rounded-full"></div>
//                 <span className="font-medium">University of Mathematics</span>
//               </div>
//               <div className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
//                 <div className="w-8 h-8 bg-muted rounded-full"></div>
//                 <span className="font-medium">International Math Society</span>
//               </div>
//               <div className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
//                 <div className="w-8 h-8 bg-muted rounded-full"></div>
//                 <span className="font-medium">Global STEM Foundation</span>
//               </div>
//               <div className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
//                 <div className="w-8 h-8 bg-muted rounded-full"></div>
//                 <span className="font-medium">Tech Education Alliance</span>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       </div>
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
      {/* Hero Section - Redesigned with animations and math theme */}
      <section className="relative min-h-[calc(100vh-4rem)] overflow-hidden">
        {/* Animated background with gradient and patterns */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-background to-purple-900/20 z-0">
          {/* Grid pattern overlay */}
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMyMDIwMjAiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDM0djZoNnYtNmgtNnptMC0zMHY2aDZ2LTZoLTZ6TTYgNHY2aDZ2LTZINnptMCAzMHY2aDZ2LTZINnoiLz48L2c+PC9nPjwvc3ZnPg==')]"></div>
        </div>

        {/* Floating math symbols */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="math-symbols">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="symbol"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 5}s`,
                  animationDuration: `${15 + Math.random() * 15}s`,
                  opacity: 0.1 + Math.random() * 0.2,
                  fontSize: `${1 + Math.random() * 2}rem`,
                }}
              >
                {
                  ["+", "−", "×", "÷", "=", "π", "∑", "∫", "√", "Δ", "∞", "θ", "λ", "Ω", "φ"][
                    Math.floor(Math.random() * 15)
                  ]
                }
              </div>
            ))}
          </div>
        </div>

        {/* Animated geometric shapes */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="geometric-shapes">
            <div className="shape circle"></div>
            <div className="shape square"></div>
            <div className="shape triangle"></div>
            <div className="shape hexagon"></div>
            <div className="shape circle secondary"></div>
            <div className="shape square secondary"></div>
            <div className="shape triangle secondary"></div>
          </div>
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] py-12">
          <div className="container px-4 md:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className="flex flex-col space-y-6 text-center lg:text-left">
                <div className="space-y-2">
                  <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
                    Discover the <br />
                    <span className="bg-gradient-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent animate-gradient">
                      Beauty of Mathematics
                    </span>
                  </h1>
                  <p className="mx-auto lg:mx-0 max-w-[700px] text-muted-foreground md:text-xl">
                    Explore challenging problems, engage in exciting contests, and join a community of math enthusiasts.
                  </p>
                </div>
                <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                  <Link href="/signup">
                    <Button size="lg" className="group relative overflow-hidden">
                      <span className="relative z-10">Get Started</span>
                      <span className="absolute inset-0 bg-gradient-to-r from-primary to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1 relative z-10" />
                    </Button>
                  </Link>
                  <Link href="/problems">
                    <Button variant="outline" size="lg" className="group border-primary/20 hover:border-primary">
                      Explore Problems
                      <ArrowRight className="ml-2 h-4 w-4 opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
                    </Button>
                  </Link>
                </div>

                {/* Featured equation */}
                <div className="hidden md:flex justify-center lg:justify-start mt-8 animate-fade-in">
                  <div className="py-3 px-6 bg-card/80 backdrop-blur-sm rounded-lg border border-primary/10 shadow-lg">
                    <p className="text-xl md:text-2xl font-mono">
                      e<sup>iπ</sup> + 1 = 0
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Euler's Identity - "The most beautiful equation in mathematics"
                    </p>
                  </div>
                </div>
              </div>

              {/* 3D Math visualization */}
              <div className="hidden lg:flex justify-center items-center">
                <div className="relative w-[400px] h-[400px]">
                  {/* Animated circular graph */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-[300px] h-[300px] rounded-full border-4 border-primary/20 animate-pulse"></div>
                    <div className="absolute w-[250px] h-[250px] rounded-full border-2 border-dashed border-primary/30 animate-spin-slow"></div>
                    <div className="absolute w-[200px] h-[200px] rounded-full border border-primary/40 animate-reverse-spin"></div>
                  </div>

                  {/* Coordinate system */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative w-[250px] h-[250px]">
                      {/* X axis */}
                      <div className="absolute top-1/2 left-0 w-full h-[1px] bg-primary/30"></div>
                      {/* Y axis */}
                      <div className="absolute top-0 left-1/2 w-[1px] h-full bg-primary/30"></div>

                      {/* Function curve */}
                      <svg className="absolute inset-0" viewBox="0 0 250 250">
                        <path
                          d="M25,125 C75,50 125,200 225,125"
                          fill="none"
                          stroke="currentColor"
                          className="text-primary animate-draw-path"
                          strokeWidth="2"
                          strokeDasharray="400"
                          strokeDashoffset="400"
                        />
                      </svg>

                      {/* Points on curve */}
                      <div className="absolute top-[50px] left-[75px] w-3 h-3 rounded-full bg-primary animate-ping-slow"></div>
                      <div
                        className="absolute top-[200px] left-[125px] w-3 h-3 rounded-full bg-primary animate-ping-slow"
                        style={{ animationDelay: "1s" }}
                      ></div>
                      <div
                        className="absolute top-[125px] left-[225px] w-3 h-3 rounded-full bg-primary animate-ping-slow"
                        style={{ animationDelay: "2s" }}
                      ></div>
                    </div>
                  </div>

                  {/* Floating math elements */}
                  <div className="absolute top-[50px] right-[40px] py-2 px-4 bg-card/80 backdrop-blur-sm rounded-lg border border-primary/10 shadow-lg animate-float">
                    <p className="text-sm font-mono">f(x) = sin(x)</p>
                  </div>
                  <div
                    className="absolute bottom-[70px] left-[30px] py-2 px-4 bg-card/80 backdrop-blur-sm rounded-lg border border-primary/10 shadow-lg animate-float"
                    style={{ animationDelay: "1s" }}
                  >
                    <p className="text-sm font-mono">∫ f(x) dx</p>
                  </div>
                  <div
                    className="absolute top-[180px] right-[80px] py-2 px-4 bg-card/80 backdrop-blur-sm rounded-lg border border-primary/10 shadow-lg animate-float"
                    style={{ animationDelay: "2s" }}
                  >
                    <p className="text-sm font-mono">Σ(n=1 to ∞)</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats counter */}
            <div className="mt-12 lg:mt-20 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
              <div className="bg-card/50 backdrop-blur-sm p-4 rounded-lg border border-primary/10 text-center">
                <p className="text-3xl md:text-4xl font-bold text-primary">500+</p>
                <p className="text-sm text-muted-foreground">Math Problems</p>
              </div>
              <div className="bg-card/50 backdrop-blur-sm p-4 rounded-lg border border-primary/10 text-center">
                <p className="text-3xl md:text-4xl font-bold text-primary">10K+</p>
                <p className="text-sm text-muted-foreground">Active Users</p>
              </div>
              <div className="bg-card/50 backdrop-blur-sm p-4 rounded-lg border border-primary/10 text-center">
                <p className="text-3xl md:text-4xl font-bold text-primary">200+</p>
                <p className="text-sm text-muted-foreground">Articles</p>
              </div>
              <div className="bg-card/50 backdrop-blur-sm p-4 rounded-lg border border-primary/10 text-center">
                <p className="text-3xl md:text-4xl font-bold text-primary">50+</p>
                <p className="text-sm text-muted-foreground">Contests</p>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center animate-bounce">
          <p className="text-sm text-muted-foreground mb-2">Scroll to explore</p>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M12 5V19M12 19L5 12M12 19L19 12"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
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

      {/* Rest of the sections remain unchanged */}
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
            <h2 className="text-3xl font-bold tracking-tight">How mathXploter Helps You</h2>
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

