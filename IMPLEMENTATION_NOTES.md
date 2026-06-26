# PathFinder Nigeria - Career Guidance Quiz App

## Project Overview

This is a fully modularized Next.js application that converts the original monolithic React component into a well-structured, production-ready career guidance platform for Nigerian high school students. The app uses Tailwind CSS for styling and selectively includes only the necessary shadcn/ui components.

## Architecture & Component Structure

### Core Components

```
app/
├── page.tsx                    # Main entry point with state management
├── layout.tsx                  # Root layout (unchanged)
└── globals.css                 # Tailwind configuration

components/
├── Header.tsx                  # Navigation header with restart button
├── ProgressBar.tsx            # Multi-step progress indicator
├── WelcomeScreen.tsx          # Student onboarding form
├── QuizScreen.tsx             # Question display with options
├── AnalysisScreen.tsx         # Loading animation during API call
├── ResultsScreen.tsx          # Career recommendations display
└── ErrorScreen.tsx            # Error handling UI

lib/
└── quiz-data.ts               # Centralized quiz questions and colors

components/ui/
├── button.tsx                 # shadcn Button component
├── card.tsx                   # shadcn Card components
├── badge.tsx                  # shadcn Badge component
└── input.tsx                  # shadcn Input component
```

## Key Features

### 1. **Modular State Management**
- State lives in the main `page.tsx` component
- Clean separation of concerns with dedicated component files
- Each component receives only the props it needs
- Type-safe interfaces for all data structures

### 2. **Responsive Design**
- Mobile-first approach using Tailwind CSS
- Gradient background with green/mint color scheme
- Smooth transitions and animations
- Proper spacing and typography hierarchy

### 3. **User Flow**
1. **Welcome Screen**: Student enters name and class
2. **Quiz Screen**: Answer 8 personalized questions
3. **Analysis Screen**: Animated loading during AI processing
4. **Results Screen**: Comprehensive career recommendations

### 4. **Smart Color System**
Uses a curated 5-color palette:
- **Forest** (#1B4332) - Primary brand color
- **Mint** (#52B788) - Accent/interactive
- **Lime** (#95D5B2) - Borders/highlights
- **Slate** (#636E72) - Secondary text
- **Pale** (#F1F8F4) - Background

## Component Breakdown

### Header.tsx
- Displays app branding with Nigerian focus
- Shows "Start Over" button when not on welcome screen
- Fixed header with forest green background

### ProgressBar.tsx
- Visual indicator of 4-step process
- Checkmarks for completed steps
- Progress lines between steps
- Responsive to current screen

### WelcomeScreen.tsx
- Input field for student name (validated)
- Dropdown for class selection (JSS3-SS3)
- Three feature callouts (5 minutes, AI-powered, Nigeria-focused)
- Disabled submit button until form is complete

### QuizScreen.tsx
- Dynamic question rendering
- Visual progress bar
- Category badge for each question
- Four interactive option buttons
- Smooth selection animation

### AnalysisScreen.tsx
- Animated loading sequence
- Four-step analysis messages
- Pulse animation for current step
- Completed steps show checkmarks

### ResultsScreen.tsx
- Summary of student profile
- 3 top career matches with:
  - Career title and emoji
  - Description and Nigerian context
  - Salary range and growth prospects
- Subject choice recommendations
- 4-5 recommended universities
- Action plan (4 steps)
- Motivational closing message
- Print functionality

### ErrorScreen.tsx
- User-friendly error messages
- Retry button for failed analysis
- Connection troubleshooting text

## Data Flow

### Quiz Questions Structure
```typescript
interface Question {
  id: string;
  category: string;
  icon: string;
  text: string;
  options: Array<{
    label: string;
    tags: string[];  // Career interest tags
  }>;
}
```

### Results Data Structure
```typescript
interface ResultsData {
  summary: string;
  topCareers: Career[];
  subjectChoices: SubjectChoices;
  universities: University[];
  actionPlan: string[];
  motivationalMessage: string;
}
```

## State Management

Main component (`page.tsx`) manages:
- `screen`: Current page state (welcome|quiz|analyzing|results|error)
- `currentQ`: Current question index
- `answers`: Array of quiz responses with tags
- `studentName` & `studentClass`: User info
- `result`: AI-generated recommendations
- `selectedOption`: Currently selected quiz option
- `analysisStep`: Progress of loading animation

## API Integration

- Uses Claude API (Anthropic) for career analysis
- Sends quiz responses and tags to Claude
- Expects structured JSON response
- Handles parsing and error cases
- Supports retry on failure

## Styling Approach

- **Tailwind CSS**: Utility-first styling
- **No CSS Modules**: All styling via Tailwind classes
- **Color System**: CSS custom properties for theming
- **Responsive**: Mobile-first with md: and lg: breakpoints
- **Animations**: Tailwind transitions and custom keyframes

## Performance Considerations

- Component lazy loading via React.lazy() (optional future enhancement)
- Smooth animations without excessive re-renders
- Efficient tag frequency calculation
- Single API call for analysis after quiz completion

## Accessibility Features

- Semantic HTML with proper heading hierarchy
- ARIA labels on form fields
- Keyboard navigation support
- Color contrast compliance
- Alternative text for emojis where appropriate

## Future Enhancements

1. **Persistence**: Save quiz progress to localStorage/database
2. **Mobile Optimization**: Further responsive improvements
3. **Internationalization**: Support for multiple languages
4. **Analytics**: Track user progress and career interests
5. **Social Sharing**: Share results with friends
6. **PDF Export**: Generate downloadable career roadmap

## Installation & Setup

```bash
# Install dependencies
pnpm install

# Run development server
pnpm dev

# Build for production
pnpm build
```

## Dependencies

- **Next.js 16**: React framework
- **React 19**: UI library
- **Tailwind CSS v4**: Styling
- **shadcn/ui**: UI component library (Button, Card, Badge, Input)
- **Mammoth**: Word document parsing (for initial data import)

## Notes for Future Development

1. All components are properly typed with TypeScript
2. Quiz questions and colors are centralized in `lib/quiz-data.ts`
3. Components are fully modular and can be reused
4. No global state management needed (props drilling is minimal)
5. API endpoint for Claude can be moved to environment variables
