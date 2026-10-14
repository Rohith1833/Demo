import React, { useState } from 'react';
import { useHackathon } from '../../context/HackathonContext';
import {
  Trophy,
  Award,
  Eye,
  Lock,
  Unlock,
  Sparkles,
  TrendingUp,
  Download,
  Flame,
  ArrowRight,
} from 'lucide-react';

export const LeaderboardPage: React.FC = () => {
  const { submissions, evaluations, settings, togglePublishResults, navigate, showToast } =
    useHackathon();

  // Aggregate scores for submissions
  const rankedItems = submissions
    .map((sub) => {
      const subEvals = evaluations.filter((e) => e.submissionId === sub.id);
      if (subEvals.length === 0) {
        return {
          submission: sub,
          innovation: 17.0,
          technical: 22.0,
          ux: 13.0,
          total: 82.0,
        };
      }
      const avgInnovation = (
        subEvals.reduce((acc, e) => acc + e.scores.innovation, 0) / subEvals.length
      ).toFixed(1);
      const avgTechnical = (
        subEvals.reduce((acc, e) => acc + e.scores.technical, 0) / subEvals.length
      ).toFixed(1);
      const avgUx = (
        subEvals.reduce((acc, e) => acc + e.scores.ux, 0) / subEvals.length
      ).toFixed(1);
      const avgTotal = (
        subEvals.reduce((acc, e) => acc + e.scores.total, 0) / subEvals.length
      ).toFixed(1);

      return {
        submission: sub,
        innovation: parseFloat(avgInnovation),
        technical: parseFloat(avgTechnical),
        ux: parseFloat(avgUx),
        total: parseFloat(avgTotal),
      };
    })
    .sort((a, b) => b.total - a.total);

  return (
    <div className="min-h-screen bg-[#090a0f] text-slate-100 py-8 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-mono uppercase tracking-wider text-amber-400 bg-amber-950/60 px-3 py-1 rounded-full border border-amber-500/20">
              Evaluator Standings
            </span>
            <h1 className="text-3xl font-extrabold text-white mt-2">Internal Leaderboard</h1>
            <p className="text-xs text-slate-400 mt-1">
              Live ranking computed across normalized rubric metrics. Only visible to organizers until published.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => navigate('/admin/winners')}
              className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <Award className="w-4 h-4 text-amber-400" /> Assign Category Winners
            </button>

            <button
              onClick={togglePublishResults}
              className={`px-4 py-2 rounded-xl font-bold text-xs flex items-center gap-2 transition-all shadow-md ${
                settings.isResultsPublished
                  ? 'bg-rose-950 border border-rose-500/40 text-rose-300'
                  : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-600/30'
              }`}
            >
              {settings.isResultsPublished ? (
                <>
                  <Lock className="w-3.5 h-3.5" /> Unpublish (Currently Live)
                </>
              ) : (
                <>
                  <Unlock className="w-3.5 h-3.5" /> Publish to All Participants
                </>
              )}
            </button>
          </div>
        </div>

        {/* Publishing Visibility Alert Banner */}
        <div
          className={`p-4 rounded-2xl border flex items-center justify-between gap-4 ${
            settings.isResultsPublished
              ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-200'
              : 'bg-amber-950/30 border-amber-500/40 text-amber-200'
          }`}
        >
          <div className="flex items-center gap-3">
            <div
              className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                settings.isResultsPublished ? 'bg-emerald-500/20' : 'bg-amber-500/20'
              }`}
            >
              {settings.isResultsPublished ? (
                <Unlock className="w-5 h-5 text-emerald-400" />
              ) : (
                <Lock className="w-5 h-5 text-amber-400" />
              )}
            </div>
            <div>
              <div className="text-xs font-bold uppercase tracking-wider">
                {settings.isResultsPublished
                  ? 'Public Results Active'
                  : 'Internal Confidentiality Mode'}
              </div>
              <div className="text-xs opacity-80 mt-0.5">
                {settings.isResultsPublished
                  ? 'Participants can now view published rankings, category awards, and final scores on /results.'
                  : 'Rankings are hidden from participants and judges. Review scores thoroughly before publishing.'}
              </div>
            </div>
          </div>

          <button
            onClick={() => navigate('/results')}
            className="px-3.5 py-1.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-white text-xs font-semibold shrink-0 border border-slate-700/80 flex items-center gap-1.5"
          >
            <span>Preview Public Results</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Leaderboard Table */}
        <div className="rounded-2xl border border-slate-800/80 overflow-hidden bg-slate-950/40 backdrop-blur-md shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-900/80 border-b border-slate-800 text-slate-400 uppercase font-mono text-[10px] tracking-wider">
                <tr>
                  <th className="p-3.5 w-16">Rank</th>
                  <th className="p-3.5">Team & Project</th>
                  <th className="p-3.5">Track / Problem</th>
                  <th className="p-3.5">Innovation (/20)</th>
                  <th className="p-3.5">Technical (/25)</th>
                  <th className="p-3.5">UX (/15)</th>
                  <th className="p-3.5 text-right font-bold text-white">Final Score (/100)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {rankedItems.map((item, index) => {
                  const rank = index + 1;
                  const isTop3 = rank <= 3;

                  return (
                    <tr
                      key={item.submission.id}
                      className={`hover:bg-slate-900/60 transition-colors ${
                        rank === 1
                          ? 'bg-amber-950/20'
                          : rank === 2
                          ? 'bg-slate-900/40'
                          : rank === 3
                          ? 'bg-orange-950/10'
                          : ''
                      }`}
                    >
                      <td className="p-3.5">
                        <div
                          className={`w-7 h-7 rounded-lg flex items-center justify-center font-black font-mono text-xs ${
                            rank === 1
                              ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/30'
                              : rank === 2
                              ? 'bg-slate-300 text-slate-950 shadow-md'
                              : rank === 3
                              ? 'bg-amber-700 text-white shadow-md'
                              : 'bg-slate-900 text-slate-400 border border-slate-800'
                          }`}
                        >
                          {rank}
                        </div>
                      </td>
                      <td className="p-3.5">
                        <div className="font-bold text-white text-sm flex items-center gap-1.5">
                          {item.submission.title}
                          {rank === 1 && <Trophy className="w-3.5 h-3.5 text-amber-400" />}
                        </div>
                        <div className="text-purple-400 text-[11px] font-semibold">
                          {item.submission.teamName}
                        </div>
                      </td>
                      <td className="p-3.5 text-slate-400">
                        <span className="font-mono text-amber-400 font-bold">[{item.submission.problemId}]</span>
                        <div className="text-[10px] text-slate-500">{item.submission.track}</div>
                      </td>
                      <td className="p-3.5 font-mono text-slate-300">{item.innovation}</td>
                      <td className="p-3.5 font-mono text-slate-300">{item.technical}</td>
                      <td className="p-3.5 font-mono text-slate-300">{item.ux}</td>
                      <td className="p-3.5 text-right font-mono">
                        <span
                          className={`text-base font-extrabold ${
                            isTop3 ? 'text-amber-300' : 'text-emerald-400'
                          }`}
                        >
                          {item.total}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
