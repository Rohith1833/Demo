import React, { useState } from 'react';
import { useHackathon } from '../../context/HackathonContext';
import { LifeBuoy, Clock, CheckCircle2, AlertTriangle, Send, UserCheck, Shield } from 'lucide-react';
import { MentorRequest } from '../../types';

export const HelpDeskPage: React.FC = () => {
  const { currentTeam, currentParticipant, mentorRequests, addMentorRequest } = useHackathon();

  const [category, setCategory] = useState<MentorRequest['category']>('Technical');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [urgency, setUrgency] = useState<'Normal' | 'Urgent'>('Normal');

  const teamRequests = mentorRequests.filter((r) => r.teamId === currentTeam?.id);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;

    addMentorRequest({
      category,
      title,
      description,
      urgency,
      teamId: currentTeam?.id || 'team-01',
      teamName: currentTeam?.name || 'Team Neural Ninjas',
    });

    setTitle('');
    setDescription('');
  };

  const getStatusBadge = (status: MentorRequest['status']) => {
    switch (status) {
      case 'Waiting':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-mono font-medium bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <Clock className="w-3 h-3" /> Waiting for Mentor
          </span>
        );
      case 'Assigned':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-mono font-medium bg-blue-500/10 text-blue-400 border border-blue-500/20">
            <UserCheck className="w-3 h-3" /> Mentor Assigned
          </span>
        );
      case 'In Progress':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-mono font-medium bg-purple-500/10 text-purple-400 border border-purple-500/20">
            <Shield className="w-3 h-3" /> In Progress
          </span>
        );
      case 'Resolved':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-mono font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <CheckCircle2 className="w-3 h-3" /> Resolved
          </span>
        );
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <h1 className="text-xl font-semibold text-[#fafafa] tracking-tight">Participant Help Desk</h1>
        <p className="text-xs text-[#a1a1aa] mt-1">
          Submit technical mentorship and physical lab infrastructure assistance requests directly to coordinators.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Ticket Creation Form */}
        <div className="lg:col-span-5 bg-[#111113] border border-[#27272a] rounded-lg p-5 space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-[#27272a]">
            <LifeBuoy className="w-4 h-4 text-[#3b82f6]" />
            <h2 className="text-sm font-medium text-[#fafafa]">Create Service Request</h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3.5">
            <div>
              <label className="block text-xs font-medium text-[#a1a1aa] mb-1">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as MentorRequest['category'])}
                className="w-full bg-[#18181b] border border-[#27272a] focus:border-[#3b82f6] rounded-md px-3 py-1.5 text-xs text-[#fafafa] outline-none"
              >
                <option value="Technical">Technical (Backend, Frontend, APIs)</option>
                <option value="Problem Statement">Problem Statement Clarification</option>
                <option value="Hardware">Hardware / IoT Lab Components</option>
                <option value="Infrastructure">Infrastructure (Wi-Fi, Power, Tables)</option>
                <option value="Organizer">Organizer Desk / Logistics</option>
                <option value="Other">Other Query</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-[#a1a1aa] mb-1">Issue Summary</label>
              <input
                type="text"
                placeholder="Brief summary of what you are blocked by"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="w-full bg-[#18181b] border border-[#27272a] focus:border-[#3b82f6] rounded-md px-3 py-1.5 text-xs text-[#fafafa] outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-[#a1a1aa] mb-1">Detailed Description</label>
              <textarea
                rows={3}
                placeholder="Include error codes, terminal outputs, or specific lab desk location..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                className="w-full bg-[#18181b] border border-[#27272a] focus:border-[#3b82f6] rounded-md px-3 py-1.5 text-xs text-[#fafafa] outline-none resize-none"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-[#a1a1aa] mb-1">Urgency</label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setUrgency('Normal')}
                  className={`py-1.5 px-3 rounded-md text-xs font-medium border text-center transition-colors ${
                    urgency === 'Normal'
                      ? 'bg-[#18181b] text-[#fafafa] border-[#3b82f6]'
                      : 'bg-[#111113] text-[#71717a] border-[#27272a] hover:text-[#a1a1aa]'
                  }`}
                >
                  Normal
                </button>
                <button
                  type="button"
                  onClick={() => setUrgency('Urgent')}
                  className={`py-1.5 px-3 rounded-md text-xs font-medium border text-center transition-colors ${
                    urgency === 'Urgent'
                      ? 'bg-rose-500/10 text-rose-400 border-rose-500/40'
                      : 'bg-[#111113] text-[#71717a] border-[#27272a] hover:text-[#a1a1aa]'
                  }`}
                >
                  Urgent
                </button>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-1.5 py-2 px-4 rounded-md bg-[#2563eb] hover:bg-blue-600 text-white text-xs font-medium transition-colors shadow-sm"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Request Help</span>
              </button>
            </div>
          </form>
        </div>

        {/* Active & Historical Tickets */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-medium text-[#fafafa]">Team Support Tickets</h2>
            <span className="text-xs font-mono text-[#71717a]">
              Team: {currentTeam?.name || 'Neural Ninjas'}
            </span>
          </div>

          {teamRequests.length === 0 ? (
            <div className="bg-[#111113] border border-[#27272a] rounded-lg p-8 text-center">
              <LifeBuoy className="w-8 h-8 text-[#52525b] mx-auto mb-2" />
              <p className="text-xs font-medium text-[#fafafa]">No active tickets</p>
              <p className="text-[11px] text-[#71717a] mt-1">
                If your team gets stuck with an API, deployment, or hardware issue, submit a ticket above.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {teamRequests.map((req) => (
                <div
                  key={req.id}
                  className="bg-[#111113] border border-[#27272a] rounded-lg p-4 space-y-3"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono font-medium text-[#3b82f6]">
                          {req.id}
                        </span>
                        <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-[#18181b] border border-[#27272a] text-[#a1a1aa]">
                          {req.category}
                        </span>
                        {req.urgency === 'Urgent' && (
                          <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-rose-500/10 text-rose-400 border border-rose-500/20">
                            Urgent
                          </span>
                        )}
                      </div>
                      <h3 className="text-xs font-medium text-[#fafafa] mt-1">{req.title}</h3>
                    </div>
                    {getStatusBadge(req.status)}
                  </div>

                  <p className="text-xs text-[#a1a1aa] bg-[#18181b] p-2.5 rounded border border-[#27272a]">
                    {req.description}
                  </p>

                  <div className="flex items-center justify-between text-[11px] text-[#71717a] pt-1">
                    <span>Logged at {req.createdAt}</span>
                    {req.assignedMentor ? (
                      <span className="text-[#a1a1aa] font-medium">
                        Mentor: {req.assignedMentor}
                      </span>
                    ) : (
                      <span className="text-amber-400 font-mono text-[10px]">
                        Waiting for triage ({req.waitingMinutes}m)
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
