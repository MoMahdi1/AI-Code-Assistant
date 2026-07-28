'use client'

import { Message } from '@/app/page'
import { Bot, User } from 'lucide-react'
import { motion } from 'framer-motion'
import ReactMarkdown from 'react-markdown'
import rehypeHighlight from 'rehype-highlight'
import remarkGfm from 'remark-gfm'
import CodeBlock from './code-block'
import 'highlight.js/styles/atom-one-dark.css'

interface ChatMessageProps {
  message: Message
}

export default function ChatMessage({ message }: ChatMessageProps) {
  const isAssistant = message.role === 'assistant'

  return (
    <motion.div
      className={`flex gap-4 ${isAssistant ? 'justify-start' : 'justify-end'}`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 24 }}
    >
      {isAssistant && (
        <div className="w-8 h-8 rounded-lg bg-primary/20 flex-shrink-0 flex items-center justify-center">
          <Bot className="w-5 h-5 text-primary" />
        </div>
      )}

      <div className="flex-1 max-w-2xl">
        <div
          className={`rounded-lg px-4 py-3 ${
            isAssistant
              ? 'bg-card border border-border text-foreground'
              : 'bg-primary text-primary-foreground'
          }`}
        >
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeHighlight]}
            components={{
              code({ className, children }) {
                const match = /language-(\w+)/.exec(className || '')
                const language = match?.[1] ?? 'text'

                const code = Array.isArray(children)
                  ? children
                      .map((child) =>
                        typeof child === 'string'
                          ? child
                          : String(
                              (child as any)?.props?.children ??
                                (child as any)?.value ??
                                ''
                            )
                      )
                      .join('')
                  : String(children)

                if (match) {
                  return (
                    <CodeBlock
                      language={language}
                      code={code.replace(/\n$/, '')}
                    />
                  )
                }

                return (
                  <code className="bg-muted/50 px-2 py-1 rounded text-sm font-mono">
                    {code}
                  </code>
                )
              },

              p: ({ children }) => (
                <p className="mb-3 last:mb-0 leading-relaxed">
                  {children}
                </p>
              ),

              ul: ({ children }) => (
                <ul className="list-disc list-inside mb-3 space-y-1">
                  {children}
                </ul>
              ),

              ol: ({ children }) => (
                <ol className="list-decimal list-inside mb-3 space-y-1">
                  {children}
                </ol>
              ),

              li: ({ children }) => (
                <li className="ml-2">
                  {children}
                </li>
              ),

              strong: ({ children }) => (
                <strong className="font-semibold">
                  {children}
                </strong>
              ),

              em: ({ children }) => (
                <em className="italic">
                  {children}
                </em>
              ),

              h1: ({ children }) => (
                <h1 className="text-xl font-bold mb-3 mt-3">
                  {children}
                </h1>
              ),

              h2: ({ children }) => (
                <h2 className="text-lg font-bold mb-2 mt-2">
                  {children}
                </h2>
              ),

              h3: ({ children }) => (
                <h3 className="font-bold mb-2 mt-2">
                  {children}
                </h3>
              ),

              blockquote: ({ children }) => (
                <blockquote className="border-l-4 border-primary/50 pl-4 italic mb-3 py-1">
                  {children}
                </blockquote>
              ),
            }}
          >
            {message.content}
          </ReactMarkdown>
        </div>
      </div>

      {!isAssistant && (
        <div className="w-8 h-8 rounded-lg bg-primary flex-shrink-0 flex items-center justify-center">
          <User className="w-5 h-5 text-primary-foreground" />
        </div>
      )}
    </motion.div>
  )
}