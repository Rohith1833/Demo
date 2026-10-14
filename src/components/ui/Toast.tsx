import React from 'react';
import { useHackathon } from '../../context/HackathonContext';
import { CheckCircle2, AlertCircle, Info, AlertTriangle, X } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useHackathon();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2.5 max-w-md w-full pointer-events-none">
      {toasts.map((toast) => {
        const icon =
          toast.type === 'success' ? (
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          ) : toast.type === 'error' ? (
            <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />
          ) : toast.type === 'warning' ? (
            <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0" />
          ) : (
            <Info className="w-5 h-5 text-indigo-400 shrink-0" />
          );

        const borderClass =
          toast.type === 'success'
            ? 'border-emerald-500/30 bg-emerald-950/40 text-emerald-100'
            : toast.type === 'error'
            ? 'border-rose-500/30 bg-rose-950/40 text-rose-100'
            : toast.type === 'warning'
            ? 'border-amber-500/30 bg-amber-950/40 text-amber-100'
            : 'border-indigo-500/30 bg-indigo-950/40 text-indigo-100';

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto backdrop-blur-xl border rounded-xl p-3.5 shadow-2xl flex items-start gap-3 transition-all duration-200 animate-in fade-in slide-in-from-bottom-2 ${borderClass}`}
          >
            {icon}
            <div className="flex-1 min-w-0">
              {toast.title && <h5 className="font-semibold text-xs text-white/90 mb-0.5">{toast.title}</h5>}
              <p className="text-xs text-slate-300 leading-relaxed break-words">{toast.message}</p>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-slate-400 hover:text-white transition-colors p-0.5 rounded shrink-0"
              title="Close"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
