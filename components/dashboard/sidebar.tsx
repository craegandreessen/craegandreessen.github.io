"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Trophy, LayoutDashboard, Calendar, Target, Shield, Bell, Settings } from "lucide-react";
import { cn } from "@/lib/utils";

interface SidebarProps {
  profile: any;
}

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Deadlines", href: "/dashboard/deadlines", icon: Calendar },
  { name: "Applications", href: "/dashboard/applications", icon: Target },
  { name: "Points", href: "/dashboard/points", icon: Trophy },
  { name: "Credentials", href: "/dashboard/credentials", icon: Shield },
  { name: "Notifications", href: "/dashboard/notifications", icon: Bell },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
];

export default function DashboardSidebar({ profile }: SidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="fixed inset-y-0 left-0 z-50 hidden w-64 flex-col border-r border-hunter-charcoal-800/50 bg-hunter-charcoal-950/80 backdrop-blur-sm lg:flex">
        {/* Logo */}
        <div className="flex h-16 items-center gap-2 border-b border-hunter-charcoal-800/50 px-6">
          <Trophy className="h-8 w-8 text-hunter-bronze" />
          <span className="font-display text-2xl font-bold text-hunter-bronze">HuntFlow</span>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 p-4">
          {navigation.map((item) => {
            const isActive = pathname === item.href || pathname?.startsWith(`${item.href}/`);
            const Icon = item.icon;

            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-all",
                  isActive
                    ? "bg-hunter-bronze/10 text-hunter-bronze ring-2 ring-hunter-bronze/20"
                    : "text-hunter-charcoal-300 hover:bg-hunter-charcoal-900 hover:text-white"
                )}
              >
                <Icon className="h-5 w-5" />
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* User Info */}
        <div className="border-t border-hunter-charcoal-800/50 p-4">
          <div className="rounded-lg bg-hunter-charcoal-900/50 p-3">
            <div className="text-sm font-medium text-white">{profile?.full_name || "Hunter"}</div>
            <div className="mt-1 text-xs text-hunter-charcoal-500">
              {profile?.subscription_tier === "free" ? "Free Plan" : profile?.subscription_tier}
            </div>
            {profile?.subscription_tier === "free" && (
              <Link
                href="/dashboard/settings/subscription"
                className="mt-2 block rounded-md bg-hunter-bronze px-3 py-1.5 text-center text-xs font-semibold text-white transition-colors hover:bg-hunter-bronze-600"
              >
                Upgrade to Premium
              </Link>
            )}
          </div>
        </div>
      </aside>

      {/* Mobile Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 flex border-t border-hunter-charcoal-800/50 bg-hunter-charcoal-950/95 backdrop-blur-sm lg:hidden">
        {navigation.slice(0, 5).map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex flex-1 flex-col items-center justify-center gap-1 py-3 text-xs font-medium",
                isActive ? "text-hunter-bronze" : "text-hunter-charcoal-400"
              )}
            >
              <Icon className="h-5 w-5" />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>
    </>
  );
}
