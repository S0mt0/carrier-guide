import { NextRequest, NextResponse } from "next/server";

interface AnalysisRequest {
  studentName: string;
  studentClass: string;
  answers: Array<{
    question: string;
    answer: string;
    tags: string[];
  }>;
}

export async function POST(request: NextRequest) {
  try {
    const body: AnalysisRequest = await request.json();
    const { studentName, studentClass, answers } = body;

    // Validate required fields
    if (!studentName || !studentClass || !answers || answers.length === 0) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Calculate tag frequency
    const tagFrequency: Record<string, number> = {};
    answers.forEach((a) =>
      a.tags.forEach((t) => {
        tagFrequency[t] = (tagFrequency[t] || 0) + 1;
      })
    );

    const topTags = Object.entries(tagFrequency)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map((e) => e[0]);

    // Build the prompt
    const prompt = `You are an expert Nigerian career counselor helping a high school student. Analyze their quiz responses and provide comprehensive career guidance tailored to Nigeria's job market, universities, and educational system.

Student Name: ${studentName}
Class: ${studentClass}

Quiz Responses:
${answers
  .map((a, i) => `Q${i + 1}: ${a.question}\nAnswer: ${a.answer}`)
  .join("\n\n")}

Dominant Interest Tags: ${topTags.join(", ")}

Respond ONLY with a valid JSON object (no markdown, no backticks) using exactly this structure:
{
  "summary": "2-3 sentences about the student's profile and strengths",
  "topCareers": [
    {
      "title": "Career Title",
      "emoji": "emoji",
      "description": "Why this suits them (2 sentences)",
      "nigerianContext": "Opportunities and outlook in Nigeria specifically",
      "salaryRange": "₦X,000 - ₦Y,000 per month (entry level)",
      "growthProspect": "High/Medium/Growing"
    }
  ],
  "subjectChoices": {
    "sciences": ["list of science subjects to take if applicable"],
    "arts": ["list if applicable"],
    "commercials": ["list if applicable"],
    "recommended": "Sciences/Arts/Commercials/Mixed",
    "rationale": "Why these subjects fit their goals"
  },
  "universities": [
    {
      "name": "University Name",
      "location": "City, State",
      "type": "Federal/State/Private",
      "whyRecommended": "Specific reason for this student",
      "topPrograms": ["Program 1", "Program 2"],
      "jambCutoff": "approximate JAMB cutoff score"
    }
  ],
  "actionPlan": [
    "Immediate action step 1",
    "Action step 2",
    "Action step 3",
    "Action step 4"
  ],
  "motivationalMessage": "An inspiring, personalized closing message for this Nigerian student"
}

Include 3 top careers, 4-5 universities (mix of federal, state, and private if relevant), and make everything specific to Nigeria. Return ONLY the JSON, nothing else.`;

    // Call Anthropic API
    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "API key not configured" },
        { status: 500 }
      );
    }

    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-opus-4-6",
        max_tokens: 4000,
        messages: [{ role: "user", content: prompt }],
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      console.error("[v0] Anthropic API error:", error);
      return NextResponse.json(
        { error: "Failed to analyze responses" },
        { status: response.status }
      );
    }

    const data = await response.json();
    const text = data.content.map((c: any) => c.text || "").join("");

    // Parse JSON from response
    const jsonStart = text.indexOf("{");
    const jsonEnd = text.lastIndexOf("}");

    if (jsonStart === -1 || jsonEnd === -1) {
      return NextResponse.json(
        { error: "Invalid response format from analysis" },
        { status: 500 }
      );
    }

    const parsed = JSON.parse(text.slice(jsonStart, jsonEnd + 1));
    return NextResponse.json(parsed);
  } catch (error) {
    console.error("[v0] Analysis error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
