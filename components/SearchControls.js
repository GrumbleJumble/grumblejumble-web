'use client';

import React from 'react';
import { Utensils, Coffee, ChevronDown, Sparkles } from 'lucide-react';
import { HUNGRY_CATEGORIES, THIRSTY_CATEGORIES } from '@/lib/foursquare';
import { GROUP_SIZES } from '@/lib/groupFilter';

export default function SearchControls({
  mode,
  setMode,
  radius,
  setRadius,
  category,
  setCategory,
  groupSize,
  setGroupSize,
  onJumble,
  isLoading
}) {
  const currentCategories = mode === 'thirsty' ? THIRSTY_CATEGORIES : HUNGRY_CATEGORIES;

  const handleModeChange = (newMode) => {
    setMode(newMode);
    setCategory('all'); // Reset category when switching between hungry/thirsty
  };

  const isSolo = groupSize === 'solo';
  const hungryText = isSolo ? "I'm Hungry" : "We're Hungry";
  const thirstyText = isSolo ? "I'm Thirsty" : "We're Thirsty";

  const getDriveTimeEstimate = (miles) => {
    if (miles <= 2) return '~5 min drive';
    if (miles <= 5) return '~10–12 min drive';
    if (miles <= 10) return '~15–20 min drive';
    if (miles <= 15) return '~20–30 min drive';
    return '~30–40 min drive';
  };

  return (
    <div className="w-full flex flex-col items-center">
      
      {/* Hero Headline */}
      <div className="text-center mb-3 sm:mb-4 w-full max-w-3xl px-2">
        <h1 className="text-[clamp(1.3rem,4.5vw,2.75rem)] font-black text-white tracking-tight mb-1 whitespace-nowrap">
          Can't{' '}
          <span className="inline-block bg-gradient-to-r from-brand-accent1 to-brand-accent2 bg-clip-text text-transparent font-['Playwrite_AR'] font-normal pr-2 pl-1 -mr-1 py-0.5">
            decide
          </span>{' '}
          what you want?
        </h1>
        <p className="text-xs sm:text-sm text-slate-300">
          Just select a few options (if you want), and let us pick for you!
        </p>
      </div>

      {/* Main Glass Configuration Card */}
      <div className="w-full max-w-2xl glass-panel rounded-2xl sm:rounded-3xl p-4.5 sm:p-6 shadow-2xl space-y-3.5 sm:space-y-4.5 transition-all duration-300">
        
        {/* 1. Mode Selector: Hungry vs Thirsty */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            How are you feeling?
          </label>
          <div className="grid grid-cols-2 gap-2.5 p-1 bg-slate-900/80 rounded-xl sm:rounded-2xl border border-slate-800">
            <button
              type="button"
              onClick={() => handleModeChange('hungry')}
              className={`flex items-center justify-center gap-2 py-2 sm:py-2.5 px-3.5 rounded-lg sm:rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 ${
                mode === 'hungry'
                  ? 'bg-gradient-to-r from-brand-primary to-brand-secondary text-white shadow-lg shadow-brand-primary/30'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Utensils className="w-4 h-4" />
              <span>{hungryText}</span>
            </button>

            <button
              type="button"
              onClick={() => handleModeChange('thirsty')}
              className={`flex items-center justify-center gap-2 py-2 sm:py-2.5 px-3.5 rounded-lg sm:rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 ${
                mode === 'thirsty'
                  ? 'bg-gradient-to-r from-brand-accent1 to-brand-accent2 text-slate-950 shadow-lg shadow-brand-accent1/30 font-extrabold'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Coffee className="w-4 h-4" />
              <span>{thirstyText}</span>
            </button>
          </div>
        </div>

        {/* 2. Party Size Selector */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            {mode === 'thirsty' ? "Who's thirsty?" : "Who's hungry?"}
          </label>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {GROUP_SIZES.map((group) => {
              const isSelected = groupSize === group.id;
              return (
                <button
                  key={group.id}
                  type="button"
                  onClick={() => setGroupSize(group.id)}
                  className={`flex flex-col items-start p-2.5 sm:p-3 rounded-xl border text-left transition-all duration-200 ${
                    isSelected
                      ? 'border-brand-secondary bg-brand-primary/20 text-white shadow-sm'
                      : 'border-slate-800/80 bg-slate-900/60 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                  }`}
                >
                  <span className={`text-xs sm:text-sm font-bold ${isSelected ? 'text-brand-secondary' : 'text-slate-200'}`}>
                    {group.label}
                  </span>
                  <span className="text-[11px] text-slate-400 mt-0.5 leading-snug">
                    {group.sub}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 3. Category / Cuisine Dropdown */}
        <div className="space-y-1.5">
          <label htmlFor="craving-select" className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            Got a craving?
          </label>
          <div className="relative">
            <select
              id="craving-select"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full py-2.5 sm:py-3 px-4 rounded-xl bg-slate-900/80 border border-slate-700/80 hover:border-slate-600 text-white text-xs sm:text-sm font-semibold focus:outline-none focus:border-brand-secondary focus:ring-1 focus:ring-brand-secondary transition-all appearance-none cursor-pointer pr-10 shadow-inner"
            >
              {currentCategories.map((cat) => (
                <option key={cat.id} value={cat.id} className="bg-slate-900 text-white">
                  {cat.label}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3.5 text-slate-400">
              <ChevronDown className="w-4 h-4" />
            </div>
          </div>
        </div>

        {/* 4. Distance / Radius Slider */}
        <div className="space-y-1.5 sm:space-y-2 pt-0.5">
          <div className="flex items-center justify-between">
            <label htmlFor="radius-slider" className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              How far do you want to drive?
            </label>
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400">
                {getDriveTimeEstimate(radius)}
              </span>
              <span className="px-2 py-0.5 rounded-md bg-brand-primary/30 border border-brand-secondary/40 text-brand-secondary text-xs font-bold font-mono">
                {radius} {radius === 1 ? 'Mile' : 'Miles'}
              </span>
            </div>
          </div>

          <div className="relative w-full">
            <input
              id="radius-slider"
              type="range"
              min="1"
              max="20"
              step="1"
              value={radius}
              onChange={(e) => setRadius(parseInt(e.target.value, 10))}
              className="w-full cursor-pointer block"
            />

            {/* Mathematically aligned distance milestone labels */}
            <div className="relative w-full h-4 mt-1.5 text-[11px] text-slate-400 font-medium">
              {[
                { val: 1, label: '1 mile' },
                { val: 5, label: '5 miles' },
                { val: 10, label: '10 miles' },
                { val: 15, label: '15 miles' },
                { val: 20, label: '20 miles' }
              ].map((mark) => {
                const fraction = (mark.val - 1) / 19;
                const isSelected = radius === mark.val;
                
                // Position calculations accounting for 22px thumb (11px radius)
                let style;
                let alignClass;
                if (mark.val === 1) {
                  style = { left: '0%' };
                  alignClass = 'text-left';
                } else if (mark.val === 20) {
                  style = { right: '0%' };
                  alignClass = 'text-right';
                } else {
                  style = { left: `calc(11px + ${fraction * 100}% - ${fraction * 22}px)` };
                  alignClass = '-translate-x-1/2 text-center';
                }

                return (
                  <button
                    key={mark.val}
                    type="button"
                    style={style}
                    onClick={() => setRadius(mark.val)}
                    className={`absolute transform transition-colors cursor-pointer select-none whitespace-nowrap ${alignClass} ${
                      isSelected 
                        ? 'text-brand-secondary font-bold' 
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {mark.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* 5. Big Jumble CTA Button */}
        <div className="pt-1 sm:pt-1.5">
          <button
            type="button"
            onClick={onJumble}
            disabled={isLoading}
            className={`w-full py-3 sm:py-3.5 px-6 rounded-xl sm:rounded-2xl font-black text-base sm:text-lg tracking-wide uppercase transition-all duration-300 flex items-center justify-center gap-2.5 shadow-xl ${
              isLoading
                ? 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
                : 'bg-gradient-to-r from-brand-accent1 via-[#f3834f] to-brand-accent2 text-slate-950 hover:brightness-110 hover:shadow-brand-accent1/25 hover:scale-[1.01] active:scale-[0.99] cursor-pointer'
            }`}
          >
            {isLoading ? (
              <>
                <div className="w-5 h-5 border-2 border-slate-400 border-t-transparent rounded-full animate-spin" />
                <span>Jumbling Restaurants...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5 fill-slate-950" />
                <span>Let's Jumble!</span>
              </>
            )}
          </button>
        </div>

      </div>

    </div>
  );
}
