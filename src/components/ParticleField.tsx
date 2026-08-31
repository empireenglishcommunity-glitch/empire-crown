'use client';

import { useEffect, useRef } from 'react';
import { useReducedMotion } from '@/lib/hooks';

/**
 * Ambient gold motes on a canvas.
 *
 * Deliberately perf-hardened rather than ported as-is (R-PERF-2, R-PERF-5):
 *  - particle count scales with viewport and is hard-capped
 *  - the RAF loop stops entirely when the tab is hidden
 *  - renders nothing at all under prefers-reduced-motion
 *  - DPR capped at 2, because a 3x retina backing store for decorative dust is waste
 */
export function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let raf: number | null = null;
    let running = true;

    type Mote = { x: number; y: number; r: number; vy: number; vx: number; a: number };
    let motes: Mote[] = [];
    let w = 0;
    let h = 0;

    const setup = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // ~1 mote per 18,000 px², capped at 70. A phone gets far fewer than a desktop.
      const count = Math.min(Math.round((w * h) / 18000), 70);
      motes = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 1.5 + 0.4,
        vy: -(Math.random() * 0.22 + 0.05),
        vx: (Math.random() - 0.5) * 0.14,
        a: Math.random() * 0.4 + 0.1,
      }));
    };

    const draw = () => {
      if (!running) return;
      ctx.clearRect(0, 0, w, h);

      for (const m of motes) {
        m.y += m.vy;
        m.x += m.vx;

        // Recycle at the top rather than allocating new objects.
        if (m.y < -6) {
          m.y = h + 6;
          m.x = Math.random() * w;
        }
        if (m.x < -6) m.x = w + 6;
        if (m.x > w + 6) m.x = -6;

        ctx.beginPath();
        ctx.arc(m.x, m.y, m.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(201,168,76,${m.a})`;
        ctx.fill();
      }

      raf = requestAnimationFrame(draw);
    };

    const stop = () => {
      running = false;
      if (raf !== null) cancelAnimationFrame(raf);
      raf = null;
    };

    const start = () => {
      if (running && raf !== null) return;
      running = true;
      raf = requestAnimationFrame(draw);
    };

    // Don't burn battery animating dust nobody is looking at.
    const onVisibility = () => (document.hidden ? stop() : start());

    setup();
    start();

    window.addEventListener('resize', setup);
    document.addEventListener('visibilitychange', onVisibility);

    return () => {
      stop();
      window.removeEventListener('resize', setup);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, [reduced]);

  if (reduced) return null;

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 h-full w-full"
    />
  );
}
