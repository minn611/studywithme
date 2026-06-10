import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'

const geistSans = Geist({
  subsets: ['latin'],
  variable: '--font-geist-sans',
})

const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-geist-mono',
})

export const metadata: Metadata = {
  title: 'Study With Me — Không gian học tập chill & kết nối',
  description: 'Không gian học tập ấm cúng, có thể học một mình hoặc cùng bạn bè theo thời gian thực. Pomodoro timer, ambient sounds, study rooms.',
  keywords: ['study with me', 'pomodoro', 'học nhóm', 'ambient sounds', 'focus timer'],
  openGraph: {
    title: 'Study With Me',
    description: 'Học thôi, mình có nhau.',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  )
}
