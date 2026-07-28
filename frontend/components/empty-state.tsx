import { Bot } from 'lucide-react'
import { motion } from 'framer-motion'

export default function EmptyState() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 300, damping: 24 },
    },
  }

  return (
    <motion.div
      className="flex-1 flex flex-col items-center justify-center px-4 py-8"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.div
        className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center mb-6"
        variants={itemVariants}
      >
        <Bot className="w-8 h-8 text-primary" />
      </motion.div>

      <motion.h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-3" variants={itemVariants}>
        Welcome to AI Code Assistant
      </motion.h2>

      <motion.p
        className="text-muted-foreground text-center max-w-md"
        variants={itemVariants}
      >
        Your intelligent companion for coding, debugging, and learning. Ask me anything about programming!
      </motion.p>
    </motion.div>
  )
}
