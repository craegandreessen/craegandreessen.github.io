import { createClient } from "@/lib/supabase/server";
import DeadlineHero from "@/components/dashboard/deadline-hero";
import PointsSummary from "@/components/dashboard/points-summary";
import UpcomingDeadlines from "@/components/dashboard/upcoming-deadlines";
import QuickActions from "@/components/dashboard/quick-actions";

export default async function DashboardPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  // Fetch user's profile
  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  // Fetch user's states with state info
  const { data: userStates } = await supabase
    .from("user_states")
    .select(`
      *,
      states:state_id (
        code,
        name
      )
    `)
    .eq("user_id", user.id);

  // Fetch upcoming deadlines for user's states (2026 season)
  const stateIds = userStates?.map((us: any) => us.state_id) || [];

  const { data: upcomingDeadlines } = await supabase
    .from("state_species")
    .select(`
      *,
      states:state_id (
        code,
        name
      ),
      species:species_id (
        name,
        slug,
        icon_name
      )
    `)
    .in("state_id", stateIds)
    .eq("season_year", 2026)
    .gte("application_deadline", new Date().toISOString().split("T")[0])
    .order("application_deadline", { ascending: true })
    .limit(10);

  // Fetch user's applications
  const { data: applications } = await supabase
    .from("user_applications")
    .select("*")
    .eq("user_id", user.id)
    .eq("season_year", 2026);

  // Fetch user's total points
  const { data: pointsData } = await supabase
    .from("user_points")
    .select(`
      *,
      states:state_id (
        code,
        name
      ),
      species:species_id (
        name
      )
    `)
    .eq("user_id", user.id);

  return (
    <div className="space-y-6 pb-20 lg:pb-6">
      {/* Welcome Section */}
      <div>
        <h1 className="font-display text-3xl font-bold text-white md:text-4xl">
          Welcome back, {profile?.full_name?.split(" ")[0] || "Hunter"}
        </h1>
        <p className="mt-2 text-hunter-charcoal-400">
          Here's what's happening with your hunting applications
        </p>
      </div>

      {/* Deadline Hero */}
      <DeadlineHero deadlines={upcomingDeadlines || []} />

      {/* Stats Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Active States"
          value={userStates?.length || 0}
          subtitle={`Including ${profile?.resident_state_code || "your home state"}`}
          icon="🗺️"
        />
        <StatCard
          title="2026 Applications"
          value={applications?.length || 0}
          subtitle={`${applications?.filter((a: any) => a.status === "submitted").length || 0} submitted`}
          icon="📝"
        />
        <StatCard
          title="Total Points"
          value={
            pointsData?.reduce(
              (sum: number, p: any) => sum + p.preference_points + p.bonus_points,
              0
            ) || 0
          }
          subtitle="Across all states"
          icon="⭐"
        />
        <StatCard
          title="Upcoming Deadlines"
          value={upcomingDeadlines?.filter((d: any) => {
            const daysUntil =
              (new Date(d.application_deadline).getTime() - new Date().getTime()) /
              (1000 * 60 * 60 * 24);
            return daysUntil <= 30;
          }).length || 0}
          subtitle="In next 30 days"
          icon="⏰"
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <UpcomingDeadlines deadlines={upcomingDeadlines || []} />
        </div>
        <div className="space-y-6">
          <QuickActions />
          <PointsSummary points={pointsData || []} />
        </div>
      </div>
    </div>
  );
}

function StatCard({
  title,
  value,
  subtitle,
  icon,
}: {
  title: string;
  value: number;
  subtitle: string;
  icon: string;
}) {
  return (
    <div className="rounded-xl border border-hunter-charcoal-800 bg-hunter-charcoal-900/50 p-6 backdrop-blur-sm transition-all hover:border-hunter-charcoal-700">
      <div className="mb-3 text-2xl">{icon}</div>
      <div className="text-3xl font-bold text-white">{value}</div>
      <div className="mt-1 text-sm font-medium text-hunter-charcoal-400">{title}</div>
      <div className="mt-1 text-xs text-hunter-charcoal-500">{subtitle}</div>
    </div>
  );
}
