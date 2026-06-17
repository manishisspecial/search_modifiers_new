"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Briefcase,
  FileText,
  FolderKanban,
  Star,
  MapPin,
  Plus,
  Settings,
  TrendingUp,
  Sparkles,
  ArrowRight,
  Activity,
  Bell,
} from "lucide-react";

interface Stats {
  services: number;
  blogPosts: number;
  caseStudies: number;
  testimonials: number;
  locations: number;
  cityPages: number;
  careerLeads: number;
}

function AnimatedCounter({ value, duration = 1.5 }: { value: number; duration?: number }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(easeOutQuart * value));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [value, duration]);

  return <span>{count}</span>;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
    },
  },
};

const cardHoverVariants = {
  rest: { scale: 1, y: 0 },
  hover: {
    scale: 1.02,
    y: -4,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 25,
    },
  },
};

const iconContainerVariants = {
  rest: { rotate: 0 },
  hover: {
    rotate: [0, -10, 10, -5, 5, 0],
    transition: { duration: 0.5 },
  },
};

const pulseVariants = {
  initial: { scale: 1, opacity: 0.5 },
  animate: {
    scale: [1, 1.2, 1],
    opacity: [0.5, 0.8, 0.5],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

const floatingVariants = {
  initial: { y: 0 },
  animate: {
    y: [-5, 5, -5],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({
    services: 0,
    blogPosts: 0,
    caseStudies: 0,
    testimonials: 0,
    locations: 0,
    cityPages: 0,
    careerLeads: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [greeting, setGreeting] = useState("Welcome back");

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Good morning");
    else if (hour < 17) setGreeting("Good afternoon");
    else setGreeting("Good evening");
  }, []);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch("/api/admin/stats");
        const data = await response.json();
        setStats(data);
      } catch {
        console.error("Failed to fetch stats");
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
  }, []);

  const statCards = [
    {
      label: "Services",
      value: stats.services,
      href: "/admin/services",
      icon: Briefcase,
      gradient: "from-blue-500 via-blue-600 to-indigo-600",
      bgGlow: "bg-blue-500/20",
      iconBg: "bg-blue-500/10",
      description: "Active services",
    },
    {
      label: "Blog Posts",
      value: stats.blogPosts,
      href: "/admin/blog",
      icon: FileText,
      gradient: "from-violet-500 via-purple-600 to-fuchsia-600",
      bgGlow: "bg-purple-500/20",
      iconBg: "bg-purple-500/10",
      description: "Published articles",
    },
    {
      label: "Case Studies",
      value: stats.caseStudies,
      href: "/admin/case-studies",
      icon: FolderKanban,
      gradient: "from-emerald-500 via-green-600 to-teal-600",
      bgGlow: "bg-emerald-500/20",
      iconBg: "bg-emerald-500/10",
      description: "Success stories",
    },
    {
      label: "Testimonials",
      value: stats.testimonials,
      href: "/admin/testimonials",
      icon: Star,
      gradient: "from-amber-500 via-orange-500 to-rose-500",
      bgGlow: "bg-amber-500/20",
      iconBg: "bg-amber-500/10",
      description: "Client reviews",
    },
    {
      label: "Country Pages",
      value: stats.locations,
      href: "/admin/locations",
      icon: MapPin,
      gradient: "from-rose-500 via-pink-600 to-purple-600",
      bgGlow: "bg-rose-500/20",
      iconBg: "bg-rose-500/10",
      description: "Country pages",
    },
    {
      label: "City Pages",
      value: stats.cityPages,
      href: "/admin/city-pages",
      icon: MapPin,
      gradient: "from-sky-500 via-cyan-600 to-teal-600",
      bgGlow: "bg-sky-500/20",
      iconBg: "bg-sky-500/10",
      description: "City pages",
    },
    {
      label: "Career Leads",
      value: stats.careerLeads,
      href: "/admin/career-leads",
      icon: Bell,
      gradient: "from-pink-500 via-rose-500 to-red-500",
      bgGlow: "bg-pink-500/20",
      iconBg: "bg-pink-500/10",
      description: "Applications received",
    },
  ];

  const quickActions = [
    { label: "Add Service", href: "/admin/services/new", icon: Briefcase, color: "from-blue-500 to-indigo-600" },
    { label: "Add Blog Post", href: "/admin/blog/new", icon: FileText, color: "from-violet-500 to-purple-600" },
    { label: "Add Case Study", href: "/admin/case-studies/new", icon: FolderKanban, color: "from-emerald-500 to-teal-600" },
    { label: "Add Testimonial", href: "/admin/testimonials/new", icon: Star, color: "from-amber-500 to-orange-500" },
    { label: "Add Country Page", href: "/admin/locations/new", icon: MapPin, color: "from-rose-500 to-pink-600" },
    { label: "Add City Page", href: "/admin/city-pages/new", icon: MapPin, color: "from-sky-500 to-teal-600" },
    { label: "Site Settings", href: "/admin/site-settings", icon: Settings, color: "from-slate-500 to-slate-700", isOutline: true },
  ];

  return (
    <div className="min-h-screen p-6 md:p-8 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-gradient-to-br from-orange-500/10 via-amber-500/5 to-transparent blur-3xl"
          variants={floatingVariants}
          initial="initial"
          animate="animate"
        />
        <motion.div
          className="absolute top-1/2 -left-20 w-60 h-60 rounded-full bg-gradient-to-br from-blue-500/10 via-indigo-500/5 to-transparent blur-3xl"
          variants={floatingVariants}
          initial="initial"
          animate="animate"
          style={{ animationDelay: "1s" }}
        />
        <motion.div
          className="absolute -bottom-20 right-1/3 w-72 h-72 rounded-full bg-gradient-to-br from-purple-500/10 via-pink-500/5 to-transparent blur-3xl"
          variants={floatingVariants}
          initial="initial"
          animate="animate"
          style={{ animationDelay: "2s" }}
        />
      </div>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="mb-10 relative"
      >
        <div className="flex items-center gap-3 mb-3">
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.2 }}
            className="p-2.5 rounded-xl bg-gradient-to-br from-orange-500/20 to-amber-500/10 backdrop-blur-sm"
          >
            <Sparkles className="w-6 h-6 text-orange-500" />
          </motion.div>
          <motion.span
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="text-sm font-medium text-muted flex items-center gap-2"
          >
            <Activity className="w-4 h-4" />
            Dashboard Overview
          </motion.span>
        </div>
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="text-4xl md:text-5xl font-bold font-display text-foreground mb-3"
        >
          {greeting},{" "}
          <span className="bg-gradient-to-r from-orange-500 via-amber-500 to-rose-500 bg-clip-text text-transparent">
            Admin
          </span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="text-muted text-lg"
        >
          Manage your content and monitor your site performance
        </motion.p>
      </motion.div>

      {/* Stats Cards */}
      <AnimatePresence mode="wait">
        {isLoading ? (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-10"
          >
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="glass rounded-2xl p-6 h-36 relative overflow-hidden"
              >
                <div className="absolute inset-0 shimmer-border" />
                <div className="h-4 w-20 bg-surface rounded-lg mb-4 animate-pulse" />
                <div className="h-10 w-16 bg-surface rounded-lg animate-pulse" />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            key="stats"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-10"
          >
            {statCards.map((card, index) => {
              const Icon = card.icon;
              return (
                <motion.div key={card.href} variants={itemVariants}>
                  <Link href={card.href}>
                    <motion.div
                      variants={cardHoverVariants}
                      initial="rest"
                      whileHover="hover"
                      className="glass rounded-2xl p-5 h-full cursor-pointer relative overflow-hidden group"
                    >
                      {/* Background glow effect */}
                      <motion.div
                        className={`absolute -top-10 -right-10 w-32 h-32 rounded-full ${card.bgGlow} blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                      />

                      {/* Animated border on hover */}
                      <motion.div
                        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        style={{
                          background: `linear-gradient(135deg, transparent, rgba(249,115,22,0.1), transparent)`,
                        }}
                      />

                      <div className="relative z-10">
                        <div className="flex items-center justify-between mb-3">
                          <p className="text-sm font-medium text-muted group-hover:text-foreground transition-colors">
                            {card.label}
                          </p>
                          <motion.div
                            variants={iconContainerVariants}
                            className={`p-2 rounded-lg ${card.iconBg} transition-colors`}
                          >
                            <Icon className={`w-4 h-4 bg-gradient-to-r ${card.gradient} bg-clip-text`} style={{ color: 'currentColor' }} />
                          </motion.div>
                        </div>

                        <div className="flex items-end justify-between">
                          <div>
                            <p className={`text-4xl font-bold bg-gradient-to-r ${card.gradient} bg-clip-text text-transparent`}>
                              <AnimatedCounter value={card.value} duration={1 + index * 0.2} />
                            </p>
                            <p className="text-xs text-muted mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
                              {card.description}
                            </p>
                          </div>

                          <motion.div
                            initial={{ opacity: 0, x: -10 }}
                            whileHover={{ x: 0 }}
                            className="opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <ArrowRight className="w-4 h-4 text-muted" />
                          </motion.div>
                        </div>
                      </div>

                      {/* Pulse indicator for active items */}
                      {card.value > 0 && (
                        <motion.div
                          variants={pulseVariants}
                          initial="initial"
                          animate="animate"
                          className={`absolute top-3 right-3 w-2 h-2 rounded-full bg-gradient-to-r ${card.gradient}`}
                        />
                      )}
                    </motion.div>
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        className="glass rounded-3xl p-6 md:p-8 border border-border relative overflow-hidden"
      >
        {/* Section background decoration */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-orange-500/5 to-transparent rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-6">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", delay: 0.6 }}
              className="p-2.5 rounded-xl bg-gradient-to-br from-orange-500 to-amber-500 shadow-lg shadow-orange-500/25"
            >
              <TrendingUp className="w-5 h-5 text-white" />
            </motion.div>
            <div>
              <h2 className="text-2xl font-bold font-display text-foreground">
                Quick Actions
              </h2>
              <p className="text-sm text-muted">Create and manage your content</p>
            </div>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {quickActions.map((action, index) => {
              const Icon = action.icon;
              return (
                <motion.div key={action.href} variants={itemVariants}>
                  <Link href={action.href}>
                    <motion.button
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      className={`w-full group relative overflow-hidden rounded-2xl p-4 transition-all duration-300 ${
                        action.isOutline
                          ? "bg-surface border border-border hover:border-orange-400/40 hover:bg-surface-hover"
                          : `bg-gradient-to-r ${action.color} text-white shadow-lg hover:shadow-xl`
                      }`}
                    >
                      {/* Shimmer effect for primary buttons */}
                      {!action.isOutline && (
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"
                        />
                      )}

                      <div className="relative z-10 flex items-center gap-3">
                        <div className={`p-2 rounded-xl ${
                          action.isOutline 
                            ? "bg-surface-hover" 
                            : "bg-white/20"
                        }`}>
                          <Icon className={`w-5 h-5 ${action.isOutline ? "text-foreground" : "text-white"}`} />
                        </div>
                        <div className="flex-1 text-left">
                          <div className="flex items-center gap-2">
                            {!action.isOutline && (
                              <Plus className="w-4 h-4" />
                            )}
                            <span className="font-semibold">{action.label}</span>
                          </div>
                        </div>
                        <motion.div
                          initial={{ x: 0 }}
                          whileHover={{ x: 4 }}
                          transition={{ type: "spring", stiffness: 400 }}
                        >
                          <ArrowRight className={`w-5 h-5 opacity-50 group-hover:opacity-100 transition-opacity ${
                            action.isOutline ? "text-muted" : "text-white"
                          }`} />
                        </motion.div>
                      </div>
                    </motion.button>
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </motion.div>

      {/* Bottom Stats Summary */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm text-muted"
      >
        <div className="flex items-center gap-2">
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-2 h-2 rounded-full bg-emerald-500"
          />
          <span>System Online</span>
        </div>
        <div className="flex items-center gap-2">
          <span>Total Content:</span>
          <span className="font-semibold text-foreground">
            {stats.services + stats.blogPosts + stats.caseStudies + stats.testimonials + stats.locations + stats.cityPages} items
          </span>
        </div>
      </motion.div>
    </div>
  );
}
