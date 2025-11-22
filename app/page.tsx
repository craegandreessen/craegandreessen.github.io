import Link from "next/link";
import { ArrowRight, Target, Calendar, Shield, Trophy } from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-hunter-charcoal-950 via-hunter-charcoal-900 to-hunter-green-950">
      {/* Hero Section */}
      <div className="texture-overlay relative flex min-h-screen flex-col">
        {/* Header */}
        <header className="border-b border-hunter-charcoal-800/50 backdrop-blur-sm">
          <div className="container mx-auto flex h-16 items-center justify-between px-4">
            <div className="flex items-center space-x-2">
              <Trophy className="h-8 w-8 text-hunter-bronze" />
              <span className="font-display text-2xl font-bold text-hunter-bronze">
                HuntFlow
              </span>
            </div>
            <nav className="flex items-center space-x-6">
              <Link
                href="/auth/login"
                className="text-sm text-hunter-charcoal-300 transition-colors hover:text-white"
              >
                Sign In
              </Link>
              <Link
                href="/auth/signup"
                className="rounded-lg bg-hunter-green px-4 py-2 text-sm font-semibold text-white transition-all hover:bg-hunter-green-600"
              >
                Get Started
              </Link>
            </nav>
          </div>
        </header>

        {/* Hero Content */}
        <main className="flex flex-1 items-center">
          <div className="container mx-auto px-4 py-24">
            <div className="mx-auto max-w-4xl text-center">
              <h1 className="font-display text-5xl font-bold leading-tight text-white md:text-7xl">
                Never Miss a{" "}
                <span className="bg-gradient-to-r from-hunter-bronze to-hunter-bronze-400 bg-clip-text text-transparent">
                  Draw Deadline
                </span>{" "}
                Again
              </h1>
              <p className="mx-auto mt-6 max-w-2xl text-lg text-hunter-charcoal-300 md:text-xl">
                The ultimate application and deadline manager for serious North American big-game
                hunters. Track points, manage credentials, and never lose track of your hunting
                applications across 50+ states.
              </p>
              <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Link
                  href="/auth/signup"
                  className="group flex items-center gap-2 rounded-lg bg-hunter-bronze px-8 py-4 text-lg font-semibold text-white transition-all hover:bg-hunter-bronze-600 hover:shadow-lg hover:shadow-hunter-bronze/20"
                >
                  Start Free Trial
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Link>
                <Link
                  href="#features"
                  className="rounded-lg border border-hunter-charcoal-700 px-8 py-4 text-lg font-semibold text-white transition-all hover:border-hunter-charcoal-600 hover:bg-hunter-charcoal-900/50"
                >
                  See How It Works
                </Link>
              </div>
            </div>
          </div>
        </main>

        {/* Features Grid */}
        <section id="features" className="border-t border-hunter-charcoal-800/50 bg-black/20 py-24">
          <div className="container mx-auto px-4">
            <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-2 lg:grid-cols-4">
              <FeatureCard
                icon={<Calendar className="h-8 w-8" />}
                title="Deadline Tracking"
                description="Automatic reminders for every state deadline you care about"
              />
              <FeatureCard
                icon={<Target className="h-8 w-8" />}
                title="Point Management"
                description="Track preference and bonus points across all states in one place"
              />
              <FeatureCard
                icon={<Shield className="h-8 w-8" />}
                title="Secure Vault"
                description="Encrypted storage for all your state portal credentials"
              />
              <FeatureCard
                icon={<Trophy className="h-8 w-8" />}
                title="Multi-State Support"
                description="Manage applications for elk, deer, antelope, and more across 50+ states"
              />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="group rounded-xl border border-hunter-charcoal-800 bg-hunter-charcoal-900/50 p-6 backdrop-blur-sm transition-all hover:border-hunter-green-700 hover:bg-hunter-charcoal-900/80">
      <div className="mb-4 text-hunter-bronze transition-colors group-hover:text-hunter-bronze-400">
        {icon}
      </div>
      <h3 className="mb-2 font-display text-xl font-semibold text-white">{title}</h3>
      <p className="text-sm text-hunter-charcoal-400">{description}</p>
    </div>
  );
}
