import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import DashboardSidebar from "@/components/dashboard/sidebar";
import DashboardHeader from "@/components/dashboard/header";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth/login");
  }

  // Get user profile
  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  // Check if onboarding is complete
  if (profile && !profile.onboarding_completed) {
    redirect("/onboarding");
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-hunter-charcoal-950 via-hunter-charcoal-900 to-hunter-green-950">
      <div className="texture-overlay flex min-h-screen">
        {/* Sidebar */}
        <DashboardSidebar profile={profile} />

        {/* Main Content */}
        <div className="flex flex-1 flex-col lg:ml-64">
          <DashboardHeader user={user} profile={profile} />
          <main className="flex-1 p-4 md:p-6 lg:p-8">{children}</main>
        </div>
      </div>
    </div>
  );
}
