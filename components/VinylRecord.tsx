import React, { useId } from 'react';

export interface VinylRecordProps extends React.SVGProps<SVGSVGElement> {
  accentColor: string;
  active?: boolean;
}

const grooveRadii = [
  234, 227, 219, 211, 203, 195, 187, 179, 171, 163,
  155, 147, 139, 131, 123, 115, 107, 99, 91,
];

const VinylRecord: React.FC<VinylRecordProps> = ({
  accentColor,
  active = false,
  className,
  ...svgProps
}) => {
  const id = useId().replace(/:/g, '');
  const surfaceId = `${id}-surface`;
  const labelId = `${id}-label`;
  const sheenId = `${id}-sheen`;
  const textureId = `${id}-texture`;
  const shadowId = `${id}-shadow`;
  const clipId = `${id}-clip`;

  return (
    <svg
      viewBox="0 0 512 512"
      className={className}
      aria-hidden="true"
      focusable="false"
      {...svgProps}
    >
      <defs>
        <radialGradient id={surfaceId} cx="39%" cy="32%" r="75%">
          <stop offset="0" stopColor="#3f4249" />
          <stop offset="0.16" stopColor="#1c1e23" />
          <stop offset="0.38" stopColor="#090a0d" />
          <stop offset="0.66" stopColor="#020203" />
          <stop offset="0.84" stopColor="#17191e" />
          <stop offset="1" stopColor="#030304" />
        </radialGradient>

        <radialGradient id={labelId} cx="36%" cy="30%" r="78%">
          <stop offset="0" stopColor="#ffffff" stopOpacity="0.36" />
          <stop offset="0.25" stopColor={accentColor} />
          <stop offset="0.78" stopColor={accentColor} />
          <stop offset="1" stopColor="#000000" stopOpacity="0.3" />
        </radialGradient>

        <linearGradient id={sheenId} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#ffffff" stopOpacity="0" />
          <stop offset="0.43" stopColor="#ffffff" stopOpacity="0.025" />
          <stop offset="0.5" stopColor="#ffffff" stopOpacity="0.24" />
          <stop offset="0.57" stopColor="#ffffff" stopOpacity="0.035" />
          <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>

        <filter id={textureId} x="-10%" y="-10%" width="120%" height="120%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.8"
            numOctaves="2"
            seed="17"
            result="noise"
          />
          <feColorMatrix in="noise" type="saturate" values="0" result="mono" />
          <feComponentTransfer in="mono" result="faintNoise">
            <feFuncA type="table" tableValues="0 0.04" />
          </feComponentTransfer>
          <feBlend in="SourceGraphic" in2="faintNoise" mode="screen" />
        </filter>

        <filter id={shadowId} x="-30%" y="-30%" width="160%" height="170%">
          <feDropShadow dx="0" dy="14" stdDeviation="12" floodColor="#000000" floodOpacity="0.48" />
        </filter>

        <clipPath id={clipId}>
          <circle cx="256" cy="256" r="248" />
        </clipPath>
      </defs>

      <g filter={`url(#${shadowId})`}>
        {active && (
          <circle
            cx="256"
            cy="256"
            r="251"
            fill="none"
            stroke={accentColor}
            strokeWidth="7"
            opacity="0.78"
          />
        )}

        <circle cx="256" cy="256" r="248" fill={`url(#${surfaceId})`} />

        <g clipPath={`url(#${clipId})`} filter={`url(#${textureId})`}>
          <circle cx="256" cy="256" r="247" fill="none" stroke="#4a4d55" strokeWidth="2" opacity="0.62" />

          <g fill="none" strokeLinecap="round">
            {grooveRadii.map((radius, index) => (
              <circle
                key={radius}
                cx="256"
                cy="256"
                r={radius}
                stroke={index % 2 === 0 ? '#8f939c' : '#000000'}
                strokeWidth={index % 2 === 0 ? 1.1 : 1.9}
                opacity={index % 2 === 0 ? 0.12 : 0.76}
              />
            ))}
          </g>

          <g fill="none" stroke={`url(#${sheenId})`} strokeLinecap="round">
            <path d="M73 128c92 13 193 111 247 210" strokeWidth="26" opacity="0.78" />
            <path d="M202 47c112 35 202 142 230 252" strokeWidth="18" opacity="0.52" />
          </g>

          <path
            d="M72 282c35 91 115 161 213 184"
            fill="none"
            stroke="#ffffff"
            strokeWidth="20"
            strokeLinecap="round"
            opacity="0.045"
          />
          <path
            d="M121 84c70-38 154-45 228-18"
            fill="none"
            stroke="#ffffff"
            strokeWidth="9"
            strokeLinecap="round"
            opacity="0.075"
          />
        </g>

        <circle cx="256" cy="256" r="248" fill="none" stroke="#41444b" strokeWidth="3" />
        <circle cx="256" cy="256" r="87" fill="#050507" opacity="0.95" />
        <circle cx="256" cy="256" r="79" fill={`url(#${labelId})`} />
        <circle cx="256" cy="256" r="70" fill="none" stroke="#ffffff" strokeWidth="2" opacity="0.18" />
        <circle cx="256" cy="256" r="22" fill="#0a0b0e" stroke="#656973" strokeWidth="2" />
        <circle cx="256" cy="256" r="8" fill="#c7c9ce" opacity="0.78" />
        <circle cx="253" cy="253" r="2.5" fill="#ffffff" opacity="0.75" />
      </g>
    </svg>
  );
};

export default VinylRecord;
