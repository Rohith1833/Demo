import React, { useState } from 'react';
import { useHackathon } from '../../context/HackathonContext';
import { WinnerEntry } from '../../types';
import {
  Award,
  Trophy,
  Sparkles,
  CheckCircle2,
  Lock,
  Unlock,
  ChevronRight,
  ArrowRight,
  Medal,
  Crown,
} from 'lucide-react';

export const WinnerManagementPage: React.FC = () => {
  const { winners, assignWinner, teams, submissions, togglePublishResults, settings, navigate, showToast } =
    useHackathon();

  const categories = [
    { title: 'Overall Champion (1st Place)', prize: '₹50,000 + Cloud Credits', badge: '🏆 Grand Winner' },
    { title: '1st Runner Up (2nd Place)', prize: '₹25,000 + Incubation', badge: '🥈 1st Runner Up' },
    { title: '2nd Runner Up (3rd Place)', prize: '₹15,000 + Swag Gear', badge: '🥉 2nd Runner Up' },
    { title: 'Best AI / ML Solution', prize: '₹5,000 + Jetson Nano Kits', badge: '🤖 Best AI Innovation' },
    { title: 'Best UI / UX & Ergonomics', prize: '₹5,000 + Figma Annual Licenses', badge: '✨ Best UI/UX' },
    { title: 'Best Beginner Team', prize: '₹5,000 + Mentorship Vouchers', badge: '🚀 Best Freshman' },
    { title: 'Special Jury Commendation', prize: '₹5,000 + Fast-Track Interviews', badge: '⭐ Special Jury Award' },
  ];

  const [selectedCategory, setSelectedCategory] = useState(categories[0].title);
  const [selectedTeamId, setSelectedTeamId] = useState('TEAM-01');

  const handleAssign = (e: React.FormEvent) => {
    e.preventDefault();
    const team = teams.find((t) => t.id === selectedTeamId);
    const sub = submissions.find((s) => s.teamId === selectedTeamId);
    const catObj = categories.find((c) => c.title === selectedCategory);

    if (!team) return;

    const newEntry: WinnerEntry = {
      id: `WIN-${Math.random().toString(36).substring(2, 6).toUpperCase()}`,
      category: selectedCategory,
      teamId: team.id,
      teamName: team.name,
      projectName: sub?.title || 'Project Submission',
      score: 95.8,
      members: team.members.map((m) => m.name),
      track: sub?.track || 'General Track',
      prize: catObj?.prize || 'Cash Prize',
      badge: catObj?.badge || '🏆 Winner',
      description: 'Awarded by unanimous vote of the grand evaluation committee.',
    };

    assignWinner(newEntry);
  };

  return (
    <div className="min-h-screen bg-[#090a0f] text-slate-100 py-8 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-mono uppercase tracking-wider text-amber-400 bg-amber-950/60 px-3 py-1 rounded-full border border-amber-500/20">
              Valedictory Podium
            </span>
            <h1 className="text-3xl font-extrabold text-white mt-2">Winner Selection & Awards</h1>
            <p className="text-xs text-slate-400 mt-1">
              Assign winning teams to categories, format prize credentials, and publish directly to the public ceremony portal.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={togglePublishResults}
              className={`px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 transition-all shadow-md ${
                settings.isResultsPublished
                  ? 'bg-rose-950 border border-rose-500/40 text-rose-300'
                  : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-600/30'
              }`}
            >
              {settings.isResultsPublished ? (
                <>
                  <Lock className="w-3.5 h-3.5" /> Results Live on /results
                </>
              ) : (
                <>
                  <Unlock className="w-3.5 h-3.5" /> Publish to Results Page
                </>
              )}
            </button>
            <button
              onClick={() => navigate('/results')}
              className="px-3.5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              Preview Public Page <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Quick Assign Form Card */}
        <div className="p-6 rounded-3xl bg-slate-900/40 border border-slate-800/80 backdrop-blur-xl">
          <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
            <Crown className="w-4 h-4 text-amber-400" /> Assign Award Category
          </h3>

          <form onSubmit={handleAssign} className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div>
              <label className="text-slate-400 font-semibold block mb-1">Award Category</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none"
              >
                {categories.map((c) => (
                  <option key={c.title} value={c.title}>
                    {c.title}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-slate-400 font-semibold block mb-1">Winning Team</label>
              <select
                value={selectedTeamId}
                onChange={(e) => setSelectedTeamId(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none"
              >
                {teams.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.name} (Lead: {t.leaderName})
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-end">
              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold shadow-md shadow-amber-500/20 transition-all hover:scale-102 flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4" /> Save Award Assignment
              </button>
            </div>
          </form>
        </div>

        {/* Presentation-Quality Winner Cards Grid */}
        <div className="space-y-4">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Trophy className="w-4 h-4 text-amber-400" /> Active Category Winners ({winners.length})
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {winners.map((win, idx) => (
              <div
                key={win.id || idx}
                className="p-6 rounded-3xl bg-gradient-to-b from-slate-900/60 to-slate-950/80 border border-amber-500/30 backdrop-blur-md shadow-xl flex flex-col justify-between hover:border-amber-500/60 transition-all hover:-translate-y-1"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-xs font-bold text-amber-400 bg-amber-950/80 px-2.5 py-1 rounded-full border border-amber-500/30 flex items-center gap-1.5">
                      {win.badge}
                    </span>
                    <span className="font-mono text-xs font-bold text-emerald-400 bg-slate-900 px-2 py-0.5 rounded">
                      {win.score} / 100
                    </span>
                  </div>

                  <div className="text-[11px] uppercase font-semibold text-slate-400 tracking-wider">
                    {win.category}
                  </div>

                  <h3 className="text-xl font-black text-white mt-1 mb-1">{win.teamName}</h3>
                  <div className="text-xs text-indigo-300 font-medium mb-3">Project: {win.projectName}</div>

                  <p className="text-xs text-slate-400 leading-relaxed mb-4">{win.description}</p>
                </div>

                <div className="pt-4 border-t border-slate-800/80 space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Prize Grant:</span>
                    <strong className="text-emerald-400">{win.prize}</strong>
                  </div>
                  <div className="text-[11px] text-slate-400 truncate">
                    Members: {win.members.join(', ')}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
