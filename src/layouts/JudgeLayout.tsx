import React from 'react';
import { useHackathon } from '../context/HackathonContext';
import { Award, CheckCircle, FileText, ExternalLink, ChevronLeft } from 'lucide-react';

export const JudgeLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { currentRoute, navigate, currentJudge, evaluations } = useHackathon();

  const isEvaluatingProject = currentRoute.startsWith('/judge/project/');
  const completedCount = evaluations.filter((e) => e.judgeId === currentJudge.id).length;

  return (
    <div className="min-h-screen bg-[#09090b] text-[#fafafa] flex flex-col font-sans">
      {/* Judge Tablet Header */}
      <header className="sticky top-0 z-40 bg-[#09090b] border-b border-[#27272a]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {isEvaluatingProject ? (
              <button
                onClick={() => navigate('/judge')}
                className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-medium bg-[#111113] border border-[#27272a] text-[#a1a1aa] hover:text-[#fafafa] transition-colors"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
                <span>Assigned Projects</span>
              </button>
            ) : (
              <button
                onClick={() => navigate('/judge')}
                className="flex items-center gap-2.5 text-left"
              >
                <div className="w-7 h-7 rounded-md bg-[#2563eb] flex items-center justify-center text-white font-mono font-semibold text-xs">
                  HF
                </div>
                <div>
                  <span className="font-semibold text-xs tracking-tight text-[#fafafa] block">
                    HackFlow
                  </span>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#71717a] block leading-none">
                    Judging Console
                  </span>
                </div>
              </button>
            )}
          </div>

          {/* Navigation Tabs */}
          <nav className="flex items-center gap-1">
            <button
              onClick={() => navigate('/judge')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                !isEvaluatingProject
                  ? 'bg-[#18181b] text-[#fafafa] border border-[#27272a]'
                  : 'text-[#a1a1aa] hover:text-[#fafafa] hover:bg-[#111113]'
              }`}
            >
              <Award className="w-3.5 h-3.5" />
              <span>Assigned Projects</span>
              <span className="ml-1 text-[10px] font-mono px-1.5 py-0.2 rounded bg-[#27272a] text-[#a1a1aa]">
                12
              </span>
            </button>
          </nav>

          {/* Judge Identity Badge */}
          <div className="flex items-center gap-2.5">
            <div className="text-right hidden sm:block">
              <p className="text-xs font-medium text-[#fafafa] leading-tight">
                {currentJudge.name}
              </p>
              <p className="text-[10px] font-mono text-[#a1a1aa] leading-none">
                {currentJudge.track} • {completedCount} Evaluated
              </p>
            </div>
            <div className="w-7 h-7 rounded-md bg-[#2563eb]/20 border border-[#2563eb]/40 text-[#3b82f6] flex items-center justify-center font-mono text-xs font-semibold">
              {currentJudge.name.charAt(0)}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-6xl mx-auto px-4 sm:px-6 py-6">
        {children}
      </main>

      {/* Tablet-friendly Footer */}
      <footer className="border-t border-[#27272a] bg-[#0c0c0e] py-3 text-xs text-[#71717a]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between text-[11px]">
          <span>NexHack 2026 • Official Jury Evaluation Terminal</span>
          <button
            onClick={() => navigate('/results')}
            className="hover:text-[#a1a1aa] inline-flex items-center gap-1"
          >
            Public Showcase <ExternalLink className="w-3 h-3" />
          </button>
        </div>
      </footer>
    </div>
  );
};
