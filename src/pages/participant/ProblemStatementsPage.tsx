import React, { useState } from 'react';
import { useHackathon } from '../../context/HackathonContext';
import type { ProblemStatement } from '../../types';
import {
  FileCode2,
  CheckCircle2,
  Lock,
  Search,
  Filter,
  Users,
  Building,
  AlertTriangle,
  ArrowRight,
  ExternalLink,
  ChevronRight,
  X,
} from 'lucide-react';

export const ProblemStatementsPage: React.FC = () => {
  const { problemStatements, currentTeam, selectProblemStatement, navigate } = useHackathon();

  const [selectedTrack, setSelectedTrack] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeModalProblem, setActiveModalProblem] = useState<ProblemStatement | null>(null);
  const [confirmingProblemId, setConfirmingProblemId] = useState<string | null>(null);

  const tracks = ['All', 'AI & Machine Learning', 'FinTech', 'Healthcare', 'Sustainability', 'Cybersecurity', 'Open Innovation'];

  const filteredProblems = problemStatements.filter((p) => {
    const matchesTrack = selectedTrack === 'All' || p.track === selectedTrack;
    const matchesSearch =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.sponsor.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTrack && matchesSearch;
  });

  const handleSelectProblem = (id: string) => {
    selectProblemStatement(id);
    setConfirmingProblemId(null);
    setActiveModalProblem(null);
  };

  return (
    <div className="min-h-screen bg-[#090a0f] text-slate-100 py-10 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-mono uppercase tracking-wider text-amber-400 bg-amber-950/60 px-3 py-1 rounded-full border border-amber-500/20">
              Official Challenge Briefs
            </span>
            <h1 className="text-3xl font-extrabold text-white mt-2">Problem Statements</h1>
            <p className="text-xs text-slate-400 mt-1">
              Select one problem statement per team. Selection locks once chosen and cannot be changed after the deadline.
            </p>
          </div>

          {currentTeam?.problemStatementId && (
            <div className="p-3 rounded-2xl bg-amber-950/30 border border-amber-500/30 flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
              <div className="text-xs">
                <span className="text-slate-400">Team Choice: </span>
                <strong className="text-amber-300 font-mono">[{currentTeam.problemStatementId}]</strong>
              </div>
            </div>
          )}
        </div>

        {/* Filter bar and search */}
        <div className="p-4 rounded-2xl bg-slate-900/40 border border-slate-800/80 backdrop-blur-md flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Track tabs */}
          <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto">
            {tracks.map((t) => (
              <button
                key={t}
                onClick={() => setSelectedTrack(t)}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                  selectedTrack === t
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          {/* Search box */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search statements or sponsors..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
            />
          </div>
        </div>

        {/* Problem Statements Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-5">
          {filteredProblems.map((problem) => {
            const isSelectedByMyTeam = currentTeam?.problemStatementId === problem.id;
            const slotPercentage = Math.round((problem.selectedTeamsCount / problem.maxTeams) * 100);

            return (
              <div
                key={problem.id}
                className={`p-6 rounded-3xl border transition-all hover:border-slate-600 flex flex-col justify-between ${
                  isSelectedByMyTeam
                    ? 'bg-amber-950/20 border-amber-500/50 shadow-lg shadow-amber-950/20'
                    : 'bg-slate-900/40 border-slate-800/80'
                }`}
              >
                <div>
                  {/* Top badges */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="font-mono text-xs font-bold text-amber-400 bg-amber-950/80 px-2 py-0.5 rounded border border-amber-500/30">
                      {problem.id}
                    </span>
                    <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 font-medium">
                      {problem.track}
                    </span>
                    <span className="text-[10px] text-slate-400 ml-auto font-medium">
                      {problem.difficulty}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-base font-bold text-white mb-2 leading-snug">{problem.title}</h3>
                  <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed mb-4">
                    {problem.description}
                  </p>

                  {/* Sponsor */}
                  <div className="flex items-center gap-1.5 text-[11px] text-slate-400 mb-4">
                    <Building className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                    <span>Sponsor: <strong className="text-slate-200">{problem.sponsor}</strong></span>
                  </div>
                </div>

                {/* Footer slot indicator and CTA */}
                <div>
                  <div className="mb-4">
                    <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1">
                      <span>Team Allocations</span>
                      <span className="font-mono text-slate-300">
                        {problem.selectedTeamsCount} / {problem.maxTeams} teams
                      </span>
                    </div>
                    <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all ${
                          slotPercentage >= 90 ? 'bg-rose-500' : 'bg-indigo-500'
                        }`}
                        style={{ width: `${slotPercentage}%` }}
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setActiveModalProblem(problem)}
                      className="flex-1 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs text-slate-200 font-semibold transition-colors"
                    >
                      View Details
                    </button>

                    {isSelectedByMyTeam ? (
                      <span className="px-4 py-2 rounded-xl bg-emerald-600/20 text-emerald-300 border border-emerald-500/30 text-xs font-semibold flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4" /> Selected
                      </span>
                    ) : (
                      <button
                        onClick={() => setConfirmingProblemId(problem.id)}
                        disabled={!currentTeam}
                        className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-md shadow-indigo-600/30 transition-all hover:scale-102 disabled:opacity-40"
                      >
                        Select Problem
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Problem Detail Modal */}
      {activeModalProblem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
          <div className="bg-[#0f111a] border border-slate-800 rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto animate-in zoom-in-95">
            <button
              onClick={() => setActiveModalProblem(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 mb-3">
              <span className="font-mono text-xs font-bold text-amber-400 bg-amber-950/80 px-2.5 py-0.5 rounded border border-amber-500/30">
                {activeModalProblem.id}
              </span>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 font-medium">
                {activeModalProblem.track}
              </span>
              <span className="text-xs text-slate-400 font-medium">{activeModalProblem.difficulty}</span>
            </div>

            <h2 className="text-xl font-bold text-white mb-2">{activeModalProblem.title}</h2>
            <div className="text-xs text-slate-400 mb-6 flex items-center gap-1.5">
              <Building className="w-4 h-4 text-indigo-400" />
              <span>Sponsor: <strong className="text-white">{activeModalProblem.sponsor}</strong></span>
            </div>

            <div className="space-y-5 text-xs text-slate-300 leading-relaxed">
              <div>
                <h4 className="font-bold text-white uppercase tracking-wider text-[11px] mb-1 text-indigo-400">
                  Background
                </h4>
                <p className="bg-slate-950 p-3 rounded-xl border border-slate-800/80">
                  {activeModalProblem.background}
                </p>
              </div>

              <div>
                <h4 className="font-bold text-white uppercase tracking-wider text-[11px] mb-1 text-indigo-400">
                  Expected Outcome
                </h4>
                <p className="bg-slate-950 p-3 rounded-xl border border-slate-800/80">
                  {activeModalProblem.expectedOutcome}
                </p>
              </div>

              <div>
                <h4 className="font-bold text-white uppercase tracking-wider text-[11px] mb-1 text-indigo-400">
                  Technical Constraints
                </h4>
                <ul className="list-disc list-inside space-y-1 bg-slate-950 p-3 rounded-xl border border-slate-800/80">
                  {activeModalProblem.constraints.map((c, i) => (
                    <li key={i}>{c}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-bold text-white uppercase tracking-wider text-[11px] mb-1 text-indigo-400">
                  Datasets & Resources
                </h4>
                <ul className="list-disc list-inside space-y-1 bg-slate-950 p-3 rounded-xl border border-slate-800/80">
                  {activeModalProblem.resources.map((r, i) => (
                    <li key={i}>{r}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="pt-6 border-t border-slate-800 mt-6 flex items-center justify-between">
              <button
                onClick={() => setActiveModalProblem(null)}
                className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-semibold"
              >
                Close
              </button>

              {currentTeam?.problemStatementId === activeModalProblem.id ? (
                <span className="text-xs text-emerald-400 font-bold flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" /> Selected by your team
                </span>
              ) : (
                <button
                  onClick={() => {
                    setConfirmingProblemId(activeModalProblem.id);
                  }}
                  disabled={!currentTeam}
                  className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-md transition-all hover:scale-102 disabled:opacity-40"
                >
                  Select this Problem
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Dialog */}
      {confirmingProblemId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
          <div className="bg-[#0f111a] border border-amber-500/40 rounded-3xl max-w-md w-full p-6 text-center shadow-2xl">
            <div className="w-12 h-12 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-400 flex items-center justify-center mx-auto mb-3">
              <AlertTriangle className="w-6 h-6" />
            </div>

            <h3 className="text-lg font-bold text-white mb-2">Confirm Problem Statement Selection</h3>
            <p className="text-xs text-slate-400 mb-6 leading-relaxed">
              Are you sure you want to lock <strong>[{confirmingProblemId}]</strong> for{' '}
              <strong>{currentTeam?.name}</strong>?
              <br />
              <span className="text-amber-300 mt-1 block">
                "You cannot change your problem statement after the selection deadline."
              </span>
            </p>

            <div className="flex gap-2">
              <button
                onClick={() => setConfirmingProblemId(null)}
                className="flex-1 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={() => handleSelectProblem(confirmingProblemId)}
                className="flex-1 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-md shadow-indigo-600/30"
              >
                Confirm & Lock
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
