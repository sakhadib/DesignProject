"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import { ChevronLeft, BookOpen, Search, Filter, ThumbsUp, MessageSquare } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Mock blogs data
const allBlogs = [
  {
    id: 45,
    title: "Understanding the Riemann Hypothesis",
    category: "Number Theory",
    likes: 87,
    comments: 23,
    date: "2024-03-18",
    excerpt:
      "The Riemann hypothesis is one of the most important unsolved problems in mathematics. It concerns the distribution of prime numbers and has implications for various areas of mathematics...",
  },
  {
    id: 42,
    title: "Exploring Euler's Identity",
    category: "Complex Analysis",
    likes: 124,
    comments: 35,
    date: "2024-03-05",
    excerpt:
      "Euler's identity, $e^{i\\pi} + 1 = 0$, is often described as the most beautiful equation in mathematics. This blog explores the components of this equation and why it's so significant...",
  },
  {
    id: 38,
    title: "Introduction to Group Theory",
    category: "Abstract Algebra",
    likes: 76,
    comments: 19,
    date: "2024-02-20",
    excerpt:
      "Group theory is a fundamental area of abstract algebra that studies algebraic structures known as groups. This blog provides an introduction to the basic concepts and applications...",
  },
  {
    id: 35,
    title: "The Beauty of Fibonacci Sequences",
    category: "Number Theory",
    likes: 92,
    comments: 27,
    date: "2024-02-10",
    excerpt:
      "The Fibonacci sequence appears in nature and has fascinating mathematical properties. This blog explores the sequence, the golden ratio, and their connections to various mathematical concepts...",
  },
  {
    id: 32,
    title: "Calculus of Variations",
    category: "Calculus",
    likes: 65,
    comments: 18,
    date: "2024-01-25",
    excerpt:
      "The calculus of variations is concerned with finding functions that optimize certain quantities. This blog introduces key concepts like the Euler-Lagrange equation and discusses applications...",
  },
  {
    id: 29,
    title: "The Fundamental Theorem of Algebra",
    category: "Algebra",
    likes: 78,
    comments: 22,
    date: "2024-01-15",
    excerpt:
      "The Fundamental Theorem of Algebra states that every non-constant polynomial with complex coefficients has at least one complex root. This blog explores the proof and implications of this theorem...",
  },
  {
    id: 26,
    title: "Probability Theory Foundations",
    category: "Probability",
    likes: 83,
    comments: 24,
    date: "2024-01-05",
    excerpt:
      "Probability theory provides the mathematical foundation for the study of random phenomena. This blog covers the basic axioms, conditional probability, and random variables...",
  },
  {
    id: 23,
    title: "Linear Algebra Applications",
    category: "Linear Algebra",
    likes: 71,
    comments: 20,
    date: "2023-12-20",
    excerpt:
      "Linear algebra has numerous applications in various fields including computer graphics, machine learning, and quantum mechanics. This blog explores some of these applications...",
  },
]

// Extract unique categories
const allCategories = Array.from(new Set(allBlogs.map((blog) => blog.category)))

export default function UserBlogsPage() {
  const { username } = useParams()
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 800)
    return () => clearTimeout(timer)
  }, [])

  // Filter blogs based on search term and selected category
  const filteredBlogs = allBlogs.filter((blog) => {
    const matchesSearch =
      blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "All" || blog.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  if (isLoading) {
    return (
      <div className="container py-12 flex items-center justify-center min-h-[50vh]">
        <div className="flex flex-col items-center gap-4">
          <div className="h-12 w-12 rounded-full border-4 border-primary border-t-transparent animate-spin" />
          <p className="text-muted-foreground">Loading blogs...</p>
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
          <h1 className="text-3xl font-bold">Published Blogs</h1>
          <p className="text-muted-foreground">Blogs written by {username}</p>
        </div>
      </div>

      <div className="flex flex-col space-y-4 md:flex-row md:justify-between md:items-center md:space-y-0 mb-6">
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search blogs..."
              className="pl-8 w-full md:w-[250px]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-2">
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <div className="flex items-center">
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Category" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All Categories</SelectItem>
              {allCategories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-1 lg:grid-cols-2">
        {filteredBlogs.map((blog) => (
          <Card key={blog.id} className="overflow-hidden transition-all hover:shadow-md">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <Badge variant="secondary" className="mb-2">
                  {blog.category}
                </Badge>
                <span className="text-sm text-muted-foreground">{blog.date}</span>
              </div>
              <Link href={`/blog/${blog.id}`}>
                <CardTitle className="text-xl hover:text-primary transition-colors">{blog.title}</CardTitle>
              </Link>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground line-clamp-3">{blog.excerpt}</p>
            </CardContent>
            <CardFooter className="flex justify-between pt-3 text-sm text-muted-foreground border-t">
              <div className="flex space-x-4">
                <div className="flex items-center">
                  <ThumbsUp className="h-4 w-4 mr-1" />
                  <span>{blog.likes}</span>
                </div>
              </div>
              <div className="flex items-center">
                <MessageSquare className="h-4 w-4 mr-1" />
                <span>{blog.comments} comments</span>
              </div>
            </CardFooter>
          </Card>
        ))}

        {filteredBlogs.length === 0 && (
          <div className="col-span-full text-center py-12 bg-muted/30 rounded-lg">
            <BookOpen className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-xl font-bold mb-2">No Blogs Found</h3>
            <p className="text-muted-foreground max-w-md mx-auto">
              No blogs match your search criteria. Try adjusting your filters or search term.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

