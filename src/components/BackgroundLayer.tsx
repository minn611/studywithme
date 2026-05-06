'use client'

import { useEffect, useState } from 'react'
import { useBgStore, BG_THEMES } from '@/store'
import { motion, AnimatePresence } from 'framer-motion'

// ── Ocean Shore ───────────────────────────────────────────────────────────────
function OceanLayer() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {/* Sky gradient */}
      <div className="absolute inset-0" style={{
        background: 'linear-gradient(180deg, #001830 0%, #002855 40%, #003d7a 65%, #0a4f80 80%, #1a7a6e 100%)',
      }} />
      {/* Stars */}
      {Array.from({ length: 60 }).map((_, i) => (
        <div key={i} className="absolute rounded-full bg-white" style={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 60}%`,
          width: Math.random() * 2 + 0.5,
          height: Math.random() * 2 + 0.5,
          opacity: Math.random() * 0.8 + 0.2,
          animation: `twinkle ${Math.random() * 3 + 2}s ease-in-out infinite ${Math.random() * 3}s`,
        }} />
      ))}
      {/* Moon */}
      <div className="absolute" style={{ top: '8%', right: '12%' }}>
        <div style={{
          width: 50, height: 50, borderRadius: '50%',
          background: 'radial-gradient(circle at 40% 40%, #fff9e0, #ffe87a)',
          boxShadow: '0 0 30px 10px rgba(255, 240, 120, 0.25)',
        }} />
      </div>
      {/* Moon reflection on water */}
      <div className="absolute" style={{ bottom: '25%', left: '50%', transform: 'translateX(-50%)' }}>
        <div style={{
          width: 6, height: 80,
          background: 'linear-gradient(to bottom, rgba(255,240,120,0.5), transparent)',
          borderRadius: 4,
          filter: 'blur(3px)',
        }} />
      </div>
      {/* Water */}
      <div className="absolute bottom-0 left-0 right-0" style={{ height: '35%' }}>
        <div className="absolute inset-0" style={{
          background: 'linear-gradient(180deg, #0a3d62 0%, #051e3e 100%)',
        }} />
        {/* Animated waves */}
        {[0, 1, 2].map((i) => (
          <svg key={i} viewBox="0 0 1440 60" className="absolute w-full"
            style={{ top: `${i * 20}%`, opacity: 0.3 - i * 0.08, animation: `wave ${3 + i * 0.5}s ease-in-out infinite ${i * 0.5}s alternate` }}
          >
            <path d="M0,30 C240,60 480,0 720,30 C960,60 1200,0 1440,30 L1440,60 L0,60 Z"
              fill={`rgba(30,140,200,${0.4 - i * 0.1})`} />
          </svg>
        ))}
        {/* Sparkles on water */}
        {Array.from({ length: 15 }).map((_, i) => (
          <div key={i} className="absolute rounded-full bg-white" style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: Math.random() * 3 + 1,
            height: 1,
            opacity: 0,
            animation: `sparkle ${Math.random() * 2 + 1}s ease-in-out infinite ${Math.random() * 3}s`,
          }} />
        ))}
      </div>
      {/* Sand/shore */}
      <div className="absolute bottom-0 left-0 right-0" style={{ height: '8%', background: 'linear-gradient(180deg, #7a6040, #5a4020)' }} />
      <style>{`
        @keyframes wave { from { transform: translateX(0) scaleY(1); } to { transform: translateX(-40px) scaleY(1.1); } }
        @keyframes twinkle { 0%,100% { opacity: 0.2; } 50% { opacity: 1; } }
        @keyframes sparkle { 0%,100% { opacity: 0; } 50% { opacity: 0.8; } }
      `}</style>
    </div>
  )
}

// ── Sakura Cherry Blossom ─────────────────────────────────────────────────────
function SakuraLayer() {
  const [petals, setPetals] = useState<{ id: number; x: number; delay: number; duration: number; size: number; rotate: number }[]>([])
  useEffect(() => {
    setPetals(Array.from({ length: 35 }, (_, i) => ({
      id: i, x: Math.random() * 100, delay: Math.random() * 8,
      duration: Math.random() * 6 + 8, size: Math.random() * 12 + 8, rotate: Math.random() * 360,
    })))
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {/* Sky — dusk over Japan */}
      <div className="absolute inset-0" style={{
        background: 'linear-gradient(180deg, #1a0028 0%, #2d0040 30%, #5c1a4e 55%, #8b2252 70%, #c4507a 85%, #d4779a 100%)',
      }} />
      {/* Moon */}
      <div className="absolute" style={{ top: '10%', left: '20%' }}>
        <div style={{
          width: 45, height: 45, borderRadius: '50%',
          background: 'radial-gradient(circle at 40% 35%, #fff5f0, #ffd6cc)',
          boxShadow: '0 0 25px 8px rgba(255, 210, 200, 0.3)',
        }} />
      </div>
      {/* Stars */}
      {Array.from({ length: 40 }).map((_, i) => (
        <div key={i} className="absolute rounded-full bg-white" style={{
          left: `${Math.random() * 100}%`, top: `${Math.random() * 50}%`,
          width: Math.random() * 1.5 + 0.5, height: Math.random() * 1.5 + 0.5,
          opacity: Math.random() * 0.6 + 0.1,
          animation: `twinkle2 ${Math.random() * 4 + 2}s ease-in-out infinite ${Math.random() * 4}s`,
        }} />
      ))}
      {/* Sakura tree silhouettes */}
      <svg className="absolute bottom-0 left-0 w-full" viewBox="0 0 1440 300" style={{ opacity: 0.7 }}>
        {/* Left tree */}
        <path d="M80,300 L80,120 M80,120 C60,80 20,60 10,30 C40,40 70,70 80,120 M80,120 C100,70 140,50 160,20 C130,40 100,80 80,120 M80,120 C80,90 50,70 30,60 C55,75 78,95 80,120"
          stroke="#1a0010" strokeWidth="8" fill="none" />
        <ellipse cx="80" cy="70" rx="70" ry="50" fill="rgba(180,60,100,0.25)" />
        {/* Right tree */}
        <path d="M1360,300 L1360,140 M1360,140 C1340,100 1300,80 1280,50 C1320,60 1350,90 1360,140 M1360,140 C1380,90 1420,70 1440,40 C1410,60 1375,100 1360,140"
          stroke="#1a0010" strokeWidth="8" fill="none" />
        <ellipse cx="1360" cy="90" rx="80" ry="60" fill="rgba(180,60,100,0.2)" />
      </svg>
      {/* Ground */}
      <div className="absolute bottom-0 left-0 right-0" style={{ height: '12%', background: 'linear-gradient(180deg, rgba(80,20,40,0.6), #150010)' }} />
      {/* Falling petals */}
      {petals.map((p) => (
        <div key={p.id} className="absolute" style={{
          left: `${p.x}%`, top: '-20px', width: p.size, height: p.size,
          animation: `petalFall ${p.duration}s ease-in-out infinite ${p.delay}s`,
        }}>
          <svg viewBox="0 0 20 20" style={{ width: '100%', height: '100%', transform: `rotate(${p.rotate}deg)` }}>
            <path d="M10,1 C12,1 16,5 16,10 C16,14 13,18 10,19 C7,18 4,14 4,10 C4,5 8,1 10,1 Z" fill="rgba(255,182,193,0.85)" />
          </svg>
        </div>
      ))}
      <style>{`
        @keyframes petalFall {
          0% { transform: translateY(-20px) rotate(0deg) translateX(0px); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 0.7; }
          100% { transform: translateY(110vh) rotate(720deg) translateX(100px); opacity: 0; }
        }
        @keyframes twinkle2 { 0%,100% { opacity: 0.1; } 50% { opacity: 0.7; } }
      `}</style>
    </div>
  )
}

// ── Galaxy / Milky Way ────────────────────────────────────────────────────────
function GalaxyLayer() {
  const [stars, setStars] = useState<{ id: number; x: number; y: number; size: number; delay: number; color: string }[]>([])
  useEffect(() => {
    const colors = ['#ffffff', '#ffe8d0', '#d0e8ff', '#ffd0ff', '#d0ffd8', '#ffffd0']
    setStars(Array.from({ length: 200 }, (_, i) => ({
      id: i, x: Math.random() * 100, y: Math.random() * 100,
      size: Math.random() * 3 + 0.5,
      delay: Math.random() * 5, color: colors[Math.floor(Math.random() * colors.length)],
    })))
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {/* Deep space */}
      <div className="absolute inset-0" style={{
        background: 'linear-gradient(135deg, #000005 0%, #02000a 25%, #000008 50%, #000205 75%, #000000 100%)',
      }} />
      {/* Milky Way band */}
      <div className="absolute" style={{
        top: '20%', left: '-20%', width: '140%', height: '60%',
        background: 'radial-gradient(ellipse 80% 40% at 50% 50%, rgba(100,80,200,0.12) 0%, rgba(60,40,150,0.08) 40%, transparent 80%)',
        transform: 'rotate(-25deg)',
        filter: 'blur(20px)',
      }} />
      {/* Nebula clouds */}
      <div className="absolute" style={{ top: '10%', right: '10%', width: 300, height: 200, borderRadius: '50%',
        background: 'radial-gradient(ellipse, rgba(180,100,255,0.08), transparent)',
        filter: 'blur(30px)', animation: 'nebulaPulse 8s ease-in-out infinite' }} />
      <div className="absolute" style={{ bottom: '20%', left: '5%', width: 250, height: 180, borderRadius: '50%',
        background: 'radial-gradient(ellipse, rgba(100,200,255,0.07), transparent)',
        filter: 'blur(25px)', animation: 'nebulaPulse 10s ease-in-out infinite 3s' }} />
      <div className="absolute" style={{ top: '50%', left: '40%', width: 400, height: 250, borderRadius: '50%',
        background: 'radial-gradient(ellipse, rgba(255,150,100,0.05), transparent)',
        filter: 'blur(40px)', animation: 'nebulaPulse 12s ease-in-out infinite 6s' }} />
      {/* Stars */}
      {stars.map((s) => (
        <div key={s.id} className="absolute rounded-full" style={{
          left: `${s.x}%`, top: `${s.y}%`,
          width: s.size, height: s.size, background: s.color,
          animation: `starTwinkle ${Math.random() * 4 + 2}s ease-in-out infinite ${s.delay}s`,
          boxShadow: s.size > 2 ? `0 0 ${s.size * 3}px ${s.color}` : 'none',
        }} />
      ))}
      {/* Shooting stars */}
      {[0, 1, 2].map((i) => (
        <div key={i} className="absolute" style={{
          top: `${15 + i * 20}%`, left: '-5%', width: 150, height: 1,
          background: 'linear-gradient(90deg, transparent, white, transparent)',
          animation: `shootingStar ${6 + i * 3}s ease-in infinite ${i * 4}s`,
          opacity: 0,
        }} />
      ))}
      <style>{`
        @keyframes nebulaPulse { 0%,100% { opacity: 0.6; transform: scale(1); } 50% { opacity: 1; transform: scale(1.1); } }
        @keyframes starTwinkle { 0%,100% { opacity: 0.3; transform: scale(1); } 50% { opacity: 1; transform: scale(1.3); } }
        @keyframes shootingStar {
          0% { transform: translateX(0) translateY(0) rotate(-20deg); opacity: 0; }
          5% { opacity: 1; }
          15% { transform: translateX(110vw) translateY(30vh) rotate(-20deg); opacity: 0; }
          100% { transform: translateX(110vw) translateY(30vh) rotate(-20deg); opacity: 0; }
        }
      `}</style>
    </div>
  )
}

// ── Main exported component ───────────────────────────────────────────────────
export default function BackgroundLayer() {
  const { currentBg } = useBgStore()
  const theme = BG_THEMES.find((t) => t.id === currentBg)

  if (!theme) return null

  return (
    <AnimatePresence mode="wait">
      {theme.type === 'ocean'  && <motion.div key="ocean"  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1.5 }}><OceanLayer /></motion.div>}
      {theme.type === 'sakura' && <motion.div key="sakura" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1.5 }}><SakuraLayer /></motion.div>}
      {theme.type === 'galaxy' && <motion.div key="galaxy" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1.5 }}><GalaxyLayer /></motion.div>}
    </AnimatePresence>
  )
}
