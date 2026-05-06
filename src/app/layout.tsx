import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin', 'vietnamese'], variable: '--font-inter' })

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
    <html lang="vi" className={inter.variable}>
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  )
}
