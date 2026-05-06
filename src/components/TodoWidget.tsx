'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Check, X, GripVertical } from 'lucide-react'

interface Todo {
  id: string
  text: string
  done: boolean
  pomodoros: number
}

export default function TodoWidget() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [input, setInput] = useState('')
  const [open, setOpen] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (open && inputRef.current) inputRef.current.focus()
  }, [open])

  const addTodo = () => {
    if (!input.trim()) return
    setTodos((p) => [
      ...p,
      { id: Date.now().toString(), text: input.trim(), done: false, pomodoros: 1 },
    ])
    setInput('')
  }

  const toggleTodo = (id: string) =>
    setTodos((p) => p.map((t) => (t.id === id ? { ...t, done: !t.done } : t)))

  const removeTodo = (id: string) => setTodos((p) => p.filter((t) => t.id !== id))

  const donePct = todos.length > 0 ? Math.round((todos.filter((t) => t.done).length / todos.length) * 100) : 0

  return (
    <div className="glass rounded-3xl p-5 w-full max-w-xs">
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm font-semibold text-white/80">📋 To-do</span>
        <button
          onClick={() => setOpen((v) => !v)}
          className="p-1 rounded-full hover:bg-white/10 text-white/50 hover:text-white transition-all"
        >
          <Plus size={16} />
        </button>
      </div>

      {/* Progress bar */}
      {todos.length > 0 && (
        <div className="mb-3">
          <div className="flex justify-between text-xs text-white/40 mb-1">
            <span>{todos.filter((t) => t.done).length}/{todos.length} tasks</span>
            <span>{donePct}%</span>
          </div>
          <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-rose-400 to-purple-500 rounded-full"
              animate={{ width: `${donePct}%` }}
              transition={{ type: 'spring', stiffness: 120 }}
            />
          </div>
        </div>
      )}

      {/* Add input */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="flex gap-2 mb-3 overflow-hidden"
          >
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && addTodo()}
              placeholder="Add a task..."
              className="flex-1 bg-white/10 rounded-xl px-3 py-2 text-sm text-white placeholder-white/30 outline-none focus:ring-1 focus:ring-white/30"
            />
            <button
              onClick={addTodo}
              className="px-3 py-2 bg-rose-500/70 hover:bg-rose-500 rounded-xl text-white text-sm transition-all"
            >
              Add
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Todo list */}
      <div className="space-y-2 max-h-52 overflow-y-auto pr-1">
        <AnimatePresence>
          {todos.map((todo) => (
            <motion.div
              key={todo.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              className="flex items-center gap-2 group"
            >
              <button
                onClick={() => toggleTodo(todo.id)}
                className={`flex-shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                  todo.done
                    ? 'bg-emerald-400/80 border-emerald-400'
                    : 'border-white/20 hover:border-white/50'
                }`}
              >
                {todo.done && <Check size={10} className="text-white" />}
              </button>
              <span className={`flex-1 text-sm transition-all ${todo.done ? 'line-through text-white/30' : 'text-white/80'}`}>
                {todo.text}
              </span>
              <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-all">
                <span className="text-xs text-amber-400/70">🍅×{todo.pomodoros}</span>
                <button onClick={() => removeTodo(todo.id)} className="text-white/30 hover:text-red-400">
                  <X size={12} />
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        {todos.length === 0 && (
          <p className="text-xs text-white/25 text-center py-2">No tasks yet. Add one! ✨</p>
        )}
      </div>
    </div>
  )
}
