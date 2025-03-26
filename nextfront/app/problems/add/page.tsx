"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ChevronLeft, Save, X, FileText, Tag, Plus } from "lucide-react"

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
import { Badge } from "@/components/ui/badge"

// Sample tags
const availableTags = [
  "Number Theory",
  "Algebra",
  "Calculus",
  "Geometry",
  "Probability",
  "Statistics",
  "Linear Algebra",
  "Discrete Mathematics",
  "Topology",
  "Combinatorics",
  "Graph Theory",
  "Logic",
  "Set Theory",
  "Algorithms",
  "Optimization",
]

export default function AddProblemPage() {
  const router = useRouter()
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [tags, setTags] = useState<string[]>([])
  const [answer, setAnswer] = useState("")
  const [solution, setSolution] = useState("")
  const [target, setTarget] = useState("")
  const [newTag, setNewTag] = useState("")
  const [isDiscardDialogOpen, setIsDiscardDialogOpen] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  const handleSave = async () => {
    if (!title || !description || tags.length === 0 || !answer || !solution || !target) {
      alert("Please fill in all required fields")
      return
    }

    setIsSaving(true)

    // Simulate saving
    setTimeout(() => {
      setIsSaving(false)
      alert("Problem saved successfully!")
      router.push("/problems")
    }, 1500)
  }

  const handleDiscard = () => {
    setIsDiscardDialogOpen(false)
    router.push("/problems")
  }

  const addTag = () => {
    if (newTag && !tags.includes(newTag)) {
      setTags([...tags, newTag])
      setNewTag("")
    }
  }

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove))
  }

  const handleSelectTag = (tag: string) => {
    if (!tags.includes(tag)) {
      setTags([...tags, tag])
    }
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
            <h1 className="text-3xl font-bold">Add a Problem</h1>
            <p className="text-muted-foreground">Create a new mathematical problem for the community</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" className="gap-2" onClick={() => setIsDiscardDialogOpen(true)}>
            <X className="h-4 w-4" />
            <span className="hidden sm:inline">Discard</span>
          </Button>

          <Button
            className="gap-2"
            onClick={handleSave}
            disabled={isSaving || !title || !description || tags.length === 0 || !answer || !solution || !target}
          >
            <Save className="h-4 w-4" />
            <span>{isSaving ? "Saving..." : "Submit Problem"}</span>
          </Button>
        </div>
      </div>

      <div className="grid gap-8 grid-cols-1 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-8">
          <div>
            <Input
              type="text"
              placeholder="Enter problem title..."
              className="text-2xl font-bold border-0 border-b rounded-none px-0 h-auto py-2 focus-visible:ring-0 focus-visible:ring-offset-0"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label>Problem Description</Label>
            <MarkdownEditor
              value={description}
              onChange={setDescription}
              placeholder="Describe your problem... You can use Markdown and LaTeX math formulas."
              minHeight="300px"
            />
          </div>

          <div className="space-y-2">
            <Label>Answer</Label>
            <MarkdownEditor
              value={answer}
              onChange={setAnswer}
              placeholder="Provide the answer to your problem..."
              minHeight="150px"
            />
          </div>

          <div className="space-y-2">
            <Label>Detailed Solution and Rubrics</Label>
            <MarkdownEditor
              value={solution}
              onChange={setSolution}
              placeholder="Provide a detailed solution and grading rubrics..."
              minHeight="300px"
            />
          </div>
        </div>

        <div className="space-y-6">
          <div className="border rounded-md p-6 space-y-6">
            <div className="space-y-2">
              <h3 className="text-lg font-medium flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Problem Details
              </h3>
              <p className="text-sm text-muted-foreground">Add details to help categorize and organize your problem.</p>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="target">Target Level</Label>
                <Select value={target} onValueChange={setTarget}>
                  <SelectTrigger id="target" className="w-full">
                    <SelectValue placeholder="Select a target level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="v0">v0 - Beginner</SelectItem>
                    <SelectItem value="v1">v1 - Easy</SelectItem>
                    <SelectItem value="v2">v2 - Medium</SelectItem>
                    <SelectItem value="v3">v3 - Hard</SelectItem>
                    <SelectItem value="v4">v4 - Very Hard</SelectItem>
                    <SelectItem value="v5">v5 - Expert</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Tags</Label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {tags.map((tag) => (
                    <Badge key={tag} className="flex items-center gap-1 py-1">
                      {tag}
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-4 w-4 ml-1 hover:bg-transparent"
                        onClick={() => removeTag(tag)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </Badge>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Input
                    placeholder="Add a tag..."
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault()
                        addTag()
                      }
                    }}
                  />
                  <Button variant="outline" size="icon" onClick={addTag}>
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Suggested Tags</Label>
                <div className="flex flex-wrap gap-2">
                  {availableTags
                    .filter((tag) => !tags.includes(tag))
                    .slice(0, 8)
                    .map((tag) => (
                      <Badge
                        key={tag}
                        variant="outline"
                        className="cursor-pointer hover:bg-primary/10"
                        onClick={() => handleSelectTag(tag)}
                      >
                        {tag}
                      </Badge>
                    ))}
                </div>
              </div>
            </div>
          </div>

          <div className="border rounded-md p-6 space-y-4">
            <div className="space-y-2">
              <h3 className="text-lg font-medium flex items-center gap-2">
                <Tag className="h-4 w-4" />
                Formatting Tips
              </h3>
              <p className="text-sm text-muted-foreground">Use Markdown to format your problem description.</p>
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

