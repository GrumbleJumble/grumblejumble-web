'use client';

import React, { useState } from 'react';
import { X, MapPin, Navigation, Search } from 'lucide-react';

export default function LocationModal({
  isOpen,
  onClose,
  onLocationSelected,
  onRequestGps,
  currentLocationLabel
}) {
  const [query, setQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [searchError, setSearchError] = useState('');

  if (!isOpen) return null;

  const handleManualSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    setIsSearching(true);
    setSearchError('');

    try {
      // Use free OpenStreetMap Nominatim geocoder
      const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=1`, {
        headers: { 'Accept': 'application/json' }
      });
      const data = await res.json();

      if (data && data.length > 0) {
        const place = data[0];
        const lat = parseFloat(place.lat);
        const lng = parseFloat(place.lon);
        const displayName = place.display_name.split(',').slice(0, 2).join(',');

        onLocationSelected({
          lat,
          lng,
          label: displayName.trim() || query.trim()
        });
        onClose();
      } else {
        setSearchError('Location not found. Try entering a city and state or zip code.');
      }
    } catch (err) {
      // Fallback for offline / network issues: approximate known major cities
      setSearchError('Could not geocode address. Please use GPS or try again.');
    } finally {
      setIsSearching(false);
    }
  };

  const handleGpsClick = () => {
    onRequestGps();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-md glass-panel rounded-3xl p-6 sm:p-7 shadow-2xl border border-slate-700/80 space-y-5">
        
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-brand-secondary" />
            <h3 className="text-lg font-bold text-white">Change Location</h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Current Location Note */}
        <p className="text-xs text-slate-400">
          Currently searching near: <span className="font-semibold text-white">{currentLocationLabel || 'Unknown'}</span>
        </p>

        {/* Manual Address Form */}
        <form onSubmit={handleManualSearch} className="space-y-3">
          <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            Enter City, Neighborhood, or Zip Code
          </label>
          <div className="relative">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="e.g. Austin, TX or 90210"
              className="w-full py-3 pl-4 pr-11 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-brand-secondary transition-colors"
            />
            <button
              type="submit"
              disabled={isSearching}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-brand-secondary hover:text-white transition-colors"
            >
              <Search className="w-4 h-4" />
            </button>
          </div>

          {searchError && (
            <p className="text-xs text-brand-accent1 font-medium">{searchError}</p>
          )}

          <button
            type="submit"
            disabled={isSearching}
            className="w-full py-2.5 px-4 rounded-xl font-bold text-xs bg-slate-800 hover:bg-slate-700 text-white transition-colors"
          >
            {isSearching ? 'Finding location...' : 'Set Custom Location'}
          </button>
        </form>

        <div className="relative flex py-1 items-center">
          <div className="flex-grow border-t border-slate-800"></div>
          <span className="flex-shrink mx-3 text-[11px] text-slate-400 uppercase">Or</span>
          <div className="flex-grow border-t border-slate-800"></div>
        </div>

        {/* GPS Button */}
        <button
          type="button"
          onClick={handleGpsClick}
          className="w-full py-3 px-4 rounded-xl border border-brand-secondary/40 bg-brand-primary/20 hover:bg-brand-primary/30 text-brand-secondary hover:text-white font-bold text-xs transition-all flex items-center justify-center gap-2"
        >
          <Navigation className="w-4 h-4" />
          <span>Use My Exact GPS Location</span>
        </button>

      </div>
    </div>
  );
}
