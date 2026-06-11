'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { CheckCircle2, XCircle, X } from 'lucide-react';

interface ToastProps {
  message: string;
  type?: 'success' | 'error';
  duration?: number;
  onClose: () => void;
}

export function Toast({ message, type = 'success', duration = 4000, onClose }: ToastProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const raf = requestAnimationFrame(() => setVisible(true));
    const timer = window.setTimeout(onClose, duration);
    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(timer);
    };
  }, [duration, onClose]);

  if (typeof document === 'undefined') return null;
  const portal = document.getElementById('toast-portal');
  if (!portal) return null;

  const isSuccess = type === 'success';

  return createPortal(
    <div
      role="status"
      aria-live="polite"
      className="pointer-events-none fixed inset-x-0 bottom-6 z-[100] flex justify-center px-4"
    >
      <div
        className={[
          'pointer-events-auto flex items-center gap-3 rounded-xl border px-4 py-3 shadow-lg',
          'transition-all duration-300 ease-out',
          visible ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0',
          'motion-reduce:transition-none',
          isSuccess
            ? 'border-brand/20 bg-bg-card text-text-base'
            : 'border-border-error bg-bg-card text-text-base',
        ].join(' ')}
      >
        <span className={isSuccess ? 'text-brand' : 'text-text-error'} aria-hidden="true">
          {isSuccess ? <CheckCircle2 size={18} /> : <XCircle size={18} />}
        </span>
        <span className="text-sm font-medium">{message}</span>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="ml-1 text-text-muted transition-colors hover:text-text-secondary"
        >
          <X size={15} />
        </button>
      </div>
    </div>,
    portal,
  );
}

export default Toast;
