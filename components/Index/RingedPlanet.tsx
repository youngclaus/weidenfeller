import React from 'react';

export interface RingedPlanetProps {
  color?: string;
  size?: number;
  glow?: boolean;
  style?: React.CSSProperties;
  className?: string;
}

const namedColors: Record<string, [number, number, number]> = {
  black: [0, 0, 0],
  gray: [128, 128, 128],
  grey: [128, 128, 128],
  orange: [255, 165, 0],
  white: [255, 255, 255],
};

function parseColor(color: string): [number, number, number] {
  const normalized = color.trim().toLowerCase();
  const named = namedColors[normalized];
  if (named) return named;

  const rgb = normalized.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)/);
  if (rgb) return [Number(rgb[1]), Number(rgb[2]), Number(rgb[3])];

  const hex = normalized.replace('#', '');
  const full = hex.length === 3
    ? hex.split('').map(character => character + character).join('')
    : hex.padEnd(6, '0');
  const parsed: [number, number, number] = [
    parseInt(full.slice(0, 2), 16),
    parseInt(full.slice(2, 4), 16),
    parseInt(full.slice(4, 6), 16),
  ];

  return parsed.every(Number.isFinite) ? parsed : [217, 180, 74];
}

const RingedPlanet: React.FC<RingedPlanetProps> = ({
  color = '#d9b44a',
  size = 240,
  glow = true,
  style,
  className,
}) => {
  const [r, g, b] = parseColor(color);

  const clamp = (value: number) => Math.max(0, Math.min(255, Math.round(value)));
  const shift = (amount: number) => `rgb(${clamp(r + amount)}, ${clamp(g + amount)}, ${clamp(b + amount)})`;
  const rgba = (amount: number, alpha: number) => (
    `rgba(${clamp(r + amount)}, ${clamp(g + amount)}, ${clamp(b + amount)}, ${alpha})`
  );

  const light = shift(38);
  const dark = shift(-55);
  const deep = shift(-95);

  let seed = (r * 131 + g * 17 + b * 7 + size) % 2147483647 || 1;
  const random = () => {
    seed = (seed * 16807) % 2147483647;
    return seed / 2147483647;
  };

  const bands: { img: string; pos: string; size: string }[] = [];
  let y = 0;
  while (y < 100) {
    const height = 5 + random() * 10;
    const pick = random();
    const tone = pick < 0.4 ? rgba(45, 0.5) : pick < 0.7 ? rgba(-55, 0.5) : rgba(15, 0.4);
    const fade = height * 0.35;
    bands.push({
      img: `linear-gradient(rgba(0,0,0,0) 0%, ${tone} ${fade}%, ${tone} ${100 - fade}%, rgba(0,0,0,0) 100%)`,
      pos: `0% ${y}%`,
      size: `100% ${height + 1}%`,
    });
    y += height;
  }

  const ringWidth = size * 1.95;
  const ringHeight = size * 0.5;
  const ringBase: React.CSSProperties = {
    position: 'absolute',
    left: (size - ringWidth) / 2,
    top: (size - ringHeight) / 2,
    width: ringWidth,
    height: ringHeight,
    borderRadius: '50%',
    transform: 'rotate(-18deg)',
    backgroundImage: `repeating-radial-gradient(circle,
      rgba(0,0,0,0) 0%, rgba(0,0,0,0) 64%,
      ${rgba(60, 0.45)} 64.5%, ${rgba(60, 0.45)} 70%,
      rgba(0,0,0,0) 70.5%, rgba(0,0,0,0) 73%,
      ${rgba(-20, 0.55)} 73.5%, ${rgba(-20, 0.55)} 82%,
      rgba(0,0,0,0) 82.5%, rgba(0,0,0,0) 85%,
      ${rgba(40, 0.4)} 85.5%, ${rgba(40, 0.4)} 92%,
      rgba(0,0,0,0) 92.5%)`,
    pointerEvents: 'none',
  };

  return (
    <div
      className={className}
      style={{
        position: 'relative',
        width: size,
        height: size,
        display: 'inline-block',
        ...style,
      }}
    >
      <style>{`@keyframes ringed-planet-spin { from { background-position-x: 0; } to { background-position-x: ${-size}px; } }`}</style>

      {glow && (
        <div
          style={{
            position: 'absolute',
            inset: -size * 0.18,
            borderRadius: '50%',
            background: `radial-gradient(circle, ${rgba(40, 0.45)} 0%, ${rgba(40, 0.18)} 45%, rgba(0,0,0,0) 70%)`,
            filter: `blur(${size * 0.02}px)`,
            pointerEvents: 'none',
          }}
        />
      )}

      <div style={{ ...ringBase, clipPath: 'inset(0 0 50% 0)' }} />

      <div
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: '50%',
          overflow: 'hidden',
          background: `radial-gradient(circle at 32% 30%, ${light} 0%, ${color} 42%, ${dark} 82%, ${deep} 100%)`,
          boxShadow: `inset ${-size * 0.06}px ${-size * 0.04}px ${size * 0.16}px ${rgba(-110, 0.55)}`,
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '300%',
            height: '100%',
            backgroundImage: bands.map(layer => layer.img).join(', '),
            backgroundRepeat: 'no-repeat',
            backgroundPosition: bands.map(layer => layer.pos).join(', '),
            backgroundSize: bands.map(layer => layer.size).join(', '),
            mixBlendMode: 'soft-light',
            animation: `ringed-planet-spin ${Math.round(Math.max(18, size * 0.18))}s linear infinite`,
          }}
        />

        <div
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: '50%',
            background: `radial-gradient(circle at 70% 72%, rgba(0,0,0,0) 38%, ${rgba(-120, 0.5)} 100%)`,
            pointerEvents: 'none',
          }}
        />

        <div
          style={{
            position: 'absolute',
            top: size * 0.16,
            left: size * 0.2,
            width: size * 0.28,
            height: size * 0.2,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0) 70%)',
            filter: `blur(${size * 0.01}px)`,
            pointerEvents: 'none',
          }}
        />
      </div>

      <div style={{ ...ringBase, clipPath: 'inset(50% 0 0 0)' }} />
    </div>
  );
};

export default RingedPlanet;
