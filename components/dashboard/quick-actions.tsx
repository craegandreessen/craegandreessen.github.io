"use client";

import { Plus, Calendar, Shield, TrendingUp } from "lucide-react";
import Link from "next/link";

const actions = [
  {
    icon: Plus,
    title: "New Application",
    href: "/dashboard/applications/new",
    color: "bg-hunter-bronze/10 text-hunter-bronze hover:bg-hunter-bronze/20",
  },
  {
    icon: Calendar,
    title: "View Calendar",
    href: "/dashboard/deadlines",
    color: "bg-hunter-green/10 text-hunter-green hover:bg-hunter-green/20",
  },
  {
    icon: Shield,
    title: "Add Credentials",
    href: "/dashboard/credentials/new",
    color: "bg-blue-500/10 text-blue-400 hover:bg-blue-500/20",
  },
  {
    icon: TrendingUp,
    title: "Track Points",
    href: "/dashboard/points/add",
    color: "bg-purple-500/10 text-purple-400 hover:bg-purple-500/20",
  },
];

export default function QuickActions() {
  return (
    <div className="rounded-xl border border-hunter-charcoal-800 bg-hunter-charcoal-900/50 backdrop-blur-sm">
      <div className="border-b border-hunter-charcoal-800 p-6">
        <h3 className="font-display text-lg font-bold text-white">Quick Actions</h3>
      </div>

      <div className="grid grid-cols-2 gap-3 p-6">
        {actions.map((action) => {
          const Icon = action.icon;
          return (
            <Link
              key={action.title}
              href={action.href}
              className={`flex flex-col items-center justify-center gap-2 rounded-lg border border-hunter-charcoal-800 p-4 transition-all hover:border-hunter-charcoal-700 ${action.color}`}
            >
              <Icon className="h-6 w-6" />
              <span className="text-center text-xs font-medium">{action.title}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
