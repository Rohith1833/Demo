import React, { useState } from 'react';
import { useHackathon } from '../../context/HackathonContext';
import { MentorRequest } from '../../types';
import { LifeBuoy, Clock, CheckCircle2, UserCheck, Shield, AlertTriangle, Filter, Search, User } from 'lucide-react';

export const MentorRequestsPage: React.FC = () => {
  const { mentorRequests, updateMentorRequestStatus } = useHackathon();

  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [urgencyFilter, setUrgencyFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Counters
  const waitingCount = mentorRequests.filter((r) => r.status === 'Waiting').length;
  const assignedCount = mentorRequests.filter((r) => r.status === 'Assigned').length;
  const inProgressCount = mentorRequests.filter((r) => r.status === 'In Progress').length;
  const resolvedCount = mentorRequests.filter((r) => r.status === 'Resolved').length;

  const filteredRequests = mentorRequests.filter((req) => {
    if (statusFilter !== 'all' && req.status !== statusFilter) return false;
    if (categoryFilter !== 'all' && req.category !== categoryFilter) return false;
    if (urgencyFilter !== 'all' && req.urgency !== urgencyFilter) return false;
    if (
      searchQuery &&
      !req.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !req.teamName.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !req.id.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false;
    }
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-[#27272a]">
        <div>
          <h1 className="text-xl font-semibold text-[#fafafa] tracking-tight">Mentor Requests Queue</h1>
          <p className="text-xs text-[#a1a1aa] mt-1">
            Live triage of on-site technical blockers, problem statement queries, and lab hardware tickets.
          </p>
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-[#111113] border border-[#27272a] rounded-lg p-3.5">
          <p className="text-[11px] font-mono uppercase text-[#71717a]">Awaiting Mentor</p>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-2xl font-semibold text-rose-400 font-mono">{waitingCount}</span>
            <span className="text-xs text-rose-400/80">urgent triage</span>
          </div>
        </div>

        <div className="bg-[#111113] border border-[#27272a] rounded-lg p-3.5">
          <p className="text-[11px] font-mono uppercase text-[#71717a]">Mentor Assigned</p>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-2xl font-semibold text-blue-400 font-mono">{assignedCount}</span>
            <span className="text-xs text-[#71717a]">en route to desk</span>
          </div>
        </div>

        <div className="bg-[#111113] border border-[#27272a] rounded-lg p-3.5">
          <p className="text-[11px] font-mono uppercase text-[#71717a]">In Progress</p>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-2xl font-semibold text-purple-400 font-mono">{inProgressCount}</span>
            <span className="text-xs text-[#71717a]">debugging with team</span>
          </div>
        </div>

        <div className="bg-[#111113] border border-[#27272a] rounded-lg p-3.5">
          <p className="text-[11px] font-mono uppercase text-[#71717a]">Resolved Today</p>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-2xl font-semibold text-emerald-400 font-mono">{resolvedCount}</span>
            <span className="text-xs text-emerald-400/80">avg 18m turnaround</span>
          </div>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="bg-[#111113] border border-[#27272a] rounded-lg p-3 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2 flex-1 min-w-[200px]">
          <Search className="w-3.5 h-3.5 text-[#71717a]" />
          <input
            type="text"
            placeholder="Search by ticket ID, team name, or issue keywords..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-transparent text-xs text-[#fafafa] placeholder-[#71717a] outline-none w-full"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-[#18181b] border border-[#27272a] rounded-md px-2.5 py-1 text-xs text-[#a1a1aa] outline-none"
          >
            <option value="all">All Statuses</option>
            <option value="Waiting">Waiting</option>
            <option value="Assigned">Assigned</option>
            <option value="In Progress">In Progress</option>
            <option value="Resolved">Resolved</option>
          </select>

          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="bg-[#18181b] border border-[#27272a] rounded-md px-2.5 py-1 text-xs text-[#a1a1aa] outline-none"
          >
            <option value="all">All Categories</option>
            <option value="Technical">Technical</option>
            <option value="Problem Statement">Problem Statement</option>
            <option value="Hardware">Hardware</option>
            <option value="Infrastructure">Infrastructure</option>
            <option value="Organizer">Organizer</option>
          </select>

          <select
            value={urgencyFilter}
            onChange={(e) => setUrgencyFilter(e.target.value)}
            className="bg-[#18181b] border border-[#27272a] rounded-md px-2.5 py-1 text-xs text-[#a1a1aa] outline-none"
          >
            <option value="all">All Urgency</option>
            <option value="Urgent">Urgent Only</option>
            <option value="Normal">Normal</option>
          </select>
        </div>
      </div>

      {/* Tickets List */}
      <div className="space-y-3">
        {filteredRequests.map((req) => (
          <div
            key={req.id}
            className="bg-[#111113] border border-[#27272a] rounded-lg p-4 space-y-3 hover:border-[#3f3f46] transition-colors"
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <div className="flex items-center gap-2.5 flex-wrap">
                <span className="text-xs font-mono font-medium text-[#3b82f6]">{req.id}</span>
                <span className="text-xs font-medium text-[#fafafa]">{req.teamName}</span>
                <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-[#18181b] border border-[#27272a] text-[#a1a1aa]">
                  {req.category}
                </span>
                {req.urgency === 'Urgent' ? (
                  <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-rose-500/10 text-rose-400 border border-rose-500/30">
                    Urgent
                  </span>
                ) : (
                  <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-[#18181b] text-[#71717a]">
                    Normal
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2">
                {req.status === 'Waiting' && (
                  <span className="text-[11px] font-mono text-amber-400 flex items-center gap-1">
                    <Clock className="w-3 h-3" /> Waiting: {req.waitingMinutes} min
                  </span>
                )}
                {req.status === 'Assigned' && (
                  <span className="text-[11px] font-mono text-blue-400 flex items-center gap-1">
                    <UserCheck className="w-3 h-3" /> Assigned: {req.assignedMentor}
                  </span>
                )}
                {req.status === 'In Progress' && (
                  <span className="text-[11px] font-mono text-purple-400 flex items-center gap-1">
                    <Shield className="w-3 h-3" /> In Progress ({req.assignedMentor})
                  </span>
                )}
                {req.status === 'Resolved' && (
                  <span className="text-[11px] font-mono text-emerald-400 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> Resolved
                  </span>
                )}
              </div>
            </div>

            <div>
              <h3 className="text-xs font-medium text-[#fafafa]">{req.title}</h3>
              <p className="text-xs text-[#a1a1aa] mt-1 bg-[#18181b] p-2 rounded border border-[#27272a]">
                {req.description}
              </p>
            </div>

            {/* Actions Toolbar */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-1 border-t border-[#18181b]">
              <span className="text-[11px] text-[#71717a] font-mono">Created at {req.createdAt}</span>

              <div className="flex items-center gap-2">
                {req.status === 'Waiting' && (
                  <>
                    <button
                      onClick={() => updateMentorRequestStatus(req.id, 'Assigned', 'Lead Technical Mentor')}
                      className="px-2.5 py-1 rounded bg-[#18181b] hover:bg-[#27272a] border border-[#27272a] text-xs font-medium text-[#fafafa] transition-colors"
                    >
                      Claim Ticket
                    </button>
                    <button
                      onClick={() => updateMentorRequestStatus(req.id, 'Assigned', 'Domain Specialist')}
                      className="px-2.5 py-1 rounded bg-[#2563eb] hover:bg-blue-600 text-white text-xs font-medium transition-colors"
                    >
                      Assign Mentor
                    </button>
                  </>
                )}

                {req.status === 'Assigned' && (
                  <button
                    onClick={() => updateMentorRequestStatus(req.id, 'In Progress')}
                    className="px-2.5 py-1 rounded bg-[#18181b] hover:bg-[#27272a] border border-[#27272a] text-xs font-medium text-purple-400 transition-colors"
                  >
                    Start Session
                  </button>
                )}

                {req.status === 'In Progress' && (
                  <button
                    onClick={() => updateMentorRequestStatus(req.id, 'Resolved')}
                    className="px-2.5 py-1 rounded bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-medium transition-colors"
                  >
                    Mark Resolved
                  </button>
                )}

                {req.status === 'Resolved' && (
                  <button
                    onClick={() => updateMentorRequestStatus(req.id, 'In Progress')}
                    className="px-2 py-1 rounded text-[11px] text-[#71717a] hover:text-[#a1a1aa]"
                  >
                    Reopen
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
