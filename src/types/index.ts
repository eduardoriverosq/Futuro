export type TabType = 'trends' | 'simulator' | 'tools' | 'debates' | 'presentation';

export interface CareerAnalysis {
  career: string;
  faculty?: string;
  universityYear?: string;
  exposureScore: number; // 0-100
  automationRisk: string;
  augmentationPotential: string;
  emergingRoles: string[];
  skillsToMaster: string[];
  practicalTools: { name: string; use: string }[];
  horizonRecommendation: string;
  humanAdvantageScore?: number;
  taskBreakdown?: {
    routineTasks: number; // %
    analyticalTasks: number; // %
    creativeTasks: number; // %
    humanRelationalTasks: number; // %
  };
}

export interface AiTool {
  id: string;
  name: string;
  category: 'Investigación' | 'Redacción & Síntesis' | 'Programación' | 'Diseño & Media' | 'Gestión & Estudio';
  badge: string;
  description: string;
  academicUseCases: string[];
  recommendedPromptTemplate: string;
  accessType: 'Gratis' | 'Freemium' | 'Pago';
  url: string;
}

export interface DebateCase {
  id: string;
  title: string;
  category: string;
  context: string;
  question: string;
  options: {
    id: string;
    text: string;
    votes: number;
    percentage: number;
  }[];
  userVotedOptionId?: string;
  comments: {
    id: string;
    author: string;
    faculty: string;
    stance: string;
    text: string;
    likes: number;
    timestamp: string;
  }[];
  instructorNote: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  points: number;
}

export interface Badge {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  unlockedAt?: string;
}

export interface UserProgress {
  name: string;
  career: string;
  faculty: string;
  xp: number;
  level: number;
  completedSimulations: number;
  promptsTested: number;
  debatesVoted: number;
  quizScore: number;
  badges: Badge[];
}

export interface PresentationSlide {
  id: number;
  title: string;
  subtitle: string;
  type: 'concept' | 'data' | 'activity' | 'debate' | 'takeaway';
  content: {
    headline: string;
    bullets: string[];
    highlightQuote?: string;
    interactiveAction?: {
      label: string;
      targetTab: TabType;
    };
  };
  instructorNotes: string;
}
