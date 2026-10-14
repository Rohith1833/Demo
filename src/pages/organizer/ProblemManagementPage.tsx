import React, { useState } from 'react';
import { useHackathon } from '../../context/HackathonContext';
import { ProblemStatement } from '../../types';
import {
  FileCode2,
  Plus,
  Play,
  Pause,
  Lock,
  Building,
  CheckCircle2,
  X,
  AlertCircle,
  Sliders,
} from 'lucide-react';

export const ProblemManagementPage: React.FC = () => {
  const { problemStatements, showToast } = useHackathon();

  const [problems, setProblems] = useState<ProblemStatement[]>(problemStatements);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Form for new problem statement
  const [newTitle, setNewTitle] = useState('');
  const [newTrack, setNewTrack] = useState('AI & Machine Learning');
  const [newDifficulty, setNewDifficulty] = useState<'Beginner' | 'Intermediate' | 'Advanced'>('Intermediate');
  const [newSponsor, setNewSponsor] = useState('');
  const [newMaxTeams, setNewMaxTeams] = useState(25);
  const [newDesc, setNewDesc] = useState('');

  const toggleStatus = (id: string, status: 'open' | 'paused' | 'closed') => {
    setProblems((prev) =>
      prev.map((p) => (p.id === id ? { ...p, status } : p))
    );
    showToast('info', `Problem ${id} status updated to ${status.toUpperCase()}`, 'Status Updated');
  };

  const handleAddProblem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const nextId = `PS-0${problems.length + 1}`;
    const newProblem: ProblemStatement = {
      id: nextId,
      title: newTitle.trim(),
      track: newTrack,
      difficulty: newDifficulty,
      description: newDesc || 'Comprehensive industry problem brief.',
      background: 'Identified university and industry operational challenge.',
      expectedOutcome: 'Production prototype and evaluation benchmark.',
      constraints: ['Latency under 500ms', 'Dockerized deployment'],
      resources: ['Open source dataset and API sandbox'],
      sponsor: newSponsor || 'Industry Innovation Fund',
      maxTeams: newMaxTeams,
      selectedTeamsCount: 0,
      status: 'open',
    };

    setProblems([newProblem, ...problems]);
    showToast('success', `Created problem statement [${nextId}]!`, 'Problem Created');
    setIsAddModalOpen(false);
    setNewTitle('');
    setNewDesc('');
    setNewSponsor('');
  };

  return (
    <div className="min-h-screen bg-[#090a0f] text-slate-100 py-8 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-mono uppercase tracking-wider text-amber-400 bg-amber-950/60 px-3 py-1 rounded-full border border-amber-500/20">
              Challenge Catalog & Allocation Quotas
            </span>
            <h1 className="text-3xl font-extrabold text-white mt-2">Problem Statements Management</h1>
            <p className="text-xs text-slate-400 mt-1">
              Configure problem allocation quotas, pause tracks during overflow, or introduce new sponsor challenges.
            </p>
          </div>

          <button
            onClick={() => setIsAddModalOpen(true)}
            className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs shadow-md shadow-indigo-600/30 flex items-center gap-2 transition-all hover:scale-102"
          >
            <Plus className="w-4 h-4" /> Create Problem Statement
          </button>
        </div>

        {/* Global Controls & Summary */}
        <div className="p-4 rounded-2xl bg-slate-900/40 border border-slate-800/80 backdrop-blur-md flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-6">
            <div>
              <span className="text-slate-400">Total Statements:</span>{' '}
              <strong className="text-white">{problems.length}</strong>
            </div>
            <div>
              <span className="text-slate-400">Global Allocated Teams:</span>{' '}
              <strong className="text-amber-400">
                {problems.reduce((acc, p) => acc + p.selectedTeamsCount, 0)} /{' '}
                {problems.reduce((acc, p) => acc + p.maxTeams, 0)} slots
              </strong>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setProblems((prev) => prev.map((p) => ({ ...p, status: 'open' })));
                showToast('success', 'All problem statement selections OPENED', 'Bulk Update');
              }}
              className="px-3 py-1 rounded-lg bg-emerald-600/20 text-emerald-300 border border-emerald-500/30 font-semibold"
            >
              Open All
            </button>
            <button
              onClick={() => {
                setProblems((prev) => prev.map((p) => ({ ...p, status: 'paused' })));
                showToast('warning', 'All problem statement selections PAUSED', 'Bulk Update');
              }}
              className="px-3 py-1 rounded-lg bg-amber-600/20 text-amber-300 border border-amber-500/30 font-semibold"
            >
              Pause All
            </button>
            <button
              onClick={() => {
                setProblems((prev) => prev.map((p) => ({ ...p, status: 'closed' })));
                showToast('error', 'All problem statement selections CLOSED', 'Bulk Update');
              }}
              className="px-3 py-1 rounded-lg bg-rose-600/20 text-rose-300 border border-rose-500/30 font-semibold"
            >
              Close All
            </button>
          </div>
        </div>

        {/* Problem Statements Cards with live allocation progress bars */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {problems.map((prob) => {
            const percentage = Math.round((prob.selectedTeamsCount / prob.maxTeams) * 100);
            return (
              <div
                key={prob.id}
                className="p-5 rounded-2xl bg-slate-900/40 border border-slate-800/80 space-y-4 hover:border-slate-700 transition-colors"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-amber-400 bg-amber-950 px-2 py-0.5 rounded border border-amber-500/30">
                        {prob.id}
                      </span>
                      <span className="text-[11px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-300">
                        {prob.track}
                      </span>
                    </div>
                    <h3 className="text-sm font-bold text-white mt-1.5 leading-snug">{prob.title}</h3>
                    <div className="text-[11px] text-slate-400 mt-0.5 flex items-center gap-1">
                      <Building className="w-3.5 h-3.5 text-indigo-400" />
                      <span>Sponsor: {prob.sponsor}</span>
                    </div>
                  </div>

                  {/* Status badge */}
                  <span
                    className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded ${
                      prob.status === 'open'
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                        : prob.status === 'paused'
                        ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                        : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                    }`}
                  >
                    {prob.status}
                  </span>
                </div>

                {/* Progress bar */}
                <div>
                  <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                    <span>Teams Allocated:</span>
                    <strong className="text-white font-mono">
                      {prob.selectedTeamsCount} / {prob.maxTeams} teams ({prob.maxTeams - prob.selectedTeamsCount} remaining)
                    </strong>
                  </div>
                  <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden border border-slate-800">
                    <div
                      className={`h-full rounded-full transition-all ${
                        percentage >= 90
                          ? 'bg-rose-500'
                          : percentage >= 70
                          ? 'bg-amber-500'
                          : 'bg-indigo-500'
                      }`}
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>

                {/* Organizer Allocation Controls */}
                <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs">
                  <div className="text-slate-500 text-[11px]">Difficulty: {prob.difficulty}</div>
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => toggleStatus(prob.id, 'open')}
                      className="px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 text-emerald-400 border border-slate-800 text-[11px] font-semibold"
                    >
                      Open
                    </button>
                    <button
                      onClick={() => toggleStatus(prob.id, 'paused')}
                      className="px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 text-amber-400 border border-slate-800 text-[11px] font-semibold"
                    >
                      Pause
                    </button>
                    <button
                      onClick={() => toggleStatus(prob.id, 'closed')}
                      className="px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 text-rose-400 border border-slate-800 text-[11px] font-semibold"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Create Problem Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
          <div className="bg-[#0f111a] border border-slate-800 rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative">
            <button
              onClick={() => setIsAddModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-lg font-bold text-white mb-1">Create Problem Statement</h3>
            <p className="text-xs text-slate-400 mb-5">
              Add a new official challenge for participant teams.
            </p>

            <form onSubmit={handleAddProblem} className="space-y-4 text-xs">
              <div>
                <label className="text-slate-300 font-semibold block mb-1">Problem Title</label>
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Real-Time Emergency Ambulance Traffic Clearing"
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-300 font-semibold block mb-1">Track</label>
                  <select
                    value={newTrack}
                    onChange={(e) => setNewTrack(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none"
                  >
                    <option>AI & Machine Learning</option>
                    <option>FinTech</option>
                    <option>Healthcare</option>
                    <option>Sustainability</option>
                    <option>Cybersecurity</option>
                    <option>Open Innovation</option>
                  </select>
                </div>

                <div>
                  <label className="text-slate-300 font-semibold block mb-1">Difficulty</label>
                  <select
                    value={newDifficulty}
                    onChange={(e) => setNewDifficulty(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none"
                  >
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-300 font-semibold block mb-1">Sponsor / Domain Partner</label>
                  <input
                    type="text"
                    value={newSponsor}
                    onChange={(e) => setNewSponsor(e.target.value)}
                    placeholder="e.g. Cisco Systems"
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="text-slate-300 font-semibold block mb-1">Maximum Teams Allocation</label>
                  <input
                    type="number"
                    min="5"
                    max="100"
                    value={newMaxTeams}
                    onChange={(e) => setNewMaxTeams(parseInt(e.target.value) || 20)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-indigo-500 font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="text-slate-300 font-semibold block mb-1">Brief Description</label>
                <textarea
                  rows={3}
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  placeholder="Summarize the core technical challenge..."
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="flex-1 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold shadow-md shadow-indigo-600/30"
                >
                  Create Statement
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
