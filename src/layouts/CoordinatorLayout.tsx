import React, { useState } from 'react';
import { useHackathon } from '../context/HackathonContext';
import { GlobalSearchModal } from '../components/layout/GlobalSearchModal';
import {
  LayoutDashboard,
  Users,
  CreditCard,
  Layers,
  FileCode,
  QrCode,
  LifeBuoy,
  Activity,
  Send,
  Award,
  CheckSquare,
  BarChart2,
  Trophy,
  MessageSquare,
  Mail,
  FileCheck,
  TrendingUp,
  History,
  Shield,
  Settings,
  Database,
  Search,
  ExternalLink,
  ChevronRight,
  Menu,
  X,
} from 'lucide-react';

export const CoordinatorLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const {
    currentRoute,
    navigate,
    applications,
    teams,
    mentorRequests,
    operationalIssues,
    submissions,
    evaluations,
    judges,
  } = useHackathon();

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Operational metrics for sidebar badges
  const pendingAppsCount = applications.filter((a) => a.status === 'pending').length;
  const unpaidSelectedCount = applications.filter((a) => a.status === 'selected' && a.paymentStatus !== 'verified').length;
  const waitingMentorsCount = mentorRequests.filter((r) => r.status === 'Waiting').length;
  const openIssuesCount = operationalIssues.filter((i) => i.status === 'Open' || i.status === 'In Progress').length;
  const pendingSubmissionsCount = teams.filter((t) => t.submissionStatus !== 'submitted').length;
  const incompleteJudgingCount = Math.max(0, judges.length * 3 - evaluations.length);

  const navGroups = [
    {
      title: 'OVERVIEW',
      items: [
        { label: 'Command Center', path: '/admin', icon: LayoutDashboard },
      ],
    },
    {
      title: 'PARTICIPANTS',
      items: [
        { label: 'Applications', path: '/admin/applications', icon: Users, badge: pendingAppsCount, badgeColor: 'bg-amber-500/10 text-amber-400 border-amber-500/20' },
        { label: 'Participants', path: '/admin/participants', icon: Users },
        { label: 'Payments', path: '/admin/payments', icon: CreditCard, badge: unpaidSelectedCount > 0 ? unpaidSelectedCount : undefined, badgeColor: 'bg-amber-500/10 text-amber-400 border-amber-500/20' },
        { label: 'Teams', path: '/admin/teams', icon: Layers },
      ],
    },
    {
      title: 'HACKATHON',
      items: [
        { label: 'Problem Statements', path: '/admin/problems', icon: FileCode },
        { label: 'Check-In Desk', path: '/admin/checkin', icon: QrCode },
        { label: 'Mentor Requests', path: '/admin/mentor-requests', icon: LifeBuoy, badge: waitingMentorsCount > 0 ? waitingMentorsCount : undefined, badgeColor: 'bg-rose-500/10 text-rose-400 border-rose-500/20' },
        { label: 'Live Operations', path: '/admin/operations', icon: Activity, badge: openIssuesCount > 0 ? openIssuesCount : undefined, badgeColor: 'bg-blue-500/10 text-blue-400 border-blue-500/20' },
        { label: 'Submissions', path: '/admin/submissions', icon: Send, badge: pendingSubmissionsCount > 0 ? pendingSubmissionsCount : undefined, badgeColor: 'bg-zinc-800 text-zinc-400 border-zinc-700' },
      ],
    },
    {
      title: 'JUDGING',
      items: [
        { label: 'Judges Roster', path: '/admin/judges', icon: Award },
        { label: 'Judging Control', path: '/admin/judging', icon: CheckSquare, badge: incompleteJudgingCount > 0 ? incompleteJudgingCount : undefined, badgeColor: 'bg-amber-500/10 text-amber-400 border-amber-500/20' },
        { label: 'Leaderboard', path: '/admin/leaderboard', icon: BarChart2 },
        { label: 'Winner Selection', path: '/admin/winners', icon: Trophy },
      ],
    },
    {
      title: 'COMMUNICATION',
      items: [
        { label: 'WhatsApp Helper', path: '/admin/whatsapp', icon: MessageSquare },
        { label: 'Email Mockup', path: '/admin/communication', icon: Mail },
      ],
    },
    {
      title: 'POST EVENT',
      items: [
        { label: 'Certificates', path: '/admin/certificates', icon: FileCheck },
        { label: 'Analytics & Funnel', path: '/admin/analytics', icon: TrendingUp },
      ],
    },
    {
      title: 'ADMINISTRATION',
      items: [
        { label: 'Activity Audit Log', path: '/admin/activity', icon: History },
        { label: 'Permissions Matrix', path: '/admin/permissions', icon: Shield },
        { label: 'Event Settings', path: '/admin/settings', icon: Settings },
        { label: 'Data Management', path: '/admin/data', icon: Database },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-[#09090b] text-[#fafafa] flex flex-col font-sans">
      {/* Top Header */}
      <header className="sticky top-0 z-30 bg-[#09090b] border-b border-[#27272a] h-12 flex items-center justify-between px-4 sm:px-6">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-1.5 rounded-md hover:bg-[#18181b] text-[#a1a1aa]"
          >
            {isMobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>

          <button
            onClick={() => navigate('/admin')}
            className="flex items-center gap-2 text-left"
          >
            <div className="w-6 h-6 rounded-md bg-[#2563eb] flex items-center justify-center text-white font-mono font-semibold text-xs">
              HF
            </div>
            <span className="font-semibold text-xs text-[#fafafa] hidden sm:inline">
              HackFlow
            </span>
            <span className="text-[#52525b] hidden sm:inline">/</span>
            <span className="text-xs text-[#a1a1aa] font-medium">Coordinator Console</span>
          </button>

          <div className="hidden lg:flex items-center gap-1.5 px-2 py-0.5 rounded bg-[#111113] border border-[#27272a] text-[11px] font-mono text-[#a1a1aa]">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>NexHack 2026 • LIVE</span>
          </div>
        </div>

        {/* Global Search Bar */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsSearchOpen(true)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-[#111113] border border-[#27272a] hover:border-[#3f3f46] text-xs text-[#71717a] hover:text-[#a1a1aa] transition-colors w-44 sm:w-64 justify-between"
          >
            <div className="flex items-center gap-1.5">
              <Search className="w-3.5 h-3.5" />
              <span>Search everything...</span>
            </div>
            <kbd className="hidden sm:inline-block text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#18181b] border border-[#27272a] text-[#71717a]">
              ⌘K
            </kbd>
          </button>

          <button
            onClick={() => navigate('/results')}
            className="text-xs text-[#71717a] hover:text-[#a1a1aa] flex items-center gap-1 transition-colors hidden sm:flex"
            title="Open Public Results"
          >
            <span>Live Results</span>
            <ExternalLink className="w-3 h-3" />
          </button>
        </div>
      </header>

      {/* Main Body: Sidebar + Content */}
      <div className="flex-1 flex w-full">
        {/* Desktop Sidebar */}
        <aside
          className={`
            fixed md:sticky top-12 z-20 h-[calc(100vh-3rem)] w-64 bg-[#09090b] border-r border-[#27272a] flex flex-col justify-between py-4 overflow-y-auto transition-transform
            ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
          `}
        >
          <div className="space-y-6 px-3">
            {navGroups.map((group) => (
              <div key={group.title}>
                <p className="px-2 mb-1.5 text-[10px] font-mono font-medium tracking-wider text-[#71717a] uppercase">
                  {group.title}
                </p>
                <div className="space-y-0.5">
                  {group.items.map((item) => {
                    const Icon = item.icon;
                    const isActive = currentRoute === item.path;
                    return (
                      <button
                        key={item.path}
                        onClick={() => {
                          navigate(item.path);
                          setIsMobileMenuOpen(false);
                        }}
                        className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-md text-xs font-medium transition-colors ${
                          isActive
                            ? 'bg-[#18181b] text-[#fafafa] border border-[#27272a]'
                            : 'text-[#a1a1aa] hover:text-[#fafafa] hover:bg-[#111113]'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#3b82f6]' : 'text-[#71717a]'}`} />
                          <span>{item.label}</span>
                        </div>
                        {item.badge !== undefined && (
                          <span
                            className={`text-[10px] font-mono font-medium px-1.5 py-0.2 rounded border ${
                              item.badgeColor || 'bg-[#18181b] text-[#a1a1aa] border-[#27272a]'
                            }`}
                          >
                            {item.badge}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          <div className="px-4 pt-4 mt-6 border-t border-[#18181b] text-[11px] text-[#52525b]">
            <p>XYZ Institute of Technology</p>
            <p className="font-mono text-[10px] text-[#71717a]">v2.4.0 • Enterprise Core</p>
          </div>
        </aside>

        {/* Content Area */}
        <main className="flex-1 w-full min-w-0 p-4 sm:p-6 lg:p-8 bg-[#09090b]">
          {children}
        </main>
      </div>

      {/* Global Search Modal */}
      <GlobalSearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </div>
  );
};
