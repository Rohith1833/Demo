import React, { useState } from 'react';
import { useHackathon } from '../../context/HackathonContext';
import {
  User,
  GraduationCap,
  Code2,
  FileText,
  UploadCloud,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  ExternalLink,
  Globe,
  Trash2,
} from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '../../components/ui/Icons';

export const RegistrationWizard: React.FC = () => {
  const { registerParticipant, navigate } = useHackathon();

  const [step, setStep] = useState(1);
  const [submittedAppId, setSubmittedAppId] = useState<string | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    // Step 1: Account
    name: 'Rohit Kulkarni',
    email: 'rohit.kulkarni@college.edu',
    phone: '+91 98450 12345',

    // Step 2: Academic
    college: 'RV College of Engineering',
    usn: '1RV23CS105',
    degree: 'B.E. Computer Science & Engineering',
    department: 'Computer Science',
    year: '3rd Year',
    gradYear: '2027',

    // Step 3: Developer Profile
    github: 'https://github.com/rohit-dev',
    linkedin: 'https://linkedin.com/in/rohit-kulkarni',
    portfolio: 'https://rohitkulkarni.dev',
    skills: ['React', 'Python', 'Machine Learning', 'Node.js', 'UI/UX'] as string[],

    // Step 4: Experience
    previousHackathons: 2,
    projectsSummary:
      'Developed an IoT based automated indoor hydro-farming monitor with MQTT streaming and mobile dashboard. Also built a full-stack campus event ticketing portal.',
    motivation:
      'Passionate about building real-world high-performance software. Want to team up with top developers to solve hard problems in 24 hours.',

    // Step 5: Resume
    resumeFileName: 'Rohit_Kulkarni_Resume_2026.pdf',
    resumeFileSize: '1.4 MB',
  });

  const availableSkills = [
    'React',
    'Python',
    'Java',
    'Machine Learning',
    'AI',
    'UI/UX',
    'Flutter',
    'Node.js',
    'Cybersecurity',
    'Blockchain',
    'Cloud / AWS',
    'FastAPI',
    'Rust',
    'Go',
    'Docker',
    'TypeScript',
  ];

  const toggleSkill = (skill: string) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.includes(skill)
        ? prev.skills.filter((s) => s !== skill)
        : [...prev.skills, skill],
    }));
  };

  const handleNext = () => {
    if (step < 6) setStep(step + 1);
  };

  const handlePrev = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newId = registerParticipant(formData);
    setSubmittedAppId(newId);
  };

  const stepsList = [
    { num: 1, title: 'Account', icon: <User className="w-4 h-4" /> },
    { num: 2, title: 'Academics', icon: <GraduationCap className="w-4 h-4" /> },
    { num: 3, title: 'Dev Profile', icon: <Code2 className="w-4 h-4" /> },
    { num: 4, title: 'Experience', icon: <FileText className="w-4 h-4" /> },
    { num: 5, title: 'Resume', icon: <UploadCloud className="w-4 h-4" /> },
    { num: 6, title: 'Review', icon: <CheckCircle2 className="w-4 h-4" /> },
  ];

  return (
    <div className="min-h-screen bg-[#090a0f] py-12 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <span className="text-xs font-mono uppercase tracking-wider text-indigo-400 bg-indigo-950/60 px-3 py-1 rounded-full border border-indigo-500/20">
            Participant Screening Application
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white mt-3">Register for NexHack 2026</h1>
          <p className="text-xs text-slate-400 mt-1.5">
            Step {step} of 6 — Complete your profile to enter technical screening
          </p>
        </div>

        {/* Stepper Progress Bar */}
        <div className="mb-8 p-3 rounded-2xl bg-slate-900/60 border border-slate-800">
          <div className="flex items-center justify-between">
            {stepsList.map((s) => {
              const isActive = step === s.num;
              const isDone = step > s.num;
              return (
                <button
                  key={s.num}
                  onClick={() => s.num < step && setStep(s.num)}
                  disabled={s.num > step}
                  className={`flex items-center gap-2 px-2 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    isActive
                      ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                      : isDone
                      ? 'text-emerald-400 hover:bg-slate-800'
                      : 'text-slate-500 opacity-60'
                  }`}
                >
                  <span className="shrink-0">{s.icon}</span>
                  <span className="hidden md:inline">{s.title}</span>
                </button>
              );
            })}
          </div>
          {/* Progress bar line */}
          <div className="w-full bg-slate-800 h-1.5 rounded-full mt-3 overflow-hidden">
            <div
              className="bg-indigo-500 h-full transition-all duration-300"
              style={{ width: `${(step / 6) * 100}%` }}
            />
          </div>
        </div>

        {/* Form Card */}
        <div className="p-6 sm:p-8 rounded-2xl bg-slate-900/40 border border-slate-800/80 backdrop-blur-xl shadow-2xl">
          {/* STEP 1: Account */}
          {step === 1 && (
            <div className="space-y-5 animate-in fade-in">
              <div className="border-b border-slate-800 pb-3 mb-4">
                <h3 className="text-lg font-semibold text-white">Step 1 — Personal & Account Info</h3>
                <p className="text-xs text-slate-400">Enter your official name and contact credentials.</p>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">Full Name *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Arjun Kumar"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">Email Address *</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="student@college.edu"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">Phone Number *</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91 98000 00000"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: Academic */}
          {step === 2 && (
            <div className="space-y-5 animate-in fade-in">
              <div className="border-b border-slate-800 pb-3 mb-4">
                <h3 className="text-lg font-semibold text-white">Step 2 — Academic Credentials</h3>
                <p className="text-xs text-slate-400">Details about your current college, branch, and student ID.</p>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">College / Institution Name *</label>
                <input
                  type="text"
                  value={formData.college}
                  onChange={(e) => setFormData({ ...formData, college: e.target.value })}
                  placeholder="e.g. RV College of Engineering"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">USN / Student ID *</label>
                  <input
                    type="text"
                    value={formData.usn}
                    onChange={(e) => setFormData({ ...formData, usn: e.target.value })}
                    placeholder="e.g. 1RV23CS042"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-indigo-500 uppercase"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">Degree *</label>
                  <input
                    type="text"
                    value={formData.degree}
                    onChange={(e) => setFormData({ ...formData, degree: e.target.value })}
                    placeholder="B.E. Computer Science"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">Department</label>
                  <input
                    type="text"
                    value={formData.department}
                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">Current Year</label>
                  <select
                    value={formData.year}
                    onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-indigo-500"
                  >
                    <option value="1st Year">1st Year</option>
                    <option value="2nd Year">2nd Year</option>
                    <option value="3rd Year">3rd Year</option>
                    <option value="4th Year">4th Year</option>
                    <option value="Postgraduate">Postgraduate</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">Graduation Year</label>
                  <select
                    value={formData.gradYear}
                    onChange={(e) => setFormData({ ...formData, gradYear: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-indigo-500"
                  >
                    <option value="2026">2026</option>
                    <option value="2027">2027</option>
                    <option value="2028">2028</option>
                    <option value="2029">2029</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: Developer Profile */}
          {step === 3 && (
            <div className="space-y-5 animate-in fade-in">
              <div className="border-b border-slate-800 pb-3 mb-4">
                <h3 className="text-lg font-semibold text-white">Step 3 — Developer Profile & Skills</h3>
                <p className="text-xs text-slate-400">Share your GitHub, LinkedIn, and core technical skills.</p>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5 flex items-center gap-1.5">
                  <GithubIcon className="w-4 h-4 text-slate-400" /> GitHub Profile URL *
                </label>
                <input
                  type="url"
                  value={formData.github}
                  onChange={(e) => setFormData({ ...formData, github: e.target.value })}
                  placeholder="https://github.com/username"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-indigo-500 font-mono"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5 flex items-center gap-1.5">
                    <LinkedinIcon className="w-4 h-4 text-sky-400" /> LinkedIn URL
                  </label>
                  <input
                    type="url"
                    value={formData.linkedin}
                    onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
                    placeholder="https://linkedin.com/in/username"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-indigo-500 font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5 flex items-center gap-1.5">
                    <Globe className="w-4 h-4 text-emerald-400" /> Portfolio Website
                  </label>
                  <input
                    type="url"
                    value={formData.portfolio}
                    onChange={(e) => setFormData({ ...formData, portfolio: e.target.value })}
                    placeholder="https://mywebsite.dev"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-indigo-500 font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-2">
                  Select Your Skills ({formData.skills.length} selected)
                </label>
                <div className="flex flex-wrap gap-2">
                  {availableSkills.map((sk) => {
                    const isSelected = formData.skills.includes(sk);
                    return (
                      <button
                        type="button"
                        key={sk}
                        onClick={() => toggleSkill(sk)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                          isSelected
                            ? 'bg-indigo-600 text-white border border-indigo-400 shadow-sm'
                            : 'bg-slate-950 text-slate-400 border border-slate-800 hover:border-slate-700 hover:text-slate-200'
                        }`}
                      >
                        {sk}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: Experience */}
          {step === 4 && (
            <div className="space-y-5 animate-in fade-in">
              <div className="border-b border-slate-800 pb-3 mb-4">
                <h3 className="text-lg font-semibold text-white">Step 4 — Hackathons & Projects</h3>
                <p className="text-xs text-slate-400">Tell us what you've built and why you want to compete.</p>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">
                  Previous Hackathons Attended
                </label>
                <input
                  type="number"
                  min="0"
                  max="50"
                  value={formData.previousHackathons}
                  onChange={(e) =>
                    setFormData({ ...formData, previousHackathons: parseInt(e.target.value) || 0 })
                  }
                  className="w-32 px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-indigo-500 font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">
                  Key Projects Built *
                </label>
                <textarea
                  rows={3}
                  value={formData.projectsSummary}
                  onChange={(e) => setFormData({ ...formData, projectsSummary: e.target.value })}
                  placeholder="Summarize 1-2 projects you're proud of, tech stacks used, and URLs if any."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-indigo-500 leading-relaxed"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">
                  Why do you want to participate in NexHack 2026? *
                </label>
                <textarea
                  rows={3}
                  value={formData.motivation}
                  onChange={(e) => setFormData({ ...formData, motivation: e.target.value })}
                  placeholder="Briefly describe what excites you about this 24-hour sprint."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-indigo-500 leading-relaxed"
                />
              </div>
            </div>
          )}

          {/* STEP 5: Resume */}
          {step === 5 && (
            <div className="space-y-5 animate-in fade-in">
              <div className="border-b border-slate-800 pb-3 mb-4">
                <h3 className="text-lg font-semibold text-white">Step 5 — Resume Upload</h3>
                <p className="text-xs text-slate-400">Upload your PDF resume for technical screening review.</p>
              </div>

              <div className="border-2 border-dashed border-slate-700/80 hover:border-indigo-500/50 rounded-2xl p-8 text-center bg-slate-950/50 transition-colors">
                <UploadCloud className="w-10 h-10 text-indigo-400 mx-auto mb-3" />
                <div className="text-sm font-semibold text-white">Click or drag resume file here</div>
                <div className="text-xs text-slate-500 mt-1">Supports PDF up to 5MB (Simulated upload)</div>
              </div>

              {formData.resumeFileName && (
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-indigo-950 border border-indigo-500/30 text-indigo-400">
                      <FileText className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-white">{formData.resumeFileName}</div>
                      <div className="text-[10px] text-slate-400">{formData.resumeFileSize} • Uploaded & Ready</div>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, resumeFileName: '' })}
                    className="p-1.5 text-slate-400 hover:text-rose-400"
                    title="Remove file"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          )}

          {/* STEP 6: Review */}
          {step === 6 && (
            <div className="space-y-6 animate-in fade-in">
              <div className="border-b border-slate-800 pb-3">
                <h3 className="text-lg font-semibold text-white">Step 6 — Review & Submit</h3>
                <p className="text-xs text-slate-400">Verify your application before submitting to the review queue.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                  <div className="text-[10px] uppercase font-semibold text-indigo-400 tracking-wider">
                    Personal & Academics
                  </div>
                  <div>
                    <span className="text-slate-400">Name:</span> <strong className="text-white">{formData.name}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400">Email:</span> <span className="text-slate-200">{formData.email}</span>
                  </div>
                  <div>
                    <span className="text-slate-400">Phone:</span> <span className="text-slate-200">{formData.phone}</span>
                  </div>
                  <div>
                    <span className="text-slate-400">College:</span> <span className="text-slate-200">{formData.college}</span>
                  </div>
                  <div>
                    <span className="text-slate-400">USN:</span> <span className="text-slate-200 font-mono">{formData.usn}</span>
                  </div>
                  <div>
                    <span className="text-slate-400">Dept & Year:</span>{' '}
                    <span className="text-slate-200">{formData.department} ({formData.year})</span>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                  <div className="text-[10px] uppercase font-semibold text-indigo-400 tracking-wider">
                    Developer Profile
                  </div>
                  <div>
                    <span className="text-slate-400">GitHub:</span>{' '}
                    <a href={formData.github} target="_blank" rel="noreferrer" className="text-indigo-400 hover:underline">
                      {formData.github}
                    </a>
                  </div>
                  <div>
                    <span className="text-slate-400">Previous Hackathons:</span>{' '}
                    <strong className="text-white">{formData.previousHackathons}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400">Resume:</span>{' '}
                    <span className="text-emerald-400 font-medium">{formData.resumeFileName}</span>
                  </div>
                  <div>
                    <span className="text-slate-400">Skills:</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {formData.skills.map((s) => (
                        <span key={s} className="px-1.5 py-0.5 rounded bg-slate-900 border border-slate-700 text-[10px] text-slate-300">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-indigo-950/20 border border-indigo-500/20 text-xs text-indigo-200 leading-relaxed">
                By submitting, you agree to the hackathon code of conduct and confirm that all details provided are accurate.
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between pt-6 border-t border-slate-800 mt-8">
            {step > 1 ? (
              <button
                type="button"
                onClick={handlePrev}
                className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-semibold flex items-center gap-1.5 transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> Previous
              </button>
            ) : (
              <div />
            )}

            {step < 6 ? (
              <button
                type="button"
                onClick={handleNext}
                className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold flex items-center gap-1.5 shadow-lg shadow-indigo-600/30 transition-all hover:scale-102"
              >
                Continue <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSubmit}
                className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-2 shadow-lg shadow-emerald-600/30 transition-all hover:scale-102"
              >
                <CheckCircle2 className="w-4 h-4" /> Submit Application
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      {submittedAppId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
          <div className="bg-[#0f111a] border border-emerald-500/30 rounded-2xl p-6 sm:p-8 max-w-md w-full text-center shadow-2xl animate-in zoom-in-95">
            <div className="w-14 h-14 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <h3 className="text-xl font-bold text-white mb-1">Application Submitted!</h3>
            <p className="text-xs text-slate-400 mb-6">
              Your profile has been queued for technical screening by the NexHack 2026 committee.
            </p>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 mb-6">
              <div className="text-[10px] uppercase font-semibold text-slate-400 tracking-wider">
                Your Application ID
              </div>
              <div className="text-2xl font-mono font-extrabold text-indigo-400 tracking-wider mt-1">
                {submittedAppId}
              </div>
              <div className="text-[11px] text-slate-400 mt-1">
                Keep this ID handy for status tracking & communication.
              </div>
            </div>

            <div className="space-y-2">
              <button
                onClick={() => navigate('/dashboard')}
                className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs shadow-lg shadow-indigo-600/30 transition-all"
              >
                Go to Participant Dashboard
              </button>
              <button
                onClick={() => navigate('/admin/applications')}
                className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-medium border border-slate-800 transition-colors"
              >
                Switch to Organizer to Review This Applicant
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
