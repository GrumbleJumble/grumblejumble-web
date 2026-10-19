'use client';

import React from 'react';
import { Navigation, X } from 'lucide-react';

export default function LocationPromptModal({
  isOpen,
  onClose,
  onAcceptGps,
  onDeclineGps,
  guessedLocationLabel
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fade-in">
      <div 
        className="w-full max-w-md glass-panel rounded-3xl p-6 sm:p-8 shadow-2xl border border-brand-secondary/30 relative text-center space-y-6"
        role="dialog"
        aria-modal="true"
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 p-1.5 rounded-full bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
          aria-label="Close"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Icon Header */}
        <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-tr from-brand-primary/30 to-brand-secondary/30 border border-brand-secondary/40 flex items-center justify-center shadow-lg shadow-brand-primary/20">
          <Navigation className="w-8 h-8 text-brand-secondary animate-pulse" />
        </div>

        {/* Title & Description */}
        <div className="space-y-2">
          <h3 className="text-2xl font-black text-white tracking-tight">
            Use Precise Location?
          </h3>
          <p className="text-sm text-slate-300 leading-relaxed max-w-xs mx-auto">
            To get the most accurate recommendations within your distance, GrumbleJumble works best with your exact GPS.
          </p>
        </div>

        {/* Primary Accept Action */}
        <div className="space-y-3 pt-2">
          <button
            type="button"
            onClick={onAcceptGps}
            className="w-full py-3.5 px-6 rounded-2xl font-black text-sm uppercase tracking-wider bg-gradient-to-r from-brand-accent1 to-brand-accent2 text-slate-950 hover:brightness-110 shadow-lg shadow-brand-accent1/25 hover:scale-[1.01] active:scale-[0.99] transition-all duration-200 flex items-center justify-center gap-2.5 cursor-pointer"
          >
            <Navigation className="w-4 h-4 fill-slate-950" />
            <span>Enable Precise Location</span>
          </button>

          {/* Small Text Decline Option */}
          <div>
            <button
              type="button"
              onClick={onDeclineGps}
              className="text-xs text-slate-400 hover:text-white underline underline-offset-4 transition-colors cursor-pointer py-1"
            >
              Decline & use guessed location ({guessedLocationLabel || 'Local Area'})
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
