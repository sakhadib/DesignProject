"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { ArrowRight, Eye, EyeOff, UserPlus } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle signup logic here
  }

  return (
    <div className="container flex items-center justify-center min-h-[calc(100vh-4rem)] py-12">
      <div className="w-full max-w-md">
        <Card className="border-2 shadow-lg animate-fade-in">
          <CardHeader className="space-y-1">
            <div className="flex items-center justify-center mb-2">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                <UserPlus className="h-6 w-6 text-primary" />
              </div>
            </div>
            <CardTitle className="text-2xl font-bold text-center">Sign Up</CardTitle>
            <CardDescription className="text-center">
              Create an account to start solving mathematical problems
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <div className="relative">
                  <Input
                    id="username"
                    placeholder="mathgenius"
                    required
                    className="pr-10 transition-all duration-200 border-2 focus-visible:ring-offset-2"
                  />
                  <div className="absolute right-3 top-2.5 text-muted-foreground">
                    <span className="text-sm font-mono">∑</span>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Input
                    id="email"
                    type="email"
                    placeholder="name@example.com"
                    required
                    className="pr-10 transition-all duration-200 border-2 focus-visible:ring-offset-2"
                  />
                  <div className="absolute right-3 top-2.5 text-muted-foreground">
                    <span className="text-sm font-mono">@</span>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    required
                    className="pr-10 transition-all duration-200 border-2 focus-visible:ring-offset-2"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <Eye className="h-4 w-4 text-muted-foreground" />
                    )}
                    <span className="sr-only">{showPassword ? "Hide password" : "Show password"}</span>
                  </Button>
                </div>
              </div>
              <Button type="submit" className="w-full group">
                Create Account
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <div className="text-center text-sm">
              Already have an account?{" "}
              <Link href="/login" className="text-primary hover:underline transition-all font-medium">
                Sign in
              </Link>
            </div>
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">Discover Mathematical Brilliance</span>
              </div>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

