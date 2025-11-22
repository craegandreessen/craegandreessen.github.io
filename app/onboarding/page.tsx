"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Trophy } from "lucide-react";
import OnboardingStep1 from "@/components/onboarding/step1-residency";
import OnboardingStep2 from "@/components/onboarding/step2-states-species";
import OnboardingStep3 from "@/components/onboarding/step3-import-points";

export default function OnboardingPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [onboardingData, setOnboardingData] = useState({
    residentState: "",
    huntingStates: [] as string[],
    huntingSpecies: [] as string[],
  });

  const totalSteps = 3;

  const handleNext = (data: Partial<typeof onboardingData>) => {
    setOnboardingData((prev) => ({ ...prev, ...data }));
    if (currentStep < totalSteps) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleComplete = () => {
    // Onboarding complete, redirect to dashboard
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-hunter-charcoal-950 via-hunter-charcoal-900 to-hunter-green-950">
      <div className="texture-overlay min-h-screen">
        {/* Header */}
        <header className="border-b border-hunter-charcoal-800/50">
          <div className="container mx-auto flex h-16 items-center justify-between px-4">
            <div className="flex items-center space-x-2">
              <Trophy className="h-8 w-8 text-hunter-bronze" />
              <span className="font-display text-2xl font-bold text-hunter-bronze">HuntFlow</span>
            </div>
            <div className="text-sm text-hunter-charcoal-400">
              Step {currentStep} of {totalSteps}
            </div>
          </div>
        </header>

        {/* Progress Bar */}
        <div className="sticky top-0 z-10 bg-hunter-charcoal-950/80 backdrop-blur-sm">
          <div className="container mx-auto px-4 py-4">
            <div className="flex gap-2">
              {Array.from({ length: totalSteps }).map((_, index) => (
                <div
                  key={index}
                  className={`h-2 flex-1 rounded-full transition-all ${
                    index < currentStep
                      ? "bg-hunter-bronze"
                      : index === currentStep - 1
                        ? "bg-hunter-bronze/50"
                        : "bg-hunter-charcoal-800"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Content */}
        <main className="container mx-auto px-4 py-12">
          <div className="mx-auto max-w-3xl">
            {currentStep === 1 && (
              <OnboardingStep1
                initialData={{ residentState: onboardingData.residentState }}
                onNext={handleNext}
              />
            )}
            {currentStep === 2 && (
              <OnboardingStep2
                initialData={{
                  huntingStates: onboardingData.huntingStates,
                  huntingSpecies: onboardingData.huntingSpecies,
                }}
                onNext={handleNext}
                onBack={handleBack}
              />
            )}
            {currentStep === 3 && (
              <OnboardingStep3
                onboardingData={onboardingData}
                onComplete={handleComplete}
                onBack={handleBack}
              />
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
