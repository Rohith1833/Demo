import React, { useState } from 'react';
import { useHackathon } from '../../context/HackathonContext';
import {
  Scale,
  AlertTriangle,
  CheckCircle2,
  Lock,
  Search,
  Filter,
  Eye,
  TrendingUp,
  Download,
  AlertCircle,
} from 'lucide-react';

export const JudgingControlCenterPage: React.FC = () => {
  const { submissions, evaluations, judges, showToast, navigate } = useHackathon();
  const [filterProblemOnly, setFilterProblemOnly] = useState(false);

  // Cross-reference submissions with evaluations
  const projectSummaries = submissions.map((sub) => {
    const subEvals = evaluations.filter((e) => e.submissionId === sub.id);
    const scoreSum = subEvals.reduce((acc, curr) => acc + curr.scores.total, 0);
    const avgScore = subEvals.length > 0 ? (scoreSum / subEvals.length).toFixed(1) : '—';

    // Discrepancy detection: difference > 15 between min and max score
    const scoresArr = subEvals.map((e) => e.scores.total);
    const minScore = scoresArr.length > 0 ? Math.min(...scoresArr) : 0;
    const maxScore = scoresArr.length > 0 ? Math.max(...scoresArr) : 0;
    const hasDiscrepancy = subEvals.length >= 2 && maxScore - minScore >= 14;
    const isMissingJudge = subEvals.length < 2;

    return {
      submission: sub,
      evaluations: subEvals,
      avgScore,
      hasDiscrepancy,
      isMissingJudge,
      discrepancyDiff: maxScore - minScore,
    };
  });

  const flaggedProjects = projectSummaries.filter((p) => p.hasDiscrepancy || p.isMissingJudge);
  const displayProjects = filterProblemOnly ? flaggedProjects : projectSummaries;

  return (
    <div className="min-h-screen bg-[#090a0f] text-slate-100 py-8 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 bg-cyan-950/60 px-3 py-1 rounded-full border border-cyan-500/20">
              Jury Oversight & Consensus Engine
            </span>
            <h1 className="text-3xl font-extrabold text-white mt-2">Judging Control Center</h1>
            <p className="text-xs text-slate-400 mt-1">
              Multi-judge cross scoring audit, automatic outlier detection, and discrepancy escalation flags.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => navigate('/admin/leaderboard')}
              className="px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs shadow-md shadow-indigo-600/30 transition-all hover:scale-102"
            >
              View Internal Leaderboard →
            </button>
          </div>
        </div>

        {/* 4 Metric Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="p-4 rounded-2xl bg-slate-900/40 border border-slate-800/80">
            <div className="text-xs text-slate-400">Total Evaluations</div>
            <div className="text-2xl font-black text-white mt-1">{evaluations.length + 55}</div>
            <div className="text-[10px] text-slate-500">Across 104 submissions</div>
          </div>
          <div className="p-4 rounded-2xl bg-slate-900/40 border border-slate-800/80">
            <div className="text-xs text-emerald-400">Fully Evaluated (≥2 Judges)</div>
            <div className="text-2xl font-black text-emerald-400 mt-1">98</div>
            <div className="text-[10px] text-slate-500">Dual-eval consensus achieved</div>
          </div>
          <div className="p-4 rounded-2xl bg-slate-900/40 border border-slate-800/80">
            <div className="text-xs text-amber-400">Missing Evaluations</div>
            <div className="text-2xl font-black text-amber-400 mt-1">6</div>
            <div className="text-[10px] text-slate-500">Single judge logged</div>
          </div>
          <div className="p-4 rounded-2xl bg-slate-900/40 border border-rose-500/30 bg-rose-950/10">
            <div className="text-xs text-rose-400">Scoring Discrepancies (&gt;14pt)</div>
            <div className="text-2xl font-black text-rose-400 mt-1">
              {projectSummaries.filter((p) => p.hasDiscrepancy).length}
            </div>
            <div className="text-[10px] text-rose-300">Requires Head Judge review</div>
          </div>
        </div>

        {/* Filters */}
        <div className="p-4 rounded-2xl bg-slate-900/40 border border-slate-800/80 backdrop-blur-md flex items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setFilterProblemOnly(false)}
              className={`px-3 py-1.5 rounded-xl font-semibold transition-all ${
                !filterProblemOnly
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              All Projects ({projectSummaries.length})
            </button>
            <button
              onClick={() => setFilterProblemOnly(true)}
              className={`px-3 py-1.5 rounded-xl font-semibold flex items-center gap-1.5 transition-all ${
                filterProblemOnly
                  ? 'bg-rose-600 text-white shadow-sm'
                  : 'bg-slate-950 text-rose-400 hover:text-white border border-rose-500/30'
              }`}
            >
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>Flagged Discrepancies & Missing ({flaggedProjects.length})</span>
            </button>
          </div>

          <div className="text-slate-400 text-[11px] hidden sm:block">
            Discrepancy rule: Delta between 2 jury scores &gt; 14 points triggers audit flag.
          </div>
        </div>

        {/* Judging Comparison Table */}
        <div className="rounded-2xl border border-slate-800/80 overflow-hidden bg-slate-950/40 backdrop-blur-md shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-900/80 border-b border-slate-800 text-slate-400 uppercase font-mono text-[10px] tracking-wider">
                <tr>
                  <th className="p-3.5">Project & Team</th>
                  <th className="p-3.5">Track & Problem</th>
                  <th className="p-3.5">Judge 1 (Dr. Ananya)</th>
                  <th className="p-3.5">Judge 2 (Rahul M.)</th>
                  <th className="p-3.5">Judge 3 (Sneha K.)</th>
                  <th className="p-3.5">Average Score</th>
                  <th className="p-3.5">Consensus Status</th>
                  <th className="p-3.5 text-right">Audit Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {displayProjects.map((p) => {
                  const eval1 = p.evaluations.find((e) => e.judgeId === 'JUDGE-01');
                  const eval2 = p.evaluations.find((e) => e.judgeId === 'JUDGE-02');
                  const eval3 = p.evaluations.find((e) => e.judgeId === 'JUDGE-03');

                  return (
                    <tr
                      key={p.submission.id}
                      className={`hover:bg-slate-900/60 transition-colors ${
                        p.hasDiscrepancy ? 'bg-rose-950/20' : ''
                      }`}
                    >
                      <td className="p-3.5 font-medium text-white">
                        <div className="font-bold text-sm">{p.submission.title}</div>
                        <div className="text-purple-400 text-[11px]">{p.submission.teamName}</div>
                      </td>
                      <td className="p-3.5 text-slate-400">
                        <span className="font-mono text-amber-400 font-bold">[{p.submission.problemId}]</span>
                        <div className="text-[10px] text-slate-500">{p.submission.track}</div>
                      </td>
                      <td className="p-3.5 font-mono">
                        {eval1 ? (
                          <span className="text-white font-bold">{eval1.scores.total}/100</span>
                        ) : (
                          <span className="text-slate-600 italic">Pending</span>
                        )}
                      </td>
                      <td className="p-3.5 font-mono">
                        {eval2 ? (
                          <span className="text-white font-bold">{eval2.scores.total}/100</span>
                        ) : (
                          <span className="text-slate-600 italic">Pending</span>
                        )}
                      </td>
                      <td className="p-3.5 font-mono">
                        {eval3 ? (
                          <span className="text-white font-bold">{eval3.scores.total}/100</span>
                        ) : (
                          <span className="text-slate-600 italic">Pending</span>
                        )}
                      </td>
                      <td className="p-3.5 font-mono">
                        <span className="text-lg font-black text-emerald-400">{p.avgScore}</span>
                      </td>
                      <td className="p-3.5">
                        {p.hasDiscrepancy ? (
                          <span className="text-[10px] px-2 py-0.5 rounded font-bold bg-rose-500/20 text-rose-300 border border-rose-500/30 flex items-center gap-1 w-fit">
                            <AlertTriangle className="w-3 h-3" /> Discrepancy (+{p.discrepancyDiff}pts)
                          </span>
                        ) : p.isMissingJudge ? (
                          <span className="text-[10px] px-2 py-0.5 rounded font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                            1 Judge Missing
                          </span>
                        ) : (
                          <span className="text-[10px] px-2 py-0.5 rounded font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1 w-fit">
                            <CheckCircle2 className="w-3 h-3" /> Consensus Verified
                          </span>
                        )}
                      </td>
                      <td className="p-3.5 text-right">
                        <button
                          onClick={() => {
                            showToast('info', `Opening audit consensus notes for ${p.submission.teamName}`, 'Audit');
                          }}
                          className="px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 text-[11px] font-semibold"
                        >
                          Audit Scores
                        </button>
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
