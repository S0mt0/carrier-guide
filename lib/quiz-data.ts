export const COLORS = {
  forest: "#1B4332",
  emerald: "#2D6A4F",
  mint: "#52B788",
  lime: "#95D5B2",
  cream: "#F8F4E8",
  gold: "#E9C46A",
  amber: "#F4A261",
  rust: "#E76F51",
  charcoal: "#2D3436",
  slate: "#636E72",
  pale: "#F1F8F4",
};

export const QUESTIONS = [
  {
    id: "q1",
    category: "Personality",
    icon: "🧠",
    text: "When you face a difficult problem, how do you usually approach it?",
    options: [
      { label: "I analyze it logically step by step", tags: ["analytical", "STEM"] },
      { label: "I brainstorm creative solutions", tags: ["creative", "arts"] },
      { label: "I talk to others and gather opinions", tags: ["social", "humanities"] },
      { label: "I research thoroughly before acting", tags: ["research", "academic"] },
    ],
  },
  {
    id: "q2",
    category: "Interests",
    icon: "❤️",
    text: "Which activity sounds most exciting to you?",
    options: [
      { label: "Building an app or website", tags: ["tech", "engineering"] },
      { label: "Helping a sick person recover", tags: ["medicine", "care"] },
      { label: "Running a business and making money", tags: ["business", "entrepreneurship"] },
      { label: "Writing stories or creating art", tags: ["creative", "arts"] },
    ],
  },
  {
    id: "q3",
    category: "Strengths",
    icon: "💪",
    text: "Which subjects do you enjoy or excel at the most?",
    options: [
      { label: "Mathematics & Physics", tags: ["STEM", "engineering", "tech"] },
      { label: "Biology & Chemistry", tags: ["medicine", "science"] },
      { label: "Literature, Government & CRS/IRS", tags: ["humanities", "law"] },
      { label: "Economics, Commerce & Accounting", tags: ["business", "finance"] },
    ],
  },
  {
    id: "q4",
    category: "Work Style",
    icon: "🏗️",
    text: "What kind of work environment appeals to you most?",
    options: [
      { label: "Laboratory or research facility", tags: ["research", "science"] },
      { label: "Office or corporate setting", tags: ["business", "finance"] },
      { label: "Outdoors or field work", tags: ["agriculture", "engineering"] },
      { label: "Hospital, clinic, or helping people directly", tags: ["medicine", "social"] },
    ],
  },
  {
    id: "q5",
    category: "Values",
    icon: "🌍",
    text: "What impact do you want your career to have on Nigeria?",
    options: [
      { label: "Advance technology and innovation", tags: ["tech", "engineering"] },
      { label: "Improve healthcare and save lives", tags: ["medicine", "care"] },
      { label: "Create jobs and grow the economy", tags: ["business", "entrepreneurship"] },
      { label: "Educate, govern, or shape society", tags: ["humanities", "law", "public service"] },
    ],
  },
  {
    id: "q6",
    category: "Skills",
    icon: "🛠️",
    text: "People who know you would say you're naturally good at:",
    options: [
      { label: "Solving complex puzzles & calculations", tags: ["analytical", "STEM"] },
      { label: "Communicating and persuading people", tags: ["social", "law", "business"] },
      { label: "Drawing, designing, or creating things", tags: ["creative", "arts"] },
      { label: "Organizing, planning & leading others", tags: ["management", "business"] },
    ],
  },
  {
    id: "q7",
    category: "Ambition",
    icon: "🚀",
    text: "In 15 years, where do you see yourself?",
    options: [
      { label: "Leading a tech company or startup", tags: ["tech", "entrepreneurship"] },
      { label: "Practicing medicine or running a hospital", tags: ["medicine"] },
      { label: "Working in government or diplomacy", tags: ["law", "public service", "humanities"] },
      { label: "Running a successful business empire", tags: ["business", "finance"] },
    ],
  },
  {
    id: "q8",
    category: "Learning",
    icon: "📚",
    text: "How do you prefer to learn new things?",
    options: [
      { label: "Hands-on experiments and practice", tags: ["science", "engineering"] },
      { label: "Reading books and doing research", tags: ["academic", "humanities"] },
      { label: "Watching tutorials and visual content", tags: ["tech", "creative"] },
      { label: "Group discussions and debates", tags: ["social", "law", "business"] },
    ],
  },
];

export const PROGRESS_STEPS = ["Welcome", "Questions", "Analysis", "Results"];
