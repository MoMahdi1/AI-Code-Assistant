'use client'

import { useState, useRef } from 'react'
import { Send, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'

interface ChatInputProps {
  onSendMessage: (message: string) => void
  isLoading: boolean
}

export default function ChatInput({ onSendMessage, isLoading }: ChatInputProps) {
  const [input, setInput] = useState('')
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    onSendMessage(input)
    setInput('')
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey && !e.nativeEvent.isComposing) {
      e.preventDefault()
      handleSubmit(e as any)
    }
  }

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value)
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 200)}px`
    }
  }

  return (
    <motion.div
      className="border-t border-border bg-card p-4 sm:p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 24 }}
    >
      <div className="max-w-4xl mx-auto">
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <div className="flex gap-3 items-end">
            <Button
              type="button"
              variant="outline"
              size="icon"
              className="flex-shrink-0 h-10 w-10 rounded-lg border-border hover:bg-muted"
              disabled={isLoading}
            >
              <Plus className="w-5 h-5" />
            </Button>

            <div className="flex-1 relative">
              <textarea
                ref={textareaRef}
                value={input}
                onChange={handleInput}
                onKeyDown={handleKeyDown}
                placeholder="Ask me anything... (Shift + Enter for new line)"
                disabled={isLoading}
                className="w-full px-4 py-3 rounded-lg bg-muted border border-border text-foreground placeholder-muted-foreground resize-none focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all disabled:opacity-50 disabled:cursor-not-allowed max-h-48"
                style={{ minHeight: '44px' }}
              />
            </div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                type="submit"
                disabled={!input.trim() || isLoading}
                className="flex-shrink-0 h-10 w-10 rounded-lg gap-2 bg-primary hover:bg-primary/90 text-primary-foreground disabled:opacity-50 disabled:cursor-not-allowed p-0"
              >
                <Send className="w-5 h-5" />
              </Button>
            </motion.div>
          </div>
          <p className="text-xs text-muted-foreground text-center">
            AI Code Assistant • Press Enter to send, Shift+Enter for new line
          </p>
        </form>
      </div>
    </motion.div>
  )
}
