"use client";

import { Calendar, ChevronRight } from "lucide-react";
import { formatDate, getDaysUntil } from "@/lib/utils";
import Link from "next/link";

interface Deadline {
  id: string;
  application_deadline: string;
  states: { code: string; name: string };
  species: { name: string; slug: string };
}

export default function UpcomingDeadlines({ deadlines }: { deadlines: Deadline[] }) {
  return (
    <div className="rounded-xl border border-hunter-charcoal-800 bg-hunter-charcoal-900/50 backdrop-blur-sm">
      <div className="border-b border-hunter-charcoal-800 p-6">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-xl font-bold text-white">All Upcoming Deadlines</h2>
          <Link
            href="/dashboard/deadlines"
            className="text-sm font-medium text-hunter-bronze hover:underline"
          >
            View all
          </Link>
        </div>
      </div>

      <div className="divide-y divide-hunter-charcoal-800">
        {deadlines.length === 0 ? (
          <div className="p-8 text-center">
            <Calendar className="mx-auto mb-3 h-12 w-12 text-hunter-charcoal-700" />
            <p className="text-hunter-charcoal-400">No upcoming deadlines</p>
          </div>
        ) : (
          deadlines.slice(0, 5).map((deadline) => {
            const daysUntil = getDaysUntil(deadline.application_deadline);
            const isUrgent = daysUntil <= 7;
            const isWarning = daysUntil <= 14;

            return (
              <Link
                key={deadline.id}
                href={`/dashboard/applications/new?state=${deadline.states.code}&species=${deadline.species.slug}`}
                className="flex items-center gap-4 p-4 transition-colors hover:bg-hunter-charcoal-800/50"
              >
                <div
                  className={`flex h-14 w-14 shrink-0 flex-col items-center justify-center rounded-lg border-2 ${
                    isUrgent
                      ? "border-red-500 bg-red-500/10"
                      : isWarning
                        ? "border-orange-500 bg-orange-500/10"
                        : "border-hunter-bronze bg-hunter-bronze/10"
                  }`}
                >
                  <div className="text-xl font-bold text-white">{daysUntil}</div>
                  <div className="text-[10px] uppercase text-hunter-charcoal-400">days</div>
                </div>

                <div className="flex-1">
                  <div className="font-semibold text-white">
                    {deadline.states.name} {deadline.species.name}
                  </div>
                  <div className="mt-1 text-sm text-hunter-charcoal-400">
                    Deadline: {formatDate(deadline.application_deadline)}
                  </div>
                </div>

                <ChevronRight className="h-5 w-5 text-hunter-charcoal-600" />
              </Link>
            );
          })
        )}
      </div>
    </div>
  );
}
