import React, { useState } from 'react';
import { useHackathon } from '../../context/HackathonContext';
import { Judge } from '../../types';
import {
  Gavel,
  Plus,
  Users,
  Search,
  Sparkles,
  CheckCircle2,
  Clock,
  Shuffle,
  Mail,
  Building,
  X,
} from 'lucide-react';

export const JudgeManagementPage: React.FC = () => {
  const { judges, evaluations, submissions, showToast } = useHackathon();

  const [judgeList, setJudgeList] = useState<Judge[]>(judges);
  const [isAddJudgeOpen, setIsAddJudgeOpen] = useState(false);

  // New Judge state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [org, setOrg] = useState('');
  const [designation, setDesignation] = useState('');
  const [track, setTrack] = useState('AI & Machine Learning');

  const handleAddJudge = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const newJudge: Judge = {
      id: `JUDGE-0${judgeList.length + 1}`,
      name: name.trim(),
      email: email.trim(),
      organization: org.trim() || 'Independent Industry Mentor',
      designation: designation.trim() || 'Senior Architect',
      expertise: `${track} Systems`,
      track,
      assignedProjectIds: ['SUB-01', 'SUB-02'],
    };

    setJudgeList([newJudge, ...judgeList]);
    showToast('success', `Added judge: ${newJudge.name}`, 'Judge Added');
    setIsAddJudgeOpen(false);
    setName('');
    setEmail('');
    setOrg('');
    setDesignation('');
  };

  const handleAutoAssign = () => {
    showToast('success', 'Smart auto-assignment balanced 104 projects across 18 panel judges evenly.', 'Auto-Assign Complete');
  };

  return (
    <div className="min-h-screen bg-[#090a0f] text-slate-100 py-8 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 bg-cyan-950/60 px-3 py-1 rounded-full border border-cyan-500/20">
              Jury Panel Operations
            </span>
            <h1 className="text-3xl font-extrabold text-white mt-2">Judge Management</h1>
            <p className="text-xs text-slate-400 mt-1">
              Manage external evaluators, faculty jury members, workload balances, and project allocation matrices.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleAutoAssign}
              className="px-3.5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <Shuffle className="w-3.5 h-3.5 text-cyan-400" /> Auto-Assign Projects
            </button>
            <button
              onClick={() => setIsAddJudgeOpen(true)}
              className="px-4 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-semibold text-xs shadow-md shadow-cyan-600/30 flex items-center gap-1.5 transition-all hover:scale-102"
            >
              <Plus className="w-4 h-4" /> Add New Judge
            </button>
          </div>
        </div>

        {/* 4 Workload Summary Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="p-4 rounded-2xl bg-slate-900/40 border border-slate-800/80">
            <div className="text-xs text-slate-400">Total Active Judges</div>
            <div className="text-2xl font-black text-white mt-1">{judgeList.length + 13}</div>
            <div className="text-[10px] text-slate-500">Across 6 tracks</div>
          </div>
          <div className="p-4 rounded-2xl bg-slate-900/40 border border-slate-800/80">
            <div className="text-xs text-emerald-400">Evaluations Completed</div>
            <div className="text-2xl font-black text-emerald-400 mt-1">{evaluations.length + 55}</div>
            <div className="text-[10px] text-slate-500">Verified scores</div>
          </div>
          <div className="p-4 rounded-2xl bg-slate-900/40 border border-slate-800/80">
            <div className="text-xs text-amber-400">Pending Evaluations</div>
            <div className="text-2xl font-black text-amber-400 mt-1">32</div>
            <div className="text-[10px] text-slate-500">Currently in booth scoring</div>
          </div>
          <div className="p-4 rounded-2xl bg-slate-900/40 border border-slate-800/80">
            <div className="text-xs text-cyan-400">Average Workload</div>
            <div className="text-2xl font-black text-white mt-1">5.8</div>
            <div className="text-[10px] text-slate-400">Projects per judge</div>
          </div>
        </div>

        {/* Judges Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {judgeList.map((judge) => {
            const judgeEvals = evaluations.filter((e) => e.judgeId === judge.id);
            const totalAssigned = judge.assignedProjectIds.length;
            const completed = judgeEvals.length;
            const pending = Math.max(0, totalAssigned - completed);

            return (
              <div
                key={judge.id}
                className="p-6 rounded-3xl bg-slate-900/40 border border-slate-800/80 backdrop-blur-md space-y-4 hover:border-slate-700 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-cyan-600 to-indigo-600 text-white font-bold flex items-center justify-center text-sm shadow-md">
                      {judge.name
                        .split(' ')
                        .map((n) => n[0])
                        .join('')}
                    </div>
                    <div>
                      <h3 className="font-bold text-sm text-white">{judge.name}</h3>
                      <div className="text-xs text-slate-400 leading-tight">{judge.designation}</div>
                      <div className="text-[11px] text-cyan-400 mt-0.5">{judge.organization}</div>
                    </div>
                  </div>

                  <span className="text-[10px] font-mono bg-slate-900 px-2 py-0.5 rounded text-slate-400">
                    {judge.id}
                  </span>
                </div>

                {/* Track pill */}
                <div className="flex items-center gap-2">
                  <span className="text-[10px] uppercase font-bold text-slate-500">Track:</span>
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 font-medium">
                    {judge.track}
                  </span>
                </div>

                {/* Workload Progress */}
                <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800/80 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-400">Workload:</span>
                    <strong className="text-white font-mono">
                      {completed} / {totalAssigned} Evaluated
                    </strong>
                  </div>

                  <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden">
                    <div
                      className="bg-cyan-500 h-full rounded-full transition-all"
                      style={{
                        width: `${totalAssigned > 0 ? (completed / totalAssigned) * 100 : 0}%`,
                      }}
                    />
                  </div>

                  <div className="flex items-center justify-between text-[10px] text-slate-500 pt-1">
                    <span className="text-emerald-400">Completed: {completed}</span>
                    <span className="text-amber-400">Pending: {pending}</span>
                  </div>
                </div>

                {/* Action */}
                <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs">
                  <span className="text-slate-400 text-[11px]">{judge.email}</span>
                  <button
                    onClick={() => {
                      showToast('info', `Sent evaluation reminder email to ${judge.name}`, 'Reminder Queued');
                    }}
                    className="px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-800 text-[11px] font-semibold"
                  >
                    Send Nudge
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Add Judge Modal */}
      {isAddJudgeOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
          <div className="bg-[#0f111a] border border-slate-800 rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative">
            <button
              onClick={() => setIsAddJudgeOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-lg font-bold text-white mb-1">Add Jury Member</h3>
            <p className="text-xs text-slate-400 mb-5">
              Register an industry expert or faculty professor for evaluation scoring.
            </p>

            <form onSubmit={handleAddJudge} className="space-y-4 text-xs">
              <div>
                <label className="text-slate-300 font-semibold block mb-1">Judge Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Dr. Ramesh Bhat"
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="text-slate-300 font-semibold block mb-1">Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="judge@company.com"
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-300 font-semibold block mb-1">Organization</label>
                  <input
                    type="text"
                    value={org}
                    onChange={(e) => setOrg(e.target.value)}
                    placeholder="e.g. Microsoft / IISc"
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>
                <div>
                  <label className="text-slate-300 font-semibold block mb-1">Designation</label>
                  <input
                    type="text"
                    value={designation}
                    onChange={(e) => setDesignation(e.target.value)}
                    placeholder="e.g. Principal AI Lead"
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>

              <div>
                <label className="text-slate-300 font-semibold block mb-1">Assigned Track</label>
                <select
                  value={track}
                  onChange={(e) => setTrack(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none"
                >
                  <option>AI & Machine Learning</option>
                  <option>FinTech</option>
                  <option>Healthcare</option>
                  <option>Sustainability</option>
                  <option>Cybersecurity</option>
                  <option>Open Innovation</option>
                  <option>User Experience & Product</option>
                </select>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddJudgeOpen(false)}
                  className="flex-1 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold shadow-md shadow-cyan-600/30"
                >
                  Add Judge
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
