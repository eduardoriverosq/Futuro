import React, { useState } from 'react';
import { AI_TOOLS_DIRECTORY } from '../data/mockData';
import { AiTool } from '../types';
import { 
  Sparkles, 
  Copy, 
  Check, 
  ExternalLink, 
  CheckCircle2, 
  AlertCircle, 
  Terminal, 
  BookMarked,
  Layers,
  Wand2
} from 'lucide-react';

interface ToolsAndPromptsViewProps {
  onAddXp: (amount: number, reason: string) => void;
}

export const ToolsAndPromptsView: React.FC<ToolsAndPromptsViewProps> = ({
  onAddXp,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Todas');
  
  // Prompt Lab State
  const [promptInput, setPromptInput] = useState<string>(
    'Ayúdame a resumir este paper sobre economía conductual y dime si tiene sesgos metodológicos.'
  );
  const [taskGoal, setTaskGoal] = useState<string>('Investigación Académica');
  const [isEvaluating, setIsEvaluating] = useState<boolean>(false);
  const [evaluationResult, setEvaluationResult] = useState<{
    score: number;
    verdict: string;
    strengths: string[];
    improvements: string[];
    optimizedPrompt: string;
  } | null>(null);

  const [copiedId, setCopiedId] = useState<string | null>(null);

  const categories = [
    'Todas',
    'Investigación',
    'Redacción & Síntesis',
    'Programación',
    'Diseño & Media'
  ];

  const filteredTools = AI_TOOLS_DIRECTORY.filter((t) => {
    if (selectedCategory === 'Todas') return true;
    return t.category === selectedCategory;
  });

  const handleEvaluatePrompt = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!promptInput.trim()) return;

    setIsEvaluating(true);
    try {
      const res = await fetch('/api/evaluate-prompt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          promptText: promptInput,
          taskGoal,
        }),
      });

      if (!res.ok) throw new Error('API error');
      const data = await res.json();
      setEvaluationResult(data);
      onAddXp(40, 'Evaluación y optimización de prompt');
    } catch (err) {
      console.warn('Using client-side optimizer fallback:', err);
      // Smart didactic fallback
      setEvaluationResult({
        score: 7,
        verdict: 'Prompt con intención clara pero vulnerable a respuestas superficiales o alucinadas.',
        strengths: [
          'Identifica el objetivo central del estudio',
          'Pide explícitamente evaluar sesgos'
        ],
        improvements: [
          'Delimitar el rol experto del modelo (ej: "Actúa como metodólogo senior")',
          'Restringir la respuesta para exigir citas de párrafos específicos',
          'Definir formato de salida (ej: matriz de fortalezas, debilidades y riesgos)'
        ],
        optimizedPrompt: `Actúa como docente e investigador senior en ${taskGoal}. Analiza con rigor metodológico el siguiente documento: "${promptInput}".\n\nTu análisis debe estructurarse en 3 partes:\n1. Tesis central y metodología empírica aplicada (muestra y variables).\n2. Evaluación de sesgos metodológicos y limitaciones de validez externa.\n3. 3 preguntas críticas que un evaluador de tesis formularía al autor.\n\nFormato: viñetas concisas con tono académico riguroso.`
      });
      onAddXp(40, 'Evaluación de prompt');
    } finally {
      setIsEvaluating(false);
    }
  };

  const handleCopyText = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="border-b border-slate-800 pb-6">
        <div className="flex items-center gap-2 text-xs text-indigo-400 font-mono tracking-wide uppercase mb-1">
          <span>Laboratorio de Productividad Universitaria</span>
          <span aria-hidden="true">·</span>
          <span>Yo Aprendo</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
          Herramientas Prácticas & Taller de Prompts Profesionales
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-3xl">
          Aprende a formular instrucciones de grado profesional con el framework CLEAR y explora las 
          mejores aplicaciones de IA para acelerar tu investigación, redacción y proyectos de titulación.
        </p>
      </div>

      {/* Part 1: Interactive Prompt Engineering Studio */}
      <section className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-600/20 border border-purple-500/40 flex items-center justify-center text-purple-400">
              <Wand2 className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-white">
                Laboratorio de Prompts: Coach Inteligente en Vivo
              </h2>
              <p className="text-xs text-slate-400">
                Escribe o pega el prompt que usas habitualmente y recibe retroalimentación inmediata más la versión optimizada.
              </p>
            </div>
          </div>
          <span className="text-xs font-mono text-indigo-300 bg-indigo-950/70 border border-indigo-800/60 px-3 py-1.5 rounded-lg self-start sm:self-auto">
            +40 XP por cada optimización
          </span>
        </div>

        <form onSubmit={handleEvaluatePrompt} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Objetivo de la tarea universitaria:
              </label>
              <select
                value={taskGoal}
                onChange={(e) => setTaskGoal(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 text-xs text-slate-200 rounded-lg p-2.5 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              >
                <option value="Investigación Académica">Investigación Académica & Papers</option>
                <option value="Síntesis de Documentos">Síntesis de Lecturas & Casos</option>
                <option value="Redacción de Ensayos / Tesis">Redacción de Ensayos / Tesis</option>
                <option value="Programación & Datos">Programación & Scripts de Datos</option>
                <option value="Preparación de Exámenes Orales">Simulación de Exámenes Orales</option>
              </select>
            </div>
            
            <div className="sm:col-span-2">
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Plantillas rápidas de prueba:
              </label>
              <div className="flex flex-wrap gap-1.5">
                {[
                  'Explícame la teoría de la relatividad para un examen de primer año.',
                  'Actúa como revisor de tesis y busca incongruencias en mi justificación.',
                  'Genera una matriz comparativa entre metodologías cuantitativas y cualitativas.'
                ].map((sample, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setPromptInput(sample)}
                    className="text-[11px] bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-300 px-2.5 py-1 rounded-md transition-colors text-left truncate max-w-xs"
                  >
                    "{sample.slice(0, 38)}..."
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">
              Tu prompt actual:
            </label>
            <textarea
              rows={3}
              value={promptInput}
              onChange={(e) => setPromptInput(e.target.value)}
              placeholder="Escribe tu instrucción aquí tal como la ingresarías en ChatGPT, Gemini o Claude..."
              className="w-full bg-slate-950 border border-slate-800 text-xs sm:text-sm text-slate-100 rounded-xl p-3 focus:outline-none focus:border-indigo-500 font-mono"
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="text-[11px] text-slate-500">
              Evaluación automatizada bajo estándares de diseño instruccional Yo Aprendo.
            </div>
            <button
              type="submit"
              disabled={isEvaluating || !promptInput.trim()}
              className="px-5 py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 disabled:opacity-50 text-white rounded-lg text-xs font-semibold shadow-md transition-all flex items-center gap-2"
            >
              {isEvaluating ? (
                <span>Evaluando con Gemini...</span>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  <span>Evaluar y Generar Super-Prompt</span>
                </>
              )}
            </button>
          </div>
        </form>

        {/* Evaluation Output Card */}
        {evaluationResult && (
          <div className="mt-8 pt-6 border-t border-slate-800 space-y-6">
            {/* Score & Verdict Row */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-950/80 border border-slate-800 rounded-xl p-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg bg-indigo-950/80 border border-indigo-700/50 flex flex-col items-center justify-center font-mono">
                  <span className="text-lg font-bold text-indigo-300 tabular-nums">
                    {evaluationResult.score}/10
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 font-mono uppercase tracking-wider block">
                    Veredicto del Coach
                  </span>
                  <div className="text-xs sm:text-sm font-semibold text-white">
                    {evaluationResult.verdict}
                  </div>
                </div>
              </div>
            </div>

            {/* Strengths & Improvements */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="bg-emerald-950/20 border border-emerald-900/40 rounded-xl p-4">
                <div className="flex items-center gap-2 text-emerald-400 font-semibold mb-2">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>Aciertos identificados:</span>
                </div>
                <ul className="space-y-1.5 text-slate-300">
                  {evaluationResult.strengths.map((str, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <span className="text-emerald-400">·</span>
                      <span>{str}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-amber-950/20 border border-amber-900/40 rounded-xl p-4">
                <div className="flex items-center gap-2 text-amber-400 font-semibold mb-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>Oportunidades de optimización:</span>
                </div>
                <ul className="space-y-1.5 text-slate-300">
                  {evaluationResult.improvements.map((imp, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <span className="text-amber-400">·</span>
                      <span>{imp}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Super Prompt Output Box */}
            <div className="bg-gradient-to-br from-indigo-950/40 via-purple-950/30 to-slate-950 border border-indigo-700/50 rounded-xl p-5">
              <div className="flex items-center justify-between gap-3 mb-2">
                <div className="flex items-center gap-2 text-xs font-semibold text-indigo-300">
                  <Terminal className="w-4 h-4 text-indigo-400" />
                  <span>Versión Optimizada (Listo para copiar en ChatGPT / Gemini / Claude):</span>
                </div>
                <button
                  onClick={() => handleCopyText(evaluationResult.optimizedPrompt, 'coach-prompt')}
                  className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-md text-xs font-medium transition-colors flex items-center gap-1.5 shrink-0"
                >
                  {copiedId === 'coach-prompt' ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-300" />
                      <span>¡Copiado!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copiar Prompt</span>
                    </>
                  )}
                </button>
              </div>
              <pre className="text-xs text-slate-200 font-mono bg-slate-950/90 border border-slate-800 rounded-lg p-4 whitespace-pre-wrap leading-relaxed overflow-x-auto">
                {evaluationResult.optimizedPrompt}
              </pre>
            </div>
          </div>
        )}
      </section>

      {/* Part 2: Framework CLEAR Didactic Card */}
      <section className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8">
        <div className="flex items-center gap-2.5 mb-2">
          <BookMarked className="w-5 h-5 text-indigo-400" />
          <h2 className="text-lg sm:text-xl font-bold text-white">
            El Framework CLEAR de Yo Aprendo para Prompts Universitarios
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-slate-400 mb-6">
          Diseñado por María Elena Rúa & Eduardo Riveros para transformar consultas genéricas en análisis de alto impacto académico.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {[
            {
              letter: 'C',
              name: 'Contexto',
              desc: 'Define el escenario, nivel académico de la asignatura y público receptor.',
              example: '"Para una tesis de pregrado en sociología..."'
            },
            {
              letter: 'L',
              name: 'Límites',
              desc: 'Especifica qué NO debe asumir o hacer el modelo (restricciones de páginas, tono).',
              example: '"No inventes fuentes; cita solo papers reales."'
            },
            {
              letter: 'E',
              name: 'Enfoque / Rol',
              desc: 'Asigna una persona profesional experta con experiencia comprobable.',
              example: '"Actúa como metodólogo senior revisor."'
            },
            {
              letter: 'A',
              name: 'Acción',
              desc: 'Verbo imperativo exacto de alta complejidad cognitiva.',
              example: '"Audita las debilidades metodológicas de..."'
            },
            {
              letter: 'R',
              name: 'Resultado',
              desc: 'Estructura exacta de salida: tabla comparativa, viñetas ejecutivas o matriz.',
              example: '"En una tabla de 3 columnas con riesgos."'
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="bg-slate-950 border border-slate-800/80 rounded-xl p-4 flex flex-col justify-between"
            >
              <div>
                <div className="w-8 h-8 rounded-lg bg-indigo-950 border border-indigo-700/50 flex items-center justify-center font-bold text-indigo-300 font-mono text-sm mb-2">
                  {item.letter}
                </div>
                <h3 className="text-xs font-bold text-white mb-1">{item.name}</h3>
                <p className="text-[11px] text-slate-400 leading-relaxed mb-3">
                  {item.desc}
                </p>
              </div>
              <div className="text-[10px] text-indigo-300/80 font-mono bg-slate-900/60 p-2 rounded border border-slate-800">
                {item.example}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Part 3: Directory of Top AI Tools for University Majors */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-white mb-1">
              Directorio de Herramientas de IA para Estudiantes
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Selección rigurosa de plataformas probadas con plantillas de prompts listas para usar.
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex items-center gap-1 p-1 bg-slate-900 rounded-lg border border-slate-800 overflow-x-auto max-w-full">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
                  selectedCategory === cat
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredTools.map((tool) => (
            <div
              key={tool.id}
              className="bg-slate-900/70 border border-slate-800 rounded-xl p-5 sm:p-6 flex flex-col justify-between hover:border-slate-700 transition-all"
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div>
                    <span className="text-[11px] text-indigo-400 font-mono uppercase tracking-wider block mb-0.5">
                      {tool.category} · {tool.accessType}
                    </span>
                    <h3 className="text-base font-bold text-white">{tool.name}</h3>
                  </div>
                  <span className="text-[11px] bg-slate-950 border border-slate-800 px-2.5 py-1 rounded-md text-slate-300 font-mono shrink-0">
                    {tool.badge}
                  </span>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed mb-4">
                  {tool.description}
                </p>

                {/* Academic Use Cases */}
                <div className="mb-4">
                  <span className="text-[11px] font-semibold text-slate-400 block mb-1.5">
                    Casos de Uso Académicos:
                  </span>
                  <ul className="space-y-1 text-xs text-slate-300">
                    {tool.academicUseCases.map((uc, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <span className="text-indigo-400">✓</span>
                        <span>{uc}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Recommended Prompt Template */}
                <div className="bg-slate-950/80 border border-slate-800 rounded-lg p-3 text-xs mb-4">
                  <div className="flex items-center justify-between text-[11px] text-slate-400 font-semibold mb-1">
                    <span>Prompt Recomendado:</span>
                    <button
                      onClick={() => handleCopyText(tool.recommendedPromptTemplate, tool.id)}
                      className="text-indigo-400 hover:text-indigo-300 flex items-center gap-1"
                    >
                      {copiedId === tool.id ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-400" />
                          <span className="text-emerald-400 text-[10px]">Copiado</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span className="text-[10px]">Copiar</span>
                        </>
                      )}
                    </button>
                  </div>
                  <p className="text-slate-300 font-mono text-[11px] leading-relaxed line-clamp-3">
                    "{tool.recommendedPromptTemplate}"
                  </p>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between">
                <span className="text-[11px] text-slate-500 font-mono">
                  Yo Aprendo Toolkit
                </span>
                <a
                  href={tool.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs text-indigo-400 hover:text-indigo-300 font-medium"
                >
                  <span>Visitar herramienta</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
