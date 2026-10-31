import React, { useState } from 'react';
import { UserProgress } from '../types';
import { QUIZ_QUESTIONS } from '../data/mockData';
import { YoAprendoLogo } from './YoAprendoLogo';
import confetti from 'canvas-confetti';
import { 
  X, 
  Award, 
  CheckCircle2, 
  AlertCircle, 
  Printer, 
  Trophy, 
  Sparkles, 
  ShieldCheck, 
  ArrowRight,
  Flame
} from 'lucide-react';

interface GamificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  userProgress: UserProgress;
  setUserProgress: React.Dispatch<React.SetStateAction<UserProgress>>;
}

export const GamificationModal: React.FC<GamificationModalProps> = ({
  isOpen,
  onClose,
  userProgress,
  setUserProgress,
}) => {
  const [activeTab, setActiveTab] = useState<'passport' | 'quiz' | 'certificate'>('passport');
  
  // Quiz State
  const [currentQuizIndex, setCurrentQuizIndex] = useState<number>(0);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState<number | null>(null);
  const [hasSubmittedAnswer, setHasSubmittedAnswer] = useState<boolean>(false);
  const [quizScore, setQuizScore] = useState<number>(0);
  const [quizFinished, setQuizFinished] = useState<boolean>(false);

  // Certificate student name input
  const [studentName, setStudentName] = useState<string>(userProgress.name || 'Estudiante Universitario');
  const [studentCareer, setStudentCareer] = useState<string>(userProgress.career || 'Ingeniería / Ciencias');

  if (!isOpen) return null;

  const currentQ = QUIZ_QUESTIONS[currentQuizIndex];

  const handleSelectQuizOption = (index: number) => {
    if (hasSubmittedAnswer) return;
    setSelectedAnswerIndex(index);
  };

  const handleSubmitQuizAnswer = () => {
    if (selectedAnswerIndex === null) return;
    setHasSubmittedAnswer(true);

    const isCorrect = selectedAnswerIndex === currentQ.correctIndex;
    if (isCorrect) {
      setQuizScore((prev) => prev + currentQ.points);
      confetti({
        particleCount: 40,
        spread: 60,
        origin: { y: 0.7 },
      });
      setUserProgress((prev) => ({
        ...prev,
        xp: prev.xp + 100,
      }));
    }
  };

  const handleNextQuizQuestion = () => {
    if (currentQuizIndex < QUIZ_QUESTIONS.length - 1) {
      setCurrentQuizIndex((prev) => prev + 1);
      setSelectedAnswerIndex(null);
      setHasSubmittedAnswer(false);
    } else {
      setQuizFinished(true);
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.6 },
      });
      // Unlock quiz champion badge
      setUserProgress((prev) => ({
        ...prev,
        badges: prev.badges.map((b) =>
          b.id === 'badge-quiz-champion' ? { ...b, unlocked: true, unlockedAt: 'Hoy' } : b
        ),
      }));
    }
  };

  const handlePrintCertificate = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-slate-950 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden my-8">
        {/* Modal Header */}
        <div className="bg-slate-900 border-b border-slate-800 p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-600/20 border border-purple-500/40 flex items-center justify-center text-purple-400">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <span>Pasaporte de Adaptabilidad & Gamificación</span>
                <span className="text-xs bg-indigo-950 text-indigo-300 border border-indigo-800 px-2.5 py-0.5 rounded-full font-mono">
                  Nivel {Math.floor(userProgress.xp / 100) + 1}
                </span>
              </h2>
              <div className="text-xs text-slate-400">
                Acreditación por: <span className="text-indigo-300 font-medium">María Elena Rúa & Eduardo Riveros · Yo Aprendo</span>
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Sub-navigation tabs inside modal */}
        <div className="flex items-center border-b border-slate-800 bg-slate-900/50 px-5 gap-2">
          {[
            { id: 'passport', label: 'Mi Pasaporte & Insignias' },
            { id: 'quiz', label: 'Desafío del Futuro (Quiz en Vivo)' },
            { id: 'certificate', label: 'Certificado de Participación' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-3 text-xs font-semibold border-b-2 transition-all whitespace-nowrap ${
                activeTab === tab.id
                  ? 'border-indigo-500 text-indigo-300'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 max-h-[75vh] overflow-y-auto">
          {/* TAB 1: PASSPORT & BADGES */}
          {activeTab === 'passport' && (
            <div className="space-y-8">
              {/* XP Progress Card */}
              <div className="bg-gradient-to-r from-purple-950/40 via-indigo-950/40 to-slate-900 border border-indigo-900/50 rounded-2xl p-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                  <div>
                    <span className="text-xs font-mono text-indigo-400 uppercase tracking-wider block mb-1">
                      Puntaje Global de Adaptabilidad
                    </span>
                    <h3 className="text-2xl font-black text-white font-mono tabular-nums">
                      {userProgress.xp} XP Acumulados
                    </h3>
                  </div>
                  <div className="flex items-center gap-2">
                    <Flame className="w-5 h-5 text-amber-400" />
                    <span className="text-xs font-semibold text-slate-200">
                      Rango: {userProgress.xp > 300 ? 'Estratega Aumentado' : userProgress.xp > 150 ? 'Navegante IA' : 'Explorador Novato'}
                    </span>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="w-full bg-slate-950 rounded-full h-3 border border-slate-800 overflow-hidden mb-2">
                  <div
                    className="bg-gradient-to-r from-purple-500 to-indigo-500 h-full rounded-full transition-all duration-500"
                    style={{ width: `${Math.min((userProgress.xp / 500) * 100, 100)}%` }}
                  />
                </div>
                <div className="flex justify-between text-[11px] text-slate-400 font-mono">
                  <span>Nivel 1 (0 XP)</span>
                  <span>Meta de Certificación Senior (500 XP)</span>
                </div>
              </div>

              {/* Badges Grid */}
              <div>
                <h4 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
                  <Trophy className="w-4 h-4 text-amber-400" />
                  <span>Insignias de Competencias Desbloqueadas:</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {userProgress.badges.map((b) => (
                    <div
                      key={b.id}
                      className={`p-4 rounded-xl border flex items-start gap-3 transition-all ${
                        b.unlocked
                          ? 'bg-slate-900/90 border-indigo-500/50 shadow-sm'
                          : 'bg-slate-950/40 border-slate-800/60 opacity-60'
                      }`}
                    >
                      <div className="text-2xl p-2 rounded-lg bg-slate-950 border border-slate-800 shrink-0">
                        {b.icon}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h5 className="text-xs font-bold text-white">{b.title}</h5>
                          {b.unlocked && (
                            <span className="text-[10px] text-emerald-400 font-mono">✓</span>
                          )}
                        </div>
                        <p className="text-[11px] text-slate-400 leading-snug mt-1">
                          {b.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Instructions to earn more XP */}
              <div className="bg-slate-900/40 border border-slate-800 rounded-xl p-4 text-xs text-slate-300">
                <span className="font-semibold text-white block mb-2">
                  ¿Cómo seguir sumando experiencia en esta sesión?
                </span>
                <ul className="space-y-1 text-slate-400">
                  <li>· Simula el impacto de tu carrera en el <strong>Simulador</strong> (+50 XP)</li>
                  <li>· Evalúa y optimiza un prompt en el <strong>Laboratorio</strong> (+40 XP)</li>
                  <li>· Vota y argumenta en los <strong>Foros de Debate</strong> (+30 XP)</li>
                  <li>· Completa el <strong>Desafío Interactivo</strong> con respuestas correctas (+100 XP c/u)</li>
                </ul>
              </div>
            </div>
          )}

          {/* TAB 2: LIVE QUIZ */}
          {activeTab === 'quiz' && (
            <div className="space-y-6">
              {!quizFinished ? (
                <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-6 sm:p-8">
                  <div className="flex items-center justify-between text-xs text-indigo-400 font-mono mb-4">
                    <span>PREGUNTA 0{currentQuizIndex + 1} / 0{QUIZ_QUESTIONS.length}</span>
                    <span className="text-slate-400">Puntaje actual: {quizScore} pts</span>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-white mb-6 leading-snug">
                    {currentQ.question}
                  </h3>

                  <div className="space-y-3 mb-6">
                    {currentQ.options.map((opt, idx) => {
                      const isSelected = selectedAnswerIndex === idx;
                      const isCorrect = idx === currentQ.correctIndex;
                      
                      let optionStyle = 'border-slate-800 bg-slate-950/60 text-slate-300 hover:border-slate-700';
                      if (hasSubmittedAnswer) {
                        if (isCorrect) {
                          optionStyle = 'border-emerald-500 bg-emerald-950/40 text-emerald-200';
                        } else if (isSelected && !isCorrect) {
                          optionStyle = 'border-rose-500 bg-rose-950/40 text-rose-200';
                        } else {
                          optionStyle = 'border-slate-900 bg-slate-950/30 text-slate-500';
                        }
                      } else if (isSelected) {
                        optionStyle = 'border-indigo-500 bg-indigo-950/40 text-white';
                      }

                      return (
                        <button
                          key={idx}
                          disabled={hasSubmittedAnswer}
                          onClick={() => handleSelectQuizOption(idx)}
                          className={`w-full text-left p-4 rounded-xl border text-xs sm:text-sm font-medium transition-all flex items-center justify-between ${optionStyle}`}
                        >
                          <div className="flex items-center gap-3">
                            <span className="w-6 h-6 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center font-mono text-xs shrink-0">
                              {String.fromCharCode(65 + idx)}
                            </span>
                            <span>{opt}</span>
                          </div>
                          {hasSubmittedAnswer && isCorrect && (
                            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {/* Feedback Explanation */}
                  {hasSubmittedAnswer && (
                    <div className="bg-indigo-950/30 border border-indigo-800/40 rounded-xl p-4 text-xs text-slate-200 leading-relaxed mb-6">
                      <span className="font-semibold text-indigo-300 block mb-1">
                        Explicación Didáctica de Yo Aprendo:
                      </span>
                      {currentQ.explanation}
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex justify-end">
                    {!hasSubmittedAnswer ? (
                      <button
                        onClick={handleSubmitQuizAnswer}
                        disabled={selectedAnswerIndex === null}
                        className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 text-white rounded-lg text-xs font-semibold transition-colors"
                      >
                        Confirmar Respuesta
                      </button>
                    ) : (
                      <button
                        onClick={handleNextQuizQuestion}
                        className="px-5 py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white rounded-lg text-xs font-semibold shadow-md transition-all flex items-center gap-2"
                      >
                        <span>{currentQuizIndex < QUIZ_QUESTIONS.length - 1 ? 'Siguiente Pregunta' : 'Finalizar Desafío'}</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              ) : (
                <div className="text-center bg-slate-900/60 border border-slate-800 rounded-2xl p-8 sm:p-12 space-y-4">
                  <div className="w-16 h-16 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-300 mx-auto text-3xl">
                    🏆
                  </div>
                  <h3 className="text-2xl font-bold text-white">
                    ¡Desafío del Futuro Completado!
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto">
                    Has obtenido <span className="font-bold text-amber-300 font-mono">{quizScore} puntos</span> y desbloqueado la insignia exclusiva "Graduado del Futuro".
                  </p>
                  <div className="pt-4">
                    <button
                      onClick={() => setActiveTab('certificate')}
                      className="px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white rounded-xl text-xs font-semibold shadow-lg transition-all"
                    >
                      Ver y Descargar mi Certificado
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: DIGITAL CERTIFICATE */}
          {activeTab === 'certificate' && (
            <div className="space-y-6">
              {/* Inputs to customize certificate */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-900/60 border border-slate-800 p-4 rounded-xl">
                <div>
                  <label className="block text-xs text-slate-300 font-medium mb-1">
                    Nombre del Estudiante:
                  </label>
                  <input
                    type="text"
                    value={studentName}
                    onChange={(e) => setStudentName(e.target.value)}
                    placeholder="Tu nombre completo..."
                    className="w-full bg-slate-950 border border-slate-800 text-xs text-white rounded-lg p-2.5 focus:outline-none focus:border-indigo-500 font-semibold"
                  />
                </div>
                <div>
                  <label className="block text-xs text-slate-300 font-medium mb-1">
                    Carrera Universitaria / Facultad:
                  </label>
                  <input
                    type="text"
                    value={studentCareer}
                    onChange={(e) => setStudentCareer(e.target.value)}
                    placeholder="Tu carrera o especialidad..."
                    className="w-full bg-slate-950 border border-slate-800 text-xs text-white rounded-lg p-2.5 focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              {/* Printable Certificate Frame */}
              <div 
                id="yo-aprendo-certificate"
                className="relative bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 border-2 border-indigo-500/50 rounded-2xl p-8 sm:p-12 text-center shadow-2xl overflow-hidden"
              >
                {/* Decorative borders */}
                <div className="absolute inset-2 border border-indigo-500/20 rounded-xl pointer-events-none" />
                <div className="absolute top-4 left-4 w-12 h-12 border-t-2 border-l-2 border-indigo-400 pointer-events-none" />
                <div className="absolute top-4 right-4 w-12 h-12 border-t-2 border-r-2 border-indigo-400 pointer-events-none" />
                <div className="absolute bottom-4 left-4 w-12 h-12 border-b-2 border-l-2 border-indigo-400 pointer-events-none" />
                <div className="absolute bottom-4 right-4 w-12 h-12 border-b-2 border-r-2 border-indigo-400 pointer-events-none" />

                <div className="flex justify-center mb-4">
                  <YoAprendoLogo size="lg" showSubtitle={true} />
                </div>

                <div className="text-[11px] font-mono tracking-widest text-indigo-400 uppercase mb-2">
                  Certificado de Participación & Alfabetización en IA
                </div>

                <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-2">
                  Inteligencia Artificial y el Futuro del Trabajo
                </h3>

                <p className="text-xs text-slate-400 max-w-lg mx-auto mb-6">
                  Se certifica que el estudiante universitario ha completado con distinción las actividades interactivas, 
                  simulaciones de competencias laborales y análisis crítico de dilemas éticos.
                </p>

                <div className="my-6 py-4 border-y border-slate-800/80 max-w-md mx-auto">
                  <div className="text-xl sm:text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-indigo-200 to-blue-300">
                    {studentName}
                  </div>
                  <div className="text-xs text-indigo-300 font-medium mt-1">
                    {studentCareer}
                  </div>
                </div>

                {/* Signatures of Authors */}
                <div className="grid grid-cols-2 gap-8 max-w-lg mx-auto pt-4 mt-6 border-t border-slate-800/80">
                  <div className="text-center">
                    <div className="font-serif italic text-sm text-indigo-200 mb-1">
                      María Elena Rúa
                    </div>
                    <div className="text-[10px] text-slate-400 font-mono border-t border-slate-700 pt-1">
                      Diseño Instruccional & Autora
                    </div>
                  </div>

                  <div className="text-center">
                    <div className="font-serif italic text-sm text-indigo-200 mb-1">
                      Eduardo Riveros Quiroz
                    </div>
                    <div className="text-[10px] text-slate-400 font-mono border-t border-slate-700 pt-1">
                      Fundador Yo Aprendo & Autor
                    </div>
                  </div>
                </div>

                <div className="mt-6 text-[10px] text-slate-400 font-mono flex flex-col sm:flex-row items-center justify-center gap-2">
                  <span>Código de Verificación: YA-IA-2026-{Math.floor(100000 + Math.random() * 900000)}</span>
                  <span aria-hidden="true" className="hidden sm:inline text-slate-600">·</span>
                  <a
                    href="https://www.aprendo.website"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-indigo-400 hover:text-indigo-300 underline"
                  >
                    www.aprendo.website
                  </a>
                  <span aria-hidden="true" className="hidden sm:inline text-slate-600">·</span>
                  <span>Validez Académica Yo Aprendo</span>
                </div>
              </div>

              {/* Print Button */}
              <div className="flex justify-end gap-3">
                <button
                  onClick={handlePrintCertificate}
                  className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 border border-slate-700 text-white rounded-lg text-xs font-semibold transition-colors flex items-center gap-2"
                >
                  <Printer className="w-4 h-4" />
                  <span>Imprimir / Guardar como PDF</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
