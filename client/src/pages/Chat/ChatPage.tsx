import React, { useState } from 'react';
import { GlassCard } from '@/components/cards/GlassCard';
import { Button } from '@/components/buttons/Button';
import { Input } from '@/components/inputs/Input';
import { Avatar } from '@/components/ui/Avatar';
import { Bot, Send, User, Sparkles } from 'lucide-react';
import { ChatMessage } from '@/types';

export const ChatPage: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'm1',
      sender: 'assistant',
      content: 'Hello Alex! I am your TradeGenius AI Financial Assistant. Ask me anything about portfolio risk, stock fundamentals, macro indicators, or backtesting strategies.',
      timestamp: '10:00 AM',
    },
  ]);
  const [input, setInput] = useState('');

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg: ChatMessage = {
      id: `usr_${Date.now()}`,
      sender: 'user',
      content: input,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');

    setTimeout(() => {
      const assistantMsg: ChatMessage = {
        id: `ast_${Date.now()}`,
        sender: 'assistant',
        content: `Analyzing ${input}... NVIDIA (NVDA) shows a strong technical setup above its 20-day EMA ($128.50) with bullish institutional accumulation. Consider placing a stop-loss at $124.00.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, assistantMsg]);
    }, 1000);
  };

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col glass-card border border-white/10 overflow-hidden">
      {/* Chat Header */}
      <div className="p-4 border-b border-white/10 glass-panel flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-purple-600 to-emerald-500 flex items-center justify-center text-white shadow-lg">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h2 className="font-bold text-base text-white font-display">TradeGenius AI Co-Pilot</h2>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            </div>
            <p className="text-[11px] text-muted-foreground">Trained on Level-2 order books & SEC filings</p>
          </div>
        </div>
      </div>

      {/* Message Feed */}
      <div className="flex-1 p-6 overflow-y-auto space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-start space-x-3 max-w-2xl ${
              msg.sender === 'user' ? 'ml-auto flex-row-reverse space-x-reverse' : ''
            }`}
          >
            {msg.sender === 'assistant' ? (
              <div className="w-8 h-8 rounded-xl bg-purple-600/20 text-purple-400 border border-purple-500/30 flex items-center justify-center shrink-0">
                <Sparkles className="w-4 h-4" />
              </div>
            ) : (
              <Avatar name="Alex Mercer" size="sm" />
            )}
            <div
              className={`p-4 rounded-2xl text-xs leading-relaxed ${
                msg.sender === 'user'
                  ? 'bg-primary text-white font-medium rounded-tr-none shadow-lg'
                  : 'glass-panel border border-white/10 text-foreground rounded-tl-none'
              }`}
            >
              {msg.content}
              <div className="text-[9px] opacity-60 text-right mt-1">{msg.timestamp}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Input Bar */}
      <form onSubmit={handleSend} className="p-4 border-t border-white/10 glass-panel flex items-center space-x-3">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask AI co-pilot about market analysis, NVDA price target..."
          className="flex-1"
        />
        <Button type="submit" variant="primary" size="md" leftIcon={<Send className="w-4 h-4" />}>
          Send
        </Button>
      </form>
    </div>
  );
};
