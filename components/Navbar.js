'use client';

import React from 'react';
import Image from 'next/image';
import { MapPin, Navigation } from 'lucide-react';

export default function Navbar({ locationLabel, isDetectingLocation, onRequestGps, onOpenLocationModal, className = "" }) {
  return (
    <header className={`w-full ${className || 'py-2.5 sm:py-0 sm:h-[13dvh] sm:min-h-20 flex items-center'}`}>
      <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-2.5 sm:gap-4 py-2.5 sm:py-3.5 px-3.5 sm:px-6 rounded-2xl glass-panel shadow-lg shadow-black/20">
        
        {/* Brand / Logo */}
        <div className="flex items-center justify-center sm:justify-start gap-2.5 sm:gap-3.5 group cursor-pointer w-full sm:w-auto" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <div className="relative w-8 h-8 sm:w-11 sm:h-11 shrink-0 transition-transform duration-300 group-hover:scale-105">
            <Image
              src="/logo.svg"
              alt="GrumbleJumble"
              fill
              className="object-contain drop-shadow-[0_2px_8px_rgba(91,192,222,0.35)]"
              priority
            />
          </div>
          <div className="flex flex-col items-center sm:items-start">
            <div className="flex items-center">
              <span className="text-xl sm:text-[1.65rem] font-bold tracking-tight text-white leading-tight">Grumble</span>
              <span className="text-xl sm:text-[1.65rem] font-bold tracking-tight bg-gradient-to-r from-brand-accent1 to-brand-accent2 bg-clip-text text-transparent leading-tight">
                Jumble
              </span>
            </div>
            <span className="hidden sm:block text-xs sm:text-[13px] text-slate-400 font-medium tracking-wide">
              Less Thinking. More Eating.
            </span>
          </div>
        </div>

        {/* Location Indicator & Quick Refresh — Shifted to new line on mobile */}
        <div className="flex items-center justify-center sm:justify-end gap-2 sm:gap-2.5 w-full sm:w-auto">
          <div 
            onClick={onOpenLocationModal}
            className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-full bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700/60 text-xs sm:text-sm text-slate-300 hover:text-white transition-all cursor-pointer shadow-inner"
            title="Click to edit or change location"
          >
            <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-brand-secondary shrink-0" />
            <span className="font-medium max-w-[160px] sm:max-w-[220px] truncate">
              {isDetectingLocation ? 'Detecting...' : (locationLabel || 'Detecting area...')}
            </span>
            <span className="text-[10px] sm:text-xs uppercase font-semibold text-brand-secondary/80 bg-brand-primary/20 px-1.5 sm:px-2 py-0.5 rounded">
              Edit
            </span>
          </div>

          <button
            type="button"
            onClick={onRequestGps}
            aria-label="Use device GPS location"
            title="Use exact GPS location"
            className="p-1.5 sm:p-2 rounded-full bg-slate-800/80 hover:bg-brand-primary/30 border border-slate-700/60 hover:border-brand-secondary/50 text-slate-400 hover:text-brand-secondary transition-all shrink-0"
          >
            <Navigation className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </button>
        </div>

      </div>
    </header>
  );
}
