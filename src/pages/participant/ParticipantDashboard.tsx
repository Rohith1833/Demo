import React, { useState } from 'react';
import { useHackathon } from '../../context/HackathonContext';
import {
  CheckCircle2,
  Clock,
  CreditCard,
  Users,
  FileCode,
  Send,
  QrCode,
  ArrowRight,
  LifeBuoy,
  X,
  ExternalLink,
  Award,
} from 'lucide-react';
import { PaymentModal } from './PaymentModal';

export const ParticipantDashboard: React.FC = () => {
  const {
    currentParticipant,
    currentTeam,
    problemStatements,
    submissions,
    navigate,
    lifecycleStage,
    settings,
  } = useHackathon();

  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [showQrModal, setShowQrModal] = useState(false);

  const chosenProblem = problemStatements.find((p) => p.id === currentTeam?.problemStatementId);
  const currentSubmission = submissions.find((s) => s.teamId === currentTeam?.id);

  // Derive "What do I need to do next?"
  type NextActionType = {
    badge: string;
    badgeColor: string;
    title: string;
    desc: string;
    buttonText?: string;
    action?: () => void;
  };

  let nextAction: NextActionType;

  if (settings.isResultsPublished) {
    nextAction = {
      badge: 'EVENT COMPLETED',
      badgeColor: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
      title: 'NexHack 2026 Results & Showcase Published',
      desc: 'The official judging scores, podium winners, and track awards are now live.',
      buttonText: 'View Official Results & Podium',
      action: () => navigate('/results'),
    };
  } else if (currentSubmission && currentSubmission.status === 'submitted') {
    nextAction = {
      badge: 'PROJECT SUBMITTED',
      badgeColor: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
      title: `Submission Received: "${currentSubmission.title}"`,
      desc: `Your deliverable commit was locked at ${new Date(currentSubmission.submittedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}. The jury will evaluate your project during the walkthrough round.`,
      buttonText: 'Review Submission Details',
      action: () => navigate('/submit'),
    };
  } else if (lifecycleStage === 'hackathon_live') {
    nextAction = {
      badge: 'HACKATHON LIVE',
      badgeColor: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
      title: 'Hacking in Progress • 17h 42m Remaining',
      desc: 'Ensure your team repository is pushing commits regularly. Need help with APIs or hardware? Ping the mentor desk.',
      buttonText: 'Submit Final Project',
      action: () => navigate('/submit'),
    };
  } else if (!currentParticipant.skills || currentParticipant.skills.length === 0) {
    nextAction = {
      badge: 'PROFILE INCOMPLETE',
      badgeColor: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
      title: 'Action Required: Complete Developer Profile',
      desc: 'Add your primary programming languages, GitHub URL, and student ID to qualify for selection.',
      buttonText: 'Complete Profile',
      action: () => navigate('/profile'),
    };
  } else if (currentParticipant.status === 'pending') {
    nextAction = {
      badge: 'APPLICATION SUBMITTED',
      badgeColor: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
      title: 'Application Under Coordinator Review',
      desc: `Your application (${currentParticipant.id}) has been submitted for technical screening. Results will be posted here once verified by reviewers.`,
    };
  } else if (currentParticipant.status === 'waitlisted') {
    nextAction = {
      badge: 'WAITLISTED',
      badgeColor: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
      title: 'Position on Verified Waitlist',
      desc: 'Your application met academic benchmarks. If selected participants do not complete payment by the deadline, unclaimed seats will be released automatically.',
    };
  } else if (currentParticipant.status === 'selected' && currentParticipant.paymentStatus !== 'verified') {
    nextAction = {
      badge: 'ACTION REQUIRED',
      badgeColor: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
      title: 'Action Required: Complete Registration Fee (₹500)',
      desc: 'Congratulations! You have been selected for NexHack 2026. Complete payment before the deadline to lock your seat and generate your campus entry pass.',
      buttonText: 'Complete Payment (₹500)',
      action: () => setIsPaymentModalOpen(true),
    };
  } else if (!currentTeam || currentTeam.members.length < 2) {
    nextAction = {
      badge: 'PAYMENT VERIFIED',
      badgeColor: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
      title: 'Next Step: Create or Join Team',
      desc: 'Teams must have between 2 and 4 members. Form a team with your college peers or share your team invite code.',
      buttonText: 'Manage Team',
      action: () => navigate('/team'),
    };
  } else if (!currentTeam.problemStatementId) {
    nextAction = {
      badge: 'TEAM FORMED',
      badgeColor: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
      title: 'Next Step: Select Problem Statement',
      desc: 'Problem statement allocation is now open. Slots are capped per track on a first-come, first-served basis.',
      buttonText: 'Browse Problem Statements',
      action: () => navigate('/problems'),
    };
  } else {
    nextAction = {
      badge: 'REGISTRATION COMPLETE',
      badgeColor: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
      title: `Registration Complete • Problem ${currentTeam.problemStatementId} Locked`,
      desc: 'Your registration, payment, team, and problem statement are verified. Have your digital QR pass ready at campus check-in.',
      buttonText: 'View Digital Pass',
      action: () => setShowQrModal(true),
    };
  }

  // Pipeline Stepper (7 steps)
  const pipelineSteps = [
    { label: 'Profile', done: true },
    { label: 'Application', done: true },
    { label: 'Screening', done: currentParticipant.status === 'selected' },
    { label: 'Payment', done: currentParticipant.paymentStatus === 'verified' },
    { label: 'Team', done: !!currentTeam && currentTeam.members.length >= 2 },
    { label: 'Problem', done: !!currentTeam?.problemStatementId },
    { label: 'Submission', done: !!currentSubmission && currentSubmission.status === 'submitted' },
  ];

  return (
    <div className="space-y-6">
      {/* Greeting Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-[#27272a]">
        <div>
          <h1 className="text-xl font-semibold text-[#fafafa] tracking-tight">
            Welcome back, {currentParticipant.name}
          </h1>
          <p className="text-xs text-[#a1a1aa] mt-0.5">
            NexHack 2026 • {currentParticipant.college} • Pass ID:{' '}
            <span className="font-mono text-[#fafafa]">{currentParticipant.participantId || currentParticipant.id}</span>
          </p>
        </div>

        {currentParticipant.paymentStatus === 'verified' && (
          <button
            onClick={() => setShowQrModal(true)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[#111113] border border-[#27272a] hover:border-[#3f3f46] text-xs font-medium text-[#fafafa] transition-colors self-start"
          >
            <QrCode className="w-3.5 h-3.5 text-[#3b82f6]" />
            <span>Campus Entry Pass</span>
          </button>
        )}
      </div>

      {/* Primary Action Callout: "WHAT DO I NEED TO DO NEXT?" */}
      <div className="bg-[#111113] border border-[#27272a] rounded-lg p-5 space-y-3">
        <div className="flex items-center justify-between">
          <span className={`text-[10px] font-mono px-2 py-0.5 rounded border uppercase font-medium ${nextAction.badgeColor}`}>
            {nextAction.badge}
          </span>
          <span className="text-[11px] font-mono text-[#71717a]">Current Stage</span>
        </div>

        <div>
          <h2 className="text-base font-semibold text-[#fafafa]">{nextAction.title}</h2>
          <p className="text-xs text-[#a1a1aa] mt-1 leading-relaxed">{nextAction.desc}</p>
        </div>

        {nextAction.buttonText && nextAction.action && (
          <div className="pt-2">
            <button
              onClick={nextAction.action}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-md bg-[#2563eb] hover:bg-blue-600 text-white text-xs font-medium transition-colors shadow-sm"
            >
              <span>{nextAction.buttonText}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>

      {/* Visual Registration & Participation Pipeline */}
      <div className="bg-[#111113] border border-[#27272a] rounded-lg p-4">
        <p className="text-[10px] font-mono uppercase tracking-wider text-[#71717a] mb-3">
          Participation Progress
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2">
          {pipelineSteps.map((step, idx) => (
            <div
              key={step.label}
              className={`p-2.5 rounded-md border text-center transition-colors ${
                step.done
                  ? 'bg-[#18181b] border-emerald-500/30 text-emerald-400'
                  : 'bg-[#111113] border-[#27272a] text-[#71717a]'
              }`}
            >
              <div className="flex items-center justify-center gap-1 text-[10px] font-mono mb-1">
                <span>0{idx + 1}</span>
                {step.done ? <span>✓</span> : <span>○</span>}
              </div>
              <p className="text-xs font-medium text-[#fafafa] truncate">{step.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Event Day Mode or Status Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Team Card */}
        <div className="bg-[#111113] border border-[#27272a] rounded-lg p-4 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono uppercase text-[#71717a]">Team Status</span>
            <Users className="w-3.5 h-3.5 text-[#71717a]" />
          </div>

          {currentTeam ? (
            <div>
              <p className="text-sm font-semibold text-[#fafafa]">{currentTeam.name}</p>
              <p className="text-[11px] font-mono text-[#a1a1aa] mt-0.5">
                Code: {currentTeam.code} • {currentTeam.members.length} Members
              </p>
              <button
                onClick={() => navigate('/team')}
                className="mt-2 text-xs text-[#3b82f6] hover:underline flex items-center gap-1"
              >
                <span>Manage Team</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          ) : (
            <div>
              <p className="text-xs text-[#a1a1aa]">No team formed</p>
              <button
                onClick={() => navigate('/team')}
                className="mt-2 text-xs text-[#3b82f6] hover:underline flex items-center gap-1"
              >
                <span>Create or Join Team</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          )}
        </div>

        {/* Problem Statement Card */}
        <div className="bg-[#111113] border border-[#27272a] rounded-lg p-4 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono uppercase text-[#71717a]">Problem Statement</span>
            <FileCode className="w-3.5 h-3.5 text-[#71717a]" />
          </div>

          {chosenProblem ? (
            <div>
              <p className="text-xs font-mono font-medium text-[#3b82f6]">{chosenProblem.id}</p>
              <p className="text-xs font-semibold text-[#fafafa] mt-0.5 line-clamp-1">{chosenProblem.title}</p>
              <button
                onClick={() => navigate('/problems')}
                className="mt-2 text-xs text-[#3b82f6] hover:underline flex items-center gap-1"
              >
                <span>View Full Brief</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          ) : (
            <div>
              <p className="text-xs text-[#a1a1aa]">Not selected yet</p>
              <button
                onClick={() => navigate('/problems')}
                className="mt-2 text-xs text-[#3b82f6] hover:underline flex items-center gap-1"
              >
                <span>Select Problem</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          )}
        </div>

        {/* Submission Card */}
        <div className="bg-[#111113] border border-[#27272a] rounded-lg p-4 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono uppercase text-[#71717a]">Submission</span>
            <Send className="w-3.5 h-3.5 text-[#71717a]" />
          </div>

          {currentSubmission ? (
            <div>
              <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                Submitted ✓
              </span>
              <p className="text-xs font-semibold text-[#fafafa] mt-1 line-clamp-1">{currentSubmission.title}</p>
              <button
                onClick={() => navigate('/submit')}
                className="mt-2 text-xs text-[#3b82f6] hover:underline flex items-center gap-1"
              >
                <span>Review Submission</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          ) : (
            <div>
              <p className="text-xs text-[#a1a1aa]">Deadline: 08:00 AM</p>
              <button
                onClick={() => navigate('/submit')}
                className="mt-2 text-xs text-[#3b82f6] hover:underline flex items-center gap-1"
              >
                <span>Open Submission Form</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Operational Schedule & Live Help Desk Shortcut */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Static Event Timeline */}
        <div className="md:col-span-2 bg-[#111113] border border-[#27272a] rounded-lg p-4 space-y-3">
          <p className="text-[10px] font-mono uppercase tracking-wider text-[#71717a]">
            Hackathon Schedule Checkpoints
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
            <div className="p-2.5 rounded bg-[#18181b] border border-[#27272a]">
              <span className="text-[10px] font-mono text-[#71717a] block">08:00 AM</span>
              <span className="font-medium text-[#fafafa]">Check-In Opens</span>
            </div>
            <div className="p-2.5 rounded bg-[#18181b] border border-[#27272a]">
              <span className="text-[10px] font-mono text-[#71717a] block">10:00 AM</span>
              <span className="font-medium text-[#fafafa]">Hacking Begins</span>
            </div>
            <div className="p-2.5 rounded bg-[#18181b] border border-[#27272a]">
              <span className="text-[10px] font-mono text-[#71717a] block">08:00 AM (+1)</span>
              <span className="font-medium text-[#fafafa]">Code Freeze</span>
            </div>
            <div className="p-2.5 rounded bg-[#18181b] border border-[#27272a]">
              <span className="text-[10px] font-mono text-[#71717a] block">09:00 AM (+1)</span>
              <span className="font-medium text-[#fafafa]">Jury Walkthrough</span>
            </div>
          </div>
        </div>

        {/* Need Help? Box */}
        <div className="bg-[#111113] border border-[#27272a] rounded-lg p-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2">
              <LifeBuoy className="w-4 h-4 text-[#3b82f6]" />
              <h3 className="text-xs font-semibold text-[#fafafa]">Blocked by an issue?</h3>
            </div>
            <p className="text-xs text-[#a1a1aa] mt-1.5 leading-relaxed">
              Submit a service ticket to get on-site domain mentors or lab technicians dispatched to your desk.
            </p>
          </div>

          <button
            onClick={() => navigate('/help')}
            className="mt-3 w-full py-1.5 px-3 rounded-md bg-[#18181b] hover:bg-[#27272a] border border-[#27272a] text-xs font-medium text-[#fafafa] transition-colors text-center"
          >
            Open Help Desk
          </button>
        </div>
      </div>

      {/* Payment Checkout Modal */}
      {isPaymentModalOpen && (
        <PaymentModal
          isOpen={isPaymentModalOpen}
          onClose={() => setIsPaymentModalOpen(false)}
        />
      )}

      {/* QR Code Pass Modal */}
      {showQrModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
          <div className="bg-[#111113] border border-[#27272a] rounded-lg max-w-sm w-full p-6 text-center space-y-4 shadow-xl relative">
            <button
              onClick={() => setShowQrModal(false)}
              className="absolute top-4 right-4 text-[#71717a] hover:text-[#fafafa]"
            >
              <X className="w-4 h-4" />
            </button>

            <div>
              <p className="text-[10px] font-mono uppercase text-[#71717a]">NexHack 2026</p>
              <h3 className="text-base font-semibold text-[#fafafa]">Official Campus Entry Pass</h3>
              <p className="text-xs text-[#a1a1aa] mt-0.5">{currentParticipant.name}</p>
            </div>

            <div className="w-44 h-44 bg-white p-3 rounded-lg mx-auto flex flex-col items-center justify-center border border-zinc-300">
              {/* Simulated QR Pattern */}
              <div className="grid grid-cols-6 gap-1 w-full h-full p-2">
                {Array.from({ length: 36 }).map((_, i) => (
                  <div
                    key={i}
                    className={`rounded-xs ${
                      (i * 7) % 3 === 0 || i % 5 === 0 || i === 0 || i === 5 || i === 30 || i === 35
                        ? 'bg-zinc-950'
                        : 'bg-zinc-100'
                    }`}
                  />
                ))}
              </div>
            </div>

            <div className="font-mono text-xs">
              <span className="text-[#a1a1aa]">PASS: </span>
              <span className="text-[#3b82f6] font-semibold">
                {currentParticipant.participantId || currentParticipant.id}
              </span>
            </div>

            <p className="text-[11px] text-[#71717a]">
              Present this pass at Registration Desk 3 in the Main Convention Center for your physical badge.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
