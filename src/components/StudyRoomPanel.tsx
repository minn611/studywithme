'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { supabase } from '@/lib/supabase'
import { Users, Plus, Link2, LogIn } from 'lucide-react'

interface Room {
  id: string
  name: string
  description: string | null
  room_code: string
  is_public: boolean
  host_user_id: string
  member_count?: number
}

interface StudyRoomPanelProps {
  userId: string | null
}

const EMOJIS = ['🔥', '💪', '✅', '⭐', '🎉']

export default function StudyRoomPanel({ userId }: StudyRoomPanelProps) {
  const [rooms, setRooms] = useState<Room[]>([])
  const [currentRoom, setCurrentRoom] = useState<Room | null>(null)
  const [members, setMembers] = useState<{ user_id: string; username: string }[]>([])
  const [reactions, setReactions] = useState<{ emoji: string; id: number }[]>([])
  const [showCreate, setShowCreate] = useState(false)
  const [showJoin, setShowJoin] = useState(false)
  const [roomName, setRoomName] = useState('')
  const [joinCode, setJoinCode] = useState('')
  const [loading, setLoading] = useState(false)

  // Fetch public rooms
  useEffect(() => {
    fetchRooms()
  }, [])

  // Realtime members subscription when in a room
  useEffect(() => {
    if (!currentRoom) return

    const channel = supabase
      .channel(`room:${currentRoom.id}`)
      .on('presence', { event: 'sync' }, () => {
        const state = channel.presenceState()
        const memberList = Object.values(state).flat() as { user_id: string; username: string }[]
        setMembers(memberList)
      })
      .on('broadcast', { event: 'reaction' }, ({ payload }) => {
        const id = Date.now()
        setReactions((p) => [...p, { emoji: payload.emoji, id }])
        setTimeout(() => setReactions((p) => p.filter((r) => r.id !== id)), 2500)
      })
      .subscribe(async (status) => {
        if (status === 'SUBSCRIBED' && userId) {
          await channel.track({ user_id: userId, username: `User_${userId.slice(0, 6)}` })
        }
      })

    return () => { supabase.removeChannel(channel) }
  }, [currentRoom, userId])

  async function fetchRooms() {
    const { data } = await supabase
      .from('study_rooms')
      .select('*')
      .eq('is_public', true)
      .order('created_at', { ascending: false })
      .limit(10)
    if (data) setRooms(data)
  }

  async function createRoom() {
    if (!roomName.trim() || !userId) return
    setLoading(true)
    const code = Math.random().toString(36).substring(2, 8).toUpperCase()
    const { data, error } = await supabase
      .from('study_rooms')
      .insert({ name: roomName, is_public: true, host_user_id: userId, room_code: code })
      .select()
      .single()
    setLoading(false)
    if (!error && data) {
      setCurrentRoom(data)
      setShowCreate(false)
      setRoomName('')
      fetchRooms()
    }
  }

  async function joinByCode() {
    if (!joinCode.trim()) return
    const { data } = await supabase
      .from('study_rooms')
      .select('*')
      .eq('room_code', joinCode.toUpperCase())
      .single()
    if (data) {
      setCurrentRoom(data)
      setShowJoin(false)
      setJoinCode('')
    }
  }

  async function sendReaction(emoji: string) {
    if (!currentRoom) return
    const channel = supabase.channel(`room:${currentRoom.id}`)
    await channel.send({ type: 'broadcast', event: 'reaction', payload: { emoji } })
  }

  if (currentRoom) {
    return (
      <div className="glass rounded-3xl p-5 w-full max-w-sm">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h3 className="text-white font-semibold">🏠 {currentRoom.name}</h3>
            <div className="flex items-center gap-1 text-xs text-white/50 mt-0.5">
              <Users size={10} />
              <span>{members.length} online</span>
              <span className="mx-1">·</span>
              <span className="font-mono tracking-wider">{currentRoom.room_code}</span>
            </div>
          </div>
          <button
            onClick={() => setCurrentRoom(null)}
            className="text-xs px-3 py-1 bg-white/10 hover:bg-white/20 rounded-full text-white/60 hover:text-white transition-all"
          >
            Leave
          </button>
        </div>

        {/* Members */}
        <div className="flex flex-wrap gap-2 mb-3">
          {members.map((m) => (
            <div key={m.user_id} className="flex items-center gap-1.5 bg-white/10 rounded-full px-2 py-1">
              <div className="w-5 h-5 rounded-full bg-gradient-to-br from-rose-400 to-purple-500 flex items-center justify-center text-xs font-bold text-white">
                {m.username[0]?.toUpperCase()}
              </div>
              <span className="text-xs text-white/70">{m.username}</span>
            </div>
          ))}
          {members.length === 0 && (
            <span className="text-xs text-white/30">No one else here yet...</span>
          )}
        </div>

        {/* Reactions */}
        <div className="relative h-8 mb-3">
          <AnimatePresence>
            {reactions.map((r) => (
              <motion.span
                key={r.id}
                initial={{ opacity: 1, y: 0, x: Math.random() * 200 }}
                animate={{ opacity: 0, y: -40 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 2 }}
                className="absolute text-2xl pointer-events-none"
              >
                {r.emoji}
              </motion.span>
            ))}
          </AnimatePresence>
        </div>

        {/* Send reaction */}
        <div className="flex gap-2">
          {EMOJIS.map((e) => (
            <button
              key={e}
              onClick={() => sendReaction(e)}
              className="text-xl hover:scale-125 transition-transform"
            >
              {e}
            </button>
          ))}
          <button
            onClick={() => navigator.clipboard.writeText(currentRoom.room_code)}
            className="ml-auto flex items-center gap-1 text-xs text-white/50 hover:text-white transition-all"
          >
            <Link2 size={12} />
            Copy code
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="glass rounded-3xl p-5 w-full max-w-sm">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Users size={16} className="text-white/60" />
          <span className="text-sm font-semibold text-white/80">Study Rooms</span>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => { setShowJoin(true); setShowCreate(false) }}
            className="flex items-center gap-1 text-xs px-3 py-1.5 bg-white/10 hover:bg-white/20 rounded-full text-white/70 hover:text-white transition-all"
          >
            <LogIn size={12} />
            Join
          </button>
          <button
            onClick={() => { setShowCreate(true); setShowJoin(false) }}
            className="flex items-center gap-1 text-xs px-3 py-1.5 bg-gradient-to-r from-rose-500/80 to-purple-600/80 hover:from-rose-500 hover:to-purple-600 rounded-full text-white transition-all"
          >
            <Plus size={12} />
            Create
          </button>
        </div>
      </div>

      {/* Create room form */}
      <AnimatePresence>
        {showCreate && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden mb-4"
          >
            <input
              value={roomName}
              onChange={(e) => setRoomName(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && createRoom()}
              placeholder="Room name..."
              className="w-full bg-white/10 rounded-xl px-3 py-2 text-sm text-white placeholder-white/30 outline-none focus:ring-1 focus:ring-white/30 mb-2"
            />
            <button
              onClick={createRoom}
              disabled={loading}
              className="w-full py-2 bg-gradient-to-r from-rose-500/80 to-purple-600/80 hover:from-rose-500 hover:to-purple-600 rounded-xl text-white text-sm font-medium transition-all disabled:opacity-50"
            >
              {loading ? 'Creating...' : 'Create Room 🚀'}
            </button>
          </motion.div>
        )}

        {showJoin && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden mb-4"
          >
            <input
              value={joinCode}
              onChange={(e) => setJoinCode(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && joinByCode()}
              placeholder="Enter room code..."
              className="w-full bg-white/10 rounded-xl px-3 py-2 text-sm text-white placeholder-white/30 outline-none focus:ring-1 focus:ring-white/30 mb-2 font-mono tracking-widest uppercase"
            />
            <button
              onClick={joinByCode}
              className="w-full py-2 bg-white/15 hover:bg-white/25 rounded-xl text-white text-sm font-medium transition-all"
            >
              Join Room 👋
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Public rooms list */}
      <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
        {rooms.map((room) => (
          <motion.button
            key={room.id}
            onClick={() => setCurrentRoom(room)}
            whileHover={{ x: 4 }}
            className="w-full flex items-center justify-between p-3 bg-white/5 hover:bg-white/10 rounded-2xl transition-all text-left"
          >
            <div>
              <div className="text-sm text-white font-medium">{room.name}</div>
              <div className="text-xs text-white/40 font-mono">{room.room_code}</div>
            </div>
            <div className="text-xs text-white/50 flex items-center gap-1">
              <Users size={10} />
              <span>Public</span>
            </div>
          </motion.button>
        ))}
        {rooms.length === 0 && (
          <p className="text-center text-xs text-white/25 py-3">No public rooms yet. Create one! 🏠</p>
        )}
      </div>
    </div>
  )
}
