"use client"

import { useState } from "react"
import Link from "next/link"
import { Search, Filter, ThumbsUp, ThumbsDown, MessageSquare } from "lucide-react"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Sample blog data
const blogs = [
  {
    id: 1,
    title: "Understanding the Riemann Hypothesis",
    category: "Number Theory",
    excerpt:
      "The Riemann hypothesis is one of the most important unsolved problems in mathematics. It concerns the distribution of prime numbers and has implications for various areas of mathematics...",
    content:
      "# Understanding the Riemann Hypothesis\n\nThe Riemann hypothesis is one of the most important unsolved problems in mathematics. It concerns the distribution of prime numbers and has implications for various areas of mathematics.\n\n## What is the Riemann Zeta Function?\n\nThe Riemann zeta function is defined as:\n\n$$\\zeta(s) = \\sum_{n=1}^{\\infty} \\frac{1}{n^s}$$\n\nFor complex values of $s$ with real part greater than 1, this infinite series converges. The Riemann hypothesis states that all non-trivial zeros of the zeta function have real part equal to $\\frac{1}{2}$.\n\n## Why is it important?\n\nIf proven true, it would provide deep insights into the distribution of prime numbers and solve many related problems in number theory.",
    likes: 42,
    dislikes: 3,
    comments: 15,
    date: "2023-11-15",
  },
  {
    id: 2,
    title: "Exploring Euler's Identity",
    category: "Complex Analysis",
    excerpt:
      "Euler's identity, $e^{i\\pi} + 1 = 0$, is often described as the most beautiful equation in mathematics. This blog explores the components of this equation and why it's so significant...",
    content:
      "# Exploring Euler's Identity\n\nEuler's identity, $e^{i\\pi} + 1 = 0$, is often described as the most beautiful equation in mathematics.\n\n## The Components\n\n- $e$ - The base of natural logarithms\n- $i$ - The imaginary unit\n- $\\pi$ - The ratio of a circle's circumference to its diameter\n- $1$ - The multiplicative identity\n- $0$ - The additive identity\n\n## The Significance\n\nThis equation brings together five fundamental constants of mathematics in a single, elegant statement. It connects algebra, geometry, and analysis in a profound way.\n\n$$e^{i\\theta} = \\cos\\theta + i\\sin\\theta$$\n\nWhen $\\theta = \\pi$, we get $e^{i\\pi} = -1$, which rearranges to Euler's identity.",
    likes: 78,
    dislikes: 2,
    comments: 23,
    date: "2023-12-05",
  },
  {
    id: 3,
    title: "Introduction to Group Theory",
    category: "Abstract Algebra",
    excerpt:
      "Group theory is a fundamental area of abstract algebra that studies algebraic structures known as groups. This blog provides an introduction to the basic concepts and applications...",
    content:
      "# Introduction to Group Theory\n\nGroup theory is a fundamental area of abstract algebra that studies algebraic structures known as groups.\n\n## What is a Group?\n\nA group is a set $G$ together with a binary operation $\\cdot$ that satisfies four axioms:\n\n1. **Closure**: For all $a, b \\in G$, $a \\cdot b \\in G$\n2. **Associativity**: For all $a, b, c \\in G$, $(a \\cdot b) \\cdot c = a \\cdot (b \\cdot c)$\n3. **Identity**: There exists an element $e \\in G$ such that for all $a \\in G$, $e \\cdot a = a \\cdot e = a$\n4. **Inverse**: For each $a \\in G$, there exists an element $a^{-1} \\in G$ such that $a \\cdot a^{-1} = a^{-1} \\cdot a = e$\n\n## Applications\n\nGroup theory has applications in physics, chemistry, cryptography, and many other fields.",
    likes: 35,
    dislikes: 5,
    comments: 12,
    date: "2024-01-20",
  },
  {
    id: 4,
    title: "The Beauty of Fibonacci Sequences",
    category: "Number Theory",
    excerpt:
      "The Fibonacci sequence appears in nature and has fascinating mathematical properties. This blog explores the sequence, the golden ratio, and their connections to various mathematical concepts...",
    content:
      "# The Beauty of Fibonacci Sequences\n\nThe Fibonacci sequence is defined by the recurrence relation:\n\n$$F_n = F_{n-1} + F_{n-2}$$\n\nWith initial conditions $F_0 = 0$ and $F_1 = 1$.\n\n## The Golden Ratio\n\nAs $n$ increases, the ratio of consecutive Fibonacci numbers $\\frac{F_{n+1}}{F_n}$ approaches the golden ratio $\\phi$:\n\n$$\\phi = \\frac{1 + \\sqrt{5}}{2} \\approx 1.618033988749895$$\n\n## Fibonacci in Nature\n\nThe Fibonacci sequence appears in various natural phenomena, from the arrangement of leaves on a stem to the pattern of florets in a flower head.",
    likes: 62,
    dislikes: 1,
    comments: 18,
    date: "2024-02-10",
  },
  {
    id: 5,
    title: "Calculus of Variations",
    category: "Calculus",
    excerpt:
      "The calculus of variations is concerned with finding functions that optimize certain quantities. This blog introduces key concepts like the Euler-Lagrange equation and discusses applications...",
    content:
      "# Calculus of Variations\n\nThe calculus of variations is concerned with finding functions that optimize certain quantities.\n\n## The Euler-Lagrange Equation\n\nThe fundamental equation in the calculus of variations is the Euler-Lagrange equation:\n\n$$\\frac{d}{dx}\\left(\\frac{\\partial L}{\\partial y'}\\right) - \\frac{\\partial L}{\\partial y} = 0$$\n\nWhere $L(x, y, y')$ is the Lagrangian function.\n\n## Applications\n\nThe calculus of variations has applications in physics (e.g., the principle of least action), engineering, economics, and other fields.",
    likes: 29,
    dislikes: 4,
    comments: 9,
    date: "2024-03-05",
  },
]

// Extract unique categories
const categories = Array.from(new Set(blogs.map((blog) => blog.category)))

export default function BlogPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [activeCategory, setActiveCategory] = useState("All")

  // Filter blogs based on search term and active category
  const filteredBlogs = blogs.filter((blog) => {
    const matchesSearch = blog.title.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = activeCategory === "All" || blog.category === activeCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="container py-12">
      <div className="flex flex-col space-y-4 md:flex-row md:justify-between md:space-y-0 mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Mathematical Blog</h1>
          <p className="text-muted-foreground">Explore mathematical concepts, theorems, and insights</p>
        </div>
        <div className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search blogs..."
              className="pl-8 w-full sm:w-[250px]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button variant="outline" size="icon" className="hidden sm:flex">
            <Filter className="h-4 w-4" />
            <span className="sr-only">Filter</span>
          </Button>
        </div>
      </div>

      <Tabs defaultValue="All" className="mb-8">
        <TabsList className="mb-4 flex flex-wrap h-auto">
          <TabsTrigger value="All" onClick={() => setActiveCategory("All")}>
            All
          </TabsTrigger>
          {categories.map((category) => (
            <TabsTrigger key={category} value={category} onClick={() => setActiveCategory(category)}>
              {category}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="All" className="mt-0">
          <div className="grid gap-6 sm:grid-cols-1 lg:grid-cols-2">
            {filteredBlogs.map((blog) => (
              <BlogCard key={blog.id} blog={blog} />
            ))}
          </div>
        </TabsContent>

        {categories.map((category) => (
          <TabsContent key={category} value={category} className="mt-0">
            <div className="grid gap-6 sm:grid-cols-1 lg:grid-cols-2">
              {filteredBlogs.map((blog) => (
                <BlogCard key={blog.id} blog={blog} />
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}

interface Blog {
  id: number;
  title: string;
  category: string;
  excerpt: string;
  content: string;
  likes: number;
  dislikes: number;
  comments: number;
  date: string;
}

function BlogCard({ blog }: { blog: Blog }) {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
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
  )
}

