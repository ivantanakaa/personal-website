'use client';

import GlassCard from '../ui/GlassCard';
import { Sparkles } from 'lucide-react';

interface SkillCardProps {
  skill: string;
  highlight: boolean;
}

export function SkillCard({ skill, highlight }: SkillCardProps) {
  return (
    <GlassCard 
      hover={true} 
      className={`text-center py-3 sm:py-4 relative overflow-hidden ${
        highlight 
          ? 'border-2 border-accent-primary/50 bg-accent-primary/5 print:border-amber-600 print:bg-amber-50' 
          : 'print:border-slate-300'
      }`}
    >
      {highlight && (
        <div className="absolute top-1 right-1 print:hidden">
          <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-accent-primary animate-pulse" />
        </div>
      )}
      <p className={`text-sm sm:text-base font-medium ${
        highlight 
          ? 'text-accent-light print:text-amber-800 print:font-bold' 
          : 'text-text-primary print:text-slate-700'
      }`}>
        {skill}
      </p>
    </GlassCard>
  );
}
