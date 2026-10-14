import React from 'react';
import { useHackathon } from '../../context/HackathonContext';
import { ArrowLeft, Users, CreditCard, QrCode, FileCode, Send, Award, CheckCircle2, Clock } from 'lucide-react';

export const TeamDetailPage: React.FC<{ teamId: string }> = ({ teamId }) => {
  const { teams, applications, submissions, evaluations, judges, navigate } = useHackathon();

  const team = teams.find((t) => t.id === teamId) || teams[0];
  const submission = submissions.find((s) => s.teamId === team.id);
  const teamEvals = evaluations.filter((e) => e.teamId === team.id);

  // Calculate metrics
  const teamApplicantRecords = applications.filter(
    (a) => a.teamId === team.id || team.members.some((m) => m.id === a.id)
  );
  const paidCount = teamApplicantRecords.filter((a) => a.paymentStatus === 'verified').length;
  const checkedInCount = teamApplicantRecords.filter((a) => a.checkInStatus).length;
  const totalMembers = team.members.length;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Back button & Title */}
      <div>
        <button
          onClick={() => navigate('/admin/teams')}
          className="inline-flex items-center gap-1.5 text-xs text-[#a1a1aa] hover:text-[#fafafa] mb-2 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Teams</span>
        </button>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-semibold text-[#fafafa] tracking-tight">{team.name}</h1>
              <span className="text-xs font-mono px-2 py-0.5 rounded bg-[#18181b] border border-[#27272a] text-[#a1a1aa]">
                Code: {team.code}
              </span>
            </div>
            <p className="text-xs text-[#a1a1aa] mt-1">
              Led by {team.leaderName} ({team.leaderEmail}) • Created at {new Date(team.createdAt).toLocaleDateString()}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded text-xs font-mono font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              {team.isLocked ? 'TEAM LOCKED' : 'ROSTER OPEN'}
            </span>
          </div>
        </div>
      </div>

      {/* 4 Key Milestone Gauges */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-[#111113] border border-[#27272a] rounded-lg p-3.5 space-y-1">
          <p className="text-[11px] font-mono uppercase text-[#71717a]">Payments</p>
          <p className="text-lg font-semibold text-[#fafafa] font-mono">
            {paidCount} / {totalMembers} Complete
          </p>
          <div className="w-full h-1 bg-[#18181b] rounded-full overflow-hidden">
            <div
              className="h-full bg-emerald-500 rounded-full"
              style={{ width: `${(paidCount / Math.max(1, totalMembers)) * 100}%` }}
            ></div>
          </div>
        </div>

        <div className="bg-[#111113] border border-[#27272a] rounded-lg p-3.5 space-y-1">
          <p className="text-[11px] font-mono uppercase text-[#71717a]">Physical Check-In</p>
          <p className="text-lg font-semibold text-[#fafafa] font-mono">
            {checkedInCount} / {totalMembers} Checked In
          </p>
          <div className="w-full h-1 bg-[#18181b] rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-500 rounded-full"
              style={{ width: `${(checkedInCount / Math.max(1, totalMembers)) * 100}%` }}
            ></div>
          </div>
        </div>

        <div className="bg-[#111113] border border-[#27272a] rounded-lg p-3.5 space-y-1">
          <p className="text-[11px] font-mono uppercase text-[#71717a]">Deliverable Status</p>
          <p className="text-lg font-semibold text-[#fafafa] font-mono">
            {team.submissionStatus === 'submitted' ? 'Submitted' : 'Pending'}
          </p>
          <span className="text-[10px] text-[#71717a]">
            {submission ? `"${submission.title}"` : 'No commit linked'}
          </span>
        </div>

        <div className="bg-[#111113] border border-[#27272a] rounded-lg p-3.5 space-y-1">
          <p className="text-[11px] font-mono uppercase text-[#71717a]">Judging Progress</p>
          <p className="text-lg font-semibold text-[#fafafa] font-mono">
            {teamEvals.length} / 3 Completed
          </p>
          <div className="w-full h-1 bg-[#18181b] rounded-full overflow-hidden">
            <div
              className="h-full bg-purple-500 rounded-full"
              style={{ width: `${(teamEvals.length / 3) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Team Roster Table */}
      <div className="bg-[#111113] border border-[#27272a] rounded-lg overflow-hidden">
        <div className="px-4 py-3 bg-[#151517] border-b border-[#27272a] flex items-center justify-between">
          <h2 className="text-xs font-mono font-medium text-[#71717a] uppercase tracking-wider">
            Roster Members ({totalMembers} / 4)
          </h2>
          <span className="text-xs text-[#71717a]">Maximum 4 members per team</span>
        </div>

        <div className="divide-y divide-[#18181b]">
          {team.members.map((member) => {
            const memberApp = applications.find((a) => a.id === member.id || a.email === member.email);
            return (
              <div key={member.id} className="p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded bg-[#18181b] border border-[#27272a] flex items-center justify-center font-mono text-xs font-semibold text-[#3b82f6]">
                    {member.name.charAt(0)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-medium text-[#fafafa]">{member.name}</span>
                      {member.role === 'Leader' && (
                        <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-[#2563eb]/20 text-[#3b82f6] border border-[#2563eb]/30">
                          Leader
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-[#71717a] font-mono">{member.email}</p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-4 text-xs">
                  <div className="flex items-center gap-1">
                    <span className="text-[#71717a]">Fee:</span>
                    <span className="font-mono text-emerald-400">
                      {memberApp?.paymentStatus === 'verified' ? 'Paid ✓' : 'Unpaid'}
                    </span>
                  </div>

                  <div className="flex items-center gap-1">
                    <span className="text-[#71717a]">Gate:</span>
                    <span className="font-mono text-blue-400">
                      {memberApp?.checkInStatus ? 'Checked In ✓' : 'Pending'}
                    </span>
                  </div>

                  {memberApp && (
                    <button
                      onClick={() => navigate(`/admin/participants/${memberApp.id}`)}
                      className="text-xs text-[#3b82f6] hover:underline"
                    >
                      View Profile
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Problem Statement & Submission Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Problem Statement */}
        <div className="bg-[#111113] border border-[#27272a] rounded-lg p-4 space-y-2">
          <h2 className="text-xs font-mono font-medium text-[#71717a] uppercase tracking-wider pb-2 border-b border-[#27272a]">
            Selected Problem Statement
          </h2>
          <div className="text-xs space-y-1">
            <span className="font-mono font-medium text-[#3b82f6] block">
              {team.problemStatementId || 'PS-01'}
            </span>
            <p className="font-medium text-[#fafafa]">{team.problemTitle || 'AI-Based Campus Navigation'}</p>
            <p className="text-[11px] text-[#71717a]">
              Allocated slot locked in coordinator problem allocation roster.
            </p>
          </div>
        </div>

        {/* Project Submission */}
        <div className="bg-[#111113] border border-[#27272a] rounded-lg p-4 space-y-2">
          <div className="flex items-center justify-between pb-2 border-b border-[#27272a]">
            <h2 className="text-xs font-mono font-medium text-[#71717a] uppercase tracking-wider">
              Project Submission
            </h2>
            {submission && (
              <button
                onClick={() => navigate(`/admin/submissions/${submission.id}`)}
                className="text-xs text-[#3b82f6] hover:underline font-medium"
              >
                Full Submission Dossier
              </button>
            )}
          </div>
          {submission ? (
            <div className="text-xs space-y-1">
              <p className="font-semibold text-[#fafafa]">{submission.title}</p>
              <p className="text-[11px] text-[#a1a1aa] line-clamp-2">{submission.description}</p>
              <div className="pt-1 flex items-center gap-3 text-[11px] font-mono text-[#3b82f6]">
                <a href={submission.githubUrl} target="_blank" rel="noreferrer" className="hover:underline">
                  GitHub Repo ↗
                </a>
                <a href={submission.demoUrl} target="_blank" rel="noreferrer" className="hover:underline">
                  Live Demo ↗
                </a>
              </div>
            </div>
          ) : (
            <p className="text-xs text-[#71717a] italic">
              Team has not submitted deliverables yet. Code freeze at 08:00 AM.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
