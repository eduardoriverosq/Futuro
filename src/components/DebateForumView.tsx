import React, { useState } from 'react';
import { DEBATE_CASES } from '../data/mockData';
import { DebateCase } from '../types';
import { 
  MessageSquare, 
  ThumbsUp, 
  Send, 
  ShieldAlert, 
  BookOpen, 
  CheckCircle2, 
  HelpCircle,
  Users
} from 'lucide-react';

interface DebateForumViewProps {
  onAddXp: (amount: number, reason: string) => void;
  userName: string;
  userFaculty: string;
}

export const DebateForumView: React.FC<DebateForumViewProps> = ({
  onAddXp,
  userName,
  userFaculty,
}) => {
  const [debates, setDebates] = useState<DebateCase[]>(DEBATE_CASES);
  const [selectedDebateId, setSelectedDebateId] = useState<string>(DEBATE_CASES[0].id);

  // New comment input
  const [newCommentText, setNewCommentText] = useState<string>('');
  const [newCommentAuthor, setNewCommentAuthor] = useState<string>(userName || 'Estudiante Universitario');
  const [newCommentFaculty, setNewCommentFaculty] = useState<string>(userFaculty || 'Ingeniería / Ciencias');
  const [newCommentStance, setNewCommentStance] = useState<string>('Reflexión crítica');

  const activeDebate = debates.find((d) => d.id === selectedDebateId) || debates[0];

  const handleVote = (debateId: string, optionId: string) => {
    setDebates((prev) =>
      prev.map((d) => {
        if (d.id !== debateId) return d;
        if (d.userVotedOptionId) return d; // already voted

        const updatedOptions = d.options.map((opt) => {
          if (opt.id === optionId) {
            return { ...opt, votes: opt.votes + 1 };
          }
          return opt;
        });

        const totalVotes = updatedOptions.reduce((acc, o) => acc + o.votes, 0);
        const recalculated = updatedOptions.map((opt) => ({
          ...opt,
          percentage: Math.round((opt.votes / totalVotes) * 100),
        }));

        return {
          ...d,
          options: recalculated,
          userVotedOptionId: optionId,
        };
      })
    );
    onAddXp(30, 'Voto en foro de debate ético');
  };

  const handleLikeComment = (debateId: string, commentId: string) => {
    setDebates((prev) =>
      prev.map((d) => {
        if (d.id !== debateId) return d;
        return {
          ...d,
          comments: d.comments.map((c) =>
            c.id === commentId ? { ...c, likes: c.likes + 1 } : c
          ),
        };
      })
    );
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCommentText.trim()) return;

    const newComment = {
      id: `comment-${Date.now()}`,
      author: newCommentAuthor.trim() || 'Estudiante Anónimo',
      faculty: newCommentFaculty.trim() || 'Facultad General',
      stance: newCommentStance,
      text: newCommentText.trim(),
      likes: 1,
      timestamp: 'Ahora mismo',
    };

    setDebates((prev) =>
      prev.map((d) => {
        if (d.id !== activeDebate.id) return d;
        return {
          ...d,
          comments: [newComment, ...d.comments],
        };
      })
    );

    setNewCommentText('');
    onAddXp(35, 'Argumento publicado en el foro');
  };

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="border-b border-slate-800 pb-6">
        <div className="flex items-center gap-2 text-xs text-indigo-400 font-mono tracking-wide uppercase mb-1">
          <span>Foros de Debate Profesional & Dilemas Éticos</span>
          <span aria-hidden="true">·</span>
          <span>Yo Aprendo</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
          Tribuna Ética: El Criterio Humano Puesto a Prueba
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-3xl">
          La inteligencia artificial plantea desafíos que no se resuelven con código, sino con discernimiento moral, 
          marcos jurídicos y visión humanista. Vota en los casos y defiende tu postura con tus pares.
        </p>
      </div>

      {/* Debate Case Tabs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {debates.map((d, idx) => {
          const isSelected = d.id === activeDebate.id;
          const hasVoted = Boolean(d.userVotedOptionId);
          return (
            <button
              key={d.id}
              onClick={() => setSelectedDebateId(d.id)}
              className={`p-4 rounded-xl border text-left transition-all relative overflow-hidden flex flex-col justify-between ${
                isSelected
                  ? 'bg-slate-900 border-indigo-500 shadow-md ring-1 ring-indigo-500/30'
                  : 'bg-slate-950/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900/40'
              }`}
            >
              <div>
                <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 mb-1.5">
                  <span className="text-indigo-400 font-semibold">Caso 0{idx + 1}</span>
                  <span>{d.category}</span>
                </div>
                <h3 className="text-xs sm:text-sm font-bold text-white mb-2 leading-snug line-clamp-2">
                  {d.title}
                </h3>
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-slate-800/80 text-[11px] text-slate-400 font-mono">
                <span className="flex items-center gap-1">
                  <Users className="w-3.5 h-3.5 text-slate-500" />
                  <span>{d.options.reduce((a, b) => a + b.votes, 0)} votos</span>
                </span>
                {hasVoted && (
                  <span className="text-emerald-400 font-semibold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Votaste</span>
                  </span>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* Active Debate Case Deep Dive */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-8">
        {/* Case Context Card */}
        <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-5 sm:p-6">
          <div className="flex items-center gap-2 text-xs font-mono text-indigo-400 uppercase tracking-wider mb-2">
            <ShieldAlert className="w-4 h-4 text-indigo-400" />
            <span>Contexto del Dilema Real · {activeDebate.category}</span>
          </div>
          <h2 className="text-lg sm:text-xl font-bold text-white mb-3">
            {activeDebate.title}
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
            {activeDebate.context}
          </p>
          <div className="bg-indigo-950/40 border border-indigo-800/40 rounded-lg p-3 text-xs sm:text-sm font-semibold text-indigo-200">
            Pregunta central: {activeDebate.question}
          </div>
        </div>

        {/* Voting Options & Results */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-white uppercase tracking-wide">
              {activeDebate.userVotedOptionId ? 'Resultados del Consenso Estudiantil en Vivo:' : 'Emite tu postura profesional:'}
            </h3>
            <span className="text-xs font-mono text-slate-400">
              {activeDebate.options.reduce((a, b) => a + b.votes, 0)} participantes
            </span>
          </div>

          <div className="space-y-3">
            {activeDebate.options.map((option) => {
              const isUserChoice = activeDebate.userVotedOptionId === option.id;
              const hasVoted = Boolean(activeDebate.userVotedOptionId);

              return (
                <div
                  key={option.id}
                  onClick={() => !hasVoted && handleVote(activeDebate.id, option.id)}
                  className={`relative overflow-hidden p-4 rounded-xl border transition-all ${
                    !hasVoted ? 'cursor-pointer hover:border-indigo-500 hover:bg-slate-950/70' : ''
                  } ${
                    isUserChoice
                      ? 'border-indigo-500 bg-indigo-950/30'
                      : 'border-slate-800 bg-slate-950/50'
                  }`}
                >
                  {/* Progress bar fill */}
                  {hasVoted && (
                    <div
                      className="absolute top-0 bottom-0 left-0 bg-indigo-600/15 pointer-events-none transition-all duration-700"
                      style={{ width: `${option.percentage}%` }}
                    />
                  )}

                  <div className="relative flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-5 h-5 rounded-full border flex items-center justify-center text-xs shrink-0 ${
                        isUserChoice
                          ? 'border-indigo-400 bg-indigo-500 text-white'
                          : 'border-slate-600 text-transparent'
                      }`}>
                        {isUserChoice ? '✓' : ''}
                      </div>
                      <span className="text-xs sm:text-sm text-slate-200 font-medium">
                        {option.text}
                      </span>
                    </div>

                    {hasVoted && (
                      <div className="flex items-center gap-2 shrink-0 font-mono text-xs tabular-nums">
                        <span className="text-slate-400">{option.votes} votos</span>
                        <span className="font-bold text-indigo-300 text-sm">
                          {option.percentage}%
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {!activeDebate.userVotedOptionId && (
            <p className="text-[11px] text-slate-500 mt-2 text-center sm:text-left">
              Haz clic en una de las posturas para emitir tu voto y ver el desglose en tiempo real.
            </p>
          )}
        </div>

        {/* Pedagogical Synthesis Note from Instructors */}
        <div className="bg-gradient-to-r from-purple-950/30 via-indigo-950/30 to-blue-950/30 border border-indigo-800/40 rounded-xl p-5">
          <div className="flex items-center gap-2 text-xs font-semibold text-indigo-300 mb-2">
            <BookOpen className="w-4 h-4 text-indigo-400 shrink-0" />
            <span>Síntesis Didáctica de María Elena Rúa & Eduardo Riveros:</span>
          </div>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed italic">
            {activeDebate.instructorNote}
          </p>
        </div>

        {/* Community Discussion Forum */}
        <div className="space-y-6 pt-4 border-t border-slate-800">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm font-semibold text-white">
              <MessageSquare className="w-4 h-4 text-indigo-400" />
              <span>Argumentos de la Comunidad Universitaria ({activeDebate.comments.length})</span>
            </div>
            <span className="text-xs text-indigo-400 font-mono">
              +35 XP por debatir
            </span>
          </div>

          {/* New Argument Submission Box */}
          <form onSubmit={handleAddComment} className="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <input
                type="text"
                placeholder="Tu Nombre o Alias..."
                value={newCommentAuthor}
                onChange={(e) => setNewCommentAuthor(e.target.value)}
                className="bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-indigo-500"
              />
              <input
                type="text"
                placeholder="Tu Carrera / Facultad..."
                value={newCommentFaculty}
                onChange={(e) => setNewCommentFaculty(e.target.value)}
                className="bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-indigo-500"
              />
              <select
                value={newCommentStance}
                onChange={(e) => setNewCommentStance(e.target.value)}
                className="bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
              >
                <option value="A favor">Postura: A favor de la integración</option>
                <option value="En desacuerdo">Postura: Crítica / Precautoria</option>
                <option value="Tercera vía">Postura: Tercera vía / Matiz ético</option>
              </select>
            </div>

            <textarea
              rows={2}
              value={newCommentText}
              onChange={(e) => setNewCommentText(e.target.value)}
              placeholder="Escribe tu argumento fundamentado: ¿Por qué apoyas esta postura? ¿Qué consecuencias prácticas anticipas en tu profesión?"
              className="w-full bg-slate-900 border border-slate-800 rounded-lg p-3 text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-indigo-500"
            />

            <div className="flex items-center justify-between pt-1">
              <span className="text-[11px] text-slate-500">
                Se promoverán los comentarios basados en evidencia y respeto mutuo.
              </span>
              <button
                type="submit"
                disabled={!newCommentText.trim()}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Publicar Argumento</span>
              </button>
            </div>
          </form>

          {/* List of comments */}
          <div className="space-y-3">
            {activeDebate.comments.map((comment) => (
              <div
                key={comment.id}
                className="bg-slate-950/70 border border-slate-800/80 rounded-xl p-4 hover:border-slate-700 transition-colors"
              >
                <div className="flex items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-slate-200 text-xs">
                      {comment.author}
                    </span>
                    <span className="text-[11px] text-slate-400">· {comment.faculty}</span>
                    <span className="text-[10px] bg-indigo-950/70 border border-indigo-800/40 text-indigo-300 px-2 py-0.5 rounded-full font-mono">
                      {comment.stance}
                    </span>
                  </div>
                  <span className="text-[11px] text-slate-500 font-mono">
                    {comment.timestamp}
                  </span>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed mb-3">
                  {comment.text}
                </p>

                <div className="flex items-center gap-3 text-[11px] text-slate-400">
                  <button
                    onClick={() => handleLikeComment(activeDebate.id, comment.id)}
                    className="flex items-center gap-1 text-slate-400 hover:text-indigo-400 transition-colors"
                  >
                    <ThumbsUp className="w-3.5 h-3.5" />
                    <span className="font-mono tabular-nums">{comment.likes}</span>
                    <span>De acuerdo</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
