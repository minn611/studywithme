'use client'

import { useEffect, useState } from 'react'

export default function ClockWidget() {
  const [time, setTime] = useState<string>('')
  const [date, setDate] = useState<string>('')

  useEffect(() => {
    const update = () => {
      const now = new Date()
      setTime(now.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit', hour12: false }))
      setDate(now.toLocaleDateString('vi-VN', { weekday: 'long', day: '2-digit', month: '2-digit' }))
    }
    update()
    const id = setInterval(update, 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="flex flex-col items-center glass rounded-3xl px-6 py-4">
      <span className="text-4xl font-mono font-bold text-white tracking-widest">{time}</span>
      <span className="text-xs text-white/50 mt-1 capitalize">{date}</span>
    </div>
  )
}
