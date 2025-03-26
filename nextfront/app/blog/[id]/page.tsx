"use client"

import type React from "react"

import { useEffect, useState, useRef } from "react"
import axios from "axios"
import { useParams } from "next/navigation"
import Link from "next/link"
import { ChevronLeft, ThumbsUp, ThumbsDown, Share2, Bookmark, Hash, List, ChevronRight } from "lucide-react"
import ReactMarkdown from "react-markdown"
import remarkMath from "remark-math"
import rehypeKatex from "rehype-katex"
import "katex/dist/katex.min.css"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface Blog {
  id: number
  title: string
  content: string
  category: string
  created_at: string
  up_votes_count: number
  down_votes_count: number
  user: { username: string }
  comments: {
    id: number
    content: string
    created_at: string
    user: { username: string }
  }[]
}

interface TOCItem {
  id: string
  text: string
  level: number
}

export default function BlogPostPage() {
  const { id } = useParams()
  const [blog, setBlog] = useState<Blog | null>(null)
  const [liked, setLiked] = useState(false)
  const [disliked, setDisliked] = useState(false)
  const [bookmarked, setBookmarked] = useState(false)
  const [comment, setComment] = useState("")
  const [tocItems, setTocItems] = useState<TOCItem[]>([])
  const [activeId, setActiveId] = useState<string>("")
  const [isTocVisible, setIsTocVisible] = useState(true)
  const contentRef = useRef<HTMLDivElement>(null)
  const headingRefs = useRef<{ [key: string]: IntersectionObserverEntry }>({})

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await axios.get(`http://127.0.0.1:8000/api/blog/single/${id}`)
        setBlog(res.data.blog)
      } catch (error) {
        console.error("Error fetching blog:", error)
      }
    }

    if (id) fetchBlog()
  }, [id])

  // Extract headings from content after blog is loaded
  useEffect(() => {
    if (!blog || !contentRef.current) return

    // Parse the markdown content to find headings
    const container = contentRef.current
    const headings = Array.from(container.querySelectorAll("h2, h3"))

    const items: TOCItem[] = headings.map((heading) => {
      // Create an ID if it doesn't exist
      if (!heading.id) {
        heading.id =
          heading.textContent?.toLowerCase().replace(/\s+/g, "-") ||
          `heading-${Math.random().toString(36).substr(2, 9)}`
      }

      return {
        id: heading.id,
        text: heading.textContent || "",
        level: heading.tagName === "H2" ? 2 : 3,
      }
    })

    setTocItems(items)
  }, [blog])

  // Set up intersection observer for headings
  useEffect(() => {
    if (!tocItems.length || !contentRef.current) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          headingRefs.current[entry.target.id] = entry
        })

        // Find the first heading that's in view
        const visibleHeadings = Object.values(headingRefs.current)
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => {
            const aRect = a.boundingClientRect
            const bRect = b.boundingClientRect
            return aRect.top - bRect.top
          })

        if (visibleHeadings.length > 0) {
          setActiveId(visibleHeadings[0].target.id)
        }
      },
      {
        rootMargin: "0px 0px -80% 0px",
        threshold: 0.1,
      },
    )

    // Observe all headings
    const container = contentRef.current
    const headings = Array.from(container.querySelectorAll("h2, h3"))
    headings.forEach((heading) => observer.observe(heading))

    return () => {
      headings.forEach((heading) => observer.unobserve(heading))
    }
  }, [tocItems])

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  const handleLike = () => {
    if (disliked) setDisliked(false)
    setLiked(!liked)
  }

  const handleDislike = () => {
    if (liked) setLiked(false)
    setDisliked(!disliked)
  }

  const handleBookmark = () => setBookmarked(!bookmarked)

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setComment("")
    alert("Comment submitted! (This is just a demo)")
  }

  if (!blog) {
    return (
      <div className="container py-12 text-center">
        <p>Loading...</p>
      </div>
    )
  }

  return (
    <div className="container py-12">
      <Link href="/blog" className="flex items-center text-sm text-muted-foreground hover:text-primary mb-4">
        <ChevronLeft className="h-4 w-4 mr-1" />
        Back to all blogs
      </Link>

      <div className="flex flex-col md:flex-row gap-8 relative">
        {/* Mobile TOC toggle */}
        <div className="md:hidden mb-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsTocVisible(!isTocVisible)}
            className="flex items-center gap-2"
          >
            <List className="h-4 w-4" />
            {isTocVisible ? "Hide" : "Show"} Table of Contents
          </Button>
        </div>

        {/* Table of Contents */}
      
        <div
          className={cn(
            "transition-all duration-300 ease-in-out",
            "md:w-64 md:block md:sticky md:top-[10vh] md:self-start md:max-h-[calc(100vh-2rem)] md:overflow-y-auto",
            isTocVisible ? "block" : "hidden",
          )}
        >
          <div className="bg-card rounded-lg p-4 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold flex items-center gap-2">
          <List className="h-4 w-4" />
          Table of Contents
              </h3>
              <Button variant="ghost" size="icon" className="h-6 w-6 md:hidden" onClick={() => setIsTocVisible(false)}>
          <ChevronLeft className="h-4 w-4" />
              </Button>
            </div>
            <nav className="space-y-1">
              {tocItems.map((item) => (
          <button
            key={item.id}
            onClick={() => scrollToHeading(item.id)}
            className={cn(
              "text-sm py-1 px-2 w-full text-left rounded-md flex items-center transition-all duration-200",
              "hover:bg-muted",
              item.level === 3 && "pl-6",
              activeId === item.id ? "text-primary font-medium bg-primary/10" : "text-muted-foreground",
            )}
          >
            {item.level === 2 ? (
              <Hash className="h-3 w-3 mr-2 flex-shrink-0" />
            ) : (
              <ChevronRight className="h-3 w-3 mr-2 flex-shrink-0" />
            )}
            <span className="truncate">{item.text}</span>
          </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 max-w-3xl">
          <Badge variant="secondary" className="mb-4">
            {blog.category}
          </Badge>
          <div className="blog-title">
            <h1 className="text-3xl font-bold mb-4">{blog.title}</h1>
          </div>

          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="font-medium">{blog.user.username}</p>
              <p className="text-sm text-muted-foreground">Author</p>
            </div>
            <p className="text-sm text-muted-foreground">{new Date(blog.created_at).toDateString()}</p>
          </div>

          <div ref={contentRef} className="blog-content prose prose-purple dark:prose-invert max-w-none [&_.katex-display]:!flex [&_.katex-display]:!justify-center">
            <ReactMarkdown remarkPlugins={[remarkMath]} rehypePlugins={[rehypeKatex]}>
              {blog.content}
            </ReactMarkdown>
          </div>
          {/* <div ref={contentRef} className="blog-content prose prose-purple dark:prose-invert max-w-none">
            <ReactMarkdown remarkPlugins={[remarkMath]} rehypePlugins={[rehypeKatex]}>
              {blog.content}
            </ReactMarkdown>
          </div> */}

          <div className="flex items-center justify-between py-4 border-t border-b mt-6">
            <div className="flex space-x-4">
              <Button variant="ghost" size="sm" className={`gap-1 ${liked ? "text-primary" : ""}`} onClick={handleLike}>
                <ThumbsUp className="h-4 w-4" />
                <span>{blog.up_votes_count + (liked ? 1 : 0)}</span>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className={`gap-1 ${disliked ? "text-primary" : ""}`}
                onClick={handleDislike}
              >
                <ThumbsDown className="h-4 w-4" />
                <span>{blog.down_votes_count + (disliked ? 1 : 0)}</span>
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
            <h2 className="text-xl font-bold mb-4">Comments ({blog.comments.length})</h2>

            <form onSubmit={handleCommentSubmit} className="space-y-4 mb-6">
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

            <div className="space-y-4">
              {blog.comments.map((c) => (
                <Card key={c.id}>
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <Avatar>
                        <AvatarFallback>{c.user.username.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <div>
                            <p className="font-medium">{c.user.username}</p>
                            <p className="text-xs text-muted-foreground">{new Date(c.created_at).toDateString()}</p>
                          </div>
                        </div>
                        <ReactMarkdown remarkPlugins={[remarkMath]} rehypePlugins={[rehypeKatex]}>
                          {c.content}
                        </ReactMarkdown>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

