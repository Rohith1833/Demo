import React, { useState } from 'react';
import { useHackathon } from '../../context/HackathonContext';
import type { HackathonEvent } from '../../types';
import {
  Calendar,
  Plus,
  Copy,
  FolderArchive,
  CheckCircle2,
  ExternalLink,
  Layers,
  Sparkles,
  X,
  Building,
} from 'lucide-react';

export const YearlyHackathonsPage: React.FC = () => {
  const { events, createNewHackathon, navigate, showToast } = useHackathon();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [eventName, setEventName] = useState('NexHack 2027');
  const [eventYear, setEventYear] = useState(2027);
  const [dates, setDates] = useState('October 16 - 17, 2027');
  const [venue, setVenue] = useState('Main Campus Convention Center');
  const [limit, setLimit] = useState(600);
  const [duplicateFrom, setDuplicateFrom] = useState('EVT-2026');

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    createNewHackathon(
      {
        name: eventName,
        year: eventYear,
        dates,
        venue,
        participantLimit: limit,
      },
      duplicateFrom
    );
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#090a0f] text-slate-100 py-8 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-mono uppercase tracking-wider text-rose-400 bg-rose-950/60 px-3 py-1 rounded-full border border-rose-500/20">
              Institutional Multi-Tenancy
            </span>
            <h1 className="text-3xl font-extrabold text-white mt-2">Annual Hackathon Editions</h1>
            <p className="text-xs text-slate-400 mt-1">
              Reusable college hackathon engine. Spin up annual editions with one click while cloning proven rubrics and templates.
            </p>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-md shadow-indigo-600/30 flex items-center gap-2 transition-all hover:scale-102"
          >
            <Plus className="w-4 h-4" /> Create New Hackathon Edition
          </button>
        </div>

        {/* Editions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {events.map((evt) => {
            const isActive = evt.status === 'active';
            const isCompleted = evt.status === 'completed';

            return (
              <div
                key={evt.id}
                className={`p-6 sm:p-8 rounded-3xl border flex flex-col justify-between transition-all backdrop-blur-xl ${
                  isActive
                    ? 'bg-slate-900/60 border-indigo-500/40 shadow-xl shadow-indigo-950/20 ring-1 ring-indigo-500/20'
                    : 'bg-slate-900/30 border-slate-800/80 opacity-80'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-xs font-bold text-slate-400 bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
                      {evt.year} Edition
                    </span>

                    <span
                      className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full flex items-center gap-1 ${
                        isActive
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                          : isCompleted
                          ? 'bg-slate-800 text-slate-300'
                          : 'bg-slate-900 text-slate-500'
                      }`}
                    >
                      {isActive && <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />}
                      {evt.status}
                    </span>
                  </div>

                  <h3 className="text-2xl font-black text-white">{evt.name}</h3>
                  <div className="text-xs text-slate-400 mt-1">{evt.college}</div>

                  <div className="my-6 space-y-2 text-xs text-slate-300">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">Dates:</span>
                      <strong className="text-white">{evt.dates}</strong>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">Venue:</span>
                      <span className="truncate max-w-[180px]">{evt.venue}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">Participant Limit:</span>
                      <span className="font-mono">{evt.participantLimit} attendees</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">Prize Pool:</span>
                      <strong className="text-emerald-400 font-mono">{evt.prizePool}</strong>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
                  {isActive ? (
                    <button
                      onClick={() => navigate('/admin')}
                      className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs shadow-md transition-all text-center"
                    >
                      Enter Active Command Center →
                    </button>
                  ) : (
                    <button
                      onClick={() => showToast('info', `Loading historical snapshot for ${evt.name}`, 'Archived')}
                      className="w-full py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 text-xs font-semibold text-center border border-slate-800"
                    >
                      View Historical Archive
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Create New Hackathon Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
          <div className="bg-[#0f111a] border border-slate-800 rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-lg font-bold text-white mb-1">Create New Hackathon Edition</h3>
            <p className="text-xs text-slate-400 mb-5">
              Initialize a clean database partition for the next college hackathon cycle.
            </p>

            <form onSubmit={handleCreate} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-400 font-semibold block mb-1">Event Name</label>
                  <input
                    type="text"
                    value={eventName}
                    onChange={(e) => setEventName(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="text-slate-400 font-semibold block mb-1">Year</label>
                  <input
                    type="number"
                    value={eventYear}
                    onChange={(e) => setEventYear(parseInt(e.target.value) || 2027)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-indigo-500 font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-400 font-semibold block mb-1">Dates</label>
                  <input
                    type="text"
                    value={dates}
                    onChange={(e) => setDates(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="text-slate-400 font-semibold block mb-1">Participant Limit</label>
                  <input
                    type="number"
                    value={limit}
                    onChange={(e) => setLimit(parseInt(e.target.value) || 500)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-indigo-500 font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="text-slate-400 font-semibold block mb-1">On-Site Venue</label>
                <input
                  type="text"
                  value={venue}
                  onChange={(e) => setVenue(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              {/* Duplicate Configuration Option */}
              <div className="p-3.5 rounded-2xl bg-indigo-950/20 border border-indigo-500/30 space-y-1.5">
                <label className="text-slate-200 font-semibold block flex items-center gap-1.5">
                  <Copy className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Duplicate Settings from Previous Event</span>
                </label>
                <select
                  value={duplicateFrom}
                  onChange={(e) => setDuplicateFrom(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none"
                >
                  <option value="EVT-2026">Copy settings from NexHack 2026 (Recommended)</option>
                  <option value="EVT-2025">Copy settings from NexHack 2025</option>
                  <option value="">Start with blank template</option>
                </select>
                <div className="text-[10px] text-slate-400 mt-1">
                  Copies registration fields, judging rubric, email templates, tracks, and fees — <strong>NOT</strong>{' '}
                  previous participant records.
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold shadow-md shadow-indigo-600/30"
                >
                  Initialize Hackathon
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
