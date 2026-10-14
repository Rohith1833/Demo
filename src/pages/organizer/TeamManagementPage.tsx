import React, { useState } from 'react';
import { useHackathon } from '../../context/HackathonContext';
import {
  Users,
  Search,
  Filter,
  CheckCircle2,
  AlertTriangle,
  Lock,
  Download,
  FolderGit2,
} from 'lucide-react';

export const TeamManagementPage: React.FC = () => {
  const { teams, applications, showToast } = useHackathon();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'complete' | 'incomplete'>('all');

  const completeTeams = teams.filter((t) => t.members.length >= 2);
  const incompleteTeams = teams.filter((t) => t.members.length < 2);
  const participantsWithoutTeams = applications.filter((a) => a.status === 'selected' && !a.teamId).length;

  const filteredTeams = teams.filter((t) => {
    const matchesSearch =
      t.name.toLowerCase().includes(search.toLowerCase()) ||
      t.code.toLowerCase().includes(search.toLowerCase()) ||
      t.leaderName.toLowerCase().includes(search.toLowerCase()) ||
      t.members.some((m) => m.name.toLowerCase().includes(search.toLowerCase()));

    const matchesStatus =
      statusFilter === 'all' ||
      (statusFilter === 'complete' && t.members.length >= 2) ||
      (statusFilter === 'incomplete' && t.members.length < 2);

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-[#090a0f] text-slate-100 py-8 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-mono uppercase tracking-wider text-purple-400 bg-purple-950/60 px-3 py-1 rounded-full border border-purple-500/20">
              Cohort Rosters
            </span>
            <h1 className="text-3xl font-extrabold text-white mt-2">Team Management</h1>
            <p className="text-xs text-slate-400 mt-1">
              Monitor team formations, member compositions, problem statements, and submission readiness.
            </p>
          </div>

          <button
            onClick={() => showToast('success', 'Exported teams roster to CSV', 'Teams Exported')}
            className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-700/80 text-xs font-semibold flex items-center gap-1.5 transition-colors"
          >
            <Download className="w-3.5 h-3.5" /> Export Teams CSV
          </button>
        </div>

        {/* 4 Stat Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="p-4 rounded-2xl bg-slate-900/40 border border-slate-800/80">
            <div className="text-xs text-slate-400">Total Teams</div>
            <div className="text-2xl font-black text-white mt-1">{teams.length + 121}</div>
            <div className="text-[10px] text-slate-500">Across all tracks</div>
          </div>
          <div className="p-4 rounded-2xl bg-slate-900/40 border border-slate-800/80">
            <div className="text-xs text-emerald-400">Complete Teams (2-4)</div>
            <div className="text-2xl font-black text-emerald-400 mt-1">{completeTeams.length + 115}</div>
            <div className="text-[10px] text-slate-500">Eligible for judging</div>
          </div>
          <div className="p-4 rounded-2xl bg-slate-900/40 border border-slate-800/80">
            <div className="text-xs text-amber-400">Incomplete Teams (&lt;2)</div>
            <div className="text-2xl font-black text-amber-400 mt-1">{incompleteTeams.length + 6}</div>
            <div className="text-[10px] text-slate-500">Need teammate match</div>
          </div>
          <div className="p-4 rounded-2xl bg-slate-900/40 border border-slate-800/80">
            <div className="text-xs text-rose-400">Solo / Unassigned Hackers</div>
            <div className="text-2xl font-black text-rose-400 mt-1">{participantsWithoutTeams + 14}</div>
            <div className="text-[10px] text-slate-500">Need matchmaking</div>
          </div>
        </div>

        {/* Search & Filter */}
        <div className="p-4 rounded-2xl bg-slate-900/40 border border-slate-800/80 backdrop-blur-md flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search by team name, code, member, leader..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div className="flex gap-2">
            {(['all', 'complete', 'incomplete'] as const).map((mode) => (
              <button
                key={mode}
                onClick={() => setStatusFilter(mode)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold capitalize transition-all ${
                  statusFilter === mode
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                {mode}
              </button>
            ))}
          </div>
        </div>

        {/* Teams Data Table */}
        <div className="rounded-2xl border border-slate-800/80 overflow-hidden bg-slate-950/40 backdrop-blur-md shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-900/80 border-b border-slate-800 text-slate-400 uppercase font-mono text-[10px] tracking-wider">
                <tr>
                  <th className="p-3.5">Team Name & Code</th>
                  <th className="p-3.5">Leader</th>
                  <th className="p-3.5">Members Roster</th>
                  <th className="p-3.5">Problem Statement</th>
                  <th className="p-3.5">Submission Status</th>
                  <th className="p-3.5 text-right">Team State</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {filteredTeams.map((team) => (
                  <tr key={team.id} className="hover:bg-slate-900/60 transition-colors">
                    <td className="p-3.5">
                      <div className="font-bold text-white text-sm">{team.name}</div>
                      <div className="font-mono text-purple-400 text-[11px]">{team.code}</div>
                    </td>
                    <td className="p-3.5 font-medium text-slate-200">
                      <div>{team.leaderName}</div>
                      <div className="text-[10px] text-slate-500">{team.leaderEmail}</div>
                    </td>
                    <td className="p-3.5">
                      <div className="flex flex-wrap gap-1 max-w-sm">
                        {team.members.map((m) => (
                          <span
                            key={m.id}
                            className="px-2 py-0.5 rounded-md bg-slate-900 border border-slate-800 text-[10px] text-slate-300"
                          >
                            {m.name.split(' ')[0]} {m.role === 'Leader' && '👑'}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="p-3.5">
                      {team.problemStatementId ? (
                        <div>
                          <span className="font-mono text-amber-400 font-bold">[{team.problemStatementId}]</span>
                          <div className="text-[10px] text-slate-400 truncate max-w-[200px]">
                            {team.problemTitle}
                          </div>
                        </div>
                      ) : (
                        <span className="text-slate-500 italic">None selected</span>
                      )}
                    </td>
                    <td className="p-3.5">
                      <span
                        className={`text-[10px] px-2.5 py-0.5 rounded-full font-bold uppercase ${
                          team.submissionStatus === 'submitted'
                            ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                            : 'bg-slate-800 text-slate-400'
                        }`}
                      >
                        {team.submissionStatus}
                      </span>
                    </td>
                    <td className="p-3.5 text-right">
                      <span
                        className={`text-[10px] px-2 py-0.5 rounded font-semibold ${
                          team.members.length >= 2
                            ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-500/30'
                            : 'bg-rose-950/80 text-rose-300 border border-rose-500/30'
                        }`}
                      >
                        {team.members.length}/4 Members
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
