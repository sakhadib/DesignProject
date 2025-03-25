"use client"

import type React from "react"

import { useState } from "react"
import { Search } from "lucide-react"

import { Input } from "@/components/ui/input"

interface BlogSearchProps {
  onSearch: (term: string) => void
}

export function BlogSearch({ onSearch }: BlogSearchProps) {
  const [searchTerm, setSearchTerm] = useState("")

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearchTerm(value)
    onSearch(value)
  }

  return (
    <div className="relative">
      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input
        type="search"
        placeholder="Search blogs..."
        className="pl-8 w-full sm:w-[250px]"
        value={searchTerm}
        onChange={handleSearch}
      />
    </div>
  )
}

