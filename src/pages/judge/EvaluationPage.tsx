import React, { useState } from 'react';
import { useHackathon } from '../../context/HackathonContext';
import {
  Award,
  CheckCircle2,
  ArrowLeft,
  ExternalLink,
  Save,
  Send,
  X,
  Play,
  Presentation,
  ChevronRight,
} from 'lucide-react';
import { GithubIcon } from '../../components/ui/Icons';

interface EvaluationPageProps {
  projectId?: string;
}

export const EvaluationPage: React.FC<EvaluationPageProps> = ({ projectId = 'SUB-01' }) => {
  const { submissions, currentJudge, evaluations, submitJudgeEvaluation, navigate, showToast } =
    useHackathon();

  const currentSub = submissions.find((s) => s.id === projectId) || submissions[0];

  const existingEval = evaluations.find(
    (e) => e.submissionId === currentSub.id && e.judgeId === currentJudge.id
  );

  // Rubric state (Total /100)
  const [innovation, setInnovation] = useState(existingEval?.scores.innovation ?? 19.5);
  const [technical, setTechnical] = useState(existingEval?.scores.technical ?? 24.5);
  const [relevance, setRelevance] = useState(existingEval?.scores.relevance ?? 19.5);
  const [ux, setUx] = useState(existingEval?.scores.ux ?? 14.5);
  const [scalability, setScalability] = useState(existingEval?.scores.scalability ?? 9.5);
  const [presentation, setPresentation] = useState(existingEval?.scores.presentation ?? 9.5);

  const [comments, setComments] = useState(
    existingEval?.comments ??
      'Exceptional on-device vision implementation. The accessibility voice prompts functioned with zero lag during the live pitch.'
  );

  const [submittedModal, setSubmittedModal] = useState(false);

  const totalScore = Number(
    (innovation + technical + relevance + ux + scalability + presentation).toFixed(1)
  );

  // Find next project to evaluate
  const otherAssignedSubs = submissions.filter(
    (s) => s.id !== currentSub.id && (currentJudge.assignedProjectIds?.includes(s.id) || true)
  );
  const nextProject = otherAssignedSubs.find(
    (s) => !evaluations.some((e) => e.submissionId === s.id && e.judgeId === currentJudge.id)
  ) || otherAssignedSubs[0];

  const remainingCount = Math.max(
    0,
    12 - evaluations.filter((e) => e.judgeId === currentJudge.id).length - 1
  );

  const handleSubmit = (isDraft: boolean = false) => {
    submitJudgeEvaluation({
      submissionId: currentSub.id,
      teamId: currentSub.teamId,
      scores: {
        innovation,
        technical,
        relevance,
        ux,
        scalability,
        presentation,
        total: totalScore,
      },
      comments,
      status: isDraft ? 'draft' : 'submitted',
    });

    if (!isDraft) {
      setSubmittedModal(true);
    }
  };

  const rubricCriteria = [
    {
      id: 'innovation',
      title: '1. Innovation & Novelty',
      max: 20,
      value: innovation,
      setter: setInnovation,
      desc: 'Uniqueness of approach, creative problem-solving, and non-trivial intellectual insight.',
    },
    {
      id: 'technical',
      title: '2. Technical Implementation & Architecture',
      max: 25,
      value: technical,
      setter: setTechnical,
      desc: 'Code quality, system complexity, latency optimization, and robust execution during live demo.',
    },
    {
      id: 'relevance',
      title: '3. Problem Relevance & Impact',
      max: 20,
      value: relevance,
      setter: setRelevance,
      desc: 'How directly the solution addresses the sponsor problem statement requirements and human impact.',
    },
    {
      id: 'ux',
      title: '4. User Experience & Ergonomics',
      max: 15,
      value: ux,
      setter: setUx,
      desc: 'Design cleanliness, accessibility compliance, cognitive ease, and user flow simplicity.',
    },
    {
      id: 'scalability',
      title: '5. Scalability & System Resilience',
      max: 10,
      value: scalability,
      setter: setScalability,
      desc: 'Data pipeline durability, offline error handling, and performance under peak concurrent usage.',
    },
    {
      id: 'presentation',
      title: '6. Live Pitch & Demonstration',
      max: 10,
      value: presentation,
      setter: setPresentation,
      desc: 'Clarity of presentation, team responses to jury queries, and verifiable live software demo.',
    },
  ];

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div>
        <button
          onClick={() => navigate('/judge')}
          className="inline-flex items-center gap-1.5 text-xs text-[#a1a1aa] hover:text-[#fafafa] mb-2 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Assigned Projects</span>
        </button>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-semibold text-[#fafafa] tracking-tight">{currentSub.title}</h1>
              <span className="text-xs font-mono px-2 py-0.5 rounded bg-[#18181b] border border-[#27272a] text-[#a1a1aa]">
                {currentSub.teamName}
              </span>
            </div>
            <p className="text-xs text-[#a1a1aa] mt-0.5">
              Problem: <strong>{currentSub.problemTitle}</strong> ({currentSub.problemId}) • Track: {currentSub.track}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-[#71717a] font-mono">Total Score:</span>
            <span className="px-3 py-1 rounded-md bg-[#18181b] border border-[#27272a] text-lg font-mono font-bold text-emerald-400">
              {totalScore} / 100
            </span>
          </div>
        </div>
      </div>

      {/* Deliverable Links Bar */}
      <div className="bg-[#111113] border border-[#27272a] rounded-lg p-3 flex flex-wrap items-center justify-between gap-3 text-xs">
        <span className="text-[11px] font-mono text-[#71717a] uppercase">Project Links:</span>
        <div className="flex flex-wrap items-center gap-3">
          <a
            href={currentSub.githubUrl}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 text-[#fafafa] hover:text-[#3b82f6] transition-colors"
          >
            <GithubIcon className="w-3.5 h-3.5" />
            <span>GitHub Repo</span>
          </a>
          <a
            href={currentSub.demoUrl}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 text-[#fafafa] hover:text-[#3b82f6] transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5 text-[#3b82f6]" />
            <span>Live Demo</span>
          </a>
          <a
            href={currentSub.videoUrl}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 text-[#fafafa] hover:text-[#3b82f6] transition-colors"
          >
            <Play className="w-3.5 h-3.5 text-rose-400" />
            <span>Video</span>
          </a>
          <a
            href={currentSub.presentationUrl}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 text-[#fafafa] hover:text-[#3b82f6] transition-colors"
          >
            <Presentation className="w-3.5 h-3.5 text-amber-400" />
            <span>Deck</span>
          </a>
        </div>
      </div>

      {/* Rubric Evaluation Form */}
      <div className="space-y-3">
        {rubricCriteria.map((c) => (
          <div
            key={c.id}
            className="bg-[#111113] border border-[#27272a] rounded-lg p-4 space-y-2.5"
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <div>
                <h3 className="text-xs font-semibold text-[#fafafa]">{c.title}</h3>
                <p className="text-[11px] text-[#71717a] mt-0.5">{c.desc}</p>
              </div>

              <div className="flex items-center gap-2 self-end sm:self-auto">
                <input
                  type="number"
                  min="0"
                  max={c.max}
                  step="0.5"
                  value={c.value}
                  onChange={(e) => c.setter(parseFloat(e.target.value) || 0)}
                  className="w-16 px-2 py-1 rounded bg-[#18181b] border border-[#27272a] text-xs font-mono font-semibold text-[#fafafa] text-center outline-none focus:border-[#3b82f6]"
                />
                <span className="text-[11px] font-mono text-[#71717a]">/ {c.max} pts</span>
              </div>
            </div>

            <input
              type="range"
              min="0"
              max={c.max}
              step="0.5"
              value={c.value}
              onChange={(e) => c.setter(parseFloat(e.target.value))}
              className="w-full accent-blue-600 cursor-pointer h-1.5 bg-[#18181b] rounded-lg"
            />
          </div>
        ))}

        {/* Qualitative Jury Notes */}
        <div className="bg-[#111113] border border-[#27272a] rounded-lg p-4 space-y-2">
          <h3 className="text-xs font-semibold text-[#fafafa]">Jury Qualitative Comments</h3>
          <p className="text-[11px] text-[#71717a]">
            Constructive feedback recorded in internal deliberation room records.
          </p>
          <textarea
            rows={3}
            value={comments}
            onChange={(e) => setComments(e.target.value)}
            className="w-full p-3 rounded-md bg-[#18181b] border border-[#27272a] text-xs text-[#fafafa] outline-none focus:border-[#3b82f6] resize-none leading-relaxed"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={() => handleSubmit(true)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[#18181b] hover:bg-[#27272a] border border-[#27272a] text-xs font-medium text-[#fafafa] transition-colors"
          >
            <Save className="w-3.5 h-3.5" />
            <span>Save Draft</span>
          </button>

          <button
            type="button"
            onClick={() => handleSubmit(false)}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-md bg-[#2563eb] hover:bg-blue-600 text-white text-xs font-medium transition-colors shadow-sm"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Submit Evaluation ({totalScore}/100)</span>
          </button>
        </div>
      </div>

      {/* Confirmation Modal: Evaluate Next Project (#40) */}
      {submittedModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
          <div className="bg-[#111113] border border-[#27272a] rounded-lg max-w-md w-full p-6 text-center space-y-4 shadow-xl">
            <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-6 h-6" />
            </div>

            <div>
              <h3 className="text-base font-semibold text-[#fafafa]">Evaluation Submitted</h3>
              <p className="text-xs text-[#a1a1aa] mt-1">
                Score for <strong>{currentSub.title}</strong> recorded: <span className="font-mono text-emerald-400 font-semibold">{totalScore}/100</span>.
              </p>
              <p className="text-[11px] font-mono text-[#71717a] mt-1">
                {remainingCount} Projects Remaining on your schedule.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-2 pt-2">
              <button
                onClick={() => navigate('/judge')}
                className="flex-1 py-2 px-3 rounded-md bg-[#18181b] hover:bg-[#27272a] border border-[#27272a] text-xs font-medium text-[#fafafa] transition-colors"
              >
                Back to Assigned List
              </button>

              {nextProject && (
                <button
                  onClick={() => {
                    setSubmittedModal(false);
                    navigate(`/judge/project/${nextProject.id}`);
                  }}
                  className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-md bg-[#2563eb] hover:bg-blue-600 text-white text-xs font-medium transition-colors shadow-sm"
                >
                  <span>Evaluate Next Project</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
