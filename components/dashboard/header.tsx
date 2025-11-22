"use client";

import { useState } from "react";
import { Bell, LogOut, User, Menu } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

interface HeaderProps {
  user: any;
  profile: any;
}

export default function DashboardHeader({ user, profile }: HeaderProps) {
  const router = useRouter();
  const supabase = createClient();
  const [showUserMenu, setShowUserMenu] = useState(false);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  };

  return (
    <header className="sticky top-0 z-40 border-b border-hunter-charcoal-800/50 bg-hunter-charcoal-950/80 backdrop-blur-sm">
      <div className="flex h-16 items-center justify-between px-4 md:px-6 lg:px-8">
        {/* Mobile Menu Button */}
        <button className="lg:hidden">
          <Menu className="h-6 w-6 text-hunter-charcoal-400" />
        </button>

        {/* Page Title - Hidden on mobile */}
        <div className="hidden lg:block">
          <h1 className="text-xl font-semibold text-white">Dashboard</h1>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-3">
          {/* Notifications */}
          <button className="relative rounded-lg p-2 text-hunter-charcoal-400 transition-colors hover:bg-hunter-charcoal-900 hover:text-white">
            <Bell className="h-5 w-5" />
            <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-hunter-bronze"></span>
          </button>

          {/* User Menu */}
          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center gap-2 rounded-lg p-2 text-hunter-charcoal-400 transition-colors hover:bg-hunter-charcoal-900 hover:text-white"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-hunter-bronze/20 text-sm font-semibold text-hunter-bronze">
                {profile?.full_name?.charAt(0) || "H"}
              </div>
            </button>

            {showUserMenu && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setShowUserMenu(false)}
                ></div>
                <div className="absolute right-0 top-12 z-50 w-64 rounded-lg border border-hunter-charcoal-800 bg-hunter-charcoal-900 p-2 shadow-xl">
                  <div className="border-b border-hunter-charcoal-800 px-3 py-2">
                    <div className="text-sm font-medium text-white">
                      {profile?.full_name || "Hunter"}
                    </div>
                    <div className="text-xs text-hunter-charcoal-500">{user?.email}</div>
                  </div>
                  <div className="mt-2 space-y-1">
                    <button
                      onClick={() => {
                        setShowUserMenu(false);
                        router.push("/dashboard/settings");
                      }}
                      className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm text-hunter-charcoal-300 transition-colors hover:bg-hunter-charcoal-800 hover:text-white"
                    >
                      <User className="h-4 w-4" />
                      Profile Settings
                    </button>
                    <button
                      onClick={handleSignOut}
                      className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm text-red-400 transition-colors hover:bg-red-950/50 hover:text-red-300"
                    >
                      <LogOut className="h-4 w-4" />
                      Sign Out
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
