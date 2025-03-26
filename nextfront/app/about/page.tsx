import Link from "next/link"
import Image from "next/image"
import { Github, Mail, ExternalLink, BookOpen, Code, Server, Palette, Database, Braces } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function AboutPage() {
  return (
    <div className="container py-12">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">About mathXplorer</h1>
          <p className="text-xl text-muted-foreground">A platform for exploring the fascinating world of mathematics</p>
        </div>

        {/* Project Information */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-6 flex items-center">
            <BookOpen className="mr-2 h-5 w-5 text-primary" />
            Project Information
          </h2>

          <Card className="mb-8">
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold">University Project</h3>
                  <p className="text-muted-foreground">
                    This platform was developed as a university project for the BSc. in Software Engineering Program of
                    the Computer Science and Engineering Department at Islamic University of Technology.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold">Course Details</h3>
                  <p className="text-muted-foreground">
                    Course: Design Project - I (SWE-4506)
                    <br />
                    Department: Computer Science and Engineering
                    <br />
                    Institution: Islamic University of Technology
                    <br />
                    Location: Gazipur, Dhaka, Bangladesh, ZIP 1704
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold">Project Purpose</h3>
                  <p className="text-muted-foreground">
                    mathXplorer was created to provide a comprehensive platform for mathematics enthusiasts to solve
                    problems, participate in contests, share knowledge through blogs, and track their progress. The
                    platform aims to make learning mathematics more engaging and interactive.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Team Information */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-6 flex items-center">
            <Code className="mr-2 h-5 w-5 text-primary" />
            Developed by Team Voyager
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Team Member 1 */}
            <Card className="overflow-hidden transition-all hover:shadow-md">
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center">
                  <div className="w-24 h-24 rounded-full overflow-hidden mb-4 border-4 border-primary/20">
                    <Image
                      src="/placeholder.svg?height=96&width=96"
                      alt="Adib Sakhawat"
                      width={96}
                      height={96}
                      className="object-cover"
                    />
                  </div>
                  <h3 className="text-lg font-bold">Adib Sakhawat</h3>
                  <p className="text-sm text-muted-foreground mb-2">Student ID: 210042106</p>
                  <p className="text-sm text-muted-foreground mb-4">BSc in Software Engineering</p>

                  <div className="flex space-x-2">
                    <Link href="https://github.com/sakhadib" target="_blank" rel="noopener noreferrer">
                      <Button variant="outline" size="icon" className="h-8 w-8 rounded-full">
                        <Github className="h-4 w-4" />
                      </Button>
                    </Link>
                    <Button variant="outline" size="icon" className="h-8 w-8 rounded-full">
                      <Mail className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Team Member 2 */}
            <Card className="overflow-hidden transition-all hover:shadow-md">
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center">
                  <div className="w-24 h-24 rounded-full overflow-hidden mb-4 border-4 border-primary/20">
                    <Image
                      src="/placeholder.svg?height=96&width=96"
                      alt="Takia Farhin"
                      width={96}
                      height={96}
                      className="object-cover"
                    />
                  </div>
                  <h3 className="text-lg font-bold">Takia Farhin</h3>
                  <p className="text-sm text-muted-foreground mb-2">Student ID: 210042117</p>
                  <p className="text-sm text-muted-foreground mb-4">BSc in Software Engineering</p>

                  <div className="flex space-x-2">
                    <Link href="https://github.com/takia03" target="_blank" rel="noopener noreferrer">
                      <Button variant="outline" size="icon" className="h-8 w-8 rounded-full">
                        <Github className="h-4 w-4" />
                      </Button>
                    </Link>
                    <Button variant="outline" size="icon" className="h-8 w-8 rounded-full">
                      <Mail className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Team Member 3 */}
            <Card className="overflow-hidden transition-all hover:shadow-md">
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center">
                  <div className="w-24 h-24 rounded-full overflow-hidden mb-4 border-4 border-primary/20">
                    <Image
                      src="/placeholder.svg?height=96&width=96"
                      alt="Tahsin Islam"
                      width={96}
                      height={96}
                      className="object-cover"
                    />
                  </div>
                  <h3 className="text-lg font-bold">Tahsin Islam</h3>
                  <p className="text-sm text-muted-foreground mb-2">Student ID: 210042137</p>
                  <p className="text-sm text-muted-foreground mb-4">BSc in Software Engineering</p>

                  <div className="flex space-x-2">
                    <Link href="https://github.com/tahsinrayshad" target="_blank" rel="noopener noreferrer">
                      <Button variant="outline" size="icon" className="h-8 w-8 rounded-full">
                        <Github className="h-4 w-4" />
                      </Button>
                    </Link>
                    <Button variant="outline" size="icon" className="h-8 w-8 rounded-full">
                      <Mail className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="mt-6 text-center text-sm text-muted-foreground">
            <p>
              All team members were BSc in Software Engineering students in their 5th semester at the time of developing
              this project.
            </p>
          </div>
        </div>

        {/* Technologies Used */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-6 flex items-center">
            <Server className="mr-2 h-5 w-5 text-primary" />
            Technologies Used
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <Braces className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Frontend</h3>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline">Next.js</Badge>
                      <Badge variant="outline">React</Badge>
                      <Badge variant="outline">TypeScript</Badge>
                      <Badge variant="outline">Tailwind CSS</Badge>
                      <Badge variant="outline">shadcn/ui</Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <Database className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Backend</h3>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline">Node.js</Badge>
                      <Badge variant="outline">Express</Badge>
                      <Badge variant="outline">MongoDB</Badge>
                      <Badge variant="outline">Mongoose</Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <Palette className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">UI/UX</h3>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline">Figma</Badge>
                      <Badge variant="outline">Lucide Icons</Badge>
                      <Badge variant="outline">Responsive Design</Badge>
                      <Badge variant="outline">Dark Mode</Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <Code className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Development Tools</h3>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline">Git</Badge>
                      <Badge variant="outline">GitHub</Badge>
                      <Badge variant="outline">VS Code</Badge>
                      <Badge variant="outline">npm</Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Contact Information */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-6 flex items-center">
            <Mail className="mr-2 h-5 w-5 text-primary" />
            Contact Information
          </h2>

          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold">Email</h3>
                  <p className="text-muted-foreground">team.voyager@example.com</p>
                </div>

                <div>
                  <h3 className="font-semibold">GitHub Repository</h3>
                  <Link
                    href="https://github.com/sakhadib/mathXplorer"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline flex items-center gap-1"
                  >
                    github.com/sakhadib/mathXplorer
                    <ExternalLink className="h-3 w-3" />
                  </Link>
                </div>

                <div>
                  <h3 className="font-semibold">University</h3>
                  <p className="text-muted-foreground">
                    Islamic University of Technology
                    <br />
                    Board Bazar, Gazipur, Dhaka, Bangladesh
                    <br />
                    ZIP: 1704
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Legal Links */}
        <div className="text-center text-sm text-muted-foreground">
          <div className="flex justify-center space-x-4">
            <Link href="/privacy" className="hover:text-primary transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-primary transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

