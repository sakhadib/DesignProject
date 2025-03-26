"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ChevronLeft, Save, X, FileText, Tag } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MarkdownEditor } from "@/components/markdown-editor"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

// Sample categories
const categories = [
  "Number Theory",
  "Complex Analysis",
  "Abstract Algebra",
  "Calculus",
  "Geometry",
  "Probability",
  "Statistics",
  "Linear Algebra",
  "Discrete Mathematics",
  "Topology",
]

export default function WriteBlogPage() {
  const router = useRouter()
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [category, setCategory] = useState("")
  const [isDiscardDialogOpen, setIsDiscardDialogOpen] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  const handleSave = async () => {
    if (!title || !content || !category) {
      alert("Please fill in all fields")
      return
    }

    setIsSaving(true)

    // Simulate saving
    setTimeout(() => {
      setIsSaving(false)
      alert("Blog post saved successfully!")
      router.push("/blog")
    }, 1500)
  }

  const handleDiscard = () => {
    setIsDiscardDialogOpen(false)
    router.push("/blog")
  }

  return (
    <div className="container py-12">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <Dialog open={isDiscardDialogOpen} onOpenChange={setIsDiscardDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <ChevronLeft className="h-5 w-5" />
                <span className="sr-only">Back</span>
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Discard changes?</DialogTitle>
                <DialogDescription>
                  You have unsaved changes that will be lost if you leave this page.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsDiscardDialogOpen(false)}>
                  Continue Editing
                </Button>
                <Button variant="destructive" onClick={handleDiscard}>
                  Discard Changes
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <div>
            <h1 className="text-3xl font-bold">Write a Blog Post</h1>
            <p className="text-muted-foreground">Share your mathematical insights with the community</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" className="gap-2" onClick={() => setIsDiscardDialogOpen(true)}>
            <X className="h-4 w-4" />
            <span className="hidden sm:inline">Discard</span>
          </Button>

          <Button className="gap-2" onClick={handleSave} disabled={isSaving || !title || !content || !category}>
            <Save className="h-4 w-4" />
            <span>{isSaving ? "Saving..." : "Publish"}</span>
          </Button>
        </div>
      </div>

      <div className="grid gap-8 grid-cols-1 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-8">
          <div>
            <Input
              type="text"
              placeholder="Enter your blog title..."
              className="text-2xl font-bold border-0 border-b rounded-none px-0 h-auto py-2 focus-visible:ring-0 focus-visible:ring-offset-0"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <MarkdownEditor
            value={content}
            onChange={setContent}
            placeholder="Start writing your blog post... You can use Markdown and LaTeX math formulas."
            minHeight="500px"
          />
        </div>

        <div className="space-y-6">
          <div className="border rounded-md p-6 space-y-6">
            <div className="space-y-2">
              <h3 className="text-lg font-medium flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Blog Details
              </h3>
              <p className="text-sm text-muted-foreground">
                Add details to help categorize and organize your blog post.
              </p>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger id="category" className="w-full">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <div className="border rounded-md p-6 space-y-4">
            <div className="space-y-2">
              <h3 className="text-lg font-medium flex items-center gap-2">
                <Tag className="h-4 w-4" />
                Formatting Tips
              </h3>
              <p className="text-sm text-muted-foreground">Use Markdown to format your blog post.</p>
            </div>

            <div className="space-y-2 text-sm">
              <p>
                <code># Heading 1</code> - For main headings
              </p>
              <p>
                <code>## Heading 2</code> - For section headings
              </p>
              <p>
                <code>**bold**</code> - For bold text
              </p>
              <p>
                <code>*italic*</code> - For italic text
              </p>
              <p>
                <code>- item</code> - For bullet lists
              </p>
              <p>
                <code>1. item</code> - For numbered lists
              </p>
              <p>
                <code>$$E = mc^2$$</code> - For math formulas
              </p>
              <p>
                <code>`code`</code> - For inline code
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

