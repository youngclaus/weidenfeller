import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { useTheme } from '../Theme/ThemeContext';
import { namedConstellations, NamedConstellation } from './constellationData';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  brightness: number;
}

interface PointerState {
  x: number;
  y: number;
  previousX: number;
  previousY: number;
  velocityX: number;
  velocityY: number;
  active: boolean;
}

type ConstellationStyle = React.CSSProperties & {
  '--desktop-x': string;
  '--desktop-y': string;
  '--mobile-x': string;
  '--mobile-y': string;
};

const MAX_CONNECTION_DISTANCE = 132;
const POINTER_INFLUENCE_DISTANCE = 190;

const clamp = (value: number, min: number, max: number) => (
  Math.min(Math.max(value, min), max)
);

const getConstellationPosition = (
  constellation: NamedConstellation,
  width: number,
  height: number,
) => {
  const useMobileLayout = width < 700;
  const xPercent = useMobileLayout ? constellation.mobileX : constellation.x;
  const yPercent = useMobileLayout ? constellation.mobileY : constellation.y;

  return {
    x: width * (xPercent / 100),
    y: height * (yPercent / 100),
  };
};

const ConstellationBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const activeConstellationRef = useRef<string | null>(null);
  const redrawRef = useRef<() => void>(() => undefined);
  const [activeConstellation, setActiveConstellationState] = useState<string | null>(null);
  const { theme } = useTheme();

  const setActiveConstellation = (id: string | null) => {
    activeConstellationRef.current = id;
    setActiveConstellationState(id);
    redrawRef.current();
  };

  const toggleConstellation = (id: string) => {
    setActiveConstellation(activeConstellationRef.current === id ? null : id);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext('2d');
    if (!context) return;

    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    let reducedMotion = reducedMotionQuery.matches;
    let width = window.innerWidth;
    let height = window.innerHeight;
    let animationFrame = 0;
    let particles: Particle[] = [];

    const pointer: PointerState = {
      x: width / 2,
      y: height / 2,
      previousX: width / 2,
      previousY: height / 2,
      velocityX: 0,
      velocityY: 0,
      active: false,
    };

    const createParticles = () => {
      const viewportArea = width * height;
      const desktopCount = clamp(Math.round(viewportArea / 17000), 42, 92);
      const mobileCount = clamp(Math.round(viewportArea / 21000), 24, 52);
      const count = width < 700 ? mobileCount : desktopCount;

      particles = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.22,
        vy: (Math.random() - 0.5) * 0.22,
        radius: Math.random() * 1.35 + 0.65,
        brightness: Math.random() * 0.45 + 0.45,
      }));
    };

    const resizeCanvas = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = Math.floor(width * pixelRatio);
      canvas.height = Math.floor(height * pixelRatio);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);

      createParticles();
      draw();
    };

    const updateParticles = () => {
      particles.forEach((particle) => {
        if (pointer.active) {
          const deltaX = pointer.x - particle.x;
          const deltaY = pointer.y - particle.y;
          const distance = Math.hypot(deltaX, deltaY) || 1;

          if (distance < POINTER_INFLUENCE_DISTANCE) {
            const influence = 1 - distance / POINTER_INFLUENCE_DISTANCE;
            const attraction = influence * 0.0045;

            particle.vx += (deltaX / distance) * attraction;
            particle.vy += (deltaY / distance) * attraction;
            particle.vx += pointer.velocityX * influence * 0.0018;
            particle.vy += pointer.velocityY * influence * 0.0018;
          }
        }

        particle.vx *= 0.995;
        particle.vy *= 0.995;
        particle.vx = clamp(particle.vx, -0.75, 0.75);
        particle.vy = clamp(particle.vy, -0.75, 0.75);
        particle.x += particle.vx;
        particle.y += particle.vy;

        if (particle.x < -8) particle.x = width + 8;
        if (particle.x > width + 8) particle.x = -8;
        if (particle.y < -8) particle.y = height + 8;
        if (particle.y > height + 8) particle.y = -8;
      });

      pointer.velocityX *= 0.88;
      pointer.velocityY *= 0.88;
    };

    const drawNamedConstellations = () => {
      const baseDimension = Math.min(width, height);
      const time = performance.now() * 0.001;

      namedConstellations.forEach((constellation, constellationIndex) => {
        const center = getConstellationPosition(constellation, width, height);
        const rotation = constellation.rotation * (Math.PI / 180);
        const minScale = width < 700 ? 20 : 26;
        const maxScale = width < 700 ? 34 : 52;
        const scale = clamp(baseDimension * constellation.scale, minScale, maxScale);
        const isActive = activeConstellationRef.current === constellation.id;
        const points = constellation.pattern.map((point, pointIndex) => {
          const rotatedX = point.x * Math.cos(rotation) - point.y * Math.sin(rotation);
          const rotatedY = point.x * Math.sin(rotation) + point.y * Math.cos(rotation);
          const drift = reducedMotion
            ? 0
            : Math.sin(time * 0.75 + constellationIndex + pointIndex) * 1.25;

          return {
            x: center.x + rotatedX * scale + drift,
            y: center.y + rotatedY * scale + drift * 0.55,
          };
        });

        context.beginPath();
        points.forEach((point, index) => {
          if (index === 0) context.moveTo(point.x, point.y);
          else context.lineTo(point.x, point.y);
        });
        context.strokeStyle = isActive ? theme.c4 : theme.c3;
        context.globalAlpha = isActive ? 0.94 : 0.38;
        context.lineWidth = isActive ? 1.7 : 1;
        context.shadowColor = isActive ? theme.glow : theme.c3;
        context.shadowBlur = isActive ? 14 : 4;
        context.stroke();

        points.forEach((point, pointIndex) => {
          const twinkle = reducedMotion
            ? 0
            : Math.sin(time * 1.4 + constellationIndex * 0.8 + pointIndex) * 0.35;
          const radius = (isActive ? 2.8 : 1.8) + twinkle;

          context.beginPath();
          context.arc(point.x, point.y, Math.max(radius, 1.2), 0, Math.PI * 2);
          context.fillStyle = isActive ? theme.c4 : theme.c3;
          context.globalAlpha = isActive ? 1 : 0.74;
          context.shadowColor = isActive ? theme.glow : theme.c3;
          context.shadowBlur = isActive ? 16 : 7;
          context.fill();
        });
      });

      context.globalAlpha = 1;
      context.shadowBlur = 0;
    };

    function draw() {
      context.clearRect(0, 0, width, height);

      if (pointer.active) {
        const glow = context.createRadialGradient(
          pointer.x,
          pointer.y,
          0,
          pointer.x,
          pointer.y,
          POINTER_INFLUENCE_DISTANCE * 1.35,
        );
        glow.addColorStop(0, theme.glow);
        glow.addColorStop(1, 'rgba(0, 0, 0, 0)');
        context.globalAlpha = 0.24;
        context.fillStyle = glow;
        context.fillRect(0, 0, width, height);
        context.globalAlpha = 1;
      }

      for (let firstIndex = 0; firstIndex < particles.length; firstIndex += 1) {
        const first = particles[firstIndex];

        for (let secondIndex = firstIndex + 1; secondIndex < particles.length; secondIndex += 1) {
          const second = particles[secondIndex];
          const distance = Math.hypot(first.x - second.x, first.y - second.y);

          if (distance < MAX_CONNECTION_DISTANCE) {
            const opacity = (1 - distance / MAX_CONNECTION_DISTANCE) * 0.24;
            context.beginPath();
            context.moveTo(first.x, first.y);
            context.lineTo(second.x, second.y);
            context.strokeStyle = theme.c3;
            context.globalAlpha = opacity;
            context.lineWidth = 0.65;
            context.stroke();
          }
        }

        if (pointer.active) {
          const pointerDistance = Math.hypot(first.x - pointer.x, first.y - pointer.y);

          if (pointerDistance < POINTER_INFLUENCE_DISTANCE) {
            const opacity = (1 - pointerDistance / POINTER_INFLUENCE_DISTANCE) * 0.48;
            context.beginPath();
            context.moveTo(first.x, first.y);
            context.lineTo(pointer.x, pointer.y);
            context.strokeStyle = theme.c4;
            context.globalAlpha = opacity;
            context.lineWidth = 0.9;
            context.stroke();
          }
        }
      }

      particles.forEach((particle) => {
        const pointerDistance = pointer.active
          ? Math.hypot(particle.x - pointer.x, particle.y - pointer.y)
          : Number.POSITIVE_INFINITY;
        const pointerBoost = pointerDistance < POINTER_INFLUENCE_DISTANCE
          ? (1 - pointerDistance / POINTER_INFLUENCE_DISTANCE) * 0.8
          : 0;

        context.beginPath();
        context.arc(
          particle.x,
          particle.y,
          particle.radius + pointerBoost,
          0,
          Math.PI * 2,
        );
        context.fillStyle = pointerBoost > 0.2 ? theme.c3 : theme.c4;
        context.globalAlpha = clamp(particle.brightness + pointerBoost, 0.3, 1);
        context.shadowColor = pointerBoost > 0.2 ? theme.c3 : theme.c4;
        context.shadowBlur = pointerBoost > 0.2 ? 8 : 3;
        context.fill();
      });

      drawNamedConstellations();
      context.globalAlpha = 1;
      context.shadowBlur = 0;
    }

    const animate = () => {
      updateParticles();
      draw();
      animationFrame = window.requestAnimationFrame(animate);
    };

    const renderReducedMotionFrame = () => {
      if (reducedMotion) draw();
    };

    const handlePointerMove = (event: PointerEvent) => {
      pointer.previousX = pointer.x;
      pointer.previousY = pointer.y;
      pointer.x = event.clientX;
      pointer.y = event.clientY;
      pointer.velocityX = pointer.x - pointer.previousX;
      pointer.velocityY = pointer.y - pointer.previousY;
      pointer.active = true;
      renderReducedMotionFrame();
    };

    const handlePointerLeave = () => {
      pointer.active = false;
      renderReducedMotionFrame();
    };

    const handleMotionPreferenceChange = (event: MediaQueryListEvent) => {
      reducedMotion = event.matches;
      window.cancelAnimationFrame(animationFrame);

      if (reducedMotion) {
        draw();
      } else {
        animationFrame = window.requestAnimationFrame(animate);
      }
    };

    redrawRef.current = draw;
    resizeCanvas();

    if (!reducedMotion) animationFrame = window.requestAnimationFrame(animate);

    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    document.documentElement.addEventListener('pointerleave', handlePointerLeave);
    window.addEventListener('blur', handlePointerLeave);
    reducedMotionQuery.addEventListener('change', handleMotionPreferenceChange);

    return () => {
      redrawRef.current = () => undefined;
      window.cancelAnimationFrame(animationFrame);
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('pointermove', handlePointerMove);
      document.documentElement.removeEventListener('pointerleave', handlePointerLeave);
      window.removeEventListener('blur', handlePointerLeave);
      reducedMotionQuery.removeEventListener('change', handleMotionPreferenceChange);
    };
  }, [theme.c3, theme.c4, theme.glow]);

  return (
    <Background>
      <Canvas ref={canvasRef} aria-hidden="true" />
      <Vignette aria-hidden="true" />
      <ConstellationLayer aria-label="Interactive constellations">
        {namedConstellations.map((constellation) => {
          const isActive = activeConstellation === constellation.id;
          const style: ConstellationStyle = {
            '--desktop-x': `${constellation.x}%`,
            '--desktop-y': `${constellation.y}%`,
            '--mobile-x': `${constellation.mobileX}%`,
            '--mobile-y': `${constellation.mobileY}%`,
          };

          return (
            <ConstellationHotspot
              key={constellation.id}
              type="button"
              style={style}
              aria-label={`Reveal constellation: ${constellation.title}`}
              aria-pressed={isActive}
              onPointerEnter={() => setActiveConstellation(constellation.id)}
              onPointerLeave={() => setActiveConstellation(null)}
              onFocus={() => setActiveConstellation(constellation.id)}
              onBlur={() => setActiveConstellation(null)}
              onClick={() => toggleConstellation(constellation.id)}
            >
              <ConstellationLabel $visible={isActive}>
                {constellation.title}
              </ConstellationLabel>
            </ConstellationHotspot>
          );
        })}
      </ConstellationLayer>
    </Background>
  );
};

export default ConstellationBackground;

const Background = styled.div`
  position: absolute;
  inset: 0;
  z-index: 0;
  overflow: hidden;
  pointer-events: none;
  background:
    radial-gradient(circle at 50% 40%, rgba(255, 255, 255, 0.045), transparent 58%),
    ${({ theme }) => theme.c1};
`;

const Canvas = styled.canvas`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
`;

const Vignette = styled.div`
  position: absolute;
  inset: 0;
  background:
    linear-gradient(to bottom, rgba(0, 0, 0, 0.12), transparent 28%),
    radial-gradient(circle at center, transparent 42%, rgba(0, 0, 0, 0.38) 100%);
`;

const ConstellationLayer = styled.div`
  position: absolute;
  inset: 0;
  z-index: 2;
  pointer-events: none;
`;

const ConstellationHotspot = styled.button`
  appearance: none;
  position: absolute;
  left: var(--desktop-x);
  top: var(--desktop-y);
  width: 112px;
  height: 88px;
  padding: 0;
  border: 0;
  border-radius: 50%;
  background: transparent;
  transform: translate(-50%, -50%);
  cursor: help;
  pointer-events: auto;

  &:focus-visible {
    outline: 1px dashed ${({ theme }) => theme.c3};
    outline-offset: 4px;
  }

  @media (max-width: 699px) {
    left: var(--mobile-x);
    top: var(--mobile-y);
    width: 84px;
    height: 62px;
  }
`;

const ConstellationLabel = styled.span<{ $visible: boolean }>`
  position: absolute;
  left: 50%;
  top: calc(100% + 4px);
  width: max-content;
  max-width: min(240px, 72vw);
  padding: 7px 10px;
  border: 1px solid ${({ theme }) => theme.c3};
  border-radius: 4px;
  background: ${({ theme }) => theme.c2};
  color: ${({ theme }) => theme.c4};
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.32);
  font-family: "DM Mono", monospace;
  font-size: 12px;
  font-weight: 700;
  line-height: 1.3;
  text-align: center;
  white-space: normal;
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  transform: translate(-50%, ${({ $visible }) => ($visible ? '0' : '-4px')});
  transition: opacity 150ms ease, transform 150ms ease;
  pointer-events: none;

  @media (max-width: 699px) {
    max-width: 170px;
    padding: 5px 7px;
    font-size: 9px;
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`;
