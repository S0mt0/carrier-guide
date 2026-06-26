"use client";

import { QUESTIONS } from "@/lib/quiz-data";
import { Button } from "@/components/ui/button";

interface Option {
  label: string;
  tags: string[];
}

interface QuizScreenProps {
  currentQuestionIndex: number;
  selectedOption: Option | null;
  onOptionSelect: (option: Option) => void;
}

export function QuizScreen({
  currentQuestionIndex,
  selectedOption,
  onOptionSelect,
}: QuizScreenProps) {
  const question = QUESTIONS[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / QUESTIONS.length) * 100;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <span className="text-sm text-[#636E72] font-sans">
          Question {currentQuestionIndex + 1} of {QUESTIONS.length}
        </span>
        <span className="text-sm font-semibold text-[#1B4332] bg-[#F1F8F4] px-3 py-1 rounded-full border border-[#95D5B2]">
          {question.icon} {question.category}
        </span>
      </div>

      <div className="h-1 bg-green-100 rounded mb-8 overflow-hidden">
        <div
          className="h-full bg-[#52B788] rounded transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="bg-white rounded-2xl border border-[#95D5B2] p-8 mb-6 shadow-md">
        <h2 className="text-2xl text-[#2D3436] font-bold mb-8 leading-relaxed">
          {question.text}
        </h2>

        <div className="flex flex-col gap-3">
          {question.options.map((option, i) => (
            <Button
              key={i}
              onClick={() => onOptionSelect(option)}
              variant="outline"
              className={`text-left p-4 h-auto rounded-xl transition-all border-2 text-black ${
                selectedOption === option
                  ? "bg-[#1B4332] border-[#1B4332]"
                  : "bg-white text-[#2D3436] border-[#95D5B2] hover:bg-[#F1F8F4] hover:border-[#52B788]"
              }`}
            >
              <span className="text-base leading-relaxed text-[#2D3436]">
                {option.label}{" "}
              </span>
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}
