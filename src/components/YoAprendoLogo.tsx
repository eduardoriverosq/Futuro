import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showSubtitle?: boolean;
  withContainer?: boolean;
}

export const YoAprendoLogo: React.FC<LogoProps> = ({
  className = '',
  size = 'md',
  showSubtitle = false,
  withContainer = true,
}) => {
  const sizeMap = {
    sm: { svgW: 64, svgH: 44, textSize: 'text-xs', subSize: 'text-[9px]' },
    md: { svgW: 82, svgH: 56, textSize: 'text-sm', subSize: 'text-[10px]' },
    lg: { svgW: 110, svgH: 76, textSize: 'text-base', subSize: 'text-xs' },
    xl: { svgW: 160, svgH: 110, textSize: 'text-xl', subSize: 'text-sm' },
  };

  const current = sizeMap[size];

  return (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
      {/* 
        Yo Aprendo Emblem on White Background
        Matches exactly the user's uploaded image 'Yo Aprendo Logo (1) (2).png'
      */}
      <div
        className={`relative shrink-0 flex items-center justify-center transition-all ${
          withContainer
            ? 'bg-white rounded-xl p-1 shadow-sm border border-slate-200/90 hover:border-indigo-300'
            : ''
        }`}
      >
        <svg
          viewBox="0 0 260 220"
          style={{ width: current.svgW, height: current.svgH }}
          className="block"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Authentic Yo Aprendo Gradient for APRENDO text */}
            <linearGradient id="aprendoGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#753085" />
              <stop offset="28%" stopColor="#58357F" />
              <stop offset="60%" stopColor="#2E539F" />
              <stop offset="85%" stopColor="#226EB6" />
              <stop offset="100%" stopColor="#1E65B0" />
            </linearGradient>

            {/* Deep Plum/Purple gradient for triangles */}
            <linearGradient id="purpleTriangleGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#5A3A69" />
              <stop offset="100%" stopColor="#452755" />
            </linearGradient>

            {/* Cobalt Blue gradient for capsules */}
            <linearGradient id="blueCapsuleGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#2770C2" />
              <stop offset="100%" stopColor="#1A5AA1" />
            </linearGradient>
          </defs>

          {/* Crisp Pure White Background Canvas */}
          <rect width="260" height="220" rx="14" fill="#FFFFFF" />

          {/* TOP SECTION */}
          {/* Top Blue Capsule (tilted upwards-right) */}
          <g transform="translate(150, 62) rotate(-27)">
            <rect
              x="-50"
              y="-20"
              width="100"
              height="40"
              rx="20"
              fill="url(#blueCapsuleGrad)"
            />
          </g>

          {/* Top Purple Triangle */}
          <polygon
            points="60,98 120,18 158,98"
            fill="url(#purpleTriangleGrad)"
          />

          {/* White "Yo" text inside the top purple triangle */}
          <text
            x="116"
            y="72"
            textAnchor="middle"
            fontFamily="'Plus Jakarta Sans', system-ui, -apple-system, sans-serif"
            fontWeight="900"
            fontSize="26"
            fontStyle="italic"
            letterSpacing="-0.5px"
            fill="#FFFFFF"
          >
            Yo
          </text>

          {/* BOTTOM SECTION */}
          {/* Bottom Blue Capsule (tilted downwards-left) */}
          <g transform="translate(110, 158) rotate(-27)">
            <rect
              x="-50"
              y="-20"
              width="100"
              height="40"
              rx="20"
              fill="url(#blueCapsuleGrad)"
            />
          </g>

          {/* Bottom Purple Triangle */}
          <polygon
            points="200,122 140,202 102,122"
            fill="url(#purpleTriangleGrad)"
          />

          {/* Pure White Central Horizontal Banner */}
          <rect
            x="0"
            y="94"
            width="260"
            height="32"
            fill="#FFFFFF"
          />

          {/* APRENDO text in the center white band with rich purple-to-blue gradient */}
          <text
            x="130"
            y="120"
            textAnchor="middle"
            fontFamily="'Plus Jakarta Sans', system-ui, -apple-system, sans-serif"
            fontWeight="900"
            fontSize="29"
            letterSpacing="1px"
            fill="url(#aprendoGrad)"
          >
            APRENDO
          </text>
        </svg>
      </div>

      {/* Optional Brand Title Next to Badge */}
      <div className="flex flex-col leading-tight">
        <span className={`font-black tracking-tight text-white ${current.textSize}`}>
          Yo Aprendo
        </span>
        {showSubtitle ? (
          <>
            <span className={`text-slate-400 font-medium tracking-wide ${current.subSize}`}>
              Innovación Educativa & IA
            </span>
            <span className="text-[10px] text-indigo-400 font-mono font-semibold">
              www.aprendo.website
            </span>
          </>
        ) : (
          <span className={`text-indigo-400 font-mono font-medium ${current.subSize}`}>
            www.aprendo.website
          </span>
        )}
      </div>
    </div>
  );
};
