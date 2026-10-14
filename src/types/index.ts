export type UserRole = 'participant' | 'organizer' | 'judge' | 'superadmin';

export type DemoPersona =
  | 'participant_under_review'
  | 'participant_payment_pending'
  | 'participant_registered'
  | 'participant_hackathon_live'
  | 'participant_selected_paid'
  | 'organizer'
  | 'judge'
  | 'superadmin';

export type LifecycleStage =
  | 'registration_open'
  | 'screening_active'
  | 'payment_active'
  | 'teams_and_problems'
  | 'hackathon_live'
  | 'judging_active'
  | 'results_published';

export type ApplicationStatus = 'pending' | 'selected' | 'waitlisted' | 'rejected';
export type PaymentStatus = 'unpaid' | 'pending' | 'paid' | 'verified';
export type SubmissionStatus = 'not_started' | 'draft' | 'submitted' | 'locked';

export interface ApplicantScore {
  technical: number;
  experience: number;
  projects: number;
  motivation: number;
  total: number;
}

export interface ParticipantApplication {
  id: string; // e.g., 'NXH26-1042'
  participantId: string; // e.g., 'NXH-P-0421'
  name: string;
  email: string;
  phone: string;
  college: string;
  usn: string;
  degree: string;
  department: string;
  year: string;
  gradYear: string;
  github: string;
  linkedin: string;
  portfolio?: string;
  skills: string[];
  previousHackathons: number;
  projectsSummary: string;
  motivation: string;
  resumeFileName?: string;
  status: ApplicationStatus;
  scores: ApplicantScore;
  reviewerNotes?: string;
  reviewerName?: string;
  reviewedAt?: string;
  paymentStatus: PaymentStatus;
  transactionId?: string;
  paidAt?: string;
  checkInStatus: boolean;
  checkedInAt?: string;
  teamId?: string;
  teamName?: string;
  createdAt: string;
}

export interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: 'Leader' | 'Member';
  skills: string[];
  isCheckin?: boolean;
}

export interface Team {
  id: string;
  code: string; // e.g. 'NXH-7K82P'
  name: string;
  leaderId: string;
  leaderName: string;
  leaderEmail: string;
  members: TeamMember[];
  problemStatementId?: string;
  problemTitle?: string;
  isLocked: boolean;
  submissionId?: string;
  submissionStatus: SubmissionStatus;
  createdAt: string;
}

export interface ProblemStatement {
  id: string; // e.g. 'PS-01'
  title: string;
  track: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  description: string;
  background: string;
  expectedOutcome: string;
  constraints: string[];
  resources: string[];
  sponsor: string;
  maxTeams: number;
  selectedTeamsCount: number;
  status: 'open' | 'paused' | 'closed';
}

export interface ProjectSubmission {
  id: string;
  teamId: string;
  teamName: string;
  problemId: string;
  problemTitle: string;
  track: string;
  title: string;
  tagline: string;
  description: string;
  techStack: string[];
  githubUrl: string;
  demoUrl: string;
  videoUrl: string;
  presentationUrl: string;
  screenshotUrls: string[];
  submittedAt: string;
  status: SubmissionStatus;
  declarationAccepted: boolean;
}

export interface Judge {
  id: string;
  name: string;
  email: string;
  organization: string;
  designation: string;
  expertise: string;
  track: string;
  assignedProjectIds: string[];
  avatar?: string;
}

export interface EvaluationScores {
  innovation: number; // /20
  technical: number; // /25
  relevance: number; // /20
  ux: number; // /15
  scalability: number; // /10
  presentation: number; // /10
  total: number; // /100
}

export interface Evaluation {
  id: string;
  judgeId: string;
  judgeName: string;
  submissionId: string;
  teamId: string;
  scores: EvaluationScores;
  comments: string;
  status: 'draft' | 'submitted';
  evaluatedAt: string;
}

export interface Announcement {
  id: string;
  title: string;
  message: string;
  category: 'general' | 'urgent' | 'schedule' | 'results';
  timestamp: string;
  author: string;
}

export interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  body: string;
  description: string;
  triggerEvent: string;
}

export interface HackathonEvent {
  id: string;
  name: string;
  year: number;
  college: string;
  status: 'active' | 'completed' | 'archived';
  dates: string;
  venue: string;
  participantLimit: number;
  prizePool: string;
  teamsCount: number;
  submissionsCount: number;
}

export interface WinnerEntry {
  id: string;
  category: string;
  teamId: string;
  teamName: string;
  projectName: string;
  score: number;
  members: string[];
  track: string;
  prize: string;
  badge: string;
  description: string;
}

export interface EventSettings {
  eventName: string;
  collegeName: string;
  dates: string;
  venue: string;
  registrationOpenDate: string;
  registrationCloseDate: string;
  maxParticipants: number;
  teamMinSize: number;
  teamMaxSize: number;
  paymentAmount: number;
  paymentDeadline: string;
  problemSelectionDeadline: string;
  submissionDeadline: string;
  judgingStartTime: string;
  resultsPublishTime: string;
  isResultsPublished: boolean;
  isSubmissionLocked: boolean;
  allowProblemChanges: boolean;
}

export interface MentorRequest {
  id: string; // e.g. 'HELP-042'
  teamId: string;
  teamName: string;
  category: 'Technical' | 'Problem Statement' | 'Hardware' | 'Infrastructure' | 'Organizer' | 'Other';
  title: string;
  description: string;
  urgency: 'Normal' | 'Urgent';
  status: 'Waiting' | 'Assigned' | 'In Progress' | 'Resolved';
  assignedMentor?: string;
  createdAt: string;
  waitingMinutes: number;
  resolvedAt?: string;
}

export interface OperationalIssue {
  id: string; // e.g. 'ISSUE-01'
  title: string;
  category: 'Infrastructure' | 'AV' | 'Logistics' | 'Network' | 'Mentorship' | 'Other';
  priority: 'Low' | 'Medium' | 'High' | 'Critical';
  status: 'Open' | 'Assigned' | 'In Progress' | 'Resolved';
  assignedTo: string;
  location?: string;
  notes?: string;
  createdAt: string;
  resolvedAt?: string;
}

export interface ActivityLogEntry {
  id: string;
  timestamp: string;
  user: string;
  role: string;
  action: string;
  targetId?: string;
  category: 'screening' | 'payment' | 'team' | 'problem' | 'judging' | 'operation' | 'system';
}

export interface CertificateCategory {
  id: string;
  name: string;
  count: number;
  selected: boolean;
  description: string;
}

export interface WhatsAppTemplate {
  id: string;
  title: string;
  targetAudience: string;
  description: string;
  templateText: string;
  variables: string[];
}

