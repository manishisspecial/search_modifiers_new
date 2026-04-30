"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { ChevronDown, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const navigation = [
  { label: "Dashboard", href: "/admin", icon: "📊" },
  { label: "Services", href: "/admin/services", icon: "🔧" },
  { label: "Blog", href: "/admin/blog", icon: "📝" },
  { label: "Case Studies", href: "/admin/case-studies", icon: "📈" },
  { label: "Testimonials", href: "/admin/testimonials", icon: "⭐" },
  { label: "Locations", href: "/admin/locations", icon: "📍" },
  { label: "Static Pages", href: "/admin/static-pages", icon: "📄" },
  { label: "Site Settings", href: "/admin/site-settings", icon: "⚙️" },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/admin") {
      return pathname === "/admin";
    }
    return pathname.startsWith(href);
  };

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? "w-64" : "w-20"
        } border-r border-border bg-card transition-all duration-300 flex flex-col fixed h-full left-0 top-0 z-40`}
      >
        {/* Header */}
        <div className="h-16 border-b border-border flex items-center justify-between px-4">
          {sidebarOpen && (
            <Link href="/admin" className="font-display font-bold text-foreground">
              <span className="text-brand">SM</span> Admin
            </Link>
          )}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 hover:bg-surface rounded-lg transition-colors"
          >
            {sidebarOpen ? (
              <X className="w-5 h-5 text-foreground" />
            ) : (
              <Menu className="w-5 h-5 text-foreground" />
            )}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                isActive(item.href)
                  ? "bg-brand/20 text-brand font-medium"
                  : "text-muted hover:bg-surface hover:text-foreground"
              }`}
            >
              <span className="text-lg">{item.icon}</span>
              {sidebarOpen && <span className="text-sm">{item.label}</span>}
            </Link>
          ))}
        </nav>

        {/* Footer */}
        <div className="border-t border-border p-4">
          {sidebarOpen && (
            <button
              onClick={() => signOut()}
              className="w-full px-3 py-2 rounded-lg text-sm text-muted hover:bg-surface hover:text-foreground transition-colors text-left"
            >
              Sign out
            </button>
          )}
        </div>
      </aside>

      {/* Main Content */}
      <main
        className={`${
          sidebarOpen ? "ml-64" : "ml-20"
        } flex-1 overflow-auto transition-all duration-300`}
      >
        <div className="h-full bg-background">{children}</div>
      </main>
    </div>
  );
}
