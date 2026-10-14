import React, { useState } from 'react';
import { useHackathon } from '../../context/HackathonContext';
import { History, Search, Filter, ShieldAlert, Download } from 'lucide-react';

export const ActivityLogPage: React.FC = () => {
  const { activityLogs, showToast } = useHackathon();

  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');

  const filteredLogs = activityLogs.filter((log) => {
    if (roleFilter !== 'all' && log.role !== roleFilter) return false;
    if (categoryFilter !== 'all' && log.category !== categoryFilter) return false;
    if (
      searchQuery &&
      !log.action.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !log.user.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !log.targetId?.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false;
    }
    return true;
  });

  const handleExportCSV = () => {
    const csvContent =
      'Timestamp,User,Role,Action,TargetID,Category\n' +
      activityLogs
        .map((l) => `"${l.timestamp}","${l.user}","${l.role}","${l.action}","${l.targetId || ''}","${l.category}"`)
        .join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `NexHack2026_Audit_Trail.csv`;
    a.click();
    showToast('success', 'Exported comprehensive event audit log.', 'CSV Downloaded');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-[#27272a]">
        <div>
          <h1 className="text-xl font-semibold text-[#fafafa] tracking-tight">System Audit & Activity Log</h1>
          <p className="text-xs text-[#a1a1aa] mt-1">
            Immutable operational event ledger recording screening actions, payment verifications, problem assignments, and judging scores.
          </p>
        </div>

        <button
          onClick={handleExportCSV}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[#111113] border border-[#27272a] hover:border-[#3f3f46] text-xs font-medium text-[#fafafa] transition-colors self-start"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Export Audit Log (CSV)</span>
        </button>
      </div>

      {/* Filter Bar */}
      <div className="bg-[#111113] border border-[#27272a] rounded-lg p-3 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2 flex-1 min-w-[200px]">
          <Search className="w-3.5 h-3.5 text-[#71717a]" />
          <input
            type="text"
            placeholder="Search audit trail by actor, action, or target ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-transparent text-xs text-[#fafafa] placeholder-[#71717a] outline-none w-full"
          />
        </div>

        <div className="flex items-center gap-2">
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="bg-[#18181b] border border-[#27272a] rounded-md px-2.5 py-1 text-xs text-[#a1a1aa] outline-none"
          >
            <option value="all">All Roles</option>
            <option value="Screening Reviewer">Screening Reviewer</option>
            <option value="Finance Coordinator">Finance Coordinator</option>
            <option value="Judge">Judge</option>
            <option value="Event Admin">Event Admin</option>
            <option value="Super Admin">Super Admin</option>
            <option value="Participant">Participant</option>
          </select>

          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="bg-[#18181b] border border-[#27272a] rounded-md px-2.5 py-1 text-xs text-[#a1a1aa] outline-none"
          >
            <option value="all">All Categories</option>
            <option value="screening">Screening</option>
            <option value="payment">Payment</option>
            <option value="judging">Judging</option>
            <option value="problem">Problem Statement</option>
            <option value="operation">Operations</option>
            <option value="system">System</option>
          </select>
        </div>
      </div>

      {/* Audit Log Table */}
      <div className="bg-[#111113] border border-[#27272a] rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#151517] border-b border-[#27272a] text-[#71717a] font-mono text-[11px]">
              <tr>
                <th className="px-4 py-2.5">Time</th>
                <th className="px-4 py-2.5">User</th>
                <th className="px-4 py-2.5">Role</th>
                <th className="px-4 py-2.5">Action Performed</th>
                <th className="px-4 py-2.5">Target ID</th>
                <th className="px-4 py-2.5">Category</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#18181b] text-[#a1a1aa]">
              {filteredLogs.map((log) => (
                <tr key={log.id} className="hover:bg-[#18181b]/50 transition-colors">
                  <td className="px-4 py-2.5 font-mono text-[11px] text-[#71717a] whitespace-nowrap">
                    {log.timestamp}
                  </td>
                  <td className="px-4 py-2.5 font-medium text-[#fafafa] whitespace-nowrap">
                    {log.user}
                  </td>
                  <td className="px-4 py-2.5">
                    <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-[#18181b] border border-[#27272a] text-[#a1a1aa]">
                      {log.role}
                    </span>
                  </td>
                  <td className="px-4 py-2.5 text-[#fafafa]">{log.action}</td>
                  <td className="px-4 py-2.5 font-mono text-[11px] text-[#3b82f6]">
                    {log.targetId || '—'}
                  </td>
                  <td className="px-4 py-2.5">
                    <span className="text-[10px] font-mono uppercase text-[#71717a]">
                      {log.category}
                    </span>
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
