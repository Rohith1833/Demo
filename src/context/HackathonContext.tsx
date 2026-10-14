import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  UserRole,
  DemoPersona,
  LifecycleStage,
  ApplicationStatus,
  ParticipantApplication,
  ApplicantScore,
  Team,
  ProblemStatement,
  ProjectSubmission,
  Judge,
  Evaluation,
  WinnerEntry,
  Announcement,
  EmailTemplate,
  HackathonEvent,
  EventSettings,
  MentorRequest,
  OperationalIssue,
  ActivityLogEntry,
  CertificateCategory,
  WhatsAppTemplate,
} from '../types';
import {
  initialApplications,
  initialTeams,
  initialProblemStatements,
  initialSubmissions,
  initialJudges,
  initialEvaluations,
  initialWinners,
  initialAnnouncements,
  initialEmailTemplates,
  initialEventsList,
  initialEventSettings,
  initialMentorRequests,
  initialOperationalIssues,
  initialActivityLogs,
  initialCertificateCategories,
  initialWhatsAppTemplates,
} from '../data/mockData';

export interface ToastItem {
  id: string;
  type: 'success' | 'error' | 'info' | 'warning';
  title?: string;
  message: string;
}

interface HackathonContextType {
  // Navigation & Personas
  currentRoute: string;
  navigate: (route: string) => void;
  currentPersona: DemoPersona;
  setPersona: (persona: DemoPersona) => void;
  currentRole: UserRole;
  currentParticipant: ParticipantApplication;
  currentTeam: Team | undefined;
  currentJudge: Judge;
  lifecycleStage: LifecycleStage;
  setLifecycleStage: (stage: LifecycleStage) => void;

  // Data Collections
  applications: ParticipantApplication[];
  teams: Team[];
  problemStatements: ProblemStatement[];
  submissions: ProjectSubmission[];
  judges: Judge[];
  evaluations: Evaluation[];
  winners: WinnerEntry[];
  announcements: Announcement[];
  emailTemplates: EmailTemplate[];
  events: HackathonEvent[];
  settings: EventSettings;
  mentorRequests: MentorRequest[];
  operationalIssues: OperationalIssue[];
  activityLogs: ActivityLogEntry[];
  certificateCategories: CertificateCategory[];
  whatsappTemplates: WhatsAppTemplate[];

  // UI States
  selectedApplicant: ParticipantApplication | null;
  setSelectedApplicant: (app: ParticipantApplication | null) => void;
  toasts: ToastItem[];
  showToast: (type: 'success' | 'error' | 'info' | 'warning', message: string, title?: string) => void;
  removeToast: (id: string) => void;

  // Actions
  updateApplicationStatus: (
    id: string,
    status: ApplicationStatus,
    reviewerNotes?: string,
    scores?: ApplicantScore
  ) => void;
  bulkUpdateApplications: (ids: string[], status: ApplicationStatus) => void;
  registerParticipant: (data: Partial<ParticipantApplication>) => string;
  updateParticipantProfile: (data: Partial<ParticipantApplication>) => void;
  simulatePayment: (applicationId: string, paymentMethod: string) => boolean;
  verifyPaymentManually: (applicationId: string) => void;
  promoteWaitlistedApplicants: (count?: number) => void;
  createTeam: (teamName: string) => Team | null;
  joinTeamWithCode: (code: string) => boolean;
  selectProblemStatement: (problemId: string) => boolean;
  submitProject: (data: Partial<ProjectSubmission>) => boolean;
  checkInParticipant: (identifier: string) => { success: boolean; message: string; applicant?: ParticipantApplication };
  submitJudgeEvaluation: (evalData: Partial<Evaluation>) => boolean;
  togglePublishResults: () => void;
  assignWinner: (winner: WinnerEntry) => void;
  broadcastAnnouncement: (title: string, message: string, category: 'general' | 'urgent' | 'schedule' | 'results') => void;
  sendSimulatedEmails: (templateId: string, targetCount: number) => void;
  addMentorRequest: (data: Partial<MentorRequest>) => string;
  updateMentorRequestStatus: (id: string, status: MentorRequest['status'], assignedMentor?: string) => void;
  addOperationalIssue: (issue: Partial<OperationalIssue>) => void;
  updateOperationalIssueStatus: (id: string, status: OperationalIssue['status']) => void;
  addActivityLog: (entry: Omit<ActivityLogEntry, 'id' | 'timestamp'>) => void;
  generateCertificates: (categoryIds: string[]) => void;
  updateSettings: (newSettings: Partial<EventSettings>) => void;
  createNewHackathon: (newEvent: Partial<HackathonEvent>, duplicateFromId?: string) => void;
  deleteEventData: (mode: 'participants_only' | 'all') => void;
  resetAllData: () => void;
}

const HackathonContext = createContext<HackathonContextType | undefined>(undefined);

export const HackathonProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Navigation
  const [currentRoute, setCurrentRoute] = useState<string>(() => {
    return window.location.pathname && window.location.pathname !== '/'
      ? window.location.pathname
      : '/';
  });

  // Persona & Role
  const [currentPersona, setCurrentPersona] = useState<DemoPersona>('organizer');
  const [lifecycleStage, setLifecycleStage] = useState<LifecycleStage>('hackathon_live');

  // Core Data
  const [applications, setApplications] = useState<ParticipantApplication[]>(() => {
    const saved = localStorage.getItem('hackflow_applications');
    return saved ? JSON.parse(saved) : initialApplications;
  });

  const [teams, setTeams] = useState<Team[]>(() => {
    const saved = localStorage.getItem('hackflow_teams');
    return saved ? JSON.parse(saved) : initialTeams;
  });

  const [problemStatements, setProblemStatements] = useState<ProblemStatement[]>(() => {
    const saved = localStorage.getItem('hackflow_problems');
    return saved ? JSON.parse(saved) : initialProblemStatements;
  });

  const [submissions, setSubmissions] = useState<ProjectSubmission[]>(() => {
    const saved = localStorage.getItem('hackflow_submissions');
    return saved ? JSON.parse(saved) : initialSubmissions;
  });

  const [judges, setJudges] = useState<Judge[]>(() => {
    const saved = localStorage.getItem('hackflow_judges');
    return saved ? JSON.parse(saved) : initialJudges;
  });

  const [evaluations, setEvaluations] = useState<Evaluation[]>(() => {
    const saved = localStorage.getItem('hackflow_evaluations');
    return saved ? JSON.parse(saved) : initialEvaluations;
  });

  const [winners, setWinners] = useState<WinnerEntry[]>(() => {
    const saved = localStorage.getItem('hackflow_winners');
    return saved ? JSON.parse(saved) : initialWinners;
  });

  const [announcements, setAnnouncements] = useState<Announcement[]>(() => {
    const saved = localStorage.getItem('hackflow_announcements');
    return saved ? JSON.parse(saved) : initialAnnouncements;
  });

  const [emailTemplates] = useState<EmailTemplate[]>(initialEmailTemplates);
  const [events, setEvents] = useState<HackathonEvent[]>(initialEventsList);
  const [settings, setSettings] = useState<EventSettings>(initialEventSettings);

  const [mentorRequests, setMentorRequests] = useState<MentorRequest[]>(() => {
    const saved = localStorage.getItem('hackflow_mentor_requests');
    return saved ? JSON.parse(saved) : initialMentorRequests;
  });

  const [operationalIssues, setOperationalIssues] = useState<OperationalIssue[]>(() => {
    const saved = localStorage.getItem('hackflow_operational_issues');
    return saved ? JSON.parse(saved) : initialOperationalIssues;
  });

  const [activityLogs, setActivityLogs] = useState<ActivityLogEntry[]>(() => {
    const saved = localStorage.getItem('hackflow_activity_logs');
    return saved ? JSON.parse(saved) : initialActivityLogs;
  });

  const [certificateCategories] = useState<CertificateCategory[]>(initialCertificateCategories);
  const [whatsappTemplates] = useState<WhatsAppTemplate[]>(initialWhatsAppTemplates);

  const [selectedApplicant, setSelectedApplicant] = useState<ParticipantApplication | null>(null);
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  // Synchronize with LocalStorage
  useEffect(() => {
    localStorage.setItem('hackflow_applications', JSON.stringify(applications));
  }, [applications]);
  useEffect(() => {
    localStorage.setItem('hackflow_teams', JSON.stringify(teams));
  }, [teams]);
  useEffect(() => {
    localStorage.setItem('hackflow_problems', JSON.stringify(problemStatements));
  }, [problemStatements]);
  useEffect(() => {
    localStorage.setItem('hackflow_submissions', JSON.stringify(submissions));
  }, [submissions]);
  useEffect(() => {
    localStorage.setItem('hackflow_evaluations', JSON.stringify(evaluations));
  }, [evaluations]);
  useEffect(() => {
    localStorage.setItem('hackflow_winners', JSON.stringify(winners));
  }, [winners]);
  useEffect(() => {
    localStorage.setItem('hackflow_announcements', JSON.stringify(announcements));
  }, [announcements]);
  useEffect(() => {
    localStorage.setItem('hackflow_mentor_requests', JSON.stringify(mentorRequests));
  }, [mentorRequests]);
  useEffect(() => {
    localStorage.setItem('hackflow_operational_issues', JSON.stringify(operationalIssues));
  }, [operationalIssues]);
  useEffect(() => {
    localStorage.setItem('hackflow_activity_logs', JSON.stringify(activityLogs));
  }, [activityLogs]);

  // Derived current user based on persona
  const currentRole: UserRole =
    currentPersona === 'judge'
      ? 'judge'
      : currentPersona === 'superadmin'
      ? 'superadmin'
      : currentPersona === 'organizer'
      ? 'organizer'
      : 'participant';

  const currentParticipant: ParticipantApplication = (() => {
    if (currentPersona === 'participant_under_review') {
      return applications.find((a) => a.id === 'NXH26-1043') || applications[1];
    }
    if (currentPersona === 'participant_payment_pending') {
      return applications.find((a) => a.id === 'NXH26-1044') || applications[2];
    }
    // Default participant (Selected + Paid: Arjun Kumar)
    return applications.find((a) => a.id === 'NXH26-1042') || applications[0];
  })();

  const currentTeam: Team | undefined = teams.find(
    (t) => t.id === currentParticipant.teamId || t.members.some((m) => m.id === currentParticipant.id)
  );

  const currentJudge: Judge = judges[0]; // Dr. Ananya Rao

  const showToast = (type: 'success' | 'error' | 'info' | 'warning', message: string, title?: string) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, type, message, title }]);
    setTimeout(() => {
      removeToast(id);
    }, 4500);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const navigate = (route: string) => {
    setCurrentRoute(route);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const setPersona = (persona: DemoPersona) => {
    setCurrentPersona(persona);
    if (persona === 'judge') {
      navigate('/judge');
      showToast('info', 'Switched to Judge Persona: Dr. Ananya Rao (AI Track)', 'Role Switched');
    } else if (persona === 'organizer') {
      navigate('/admin');
      showToast('info', 'Switched to Coordinator Persona (Command Center)', 'Role Switched');
    } else if (persona === 'superadmin') {
      navigate('/superadmin/events');
      showToast('info', 'Switched to Super Admin Persona (Multi-Year Operations)', 'Role Switched');
    } else {
      if (persona === 'participant_hackathon_live') {
        setLifecycleStage('hackathon_live');
      } else if (persona === 'participant_under_review') {
        setLifecycleStage('screening_active');
      } else if (persona === 'participant_payment_pending') {
        setLifecycleStage('payment_active');
      } else {
        setLifecycleStage('teams_and_problems');
      }

      navigate('/dashboard');
      const label =
        persona === 'participant_under_review'
          ? 'Meera Nair (Under Review)'
          : persona === 'participant_payment_pending'
          ? 'Rahul Sharma (Payment Pending ₹500)'
          : persona === 'participant_hackathon_live'
          ? 'Arjun Kumar (Hackathon Live)'
          : 'Arjun Kumar (Registered & Ready)';
      showToast('info', `Switched to Participant: ${label}`, 'Role Switched');
    }
  };

  // Application Screening Actions
  const updateApplicationStatus = (
    id: string,
    status: ApplicationStatus,
    reviewerNotes?: string,
    scores?: ApplicantScore
  ) => {
    setApplications((prev) =>
      prev.map((app) => {
        if (app.id !== id) return app;
        const updatedScores = scores || app.scores;
        return {
          ...app,
          status,
          reviewerNotes: reviewerNotes !== undefined ? reviewerNotes : app.reviewerNotes,
          scores: updatedScores,
          reviewerName: 'Lead Reviewer (You)',
          reviewedAt: new Date().toISOString(),
          paymentStatus: status === 'selected' && app.paymentStatus === 'unpaid' ? 'pending' : app.paymentStatus,
        };
      })
    );
    showToast('success', `Application ${id} updated to ${status.toUpperCase()}`, 'Status Updated');
  };

  const bulkUpdateApplications = (ids: string[], status: ApplicationStatus) => {
    setApplications((prev) =>
      prev.map((app) => (ids.includes(app.id) ? { ...app, status } : app))
    );
    showToast('success', `Successfully updated ${ids.length} applicants to ${status.toUpperCase()}`, 'Bulk Action Completed');
  };

  // Participant Registration
  const registerParticipant = (data: Partial<ParticipantApplication>): string => {
    const nextNum = applications.length + 1042;
    const appId = `NXH26-${nextNum}`;
    const pId = `NXH-P-0${nextNum - 620}`;

    const newApp: ParticipantApplication = {
      id: appId,
      participantId: pId,
      name: data.name || 'Anonymous Developer',
      email: data.email || 'developer@college.edu',
      phone: data.phone || '+91 98000 00000',
      college: data.college || 'XYZ Institute of Technology',
      usn: data.usn || `1XY23CS${Math.floor(100 + Math.random() * 900)}`,
      degree: data.degree || 'B.E. Computer Science',
      department: data.department || 'Computer Science',
      year: data.year || '3rd Year',
      gradYear: data.gradYear || '2027',
      github: data.github || 'https://github.com/developer',
      linkedin: data.linkedin || 'https://linkedin.com/in/developer',
      portfolio: data.portfolio,
      skills: data.skills && data.skills.length > 0 ? data.skills : ['React', 'Python'],
      previousHackathons: data.previousHackathons || 0,
      projectsSummary: data.projectsSummary || 'Student project portfolio',
      motivation: data.motivation || 'Passionate about engineering impactful solutions.',
      resumeFileName: data.resumeFileName || 'Student_Resume_2026.pdf',
      status: 'pending',
      scores: { technical: 7.5, experience: 7.0, projects: 7.5, motivation: 8.0, total: 30.0 },
      paymentStatus: 'unpaid',
      checkInStatus: false,
      createdAt: new Date().toISOString(),
    };

    setApplications((prev) => [newApp, ...prev]);
    showToast('success', `Application ${appId} submitted successfully! Welcome to NexHack 2026.`, 'Registration Received');
    return appId;
  };

  // Simulated Payment
  const simulatePayment = (applicationId: string, paymentMethod: string): boolean => {
    const txnId = `TXN-NXH-${Math.floor(100000 + Math.random() * 900000)}`;
    setApplications((prev) =>
      prev.map((app) =>
        app.id === applicationId
          ? {
              ...app,
              paymentStatus: 'verified',
              transactionId: txnId,
              paidAt: new Date().toISOString(),
            }
          : app
      )
    );
    showToast('success', `Payment of ₹500 via ${paymentMethod} verified! Transaction ID: ${txnId}`, 'Payment Successful');
    return true;
  };

  const verifyPaymentManually = (applicationId: string) => {
    const txnId = `TXN-MANUAL-${Math.floor(100000 + Math.random() * 900000)}`;
    setApplications((prev) =>
      prev.map((app) =>
        app.id === applicationId
          ? {
              ...app,
              paymentStatus: 'verified',
              transactionId: txnId,
              paidAt: new Date().toISOString(),
            }
          : app
      )
    );
    showToast('success', `Payment for application ${applicationId} manually verified by Organizer.`, 'Payment Verified');
  };

  // Team Management
  const createTeam = (teamName: string): Team | null => {
    if (!currentParticipant) return null;
    const teamCode = `NXH-${Math.random().toString(36).substring(2, 7).toUpperCase()}`;
    const newTeamId = `TEAM-${teams.length + 1}`;

    const newTeam: Team = {
      id: newTeamId,
      code: teamCode,
      name: teamName,
      leaderId: currentParticipant.id,
      leaderName: currentParticipant.name,
      leaderEmail: currentParticipant.email,
      members: [
        {
          id: currentParticipant.id,
          name: currentParticipant.name,
          email: currentParticipant.email,
          role: 'Leader',
          skills: currentParticipant.skills,
          isCheckin: currentParticipant.checkInStatus,
        },
      ],
      isLocked: false,
      submissionStatus: 'not_started',
      createdAt: new Date().toISOString(),
    };

    setTeams((prev) => [newTeam, ...prev]);
    setApplications((prev) =>
      prev.map((app) =>
        app.id === currentParticipant.id ? { ...app, teamId: newTeamId, teamName: teamName } : app
      )
    );
    showToast('success', `Team "${teamName}" created! Team Code: ${teamCode}`, 'Team Created');
    return newTeam;
  };

  const joinTeamWithCode = (code: string): boolean => {
    const normalized = code.trim().toUpperCase();
    const foundTeam = teams.find((t) => t.code.toUpperCase() === normalized);

    if (!foundTeam) {
      showToast('error', `Team code "${code}" not found. Please verify with your leader.`, 'Invalid Code');
      return false;
    }

    if (foundTeam.members.length >= 4) {
      showToast('error', `Team "${foundTeam.name}" has reached the maximum capacity of 4 members.`, 'Team Full');
      return false;
    }

    if (foundTeam.members.some((m) => m.id === currentParticipant.id)) {
      showToast('info', 'You are already a member of this team.', 'Already Joined');
      return true;
    }

    const updatedMembers = [
      ...foundTeam.members,
      {
        id: currentParticipant.id,
        name: currentParticipant.name,
        email: currentParticipant.email,
        role: 'Member' as const,
        skills: currentParticipant.skills,
        isCheckin: currentParticipant.checkInStatus,
      },
    ];

    setTeams((prev) =>
      prev.map((t) => (t.id === foundTeam.id ? { ...t, members: updatedMembers } : t))
    );

    setApplications((prev) =>
      prev.map((app) =>
        app.id === currentParticipant.id
          ? { ...app, teamId: foundTeam.id, teamName: foundTeam.name }
          : app
      )
    );

    showToast('success', `You have successfully joined "${foundTeam.name}"!`, 'Joined Team');
    return true;
  };

  // Problem Selection
  const selectProblemStatement = (problemId: string): boolean => {
    if (!currentTeam) {
      showToast('error', 'You must create or join a team first before selecting a problem statement.', 'No Team Found');
      return false;
    }

    const problem = problemStatements.find((p) => p.id === problemId);
    if (!problem) return false;

    if (problem.selectedTeamsCount >= problem.maxTeams) {
      showToast('error', `Problem ${problem.id} has reached its allocation limit (${problem.maxTeams} teams).`, 'Allocation Full');
      return false;
    }

    setTeams((prev) =>
      prev.map((t) =>
        t.id === currentTeam.id
          ? {
              ...t,
              problemStatementId: problem.id,
              problemTitle: problem.title,
              isLocked: true,
            }
          : t
      )
    );

    setProblemStatements((prev) =>
      prev.map((p) =>
        p.id === problemId ? { ...p, selectedTeamsCount: p.selectedTeamsCount + 1 } : p
      )
    );

    showToast('success', `Locked Problem Statement [${problem.id}] for Team ${currentTeam.name}!`, 'Problem Selected');
    return true;
  };

  // Project Submission
  const submitProject = (data: Partial<ProjectSubmission>): boolean => {
    if (!currentTeam) {
      showToast('error', 'Team not found for submission.', 'Error');
      return false;
    }

    const submissionId = currentTeam.submissionId || `SUB-${submissions.length + 1}`;
    const newSubmission: ProjectSubmission = {
      id: submissionId,
      teamId: currentTeam.id,
      teamName: currentTeam.name,
      problemId: currentTeam.problemStatementId || 'PS-01',
      problemTitle: currentTeam.problemTitle || 'General Track',
      track: 'AI & Machine Learning',
      title: data.title || 'Untitled Project',
      tagline: data.tagline || 'Next-generation software solution',
      description: data.description || 'Comprehensive project built during NexHack 2026.',
      techStack: data.techStack || ['React', 'Python', 'FastAPI'],
      githubUrl: data.githubUrl || 'https://github.com/team/project',
      demoUrl: data.demoUrl || 'https://demo.project.app',
      videoUrl: data.videoUrl || 'https://youtube.com/watch?v=demo',
      presentationUrl: data.presentationUrl || 'https://pitch.com/deck',
      screenshotUrls: data.screenshotUrls || [],
      submittedAt: new Date().toISOString(),
      status: 'submitted',
      declarationAccepted: true,
    };

    setSubmissions((prev) => {
      const filtered = prev.filter((s) => s.id !== submissionId);
      return [newSubmission, ...filtered];
    });

    setTeams((prev) =>
      prev.map((t) =>
        t.id === currentTeam.id ? { ...t, submissionId, submissionStatus: 'submitted' } : t
      )
    );

    showToast('success', `Project "${newSubmission.title}" submitted successfully! Assigned for judging.`, 'Submission Locked');
    return true;
  };

  // Event Check-In
  const checkInParticipant = (
    identifier: string
  ): { success: boolean; message: string; applicant?: ParticipantApplication } => {
    const query = identifier.trim().toLowerCase();
    const applicant = applications.find(
      (a) =>
        a.participantId.toLowerCase() === query ||
        a.id.toLowerCase() === query ||
        a.usn.toLowerCase() === query ||
        a.name.toLowerCase().includes(query) ||
        a.email.toLowerCase() === query
    );

    if (!applicant) {
      return { success: false, message: `No registered participant found matching "${identifier}".` };
    }

    if (applicant.checkInStatus) {
      return {
        success: false,
        message: `${applicant.name} (${applicant.participantId}) was ALREADY checked in at ${new Date(applicant.checkedInAt || '').toLocaleTimeString()}!`,
        applicant,
      };
    }

    if (applicant.paymentStatus !== 'verified') {
      return {
        success: false,
        message: `Check-in blocked: Payment status is ${applicant.paymentStatus.toUpperCase()}. Collect ₹500 fee or verify payment first.`,
        applicant,
      };
    }

    const timestamp = new Date().toISOString();
    setApplications((prev) =>
      prev.map((a) => (a.id === applicant.id ? { ...a, checkInStatus: true, checkedInAt: timestamp } : a))
    );

    showToast('success', `Checked in: ${applicant.name} [${applicant.participantId}]`, 'Check-In Complete');
    return {
      success: true,
      message: `Check-in verified successfully for ${applicant.name}. Badge printing queued.`,
      applicant: { ...applicant, checkInStatus: true, checkedInAt: timestamp },
    };
  };

  // Judging Evaluations
  const submitJudgeEvaluation = (evalData: Partial<Evaluation>): boolean => {
    const evalId = evalData.id || `EVAL-${evaluations.length + 1}`;
    const scores = evalData.scores || {
      innovation: 18,
      technical: 23,
      relevance: 18,
      ux: 14,
      scalability: 9,
      presentation: 9,
      total: 91,
    };

    const newEval: Evaluation = {
      id: evalId,
      judgeId: evalData.judgeId || currentJudge.id,
      judgeName: evalData.judgeName || currentJudge.name,
      submissionId: evalData.submissionId || 'SUB-01',
      teamId: evalData.teamId || 'TEAM-01',
      scores,
      comments: evalData.comments || 'Evaluated successfully.',
      status: 'submitted',
      evaluatedAt: new Date().toISOString(),
    };

    setEvaluations((prev) => {
      const filtered = prev.filter(
        (e) => !(e.judgeId === newEval.judgeId && e.submissionId === newEval.submissionId)
      );
      return [newEval, ...filtered];
    });

    showToast('success', `Evaluation submitted! Final score: ${scores.total}/100`, 'Evaluation Saved');
    return true;
  };

  const togglePublishResults = () => {
    const newState = !settings.isResultsPublished;
    setSettings((prev) => ({ ...prev, isResultsPublished: newState }));
    if (newState) {
      showToast('success', '🏆 NexHack 2026 Results & Leaderboard are now PUBLIC to all participants!', 'Results Published');
      navigate('/results');
    } else {
      showToast('warning', 'Leaderboard and winners hidden from public view.', 'Results Un-published');
    }
  };

  const assignWinner = (winner: WinnerEntry) => {
    setWinners((prev) => {
      const filtered = prev.filter((w) => w.category !== winner.category);
      return [...filtered, winner];
    });
    showToast('success', `Assigned ${winner.teamName} to "${winner.category}"`, 'Winner Selected');
  };

  const broadcastAnnouncement = (
    title: string,
    message: string,
    category: 'general' | 'urgent' | 'schedule' | 'results'
  ) => {
    const newAnn: Announcement = {
      id: `ANN-${announcements.length + 1}`,
      title,
      message,
      category,
      timestamp: new Date().toISOString(),
      author: 'Organizer Command Center',
    };
    setAnnouncements((prev) => [newAnn, ...prev]);
    showToast('info', `Broadcasted: "${title}"`, 'Live Announcement');
  };

  const sendSimulatedEmails = (templateId: string, targetCount: number) => {
    const template = emailTemplates.find((t) => t.id === templateId);
    showToast(
      'success',
      `${targetCount} emails queued for dispatch using template "${template?.name || 'Notification'}".`,
      'Email Batch Queued'
    );
  };

  const updateParticipantProfile = (data: Partial<ParticipantApplication>) => {
    setApplications((prev) =>
      prev.map((app) => (app.id === currentParticipant.id ? { ...app, ...data } : app))
    );
    addActivityLog({
      user: currentParticipant.name,
      role: 'Participant',
      action: 'Updated profile information and project portfolio',
      targetId: currentParticipant.id,
      category: 'system',
    });
    showToast('success', 'Participant profile updated successfully.', 'Profile Saved');
  };

  const promoteWaitlistedApplicants = (count = 23) => {
    const waitlisted = applications.filter((a) => a.status === 'waitlisted');
    const toPromote = waitlisted.slice(0, count);
    const promoteIds = new Set(toPromote.map((a) => a.id));

    setApplications((prev) =>
      prev.map((app) => {
        if (promoteIds.has(app.id)) {
          return {
            ...app,
            status: 'selected',
            paymentStatus: 'pending',
            reviewerNotes: 'Promoted from waitlist to fill unclaimed seat.',
          };
        }
        return app;
      })
    );

    addActivityLog({
      user: 'Event Admin',
      role: 'Super Admin',
      action: `Released unclaimed seats and promoted ${toPromote.length} waitlisted applicants`,
      targetId: 'WAITLIST_BATCH',
      category: 'screening',
    });

    showToast('success', `Promoted ${toPromote.length} waitlisted candidates to Selected (Payment Pending)!`, 'Seats Reallocated');
  };

  const addMentorRequest = (data: Partial<MentorRequest>): string => {
    const id = `HELP-${Math.floor(100 + Math.random() * 900)}`;
    const newReq: MentorRequest = {
      id,
      teamId: currentTeam?.id || 'team-01',
      teamName: currentTeam?.name || 'Team Neural Ninjas',
      category: data.category || 'Technical',
      title: data.title || 'Technical help requested',
      description: data.description || 'Details provided by team.',
      urgency: data.urgency || 'Normal',
      status: 'Waiting',
      createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      waitingMinutes: 1,
    };
    setMentorRequests((prev) => [newReq, ...prev]);
    addActivityLog({
      user: currentParticipant.name,
      role: 'Participant',
      action: `Raised mentor request ${id} (${newReq.category}: ${newReq.title})`,
      targetId: id,
      category: 'operation',
    });
    showToast('success', `Help request ${id} submitted! A mentor has been alerted.`, 'Request Logged');
    return id;
  };

  const updateMentorRequestStatus = (id: string, status: MentorRequest['status'], assignedMentor?: string) => {
    setMentorRequests((prev) =>
      prev.map((r) =>
        r.id === id
          ? {
              ...r,
              status,
              assignedMentor: assignedMentor !== undefined ? assignedMentor : r.assignedMentor,
              resolvedAt: status === 'Resolved' ? new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : r.resolvedAt,
            }
          : r
      )
    );
    addActivityLog({
      user: 'Operations Lead',
      role: 'Organizer',
      action: `Updated request ${id} status to ${status}${assignedMentor ? ` (Assigned: ${assignedMentor})` : ''}`,
      targetId: id,
      category: 'operation',
    });
    showToast('info', `Request ${id} marked as ${status}`, 'Status Updated');
  };

  const addOperationalIssue = (issue: Partial<OperationalIssue>) => {
    const id = `ISSUE-${Math.floor(10 + Math.random() * 90)}`;
    const newIssue: OperationalIssue = {
      id,
      title: issue.title || 'Incident logged',
      category: issue.category || 'Infrastructure',
      priority: issue.priority || 'Medium',
      status: issue.status || 'Open',
      assignedTo: issue.assignedTo || 'Volunteer Crew',
      location: issue.location,
      notes: issue.notes,
      createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    setOperationalIssues((prev) => [newIssue, ...prev]);
    addActivityLog({
      user: 'Facilities Lead',
      role: 'Coordinator',
      action: `Logged incident ${id}: ${newIssue.title} (${newIssue.priority})`,
      targetId: id,
      category: 'operation',
    });
    showToast('warning', `Incident ${id} logged: "${newIssue.title}"`, 'Operational Issue Created');
  };

  const updateOperationalIssueStatus = (id: string, status: OperationalIssue['status']) => {
    setOperationalIssues((prev) =>
      prev.map((i) =>
        i.id === id
          ? {
              ...i,
              status,
              resolvedAt: status === 'Resolved' ? new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : i.resolvedAt,
            }
          : i
      )
    );
    addActivityLog({
      user: 'Operations Desk',
      role: 'Coordinator',
      action: `Resolved operational issue ${id}`,
      targetId: id,
      category: 'operation',
    });
    showToast('success', `Issue ${id} updated to ${status}`, 'Issue Updated');
  };

  const addActivityLog = (entry: Omit<ActivityLogEntry, 'id' | 'timestamp'>) => {
    const id = `ACT-${Math.floor(100 + Math.random() * 900)}`;
    const now = new Date();
    const timestamp = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const logItem: ActivityLogEntry = { id, timestamp, ...entry };
    setActivityLogs((prev) => [logItem, ...prev]);
  };

  const generateCertificates = (_categoryIds: string[]) => {
    addActivityLog({
      user: 'Certificates Coordinator',
      role: 'Coordinator',
      action: 'Batch generated 421 cryptographically verified certificates',
      targetId: 'CERT-BATCH',
      category: 'system',
    });
    showToast('success', 'Generated 421 official digital certificates with verification hashes.', 'Certificates Ready');
  };

  const updateSettings = (newSettings: Partial<EventSettings>) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));
    showToast('success', 'Event settings updated successfully.', 'Settings Saved');
  };

  const createNewHackathon = (newEvent: Partial<HackathonEvent>, duplicateFromId?: string) => {
    const id = `EVT-${newEvent.year || 2027}`;
    const sourceEvent = duplicateFromId ? events.find((e) => e.id === duplicateFromId) : undefined;

    const eventRecord: HackathonEvent = {
      id,
      name: newEvent.name || 'NexHack 2027',
      year: newEvent.year || 2027,
      college: newEvent.college || 'XYZ Institute of Technology',
      status: 'active',
      dates: newEvent.dates || 'October 2027',
      venue: newEvent.venue || 'Main Campus',
      participantLimit: newEvent.participantLimit || 600,
      prizePool: newEvent.prizePool || '₹1,50,000',
      teamsCount: 0,
      submissionsCount: 0,
    };

    setEvents((prev) => [eventRecord, ...prev]);
    addActivityLog({
      user: 'Super Admin',
      role: 'Super Admin',
      action: `Created new hackathon edition ${eventRecord.name} (cloned settings from ${sourceEvent?.name || 'template'})`,
      targetId: id,
      category: 'system',
    });
    showToast(
      'success',
      `Created ${eventRecord.name}! ${sourceEvent ? `Cloned rules, tracks, and rubrics from ${sourceEvent.name}.` : ''}`,
      'New Hackathon Initialized'
    );
  };

  const deleteEventData = (mode: 'participants_only' | 'all') => {
    if (mode === 'participants_only') {
      setApplications([]);
      setTeams([]);
      setSubmissions([]);
      setEvaluations([]);
      localStorage.removeItem('hackflow_applications');
      localStorage.removeItem('hackflow_teams');
      localStorage.removeItem('hackflow_submissions');
      localStorage.removeItem('hackflow_evaluations');
      showToast('warning', 'All participant profiles, teams, and submissions cleared.', 'Participant Data Deleted');
    } else {
      localStorage.clear();
      setApplications([]);
      setTeams([]);
      setSubmissions([]);
      setEvaluations([]);
      setWinners([]);
      showToast('error', 'All event datasets deleted from database.', 'Event Wiped');
    }
  };

  const resetAllData = () => {
    localStorage.clear();
    setApplications(initialApplications);
    setTeams(initialTeams);
    setProblemStatements(initialProblemStatements);
    setSubmissions(initialSubmissions);
    setJudges(initialJudges);
    setEvaluations(initialEvaluations);
    setWinners(initialWinners);
    setAnnouncements(initialAnnouncements);
    setSettings(initialEventSettings);
    setMentorRequests(initialMentorRequests);
    setOperationalIssues(initialOperationalIssues);
    setActivityLogs(initialActivityLogs);
    showToast('success', 'Restored pristine college hackathon demo datasets.', 'State Reset');
  };

  return (
    <HackathonContext.Provider
      value={{
        currentRoute,
        navigate,
        currentPersona,
        setPersona,
        currentRole,
        currentParticipant,
        currentTeam,
        currentJudge,
        lifecycleStage,
        setLifecycleStage,
        applications,
        teams,
        problemStatements,
        submissions,
        judges,
        evaluations,
        winners,
        announcements,
        emailTemplates,
        events,
        settings,
        mentorRequests,
        operationalIssues,
        activityLogs,
        certificateCategories,
        whatsappTemplates,
        selectedApplicant,
        setSelectedApplicant,
        toasts,
        showToast,
        removeToast,
        updateApplicationStatus,
        bulkUpdateApplications,
        registerParticipant,
        updateParticipantProfile,
        simulatePayment,
        verifyPaymentManually,
        promoteWaitlistedApplicants,
        createTeam,
        joinTeamWithCode,
        selectProblemStatement,
        submitProject,
        checkInParticipant,
        submitJudgeEvaluation,
        togglePublishResults,
        assignWinner,
        broadcastAnnouncement,
        sendSimulatedEmails,
        addMentorRequest,
        updateMentorRequestStatus,
        addOperationalIssue,
        updateOperationalIssueStatus,
        addActivityLog,
        generateCertificates,
        updateSettings,
        createNewHackathon,
        deleteEventData,
        resetAllData,
      }}
    >
      {children}
    </HackathonContext.Provider>
  );
};

export const useHackathon = () => {
  const context = useContext(HackathonContext);
  if (!context) {
    throw new Error('useHackathon must be used within a HackathonProvider');
  }
  return context;
};
