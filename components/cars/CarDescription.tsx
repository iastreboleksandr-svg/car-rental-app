'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Section } from '@/components/common/Section';

interface CarDescriptionProps {
  description: string;
}

export function CarDescription({ description }: CarDescriptionProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <Section title="Описание">
      <p className={`text-sm text-gray-500 leading-relaxed ${!expanded ? 'line-clamp-3' : ''}`}>
        {description}
      </p>
      <button
        onClick={() => setExpanded(!expanded)}
        className="flex items-center gap-1 text-sm text-blue-500 hover:text-blue-600 mt-2 transition-colors"
      >
        {expanded ? 'Скрыть' : 'Показать больше'}
        {expanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
      </button>
    </Section>
  );
}
