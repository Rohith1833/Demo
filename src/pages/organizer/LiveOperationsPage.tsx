import React, { useState } from 'react';
import { useHackathon } from '../../context/HackathonContext';
import { OperationalIssue } from '../../types';
import { Activity, Plus, AlertCircle, CheckCircle2, Clock, MapPin, X } from 'lucide-react';

export const LiveOperationsPage: React.FC = () => {
  const { operationalIssues, addOperationalIssue, updateOperationalIssueStatus } = useHackathon();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState<OperationalIssue['category']>('Infrastructure');
  const [newPriority, setNewPriority] = useState<OperationalIssue['priority']>('High');
  const [newAssignedTo, setNewAssignedTo] = useState('Volunteer Crew');
  const [newLocation, setNewLocation] = useState('');
  const [newNotes, setNewNotes] = useState('');

  const openCount = operationalIssues.filter((i) => i.status === 'Open').length;
  const criticalCount = operationalIssues.filter((i) => i.priority === 'Critical' && i.status !== 'Resolved').length;
  const inProgressCount = operationalIssues.filter((i) => i.status === 'In Progress' || i.status === 'Assigned').length;
  const resolvedCount = operationalIssues.filter((i) => i.status === 'Resolved').length;

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    addOperationalIssue({
      title: newTitle,
      category: newCategory,
      priority: newPriority,
      assignedTo: newAssignedTo,
      location: newLocation || 'Campus Venue',
      notes: newNotes,
      status: 'Open',
    });

    setNewTitle('');
    setNewLocation('');
    setNewNotes('');
    setIsModalOpen(false);
  };

  const getPriorityBadge = (priority: OperationalIssue['priority']) => {
    switch (priority) {
      case 'Critical':
        return <span className="px-1.5 py-0.2 rounded text-[10px] font-mono bg-rose-500/10 text-rose-400 border border-rose-500/30">Critical</span>;
      case 'High':
        return <span className="px-1.5 py-0.2 rounded text-[10px] font-mono bg-amber-500/10 text-amber-400 border border-amber-500/30">High</span>;
      case 'Medium':
        return <span className="px-1.5 py-0.2 rounded text-[10px] font-mono bg-blue-500/10 text-blue-400 border border-blue-500/30">Medium</span>;
      case 'Low':
        return <span className="px-1.5 py-0.2 rounded text-[10px] font-mono bg-zinc-800 text-zinc-400 border border-zinc-700">Low</span>;
    }
  };

  const getStatusBadge = (status: OperationalIssue['status']) => {
    switch (status) {
      case 'Open':
        return <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-rose-500/10 text-rose-400 border border-rose-500/20">Open</span>;
      case 'Assigned':
        return <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-blue-500/10 text-blue-400 border border-blue-500/20">Assigned</span>;
      case 'In Progress':
        return <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-purple-500/10 text-purple-400 border border-purple-500/20">In Progress</span>;
      case 'Resolved':
        return <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">Resolved</span>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-[#27272a]">
        <div>
          <h1 className="text-xl font-semibold text-[#fafafa] tracking-tight">Live Event Operations</h1>
          <p className="text-xs text-[#a1a1aa] mt-1">
            Physical logistics, laboratory power grid, Wi-Fi infrastructure, and stage AV monitoring desk.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[#2563eb] hover:bg-blue-600 text-white text-xs font-medium transition-colors shadow-sm self-start"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Log Incident</span>
        </button>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-[#111113] border border-[#27272a] rounded-lg p-3.5">
          <p className="text-[11px] font-mono uppercase text-[#71717a]">Open Issues</p>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-2xl font-semibold text-rose-400 font-mono">{openCount}</span>
            <span className="text-xs text-[#71717a]">unresolved</span>
          </div>
        </div>

        <div className="bg-[#111113] border border-[#27272a] rounded-lg p-3.5">
          <p className="text-[11px] font-mono uppercase text-[#71717a]">Critical Priority</p>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-2xl font-semibold text-amber-400 font-mono">{criticalCount}</span>
            <span className="text-xs text-amber-400/80">needs action</span>
          </div>
        </div>

        <div className="bg-[#111113] border border-[#27272a] rounded-lg p-3.5">
          <p className="text-[11px] font-mono uppercase text-[#71717a]">In Progress</p>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-2xl font-semibold text-purple-400 font-mono">{inProgressCount}</span>
            <span className="text-xs text-[#71717a]">assigned crew</span>
          </div>
        </div>

        <div className="bg-[#111113] border border-[#27272a] rounded-lg p-3.5">
          <p className="text-[11px] font-mono uppercase text-[#71717a]">Resolved Today</p>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-2xl font-semibold text-emerald-400 font-mono">{resolvedCount}</span>
            <span className="text-xs text-emerald-400/80">cleared</span>
          </div>
        </div>
      </div>

      {/* Issues Table */}
      <div className="bg-[#111113] border border-[#27272a] rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#151517] border-b border-[#27272a] text-[#71717a] font-mono text-[11px]">
              <tr>
                <th className="px-4 py-2.5">ID</th>
                <th className="px-4 py-2.5">Issue Summary</th>
                <th className="px-4 py-2.5">Category</th>
                <th className="px-4 py-2.5">Priority</th>
                <th className="px-4 py-2.5">Location</th>
                <th className="px-4 py-2.5">Assigned To</th>
                <th className="px-4 py-2.5">Status</th>
                <th className="px-4 py-2.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#18181b] text-[#a1a1aa]">
              {operationalIssues.map((issue) => (
                <tr key={issue.id} className="hover:bg-[#18181b]/50 transition-colors">
                  <td className="px-4 py-3 font-mono font-medium text-[#3b82f6]">{issue.id}</td>
                  <td className="px-4 py-3 font-medium text-[#fafafa]">
                    <div>{issue.title}</div>
                    {issue.notes && (
                      <div className="text-[11px] text-[#71717a] mt-0.5 line-clamp-1">{issue.notes}</div>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <span className="font-mono text-[11px] text-[#a1a1aa] bg-[#18181b] px-1.5 py-0.5 rounded border border-[#27272a]">
                      {issue.category}
                    </span>
                  </td>
                  <td className="px-4 py-3">{getPriorityBadge(issue.priority)}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1 text-[11px] text-[#a1a1aa]">
                      <MapPin className="w-3 h-3 text-[#71717a]" />
                      <span>{issue.location || 'Campus'}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-[#fafafa]">{issue.assignedTo}</td>
                  <td className="px-4 py-3">{getStatusBadge(issue.status)}</td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      {issue.status !== 'Resolved' ? (
                        <>
                          {issue.status === 'Open' && (
                            <button
                              onClick={() => updateOperationalIssueStatus(issue.id, 'In Progress')}
                              className="px-2 py-1 rounded bg-[#18181b] hover:bg-[#27272a] border border-[#27272a] text-[11px] text-[#fafafa]"
                            >
                              Start
                            </button>
                          )}
                          <button
                            onClick={() => updateOperationalIssueStatus(issue.id, 'Resolved')}
                            className="px-2 py-1 rounded bg-emerald-600/20 text-emerald-400 hover:bg-emerald-600/30 border border-emerald-500/30 text-[11px]"
                          >
                            Resolve
                          </button>
                        </>
                      ) : (
                        <button
                          onClick={() => updateOperationalIssueStatus(issue.id, 'Open')}
                          className="text-[11px] text-[#71717a] hover:text-[#a1a1aa]"
                        >
                          Reopen
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal: Create Issue */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="bg-[#111113] border border-[#27272a] rounded-lg max-w-md w-full p-5 space-y-4 shadow-xl">
            <div className="flex items-center justify-between pb-3 border-b border-[#27272a]">
              <h2 className="text-sm font-medium text-[#fafafa]">Log Operational Issue</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-[#71717a] hover:text-[#fafafa]">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreate} className="space-y-3.5">
              <div>
                <label className="block text-xs font-medium text-[#a1a1aa] mb-1">Incident Title</label>
                <input
                  type="text"
                  placeholder="e.g. Lab 2 Wi-Fi disconnected"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  required
                  className="w-full bg-[#18181b] border border-[#27272a] focus:border-[#3b82f6] rounded-md px-3 py-1.5 text-xs text-[#fafafa] outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-[#a1a1aa] mb-1">Category</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as any)}
                    className="w-full bg-[#18181b] border border-[#27272a] rounded-md px-2.5 py-1.5 text-xs text-[#fafafa] outline-none"
                  >
                    <option value="Infrastructure">Infrastructure</option>
                    <option value="AV">Stage AV</option>
                    <option value="Logistics">Logistics / Food</option>
                    <option value="Network">Network</option>
                    <option value="Mentorship">Mentorship</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#a1a1aa] mb-1">Priority</label>
                  <select
                    value={newPriority}
                    onChange={(e) => setNewPriority(e.target.value as any)}
                    className="w-full bg-[#18181b] border border-[#27272a] rounded-md px-2.5 py-1.5 text-xs text-[#fafafa] outline-none"
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                    <option value="Critical">Critical</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-[#a1a1aa] mb-1">Venue Location</label>
                <input
                  type="text"
                  placeholder="e.g. Block B, Lab 2, Row 3"
                  value={newLocation}
                  onChange={(e) => setNewLocation(e.target.value)}
                  className="w-full bg-[#18181b] border border-[#27272a] focus:border-[#3b82f6] rounded-md px-3 py-1.5 text-xs text-[#fafafa] outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#a1a1aa] mb-1">Assigned Crew</label>
                <input
                  type="text"
                  placeholder="e.g. Network Team (Mr. Suresh)"
                  value={newAssignedTo}
                  onChange={(e) => setNewAssignedTo(e.target.value)}
                  className="w-full bg-[#18181b] border border-[#27272a] focus:border-[#3b82f6] rounded-md px-3 py-1.5 text-xs text-[#fafafa] outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#a1a1aa] mb-1">Internal Notes</label>
                <textarea
                  rows={2}
                  placeholder="Diagnostic details..."
                  value={newNotes}
                  onChange={(e) => setNewNotes(e.target.value)}
                  className="w-full bg-[#18181b] border border-[#27272a] focus:border-[#3b82f6] rounded-md px-3 py-1.5 text-xs text-[#fafafa] outline-none resize-none"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-3 py-1.5 rounded-md text-xs font-medium bg-[#18181b] border border-[#27272a] text-[#a1a1aa] hover:text-[#fafafa]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-3 py-1.5 rounded-md bg-[#2563eb] hover:bg-blue-600 text-white text-xs font-medium"
                >
                  Log Issue
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
