import React, { useState } from 'react';
import { useHackathon } from '../../context/HackathonContext';
import { EmailTemplate } from '../../types';
import {
  Mail,
  Send,
  Eye,
  Edit3,
  Clock,
  Sparkles,
  CheckCircle2,
  Users,
  Copy,
  Check,
} from 'lucide-react';

export const CommunicationPage: React.FC = () => {
  const { emailTemplates, sendSimulatedEmails, showToast } = useHackathon();

  const [activeTemplate, setActiveTemplate] = useState<EmailTemplate>(emailTemplates[1]); // "Selected" template
  const [recipientFilter, setRecipientFilter] = useState<'selected' | 'waitlisted' | 'paid' | 'all'>('selected');
  const [isEditing, setIsEditing] = useState(false);
  const [editedBody, setEditedBody] = useState(activeTemplate.body);

  // Communication logs
  const [logs, setLogs] = useState([
    {
      id: 'LOG-01',
      template: 'Selection & Invitation to Confirm',
      target: '500 Selected Applicants',
      time: 'Oct 02, 2026 • 04:30 PM',
      count: 500,
      status: 'Delivered (99.8%)',
    },
    {
      id: 'LOG-02',
      template: 'Payment Final Reminder',
      target: '68 Unpaid Applicants',
      time: 'Oct 08, 2026 • 11:00 AM',
      count: 68,
      status: 'Delivered (100%)',
    },
    {
      id: 'LOG-03',
      template: 'Problem Statements Released',
      target: '432 Confirmed Hackers',
      time: 'Oct 14, 2026 • 06:00 PM',
      count: 432,
      status: 'Delivered (99.4%)',
    },
  ]);

  const handleSelectTemplate = (tmpl: EmailTemplate) => {
    setActiveTemplate(tmpl);
    setEditedBody(tmpl.body);
    setIsEditing(false);
  };

  const handleDispatch = () => {
    const count = recipientFilter === 'selected' ? 487 : recipientFilter === 'paid' ? 432 : 1248;
    sendSimulatedEmails(activeTemplate.id, count);

    const newLog = {
      id: `LOG-${logs.length + 1}`,
      template: activeTemplate.name,
      target: `${count} Participants (${recipientFilter.toUpperCase()})`,
      time: 'Just now',
      count,
      status: 'Queued (100%)',
    };
    setLogs([newLog, ...logs]);
  };

  // Preview replacement of dynamic template variables
  const previewBody = (isEditing ? editedBody : activeTemplate.body)
    .replace(/{{participant_name}}/g, 'Arjun Kumar')
    .replace(/{{event_name}}/g, 'NexHack 2026')
    .replace(/{{college_name}}/g, 'XYZ Institute of Technology')
    .replace(/{{application_id}}/g, 'NXH26-1042')
    .replace(/{{participant_id}}/g, 'NXH-P-0421')
    .replace(/{{team_name}}/g, 'Neural Ninjas')
    .replace(/{{payment_amount}}/g, '500')
    .replace(/{{payment_deadline}}/g, 'October 14, 2026 at 11:59 PM')
    .replace(/{{venue}}/g, 'Main Campus Convention Center')
    .replace(/{{dates}}/g, 'October 17 - 18, 2026')
    .replace(/{{submission_deadline}}/g, 'October 18, 2026 at 08:00 AM')
    .replace(/{{problem_selection_deadline}}/g, 'October 16, 2026 at 6:00 PM')
    .replace(/{{batch2_date}}/g, 'October 15, 2026');

  return (
    <div className="min-h-screen bg-[#090a0f] text-slate-100 py-8 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-mono uppercase tracking-wider text-indigo-400 bg-indigo-950/60 px-3 py-1 rounded-full border border-indigo-500/20">
              Notification & Broadcast Gateway
            </span>
            <h1 className="text-3xl font-extrabold text-white mt-2">Email & Communication Center</h1>
            <p className="text-xs text-slate-400 mt-1">
              Trigger dynamic transactional emails, broadcast reminders, and track delivery logs across the lifecycle.
            </p>
          </div>
        </div>

        {/* Two-Column: Template Selector on Left, Preview/Send on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Templates list (Left 1 col) */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider text-[11px] text-slate-400">
              Reusable Templates ({emailTemplates.length})
            </h3>

            <div className="space-y-2">
              {emailTemplates.map((tmpl) => {
                const isSelected = tmpl.id === activeTemplate.id;
                return (
                  <div
                    key={tmpl.id}
                    onClick={() => handleSelectTemplate(tmpl)}
                    className={`p-3.5 rounded-2xl border cursor-pointer transition-all ${
                      isSelected
                        ? 'bg-indigo-950/40 border-indigo-500/50 shadow-md text-white'
                        : 'bg-slate-900/40 border-slate-800/80 hover:border-slate-700 text-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-xs text-white">{tmpl.name}</span>
                      <span className="text-[9px] font-mono text-indigo-400 bg-slate-950 px-1.5 py-0.5 rounded">
                        {tmpl.triggerEvent}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400 line-clamp-1 mt-1">{tmpl.subject}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Template Preview and Dispatch (Right 2 cols) */}
          <div className="lg:col-span-2 space-y-6">
            <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/40 border border-slate-800/80 backdrop-blur-xl space-y-6">
              {/* Header with actions */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-4">
                <div>
                  <div className="text-[10px] uppercase font-bold text-indigo-400">Selected Template</div>
                  <h3 className="text-lg font-bold text-white mt-0.5">{activeTemplate.name}</h3>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsEditing(!isEditing)}
                    className={`px-3 py-1.5 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                      isEditing
                        ? 'bg-indigo-600 border-indigo-500 text-white'
                        : 'bg-slate-900 border-slate-800 text-slate-300'
                    }`}
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    <span>{isEditing ? 'Preview Mode' : 'Edit Template'}</span>
                  </button>

                  <button
                    onClick={() => {
                      showToast('info', 'Sent test preview email to organizer inbox', 'Test Email Sent');
                    }}
                    className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 text-xs font-semibold"
                  >
                    Send Test
                  </button>
                </div>
              </div>

              {/* Subject line */}
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs">
                <span className="text-slate-400 font-semibold">Subject: </span>
                <span className="text-white font-medium">
                  {activeTemplate.subject.replace(/{{event_name}}/g, 'NexHack 2026').replace(/{{application_id}}/g, 'NXH26-1042')}
                </span>
              </div>

              {/* Body */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[11px] uppercase font-bold text-slate-400">
                    {isEditing ? 'Editing Raw Template Body' : 'Live Preview (With Merged Variables)'}
                  </span>
                  <span className="text-[10px] text-slate-500 font-mono">HTML / Markdown Text</span>
                </div>

                {isEditing ? (
                  <textarea
                    rows={10}
                    value={editedBody}
                    onChange={(e) => setEditedBody(e.target.value)}
                    className="w-full p-4 rounded-2xl bg-slate-950 border border-slate-800 text-xs text-white font-mono leading-relaxed focus:outline-none focus:border-indigo-500"
                  />
                ) : (
                  <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 text-xs text-slate-200 whitespace-pre-wrap leading-relaxed font-sans shadow-inner">
                    {previewBody}
                  </div>
                )}
              </div>

              {/* Recipient Audience Filter & Send Button */}
              <div className="p-4 rounded-2xl bg-indigo-950/20 border border-indigo-500/20 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <Users className="w-5 h-5 text-indigo-400 shrink-0" />
                  <div>
                    <label className="text-xs font-semibold text-white block">Recipient Cohort</label>
                    <select
                      value={recipientFilter}
                      onChange={(e) => setRecipientFilter(e.target.value as any)}
                      className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white mt-1"
                    >
                      <option value="selected">Selected Applicants (487)</option>
                      <option value="paid">Paid & Confirmed Participants (432)</option>
                      <option value="waitlisted">Waitlisted Pool (112)</option>
                      <option value="all">All Applicants (1,248)</option>
                    </select>
                  </div>
                </div>

                <button
                  onClick={handleDispatch}
                  className="w-full sm:w-auto px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2 transition-all hover:scale-102"
                >
                  <Send className="w-4 h-4" />
                  <span>Send to Selected Participants</span>
                </button>
              </div>
            </div>

            {/* Communication History Log */}
            <div className="rounded-2xl border border-slate-800/80 overflow-hidden bg-slate-950/40 backdrop-blur-md">
              <div className="p-4 bg-slate-900/60 border-b border-slate-800 text-xs font-bold text-white flex items-center justify-between">
                <span>Recent Broadcast History</span>
                <span className="text-[10px] text-slate-500 font-mono">Dispatched Logs</span>
              </div>
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-900/40 text-slate-400 uppercase font-mono text-[10px]">
                  <tr>
                    <th className="p-3">Template</th>
                    <th className="p-3">Target Audience</th>
                    <th className="p-3">Dispatched Time</th>
                    <th className="p-3 text-right">Delivery Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {logs.map((log) => (
                    <tr key={log.id} className="hover:bg-slate-900/40">
                      <td className="p-3 font-medium text-white">{log.template}</td>
                      <td className="p-3 text-slate-400">{log.target}</td>
                      <td className="p-3 font-mono text-slate-400">{log.time}</td>
                      <td className="p-3 text-right">
                        <span className="text-[10px] font-semibold text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/30">
                          {log.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
