'use client';

import { useEffect, useRef, useCallback, useState } from 'react';

// ─── Types ────────────────────────────────────────────────────────────────────

interface Projectile {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;   // 0..1, decreases per frame
  decay: number;  // life lost per frame
  color: string;
  size: number;
}

interface Explosion {
  id: number;
  x: number;
  y: number;
  frame: number;
  particles: Particle[];
}

// ─── Constants ────────────────────────────────────────────────────────────────

const RETRO_COLORS      = ['#00FF9C', '#FFB000', '#00ffff', '#ff00ff', '#ffffff'];
const COOLDOWN_MS       = 300;
const PROJ_SPEED        = 14;
const LERP              = 0.08;
const COLLISION_EVERY   = 2;   // check collisions every N frames (not every frame)
const RECT_REFRESH_MS   = 500; // ms between DOM bounding-rect queries

// ─── Cached target rects (module-level, shared across mounts) ─────────────────
// This is the key perf fix: we never call getBoundingClientRect inside the
// per-frame loop. Instead we snapshot rects every 500 ms and hit-test the cache.

interface CachedRect { left: number; top: number; right: number; bottom: number; }
let _cachedRects: CachedRect[] = [];
let _lastRectTime = 0;

function refreshRects() {
  const now = Date.now();
  if (now - _lastRectTime < RECT_REFRESH_MS) return;
  _lastRectTime = now;
  _cachedRects = Array.from(
    document.querySelectorAll<HTMLElement>('a, button, [role="button"], .shootable')
  ).map(el => {
    const r = el.getBoundingClientRect();
    return { left: r.left, top: r.top, right: r.right, bottom: r.bottom };
  });
}

function hitTest(x: number, y: number): boolean {
  for (const r of _cachedRects) {
    if (x >= r.left && x <= r.right && y >= r.top && y <= r.bottom) return true;
  }
  return false;
}

// ─── Audio ────────────────────────────────────────────────────────────────────

function playLaser(ctx: AudioContext) {
  const osc  = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = 'square';
  osc.frequency.setValueAtTime(680, ctx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(80, ctx.currentTime + 0.12);
  gain.gain.setValueAtTime(0.15, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.12);
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start(); osc.stop(ctx.currentTime + 0.12);
}

function playBoom(ctx: AudioContext) {
  const t = ctx.currentTime;

  // Low thud
  const o1 = ctx.createOscillator(), g1 = ctx.createGain();
  o1.type = 'sine';
  o1.frequency.setValueAtTime(160, t);
  o1.frequency.exponentialRampToValueAtTime(30, t + 0.28);
  g1.gain.setValueAtTime(0.5, t);
  g1.gain.exponentialRampToValueAtTime(0.001, t + 0.28);
  o1.connect(g1); g1.connect(ctx.destination);
  o1.start(t); o1.stop(t + 0.28);

  // Mid crunch
  const o2 = ctx.createOscillator(), g2 = ctx.createGain();
  o2.type = 'sawtooth';
  o2.frequency.setValueAtTime(260, t);
  o2.frequency.exponentialRampToValueAtTime(55, t + 0.18);
  g2.gain.setValueAtTime(0.18, t);
  g2.gain.exponentialRampToValueAtTime(0.001, t + 0.18);
  o2.connect(g2); g2.connect(ctx.destination);
  o2.start(t); o2.stop(t + 0.18);

  // Short noise tick (very brief — just a click/snap, not a hiss)
  const bufSize = Math.floor(ctx.sampleRate * 0.04);
  const buf  = ctx.createBuffer(1, bufSize, ctx.sampleRate);
  const data = buf.getChannelData(0);
  for (let i = 0; i < bufSize; i++) data[i] = (Math.random() * 2 - 1) * (1 - i / bufSize);
  const src = ctx.createBufferSource(), g3 = ctx.createGain();
  src.buffer = buf;
  g3.gain.setValueAtTime(0.25, t);
  g3.gain.exponentialRampToValueAtTime(0.001, t + 0.04);
  src.connect(g3); g3.connect(ctx.destination);
  src.start(t);
}

// ─── Ship draw (pure canvas, outside component to avoid re-creation) ──────────

function drawShip(ctx: CanvasRenderingContext2D, y: number) {
  ctx.save();
  ctx.translate(46, y);

  // Engine glow
  const grd = ctx.createRadialGradient(-18, 0, 1, -18, 0, 20);
  grd.addColorStop(0, 'rgba(0,255,156,0.5)');
  grd.addColorStop(1, 'rgba(0,255,156,0)');
  ctx.fillStyle = grd;
  ctx.beginPath(); ctx.arc(-18, 0, 20, 0, Math.PI * 2); ctx.fill();

  // Animated thrust flicker
  const fl = 5 + Math.random() * 9;
  ctx.fillStyle = 'rgba(0,220,255,0.75)';
  ctx.fillRect(-20 - fl, -3, fl, 6);
  ctx.fillStyle = 'rgba(255,140,0,0.5)';
  ctx.fillRect(-20 - fl * 0.5, -2, fl * 0.5, 4);

  const px = (x: number, yy: number, w: number, h: number, c: string) => {
    ctx.fillStyle = c; ctx.fillRect(x, yy, w, h);
  };

  // Hull (matches your --accent-primary: #00FF9C & --accent-secondary: #FFB000)
  px(-8,  -6, 20, 12, '#00cc80');
  px(12,  -4,  8,  8, '#00FF9C');
  px(-16, -3,  8,  6, '#007755');
  // Cockpit
  px( 4,  -4,  8,  8, '#FFB000');
  px( 6,  -2,  4,  4, '#fff8e1');
  // Wings
  px(-4, -14,  6,  8, '#00cc80');
  px(-4,   6,  6,  8, '#00cc80');
  px(-2, -17,  3,  4, '#007755');
  px(-2,  13,  3,  4, '#007755');
  // Nozzle
  px(-20, -3,  4,  6, '#00FF9C');
  // Detail pixels
  px( 0,  -8,  2,  2, '#00FF9C');
  px( 0,   6,  2,  2, '#00FF9C');
  px(-6,  -1,  2,  2, '#FFB000');
  px( 8,  -1,  2,  2, '#ffffff');

  ctx.restore();
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function RetroSpaceship() {
  const canvasRef   = useRef<HTMLCanvasElement>(null);
  const shipYRef    = useRef(300);
  const targetYRef  = useRef(300);
  const projsRef    = useRef<Projectile[]>([]);
  const expsRef     = useRef<Explosion[]>([]);
  const lastShotRef = useRef(0);
  const rafRef      = useRef(0);
  const idRef       = useRef(0);
  const frameRef    = useRef(0);
  const shakingRef  = useRef(false);

  const [visible, setVisible] = useState(false);
  const [soundOn, setSoundOn] = useState(false);
  const audioRef = useRef<AudioContext | null>(null);

  const getAudio = useCallback(() => {
    if (!audioRef.current)
      audioRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    return audioRef.current;
  }, []);

  // ── 1. Watch data-theme attribute ─────────────────────────────────────────
  useEffect(() => {
    const html = document.documentElement;
    const sync = () => setVisible(html.getAttribute('data-theme') === 'retro');
    sync();
    const obs = new MutationObserver(sync);
    obs.observe(html, { attributes: true, attributeFilter: ['data-theme'] });
    return () => obs.disconnect();
  }, []);

  // ── 2. Spawn explosion ────────────────────────────────────────────────────
  const spawnExplosion = useCallback((x: number, y: number) => {
    const n = 32;
    const particles: Particle[] = Array.from({ length: n }, (_, i) => {
      const angle = (Math.PI * 2 * i) / n + (Math.random() - 0.5) * 0.6;
      const spd   = 1.5 + Math.random() * 5;
      return {
        x, y,
        vx: Math.cos(angle) * spd,
        vy: Math.sin(angle) * spd,
        life:  1,
        decay: 0.012 + Math.random() * 0.018,
        color: RETRO_COLORS[Math.floor(Math.random() * RETRO_COLORS.length)],
        size:  2 + Math.random() * 3,
      };
    });
    expsRef.current.push({ id: idRef.current++, x, y, frame: 0, particles });

    if (soundOn) playBoom(getAudio());

    // Shake the canvas element only (not the whole viewport)
    if (!shakingRef.current) {
      shakingRef.current = true;
      const c = canvasRef.current;
      if (c) {
        c.style.animation = 'retroShake 0.15s ease';
        setTimeout(() => {
          if (canvasRef.current) canvasRef.current.style.animation = '';
          shakingRef.current = false;
        }, 150);
      }
    }
  }, [soundOn, getAudio]);

  // ── 3. Render loop (only runs while visible) ──────────────────────────────
  useEffect(() => {
    if (!visible) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;

    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Initialise ship at centre
    shipYRef.current  = window.innerHeight / 2;
    targetYRef.current = window.innerHeight / 2;

    // Warm up rect cache
    _lastRectTime = 0;
    refreshRects();

    const loop = () => {
      frameRef.current++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Smooth ship Y
      shipYRef.current += (targetYRef.current - shipYRef.current) * LERP;

      // Refresh rect cache every ~500 ms (≈30 frames at 60 fps)
      if (frameRef.current % 30 === 0) refreshRects();

      // ── Projectiles ──────────────────────────────────────────────────────
      projsRef.current = projsRef.current.filter(p => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x > canvas.width + 20 || p.x < -20 ||
            p.y > canvas.height + 20 || p.y < -20) return false;

        // Collision — only every COLLISION_EVERY frames
        if (frameRef.current % COLLISION_EVERY === 0 && hitTest(p.x, p.y)) {
          spawnExplosion(p.x, p.y);
          return false;
        }

        // Draw laser bolt
        ctx.save();
        ctx.shadowColor = '#00FF9C';
        ctx.shadowBlur  = 8;
        ctx.fillStyle   = '#00FF9C';
        ctx.fillRect(p.x - 7, p.y - 2, 14, 4);
        ctx.fillStyle = '#ccffe8';
        ctx.fillRect(p.x - 5, p.y - 1, 10, 2);
        ctx.restore();

        return true;
      });

      // ── Explosions ────────────────────────────────────────────────────────
      expsRef.current = expsRef.current.filter(exp => {
        exp.frame++;

        // Shockwave rings
        const age = Math.min(exp.frame / 16, 1);
        if (age < 1) {
          const r = age * 36;
          ctx.save();
          ctx.strokeStyle = `rgba(0,255,156,${(1 - age) * 0.9})`;
          ctx.lineWidth   = 2.5;
          ctx.beginPath(); ctx.arc(exp.x, exp.y, r, 0, Math.PI * 2); ctx.stroke();
          ctx.strokeStyle = `rgba(255,176,0,${(1 - age) * 0.6})`;
          ctx.lineWidth   = 1;
          ctx.beginPath(); ctx.arc(exp.x, exp.y, r * 0.55, 0, Math.PI * 2); ctx.stroke();
          ctx.restore();
        }

        // Particles
        let alive = false;
        for (const p of exp.particles) {
          p.life -= p.decay;
          if (p.life <= 0) continue;
          alive = true;
          p.x  += p.vx;
          p.y  += p.vy;
          p.vy += 0.1;
          p.vx *= 0.97;
          const alpha = Math.max(0, p.life);
          const sz    = Math.max(1, Math.round(p.size * alpha));
          ctx.globalAlpha = alpha;
          ctx.fillStyle   = p.color;
          ctx.fillRect(Math.round(p.x), Math.round(p.y), sz, sz);
          ctx.globalAlpha = 1;
        }

        return alive || exp.frame < 20;
      });

      drawShip(ctx, shipYRef.current);
      rafRef.current = requestAnimationFrame(loop);
    };

    loop();

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', resize);
      // Clear state so stale projectiles / explosions don't persist on re-mount
      projsRef.current = [];
      expsRef.current  = [];
    };
  }, [visible, spawnExplosion]);

  // ── 4. Mouse tracking ──────────────────────────────────────────────────────
  useEffect(() => {
    if (!visible) return;
    const onMove = (e: MouseEvent) => { targetYRef.current = e.clientY; };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, [visible]);

  // ── 5. Click to fire ───────────────────────────────────────────────────────
  useEffect(() => {
    if (!visible) return;

    const onClick = (e: MouseEvent) => {
      if ((e.target as HTMLElement).closest('[data-sfx-toggle]')) return;
      const now = Date.now();
      if (now - lastShotRef.current < COOLDOWN_MS) return;
      lastShotRef.current = now;

      const sx = 58, sy = shipYRef.current;
      const dx = e.clientX - sx, dy = e.clientY - sy;
      const dist = Math.sqrt(dx * dx + dy * dy) || 1;

      projsRef.current.push({
        id: idRef.current++,
        x: sx, y: sy,
        vx: (dx / dist) * PROJ_SPEED,
        vy: (dy / dist) * PROJ_SPEED,
      });

      if (soundOn) playLaser(getAudio());
    };

    window.addEventListener('click', onClick);
    return () => window.removeEventListener('click', onClick);
  }, [visible, soundOn, getAudio]);

  // ── 6. Invalidate rect cache on scroll / resize ────────────────────────────
  useEffect(() => {
    const reset = () => { _lastRectTime = 0; };
    window.addEventListener('scroll', reset, { passive: true });
    window.addEventListener('resize', reset);
    return () => {
      window.removeEventListener('scroll', reset);
      window.removeEventListener('resize', reset);
    };
  }, []);

  // ── Not retro mode → render nothing ───────────────────────────────────────
  if (!visible) return null;

  return (
    <>
      <style>{`
        @keyframes retroShake {
          0%,100% { transform: translate(0,0); }
          20%      { transform: translate(-3px, 2px); }
          40%      { transform: translate( 3px,-2px); }
          60%      { transform: translate(-2px, 3px); }
          80%      { transform: translate( 2px,-3px); }
        }
      `}</style>

      {/* Transparent overlay canvas — pointer-events: none so all clicks pass through */}
      <canvas
        ref={canvasRef}
        style={{
          position:       'fixed',
          inset:          0,
          width:          '100vw',
          height:         '100vh',
          pointerEvents:  'none',
          zIndex:         49,          // below your scanline overlay (z-index: 50)
          imageRendering: 'pixelated',
        }}
      />

      {/* SFX toggle */}
      <button
        data-sfx-toggle=""
        onClick={() => setSoundOn(v => !v)}
        style={{
          position:      'fixed',
          bottom:        '1.5rem',
          left:          '1.5rem',
          zIndex:        51,           // above scanlines
          background:    'rgba(0,0,0,0.85)',
          border:        '1px solid #00FF9C',
          color:         '#00FF9C',
          fontFamily:    '"Share Tech Mono", monospace',
          fontSize:      '10px',
          padding:       '6px 12px',
          cursor:        'pointer',
          letterSpacing: '0.08em',
          textShadow:    '0 0 6px rgba(0,255,156,0.5)',
          boxShadow:     '0 0 12px rgba(0,255,156,0.15)',
        }}
      >
        {soundOn ? '[ SFX ON  ]' : '[ SFX OFF ]'}
      </button>
    </>
  );
}