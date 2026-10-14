import React, { useState } from 'react';
import { useHackathon } from '../../context/HackathonContext';
import { Settings, Save, ShieldCheck, Clock, CreditCard, Users, FileCode2, Award } from 'lucide-react';

export const EventSettingsPage: React.FC = () => {
  const { settings, updateSettings, showToast } = useHackathon();

  const [activeTab, setActiveTab] = useState<'general' | 'registration' | 'payment' | 'teams' | 'submission'>('general');

  const [formData, setFormData] = useState({
    eventName: settings.eventName,
    collegeName: settings.collegeName,
    dates: settings.dates,
    venue: settings.venue,
    maxParticipants: settings.maxParticipants,
    teamMinSize: settings.teamMinSize,
    teamMaxSize: settings.teamMaxSize,
    paymentAmount: settings.paymentAmount,
    paymentDeadline: settings.paymentDeadline,
    problemSelectionDeadline: settings.problemSelectionDeadline,
    submissionDeadline: settings.submissionDeadline,
    isSubmissionLocked: settings.isSubmissionLocked,
    allowProblemChanges: settings.allowProblemChanges,
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings(formData);
  };

  const tabs = [
    { id: 'general', label: 'General Info' },
    { id: 'registration', label: 'Registration & Deadlines' },
    { id: 'payment', label: 'Fee & Pricing' },
    { id: 'teams', label: 'Team Constraints' },
    { id: 'submission', label: 'Submissions & Judging' },
  ];

  return (
    <div className="min-h-screen bg-[#090a0f] text-slate-100 py-8 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-mono uppercase tracking-wider text-indigo-400 bg-indigo-950/60 px-3 py-1 rounded-full border border-indigo-500/20">
              System Configuration
            </span>
            <h1 className="text-3xl font-extrabold text-white mt-2">Event Parameters & Rules</h1>
            <p className="text-xs text-slate-400 mt-1">
              Configure cutoff dates, fees, team caps, and portal locks for NexHack 2026.
            </p>
          </div>

          <button
            onClick={handleSave}
            className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-md shadow-indigo-600/30 flex items-center gap-1.5 transition-all hover:scale-102"
          >
            <Save className="w-4 h-4" /> Save Configuration
          </button>
        </div>

        {/* Tab pills */}
        <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-2xl bg-slate-900/60 border border-slate-800">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                activeTab === tab.id
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Form Settings Box */}
        <form onSubmit={handleSave} className="p-6 sm:p-8 rounded-3xl bg-slate-900/40 border border-slate-800/80 backdrop-blur-xl space-y-6">
          {activeTab === 'general' && (
            <div className="space-y-4 animate-in fade-in">
              <h3 className="text-base font-bold text-white border-b border-slate-800 pb-3">
                General Event Metadata
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="text-slate-400 font-semibold block mb-1">Event Name</label>
                  <input
                    type="text"
                    value={formData.eventName}
                    onChange={(e) => setFormData({ ...formData, eventName: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="text-slate-400 font-semibold block mb-1">Host College / Institution</label>
                  <input
                    type="text"
                    value={formData.collegeName}
                    onChange={(e) => setFormData({ ...formData, collegeName: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="text-slate-400 font-semibold block mb-1">Event Dates</label>
                  <input
                    type="text"
                    value={formData.dates}
                    onChange={(e) => setFormData({ ...formData, dates: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="text-slate-400 font-semibold block mb-1">On-Site Venue</label>
                  <input
                    type="text"
                    value={formData.venue}
                    onChange={(e) => setFormData({ ...formData, venue: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'registration' && (
            <div className="space-y-4 animate-in fade-in">
              <h3 className="text-base font-bold text-white border-b border-slate-800 pb-3">
                Deadlines & Capacity Caps
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="text-slate-400 font-semibold block mb-1">Maximum Allowed Participants</label>
                  <input
                    type="number"
                    value={formData.maxParticipants}
                    onChange={(e) => setFormData({ ...formData, maxParticipants: parseInt(e.target.value) || 500 })}
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white font-mono focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="text-slate-400 font-semibold block mb-1">Problem Statement Deadline</label>
                  <input
                    type="text"
                    value={formData.problemSelectionDeadline}
                    onChange={(e) => setFormData({ ...formData, problemSelectionDeadline: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="text-slate-400 font-semibold block mb-1">Project Submission Deadline</label>
                  <input
                    type="text"
                    value={formData.submissionDeadline}
                    onChange={(e) => setFormData({ ...formData, submissionDeadline: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'payment' && (
            <div className="space-y-4 animate-in fade-in">
              <h3 className="text-base font-bold text-white border-b border-slate-800 pb-3">
                Registration Fee Configuration
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="text-slate-400 font-semibold block mb-1">Fee Per Shortlisted Participant (₹)</label>
                  <input
                    type="number"
                    value={formData.paymentAmount}
                    onChange={(e) => setFormData({ ...formData, paymentAmount: parseInt(e.target.value) || 500 })}
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white font-mono focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="text-slate-400 font-semibold block mb-1">Payment Confirmation Deadline</label>
                  <input
                    type="text"
                    value={formData.paymentDeadline}
                    onChange={(e) => setFormData({ ...formData, paymentDeadline: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'teams' && (
            <div className="space-y-4 animate-in fade-in">
              <h3 className="text-base font-bold text-white border-b border-slate-800 pb-3">
                Team Size Boundaries
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="text-slate-400 font-semibold block mb-1">Minimum Team Size</label>
                  <input
                    type="number"
                    value={formData.teamMinSize}
                    onChange={(e) => setFormData({ ...formData, teamMinSize: parseInt(e.target.value) || 2 })}
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white font-mono focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="text-slate-400 font-semibold block mb-1">Maximum Team Size</label>
                  <input
                    type="number"
                    value={formData.teamMaxSize}
                    onChange={(e) => setFormData({ ...formData, teamMaxSize: parseInt(e.target.value) || 4 })}
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white font-mono focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'submission' && (
            <div className="space-y-4 animate-in fade-in">
              <h3 className="text-base font-bold text-white border-b border-slate-800 pb-3">
                Submission Gateway Controls
              </h3>

              <div className="space-y-3 text-xs">
                <label className="flex items-center gap-3 p-3 rounded-xl bg-slate-950 border border-slate-800 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isSubmissionLocked}
                    onChange={(e) => setFormData({ ...formData, isSubmissionLocked: e.target.checked })}
                    className="rounded bg-slate-900 border-slate-700 text-indigo-600 focus:ring-indigo-500"
                  />
                  <div>
                    <span className="font-semibold text-white">Strict Submission Lock</span>
                    <div className="text-slate-400">
                      When enabled, participants cannot edit GitHub URLs or presentation links.
                    </div>
                  </div>
                </label>

                <label className="flex items-center gap-3 p-3 rounded-xl bg-slate-950 border border-slate-800 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.allowProblemChanges}
                    onChange={(e) => setFormData({ ...formData, allowProblemChanges: e.target.checked })}
                    className="rounded bg-slate-900 border-slate-700 text-indigo-600 focus:ring-indigo-500"
                  />
                  <div>
                    <span className="font-semibold text-white">Allow Post-Selection Problem Changes</span>
                    <div className="text-slate-400">
                      When disabled, teams cannot switch problem statements once locked.
                    </div>
                  </div>
                </label>
              </div>
            </div>
          )}

          <div className="pt-4 border-t border-slate-800 flex justify-end">
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-md shadow-indigo-600/30"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
