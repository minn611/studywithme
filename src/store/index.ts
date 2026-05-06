import { create } from 'zustand'
import type { Lang } from '@/lib/i18n'

type TimerMode = 'stopwatch' | 'countdown' | 'pomodoro'

interface TimerState {
  mode: TimerMode
  isRunning: boolean
  seconds: number
  pomodoroPhase: 'work' | 'break'
  pomodoroCount: number
  pomodoroWorkDuration: number
  pomodoroBreakDuration: number
  countdownTarget: number
  setMode: (mode: TimerMode) => void
  setIsRunning: (v: boolean) => void
  setSeconds: (s: number) => void
  tickUp: () => void
  tickDown: () => void
  reset: () => void
  setPomodoroPhase: (phase: 'work' | 'break') => void
  incrementPomodoroCount: () => void
  setCountdownTarget: (s: number) => void
  setPomodoroWorkDuration: (s: number) => void
  setPomodoroBreakDuration: (s: number) => void
}

export const useTimerStore = create<TimerState>((set) => ({
  mode: 'pomodoro',
  isRunning: false,
  seconds: 25 * 60,
  pomodoroPhase: 'work',
  pomodoroCount: 0,
  pomodoroWorkDuration: 25 * 60,
  pomodoroBreakDuration: 5 * 60,
  countdownTarget: 10 * 60,
  setMode: (mode) => set((s) => ({
    mode, isRunning: false,
    seconds: mode === 'stopwatch' ? 0 : mode === 'countdown' ? s.countdownTarget : s.pomodoroWorkDuration,
    pomodoroPhase: 'work',
  })),
  setIsRunning: (v) => set({ isRunning: v }),
  setSeconds: (seconds) => set({ seconds }),
  tickUp: () => set((s) => ({ seconds: s.seconds + 1 })),
  tickDown: () => set((s) => ({ seconds: s.seconds - 1 })),
  reset: () => set((s) => ({
    isRunning: false,
    seconds: s.mode === 'stopwatch' ? 0 : s.mode === 'countdown' ? s.countdownTarget : s.pomodoroWorkDuration,
    pomodoroPhase: 'work', pomodoroCount: 0,
  })),
  setPomodoroPhase: (phase) => set({ pomodoroPhase: phase }),
  incrementPomodoroCount: () => set((s) => ({ pomodoroCount: s.pomodoroCount + 1 })),
  setCountdownTarget: (s) => set({ countdownTarget: s, seconds: s }),
  setPomodoroWorkDuration: (s) => set({ pomodoroWorkDuration: s, seconds: s }),
  setPomodoroBreakDuration: (s) => set({ pomodoroBreakDuration: s }),
}))

// ─── Sound Store ─────────────────────────────────────────────────────────────
interface SoundItem {
  id: string; label: string; emoji: string; src: string; volume: number; active: boolean
}
interface SoundState {
  sounds: SoundItem[]
  toggleSound: (id: string) => void
  setVolume: (id: string, volume: number) => void
}
export const useSoundStore = create<SoundState>((set) => ({
  sounds: [
    { id: 'rain',   label: 'Rain',       emoji: '🌧️', src: 'https://cdn.pixabay.com/audio/2022/05/13/audio_1534a3ae04.mp3', volume: 0.5, active: false },
    { id: 'cafe',   label: 'Café',       emoji: '☕',  src: 'https://cdn.pixabay.com/audio/2022/03/08/audio_c81b82be4e.mp3', volume: 0.5, active: false },
    { id: 'waves',  label: 'Ocean',      emoji: '🌊',  src: 'https://cdn.pixabay.com/audio/2022/03/09/audio_d4e990e93c.mp3', volume: 0.5, active: false },
    { id: 'fire',   label: 'Fire',       emoji: '🔥',  src: 'https://cdn.pixabay.com/audio/2022/07/18/audio_2f57bec95c.mp3', volume: 0.5, active: false },
    { id: 'forest', label: 'Forest',     emoji: '🌿',  src: 'https://cdn.pixabay.com/audio/2022/10/30/audio_ba4f77e84b.mp3', volume: 0.5, active: false },
    { id: 'white',  label: 'White Noise',emoji: '📻',  src: 'https://cdn.pixabay.com/audio/2021/12/13/audio_c462dd5a55.mp3', volume: 0.5, active: false },
  ],
  toggleSound: (id) => set((s) => ({ sounds: s.sounds.map((snd) => snd.id === id ? { ...snd, active: !snd.active } : snd) })),
  setVolume: (id, volume) => set((s) => ({ sounds: s.sounds.map((snd) => snd.id === id ? { ...snd, volume } : snd) })),
}))

// ─── Background Store ────────────────────────────────────────────────────────
export type BgTheme = {
  id: string
  label: string
  emoji: string
  gradient: string
  // Special animated type
  type?: 'gradient' | 'ocean' | 'sakura' | 'galaxy'
}

export const BG_THEMES: BgTheme[] = [
  // Classic gradients
  { id: 'midnight', label: 'Midnight',     emoji: '🌙', type: 'gradient', gradient: 'from-[#0f0c29] via-[#302b63] to-[#24243e]' },
  { id: 'forest',   label: 'Forest',       emoji: '🌲', type: 'gradient', gradient: 'from-[#0a1628] via-[#1a3a2a] to-[#0d2318]' },
  { id: 'rose',     label: 'Dusty Rose',   emoji: '🌹', type: 'gradient', gradient: 'from-[#1a0a0f] via-[#3d1a25] to-[#1f0e16]' },
  { id: 'coffee',   label: 'Coffee',       emoji: '☕', type: 'gradient', gradient: 'from-[#1a0f00] via-[#3d2600] to-[#1f1400]' },
  { id: 'aurora',   label: 'Aurora',       emoji: '🌌', type: 'gradient', gradient: 'from-[#001a1a] via-[#003333] to-[#00261a]' },
  // Special animated themes
  { id: 'ocean',    label: 'Ocean Shore',  emoji: '🌊', type: 'ocean',    gradient: 'from-[#001220] via-[#003060] to-[#00204a]' },
  { id: 'sakura',   label: 'Sakura',       emoji: '🌸', type: 'sakura',   gradient: 'from-[#1a0010] via-[#2d0020] to-[#1a0018]' },
  { id: 'galaxy',   label: 'Galaxy',       emoji: '🌌', type: 'galaxy',   gradient: 'from-[#000005] via-[#050010] to-[#000008]' },
  { id: 'sunset',   label: 'Sunset',       emoji: '🌅', type: 'gradient', gradient: 'from-[#1a0500] via-[#4a1500] to-[#2a0a00]' },
]

interface BgState {
  currentBg: string
  setBg: (id: string) => void
}
export const useBgStore = create<BgState>((set) => ({
  currentBg: 'midnight',
  setBg: (id) => set({ currentBg: id }),
}))

// ─── Language Store ──────────────────────────────────────────────────────────
interface LangState {
  lang: Lang
  setLang: (lang: Lang) => void
}
export const useLangStore = create<LangState>((set) => ({
  lang: 'vi',
  setLang: (lang) => set({ lang }),
}))
