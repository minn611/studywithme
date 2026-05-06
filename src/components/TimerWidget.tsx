'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Play, Pause, RotateCcw, Settings, X } from 'lucide-react'
import { useTimerStore, useLangStore } from '@/store'
import { t } from '@/lib/i18n'

const pad = (n: number) => String(n).padStart(2, '0')

function formatTime(s: number) {
  const h = Math.floor(s / 3600)
  const m = Math.floor((s % 3600) / 60)
  const sec = s % 60
  if (h > 0) return `${pad(h)}:${pad(m)}:${pad(sec)}`
  return `${pad(m)}:${pad(sec)}`
}

const MODES = [
  { key: 'pomodoro', label: '🍅 Pomodoro' },
  { key: 'stopwatch', label: '⏱️ Stopwatch' },
  { key: 'countdown', label: '⏳ Countdown' },
] as const

export default function TimerWidget() {
  const {
    mode, isRunning, seconds, pomodoroPhase, pomodoroCount,
    pomodoroWorkDuration, pomodoroBreakDuration, countdownTarget,
    setMode, setIsRunning, tickUp, tickDown, reset,
    setPomodoroPhase, incrementPomodoroCount, setSeconds,
    setPomodoroWorkDuration, setPomodoroBreakDuration, setCountdownTarget
  } = useTimerStore()
  const { lang } = useLangStore()
  const tr = t[lang]

  const [showSettings, setShowSettings] = useState(false)
  const [tempWork, setTempWork] = useState(pomodoroWorkDuration / 60)
  const [tempBreak, setTempBreak] = useState(pomodoroBreakDuration / 60)
  const [tempCountdown, setTempCountdown] = useState(countdownTarget / 60)

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        if (mode === 'stopwatch') {
          tickUp()
        } else {
          tickDown()
        }
      }, 1000)
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
    return () => { if (intervalRef.current) clearInterval(intervalRef.current) }
  }, [isRunning, mode, tickUp, tickDown])

  // Pomodoro phase switch
  useEffect(() => {
    if (mode === 'pomodoro' && seconds <= 0) {
      if (pomodoroPhase === 'work') {
        incrementPomodoroCount()
        setPomodoroPhase('break')
        setSeconds(pomodoroBreakDuration)
      } else {
        setPomodoroPhase('work')
        setSeconds(pomodoroWorkDuration)
      }
    }
    if (mode === 'countdown' && seconds <= 0) {
      setIsRunning(false)
      setSeconds(0)
    }
  }, [seconds, mode, pomodoroPhase, pomodoroWorkDuration, pomodoroBreakDuration, incrementPomodoroCount, setPomodoroPhase, setIsRunning, setSeconds])

  const progress =
    mode === 'pomodoro'
      ? 1 - seconds / (pomodoroPhase === 'work' ? pomodoroWorkDuration : pomodoroBreakDuration)
      : mode === 'countdown'
      ? 1 - seconds / countdownTarget
      : 0

  const circumference = 2 * Math.PI * 90

  const handleSaveSettings = () => {
    setPomodoroWorkDuration(tempWork * 60)
    setPomodoroBreakDuration(tempBreak * 60)
    setCountdownTarget(tempCountdown * 60)
    setShowSettings(false)
  }

  const togglePhase = () => {
    if (mode !== 'pomodoro') return
    const nextPhase = pomodoroPhase === 'work' ? 'break' : 'work'
    setPomodoroPhase(nextPhase)
    setSeconds(nextPhase === 'work' ? pomodoroWorkDuration : pomodoroBreakDuration)
    setIsRunning(false)
  }

  return (
    <div className="flex flex-col items-center gap-6 p-6 glass rounded-3xl min-w-[300px] relative overflow-hidden">
      {/* Mode tabs */}
      <div className="flex gap-1 bg-white/5 rounded-full p-1">
        {MODES.map((m) => (
          <button
            key={m.key}
            onClick={() => setMode(m.key)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-300 ${
              mode === m.key
                ? 'bg-white/20 text-white shadow'
                : 'text-white/50 hover:text-white/80'
            }`}
          >
            {m.label}
          </button>
        ))}
      </div>

      {/* Pomodoro phase label */}
      {mode === 'pomodoro' && (
        <div className="flex items-center gap-3 text-xs">
          <button 
            onClick={togglePhase}
            className={`px-3 py-1 rounded-full transition-all hover:scale-105 active:scale-95 ${pomodoroPhase === 'work' ? 'bg-rose-400/30 text-rose-300' : 'bg-white/5 text-white/30'}`}
          >
            {tr.work}
          </button>
          <button 
            onClick={togglePhase}
            className={`px-3 py-1 rounded-full transition-all hover:scale-105 active:scale-95 ${pomodoroPhase === 'break' ? 'bg-emerald-400/30 text-emerald-300' : 'bg-white/5 text-white/30'}`}
          >
            {tr.break}
          </button>
          {pomodoroCount > 0 && (
            <span className="text-amber-300/70 ml-1">🍅 ×{pomodoroCount}</span>
          )}
        </div>
      )}

      {/* Circular progress + time */}
      <div className="relative flex items-center justify-center w-52 h-52">
        <svg className="absolute top-0 left-0 w-full h-full -rotate-90" viewBox="0 0 200 200">
          <circle cx="100" cy="100" r="90" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="8" />
          {(mode === 'pomodoro' || mode === 'countdown') && (
            <circle
              cx="100" cy="100" r="90"
              fill="none"
              stroke={pomodoroPhase === 'break' ? '#6ee7b7' : '#f9a8d4'}
              strokeWidth="8"
              strokeDasharray={circumference}
              strokeDashoffset={circumference * (1 - progress)}
              strokeLinecap="round"
              className="transition-all duration-1000"
            />
          )}
        </svg>
        <AnimatePresence mode="wait">
          <motion.div
            key={`${seconds}-${mode}`}
            initial={{ scale: 0.95, opacity: 0.7 }}
            animate={{ scale: 1, opacity: 1 }}
            className="flex flex-col items-center"
          >
            <span className="text-5xl font-mono font-bold text-white tracking-tight">
              {formatTime(seconds)}
            </span>
            {mode === 'pomodoro' && (
              <span className="text-xs text-white/40 mt-1">
                {pomodoroPhase === 'work' ? tr.focusTime : tr.breakTime}
              </span>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-4">
        <button
          onClick={reset}
          className="p-2 rounded-full text-white/50 hover:text-white hover:bg-white/10 transition-all"
        >
          <RotateCcw size={18} />
        </button>
        <button
          onClick={() => setIsRunning(!isRunning)}
          className={`flex items-center gap-2 px-6 py-2.5 rounded-full font-semibold text-sm transition-all duration-300 shadow-lg ${
            isRunning
              ? 'bg-white/20 hover:bg-white/30 text-white'
              : 'bg-gradient-to-r from-rose-400 to-purple-500 hover:from-rose-500 hover:to-purple-600 text-white shadow-rose-500/30'
          }`}
        >
          {isRunning ? <Pause size={16} /> : <Play size={16} />}
          {isRunning ? tr.pause : tr.start}
        </button>
        <button
          onClick={() => setShowSettings(true)}
          className="p-2 rounded-full text-white/50 hover:text-white hover:bg-white/10 transition-all"
        >
          <Settings size={18} />
        </button>
      </div>

      {/* Settings Modal Overlay */}
      <AnimatePresence>
        {showSettings && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/80 backdrop-blur-md z-50 flex flex-col p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-white font-bold text-lg">{tr.timerSettings}</h3>
              <button onClick={() => setShowSettings(false)} className="text-white/50 hover:text-white">
                <X size={20} />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-xs text-white/50 block mb-2">{tr.pomodoroWork}</label>
                <input 
                  type="number"
                  value={tempWork}
                  onChange={(e) => setTempWork(Number(e.target.value))}
                  className="w-full bg-white/10 border border-white/10 rounded-xl px-4 py-2 text-white outline-none focus:border-rose-400/50"
                />
              </div>
              <div>
                <label className="text-xs text-white/50 block mb-2">{tr.pomodoroBreak}</label>
                <input 
                  type="number"
                  value={tempBreak}
                  onChange={(e) => setTempBreak(Number(e.target.value))}
                  className="w-full bg-white/10 border border-white/10 rounded-xl px-4 py-2 text-white outline-none focus:border-emerald-400/50"
                />
              </div>
              <div>
                <label className="text-xs text-white/50 block mb-2">{tr.countdownDuration}</label>
                <input 
                  type="number"
                  value={tempCountdown}
                  onChange={(e) => setTempCountdown(Number(e.target.value))}
                  className="w-full bg-white/10 border border-white/10 rounded-xl px-4 py-2 text-white outline-none focus:border-purple-400/50"
                />
              </div>
            </div>

            <div className="mt-auto flex gap-3">
              <button 
                onClick={() => setShowSettings(false)}
                className="flex-1 py-3 rounded-2xl bg-white/5 text-white/70 hover:bg-white/10 text-sm font-medium transition-all"
              >
                {tr.cancel}
              </button>
              <button 
                onClick={handleSaveSettings}
                className="flex-1 py-3 rounded-2xl bg-gradient-to-r from-rose-500 to-purple-600 text-white text-sm font-bold shadow-lg shadow-rose-500/20 hover:opacity-90 transition-all"
              >
                {tr.save}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
