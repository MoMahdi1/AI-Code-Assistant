import { Bot, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface NavbarProps {
  onClearChat: () => void
}

export default function Navbar({ onClearChat }: NavbarProps) {
  return (
    <nav className="border-b border-border bg-card px-4 py-4 sm:px-6 sm:py-5">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <Bot className="w-5 h-5 text-primary-foreground" />
          </div>
          <h1 className="text-lg sm:text-xl font-semibold text-foreground">AI Code Assistant</h1>
        </div>
        
        <div className="flex items-center gap-2 sm:gap-4">
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-muted border border-border">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-sm text-muted-foreground">Claude 3.5 Sonnet</span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearChat}
            className="gap-2 text-muted-foreground hover:text-foreground"
          >
            <Trash2 className="w-4 h-4" />
            <span className="hidden sm:inline">Clear</span>
          </Button>
        </div>
      </div>
    </nav>
  )
}
