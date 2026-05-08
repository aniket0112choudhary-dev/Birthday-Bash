import { useEffect, useRef, useState } from "react";
import { Music, VolumeX } from "lucide-react";

// "Happy Birthday" melody — semitone offsets from C4 + beats
const MELODY: Array<[number, number]> = [
  [7, 0.75], [7, 0.25], [9, 1], [7, 1], [12, 1], [11, 2],
  [7, 0.75], [7, 0.25], [9, 1], [7, 1], [14, 1], [12, 2],
  [7, 0.75], [7, 0.25], [19, 1], [16, 1], [12, 1], [11, 1], [9, 2],
  [17, 0.75], [17, 0.25], [16, 1], [12, 1], [14, 1], [12, 2],
];

// Simple bass/chord roots per bar (F, C, F, F)
const CHORDS: Array<[number[], number]> = [
  [[-7, -3, 0], 4],   // F major (F2, A2, C3)
  [[-5, -1, 2], 4],   // C major
  [[-7, -3, 0], 4],   // F major
  [[-5, -1, 2], 2], [[-7, -3, 0], 2], // C → F
];

const BEAT = 0.5; // gentle waltz tempo

const midiHz = (s: number) => 261.6256 * Math.pow(2, s / 12);

export function BirthdayMusic() {
  const [playing, setPlaying] = useState(false);
  const ctxRef = useRef<AudioContext | null>(null);
  const masterRef = useRef<GainNode | null>(null);
  const reverbBusRef = useRef<GainNode | null>(null);
  const timerRef = useRef<number | null>(null);

  useEffect(() => () => {
    if (timerRef.current) window.clearTimeout(timerRef.current);
    ctxRef.current?.close();
  }, []);

  function playLeadNote(ctx: AudioContext, freq: number, start: number, dur: number) {
    // Soft music-box: sine + faint triangle octave
    const make = (type: OscillatorType, f: number, peak: number, detune = 0) => {
      const osc = ctx.createOscillator();
      const g = ctx.createGain();
      osc.type = type;
      osc.frequency.value = f;
      osc.detune.value = detune;
      g.gain.setValueAtTime(0.0001, start);
      g.gain.exponentialRampToValueAtTime(peak, start + 0.04);
      g.gain.exponentialRampToValueAtTime(peak * 0.5, start + dur * 0.4);
      g.gain.exponentialRampToValueAtTime(0.0001, start + dur);
      osc.connect(g);
      g.connect(masterRef.current!);
      g.connect(reverbBusRef.current!);
      osc.start(start);
      osc.stop(start + dur + 0.05);
    };
    make("sine", freq, 0.22);
    make("sine", freq * 2, 0.05, 4);
    make("triangle", freq, 0.04, -6);
  }

  function playBassNote(ctx: AudioContext, freq: number, start: number, dur: number) {
    const osc = ctx.createOscillator();
    const g = ctx.createGain();
    osc.type = "sine";
    osc.frequency.value = freq;
    g.gain.setValueAtTime(0.0001, start);
    g.gain.exponentialRampToValueAtTime(0.12, start + 0.08);
    g.gain.exponentialRampToValueAtTime(0.0001, start + dur);
    osc.connect(g).connect(masterRef.current!);
    osc.start(start);
    osc.stop(start + dur + 0.05);
  }

  function scheduleSong(ctx: AudioContext, startAt: number) {
    let t = startAt;
    for (const [pitch, beats] of MELODY) {
      const dur = beats * BEAT;
      playLeadNote(ctx, midiHz(pitch), t, dur * 0.95);
      t += dur;
    }
    // chords aligned to start
    let ct = startAt;
    for (const [notes, beats] of CHORDS) {
      const dur = beats * BEAT;
      for (const n of notes) playBassNote(ctx, midiHz(n), ct, dur * 0.95);
      ct += dur;
    }
    return t - startAt;
  }

  function makeReverbBus(ctx: AudioContext) {
    // Tiny algorithmic "reverb" via feedback delay — adds warm tail
    const input = ctx.createGain();
    input.gain.value = 0.35;
    const delay = ctx.createDelay(1.5);
    delay.delayTime.value = 0.28;
    const fb = ctx.createGain();
    fb.gain.value = 0.42;
    const lp = ctx.createBiquadFilter();
    lp.type = "lowpass";
    lp.frequency.value = 2400;
    input.connect(delay);
    delay.connect(lp);
    lp.connect(fb);
    fb.connect(delay);
    lp.connect(masterRef.current!);
    return input;
  }

  async function start() {
    if (!ctxRef.current) {
      const Ctx = window.AudioContext || (window as never as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new Ctx();
      const master = ctx.createGain();
      master.gain.value = 0.5;
      // soft master lowpass for warmth
      const warm = ctx.createBiquadFilter();
      warm.type = "lowpass";
      warm.frequency.value = 5200;
      master.connect(warm).connect(ctx.destination);
      ctxRef.current = ctx;
      masterRef.current = master;
      reverbBusRef.current = makeReverbBus(ctx);
    }
    const ctx = ctxRef.current!;
    await ctx.resume();
    setPlaying(true);

    const loop = () => {
      const length = scheduleSong(ctx, ctx.currentTime + 0.15);
      timerRef.current = window.setTimeout(loop, (length + 1.5) * 1000);
    };
    loop();
  }

  function stop() {
    if (timerRef.current) {
      window.clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    const ctx = ctxRef.current;
    const m = masterRef.current;
    if (m && ctx) {
      m.gain.cancelScheduledValues(ctx.currentTime);
      m.gain.setTargetAtTime(0, ctx.currentTime, 0.15);
    }
    setTimeout(() => {
      ctxRef.current?.suspend();
      if (m && ctx) m.gain.setValueAtTime(0.5, ctx.currentTime + 0.01);
    }, 500);
    setPlaying(false);
  }

  return (
    <button
      type="button"
      onClick={() => (playing ? stop() : start())}
      className="fixed bottom-5 right-5 z-50 inline-flex items-center gap-2 rounded-full border border-rose/30 bg-card/80 px-4 py-2 text-sm text-foreground shadow-soft backdrop-blur transition hover:bg-card"
      aria-label={playing ? "Pause birthday music" : "Play birthday music"}
    >
      {playing ? <VolumeX className="h-4 w-4 text-primary" /> : <Music className="h-4 w-4 text-primary" />}
      <span className="hidden sm:inline">{playing ? "Pause music" : "Play music"}</span>
    </button>
  );
}
