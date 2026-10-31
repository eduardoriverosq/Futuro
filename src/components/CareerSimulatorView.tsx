import React, { useState } from 'react';
import { CareerAnalysis } from '../types';
import { INITIAL_CAREERS } from '../data/mockData';
import { 
  Sparkles, 
  Search, 
  CheckCircle2, 
  AlertTriangle, 
  TrendingUp, 
  BookOpen, 
  Zap, 
  ShieldCheck, 
  Briefcase,
  Layers,
  ArrowRight
} from 'lucide-react';

interface CareerSimulatorViewProps {
  onAddXp: (amount: number, reason: string) => void;
  onGoToTools: () => void;
}

export const CareerSimulatorView: React.FC<CareerSimulatorViewProps> = ({
  onAddXp,
  onGoToTools,
}) => {
  const [selectedCareerIndex, setSelectedCareerIndex] = useState<number>(0);
  const [customQuery, setCustomQuery] = useState<string>('');
  const [universityYear, setUniversityYear] = useState<string>('3er - 4to Año');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [currentAnalysis, setCurrentAnalysis] = useState<CareerAnalysis>(INITIAL_CAREERS[0]);
  const [savedToPassport, setSavedToPassport] = useState<boolean>(false);

  const facultiesList = [
    'Todas las Facultades',
    'Ingeniería y Tecnología',
    'Ciencias de la Salud',
    'Ciencias Jurídicas y Políticas',
    'Negocios y Economía',
    'Ciencias Sociales y Humanidades',
    'Artes, Diseño y Comunicación',
    'Arquitectura y Construcción',
    'Educación'
  ];
  const [selectedFacultyFilter, setSelectedFacultyFilter] = useState<string>('Todas las Facultades');

  // Filter predefined list
  const filteredCareers = INITIAL_CAREERS.filter((item) => {
    if (selectedFacultyFilter === 'Todas las Facultades') return true;
    return item.faculty === selectedFacultyFilter;
  });

  const handleSelectPredefined = (career: CareerAnalysis) => {
    setCurrentAnalysis(career);
    setCustomQuery('');
    setSavedToPassport(false);
  };

  const handleSimulateCustom = async (e: React.FormEvent) => {
    e.preventDefault();
    const query = customQuery.trim();
    if (!query) return;

    // First check if query matches one of our predefined careers
    const match = INITIAL_CAREERS.find(
      (c) => c.career.toLowerCase().includes(query.toLowerCase())
    );
    if (match) {
      setCurrentAnalysis(match);
      onAddXp(50, `Simulación de ${match.career}`);
      setSavedToPassport(true);
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch('/api/analyze-career', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          career: query,
          faculty: selectedFacultyFilter !== 'Todas las Facultades' ? selectedFacultyFilter : undefined,
          universityYear,
        }),
      });

      if (!res.ok) throw new Error('Network error');
      const data = await res.json();
      
      const enriched: CareerAnalysis = {
        ...data,
        humanAdvantageScore: 100 - (data.exposureScore || 65) + 40 > 95 ? 92 : 100 - (data.exposureScore || 65) + 35,
        taskBreakdown: {
          routineTasks: Math.min(Math.round((data.exposureScore || 70) * 0.4), 30),
          analyticalTasks: 35,
          creativeTasks: 20,
          humanRelationalTasks: 25,
        }
      };

      setCurrentAnalysis(enriched);
      onAddXp(50, `Simulación personalizada de ${query}`);
      setSavedToPassport(true);
    } catch (err) {
      console.warn('API fallback active:', err);
      // Graceful local generation for any unknown major
      const fallback: CareerAnalysis = {
        career: query,
        faculty: selectedFacultyFilter,
        universityYear,
        exposureScore: 68,
        automationRisk: 'Moderado en sistematización de información, síntesis documental y reportes iniciales.',
        augmentationPotential: 'Muy Alto en investigación aplicada, formulación de estrategias y gestión de proyectos complejos.',
        emergingRoles: [
          `Especialista en Transformación e IA en ${query}`,
          `Auditor de Metodologías Aumentadas para ${query}`,
          `Consultor de Flujos Agénticos en ${query}`
        ],
        skillsToMaster: [
          'Evaluación rigurosa de alucinaciones en modelos de lenguaje',
          'Ingeniería de contexto y prompting estructurado',
          'Pensamiento crítico y discernimiento ético situado',
          'Comunicación estratégica y liderazgo empático'
        ],
        practicalTools: [
          { name: 'NotebookLM', use: 'Análisis exhaustivo de fuentes bibliográficas y normativas con citas' },
          { name: 'Gemini 3.8 / ChatGPT Plus', use: 'Co-razonamiento en resolución de casos y redacción estructurada' },
          { name: 'Perplexity Pro', use: 'Rastreo de papers académicos y datos empíricos recientes en tiempo real' }
        ],
        horizonRecommendation: `Para un futuro profesional de ${query}, la IA representa la oportunidad de elevar el estándar del trabajo intelectual: delegar la rutina y enfocar la energía en el juicio crítico, el diseño innovador y el impacto humano tangible.`,
        humanAdvantageScore: 82,
        taskBreakdown: {
          routineTasks: 15,
          analyticalTasks: 35,
          creativeTasks: 25,
          humanRelationalTasks: 25
        }
      };
      setCurrentAnalysis(fallback);
      onAddXp(50, `Simulación de ${query}`);
      setSavedToPassport(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-10">
      {/* Title & Introduction */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs text-indigo-400 font-mono tracking-wide uppercase mb-1">
            <span>Simulador de Exposición e Impacto Profesional</span>
            <span aria-hidden="true">·</span>
            <span>Yo Aprendo</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Diagnóstico de IA para Carreras Universitarias
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
            Descubre qué tareas de tu disciplina serán automatizadas, qué capacidades se amplifican exponencialmente 
            y cuáles son los roles emergentes con mayor proyección al 2030.
          </p>
        </div>

        {/* Quick Year Selector */}
        <div className="flex items-center gap-2 shrink-0">
          <span className="text-xs text-slate-400">Año cursado:</span>
          <select
            value={universityYear}
            onChange={(e) => setUniversityYear(e.target.value)}
            className="bg-slate-900 border border-slate-700 text-xs text-slate-200 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          >
            <option value="1er - 2do Año">1er - 2do Año (Ciclo Básico)</option>
            <option value="3er - 4to Año">3er - 4to Año (Ciclo Avanzado)</option>
            <option value="Tesis / Egresado">Tesis / Recién Egresado</option>
            <option value="Posgrado / Máster">Posgrado / Especialidad</option>
          </select>
        </div>
      </div>

      {/* Simulator Inputs & Faculty Quick Select */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Side: Career Picker / Search (5 cols) */}
        <div className="lg:col-span-5 space-y-5">
          {/* Custom Search Form */}
          <form onSubmit={handleSimulateCustom} className="bg-slate-900/80 border border-slate-800 rounded-xl p-4">
            <label className="block text-xs font-semibold text-slate-200 mb-2">
              Escribe cualquier carrera o especialidad:
            </label>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={customQuery}
                  onChange={(e) => setCustomQuery(e.target.value)}
                  placeholder="Ej: Odontología, Periodismo, Sociología..."
                  className="w-full bg-slate-950 border border-slate-700/80 rounded-lg pl-9 pr-3 py-2 text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-indigo-500"
                />
              </div>
              <button
                type="submit"
                disabled={isLoading || !customQuery.trim()}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5 shrink-0"
              >
                {isLoading ? (
                  <span>Analizando...</span>
                ) : (
                  <>
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Analizar</span>
                  </>
                )}
              </button>
            </div>
            <p className="text-[11px] text-slate-500 mt-2">
              Conexión directa con modelo Gemini 3.8 para evaluar cualquier malla curricular.
            </p>
          </form>

          {/* Predefined Faculties & Careers */}
          <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-slate-300">
                O selecciona una carrera modelo:
              </span>
              <span className="text-[11px] font-mono text-slate-500">
                {filteredCareers.length} carreras
              </span>
            </div>

            {/* Filter by faculty */}
            <div className="mb-3">
              <select
                value={selectedFacultyFilter}
                onChange={(e) => setSelectedFacultyFilter(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 text-xs text-slate-300 rounded-lg px-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              >
                {facultiesList.map((fac, idx) => (
                  <option key={idx} value={fac}>{fac}</option>
                ))}
              </select>
            </div>

            <div className="space-y-1.5 max-h-[380px] overflow-y-auto pr-1">
              {filteredCareers.map((c, idx) => {
                const isSelected = currentAnalysis.career === c.career;
                return (
                  <button
                    key={idx}
                    onClick={() => handleSelectPredefined(c)}
                    className={`w-full text-left p-3 rounded-lg border text-xs transition-all flex items-center justify-between ${
                      isSelected
                        ? 'bg-indigo-950/60 border-indigo-500/70 text-white shadow-sm'
                        : 'bg-slate-950/40 border-slate-800/80 text-slate-300 hover:border-slate-700 hover:bg-slate-900'
                    }`}
                  >
                    <div>
                      <div className="font-semibold text-slate-200">{c.career}</div>
                      <div className="text-[11px] text-slate-400">{c.faculty}</div>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="font-mono text-indigo-400 font-bold tabular-nums">
                        {c.exposureScore}%
                      </span>
                      <span className="block text-[10px] text-slate-500">Exposición</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Side: Analysis Results Dashboard (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 sm:p-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/5 rounded-full blur-2xl pointer-events-none" />

            {/* Header of Report */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5 mb-6">
              <div>
                <span className="text-xs font-mono text-indigo-400 block mb-1">
                  Reporte de Adaptabilidad · {universityYear}
                </span>
                <h2 className="text-2xl font-bold text-white tracking-tight">
                  {currentAnalysis.career}
                </h2>
                {currentAnalysis.faculty && (
                  <span className="text-xs text-slate-400">
                    Área: {currentAnalysis.faculty}
                  </span>
                )}
              </div>

              {/* Exposure Score Meter */}
              <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-3 px-4 flex items-center gap-3 shrink-0">
                <div className="w-12 h-12 rounded-lg bg-indigo-950/80 border border-indigo-800/50 flex flex-col items-center justify-center font-mono">
                  <span className="text-base font-bold text-indigo-300 tabular-nums">
                    {currentAnalysis.exposureScore}%
                  </span>
                </div>
                <div>
                  <div className="text-xs font-semibold text-slate-200">Índice de Exposición a IA</div>
                  <div className="text-[11px] text-slate-400">Transformación de flujos de trabajo</div>
                </div>
              </div>
            </div>

            {/* Dual Cards: Automation Risk vs Augmentation Potential */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <div className="bg-slate-950/60 border border-amber-900/30 rounded-xl p-4">
                <div className="flex items-center gap-2 text-amber-400 text-xs font-semibold mb-2">
                  <AlertTriangle className="w-4 h-4 shrink-0" />
                  <span>Riesgo de Automatización en Tareas:</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {currentAnalysis.automationRisk}
                </p>
              </div>

              <div className="bg-slate-950/60 border border-emerald-900/30 rounded-xl p-4">
                <div className="flex items-center gap-2 text-emerald-400 text-xs font-semibold mb-2">
                  <TrendingUp className="w-4 h-4 shrink-0" />
                  <span>Potencial de Aumento Cognitivo:</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {currentAnalysis.augmentationPotential}
                </p>
              </div>
            </div>

            {/* Emerging Roles */}
            <div className="mb-6">
              <div className="flex items-center gap-2 text-xs font-semibold text-indigo-300 uppercase tracking-wide mb-3">
                <Briefcase className="w-4 h-4 text-indigo-400" />
                <span>Nuevos Roles Híbridos & Oportunidades 2026–2030:</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {currentAnalysis.emergingRoles.map((role, idx) => (
                  <div
                    key={idx}
                    className="bg-slate-950/80 border border-slate-800/90 rounded-lg p-3 text-xs text-slate-200 font-medium hover:border-indigo-500/40 transition-colors"
                  >
                    <span className="text-[10px] text-indigo-400 font-mono block mb-1">
                      Rol Emergente 0{idx + 1}
                    </span>
                    {role}
                  </div>
                ))}
              </div>
            </div>

            {/* 4 Core Skills to Master */}
            <div className="mb-6">
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-200 uppercase tracking-wide mb-3">
                <Zap className="w-4 h-4 text-amber-400" />
                <span>Habilidades Críticas a Desarrollar Antes de Graduarte:</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {currentAnalysis.skillsToMaster.map((skill, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-2 bg-slate-950/50 p-2.5 rounded-lg border border-slate-800/70"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span className="text-slate-300">{skill}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Practical Tools Applied to this major */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-200 uppercase tracking-wide">
                  <BookOpen className="w-4 h-4 text-blue-400" />
                  <span>Caja de Herramientas Recomendada:</span>
                </div>
                <button
                  onClick={onGoToTools}
                  className="text-xs text-indigo-400 hover:text-indigo-300 inline-flex items-center gap-1"
                >
                  <span>Explorar todas las herramientas</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="space-y-2">
                {currentAnalysis.practicalTools.map((tool, idx) => (
                  <div
                    key={idx}
                    className="bg-slate-950/60 border border-slate-800 p-3 rounded-lg text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                  >
                    <span className="font-semibold text-indigo-300 shrink-0">
                      {tool.name}
                    </span>
                    <span className="text-slate-400 sm:text-right">
                      {tool.use}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Instructors' Horizon Recommendation */}
            <div className="bg-gradient-to-r from-purple-950/40 via-indigo-950/40 to-blue-950/40 border border-indigo-800/40 rounded-xl p-4 sm:p-5">
              <div className="flex items-center gap-2 text-xs font-semibold text-indigo-300 mb-1.5">
                <ShieldCheck className="w-4 h-4 text-indigo-400" />
                <span>Recomendación Estratégica de María Elena Rúa & Eduardo Riveros:</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed italic">
                "{currentAnalysis.horizonRecommendation}"
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
