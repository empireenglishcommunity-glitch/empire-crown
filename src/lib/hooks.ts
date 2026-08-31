'use client';

import { useEffect, useRef, useState, useSyncExternalStore } from 'react';

/* ─────────────────────────────────────────────────────────────
 * Reduced motion
 *
 * Implemented with useSyncExternalStore rather than useState+useEffect. A media
 * query IS an external store, and React 19's `set-state-in-effect` rule is right to
 * flag the effect version: it causes a cascading render on every mount.
 *
 * getServerSnapshot returns `true` — motion OFF — so the pre-rendered HTML is the
 * still version and a user who asked for no motion never sees a burst of it before
 * hydration catches up (R-A11Y-3).
 * ───────────────────────────────────────────────────────────── */

const REDUCED_QUERY = '(prefers-reduced-motion: reduce)';

function subscribeReducedMotion(onChange: () => void): () => void {
  if (typeof window === 'undefined' || !window.matchMedia) return () => {};
  const mq = window.matchMedia(REDUCED_QUERY);
  mq.addEventListener('change', onChange);
  return () => mq.removeEventListener('change', onChange);
}

function getReducedMotionSnapshot(): boolean {
  if (typeof window === 'undefined' || !window.matchMedia) return true;
  return window.matchMedia(REDUCED_QUERY).matches;
}

/** Server/hydration snapshot: assume motion is unwanted until proven otherwise. */
function getReducedMotionServerSnapshot(): boolean {
  return true;
}

export function useReducedMotion(): boolean {
  return useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot,
  );
}

/* ─────────────────────────────────────────────────────────────
 * Fire once when an element first becomes sufficiently visible.
 * Keeps animation off-screen from ever running (R-PERF-5).
 * ───────────────────────────────────────────────────────────── */

export function useInViewOnce<T extends HTMLElement>(threshold = 0.35) {
  const ref = useRef<T | null>(null);
  const [seen, setSeen] = useState(false);

  useEffect(() => {
    if (seen) return;
    const el = ref.current;
    if (!el) return;

    // Very old browser with no IntersectionObserver: reveal rather than hide.
    // Deferred a frame so this isn't a synchronous setState inside the effect body.
    if (typeof IntersectionObserver === 'undefined') {
      const id = requestAnimationFrame(() => setSeen(true));
      return () => cancelAnimationFrame(id);
    }

    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setSeen(true);
          io.disconnect();
        }
      },
      { threshold },
    );

    io.observe(el);
    return () => io.disconnect();
  }, [threshold, seen]);

  return { ref, seen };
}

/* ─────────────────────────────────────────────────────────────
 * Count up to a target once, with an ease-out curve.
 *
 * Under reduced motion the target is returned directly and no animation state is
 * ever written — the number is the information, the animation is decoration.
 * ───────────────────────────────────────────────────────────── */

export function useCountUp(target: number, active: boolean, durationMs = 1600): number {
  const reduced = useReducedMotion();
  const [value, setValue] = useState(0);
  const frame = useRef<number | null>(null);

  useEffect(() => {
    if (!active || reduced) return;

    const start = performance.now();

    const tick = (now: number) => {
      const t = Math.min((now - start) / durationMs, 1);
      // easeOutCubic — quick off the line, soft landing.
      const eased = 1 - Math.pow(1 - t, 3);
      setValue(Math.round(target * eased));
      if (t < 1) frame.current = requestAnimationFrame(tick);
    };

    frame.current = requestAnimationFrame(tick);

    return () => {
      if (frame.current !== null) cancelAnimationFrame(frame.current);
      frame.current = null;
    };
  }, [target, active, durationMs, reduced]);

  return reduced ? target : value;
}

/* ─────────────────────────────────────────────────────────────
 * Scroll progress 0→1, for the header rule.
 * Reads are coalesced to one per frame.
 * ───────────────────────────────────────────────────────────── */

export function useScrollProgress(): number {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let raf: number | null = null;

    const read = () => {
      raf = null;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(Math.max(window.scrollY / max, 0), 1) : 0);
    };

    const schedule = () => {
      if (raf === null) raf = requestAnimationFrame(read);
    };

    // Initial read deferred a frame — not a synchronous setState in the effect body,
    // and the layout is settled by the time it runs.
    schedule();

    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule, { passive: true });

    return () => {
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      if (raf !== null) cancelAnimationFrame(raf);
    };
  }, []);

  return progress;
}
