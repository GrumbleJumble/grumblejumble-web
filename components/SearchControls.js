'use client';

import React from 'react';
import { Utensils, Coffee, User, Users, Sparkles, Navigation, SlidersHorizontal, MapPin } from 'lucide-react';
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

  const getDriveTimeEstimate = (miles) => {
    if (miles <= 2) return 'Walkable or ~5 min drive';
    if (miles <= 5) return '~10–12 min drive';
    if (miles <= 10) return '~15–20 min drive';
    return '~25+ min drive';
  };

  return (
    <div className="w-full flex flex-col items-center">
      
      {/* Hero Headline */}
      <div className="text-center mb-8 max-w-xl">
        <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight mb-3">
          Can't decide what to{' '}
          <span className="bg-gradient-to-r from-brand-accent1 to-brand-accent2 bg-clip-text text-transparent font-['Playwrite_AR'] italic pr-1">
            {mode === 'thirsty' ? 'drink?' : 'eat?'}
          </span>
        </h1>
        <p className="text-base text-slate-300">
          Pick your vibe below or just hit Jumble to let fate decide your next spot.
        </p>
      </div>

      {/* Main Glass Configuration Card */}
      <div className="w-full max-w-2xl glass-panel rounded-3xl p-6 sm:p-8 shadow-2xl space-y-7 transition-all duration-300">
        
        {/* 1. Mode Selector: Hungry vs Thirsty */}
        <div className="space-y-2.5">
          <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            What are you craving?
          </label>
          <div className="grid grid-cols-2 gap-3 p-1.5 bg-slate-900/80 rounded-2xl border border-slate-800">
            <button
              type="button"
              onClick={() => handleModeChange('hungry')}
              className={`flex items-center justify-center gap-2.5 py-3 px-4 rounded-xl text-sm font-bold transition-all duration-200 ${
                mode === 'hungry'
                  ? 'bg-gradient-to-r from-brand-primary to-brand-secondary text-white shadow-lg shadow-brand-primary/30'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Utensils className="w-4 h-4" />
              <span>Hungry (Food)</span>
            </button>

            <button
              type="button"
              onClick={() => handleModeChange('thirsty')}
              className={`flex items-center justify-center gap-2.5 py-3 px-4 rounded-xl text-sm font-bold transition-all duration-200 ${
                mode === 'thirsty'
                  ? 'bg-gradient-to-r from-brand-accent1 to-brand-accent2 text-slate-950 shadow-lg shadow-brand-accent1/30 font-extrabold'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Coffee className="w-4 h-4" />
              <span>Thirsty (Drinks & Cafe)</span>
            </button>
          </div>
        </div>

        {/* 2. Party Size Selector */}
        <div className="space-y-2.5">
          <div className="flex items-center justify-between">
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Who is eating?
            </label>
            <span className="text-xs text-brand-secondary/80">
              Adapts venue capacity
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {GROUP_SIZES.map((group) => {
              const isSelected = groupSize === group.id;
              return (
                <button
                  key={group.id}
                  type="button"
                  onClick={() => setGroupSize(group.id)}
                  className={`flex flex-col items-start p-3 rounded-xl border text-left transition-all duration-200 ${
                    isSelected
                      ? 'border-brand-secondary bg-brand-primary/20 text-white shadow-sm'
                      : 'border-slate-800/80 bg-slate-900/60 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                  }`}
                >
                  <span className={`text-sm font-bold ${isSelected ? 'text-brand-secondary' : 'text-slate-200'}`}>
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

        {/* 3. Category / Cuisine Chips */}
        <div className="space-y-2.5">
          <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            {mode === 'thirsty' ? 'Drink Category' : 'Major Cuisine'}
          </label>
          <div className="flex flex-wrap gap-2 max-h-36 overflow-y-auto pr-1">
            {currentCategories.map((cat) => {
              const isSelected = category === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setCategory(cat.id)}
                  className={`py-1.5 px-3.5 rounded-full text-xs font-medium transition-all ${
                    isSelected
                      ? 'bg-slate-200 text-slate-900 font-bold shadow'
                      : 'bg-slate-800/80 text-slate-300 hover:text-white hover:bg-slate-700/80 border border-slate-700/50'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* 4. Distance / Radius Slider */}
        <div className="space-y-3 pt-1">
          <div className="flex items-center justify-between">
            <label htmlFor="radius-slider" className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Search Radius
            </label>
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400">
                {getDriveTimeEstimate(radius)}
              </span>
              <span className="px-2.5 py-0.5 rounded-md bg-brand-primary/30 border border-brand-secondary/40 text-brand-secondary text-xs font-bold font-mono">
                {radius} {radius === 1 ? 'Mile' : 'Miles'}
              </span>
            </div>
          </div>

          <input
            id="radius-slider"
            type="range"
            min="1"
            max="25"
            step="1"
            value={radius}
            onChange={(e) => setRadius(parseInt(e.target.value, 10))}
            className="w-full cursor-pointer"
          />

          <div className="flex justify-between text-[11px] text-slate-400 font-medium px-1">
            <span>1 mi (Walking)</span>
            <span>5 mi (Standard)</span>
            <span>15 mi</span>
            <span>25 mi (Road trip)</span>
          </div>
        </div>

        {/* 5. Big Jumble CTA Button */}
        <div className="pt-2">
          <button
            type="button"
            onClick={onJumble}
            disabled={isLoading}
            className={`w-full py-4 px-6 rounded-2xl font-black text-lg tracking-wide uppercase transition-all duration-300 flex items-center justify-center gap-3 shadow-xl ${
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
