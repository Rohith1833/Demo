import React from 'react';
import { useHackathon } from '../context/HackathonContext';
import {
  LayoutDashboard,
  Users,
  FileCode,
  LifeBuoy,
  Send,
  User,
  Clock,
  ExternalLink,
} from 'lucide-react';

export const ParticipantLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { currentRoute, navigate, currentParticipant, currentTeam, lifecycleStage } = useHackathon();

  const navItems = [
    { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { label: 'Team', path: '/team', icon: Users },
    { label: 'Problem Statements', path: '/problems', icon: FileCode },
    { label: 'Help Desk', path: '/help', icon: LifeBuoy },
    { label: 'Submission', path: '/submit', icon: Send },
    { label: 'Profile', path: '/profile', icon: User },
  ];

  return (
    <div className="min-h-screen bg-[#09090b] text-[#fafafa] flex flex-col font-sans">
      {/* Participant Navbar */}
      <header className="sticky top-0 z-40 bg-[#09090b] border-b border-[#27272a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="h-14 flex items-center justify-between gap-4">
            {/* Brand + Portal Label */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => navigate('/dashboard')}
                className="flex items-center gap-2.5 text-left"
              >
                <div className="w-7 h-7 rounded-md bg-[#2563eb] flex items-center justify-center text-white font-mono font-semibold text-xs">
                  HF
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-sm tracking-tight text-[#fafafa]">
                      HackFlow
                    </span>
                    <span className="text-[10px] font-mono uppercase tracking-wider px-1.5 py-0.5 rounded bg-[#18181b] border border-[#27272a] text-[#a1a1aa]">
                      Participant
                    </span>
                  </div>
                </div>
              </button>
            </div>

            {/* Desktop Navigation Tabs */}
            <nav className="hidden md:flex items-center gap-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive =
                  currentRoute === item.path ||
                  (item.path === '/problems' && currentRoute.startsWith('/problems'));
                return (
                  <button
                    key={item.path}
                    onClick={() => navigate(item.path)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                      isActive
                        ? 'bg-[#18181b] text-[#fafafa] border border-[#27272a]'
                        : 'text-[#a1a1aa] hover:text-[#fafafa] hover:bg-[#111113]'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </nav>

            {/* Status & Identity Indicator */}
            <div className="flex items-center gap-3">
              {lifecycleStage === 'hackathon_live' && (
                <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#111113] border border-[#27272a] text-[11px] font-mono text-[#a1a1aa]">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  <Clock className="w-3 h-3 text-[#71717a]" />
                  <span>17h 42m remaining</span>
                </div>
              )}

              <button
                onClick={() => navigate('/profile')}
                className="flex items-center gap-2 px-2.5 py-1 rounded-md bg-[#111113] border border-[#27272a] hover:border-[#3f3f46] transition-colors text-left"
              >
                <div className="w-6 h-6 rounded bg-[#2563eb]/20 border border-[#2563eb]/40 text-[#3b82f6] flex items-center justify-center font-mono text-xs font-semibold">
                  {currentParticipant.name.charAt(0)}
                </div>
                <div className="hidden sm:block">
                  <p className="text-xs font-medium text-[#fafafa] leading-tight">
                    {currentParticipant.name}
                  </p>
                  <p className="text-[10px] font-mono text-[#71717a] leading-none">
                    {currentParticipant.participantId || currentParticipant.id}
                  </p>
                </div>
              </button>
            </div>
          </div>

          {/* Mobile Tab Navigation */}
          <div className="md:hidden flex items-center gap-1 overflow-x-auto py-2 border-t border-[#18181b] no-scrollbar">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive =
                currentRoute === item.path ||
                (item.path === '/problems' && currentRoute.startsWith('/problems'));
              return (
                <button
                  key={item.path}
                  onClick={() => navigate(item.path)}
                  className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium whitespace-nowrap transition-colors ${
                    isActive
                      ? 'bg-[#18181b] text-[#fafafa] border border-[#27272a]'
                      : 'text-[#a1a1aa] hover:text-[#fafafa]'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 py-6">
        {children}
      </main>

      {/* Static Participant Footer */}
      <footer className="border-t border-[#27272a] bg-[#0c0c0e] py-4 text-xs text-[#71717a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>NexHack 2026 • Official Participant Desk</span>
          <div className="flex items-center gap-4 text-[11px]">
            {currentTeam && <span>Team: <strong className="text-[#a1a1aa] font-medium">{currentTeam.name}</strong></span>}
            <button onClick={() => navigate('/results')} className="hover:text-[#a1a1aa] inline-flex items-center gap-1">
              Public Results <ExternalLink className="w-3 h-3" />
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
};
