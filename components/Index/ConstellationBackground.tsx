import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { useTheme } from '../Theme/ThemeContext';
import { namedConstellations, NamedConstellation } from './constellationData';

interface Particle { x: number; y: number; vx: number; vy: number; radius: number; brightness: number; }
interface PointerState { x: number; y: number; previousX: number; previousY: number; velocityX: number; velocityY: number; active: boolean; }
type ConstellationStyle = React.CSSProperties & { '--desktop-x': string; '--desktop-y': string; '--mobile-x': string; '--mobile-y': string; };

const MAX_CONNECTION_DISTANCE = 132;
const POINTER_INFLUENCE_DISTANCE = 190;
const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);
const constellationPosition = (item: NamedConstellation, width: number, height: number) => {
  const mobile = width < 700;
  return {
    x: width * ((mobile ? item.mobileX : item.x) / 100),
    y: height * ((mobile ? item.mobileY : item.y) / 100),
  };
};

interface ConstellationBackgroundProps {
  interactiveVisible?: boolean;
}

const ConstellationBackground: React.FC<ConstellationBackgroundProps> = ({ interactiveVisible = true }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const activeRef = useRef<string | null>(null);
  const constellationOpacityRef = useRef(interactiveVisible ? 1 : 0);
  const constellationTargetRef = useRef(interactiveVisible ? 1 : 0);
  const redrawRef = useRef<() => void>(() => undefined);
  const [active, setActiveState] = useState<string | null>(null);
  const { theme } = useTheme();

  useEffect(() => {
    const target = interactiveVisible ? 1 : 0;
    constellationTargetRef.current = target;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      constellationOpacityRef.current = target;
    }
    redrawRef.current();
  }, [interactiveVisible]);

  const setActive = (id: string | null) => {
    activeRef.current = id;
    setActiveState(id);
    redrawRef.current();
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const currentCanvas: HTMLCanvasElement = canvas;
    const candidate = currentCanvas.getContext('2d');
    if (!candidate) return;
    const context: CanvasRenderingContext2D = candidate;
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    let reducedMotion = motionQuery.matches;
    let width = window.innerWidth;
    let height = window.innerHeight;
    let frame = 0;
    let particles: Particle[] = [];
    const pointer: PointerState = { x: width / 2, y: height / 2, previousX: width / 2, previousY: height / 2, velocityX: 0, velocityY: 0, active: false };

    function createParticles() {
      const area = width * height;
      const count = width < 700 ? clamp(Math.round(area / 21000), 24, 52) : clamp(Math.round(area / 17000), 42, 92);
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.22,
        vy: (Math.random() - 0.5) * 0.22,
        radius: Math.random() * 1.75 + 1,
        brightness: Math.random() * 0.45 + 0.45,
      }));
    }

    function resize() {
      width = window.innerWidth;
      height = window.innerHeight;
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      currentCanvas.width = Math.floor(width * ratio);
      currentCanvas.height = Math.floor(height * ratio);
      currentCanvas.style.width = `${width}px`;
      currentCanvas.style.height = `${height}px`;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      createParticles();
      draw();
    }

    function updateParticles() {
      const opacityDelta = constellationTargetRef.current - constellationOpacityRef.current;
      constellationOpacityRef.current = Math.abs(opacityDelta) < 0.002
        ? constellationTargetRef.current
        : constellationOpacityRef.current + opacityDelta * 0.08;

      particles.forEach((particle) => {
        if (pointer.active) {
          const dx = pointer.x - particle.x;
          const dy = pointer.y - particle.y;
          const distance = Math.hypot(dx, dy) || 1;
          if (distance < POINTER_INFLUENCE_DISTANCE) {
            const influence = 1 - distance / POINTER_INFLUENCE_DISTANCE;
            particle.vx += (dx / distance) * influence * 0.0045 + pointer.velocityX * influence * 0.0018;
            particle.vy += (dy / distance) * influence * 0.0045 + pointer.velocityY * influence * 0.0018;
          }
        }
        particle.vx = clamp(particle.vx * 0.995, -0.75, 0.75);
        particle.vy = clamp(particle.vy * 0.995, -0.75, 0.75);
        particle.x += particle.vx;
        particle.y += particle.vy;
        if (particle.x < -8) particle.x = width + 8;
        if (particle.x > width + 8) particle.x = -8;
        if (particle.y < -8) particle.y = height + 8;
        if (particle.y > height + 8) particle.y = -8;
      });
      pointer.velocityX *= 0.88;
      pointer.velocityY *= 0.88;
    }

    function drawConstellations() {
      const constellationOpacity = constellationOpacityRef.current;
      if (constellationOpacity <= 0.01) return;

      const base = Math.min(width, height);
      const time = performance.now() * 0.001;
      namedConstellations.forEach((item, constellationIndex) => {
        const center = constellationPosition(item, width, height);
        const rotation = item.rotation * Math.PI / 180;
        const scale = clamp(base * item.scale, width < 700 ? 20 : 26, width < 700 ? 34 : 52);
        const selected = activeRef.current === item.id;
        const points = item.pattern.map((point, pointIndex) => {
          const x = point.x * Math.cos(rotation) - point.y * Math.sin(rotation);
          const y = point.x * Math.sin(rotation) + point.y * Math.cos(rotation);
          const drift = reducedMotion ? 0 : Math.sin(time * 0.75 + constellationIndex + pointIndex) * 1.25;
          return { x: center.x + x * scale + drift, y: center.y + y * scale + drift * 0.55 };
        });
        context.beginPath();
        points.forEach((point, index) => index === 0 ? context.moveTo(point.x, point.y) : context.lineTo(point.x, point.y));
        context.strokeStyle = selected ? theme.c4 : theme.c3;
        context.globalAlpha = (selected ? 0.94 : 0.38) * constellationOpacity;
        context.lineWidth = selected ? 1.7 : 1;
        context.shadowColor = selected ? theme.glow : theme.c3;
        context.shadowBlur = selected ? 14 : 4;
        context.stroke();
        points.forEach((point, pointIndex) => {
          const twinkle = reducedMotion ? 0 : Math.sin(time * 1.4 + constellationIndex * 0.8 + pointIndex) * 0.35;
          context.beginPath();
          context.arc(point.x, point.y, Math.max((selected ? 2.8 : 1.8) + twinkle, 1.2), 0, Math.PI * 2);
          context.fillStyle = selected ? theme.c4 : theme.c3;
          context.globalAlpha = (selected ? 1 : 0.74) * constellationOpacity;
          context.shadowColor = selected ? theme.glow : theme.c3;
          context.shadowBlur = selected ? 16 : 7;
          context.fill();
        });
      });
    }

    function draw() {
      context.clearRect(0, 0, width, height);
      if (pointer.active) {
        const glow = context.createRadialGradient(pointer.x, pointer.y, 0, pointer.x, pointer.y, POINTER_INFLUENCE_DISTANCE * 1.35);
        glow.addColorStop(0, theme.glow);
        glow.addColorStop(1, 'rgba(0, 0, 0, 0)');
        context.globalAlpha = 0.2;
        context.fillStyle = glow;
        context.fillRect(0, 0, width, height);
      }
      for (let firstIndex = 0; firstIndex < particles.length; firstIndex += 1) {
        const first = particles[firstIndex];
        for (let secondIndex = firstIndex + 1; secondIndex < particles.length; secondIndex += 1) {
          const second = particles[secondIndex];
          const distance = Math.hypot(first.x - second.x, first.y - second.y);
          if (distance < MAX_CONNECTION_DISTANCE) {
            context.beginPath();
            context.moveTo(first.x, first.y);
            context.lineTo(second.x, second.y);
            context.strokeStyle = theme.c3;
            context.globalAlpha = (1 - distance / MAX_CONNECTION_DISTANCE) * 0.24;
            context.lineWidth = 0.65;
            context.stroke();
          }
        }
        if (pointer.active) {
          const distance = Math.hypot(first.x - pointer.x, first.y - pointer.y);
          if (distance < POINTER_INFLUENCE_DISTANCE) {
            context.beginPath();
            context.moveTo(first.x, first.y);
            context.lineTo(pointer.x, pointer.y);
            context.strokeStyle = theme.c4;
            context.globalAlpha = (1 - distance / POINTER_INFLUENCE_DISTANCE) * 0.48;
            context.lineWidth = 0.9;
            context.stroke();
          }
        }
      }
      particles.forEach((particle) => {
        const distance = pointer.active ? Math.hypot(particle.x - pointer.x, particle.y - pointer.y) : Number.POSITIVE_INFINITY;
        const boost = distance < POINTER_INFLUENCE_DISTANCE ? (1 - distance / POINTER_INFLUENCE_DISTANCE) * 0.8 : 0;
        context.beginPath();
        context.arc(particle.x, particle.y, particle.radius + boost, 0, Math.PI * 2);
        context.fillStyle = boost > 0.2 ? theme.c3 : theme.c4;
        context.globalAlpha = clamp(particle.brightness + boost, 0.3, 1);
        context.shadowColor = boost > 0.2 ? theme.c3 : theme.c4;
        context.shadowBlur = boost > 0.2 ? 12 : 7;
        context.fill();
      });
      drawConstellations();
      context.globalAlpha = 1;
      context.shadowBlur = 0;
    }

    function animate() {
      updateParticles();
      draw();
      frame = window.requestAnimationFrame(animate);
    }
    const redrawIfStatic = () => { if (reducedMotion) draw(); };
    const movePointer = (event: PointerEvent) => {
      pointer.previousX = pointer.x;
      pointer.previousY = pointer.y;
      pointer.x = event.clientX;
      pointer.y = event.clientY;
      pointer.velocityX = pointer.x - pointer.previousX;
      pointer.velocityY = pointer.y - pointer.previousY;
      pointer.active = true;
      redrawIfStatic();
    };
    const leavePointer = () => { pointer.active = false; redrawIfStatic(); };
    const changeMotion = (event: MediaQueryListEvent) => {
      reducedMotion = event.matches;
      window.cancelAnimationFrame(frame);
      if (reducedMotion) draw(); else frame = window.requestAnimationFrame(animate);
    };

    redrawRef.current = draw;
    resize();
    if (!reducedMotion) frame = window.requestAnimationFrame(animate);
    window.addEventListener('resize', resize);
    window.addEventListener('pointermove', movePointer, { passive: true });
    document.documentElement.addEventListener('pointerleave', leavePointer);
    window.addEventListener('blur', leavePointer);
    motionQuery.addEventListener('change', changeMotion);
    return () => {
      redrawRef.current = () => undefined;
      window.cancelAnimationFrame(frame);
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', movePointer);
      document.documentElement.removeEventListener('pointerleave', leavePointer);
      window.removeEventListener('blur', leavePointer);
      motionQuery.removeEventListener('change', changeMotion);
    };
  }, [theme.c3, theme.c4, theme.glow]);

  return <Background><Canvas ref={canvasRef} aria-hidden="true" /><Vignette aria-hidden="true" /><ConstellationLayer $visible={interactiveVisible} aria-label="Interactive constellations">{namedConstellations.map((item) => {
    const selected = active === item.id;
    const style: ConstellationStyle = { '--desktop-x': `${item.x}%`, '--desktop-y': `${item.y}%`, '--mobile-x': `${item.mobileX}%`, '--mobile-y': `${item.mobileY}%` };
    return <ConstellationHotspot key={item.id} type="button" style={style} aria-label={`Reveal constellation: ${item.title}`} aria-pressed={selected} $visible={interactiveVisible} onMouseEnter={() => setActive(item.id)} onMouseLeave={() => setActive(null)} onPointerEnter={() => setActive(item.id)} onPointerLeave={() => setActive(null)} onFocus={() => setActive(item.id)} onBlur={() => setActive(null)} onClick={() => setActive(activeRef.current === item.id ? null : item.id)}><ConstellationLabel $visible={selected}>{item.title}</ConstellationLabel></ConstellationHotspot>;
  })}</ConstellationLayer></Background>;
};

export default ConstellationBackground;

const Background = styled.div`position:absolute;inset:0;z-index:0;overflow:hidden;pointer-events:none;background:radial-gradient(circle at 50% 40%,rgba(255,255,255,.045),transparent 58%),#000;`;
const Canvas = styled.canvas`position:absolute;inset:0;width:100%;height:100%;`;
const Vignette = styled.div`position:absolute;inset:0;background:linear-gradient(to bottom,rgba(0,0,0,.12),transparent 28%),radial-gradient(circle at center,transparent 42%,rgba(0,0,0,.38) 100%);`;
const ConstellationLayer = styled.div<{ $visible: boolean }>`position:absolute;inset:0;z-index:2;opacity:${({ $visible }) => $visible ? 1 : 0};pointer-events:none;transition:opacity 500ms ease;@media(prefers-reduced-motion:reduce){transition-duration:1ms;}`;
const ConstellationHotspot = styled.button<{ $visible: boolean }>`appearance:none;position:absolute;left:var(--desktop-x);top:var(--desktop-y);width:112px;height:88px;padding:0;border:0;border-radius:50%;background:transparent;transform:translate(-50%,-50%);cursor:help;pointer-events:${({ $visible }) => $visible ? 'auto' : 'none'};&:focus-visible{outline:1px dashed ${({ theme }) => theme.c3};outline-offset:4px;}@media(max-width:699px){left:var(--mobile-x);top:var(--mobile-y);width:84px;height:62px;}`;
const ConstellationLabel = styled.span<{ $visible: boolean }>`position:absolute;left:50%;top:calc(100% + 4px);width:max-content;max-width:min(240px,72vw);padding:7px 10px;border:1px solid ${({ theme }) => theme.c3};border-radius:4px;background:${({ theme }) => theme.c2};color:${({ theme }) => theme.c4};box-shadow:0 8px 24px rgba(0,0,0,.32);font-family:"DM Mono",monospace;font-size:12px;font-weight:700;line-height:1.3;text-align:center;white-space:normal;opacity:${({ $visible }) => $visible ? 1 : 0};transform:translate(-50%,${({ $visible }) => $visible ? '0' : '-4px'});transition:opacity 150ms ease,transform 150ms ease;pointer-events:none;${ConstellationHotspot}:hover &,${ConstellationHotspot}:focus-visible &{opacity:1;transform:translate(-50%,0);}@media(max-width:699px){max-width:170px;padding:5px 7px;font-size:9px;}@media(prefers-reduced-motion:reduce){transition:none;}`;
