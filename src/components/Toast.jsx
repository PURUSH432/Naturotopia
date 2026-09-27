import React from 'react';
import { CheckCircle2, Sparkles, X } from 'lucide-react';

export function Toast({ toast, onDismiss }) {
  if (!toast) return null;

  return (
    <div className="toast-container">
      <div className="toast-item">
        <CheckCircle2 size={18} color="var(--secondary-fixed)" />
        <span>{toast.message}</span>
        <button 
          onClick={onDismiss} 
          style={{ background: 'none', border: 'none', color: '#ffffff', opacity: 0.7, cursor: 'pointer', marginLeft: '8px' }}
        >
          <X size={14} />
        </button>
      </div>
    </div>
  );
}
