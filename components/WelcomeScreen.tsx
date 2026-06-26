"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface WelcomeScreenProps {
  onStart: (name: string, studentClass: string) => void;
  error?: string;
}

export function WelcomeScreen({ onStart, error }: WelcomeScreenProps) {
  const [studentName, setStudentName] = useState("");
  const [studentClass, setStudentClass] = useState("");

  const handleStart = () => {
    if (studentName && studentClass) {
      onStart(studentName, studentClass);
    }
  };

  return (
    <div className="text-center">
      <div className="text-7xl mb-3">🌟</div>
      <h1 className="text-4xl text-[#1B4332] font-bold mb-3">
        Discover Your Future Career
      </h1>
      <p className="text-lg text-[#636E72] font-sans leading-relaxed mb-8 max-w-xl mx-auto">
        Answer 8 questions about your interests and strengths, and our AI will
        recommend the best career paths, university courses, and subject choices
        for you — tailored for Nigeria.
      </p>

      <div className="bg-white rounded-2xl border border-[#95D5B2] p-8 mb-8 text-left shadow-md">
        <div className="text-base font-semibold text-[#1B4332] mb-6">
          Before we begin, tell us about yourself:
        </div>

        <div className="mb-5">
          <label className="block text-sm text-[#636E72] mb-1.5 font-medium">
            Your First Name
          </label>
          <Input
            value={studentName}
            onChange={(e) => setStudentName(e.target.value)}
            placeholder="e.g. Chidi, Amaka, Tunde..."
            className={`${
              studentName ? "border-[#52B788]" : ""
            } rounded-lg border-2 text-base font-sans`}
          />
        </div>

        <div>
          <label className="block text-sm text-[#636E72] mb-1.5 font-medium">
            Your Class / Year
          </label>
          <select
            value={studentClass}
            onChange={(e) => setStudentClass(e.target.value)}
            className={`w-full p-2.5 rounded-lg border-2 text-black ${
              studentClass ? "border-[#52B788]" : "border-gray-300"
            } text-base font-sans bg-white`}
          >
            <option value="">Select your class...</option>
            <option value="JSS3">JSS 3</option>
            <option value="SS1">SS 1</option>
            <option value="SS2">SS 2</option>
            <option value="SS3">SS 3 (Final Year)</option>
          </select>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-300 rounded-lg p-3 mb-6 text-red-600 text-sm">
          ⚠️ {error}
        </div>
      )}

      <Button
        onClick={handleStart}
        disabled={!studentName || !studentClass}
        className="bg-[#1B4332] hover:bg-[#0f2818] text-white px-12 py-4 text-lg font-semibold rounded-lg disabled:bg-gray-300 disabled:cursor-not-allowed"
      >
        Begin My Career Journey →
      </Button>

      <div className="flex gap-6 justify-center mt-10 flex-wrap">
        {[
          ["⏱️", "5 Minutes", "Quick & easy"],
          ["🤖", "AI-Powered", "Personalised analysis"],
          ["🇳🇬", "Nigeria-Focused", "Local universities & jobs"],
        ].map(([icon, title, sub]) => (
          <div key={title} className="text-center">
            <div className="text-3xl mb-1">{icon}</div>
            <div className="text-sm font-semibold text-[#1B4332]">{title}</div>
            <div className="text-xs text-[#636E72]">{sub}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
