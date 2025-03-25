"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { ChevronLeft, ThumbsUp, ThumbsDown, Share2, Bookmark } from "lucide-react"
import ReactMarkdown from "react-markdown"
import remarkMath from "remark-math"
import rehypeKatex from "rehype-katex"
import "katex/dist/katex.min.css"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"

// Sample blog data (same as in blog/page.tsx)
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
    author: {
      name: "Dr. Julia Chen",
      avatar: "/placeholder.svg?height=40&width=40",
      role: "Professor of Mathematics",
    },
    commentsList: [
      {
        id: 1,
        author: "Alex Johnson",
        avatar: "/placeholder.svg?height=40&width=40",
        content:
          "This is a fantastic explanation of the Riemann Hypothesis! I've always struggled to understand its significance.",
        date: "2023-11-16",
        likes: 8,
      },
      {
        id: 2,
        author: "Maria Garcia",
        avatar: "/placeholder.svg?height=40&width=40",
        content:
          "I'm curious about the computational approaches to verifying the hypothesis. Has there been any recent progress in that area?",
        date: "2023-11-17",
        likes: 5,
      },
    ],
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
    author: {
      name: "Prof. Michael Wong",
      avatar: "/placeholder.svg?height=40&width=40",
      role: "Complex Analysis Researcher",
    },
    commentsList: [
      {
        id: 1,
        author: "Sarah Miller",
        avatar: "/placeholder.svg?height=40&width=40",
        content: "Euler's identity never ceases to amaze me. It's like a mathematical haiku!",
        date: "2023-12-06",
        likes: 12,
      },
      {
        id: 2,
        author: "David Kim",
        avatar: "/placeholder.svg?height=40&width=40",
        content: "I'd love to see a follow-up post on other beautiful equations in mathematics.",
        date: "2023-12-07",
        likes: 9,
      },
    ],
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
    author: {
      name: "Dr. Robert Lee",
      avatar: "/placeholder.svg?height=40&width=40",
      role: "Algebraist",
    },
    commentsList: [
      {
        id: 1,
        author: "Emily Chen",
        avatar: "/placeholder.svg?height=40&width=40",
        content: "This is a great introduction! Could you elaborate more on Lie groups in a future post?",
        date: "2024-01-21",
        likes: 6,
      },
      {
        id: 2,
        author: "James Wilson",
        avatar: "/placeholder.svg?height=40&width=40",
        content: "I'm studying abstract algebra right now, and this helped clarify some concepts for me. Thanks!",
        date: "2024-01-22",
        likes: 4,
      },
    ],
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
    author: {
      name: "Dr. Lisa Patel",
      avatar: "/placeholder.svg?height=40&width=40",
      role: "Mathematical Biologist",
    },
    commentsList: [
      {
        id: 1,
        author: "Thomas Brown",
        avatar: "/placeholder.svg?height=40&width=40",
        content: "I've always been fascinated by how the Fibonacci sequence appears in nature. Great article!",
        date: "2024-02-11",
        likes: 10,
      },
      {
        id: 2,
        author: "Sophia Martinez",
        avatar: "/placeholder.svg?height=40&width=40",
        content:
          "The connection to the golden ratio is so elegant. I'd love to see more examples of mathematical patterns in nature.",
        date: "2024-02-12",
        likes: 7,
      },
    ],
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
    author: {
      name: "Prof. Alan Zhang",
      avatar: "/placeholder.svg?height=40&width=40",
      role: "Mathematical Physicist",
    },
    commentsList: [
      {
        id: 1,
        author: "Rachel Kim",
        avatar: "/placeholder.svg?height=40&width=40",
        content:
          "This is a great introduction to the calculus of variations. I'd love to see more on Hamilton's principle.",
        date: "2024-03-06",
        likes: 5,
      },
      {
        id: 2,
        author: "Daniel Johnson",
        avatar: "/placeholder.svg?height=40&width=40",
        content:
          "I'm studying physics, and this helped me understand the mathematical foundations of Lagrangian mechanics better.",
        date: "2024-03-07",
        likes: 3,
      },
    ],
  },
]

export default function BlogPostPage() {
  const { id } = useParams()
  const [blog, setBlog] = useState<{
    id: number;
    title: string;
    category: string;
    excerpt: string;
    content: string;
    likes: number;
    dislikes: number;
    comments: number;
    date: string;
    author: { name: string; avatar: string; role: string };
    commentsList: { id: number; author: string; avatar: string; content: string; date: string; likes: number }[];
  } | null>(null)
  const [liked, setLiked] = useState(false)
  const [disliked, setDisliked] = useState(false)
  const [bookmarked, setBookmarked] = useState(false)
  const [comment, setComment] = useState("")

  useEffect(() => {
    // Find the blog post with the matching ID
    const foundBlog = blogs.find((blog) => blog.id.toString() === id)
    if (foundBlog) {
      setBlog(foundBlog)
    }
  }, [id])

  if (!blog) {
    return (
      <div className="container py-12 text-center">
        <p>Loading...</p>
      </div>
    )
  }

  const handleLike = () => {
    if (disliked) {
      setDisliked(false)
    }
    setLiked(!liked)
  }

  const handleDislike = () => {
    if (liked) {
      setLiked(false)
    }
    setDisliked(!disliked)
  }

  const handleBookmark = () => {
    setBookmarked(!bookmarked)
  }

interface Comment {
    id: number;
    author: string;
    avatar: string;
    content: string;
    date: string;
    likes: number;
}

interface CommentSubmitEvent extends React.FormEvent<HTMLFormElement> {}

const handleCommentSubmit = (e: CommentSubmitEvent) => {
    e.preventDefault();
    // In a real app, you would submit the comment to your backend
    setComment("");
    alert("Comment submitted! (This is just a demo)");
};

  return (
    <div className="container py-12">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <Link href="/blog" className="flex items-center text-sm text-muted-foreground hover:text-primary mb-4">
            <ChevronLeft className="h-4 w-4 mr-1" />
            Back to all blogs
          </Link>

          <Badge variant="secondary" className="mb-4">
            {blog.category}
          </Badge>

          <h1 className="text-3xl font-bold mb-4">{blog.title}</h1>

          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <Avatar className="h-10 w-10 mr-3">
                <AvatarImage src={blog.author.avatar} alt={blog.author.name} />
                <AvatarFallback>{blog.author.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">{blog.author.name}</p>
                <p className="text-sm text-muted-foreground">{blog.author.role}</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">{blog.date}</p>
          </div>

          <div className="prose prose-purple dark:prose-invert max-w-none">
            <ReactMarkdown remarkPlugins={[remarkMath]} rehypePlugins={[rehypeKatex]}>
              {blog.content}
            </ReactMarkdown>
          </div>
        </div>

        <div className="flex items-center justify-between py-4 border-t border-b">
          <div className="flex space-x-4">
            <Button variant="ghost" size="sm" className={`gap-1 ${liked ? "text-primary" : ""}`} onClick={handleLike}>
              <ThumbsUp className="h-4 w-4" />
              <span>{blog.likes + (liked ? 1 : 0)}</span>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className={`gap-1 ${disliked ? "text-primary" : ""}`}
              onClick={handleDislike}
            >
              <ThumbsDown className="h-4 w-4" />
              <span>{blog.dislikes + (disliked ? 1 : 0)}</span>
            </Button>
          </div>
          <div className="flex space-x-2">
            <Button variant="ghost" size="sm" className="gap-1">
              <Share2 className="h-4 w-4" />
              <span className="hidden sm:inline">Share</span>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className={`gap-1 ${bookmarked ? "text-primary" : ""}`}
              onClick={handleBookmark}
            >
              <Bookmark className="h-4 w-4" />
              <span className="hidden sm:inline">Bookmark</span>
            </Button>
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-xl font-bold mb-4">Comments ({blog.commentsList.length})</h2>

          <div className="mb-6">
            <form onSubmit={handleCommentSubmit} className="space-y-4">
              <textarea
                className="w-full min-h-[100px] p-3 rounded-md border border-input bg-background"
                placeholder="Add a comment..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              ></textarea>
              <Button type="submit" disabled={!comment.trim()}>
                Post Comment
              </Button>
            </form>
          </div>

          <div className="space-y-4">
            {blog.commentsList.map((comment) => (
              <Card key={comment.id}>
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <Avatar>
                      <AvatarImage src={comment.avatar} alt={comment.author} />
                      <AvatarFallback>{comment.author.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <p className="font-medium">{comment.author}</p>
                          <p className="text-xs text-muted-foreground">{comment.date}</p>
                        </div>
                        <Button variant="ghost" size="sm" className="gap-1">
                          <ThumbsUp className="h-3 w-3" />
                          <span>{comment.likes}</span>
                        </Button>
                      </div>
                      <p>{comment.content}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

