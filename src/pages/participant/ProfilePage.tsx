import React, { useState } from 'react';
import { useHackathon } from '../../context/HackathonContext';
import { User, FileText, CheckCircle2, Save, ArrowLeft, UploadCloud } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '../../components/ui/Icons';

export const ProfilePage: React.FC = () => {
  const { currentParticipant, updateParticipantProfile, navigate } = useHackathon();

  const [formData, setFormData] = useState({
    name: currentParticipant.name || '',
    email: currentParticipant.email || '',
    phone: currentParticipant.phone || '',
    college: currentParticipant.college || '',
    usn: currentParticipant.usn || '',
    degree: currentParticipant.degree || '',
    department: currentParticipant.department || '',
    year: currentParticipant.year || '',
    gradYear: currentParticipant.gradYear || '',
    github: currentParticipant.github || '',
    linkedin: currentParticipant.linkedin || '',
    portfolio: currentParticipant.portfolio || '',
    skills: currentParticipant.skills || [],
    previousHackathons: currentParticipant.previousHackathons || 0,
    projectsSummary: currentParticipant.projectsSummary || '',
    motivation: currentParticipant.motivation || '',
    resumeFileName: currentParticipant.resumeFileName || 'Resume_2026.pdf',
  });

  const availableSkills = [
    'React',
    'Python',
    'Java',
    'Flutter',
    'Machine Learning',
    'AI',
    'Node.js',
    'Cybersecurity',
    'Blockchain',
    'Cloud',
    'UI/UX',
  ];

  const toggleSkill = (skill: string) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.includes(skill)
        ? prev.skills.filter((s) => s !== skill)
        : [...prev.skills, skill],
    }));
  };

  // Calculate profile completion percentage
  const fields = [
    formData.name,
    formData.email,
    formData.phone,
    formData.college,
    formData.usn,
    formData.department,
    formData.github,
    formData.linkedin,
    formData.skills.length > 0,
    formData.projectsSummary,
    formData.motivation,
    formData.resumeFileName,
  ];
  const filledCount = fields.filter(Boolean).length;
  const completionPercentage = Math.round((filledCount / fields.length) * 100);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateParticipantProfile(formData);
    navigate('/dashboard');
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Top Header */}
      <div className="flex items-center justify-between pb-4 border-b border-[#27272a]">
        <div>
          <button
            onClick={() => navigate('/dashboard')}
            className="inline-flex items-center gap-1.5 text-xs text-[#a1a1aa] hover:text-[#fafafa] mb-1.5 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Dashboard</span>
          </button>
          <h1 className="text-xl font-semibold text-[#fafafa] tracking-tight">Participant Profile</h1>
          <p className="text-xs text-[#a1a1aa]">
            Keep your academic and technical credentials current for screening verification and judging reviews.
          </p>
        </div>

        {/* Completion Indicator */}
        <div className="text-right">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-medium text-[#3b82f6]">
              {completionPercentage}% complete
            </span>
          </div>
          <div className="w-28 h-1.5 bg-[#18181b] rounded-full overflow-hidden mt-1 border border-[#27272a]">
            <div
              className="h-full bg-[#2563eb] rounded-full transition-all duration-300"
              style={{ width: `${completionPercentage}%` }}
            ></div>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Personal & Academic */}
        <div className="bg-[#111113] border border-[#27272a] rounded-lg p-5 space-y-4">
          <h2 className="text-sm font-medium text-[#fafafa] pb-2 border-b border-[#27272a]">
            1. Identity & Academic Details
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-[#a1a1aa] mb-1">Full Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                className="w-full bg-[#18181b] border border-[#27272a] focus:border-[#3b82f6] rounded-md px-3 py-1.5 text-xs text-[#fafafa] outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-[#a1a1aa] mb-1">Email Address</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                className="w-full bg-[#18181b] border border-[#27272a] focus:border-[#3b82f6] rounded-md px-3 py-1.5 text-xs text-[#fafafa] outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-[#a1a1aa] mb-1">Phone Number</label>
              <input
                type="text"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                required
                className="w-full bg-[#18181b] border border-[#27272a] focus:border-[#3b82f6] rounded-md px-3 py-1.5 text-xs text-[#fafafa] outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-[#a1a1aa] mb-1">Student ID / USN</label>
              <input
                type="text"
                value={formData.usn}
                onChange={(e) => setFormData({ ...formData, usn: e.target.value })}
                required
                className="w-full bg-[#18181b] border border-[#27272a] focus:border-[#3b82f6] rounded-md px-3 py-1.5 text-xs text-[#fafafa] outline-none font-mono"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-xs font-medium text-[#a1a1aa] mb-1">College Name</label>
              <input
                type="text"
                value={formData.college}
                onChange={(e) => setFormData({ ...formData, college: e.target.value })}
                required
                className="w-full bg-[#18181b] border border-[#27272a] focus:border-[#3b82f6] rounded-md px-3 py-1.5 text-xs text-[#fafafa] outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-[#a1a1aa] mb-1">Degree & Major</label>
              <input
                type="text"
                value={formData.degree}
                onChange={(e) => setFormData({ ...formData, degree: e.target.value })}
                className="w-full bg-[#18181b] border border-[#27272a] focus:border-[#3b82f6] rounded-md px-3 py-1.5 text-xs text-[#fafafa] outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-[#a1a1aa] mb-1">Graduation Year</label>
              <input
                type="text"
                value={formData.gradYear}
                onChange={(e) => setFormData({ ...formData, gradYear: e.target.value })}
                className="w-full bg-[#18181b] border border-[#27272a] focus:border-[#3b82f6] rounded-md px-3 py-1.5 text-xs text-[#fafafa] outline-none font-mono"
              />
            </div>
          </div>
        </div>

        {/* Developer Profiles & Skills */}
        <div className="bg-[#111113] border border-[#27272a] rounded-lg p-5 space-y-4">
          <h2 className="text-sm font-medium text-[#fafafa] pb-2 border-b border-[#27272a]">
            2. Developer Profiles & Core Skills
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-medium text-[#a1a1aa] mb-1 flex items-center gap-1.5">
                <GithubIcon className="w-3.5 h-3.5" />
                <span>GitHub Profile</span>
              </label>
              <input
                type="url"
                value={formData.github}
                onChange={(e) => setFormData({ ...formData, github: e.target.value })}
                className="w-full bg-[#18181b] border border-[#27272a] focus:border-[#3b82f6] rounded-md px-3 py-1.5 text-xs text-[#fafafa] outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-[#a1a1aa] mb-1 flex items-center gap-1.5">
                <LinkedinIcon className="w-3.5 h-3.5" />
                <span>LinkedIn Profile</span>
              </label>
              <input
                type="url"
                value={formData.linkedin}
                onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
                className="w-full bg-[#18181b] border border-[#27272a] focus:border-[#3b82f6] rounded-md px-3 py-1.5 text-xs text-[#fafafa] outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-[#a1a1aa] mb-1">Portfolio URL</label>
              <input
                type="url"
                value={formData.portfolio}
                onChange={(e) => setFormData({ ...formData, portfolio: e.target.value })}
                className="w-full bg-[#18181b] border border-[#27272a] focus:border-[#3b82f6] rounded-md px-3 py-1.5 text-xs text-[#fafafa] outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-[#a1a1aa] mb-2">Technical Skills</label>
            <div className="flex flex-wrap gap-1.5">
              {availableSkills.map((s) => {
                const isSelected = formData.skills.includes(s);
                return (
                  <button
                    type="button"
                    key={s}
                    onClick={() => toggleSkill(s)}
                    className={`px-2.5 py-1 rounded-md text-xs font-medium border transition-colors ${
                      isSelected
                        ? 'bg-[#2563eb]/20 text-[#3b82f6] border-[#3b82f6]/40'
                        : 'bg-[#18181b] text-[#a1a1aa] border-[#27272a] hover:text-[#fafafa]'
                    }`}
                  >
                    {isSelected && <span className="mr-1">✓</span>}
                    {s}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Experience & Resume */}
        <div className="bg-[#111113] border border-[#27272a] rounded-lg p-5 space-y-4">
          <h2 className="text-sm font-medium text-[#fafafa] pb-2 border-b border-[#27272a]">
            3. Experience & Resume Upload
          </h2>

          <div>
            <label className="block text-xs font-medium text-[#a1a1aa] mb-1">Key Projects Built</label>
            <textarea
              rows={2}
              value={formData.projectsSummary}
              onChange={(e) => setFormData({ ...formData, projectsSummary: e.target.value })}
              className="w-full bg-[#18181b] border border-[#27272a] focus:border-[#3b82f6] rounded-md px-3 py-1.5 text-xs text-[#fafafa] outline-none resize-none"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-[#a1a1aa] mb-1">Short Bio & Motivation</label>
            <textarea
              rows={2}
              value={formData.motivation}
              onChange={(e) => setFormData({ ...formData, motivation: e.target.value })}
              className="w-full bg-[#18181b] border border-[#27272a] focus:border-[#3b82f6] rounded-md px-3 py-1.5 text-xs text-[#fafafa] outline-none resize-none"
            />
          </div>

          <div className="p-4 rounded-md bg-[#18181b] border border-[#27272a] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <FileText className="w-5 h-5 text-[#3b82f6]" />
              <div>
                <p className="text-xs font-medium text-[#fafafa]">{formData.resumeFileName}</p>
                <p className="text-[10px] text-[#71717a]">Verified PDF • 1.2 MB</p>
              </div>
            </div>
            <span className="text-[11px] font-mono text-emerald-400">Attached</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={() => navigate('/dashboard')}
            className="px-4 py-2 rounded-md text-xs font-medium bg-[#111113] border border-[#27272a] text-[#a1a1aa] hover:text-[#fafafa] transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-md bg-[#2563eb] hover:bg-blue-600 text-white text-xs font-medium transition-colors shadow-sm"
          >
            <Save className="w-3.5 h-3.5" />
            <span>Save Profile</span>
          </button>
        </div>
      </form>
    </div>
  );
};
