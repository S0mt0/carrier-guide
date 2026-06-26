"use client";

import { forwardRef } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface Career {
  title: string;
  emoji: string;
  description: string;
  nigerianContext: string;
  salaryRange: string;
  growthProspect: string;
}

interface University {
  name: string;
  location: string;
  type: string;
  whyRecommended: string;
  topPrograms: string[];
  jambCutoff: string;
}

interface SubjectChoice {
  sciences: string[];
  arts: string[];
  commercials: string[];
  recommended: string;
  rationale: string;
}

interface ResultsData {
  summary: string;
  topCareers: Career[];
  subjectChoices: SubjectChoice;
  universities: University[];
  actionPlan: string[];
  motivationalMessage: string;
}

interface ResultsScreenProps {
  result: ResultsData;
  studentName: string;
  onRestart: () => void;
}

export const ResultsScreen = forwardRef<HTMLDivElement, ResultsScreenProps>(
  ({ result, studentName, onRestart }, ref) => {
    return (
      <div ref={ref} className="space-y-8 pb-12">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-[#1B4332] mb-2">
            Your Career Roadmap, {studentName}! 🎯
          </h2>
          <p className="text-[#636E72] max-w-2xl mx-auto">{result.summary}</p>
        </div>

        {/* Top Careers */}
        <div>
          <h3 className="text-2xl font-bold text-[#1B4332] mb-4">Top Career Matches</h3>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {result.topCareers.map((career, i) => (
              <Card key={i} className="border-[#95D5B2] hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="text-3xl">{career.emoji}</div>
                    <Badge className={`${
                      career.growthProspect === "High"
                        ? "bg-green-500"
                        : career.growthProspect === "Growing"
                        ? "bg-blue-500"
                        : "bg-yellow-500"
                    }`}>
                      {career.growthProspect}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg">{career.title}</CardTitle>
                  <CardDescription>{career.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <div>
                    <p className="font-semibold text-gray-700">In Nigeria:</p>
                    <p className="text-gray-600">{career.nigerianContext}</p>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-700">Entry-level Salary:</p>
                    <p className="text-gray-600">{career.salaryRange}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Subject Choices */}
        <Card className="border-[#95D5B2]">
          <CardHeader>
            <CardTitle className="text-[#1B4332]">Recommended Subject Choices</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-[#F1F8F4] p-4 rounded-lg border border-[#95D5B2]">
              <p className="font-semibold text-[#1B4332] mb-2">
                Stream: <span className="text-[#52B788]">{result.subjectChoices.recommended}</span>
              </p>
              <p className="text-gray-700 text-sm">{result.subjectChoices.rationale}</p>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              {Object.entries(result.subjectChoices).map(([key, value]) => {
                if (key === "recommended" || key === "rationale" || !Array.isArray(value)) return null;
                return (
                  <div key={key} className="space-y-2">
                    <h4 className="font-semibold text-gray-700 capitalize">{key}</h4>
                    <div className="flex flex-wrap gap-2">
                      {value.map((subject, i) => (
                        <Badge key={i} variant="secondary" className="bg-[#E8F5E9] text-[#1B4332]">
                          {subject}
                        </Badge>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Universities */}
        <div>
          <h3 className="text-2xl font-bold text-[#1B4332] mb-4">Recommended Universities</h3>
          <div className="space-y-3">
            {result.universities.map((uni, i) => (
              <Card key={i} className="border-[#95D5B2]">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{uni.name}</CardTitle>
                      <CardDescription>
                        {uni.location} • <span className="font-medium">{uni.type}</span>
                      </CardDescription>
                    </div>
                    <Badge variant="outline" className="border-[#95D5B2] text-[#1B4332]">
                      JAMB: {uni.jambCutoff}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div>
                    <p className="font-semibold text-gray-700 text-sm">Why recommended:</p>
                    <p className="text-gray-600 text-sm">{uni.whyRecommended}</p>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-700 text-sm mb-1">Top Programs:</p>
                    <div className="flex flex-wrap gap-2">
                      {uni.topPrograms.map((prog, i) => (
                        <Badge key={i} className="bg-[#52B788]">{prog}</Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Action Plan */}
        <Card className="border-[#95D5B2] bg-gradient-to-r from-[#F1F8F4] to-white">
          <CardHeader>
            <CardTitle className="text-[#1B4332]">Your Action Plan</CardTitle>
          </CardHeader>
          <CardContent>
            <ol className="space-y-3">
              {result.actionPlan.map((step, i) => (
                <li key={i} className="flex gap-3">
                  <span className="font-bold text-[#52B788] min-w-fit">{i + 1}.</span>
                  <span className="text-gray-700">{step}</span>
                </li>
              ))}
            </ol>
          </CardContent>
        </Card>

        {/* Motivational Message */}
        <div className="bg-[#1B4332] text-white p-8 rounded-2xl text-center space-y-4">
          <div className="text-4xl">✨</div>
          <p className="text-lg leading-relaxed max-w-2xl mx-auto">
            {result.motivationalMessage}
          </p>
        </div>

        {/* CTA */}
        <div className="flex justify-center gap-4 pt-6">
          <Button
            onClick={onRestart}
            className="bg-[#1B4332] hover:bg-[#0f2818]"
          >
            Start Over
          </Button>
          <Button
            variant="outline"
            onClick={() => window.print()}
            className="border-[#95D5B2]"
          >
            Print Results
          </Button>
        </div>
      </div>
    );
  }
);

ResultsScreen.displayName = "ResultsScreen";
