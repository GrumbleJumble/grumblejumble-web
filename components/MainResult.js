'use client';

import React, { useState } from 'react';
import { 
  MapPin, 
  Navigation, 
  Phone, 
  Globe, 
  Star, 
  ArrowLeft, 
  CheckCircle2 
} from 'lucide-react';

export default function MainResult({
  business,
  onResetSearch
}) {
  const [imgError, setImgError] = useState(false);

  if (!business) return null;

  const getPriceString = (priceLevel) => {
    if (!priceLevel) return '$$';
    return '$'.repeat(Math.max(1, Math.min(4, priceLevel)));
  };

  const fallbackPhoto = "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1000&q=80";

  return (
    <div className="w-full flex flex-col items-center animate-fade-in">
      
      {/* Result Status Banner */}
      <div className="flex items-center justify-start w-full max-w-2xl mb-4 px-2">
        <button
          type="button"
          onClick={onResetSearch}
          className="flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-white transition-colors py-1.5 px-3 rounded-xl bg-slate-900/60 hover:bg-slate-800 border border-slate-800 shadow-sm"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Adjust Criteria</span>
        </button>
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
          {(() => {
            const actions = [
              business.addressLink ? {
                id: 'directions',
                label: 'Get Directions',
                href: business.addressLink,
                icon: Navigation,
                iconColor: 'text-brand-secondary',
                isExternal: true,
                primary: true
              } : null,
              business.phone ? {
                id: 'phone',
                label: 'Call Venue',
                href: `tel:${business.phone}`,
                icon: Phone,
                iconColor: 'text-emerald-400',
                isExternal: false,
                primary: false
              } : null,
              business.website ? {
                id: 'website',
                label: 'Visit Website',
                href: business.website,
                icon: Globe,
                iconColor: 'text-sky-400',
                isExternal: true,
                primary: false
              } : null
            ].filter(Boolean);

            const gridCols = actions.length === 1 
              ? 'grid-cols-1' 
              : actions.length === 2 
                ? 'grid-cols-1 sm:grid-cols-2' 
                : 'grid-cols-1 sm:grid-cols-3';

            return (
              <div className={`grid ${gridCols} gap-2.5 pt-1`}>
                {actions.map((action) => (
                  <a
                    key={action.id}
                    href={action.href}
                    target={action.isExternal ? '_blank' : undefined}
                    rel={action.isExternal ? 'noopener noreferrer' : undefined}
                    className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs font-bold transition-all ${
                      action.primary
                        ? 'bg-brand-primary/20 hover:bg-brand-primary/35 border border-brand-secondary/40 text-brand-secondary hover:text-white'
                        : 'bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 text-slate-200 hover:text-white'
                    }`}
                  >
                    <action.icon className={`w-3.5 h-3.5 ${action.iconColor}`} />
                    <span>{action.label}</span>
                  </a>
                ))}
              </div>
            );
          })()}

        </div>

      </div>

    </div>
  );
}