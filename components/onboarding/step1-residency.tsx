"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { MapPin, ArrowRight } from "lucide-react";
import { US_STATES, CANADIAN_PROVINCES } from "@/lib/constants";

interface Step1Props {
  initialData: { residentState: string };
  onNext: (data: { residentState: string }) => void;
}

export default function OnboardingStep1({ initialData, onNext }: Step1Props) {
  const [residentState, setResidentState] = useState(initialData.residentState);
  const [country, setCountry] = useState<"US" | "CA">("US");

  const states = country === "US" ? US_STATES : CANADIAN_PROVINCES;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext({ residentState });
  };

  return (
    <div className="rounded-2xl border border-hunter-charcoal-800 bg-hunter-charcoal-900/80 p-8 backdrop-blur-sm md:p-12">
      <div className="mb-8 text-center">
        <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-hunter-bronze/10">
          <MapPin className="h-8 w-8 text-hunter-bronze" />
        </div>
        <h1 className="font-display text-3xl font-bold text-white md:text-4xl">
          Where do you call home?
        </h1>
        <p className="mt-3 text-lg text-hunter-charcoal-400">
          Tell us your state of residency so we can customize your experience
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Country Selector */}
        <div>
          <Label className="mb-3 block text-base">Country</Label>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => {
                setCountry("US");
                setResidentState("");
              }}
              className={`rounded-lg border-2 p-4 text-center font-semibold transition-all ${
                country === "US"
                  ? "border-hunter-bronze bg-hunter-bronze/10 text-white"
                  : "border-hunter-charcoal-700 bg-hunter-charcoal-900/50 text-hunter-charcoal-400 hover:border-hunter-charcoal-600"
              }`}
            >
              🇺🇸 United States
            </button>
            <button
              type="button"
              onClick={() => {
                setCountry("CA");
                setResidentState("");
              }}
              className={`rounded-lg border-2 p-4 text-center font-semibold transition-all ${
                country === "CA"
                  ? "border-hunter-bronze bg-hunter-bronze/10 text-white"
                  : "border-hunter-charcoal-700 bg-hunter-charcoal-900/50 text-hunter-charcoal-400 hover:border-hunter-charcoal-600"
              }`}
            >
              🇨🇦 Canada
            </button>
          </div>
        </div>

        {/* State Selector */}
        <div>
          <Label className="mb-3 block text-base">
            {country === "US" ? "State" : "Province"}
          </Label>
          <div className="grid max-h-[400px] grid-cols-2 gap-2 overflow-y-auto rounded-lg border border-hunter-charcoal-800 bg-hunter-charcoal-950/50 p-4 md:grid-cols-3">
            {states.map((state) => (
              <button
                key={state.code}
                type="button"
                onClick={() => setResidentState(state.code)}
                className={`rounded-md border px-4 py-3 text-left text-sm font-medium transition-all ${
                  residentState === state.code
                    ? "border-hunter-bronze bg-hunter-bronze/10 text-white"
                    : "border-hunter-charcoal-800 bg-hunter-charcoal-900/50 text-hunter-charcoal-300 hover:border-hunter-charcoal-700 hover:bg-hunter-charcoal-900"
                }`}
              >
                <div className="text-xs text-hunter-charcoal-500">{state.code}</div>
                <div className="mt-0.5">{state.name}</div>
              </button>
            ))}
          </div>
        </div>

        <Button type="submit" size="lg" className="w-full" disabled={!residentState}>
          Continue
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </form>
    </div>
  );
}
