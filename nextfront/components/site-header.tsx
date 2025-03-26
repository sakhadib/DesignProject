// "use client"

// import { useState } from "react"
// import Link from "next/link"
// import { usePathname } from "next/navigation"
// import { BookOpen, Home, LogIn, Medal, Menu, PenTool, Trophy, UserPlus, Info, X } from "lucide-react"

// import { cn } from "@/lib/utils"
// import { Button } from "@/components/ui/button"
// import { ThemeToggle } from "@/components/theme-toggle"
// import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

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
//   const [isOpen, setIsOpen] = useState(false)

//   return (
//     <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
//       <div className="container flex h-16 items-center justify-between">
//         <div className="flex items-center">
//           <Link href="/" className="flex items-center space-x-2 mr-4">
//             <span className="text-2xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
//               mathXplorer
//             </span>
//           </Link>

//           {/* Desktop Navigation */}
//           <nav className="hidden md:flex">
//             <ul className="flex space-x-4">
//               {navItems.map((item) => {
//                 const Icon = item.icon
//                 return (
//                   <li key={item.name}>
//                     <Link
//                       href={item.href}
//                       className={cn(
//                         "flex items-center px-3 py-2 text-sm font-medium rounded-md transition-all duration-200 hover:bg-muted",
//                         pathname === item.href ? "text-primary" : "text-muted-foreground hover:text-foreground",
//                       )}
//                     >
//                       <Icon className="mr-2 h-4 w-4" />
//                       <span>{item.name}</span>
//                     </Link>
//                   </li>
//                 )
//               })}
//             </ul>
//           </nav>
//         </div>

//         <div className="flex items-center space-x-4">
//           <ThemeToggle />

//           {/* Desktop Auth Buttons */}
//           <div className="hidden md:flex items-center space-x-2">
//             <Link href="/login">
//               <Button variant="ghost" size="sm" className="gap-1 group">
//                 <LogIn className="h-4 w-4 transition-transform group-hover:translate-x-1" />
//                 <span>Sign In</span>
//               </Button>
//             </Link>
//             <Link href="/signup">
//               <Button size="sm" className="gap-1 group">
//                 <UserPlus className="h-4 w-4 transition-transform group-hover:translate-y-[-2px]" />
//                 <span>Sign Up</span>
//               </Button>
//             </Link>
//           </div>

//           {/* Mobile Menu Button */}
//           <Sheet open={isOpen} onOpenChange={setIsOpen}>
//             <SheetTrigger asChild>
//               <Button variant="ghost" size="icon" className="md:hidden">
//                 <Menu className="h-5 w-5" />
//                 <span className="sr-only">Toggle menu</span>
//               </Button>
//             </SheetTrigger>
//             <SheetContent side="right" className="w-[80%] sm:w-[350px] pr-0">
//               <div className="flex flex-col h-full">
//                 <div className="flex items-center justify-between mb-6">
//                   <Link href="/" className="flex items-center space-x-2" onClick={() => setIsOpen(false)}>
//                     <span className="text-xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
//                       mathXplorer
//                     </span>
//                   </Link>
//                   <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
//                     <X className="h-5 w-5" />
//                     <span className="sr-only">Close menu</span>
//                   </Button>
//                 </div>

//                 <nav className="flex-1">
//                   <ul className="flex flex-col space-y-2">
//                     {navItems.map((item) => {
//                       const Icon = item.icon
//                       return (
//                         <li key={item.name}>
//                           <Link
//                             href={item.href}
//                             className={cn(
//                               "flex items-center px-4 py-3 text-base font-medium rounded-md transition-all duration-200 hover:bg-muted",
//                               pathname === item.href
//                                 ? "text-primary bg-muted/50"
//                                 : "text-muted-foreground hover:text-foreground",
//                             )}
//                             onClick={() => setIsOpen(false)}
//                           >
//                             <Icon className="mr-3 h-5 w-5" />
//                             <span>{item.name}</span>
//                           </Link>
//                         </li>
//                       )
//                     })}
//                   </ul>
//                 </nav>

//                 <div className="border-t pt-6 mt-6 space-y-4">
//                   <Link href="/login" onClick={() => setIsOpen(false)}>
//                     <Button variant="outline" className="w-full justify-start gap-2">
//                       <LogIn className="h-4 w-4" />
//                       <span>Sign In</span>
//                     </Button>
//                   </Link>
//                   <Link href="/signup" onClick={() => setIsOpen(false)}>
//                     <Button className="w-full justify-start gap-2">
//                       <UserPlus className="h-4 w-4" />
//                       <span>Sign Up</span>
//                     </Button>
//                   </Link>
//                 </div>
//               </div>
//             </SheetContent>
//           </Sheet>
//         </div>
//       </div>
//     </header>
//   )
// }


"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  BookOpen,
  Home,
  LogIn,
  Medal,
  Menu,
  PenTool,
  Trophy,
  UserPlus,
  Info,
  X,
  User,
  Settings,
  LogOut,
  ChevronDown,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"

// Add a useState for logged in status at the top of the component
const navItems = [
  { name: "Home", href: "/", icon: Home },
  { name: "Problems", href: "/problems", icon: PenTool },
  { name: "Contests", href: "/contests", icon: Trophy },
  { name: "Leaderboard", href: "/leaderboard", icon: Medal },
  { name: "Blog", href: "/blog", icon: BookOpen },
  { name: "About", href: "/about", icon: Info },
]

// Add this mock user data after the navItems array
const userData = {
  username: "MathWizard42",
  avatar: "/placeholder.svg?height=32&width=32",
}

export function SiteHeader() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  // For demo purposes, let's simulate logging in after component mounts
  useEffect(() => {
    // Simulate checking auth status
    const timer = setTimeout(() => {
      setIsLoggedIn(true)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center">
          <Link href="/" className="flex items-center space-x-2 mr-4">
            <span className="text-2xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
              mathXplorer
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

          {/* Desktop Auth Buttons or User Menu */}
          <div className="hidden md:flex items-center space-x-2">
            {isLoggedIn ? (
              <div className="relative">
                <Button
                  variant="ghost"
                  size="sm"
                  className="gap-2 px-2"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                >
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={userData.avatar} alt={userData.username} />
                    <AvatarFallback>{userData.username.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <span>{userData.username}</span>
                  <ChevronDown className="h-4 w-4" />
                </Button>

                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-background border z-50">
                    <div className="py-1">
                      <Link href={`/profile/${userData.username}`} onClick={() => setIsDropdownOpen(false)}>
                        <Button variant="ghost" size="sm" className="w-full justify-start">
                          <User className="h-4 w-4 mr-2" />
                          Profile
                        </Button>
                      </Link>
                      <Link href="/settings" onClick={() => setIsDropdownOpen(false)}>
                        <Button variant="ghost" size="sm" className="w-full justify-start">
                          <Settings className="h-4 w-4 mr-2" />
                          Settings
                        </Button>
                      </Link>
                      <hr className="my-1 border-border" />
                      <Button
                        variant="ghost"
                        size="sm"
                        className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20"
                        onClick={() => {
                          setIsLoggedIn(false)
                          setIsDropdownOpen(false)
                        }}
                      >
                        <LogOut className="h-4 w-4 mr-2" />
                        Logout
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <>
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
              </>
            )}
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
                      mathXplorer
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
                  {isLoggedIn ? (
                    <>
                      <div className="flex items-center gap-3 px-4 py-2">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={userData.avatar} alt={userData.username} />
                          <AvatarFallback>{userData.username.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{userData.username}</p>
                          <p className="text-xs text-muted-foreground">Supreme Mugwump</p>
                        </div>
                      </div>
                      <Link href={`/profile/${userData.username}`} onClick={() => setIsOpen(false)}>
                        <Button variant="outline" className="w-full justify-start gap-2">
                          <User className="h-4 w-4" />
                          <span>Profile</span>
                        </Button>
                      </Link>
                      <Button
                        className="w-full justify-start gap-2 text-red-500 hover:text-red-600 bg-transparent hover:bg-red-50 dark:hover:bg-red-950/20 border border-red-200 dark:border-red-800"
                        onClick={() => {
                          setIsLoggedIn(false)
                          setIsOpen(false)
                        }}
                      >
                        <LogOut className="h-4 w-4" />
                        <span>Logout</span>
                      </Button>
                    </>
                  ) : (
                    <>
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
                    </>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}

