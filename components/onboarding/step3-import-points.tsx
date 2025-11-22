"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";
import { Award, ArrowLeft, CheckCircle2, Loader2 } from "lucide-react";

interface Step3Props {
  onboardingData: {
    residentState: string;
    huntingStates: string[];
    huntingSpecies: string[];
  };
  onComplete: () => void;
  onBack: () => void;
}

export default function OnboardingStep3({ onboardingData, onComplete, onBack }: Step3Props) {
  const [loading, setLoading] = useState(false);
  const [skipPoints, setSkipPoints] = useState(false);
  const supabase = createClient();

  const handleComplete = async () => {
    setLoading(true);

    try {
      // Get current user
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error("No user found");

      // Update profile with resident state
      await supabase
        .from("profiles")
        .update({
          resident_state_code: onboardingData.residentState,
          onboarding_completed: true,
        })
        .eq("id", user.id);

      // Get states from database to insert user_states
      const { data: states } = await supabase
        .from("states")
        .select("id, code")
        .in("code", onboardingData.huntingStates);

      if (states) {
        // Insert user hunting states
        const userStates = states.map((state) => ({
          user_id: user.id,
          state_id: state.id,
          is_resident: state.code === onboardingData.residentState,
        }));

        await supabase.from("user_states").insert(userStates);
      }

      // Get species from database
      const { data: species } = await supabase
        .from("species")
        .select("id, slug")
        .in("slug", onboardingData.huntingSpecies);

      if (species) {
        // Insert user hunting species
        const userSpecies = species.map((s) => ({
          user_id: user.id,
          species_id: s.id,
        }));

        await supabase.from("user_species").insert(userSpecies);
      }

      // Complete onboarding
      onComplete();
    } catch (error) {
      console.error("Error completing onboarding:", error);
      alert("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-2xl border border-hunter-charcoal-800 bg-hunter-charcoal-900/80 p-8 backdrop-blur-sm md:p-12">
      <div className="mb-8 text-center">
        <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-hunter-bronze/10">
          <Award className="h-8 w-8 text-hunter-bronze" />
        </div>
        <h1 className="font-display text-3xl font-bold text-white md:text-4xl">
          Import Your Points (Optional)
        </h1>
        <p className="mt-3 text-lg text-hunter-charcoal-400">
          Add your existing preference and bonus points to track your progress
        </p>
      </div>

      <div className="space-y-6">
        {/* Summary */}
        <div className="rounded-lg border border-hunter-green/30 bg-hunter-green/10 p-6">
          <h3 className="mb-4 font-display text-xl font-semibold text-white">
            Your Setup Summary
          </h3>
          <div className="space-y-3 text-sm">
            <div className="flex items-start gap-2">
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-hunter-green" />
              <div>
                <span className="text-hunter-charcoal-400">Resident State:</span>{" "}
                <span className="font-semibold text-white">{onboardingData.residentState}</span>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-hunter-green" />
              <div>
                <span className="text-hunter-charcoal-400">Hunting States:</span>{" "}
                <span className="font-semibold text-white">
                  {onboardingData.huntingStates.join(", ")}
                </span>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-hunter-green" />
              <div>
                <span className="text-hunter-charcoal-400">Species:</span>{" "}
                <span className="font-semibold text-white">
                  {onboardingData.huntingSpecies.length} selected
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Points Import (Coming Soon) */}
        <div className="rounded-lg border border-hunter-charcoal-800 bg-hunter-charcoal-950/50 p-6">
          <h3 className="mb-2 font-semibold text-white">Point Import Coming Soon</h3>
          <p className="text-sm text-hunter-charcoal-400">
            We're working on making it easy to import your existing points. For now, you can add
            them manually from your dashboard after setup.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <Button
            type="button"
            variant="outline"
            size="lg"
            onClick={onBack}
            disabled={loading}
            className="w-full"
          >
            <ArrowLeft className="mr-2 h-5 w-5" />
            Back
          </Button>
          <Button
            type="button"
            size="lg"
            onClick={handleComplete}
            disabled={loading}
            className="w-full"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Setting up...
              </>
            ) : (
              <>
                Complete Setup
                <CheckCircle2 className="ml-2 h-5 w-5" />
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
