import React from 'react';
import { useHackathon } from '../../context/HackathonContext';
import {
  LayoutDashboard,
  Users,
  CreditCard,
  UserCheck,
  FileCode2,
  QrCode,
  FolderGit2,
  Gavel,
  Scale,
  Award,
  Mail,
  BarChart3,
  Settings,
  Database,
  ShieldCheck,
  Trophy,
} from 'lucide-react';

interface SidebarItem {
  label: string;
  path: string;
  icon: React.ReactNode;
  badge?: string;
  badgeColor?: string;
}

interface SidebarGroup {
  group: string;
  items: SidebarItem[];
}

export const Sidebar: React.FC = () => {
  const { currentRoute, navigate, applications, teams, submissions, evaluations } = useHackathon();

  const pendingAppsCount = applications.filter((a) => a.status === 'pending').length;
  const pendingPaymentsCount = applications.filter(
    (a) => a.status === 'selected' && a.paymentStatus === 'pending'
  ).length;

  const navGroups: SidebarGroup[] = [
    {
      group: 'Core Operations',
      items: [
        {
          label: 'Command Center',
          path: '/admin',
          icon: <LayoutDashboard className="w-4 h-4" />,
          badge: 'LIVE',
          badgeColor: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
        },
        {
          label: 'Applications Screening',
          path: '/admin/applications',
          icon: <UserCheck className="w-4 h-4" />,
          badge: pendingAppsCount > 0 ? `${pendingAppsCount}` : undefined,
          badgeColor: 'bg-indigo-500/20 text-indigo-400 border-indigo-500/30',
        },
        {
          label: 'Payments & Revenue',
          path: '/admin/payments',
          icon: <CreditCard className="w-4 h-4" />,
          badge: pendingPaymentsCount > 0 ? `${pendingPaymentsCount}` : undefined,
          badgeColor: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
        },
        {
          label: 'Team Management',
          path: '/admin/teams',
          icon: <Users className="w-4 h-4" />,
        },
        {
          label: 'Problem Statements',
          path: '/admin/problems',
          icon: <FileCode2 className="w-4 h-4" />,
        },
        {
          label: 'Event Check-In (QR)',
          path: '/admin/checkin',
          icon: <QrCode className="w-4 h-4" />,
        },
      ],
    },
    {
      group: 'Judging & Submissions',
      items: [
        {
          label: 'Submissions Tracker',
          path: '/admin/submissions',
          icon: <FolderGit2 className="w-4 h-4" />,
          badge: `${submissions.length}`,
        },
        {
          label: 'Judge Management',
          path: '/admin/judges',
          icon: <Gavel className="w-4 h-4" />,
        },
        {
          label: 'Judging Control Center',
          path: '/admin/judging',
          icon: <Scale className="w-4 h-4" />,
        },
        {
          label: 'Internal Leaderboard',
          path: '/admin/leaderboard',
          icon: <Trophy className="w-4 h-4" />,
        },
        {
          label: 'Winner Selection',
          path: '/admin/winners',
          icon: <Award className="w-4 h-4" />,
        },
      ],
    },
    {
      group: 'Administration & System',
      items: [
        {
          label: 'Email & Broadcasts',
          path: '/admin/communication',
          icon: <Mail className="w-4 h-4" />,
        },
        {
          label: 'Analytics & Funnel',
          path: '/admin/analytics',
          icon: <BarChart3 className="w-4 h-4" />,
        },
        {
          label: 'Event Settings',
          path: '/admin/settings',
          icon: <Settings className="w-4 h-4" />,
        },
        {
          label: 'Role Permissions',
          path: '/admin/permissions',
          icon: <ShieldCheck className="w-4 h-4" />,
        },
        {
          label: 'Data & Danger Zone',
          path: '/admin/data',
          icon: <Database className="w-4 h-4" />,
          badgeColor: 'bg-rose-500/20 text-rose-400 border-rose-500/30',
        },
      ],
    },
  ];

  return (
    <aside className="w-64 shrink-0 bg-[#0c0d14] border-r border-slate-800/80 min-h-[calc(100vh-87px)] p-3.5 space-y-6 hidden lg:block">
      {/* Event instance info */}
      <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
            Active Event
          </span>
          <span className="flex items-center gap-1 text-[9px] font-semibold text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-1.5 py-0.2 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            LIVE 24H
          </span>
        </div>
        <div className="text-sm font-semibold text-white mt-1">NexHack 2026</div>
        <div className="text-[11px] text-slate-400 truncate">XYZ Institute of Technology</div>
      </div>

      {/* Navigation links */}
      <div className="space-y-5">
        {navGroups.map((group) => (
          <div key={group.group} className="space-y-1">
            <div className="px-2 text-[10px] uppercase font-bold tracking-wider text-slate-400 mb-1.5">
              {group.group}
            </div>
            {group.items.map((item) => {
              const isActive = currentRoute === item.path;
              return (
                <button
                  key={item.path}
                  onClick={() => navigate(item.path)}
                  className={`w-full flex items-center justify-between px-2.5 py-2 rounded-lg text-xs font-medium transition-all group ${
                    isActive
                      ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-600/30 font-semibold'
                      : 'text-slate-400 hover:text-slate-100 hover:bg-slate-850'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className={isActive ? 'text-white' : 'text-slate-400 group-hover:text-indigo-400'}>
                      {item.icon}
                    </span>
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span
                      className={`text-[10px] font-mono px-1.5 py-0.2 rounded border ${
                        isActive
                          ? 'bg-indigo-700/80 text-white border-indigo-400/30'
                          : item.badgeColor || 'bg-slate-800 text-slate-400 border-slate-700'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        ))}
      </div>
    </aside>
  );
};
