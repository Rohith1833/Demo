import React from 'react';
import { useHackathon } from '../../context/HackathonContext';
import {
  Award,
  CheckCircle2,
  Clock,
  ExternalLink,
  ArrowRight,
  FileCode,
} from 'lucide-react';
import { GithubIcon } from '../../components/ui/Icons';

export const JudgeDashboard: React.FC = () => {
  const { currentJudge, submissions, evaluations, navigate } = useHackathon();

  // Assigned submissions
  const assignedSubs = submissions.filter(
    (s) => currentJudge.assignedProjectIds?.includes(s.id) || ['SUB-01', 'SUB-02', 'SUB-03', 'SUB-04', 'SUB-05', 'SUB-06'].includes(s.id)
  );

  const evaluatedIds = evaluations
    .filter((e) => e.judgeId === currentJudge.id)
    .map((e) => e.submissionId);

  const completedCount = assignedSubs.filter((s) => evaluatedIds.includes(s.id)).length;
  const remainingCount = Math.max(0, 12 - completedCount);

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Welcome Banner */}
      <div className="bg-[#111113] border border-[#27272a] rounded-lg p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <span className="text-[10px] font-mono uppercase tracking-wider text-[#71717a]">
            Jury Evaluation Console • {currentJudge.track}
          </span>
          <h1 className="text-xl font-semibold text-[#fafafa] tracking-tight mt-0.5">
            Welcome, {currentJudge.name}
          </h1>
          <p className="text-xs text-[#a1a1aa] mt-0.5">
            {currentJudge.designation} • {currentJudge.organization}
          </p>
        </div>

        <div className="flex items-center gap-4 text-xs font-mono">
          <div className="text-right">
            <span className="text-[10px] text-[#71717a] block uppercase">Evaluations</span>
            <span className="text-base font-semibold text-emerald-400">
              {completedCount} / 12 Complete
            </span>
          </div>
        </div>
      </div>

      {/* 3 Workload Summary Tiles */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-[#111113] border border-[#27272a] rounded-lg p-3.5 space-y-1 text-center">
          <p className="text-[11px] font-mono uppercase text-[#71717a]">Assigned Projects</p>
          <p className="text-2xl font-semibold text-[#fafafa] font-mono">12</p>
          <span className="text-[10px] text-[#71717a]">In your track</span>
        </div>

        <div className="bg-[#111113] border border-[#27272a] rounded-lg p-3.5 space-y-1 text-center">
          <p className="text-[11px] font-mono uppercase text-[#71717a]">Evaluated</p>
          <p className="text-2xl font-semibold text-emerald-400 font-mono">{completedCount}</p>
          <span className="text-[10px] text-emerald-400/80">Submitted scores</span>
        </div>

        <div className="bg-[#111113] border border-[#27272a] rounded-lg p-3.5 space-y-1 text-center">
          <p className="text-[11px] font-mono uppercase text-[#71717a]">Remaining</p>
          <p className="text-2xl font-semibold text-amber-400 font-mono">{remainingCount}</p>
          <span className="text-[10px] text-amber-400/80">Pending review</span>
        </div>
      </div>

      {/* Assigned Projects List */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold text-[#fafafa]">Assigned Projects Queue</h2>
          <span className="text-xs text-[#71717a] font-mono">100-Point Standard Rubric</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {assignedSubs.map((sub) => {
            const myEvaluation = evaluations.find(
              (e) => e.submissionId === sub.id && e.judgeId === currentJudge.id
            );
            const isDone = !!myEvaluation;

            return (
              <div
                key={sub.id}
                className={`p-4 rounded-lg border space-y-3 transition-colors ${
                  isDone
                    ? 'bg-[#111113] border-[#27272a]'
                    : 'bg-[#151517] border-[#3b82f6]/40 hover:border-[#3b82f6]'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold text-[#fafafa]">{sub.title}</span>
                      <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-[#18181b] border border-[#27272a] text-[#a1a1aa]">
                        {sub.track}
                      </span>
                    </div>
                    <p className="text-xs text-[#3b82f6] font-medium mt-0.5">{sub.teamName}</p>
                  </div>

                  {isDone ? (
                    <span className="inline-flex items-center gap-1 text-[11px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                      <CheckCircle2 className="w-3 h-3" /> {myEvaluation.scores.total}/100
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-[11px] font-mono text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                      <Clock className="w-3 h-3" /> Pending
                    </span>
                  )}
                </div>

                <p className="text-xs text-[#a1a1aa] line-clamp-2 leading-relaxed">
                  {sub.description}
                </p>

                <div className="text-[11px] text-[#71717a] font-mono">
                  Problem: {sub.problemTitle} ({sub.problemId})
                </div>

                {/* Footer with Links & Action Button */}
                <div className="pt-2 border-t border-[#18181b] flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-mono text-[#71717a]">
                    <a
                      href={sub.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="hover:text-[#fafafa] flex items-center gap-1"
                    >
                      <GithubIcon className="w-3 h-3" />
                      <span>Code</span>
                    </a>
                    <span>•</span>
                    <a
                      href={sub.demoUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="hover:text-[#3b82f6] flex items-center gap-1"
                    >
                      <span>Demo</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>

                  <button
                    onClick={() => navigate(`/judge/project/${sub.id}`)}
                    className={`inline-flex items-center gap-1 px-3 py-1 rounded-md text-xs font-medium transition-colors ${
                      isDone
                        ? 'bg-[#18181b] border border-[#27272a] text-[#a1a1aa] hover:text-[#fafafa]'
                        : 'bg-[#2563eb] hover:bg-blue-600 text-white shadow-sm'
                    }`}
                  >
                    <span>{isDone ? 'Edit Score' : 'Evaluate Project'}</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
