'use client';

import React from 'react';
import Image from 'next/image';
import { MapPin, Navigation, Sparkles } from 'lucide-react';

export default function Navbar({ locationLabel, isDetectingLocation, onRequestGps, onOpenLocationModal }) {
  return (
    <header className="w-full mb-8 pt-2">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-3 px-5 rounded-2xl glass-panel shadow-lg shadow-black/20">
        
        {/* Brand / Logo */}
        <div className="flex items-center gap-3.5 group cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <div className="relative w-11 h-11 flex-shrink-0 transition-transform duration-300 group-hover:scale-105">
            <Image
              src="/logo.svg"
              alt="GrumbleJumble"
              fill
              className="object-contain drop-shadow-[0_2px_8px_rgba(91,192,222,0.35)]"
              priority
            />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="text-2xl font-bold tracking-tight text-white">Grumble</span>
              <span className="text-2xl font-bold tracking-tight bg-gradient-to-r from-brand-accent1 to-brand-accent2 bg-clip-text text-transparent">
                Jumble
              </span>
            </div>
            <span className="text-xs text-slate-400 font-medium tracking-wide">
              The cure for meal indecision
            </span>
          </div>
        </div>

        {/* Location Indicator & Quick Refresh */}
        <div className="flex items-center gap-2">
          <div 
            onClick={onOpenLocationModal}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700/60 text-xs text-slate-300 hover:text-white transition-all cursor-pointer shadow-inner"
            title="Click to edit or change location"
          >
            <MapPin className="w-3.5 h-3.5 text-brand-secondary" />
            <span className="font-medium max-w-[160px] sm:max-w-[200px] truncate">
              {isDetectingLocation ? 'Detecting location...' : (locationLabel || 'Detecting area...')}
            </span>
            <span className="text-[10px] uppercase font-semibold text-brand-secondary/80 bg-brand-primary/20 px-1.5 py-0.5 rounded">
              Edit
            </span>
          </div>

          <button
            type="button"
            onClick={onRequestGps}
            aria-label="Use device GPS location"
            title="Use exact GPS location"
            className="p-1.5 rounded-full bg-slate-800/80 hover:bg-brand-primary/30 border border-slate-700/60 hover:border-brand-secondary/50 text-slate-400 hover:text-brand-secondary transition-all"
          >
            <Navigation className="w-4 h-4" />
          </button>
        </div>

      </div>
    </header>
  );
}
