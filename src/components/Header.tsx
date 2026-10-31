import React from 'react';
import { TabType, UserProgress } from '../types';
import { YoAprendoLogo } from './YoAprendoLogo';
import { 
  TrendingUp, 
  Cpu, 
  Wrench, 
  MessageSquareQuote, 
  TvMinimal, 
  Award
} from 'lucide-react';

interface HeaderProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  userProgress: UserProgress;
  onOpenPassport: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  userProgress,
  onOpenPassport,
}) => {
  const navItems: { id: TabType; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { id: 'trends', label: 'Tendencias Laborales', icon: TrendingUp },
    { id: 'simulator', label: 'Simulador de Carreras', icon: Cpu },
    { id: 'tools', label: 'Herramientas Prácticas', icon: Wrench },
    { id: 'debates', label: 'Foro de Debates', icon: MessageSquareQuote },
    { id: 'presentation', label: 'Taller Interactivo', icon: TvMinimal },
  ];

  return (
    <header className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur-md border-b border-slate-800/80">
      {/* Authorship & Instructional Design Attribution Bar */}
      <div className="bg-gradient-to-r from-purple-950/70 via-indigo-950/70 to-blue-950/70 border-b border-indigo-900/30 px-4 py-1.5 text-center text-xs text-indigo-200/90 flex flex-wrap items-center justify-center gap-2">
        <span className="font-semibold text-indigo-300">María Elena Rúa & Eduardo Riveros</span>
        <span aria-hidden="true" className="text-indigo-400/50">·</span>
        <span className="text-slate-300 font-normal">Autores de la plataforma y el diseño instruccional</span>
        <span aria-hidden="true" className="text-indigo-400/50">·</span>
        <span className="text-indigo-400 font-medium">Yo Aprendo</span>
        <span aria-hidden="true" className="text-indigo-400/50">·</span>
        <a
          href="https://www.aprendo.website"
          target="_blank"
          rel="noopener noreferrer"
          className="text-cyan-300 hover:text-white underline underline-offset-2 transition-colors font-mono font-medium"
        >
          www.aprendo.website
        </a>
      </div>

      {/* Main Top Bar Contract: Zone 1 (Brand) — Zone 2 (Nav links) — Zone 3 (1 Primary Action) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark */}
        <div className="flex items-center gap-3 shrink-0 cursor-pointer" onClick={() => setActiveTab('trends')}>
          <YoAprendoLogo size="md" showSubtitle={false} />
        </div>

        {/* Zone 2: Navigation Links (single-line, whitespace-nowrap) */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-2 px-3.5 py-2 text-xs xl:text-sm font-medium rounded-lg transition-all whitespace-nowrap shrink-0 ${
                  isActive
                    ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/30 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-indigo-400' : 'text-slate-500'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Zone 3: 1 Primary Action (Gamified Passport & XP Level) */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onOpenPassport}
            className="flex items-center gap-2.5 px-3.5 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white rounded-lg text-xs font-semibold shadow-md transition-all whitespace-nowrap shrink-0 group focus-visible:ring-2 focus-visible:ring-indigo-400"
            title="Abrir Pasaporte del Futuro y Certificación"
          >
            <Award className="w-4 h-4 text-amber-300 group-hover:rotate-12 transition-transform" />
            <span className="hidden sm:inline">Pasaporte del Futuro</span>
            <span className="bg-black/30 px-2 py-0.5 rounded text-[11px] font-mono tabular-nums text-amber-200">
              {userProgress.xp} XP
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Navigation Strip */}
      <div className="lg:hidden flex items-center overflow-x-auto px-4 py-2 gap-1.5 border-t border-slate-900 bg-slate-950/95 scrollbar-none">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap shrink-0 ${
                isActive
                  ? 'bg-indigo-600/30 text-indigo-200 border border-indigo-500/40'
                  : 'text-slate-400 hover:text-slate-200 bg-slate-900/40'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>
    </header>
  );
};
