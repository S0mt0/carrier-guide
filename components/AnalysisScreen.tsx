"use client";

import { useEffect, useState } from "react";

interface AnalysisScreenProps {
  analysisStep: number;
}

export function AnalysisScreen({ analysisStep }: AnalysisScreenProps) {
  const messages = [
    "Scanning your personality profile...",
    "Mapping strengths to career clusters...",
    "Consulting Nigerian university data...",
    "Generating your personalised roadmap...",
  ];

  return (
    <div className="flex flex-col items-center justify-center py-16">
      <div className="mb-12">
        <div className="text-7xl animate-spin mb-6">⚙️</div>
        <h2 className="text-2xl font-bold text-[#1B4332] text-center mb-6">
          Analyzing Your Profile...
        </h2>
      </div>

      <div className="max-w-md space-y-3">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`p-4 rounded-lg transition-all duration-500 ${
              i <= analysisStep
                ? "bg-[#E8F5E9] border border-[#52B788]"
                : "bg-gray-100 border border-gray-300"
            }`}
          >
            <div
              className={`flex items-center gap-3 ${
                i <= analysisStep ? "text-[#1B4332]" : "text-gray-500"
              }`}
            >
              {i < analysisStep && (
                <span className="text-lg font-bold">✓</span>
              )}
              {i === analysisStep && (
                <span className="inline-block w-2 h-2 bg-[#52B788] rounded-full animate-pulse" />
              )}
              {i > analysisStep && (
                <span className="inline-block w-2 h-2 bg-gray-400 rounded-full" />
              )}
              <span className="text-sm">{msg}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
