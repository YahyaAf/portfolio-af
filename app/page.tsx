"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Moon, Sun, Github, Linkedin, Mail, Phone, ChevronDown } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { ThemeProvider } from "@/components/theme-provider"
import { Button } from "@/components/ui/button"
import { useTheme } from "next-themes"

export default function Home() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()
  const [activeSection, setActiveSection] = useState("home")

  useEffect(() => {
    setMounted(true)

    const handleScroll = () => {
      const sections = ["home", "about", "projects", "contact"]
      const scrollPosition = window.scrollY + 100

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const offsetTop = element.offsetTop
          const offsetHeight = element.offsetHeight

          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId)
    if (section) {
      window.scrollTo({
        top: section.offsetTop - 80,
        behavior: "smooth",
      })
    }
  }

  return (
    <ThemeProvider attribute="class" defaultTheme="dark">
      <div className="min-h-screen bg-background text-foreground">
        {/* Navigation */}
        <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-background/80 border-b border-border">
          <div className="container mx-auto px-4 py-4 flex justify-between items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="text-xl font-bold"
            >
              <span className="text-primary">Yahya</span> Afadisse
            </motion.div>

            <nav className="hidden md:flex items-center space-x-8">
              {["home", "about", "projects", "contact"].map((item) => (
                <motion.button
                  key={item}
                  whileHover={{ y: -2 }}
                  whileTap={{ y: 0 }}
                  onClick={() => scrollToSection(item)}
                  className={`capitalize ${activeSection === item ? "text-primary font-medium" : "text-muted-foreground"}`}
                >
                  {item}
                </motion.button>
              ))}
            </nav>

            <div className="flex items-center space-x-4">
              {mounted && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  aria-label="Toggle theme"
                  className="relative"
                >
                  <AnimatePresence mode="wait" initial={false}>
                    {theme === "dark" ? (
                      <motion.div
                        key="dark"
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="absolute inset-0 flex items-center justify-center"
                      >
                        <Sun className="h-5 w-5" />
                      </motion.div>
                    ) : (
                      <motion.div
                        key="light"
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="absolute inset-0 flex items-center justify-center"
                      >
                        <Moon className="h-5 w-5" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Button>
              )}

              <div className="md:hidden">
                <Button variant="ghost" size="icon" className="text-foreground">
                  <ChevronDown className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        </header>

        <main className="container mx-auto px-4 pt-24">
          {/* Hero Section */}
          <section id="home" className="min-h-[calc(100vh-6rem)] flex flex-col justify-center py-20">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="order-2 md:order-1"
              >
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                  className="inline-block px-3 py-1 mb-4 text-sm font-medium bg-primary/10 text-primary rounded-full"
                >
                  Full-Stack Developer
                </motion.span>
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                  className="text-4xl md:text-6xl font-bold mb-4"
                >
                  Hi, I'm <span className="text-primary">Yahya</span> Afadisse
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                  className="text-xl text-muted-foreground mb-8"
                >
                  Building clean, functional, and engaging web experiences.
                </motion.p>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.6 }}
                  className="flex flex-wrap gap-4"
                >
                  <Button onClick={() => scrollToSection("projects")} className="px-6 rounded-full">
                    View Projects
                  </Button>
                  <Button onClick={() => scrollToSection("contact")} variant="outline" className="px-6 rounded-full">
                    Contact Me
                  </Button>
                </motion.div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="order-1 md:order-2 flex justify-center"
              >
                <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-primary/20">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent rounded-full z-10"></div>
                  <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1094-1727859809.jpg-ZfUowYSVNXDlWmOQjQfbj9pkapZbFp.jpeg"
                    alt="Yahya Afadisse"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 1 }}
              className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
            >
              <span className="text-sm text-muted-foreground mb-2">Scroll Down</span>
              <motion.div animate={{ y: [0, 10, 0] }} transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}>
                <ChevronDown className="h-6 w-6 text-primary" />
              </motion.div>
            </motion.div>
          </section>

          {/* About Section */}
          <section id="about" className="py-20">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="mb-12 text-center"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">About Me</h2>
              <div className="w-20 h-1 bg-primary mx-auto"></div>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <p className="text-lg mb-6">
                  I'm Yahya Afadisse, a passionate full-stack web developer skilled in Laravel, JavaScript, and modern
                  frontend tools like React. I'm currently studying at YouCode, and I've developed several real-world
                  projects from scratch.
                </p>
                <p className="text-lg mb-6">
                  I love building clean, functional, and engaging web experiences. My approach combines technical
                  expertise with creative problem-solving to deliver solutions that exceed expectations.
                </p>
                <p className="text-lg">
                  Currently pursuing a degree in Full-Stack development at YouCode | UM6P, I'm constantly expanding my
                  skills and staying up-to-date with the latest web technologies.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <h3 className="text-xl font-bold mb-4">Technical Skills</h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                  <div className="bg-card p-4 rounded-lg">
                    <h4 className="font-medium mb-2">Backend</h4>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">PHP</span>
                      <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">Laravel</span>
                    </div>
                  </div>

                  <div className="bg-card p-4 rounded-lg">
                    <h4 className="font-medium mb-2">Frontend</h4>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">JavaScript</span>
                      <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">React.js</span>
                      <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">Bootstrap</span>
                      <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">Tailwind</span>
                    </div>
                  </div>

                  <div className="bg-card p-4 rounded-lg">
                    <h4 className="font-medium mb-2">Database</h4>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">SQL</span>
                      <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">MySQL</span>
                      <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">NoSQL</span>
                      <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">MongoDB</span>
                    </div>
                  </div>

                  <div className="bg-card p-4 rounded-lg">
                    <h4 className="font-medium mb-2">Tools & Methods</h4>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">Git</span>
                      <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">GitHub</span>
                      <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">Jira</span>
                      <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">Trello</span>
                      <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">Scrum</span>
                      <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">UML</span>
                    </div>
                  </div>
                </div>

                <h3 className="text-xl font-bold mb-4">Languages</h3>
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-card p-4 rounded-lg text-center">
                    <h4 className="font-medium">Arabic</h4>
                    <p className="text-sm text-muted-foreground">Native</p>
                  </div>
                  <div className="bg-card p-4 rounded-lg text-center">
                    <h4 className="font-medium">French</h4>
                    <p className="text-sm text-muted-foreground">Intermediate</p>
                  </div>
                  <div className="bg-card p-4 rounded-lg text-center">
                    <h4 className="font-medium">English</h4>
                    <p className="text-sm text-muted-foreground">Intermediate</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Projects Section */}
          <section id="projects" className="py-20">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="mb-12 text-center"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">My Projects</h2>
              <div className="w-20 h-1 bg-primary mx-auto mb-6"></div>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Here are some of the projects I've worked on. Each demonstrates different skills and technologies.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Project 1 - Youdemy */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="bg-card rounded-xl overflow-hidden border border-border hover:shadow-lg transition-all duration-300 group"
              >
                <div className="h-48 relative overflow-hidden">
                  <Image
                    src="/images/youdemy.png"
                    alt="Youdemy"
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                    <div className="p-4">
                      <h3 className="text-xl font-bold text-white mb-1">Youdemy</h3>
                      <div className="flex flex-wrap gap-2">
                        <span className="px-2 py-1 bg-primary/80 text-white rounded-md text-xs">Laravel</span>
                        <span className="px-2 py-1 bg-primary/80 text-white rounded-md text-xs">MySQL</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-muted-foreground mb-4">
                    A Laravel-based platform for online courses. It includes course creation, admin controls, and a
                    user-friendly dashboard for students.
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="px-2 py-1 bg-primary/10 text-primary rounded-md text-xs">Laravel</span>
                    <span className="px-2 py-1 bg-primary/10 text-primary rounded-md text-xs">MySQL</span>
                    <span className="px-2 py-1 bg-primary/10 text-primary rounded-md text-xs">Bootstrap</span>
                  </div>
                  <Link
                    href="https://github.com/YahyaAf/Youdemy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline inline-flex items-center"
                  >
                    <Github className="h-4 w-4 mr-2" />
                    View on GitHub
                  </Link>
                </div>
              </motion.div>

              {/* Project 2 - CreateCv */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
                className="bg-card rounded-xl overflow-hidden border border-border hover:shadow-lg transition-all duration-300 group"
              >
                <div className="h-48 relative overflow-hidden">
                  <Image
                    src="/images/createcv.png"
                    alt="CreateCv"
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                    <div className="p-4">
                      <h3 className="text-xl font-bold text-white mb-1">CreateCv</h3>
                      <div className="flex flex-wrap gap-2">
                        <span className="px-2 py-1 bg-primary/80 text-white rounded-md text-xs">JavaScript</span>
                        <span className="px-2 py-1 bg-primary/80 text-white rounded-md text-xs">Tailwind</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-muted-foreground mb-4">
                    A web app that helps users create professional CVs. Fully dynamic with downloadable results.
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="px-2 py-1 bg-primary/10 text-primary rounded-md text-xs">JavaScript</span>
                    <span className="px-2 py-1 bg-primary/10 text-primary rounded-md text-xs">HTML/CSS</span>
                    <span className="px-2 py-1 bg-primary/10 text-primary rounded-md text-xs">Tailwind</span>
                  </div>
                  <Link
                    href="https://github.com/YahyaAf/CreateCv"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline inline-flex items-center"
                  >
                    <Github className="h-4 w-4 mr-2" />
                    View on GitHub
                  </Link>
                </div>
              </motion.div>

              {/* Project 3 - TakeUrTerrain */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                className="bg-card rounded-xl overflow-hidden border border-border hover:shadow-lg transition-all duration-300 group"
              >
                <div className="h-48 relative overflow-hidden">
                  <Image
                    src="/images/takeurterrain.png"
                    alt="TakeUrTerrain"
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                    <div className="p-4">
                      <h3 className="text-xl font-bold text-white mb-1">TakeUrTerrain</h3>
                      <div className="flex flex-wrap gap-2">
                        <span className="px-2 py-1 bg-primary/80 text-white rounded-md text-xs">Laravel</span>
                        <span className="px-2 py-1 bg-primary/80 text-white rounded-md text-xs">JavaScript</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-muted-foreground mb-4">
                    Field reservation system for sports like football, basketball, and tennis. Lets users book time
                    slots and view availability.
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="px-2 py-1 bg-primary/10 text-primary rounded-md text-xs">Laravel</span>
                    <span className="px-2 py-1 bg-primary/10 text-primary rounded-md text-xs">MySQL</span>
                    <span className="px-2 py-1 bg-primary/10 text-primary rounded-md text-xs">JavaScript</span>
                  </div>
                  <Link
                    href="https://github.com/YahyaAf/TakeUrTerrain"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline inline-flex items-center"
                  >
                    <Github className="h-4 w-4 mr-2" />
                    View on GitHub
                  </Link>
                </div>
              </motion.div>

              {/* Project 4 - HRMS */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true }}
                className="bg-card rounded-xl overflow-hidden border border-border hover:shadow-lg transition-all duration-300 group"
              >
                <div className="h-48 relative overflow-hidden">
                  <Image
                    src="/images/hrms.png"
                    alt="HRMS"
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                    <div className="p-4">
                      <h3 className="text-xl font-bold text-white mb-1">HRMS</h3>
                      <div className="flex flex-wrap gap-2">
                        <span className="px-2 py-1 bg-primary/80 text-white rounded-md text-xs">Laravel</span>
                        <span className="px-2 py-1 bg-primary/80 text-white rounded-md text-xs">React</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-muted-foreground mb-4">
                    A Human Resource Management System. Manage employees, salaries, and departments efficiently.
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="px-2 py-1 bg-primary/10 text-primary rounded-md text-xs">Laravel</span>
                    <span className="px-2 py-1 bg-primary/10 text-primary rounded-md text-xs">MySQL</span>
                    <span className="px-2 py-1 bg-primary/10 text-primary rounded-md text-xs">React</span>
                  </div>
                  <Link
                    href="https://github.com/YahyaAf/hrms"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline inline-flex items-center"
                  >
                    <Github className="h-4 w-4 mr-2" />
                    View on GitHub
                  </Link>
                </div>
              </motion.div>

              {/* Project 5 - udeconnect */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                viewport={{ once: true }}
                className="bg-card rounded-xl overflow-hidden border border-border hover:shadow-lg transition-all duration-300 group"
              >
                <div className="h-48 relative overflow-hidden">
                  <Image
                    src="/images/udeconnect.png"
                    alt="udeconnect"
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                    <div className="p-4">
                      <h3 className="text-xl font-bold text-white mb-1">udeconnect</h3>
                      <div className="flex flex-wrap gap-2">
                        <span className="px-2 py-1 bg-primary/80 text-white rounded-md text-xs">Laravel</span>
                        <span className="px-2 py-1 bg-primary/80 text-white rounded-md text-xs">React</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-muted-foreground mb-4">
                    An e-learning platform built with Laravel + React. Features course creation, user login, and clean
                    UX.
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="px-2 py-1 bg-primary/10 text-primary rounded-md text-xs">Laravel</span>
                    <span className="px-2 py-1 bg-primary/10 text-primary rounded-md text-xs">React</span>
                    <span className="px-2 py-1 bg-primary/10 text-primary rounded-md text-xs">MySQL</span>
                  </div>
                  <Link
                    href="https://github.com/YahyaAf/udeconnect"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline inline-flex items-center"
                  >
                    <Github className="h-4 w-4 mr-2" />
                    View on GitHub
                  </Link>
                </div>
              </motion.div>

              {/* Project 6 - ToDoList */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                viewport={{ once: true }}
                className="bg-card rounded-xl overflow-hidden border border-border hover:shadow-lg transition-all duration-300 group"
              >
                <div className="h-48 relative overflow-hidden">
                  <Image
                    src="/images/todolist.png"
                    alt="ToDoList"
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                    <div className="p-4">
                      <h3 className="text-xl font-bold text-white mb-1">ToDoList</h3>
                      <div className="flex flex-wrap gap-2">
                        <span className="px-2 py-1 bg-primary/80 text-white rounded-md text-xs">JavaScript</span>
                        <span className="px-2 py-1 bg-primary/80 text-white rounded-md text-xs">Bootstrap</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-muted-foreground mb-4">
                    A to-do app made with Bootstrap and JavaScript for managing daily tasks.
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="px-2 py-1 bg-primary/10 text-primary rounded-md text-xs">JavaScript</span>
                    <span className="px-2 py-1 bg-primary/10 text-primary rounded-md text-xs">Bootstrap</span>
                    <span className="px-2 py-1 bg-primary/10 text-primary rounded-md text-xs">HTML/CSS</span>
                  </div>
                  <Link
                    href="https://github.com/YahyaAf/ToDoList"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline inline-flex items-center"
                  >
                    <Github className="h-4 w-4 mr-2" />
                    View on GitHub
                  </Link>
                </div>
              </motion.div>

              {/* Project 7 - FutChampions */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                viewport={{ once: true }}
                className="bg-card rounded-xl overflow-hidden border border-border hover:shadow-lg transition-all duration-300 group"
              >
                <div className="h-48 relative overflow-hidden">
                  <Image
                    src="/images/futchampions.png"
                    alt="FutChampions"
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                    <div className="p-4">
                      <h3 className="text-xl font-bold text-white mb-1">FutChampions</h3>
                      <div className="flex flex-wrap gap-2">
                        <span className="px-2 py-1 bg-primary/80 text-white rounded-md text-xs">HTML5</span>
                        <span className="px-2 py-1 bg-primary/80 text-white rounded-md text-xs">JavaScript</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-muted-foreground mb-4">
                    A football tournament tracker. Users can view rankings and manage matches between friends.
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="px-2 py-1 bg-primary/10 text-primary rounded-md text-xs">HTML5</span>
                    <span className="px-2 py-1 bg-primary/10 text-primary rounded-md text-xs">Tailwind CSS</span>
                    <span className="px-2 py-1 bg-primary/10 text-primary rounded-md text-xs">JavaScript</span>
                  </div>
                  <Link
                    href="https://github.com/YahyaAf/FutChampions"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline inline-flex items-center"
                  >
                    <Github className="h-4 w-4 mr-2" />
                    View on GitHub
                  </Link>
                </div>
              </motion.div>

              {/* Project 8 - FAKHAR.ma */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.7 }}
                viewport={{ once: true }}
                className="bg-card rounded-xl overflow-hidden border border-border hover:shadow-lg transition-all duration-300 group"
              >
                <div className="h-48 relative overflow-hidden">
                  <Image
                    src="/images/fakhar.png"
                    alt="FAKHAR.ma"
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                    <div className="p-4">
                      <h3 className="text-xl font-bold text-white mb-1">FAKHAR.ma</h3>
                      <div className="flex flex-wrap gap-2">
                        <span className="px-2 py-1 bg-primary/80 text-white rounded-md text-xs">Laravel</span>
                        <span className="px-2 py-1 bg-primary/80 text-white rounded-md text-xs">React</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-muted-foreground mb-4">
                    A modern e-commerce site with product management, cart, admin panel, and smooth user flow.
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="px-2 py-1 bg-primary/10 text-primary rounded-md text-xs">Laravel</span>
                    <span className="px-2 py-1 bg-primary/10 text-primary rounded-md text-xs">MySQL</span>
                    <span className="px-2 py-1 bg-primary/10 text-primary rounded-md text-xs">React.js</span>
                    <span className="px-2 py-1 bg-primary/10 text-primary rounded-md text-xs">Tailwind CSS</span>
                    <span className="px-2 py-1 bg-primary/10 text-primary rounded-md text-xs">REST API</span>
                  </div>
                  <Link
                    href="https://github.com/YahyaAf/FAKHAR.ma"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline inline-flex items-center"
                  >
                    <Github className="h-4 w-4 mr-2" />
                    View on GitHub
                  </Link>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Contact Section */}
          <section id="contact" className="py-20">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="mb-12 text-center"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Get In Touch</h2>
              <div className="w-20 h-1 bg-primary mx-auto mb-6"></div>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Feel free to reach out for collaborations or just a friendly chat.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <h3 className="text-2xl font-bold mb-6">Contact Information</h3>

                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="bg-primary/10 p-3 rounded-full mr-4">
                      <Phone className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">Phone</h4>
                      <p className="text-muted-foreground">+212 694 285 418</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="bg-primary/10 p-3 rounded-full mr-4">
                      <Mail className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">Email</h4>
                      <p className="text-muted-foreground">yahyaafadisse92@gmail.com</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="bg-primary/10 p-3 rounded-full mr-4">
                      <Linkedin className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">LinkedIn</h4>
                      <a
                        href="https://www.linkedin.com/in/yahya-afadisse-236b022a9/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline"
                      >
                        linkedin.com/in/yahya-afadisse
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="bg-primary/10 p-3 rounded-full mr-4">
                      <Github className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">GitHub</h4>
                      <a
                        href="https://github.com/YahyaAf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline"
                      >
                        github.com/YahyaAf
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="bg-card p-8 rounded-xl border border-border"
              >
                <h3 className="text-2xl font-bold mb-6">Send Me a Message</h3>

                <form className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium mb-2">
                        Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        className="w-full px-4 py-2 bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="Your Name"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        className="w-full px-4 py-2 bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="Your Email"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium mb-2">
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      className="w-full px-4 py-2 bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="Subject"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium mb-2">
                      Message
                    </label>
                    <textarea
                      id="message"
                      rows={5}
                      className="w-full px-4 py-2 bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                      placeholder="Your Message"
                    ></textarea>
                  </div>

                  <Button type="submit" className="w-full">
                    Send Message
                  </Button>
                </form>
              </motion.div>
            </div>
          </section>
        </main>

        <footer className="bg-card border-t border-border py-8">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl font-bold mb-4">Yahya Afadisse</h2>
              <p className="text-muted-foreground mb-6">Full-Stack Web Developer</p>

              <div className="flex justify-center space-x-4 mb-8">
                <a
                  href="https://github.com/YahyaAf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-primary/10 p-3 rounded-full text-primary hover:bg-primary hover:text-white transition-colors"
                >
                  <Github className="h-5 w-5" />
                </a>
                <a
                  href="https://www.linkedin.com/in/yahya-afadisse-236b022a9/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-primary/10 p-3 rounded-full text-primary hover:bg-primary hover:text-white transition-colors"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
                <a
                  href="mailto:yahyaafadisse92@gmail.com"
                  className="bg-primary/10 p-3 rounded-full text-primary hover:bg-primary hover:text-white transition-colors"
                >
                  <Mail className="h-5 w-5" />
                </a>
                <a
                  href="tel:+212694285418"
                  className="bg-primary/10 p-3 rounded-full text-primary hover:bg-primary hover:text-white transition-colors"
                >
                  <Phone className="h-5 w-5" />
                </a>
              </div>

              <p className="text-sm text-muted-foreground">
                &copy; {new Date().getFullYear()} Yahya Afadisse. All rights reserved.
              </p>
            </motion.div>
          </div>
        </footer>
      </div>
    </ThemeProvider>
  )
}
