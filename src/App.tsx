import React, { useEffect } from 'react';
import { useHackathon } from './context/HackathonContext';
import { DemoSwitcher } from './components/layout/DemoSwitcher';
import { ToastContainer } from './components/ui/Toast';

// 5 Distinct Application Layouts
import { PublicLayout } from './layouts/PublicLayout';
import { ParticipantLayout } from './layouts/ParticipantLayout';
import { CoordinatorLayout } from './layouts/CoordinatorLayout';
import { JudgeLayout } from './layouts/JudgeLayout';
import { SuperAdminLayout } from './layouts/SuperAdminLayout';

// Public Pages
import { LandingPage } from './pages/public/LandingPage';
import { ResultsPage } from './pages/public/ResultsPage';
import { LoginPage } from './pages/public/LoginPage';

// Participant Pages
import { RegistrationWizard } from './pages/participant/RegistrationWizard';
import { ParticipantDashboard } from './pages/participant/ParticipantDashboard';
import { TeamPage } from './pages/participant/TeamPage';
import { ProblemStatementsPage } from './pages/participant/ProblemStatementsPage';
import { ProjectSubmissionPage } from './pages/participant/ProjectSubmissionPage';
import { HelpDeskPage } from './pages/participant/HelpDeskPage';
import { ProfilePage } from './pages/participant/ProfilePage';

// Coordinator / Organizer Pages
import { EventCommandCenter } from './pages/organizer/EventCommandCenter';
import { ApplicationScreeningPage } from './pages/organizer/ApplicationScreeningPage';
import { ParticipantManagementPage } from './pages/organizer/ParticipantManagementPage';
import { ParticipantDetailPage } from './pages/organizer/ParticipantDetailPage';
import { PaymentManagementPage } from './pages/organizer/PaymentManagementPage';
import { TeamManagementPage } from './pages/organizer/TeamManagementPage';
import { TeamDetailPage } from './pages/organizer/TeamDetailPage';
import { ProblemManagementPage } from './pages/organizer/ProblemManagementPage';
import { CheckinPage } from './pages/organizer/CheckinPage';
import { MentorRequestsPage } from './pages/organizer/MentorRequestsPage';
import { LiveOperationsPage } from './pages/organizer/LiveOperationsPage';
import { SubmissionManagementPage } from './pages/organizer/SubmissionManagementPage';
import { SubmissionDetailPage } from './pages/organizer/SubmissionDetailPage';
import { JudgeManagementPage } from './pages/organizer/JudgeManagementPage';
import { JudgingControlCenterPage } from './pages/organizer/JudgingControlCenterPage';
import { LeaderboardPage } from './pages/organizer/LeaderboardPage';
import { WinnerManagementPage } from './pages/organizer/WinnerManagementPage';
import { WhatsAppToolPage } from './pages/organizer/WhatsAppToolPage';
import { CommunicationPage } from './pages/organizer/CommunicationPage';
import { CertificatesPage } from './pages/organizer/CertificatesPage';
import { AnalyticsPage } from './pages/organizer/AnalyticsPage';
import { ActivityLogPage } from './pages/organizer/ActivityLogPage';
import { EventSettingsPage } from './pages/organizer/EventSettingsPage';
import { DataManagementPage } from './pages/organizer/DataManagementPage';

// Super Admin Pages
import { YearlyHackathonsPage } from './pages/superadmin/YearlyHackathonsPage';
import { PermissionsPage } from './pages/superadmin/PermissionsPage';

// Judge Pages
import { JudgeDashboard } from './pages/judge/JudgeDashboard';
import { EvaluationPage } from './pages/judge/EvaluationPage';

export const AppContent: React.FC = () => {
  const { currentRoute, currentRole, navigate } = useHackathon();

  // Role Access Guard (#57)
  useEffect(() => {
    if (currentRole === 'participant') {
      if (
        currentRoute.startsWith('/admin') ||
        currentRoute.startsWith('/judge') ||
        currentRoute.startsWith('/superadmin')
      ) {
        navigate('/dashboard');
      }
    } else if (currentRole === 'judge') {
      if (currentRoute.startsWith('/admin') || currentRoute.startsWith('/superadmin')) {
        navigate('/judge');
      }
    } else if (currentRole === 'organizer') {
      if (currentRoute.startsWith('/superadmin')) {
        navigate('/admin');
      }
    }
  }, [currentRoute, currentRole, navigate]);

  // Render appropriate view wrapped inside its dedicated layout
  const renderCurrentPage = () => {
    // 1. PUBLIC ROUTES
    if (currentRoute === '/') {
      return (
        <PublicLayout>
          <LandingPage />
        </PublicLayout>
      );
    }
    if (currentRoute === '/register') {
      return (
        <PublicLayout>
          <RegistrationWizard />
        </PublicLayout>
      );
    }
    if (currentRoute === '/results') {
      return (
        <PublicLayout>
          <ResultsPage />
        </PublicLayout>
      );
    }
    if (currentRoute === '/login') {
      return (
        <PublicLayout>
          <LoginPage />
        </PublicLayout>
      );
    }
    if (currentRoute.startsWith('/problems') && currentRole !== 'participant') {
      return (
        <PublicLayout>
          <ProblemStatementsPage />
        </PublicLayout>
      );
    }

    // 2. PARTICIPANT ROUTES
    if (currentRoute === '/dashboard' || currentRoute === '/payment') {
      return (
        <ParticipantLayout>
          <ParticipantDashboard />
        </ParticipantLayout>
      );
    }
    if (currentRoute === '/team') {
      return (
        <ParticipantLayout>
          <TeamPage />
        </ParticipantLayout>
      );
    }
    if (currentRoute.startsWith('/problems')) {
      return (
        <ParticipantLayout>
          <ProblemStatementsPage />
        </ParticipantLayout>
      );
    }
    if (currentRoute === '/help') {
      return (
        <ParticipantLayout>
          <HelpDeskPage />
        </ParticipantLayout>
      );
    }
    if (currentRoute === '/submit') {
      return (
        <ParticipantLayout>
          <ProjectSubmissionPage />
        </ParticipantLayout>
      );
    }
    if (currentRoute === '/profile') {
      return (
        <ParticipantLayout>
          <ProfilePage />
        </ParticipantLayout>
      );
    }

    // 3. JUDGE ROUTES
    if (currentRoute === '/judge') {
      return (
        <JudgeLayout>
          <JudgeDashboard />
        </JudgeLayout>
      );
    }
    if (currentRoute.startsWith('/judge/project/')) {
      const id = currentRoute.replace('/judge/project/', '');
      return (
        <JudgeLayout>
          <EvaluationPage projectId={id} />
        </JudgeLayout>
      );
    }

    // 4. SUPER ADMIN ROUTES
    if (currentRoute === '/superadmin/events') {
      return (
        <SuperAdminLayout>
          <YearlyHackathonsPage />
        </SuperAdminLayout>
      );
    }

    // 5. COORDINATOR / ORGANIZER ROUTES (/admin/*)
    if (currentRoute === '/admin') {
      return (
        <CoordinatorLayout>
          <EventCommandCenter />
        </CoordinatorLayout>
      );
    }
    if (currentRoute === '/admin/applications') {
      return (
        <CoordinatorLayout>
          <ApplicationScreeningPage />
        </CoordinatorLayout>
      );
    }
    if (currentRoute === '/admin/participants') {
      return (
        <CoordinatorLayout>
          <ParticipantManagementPage />
        </CoordinatorLayout>
      );
    }
    if (currentRoute.startsWith('/admin/participants/')) {
      const id = currentRoute.replace('/admin/participants/', '');
      return (
        <CoordinatorLayout>
          <ParticipantDetailPage participantId={id} />
        </CoordinatorLayout>
      );
    }
    if (currentRoute === '/admin/payments') {
      return (
        <CoordinatorLayout>
          <PaymentManagementPage />
        </CoordinatorLayout>
      );
    }
    if (currentRoute === '/admin/teams') {
      return (
        <CoordinatorLayout>
          <TeamManagementPage />
        </CoordinatorLayout>
      );
    }
    if (currentRoute.startsWith('/admin/teams/')) {
      const id = currentRoute.replace('/admin/teams/', '');
      return (
        <CoordinatorLayout>
          <TeamDetailPage teamId={id} />
        </CoordinatorLayout>
      );
    }
    if (currentRoute === '/admin/problems') {
      return (
        <CoordinatorLayout>
          <ProblemManagementPage />
        </CoordinatorLayout>
      );
    }
    if (currentRoute === '/admin/checkin') {
      return (
        <CoordinatorLayout>
          <CheckinPage />
        </CoordinatorLayout>
      );
    }
    if (currentRoute === '/admin/mentor-requests') {
      return (
        <CoordinatorLayout>
          <MentorRequestsPage />
        </CoordinatorLayout>
      );
    }
    if (currentRoute === '/admin/operations') {
      return (
        <CoordinatorLayout>
          <LiveOperationsPage />
        </CoordinatorLayout>
      );
    }
    if (currentRoute === '/admin/submissions') {
      return (
        <CoordinatorLayout>
          <SubmissionManagementPage />
        </CoordinatorLayout>
      );
    }
    if (currentRoute.startsWith('/admin/submissions/')) {
      const id = currentRoute.replace('/admin/submissions/', '');
      return (
        <CoordinatorLayout>
          <SubmissionDetailPage submissionId={id} />
        </CoordinatorLayout>
      );
    }
    if (currentRoute === '/admin/judges') {
      return (
        <CoordinatorLayout>
          <JudgeManagementPage />
        </CoordinatorLayout>
      );
    }
    if (currentRoute === '/admin/judging') {
      return (
        <CoordinatorLayout>
          <JudgingControlCenterPage />
        </CoordinatorLayout>
      );
    }
    if (currentRoute === '/admin/leaderboard') {
      return (
        <CoordinatorLayout>
          <LeaderboardPage />
        </CoordinatorLayout>
      );
    }
    if (currentRoute === '/admin/winners') {
      return (
        <CoordinatorLayout>
          <WinnerManagementPage />
        </CoordinatorLayout>
      );
    }
    if (currentRoute === '/admin/whatsapp') {
      return (
        <CoordinatorLayout>
          <WhatsAppToolPage />
        </CoordinatorLayout>
      );
    }
    if (currentRoute === '/admin/communication') {
      return (
        <CoordinatorLayout>
          <CommunicationPage />
        </CoordinatorLayout>
      );
    }
    if (currentRoute === '/admin/certificates') {
      return (
        <CoordinatorLayout>
          <CertificatesPage />
        </CoordinatorLayout>
      );
    }
    if (currentRoute === '/admin/analytics') {
      return (
        <CoordinatorLayout>
          <AnalyticsPage />
        </CoordinatorLayout>
      );
    }
    if (currentRoute === '/admin/activity') {
      return (
        <CoordinatorLayout>
          <ActivityLogPage />
        </CoordinatorLayout>
      );
    }
    if (currentRoute === '/admin/permissions') {
      return (
        <CoordinatorLayout>
          <PermissionsPage />
        </CoordinatorLayout>
      );
    }
    if (currentRoute === '/admin/settings') {
      return (
        <CoordinatorLayout>
          <EventSettingsPage />
        </CoordinatorLayout>
      );
    }
    if (currentRoute === '/admin/data') {
      return (
        <CoordinatorLayout>
          <DataManagementPage />
        </CoordinatorLayout>
      );
    }

    // Default Fallback
    return (
      <PublicLayout>
        <LandingPage />
      </PublicLayout>
    );
  };

  return (
    <div className="min-h-screen bg-[#09090b] text-[#fafafa] flex flex-col font-sans">
      {/* Pinned Top Demo Persona Switcher */}
      <DemoSwitcher />

      {/* Role-Specific Layout & Content */}
      <div className="flex-1 w-full min-w-0">{renderCurrentPage()}</div>

      {/* Global Interactive Toast Notification Stack */}
      <ToastContainer />
    </div>
  );
};

export default function App() {
  return <AppContent />;
}

devDependencies": {
    "@types/node": "^24.13.3",
    "@types/react": "^19.2.18",
    "@types/react-dom": "^19.2.7",
    "@vitejs/plugin-react": "^6.1.1",
    "oxlint": "^1.81.0",
    "typescript": "~6.0.2",
    "vite": "^8.3.0"
  }