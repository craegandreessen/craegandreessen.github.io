"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Target, ArrowRight, ArrowLeft, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface Step2Props {
  initialData: { huntingStates: string[]; huntingSpecies: string[] };
  onNext: (data: { huntingStates: string[]; huntingSpecies: string[] }) => void;
  onBack: () => void;
}

const POPULAR_STATES = [
  { code: "MT", name: "Montana" },
  { code: "WY", name: "Wyoming" },
  { code: "CO", name: "Colorado" },
  { code: "ID", name: "Idaho" },
  { code: "UT", name: "Utah" },
  { code: "AZ", name: "Arizona" },
  { code: "NM", name: "New Mexico" },
  { code: "NV", name: "Nevada" },
  { code: "OR", name: "Oregon" },
  { code: "WA", name: "Washington" },
];

const SPECIES_OPTIONS = [
  { id: "elk", name: "Elk", icon: "🦌" },
  { id: "mule-deer", name: "Mule Deer", icon: "🦌" },
  { id: "whitetail-deer", name: "Whitetail Deer", icon: "🦌" },
  { id: "pronghorn", name: "Pronghorn Antelope", icon: "🦌" },
  { id: "moose", name: "Moose", icon: "🦌" },
  { id: "bighorn-sheep", name: "Bighorn Sheep", icon: "🐏" },
  { id: "mountain-goat", name: "Mountain Goat", icon: "🐐" },
  { id: "black-bear", name: "Black Bear", icon: "🐻" },
  { id: "mountain-lion", name: "Mountain Lion", icon: "🐱" },
  { id: "wild-turkey", name: "Wild Turkey", icon: "🦃" },
];

export default function OnboardingStep2({ initialData, onNext, onBack }: Step2Props) {
  const [huntingStates, setHuntingStates] = useState<string[]>(initialData.huntingStates);
  const [huntingSpecies, setHuntingSpecies] = useState<string[]>(initialData.huntingSpecies);
  const [stateSearch, setStateSearch] = useState("");

  const toggleState = (stateCode: string) => {
    setHuntingStates((prev) =>
      prev.includes(stateCode) ? prev.filter((s) => s !== stateCode) : [...prev, stateCode]
    );
  };

  const toggleSpecies = (speciesId: string) => {
    setHuntingSpecies((prev) =>
      prev.includes(speciesId) ? prev.filter((s) => s !== speciesId) : [...prev, speciesId]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext({ huntingStates, huntingSpecies });
  };

  const filteredStates = POPULAR_STATES.filter(
    (state) =>
      state.name.toLowerCase().includes(stateSearch.toLowerCase()) ||
      state.code.toLowerCase().includes(stateSearch.toLowerCase())
  );

  return (
    <div className="rounded-2xl border border-hunter-charcoal-800 bg-hunter-charcoal-900/80 p-8 backdrop-blur-sm md:p-12">
      <div className="mb-8 text-center">
        <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-hunter-bronze/10">
          <Target className="h-8 w-8 text-hunter-bronze" />
        </div>
        <h1 className="font-display text-3xl font-bold text-white md:text-4xl">
          What do you hunt?
        </h1>
        <p className="mt-3 text-lg text-hunter-charcoal-400">
          Select the states and species you're interested in
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* States Selection */}
        <div>
          <Label className="mb-3 block text-base">
            Hunting States ({huntingStates.length} selected)
          </Label>
          <div className="relative mb-3">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-hunter-charcoal-500" />
            <Input
              type="text"
              placeholder="Search states..."
              value={stateSearch}
              onChange={(e) => setStateSearch(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4">
            {filteredStates.map((state) => (
              <button
                key={state.code}
                type="button"
                onClick={() => toggleState(state.code)}
                className={`rounded-lg border px-4 py-3 text-left text-sm font-medium transition-all ${
                  huntingStates.includes(state.code)
                    ? "border-hunter-green bg-hunter-green/20 text-white ring-2 ring-hunter-green"
                    : "border-hunter-charcoal-800 bg-hunter-charcoal-900/50 text-hunter-charcoal-300 hover:border-hunter-charcoal-700 hover:bg-hunter-charcoal-900"
                }`}
              >
                <div className="text-xs text-hunter-charcoal-500">{state.code}</div>
                <div className="mt-0.5">{state.name}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Species Selection */}
        <div>
          <Label className="mb-3 block text-base">
            Species ({huntingSpecies.length} selected)
          </Label>
          <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
            {SPECIES_OPTIONS.map((species) => (
              <button
                key={species.id}
                type="button"
                onClick={() => toggleSpecies(species.id)}
                className={`flex items-center gap-3 rounded-lg border px-4 py-3 text-left font-medium transition-all ${
                  huntingSpecies.includes(species.id)
                    ? "border-hunter-green bg-hunter-green/20 text-white ring-2 ring-hunter-green"
                    : "border-hunter-charcoal-800 bg-hunter-charcoal-900/50 text-hunter-charcoal-300 hover:border-hunter-charcoal-700 hover:bg-hunter-charcoal-900"
                }`}
              >
                <span className="text-2xl">{species.icon}</span>
                <span>{species.name}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="flex gap-3">
          <Button type="button" variant="outline" size="lg" onClick={onBack} className="w-full">
            <ArrowLeft className="mr-2 h-5 w-5" />
            Back
          </Button>
          <Button
            type="submit"
            size="lg"
            className="w-full"
            disabled={huntingStates.length === 0 || huntingSpecies.length === 0}
          >
            Continue
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </form>
    </div>
  );
}
