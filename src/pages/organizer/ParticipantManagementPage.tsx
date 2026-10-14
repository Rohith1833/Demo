import React, { useState } from 'react';
import { useHackathon } from '../../context/HackathonContext';
import { Search, Eye, CheckCircle2, Clock, XCircle, ArrowRight } from 'lucide-react';

export const ParticipantManagementPage: React.FC = () => {
  const { applications, navigate } = useHackathon();

  const [query, setQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filtered = applications.filter((app) => {
    if (statusFilter !== 'all' && app.status !== statusFilter) return false;
    if (
      query &&
      !app.name.toLowerCase().includes(query.toLowerCase()) &&
      !app.email.toLowerCase().includes(query.toLowerCase()) &&
      !app.id.toLowerCase().includes(query.toLowerCase()) &&
      !app.participantId?.toLowerCase().includes(query.toLowerCase()) &&
      !app.teamName?.toLowerCase().includes(query.toLowerCase())
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
          <h1 className="text-xl font-semibold text-[#fafafa] tracking-tight">Participant Directory</h1>
          <p className="text-xs text-[#a1a1aa] mt-1">
            Browse all {applications.length} registered candidate records, verification passes, and associated teams.
          </p>
        </div>
      </div>

      {/* Filter / Search Bar */}
      <div className="bg-[#111113] border border-[#27272a] rounded-lg p-3 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2 flex-1 min-w-[200px]">
          <Search className="w-3.5 h-3.5 text-[#71717a]" />
          <input
            type="text"
            placeholder="Search by name, email, application ID, or team name..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="bg-transparent text-xs text-[#fafafa] placeholder-[#71717a] outline-none w-full"
          />
        </div>

        <div className="flex items-center gap-2">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-[#18181b] border border-[#27272a] rounded-md px-2.5 py-1 text-xs text-[#a1a1aa] outline-none"
          >
            <option value="all">All Statuses</option>
            <option value="selected">Selected</option>
            <option value="pending">Pending</option>
            <option value="waitlisted">Waitlisted</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-[#111113] border border-[#27272a] rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#151517] border-b border-[#27272a] text-[#71717a] font-mono text-[11px]">
              <tr>
                <th className="px-4 py-2.5">Participant ID</th>
                <th className="px-4 py-2.5">Name & College</th>
                <th className="px-4 py-2.5">Degree / Branch</th>
                <th className="px-4 py-2.5">Team</th>
                <th className="px-4 py-2.5">Status</th>
                <th className="px-4 py-2.5">Payment</th>
                <th className="px-4 py-2.5">Check-In</th>
                <th className="px-4 py-2.5 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#18181b] text-[#a1a1aa]">
              {filtered.map((app) => (
                <tr key={app.id} className="hover:bg-[#18181b]/50 transition-colors">
                  <td className="px-4 py-3 font-mono font-medium text-[#3b82f6]">
                    {app.participantId || app.id}
                  </td>
                  <td className="px-4 py-3">
                    <div className="font-medium text-[#fafafa]">{app.name}</div>
                    <div className="text-[11px] text-[#71717a]">{app.college}</div>
                  </td>
                  <td className="px-4 py-3">
                    <div>{app.department}</div>
                    <div className="text-[11px] font-mono text-[#71717a]">{app.year}</div>
                  </td>
                  <td className="px-4 py-3">
                    {app.teamName ? (
                      <span className="text-[#fafafa] font-medium">{app.teamName}</span>
                    ) : (
                      <span className="text-[#52525b] italic">No Team</span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    {app.status === 'selected' && (
                      <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        Selected
                      </span>
                    )}
                    {app.status === 'pending' && (
                      <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-amber-500/10 text-amber-400 border border-amber-500/20">
                        Pending
                      </span>
                    )}
                    {app.status === 'waitlisted' && (
                      <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-blue-500/10 text-blue-400 border border-blue-500/20">
                        Waitlisted
                      </span>
                    )}
                    {app.status === 'rejected' && (
                      <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-rose-500/10 text-rose-400 border border-rose-500/20">
                        Rejected
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    {app.paymentStatus === 'verified' ? (
                      <span className="text-emerald-400 font-mono text-[11px]">Paid (₹500)</span>
                    ) : app.paymentStatus === 'pending' ? (
                      <span className="text-amber-400 font-mono text-[11px]">Pending</span>
                    ) : (
                      <span className="text-[#71717a] font-mono text-[11px]">Unpaid</span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    {app.checkInStatus ? (
                      <span className="text-emerald-400 font-mono text-[11px]">Checked In</span>
                    ) : (
                      <span className="text-[#71717a] font-mono text-[11px]">Pending</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button
                      onClick={() => navigate(`/admin/participants/${app.id}`)}
                      className="inline-flex items-center gap-1 text-xs text-[#3b82f6] hover:text-blue-400 font-medium"
                    >
                      <span>View</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
