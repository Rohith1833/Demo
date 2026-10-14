import React, { useEffect, useRef } from 'react';
import { useHackathon } from '../../context/HackathonContext';
import confetti from 'canvas-confetti';
import {
  Trophy,
  Award,
  ExternalLink,
  Users,
  Lock,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react';
import { GithubIcon } from '../../components/ui/Icons';

export const ResultsPage: React.FC = () => {
  const { winners, submissions, settings, navigate } = useHackathon();
  const hasFiredConfetti = useRef(false);

  // Trigger celebration confetti ONLY once when results are published
  useEffect(() => {
    if (settings.isResultsPublished && !hasFiredConfetti.current) {
      hasFiredConfetti.current = true;
      try {
        confetti({
          particleCount: 75,
          spread: 60,
          origin: { y: 0.6 },
          colors: ['#2563eb', '#10b981', '#f59e0b', '#fafafa'],
        });
      } catch (err) {
        // fallback
      }
    }
  }, [settings.isResultsPublished]);

  // If results haven't been published yet
  if (!settings.isResultsPublished) {
    return (
      <div className="max-w-2xl mx-auto py-20 px-4 text-center space-y-4">
        <div className="w-12 h-12 rounded-lg bg-[#111113] border border-[#27272a] flex items-center justify-center mx-auto text-[#71717a]">
          <Lock className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-xl font-semibold text-[#fafafa] tracking-tight">
            Results Haven't Been Published Yet
          </h1>
          <p className="text-xs text-[#a1a1aa] mt-1.5 leading-relaxed max-w-md mx-auto">
            The faculty and industry jury panels are actively scoring final project submissions. Official leaderboard rankings and winner podium awards will be announced at the valedictory ceremony.
          </p>
        </div>

        <div className="pt-4 flex items-center justify-center gap-3">
          <button
            onClick={() => navigate('/')}
            className="px-3.5 py-1.5 rounded-md bg-[#18181b] border border-[#27272a] text-xs font-medium text-[#fafafa] hover:bg-[#27272a] transition-colors"
          >
            Back to Overview
          </button>
          <button
            onClick={() => navigate('/problems')}
            className="px-3.5 py-1.5 rounded-md bg-[#2563eb] text-xs font-medium text-white hover:bg-blue-600 transition-colors"
          >
            Browse Problem Statements
          </button>
        </div>

        <p className="text-[11px] font-mono text-[#52525b] pt-6">
          Organizer note: You can publish results from the Leaderboard page or the top demo switcher bar.
        </p>
      </div>
    );
  }

  const podium = winners.slice(0, 3);
  const specialAwards = winners.slice(3);

  return (
    <div className="space-y-12 py-8 max-w-7xl mx-auto px-4 sm:px-6">
      {/* Published Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#111113] border border-amber-500/30 text-amber-400 text-xs font-mono font-medium">
          <Trophy className="w-3.5 h-3.5" />
          <span>OFFICIAL RESULTS & AWARDS</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-[#fafafa] tracking-tight">
          NexHack 2026 Champions
        </h1>
        <p className="text-xs text-[#a1a1aa] max-w-xl mx-auto">
          Official results verified by the faculty coordination council and industry jury at XYZ Institute of Technology.
        </p>
      </div>

      {/* Podium Top 3 Cards */}
      <div className="space-y-4">
        <h2 className="text-sm font-mono uppercase tracking-wider text-[#71717a] text-center">
          Championship Podium
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {podium.map((win, idx) => {
            const isWinner = idx === 0;
            return (
              <div
                key={win.id || idx}
                className={`p-5 rounded-lg border flex flex-col justify-between transition-colors ${
                  isWinner
                    ? 'bg-[#151517] border-amber-500/40 md:-translate-y-1'
                    : 'bg-[#111113] border-[#27272a]'
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-[#18181b] border border-[#27272a] text-amber-400 font-medium">
                      {win.badge}
                    </span>
                    <span className="text-xs font-mono font-semibold text-emerald-400 bg-[#18181b] px-2 py-0.5 rounded border border-[#27272a]">
                      {win.score} / 100
                    </span>
                  </div>

                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[#71717a]">
                      {win.category}
                    </span>
                    <h3 className="text-lg font-bold text-[#fafafa] mt-0.5">{win.teamName}</h3>
                    <p className="text-xs font-medium text-[#3b82f6] mt-0.5">Project: {win.projectName}</p>
                  </div>

                  <p className="text-xs text-[#a1a1aa] leading-relaxed">{win.description}</p>
                </div>

                <div className="pt-4 mt-4 border-t border-[#18181b] flex items-center justify-between text-xs">
                  <span className="text-emerald-400 font-mono font-semibold">{win.prize}</span>
                  <span className="text-[11px] text-[#71717a] font-mono">{win.track}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Special Category Awards */}
      {specialAwards.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-sm font-mono uppercase tracking-wider text-[#71717a]">
            Track & Category Awards
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {specialAwards.map((award) => (
              <div
                key={award.id}
                className="bg-[#111113] border border-[#27272a] rounded-lg p-4 space-y-2"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-[#18181b] border border-[#27272a] text-[#a1a1aa]">
                    {award.category}
                  </span>
                  <span className="text-[11px] font-mono text-emerald-400">{award.score}/100</span>
                </div>
                <h3 className="text-xs font-bold text-[#fafafa]">{award.teamName}</h3>
                <p className="text-xs text-[#3b82f6]">Project: {award.projectName}</p>
                <p className="text-[11px] text-[#71717a] pt-1 border-t border-[#18181b]">
                  Award: {award.prize}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Public Project Showcase Gallery */}
      <div className="space-y-4">
        <h2 className="text-sm font-mono uppercase tracking-wider text-[#71717a]">
          Open Source Project Showcase
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {submissions.slice(0, 6).map((sub) => (
            <div
              key={sub.id}
              className="bg-[#111113] border border-[#27272a] rounded-lg p-4 space-y-3 flex flex-col justify-between hover:border-[#3f3f46] transition-colors"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-[#18181b] border border-[#27272a] text-[#a1a1aa]">
                    {sub.track}
                  </span>
                  <span className="text-[11px] font-mono text-[#71717a]">{sub.problemId}</span>
                </div>

                <h3 className="text-sm font-semibold text-[#fafafa]">{sub.title}</h3>
                <p className="text-xs text-[#a1a1aa] line-clamp-2">{sub.description}</p>

                <div className="flex flex-wrap gap-1 pt-1">
                  {sub.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-1.5 py-0.2 rounded bg-[#18181b] text-[10px] font-mono text-[#71717a]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-[#18181b] flex items-center justify-between text-xs font-mono text-[#3b82f6]">
                <a
                  href={sub.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1 hover:underline"
                >
                  <GithubIcon className="w-3.5 h-3.5" />
                  <span>GitHub</span>
                </a>
                <a
                  href={sub.demoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1 hover:underline"
                >
                  <span>Live Demo</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
