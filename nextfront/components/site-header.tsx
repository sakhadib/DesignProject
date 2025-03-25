// "use client"

// import Link from "next/link"
// import { usePathname } from "next/navigation"
// import { BookOpen, Home, LogIn, Medal, PenTool, Trophy, UserPlus, Info } from "lucide-react"

// import { cn } from "@/lib/utils"
// import { Button } from "@/components/ui/button"
// import { ThemeToggle } from "@/components/theme-toggle"

// const navItems = [
//   { name: "Home", href: "/", icon: Home },
//   { name: "Problems", href: "/problems", icon: PenTool },
//   { name: "Contests", href: "/contests", icon: Trophy },
//   { name: "Leaderboard", href: "/leaderboard", icon: Medal },
//   { name: "Blog", href: "/blog", icon: BookOpen },
//   { name: "About", href: "/about", icon: Info },
// ]

// export function SiteHeader() {
//   const pathname = usePathname()

//   return (
//     <header className="top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
//       <div className="container flex h-16 items-center">
//         <div className="mr-4 flex">
//           <Link href="/" className="flex items-center space-x-2">
//             <span className="text-2xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
//               mathXplorer
//             </span>
//           </Link>
//         </div>
//         <nav className="flex-1">
//           <ul className="flex space-x-4">
//             {navItems.map((item) => {
//               const Icon = item.icon
//               return (
//                 <li key={item.name}>
//                   <Link
//                     href={item.href}
//                     className={cn(
//                       "flex items-center px-3 py-2 text-sm font-medium rounded-md transition-all duration-200 hover:bg-muted",
//                       pathname === item.href ? "text-primary" : "text-muted-foreground hover:text-foreground",
//                     )}
//                   >
//                     <Icon className="mr-2 h-4 w-4" />
//                     <span>{item.name}</span>
//                   </Link>
//                 </li>
//               )
//             })}
//           </ul>
//         </nav>
//         <div className="flex items-center space-x-4">
//           <ThemeToggle />
//           <Link href="/login">
//             <Button variant="ghost" size="sm" className="gap-1 group">
//               <LogIn className="h-4 w-4 transition-transform group-hover:translate-x-1" />
//               <span>Sign In</span>
//             </Button>
//           </Link>
//           <Link href="/signup">
//             <Button size="sm" className="gap-1 group">
//               <UserPlus className="h-4 w-4 transition-transform group-hover:translate-y-[-2px]" />
//               <span>Sign Up</span>
//             </Button>
//           </Link>
//         </div>
//       </div>
//     </header>
//   )
// }

"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { BookOpen, Home, LogIn, Medal, Menu, PenTool, Trophy, UserPlus, Info, X } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

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
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center">
          <Link href="/" className="flex items-center space-x-2 mr-4">
            <span className="text-2xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
              mathXploter
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex">
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
        </div>

        <div className="flex items-center space-x-4">
          <ThemeToggle />

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-2">
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

          {/* Mobile Menu Button */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[80%] sm:w-[350px] pr-0">
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between mb-6">
                  <Link href="/" className="flex items-center space-x-2" onClick={() => setIsOpen(false)}>
                    <span className="text-xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                      mathXploter
                    </span>
                  </Link>
                  <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
                    <X className="h-5 w-5" />
                    <span className="sr-only">Close menu</span>
                  </Button>
                </div>

                <nav className="flex-1">
                  <ul className="flex flex-col space-y-2">
                    {navItems.map((item) => {
                      const Icon = item.icon
                      return (
                        <li key={item.name}>
                          <Link
                            href={item.href}
                            className={cn(
                              "flex items-center px-4 py-3 text-base font-medium rounded-md transition-all duration-200 hover:bg-muted",
                              pathname === item.href
                                ? "text-primary bg-muted/50"
                                : "text-muted-foreground hover:text-foreground",
                            )}
                            onClick={() => setIsOpen(false)}
                          >
                            <Icon className="mr-3 h-5 w-5" />
                            <span>{item.name}</span>
                          </Link>
                        </li>
                      )
                    })}
                  </ul>
                </nav>

                <div className="border-t pt-6 mt-6 space-y-4">
                  <Link href="/login" onClick={() => setIsOpen(false)}>
                    <Button variant="outline" className="w-full justify-start gap-2">
                      <LogIn className="h-4 w-4" />
                      <span>Sign In</span>
                    </Button>
                  </Link>
                  <Link href="/signup" onClick={() => setIsOpen(false)}>
                    <Button className="w-full justify-start gap-2">
                      <UserPlus className="h-4 w-4" />
                      <span>Sign Up</span>
                    </Button>
                  </Link>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}

