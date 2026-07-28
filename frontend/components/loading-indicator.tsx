import { Bot } from 'lucide-react'
import { motion } from 'framer-motion'

export default function LoadingIndicator() {
  return (
    <motion.div
      className="flex gap-4 justify-start"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 24 }}
    >
      <div className="w-8 h-8 rounded-lg bg-primary/20 flex-shrink-0 flex items-center justify-center">
        <Bot className="w-5 h-5 text-primary" />
      </div>

      <div className="bg-card border border-border rounded-lg px-4 py-3 flex items-center gap-2">
        <div className="flex gap-1">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-2 h-2 rounded-full bg-primary"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 1.4,
                repeat: Infinity,
                delay: i * 0.2,
              }}
            />
          ))}
        </div>
        <span className="text-sm text-muted-foreground ml-2">AI is thinking...</span>
      </div>
    </motion.div>
  )
}
