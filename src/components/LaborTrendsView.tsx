import React, { useState } from 'react';
import { LABOR_TRENDS_DATA } from '../data/mockData';
import { 
  ArrowUpRight, 
  BrainCircuit, 
  CheckCircle2, 
  Layers, 
  Sparkles, 
  Clock, 
  Vote
} from 'lucide-react';

interface LaborTrendsViewProps {
  onGoToSimulator: () => void;
  onAddXp: (amount: number, reason: string) => void;
}

export const LaborTrendsView: React.FC<LaborTrendsViewProps> = ({
  onGoToSimulator,
  onAddXp,
}) => {
  const [selectedHorizon, setSelectedHorizon] = useState<number>(0);
  const [selectedSkillFilter, setSelectedSkillFilter] = useState<'all' | 'human' | 'ai' | 'hybrid'>('all');
  
  // Interactive Live Poll state
  const [pollVoted, setPollVoted] = useState<boolean>(false);
  const [selectedPollOption, setSelectedPollOption] = useState<number | null>(null);
  const [pollCounts, setPollCounts] = useState<number[]>([142, 289, 78, 194]);

  const pollOptions = [
    { label: 'Incertidumbre / Temor de precarización', color: 'from-amber-500/20 to-orange-500/20' },
    { label: 'Curiosidad y entusiasmo por aprender', color: 'from-blue-500/20 to-cyan-500/20' },
    { label: 'Escepticismo sobre las promesas tecnológicas', color: 'from-slate-500/20 to-zinc-500/20' },
    { label: 'Confianza en mi capacidad de adaptación humana', color: 'from-purple-500/20 to-indigo-500/20' },
  ];

  const handleVotePoll = (index: number) => {
    if (pollVoted) return;
    const updated = [...pollCounts];
    updated[index] += 1;
    setPollCounts(updated);
    setSelectedPollOption(index);
    setPollVoted(true);
    onAddXp(30, 'Voto en encuesta de tendencias');
  };

  const totalPollVotes = pollCounts.reduce((acc, v) => acc + v, 0);

  const filteredSkills = LABOR_TRENDS_DATA.humanVsAiMatrix.filter((item) => {
    if (selectedSkillFilter === 'all') return true;
    if (selectedSkillFilter === 'human') return item.humanAdvantage.includes('Humana');
    if (selectedSkillFilter === 'ai') return item.humanAdvantage.includes('IA');
    if (selectedSkillFilter === 'hybrid') return item.humanAdvantage.includes('Híbrida');
    return true;
  });

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 p-6 sm:p-10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-3xl">
          <div className="flex items-center gap-2 text-xs text-indigo-400 font-mono tracking-wide uppercase mb-3">
            <span>Observatorio de Inteligencia Artificial & Empleo</span>
            <span aria-hidden="true">·</span>
            <span>Estudiantes Universitarios</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-4 text-balance">
            Tendencias Laborales & Reconfiguración del Trabajo 2025–2035
          </h1>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed mb-6">
            La inteligencia artificial generativa no destruye empleos de manera uniforme: transforma tareas específicas. 
            El 85% de las actividades cognitivas rutinarias se están acelerando, mientras que el juicio crítico, 
            la empatía y la gobernanza ética experimentan la mayor prima salarial de la historia.
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={onGoToSimulator}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-sm font-semibold transition-colors shadow-lg shadow-indigo-600/20"
            >
              <span>Simular mi Carrera Universitaria</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
            <div className="text-xs text-slate-400">
              Datos consolidados de informes WEF, OCDE y Harvard Business School.
            </div>
          </div>
        </div>
      </div>

      {/* 4-Metric Quantitative Rigor Row */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-white">Indicadores Macroeconómicos del Futuro del Empleo</h2>
          <span className="text-xs text-slate-400 font-mono">Actualizado Periodo 2025–2026</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {LABOR_TRENDS_DATA.macroStats.map((item, idx) => (
            <div
              key={idx}
              className="bg-slate-900/70 border border-slate-800/80 rounded-xl p-5 hover:border-indigo-500/40 transition-colors"
            >
              <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono tracking-tight tabular-nums mb-1">
                {item.metric}
              </div>
              <div className="text-xs font-semibold text-indigo-300 mb-2">
                {item.label}
              </div>
              <p className="text-xs text-slate-400 leading-relaxed mb-3">
                {item.detail}
              </p>
              <div className="text-[11px] text-slate-500 border-t border-slate-800/60 pt-2 font-mono">
                Fuente: {item.source}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Human Advantage vs AI Capabilities Matrix */}
      <section className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-xl font-bold text-white mb-1">
              Matriz Comparativa: Ventaja Humana vs Capacidades de la IA
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Identifica dónde reside tu valor no replicable como futuro profesional universitario.
            </p>
          </div>

          {/* Interactive filter tabs */}
          <div className="flex items-center gap-1 p-1 bg-slate-950 rounded-lg border border-slate-800 shrink-0">
            {[
              { id: 'all', label: 'Todas' },
              { id: 'human', label: 'Ventaja Humana' },
              { id: 'ai', label: 'Dominio de IA' },
              { id: 'hybrid', label: 'Simbiosis Híbrida' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedSkillFilter(tab.id as any)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
                  selectedSkillFilter === tab.id
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          {filteredSkills.map((row, idx) => (
            <div
              key={idx}
              className="bg-slate-950/70 border border-slate-800/80 rounded-xl p-4 sm:p-5 hover:border-slate-700 transition-all"
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-indigo-950/80 border border-indigo-800/40 flex items-center justify-center text-indigo-400 shrink-0">
                    <BrainCircuit className="w-4 h-4" />
                  </div>
                  <h3 className="text-sm sm:text-base font-semibold text-white">
                    {row.domain}
                  </h3>
                </div>

                <div className="flex items-center gap-2 self-start lg:self-auto">
                  <span className={`text-xs px-2.5 py-1 rounded-md font-mono ${
                    row.humanAdvantage.includes('Humana')
                      ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-800/50'
                      : row.humanAdvantage.includes('IA')
                      ? 'bg-blue-950/80 text-blue-300 border border-blue-800/50'
                      : 'bg-purple-950/80 text-purple-300 border border-purple-800/50'
                  }`}>
                    {row.humanAdvantage}
                  </span>
                  <span className="text-xs font-mono text-slate-400 tabular-nums">
                    Índice de Resiliencia: {row.trendScore}%
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="bg-slate-900/50 p-3.5 rounded-lg border border-slate-800/60">
                  <span className="font-semibold text-emerald-400 block mb-1">
                    Criterio Humano Insustituible:
                  </span>
                  <p className="text-slate-300 leading-relaxed">
                    {row.humanStrength}
                  </p>
                </div>
                <div className="bg-slate-900/50 p-3.5 rounded-lg border border-slate-800/60">
                  <span className="font-semibold text-blue-400 block mb-1">
                    Amplificación por Inteligencia Artificial:
                  </span>
                  <p className="text-slate-300 leading-relaxed">
                    {row.aiCapability}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Interactive Timeline: 2024 to 2035 Horizons */}
      <section className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8">
        <div className="flex items-center gap-2.5 mb-2">
          <Clock className="w-5 h-5 text-indigo-400" />
          <h2 className="text-xl font-bold text-white">
            Horizonte de Transformación Laboral 2024–2035
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-slate-400 mb-6">
          Haz clic en cada era para descubrir cómo evoluciona la demanda de competencias universitarias en el tiempo.
        </p>

        {/* Period Selector Tabs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 mb-6">
          {LABOR_TRENDS_DATA.timelineHorizons.map((h, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedHorizon(idx)}
              className={`p-3.5 rounded-xl text-left border transition-all ${
                selectedHorizon === idx
                  ? 'bg-indigo-950/60 border-indigo-500/80 text-white shadow-md'
                  : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              <div className="text-xs font-mono text-indigo-400 font-semibold mb-1">
                Fase 0{idx + 1}
              </div>
              <div className="text-xs font-medium leading-snug line-clamp-2">
                {h.period.split(':')[0]}
              </div>
            </button>
          ))}
        </div>

        {/* Selected Horizon Showcase */}
        {LABOR_TRENDS_DATA.timelineHorizons[selectedHorizon] && (
          <div className="bg-slate-950 border border-indigo-900/40 rounded-xl p-5 sm:p-6">
            <h3 className="text-base sm:text-lg font-bold text-white mb-2">
              {LABOR_TRENDS_DATA.timelineHorizons[selectedHorizon].period}
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
              {LABOR_TRENDS_DATA.timelineHorizons[selectedHorizon].description}
            </p>

            <div className="bg-indigo-950/30 border border-indigo-800/40 rounded-lg p-4">
              <span className="text-xs font-semibold text-indigo-300 block mb-1">
                ¿Qué significa esto para ti como estudiante universitario hoy?
              </span>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                {LABOR_TRENDS_DATA.timelineHorizons[selectedHorizon].impactStudent}
              </p>
            </div>
          </div>
        )}
      </section>

      {/* Real-time Session Interaction Poll */}
      <section className="bg-gradient-to-br from-slate-900 via-indigo-950/40 to-slate-900 border border-indigo-900/50 rounded-2xl p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-600/20 border border-indigo-500/40 flex items-center justify-center text-indigo-400">
              <Vote className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-white">
                Sondeo en Tiempo Real: Tu Percepción del Futuro
              </h2>
              <p className="text-xs text-slate-400">
                Participa en la encuesta interactiva de la sesión y suma +30 XP a tu pasaporte.
              </p>
            </div>
          </div>
          <div className="text-xs font-mono text-indigo-300 bg-indigo-950/70 border border-indigo-800/60 px-3 py-1.5 rounded-lg self-start sm:self-auto tabular-nums">
            {totalPollVotes} Estudiantes han votado
          </div>
        </div>

        <div className="space-y-3">
          {pollOptions.map((opt, idx) => {
            const count = pollCounts[idx];
            const percentage = Math.round((count / totalPollVotes) * 100);
            const isSelected = selectedPollOption === idx;

            return (
              <button
                key={idx}
                disabled={pollVoted}
                onClick={() => handleVotePoll(idx)}
                className={`w-full text-left p-4 rounded-xl border transition-all relative overflow-hidden ${
                  isSelected
                    ? 'border-indigo-500 bg-indigo-950/40 shadow-sm'
                    : 'border-slate-800 bg-slate-950/60 hover:border-slate-700'
                }`}
              >
                {/* Visual percentage background progress */}
                {pollVoted && (
                  <div
                    className="absolute top-0 bottom-0 left-0 bg-indigo-600/15 pointer-events-none transition-all duration-700"
                    style={{ width: `${percentage}%` }}
                  />
                )}

                <div className="relative flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-5 h-5 rounded-full border flex items-center justify-center text-xs shrink-0 ${
                      isSelected
                        ? 'border-indigo-400 bg-indigo-500 text-white'
                        : 'border-slate-600 text-transparent'
                    }`}>
                      {isSelected ? '✓' : ''}
                    </div>
                    <span className="text-xs sm:text-sm font-medium text-slate-200">
                      {opt.label}
                    </span>
                  </div>

                  {pollVoted && (
                    <div className="flex items-center gap-3 shrink-0 font-mono text-xs tabular-nums">
                      <span className="text-slate-400">{count} votos</span>
                      <span className="font-bold text-indigo-300">{percentage}%</span>
                    </div>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {pollVoted && (
          <div className="mt-4 p-3 bg-emerald-950/30 border border-emerald-800/40 rounded-lg text-xs text-emerald-300 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>¡Voto registrado en vivo! Has ganado +30 XP para tu Pasaporte de Adaptabilidad.</span>
          </div>
        )}
      </section>
    </div>
  );
};
