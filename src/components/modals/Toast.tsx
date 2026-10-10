import React from 'react';
import { useApp } from '../../context/AppContext';

export const Toast: React.FC = () => {
  const { toast } = useApp();

  if (!toast.visible) return null;

  return (
    <div className="fixed top-16 left-1/2 -translate-x-1/2 z-[100] pointer-events-none transition-all duration-300 transform translate-y-0 opacity-100 flex items-center gap-1.5 bg-[#27313f]/95 text-[#eaf1ff] px-4 py-2 rounded-full shadow-2xl backdrop-blur-md max-w-[90vw] animate-in fade-in slide-in-from-top-2">
      <span 
        className="material-symbols-outlined text-[18px] text-[#fda625] flex-shrink-0"
        style={{ fontVariationSettings: "'FILL' 1" }}
      >
        check_circle
      </span>
      <span className="text-xs font-medium text-white truncate">
        {toast.message}
      </span>
    </div>
  );
};
