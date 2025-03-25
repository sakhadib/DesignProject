"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { BookOpen, Home, LogIn, Medal, PenTool, Trophy, UserPlus, Info } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"

const navItems = [
  { name: "Home", href: "/", icon: Home },
  { name: "Problems", href: "/problems", icon: PenTool },
  { name: "Contests", href: "/contests", icon: Trophy },
  { name: "Leaderboard", href: "/leaderboard", icon: Medal },
  { name: "Blog", href: "/blog", icon: BookOpen },
  { name: "About", href: "/about", icon: Info },
]

export function SiteHeader() {
  const pathname = usePathname()

  return (
    <header className="top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-4 flex">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
              mathXplorer
            </span>
          </Link>
        </div>
        <nav className="flex-1">
          <ul className="flex space-x-4">
            {navItems.map((item) => {
              const Icon = item.icon
              return (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className={cn(
                      "flex items-center px-3 py-2 text-sm font-medium rounded-md transition-all duration-200 hover:bg-muted",
                      pathname === item.href ? "text-primary" : "text-muted-foreground hover:text-foreground",
                    )}
                  >
                    <Icon className="mr-2 h-4 w-4" />
                    <span>{item.name}</span>
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>
        <div className="flex items-center space-x-4">
          <ThemeToggle />
          <Link href="/login">
            <Button variant="ghost" size="sm" className="gap-1 group">
              <LogIn className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              <span>Sign In</span>
            </Button>
          </Link>
          <Link href="/signup">
            <Button size="sm" className="gap-1 group">
              <UserPlus className="h-4 w-4 transition-transform group-hover:translate-y-[-2px]" />
              <span>Sign Up</span>
            </Button>
          </Link>
        </div>
      </div>
    </header>
  )
}

