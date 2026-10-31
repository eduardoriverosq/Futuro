import React, { useState, useEffect } from 'react';
import { TabType, UserProgress } from './types';
import { INITIAL_BADGES } from './data/mockData';
import { Header } from './components/Header';
import { LaborTrendsView } from './components/LaborTrendsView';
import { CareerSimulatorView } from './components/CareerSimulatorView';
import { ToolsAndPromptsView } from './components/ToolsAndPromptsView';
import { DebateForumView } from './components/DebateForumView';
import { PresentationMode } from './components/PresentationMode';
import { GamificationModal } from './components/GamificationModal';
import { LiveReactions, FloatingReaction } from './components/LiveReactions';
import { YoAprendoLogo } from './components/YoAprendoLogo';
import { 
  Sparkles, 
  Award, 
  TvMinimal, 
  GraduationCap, 
  TrendingUp, 
  Users 
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('trends');
  const [isPassportOpen, setIsPassportOpen] = useState<boolean>(false);
  const [floatingReactions, setFloatingReactions] = useState<FloatingReaction[]>([]);

  // Gamification User Progress State
  const [userProgress, setUserProgress] = useState<UserProgress>(() => {
    const saved = localStorage.getItem('yo_aprendo_progress');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // fallback
      }
    }
    return {
      name: 'Estudiante Universitario',
      career: 'Ingeniería / Ciencias',
      faculty: 'Facultad General',
      xp: 120,
      level: 1,
      completedSimulations: 1,
      promptsTested: 1,
      debatesVoted: 0,
      quizScore: 0,
      badges: INITIAL_BADGES,
    };
  });

  // Save progress changes
  useEffect(() => {
    localStorage.setItem('yo_aprendo_progress', JSON.stringify(userProgress));
  }, [userProgress]);

  // Periodic subtle live workshop ambient reactions to simulate high participant engagement
  useEffect(() => {
    const emojis = ['👏', '💡', '🚀', '🤔', '❤️'];
    const interval = setInterval(() => {
      // 30% chance every 7 seconds
      if (Math.random() < 0.35) {
        const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
        triggerReaction(randomEmoji);
      }
    }, 7000);
    return () => clearInterval(interval);
  }, []);

  const triggerReaction = (emoji: string) => {
    const id = `react-${Date.now()}-${Math.random()}`;
    const x = Math.floor(15 + Math.random() * 70); // 15% to 85% width
    setFloatingReactions((prev) => [...prev, { id, emoji, x }]);

    // Remove after 3 seconds
    setTimeout(() => {
      setFloatingReactions((prev) => prev.filter((r) => r.id !== id));
    }, 3000);
  };

  const addXp = (amount: number, reason: string) => {
    setUserProgress((prev) => {
      const newXp = prev.xp + amount;
      let updatedBadges = [...prev.badges];

      if (newXp >= 150) {
        updatedBadges = updatedBadges.map((b) =>
          b.id === 'badge-career-visionary' ? { ...b, unlocked: true, unlockedAt: 'Hoy' } : b
        );
      }
      if (newXp >= 250) {
        updatedBadges = updatedBadges.map((b) =>
          b.id === 'badge-prompt-master' ? { ...b, unlocked: true, unlockedAt: 'Hoy' } : b
        );
      }

      return {
        ...prev,
        xp: newXp,
        level: Math.floor(newXp / 100) + 1,
        badges: updatedBadges,
      };
    });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-indigo-500 selection:text-white">
      {/* Floating Live Reactions Layer */}
      <LiveReactions reactions={floatingReactions} />

      {/* Top Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        userProgress={userProgress}
        onOpenPassport={() => setIsPassportOpen(true)}
      />

      {/* Main Content Viewport */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        {activeTab === 'trends' && (
          <LaborTrendsView
            onGoToSimulator={() => setActiveTab('simulator')}
            onAddXp={addXp}
          />
        )}

        {activeTab === 'simulator' && (
          <CareerSimulatorView
            onAddXp={addXp}
            onGoToTools={() => setActiveTab('tools')}
          />
        )}

        {activeTab === 'tools' && (
          <ToolsAndPromptsView
            onAddXp={addXp}
          />
        )}

        {activeTab === 'debates' && (
          <DebateForumView
            onAddXp={addXp}
            userName={userProgress.name}
            userFaculty={userProgress.faculty}
          />
        )}

        {activeTab === 'presentation' && (
          <PresentationMode
            onNavigateTab={setActiveTab}
            onTriggerReaction={triggerReaction}
            onOpenPassport={() => setIsPassportOpen(true)}
            onAddXp={addXp}
          />
        )}
      </main>

      {/* Bottom Sticky Workshop Interaction Bar (Mobile & Desktop Quick Access) */}
      <div className="sticky bottom-0 z-30 bg-slate-950/95 backdrop-blur-md border-t border-slate-800/80 px-4 py-2.5">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-mono text-slate-300">Taller Universitario en Vivo</span>
            <span className="hidden sm:inline text-slate-600">·</span>
            <span className="hidden sm:inline text-slate-400">Yo Aprendo · Sesión Interactiva</span>
          </div>

          <div className="flex items-center gap-2">
            {/* Quick Reaction Triggers */}
            <div className="flex items-center gap-1 bg-slate-900 border border-slate-800 rounded-lg p-1">
              {['👏', '💡', '🚀', '❤️'].map((emoji) => (
                <button
                  key={emoji}
                  onClick={() => triggerReaction(emoji)}
                  className="px-2 py-1 text-sm hover:scale-125 transition-transform"
                  title="Reaccionar en vivo"
                >
                  {emoji}
                </button>
              ))}
            </div>

            <button
              onClick={() => setIsPassportOpen(true)}
              className="px-3 py-1.5 bg-indigo-600/30 hover:bg-indigo-600/50 border border-indigo-500/40 text-indigo-200 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5"
            >
              <Award className="w-3.5 h-3.5 text-amber-300" />
              <span className="hidden sm:inline">Desafío & Certificado</span>
              <span className="font-mono tabular-nums">({userProgress.xp} XP)</span>
            </button>
          </div>
        </div>
      </div>

      {/* Footer with Explicit Authorship & Brand Attribution */}
      <footer className="bg-slate-950 border-t border-slate-900 py-10 px-4 sm:px-6 lg:px-8 text-xs text-slate-400">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
            <YoAprendoLogo size="sm" showSubtitle={false} />
            <div className="sm:border-l sm:border-slate-800 sm:pl-4 text-xs space-y-0.5">
              <div className="font-semibold text-slate-200">
                María Elena Rúa & Eduardo Riveros
              </div>
              <div className="text-slate-400">
                Autores de la plataforma y el diseño instruccional · Yo Aprendo
              </div>
              <div>
                <a
                  href="https://www.aprendo.website"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-400 hover:text-indigo-300 font-mono text-[11px] font-medium underline underline-offset-2 transition-colors"
                >
                  www.aprendo.website
                </a>
              </div>
            </div>
          </div>

          {/* Nav links */}
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-medium text-slate-400">
            <button onClick={() => setActiveTab('trends')} className="hover:text-indigo-300 transition-colors">
              Tendencias Laborales
            </button>
            <span aria-hidden="true" className="text-slate-700">·</span>
            <button onClick={() => setActiveTab('simulator')} className="hover:text-indigo-300 transition-colors">
              Simulador de Carreras
            </button>
            <span aria-hidden="true" className="text-slate-700">·</span>
            <button onClick={() => setActiveTab('tools')} className="hover:text-indigo-300 transition-colors">
              Herramientas Prácticas
            </button>
            <span aria-hidden="true" className="text-slate-700">·</span>
            <button onClick={() => setActiveTab('debates')} className="hover:text-indigo-300 transition-colors">
              Foro de Debates
            </button>
            <span aria-hidden="true" className="text-slate-700">·</span>
            <button onClick={() => setActiveTab('presentation')} className="hover:text-indigo-300 transition-colors">
              Modo Presentador
            </button>
          </div>

          <div className="text-[11px] text-slate-500 text-center sm:text-right font-mono">
            <div>© 2026 Yo Aprendo · Eduardo Riveros Quiroz.</div>
            <a
              href="https://www.aprendo.website"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-indigo-300 transition-colors"
            >
              www.aprendo.website
            </a>
          </div>
        </div>
      </footer>

      {/* Gamification, Quiz & Certificate Modal */}
      <GamificationModal
        isOpen={isPassportOpen}
        onClose={() => setIsPassportOpen(false)}
        userProgress={userProgress}
        setUserProgress={setUserProgress}
      />
    </div>
  );
}
