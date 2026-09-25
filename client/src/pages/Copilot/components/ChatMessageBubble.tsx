import React from 'react';
import { Badge } from '@/components/ui/Badge';
import { CopilotMessage } from '@/services/api/copilotApi';
import { Bot, User, Copy, Check, Sparkles, AlertTriangle } from 'lucide-react';
import { toast } from 'react-hot-toast';

export interface ChatMessageBubbleProps {
  message: CopilotMessage;
}

export const ChatMessageBubble: React.FC<ChatMessageBubbleProps> = ({ message }) => {
  const isUser = message.role === 'user';
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    const text = message.prompt || message.detailedExplanation || message.summary || '';
    navigator.clipboard.writeText(text);
    setCopied(true);
    toast.success('Copied copilot message!');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={`flex items-start space-x-3 text-xs ${isUser ? 'flex-row-reverse space-x-reverse' : ''}`}>
      {/* Avatar */}
      <div
        className={`w-9 h-9 rounded-2xl flex items-center justify-center font-bold text-foreground shrink-0 border ${
          isUser
            ? 'bg-emerald-600 border-emerald-400'
            : 'bg-gradient-to-tr from-purple-600 to-blue-600 border-purple-400 shadow-lg shadow-purple-500/20'
        }`}
      >
        {isUser ? <User className="w-4 h-4" /> : <Bot className="w-5 h-5" />}
      </div>

      {/* Bubble Container */}
      <div
        className={`max-w-2xl rounded-2xl p-4 space-y-3 border ${
          isUser
            ? 'bg-emerald-950/30 border-emerald-500/30 text-foreground'
            : 'glass-panel border-border/50 bg-card/80 text-slate-200'
        }`}
      >
        {isUser ? (
          <p className="text-sm font-medium font-sans">{message.prompt}</p>
        ) : (
          <div className="space-y-3">
            {/* Header Summary */}
            <div className="flex items-center justify-between border-b border-border/50 pb-2">
              <div className="flex items-center space-x-2">
                <Sparkles className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                <span className="font-bold font-display text-foreground text-sm">{message.summary}</span>
              </div>
              {message.recommendation && (
                <Badge variant={message.recommendation === 'BUY' ? 'emerald' : 'purple'}>
                  {message.recommendation}
                </Badge>
              )}
            </div>

            {/* Detailed Body */}
            <p className="leading-relaxed text-muted-foreground whitespace-pre-line">{message.detailedExplanation}</p>

            {/* Confidence & Risk Meter */}
            {message.confidenceScore && message.confidenceScore > 0 && (
              <div className="p-3 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-purple-300 font-bold uppercase">Copilot Model Conviction</span>
                  <div className="text-base font-extrabold text-purple-600 dark:text-purple-400 font-display">{message.confidenceScore}%</div>
                </div>
                {message.suggestedNextStep && (
                  <div className="text-right max-w-xs">
                    <span className="text-[10px] text-muted-foreground font-bold uppercase">Next Action</span>
                    <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-bold">{message.suggestedNextStep}</p>
                  </div>
                )}
              </div>
            )}

            {/* Risk Factors */}
            {message.riskFactors && message.riskFactors.length > 0 && (
              <div className="space-y-1 text-[11px]">
                <span className="font-bold text-amber-500 dark:text-amber-400 flex items-center space-x-1">
                  <AlertTriangle className="w-3.5 h-3.5 mr-1" /> Risk Considerations:
                </span>
                <ul className="list-disc list-inside text-muted-foreground pl-1 space-y-0.5">
                  {message.riskFactors.map((rf: string, idx: number) => (
                    <li key={idx}>{rf}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Actions Bar */}
            <div className="flex items-center justify-between border-t border-border/40 pt-2 text-[10px] text-muted-foreground font-mono">
              <span>{new Date(message.timestamp).toLocaleTimeString()}</span>
              <button onClick={handleCopy} className="p-1 hover:text-foreground cursor-pointer flex items-center space-x-1">
                {copied ? <Check className="w-3 h-3 text-emerald-600 dark:text-emerald-400" /> : <Copy className="w-3 h-3" />}
                <span>Copy Response</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
