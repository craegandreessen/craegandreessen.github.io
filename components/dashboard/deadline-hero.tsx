"use client";

import { Calendar, Clock, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatDate, getDaysUntil } from "@/lib/utils";
import Link from "next/link";

interface Deadline {
  id: string;
  application_deadline: string;
  states: { code: string; name: string };
  species: { name: string; slug: string; icon_name: string | null };
}

export default function DeadlineHero({ deadlines }: { deadlines: Deadline[] }) {
  if (!deadlines || deadlines.length === 0) {
    return (
      <div className="relative overflow-hidden rounded-2xl border border-hunter-charcoal-800 bg-gradient-to-r from-hunter-green-950 to-hunter-charcoal-900 p-8 md:p-12">
        <div className="relative z-10 text-center">
          <Calendar className="mx-auto mb-4 h-16 w-16 text-hunter-bronze" />
          <h2 className="font-display text-2xl font-bold text-white md:text-3xl">
            No Upcoming Deadlines
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-hunter-charcoal-400">
            Add states and species you're interested in to start tracking deadlines.
          </p>
          <Link href="/dashboard/settings">
            <Button className="mt-6">Manage Your Preferences</Button>
          </Link>
        </div>
      </div>
    );
  }

  const nextDeadline = deadlines[0];
  const daysUntil = getDaysUntil(nextDeadline.application_deadline);

  return (
    <div className="relative overflow-hidden rounded-2xl border border-hunter-charcoal-800 bg-gradient-to-r from-hunter-green-950 via-hunter-charcoal-900 to-hunter-bronze-950 p-8 md:p-12">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[url('/textures/wood-grain.png')] bg-repeat"></div>
      </div>

      <div className="relative z-10">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          {/* Deadline Info */}
          <div className="flex-1">
            <div className="mb-3 inline-block rounded-full bg-hunter-bronze/20 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-hunter-bronze">
              Next Deadline
            </div>
            <h2 className="font-display text-3xl font-bold text-white md:text-4xl lg:text-5xl">
              {nextDeadline.states.name} {nextDeadline.species.name}
            </h2>
            <div className="mt-4 flex flex-wrap items-center gap-4 text-hunter-charcoal-300">
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-hunter-bronze" />
                <span className="font-medium">
                  {formatDate(nextDeadline.application_deadline)}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-hunter-bronze" />
                <span className="font-semibold text-white">
                  {daysUntil} {daysUntil === 1 ? "day" : "days"} remaining
                </span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-hunter-bronze" />
                <span>{nextDeadline.states.code}</span>
              </div>
            </div>
          </div>

          {/* Urgency Indicator */}
          <div className="flex shrink-0 flex-col items-center justify-center">
            <div
              className={`flex h-24 w-24 items-center justify-center rounded-full border-4 md:h-32 md:w-32 ${
                daysUntil <= 7
                  ? "border-red-500 bg-red-500/10"
                  : daysUntil <= 14
                    ? "border-orange-500 bg-orange-500/10"
                    : "border-hunter-bronze bg-hunter-bronze/10"
              }`}
            >
              <div className="text-center">
                <div className="font-display text-3xl font-bold text-white md:text-4xl">
                  {daysUntil}
                </div>
                <div className="text-xs font-medium uppercase tracking-wide text-hunter-charcoal-400">
                  Days
                </div>
              </div>
            </div>
            <Link href="/dashboard/deadlines" className="mt-4">
              <Button variant="outline" size="sm">
                View All Deadlines
              </Button>
            </Link>
          </div>
        </div>

        {/* Additional Upcoming Deadlines */}
        {deadlines.length > 1 && (
          <div className="mt-6 border-t border-hunter-charcoal-800/50 pt-6">
            <p className="mb-3 text-sm font-medium text-hunter-charcoal-400">
              Also coming up soon:
            </p>
            <div className="flex flex-wrap gap-2">
              {deadlines.slice(1, 4).map((deadline) => (
                <div
                  key={deadline.id}
                  className="rounded-lg border border-hunter-charcoal-800 bg-hunter-charcoal-950/50 px-3 py-2"
                >
                  <div className="text-xs font-medium text-hunter-charcoal-400">
                    {deadline.states.code} · {deadline.species.name}
                  </div>
                  <div className="mt-0.5 text-xs text-hunter-charcoal-500">
                    {formatDate(deadline.application_deadline)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
