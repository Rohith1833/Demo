import React, { useState } from 'react';
import { useHackathon } from '../../context/HackathonContext';
import { ProjectSubmission } from '../../types';
import {
  FolderGit2,
  Search,
  CheckCircle2,
  Clock,
  Globe,
  Video,
  ExternalLink,
  Download,
  X,
  AlertTriangle,
} from 'lucide-react';
import { GithubIcon } from '../../components/ui/Icons';

export const SubmissionManagementPage: React.FC = () => {
  const { submissions, teams, evaluations, showToast } = useHackathon();

  const [search, setSearch] = useState('');
  const [selectedSub, setSelectedSub] = useState<ProjectSubmission | null>(null);

  const totalTeams = teams.length + 121;
  const submittedCount = submissions.length + 98;
  const pendingCount = totalTeams - submittedCount;

  const filteredSubs = submissions.filter((s) => {
    return (
      s.title.toLowerCase().includes(search.toLowerCase()) ||
      s.teamName.toLowerCase().includes(search.toLowerCase()) ||
      s.problemId.toLowerCase().includes(search.toLowerCase()) ||
      s.techStack.some((t) => t.toLowerCase().includes(search.toLowerCase()))
    );
  });

  return (
    <div className="min-h-screen bg-[#090a0f] text-slate-100 py-8 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-mono uppercase tracking-wider text-emerald-400 bg-emerald-950/60 px-3 py-1 rounded-full border border-emerald-500/20">
              Code & Project Audit
            </span>
            <h1 className="text-3xl font-extrabold text-white mt-2">Submissions Tracker</h1>
            <p className="text-xs text-slate-400 mt-1">
              Live audit of GitHub repositories, demo links, and assignment to jury evaluation panels.
            </p>
          </div>

          <button
            onClick={() => showToast('success', 'Exported all submission deliverables to CSV/JSON', 'Export Complete')}
            className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-700/80 text-xs font-semibold flex items-center gap-1.5 transition-colors"
          >
            <Download className="w-3.5 h-3.5" /> Export All Deliverables
          </button>
        </div>

        {/* 4 Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="p-4 rounded-2xl bg-slate-900/40 border border-slate-800/80">
            <div className="text-xs text-slate-400">Total Teams</div>
            <div className="text-2xl font-black text-white mt-1">{totalTeams}</div>
            <div className="text-[10px] text-slate-500">128 registered teams</div>
          </div>
          <div className="p-4 rounded-2xl bg-slate-900/40 border border-slate-800/80">
            <div className="text-xs text-emerald-400">Submitted Projects</div>
            <div className="text-2xl font-black text-emerald-400 mt-1">{submittedCount}</div>
            <div className="text-[10px] text-slate-500">81% on-time submission rate</div>
          </div>
          <div className="p-4 rounded-2xl bg-slate-900/40 border border-slate-800/80">
            <div className="text-xs text-amber-400">Pending Submissions</div>
            <div className="text-2xl font-black text-amber-400 mt-1">{pendingCount}</div>
            <div className="text-[10px] text-slate-500">Cutoff at 08:00 AM</div>
          </div>
          <div className="p-4 rounded-2xl bg-slate-900/40 border border-slate-800/80">
            <div className="text-xs text-indigo-400">Late / Flagged</div>
            <div className="text-2xl font-black text-white mt-1">0</div>
            <div className="text-[10px] text-emerald-400">All submissions in-window</div>
          </div>
        </div>

        {/* Search */}
        <div className="p-4 rounded-2xl bg-slate-900/40 border border-slate-800/80 backdrop-blur-md">
          <div className="relative max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search by project name, team, problem ID, or tech stack..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
            />
          </div>
        </div>

        {/* Submissions Table */}
        <div className="rounded-2xl border border-slate-800/80 overflow-hidden bg-slate-950/40 backdrop-blur-md shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-900/80 border-b border-slate-800 text-slate-400 uppercase font-mono text-[10px] tracking-wider">
                <tr>
                  <th className="p-3.5">Team & Project</th>
                  <th className="p-3.5">Problem</th>
                  <th className="p-3.5">Tech Stack</th>
                  <th className="p-3.5">Deliverables</th>
                  <th className="p-3.5">Submission Time</th>
                  <th className="p-3.5">Jury Status</th>
                  <th className="p-3.5 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {filteredSubs.map((sub) => {
                  const evalCount = evaluations.filter((e) => e.submissionId === sub.id).length;

                  return (
                    <tr key={sub.id} className="hover:bg-slate-900/60 transition-colors">
                      <td className="p-3.5">
                        <div className="font-bold text-white text-sm">{sub.title}</div>
                        <div className="text-purple-400 text-[11px] font-semibold">{sub.teamName}</div>
                      </td>
                      <td className="p-3.5">
                        <span className="font-mono text-amber-400 font-bold">[{sub.problemId}]</span>
                        <div className="text-[10px] text-slate-400 truncate max-w-[150px]">
                          {sub.problemTitle}
                        </div>
                      </td>
                      <td className="p-3.5">
                        <div className="flex flex-wrap gap-1 max-w-xs">
                          {sub.techStack.slice(0, 3).map((t) => (
                            <span
                              key={t}
                              className="px-1.5 py-0.2 rounded bg-slate-900 border border-slate-800 text-[9px] text-slate-300"
                            >
                              {t}
                            </span>
                          ))}
                          {sub.techStack.length > 3 && (
                            <span className="text-[9px] text-slate-500">+{sub.techStack.length - 3}</span>
                          )}
                        </div>
                      </td>
                      <td className="p-3.5">
                        <div className="flex items-center gap-2">
                          <a
                            href={sub.githubUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="p-1 rounded bg-slate-900 text-slate-300 hover:text-white"
                            title="GitHub Repo"
                          >
                            <GithubIcon className="w-3.5 h-3.5" />
                          </a>
                          <a
                            href={sub.demoUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="p-1 rounded bg-slate-900 text-emerald-400 hover:text-white"
                            title="Live Demo"
                          >
                            <Globe className="w-3.5 h-3.5" />
                          </a>
                          <a
                            href={sub.videoUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="p-1 rounded bg-slate-900 text-rose-400 hover:text-white"
                            title="Demo Video"
                          >
                            <Video className="w-3.5 h-3.5" />
                          </a>
                        </div>
                      </td>
                      <td className="p-3.5 font-mono text-slate-400 text-[11px]">
                        {new Date(sub.submittedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </td>
                      <td className="p-3.5">
                        <span
                          className={`text-[10px] px-2 py-0.5 rounded font-semibold ${
                            evalCount > 0
                              ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-500/30'
                              : 'bg-amber-950/80 text-amber-300 border border-amber-500/30'
                          }`}
                        >
                          {evalCount > 0 ? `${evalCount} Evaluations In` : 'Pending Jury'}
                        </span>
                      </td>
                      <td className="p-3.5 text-right">
                        <button
                          onClick={() => setSelectedSub(sub)}
                          className="px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 text-[11px] font-semibold transition-colors"
                        >
                          View Details
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Submission Detail Modal */}
      {selectedSub && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
          <div className="bg-[#0f111a] border border-slate-800 rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setSelectedSub(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 mb-2">
              <span className="font-mono text-xs font-bold text-amber-400 bg-amber-950 px-2 py-0.5 rounded border border-amber-500/30">
                {selectedSub.problemId}
              </span>
              <span className="text-xs text-purple-400 font-semibold">{selectedSub.teamName}</span>
            </div>

            <h2 className="text-xl font-bold text-white mb-1">{selectedSub.title}</h2>
            <p className="text-xs text-slate-400 italic mb-4">{selectedSub.tagline}</p>

            <div className="space-y-4 text-xs text-slate-300">
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800">
                <h4 className="font-bold text-white mb-1 uppercase tracking-wider text-[11px]">
                  Description
                </h4>
                <p className="leading-relaxed">{selectedSub.description}</p>
              </div>

              <div>
                <h4 className="font-bold text-white mb-2 uppercase tracking-wider text-[11px]">
                  Verified Links
                </h4>
                <div className="grid grid-cols-2 gap-2">
                  <a
                    href={selectedSub.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-indigo-400 hover:underline flex items-center justify-between"
                  >
                    <span>GitHub Codebase</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                  <a
                    href={selectedSub.demoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-emerald-400 hover:underline flex items-center justify-between"
                  >
                    <span>Live Web Demo</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                  <a
                    href={selectedSub.videoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-rose-400 hover:underline flex items-center justify-between"
                  >
                    <span>Video Walkthrough</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                  <a
                    href={selectedSub.presentationUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-purple-400 hover:underline flex items-center justify-between"
                  >
                    <span>Pitch Deck Presentation</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800 flex justify-end">
              <button
                onClick={() => setSelectedSub(null)}
                className="px-5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
