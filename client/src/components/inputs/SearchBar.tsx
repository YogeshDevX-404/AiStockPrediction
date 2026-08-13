import React from 'react';
import { Search, X } from 'lucide-react';
import { cn } from '@/utils/cn';

export interface SearchBarProps {
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
  className?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChange,
  placeholder = 'Search stocks, symbols, news or AI signals...',
  className,
}) => {
  return (
    <div className={cn('relative flex items-center w-full max-w-md', className)}>
      <Search className="absolute left-3.5 w-4 h-4 text-muted-foreground pointer-events-none" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-card/60 border border-border/80 rounded-full pl-10 pr-9 py-2 text-xs md:text-sm text-foreground placeholder:text-muted-foreground/60 transition-all focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 glass-panel"
      />
      {value && (
        <button
          onClick={() => onChange('')}
          className="absolute right-3 text-muted-foreground hover:text-foreground cursor-pointer"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      )}
    </div>
  );
};
