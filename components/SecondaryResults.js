'use client';

import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Star, Navigation, ArrowRight } from 'lucide-react';

export default function SecondaryResults({ places, activeIndex, onSelectPlace }) {
  const [isOpen, setIsOpen] = useState(false);

  if (!places || places.length <= 1) return null;

  const otherPlaces = places
    .map((place, idx) => ({ ...place, originalIdx: idx }))
    .filter(p => p.originalIdx !== activeIndex);

  return (
    <div className="w-full max-w-2xl mt-6">
      
      {/* Toggle Bar */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-3 px-5 rounded-2xl glass-panel border border-slate-800 hover:border-slate-700 flex items-center justify-between text-xs font-semibold text-slate-300 hover:text-white transition-all shadow-md"
      >
        <span>
          Peek other {otherPlaces.length} options in this batch
        </span>
        <div className="flex items-center gap-1.5 text-brand-secondary">
          <span>{isOpen ? 'Hide' : 'Show All'}</span>
          {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </div>
      </button>

      {/* Expandable Grid */}
      {isOpen && (
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 animate-fade-in">
          {otherPlaces.map((place) => (
            <div
              key={place.fsq_id || place.name}
              className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800/80 hover:border-brand-secondary/40 transition-all flex flex-col justify-between space-y-3 group"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-brand-secondary">
                    {place.category}
                  </span>
                  <h4 className="text-sm font-bold text-white group-hover:text-brand-secondary transition-colors line-clamp-1">
                    {place.name}
                  </h4>
                  <p className="text-xs text-slate-400 line-clamp-1">
                    {place.address}
                  </p>
                </div>

                {place.rating && (
                  <div className="flex items-center gap-1 text-[11px] font-bold text-amber-300 bg-amber-500/10 px-2 py-0.5 rounded-md flex-shrink-0">
                    <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                    <span>{place.rating}</span>
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-slate-800 text-xs">
                <span className="text-slate-400 font-mono">
                  {place.distanceMiles}
                </span>

                <button
                  type="button"
                  onClick={() => onSelectPlace(place.originalIdx)}
                  className="flex items-center gap-1 text-xs font-bold text-brand-secondary hover:text-white transition-colors"
                >
                  <span>Select</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}
