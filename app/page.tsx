"use client";

import { useState, useRef, useEffect } from "react";
import { Header } from "@/components/Header";
import { ProgressBar } from "@/components/ProgressBar";
import { WelcomeScreen } from "@/components/WelcomeScreen";
import { QuizScreen } from "@/components/QuizScreen";
import { AnalysisScreen } from "@/components/AnalysisScreen";
import { ErrorScreen } from "@/components/ErrorScreen";
import { ResultsScreen } from "@/components/ResultsScreen";
import { QUESTIONS } from "@/lib/quiz-data";

type Screen = "welcome" | "quiz" | "analyzing" | "results" | "error";

interface Answer {
  question: string;
  answer: string;
  tags: string[];
}

interface CareerOption {
  label: string;
  tags: string[];
}

interface ResultsData {
  summary: string;
  topCareers: Array<{
    title: string;
    emoji: string;
    description: string;
    nigerianContext: string;
    salaryRange: string;
    growthProspect: string;
  }>;
  subjectChoices: {
    sciences: string[];
    arts: string[];
    commercials: string[];
    recommended: string;
    rationale: string;
  };
  universities: Array<{
    name: string;
    location: string;
    type: string;
    whyRecommended: string;
    topPrograms: string[];
    jambCutoff: string;
  }>;
  actionPlan: string[];
  motivationalMessage: string;
}

export default function Home() {
  const [screen, setScreen] = useState<Screen>("welcome");
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [studentName, setStudentName] = useState("");
  const [studentClass, setStudentClass] = useState("");
  const [result, setResult] = useState<ResultsData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [selectedOption, setSelectedOption] = useState<CareerOption | null>(
    null
  );
  const [analysisStep, setAnalysisStep] = useState(0);
  const resultRef = useRef<HTMLDivElement>(null);

  const stepIndex =
    screen === "welcome"
      ? 0
      : screen === "quiz"
      ? 1
      : screen === "analyzing"
      ? 2
      : 3;

  // Analysis animation effect
  useEffect(() => {
    if (screen === "analyzing") {
      const steps = [
        "Scanning your personality profile...",
        "Mapping strengths to career clusters...",
        "Consulting Nigerian university data...",
        "Generating your personalised roadmap...",
      ];

      let i = 0;
      const interval = setInterval(() => {
        i++;
        setAnalysisStep(i);
        if (i >= steps.length) {
          clearInterval(interval);
        }
      }, 900);

      return () => clearInterval(interval);
    }
  }, [screen]);

  // Scroll to results
  useEffect(() => {
    if (screen === "results" && resultRef.current) {
      resultRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [screen, result]);

  const handleOptionSelect = (option: CareerOption) => {
    if (selectedOption) return;

    setSelectedOption(option);
    const qIndex = currentQ;
    const newAnswer: Answer = {
      question: QUESTIONS[qIndex].text,
      answer: option.label,
      tags: option.tags,
    };

    setTimeout(() => {
      setSelectedOption(null);
      if (qIndex < QUESTIONS.length - 1) {
        setAnswers((prev) => [...prev, newAnswer]);
        setCurrentQ(qIndex + 1);
      } else {
        const finalAnswers = [...answers, newAnswer];
        setAnswers(finalAnswers);
        setScreen("analyzing");
        analyzeWithClaude(finalAnswers);
      }
    }, 350);
  };

  const analyzeWithClaude = async (allAnswers: Answer[]) => {
    try {
      const response = await fetch("http://localhost:3000/api/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          studentName,
          studentClass,
          answers: allAnswers,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Analysis failed");
      }

      const data = await response.json();
      setResult(data);
      setScreen("results");
    } catch (err) {
      console.error("[v0] Analysis error:", err);
      setError("Analysis failed. Please check your connection and try again.");
      setScreen("error");
    }
  };

  const handleRestart = () => {
    setScreen("welcome");
    setCurrentQ(0);
    setAnswers([]);
    setStudentName("");
    setStudentClass("");
    setResult(null);
    setError(null);
    setSelectedOption(null);
    setAnalysisStep(0);
  };

  const handleStartQuiz = (name: string, studentClass: string) => {
    setStudentName(name);
    setStudentClass(studentClass);
    setScreen("quiz");
  };

  const handleRetryAnalysis = () => {
    setError(null);
    setScreen("quiz");
    setCurrentQ(0);
    setAnswers([]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F1F8F4] via-white to-[#F1F8F4] font-serif">
      <Header
        showRestartButton={screen !== "welcome"}
        onRestart={handleRestart}
      />

      <main className="max-w-3xl mx-auto px-6 py-8">
        <ProgressBar step={stepIndex} />

        {screen === "welcome" && (
          <WelcomeScreen onStart={handleStartQuiz} error={error || undefined} />
        )}

        {screen === "quiz" && (
          <QuizScreen
            currentQuestionIndex={currentQ}
            selectedOption={selectedOption}
            onOptionSelect={handleOptionSelect}
          />
        )}

        {screen === "analyzing" && (
          <AnalysisScreen analysisStep={analysisStep} />
        )}

        {screen === "error" && (
          <ErrorScreen error={error || ""} onRetry={handleRetryAnalysis} />
        )}

        {screen === "results" && result && (
          <ResultsScreen
            ref={resultRef}
            result={result}
            studentName={studentName}
            onRestart={handleRestart}
          />
        )}
      </main>
    </div>
  );
}
