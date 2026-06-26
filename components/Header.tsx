import { Button } from "@/components/ui/button";
import { COLORS } from "@/lib/quiz-data";

interface HeaderProps {
  showRestartButton: boolean;
  onRestart: () => void;
}

export function Header({ showRestartButton, onRestart }: HeaderProps) {
  return (
    <header className="bg-[#1B4332] text-white px-8 py-4 flex items-center gap-4 shadow-md">
      <div className="text-4xl">🎓</div>
      <div>
        <h1 className="text-2xl font-bold tracking-tight">PathFinder Nigeria</h1>
        <p className="text-xs tracking-wide" style={{ color: "#95D5B2" }}>
          AI Career Guidance for Nigerian Students
        </p>
      </div>
      {showRestartButton && (
        <Button
          onClick={onRestart}
          variant="ghost"
          className="ml-auto text-white hover:bg-white/20 border border-white/30 text-sm"
        >
          ↺ Start Over
        </Button>
      )}
    </header>
  );
}
