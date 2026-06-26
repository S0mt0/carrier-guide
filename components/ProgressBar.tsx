import { PROGRESS_STEPS } from "@/lib/quiz-data";

interface ProgressBarProps {
  step: number;
}

export function ProgressBar({ step }: ProgressBarProps) {
  return (
    <div className="flex items-center justify-center gap-0 mb-8">
      {PROGRESS_STEPS.map((label, i) => (
        <div key={label} className="flex items-center">
          <div className="flex flex-col items-center gap-1">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-all ${
                i <= step
                  ? "bg-[#1B4332] text-white"
                  : "bg-gray-200 text-gray-600"
              }`}
            >
              {i < step ? "✓" : i + 1}
            </div>
            <span
              className={`text-xs whitespace-nowrap font-${i === step ? "600" : "400"} ${
                i <= step ? "text-[#1B4332]" : "text-gray-500"
              }`}
            >
              {label}
            </span>
          </div>
          {i < PROGRESS_STEPS.length - 1 && (
            <div
              className={`w-16 h-0.5 mx-1 mb-5 transition-all ${
                i < step ? "bg-[#1B4332]" : "bg-gray-300"
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );
}
