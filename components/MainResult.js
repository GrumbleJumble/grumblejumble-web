'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { 
  MapPin, 
  Navigation, 
  Phone, 
  Globe, 
  Star, 
  RotateCw, 
  ArrowLeft, 
  CheckCircle2, 
  Sparkles,
  ExternalLink 
} from 'lucide-react';

export default function MainResult({
  business,
  currentIndex,
  totalInBatch,
  onNextResult,
  onResetSearch,
  groupSize
}) {
  const [imgError, setImgError] = useState(false);
  const [isRotating, setIsRotating] = useState(false);

  if (!business) return null;

  const handleNext = () => {
    setIsRotating(true);
    setTimeout(() => setIsRotating(false), 500);
    onNextResult();
  };

  const getPriceString = (priceLevel) => {
    if (!priceLevel) return '$$';
    return '$'.repeat(Math.max(1, Math.min(4, priceLevel)));
  };

  const fallbackPhoto = "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1000&q=80";

  return (
    <div className="w-full flex flex-col items-center animate-fade-in">
      
      {/* Result Status Banner */}
      <div className="flex items-center justify-between w-full max-w-2xl mb-4 px-2">
        <button
          type="button"
          onClick={onResetSearch}
          className="flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-white transition-colors py-1 px-2.5 rounded-lg hover:bg-slate-800"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Adjust Criteria</span>
        </button>

        <div className="flex items-center gap-2 text-xs font-mono text-brand-secondary">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>Candidate {currentIndex + 1} of {totalInBatch}</span>
        </div>
      </div>

      {/* Hero Result Card */}
      <div className="w-full max-w-2xl glass-panel rounded-3xl overflow-hidden shadow-2xl border border-brand-secondary/30 transition-all duration-300">
        
        {/* Business Hero Image */}
        <div className="relative w-full h-64 sm:h-80 bg-slate-900 overflow-hidden">
          <img
            src={imgError ? fallbackPhoto : (business.photoUrl || fallbackPhoto)}
            alt={business.name}
            onError={() => setImgError(true)}
            className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0c141c] via-[#0c141c]/40 to-transparent" />

          {/* Group Fit Badge on Image */}
          {business.groupMatchReason && (
            <div className="absolute top-4 left-4 flex items-center gap-1.5 bg-slate-900/85 backdrop-blur-md border border-brand-secondary/40 text-brand-secondary text-xs font-semibold px-3 py-1 rounded-full shadow-lg">
              <CheckCircle2 className="w-3.5 h-3.5 text-brand-secondary" />
              <span>{business.groupMatchReason}</span>
            </div>
          )}

          {/* Distance Badge */}
          <div className="absolute top-4 right-4 bg-slate-900/85 backdrop-blur-md border border-slate-700/60 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
            📍 {business.distanceMiles}
          </div>

          {/* Bottom Title Overlay */}
          <div className="absolute bottom-4 left-6 right-6">
            <span className="inline-block text-xs font-bold uppercase tracking-wider text-brand-accent2 mb-1">
              {business.category}
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight drop-shadow-md">
              {business.name}
            </h2>
          </div>
        </div>

        {/* Business Details & Action Bar */}
        <div className="p-6 sm:p-8 space-y-6">
          
          {/* Metadata Row: Rating, Price, Address */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-800">
            <div className="flex items-center gap-3">
              {business.rating && (
                <div className="flex items-center gap-1.5 bg-amber-500/15 border border-amber-500/30 text-amber-300 px-2.5 py-1 rounded-lg text-xs font-bold">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span>{business.rating} / 10</span>
                </div>
              )}
              <div className="text-xs font-bold text-slate-300 bg-slate-800/80 px-2.5 py-1 rounded-lg border border-slate-700">
                {getPriceString(business.price)}
              </div>
            </div>

            <div className="flex items-center gap-1.5 text-xs text-slate-400 max-w-[320px] truncate">
              <MapPin className="w-3.5 h-3.5 text-brand-secondary flex-shrink-0" />
              <span className="truncate">{business.address}</span>
            </div>
          </div>

          {/* Business Description (if present) */}
          {business.description && (
            <p className="text-sm text-slate-300 leading-relaxed italic">
              "{business.description}"
            </p>
          )}

          {/* Quick Action Links */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            <a
              href={business.addressLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-brand-primary/20 hover:bg-brand-primary/35 border border-brand-secondary/40 text-brand-secondary hover:text-white text-xs font-bold transition-all"
            >
              <Navigation className="w-3.5 h-3.5" />
              <span>Get Directions</span>
            </a>

            {business.phone ? (
              <a
                href={`tel:${business.phone}`}
                className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 text-slate-200 hover:text-white text-xs font-bold transition-all"
              >
                <Phone className="w-3.5 h-3.5 text-emerald-400" />
                <span>Call Venue</span>
              </a>
            ) : (
              <div className="flex items-center justify-center py-2.5 px-4 rounded-xl bg-slate-900/40 border border-slate-800/60 text-slate-500 text-xs font-medium">
                No phone listed
              </div>
            )}

            {business.website ? (
              <a
                href={business.website}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 text-slate-200 hover:text-white text-xs font-bold transition-all"
              >
                <Globe className="w-3.5 h-3.5 text-sky-400" />
                <span>Visit Website</span>
              </a>
            ) : (
              <div className="flex items-center justify-center py-2.5 px-4 rounded-xl bg-slate-900/40 border border-slate-800/60 text-slate-500 text-xs font-medium">
                No website listed
              </div>
            )}
          </div>

          {/* Primary "Decide For Me Again" Re-roll CTA */}
          <div className="pt-2 flex flex-col gap-3">
            <button
              type="button"
              onClick={handleNext}
              className="w-full py-4 px-6 rounded-2xl font-black text-base uppercase tracking-wider bg-gradient-to-r from-brand-accent1 to-brand-accent2 text-slate-950 hover:brightness-110 shadow-lg shadow-brand-accent1/25 hover:scale-[1.01] active:scale-[0.99] transition-all duration-200 flex items-center justify-center gap-3 cursor-pointer"
            >
              <RotateCw className={`w-5 h-5 text-slate-950 ${isRotating ? 'animate-spin' : ''}`} />
              <span>Decide For Me Again! (Spin Next)</span>
            </button>

            <p className="text-center text-[11px] text-slate-400">
              Cached locally • Instant roll without repeated API calls
            </p>
          </div>

        </div>

      </div>

    </div>
  );
}