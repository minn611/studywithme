'use client'

import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { supabase } from '@/lib/supabase'
import { Mail, Lock, User, LogOut, Loader2, X } from 'lucide-react'
import type { User as SupabaseUser } from '@supabase/supabase-js'
import { useLangStore } from '@/store'
import { t } from '@/lib/i18n'

interface AuthPanelProps {
  user: SupabaseUser | null
  onUserChange: (user: SupabaseUser | null) => void
}

// Modal rendered directly into document.body via React Portal
function AuthModal({
  open, onClose, onUserChange
}: {
  open: boolean
  onClose: () => void
  onUserChange: (u: SupabaseUser | null) => void
}) {
  const { lang } = useLangStore()
  const tr = t[lang]
  const [tab, setTab] = useState<'login' | 'signup'>('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [mounted, setMounted] = useState(false)

  useEffect(() => { setMounted(true) }, [])
  useEffect(() => {
    const fn = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', fn)
    return () => window.removeEventListener('keydown', fn)
  }, [onClose])

  async function handleAuth() {
    if (!email || !password) { setError(tr.fillFields); return }
    setLoading(true); setError(''); setSuccess('')
    if (tab === 'login') {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) setError(error.message)
      else { onUserChange(data.user); onClose(); setEmail(''); setPassword('') }
    } else {
      const { error } = await supabase.auth.signUp({ email, password })
      if (error) setError(error.message)
      else setSuccess(tr.checkEmail)
    }
    setLoading(false)
  }

  if (!mounted) return null

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          key="auth-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          style={{
            position: 'fixed', inset: 0,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: 'rgba(0,0,0,0.65)',
            backdropFilter: 'blur(10px)',
            zIndex: 99999,
            padding: '1rem',
          }}
        >
          <motion.div
            key="auth-modal"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', stiffness: 320, damping: 28 }}
            onClick={(e) => e.stopPropagation()}
            style={{
              width: '100%', maxWidth: 360,
              background: 'rgba(14, 10, 35, 0.95)',
              border: '1px solid rgba(255,255,255,0.12)',
              borderRadius: 24,
              padding: 28,
              boxShadow: '0 25px 60px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.05)',
            }}
          >
            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 20 }}>
              <div>
                <h2 style={{ color: '#fff', fontWeight: 700, fontSize: 18, margin: 0 }}>
                  {tab === 'login' ? tr.welcomeBack : tr.createAccount}
                </h2>
                <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 12, marginTop: 4, marginBottom: 0 }}>
                  {tab === 'login' ? tr.loginSubtitle : tr.signupSubtitle}
                </p>
              </div>
              <button onClick={onClose} style={{
                background: 'rgba(255,255,255,0.08)', border: 'none', cursor: 'pointer',
                color: 'rgba(255,255,255,0.5)', borderRadius: '50%',
                width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0, marginLeft: 8,
              }}>
                <X size={15} />
              </button>
            </div>

            {/* Tabs */}
            <div style={{
              display: 'flex', background: 'rgba(255,255,255,0.06)',
              borderRadius: 999, padding: 4, marginBottom: 20,
            }}>
              {(['login', 'signup'] as const).map((t_key) => (
                <button key={t_key} onClick={() => { setTab(t_key); setError(''); setSuccess('') }}
                  style={{
                    flex: 1, padding: '8px 12px', borderRadius: 999, border: 'none', cursor: 'pointer',
                    fontSize: 12, fontWeight: 600, transition: 'all 0.2s',
                    background: tab === t_key ? 'rgba(255,255,255,0.18)' : 'transparent',
                    color: tab === t_key ? '#fff' : 'rgba(255,255,255,0.4)',
                  }}
                >
                  {t_key === 'login' ? tr.loginTab : tr.signupTab}
                </button>
              ))}
            </div>

            {/* Fields */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div>
                <label style={{ color: 'rgba(255,255,255,0.5)', fontSize: 12, display: 'block', marginBottom: 6 }}>{tr.emailLabel}</label>
                <div style={{
                  display: 'flex', alignItems: 'center', gap: 8,
                  background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: 12, padding: '10px 14px',
                }}>
                  <Mail size={14} style={{ color: 'rgba(255,255,255,0.3)', flexShrink: 0 }} />
                  <input
                    id="auth-email-input"
                    type="email"
                    placeholder="email@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoComplete="email"
                    style={{
                      flex: 1, background: 'transparent', border: 'none', outline: 'none',
                      color: '#fff', fontSize: 14, minWidth: 0,
                    }}
                  />
                </div>
              </div>

              <div>
                <label style={{ color: 'rgba(255,255,255,0.5)', fontSize: 12, display: 'block', marginBottom: 6 }}>{tr.passwordLabel}</label>
                <div style={{
                  display: 'flex', alignItems: 'center', gap: 8,
                  background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: 12, padding: '10px 14px',
                }}>
                  <Lock size={14} style={{ color: 'rgba(255,255,255,0.3)', flexShrink: 0 }} />
                  <input
                    id="auth-password-input"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleAuth()}
                    autoComplete={tab === 'login' ? 'current-password' : 'new-password'}
                    style={{
                      flex: 1, background: 'transparent', border: 'none', outline: 'none',
                      color: '#fff', fontSize: 14, minWidth: 0,
                    }}
                  />
                </div>
              </div>

              {error && (
                <div style={{
                  background: 'rgba(239,68,68,0.12)', borderRadius: 10,
                  padding: '8px 12px', color: '#f87171', fontSize: 12, textAlign: 'center',
                }}>⚠️ {error}</div>
              )}
              {success && (
                <div style={{
                  background: 'rgba(52,211,153,0.12)', borderRadius: 10,
                  padding: '8px 12px', color: '#6ee7b7', fontSize: 12, textAlign: 'center',
                }}>✅ {success}</div>
              )}

              <button
                id="auth-submit-btn"
                onClick={handleAuth}
                disabled={loading}
                style={{
                  width: '100%', padding: '12px', borderRadius: 12, border: 'none', cursor: 'pointer',
                  background: 'linear-gradient(135deg, #f43f5e, #a855f7)',
                  color: '#fff', fontWeight: 700, fontSize: 14,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                  opacity: loading ? 0.7 : 1, marginTop: 4,
                }}
              >
                {loading && <Loader2 size={16} className="animate-spin" />}
                {tab === 'login' ? tr.loginBtn : tr.signupBtn}
              </button>

              <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: 12, textAlign: 'center', margin: 0 }}>
                {tab === 'login'
                  ? <><span>{tr.noAccount} </span><button onClick={() => setTab('signup')} style={{ color: '#fb7185', background: 'none', border: 'none', cursor: 'pointer', fontSize: 12 }}>{tr.registerNow}</button></>
                  : <><span>{tr.hasAccount} </span><button onClick={() => setTab('login')} style={{ color: '#fb7185', background: 'none', border: 'none', cursor: 'pointer', fontSize: 12 }}>{tr.loginNow}</button></>
                }
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  )
}

export default function AuthPanel({ user, onUserChange }: AuthPanelProps) {
  const { lang } = useLangStore()
  const tr = t[lang]
  const [open, setOpen] = useState(false)

  async function handleLogout() {
    await supabase.auth.signOut()
    onUserChange(null)
  }

  if (user) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}
        className="glass rounded-full px-4 py-2"
      >
        <div style={{
          width: 28, height: 28, borderRadius: '50%',
          background: 'linear-gradient(135deg, #f43f5e, #a855f7)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 12, fontWeight: 700, color: '#fff', flexShrink: 0,
        }}>
          {user.email?.[0]?.toUpperCase()}
        </div>
        <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: 13, maxWidth: 120, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {user.email}
        </span>
        <button onClick={handleLogout} title="Đăng xuất"
          style={{ color: 'rgba(255,255,255,0.4)', background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
        >
          <LogOut size={14} />
        </button>
      </div>
    )
  }

  return (
    <>
      <button
        id="auth-trigger-btn"
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 glass rounded-full px-4 py-2 text-sm text-white/70 hover:text-white hover:bg-white/10 transition-all cursor-pointer"
      >
        <User size={14} />
        {tr.signIn}
      </button>

      <AuthModal open={open} onClose={() => setOpen(false)} onUserChange={onUserChange} />
    </>
  )
}
