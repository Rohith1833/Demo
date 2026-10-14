import React from 'react';
import { useHackathon } from '../context/HackathonContext';
import { Shield, Calendar, History, Settings, Database, ArrowLeft } from 'lucide-react';

export const SuperAdminLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { currentRoute, navigate } = useHackathon();

  const navItems = [
    { label: 'Yearly Hackathons', path: '/superadmin/events', icon: Calendar },
    { label: 'Role Permissions', path: '/admin/permissions', icon: Shield },
    { label: 'System Audit Log', path: '/admin/activity', icon: History },
    { label: 'Data Management', path: '/admin/data', icon: Database },
  ];

  return (
    <div className="min-h-screen bg-[#09090b] text-[#fafafa] flex flex-col font-sans">
      {/* Super Admin Header */}
      <header className="sticky top-0 z-40 bg-[#09090b] border-b border-[#27272a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/superadmin/events')}
              className="flex items-center gap-2.5 text-left"
            >
              <div className="w-7 h-7 rounded-md bg-[#dc2626] flex items-center justify-center text-white font-mono font-semibold text-xs">
                SA
              </div>
              <div>
                <span className="font-semibold text-xs tracking-tight text-[#fafafa] block">
                  HackFlow
                </span>
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#ef4444] block leading-none">
                  Super Admin
                </span>
              </div>
            </button>

            <nav className="hidden md:flex items-center gap-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = currentRoute === item.path;
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
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/admin')}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[#111113] border border-[#27272a] text-xs text-[#a1a1aa] hover:text-[#fafafa] hover:border-[#3f3f46] transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Coordinator</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 py-6">
        {children}
      </main>

      {/* Super Admin Footer */}
      <footer className="border-t border-[#27272a] bg-[#0c0c0e] py-3 text-xs text-[#71717a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between text-[11px]">
          <span>XYZ Institute of Technology • Multi-Year Instance Management</span>
          <span className="font-mono text-[#52525b]">Instance: production-india-south</span>
        </div>
      </footer>
    </div>
  );
};
