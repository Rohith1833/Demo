import React, { useState } from 'react';
import { useHackathon } from '../../context/HackathonContext';
import {
  ShieldCheck,
  Check,
  X,
  Lock,
  UserCheck,
  Sliders,
  Shield,
  Save,
} from 'lucide-react';

export const PermissionsPage: React.FC = () => {
  const { showToast } = useHackathon();

  const roles = [
    { id: 'superadmin', name: 'Super Admin', desc: 'Full institutional control, event creation, data purging' },
    { id: 'eventadmin', name: 'Event Admin (Faculty Lead)', desc: 'Full operations across screening, tracks, and judging' },
    { id: 'reviewer', name: 'Screening Reviewer', desc: 'Score applicants, select/waitlist candidates' },
    { id: 'finance', name: 'Finance Coordinator', desc: 'Verify UPI payments, reconcile fees' },
    { id: 'problem_mgr', name: 'Problem Statement Manager', desc: 'Manage track briefs, team allocation quotas' },
    { id: 'judge_coord', name: 'Judge Coordinator', desc: 'Assign jury members, monitor scoring consensus' },
    { id: 'volunteer', name: 'Check-In Volunteer', desc: 'Scan participant QR passes at registration counter' },
  ];

  const permissionsList = [
    { id: 'view_participants', label: 'View Participant Profiles' },
    { id: 'review_apps', label: 'Review & Score Applications' },
    { id: 'manage_payments', label: 'Verify Payments & Treasury' },
    { id: 'manage_teams', label: 'Manage Team Rosters' },
    { id: 'create_problems', label: 'Create & Allocate Problem Statements' },
    { id: 'assign_judges', label: 'Assign Judges & Oversee Rubrics' },
    { id: 'publish_results', label: 'Publish Leaderboard & Winners' },
    { id: 'scan_checkin', label: 'Scan Attendee QR Check-In' },
    { id: 'delete_event', label: 'Purge Event / Data Danger Zone' },
  ];

  // Default permissions mapping
  const [matrix, setMatrix] = useState<Record<string, string[]>>({
    superadmin: permissionsList.map((p) => p.id),
    eventadmin: ['view_participants', 'review_apps', 'manage_payments', 'manage_teams', 'create_problems', 'assign_judges', 'publish_results', 'scan_checkin'],
    reviewer: ['view_participants', 'review_apps'],
    finance: ['view_participants', 'manage_payments'],
    problem_mgr: ['view_participants', 'create_problems'],
    judge_coord: ['view_participants', 'assign_judges', 'publish_results'],
    volunteer: ['view_participants', 'scan_checkin'],
  });

  const togglePermission = (roleId: string, permId: string) => {
    if (roleId === 'superadmin') return; // Cannot edit superadmin
    setMatrix((prev) => {
      const current = prev[roleId] || [];
      const updated = current.includes(permId)
        ? current.filter((id) => id !== permId)
        : [...current, permId];
      return { ...prev, [roleId]: updated };
    });
  };

  const handleSave = () => {
    showToast('success', 'Security ACL role permissions saved to database.', 'Permissions Updated');
  };

  return (
    <div className="min-h-screen bg-[#090a0f] text-slate-100 py-8 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-mono uppercase tracking-wider text-rose-400 bg-rose-950/60 px-3 py-1 rounded-full border border-rose-500/20">
              Access Control Lists (ACL)
            </span>
            <h1 className="text-3xl font-extrabold text-white mt-2">Role Permissions Matrix</h1>
            <p className="text-xs text-slate-400 mt-1">
              Configure fine-grained role capabilities for faculty coordinators, screening reviewers, volunteers, and judges.
            </p>
          </div>

          <button
            onClick={handleSave}
            className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-md shadow-indigo-600/30 flex items-center gap-1.5 transition-all hover:scale-102"
          >
            <Save className="w-4 h-4" /> Save Access Matrix
          </button>
        </div>

        {/* Roles Matrix Table */}
        <div className="rounded-3xl border border-slate-800/80 overflow-hidden bg-slate-950/40 backdrop-blur-md shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-900/80 border-b border-slate-800 text-slate-400 uppercase font-mono text-[10px] tracking-wider">
                <tr>
                  <th className="p-4 w-56">Permission Capability</th>
                  {roles.map((r) => (
                    <th key={r.id} className="p-4 text-center">
                      <div className="font-bold text-white normal-case text-xs">{r.name}</div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {permissionsList.map((perm) => (
                  <tr key={perm.id} className="hover:bg-slate-900/40 transition-colors">
                    <td className="p-4 font-medium text-white">
                      <div>{perm.label}</div>
                      <div className="text-[10px] font-mono text-slate-500">{perm.id}</div>
                    </td>
                    {roles.map((role) => {
                      const hasPerm = matrix[role.id]?.includes(perm.id);
                      return (
                        <td key={role.id} className="p-4 text-center">
                          <button
                            type="button"
                            onClick={() => togglePermission(role.id, perm.id)}
                            disabled={role.id === 'superadmin'}
                            className={`w-6 h-6 rounded-lg inline-flex items-center justify-center transition-all ${
                              hasPerm
                                ? 'bg-indigo-600/30 border border-indigo-500/50 text-indigo-300'
                                : 'bg-slate-900 border border-slate-800 text-slate-600'
                            }`}
                          >
                            {hasPerm ? <Check className="w-3.5 h-3.5" /> : <X className="w-3.5 h-3.5" />}
                          </button>
                        </td>
                      );
                    })}
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
