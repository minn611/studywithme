'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Globe, Check } from 'lucide-react'
import { useLangStore } from '@/store'
import { LANGUAGES, type Lang } from '@/lib/i18n'

export default function LanguageSwitcher() {
  const { lang, setLang } = useLangStore()
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const current = LANGUAGES.find((l) => l.code === lang) ?? LANGUAGES[0]

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    if (open) document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [open])

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 glass rounded-full px-3 py-2 text-sm text-white/70 hover:text-white hover:bg-white/10 transition-all"
        title="Change language"
      >
        <Globe size={14} />
        <span className="text-base leading-none">{current.flag}</span>
        <span className="text-xs font-medium hidden sm:inline">{current.label}</span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute top-12 right-0 glass rounded-2xl overflow-hidden shadow-2xl shadow-black/40 min-w-[170px]"
            style={{ zIndex: 1000 }}
          >
            {LANGUAGES.map((l) => (
              <button
                key={l.code}
                onClick={() => { setLang(l.code as Lang); setOpen(false) }}
                className={`w-full flex items-center gap-3 px-4 py-3 text-sm transition-all text-left ${
                  lang === l.code
                    ? 'bg-white/15 text-white'
                    : 'text-white/60 hover:bg-white/10 hover:text-white'
                }`}
              >
                <span className="text-lg">{l.flag}</span>
                <span className="flex-1 font-medium">{l.label}</span>
                {lang === l.code && <Check size={13} className="text-rose-400" />}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
