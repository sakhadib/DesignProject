"use client"

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface CategoryFilterProps {
  categories: string[]
  activeCategory: string
  onCategoryChange: (category: string) => void
}

export function CategoryFilter({ categories, activeCategory, onCategoryChange }: CategoryFilterProps) {
  return (
    <Tabs value={activeCategory} className="w-full">
      <TabsList className="mb-4 flex flex-wrap h-auto">
        <TabsTrigger value="All" onClick={() => onCategoryChange("All")}>
          All
        </TabsTrigger>
        {categories.map((category) => (
          <TabsTrigger key={category} value={category} onClick={() => onCategoryChange(category)}>
            {category}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  )
}

