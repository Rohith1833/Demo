import React, { useState } from 'react';
import { useHackathon } from '../../context/HackathonContext';
import { Bell, Check, Clock, AlertTriangle, Info, Sparkles } from 'lucide-react';

export const NotificationsDropdown: React.FC = () => {
  const { currentRole, currentParticipant, applications, evaluations, announcements, navigate } =
    useHackathon();
  const [isOpen, setIsOpen] = useState(false);

  // Derive notifications based on role
  const notifications: {
    id: string;
    title: string;
    message: string;
    time: string;
    type: 'info' | 'warning' | 'success' | 'urgent';
    link?: string;
  }[] = [];

  if (currentRole === 'participant') {
    if (currentParticipant.status === 'selected' && currentParticipant.paymentStatus === 'pending') {
      notifications.push({
        id: 'n-pay',
        title: 'Complete Registration Payment',
        message: 'Your profile has been selected! Complete the ₹500 fee to generate your check-in QR pass.',
        time: 'Immediate action needed',
        type: 'warning',
        link: '/payment',
      });
    }
    if (currentParticipant.checkInStatus) {
      notifications.push({
        id: 'n-checkin',
        title: 'Check-In Confirmed',
        message: `Welcome to NexHack 2026! Participant ID: ${currentParticipant.participantId}`,
        time: 'Verified',
        type: 'success',
        link: '/dashboard',
      });
    }
    notifications.push({
      id: 'n-sub',
      title: 'Project Submission Portal Live',
      message: 'All team leaders can upload GitHub repos, video demos, and architecture decks.',
      time: 'Closes at 08:00 AM',
      type: 'info',
      link: '/submit',
    });
  } else if (currentRole === 'organizer') {
    const pendingReview = applications.filter((a) => a.status === 'pending').length;
    const pendingPay = applications.filter((a) => a.status === 'selected' && a.paymentStatus === 'pending').length;

    notifications.push({
      id: 'n-org-screen',
      title: `${pendingReview} Applications Pending Review`,
      message: 'Screening pipeline needs attention from faculty & reviewers.',
      time: 'Live triage',
      type: 'warning',
      link: '/admin/applications',
    });

    notifications.push({
      id: 'n-org-pay',
      title: `${pendingPay} Selected Applicants Unpaid`,
      message: 'Payment deadline approaching. Batch email reminder can be dispatched.',
      time: 'Finance queue',
      type: 'info',
      link: '/admin/payments',
    });

    notifications.push({
      id: 'n-org-live',
      title: 'War Room: 104 Submissions Logged',
      message: 'Judging evaluations active across 18 panel judges.',
      time: 'Live',
      type: 'success',
      link: '/admin',
    });
  } else if (currentRole === 'judge') {
    notifications.push({
      id: 'n-judge-pending',
      title: '5 Assigned Projects Pending Evaluation',
      message: 'Please complete innovation, technical, and UX scores on your judge console.',
      time: 'Active Round',
      type: 'urgent',
      link: '/judge',
    });
  } else {
    notifications.push({
      id: 'n-super-archive',
      title: 'NexHack 2026 Database Status',
      message: 'Active production cluster with automated snapshots enabled.',
      time: 'System health 100%',
      type: 'info',
      link: '/superadmin/events',
    });
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
        title="Notifications"
      >
        <Bell className="w-4 h-4" />
        {notifications.length > 0 && (
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
        )}
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
          <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-[#0f111a] border border-slate-800 rounded-2xl shadow-2xl z-50 p-3 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800 px-1">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-300">
                Notifications ({notifications.length})
              </span>
              <span className="text-[10px] text-indigo-400 bg-indigo-950/60 px-2 py-0.5 rounded-full border border-indigo-500/20">
                {currentRole.toUpperCase()}
              </span>
            </div>

            <div className="space-y-2 max-h-80 overflow-y-auto">
              {notifications.map((n) => (
                <div
                  key={n.id}
                  onClick={() => {
                    if (n.link) navigate(n.link);
                    setIsOpen(false);
                  }}
                  className="p-2.5 rounded-xl bg-slate-900/60 hover:bg-slate-800/90 border border-slate-800/60 cursor-pointer transition-colors"
                >
                  <div className="flex items-start gap-2.5">
                    <div className="mt-0.5">
                      {n.type === 'warning' ? (
                        <AlertTriangle className="w-4 h-4 text-amber-400" />
                      ) : n.type === 'urgent' ? (
                        <AlertTriangle className="w-4 h-4 text-rose-400" />
                      ) : n.type === 'success' ? (
                        <Check className="w-4 h-4 text-emerald-400" />
                      ) : (
                        <Info className="w-4 h-4 text-indigo-400" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-medium text-white flex items-center justify-between">
                        <span>{n.title}</span>
                      </div>
                      <p className="text-[11px] text-slate-400 mt-0.5 leading-relaxed">{n.message}</p>
                      <span className="text-[10px] text-slate-500 mt-1 inline-block">{n.time}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};
