import React, { useState } from 'react';
import { useHackathon } from '../../context/HackathonContext';
import { ArrowLeft, Send, ExternalLink, Play, Presentation, Award, CheckCircle2, UserCheck } from 'lucide-react';
import { GithubIcon } from '../../components/ui/Icons';

export const SubmissionDetailPage: React.FC<{ submissionId: string }> = ({ submissionId }) => {
  const { submissions, judges, evaluations, navigate, showToast } = useHackathon();

  const submission = submissions.find((s) => s.id === submissionId) || submissions[0];
  const assignedEvaluations = evaluations.filter((e) => e.submissionId === submission.id);

  const [selectedJudgeId, setSelectedJudgeId] = useState(judges[0]?.id || '');

  const handleAssignJudge = (e: React.FormEvent) => {
    e.preventDefault();
    const judge = judges.find((j) => j.id === selectedJudgeId);
    showToast('success', `Assigned ${judge?.name || 'Judge'} to evaluate "${submission.title}".`, 'Judge Assigned');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <button
          onClick={() => navigate('/admin/submissions')}
          className="inline-flex items-center gap-1.5 text-xs text-[#a1a1aa] hover:text-[#fafafa] mb-2 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Submissions</span>
        </button>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-semibold text-[#fafafa] tracking-tight">{submission.title}</h1>
              <span className="text-xs font-mono px-2 py-0.5 rounded bg-[#18181b] border border-[#27272a] text-[#a1a1aa]">
                {submission.id}
              </span>
            </div>
            <p className="text-xs text-[#a1a1aa] mt-0.5">
              By <strong>{submission.teamName}</strong> • Problem: <strong>{submission.problemTitle}</strong> ({submission.problemId})
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded text-xs font-mono font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              SUBMITTED AT {new Date(submission.submittedAt).toLocaleTimeString()}
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Column: Project Overview & Tech Stack */}
        <div className="md:col-span-2 space-y-4">
          <div className="bg-[#111113] border border-[#27272a] rounded-lg p-5 space-y-3">
            <h2 className="text-xs font-mono font-medium text-[#71717a] uppercase tracking-wider pb-2 border-b border-[#27272a]">
              Solution Architecture & Description
            </h2>
            <p className="text-sm font-medium text-[#fafafa]">{submission.tagline}</p>
            <p className="text-xs text-[#a1a1aa] leading-relaxed whitespace-pre-line">
              {submission.description}
            </p>

            <div className="pt-2">
              <span className="text-[11px] font-mono text-[#71717a] block mb-1.5 uppercase">Tech Stack:</span>
              <div className="flex flex-wrap gap-1.5">
                {submission.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-0.5 rounded bg-[#18181b] border border-[#27272a] text-[11px] font-mono text-[#a1a1aa]"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Links & Artifacts */}
          <div className="bg-[#111113] border border-[#27272a] rounded-lg p-5 space-y-3">
            <h2 className="text-xs font-mono font-medium text-[#71717a] uppercase tracking-wider pb-2 border-b border-[#27272a]">
              Deliverable Repositories & Artifacts
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <a
                href={submission.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between p-3 rounded-md bg-[#18181b] border border-[#27272a] hover:border-[#3f3f46] text-[#fafafa] transition-colors"
              >
                <div className="flex items-center gap-2">
                  <GithubIcon className="w-4 h-4 text-[#fafafa]" />
                  <span>GitHub Repository</span>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-[#71717a]" />
              </a>

              <a
                href={submission.demoUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between p-3 rounded-md bg-[#18181b] border border-[#27272a] hover:border-[#3f3f46] text-[#fafafa] transition-colors"
              >
                <div className="flex items-center gap-2">
                  <ExternalLink className="w-4 h-4 text-[#3b82f6]" />
                  <span>Live Deployed Demo</span>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-[#71717a]" />
              </a>

              <a
                href={submission.videoUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between p-3 rounded-md bg-[#18181b] border border-[#27272a] hover:border-[#3f3f46] text-[#fafafa] transition-colors"
              >
                <div className="flex items-center gap-2">
                  <Play className="w-4 h-4 text-rose-400" />
                  <span>Video Walkthrough</span>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-[#71717a]" />
              </a>

              <a
                href={submission.presentationUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between p-3 rounded-md bg-[#18181b] border border-[#27272a] hover:border-[#3f3f46] text-[#fafafa] transition-colors"
              >
                <div className="flex items-center gap-2">
                  <Presentation className="w-4 h-4 text-amber-400" />
                  <span>Slide Deck (PDF)</span>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-[#71717a]" />
              </a>
            </div>
          </div>
        </div>

        {/* Right Column: Judge Assignment & Rubric Scores */}
        <div className="space-y-4">
          {/* Quick Assign Judges */}
          <div className="bg-[#111113] border border-[#27272a] rounded-lg p-5 space-y-3">
            <h2 className="text-xs font-mono font-medium text-[#71717a] uppercase tracking-wider pb-2 border-b border-[#27272a]">
              Assign Jury Evaluator
            </h2>

            <form onSubmit={handleAssignJudge} className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-[#a1a1aa] mb-1">Select Judge</label>
                <select
                  value={selectedJudgeId}
                  onChange={(e) => setSelectedJudgeId(e.target.value)}
                  className="w-full bg-[#18181b] border border-[#27272a] rounded-md px-2.5 py-1.5 text-xs text-[#fafafa] outline-none"
                >
                  {judges.map((j) => (
                    <option key={j.id} value={j.id}>
                      {j.name} ({j.track})
                    </option>
                  ))}
                </select>
              </div>

              <button
                type="submit"
                className="w-full py-1.5 px-3 rounded-md bg-[#2563eb] hover:bg-blue-600 text-white text-xs font-medium transition-colors"
              >
                Assign Judge to Project
              </button>
            </form>
          </div>

          {/* Existing Evaluations */}
          <div className="bg-[#111113] border border-[#27272a] rounded-lg p-5 space-y-3">
            <h2 className="text-xs font-mono font-medium text-[#71717a] uppercase tracking-wider pb-2 border-b border-[#27272a]">
              Evaluations ({assignedEvaluations.length} Completed)
            </h2>

            {assignedEvaluations.length === 0 ? (
              <p className="text-xs text-[#71717a] italic">
                Awaiting judge review. Scoring round opens at 09:00 AM.
              </p>
            ) : (
              <div className="space-y-2">
                {assignedEvaluations.map((ev) => (
                  <div key={ev.id} className="p-3 rounded-md bg-[#18181b] border border-[#27272a] space-y-1 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-[#fafafa]">{ev.judgeName}</span>
                      <span className="font-mono font-semibold text-emerald-400">
                        {ev.scores.total} / 100
                      </span>
                    </div>
                    <p className="text-[11px] text-[#71717a] italic">"{ev.comments}"</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
