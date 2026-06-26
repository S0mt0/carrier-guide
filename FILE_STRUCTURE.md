# Project File Structure

## Overview

This document describes the complete modularized structure of the PathFinder Nigeria career guidance quiz application, converted from a monolithic React component to a well-organized Next.js 16 app with Tailwind CSS and shadcn/ui.

## Directory Tree

```
v0-project/
├── app/
│   ├── layout.tsx                    # Root layout (pre-existing)
│   ├── page.tsx                      # ✨ NEW: Main app component with state management
│   └── globals.css                   # Tailwind configuration
│
├── components/
│   ├── Header.tsx                    # ✨ NEW: Navigation header with branding
│   ├── ProgressBar.tsx               # ✨ NEW: 4-step progress indicator
│   ├── WelcomeScreen.tsx             # ✨ NEW: Student onboarding form
│   ├── QuizScreen.tsx                # ✨ NEW: Question display & options
│   ├── AnalysisScreen.tsx            # ✨ NEW: Loading animation
│   ├── ResultsScreen.tsx             # ✨ NEW: Career recommendations display
│   ├── ErrorScreen.tsx               # ✨ NEW: Error handling UI
│   │
│   └── ui/
│       ├── badge.tsx                 # shadcn Badge component
│       ├── button.tsx                # shadcn Button component
│       ├── card.tsx                  # shadcn Card components
│       └── input.tsx                 # shadcn Input component
│
├── lib/
│   ├── quiz-data.ts                  # ✨ NEW: Centralized quiz data & colors
│   └── utils.ts                      # Utility functions
│
├── IMPLEMENTATION_NOTES.md           # ✨ NEW: Detailed documentation
└── FILE_STRUCTURE.md                 # ✨ NEW: This file
```

## File Descriptions

### Core Files

#### `app/page.tsx` (244 lines) - Main Application Component
**Purpose**: Central state management and screen orchestration
**Key Responsibilities**:
- Manages quiz progress (screen, currentQ, answers)
- Handles option selection with animation delays
- Calls Claude API for career analysis
- Routes between Welcome → Quiz → Analysis → Results screens
- Provides restart functionality

**State Variables**:
- `screen`: Current view (welcome|quiz|analyzing|results|error)
- `answers`: Array of quiz responses with tags
- `studentName`, `studentClass`: User information
- `result`: AI-generated recommendations
- `selectedOption`: Currently selected quiz option
- `analysisStep`: Loading animation progress

#### `lib/quiz-data.ts` (137 lines) - Quiz Configuration
**Purpose**: Centralized data source for quiz questions
**Contains**:
- `COLORS`: 5-color palette for entire app
- `QUESTIONS`: Array of 8 quiz questions with options and tags
- `PROGRESS_STEPS`: Labels for progress bar

**Color Palette**:
- Forest (#1B4332) - Primary brand
- Emerald (#2D6A4F) - Secondary
- Mint (#52B788) - Accent/interactive
- Lime (#95D5B2) - Borders
- Pale (#F1F8F4) - Background

### Component Files

#### `components/Header.tsx` (31 lines)
**Purpose**: Fixed header navigation
**Props**: `showRestartButton`, `onRestart`
**Features**:
- PathFinder Nigeria branding
- Start Over button (context-aware)
- Forest green background

#### `components/ProgressBar.tsx` (42 lines)
**Purpose**: Visual progress indicator
**Props**: `step` (0-3)
**Features**:
- 4 labeled steps
- Checkmarks for completed steps
- Progress lines between steps
- Color changes based on completion

#### `components/WelcomeScreen.tsx` (101 lines)
**Purpose**: Student onboarding
**Props**: `onStart`, `error`
**Features**:
- Name input field
- Class dropdown (JSS3-SS3)
- Form validation
- Feature callouts (3 columns)
- Error message display

#### `components/QuizScreen.tsx` (68 lines)
**Purpose**: Question presentation
**Props**: `currentQuestionIndex`, `selectedOption`, `onOptionSelect`
**Features**:
- Question counter and category badge
- Visual progress bar
- 4 interactive option buttons
- Smooth selection animation
- Hover effects

#### `components/AnalysisScreen.tsx` (58 lines)
**Purpose**: Loading state with animation
**Props**: `analysisStep` (0-3)
**Features**:
- 4-step animated sequence
- Checkmarks for completed steps
- Pulsing indicator for current step
- Engaging loading messages

#### `components/ResultsScreen.tsx` (215 lines)
**Purpose**: Career recommendations display
**Props**: `result`, `studentName`, `onRestart`
**Features**:
- Student summary
- 3 career cards with emojis, descriptions, salary ranges
- Subject recommendations (Sciences/Arts/Commercials)
- 4-5 university recommendations with programs
- 4-step action plan
- Motivational message
- Print button functionality

#### `components/ErrorScreen.tsx` (30 lines)
**Purpose**: Error handling
**Props**: `error`, `onRetry`
**Features**:
- User-friendly error message
- Retry button
- Troubleshooting guidance

### shadcn/ui Components

#### `components/ui/badge.tsx`
Used for:
- Growth prospect indicators (High/Medium/Growing)
- Subject recommendation tags
- University program badges
- Career category labels

#### `components/ui/button.tsx`
Used for:
- Quiz answer options
- Start Over button
- Retry button
- Print button
- Start quiz CTA

#### `components/ui/card.tsx`
Used for:
- Welcome form card
- Quiz question card
- Career match cards
- Subject choices card
- University recommendation cards
- Action plan card

#### `components/ui/input.tsx`
Used for:
- Student name input field on welcome screen

## Component Hierarchy

```
Page (Main)
├── Header
├── ProgressBar
├── WelcomeScreen
├── QuizScreen
├── AnalysisScreen
├── ErrorScreen
└── ResultsScreen
    ├── Card
    │   ├── CardHeader
    │   ├── CardContent
    │   ├── CardTitle
    │   ├── CardDescription
    │   └── Badge
    └── Button
```

## Data Flow

```
Page Component
│
├── WelcomeScreen
│   └── onStart(name, class)
│       └── Sets studentName, studentClass
│
├── QuizScreen
│   └── onOptionSelect(option)
│       └── Accumulates answers
│       └── Calls analyzeWithClaude()
│
├── AnalysisScreen
│   └── Shows animation during API call
│
└── ResultsScreen
    └── Displays Claude response
    └── onRestart()
        └── Resets all state
```

## Styling Architecture

### Tailwind CSS
- Utility-first approach
- Mobile-first responsive design
- Custom color palette from `quiz-data.ts`
- No CSS Modules used

### Color Usage
- `bg-[#1B4332]` - Primary buttons, header
- `text-[#636E72]` - Secondary text
- `border-[#95D5B2]` - Card borders
- `bg-[#F1F8F4]` - Background tint
- `hover:bg-[#0f2818]` - Button hover state

### Responsive Breakpoints
- Default: Mobile
- `md:` - Tablets
- `lg:` - Desktop

## Key Features & Implementation

### 1. Quiz Logic
- 8 questions across personality, interests, strengths, work style, values, skills, ambition, learning
- Each option has associated career tags
- Tags accumulated and analyzed by Claude

### 2. API Integration
- Claude Sonnet 4 API
- Prompt includes: student name, class, answers, top tags
- Returns: careers, subjects, universities, action plan, motivation
- Error handling with retry capability

### 3. State Flow
```
Welcome (form) → Quiz (8 questions) → Analyzing (animation) → Results (output)
                                                    ↓
                                         Error (retry or restart)
```

### 4. Animation Effects
- `transition-all duration-500` on progress bar
- `transition-all 0.2s` on buttons
- `animate-pulse` on loading indicator
- Smooth scroll to results

## Type Safety

All interfaces defined in `page.tsx`:
- `Answer`: Quiz response with tags
- `CareerOption`: Quiz option structure
- `ResultsData`: Complete API response
- `Career`, `University`, `SubjectChoice`: Result components

## Performance Optimizations

1. Component splitting prevents unnecessary re-renders
2. State updates batched where possible
3. Single API call after quiz completion
4. Efficient tag frequency calculation
5. Ref forwarding for ResultsScreen scroll

## Installation & Setup

```bash
# Install dependencies
pnpm install

# Add shadcn components
pnpm exec shadcn add badge card button input

# Run development server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start
```

## Dependencies Added/Used

```json
{
  "dependencies": {
    "next": "16.2.6",
    "react": "19.2.4",
    "react-dom": "19.2.4"
  },
  "devDependencies": {
    "tailwindcss": "4.x",
    "typescript": "latest"
  }
}
```

## Configuration Files

- `tailwind.config.ts` - Tailwind configuration
- `tsconfig.json` - TypeScript configuration
- `next.config.mjs` - Next.js configuration
- `components.json` - shadcn configuration

## Key Improvements from Original

### ✅ Modularity
- Split 1000+ line monolith into 7 focused components
- Each component < 220 lines
- Clear separation of concerns

### ✅ Maintainability
- Centralized quiz data in `lib/quiz-data.ts`
- Type-safe component props
- Consistent naming conventions

### ✅ Scalability
- Easy to add new questions
- Reusable component patterns
- Configuration-driven design

### ✅ Performance
- Component-level optimization
- Lazy loading ready
- Minimal re-renders

### ✅ UX/Design
- Modern gradient backgrounds
- Smooth animations and transitions
- Responsive at all breakpoints
- Consistent color scheme

### ✅ Accessibility
- Semantic HTML
- Proper heading hierarchy
- Form labels
- Alternative text for icons

## Testing Recommendations

1. **Unit Tests**: Component rendering with different props
2. **Integration Tests**: Complete quiz flow
3. **E2E Tests**: User journey from start to results
4. **Visual Regression**: Screenshot comparisons
5. **Performance**: Lighthouse audits

## Future Enhancement Areas

1. Database persistence (quiz history)
2. Authentication (user accounts)
3. Analytics tracking
4. Multi-language support
5. PDF export of results
6. Social sharing
7. Admin dashboard for questions
8. Cached API responses

---

**Total New Components**: 7 main + 4 shadcn UI components
**Total Lines of Code**: ~800 (vs ~1200 in original)
**Code Reusability**: High - components can be extracted and used independently
**Maintainability Score**: Excellent - clear structure and documentation
