import React, { useState } from 'react';
import { PRESENTATION_SLIDES } from '../data/mockData';
import { TabType } from '../types';
import { 
  ChevronLeft, 
  ChevronRight, 
  Tv, 
  Maximize2, 
  Minimize2, 
  Sparkles, 
  HelpCircle, 
  Users, 
  MessageSquare, 
  ThumbsUp, 
  Check, 
  BookOpen, 
  Send,
  Award
} from 'lucide-react';

interface PresentationModeProps {
  onNavigateTab: (tab: TabType) => void;
  onTriggerReaction: (emoji: string) => void;
  onOpenPassport: () => void;
  onAddXp: (amount: number, reason: string) => void;
}

export const PresentationMode: React.FC<PresentationModeProps> = ({
  onNavigateTab,
  onTriggerReaction,
  onOpenPassport,
  onAddXp,
}) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState<number>(0);
  const [showNotes, setShowNotes] = useState<boolean>(false);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  // Live Q&A questions submitted by audience during the webinar
  const [audienceQuestions, setAudienceQuestions] = useState<{
    id: string;
    student: string;
    faculty: string;
    question: string;
    upvotes: number;
    answered: boolean;
  }[]>([
    {
      id: 'q1',
      student: 'Martina Soto',
      faculty: 'Bioquímica (3er año)',
      question: '¿Cómo podemos validar si un paper resumido por IA no omitió las limitaciones clave del ensayo clínico?',
      upvotes: 28,
      answered: true,
    },
    {
      id: 'q2',
      student: 'Gabriel Navarrete',
      faculty: 'Ingeniería Comercial',
      question: 'Si los graduados entran directamente a supervisar flujos de IA, ¿qué criterios evaluarán los reclutadores en la primera entrevista?',
      upvotes: 42,
      answered: false,
    },
    {
      id: 'q3',
      student: 'Sofía Valenzuela',
      faculty: 'Artes Visuales & Animación',
      question: '¿Qué valor tiene aprender a dibujar o ilustrar a mano hoy en día?',
      upvotes: 35,
      answered: false,
    }
  ]);

  const [newQuestionInput, setNewQuestionInput] = useState<string>('');
  const [newQuestionStudent, setNewQuestionStudent] = useState<string>('');
  const [newQuestionFaculty, setNewQuestionFaculty] = useState<string>('');

  const currentSlide = PRESENTATION_SLIDES[currentSlideIndex];

  const handleNext = () => {
    if (currentSlideIndex < PRESENTATION_SLIDES.length - 1) {
      setCurrentSlideIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentSlideIndex > 0) {
      setCurrentSlideIndex((prev) => prev - 1);
    }
  };

  const handleUpvoteQuestion = (id: string) => {
    setAudienceQuestions((prev) =>
      prev.map((q) => (q.id === id ? { ...q, upvotes: q.upvotes + 1 } : q))
    );
  };

  const handleAddQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newQuestionInput.trim()) return;

    const newQ = {
      id: `q-${Date.now()}`,
      student: newQuestionStudent.trim() || 'Estudiante en Sala',
      faculty: newQuestionFaculty.trim() || 'Facultad General',
      question: newQuestionInput.trim(),
      upvotes: 1,
      answered: false,
    };

    setAudienceQuestions((prev) => [newQ, ...prev]);
    setNewQuestionInput('');
    onAddXp(25, 'Pregunta enviada en vivo');
  };

  return (
    <div className={`space-y-8 ${isFullscreen ? 'fixed inset-0 z-50 bg-slate-950 p-6 overflow-y-auto' : ''}`}>
      {/* Presentation Top Bar & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900/90 border border-slate-800 rounded-xl p-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-indigo-600/20 border border-indigo-500/40 flex items-center justify-center text-indigo-400">
            <Tv className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-white uppercase tracking-wide">
                Modo Taller Interactivo en Vivo
              </span>
              <span className="text-[10px] font-mono bg-emerald-950 text-emerald-300 border border-emerald-800/60 px-2 py-0.5 rounded-full">
                Sesión Activa
              </span>
            </div>
            <div className="text-[11px] text-slate-400">
              Facilitadores: <span className="text-indigo-300">María Elena Rúa & Eduardo Riveros Quiroz (Yo Aprendo)</span>
            </div>
          </div>
        </div>

        {/* Slide Counter, Fullscreen & Notes Toggles */}
        <div className="flex items-center gap-2 self-end sm:self-auto">
          <button
            onClick={() => setShowNotes(!showNotes)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors flex items-center gap-1.5 ${
              showNotes
                ? 'bg-indigo-950 border-indigo-500 text-indigo-200'
                : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Notas de Facilitador</span>
          </button>

          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="p-1.5 bg-slate-950 hover:bg-slate-800 border border-slate-800 rounded-lg text-slate-300 transition-colors"
            title={isFullscreen ? 'Salir de pantalla completa' : 'Pantalla completa'}
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Main Slide Canvas */}
      <div className="relative bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 rounded-2xl p-6 sm:p-10 shadow-2xl min-h-[440px] flex flex-col justify-between overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

        {/* Slide Header */}
        <div className="relative mb-6">
          <div className="flex items-center justify-between text-xs text-indigo-400 font-mono tracking-wide mb-2">
            <span>DIAPOSITIVA 0{currentSlide.id} / 0{PRESENTATION_SLIDES.length}</span>
            <span className="text-slate-400">{currentSlide.subtitle}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight mb-2">
            {currentSlide.title}
          </h2>
          <div className="text-sm sm:text-base font-medium text-indigo-300">
            {currentSlide.content.headline}
          </div>
        </div>

        {/* Slide Body Bullets */}
        <div className="relative my-4 space-y-3">
          {currentSlide.content.bullets.map((bullet, idx) => (
            <div key={idx} className="flex items-start gap-3 bg-slate-950/50 p-3.5 rounded-xl border border-slate-800/70">
              <div className="w-2 h-2 rounded-full bg-indigo-400 mt-2 shrink-0" />
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                {bullet}
              </p>
            </div>
          ))}
        </div>

        {/* Highlight Quote */}
        {currentSlide.content.highlightQuote && (
          <div className="relative my-4 bg-indigo-950/40 border border-indigo-800/40 rounded-xl p-4 text-center">
            <p className="text-xs sm:text-sm italic font-medium text-indigo-200">
              "{currentSlide.content.highlightQuote}"
            </p>
          </div>
        )}

        {/* Slide Footer: Action Button & Pagination */}
        <div className="relative pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            {currentSlide.content.interactiveAction && (
              <button
                onClick={() => onNavigateTab(currentSlide.content.interactiveAction!.targetTab)}
                className="px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white rounded-lg text-xs font-semibold shadow-md transition-all flex items-center gap-2"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>{currentSlide.content.interactiveAction.label}</span>
              </button>
            )}
          </div>

          <div className="flex items-center gap-3 self-center sm:self-auto">
            <button
              onClick={handlePrev}
              disabled={currentSlideIndex === 0}
              className="px-3.5 py-1.5 bg-slate-900 hover:bg-slate-800 disabled:opacity-40 border border-slate-800 text-slate-200 rounded-lg text-xs font-medium transition-colors flex items-center gap-1"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Anterior</span>
            </button>

            {/* Quick jump dots */}
            <div className="flex items-center gap-1.5">
              {PRESENTATION_SLIDES.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentSlideIndex(idx)}
                  className={`w-2.5 h-2.5 rounded-full transition-all ${
                    currentSlideIndex === idx ? 'bg-indigo-400 w-6' : 'bg-slate-700 hover:bg-slate-500'
                  }`}
                  aria-label={`Ir a diapositiva ${idx + 1}`}
                />
              ))}
            </div>

            <button
              onClick={handleNext}
              disabled={currentSlideIndex === PRESENTATION_SLIDES.length - 1}
              className="px-3.5 py-1.5 bg-slate-900 hover:bg-slate-800 disabled:opacity-40 border border-slate-800 text-slate-200 rounded-lg text-xs font-medium transition-colors flex items-center gap-1"
            >
              <span>Siguiente</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Presenter Notes (Collapsible drawer for Eduardo & María Elena) */}
      {showNotes && (
        <div className="bg-amber-950/20 border border-amber-900/50 rounded-xl p-5 text-xs text-amber-200">
          <div className="font-bold uppercase tracking-wider mb-1 flex items-center gap-1.5 text-amber-300">
            <BookOpen className="w-4 h-4" />
            <span>Guía de Facilitación para Eduardo Riveros & María Elena Rúa:</span>
          </div>
          <p className="leading-relaxed">
            {currentSlide.instructorNotes}
          </p>
        </div>
      )}

      {/* Live Audience Engagement Bar: Reactions & Participation */}
      <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Users className="w-4 h-4 text-indigo-400" />
              <span>Barra de Reacciones en Vivo (Haz clic para enviar durante la charla)</span>
            </h3>
            <p className="text-xs text-slate-400">
              Las reacciones aparecen flotando en tiempo real en la pantalla de la presentación.
            </p>
          </div>

          {/* Reaction Buttons */}
          <div className="flex items-center gap-2">
            {[
              { emoji: '👏', label: 'Aplauso' },
              { emoji: '💡', label: 'Idea' },
              { emoji: '🚀', label: 'Futuro' },
              { emoji: '🤔', label: 'Duda' },
              { emoji: '❤️', label: 'Apoyo' },
            ].map((r, idx) => (
              <button
                key={idx}
                onClick={() => onTriggerReaction(r.emoji)}
                className="px-3 py-2 bg-slate-950 hover:bg-slate-800 border border-slate-800 rounded-xl text-base transition-transform active:scale-125 flex items-center gap-1.5"
                title={r.label}
              >
                <span>{r.emoji}</span>
                <span className="text-[11px] text-slate-400 hidden sm:inline">{r.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Audience Live Q&A Queue */}
      <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-indigo-400" />
              <span>Cola de Preguntas en Vivo para Eduardo & María Elena</span>
            </h3>
            <p className="text-xs text-slate-400">
              Envía tu pregunta a los expositores o apoya las preguntas de tus compañeros universitarios.
            </p>
          </div>
          <span className="text-xs font-mono text-indigo-300 bg-indigo-950/70 border border-indigo-800/60 px-3 py-1.5 rounded-lg self-start sm:self-auto">
            {audienceQuestions.length} Preguntas en sala
          </span>
        </div>

        {/* Question Submission Input */}
        <form onSubmit={handleAddQuestion} className="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <input
              type="text"
              placeholder="Tu Nombre..."
              value={newQuestionStudent}
              onChange={(e) => setNewQuestionStudent(e.target.value)}
              className="bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-indigo-500"
            />
            <input
              type="text"
              placeholder="Tu Carrera y Año..."
              value={newQuestionFaculty}
              onChange={(e) => setNewQuestionFaculty(e.target.value)}
              className="bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-indigo-500"
            />
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Escribe tu pregunta sobre IA, inserción laboral o ética profesional..."
              value={newQuestionInput}
              onChange={(e) => setNewQuestionInput(e.target.value)}
              className="flex-1 bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-indigo-500"
            />
            <button
              type="submit"
              disabled={!newQuestionInput.trim()}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5 shrink-0"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Enviar Pregunta</span>
            </button>
          </div>
        </form>

        {/* Questions List */}
        <div className="space-y-3">
          {audienceQuestions.map((q) => (
            <div
              key={q.id}
              className={`p-4 rounded-xl border flex items-start justify-between gap-4 transition-colors ${
                q.answered
                  ? 'bg-slate-950/40 border-slate-800/60 opacity-80'
                  : 'bg-slate-950/80 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-slate-200 text-xs">{q.student}</span>
                  <span className="text-[11px] text-slate-500">· {q.faculty}</span>
                  {q.answered && (
                    <span className="text-[10px] bg-emerald-950 text-emerald-300 border border-emerald-800/60 px-2 py-0.5 rounded-full font-mono flex items-center gap-1">
                      <Check className="w-3 h-3" />
                      <span>Respondida en vivo</span>
                    </span>
                  )}
                </div>
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                  {q.question}
                </p>
              </div>

              <button
                onClick={() => handleUpvoteQuestion(q.id)}
                className="flex flex-col items-center justify-center p-2 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-indigo-400 transition-colors shrink-0"
                title="Apoyar esta pregunta"
              >
                <ThumbsUp className="w-4 h-4 mb-0.5" />
                <span className="font-mono text-xs tabular-nums font-bold">{q.upvotes}</span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
