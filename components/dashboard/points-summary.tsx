"use client";

import { Trophy } from "lucide-react";
import Link from "next/link";

interface PointsData {
  states: { code: string; name: string };
  species: { name: string };
  preference_points: number;
  bonus_points: number;
}

export default function PointsSummary({ points }: { points: PointsData[] }) {
  const totalPoints = points.reduce(
    (sum, p) => sum + p.preference_points + p.bonus_points,
    0
  );

  return (
    <div className="rounded-xl border border-hunter-charcoal-800 bg-hunter-charcoal-900/50 backdrop-blur-sm">
      <div className="border-b border-hunter-charcoal-800 p-6">
        <div className="flex items-center justify-between">
          <h3 className="font-display text-lg font-bold text-white">Points Summary</h3>
          <Link
            href="/dashboard/points"
            className="text-sm font-medium text-hunter-bronze hover:underline"
          >
            Manage
          </Link>
        </div>
      </div>

      <div className="p-6">
        {points.length === 0 ? (
          <div className="text-center">
            <Trophy className="mx-auto mb-2 h-10 w-10 text-hunter-charcoal-700" />
            <p className="text-sm text-hunter-charcoal-400">No points tracked yet</p>
            <Link
              href="/dashboard/points/add"
              className="mt-2 inline-block text-sm text-hunter-bronze hover:underline"
            >
              Add your points
            </Link>
          </div>
        ) : (
          <>
            <div className="mb-4 text-center">
              <div className="font-display text-4xl font-bold text-hunter-bronze">
                {totalPoints}
              </div>
              <div className="text-sm text-hunter-charcoal-400">Total Points</div>
            </div>

            <div className="space-y-2">
              {points.slice(0, 5).map((point, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between rounded-lg bg-hunter-charcoal-950/50 p-3"
                >
                  <div>
                    <div className="text-sm font-medium text-white">
                      {point.states.code} {point.species.name}
                    </div>
                    <div className="text-xs text-hunter-charcoal-500">
                      {point.preference_points}P / {point.bonus_points}B
                    </div>
                  </div>
                  <div className="text-lg font-bold text-hunter-bronze">
                    {point.preference_points + point.bonus_points}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
