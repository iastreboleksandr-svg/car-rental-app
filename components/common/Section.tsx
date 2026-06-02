interface SectionProps {
  title: string;
  children: React.ReactNode;
}

export function Section({ title, children }: SectionProps) {
  return (
    <div className="border-t border-gray-100 pt-5">
      <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-4">
        {title}
      </p>
      {children}
    </div>
  );
}
