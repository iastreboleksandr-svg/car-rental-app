interface SectionProps {
  title: string;
  children: React.ReactNode;
}

export function Section({ title, children }: SectionProps) {
  return (
    <div className="border-t border-border-default pt-5">
      <p className="text-xs font-semibold text-text-muted uppercase tracking-widest mb-4">
        {title}
      </p>
      {children}
    </div>
  );
}