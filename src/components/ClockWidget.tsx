'use client'

import { useEffect, useState } from 'react'
import { useLangStore } from '@/store'

const LOCALE_MAP: Record<string, string> = {
  vi: 'vi-VN',
  en: 'en-US',
  ja: 'ja-JP',
  ko: 'ko-KR',
  zh: 'zh-CN',
}

export default function ClockWidget() {
  const { lang } = useLangStore()
  const [time, setTime] = useState<string>('')
  const [date, setDate] = useState<string>('')

  useEffect(() => {
    const locale = LOCALE_MAP[lang] ?? 'vi-VN'
    const update = () => {
      const now = new Date()
      setTime(now.toLocaleTimeString(locale, { hour: '2-digit', minute: '2-digit', hour12: false }))
      setDate(now.toLocaleDateString(locale, { weekday: 'long', day: '2-digit', month: '2-digit' }))
    }
    update()
    const id = setInterval(update, 1000)
    return () => clearInterval(id)
  }, [lang])

  return (
    <div className="flex flex-col items-center glass rounded-3xl px-6 py-4">
      <span className="text-4xl font-mono font-bold text-white tracking-widest">{time}</span>
      <span className="text-xs text-white/50 mt-1 capitalize">{date}</span>
    </div>
  )
}
