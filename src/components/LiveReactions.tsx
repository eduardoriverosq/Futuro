import React, { useEffect, useState } from 'react';

export interface FloatingReaction {
  id: string;
  emoji: string;
  x: number; // percentage from left 10-90%
}

interface LiveReactionsProps {
  reactions: FloatingReaction[];
}

export const LiveReactions: React.FC<LiveReactionsProps> = ({ reactions }) => {
  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {reactions.map((r) => (
        <div
          key={r.id}
          className="absolute bottom-10 text-3xl sm:text-4xl animate-bounce transition-all duration-1000"
          style={{
            left: `${r.x}%`,
            animation: 'floatUp 2.8s cubic-bezier(0.2, 0.8, 0.2, 1) forwards',
          }}
        >
          {r.emoji}
        </div>
      ))}
      <style>{`
        @keyframes floatUp {
          0% {
            opacity: 0;
            transform: translateY(0) scale(0.6);
          }
          20% {
            opacity: 1;
            transform: translateY(-80px) scale(1.2);
          }
          80% {
            opacity: 0.9;
            transform: translateY(-400px) scale(1);
          }
          100% {
            opacity: 0;
            transform: translateY(-600px) scale(0.8);
          }
        }
      `}</style>
    </div>
  );
};
