import React, { useState } from 'react';
import { useHackathon } from '../../context/HackathonContext';
import { ParticipantApplication } from '../../types';
import {
  QrCode,
  Search,
  CheckCircle2,
  AlertTriangle,
  UserCheck,
  Camera,
  RefreshCw,
  Users,
  ShieldAlert,
} from 'lucide-react';

export const CheckinPage: React.FC = () => {
  const { applications, checkInParticipant, showToast } = useHackathon();

  const [inputQuery, setInputQuery] = useState('NXH-P-0421');
  const [lastCheckinResult, setLastCheckinResult] = useState<{
    success: boolean;
    message: string;
    applicant?: ParticipantApplication;
  } | null>(null);
  const [isScanning, setIsScanning] = useState(false);

  const totalRegistered = applications.filter((a) => a.status === 'selected').length;
  const totalCheckedIn = applications.filter((a) => a.checkInStatus).length;
  const pendingCheckIn = totalRegistered - totalCheckedIn;

  const handleManualCheckIn = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputQuery.trim()) return;
    const res = checkInParticipant(inputQuery.trim());
    setLastCheckinResult(res);
  };

  const simulateQrScan = (targetId: string = 'NXH-P-0421') => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      const res = checkInParticipant(targetId);
      setLastCheckinResult(res);
      setInputQuery(targetId);
    }, 900);
  };

  return (
    <div className="min-h-screen bg-[#090a0f] text-slate-100 py-8 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div>
          <span className="text-xs font-mono uppercase tracking-wider text-emerald-400 bg-emerald-950/60 px-3 py-1 rounded-full border border-emerald-500/20">
            Reception Desk
          </span>
          <h1 className="text-3xl font-extrabold text-white mt-2">Event Check-In & Badge Station</h1>
          <p className="text-xs text-slate-400 mt-1">
            Scan attendee QR code passes or search by Participant ID / USN / Name for instant check-in.
          </p>
        </div>

        {/* 3 Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 rounded-2xl bg-slate-900/40 border border-slate-800/80">
            <div className="text-xs text-slate-400">Total Confirmed</div>
            <div className="text-2xl font-black text-white mt-1">500</div>
            <div className="text-[10px] text-slate-500">100% capacity filled</div>
          </div>
          <div className="p-4 rounded-2xl bg-slate-900/40 border border-slate-800/80">
            <div className="text-xs text-emerald-400">Checked In On-Site</div>
            <div className="text-2xl font-black text-emerald-400 mt-1">{totalCheckedIn + 460}</div>
            <div className="text-[10px] text-slate-500">
              {Math.round(((totalCheckedIn + 460) / 500) * 100)}% attendance rate
            </div>
          </div>
          <div className="p-4 rounded-2xl bg-slate-900/40 border border-slate-800/80">
            <div className="text-xs text-amber-400">Pending Arrival</div>
            <div className="text-2xl font-black text-amber-400 mt-1">{500 - (totalCheckedIn + 460)}</div>
            <div className="text-[10px] text-slate-500">Expected before 10:00 AM</div>
          </div>
        </div>

        {/* Check-In Simulator Area */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left: QR Camera Scanner Mockup & Trigger */}
          <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/40 border border-slate-800/80 backdrop-blur-xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Camera className="w-4 h-4 text-emerald-400" /> Optical QR Scanner
                </h3>
                <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-500/30 animate-pulse">
                  CAMERA ACTIVE
                </span>
              </div>

              {/* Viewfinder Mockup */}
              <div className="relative aspect-video rounded-2xl bg-slate-950 border border-slate-800 overflow-hidden flex items-center justify-center p-6">
                <div className="w-44 h-44 border-2 border-indigo-500/60 rounded-2xl relative flex items-center justify-center">
                  {/* Corner accents */}
                  <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-indigo-400" />
                  <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-indigo-400" />
                  <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-indigo-400" />
                  <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-indigo-400" />

                  {isScanning ? (
                    <div className="w-full h-0.5 bg-emerald-400 shadow-lg shadow-emerald-400 animate-bounce" />
                  ) : (
                    <QrCode className="w-20 h-20 text-slate-700" />
                  )}
                </div>
                <div className="absolute bottom-3 text-[11px] text-slate-400 font-mono">
                  Align participant QR code pass within frame
                </div>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
              <button
                onClick={() => simulateQrScan('NXH-P-0421')}
                disabled={isScanning}
                className="flex-1 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-md shadow-indigo-600/30 flex items-center justify-center gap-2 transition-all"
              >
                <QrCode className="w-4 h-4" />
                <span>Simulate Scan: Arjun Kumar (Pass NXH-P-0421)</span>
              </button>

              <button
                onClick={() => simulateQrScan('NXH-P-0422')}
                disabled={isScanning}
                className="py-3 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 text-xs font-semibold"
              >
                Scan Meera (NXH-P-0422)
              </button>
            </div>
          </div>

          {/* Right: Manual Lookup & Real-time Scan Result Card */}
          <div className="space-y-6">
            {/* Manual input form */}
            <form
              onSubmit={handleManualCheckIn}
              className="p-6 rounded-3xl bg-slate-900/40 border border-slate-800/80 backdrop-blur-xl space-y-4"
            >
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Search className="w-4 h-4 text-purple-400" /> Manual Participant Lookup
              </h3>

              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputQuery}
                  onChange={(e) => setInputQuery(e.target.value)}
                  placeholder="Enter Pass ID (NXH-P-0421) or Student USN or Name"
                  className="flex-1 px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                />
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-md shadow-emerald-600/30"
                >
                  Verify Check-In
                </button>
              </div>
            </form>

            {/* Check-in result banner */}
            {lastCheckinResult && (
              <div
                className={`p-6 rounded-3xl border animate-in zoom-in-95 ${
                  lastCheckinResult.success
                    ? 'bg-emerald-950/30 border-emerald-500/50 text-emerald-100 shadow-xl shadow-emerald-950/30'
                    : 'bg-rose-950/30 border-rose-500/50 text-rose-100 shadow-xl shadow-rose-950/30'
                }`}
              >
                <div className="flex items-start gap-4">
                  <div
                    className={`p-3 rounded-2xl ${
                      lastCheckinResult.success
                        ? 'bg-emerald-500/20 text-emerald-400'
                        : 'bg-rose-500/20 text-rose-400'
                    }`}
                  >
                    {lastCheckinResult.success ? (
                      <CheckCircle2 className="w-8 h-8" />
                    ) : (
                      <AlertTriangle className="w-8 h-8" />
                    )}
                  </div>

                  <div className="flex-1">
                    <div className="text-xs uppercase font-bold tracking-wider opacity-80">
                      {lastCheckinResult.success ? 'CHECK-IN SUCCESSFUL' : 'CHECK-IN BLOCKED'}
                    </div>

                    {lastCheckinResult.applicant && (
                      <div className="mt-2 space-y-1">
                        <div className="text-xl font-extrabold text-white">
                          {lastCheckinResult.applicant.name}
                        </div>
                        <div className="text-xs font-mono font-bold text-indigo-300">
                          {lastCheckinResult.applicant.participantId} • USN: {lastCheckinResult.applicant.usn}
                        </div>
                        <div className="text-xs opacity-90">
                          Team: <strong>{lastCheckinResult.applicant.teamName || 'Neural Ninjas'}</strong> •{' '}
                          {lastCheckinResult.applicant.college}
                        </div>
                      </div>
                    )}

                    <div className="text-xs mt-3 pt-3 border-t border-white/10 font-medium">
                      {lastCheckinResult.message}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Recently Checked-In Attendees Table */}
        <div className="rounded-2xl border border-slate-800/80 overflow-hidden bg-slate-950/40 backdrop-blur-md">
          <div className="p-4 bg-slate-900/60 border-b border-slate-800 text-xs font-bold text-white flex items-center justify-between">
            <span>On-Site Checked-In Attendees ({totalCheckedIn})</span>
            <span className="text-[10px] text-slate-500">Live reception terminal</span>
          </div>
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-900/40 text-slate-400 uppercase font-mono text-[10px]">
              <tr>
                <th className="p-3">Pass ID</th>
                <th className="p-3">Attendee</th>
                <th className="p-3">College</th>
                <th className="p-3">Team</th>
                <th className="p-3">Check-in Timestamp</th>
                <th className="p-3 text-right">Badge Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {applications
                .filter((a) => a.checkInStatus)
                .map((a) => (
                  <tr key={a.id} className="hover:bg-slate-900/40">
                    <td className="p-3 font-mono text-indigo-400 font-semibold">{a.participantId}</td>
                    <td className="p-3 font-medium text-white">{a.name}</td>
                    <td className="p-3 text-slate-400">{a.college}</td>
                    <td className="p-3 text-purple-300">{a.teamName || 'Assigned'}</td>
                    <td className="p-3 font-mono text-slate-400">
                      {a.checkedInAt ? new Date(a.checkedInAt).toLocaleTimeString() : '08:14 AM'}
                    </td>
                    <td className="p-3 text-right">
                      <span className="text-[10px] font-semibold text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/30">
                        Printed & Active
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
