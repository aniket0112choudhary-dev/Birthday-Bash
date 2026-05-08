import { useEffect, useRef, useState } from "react";
import { Music, VolumeX } from "lucide-react";

// "Happy Birthday" melody — [semitone offset from C4, beats]
// Key of F major, melody in solfège: G G A G C B | G G A G D C | G G G' E C B A | F F E C D C
const MELODY: Array<[number, number]> = [
  // bar 1: Hap-py Birth-day to you
  [7, 0.75], [7, 0.25], [9, 1], [7, 1], [12, 1], [11, 2],
  // bar 2: Hap-py Birth-day to you
  [7, 0.75], [7, 0.25], [9, 1], [7, 1], [14, 1], [12, 2],
  // bar 3: Hap-py Birth-day dear Mom
  [7, 0.75], [7, 0.25], [19, 1], [16, 1], [12, 1], [11, 1], [9, 2],
  // bar 4: Hap-py Birth-day to you
  [17, 0.75], [17, 0.25], [16, 1], [12, 1], [14, 1], [12, 2],
];

const BEAT = 0.42; // seconds per beat — slow, lullaby tempo

function midiHz(semitonesFromC4: number) {
  // C4 = MIDI 60 → 261.63 Hz
  return 261.6256 * Math.pow(2, semitonesFromC4 / 12);
}

export function BirthdayMusic() {
  const [playing, setPlaying] = useState(false);
  const ctxRef = useRef<AudioContext | null>(null);
  const masterRef = useRef<GainNode | null>(null);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) window.clearTimeout(timerRef.current);
      ctxRef.current?.close();
    };
  }, []);

  function playNote(ctx: AudioContext, freq: number, start: number, dur: number) {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "triangle";
    osc.frequency.value = freq;
    // ADSR-ish envelope for a soft music-box feel
    gain.gain.setValueAtTime(0, start);
    gain.gain.linearRampToValueAtTime(0.18, start + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.08, start + dur * 0.6);
    gain.gain.exponentialRampToValueAtTime(0.0001, start + dur);
    osc.connect(gain).connect(masterRef.current!);
    osc.start(start);
    osc.stop(start + dur + 0.05);

    // gentle 5th-harmonic shimmer
    const shimmer = ctx.createOscillator();
    const sg = ctx.createGain();
    shimmer.type = "sine";
    shimmer.frequency.value = freq * 2;
    sg.gain.setValueAtTime(0, start);
    sg.gain.linearRampToValueAtTime(0.04, start + 0.03);
    sg.gain.exponentialRampToValueAtTime(0.0001, start + dur);
    shimmer.connect(sg).connect(masterRef.current!);
    shimmer.start(start);
    shimmer.stop(start + dur + 0.05);
  }

  function scheduleSong(ctx: AudioContext, startAt: number) {
    let t = startAt;
    for (const [pitch, beats] of MELODY) {
      const dur = beats * BEAT;
      playNote(ctx, midiHz(pitch), t, dur * 0.95);
      t += dur;
    }
    return t - startAt;
  }

  async function start() {
    if (!ctxRef.current) {
      const Ctx = window.AudioContext || (window as never as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new Ctx();
      const master = ctx.createGain();
      master.gain.value = 0.6;
      master.connect(ctx.destination);
      ctxRef.current = ctx;
      masterRef.current = master;
    }
    const ctx = ctxRef.current!;
    await ctx.resume();
    setPlaying(true);

    const loop = () => {
      const length = scheduleSong(ctx, ctx.currentTime + 0.1);
      // schedule next loop slightly before the song ends
      timerRef.current = window.setTimeout(loop, (length + 1.2) * 1000);
    };
    loop();
  }

  function stop() {
    if (timerRef.current) {
      window.clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    masterRef.current?.gain.setTargetAtTime(0, ctxRef.current?.currentTime ?? 0, 0.1);
    setTimeout(() => {
      ctxRef.current?.suspend();
      if (masterRef.current && ctxRef.current) {
        masterRef.current.gain.setValueAtTime(0.6, ctxRef.current.currentTime);
      }
    }, 400);
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
