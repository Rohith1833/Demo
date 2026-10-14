import React, { useState } from 'react';
import { useHackathon } from '../../context/HackathonContext';
import { ParticipantApplication, ApplicationStatus } from '../../types';
import {
  UserCheck,
  Search,
  Filter,
  CheckCircle2,
  XCircle,
  Clock,
  AlertTriangle,
  FileText,
  ChevronLeft,
  ChevronRight,
  Download,
  Mail,
  X,
  ExternalLink,
  SlidersHorizontal,
  Check,
} from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '../../components/ui/Icons';

export const ApplicationScreeningPage: React.FC = () => {
  const {
    applications,
    updateApplicationStatus,
    bulkUpdateApplications,
    selectedApplicant,
    setSelectedApplicant,
    showToast,
  } = useHackathon();

  // Filters & Search
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [collegeFilter, setCollegeFilter] = useState<string>('all');
  const [skillFilter, setSkillFilter] = useState<string>('all');

  // Multi-select for bulk actions
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [bulkActionConfirm, setBulkActionConfirm] = useState<{
    action: ApplicationStatus | 'email' | 'export';
    label: string;
  } | null>(null);

  // Review Drawer state
  const [reviewNotes, setReviewNotes] = useState('');
  const [scores, setScores] = useState({
    technical: 9,
    experience: 8,
    projects: 9,
    motivation: 8.5,
  });

  // Calculate stats
  const totalApps = 1248; // Scaled platform stats as requested
  const pendingCount = applications.filter((a) => a.status === 'pending').length;
  const selectedCount = applications.filter((a) => a.status === 'selected').length;
  const waitlistedCount = applications.filter((a) => a.status === 'waitlisted').length;
  const rejectedCount = applications.filter((a) => a.status === 'rejected').length;

  // Filter application list
  const filteredApps = applications.filter((app) => {
    const matchesSearch =
      app.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.college.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.skills.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesStatus = statusFilter === 'all' || app.status === statusFilter;
    const matchesCollege = collegeFilter === 'all' || app.college.includes(collegeFilter);
    const matchesSkill = skillFilter === 'all' || app.skills.includes(skillFilter);

    return matchesSearch && matchesStatus && matchesCollege && matchesSkill;
  });

  const colleges = ['RV College of Engineering', 'PES University', 'BMS College of Engineering', 'MS Ramaiah Institute of Technology', 'XYZ Institute of Technology'];
  const allSkills = ['React', 'Python', 'Machine Learning', 'UI/UX', 'FastAPI', 'Rust', 'eBPF', 'ROS2', 'TypeScript'];

  // Handle drawer opening
  const openReviewDrawer = (app: ParticipantApplication) => {
    setSelectedApplicant(app);
    setReviewNotes(app.reviewerNotes || '');
    setScores({
      technical: app.scores.technical || 8,
      experience: app.scores.experience || 8,
      projects: app.scores.projects || 8,
      motivation: app.scores.motivation || 8,
    });
  };

  const handleStatusChangeInDrawer = (newStatus: ApplicationStatus) => {
    if (!selectedApplicant) return;
    const totalScore = scores.technical + scores.experience + scores.projects + scores.motivation;
    updateApplicationStatus(selectedApplicant.id, newStatus, reviewNotes, {
      ...scores,
      total: totalScore,
    });
    // Update local drawer item
    setSelectedApplicant({
      ...selectedApplicant,
      status: newStatus,
      reviewerNotes: reviewNotes,
      scores: { ...scores, total: totalScore },
    });
  };

  // Next / Previous applicant navigation
  const currentIndex = selectedApplicant
    ? filteredApps.findIndex((a) => a.id === selectedApplicant.id)
    : -1;

  const handlePrevApplicant = () => {
    if (currentIndex > 0) {
      openReviewDrawer(filteredApps[currentIndex - 1]);
    }
  };

  const handleNextApplicant = () => {
    if (currentIndex >= 0 && currentIndex < filteredApps.length - 1) {
      openReviewDrawer(filteredApps[currentIndex + 1]);
    }
  };

  // Bulk actions
  const toggleSelectAll = () => {
    if (selectedIds.length === filteredApps.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredApps.map((a) => a.id));
    }
  };

  const toggleSelectOne = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const executeBulkAction = () => {
    if (!bulkActionConfirm) return;
    if (bulkActionConfirm.action === 'export') {
      showToast('success', `Exported ${selectedIds.length} applicants to CSV.`, 'CSV Exported');
    } else if (bulkActionConfirm.action === 'email') {
      showToast('success', `Batch email queued for ${selectedIds.length} applicants.`, 'Emails Dispatched');
    } else {
      bulkUpdateApplications(selectedIds, bulkActionConfirm.action as ApplicationStatus);
    }
    setBulkActionConfirm(null);
    setSelectedIds([]);
  };

  return (
    <div className="min-h-screen bg-[#090a0f] text-slate-100 py-8 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-mono uppercase tracking-wider text-indigo-400 bg-indigo-950/60 px-3 py-1 rounded-full border border-indigo-500/20">
              Technical Screening Pipeline
            </span>
            <h1 className="text-3xl font-extrabold text-white mt-2">Applications Review</h1>
            <p className="text-xs text-slate-400 mt-1">
              Screen, score, and select candidates based on technical portfolios, GitHub activity, and projects.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                showToast('success', 'Full applicant registry exported to CSV (1,248 rows)', 'Export Complete');
              }}
              className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-700/80 text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <Download className="w-3.5 h-3.5" /> Export All CSV
            </button>
          </div>
        </div>

        {/* 5 Stats Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          <div className="p-4 rounded-2xl bg-slate-900/40 border border-slate-800/80">
            <div className="text-xs text-slate-400">Total Applications</div>
            <div className="text-2xl font-black text-white mt-1">1,248</div>
            <div className="text-[10px] text-slate-500">Across 32 colleges</div>
          </div>
          <div className="p-4 rounded-2xl bg-slate-900/40 border border-slate-800/80">
            <div className="text-xs text-amber-400">Pending Review</div>
            <div className="text-2xl font-black text-amber-400 mt-1">{pendingCount + 480}</div>
            <div className="text-[10px] text-slate-500">Awaiting screening</div>
          </div>
          <div className="p-4 rounded-2xl bg-slate-900/40 border border-slate-800/80">
            <div className="text-xs text-emerald-400">Selected</div>
            <div className="text-2xl font-black text-emerald-400 mt-1">{selectedCount + 490}</div>
            <div className="text-[10px] text-slate-500">Target capacity: 500</div>
          </div>
          <div className="p-4 rounded-2xl bg-slate-900/40 border border-slate-800/80">
            <div className="text-xs text-indigo-400">Waitlisted</div>
            <div className="text-2xl font-black text-indigo-400 mt-1">{waitlistedCount + 110}</div>
            <div className="text-[10px] text-slate-500">Priority pool</div>
          </div>
          <div className="p-4 rounded-2xl bg-slate-900/40 border border-slate-800/80">
            <div className="text-xs text-rose-400">Rejected</div>
            <div className="text-2xl font-black text-rose-400 mt-1">{rejectedCount + 148}</div>
            <div className="text-[10px] text-slate-500">Cutoff not met</div>
          </div>
        </div>

        {/* Filters & Bulk Action Bar */}
        <div className="p-4 rounded-2xl bg-slate-900/40 border border-slate-800/80 backdrop-blur-md flex flex-wrap items-center justify-between gap-3">
          {/* Search Input */}
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search by name, ID, college..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
            />
          </div>

          {/* Filter dropdowns */}
          <div className="flex flex-wrap items-center gap-2">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none"
            >
              <option value="all">Status: All</option>
              <option value="pending">Pending Review</option>
              <option value="selected">Selected</option>
              <option value="waitlisted">Waitlisted</option>
              <option value="rejected">Rejected</option>
            </select>

            <select
              value={collegeFilter}
              onChange={(e) => setCollegeFilter(e.target.value)}
              className="px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none max-w-[150px] truncate"
            >
              <option value="all">College: All</option>
              {colleges.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>

            <select
              value={skillFilter}
              onChange={(e) => setSkillFilter(e.target.value)}
              className="px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none"
            >
              <option value="all">Skill: All</option>
              {allSkills.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>

          {/* Bulk Actions pill when items selected */}
          {selectedIds.length > 0 && (
            <div className="flex items-center gap-2 bg-indigo-950/60 border border-indigo-500/30 px-3 py-1.5 rounded-xl animate-in fade-in">
              <span className="text-xs text-indigo-300 font-semibold">
                {selectedIds.length} selected
              </span>
              <button
                onClick={() => setBulkActionConfirm({ action: 'selected', label: 'Select Applicants' })}
                className="px-2.5 py-1 rounded bg-emerald-600 hover:bg-emerald-500 text-white text-[11px] font-semibold"
              >
                Select
              </button>
              <button
                onClick={() => setBulkActionConfirm({ action: 'waitlisted', label: 'Waitlist Applicants' })}
                className="px-2.5 py-1 rounded bg-amber-600 hover:bg-amber-500 text-white text-[11px] font-semibold"
              >
                Waitlist
              </button>
              <button
                onClick={() => setBulkActionConfirm({ action: 'rejected', label: 'Reject Applicants' })}
                className="px-2.5 py-1 rounded bg-rose-600 hover:bg-rose-500 text-white text-[11px] font-semibold"
              >
                Reject
              </button>
              <button
                onClick={() => setBulkActionConfirm({ action: 'email', label: 'Send Batch Email' })}
                className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 text-[11px] font-semibold flex items-center gap-1"
              >
                <Mail className="w-3 h-3" /> Email
              </button>
            </div>
          )}
        </div>

        {/* Dense Clean Data Table */}
        <div className="rounded-2xl border border-slate-800/80 overflow-hidden bg-slate-950/40 backdrop-blur-md shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-900/80 border-b border-slate-800 text-slate-400 uppercase font-mono text-[10px] tracking-wider">
                <tr>
                  <th className="p-3.5 w-10">
                    <input
                      type="checkbox"
                      checked={selectedIds.length === filteredApps.length && filteredApps.length > 0}
                      onChange={toggleSelectAll}
                      className="rounded bg-slate-900 border-slate-700"
                    />
                  </th>
                  <th className="p-3.5">ID</th>
                  <th className="p-3.5">Applicant Name</th>
                  <th className="p-3.5">College & Dept</th>
                  <th className="p-3.5">Year</th>
                  <th className="p-3.5">Key Skills</th>
                  <th className="p-3.5">Score</th>
                  <th className="p-3.5">Status</th>
                  <th className="p-3.5">Reviewer</th>
                  <th className="p-3.5 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {filteredApps.map((app) => {
                  const isChecked = selectedIds.includes(app.id);
                  const isSelectedInDrawer = selectedApplicant?.id === app.id;

                  return (
                    <tr
                      key={app.id}
                      onClick={() => openReviewDrawer(app)}
                      className={`hover:bg-slate-900/60 cursor-pointer transition-colors ${
                        isSelectedInDrawer
                          ? 'bg-indigo-950/30'
                          : isChecked
                          ? 'bg-indigo-950/20'
                          : ''
                      }`}
                    >
                      <td className="p-3.5" onClick={(e) => e.stopPropagation()}>
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => toggleSelectOne(app.id)}
                          className="rounded bg-slate-900 border-slate-700"
                        />
                      </td>
                      <td className="p-3.5 font-mono text-slate-300 font-semibold">{app.id}</td>
                      <td className="p-3.5 font-medium text-white">
                        <div>{app.name}</div>
                        <div className="text-[10px] text-slate-500 font-normal">{app.email}</div>
                      </td>
                      <td className="p-3.5 text-slate-300">
                        <div className="truncate max-w-[180px]">{app.college}</div>
                        <div className="text-[10px] text-slate-500">{app.department}</div>
                      </td>
                      <td className="p-3.5 text-slate-400">{app.year}</td>
                      <td className="p-3.5">
                        <div className="flex flex-wrap gap-1 max-w-xs">
                          {app.skills.slice(0, 3).map((sk) => (
                            <span
                              key={sk}
                              className="px-1.5 py-0.2 rounded bg-slate-900 border border-slate-800 text-[9px] text-slate-300 font-mono"
                            >
                              {sk}
                            </span>
                          ))}
                          {app.skills.length > 3 && (
                            <span className="text-[9px] text-slate-500">+{app.skills.length - 3}</span>
                          )}
                        </div>
                      </td>
                      <td className="p-3.5 font-mono">
                        <span
                          className={`font-bold ${
                            app.scores.total >= 34
                              ? 'text-emerald-400'
                              : app.scores.total >= 28
                              ? 'text-indigo-400'
                              : 'text-amber-400'
                          }`}
                        >
                          {app.scores.total}/40
                        </span>
                      </td>
                      <td className="p-3.5">
                        <span
                          className={`text-[10px] px-2.5 py-0.5 rounded-full font-semibold uppercase ${
                            app.status === 'selected'
                              ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                              : app.status === 'waitlisted'
                              ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                              : app.status === 'rejected'
                              ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                              : 'bg-indigo-500/20 text-indigo-400 border border-indigo-500/30'
                          }`}
                        >
                          {app.status}
                        </span>
                      </td>
                      <td className="p-3.5 text-slate-400 text-[11px] truncate max-w-[120px]">
                        {app.reviewerName || 'Unassigned'}
                      </td>
                      <td className="p-3.5 text-right" onClick={(e) => e.stopPropagation()}>
                        <button
                          onClick={() => openReviewDrawer(app)}
                          className="px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 hover:text-white transition-colors"
                        >
                          Review
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

      {/* Slide-over Application Review Drawer */}
      {selectedApplicant && (
        <div className="fixed inset-0 z-50 overflow-hidden animate-in fade-in">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setSelectedApplicant(null)}
          />

          <div className="absolute inset-y-0 right-0 max-w-2xl w-full bg-[#0c0e17] border-l border-slate-800 shadow-2xl flex flex-col z-50 animate-in slide-in-from-right duration-200">
            {/* Drawer Header */}
            <div className="p-6 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
              <div className="flex items-center gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-indigo-400 bg-indigo-950 px-2 py-0.5 rounded border border-indigo-500/30">
                      {selectedApplicant.id}
                    </span>
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded-full font-semibold uppercase ${
                        selectedApplicant.status === 'selected'
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                          : selectedApplicant.status === 'waitlisted'
                          ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                          : selectedApplicant.status === 'rejected'
                          ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                          : 'bg-indigo-500/20 text-indigo-400'
                      }`}
                    >
                      {selectedApplicant.status}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-white mt-1">{selectedApplicant.name}</h3>
                  <div className="text-xs text-slate-400">
                    {selectedApplicant.college} • {selectedApplicant.department}
                  </div>
                </div>
              </div>

              {/* Prev / Next Applicant Buttons */}
              <div className="flex items-center gap-1.5">
                <button
                  onClick={handlePrevApplicant}
                  disabled={currentIndex <= 0}
                  className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 disabled:opacity-30"
                  title="Previous applicant"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={handleNextApplicant}
                  disabled={currentIndex >= filteredApps.length - 1}
                  className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 disabled:opacity-30"
                  title="Next applicant"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setSelectedApplicant(null)}
                  className="p-2 rounded-xl text-slate-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Drawer Body Scroll */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 text-xs">
              {/* Quick links & Contact */}
              <div className="grid grid-cols-2 gap-3 p-4 rounded-2xl bg-slate-950 border border-slate-800">
                <div>
                  <span className="text-slate-400">Email:</span>{' '}
                  <span className="text-white font-medium">{selectedApplicant.email}</span>
                </div>
                <div>
                  <span className="text-slate-400">Phone:</span>{' '}
                  <span className="text-white font-medium">{selectedApplicant.phone}</span>
                </div>
                <div>
                  <span className="text-slate-400">USN:</span>{' '}
                  <span className="font-mono text-slate-200">{selectedApplicant.usn}</span>
                </div>
                <div>
                  <span className="text-slate-400">Hackathons Attended:</span>{' '}
                  <strong className="text-indigo-400">{selectedApplicant.previousHackathons}</strong>
                </div>
              </div>

              {/* External Profiles */}
              <div className="flex flex-wrap items-center gap-2">
                <a
                  href={selectedApplicant.github}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-200 flex items-center gap-1.5 transition-colors"
                >
                  <GithubIcon className="w-3.5 h-3.5 text-slate-300" /> GitHub Profile
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
                <a
                  href={selectedApplicant.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-sky-300 flex items-center gap-1.5 transition-colors"
                >
                  <LinkedinIcon className="w-3.5 h-3.5 text-sky-400" /> LinkedIn
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
                <div className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-emerald-300 flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Resume: {selectedApplicant.resumeFileName || 'Resume.pdf'}</span>
                </div>
              </div>

              {/* Skills */}
              <div>
                <h4 className="text-[11px] uppercase font-bold tracking-wider text-slate-400 mb-2">
                  Technical Skills
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {selectedApplicant.skills.map((s) => (
                    <span
                      key={s}
                      className="px-2.5 py-1 rounded-lg bg-indigo-950/60 border border-indigo-500/30 text-indigo-300 font-mono text-[11px]"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              {/* Projects Summary */}
              <div>
                <h4 className="text-[11px] uppercase font-bold tracking-wider text-slate-400 mb-2">
                  Projects & Past Work
                </h4>
                <p className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-slate-300 leading-relaxed">
                  {selectedApplicant.projectsSummary}
                </p>
              </div>

              {/* Motivation */}
              <div>
                <h4 className="text-[11px] uppercase font-bold tracking-wider text-slate-400 mb-2">
                  Application Motivation
                </h4>
                <p className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-slate-300 leading-relaxed">
                  {selectedApplicant.motivation}
                </p>
              </div>

              {/* Scoring Rubric /40 */}
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-[11px] uppercase font-bold tracking-wider text-indigo-400">
                    Review Scoring Matrix (/40)
                  </h4>
                  <div className="text-base font-black font-mono text-emerald-400">
                    Total: {scores.technical + scores.experience + scores.projects + scores.motivation} / 40
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] text-slate-400">Technical Profile (/10)</label>
                    <input
                      type="number"
                      min="0"
                      max="10"
                      step="0.5"
                      value={scores.technical}
                      onChange={(e) => setScores({ ...scores, technical: parseFloat(e.target.value) || 0 })}
                      className="w-full px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white font-mono mt-0.5"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-slate-400">Experience (/10)</label>
                    <input
                      type="number"
                      min="0"
                      max="10"
                      step="0.5"
                      value={scores.experience}
                      onChange={(e) => setScores({ ...scores, experience: parseFloat(e.target.value) || 0 })}
                      className="w-full px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white font-mono mt-0.5"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-slate-400">Projects Depth (/10)</label>
                    <input
                      type="number"
                      min="0"
                      max="10"
                      step="0.5"
                      value={scores.projects}
                      onChange={(e) => setScores({ ...scores, projects: parseFloat(e.target.value) || 0 })}
                      className="w-full px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white font-mono mt-0.5"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-slate-400">Motivation (/10)</label>
                    <input
                      type="number"
                      min="0"
                      max="10"
                      step="0.5"
                      value={scores.motivation}
                      onChange={(e) => setScores({ ...scores, motivation: parseFloat(e.target.value) || 0 })}
                      className="w-full px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white font-mono mt-0.5"
                    />
                  </div>
                </div>
              </div>

              {/* Reviewer Notes */}
              <div>
                <label className="text-[11px] uppercase font-bold tracking-wider text-slate-400 block mb-1.5">
                  Reviewer Internal Notes
                </label>
                <textarea
                  rows={3}
                  value={reviewNotes}
                  onChange={(e) => setReviewNotes(e.target.value)}
                  placeholder="Notes visible only to committee coordinators..."
                  className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-indigo-500 leading-relaxed"
                />
              </div>
            </div>

            {/* Drawer Footer Actions */}
            <div className="p-5 border-t border-slate-800 bg-slate-950 flex items-center justify-between gap-3">
              <button
                onClick={() => handleStatusChangeInDrawer('rejected')}
                className="px-4 py-2.5 rounded-xl bg-rose-600/20 hover:bg-rose-600/30 text-rose-300 border border-rose-500/30 font-bold transition-colors flex items-center gap-1.5"
              >
                <XCircle className="w-4 h-4" /> Reject
              </button>

              <button
                onClick={() => handleStatusChangeInDrawer('waitlisted')}
                className="px-4 py-2.5 rounded-xl bg-amber-600/20 hover:bg-amber-600/30 text-amber-300 border border-amber-500/30 font-bold transition-colors flex items-center gap-1.5"
              >
                <Clock className="w-4 h-4" /> Waitlist
              </button>

              <button
                onClick={() => handleStatusChangeInDrawer('selected')}
                className="flex-1 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold transition-all shadow-md shadow-emerald-600/30 flex items-center justify-center gap-1.5"
              >
                <CheckCircle2 className="w-4 h-4" /> Select Applicant
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Bulk Action Confirmation Modal */}
      {bulkActionConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
          <div className="bg-[#0f111a] border border-slate-800 rounded-3xl max-w-md w-full p-6 text-center shadow-2xl">
            <h3 className="text-lg font-bold text-white mb-2">Confirm Bulk Action</h3>
            <p className="text-xs text-slate-400 mb-6">
              Are you sure you want to apply <strong>"{bulkActionConfirm.label}"</strong> to all{' '}
              <strong>{selectedIds.length}</strong> selected applicants?
            </p>

            <div className="flex gap-2">
              <button
                onClick={() => setBulkActionConfirm(null)}
                className="flex-1 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={executeBulkAction}
                className="flex-1 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-md shadow-indigo-600/30"
              >
                Confirm Bulk Update
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
