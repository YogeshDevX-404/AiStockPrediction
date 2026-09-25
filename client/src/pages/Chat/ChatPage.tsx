import React, { useState, useEffect } from 'react';
import { GlassCard } from '@/components/cards/GlassCard';
import { Button } from '@/components/buttons/Button';
import { Input } from '@/components/inputs/Input';
import { Avatar } from '@/components/ui/Avatar';
import { FormattedMarkdown } from '@/components/ui/FormattedMarkdown';
import { Bot, Send, Sparkles } from 'lucide-react';
import { ChatMessage } from '@/types';
import { useAuthStore } from '@/store/useAuthStore';
import { apiClient } from '@/api';

export const ChatPage: React.FC = () => {
  const { user } = useAuthStore();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Initial welcome message
    setMessages([
      {
        id: 'm1',
        sender: 'assistant',
        content: `Hello ${user?.fullName || 'Investor'}! I am your TradeGenius AI Financial Assistant. Ask me anything about stock metrics, chart patterns, risk analysis, or market context.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ]);
  }, [user]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMsgText = input;
    const userMsg: ChatMessage = {
      id: `usr_${Date.now()}`,
      sender: 'user',
      content: userMsgText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      console.log('[ChatPage Diagnostic] Initiating request to /copilot/query for prompt:', userMsgText.slice(0, 30));
      const res: any = await apiClient.post('/copilot/query', { query: userMsgText, prompt: userMsgText });
      console.log('[ChatPage Diagnostic] Response received. Raw top-level keys:', Object.keys(res || {}));

      const innerData = res?.data || res;
      console.log('[ChatPage Diagnostic] Inner payload keys:', innerData && typeof innerData === 'object' ? Object.keys(innerData) : typeof innerData);

      const aiContent =
        innerData?.executiveSummary ||
        innerData?.content ||
        innerData?.response ||
        innerData?.summary ||
        (typeof innerData === 'string' ? innerData : undefined) ||
        'No content payload returned from AI assistant backend service.';

      console.log('[ChatPage Diagnostic] Extracted AI message length:', aiContent.length);

      const assistantMsg: ChatMessage = {
        id: `ast_${Date.now()}`,
        sender: 'assistant',
        content: aiContent,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, assistantMsg]);
      console.log('[ChatPage Diagnostic] Chat state updated successfully with assistant message.');
    } catch (err: any) {
      console.error('[ChatPage Diagnostic] Catch handler caught error:', err);
      let errorCategory = 'System Error';
      let errText = err.response?.data?.error || err.response?.data?.message || err.message || 'Unknown error occurred.';

      if (err.code === 'ECONNABORTED' || err.message?.includes('timeout')) {
        errorCategory = 'Timeout Notice';
        errText = 'The AI request timed out waiting for backend response. Please try your question again.';
      } else if (!err.response) {
        errorCategory = 'Network / CORS Error';
        errText = 'Unable to connect to AI Assistant backend service. Please verify CORS settings or server status at http://localhost:5000.';
      } else if (err.response?.status >= 500) {
        errorCategory = `Backend Error ${err.response.status}`;
      } else if (err.response?.status >= 400) {
        errorCategory = `Request Error ${err.response.status}`;
      }

      const errorMsg: ChatMessage = {
        id: `err_${Date.now()}`,
        sender: 'assistant',
        content: `AI Assistant [${errorCategory}]: ${errText}`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col glass-card border border-border/50 overflow-hidden">
      {/* Chat Header */}
      <div className="p-4 border-b border-border/50 glass-panel flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-purple-600 to-emerald-500 flex items-center justify-center text-foreground shadow-lg">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h2 className="font-bold text-base text-foreground font-display">TradeGenius AI Assistant</h2>
              <span className="w-2 h-2 rounded-full bg-emerald-500 dark:bg-emerald-400 animate-pulse" />
            </div>
            <p className="text-[11px] text-muted-foreground">Market Research & Financial Intelligence Co-Pilot</p>
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
              <div className="w-8 h-8 rounded-xl bg-purple-600/20 text-purple-600 dark:text-purple-400 border border-purple-500/30 flex items-center justify-center shrink-0">
                <Sparkles className="w-4 h-4" />
              </div>
            ) : (
              <Avatar name={user?.fullName || 'User'} size="sm" />
            )}
            <div
              className={`p-4 rounded-2xl text-xs leading-relaxed ${
                msg.sender === 'user'
                  ? 'bg-primary text-foreground font-medium rounded-tr-none shadow-lg'
                  : 'glass-panel border border-border/50 text-foreground rounded-tl-none'
              }`}
            >
              {msg.sender === 'assistant' ? (
                <FormattedMarkdown content={msg.content} />
              ) : (
                msg.content
              )}
              <div className="text-[9px] opacity-60 text-right mt-1">{msg.timestamp}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Input Bar */}
      <form onSubmit={handleSend} className="p-4 border-t border-border/50 glass-panel flex items-center space-x-3">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask AI assistant about stock metrics, market trends..."
          className="flex-1"
          disabled={isLoading}
        />
        <Button type="submit" variant="primary" size="md" isLoading={isLoading} leftIcon={<Send className="w-4 h-4" />}>
          Send
        </Button>
      </form>
    </div>
  );
};
