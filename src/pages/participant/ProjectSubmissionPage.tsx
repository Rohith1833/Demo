import React, { useState } from 'react';
import { useHackathon } from '../../context/HackathonContext';
import {
  UploadCloud,
  Globe,
  Video,
  Presentation,
  CheckCircle2,
  Lock,
  Unlock,
  AlertTriangle,
  Sparkles,
  ExternalLink,
  Layers,
} from 'lucide-react';
import { GithubIcon } from '../../components/ui/Icons';

export const ProjectSubmissionPage: React.FC = () => {
  const { currentTeam, submissions, submitProject, settings, navigate, showToast } = useHackathon();

  const existingSubmission = submissions.find((s) => s.teamId === currentTeam?.id);

  const [title, setTitle] = useState(
    existingSubmission?.title || 'CampusAI: Voice & Vision Spatial Assistant for Visually Impaired'
  );
  const [tagline, setTagline] = useState(
    existingSubmission?.tagline ||
      'Real-time on-device 3D indoor obstacle avoidance and voice navigation using WebXR and lightweight YOLOv8 models.'
  );
  const [description, setDescription] = useState(
    existingSubmission?.description ||
      'CampusAI empowers visually impaired students to independently traverse complex university multi-building corridors. Leveraging sensory camera feeds and browser-based WebNN acceleration, the app detects doorways, stairs, obstacles, and elevators with under 180ms latency.'
  );
  const [techStackInput, setTechStackInput] = useState(
    existingSubmission?.techStack.join(', ') || 'React, TypeScript, YOLOv8 Edge, WebXR, FastAPI, Tailwind CSS'
  );
  const [githubUrl, setGithubUrl] = useState(
    existingSubmission?.githubUrl || 'https://github.com/neural-ninjas/campus-ai'
  );
  const [demoUrl, setDemoUrl] = useState(existingSubmission?.demoUrl || 'https://campusai.demo.app');
  const [videoUrl, setVideoUrl] = useState(
    existingSubmission?.videoUrl || 'https://youtube.com/watch?v=dQw4w9WgXcQ'
  );
  const [presentationUrl, setPresentationUrl] = useState(
    existingSubmission?.presentationUrl || 'https://pitch.com/p/campus-ai-nexhack2026'
  );
  const [declaration, setDeclaration] = useState(existingSubmission?.declarationAccepted ?? true);

  const isLocked = settings.isSubmissionLocked;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!declaration) {
      showToast('error', 'Please accept the hackathon originality declaration before submitting.', 'Declaration Required');
      return;
    }

    const techStack = techStackInput
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    submitProject({
      title,
      tagline,
      description,
      techStack,
      githubUrl,
      demoUrl,
      videoUrl,
      presentationUrl,
      declarationAccepted: declaration,
    });
  };

  return (
    <div className="min-h-screen bg-[#090a0f] text-slate-100 py-10 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-mono uppercase tracking-wider text-emerald-400 bg-emerald-950/60 px-3 py-1 rounded-full border border-emerald-500/20">
              Deliverable Gateway
            </span>
            <h1 className="text-3xl font-extrabold text-white mt-2">Project Submission</h1>
            <p className="text-xs text-slate-400 mt-1">
              Team: <strong>{currentTeam?.name || 'Your Team'}</strong> • Problem:{' '}
              <strong className="text-amber-300 font-mono">[{currentTeam?.problemStatementId || 'PS-01'}]</strong>
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span
              className={`text-xs px-3 py-1.5 rounded-xl font-semibold border flex items-center gap-1.5 ${
                existingSubmission
                  ? 'bg-emerald-950/40 border-emerald-500/30 text-emerald-300'
                  : 'bg-amber-950/40 border-amber-500/30 text-amber-300'
              }`}
            >
              {existingSubmission ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Submitted (Editable before 08:00 AM)
                </>
              ) : (
                <>
                  <AlertTriangle className="w-4 h-4 text-amber-400" /> Submission Pending
                </>
              )}
            </span>
          </div>
        </div>

        {/* Lock Notice if locked */}
        {isLocked && (
          <div className="p-4 rounded-2xl bg-rose-950/40 border border-rose-500/40 text-xs text-rose-200 flex items-center gap-3">
            <Lock className="w-5 h-5 text-rose-400 shrink-0" />
            <div>
              <strong>Submissions are now LOCKED by the Organizing Committee.</strong>
              <div className="text-rose-300/80">Evaluation rounds have begun and changes cannot be made.</div>
            </div>
          </div>
        )}

        {/* Submission Form Card */}
        <form onSubmit={handleSubmit} className="p-6 sm:p-8 rounded-3xl bg-slate-900/40 border border-slate-800/80 backdrop-blur-xl shadow-2xl space-y-6">
          {/* Project Title & Tagline */}
          <div className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1.5">Project Title *</label>
              <input
                type="text"
                disabled={isLocked}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. CampusAI"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-indigo-500 disabled:opacity-50"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1.5">Short Tagline / One-Liner *</label>
              <input
                type="text"
                disabled={isLocked}
                value={tagline}
                onChange={(e) => setTagline(e.target.value)}
                placeholder="One sentence describing what your project accomplishes."
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-indigo-500 disabled:opacity-50"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1.5">Detailed Description *</label>
              <textarea
                rows={4}
                disabled={isLocked}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Explain the problem solved, system architecture, challenges overcome, and innovation points."
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-indigo-500 leading-relaxed disabled:opacity-50"
              />
            </div>
          </div>

          {/* Links Section */}
          <div className="pt-4 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
                <GithubIcon className="w-4 h-4 text-slate-400" /> GitHub Repository URL *
              </label>
              <input
                type="url"
                disabled={isLocked}
                value={githubUrl}
                onChange={(e) => setGithubUrl(e.target.value)}
                placeholder="https://github.com/team/repo"
                className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white font-mono focus:outline-none focus:border-indigo-500 disabled:opacity-50"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
                <Globe className="w-4 h-4 text-emerald-400" /> Live Demo URL *
              </label>
              <input
                type="url"
                disabled={isLocked}
                value={demoUrl}
                onChange={(e) => setDemoUrl(e.target.value)}
                placeholder="https://demo.app"
                className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white font-mono focus:outline-none focus:border-indigo-500 disabled:opacity-50"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
                <Video className="w-4 h-4 text-rose-400" /> Demo Video URL (YouTube / Loom)
              </label>
              <input
                type="url"
                disabled={isLocked}
                value={videoUrl}
                onChange={(e) => setVideoUrl(e.target.value)}
                placeholder="https://youtube.com/watch?v=..."
                className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white font-mono focus:outline-none focus:border-indigo-500 disabled:opacity-50"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
                <Presentation className="w-4 h-4 text-purple-400" /> Pitch Deck / Presentation URL
              </label>
              <input
                type="url"
                disabled={isLocked}
                value={presentationUrl}
                onChange={(e) => setPresentationUrl(e.target.value)}
                placeholder="https://pitch.com/deck"
                className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white font-mono focus:outline-none focus:border-indigo-500 disabled:opacity-50"
              />
            </div>
          </div>

          {/* Tech Stack */}
          <div className="pt-4 border-t border-slate-800/80">
            <label className="text-xs font-semibold text-slate-300 block mb-1.5">
              Tech Stack (Comma-separated)
            </label>
            <input
              type="text"
              disabled={isLocked}
              value={techStackInput}
              onChange={(e) => setTechStackInput(e.target.value)}
              placeholder="e.g. React, TypeScript, FastAPI, OpenCV, Docker"
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-indigo-500 disabled:opacity-50"
            />
          </div>

          {/* Screenshots Placeholders */}
          <div className="pt-4 border-t border-slate-800/80">
            <label className="text-xs font-semibold text-slate-300 block mb-2">Project Screenshots</label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <div className="border border-slate-800 bg-slate-950 p-4 rounded-xl text-center flex flex-col items-center justify-center">
                <UploadCloud className="w-6 h-6 text-slate-500 mb-1" />
                <span className="text-[10px] text-slate-400">dashboard_preview.png</span>
              </div>
              <div className="border border-slate-800 bg-slate-950 p-4 rounded-xl text-center flex flex-col items-center justify-center">
                <UploadCloud className="w-6 h-6 text-slate-500 mb-1" />
                <span className="text-[10px] text-slate-400">cv_inference_demo.png</span>
              </div>
              <div className="border-2 border-dashed border-slate-800 hover:border-indigo-500 p-4 rounded-xl text-center flex flex-col items-center justify-center cursor-pointer transition-colors">
                <span className="text-xs text-indigo-400 font-semibold">+ Add Screenshot</span>
              </div>
            </div>
          </div>

          {/* Declaration Checkbox */}
          <div className="pt-4 border-t border-slate-800/80">
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                disabled={isLocked}
                checked={declaration}
                onChange={(e) => setDeclaration(e.target.checked)}
                className="mt-1 rounded bg-slate-950 border-slate-800 text-indigo-600 focus:ring-indigo-500"
              />
              <span className="text-xs text-slate-300 leading-relaxed">
                <strong>Honesty Declaration:</strong> "We confirm this project was developed during the 24 hours of
                NexHack 2026. All external libraries, open-source models, or datasets have been properly cited and
                acknowledged."
              </span>
            </label>
          </div>

          {/* Submit Button */}
          <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
            <div className="text-xs text-slate-500">
              Auto-saves to offline storage on each keystroke
            </div>

            <button
              type="submit"
              disabled={isLocked}
              className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-lg shadow-emerald-600/30 flex items-center gap-2 transition-all hover:scale-102 disabled:opacity-40"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>{existingSubmission ? 'Update Submission' : 'Submit Final Project'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
