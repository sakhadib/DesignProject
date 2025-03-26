"use client"

import { useState, useRef, useEffect } from "react"
import {
  Bold,
  Italic,
  List,
  ListOrdered,
  Image,
  LinkIcon,
  Code,
  Quote,
  Heading1,
  Heading2,
  Heading3,
  Undo,
  Redo,
  Eye,
  EyeOff,
} from "lucide-react"
import ReactMarkdown from "react-markdown"
import remarkMath from "remark-math"
import rehypeKatex from "rehype-katex"
import "katex/dist/katex.min.css"

import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"

interface MarkdownEditorProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  className?: string
  minHeight?: string
}

export function MarkdownEditor({
  value,
  onChange,
  placeholder = "Start writing...",
  className,
  minHeight = "300px",
}: MarkdownEditorProps) {
  const [isPreview, setIsPreview] = useState(false)
  const [history, setHistory] = useState<string[]>([value])
  const [historyIndex, setHistoryIndex] = useState(0)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  // Update history when value changes from outside
  useEffect(() => {
    if (value !== history[historyIndex]) {
      const newHistory = history.slice(0, historyIndex + 1)
      newHistory.push(value)
      setHistory(newHistory)
      setHistoryIndex(newHistory.length - 1)
    }
  }, [value])

  const updateValue = (newValue: string) => {
    onChange(newValue)

    // Add to history if different from current
    if (newValue !== history[historyIndex]) {
      const newHistory = history.slice(0, historyIndex + 1)
      newHistory.push(newValue)
      setHistory(newHistory)
      setHistoryIndex(newHistory.length - 1)
    }
  }

  const handleToolbarAction = (action: string) => {
    if (!textareaRef.current) return

    const textarea = textareaRef.current
    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const selectedText = value.substring(start, end)

    let newText = value
    let newCursorPos = end

    switch (action) {
      case "bold":
        newText = value.substring(0, start) + `**${selectedText}**` + value.substring(end)
        newCursorPos = selectedText ? end + 4 : start + 2
        break
      case "italic":
        newText = value.substring(0, start) + `*${selectedText}*` + value.substring(end)
        newCursorPos = selectedText ? end + 2 : start + 1
        break
      case "h1":
        newText = value.substring(0, start) + `# ${selectedText}` + value.substring(end)
        newCursorPos = selectedText ? end + 2 : start + 2
        break
      case "h2":
        newText = value.substring(0, start) + `## ${selectedText}` + value.substring(end)
        newCursorPos = selectedText ? end + 3 : start + 3
        break
      case "h3":
        newText = value.substring(0, start) + `### ${selectedText}` + value.substring(end)
        newCursorPos = selectedText ? end + 4 : start + 4
        break
      case "ul":
        newText = value.substring(0, start) + `- ${selectedText}` + value.substring(end)
        newCursorPos = selectedText ? end + 2 : start + 2
        break
      case "ol":
        newText = value.substring(0, start) + `1. ${selectedText}` + value.substring(end)
        newCursorPos = selectedText ? end + 3 : start + 3
        break
      case "link":
        newText = value.substring(0, start) + `[${selectedText || "Link text"}](url)` + value.substring(end)
        newCursorPos = selectedText ? end + 6 : start + 11
        break
      case "image":
        newText = value.substring(0, start) + `![${selectedText || "Alt text"}](url)` + value.substring(end)
        newCursorPos = selectedText ? end + 7 : start + 12
        break
      case "code":
        newText = value.substring(0, start) + `\`${selectedText}\`` + value.substring(end)
        newCursorPos = selectedText ? end + 2 : start + 1
        break
      case "codeblock":
        newText = value.substring(0, start) + `\`\`\`\n${selectedText}\n\`\`\`` + value.substring(end)
        newCursorPos = selectedText ? end + 6 : start + 4
        break
      case "quote":
        newText = value.substring(0, start) + `> ${selectedText}` + value.substring(end)
        newCursorPos = selectedText ? end + 2 : start + 2
        break
      case "math":
        newText = value.substring(0, start) + `$$${selectedText}$$` + value.substring(end)
        newCursorPos = selectedText ? end + 4 : start + 2
        break
    }

    updateValue(newText)

    // Set cursor position after update
    setTimeout(() => {
      if (textareaRef.current) {
        textareaRef.current.focus()
        textareaRef.current.setSelectionRange(newCursorPos, newCursorPos)
      }
    }, 0)
  }

  const handleUndo = () => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1)
      onChange(history[historyIndex - 1])
    }
  }

  const handleRedo = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1)
      onChange(history[historyIndex + 1])
    }
  }

  return (
    <div className={cn("border rounded-md", className)}>
      <div className="flex items-center gap-1 p-2 border-b bg-muted/50 overflow-x-auto">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleToolbarAction("bold")}>
                <Bold className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Bold</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleToolbarAction("italic")}>
                <Italic className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Italic</TooltipContent>
          </Tooltip>

          <div className="h-6 w-px bg-border mx-1" />

          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleToolbarAction("h1")}>
                <Heading1 className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Heading 1</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleToolbarAction("h2")}>
                <Heading2 className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Heading 2</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleToolbarAction("h3")}>
                <Heading3 className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Heading 3</TooltipContent>
          </Tooltip>

          <div className="h-6 w-px bg-border mx-1" />

          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleToolbarAction("ul")}>
                <List className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Bullet List</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleToolbarAction("ol")}>
                <ListOrdered className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Numbered List</TooltipContent>
          </Tooltip>

          <div className="h-6 w-px bg-border mx-1" />

          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleToolbarAction("link")}>
                <LinkIcon className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Link</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleToolbarAction("image")}>
                <Image className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Image</TooltipContent>
          </Tooltip>

          <div className="h-6 w-px bg-border mx-1" />

          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleToolbarAction("code")}>
                <Code className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Inline Code</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleToolbarAction("codeblock")}>
                <div className="flex items-center justify-center text-xs font-mono">{"{ }"}</div>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Code Block</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleToolbarAction("quote")}>
                <Quote className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Quote</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleToolbarAction("math")}>
                <div className="flex items-center justify-center text-xs font-serif italic">∑</div>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Math Formula</TooltipContent>
          </Tooltip>

          <div className="h-6 w-px bg-border mx-1" />

          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={handleUndo} disabled={historyIndex <= 0}>
                <Undo className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Undo</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={handleRedo}
                disabled={historyIndex >= history.length - 1}
              >
                <Redo className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Redo</TooltipContent>
          </Tooltip>

          <div className="flex-1" />

          <Button variant="ghost" size="sm" className="gap-2" onClick={() => setIsPreview(!isPreview)}>
            {isPreview ? (
              <>
                <EyeOff className="h-4 w-4" />
                <span className="hidden sm:inline">Edit</span>
              </>
            ) : (
              <>
                <Eye className="h-4 w-4" />
                <span className="hidden sm:inline">Preview</span>
              </>
            )}
          </Button>
        </TooltipProvider>
      </div>

      <div className="relative" style={{ minHeight }}>
        {!isPreview ? (
          <textarea
            ref={textareaRef}
            value={value}
            onChange={(e) => updateValue(e.target.value)}
            placeholder={placeholder}
            className="w-full h-full min-h-[inherit] p-4 resize-none focus:outline-none font-mono text-sm"
            style={{ minHeight }}
          />
        ) : (
          <div
            className="p-4 prose prose-purple dark:prose-invert max-w-none h-full overflow-auto"
            style={{ minHeight }}
          >
            {value ? (
              <ReactMarkdown remarkPlugins={[remarkMath]} rehypePlugins={[rehypeKatex]}>
                {value}
              </ReactMarkdown>
            ) : (
              <p className="text-muted-foreground">{placeholder}</p>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

