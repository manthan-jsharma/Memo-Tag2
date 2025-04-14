"use client";

import type React from "react";
import Lottie from "lottie-react";
import dementiaAnimation from "./assets/hospital.json";
import howitworksAnimation from "./assets/howitworks.json";
import PatientCareAnimation from "./assets/PatientCare.json";
import investmentAnimation from "./assets/investment.json";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import {
  motion,
  useAnimation,
  useInView,
  AnimatePresence,
  useScroll,
  useTransform,
} from "motion/react";
import {
  ArrowRight,
  Brain,
  CheckCircle,
  Clock,
  Heart,
  Mail,
  MessageSquare,
  Users,
  Menu,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { submitContactForm } from "@/app/actions";
import Link from "next/link";
import { useMobile } from "@/hooks/use-mobile";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";

const images = ["/demential1.png", "/demential2.png", "/demential3.png"];

export default function Home() {
  const [email, setEmail] = useState("");
  const [formStatus, setFormStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [menuOpen, setMenuOpen] = useState(false);
  const isMobile = useMobile();
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [cursorHovered, setCursorHovered] = useState(false);

  const handleWaitlistSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus("loading");

    try {
      await submitContactForm({
        email,
        name: "",
        message: "Waitlist signup",
        type: "waitlist",
      });
      setFormStatus("success");
      setEmail("");
    } catch (error) {
      console.error("Error submitting Waitlist", error);
      setFormStatus("error");
    }
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const [sliderRef] = useKeenSlider({
    loop: true,
    mode: "snap",
    slides: {
      origin: "center",
      perView: 1,
      spacing: 15,
    },
  });

  return (
    <div className="flex flex-col min-h-screen bg-[#121420] overflow-hidden">
      <Header menuOpen={menuOpen} setMenuOpen={setMenuOpen} />

      {/* Custom Cursor */}
      {!isMobile && (
        <motion.div
          className="fixed top-0 left-0 w-8 h-8 rounded-full border-2 border-red-500 pointer-events-none z-50 mix-blend-difference"
          animate={{
            x: cursorPosition.x - 16,
            y: cursorPosition.y - 16,
            scale: cursorHovered ? 1.5 : 1,
          }}
          transition={{
            type: "spring",
            damping: 10,
            stiffness: 100,
            mass: 0.1,
          }}
        />
      )}

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed inset-0 bg-[#121420] z-40 flex flex-col p-6"
          >
            <div className="flex justify-end">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setMenuOpen(false)}
                className="text-white hover:bg-white/10"
              >
                <X className="h-6 w-6" />
              </Button>
            </div>
            <nav className="flex flex-col items-center justify-center flex-1 gap-8">
              <MobileNavLink href="#" onClick={() => setMenuOpen(false)}>
                About
              </MobileNavLink>
              <MobileNavLink href="#" onClick={() => setMenuOpen(false)}>
                Technology
              </MobileNavLink>
              <MobileNavLink href="#" onClick={() => setMenuOpen(false)}>
                For Caregivers
              </MobileNavLink>
              <MobileNavLink href="#" onClick={() => setMenuOpen(false)}>
                For Healthcare
              </MobileNavLink>
              <MobileNavLink href="#" onClick={() => setMenuOpen(false)}>
                Contact
              </MobileNavLink>
              <div className="flex flex-col gap-4 mt-8 w-full max-w-xs">
                <Button
                  variant="ghost"
                  className="text-white hover:bg-white/10 w-full"
                >
                  Sign In
                </Button>
                <Button className="bg-red-500 hover:bg-red-600 text-white w-full">
                  Get Started
                </Button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-purple-500/20 rounded-full blur-[120px] -z-10 translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-red-500/10 rounded-full blur-[100px] -z-10 -translate-x-1/2 translate-y-1/2"></div>

        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <SplitTextReveal
              className="space-y-4"
              onMouseEnter={() => setCursorHovered(true)}
              onMouseLeave={() => setCursorHovered(false)}
            >
              <div className="inline-block rounded-lg bg-white/10 px-3 py-1 text-sm text-white backdrop-blur-sm">
                Dementia Care Reimagined
              </div>
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl text-white">
                Memory <span className="text-red-500">Support</span> for Those
                Who Need It Most
              </h1>
              <p className="text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                MemoTag is an AI-powered platform designed to support dementia
                patients and their caregivers, providing memory assistance when
                it matters most.
              </p>
              <div className="flex flex-col gap-2 min-[400px]:flex-row pt-4">
                <Button
                  size="lg"
                  className="bg-red-500 hover:bg-red-600 text-white group relative overflow-hidden"
                  onMouseEnter={() => setCursorHovered(true)}
                  onMouseLeave={() => setCursorHovered(false)}
                >
                  <span className="relative z-10">Learn More</span>
                  <motion.div
                    className="absolute inset-0 bg-red-600"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: 0 }}
                    transition={{
                      type: "tween",
                      ease: "easeInOut",
                      duration: 0.3,
                    }}
                  />
                  <ArrowRight className="ml-2 h-4 w-4 relative z-10" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/20 text-white hover:bg-white/10 group relative overflow-hidden"
                  onMouseEnter={() => setCursorHovered(true)}
                  onMouseLeave={() => setCursorHovered(false)}
                >
                  <span className="relative z-10">For Caregivers</span>
                  <motion.div
                    className="absolute inset-0 bg-white/10"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: 0 }}
                    transition={{
                      type: "tween",
                      ease: "easeInOut",
                      duration: 0.3,
                    }}
                  />
                </Button>
              </div>
            </SplitTextReveal>
            <FloatingElement className="mx-auto lg:ml-auto">
              <div className="relative h-[350px] w-[350px] sm:h-[400px] sm:w-[400px] lg:h-[500px] lg:w-[500px]">
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-500/30 to-purple-700/30 opacity-80 blur-3xl"></div>

                <div
                  ref={sliderRef}
                  className="keen-slider relative z-10 h-full w-full rounded-lg overflow-hidden"
                >
                  {images.map((src, index) => (
                    <div
                      className="keen-slider__slide flex items-center justify-center"
                      key={index}
                    >
                      <Image
                        src={src}
                        alt={`MemoTag Device ${index + 1}`}
                        className="h-full w-full object-contain"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </FloatingElement>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-12 md:py-24 bg-[#1A1D2A]">
        <div className="container px-4 md:px-6">
          <SplitTextReveal className="mx-auto max-w-3xl text-center space-y-4">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-white">
              The Problem We're Solving
            </h2>
            <p className="text-gray-400 md:text-xl/relaxed">
              Dementia affects over 55 million people worldwide, with a new case
              diagnosed every 3 seconds. Memory loss creates daily challenges
              for patients and immense stress for caregivers.
            </p>
          </SplitTextReveal>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-12">
            <ParallaxCard
              delay={0.1}
              className="flex flex-col items-center space-y-4 rounded-lg border border-white/10 bg-white/5 p-6 backdrop-blur-sm"
            >
              <div className="rounded-full bg-purple-500/20 p-3">
                <Brain className="h-6 w-6 text-purple-400" />
              </div>
              <h3 className="text-xl font-bold text-white">
                Memory Deterioration
              </h3>
              <p className="text-center text-gray-400">
                Progressive memory loss affects daily functioning and
                independence.
              </p>
            </ParallaxCard>
            <ParallaxCard
              delay={0.2}
              className="flex flex-col items-center space-y-4 rounded-lg border border-white/10 bg-white/5 p-6 backdrop-blur-sm"
            >
              <div className="rounded-full bg-red-500/20 p-3">
                <Heart className="h-6 w-6 text-red-400" />
              </div>
              <h3 className="text-xl font-bold text-white">Caregiver Burden</h3>
              <p className="text-center text-gray-400">
                Family members experience significant emotional and physical
                strain.
              </p>
            </ParallaxCard>
            <ParallaxCard
              delay={0.3}
              className="flex flex-col items-center space-y-4 rounded-lg border border-white/10 bg-white/5 p-6 backdrop-blur-sm sm:col-span-2 lg:col-span-1"
            >
              <div className="rounded-full bg-blue-500/20 p-3">
                <Users className="h-6 w-6 text-blue-400" />
              </div>
              <h3 className="text-xl font-bold text-white">Social Isolation</h3>
              <p className="text-center text-gray-400">
                Memory challenges lead to withdrawal from social activities and
                relationships.
              </p>
            </ParallaxCard>
          </div>
        </div>
      </section>

      {/* Product Section */}
      <section className="py-12 md:py-24 bg-[#121420] relative">
        <div className="absolute top-1/2 left-1/2 w-[800px] h-[800px] bg-purple-500/10 rounded-full blur-[150px] -z-10 -translate-x-1/2 -translate-y-1/2"></div>

        <div className="container px-4 md:px-6">
          <SplitTextReveal className="mx-auto max-w-3xl text-center space-y-4">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-white">
              Introducing MemoTag
            </h2>
            <p className="text-gray-400 md:text-xl/relaxed">
              An AI-powered memory assistant that helps dementia patients
              recognize loved ones, remember important information, and maintain
              independence.
            </p>
          </SplitTextReveal>
          <div className="mt-16">
            <div className="grid gap-6 lg:grid-cols-2 items-center">
              <ParallaxImage className="order-2 lg:order-1">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/30 to-red-500/20 rounded-lg blur-xl"></div>
                  <Lottie
                    animationData={howitworksAnimation}
                    loop
                    className="relative z-10 rounded-lg  h-[300px] w-[400px]"
                  />
                </div>
              </ParallaxImage>
              <SplitTextReveal className="space-y-4 order-1 lg:order-2">
                <h3 className="text-2xl font-bold text-white">How It Works</h3>
                <ul className="space-y-4">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="mt-1 h-5 w-5 text-red-500 shrink-0" />
                    <span className="text-gray-300">
                      Wearable device with facial recognition technology
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="mt-1 h-5 w-5 text-red-500 shrink-0" />
                    <span className="text-gray-300">
                      AI-powered memory prompts and reminders
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="mt-1 h-5 w-5 text-red-500 shrink-0" />
                    <span className="text-gray-300">
                      Companion app for caregivers to update information
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="mt-1 h-5 w-5 text-red-500 shrink-0" />
                    <span className="text-gray-300">
                      Secure cloud storage for memories and important details
                    </span>
                  </li>
                </ul>
                <Button
                  className="mt-4 bg-red-500 hover:bg-red-600 text-white group relative overflow-hidden"
                  onMouseEnter={() => setCursorHovered(true)}
                  onMouseLeave={() => setCursorHovered(false)}
                >
                  <span className="relative z-10">See Demo</span>
                  <motion.div
                    className="absolute inset-0 bg-red-600"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: 0 }}
                    transition={{
                      type: "tween",
                      ease: "easeInOut",
                      duration: 0.3,
                    }}
                  />
                </Button>
              </SplitTextReveal>
            </div>
          </div>
        </div>
      </section>

      {/* Technology Section */}
      <section className="py-12 md:py-24 bg-[#1A1D2A]">
        <div className="container px-4 md:px-6">
          <SplitTextReveal className="mx-auto max-w-3xl text-center space-y-4">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-white">
              Our Technology
            </h2>
            <p className="text-gray-400 md:text-xl/relaxed">
              MemoTag combines cutting-edge AI with compassionate design to
              create a solution that grows with users.
            </p>
          </SplitTextReveal>
          <div className="grid gap-8 mt-12 md:grid-cols-2 lg:grid-cols-3">
            <TiltCard
              className="rounded-lg border border-white/10 bg-white/5 p-6 backdrop-blur-sm h-full"
              onMouseEnter={() => setCursorHovered(true)}
              onMouseLeave={() => setCursorHovered(false)}
            >
              <div className="mb-4 rounded-full bg-purple-500/20 p-2.5 w-10 h-10 flex items-center justify-center">
                <Brain className="h-5 w-5 text-purple-400" />
              </div>
              <h3 className="text-lg font-bold mb-2 text-white">Advanced AI</h3>
              <p className="text-gray-400">
                Our proprietary algorithms learn and adapt to each user's
                specific memory patterns and needs.
              </p>
            </TiltCard>
            <TiltCard
              className="rounded-lg border border-white/10 bg-white/5 p-6 backdrop-blur-sm h-full"
              onMouseEnter={() => setCursorHovered(true)}
              onMouseLeave={() => setCursorHovered(false)}
            >
              <div className="mb-4 rounded-full bg-red-500/20 p-2.5 w-10 h-10 flex items-center justify-center">
                <Users className="h-5 w-5 text-red-400" />
              </div>
              <h3 className="text-lg font-bold mb-2 text-white">
                Facial Recognition
              </h3>
              <p className="text-gray-400">
                Instantly identifies family members and friends, providing
                context and relationship information.
              </p>
            </TiltCard>
            <TiltCard
              className="rounded-lg border border-white/10 bg-white/5 p-6 backdrop-blur-sm h-full"
              onMouseEnter={() => setCursorHovered(true)}
              onMouseLeave={() => setCursorHovered(false)}
            >
              <div className="mb-4 rounded-full bg-blue-500/20 p-2.5 w-10 h-10 flex items-center justify-center">
                <MessageSquare className="h-5 w-5 text-blue-400" />
              </div>
              <h3 className="text-lg font-bold mb-2 text-white">
                Voice Assistant
              </h3>
              <p className="text-gray-400">
                Natural language processing provides gentle, timely memory
                prompts through a discreet earpiece.
              </p>
            </TiltCard>
            <TiltCard
              className="rounded-lg border border-white/10 bg-white/5 p-6 backdrop-blur-sm h-full"
              onMouseEnter={() => setCursorHovered(true)}
              onMouseLeave={() => setCursorHovered(false)}
            >
              <div className="mb-4 rounded-full bg-green-500/20 p-2.5 w-10 h-10 flex items-center justify-center">
                <Clock className="h-5 w-5 text-green-400" />
              </div>
              <h3 className="text-lg font-bold mb-2 text-white">
                Routine Management
              </h3>
              <p className="text-gray-400">
                Helps maintain daily schedules, medication reminders, and
                important appointments.
              </p>
            </TiltCard>
            <TiltCard
              className="rounded-lg border border-white/10 bg-white/5 p-6 backdrop-blur-sm h-full"
              onMouseEnter={() => setCursorHovered(true)}
              onMouseLeave={() => setCursorHovered(false)}
            >
              <div className="mb-4 rounded-full bg-yellow-500/20 p-2.5 w-10 h-10 flex items-center justify-center">
                <Mail className="h-5 w-5 text-yellow-400" />
              </div>
              <h3 className="text-lg font-bold mb-2 text-white">
                Caregiver Updates
              </h3>
              <p className="text-gray-400">
                Real-time notifications and insights for family members and care
                professionals.
              </p>
            </TiltCard>
            <TiltCard
              className="rounded-lg border border-white/10 bg-white/5 p-6 backdrop-blur-sm h-full"
              onMouseEnter={() => setCursorHovered(true)}
              onMouseLeave={() => setCursorHovered(false)}
            >
              <div className="mb-4 rounded-full bg-pink-500/20 p-2.5 w-10 h-10 flex items-center justify-center">
                <Heart className="h-5 w-5 text-pink-400" />
              </div>
              <h3 className="text-lg font-bold mb-2 text-white">
                Emotional Support
              </h3>
              <p className="text-gray-400">
                Detects emotional states and provides appropriate responses to
                reduce anxiety and confusion.
              </p>
            </TiltCard>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 md:py-24 bg-[#121420] relative">
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-red-500/10 rounded-full blur-[120px] -z-10 translate-x-1/3 translate-y-1/3"></div>

        <div className="container px-4 md:px-6">
          <SplitTextReveal className="mx-auto max-w-3xl text-center space-y-4">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-white">
              Making a Difference
            </h2>
            <p className="text-gray-400 md:text-xl/relaxed">
              Our early results show significant improvements in quality of life
              for both patients and caregivers.
            </p>
          </SplitTextReveal>
          <div className="grid gap-8 mt-12 sm:grid-cols-2 lg:grid-cols-4">
            <CounterCard
              value={87}
              suffix="%"
              color="text-purple-400"
              description="Improved recognition of family members"
              onMouseEnter={() => setCursorHovered(true)}
              onMouseLeave={() => setCursorHovered(false)}
            />
            <CounterCard
              value={62}
              suffix="%"
              color="text-red-400"
              description="Reduction in caregiver stress"
              onMouseEnter={() => setCursorHovered(true)}
              onMouseLeave={() => setCursorHovered(false)}
            />
            <CounterCard
              value={3.5}
              suffix="x"
              color="text-blue-400"
              description="Increase in social engagement"
              onMouseEnter={() => setCursorHovered(true)}
              onMouseLeave={() => setCursorHovered(false)}
            />
            <CounterCard
              value={94}
              suffix="%"
              color="text-green-400"
              description="User satisfaction rating"
              onMouseEnter={() => setCursorHovered(true)}
              onMouseLeave={() => setCursorHovered(false)}
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-24 bg-[#1A1D2A]">
        <div className="container px-4 md:px-6">
          <SplitTextReveal className="mx-auto max-w-4xl">
            <Tabs defaultValue="caregivers" className="w-full">
              <TabsList className="grid w-full grid-cols-3 bg-white/10 text-white">
                <TabsTrigger
                  value="caregivers"
                  className="data-[state=active]:bg-red-500 data-[state=active]:text-white relative group"
                  onMouseEnter={() => setCursorHovered(true)}
                  onMouseLeave={() => setCursorHovered(false)}
                >
                  For Caregivers
                  <motion.span
                    className="absolute bottom-0 left-0 h-0.5 bg-red-500 w-0 group-hover:w-full"
                    transition={{ duration: 0.3 }}
                  />
                </TabsTrigger>
                <TabsTrigger
                  value="healthcare"
                  className="data-[state=active]:bg-red-500 data-[state=active]:text-white relative group"
                  onMouseEnter={() => setCursorHovered(true)}
                  onMouseLeave={() => setCursorHovered(false)}
                >
                  For Healthcare
                  <motion.span
                    className="absolute bottom-0 left-0 h-0.5 bg-red-500 w-0 group-hover:w-full"
                    transition={{ duration: 0.3 }}
                  />
                </TabsTrigger>
                <TabsTrigger
                  value="investors"
                  className="data-[state=active]:bg-red-500 data-[state=active]:text-white relative group"
                  onMouseEnter={() => setCursorHovered(true)}
                  onMouseLeave={() => setCursorHovered(false)}
                >
                  For Investors
                  <motion.span
                    className="absolute bottom-0 left-0 h-0.5 bg-red-500 w-0 group-hover:w-full"
                    transition={{ duration: 0.3 }}
                  />
                </TabsTrigger>
              </TabsList>
              <TabsContent value="caregivers" className="mt-6">
                <div className="grid gap-6 lg:grid-cols-2 items-center">
                  <SplitTextReveal className="space-y-4">
                    <h3 className="text-2xl font-bold text-white">
                      Supporting Your Loved Ones
                    </h3>
                    <p className="text-gray-400">
                      MemoTag provides peace of mind knowing your loved one has
                      memory support when you can't be there. Join our waitlist
                      to be among the first to experience this revolutionary
                      technology.
                    </p>
                    <form
                      onSubmit={handleWaitlistSubmit}
                      className="flex flex-col sm:flex-row gap-2"
                    >
                      <Input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="flex-1 bg-white/5 border-white/10 text-white placeholder:text-gray-500"
                        onMouseEnter={() => setCursorHovered(true)}
                        onMouseLeave={() => setCursorHovered(false)}
                      />
                      <Button
                        type="submit"
                        className="bg-red-500 hover:bg-red-600 text-white group relative overflow-hidden"
                        disabled={formStatus === "loading"}
                        onMouseEnter={() => setCursorHovered(true)}
                        onMouseLeave={() => setCursorHovered(false)}
                      >
                        <span className="relative z-10">
                          {formStatus === "loading"
                            ? "Joining..."
                            : "Join Waitlist"}
                        </span>
                        <motion.div
                          className="absolute inset-0 bg-red-600"
                          initial={{ x: "-100%" }}
                          whileHover={{ x: 0 }}
                          transition={{
                            type: "tween",
                            ease: "easeInOut",
                            duration: 0.3,
                          }}
                        />
                      </Button>
                    </form>
                    {formStatus === "success" && (
                      <p className="text-green-400 text-sm">
                        Thank you for joining our waitlist!
                      </p>
                    )}
                    {formStatus === "error" && (
                      <p className="text-red-400 text-sm">
                        There was an error. Please try again.
                      </p>
                    )}
                  </SplitTextReveal>
                  <ParallaxImage className="mx-auto">
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-red-500/20 rounded-lg blur-xl"></div>
                      <Lottie
                        animationData={dementiaAnimation}
                        loop
                        className="relative z-10 rounded-lg  h-[300px] w-[400px]"
                      />
                    </div>
                  </ParallaxImage>
                </div>
              </TabsContent>
              <TabsContent value="healthcare" className="mt-6">
                <div className="grid gap-6 lg:grid-cols-2 items-center">
                  <SplitTextReveal className="space-y-4">
                    <h3 className="text-2xl font-bold text-white">
                      Enhancing Patient Care
                    </h3>
                    <p className="text-gray-400">
                      MemoTag integrates with existing care protocols to provide
                      data-driven insights and improve quality of life for
                      dementia patients. Schedule a demonstration for your
                      facility.
                    </p>
                    <Button
                      className="bg-red-500 hover:bg-red-600 text-white group relative overflow-hidden"
                      onMouseEnter={() => setCursorHovered(true)}
                      onMouseLeave={() => setCursorHovered(false)}
                    >
                      <span className="relative z-10">Request Demo</span>
                      <motion.div
                        className="absolute inset-0 bg-red-600"
                        initial={{ x: "-100%" }}
                        whileHover={{ x: 0 }}
                        transition={{
                          type: "tween",
                          ease: "easeInOut",
                          duration: 0.3,
                        }}
                      />
                    </Button>
                  </SplitTextReveal>
                  <ParallaxImage className="mx-auto">
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-red-500/20 rounded-lg blur-xl"></div>
                      <Lottie
                        animationData={PatientCareAnimation}
                        loop
                        className="relative z-10 rounded-lg h-[300px] w-[400px]"
                      />
                    </div>
                  </ParallaxImage>
                </div>
              </TabsContent>
              <TabsContent value="investors" className="mt-6">
                <div className="grid gap-6 lg:grid-cols-2 items-center">
                  <SplitTextReveal className="space-y-4">
                    <h3 className="text-2xl font-bold text-white">
                      Investment Opportunity
                    </h3>
                    <p className="text-gray-400">
                      Join us in revolutionizing dementia care. With a growing
                      aging population and increasing dementia diagnoses
                      worldwide, MemoTag addresses a critical and expanding
                      market need.
                    </p>
                    <Button
                      className="bg-red-500 hover:bg-red-600 text-white group relative overflow-hidden"
                      onMouseEnter={() => setCursorHovered(true)}
                      onMouseLeave={() => setCursorHovered(false)}
                    >
                      <span className="relative z-10">Download Pitch Deck</span>
                      <motion.div
                        className="absolute inset-0 bg-red-600"
                        initial={{ x: "-100%" }}
                        whileHover={{ x: 0 }}
                        transition={{
                          type: "tween",
                          ease: "easeInOut",
                          duration: 0.3,
                        }}
                      />
                    </Button>
                  </SplitTextReveal>
                  <ParallaxImage className="mx-auto">
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-red-500/20 rounded-lg blur-xl"></div>
                      <Lottie
                        animationData={investmentAnimation}
                        loop
                        className="relative z-10 rounded-lg h-[300px] w-[400px]"
                      />
                    </div>
                  </ParallaxImage>
                </div>
              </TabsContent>
            </Tabs>
          </SplitTextReveal>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-12 md:py-24 bg-[#121420] relative">
        <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-[120px] -z-10 -translate-x-1/3 -translate-y-1/3"></div>

        <div className="container px-4 md:px-6">
          <SplitTextReveal className="mx-auto max-w-3xl text-center space-y-4">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-white">
              Get In Touch
            </h2>
            <p className="text-gray-400 md:text-xl/relaxed">
              Have questions about MemoTag? We're here to help. Reach out to our
              team.
            </p>
          </SplitTextReveal>
          <div className="mx-auto max-w-lg mt-12">
            <ContactForm setCursorHovered={setCursorHovered} />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0F111A] text-white py-12">
        <div className="container px-4 md:px-6">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div>
              <h3 className="text-lg font-bold mb-4 text-white">MemoTag</h3>
              <p className="text-gray-400">
                Empowering memory care through innovative technology.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4 text-white">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="#"
                    className="text-gray-400 hover:text-red-400 transition-colors duration-200 relative group"
                    onMouseEnter={() => setCursorHovered(true)}
                    onMouseLeave={() => setCursorHovered(false)}
                  >
                    About Us
                    <motion.span
                      className="absolute left-0 bottom-0 w-0 h-0.5 bg-red-500 group-hover:w-full"
                      transition={{ duration: 0.3 }}
                    />
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-gray-400 hover:text-red-400 transition-colors duration-200 relative group"
                    onMouseEnter={() => setCursorHovered(true)}
                    onMouseLeave={() => setCursorHovered(false)}
                  >
                    Our Technology
                    <motion.span
                      className="absolute left-0 bottom-0 w-0 h-0.5 bg-red-500 group-hover:w-full"
                      transition={{ duration: 0.3 }}
                    />
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-gray-400 hover:text-red-400 transition-colors duration-200 relative group"
                    onMouseEnter={() => setCursorHovered(true)}
                    onMouseLeave={() => setCursorHovered(false)}
                  >
                    For Caregivers
                    <motion.span
                      className="absolute left-0 bottom-0 w-0 h-0.5 bg-red-500 group-hover:w-full"
                      transition={{ duration: 0.3 }}
                    />
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-gray-400 hover:text-red-400 transition-colors duration-200 relative group"
                    onMouseEnter={() => setCursorHovered(true)}
                    onMouseLeave={() => setCursorHovered(false)}
                  >
                    For Healthcare
                    <motion.span
                      className="absolute left-0 bottom-0 w-0 h-0.5 bg-red-500 group-hover:w-full"
                      transition={{ duration: 0.3 }}
                    />
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4 text-white">Resources</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="#"
                    className="text-gray-400 hover:text-red-400 transition-colors duration-200 relative group"
                    onMouseEnter={() => setCursorHovered(true)}
                    onMouseLeave={() => setCursorHovered(false)}
                  >
                    Blog
                    <motion.span
                      className="absolute left-0 bottom-0 w-0 h-0.5 bg-red-500 group-hover:w-full"
                      transition={{ duration: 0.3 }}
                    />
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-gray-400 hover:text-red-400 transition-colors duration-200 relative group"
                    onMouseEnter={() => setCursorHovered(true)}
                    onMouseLeave={() => setCursorHovered(false)}
                  >
                    Research
                    <motion.span
                      className="absolute left-0 bottom-0 w-0 h-0.5 bg-red-500 group-hover:w-full"
                      transition={{ duration: 0.3 }}
                    />
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-gray-400 hover:text-red-400 transition-colors duration-200 relative group"
                    onMouseEnter={() => setCursorHovered(true)}
                    onMouseLeave={() => setCursorHovered(false)}
                  >
                    Press
                    <motion.span
                      className="absolute left-0 bottom-0 w-0 h-0.5 bg-red-500 group-hover:w-full"
                      transition={{ duration: 0.3 }}
                    />
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-gray-400 hover:text-red-400 transition-colors duration-200 relative group"
                    onMouseEnter={() => setCursorHovered(true)}
                    onMouseLeave={() => setCursorHovered(false)}
                  >
                    FAQ
                    <motion.span
                      className="absolute left-0 bottom-0 w-0 h-0.5 bg-red-500 group-hover:w-full"
                      transition={{ duration: 0.3 }}
                    />
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4 text-white">Contact</h3>
              <address className="not-italic text-gray-400">
                <p>123 Memory Lane</p>
                <p>San Francisco, CA 94103</p>
                <p className="mt-2">info@memotag.com</p>
                <p>(555) 123-4567</p>
              </address>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-white/10 text-center text-gray-400">
            <p>
              &copy; {new Date().getFullYear()} MemoTag. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function Header({
  menuOpen,
  setMenuOpen,
}: {
  menuOpen: boolean;
  setMenuOpen: (open: boolean) => void;
}) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      className={`sticky top-0 z-40 w-full border-b transition-all duration-300 ${
        scrolled
          ? "border-white/10 bg-[#121420]/80 backdrop-blur-sm"
          : "border-transparent bg-transparent"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2 group">
          <motion.div
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
          >
            <Brain className="h-6 w-6 text-red-500" />
          </motion.div>
          <motion.span
            className="text-lg font-bold text-white"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            MemoTag
          </motion.span>
        </Link>
        <nav className="hidden md:flex gap-6">
          <NavLink href="#">About</NavLink>
          <NavLink href="#">Technology</NavLink>
          <NavLink href="#">For Caregivers</NavLink>
          <NavLink href="#">For Healthcare</NavLink>
          <NavLink href="#">Contact</NavLink>
        </nav>
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            className="text-white hover:bg-white/10 relative overflow-hidden group"
          >
            <span className="relative z-10">Sign In</span>
            <motion.div
              className="absolute inset-0 bg-white/5"
              initial={{ scale: 0, borderRadius: "100%" }}
              whileHover={{ scale: 1.5, borderRadius: "0%" }}
              transition={{ duration: 0.5 }}
            />
          </Button>
          <Button className="bg-red-500 hover:bg-red-600 text-white group relative overflow-hidden">
            <span className="relative z-10">Get Started</span>
            <motion.div
              className="absolute inset-0 bg-red-600"
              initial={{ x: "-100%" }}
              whileHover={{ x: 0 }}
              transition={{ type: "tween", ease: "easeInOut", duration: 0.3 }}
            />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="md:hidden border-white/10 text-white"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle menu</span>
          </Button>
        </div>
      </div>
    </motion.header>
  );
}

function NavLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="text-gray-400 hover:text-white transition-colors duration-200 relative group"
    >
      {children}
      <motion.span
        className="absolute left-0 bottom-0 w-0 h-0.5 bg-red-500"
        initial={{ width: 0 }}
        whileHover={{ width: "100%" }}
        transition={{ duration: 0.3 }}
      />
    </Link>
  );
}

function MobileNavLink({
  href,
  children,
  onClick,
}: {
  href: string;
  children: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Link
        href={href}
        className="text-2xl font-bold text-white hover:text-red-400 transition-colors duration-200"
        onClick={onClick}
      >
        {children}
      </Link>
    </motion.div>
  );
}

function SplitTextReveal({
  className,
  children,
  delay = 0,
  onMouseEnter,
  onMouseLeave,
}: {
  className?: string;
  children: React.ReactNode;
  delay?: number;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}) {
  const controls = useAnimation();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: { staggerChildren: 0.05, delayChildren: delay },
        },
      }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {children}
    </motion.div>
  );
}

function FloatingElement({
  className,
  children,
  delay = 0,
}: {
  className?: string;
  children: React.ReactNode;
  delay?: number;
}) {
  const controls = useAnimation();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, scale: 0.95 },
        visible: {
          opacity: 1,
          scale: 1,
          transition: { duration: 0.6, delay },
        },
      }}
    >
      <motion.div
        animate={{
          y: [0, -15, 0],
        }}
        transition={{
          duration: 6,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
          ease: "easeInOut",
        }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

function ParallaxCard({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay }}
      style={{ y, opacity }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function ParallaxImage({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [30, -30]);

  return (
    <motion.div ref={ref} className={className} style={{ y }}>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

function TiltCard({
  children,
  className,
  onMouseEnter,
  onMouseLeave,
}: {
  children: React.ReactNode;
  className?: string;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.02 }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {children}
    </motion.div>
  );
}

function CounterCard({
  value,
  suffix,
  color,
  description,
  onMouseEnter,
  onMouseLeave,
}: {
  value: number;
  suffix: string;
  color: string;
  description: string;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}) {
  const [count, setCount] = useState(0);
  const controls = useAnimation();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (inView) {
      controls.start("visible");

      const duration = 2000;
      const startTime = Date.now();

      const updateCount = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        setCount(Math.floor(progress * value));

        if (progress < 1) {
          requestAnimationFrame(updateCount);
        }
      };

      requestAnimationFrame(updateCount);
    }
  }, [controls, inView, value]);

  return (
    <motion.div
      ref={ref}
      className="text-center p-6 rounded-lg border border-white/10 bg-white/5 backdrop-blur-sm"
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.5 },
        },
      }}
      whileHover={{ scale: 1.05 }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className={`text-4xl font-bold ${color}`}>
        {count}
        {suffix}
      </div>
      <p className="mt-2 text-gray-300">{description}</p>
    </motion.div>
  );
}

function ContactForm({
  setCursorHovered,
}: {
  setCursorHovered: (hovered: boolean) => void;
}) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    type: "general",
  });
  const [formStatus, setFormStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus("loading");

    try {
      await submitContactForm(formData);
      setFormStatus("success");
      setFormData({
        name: "",
        email: "",
        message: "",
        type: "general",
      });
    } catch (error) {
      console.error("Unable to connect to Supabase", error);
      setFormStatus("error");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <label
            htmlFor="name"
            className="text-sm font-medium leading-none text-white peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Name
          </label>
          <Input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-red-500 transition-all duration-300"
            onMouseEnter={() => setCursorHovered(true)}
            onMouseLeave={() => setCursorHovered(false)}
          />
        </div>
        <div className="space-y-2">
          <label
            htmlFor="email"
            className="text-sm font-medium leading-none text-white peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Email
          </label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-red-500 transition-all duration-300"
            onMouseEnter={() => setCursorHovered(true)}
            onMouseLeave={() => setCursorHovered(false)}
          />
        </div>
      </div>
      <div className="space-y-2">
        <label
          htmlFor="type"
          className="text-sm font-medium leading-none text-white peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Inquiry Type
        </label>
        <select
          id="type"
          name="type"
          value={formData.type}
          onChange={handleChange}
          className="flex h-10 w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm text-white ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-300"
          onMouseEnter={() => setCursorHovered(true)}
          onMouseLeave={() => setCursorHovered(false)}
        >
          <option value="general">General Inquiry</option>
          <option value="caregiver">Caregiver Support</option>
          <option value="healthcare">Healthcare Professional</option>
          <option value="investor">Investor Relations</option>
        </select>
      </div>
      <div className="space-y-2">
        <label
          htmlFor="message"
          className="text-sm font-medium leading-none text-white peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Message
        </label>
        <Textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          className="min-h-[120px] bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-red-500 transition-all duration-300"
          onMouseEnter={() => setCursorHovered(true)}
          onMouseLeave={() => setCursorHovered(false)}
        />
      </div>
      <Button
        type="submit"
        className="w-full bg-red-500 hover:bg-red-600 text-white group relative overflow-hidden"
        disabled={formStatus === "loading"}
        onMouseEnter={() => setCursorHovered(true)}
        onMouseLeave={() => setCursorHovered(false)}
      >
        <span className="relative z-10">
          {formStatus === "loading" ? "Sending..." : "Send Message"}
        </span>
        <motion.div
          className="absolute inset-0 bg-red-600"
          initial={{ x: "-100%" }}
          whileHover={{ x: 0 }}
          transition={{ type: "tween", ease: "easeInOut", duration: 0.3 }}
        />
      </Button>
      {formStatus === "success" && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-green-400 text-sm text-center"
        >
          Thank you for your message! We'll be in touch soon.
        </motion.p>
      )}
      {formStatus === "error" && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-red-400 text-sm text-center"
        >
          There was an error sending your message. Please try again.
        </motion.p>
      )}
    </form>
  );
}
