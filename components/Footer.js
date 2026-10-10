import { Heart } from 'lucide-react';

function GithubIcon({ className = "w-4 h-4" }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

export default function Footer({ className = "" }) {
  return (
    <footer className={`w-full border-t border-slate-800/60 ${className || 'py-3 sm:py-0 sm:h-[5dvh] sm:min-h-9 flex items-center'}`}>
      <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-1.5 sm:gap-4 text-xs text-slate-400 text-center sm:text-left">
        
        {/* Creator Credits */}
        <div className="flex items-center flex-wrap justify-center sm:justify-start text-[11px] sm:text-xs text-slate-400">
          <span>Originally created with</span>
          <Heart className="w-3.5 h-3.5 text-brand-accent1 fill-brand-accent1 inline animate-pulse mx-1.5" />
          <span>
            by{' '}
            <a
              href="https://ivanwhuang.me/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-secondary hover:text-white transition-colors underline-offset-4 hover:underline"
            >
              Ivan Huang
            </a>
            ,{' '}
            <a
              href="https://github.com/pundoraa"
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-secondary hover:text-white transition-colors underline-offset-4 hover:underline"
            >
              Roy Jou
            </a>
            , and{' '}
            <span className="text-brand-secondary font-medium">Michael Chen</span>
          </span>
        </div>

        {/* Links & Attributions */}
        <div className="flex items-center justify-center gap-3 sm:gap-4 text-[11px] sm:text-xs">
          <span className="text-slate-400">
            Powered by Foursquare Places
          </span>
          <span className="text-slate-500">•</span>
          <a
            href="https://github.com/GrumbleJumble/GrumbleJumble"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-slate-400 hover:text-white transition-colors"
          >
            <GithubIcon className="w-3.5 h-3.5" />
            <span>GitHub</span>
          </a>
        </div>

      </div>
    </footer>
  );
}
