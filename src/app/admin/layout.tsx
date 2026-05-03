"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  Briefcase,
  FileText,
  FolderKanban,
  Star,
  MapPin,
  FileStack,
  Settings,
  LogOut,
  Menu,
  X,
  ChevronRight,
  Sparkles,
  User,
  KeyRound,
  Bell,
  ChevronDown,
  Users,
  GraduationCap,
  HelpCircle,
  Image,
  Navigation2,
  Award,
  FileCode,
  ArrowRightLeft,
  Search,
} from "lucide-react";

const navigation = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Services", href: "/admin/services", icon: Briefcase },
  { label: "Blog", href: "/admin/blog", icon: FileText },
  { label: "Case Studies", href: "/admin/case-studies", icon: FolderKanban },
  { label: "Testimonials", href: "/admin/testimonials", icon: Star },
  { label: "Locations", href: "/admin/locations", icon: MapPin },
  { label: "Static Pages", href: "/admin/static-pages", icon: FileStack },
  { label: "Team", href: "/admin/team", icon: Users },
  { label: "Careers", href: "/admin/careers", icon: GraduationCap },
  { label: "FAQ", href: "/admin/faq", icon: HelpCircle },
  { label: "Portfolio", href: "/admin/portfolio", icon: Image },
  { label: "Navigation", href: "/admin/navigation", icon: Navigation2 },
  { label: "Trust Badges", href: "/admin/trust-badges", icon: Award },
  { label: "Footer Ratings", href: "/admin/footer-ratings", icon: Star },
  { label: "Page Content", href: "/admin/page-content", icon: FileCode },
  { label: "Redirects", href: "/admin/redirects", icon: ArrowRightLeft },
  { label: "SEO Tools", href: "/admin/seo", icon: Search },
  { label: "Site Settings", href: "/admin/site-settings", icon: Settings },
];

const sidebarVariants = {
  expanded: {
    width: 280,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 30,
    },
  },
  collapsed: {
    width: 80,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 30,
    },
  },
};

const navItemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: i * 0.05,
      type: "spring",
      stiffness: 100,
      damping: 15,
    },
  }),
};

const tooltipVariants = {
  hidden: { opacity: 0, x: -10, scale: 0.95 },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 25,
    },
  },
};

const dropdownVariants = {
  hidden: { opacity: 0, y: -10, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 25,
    },
  },
  exit: {
    opacity: 0,
    y: -10,
    scale: 0.95,
    transition: { duration: 0.15 },
  },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const profileMenuRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const { data: session } = useSession();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target as Node)) {
        setProfileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const isActive = (href: string) => {
    if (href === "/admin") {
      return pathname === "/admin";
    }
    return pathname.startsWith(href);
  };

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {/* Sidebar */}
      <motion.aside
        variants={sidebarVariants}
        initial={false}
        animate={sidebarOpen ? "expanded" : "collapsed"}
        className="border-r border-border bg-card/80 backdrop-blur-xl flex flex-col fixed h-full left-0 top-0 z-40 overflow-hidden"
      >
        {/* Sidebar Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-orange-500/5 via-transparent to-purple-500/5 pointer-events-none" />

        {/* Header */}
        <motion.div
          className="h-16 border-b border-border flex items-center justify-between px-4 relative"
          layout
        >
          <AnimatePresence mode="wait">
            {sidebarOpen && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
              >
                <Link
                  href="/admin"
                  className="font-display font-bold text-foreground flex items-center gap-2 group"
                >
                  <motion.div
                    whileHover={{ rotate: 180, scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="p-1.5 rounded-lg bg-gradient-to-br from-orange-500 to-amber-500 shadow-lg shadow-orange-500/20"
                  >
                    <Sparkles className="w-4 h-4 text-white" />
                  </motion.div>
                  <span>
                    <span className="bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">
                      SM
                    </span>{" "}
                    Admin
                  </span>
                </Link>
              </motion.div>
            )}
          </AnimatePresence>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2.5 hover:bg-surface rounded-xl transition-colors relative group"
          >
            <motion.div
              animate={{ rotate: sidebarOpen ? 0 : 180 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              {sidebarOpen ? (
                <X className="w-5 h-5 text-muted group-hover:text-foreground transition-colors" />
              ) : (
                <Menu className="w-5 h-5 text-muted group-hover:text-foreground transition-colors" />
              )}
            </motion.div>
          </motion.button>
        </motion.div>

        {/* Navigation */}
        <nav className="flex-1 p-3 space-y-1 overflow-y-auto overflow-x-hidden relative">
          {mounted &&
            navigation.map((item, index) => {
              const Icon = item.icon;
              const active = isActive(item.href);

              return (
                <motion.div
                  key={item.href}
                  custom={index}
                  variants={navItemVariants}
                  initial="hidden"
                  animate="visible"
                  className="relative"
                  onMouseEnter={() => setHoveredItem(item.href)}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  <Link href={item.href}>
                    <motion.div
                      whileHover={{ x: 4 }}
                      whileTap={{ scale: 0.98 }}
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 relative overflow-hidden ${
                        active
                          ? "bg-gradient-to-r from-orange-500/15 to-amber-500/10 text-foreground font-medium"
                          : "text-muted hover:bg-surface hover:text-foreground"
                      }`}
                    >
                      {/* Active indicator */}
                      {active && (
                        <motion.div
                          layoutId="activeIndicator"
                          className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 rounded-r-full bg-gradient-to-b from-orange-500 to-amber-500"
                          transition={{
                            type: "spring",
                            stiffness: 400,
                            damping: 30,
                          }}
                        />
                      )}

                      {/* Background glow on active */}
                      {active && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-transparent pointer-events-none"
                        />
                      )}

                      <motion.div
                        whileHover={{ rotate: [0, -10, 10, 0] }}
                        transition={{ duration: 0.4 }}
                        className={`relative z-10 p-1.5 rounded-lg transition-colors ${
                          active
                            ? "bg-gradient-to-br from-orange-500/20 to-amber-500/10"
                            : "bg-surface-hover group-hover:bg-surface"
                        }`}
                      >
                        <Icon
                          className={`w-4 h-4 ${
                            active ? "text-orange-500" : ""
                          }`}
                        />
                      </motion.div>

                      <AnimatePresence mode="wait">
                        {sidebarOpen && (
                          <motion.span
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -10 }}
                            transition={{ duration: 0.15 }}
                            className="text-sm whitespace-nowrap relative z-10"
                          >
                            {item.label}
                          </motion.span>
                        )}
                      </AnimatePresence>

                      {sidebarOpen && active && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="ml-auto"
                        >
                          <ChevronRight className="w-4 h-4 text-orange-500" />
                        </motion.div>
                      )}
                    </motion.div>
                  </Link>

                  {/* Tooltip for collapsed state */}
                  <AnimatePresence>
                    {!sidebarOpen && hoveredItem === item.href && (
                      <motion.div
                        variants={tooltipVariants}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        className="absolute left-full top-1/2 -translate-y-1/2 ml-3 z-50"
                      >
                        <div className="px-3 py-2 rounded-lg bg-foreground text-background text-sm font-medium whitespace-nowrap shadow-xl">
                          {item.label}
                          <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1 w-2 h-2 bg-foreground rotate-45" />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
        </nav>

        {/* Footer */}
        <motion.div
          className="border-t border-border p-3"
          layout
        >
          <motion.button
            whileHover={{ x: 4 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => signOut()}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-muted hover:bg-red-500/10 hover:text-red-500 transition-all group"
            onMouseEnter={() => setHoveredItem("logout")}
            onMouseLeave={() => setHoveredItem(null)}
          >
            <motion.div
              whileHover={{ rotate: -15 }}
              className="p-1.5 rounded-lg bg-surface-hover group-hover:bg-red-500/10 transition-colors"
            >
              <LogOut className="w-4 h-4" />
            </motion.div>
            <AnimatePresence mode="wait">
              {sidebarOpen && (
                <motion.span
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.15 }}
                  className="text-sm"
                >
                  Sign out
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>

          {/* Tooltip for logout in collapsed state */}
          <AnimatePresence>
            {!sidebarOpen && hoveredItem === "logout" && (
              <motion.div
                variants={tooltipVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                className="absolute left-full bottom-4 ml-3 z-50"
              >
                <div className="px-3 py-2 rounded-lg bg-foreground text-background text-sm font-medium whitespace-nowrap shadow-xl">
                  Sign out
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1 w-2 h-2 bg-foreground rotate-45" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.aside>

      {/* Main Content */}
      <motion.main
        initial={false}
        animate={{
          marginLeft: sidebarOpen ? 280 : 80,
        }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 30,
        }}
        className="flex-1 flex flex-col overflow-hidden"
      >
        {/* Top Header Bar */}
        <header className="h-16 border-b border-border bg-card/80 backdrop-blur-xl flex items-center justify-between px-6 sticky top-0 z-30">
          <div className="flex items-center gap-4">
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-sm text-muted"
            >
              {new Date().toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </motion.div>
          </div>

          <div className="flex items-center gap-4">
            {/* Notifications */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative p-2.5 rounded-xl hover:bg-surface transition-colors group"
            >
              <Bell className="w-5 h-5 text-muted group-hover:text-foreground transition-colors" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-orange-500 rounded-full" />
            </motion.button>

            {/* Profile Dropdown */}
            <div className="relative" ref={profileMenuRef}>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setProfileMenuOpen(!profileMenuOpen)}
                className="flex items-center gap-3 p-2 pr-3 rounded-xl hover:bg-surface transition-colors group"
              >
                <div className="relative">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center text-white font-semibold text-sm shadow-lg shadow-orange-500/20">
                    {session?.user?.name?.charAt(0)?.toUpperCase() || "A"}
                  </div>
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-card rounded-full" />
                </div>
                <div className="hidden sm:block text-left">
                  <p className="text-sm font-medium text-foreground">
                    {session?.user?.name || "Admin"}
                  </p>
                  <p className="text-xs text-muted">Administrator</p>
                </div>
                <motion.div
                  animate={{ rotate: profileMenuOpen ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronDown className="w-4 h-4 text-muted" />
                </motion.div>
              </motion.button>

              {/* Dropdown Menu */}
              <AnimatePresence>
                {profileMenuOpen && (
                  <motion.div
                    variants={dropdownVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="absolute right-0 top-full mt-2 w-64 bg-card border border-border rounded-2xl shadow-xl overflow-hidden z-50"
                  >
                    {/* User Info */}
                    <div className="p-4 border-b border-border bg-gradient-to-br from-orange-500/10 to-amber-500/5">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-orange-500/20">
                          {session?.user?.name?.charAt(0)?.toUpperCase() || "A"}
                        </div>
                        <div>
                          <p className="font-semibold text-foreground">
                            {session?.user?.name || "Admin"}
                          </p>
                          <p className="text-xs text-muted truncate max-w-[140px]">
                            {session?.user?.email || "admin@example.com"}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Menu Items */}
                    <div className="p-2">
                      <Link href="/admin/profile" onClick={() => setProfileMenuOpen(false)}>
                        <motion.div
                          whileHover={{ x: 4 }}
                          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-muted hover:bg-surface hover:text-foreground transition-colors cursor-pointer"
                        >
                          <div className="p-1.5 rounded-lg bg-surface-hover">
                            <User className="w-4 h-4" />
                          </div>
                          <span className="text-sm">My Profile</span>
                        </motion.div>
                      </Link>

                      <Link href="/admin/settings" onClick={() => setProfileMenuOpen(false)}>
                        <motion.div
                          whileHover={{ x: 4 }}
                          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-muted hover:bg-surface hover:text-foreground transition-colors cursor-pointer"
                        >
                          <div className="p-1.5 rounded-lg bg-surface-hover">
                            <Settings className="w-4 h-4" />
                          </div>
                          <span className="text-sm">Settings</span>
                        </motion.div>
                      </Link>

                      <Link href="/admin/change-password" onClick={() => setProfileMenuOpen(false)}>
                        <motion.div
                          whileHover={{ x: 4 }}
                          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-muted hover:bg-surface hover:text-foreground transition-colors cursor-pointer"
                        >
                          <div className="p-1.5 rounded-lg bg-surface-hover">
                            <KeyRound className="w-4 h-4" />
                          </div>
                          <span className="text-sm">Change Password</span>
                        </motion.div>
                      </Link>
                    </div>

                    {/* Logout */}
                    <div className="p-2 border-t border-border">
                      <motion.button
                        whileHover={{ x: 4 }}
                        onClick={() => {
                          setProfileMenuOpen(false);
                          signOut();
                        }}
                        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-muted hover:bg-red-500/10 hover:text-red-500 transition-colors"
                      >
                        <div className="p-1.5 rounded-lg bg-surface-hover group-hover:bg-red-500/10">
                          <LogOut className="w-4 h-4" />
                        </div>
                        <span className="text-sm">Sign out</span>
                      </motion.button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 overflow-auto bg-background">{children}</div>
      </motion.main>
    </div>
  );
}
