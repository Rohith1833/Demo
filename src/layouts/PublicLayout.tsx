import React from 'react';
import { useHackathon } from '../context/HackathonContext';
import { ArrowRight, Terminal } from 'lucide-react';

export const PublicLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { currentRoute, navigate } = useHackathon();

  return (
    <div className="min-h-screen bg-[#09090b] text-[#fafafa] flex flex-col font-sans">
      {/* Public Header */}
      <header className="sticky top-0 z-40 bg-[#09090b]/95 backdrop-blur-sm border-b border-[#27272a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <button
              onClick={() => navigate('/')}
              className="flex items-center gap-2.5 text-left group"
            >
              <div className="w-8 h-8 rounded-md bg-[#2563eb] flex items-center justify-center text-white font-mono font-semibold text-sm">
                HF
              </div>
              <div>
                <span className="font-semibold text-sm tracking-tight text-[#fafafa] block">
                  HackFlow
                </span>
                <span className="text-[11px] text-[#71717a] block leading-none">
                  NexHack 2026
                </span>
              </div>
            </button>

            <nav className="hidden md:flex items-center gap-1 text-sm text-[#a1a1aa]">
              <button
                onClick={() => navigate('/')}
                className={`px-3 py-1.5 rounded-md transition-colors ${
                  currentRoute === '/'
                    ? 'text-[#fafafa] font-medium bg-[#18181b]'
                    : 'hover:text-[#fafafa] hover:bg-[#111113]'
                }`}
              >
                Overview
              </button>
              <button
                onClick={() => navigate('/problems')}
                className={`px-3 py-1.5 rounded-md transition-colors ${
                  currentRoute.startsWith('/problems')
                    ? 'text-[#fafafa] font-medium bg-[#18181b]'
                    : 'hover:text-[#fafafa] hover:bg-[#111113]'
                }`}
              >
                Problem Statements
              </button>
              <button
                onClick={() => navigate('/results')}
                className={`px-3 py-1.5 rounded-md transition-colors ${
                  currentRoute === '/results'
                    ? 'text-[#fafafa] font-medium bg-[#18181b]'
                    : 'hover:text-[#fafafa] hover:bg-[#111113]'
                }`}
              >
                Results & Showcase
              </button>
            </nav>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={() => navigate('/login')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md border transition-colors ${
                currentRoute === '/login'
                  ? 'bg-[#18181b] text-[#fafafa] border-[#3f3f46]'
                  : 'text-[#a1a1aa] border-[#27272a] hover:text-[#fafafa] hover:bg-[#111113]'
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => navigate('/register')}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md bg-[#2563eb] text-white hover:bg-blue-600 transition-colors shadow-sm"
            >
              Register Now
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 w-full">{children}</main>

      {/* Public Footer */}
      <footer className="border-t border-[#27272a] bg-[#0c0c0e] py-8 text-xs text-[#71717a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 rounded bg-[#18181b] border border-[#27272a] flex items-center justify-center text-[#a1a1aa]">
              <Terminal className="w-3.5 h-3.5" />
            </div>
            <span>
              NexHack 2026 • Organized by XYZ Institute of Technology, Bengaluru
            </span>
          </div>

          <div className="flex items-center gap-6">
            <button onClick={() => navigate('/problems')} className="hover:text-[#a1a1aa] transition-colors">
              Tracks
            </button>
            <button onClick={() => navigate('/results')} className="hover:text-[#a1a1aa] transition-colors">
              Leaderboard
            </button>
            <button onClick={() => navigate('/login')} className="hover:text-[#a1a1aa] transition-colors">
              Portal Login
            </button>
            <span>Internal College Operating Platform</span>
          </div>
        </div>
      </footer>
    </div>
  );
};
