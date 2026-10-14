import React, { useState } from 'react';
import { useHackathon } from '../../context/HackathonContext';
import {
  Database,
  Download,
  AlertTriangle,
  Trash2,
  ShieldAlert,
  FileSpreadsheet,
  CheckCircle2,
  X,
  RotateCcw,
} from 'lucide-react';

export const DataManagementPage: React.FC = () => {
  const { deleteEventData, resetAllData, showToast } = useHackathon();

  const [confirmModalMode, setConfirmModalMode] = useState<'participants' | 'all' | null>(null);
  const [confirmationInput, setConfirmationInput] = useState('');

  const requiredText = 'DELETE NEXHACK 2026';

  const handleExecuteDelete = () => {
    if (confirmationInput !== requiredText) {
      showToast('error', `Confirmation text must match "${requiredText}" exactly.`, 'Verification Failed');
      return;
    }

    if (confirmModalMode === 'participants') {
      deleteEventData('participants_only');
    } else if (confirmModalMode === 'all') {
      deleteEventData('all');
    }

    setConfirmModalMode(null);
    setConfirmationInput('');
  };

  return (
    <div className="min-h-screen bg-[#090a0f] text-slate-100 py-8 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div>
          <span className="text-xs font-mono uppercase tracking-wider text-rose-400 bg-rose-950/60 px-3 py-1 rounded-full border border-rose-500/20">
            Lifecycle Archival & Compliance
          </span>
          <h1 className="text-3xl font-extrabold text-white mt-2">Data Management & Archival</h1>
          <p className="text-xs text-slate-400 mt-1">
            Export comprehensive event archives, download student audits, or safely purge participant data for GDPR / DPDP compliance.
          </p>
        </div>

        {/* Current Event Status Card */}
        <div className="p-6 rounded-3xl bg-slate-900/40 border border-slate-800/80 backdrop-blur-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="text-xs text-slate-400 font-medium">Database Target Instance</div>
            <h2 className="text-xl font-bold text-white mt-0.5">NexHack 2026 Production Partition</h2>
            <div className="text-xs text-slate-400 mt-1">
              Host: <span className="text-slate-200">XYZ Institute of Technology</span> • Status:{' '}
              <span className="text-emerald-400 font-semibold">Active Snapshot</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => showToast('success', 'Full database snapshot exported (JSON + CSV)', 'Backup Ready')}
              className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 text-xs font-semibold flex items-center gap-2 transition-colors"
            >
              <Download className="w-3.5 h-3.5" /> Export All Data (JSON)
            </button>
            <button
              onClick={() => showToast('success', 'Final results ledger exported with signature hash', 'Results Downloaded')}
              className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 text-xs font-semibold flex items-center gap-2 transition-colors"
            >
              <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-400" /> Final Results (CSV)
            </button>
          </div>
        </div>

        {/* Danger Zone Card */}
        <div className="p-6 sm:p-8 rounded-3xl bg-rose-950/20 border border-rose-500/30 backdrop-blur-xl space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-rose-500/20 text-rose-400 flex items-center justify-center shrink-0">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-rose-200">Danger Zone — Destructive Operations</h3>
              <p className="text-xs text-rose-300/80 mt-0.5">
                These actions purge database records to prepare the platform for the following academic year.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {/* Delete Participant Data Only */}
            <div className="p-4 rounded-2xl bg-slate-950/60 border border-rose-500/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="text-sm font-bold text-white">Delete Participant & Team Data</div>
                <div className="text-xs text-slate-400 mt-0.5 leading-relaxed">
                  Purges all student applications, resume links, teams, and project submissions while preserving
                  rubrics, email templates, and event configuration for the next edition.
                </div>
              </div>
              <button
                onClick={() => setConfirmModalMode('participants')}
                className="px-4 py-2 rounded-xl bg-rose-950 hover:bg-rose-900 text-rose-300 border border-rose-500/40 text-xs font-bold transition-colors shrink-0"
              >
                Clear Participant Records
              </button>
            </div>

            {/* Wipe Entire Event Data */}
            <div className="p-4 rounded-2xl bg-slate-950/60 border border-rose-500/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="text-sm font-bold text-white">Delete Entire Event Instance</div>
                <div className="text-xs text-slate-400 mt-0.5 leading-relaxed">
                  Permanently destroys all NexHack 2026 data partitions, judging evaluations, and settings.
                </div>
              </div>
              <button
                onClick={() => setConfirmModalMode('all')}
                className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold transition-all shadow-md shadow-rose-600/30 shrink-0"
              >
                Delete NexHack 2026
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation Dialog */}
      {confirmModalMode && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
          <div className="bg-[#0f111a] border border-rose-500/50 rounded-3xl max-w-md w-full p-6 sm:p-8 text-center shadow-2xl relative animate-in zoom-in-95">
            <button
              onClick={() => {
                setConfirmModalMode(null);
                setConfirmationInput('');
              }}
              className="absolute top-4 right-4 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-14 h-14 rounded-full bg-rose-500/20 border border-rose-500/40 text-rose-400 flex items-center justify-center mx-auto mb-4">
              <Trash2 className="w-7 h-7" />
            </div>

            <h3 className="text-xl font-bold text-white mb-2">Destructive Confirmation</h3>
            <p className="text-xs text-slate-400 mb-4 leading-relaxed">
              This action will permanently erase applications, participant profiles, team rosters, uploaded
              submissions, and judging scorecards.
            </p>

            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-left mb-4 space-y-1">
              <span className="text-slate-400 block font-medium">To confirm, please type:</span>
              <strong className="text-rose-400 font-mono tracking-wider block">{requiredText}</strong>
            </div>

            <input
              type="text"
              value={confirmationInput}
              onChange={(e) => setConfirmationInput(e.target.value)}
              placeholder="Type confirmation phrase here..."
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white font-mono text-center focus:outline-none focus:border-rose-500 mb-5"
            />

            <div className="flex gap-2">
              <button
                onClick={() => {
                  setConfirmModalMode(null);
                  setConfirmationInput('');
                }}
                className="flex-1 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={handleExecuteDelete}
                disabled={confirmationInput !== requiredText}
                className="flex-1 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold transition-all disabled:opacity-30 shadow-lg shadow-rose-600/30"
              >
                Confirm Deletion
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
