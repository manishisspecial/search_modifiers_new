"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Bell,
  Shield,
  Palette,
  Globe,
  KeyRound,
  ChevronRight,
  Moon,
  Sun,
  Monitor,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/theme-provider";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function SettingsPage() {
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    updates: true,
  });
  const { theme, setTheme } = useTheme();

  const settingSections = [
    {
      title: "Account",
      items: [
        {
          icon: KeyRound,
          label: "Change Password",
          description: "Update your password",
          href: "/admin/change-password",
        },
        {
          icon: Shield,
          label: "Security",
          description: "Manage security settings",
          href: "#",
        },
      ],
    },
    {
      title: "Preferences",
      items: [
        {
          icon: Globe,
          label: "Language",
          description: "English (US)",
          href: "#",
        },
      ],
    },
  ];

  return (
    <div className="p-6 md:p-8 max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold font-display text-foreground mb-2">
          Settings
        </h1>
        <p className="text-muted">Manage your account and preferences</p>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-6"
      >
        {/* Theme Selection */}
        <motion.div variants={itemVariants} className="glass rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-xl bg-purple-500/10">
              <Palette className="w-5 h-5 text-purple-500" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Appearance</h3>
              <p className="text-sm text-muted">Customize how the dashboard looks</p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            {[
              { value: "light", label: "Light", icon: Sun },
              { value: "dark", label: "Dark", icon: Moon },
              { value: "system", label: "System", icon: Monitor },
            ].map((option) => (
              <motion.button
                key={option.value}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setTheme(option.value as typeof theme)}
                className={`p-4 rounded-xl border transition-all flex flex-col items-center gap-2 ${
                  theme === option.value
                    ? "border-orange-500 bg-orange-500/10"
                    : "border-border bg-surface hover:border-orange-500/50"
                }`}
              >
                <option.icon
                  className={`w-5 h-5 ${
                    theme === option.value ? "text-orange-500" : "text-muted"
                  }`}
                />
                <span
                  className={`text-sm font-medium ${
                    theme === option.value ? "text-orange-500" : "text-foreground"
                  }`}
                >
                  {option.label}
                </span>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Notifications */}
        <motion.div variants={itemVariants} className="glass rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-xl bg-blue-500/10">
              <Bell className="w-5 h-5 text-blue-500" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Notifications</h3>
              <p className="text-sm text-muted">Manage your notification preferences</p>
            </div>
          </div>

          <div className="space-y-4">
            {[
              {
                key: "email",
                label: "Email Notifications",
                description: "Receive notifications via email",
              },
              {
                key: "push",
                label: "Push Notifications",
                description: "Receive push notifications in browser",
              },
              {
                key: "updates",
                label: "Product Updates",
                description: "Get notified about new features",
              },
            ].map((item) => (
              <div
                key={item.key}
                className="flex items-center justify-between p-4 rounded-xl bg-surface"
              >
                <div>
                  <p className="font-medium text-foreground">{item.label}</p>
                  <p className="text-sm text-muted">{item.description}</p>
                </div>
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={() =>
                    setNotifications({
                      ...notifications,
                      [item.key]: !notifications[item.key as keyof typeof notifications],
                    })
                  }
                  className={`relative w-12 h-6 rounded-full transition-colors ${
                    notifications[item.key as keyof typeof notifications]
                      ? "bg-orange-500"
                      : "bg-border"
                  }`}
                >
                  <motion.div
                    layout
                    className="absolute top-1 left-1 w-4 h-4 bg-white rounded-full shadow-sm"
                    animate={{
                      x: notifications[item.key as keyof typeof notifications] ? 24 : 0,
                    }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                </motion.button>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Settings Links */}
        {settingSections.map((section) => (
          <motion.div
            key={section.title}
            variants={itemVariants}
            className="glass rounded-2xl p-6"
          >
            <h3 className="font-semibold text-foreground mb-4">{section.title}</h3>
            <div className="space-y-2">
              {section.items.map((item) => (
                <Link key={item.label} href={item.href}>
                  <motion.div
                    whileHover={{ x: 4 }}
                    className="flex items-center justify-between p-4 rounded-xl bg-surface hover:bg-surface-hover transition-colors cursor-pointer group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-surface-hover group-hover:bg-orange-500/10 transition-colors">
                        <item.icon className="w-5 h-5 text-muted group-hover:text-orange-500 transition-colors" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{item.label}</p>
                        <p className="text-sm text-muted">{item.description}</p>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-muted group-hover:text-foreground transition-colors" />
                  </motion.div>
                </Link>
              ))}
            </div>
          </motion.div>
        ))}

        {/* Danger Zone */}
        <motion.div
          variants={itemVariants}
          className="glass rounded-2xl p-6 border border-red-500/20"
        >
          <h3 className="font-semibold text-red-500 mb-2">Danger Zone</h3>
          <p className="text-sm text-muted mb-4">
            Irreversible and destructive actions
          </p>
          <Button variant="outline" className="border-red-500/50 text-red-500 hover:bg-red-500/10">
            Delete Account
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
}
