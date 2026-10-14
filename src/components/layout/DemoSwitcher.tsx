import React, { useState } from 'react';
import { useHackathon } from '../../context/HackathonContext';
import { DemoPersona } from '../../types';
import {
  ChevronDown,
  RotateCcw,
  User,
  CreditCard,
  Clock,
  Layers,
  Activity,
  Award,
  Shield,
  Eye,
  Sliders,
} from 'lucide-react';

export const DemoSwitcher: React.FC = () => {
  const {
    currentPersona,
    setPersona,
    resetAllData,
    settings,
    togglePublishResults,
    currentRoute,
    navigate,
  } = useHackathon();

  const [isOpen, setIsOpen] = useState(false);

  const personaList: { id: DemoPersona; label: string; role: string; desc: string; icon: React.ReactNode }[] = [
    {
      id: 'participant_under_review',
      label: 'Participant — Under Review',
      role: 'Meera Nair',
      desc: 'Application submitted, awaiting coordinator screening',
      icon: <Clock className="w-3.5 h-3.5 text-amber-400" />,
    },
    {
      id: 'participant_payment_pending',
      label: 'Participant — Payment Pending',
      role: 'Rahul Sharma',
      desc: 'Selected candidate; needs to complete ₹500 fee',
      icon: <CreditCard className="w-3.5 h-3.5 text-blue-400" />,
    },
    {
      id: 'participant_registered',
      label: 'Participant — Registered',
      role: 'Arjun Kumar',
      desc: 'Paid, Team formed, Problem selected, ready for hackathon',
      icon: <User className="w-3.5 h-3.5 text-emerald-400" />,
    },
    {
      id: 'participant_hackathon_live',
      label: 'Participant — Hackathon Live',
      role: 'Arjun Kumar',
      desc: 'Live event mode: Help Desk, Problem viewer, Submit Project',
      icon: <Activity className="w-3.5 h-3.5 text-rose-400" />,
    },
    {
      id: 'organizer',
      label: 'Coordinator',
      role: 'Core Organizing Team',
      desc: 'Full command center, screening, operations, judging, analytics',
      icon: <Sliders className="w-3.5 h-3.5 text-blue-400" />,
    },
    {
      id: 'judge',
      label: 'Judge',
      role: 'Dr. Ananya Rao (AI Track)',
      desc: 'Tablet evaluation view, assigned projects, 100-point rubric',
      icon: <Award className="w-3.5 h-3.5 text-purple-400" />,
    },
    {
      id: 'superadmin',
      label: 'Super Admin',
      role: 'Dean / Lead Coordinator',
      desc: 'Multi-year editions (2026, 2027), permissions, data wipe',
      icon: <Shield className="w-3.5 h-3.5 text-red-400" />,
    },
  ];

  const currentActive =
    personaList.find((p) => p.id === currentPersona) || personaList[4];

  return (
    <div className="bg-[#0c0c0e] border-b border-[#27272a] text-[#a1a1aa] text-xs select-none">
      <div className="max-w-7xl mx-auto px-4 py-1.5 flex items-center justify-between gap-4">
        {/* Left: Persona Switcher */}
        <div className="relative">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center gap-2 px-2 py-1 rounded bg-[#18181b] border border-[#27272a] hover:border-[#3f3f46] text-[#fafafa] font-medium transition-colors"
          >
            <span className="text-[10px] font-mono text-[#71717a] uppercase">Demo Persona:</span>
            <div className="flex items-center gap-1.5">
              {currentActive.icon}
              <span className="text-xs">{currentActive.label}</span>
            </div>
            <ChevronDown className="w-3 h-3 text-[#71717a]" />
          </button>

          {isOpen && (
            <>
              <div
                className="fixed inset-0 z-40"
                onClick={() => setIsOpen(false)}
              />
              <div className="absolute left-0 top-full mt-1 w-80 bg-[#111113] border border-[#27272a] rounded-lg shadow-xl z-50 p-1.5 space-y-0.5">
                <div className="px-2 py-1 text-[10px] font-mono text-[#71717a] uppercase tracking-wider">
                  Instant Role Switching
                </div>
                {personaList.map((p) => {
                  const isSelected = p.id === currentPersona;
                  return (
                    <button
                      key={p.id}
                      onClick={() => {
                        setPersona(p.id);
                        setIsOpen(false);
                      }}
                      className={`w-full text-left px-2.5 py-2 rounded-md transition-colors flex items-start gap-2.5 ${
                        isSelected
                          ? 'bg-[#18181b] text-[#fafafa] border border-[#27272a]'
                          : 'text-[#a1a1aa] hover:text-[#fafafa] hover:bg-[#151517]'
                      }`}
                    >
                      <div className="mt-0.5">{p.icon}</div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-xs text-[#fafafa] truncate">
                            {p.label}
                          </span>
                          <span className="text-[10px] font-mono text-[#71717a]">
                            ({p.role})
                          </span>
                        </div>
                        <p className="text-[11px] text-[#71717a] truncate">
                          {p.desc}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </>
          )}
        </div>

        {/* Center: Current Route Breadcrumb */}
        <div className="hidden md:flex items-center gap-2 text-[11px] font-mono text-[#71717a]">
          <span>Route:</span>
          <span className="text-[#a1a1aa] bg-[#111113] px-1.5 py-0.5 rounded border border-[#27272a]">
            {currentRoute}
          </span>
        </div>

        {/* Right: Quick Demo Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={togglePublishResults}
            className={`px-2 py-1 rounded text-[11px] font-medium border transition-colors flex items-center gap-1 ${
              settings.isResultsPublished
                ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                : 'bg-[#111113] text-[#71717a] border-[#27272a] hover:text-[#a1a1aa]'
            }`}
            title="Toggle whether /results is published or private"
          >
            <Eye className="w-3 h-3" />
            <span>{settings.isResultsPublished ? 'Results Published' : 'Results Private'}</span>
          </button>

          <button
            onClick={resetAllData}
            className="px-2 py-1 rounded text-[11px] font-medium bg-[#111113] text-[#71717a] hover:text-[#fafafa] border border-[#27272a] hover:border-[#3f3f46] transition-colors flex items-center gap-1"
            title="Restore pristine college demo data"
          >
            <RotateCcw className="w-3 h-3" />
            <span className="hidden sm:inline">Reset State</span>
          </button>
        </div>
      </div>
    </div>
  );
};
