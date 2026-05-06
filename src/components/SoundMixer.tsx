'use client'

import { useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Volume2, VolumeX } from 'lucide-react'
import { useSoundStore, useLangStore } from '@/store'
import { t } from '@/lib/i18n'

export default function SoundMixer() {
  const { sounds, toggleSound, setVolume } = useSoundStore()
  const { lang } = useLangStore()
  const tr = t[lang]
  const audioRefs = useRef<Record<string, HTMLAudioElement>>({})

  // Create audio elements on mount
  useEffect(() => {
    sounds.forEach((snd) => {
      if (!audioRefs.current[snd.id]) {
        const audio = new Audio(snd.src)
        audio.loop = true
        audio.volume = snd.volume
        audioRefs.current[snd.id] = audio
      }
    })
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  // Sync active/volume state to audio
  useEffect(() => {
    sounds.forEach((snd) => {
      const audio = audioRefs.current[snd.id]
      if (!audio) return
      audio.volume = snd.volume
      if (snd.active && audio.paused) {
        audio.play().catch(() => {})
      } else if (!snd.active && !audio.paused) {
        audio.pause()
      }
    })
  }, [sounds])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      Object.values(audioRefs.current).forEach((a) => { a.pause(); a.src = '' })
    }
  }, [])

  return (
    <div className="glass rounded-3xl p-5 min-w-[280px]">
      <div className="flex items-center gap-2 mb-4">
        <Volume2 size={16} className="text-white/60" />
        <span className="text-sm font-semibold text-white/80">{tr.ambientSounds}</span>
      </div>
      <div className="grid grid-cols-3 gap-2 mb-4">
        {sounds.map((snd) => (
          <motion.button
            key={snd.id}
            onClick={() => toggleSound(snd.id)}
            whileTap={{ scale: 0.9 }}
            className={`flex flex-col items-center gap-1 p-2.5 rounded-2xl text-xs transition-all duration-300 border ${
              snd.active
                ? 'bg-white/20 border-white/30 text-white shadow-lg shadow-white/10'
                : 'bg-white/5 border-white/10 text-white/50 hover:bg-white/10 hover:text-white/80'
            }`}
          >
            <span className="text-xl">{snd.emoji}</span>
            <span className="font-medium">{snd.label}</span>
          </motion.button>
        ))}
      </div>

      {/* Volume sliders for active sounds */}
      <AnimatePresence>
        {sounds.filter((s) => s.active).map((snd) => (
          <motion.div
            key={snd.id}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="flex items-center gap-3 mb-2 overflow-hidden"
          >
            <span className="text-sm w-6 text-center">{snd.emoji}</span>
            <input
              type="range"
              min={0} max={1} step={0.01}
              value={snd.volume}
              onChange={(e) => setVolume(snd.id, Number(e.target.value))}
              className="flex-1 accent-rose-400 h-1 cursor-pointer"
            />
            <VolumeX
              size={14}
              className="text-white/40 cursor-pointer hover:text-white/70"
              onClick={() => toggleSound(snd.id)}
            />
          </motion.div>
        ))}
      </AnimatePresence>
      {sounds.every((s) => !s.active) && (
        <p className="text-center text-xs text-white/30 mt-1">{tr.clickToActivate}</p>
      )}
    </div>
  )
}
