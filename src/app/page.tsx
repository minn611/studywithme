'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useBgStore, BG_THEMES, useLangStore } from '@/store'
import { supabase } from '@/lib/supabase'
import { t } from '@/lib/i18n'
import type { User } from '@supabase/supabase-js'

import TimerWidget from '@/components/TimerWidget'
import SoundMixer from '@/components/SoundMixer'
import ClockWidget from '@/components/ClockWidget'
import TodoWidget from '@/components/TodoWidget'
import StudyRoomPanel from '@/components/StudyRoomPanel'
import BackgroundPicker from '@/components/BackgroundPicker'
import AuthPanel from '@/components/AuthPanel'
import BackgroundLayer from '@/components/BackgroundLayer'
import LanguageSwitcher from '@/components/LanguageSwitcher'
import { BookOpen, ListTodo, Users, Palette, Focus } from 'lucide-react'

type Panel = 'todo' | 'rooms' | 'bg' | null

// Floating particles — client-only to avoid hydration mismatch
function Particles() {
  const [particles, setParticles] = useState<
    { id: number; x: number; y: number; size: number; duration: number; delay: number }[]
  >([])
  useEffect(() => {
    setParticles(Array.from({ length: 20 }, (_, i) => ({
      id: i, x: Math.random() * 100, y: Math.random() * 100,
      size: Math.random() * 3 + 1, duration: Math.random() * 8 + 4, delay: Math.random() * 4,
    })))
  }, [])
  if (particles.length === 0) return null
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 1 }}>
      {particles.map((p) => (
        <motion.div key={p.id} className="absolute rounded-full bg-white/20"
          style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.size, height: p.size }}
          animate={{ y: [-10, 10, -10], opacity: [0.2, 0.6, 0.2] }}
          transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}
    </div>
  )
}

export default function HomePage() {
  const { currentBg } = useBgStore()
  const { lang } = useLangStore()
  const [user, setUser] = useState<User | null>(null)
  const [activePanel, setActivePanel] = useState<Panel>(null)
  const [focusMode, setFocusMode] = useState(false)

  const currentTheme = BG_THEMES.find((theme) => theme.id === currentBg) ?? BG_THEMES[0]
  const isAnimatedBg = currentTheme.type !== 'gradient'
  const tr = t[lang]

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setUser(data.session?.user ?? null))
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_, session) => {
      setUser(session?.user ?? null)
    })
    return () => subscription.unsubscribe()
  }, [])

  const togglePanel = (panel: Panel) => setActivePanel((p) => (p === panel ? null : panel))

  return (
    <main
      className={`min-h-screen w-full relative flex flex-col transition-all duration-1000 ${
        !isAnimatedBg ? `bg-gradient-to-br ${currentTheme.gradient} animated-bg` : 'bg-black'
      }`}
    >
      {/* Animated background layers (ocean, sakura, galaxy) */}
      <BackgroundLayer />

      {/* Background glow orbs — only for gradient themes */}
      {!isAnimatedBg && (
        <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 1 }}>
          <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-rose-500/10 blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-purple-500/10 blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-indigo-500/5 blur-3xl" />
        </div>
      )}

      {/* Particles */}
      <Particles />

      {/* Content — above all bg layers */}
      <div className="relative flex flex-col min-h-screen" style={{ zIndex: 10 }}>
        {/* Header */}
        <AnimatePresence>
          {!focusMode && (
            <motion.header
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex items-center justify-between px-6 py-4"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-2xl bg-gradient-to-br from-rose-400 to-purple-600 flex items-center justify-center shadow-lg shadow-rose-500/30">
                  <BookOpen size={18} className="text-white" />
                </div>
                <div>
                  <h1 className="text-white font-bold text-lg leading-none">Study With Me</h1>
                  <p className="text-white/40 text-xs">{tr.tagline}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <LanguageSwitcher />
                <AuthPanel user={user} onUserChange={setUser} />
              </div>
            </motion.header>
          )}
        </AnimatePresence>

        {/* Focus mode toggle */}
        <button
          onClick={() => setFocusMode(!focusMode)}
          className={`fixed top-4 right-4 z-50 flex items-center gap-1.5 glass rounded-full px-3 py-1.5 text-xs transition-all hover:bg-white/15 ${focusMode ? 'text-amber-300' : 'text-white/50'}`}
        >
          <Focus size={13} />
          {focusMode ? tr.exitFocus : tr.focus}
        </button>

        {/* Main content */}
        <div className="flex-1 flex flex-col items-center justify-center px-4 py-6 gap-6">
          {/* Clock */}
          <AnimatePresence>
            {!focusMode && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: 0.1 }}
              >
                <ClockWidget />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Timer + Sound */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap items-center justify-center gap-5"
          >
            <div className="timer-glow rounded-3xl">
              <TimerWidget />
            </div>
            <AnimatePresence>
              {!focusMode && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ delay: 0.3 }}
                >
                  <SoundMixer />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Panels */}
          <AnimatePresence>
            {!focusMode && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ delay: 0.4 }}
                className="flex flex-wrap items-start justify-center gap-5"
              >
                {activePanel === 'todo' && <TodoWidget />}
                {activePanel === 'rooms' && <StudyRoomPanel userId={user?.id ?? null} />}
                {activePanel === 'bg' && <BackgroundPicker />}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Bottom navigation */}
        <AnimatePresence>
          {!focusMode && (
            <motion.nav
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="flex items-center justify-center gap-3 pb-6 px-6"
            >
              {([
                { id: 'todo', icon: ListTodo, labelKey: 'todo' },
                { id: 'rooms', icon: Users, labelKey: 'rooms' },
                { id: 'bg', icon: Palette, labelKey: 'theme' },
              ] as const).map((item) => (
                <button
                  key={item.id}
                  onClick={() => togglePanel(item.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 glass hover:bg-white/15 ${
                    activePanel === item.id
                      ? 'bg-white/20 text-white shadow-lg'
                      : 'text-white/50 hover:text-white'
                  }`}
                >
                  <item.icon size={15} />
                  {tr[item.labelKey]}
                </button>
              ))}
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </main>
  )
}
