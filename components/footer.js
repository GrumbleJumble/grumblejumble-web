import React from 'react';
import { Github, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="w-full mt-16 pt-8 pb-12 border-t border-slate-800/80">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
        
        {/* Creator Credits */}
        <div className="flex items-center gap-1.5 flex-wrap justify-center sm:justify-start">
          <span>GrumbleJumble originally created with</span>
          <Heart className="w-3.5 h-3.5 text-brand-accent1 fill-brand-accent1 inline animate-pulse" />
          <span>by</span>
          <a
            href="https://ivanwhuang.me/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-brand-secondary hover:text-white transition-colors underline-offset-4 hover:underline"
          >
            Ivan Huang
          </a>
          <span>&</span>
          <a
            href="https://github.com/pundoraa"
            target="_blank"
            rel="noopener noreferrer"
            className="text-brand-secondary hover:text-white transition-colors underline-offset-4 hover:underline"
          >
            Roy Jou
          </a>
        </div>

        {/* Links & Attributions */}
        <div className="flex items-center gap-4">
          <span className="text-slate-400">
            Powered by Foursquare Places
          </span>
          <span className="text-slate-400">•</span>
          <a
            href="https://github.com/GrumbleJumble/GrumbleJumble"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-slate-400 hover:text-white transition-colors"
          >
            <Github className="w-4 h-4" />
            <span>GitHub</span>
          </a>
        </div>

      </div>
    </footer>
  );
}
