import React, { useState } from 'react';
import { useHackathon } from '../../context/HackathonContext';
import {
  Layers,
  Search,
  Award,
  Terminal,
  LogOut,
  ExternalLink,
  Menu,
  X,
  Compass,
  FileCode2,
  Users,
  CreditCard,
  Send,
  Sliders,
  CheckCircle2,
} from 'lucide-react';
import { NotificationsDropdown } from './NotificationsDropdown';
import { GlobalSearchModal } from './GlobalSearchModal';

export const Navbar: React.FC = () => {
  const {
    currentRoute,
    navigate,
    currentRole,
    currentPersona,
    currentParticipant,
    settings,
  } = useHackathon();

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <header className="sticky top-[33px] z-30 bg-[#090a0f]/90 border-b border-slate-800/80 backdrop-blur-xl transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-4">
          {/* Brand Logo & Event Badge */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/')}
              className="flex items-center gap-2.5 text-left group transition-all"
            >
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-600 to-purple-500 flex items-center justify-center shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-transform">
                <Layers className="w-4 h-4 text-white" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-base tracking-tight text-white group-hover:text-indigo-300 transition-colors">
                    HackFlow
                  </span>
                  <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-indigo-950/80 border border-indigo-500/30 text-indigo-400">
                    2026
                  </span>
                </div>
                <div className="text-[10px] text-slate-400 hidden sm:block -mt-0.5">
                  NexHack • XYZ Institute of Technology
                </div>
              </div>
            </button>
          </div>

          {/* Center Navigation Links based on role */}
          <nav className="hidden md:flex items-center gap-1 text-xs">
            {/* Common public links */}
            <button
              onClick={() => navigate('/')}
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                currentRoute === '/' ? 'text-white font-medium bg-slate-850' : 'text-slate-400 hover:text-white'
              }`}
            >
              Landing Page
            </button>

            {currentRole === 'participant' && (
              <>
                <button
                  onClick={() => navigate('/dashboard')}
                  className={`px-3 py-1.5 rounded-lg transition-colors ${
                    currentRoute === '/dashboard'
                      ? 'text-white font-medium bg-indigo-600/20 text-indigo-300'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  My Dashboard
                </button>
                <button
                  onClick={() => navigate('/team')}
                  className={`px-3 py-1.5 rounded-lg transition-colors ${
                    currentRoute === '/team'
                      ? 'text-white font-medium bg-indigo-600/20 text-indigo-300'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Team
                </button>
                <button
                  onClick={() => navigate('/problems')}
                  className={`px-3 py-1.5 rounded-lg transition-colors ${
                    currentRoute === '/problems'
                      ? 'text-white font-medium bg-indigo-600/20 text-indigo-300'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Problem Statements
                </button>
                <button
                  onClick={() => navigate('/submit')}
                  className={`px-3 py-1.5 rounded-lg transition-colors ${
                    currentRoute === '/submit'
                      ? 'text-white font-medium bg-indigo-600/20 text-indigo-300'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Project Submission
                </button>
              </>
            )}

            {currentRole === 'organizer' && (
              <>
                <button
                  onClick={() => navigate('/admin')}
                  className={`px-3 py-1.5 rounded-lg transition-colors ${
                    currentRoute === '/admin'
                      ? 'text-white font-medium bg-indigo-600/20 text-indigo-300'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Command Center
                </button>
                <button
                  onClick={() => navigate('/admin/applications')}
                  className={`px-3 py-1.5 rounded-lg transition-colors ${
                    currentRoute === '/admin/applications'
                      ? 'text-white font-medium bg-indigo-600/20 text-indigo-300'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Screening
                </button>
                <button
                  onClick={() => navigate('/admin/judging')}
                  className={`px-3 py-1.5 rounded-lg transition-colors ${
                    currentRoute === '/admin/judging'
                      ? 'text-white font-medium bg-indigo-600/20 text-indigo-300'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Judging Room
                </button>
                <button
                  onClick={() => navigate('/admin/analytics')}
                  className={`px-3 py-1.5 rounded-lg transition-colors ${
                    currentRoute === '/admin/analytics'
                      ? 'text-white font-medium bg-indigo-600/20 text-indigo-300'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Analytics
                </button>
              </>
            )}

            {currentRole === 'judge' && (
              <button
                onClick={() => navigate('/judge')}
                className={`px-3 py-1.5 rounded-lg transition-colors ${
                  currentRoute === '/judge'
                    ? 'text-white font-medium bg-cyan-600/20 text-cyan-300'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Judge Scoring Console
              </button>
            )}

            {currentRole === 'superadmin' && (
              <button
                onClick={() => navigate('/superadmin/events')}
                className={`px-3 py-1.5 rounded-lg transition-colors ${
                  currentRoute === '/superadmin/events'
                    ? 'text-white font-medium bg-rose-600/20 text-rose-300'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Multi-Year Events
              </button>
            )}

            {/* Results Button */}
            <button
              onClick={() => navigate('/results')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-colors ${
                currentRoute === '/results'
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                  : 'text-slate-400 hover:text-amber-300'
              }`}
            >
              <Award className="w-3.5 h-3.5 text-amber-400" />
              <span>Results & Winners</span>
              {settings.isResultsPublished && (
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              )}
            </button>
          </nav>

          {/* Right Action Icons & Persona Pill */}
          <div className="flex items-center gap-2">
            {/* Global Search Button */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-slate-200 border border-slate-800 text-xs transition-colors"
              title="Global Search (Cmd + K)"
            >
              <Search className="w-3.5 h-3.5" />
              <span className="hidden sm:inline text-[11px]">Search</span>
              <kbd className="hidden lg:inline text-[9px] bg-slate-800 text-slate-400 px-1 rounded font-mono">
                ⌘K
              </kbd>
            </button>

            {/* Notifications Dropdown */}
            <NotificationsDropdown />

            {/* Registration CTA if on public page */}
            {currentRoute === '/' && (
              <button
                onClick={() => navigate('/register')}
                className="hidden sm:flex items-center gap-1 px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-md shadow-indigo-600/30 transition-all hover:scale-102"
              >
                Register
              </button>
            )}

            {/* Mobile Hamburger toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-slate-800 bg-[#090a0f] p-4 space-y-2 animate-in slide-in-from-top-2">
            <button
              onClick={() => {
                navigate('/');
                setMobileMenuOpen(false);
              }}
              className="w-full text-left px-3 py-2 rounded-lg text-sm text-slate-300 hover:bg-slate-900"
            >
              Public Landing Page
            </button>
            <button
              onClick={() => {
                navigate('/register');
                setMobileMenuOpen(false);
              }}
              className="w-full text-left px-3 py-2 rounded-lg text-sm text-indigo-400 hover:bg-slate-900 font-medium"
            >
              Participant Registration Wizard
            </button>
            <button
              onClick={() => {
                navigate('/dashboard');
                setMobileMenuOpen(false);
              }}
              className="w-full text-left px-3 py-2 rounded-lg text-sm text-slate-300 hover:bg-slate-900"
            >
              Participant Dashboard
            </button>
            <button
              onClick={() => {
                navigate('/admin');
                setMobileMenuOpen(false);
              }}
              className="w-full text-left px-3 py-2 rounded-lg text-sm text-purple-400 hover:bg-slate-900"
            >
              Organizer Command Center
            </button>
            <button
              onClick={() => {
                navigate('/judge');
                setMobileMenuOpen(false);
              }}
              className="w-full text-left px-3 py-2 rounded-lg text-sm text-cyan-400 hover:bg-slate-900"
            >
              Judge Evaluation Console
            </button>
            <button
              onClick={() => {
                navigate('/results');
                setMobileMenuOpen(false);
              }}
              className="w-full text-left px-3 py-2 rounded-lg text-sm text-amber-400 hover:bg-slate-900"
            >
              Published Results & Winners
            </button>
          </div>
        )}
      </header>

      {/* Global Search Dialog */}
      <GlobalSearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
};
