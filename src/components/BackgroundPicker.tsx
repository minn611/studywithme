'use client'

import { motion } from 'framer-motion'
import { useBgStore, BG_THEMES } from '@/store'
import { useLangStore } from '@/store'
import { t } from '@/lib/i18n'
import { Palette } from 'lucide-react'

export default function BackgroundPicker() {
  const { currentBg, setBg } = useBgStore()
  const { lang } = useLangStore()

  return (
    <div className="glass rounded-3xl p-5 min-w-[300px]">
      <div className="flex items-center gap-2 mb-4">
        <Palette size={16} className="text-white/60" />
        <span className="text-sm font-semibold text-white/80">{t[lang].background}</span>
      </div>
      <div className="grid grid-cols-3 gap-2">
        {BG_THEMES.map((theme) => {
          const isSpecial = theme.type !== 'gradient'
          return (
            <motion.button
              key={theme.id}
              onClick={() => setBg(theme.id)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`relative h-16 rounded-2xl transition-all duration-300 border-2 overflow-hidden flex flex-col items-center justify-center gap-1 ${
                currentBg === theme.id
                  ? 'border-white/70 shadow-lg shadow-white/20'
                  : 'border-transparent hover:border-white/25'
              }`}
              style={isSpecial ? { background: 'transparent' } : {}}
            >
              {/* Background preview */}
              {!isSpecial ? (
                <div className={`absolute inset-0 bg-gradient-to-br ${theme.gradient}`} />
              ) : (
                <div className="absolute inset-0" style={{
                  background: theme.id === 'ocean'
                    ? 'linear-gradient(180deg, #001830 0%, #003d7a 60%, #1a7a6e 100%)'
                    : theme.id === 'sakura'
                    ? 'linear-gradient(180deg, #1a0028 0%, #5c1a4e 50%, #c4507a 100%)'
                    : theme.id === 'galaxy'
                    ? 'linear-gradient(135deg, #000005 0%, #02000a 50%, #000008 100%)'
                    : `linear-gradient(135deg, #000, #111)`,
                }} />
              )}

              {/* Content */}
              <span className="relative z-10 text-2xl">{theme.emoji}</span>
              <span className="relative z-10 text-[9px] text-white/70 font-medium truncate px-1 w-full text-center">
                {theme.label}
              </span>

              {/* Special theme badge */}
              {isSpecial && (
                <div className="absolute top-1 right-1 w-2 h-2 rounded-full bg-amber-400 shadow-sm shadow-amber-400/50" />
              )}

              {/* Selected checkmark */}
              {currentBg === theme.id && (
                <motion.div
                  layoutId="bg-selected"
                  className="absolute inset-0 rounded-2xl border-2 border-white/70 flex items-center justify-center"
                >
                  <div className="w-5 h-5 rounded-full bg-white/30 flex items-center justify-center text-white text-xs font-bold backdrop-blur-sm">
                    ✓
                  </div>
                </motion.div>
              )}
            </motion.button>
          )
        })}
      </div>
      <p className="text-center text-xs text-white/25 mt-3">
        🟡 = animated background
      </p>
    </div>
  )
}
