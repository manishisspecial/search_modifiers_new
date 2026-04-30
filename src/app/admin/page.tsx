"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface Stats {
  services: number;
  blogPosts: number;
  caseStudies: number;
  testimonials: number;
  locations: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({
    services: 0,
    blogPosts: 0,
    caseStudies: 0,
    testimonials: 0,
    locations: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

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
    { label: "Services", value: stats.services, href: "/admin/services", color: "from-blue-500 to-blue-600" },
    { label: "Blog Posts", value: stats.blogPosts, href: "/admin/blog", color: "from-purple-500 to-purple-600" },
    { label: "Case Studies", value: stats.caseStudies, href: "/admin/case-studies", color: "from-green-500 to-green-600" },
    { label: "Testimonials", value: stats.testimonials, href: "/admin/testimonials", color: "from-orange-500 to-orange-600" },
    { label: "Locations", value: stats.locations, href: "/admin/locations", color: "from-pink-500 to-pink-600" },
  ];

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-4xl font-bold font-display text-foreground mb-2">
          Welcome to Admin Dashboard
        </h1>
        <p className="text-muted">Manage all your content in one place</p>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="glass rounded-2xl p-6 h-32 animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          {statCards.map((card) => (
            <Link key={card.href} href={card.href}>
              <div className="glass rounded-2xl p-6 hover:shadow-lg transition-shadow cursor-pointer h-full">
                <p className="text-sm text-muted mb-2">{card.label}</p>
                <p className={`text-3xl font-bold bg-gradient-to-r ${card.color} bg-clip-text text-transparent`}>
                  {card.value}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}

      <div className="glass rounded-2xl p-6 border border-border">
        <h2 className="text-2xl font-bold font-display text-foreground mb-4">
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Link href="/admin/services/new">
            <Button variant="primary" className="w-full">
              ➕ Add Service
            </Button>
          </Link>
          <Link href="/admin/blog/new">
            <Button variant="primary" className="w-full">
              ➕ Add Blog Post
            </Button>
          </Link>
          <Link href="/admin/case-studies/new">
            <Button variant="primary" className="w-full">
              ➕ Add Case Study
            </Button>
          </Link>
          <Link href="/admin/testimonials/new">
            <Button variant="primary" className="w-full">
              ➕ Add Testimonial
            </Button>
          </Link>
          <Link href="/admin/locations/new">
            <Button variant="primary" className="w-full">
              ➕ Add Location
            </Button>
          </Link>
          <Link href="/admin/site-settings">
            <Button variant="outline" className="w-full">
              ⚙️ Site Settings
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
