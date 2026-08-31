'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX, X } from 'lucide-react';
import { useReducedMotion } from '@/lib/hooks';

/**
 * AMBIENT SOUNDTRACK — invitation, never a toll booth.
 *
 * ─── WHY THIS IS NOT A COPY OF THE ASSESSMENT SITE ──────────────────────────
 * `empire-oracle` attempts autoplay on mount and, when the browser blocks it — which
 * Chrome, Safari and Firefox all do, so essentially every first-time visitor — renders a
 * full-screen "ACTIVATE EXPERIENCE" interstitial.
 *
 * On a product a visitor has already chosen, that is defensible. On a landing page whose
 * whole job is converting cold traffic in the first seconds, a black gate before any
 * content is a conversion tax paid in exactly the leads the page exists to capture. It
 * also fetched a 2.2 MB file with `preload="auto"` BEFORE the visitor consented to any
 * audio — their mobile data, spent on something most people never switch on.
 *
 * So: same atmosphere, opposite mechanics.
 *
 *   1. No autoplay attempt on a first visit. No interstitial. Ever.
 *   2. `preload="none"` — the audio is fetched only on opt-in. A visitor who never taps
 *      the control downloads ZERO bytes. This is what makes the feature free.
 *   3. Opus (453 KB) with an mp3 fallback (743 KB); the browser fetches exactly one.
 *   4. The choice is remembered, so a returning listener gets sound immediately and
 *      someone who declined is never asked again.
 *   5. Auto-pause when the tab is hidden — no music from an invisible tab.
 *   6. One gentle invitation after 5s, only if the visitor has never chosen. It
 *      auto-dismisses and never blocks anything.
 *
 * ─── A REVISED DECISION, RECORDED ───────────────────────────────────────────
 * The plan called for Web Audio `GainNode` ramps. Implementing it, the complexity was
 * not paying for itself: `MediaElementSource` adds AudioContext lifecycle management
 * (suspended states, iOS resume quirks) and routes playback through a graph that then
 * has to be torn down. A requestAnimationFrame ramp on `element.volume` updates every
 * ~16ms versus the 66ms `setInterval` steps that make the current site's fade audibly
 * steppy — smooth enough, with far fewer failure modes. Simpler won.
 */

const STORAGE_KEY = 'empire-crown-audio';
const TARGET_VOLUME = 0.14; // ambient: present, never competing with reading
const FADE_MS = 2200;

type Choice = 'on' | 'off' | null;

function readChoice(): Choice {
  if (typeof window === 'undefined') return null;
  try {
    const v = window.localStorage.getItem(STORAGE_KEY);
    return v === 'on' || v === 'off' ? v : null;
  } catch {
    return null; // private mode / storage disabled — behave like a first visit
  }
}

function writeChoice(v: Choice) {
  try {
    if (v) window.localStorage.setItem(STORAGE_KEY, v);
  } catch {
    /* storage unavailable — the session still works, it just won't be remembered */
  }
}

export function AmbientAudio() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const [playing, setPlaying] = useState(false);
  const [invite, setInvite] = useState(false);
  const reduced = useReducedMotion();

  /** Ramp volume smoothly, then optionally pause. */
  const ramp = useCallback((to: number, thenPause = false) => {
    const el = audioRef.current;
    if (!el) return;

    if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);

    const from = el.volume;
    const start = performance.now();

    const step = (now: number) => {
      const t = Math.min((now - start) / FADE_MS, 1);
      // easeInOutSine — no audible corner at either end of the fade
      const eased = 0.5 - Math.cos(Math.PI * t) / 2;
      el.volume = Math.max(0, Math.min(1, from + (to - from) * eased));

      if (t < 1) {
        rafRef.current = requestAnimationFrame(step);
        return;
      }
      rafRef.current = null;
      if (thenPause) el.pause();
    };

    rafRef.current = requestAnimationFrame(step);
  }, []);

  const enable = useCallback(async () => {
    const el = audioRef.current;
    if (!el) return;

    setInvite(false);
    writeChoice('on');

    try {
      el.volume = 0;
      await el.play(); // requires a gesture; this is always called from one
      setPlaying(true);
      ramp(TARGET_VOLUME);
    } catch {
      // Blocked or the file failed. Fail silently — audio is never load-bearing.
      setPlaying(false);
    }
  }, [ramp]);

  const disable = useCallback(() => {
    writeChoice('off');
    setPlaying(false);
    ramp(0, true);
  }, [ramp]);

  /* ── Mount: honour a remembered choice, otherwise offer once ── */
  useEffect(() => {
    const choice = readChoice();

    if (choice === 'on') {
      // A returning listener. This may still be blocked on a cold load, in which case
      // the control simply shows as off — no gate, no error, no explanation needed.
      const el = audioRef.current;
      if (el) {
        el.volume = 0;
        el.play()
          .then(() => {
            setPlaying(true);
            ramp(TARGET_VOLUME);
          })
          .catch(() => setPlaying(false));
      }
      return;
    }

    if (choice === null) {
      // Never chosen: invite once, gently, after the hero has had its moment.
      const show = window.setTimeout(() => setInvite(true), 5000);
      const hide = window.setTimeout(() => setInvite(false), 14000);
      return () => {
        window.clearTimeout(show);
        window.clearTimeout(hide);
      };
    }
  }, [ramp]);

  /* ── Don't play to an empty room ── */
  useEffect(() => {
    const onVisibility = () => {
      const el = audioRef.current;
      if (!el) return;
      if (document.hidden) {
        el.pause();
      } else if (playing) {
        el.play().catch(() => setPlaying(false));
      }
    };

    document.addEventListener('visibilitychange', onVisibility);
    return () => document.removeEventListener('visibilitychange', onVisibility);
  }, [playing]);

  /* ── Cleanup ── */
  useEffect(
    () => () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    },
    [],
  );

  return (
    <>
      {/*
        preload="none" is the single most important attribute here: it is why a visitor
        who ignores the control pays nothing. loop keeps the ambience continuous.
        Two sources, one fetch — Opus where supported, mp3 for older Safari.
      */}
      <audio ref={audioRef} loop preload="none" aria-hidden="true">
        <source src="/audio/ambient.opus.webm" type="audio/webm; codecs=opus" />
        <source src="/audio/ambient.mp3" type="audio/mpeg" />
      </audio>

      <div className="fixed bottom-5 right-5 z-40 flex items-center gap-2.5">
        {/* One-time invitation. Dismissible, self-dismissing, never blocking. */}
        {invite && (
          <div
            className="flex items-center gap-2 rounded-full border border-[rgba(201,168,76,0.35)] bg-[rgba(6,6,6,0.92)] py-2 pl-4 pr-2 backdrop-blur-md"
            style={{ animation: reduced ? 'none' : 'shimmer 4s linear infinite' }}
          >
            <button
              type="button"
              onClick={enable}
              className="cursor-pointer font-[family-name:var(--font-data)] text-[10px] uppercase tracking-[0.2em] text-[#c9a84c] transition-colors hover:text-[#e8d48b]"
            >
              Turn on the sound
            </button>
            <span className="text-[rgba(201,168,76,0.3)]" aria-hidden="true">
              |
            </span>
            <button
              type="button"
              onClick={() => {
                setInvite(false);
                writeChoice('off'); // "not now" means don't ask again
              }}
              aria-label="Dismiss"
              className="cursor-pointer p-1 text-[#8b7355] transition-colors hover:text-[#c9a84c]"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        )}

        <button
          type="button"
          onClick={playing ? disable : enable}
          aria-label={playing ? 'Mute ambient sound' : 'Play ambient sound'}
          aria-pressed={playing}
          title={playing ? 'Sound on' : 'Sound off'}
          className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border transition-all duration-300 hover:scale-105"
          style={{
            borderColor: playing ? 'rgba(201,168,76,0.6)' : 'rgba(201,168,76,0.25)',
            backgroundColor: playing ? 'rgba(201,168,76,0.14)' : 'rgba(6,6,6,0.85)',
            boxShadow: playing ? '0 0 18px rgba(201,168,76,0.25)' : 'none',
            backdropFilter: 'blur(6px)',
          }}
        >
          {playing ? (
            <Volume2 className="h-[18px] w-[18px] text-[#c9a84c]" aria-hidden="true" />
          ) : (
            <VolumeX className="h-[18px] w-[18px] text-[#8b7355]" aria-hidden="true" />
          )}
        </button>
      </div>
    </>
  );
}
