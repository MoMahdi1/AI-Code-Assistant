'use client'

import { useState } from 'react'
import { Copy, Check } from 'lucide-react'
import { motion } from 'framer-motion'

interface CodeBlockProps {
  language: string
  code: string
}

export default function CodeBlock({ language, code }: CodeBlockProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <motion.div
      className="my-4 rounded-lg overflow-hidden border border-border bg-muted"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center justify-between bg-muted/80 px-4 py-2 border-b border-border">
        <span className="text-xs font-mono text-muted-foreground uppercase tracking-widest">
          {language || 'code'}
        </span>
        <motion.button
          onClick={handleCopy}
          className="flex items-center gap-2 px-3 py-1 rounded text-xs bg-primary/20 hover:bg-primary/30 text-primary transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {copied ? (
            <>
              <Check className="w-3 h-3" />
              <span>Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-3 h-3" />
              <span>Copy</span>
            </>
          )}
        </motion.button>
      </div>
      <pre className="p-4 overflow-x-auto text-sm font-mono bg-muted">
        <code className="text-foreground leading-relaxed hljs">{code}</code>
      </pre>
    </motion.div>
  )
}
