import React from 'react';
import { useHackathon } from '../../context/HackathonContext';
import { ArrowLeft, User, CreditCard, Layers, FileCode, QrCode, Send, ExternalLink, CheckCircle2 } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '../../components/ui/Icons';

export const ParticipantDetailPage: React.FC<{ participantId: string }> = ({ participantId }) => {
  const { applications, teams, navigate, verifyPaymentManually } = useHackathon();

  const applicant = applications.find(
    (a) => a.id === participantId || a.participantId === participantId
  ) || applications[0];

  const team = teams.find((t) => t.id === applicant.teamId);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Back button & Title */}
      <div>
        <button
          onClick={() => navigate('/admin/participants')}
          className="inline-flex items-center gap-1.5 text-xs text-[#a1a1aa] hover:text-[#fafafa] mb-2 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Participants</span>
        </button>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h1 className="text-xl font-semibold text-[#fafafa] tracking-tight">{applicant.name}</h1>
            <p className="text-xs text-[#a1a1aa] font-mono mt-0.5">
              App ID: {applicant.id} • Participant Pass: {applicant.participantId || 'Pending'}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded text-xs font-mono font-medium bg-[#18181b] border border-[#27272a] text-[#a1a1aa]">
              {applicant.status.toUpperCase()}
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Column: Academic & Contact */}
        <div className="md:col-span-1 space-y-4">
          <div className="bg-[#111113] border border-[#27272a] rounded-lg p-4 space-y-3">
            <h2 className="text-xs font-mono font-medium text-[#71717a] uppercase tracking-wider">
              Academic Details
            </h2>
            <div className="space-y-2 text-xs">
              <div>
                <span className="text-[#71717a] block text-[11px]">College</span>
                <span className="text-[#fafafa] font-medium">{applicant.college}</span>
              </div>
              <div>
                <span className="text-[#71717a] block text-[11px]">USN / Student ID</span>
                <span className="text-[#fafafa] font-mono">{applicant.usn}</span>
              </div>
              <div>
                <span className="text-[#71717a] block text-[11px]">Department & Degree</span>
                <span className="text-[#fafafa]">{applicant.degree} ({applicant.department})</span>
              </div>
              <div>
                <span className="text-[#71717a] block text-[11px]">Class Year</span>
                <span className="text-[#fafafa]">{applicant.year} (Graduation: {applicant.gradYear})</span>
              </div>
            </div>
          </div>

          <div className="bg-[#111113] border border-[#27272a] rounded-lg p-4 space-y-3">
            <h2 className="text-xs font-mono font-medium text-[#71717a] uppercase tracking-wider">
              Contact & Links
            </h2>
            <div className="space-y-2 text-xs">
              <div>
                <span className="text-[#71717a] block text-[11px]">Email</span>
                <span className="text-[#fafafa]">{applicant.email}</span>
              </div>
              <div>
                <span className="text-[#71717a] block text-[11px]">Phone</span>
                <span className="text-[#fafafa]">{applicant.phone}</span>
              </div>
              <div className="pt-2 flex flex-col gap-1.5">
                {applicant.github && (
                  <a
                    href={applicant.github}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1.5 text-xs text-[#3b82f6] hover:underline"
                  >
                    <GithubIcon className="w-3.5 h-3.5" />
                    <span>GitHub Profile</span>
                  </a>
                )}
                {applicant.linkedin && (
                  <a
                    href={applicant.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1.5 text-xs text-[#3b82f6] hover:underline"
                  >
                    <LinkedinIcon className="w-3.5 h-3.5" />
                    <span>LinkedIn Profile</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Center / Right Column: Operational Lifecycles */}
        <div className="md:col-span-2 space-y-4">
          {/* Status Matrix */}
          <div className="bg-[#111113] border border-[#27272a] rounded-lg p-4 space-y-3">
            <h2 className="text-xs font-mono font-medium text-[#71717a] uppercase tracking-wider pb-2 border-b border-[#27272a]">
              Lifecycle Milestones
            </h2>

            <div className="grid grid-cols-2 gap-3 text-xs">
              {/* Payment Box */}
              <div className="p-3 rounded-md bg-[#18181b] border border-[#27272a] space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-[#71717a] text-[11px]">Payment</span>
                  <CreditCard className="w-3.5 h-3.5 text-[#3b82f6]" />
                </div>
                <p className="font-semibold text-[#fafafa] font-mono">
                  {applicant.paymentStatus === 'verified' ? 'PAID (₹500)' : 'PENDING'}
                </p>
                {applicant.transactionId && (
                  <p className="text-[10px] font-mono text-[#71717a]">{applicant.transactionId}</p>
                )}
                {applicant.paymentStatus !== 'verified' && (
                  <button
                    onClick={() => verifyPaymentManually(applicant.id)}
                    className="mt-1 text-[11px] text-[#3b82f6] hover:underline"
                  >
                    Verify Payment Manually
                  </button>
                )}
              </div>

              {/* Check-In Box */}
              <div className="p-3 rounded-md bg-[#18181b] border border-[#27272a] space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-[#71717a] text-[11px]">Event Check-In</span>
                  <QrCode className="w-3.5 h-3.5 text-[#3b82f6]" />
                </div>
                <p className="font-semibold text-[#fafafa] font-mono">
                  {applicant.checkInStatus ? 'CHECKED IN' : 'PENDING'}
                </p>
                <p className="text-[10px] text-[#71717a]">
                  {applicant.checkedInAt ? `At ${new Date(applicant.checkedInAt).toLocaleTimeString()}` : 'Not scanned at gate'}
                </p>
              </div>
            </div>
          </div>

          {/* Contextual Team Link */}
          <div className="bg-[#111113] border border-[#27272a] rounded-lg p-4 space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-xs font-mono font-medium text-[#71717a] uppercase tracking-wider">
                Assigned Team & Deliverables
              </h2>
              {team && (
                <button
                  onClick={() => navigate(`/admin/teams/${team.id}`)}
                  className="text-xs text-[#3b82f6] hover:underline flex items-center gap-1 font-medium"
                >
                  <span>View Team Dossier</span>
                  <ExternalLink className="w-3 h-3" />
                </button>
              )}
            </div>

            {team ? (
              <div className="p-3 rounded-md bg-[#18181b] border border-[#27272a] space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-semibold text-sm text-[#fafafa]">{team.name}</span>
                    <span className="ml-2 font-mono text-[11px] text-[#71717a]">Code: {team.code}</span>
                  </div>
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-[#111113] border border-[#27272a] text-[#a1a1aa]">
                    {team.members.length} Members
                  </span>
                </div>

                <div className="text-[11px] text-[#a1a1aa] pt-1 border-t border-[#27272a]">
                  <span>Problem Statement: </span>
                  <strong className="text-[#fafafa]">{team.problemTitle || 'Unassigned'}</strong>
                </div>

                <div className="text-[11px] text-[#a1a1aa]">
                  <span>Submission: </span>
                  <strong className="text-[#fafafa]">{team.submissionStatus.toUpperCase()}</strong>
                </div>
              </div>
            ) : (
              <p className="text-xs text-[#71717a] italic">
                Participant has not formed or joined a team yet.
              </p>
            )}
          </div>

          {/* Technical Skills & Rubric */}
          <div className="bg-[#111113] border border-[#27272a] rounded-lg p-4 space-y-3">
            <h2 className="text-xs font-mono font-medium text-[#71717a] uppercase tracking-wider">
              Screening Scores & Rubric
            </h2>
            <div className="grid grid-cols-4 gap-2 text-center">
              <div className="p-2 rounded bg-[#18181b] border border-[#27272a]">
                <span className="text-[10px] text-[#71717a] block">Technical</span>
                <span className="font-mono text-sm font-semibold text-[#fafafa]">{applicant.scores.technical}/10</span>
              </div>
              <div className="p-2 rounded bg-[#18181b] border border-[#27272a]">
                <span className="text-[10px] text-[#71717a] block">Experience</span>
                <span className="font-mono text-sm font-semibold text-[#fafafa]">{applicant.scores.experience}/10</span>
              </div>
              <div className="p-2 rounded bg-[#18181b] border border-[#27272a]">
                <span className="text-[10px] text-[#71717a] block">Projects</span>
                <span className="font-mono text-sm font-semibold text-[#fafafa]">{applicant.scores.projects}/10</span>
              </div>
              <div className="p-2 rounded bg-[#18181b] border border-[#27272a]">
                <span className="text-[10px] text-[#71717a] block">Motivation</span>
                <span className="font-mono text-sm font-semibold text-[#fafafa]">{applicant.scores.motivation}/10</span>
              </div>
            </div>
            <div className="text-right text-xs font-mono text-[#3b82f6] font-medium pt-1">
              Total Score: {applicant.scores.total}/40
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
