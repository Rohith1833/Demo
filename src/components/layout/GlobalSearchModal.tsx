import React, { useState, useEffect } from 'react';
import { useHackathon } from '../../context/HackathonContext';
import { Search, X, User, Users, FileText, CheckCircle, Lightbulb, ArrowRight } from 'lucide-react';

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GlobalSearchModal: React.FC<GlobalSearchModalProps> = ({ isOpen, onClose }) => {
  const { applications, teams, problemStatements, submissions, navigate, setSelectedApplicant } =
    useHackathon();
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const trimmed = query.trim().toLowerCase();

  const matchingApplicants = trimmed
    ? applications.filter(
        (a) =>
          a.name.toLowerCase().includes(trimmed) ||
          a.id.toLowerCase().includes(trimmed) ||
          a.participantId.toLowerCase().includes(trimmed) ||
          a.college.toLowerCase().includes(trimmed) ||
          a.email.toLowerCase().includes(trimmed) ||
          a.skills.some((s) => s.toLowerCase().includes(trimmed))
      )
    : applications.slice(0, 3);

  const matchingTeams = trimmed
    ? teams.filter(
        (t) =>
          t.name.toLowerCase().includes(trimmed) ||
          t.code.toLowerCase().includes(trimmed) ||
          t.leaderName.toLowerCase().includes(trimmed) ||
          t.members.some((m) => m.name.toLowerCase().includes(trimmed))
      )
    : teams.slice(0, 2);

  const matchingProblems = trimmed
    ? problemStatements.filter(
        (p) =>
          p.title.toLowerCase().includes(trimmed) ||
          p.id.toLowerCase().includes(trimmed) ||
          p.track.toLowerCase().includes(trimmed) ||
          p.sponsor.toLowerCase().includes(trimmed)
      )
    : problemStatements.slice(0, 2);

  const matchingSubmissions = trimmed
    ? submissions.filter(
        (s) =>
          s.title.toLowerCase().includes(trimmed) ||
          s.teamName.toLowerCase().includes(trimmed) ||
          s.techStack.some((t) => t.toLowerCase().includes(trimmed))
      )
    : [];

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/70 backdrop-blur-sm animate-in fade-in">
      <div className="bg-[#0f111a] border border-slate-800 rounded-2xl w-full max-w-2xl shadow-2xl overflow-hidden animate-in zoom-in-95">
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-slate-800 gap-3">
          <Search className="w-5 h-5 text-indigo-400 shrink-0" />
          <input
            type="text"
            placeholder="Search participants, teams, problem statements, application IDs... (Try 'Arjun' or 'NXH')"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            className="w-full bg-transparent text-sm text-white placeholder-slate-500 focus:outline-none"
          />
          {query && (
            <button onClick={() => setQuery('')} className="text-slate-400 hover:text-white p-1">
              <X className="w-4 h-4" />
            </button>
          )}
          <span className="text-[10px] bg-slate-900 border border-slate-700/60 text-slate-400 px-1.5 py-0.5 rounded font-mono">
            ESC
          </span>
        </div>

        {/* Results Body */}
        <div className="max-h-[60vh] overflow-y-auto p-4 space-y-4">
          {/* Participants */}
          {matchingApplicants.length > 0 && (
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-indigo-400" />
                Participants & Applicants ({matchingApplicants.length})
              </div>
              <div className="space-y-1.5">
                {matchingApplicants.map((app) => (
                  <div
                    key={app.id}
                    onClick={() => {
                      setSelectedApplicant(app);
                      navigate('/admin/applications');
                      onClose();
                    }}
                    className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900/50 hover:bg-slate-800/80 border border-slate-800/60 hover:border-indigo-500/30 cursor-pointer transition-colors group"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-sm text-white group-hover:text-indigo-300">
                          {app.name}
                        </span>
                        <span className="text-[11px] font-mono text-slate-400 bg-slate-800 px-1.5 py-0.2 rounded">
                          {app.id}
                        </span>
                        <span
                          className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                            app.status === 'selected'
                              ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                              : app.status === 'waitlisted'
                              ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                              : app.status === 'rejected'
                              ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                              : 'bg-slate-800 text-slate-300'
                          }`}
                        >
                          {app.status}
                        </span>
                      </div>
                      <div className="text-xs text-slate-400 mt-0.5">
                        {app.college} • {app.department} • Pass: {app.participantId}
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Teams */}
          {matchingTeams.length > 0 && (
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-purple-400" />
                Teams ({matchingTeams.length})
              </div>
              <div className="space-y-1.5">
                {matchingTeams.map((team) => (
                  <div
                    key={team.id}
                    onClick={() => {
                      navigate('/admin/teams');
                      onClose();
                    }}
                    className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900/50 hover:bg-slate-800/80 border border-slate-800/60 hover:border-purple-500/30 cursor-pointer transition-colors group"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-sm text-white group-hover:text-purple-300">
                          {team.name}
                        </span>
                        <span className="text-[11px] font-mono text-purple-400 bg-purple-950/40 px-1.5 py-0.2 rounded border border-purple-500/30">
                          {team.code}
                        </span>
                      </div>
                      <div className="text-xs text-slate-400 mt-0.5">
                        Leader: {team.leaderName} • {team.members.length}/4 members • {team.problemTitle || 'No problem chosen'}
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-purple-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Problem Statements */}
          {matchingProblems.length > 0 && (
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
                <Lightbulb className="w-3.5 h-3.5 text-amber-400" />
                Problem Statements ({matchingProblems.length})
              </div>
              <div className="space-y-1.5">
                {matchingProblems.map((prob) => (
                  <div
                    key={prob.id}
                    onClick={() => {
                      navigate('/admin/problems');
                      onClose();
                    }}
                    className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900/50 hover:bg-slate-800/80 border border-slate-800/60 hover:border-amber-500/30 cursor-pointer transition-colors group"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono font-bold text-amber-400">{prob.id}</span>
                        <span className="font-medium text-sm text-white group-hover:text-amber-300">
                          {prob.title}
                        </span>
                      </div>
                      <div className="text-xs text-slate-400 mt-0.5">
                        Track: {prob.track} • Sponsor: {prob.sponsor} • {prob.selectedTeamsCount}/{prob.maxTeams} teams
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-amber-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Projects / Submissions */}
          {matchingSubmissions.length > 0 && (
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-emerald-400" />
                Submissions ({matchingSubmissions.length})
              </div>
              <div className="space-y-1.5">
                {matchingSubmissions.map((sub) => (
                  <div
                    key={sub.id}
                    onClick={() => {
                      navigate('/admin/submissions');
                      onClose();
                    }}
                    className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900/50 hover:bg-slate-800/80 border border-slate-800/60 hover:border-emerald-500/30 cursor-pointer transition-colors group"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-sm text-white group-hover:text-emerald-300">
                          {sub.title}
                        </span>
                        <span className="text-[11px] text-slate-400">by {sub.teamName}</span>
                      </div>
                      <div className="text-xs text-slate-400 mt-0.5">{sub.tagline}</div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="px-4 py-2.5 bg-slate-950/80 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-500">
          <span>Search index refreshed in real-time</span>
          <span>Click any result to jump directly to management view</span>
        </div>
      </div>
    </div>
  );
};
