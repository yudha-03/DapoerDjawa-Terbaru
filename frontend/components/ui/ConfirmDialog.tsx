'use client';

import { useState, useCallback, useEffect, createContext, useContext, useRef } from 'react';
import { AlertTriangle, X } from 'lucide-react';

type ConfirmOptions = {
  title: string;
  description?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: 'danger' | 'default';
};

type ConfirmFn = (options: ConfirmOptions) => Promise<boolean>;

const ConfirmContext = createContext<ConfirmFn | null>(null);

export function useConfirm(): ConfirmFn {
  const fn = useContext(ConfirmContext);
  if (!fn) throw new Error('useConfirm must be used within ConfirmProvider');
  return fn;
}

export function ConfirmProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<(ConfirmOptions & { open: boolean }) | null>(null);
  const [visible, setVisible] = useState(false);
  const resolveRef = useRef<((value: boolean) => void) | null>(null);
  const cancelBtnRef = useRef<HTMLButtonElement>(null);

  const confirm = useCallback<ConfirmFn>((options) => {
    return new Promise<boolean>((resolve) => {
      resolveRef.current = resolve;
      setState({ ...options, open: true });
    });
  }, []);

  const handleClose = (result: boolean) => {
    resolveRef.current?.(result);
    resolveRef.current = null;
    setVisible(false);
  };

  // Trigger enter transition on next frame after mount
  useEffect(() => {
    if (state?.open) {
      requestAnimationFrame(() => {
        setVisible(true);
        cancelBtnRef.current?.focus();
      });
    }
  }, [state?.open]);

  // Close on Escape key
  useEffect(() => {
    if (!state?.open) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose(false);
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [state?.open]);

  const handleTransitionEnd = () => {
    if (!visible) {
      setState(null);
    }
  };

  return (
    <ConfirmContext.Provider value={confirm}>
      {children}
      {state?.open && (
        <div
          role="alertdialog"
          aria-modal="true"
          aria-labelledby="confirm-title"
          aria-describedby={state.description ? 'confirm-desc' : undefined}
          className={`fixed inset-0 z-[100] flex items-center justify-center bg-black/50 px-4 transition-opacity duration-150 ${
            visible ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={() => handleClose(false)}
          onTransitionEnd={handleTransitionEnd}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className={`w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl border border-gray-100 transition-all duration-150 ${
              visible
                ? 'opacity-100 scale-100 translate-y-0'
                : 'opacity-0 scale-95 translate-y-2.5'
            }`}
          >
            <div className="flex items-start gap-4">
              <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${state.variant === 'danger' ? 'bg-red-100' : 'bg-gray-100'}`}>
                <AlertTriangle className={`h-5 w-5 ${state.variant === 'danger' ? 'text-red-600' : 'text-gray-600'}`} />
              </div>
              <div className="flex-1 min-w-0">
                <h3 id="confirm-title" className="text-base font-bold text-gray-900">{state.title}</h3>
                {state.description && (
                  <p id="confirm-desc" className="mt-1.5 text-sm text-gray-500 leading-relaxed">{state.description}</p>
                )}
              </div>
              <button onClick={() => handleClose(false)} className="shrink-0 rounded-lg p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition">
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="mt-5 flex gap-2.5 justify-end">
              <button
                ref={cancelBtnRef}
                onClick={() => handleClose(false)}
                className="rounded-xl px-4 py-2.5 text-sm font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 transition active:scale-[0.98]"
              >
                {state.cancelLabel || 'Batal'}
              </button>
              <button
                onClick={() => handleClose(true)}
                className={`rounded-xl px-4 py-2.5 text-sm font-bold text-white transition active:scale-[0.98] ${
                  state.variant === 'danger'
                    ? 'bg-red-600 hover:bg-red-700'
                    : 'bg-black hover:bg-gray-800'
                }`}
              >
                {state.confirmLabel || 'Ya, Lanjutkan'}
              </button>
            </div>
          </div>
        </div>
      )}
    </ConfirmContext.Provider>
  );
}
