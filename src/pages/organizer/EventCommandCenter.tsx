import React, { useState } from 'react';
import { useHackathon } from '../../context/HackathonContext';
import {
  Users,
  QrCode,
  Send,
  Award,
  Clock,
  Radio,
  CheckCircle2,
  AlertTriangle,
  Play,
  Layers,
  ArrowRight,
  TrendingUp,
  Activity,
  LifeBuoy,
  X,
  CreditCard,
  MessageSquare,
} from 'lucide-react';

export const EventCommandCenter: React.FC = () => {
  const {
    applications,
    teams,
    submissions,
    judges,
    evaluations,
    mentorRequests,
    operationalIssues,
    broadcastAnnouncement,
    navigate,
  } = useHackathon();

  const [announcementModalOpen, setAnnouncementModalOpen] = useState(false);
  const [annTitle, setAnnTitle] = useState('');
  const [annMessage, setAnnMessage] = useState('');
  const [annCategory, setAnnCategory] = useState<'general' | 'urgent' | 'schedule' | 'results'>('urgent');

  // Key live metrics
  const checkedInCount = applications.filter((a) => a.checkInStatus).length;
  const teamsCount = teams.length;
  const submissionsCount = submissions.length;
  const judgesCount = judges.length;
  const evaluationsCount = evaluations.length;

  // Operational attention required items
  const pendingScreenings = applications.filter((a) => a.status === 'pending').length;
  const unpaidSelected = applications.filter((a) => a.status === 'selected' && a.paymentStatus !== 'verified').length;
  const incompleteTeams = teams.filter((t) => t.members.length < 2).length;
  const waitingMentors = mentorRequests.filter((r) => r.status === 'Waiting').length;
  const unsubmittedTeams = teams.filter((t) => t.submissionStatus !== 'submitted').length;
  const incompleteJudging = Math.max(0, judges.length * 3 - evaluations.length);

  const eventTimeline = [
    { time: '08:00 AM', label: 'Participant Check-in & Badge Printing', status: 'completed' },
    { time: '09:30 AM', label: 'Opening Ceremony & Keynote Address', status: 'completed' },
    { time: '10:00 AM', label: '24-Hour Hacking Officially Begins', status: 'completed' },
    { time: '01:00 PM', label: 'Buffet Lunch & Sponsor Office Hours', status: 'completed' },
    { time: '06:00 PM', label: 'Mentor Checkpoint Round 1', status: 'completed' },
    { time: '09:00 PM', label: 'Dinner & Midnight Coffee Station', status: 'completed' },
    { time: '08:00 AM (+1)', label: 'Submission Portal Locks', status: 'active' },
    { time: '09:00 AM (+1)', label: 'In-Booth Jury Judging & Pitch Round', status: 'upcoming' },
    { time: '12:00 PM (+1)', label: 'Grand Valedictory & Winner Awards', status: 'upcoming' },
  ];

  const handleBroadcast = (e: React.FormEvent) => {
    e.preventDefault();
    if (!annTitle.trim() || !annMessage.trim()) return;
    broadcastAnnouncement(annTitle, annMessage, annCategory);
    setAnnTitle('');
    setAnnMessage('');
    setAnnouncementModalOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-[#111113] border border-[#27272a] rounded-lg p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[11px] font-mono font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              LIVE
            </span>
            <span className="text-xs font-mono text-[#a1a1aa]">Hackathon Day 1</span>
            <span className="text-[#52525b]">•</span>
            <span className="text-xs font-mono text-[#3b82f6]">17h 42m remaining</span>
          </div>
          <h1 className="text-2xl font-bold text-[#fafafa] tracking-tight mt-1.5">
            NexHack 2026 Operations War Room
          </h1>
          <p className="text-xs text-[#a1a1aa] mt-0.5">
            Real-time telemetry, check-in radar, live submission tracking, and jury coordination.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setAnnouncementModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[#2563eb] hover:bg-blue-600 text-white text-xs font-medium transition-colors shadow-sm"
          >
            <Radio className="w-3.5 h-3.5" />
            <span>Broadcast Update</span>
          </button>
          <button
            onClick={() => navigate('/admin/whatsapp')}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[#18181b] hover:bg-[#27272a] border border-[#27272a] text-xs font-medium text-[#fafafa] transition-colors"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>WhatsApp Tool</span>
          </button>
        </div>
      </div>

      {/* Compact Metrics Row */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        <div className="bg-[#111113] border border-[#27272a] rounded-lg p-3.5 space-y-1">
          <p className="text-[11px] font-mono uppercase text-[#71717a]">Checked In</p>
          <p className="text-xl font-semibold text-[#fafafa] font-mono">
            {checkedInCount + 421} / 500
          </p>
          <span className="text-[10px] text-emerald-400 font-mono">84.2% on floor</span>
        </div>

        <div className="bg-[#111113] border border-[#27272a] rounded-lg p-3.5 space-y-1">
          <p className="text-[11px] font-mono uppercase text-[#71717a]">Teams</p>
          <p className="text-xl font-semibold text-[#fafafa] font-mono">{teamsCount + 121}</p>
          <span className="text-[10px] text-[#71717a] font-mono">4.1 avg size</span>
        </div>

        <div className="bg-[#111113] border border-[#27272a] rounded-lg p-3.5 space-y-1">
          <p className="text-[11px] font-mono uppercase text-[#71717a]">Submitted</p>
          <p className="text-xl font-semibold text-blue-400 font-mono">
            {submissionsCount + 98} / {teamsCount + 121}
          </p>
          <span className="text-[10px] text-blue-400 font-mono">81.2% locked</span>
        </div>

        <div className="bg-[#111113] border border-[#27272a] rounded-lg p-3.5 space-y-1">
          <p className="text-[11px] font-mono uppercase text-[#71717a]">Active Judges</p>
          <p className="text-xl font-semibold text-[#fafafa] font-mono">{judgesCount + 13}</p>
          <span className="text-[10px] text-[#71717a] font-mono">6 track panels</span>
        </div>

        <div className="bg-[#111113] border border-[#27272a] rounded-lg p-3.5 space-y-1">
          <p className="text-[11px] font-mono uppercase text-[#71717a]">Evaluations</p>
          <p className="text-xl font-semibold text-purple-400 font-mono">
            {evaluationsCount + 56}
          </p>
          <span className="text-[10px] text-[#71717a] font-mono">61 complete</span>
        </div>
      </div>

      {/* ATTENTION REQUIRED Action Queue (#26) */}
      <div className="bg-[#111113] border border-[#27272a] rounded-lg p-5 space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-[#27272a]">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-400" />
            <h2 className="text-xs font-mono font-medium text-[#fafafa] uppercase tracking-wider">
              Attention Required (Operational Queue)
            </h2>
          </div>
          <span className="text-[11px] font-mono text-[#71717a]">6 Pending Actions</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {/* 1. Screening */}
          <div className="p-3.5 rounded-md bg-[#18181b] border border-[#27272a] flex items-center justify-between gap-3">
            <div>
              <p className="text-xs font-medium text-[#fafafa]">486 applications awaiting review</p>
              <p className="text-[11px] text-[#71717a]">Screening cohort cutoff approaching</p>
            </div>
            <button
              onClick={() => navigate('/admin/applications')}
              className="px-2.5 py-1 rounded bg-[#2563eb] hover:bg-blue-600 text-white text-xs font-medium transition-colors shrink-0"
            >
              Review
            </button>
          </div>

          {/* 2. Unpaid */}
          <div className="p-3.5 rounded-md bg-[#18181b] border border-[#27272a] flex items-center justify-between gap-3">
            <div>
              <p className="text-xs font-medium text-[#fafafa]">68 selected participants unpaid</p>
              <p className="text-[11px] text-[#71717a]">23 passed deadline; waitlist ready</p>
            </div>
            <button
              onClick={() => navigate('/admin/payments')}
              className="px-2.5 py-1 rounded bg-[#2563eb] hover:bg-blue-600 text-white text-xs font-medium transition-colors shrink-0"
            >
              View Unpaid
            </button>
          </div>

          {/* 3. Incomplete Teams */}
          <div className="p-3.5 rounded-md bg-[#18181b] border border-[#27272a] flex items-center justify-between gap-3">
            <div>
              <p className="text-xs font-medium text-[#fafafa]">17 participants need valid teams</p>
              <p className="text-[11px] text-[#71717a]">Minimum 2 members required to lock PS</p>
            </div>
            <button
              onClick={() => navigate('/admin/teams')}
              className="px-2.5 py-1 rounded bg-[#111113] border border-[#27272a] hover:bg-[#27272a] text-[#fafafa] text-xs font-medium transition-colors shrink-0"
            >
              Teams
            </button>
          </div>

          {/* 4. Mentor Requests */}
          <div className="p-3.5 rounded-md bg-[#18181b] border border-[#27272a] flex items-center justify-between gap-3">
            <div>
              <p className="text-xs font-medium text-[#fafafa]">14 mentor requests waiting</p>
              <p className="text-[11px] text-rose-400 font-mono">8m longest wait time</p>
            </div>
            <button
              onClick={() => navigate('/admin/mentor-requests')}
              className="px-2.5 py-1 rounded bg-rose-600 hover:bg-rose-500 text-white text-xs font-medium transition-colors shrink-0"
            >
              Resolve
            </button>
          </div>

          {/* 5. Submissions */}
          <div className="p-3.5 rounded-md bg-[#18181b] border border-[#27272a] flex items-center justify-between gap-3">
            <div>
              <p className="text-xs font-medium text-[#fafafa]">24 teams haven't submitted</p>
              <p className="text-[11px] text-[#71717a]">T-2h submission broadcast queued</p>
            </div>
            <button
              onClick={() => navigate('/admin/submissions')}
              className="px-2.5 py-1 rounded bg-[#111113] border border-[#27272a] hover:bg-[#27272a] text-[#fafafa] text-xs font-medium transition-colors shrink-0"
            >
              Submissions
            </button>
          </div>

          {/* 6. Judging */}
          <div className="p-3.5 rounded-md bg-[#18181b] border border-[#27272a] flex items-center justify-between gap-3">
            <div>
              <p className="text-xs font-medium text-[#fafafa]">6 judging assignments incomplete</p>
              <p className="text-[11px] text-amber-400 font-mono">Blocks results publication</p>
            </div>
            <button
              onClick={() => navigate('/admin/judging')}
              className="px-2.5 py-1 rounded bg-amber-600 hover:bg-amber-500 text-white text-xs font-medium transition-colors shrink-0"
            >
              Fix Judging
            </button>
          </div>
        </div>
      </div>

      {/* Event Timeline & Quick Tools */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Timeline */}
        <div className="lg:col-span-8 bg-[#111113] border border-[#27272a] rounded-lg p-5 space-y-4">
          <h2 className="text-xs font-mono font-medium text-[#71717a] uppercase tracking-wider pb-2 border-b border-[#27272a]">
            Campus Event Checkpoints
          </h2>

          <div className="space-y-2">
            {eventTimeline.map((item) => (
              <div
                key={item.label}
                className="flex items-center justify-between p-2.5 rounded bg-[#18181b] border border-[#27272a] text-xs"
              >
                <div className="flex items-center gap-3">
                  <span className="font-mono text-[11px] text-[#71717a] w-24">{item.time}</span>
                  <span className="font-medium text-[#fafafa]">{item.label}</span>
                </div>
                {item.status === 'completed' && (
                  <span className="text-[11px] font-mono text-emerald-400">Completed ✓</span>
                )}
                {item.status === 'active' && (
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-rose-500/10 text-rose-400 border border-rose-500/20">
                    Live Now
                  </span>
                )}
                {item.status === 'upcoming' && (
                  <span className="text-[11px] font-mono text-[#71717a]">Upcoming</span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Quick Operations Actions */}
        <div className="lg:col-span-4 bg-[#111113] border border-[#27272a] rounded-lg p-5 space-y-3">
          <h2 className="text-xs font-mono font-medium text-[#71717a] uppercase tracking-wider pb-2 border-b border-[#27272a]">
            Coordinator Quick Launch
          </h2>

          <div className="space-y-2">
            <button
              onClick={() => navigate('/admin/checkin')}
              className="w-full flex items-center justify-between p-2.5 rounded-md bg-[#18181b] hover:bg-[#27272a] border border-[#27272a] text-xs font-medium text-[#fafafa] transition-colors"
            >
              <div className="flex items-center gap-2">
                <QrCode className="w-3.5 h-3.5 text-[#3b82f6]" />
                <span>QR Check-In Desk</span>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-[#71717a]" />
            </button>

            <button
              onClick={() => navigate('/admin/teams')}
              className="w-full flex items-center justify-between p-2.5 rounded-md bg-[#18181b] hover:bg-[#27272a] border border-[#27272a] text-xs font-medium text-[#fafafa] transition-colors"
            >
              <div className="flex items-center gap-2">
                <Layers className="w-3.5 h-3.5 text-[#3b82f6]" />
                <span>Team Roster Roster</span>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-[#71717a]" />
            </button>

            <button
              onClick={() => navigate('/admin/operations')}
              className="w-full flex items-center justify-between p-2.5 rounded-md bg-[#18181b] hover:bg-[#27272a] border border-[#27272a] text-xs font-medium text-[#fafafa] transition-colors"
            >
              <div className="flex items-center gap-2">
                <Activity className="w-3.5 h-3.5 text-blue-400" />
                <span>Live Event Operations</span>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-[#71717a]" />
            </button>

            <button
              onClick={() => navigate('/admin/judging')}
              className="w-full flex items-center justify-between p-2.5 rounded-md bg-[#18181b] hover:bg-[#27272a] border border-[#27272a] text-xs font-medium text-[#fafafa] transition-colors"
            >
              <div className="flex items-center gap-2">
                <Award className="w-3.5 h-3.5 text-purple-400" />
                <span>Judging Control Center</span>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-[#71717a]" />
            </button>

            <button
              onClick={() => navigate('/admin/leaderboard')}
              className="w-full flex items-center justify-between p-2.5 rounded-md bg-[#18181b] hover:bg-[#27272a] border border-[#27272a] text-xs font-medium text-[#fafafa] transition-colors"
            >
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Internal Leaderboard</span>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-[#71717a]" />
            </button>
          </div>
        </div>
      </div>

      {/* Broadcast Modal */}
      {announcementModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
          <div className="bg-[#111113] border border-[#27272a] rounded-lg max-w-md w-full p-5 space-y-4 shadow-xl">
            <div className="flex items-center justify-between pb-3 border-b border-[#27272a]">
              <div className="flex items-center gap-2">
                <Radio className="w-4 h-4 text-[#3b82f6]" />
                <h2 className="text-sm font-medium text-[#fafafa]">Broadcast Operational Announcement</h2>
              </div>
              <button
                onClick={() => setAnnouncementModalOpen(false)}
                className="text-[#71717a] hover:text-[#fafafa]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleBroadcast} className="space-y-3.5">
              <div>
                <label className="block text-xs font-medium text-[#a1a1aa] mb-1">Headline</label>
                <input
                  type="text"
                  placeholder="e.g. Lunch buffet open in Block B Lawn"
                  value={annTitle}
                  onChange={(e) => setAnnTitle(e.target.value)}
                  required
                  className="w-full bg-[#18181b] border border-[#27272a] focus:border-[#3b82f6] rounded-md px-3 py-1.5 text-xs text-[#fafafa] outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#a1a1aa] mb-1">Category</label>
                <select
                  value={annCategory}
                  onChange={(e) => setAnnCategory(e.target.value as any)}
                  className="w-full bg-[#18181b] border border-[#27272a] rounded-md px-2.5 py-1.5 text-xs text-[#fafafa] outline-none"
                >
                  <option value="urgent">Urgent Announcement</option>
                  <option value="schedule">Schedule Change</option>
                  <option value="general">General Operations</option>
                  <option value="results">Results Update</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-[#a1a1aa] mb-1">Message Body</label>
                <textarea
                  rows={3}
                  placeholder="Broadcast instructions..."
                  value={annMessage}
                  onChange={(e) => setAnnMessage(e.target.value)}
                  required
                  className="w-full bg-[#18181b] border border-[#27272a] focus:border-[#3b82f6] rounded-md px-3 py-1.5 text-xs text-[#fafafa] outline-none resize-none"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setAnnouncementModalOpen(false)}
                  className="px-3 py-1.5 rounded-md text-xs font-medium bg-[#18181b] border border-[#27272a] text-[#a1a1aa] hover:text-[#fafafa]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-3 py-1.5 rounded-md bg-[#2563eb] hover:bg-blue-600 text-white text-xs font-medium shadow-sm"
                >
                  Send Broadcast
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
