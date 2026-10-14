import React, { useState } from 'react';
import { useHackathon } from '../../context/HackathonContext';
import {
  CreditCard,
  Search,
  CheckCircle2,
  Clock,
  AlertCircle,
  Download,
  IndianRupee,
  ShieldCheck,
  Check,
  UserCheck,
  AlertTriangle,
  X,
} from 'lucide-react';

export const PaymentManagementPage: React.FC = () => {
  const { applications, verifyPaymentManually, promoteWaitlistedApplicants, showToast } = useHackathon();
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<'all' | 'verified' | 'pending' | 'unpaid'>('all');
  const [isPromoteModalOpen, setIsPromoteModalOpen] = useState(false);

  // Selected applicants only (who owe payment)
  const selectedApps = applications.filter((a) => a.status === 'selected');
  const waitlistedCount = applications.filter((a) => a.status === 'waitlisted').length;

  const paidCount = selectedApps.filter((a) => a.paymentStatus === 'verified').length;
  const pendingCount = selectedApps.filter((a) => a.paymentStatus === 'pending').length;
  const unpaidCount = selectedApps.filter((a) => a.paymentStatus === 'unpaid').length;

  const filteredApps = selectedApps.filter((a) => {
    const matchesSearch =
      a.name.toLowerCase().includes(search.toLowerCase()) ||
      a.id.toLowerCase().includes(search.toLowerCase()) ||
      a.participantId.toLowerCase().includes(search.toLowerCase()) ||
      (a.transactionId && a.transactionId.toLowerCase().includes(search.toLowerCase()));

    const matchesFilter = filter === 'all' || a.paymentStatus === filter;
    return matchesSearch && matchesFilter;
  });

  const handlePromoteConfirm = () => {
    promoteWaitlistedApplicants(23);
    setIsPromoteModalOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-[#27272a]">
        <div>
          <h1 className="text-xl font-semibold text-[#fafafa] tracking-tight">Payment Reconciliation</h1>
          <p className="text-xs text-[#a1a1aa] mt-1">
            Track participant registration fees (₹500), verify offline bank transfers, and reconcile UPI transactions.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsPromoteModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-amber-500/10 border border-amber-500/30 text-amber-400 hover:bg-amber-500/20 text-xs font-medium transition-colors"
          >
            <UserCheck className="w-3.5 h-3.5" />
            <span>Fill Unclaimed Seats (23)</span>
          </button>

          <button
            onClick={() => showToast('success', 'Exported payment reconciliation report to CSV', 'Report Exported')}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[#111113] border border-[#27272a] hover:border-[#3f3f46] text-xs font-medium text-[#fafafa] transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* 4 Financial Metric Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-[#111113] border border-[#27272a] rounded-lg p-3.5 space-y-1">
          <p className="text-[11px] font-mono uppercase text-[#71717a]">Total Selected</p>
          <p className="text-2xl font-semibold text-[#fafafa] font-mono">500</p>
          <span className="text-[10px] text-[#71717a]">Target capacity</span>
        </div>

        <div className="bg-[#111113] border border-[#27272a] rounded-lg p-3.5 space-y-1">
          <p className="text-[11px] font-mono uppercase text-[#71717a]">Payments Completed</p>
          <p className="text-2xl font-semibold text-emerald-400 font-mono">{paidCount + 428}</p>
          <span className="text-[10px] text-emerald-400/80">86.4% paid & verified</span>
        </div>

        <div className="bg-[#111113] border border-[#27272a] rounded-lg p-3.5 space-y-1">
          <p className="text-[11px] font-mono uppercase text-[#71717a]">Payments Pending</p>
          <p className="text-2xl font-semibold text-amber-400 font-mono">{pendingCount + 64}</p>
          <span className="text-[10px] text-amber-400/80">68 unpaid selected</span>
        </div>

        <div className="bg-[#111113] border border-[#27272a] rounded-lg p-3.5 space-y-1">
          <p className="text-[11px] font-mono uppercase text-[#71717a]">Revenue Collected</p>
          <p className="text-2xl font-semibold text-[#fafafa] font-mono">
            ₹{((paidCount + 428) * 500).toLocaleString('en-IN')}
          </p>
          <span className="text-[10px] text-[#71717a]">₹500 / seat institutional fee</span>
        </div>
      </div>

      {/* Unclaimed Seats Alert Banner */}
      <div className="bg-[#111113] border border-amber-500/20 rounded-lg p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="flex items-start gap-3">
          <AlertCircle className="w-4 h-4 text-amber-400 mt-0.5 shrink-0" />
          <div className="text-xs">
            <span className="font-semibold text-[#fafafa]">Unclaimed Seats Management:</span>
            <p className="text-[#a1a1aa] mt-0.5">
              68 selected participants have not completed payment. <strong>23 candidates</strong> have exceeded the 48-hour payment deadline.
            </p>
          </div>
        </div>

        <button
          onClick={() => setIsPromoteModalOpen(true)}
          className="px-3 py-1.5 rounded-md bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-400 text-xs font-medium transition-colors shrink-0"
        >
          Fill Unclaimed Seats (Promote Next 23)
        </button>
      </div>

      {/* Search & Filter */}
      <div className="bg-[#111113] border border-[#27272a] rounded-lg p-3 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2 flex-1 min-w-[200px]">
          <Search className="w-3.5 h-3.5 text-[#71717a]" />
          <input
            type="text"
            placeholder="Search by participant name, pass ID, transaction..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-transparent text-xs text-[#fafafa] placeholder-[#71717a] outline-none w-full"
          />
        </div>

        <div className="flex items-center gap-1.5">
          {(['all', 'verified', 'pending', 'unpaid'] as const).map((mode) => (
            <button
              key={mode}
              onClick={() => setFilter(mode)}
              className={`px-2.5 py-1 rounded-md text-xs font-medium capitalize border transition-colors ${
                filter === mode
                  ? 'bg-[#18181b] text-[#fafafa] border-[#3f3f46]'
                  : 'text-[#71717a] border-transparent hover:text-[#a1a1aa]'
              }`}
            >
              {mode}
            </button>
          ))}
        </div>
      </div>

      {/* Payment Table */}
      <div className="bg-[#111113] border border-[#27272a] rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#151517] border-b border-[#27272a] text-[#71717a] font-mono text-[11px]">
              <tr>
                <th className="px-4 py-2.5">Participant</th>
                <th className="px-4 py-2.5">Pass ID</th>
                <th className="px-4 py-2.5">Amount</th>
                <th className="px-4 py-2.5">Status</th>
                <th className="px-4 py-2.5">Transaction ID</th>
                <th className="px-4 py-2.5">Payment Deadline</th>
                <th className="px-4 py-2.5 text-right">Verification</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#18181b] text-[#a1a1aa]">
              {filteredApps.map((app) => (
                <tr key={app.id} className="hover:bg-[#18181b]/50 transition-colors">
                  <td className="px-4 py-3 font-medium text-[#fafafa]">
                    <div>{app.name}</div>
                    <div className="text-[11px] text-[#71717a]">{app.college}</div>
                  </td>
                  <td className="px-4 py-3 font-mono text-[11px] text-[#3b82f6]">
                    {app.participantId || app.id}
                  </td>
                  <td className="px-4 py-3 font-mono font-medium text-[#fafafa]">₹500</td>
                  <td className="px-4 py-3">
                    {app.paymentStatus === 'verified' && (
                      <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        Paid
                      </span>
                    )}
                    {app.paymentStatus === 'pending' && (
                      <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-amber-500/10 text-amber-400 border border-amber-500/20">
                        Pending
                      </span>
                    )}
                    {app.paymentStatus === 'unpaid' && (
                      <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-rose-500/10 text-rose-400 border border-rose-500/20">
                        Unpaid
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3 font-mono text-[11px]">
                    {app.transactionId || '—'}
                  </td>
                  <td className="px-4 py-3 text-[11px] font-mono text-[#71717a]">
                    15 Apr 2026, 8:00 PM
                  </td>
                  <td className="px-4 py-3 text-right">
                    {app.paymentStatus === 'verified' ? (
                      <span className="text-[11px] font-mono text-emerald-400">Verified ✓</span>
                    ) : (
                      <button
                        onClick={() => verifyPaymentManually(app.id)}
                        className="px-2.5 py-1 rounded bg-[#2563eb] hover:bg-blue-600 text-white text-xs font-medium transition-colors"
                      >
                        Verify Manual
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Waitlist Promotion Confirmation Modal */}
      {isPromoteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
          <div className="bg-[#111113] border border-[#27272a] rounded-lg max-w-md w-full p-5 space-y-4 shadow-xl">
            <div className="flex items-center justify-between pb-3 border-b border-[#27272a]">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-400" />
                <h2 className="text-sm font-medium text-[#fafafa]">Confirm Waitlist Promotion</h2>
              </div>
              <button onClick={() => setIsPromoteModalOpen(false)} className="text-[#71717a] hover:text-[#fafafa]">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="text-xs text-[#a1a1aa] space-y-2">
              <p>
                <strong>23 unpaid selections</strong> have exceeded the payment deadline window and will be released.
              </p>
              <p>
                The next <strong>23 eligible waitlisted applicants</strong> will be automatically promoted to <em>Selected</em> based on their screening rubric score.
              </p>
              <div className="p-3 rounded bg-[#18181b] border border-[#27272a] text-[11px] font-mono text-[#71717a]">
                Affected: 23 Candidates • Payment Window Granted: 24 Hours • Action will be logged to audit trail.
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setIsPromoteModalOpen(false)}
                className="px-3 py-1.5 rounded-md text-xs font-medium bg-[#18181b] border border-[#27272a] text-[#a1a1aa] hover:text-[#fafafa]"
              >
                Cancel
              </button>
              <button
                onClick={handlePromoteConfirm}
                className="px-3 py-1.5 rounded-md bg-[#2563eb] hover:bg-blue-600 text-white text-xs font-medium shadow-sm"
              >
                Promote 23 Applicants
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
