'use client'

import { useState, useRef, useEffect } from 'react'
import Navbar from '@/components/navbar'
import ChatArea from '@/components/chat-area'
import ChatInput from '@/components/chat-input'
import EmptyState from '@/components/empty-state'
import { sendMessage } from '@/lib/api'

export interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async (content: string) => {
    if (!content.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setIsLoading(true)

    try {
      const res = await sendMessage(content)

      console.log("========== API RESPONSE ==========")
      console.log(res)
      console.log("answer:", res.answer)
      console.log("type:", typeof res.answer)
      console.log("==================================")

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content:
          typeof res.answer === 'string'
            ? res.answer
            : JSON.stringify(res.answer, null, 2),
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, assistantMessage])
    } catch (error) {
      console.error(error)

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: '❌ حدث خطأ أثناء الاتصال بالسيرفر.',
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, assistantMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleClearChat = () => {
    setMessages([])
  }

  return (
    <div className="flex flex-col h-screen bg-background">
      <Navbar onClearChat={handleClearChat} />

      <div className="flex-1 overflow-hidden flex flex-col">
        {messages.length === 0 ? (
          <EmptyState />
        ) : (
          <ChatArea
            messages={messages}
            isLoading={isLoading}
            messagesEndRef={messagesEndRef}
          />
        )}
      </div>

      <ChatInput
        onSendMessage={handleSendMessage}
        isLoading={isLoading}
      />
    </div>
  )
}