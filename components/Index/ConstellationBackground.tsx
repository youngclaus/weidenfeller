import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useTheme } from '../Theme/ThemeContext';

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

const MAX_CONNECTION_DISTANCE = 132;
const POINTER_INFLUENCE_DISTANCE = 190;

const clamp = (value: number, min: number, max: number) => (
  Math.min(Math.max(value, min), max)
);

const ConstellationBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { theme } = useTheme();

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
      const desktopCount = clamp(Math.round(viewportArea / 15000), 48, 112);
      const mobileCount = clamp(Math.round(viewportArea / 18000), 30, 68);
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
            const opacity = (1 - distance / MAX_CONNECTION_DISTANCE) * 0.32;
            context.beginPath();
            context.moveTo(first.x, first.y);
            context.lineTo(second.x, second.y);
            context.strokeStyle = theme.c3;
            context.globalAlpha = opacity;
            context.lineWidth = 0.75;
            context.stroke();
          }
        }

        if (pointer.active) {
          const pointerDistance = Math.hypot(first.x - pointer.x, first.y - pointer.y);

          if (pointerDistance < POINTER_INFLUENCE_DISTANCE) {
            const opacity = (1 - pointerDistance / POINTER_INFLUENCE_DISTANCE) * 0.58;
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
        animate();
      }
    };

    resizeCanvas();

    if (!reducedMotion) animate();

    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    document.documentElement.addEventListener('pointerleave', handlePointerLeave);
    window.addEventListener('blur', handlePointerLeave);
    reducedMotionQuery.addEventListener('change', handleMotionPreferenceChange);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('pointermove', handlePointerMove);
      document.documentElement.removeEventListener('pointerleave', handlePointerLeave);
      window.removeEventListener('blur', handlePointerLeave);
      reducedMotionQuery.removeEventListener('change', handleMotionPreferenceChange);
    };
  }, [theme.c3, theme.c4, theme.glow]);

  return (
    <Background aria-hidden="true">
      <Canvas ref={canvasRef} />
      <Vignette />
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
