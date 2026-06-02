'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Section } from '@/components/common/Section';

interface CarDescriptionProps {
  title: string;
  description: string;
  showMoreLabel: string;
  showLessLabel: string;
}

export function CarDescription({ title, description, showMoreLabel, showLessLabel }: CarDescriptionProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <Section title={title}>
      <p className={`text-sm text-gray-500 leading-relaxed ${!expanded ? 'line-clamp-3' : ''}`}>
        {description}
      </p>
      <button
        onClick={() => setExpanded(!expanded)}
        className="flex items-center gap-1 text-sm text-[#48C964] hover:text-[#32a84d] mt-2 transition-colors"
      >
        {expanded ? showLessLabel : showMoreLabel}
        {expanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
      </button>
    </Section>
  );
}
