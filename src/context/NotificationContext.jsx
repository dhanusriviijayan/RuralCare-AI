import React, { createContext, useContext, useState } from 'react';
import { CheckCircle2, AlertTriangle, Info, X, BellRing } from 'lucide-react';

const NotificationContext = createContext();

export function NotificationProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const addToast = (message, type = 'info', title = '') => {
    const id = Date.now() + Math.random();
    setToasts(prev => [...prev, { id, message, type, title }]);
    setTimeout(() => {
      removeToast(id);
    }, 4500);
  };

  const removeToast = (id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  return (
    <NotificationContext.Provider value={{ addToast, removeToast }}>
      {children}
      {/* Global Toast Container */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col space-y-3 max-w-md w-full px-4 pointer-events-none">
        {toasts.map(toast => (
          <div
            key={toast.id}
            className={`pointer-events-auto p-4 rounded-xl shadow-2xl backdrop-blur-md border transition-all duration-300 flex items-start space-x-3 transform translate-y-0 animate-bounce-short ${
              toast.type === 'success'
                ? 'bg-emerald-900/90 border-emerald-500/50 text-emerald-100'
                : toast.type === 'warning'
                ? 'bg-amber-900/90 border-amber-500/50 text-amber-100'
                : toast.type === 'error'
                ? 'bg-rose-900/90 border-rose-500/50 text-rose-100'
                : 'bg-sky-900/90 border-sky-500/50 text-sky-100'
            }`}
          >
            <div className="mt-0.5">
              {toast.type === 'success' && <CheckCircle2 className="w-5 h-5 text-emerald-400" />}
              {toast.type === 'warning' && <AlertTriangle className="w-5 h-5 text-amber-400" />}
              {toast.type === 'error' && <AlertTriangle className="w-5 h-5 text-rose-400" />}
              {toast.type === 'info' && <BellRing className="w-5 h-5 text-sky-400" />}
            </div>
            <div className="flex-1 text-sm">
              {toast.title && <div className="font-semibold mb-0.5">{toast.title}</div>}
              <div>{toast.message}</div>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </NotificationContext.Provider>
  );
}

export const useNotification = () => useContext(NotificationContext);
