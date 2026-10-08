import React, { useState } from 'react';
import { AdminNavItem, CANONICAL_ADMIN_NAV, ScreenId } from '../../../types/navigation';
import { BrandLogo, TR_THEINT_LOGO_URL } from '../../navigation/BrandLogo';
import { AdminOneOnOneView } from './AdminOneOnOneView';
import { SharedCalendarWorkspace } from '../../calendar/SharedCalendarWorkspace';

interface AdminPortalScreenProps {
  onNavigateScreen?: (screenId: ScreenId) => void;
  showSpecGuides?: boolean;
}

interface PaymentSlip {
  id: string;
  name: string;
  avatar: string;
  avatarBg: string;
  type: string;
  course: string;
  method: string;
  ref: string;
  tier: string;
  time: string;
  status: 'pending' | 'verified' | 'rejected';
  amount?: string;
  note?: string;
}

interface ContentSubmission {
  id: string;
  title: string;
  badge: string;
  belongsTo: string;
  author: string;
  submitted: string;
  items: string;
  audioOrQuiz: string;
  status: 'pending' | 'approved' | 'revision';
}

interface StudentDecree {
  id: string;
  name: string;
  code: string;
  systemLevel: string;
  teacherRec: string;
  decreedLevel?: string;
}

export const AdminPortalScreen: React.FC<AdminPortalScreenProps> = ({
  onNavigateScreen,
  showSpecGuides = false,
}) => {
  const [activeNav, setActiveNav] = useState<AdminNavItem>('Dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [receiptModal, setReceiptModal] = useState<PaymentSlip | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Dynamic state for interactive queues
  const [paymentSlips, setPaymentSlips] = useState<PaymentSlip[]>([
    {
      id: 'slip-1',
      name: 'Daw Thuzar',
      avatar: 'DT',
      avatarBg: 'bg-[#964261]',
      type: 'Course Purchase',
      course: 'Practical Speaking Essentials (Level 2)',
      method: 'KBZ Pay',
      ref: '#849201',
      tier: 'Standard Cohort [Sample]',
      time: 'Today, 09:42 AM',
      status: 'pending',
    },
    {
      id: 'slip-2',
      name: 'Ko Min Thu',
      avatar: 'KM',
      avatarBg: 'bg-[#006685]',
      type: 'One-on-One Tutoring',
      course: 'Teaching Period: Executive Business English (1 Month)',
      method: 'Wave Pay',
      ref: '#293810',
      tier: '120,000 MMK [Sample]',
      time: 'Today, 08:15 AM',
      status: 'pending',
      note: 'Schedule Confirmed → Payment Submitted. Assigned: Teacher Theint',
    },
  ]);

  const [contentSubmissions, setContentSubmissions] = useState<ContentSubmission[]>([
    {
      id: 'sub-1',
      title: 'Module 4: Business Telephoning',
      badge: 'Level 2 (Inside Course)',
      belongsTo: 'Practical Speaking Essentials',
      author: 'Teacher Theint',
      submitted: 'Today, 10:15 AM',
      items: '6 Lessons • 14 Artifacts',
      audioOrQuiz: '12 Pronunciations',
      status: 'pending',
    },
    {
      id: 'sub-2',
      title: 'Module 3: Social Interactions',
      badge: 'Level 1 (Inside Course)',
      belongsTo: 'Daily Conversation Essentials',
      author: 'Teacher Theint',
      submitted: 'Yesterday, 04:30 PM',
      items: '4 Lessons • 8 Dialogues',
      audioOrQuiz: 'Complete (10 Qs)',
      status: 'pending',
    },
  ]);

  const [studentDecrees, setStudentDecrees] = useState<StudentDecree[]>([
    {
      id: 'dec-1',
      name: 'Aung Ko Ko',
      code: '#ST-9021',
      systemLevel: 'Level 1 (Elementary)',
      teacherRec: 'Level 2 (Fluency)',
      decreedLevel: undefined,
    },
    {
      id: 'dec-2',
      name: 'Hnin Theint',
      code: '#ST-8842',
      systemLevel: 'Level 2',
      teacherRec: 'Level 2 (Confirmed)',
      decreedLevel: undefined,
    },
  ]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const handleVerifyPayment = (slipId: string) => {
    setPaymentSlips((prev) =>
      prev.map((s) => (s.id === slipId ? { ...s, status: 'verified' } : s))
    );
    showToast('Payment verified successfully! Access token released.');
  };

  const handleRejectPayment = (slipId: string) => {
    setPaymentSlips((prev) =>
      prev.map((s) => (s.id === slipId ? { ...s, status: 'rejected' } : s))
    );
    showToast('Payment marked as rejected. Requested resubmission from learner.');
  };

  const handleApproveCurriculum = (subId: string) => {
    setContentSubmissions((prev) =>
      prev.map((c) => (c.id === subId ? { ...c, status: 'approved' } : c))
    );
    showToast('Curriculum approved and published to production curriculum tree!');
  };

  const handleReturnRevision = (subId: string) => {
    setContentSubmissions((prev) =>
      prev.map((c) => (c.id === subId ? { ...c, status: 'revision' } : c))
    );
    showToast('Returned to Teacher Theint draft workspace with revision notes.');
  };

  const handleDecreeLevel = (studentId: string, level: string) => {
    setStudentDecrees((prev) =>
      prev.map((d) => (d.id === studentId ? { ...d, decreedLevel: level } : d))
    );
    showToast(`Official Student Level decreed as ${level} with Admin digital stamp.`);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#fff8f8] text-[#22191b] font-['Nunito_Sans'] antialiased">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed top-24 right-6 z-50 bg-[#22191b] text-white text-xs px-5 py-3.5 rounded-2xl shadow-[0_8px_32px_rgba(244,143,177,0.35)] flex items-center gap-3 border border-[#f48fb1]/30 animate-fade-in font-['Quicksand'] font-bold">
          <span className="material-symbols-outlined text-[#f48fb1] text-[20px]">verified</span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Mobile Drawer Backdrop */}
      {mobileSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-xs z-40 lg:hidden"
          onClick={() => setMobileSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      <main className="max-w-[1440px] w-full mx-auto px-4 sm:px-6 lg:px-12 py-6 sm:py-8 space-y-8 flex-1 pb-28">
        {/* TOP ADMIN CONSOLE HEADER BAR (Identical to TeacherPortalScreen) */}
        <header
          className={`p-4 sm:p-5 rounded-3xl bg-white border border-[#fbeaec] shadow-[0_4px_16px_rgba(244,143,177,0.12)] flex items-center justify-between gap-4 relative transition-all ${
            showSpecGuides ? 'ring-2 ring-dashed ring-[#f48fb1]' : ''
          }`}
        >
          {showSpecGuides && (
            <div className="absolute -top-3 right-6 text-[10px] font-mono bg-[#f48fb1] text-white px-2.5 py-0.5 rounded-full z-50 pointer-events-none shadow-xs font-bold">
              Canonical Admin Console • Matched to Pastel Rainbow Academy Theme
            </div>
          )}

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setMobileSidebarOpen((prev) => !prev)}
              className="lg:hidden w-10 h-10 rounded-full border border-[#f5e4e7] bg-[#fff8f8] text-[#22191b] flex items-center justify-center cursor-pointer hover:bg-[#fff0f2] transition-colors"
              aria-label="Toggle Admin Navigation"
            >
              <span className="material-symbols-outlined text-[20px]">
                {mobileSidebarOpen ? 'close' : 'menu'}
              </span>
            </button>

            <BrandLogo
              onClick={() => {
                if (onNavigateScreen) {
                  onNavigateScreen('PUB-01-HOME');
                } else {
                  setActiveNav('Dashboard');
                }
              }}
              roleBadge="Control Master"
              showSpecGuides={showSpecGuides}
            />
          </div>

          {/* Center: Quick Section Indicator */}
          <div className="hidden md:flex items-center gap-2 text-xs font-['Quicksand'] font-bold">
            <span className="text-[#534247]">Admin Workspace</span>
            <span className="text-[#f5e4e7]">/</span>
            <span className="px-3 py-1 rounded-full bg-[#fff0f2] text-[#964261] border border-[#f5e4e7] shadow-2xs">
              {activeNav}
            </span>
          </div>

          {/* Center-Right: Search Input */}
          <div className="flex-1 max-w-xs mx-4 hidden xl:block">
            <div className="relative flex items-center">
              <span className="material-symbols-outlined absolute left-3 text-[#867277] text-[16px]">
                search
              </span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search courses, slips, users..."
                className="w-full h-8 pl-8 pr-3 rounded-full bg-[#fff8f8] border border-[#f5e4e7] text-xs text-[#22191b] placeholder:text-[#867277] focus:outline-none focus:border-[#f48fb1] focus:ring-1 focus:ring-[#f48fb1]/20 transition-all shadow-2xs font-['Quicksand']"
              />
            </div>
          </div>

          {/* Right: Quick Action Controls */}
          <div className="flex items-center gap-2.5 font-['Quicksand'] font-bold">
            {onNavigateScreen && (
              <button
                type="button"
                onClick={() => onNavigateScreen('PUB-01-HOME')}
                className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs text-[#964261] bg-[#fff0f2] hover:bg-[#ffe4e9] border border-[#f5e4e7] transition-colors cursor-pointer shadow-2xs"
              >
                <span className="material-symbols-outlined text-[15px] text-[#f48fb1]">arrow_back</span>
                <span>Public Site</span>
              </button>
            )}

            <button
              type="button"
              onClick={() => setActiveNav('One-on-One')}
              className="hidden sm:inline-flex px-3.5 py-2 rounded-full bg-[#fff0f2] hover:bg-[#ffe4e9] text-[#964261] text-xs transition-colors items-center gap-1.5 cursor-pointer border border-[#f5e4e7] shadow-2xs"
            >
              <span className="material-symbols-outlined text-[16px] text-[#f48fb1]">calendar_month</span>
              <span>1-on-1 Ops</span>
            </button>

            <button
              type="button"
              onClick={() => showToast('Emergency Notice Dispatched to all learner dashboards!')}
              className="px-3.5 py-2 rounded-full text-xs transition-colors flex items-center gap-1.5 cursor-pointer text-[#22191b] hover:bg-[#fff0f2] border border-[#f5e4e7] bg-[#fff8f8]"
              title="Administrative Notices"
            >
              <span className="material-symbols-outlined text-[16px]">notifications</span>
              <span className="hidden sm:inline">Alerts</span>
              <span className="px-1.5 py-0.2 text-[10px] font-bold rounded-full bg-[#ffe082] text-[#22191b]">
                3
              </span>
            </button>

            <div className="flex items-center gap-2 pl-2 pr-3 py-1 rounded-full bg-[#fff8f8] border border-[#f5e4e7] shadow-2xs">
              <div className="w-7 h-7 rounded-full bg-[#f48fb1] text-white flex items-center justify-center font-['Quicksand'] font-bold text-[11px] shadow-2xs">
                AD
              </div>
              <span className="text-xs text-[#22191b] hidden sm:inline">
                Admin
              </span>
            </div>
          </div>
        </header>

        {/* APPLICATION SHELL: 19-ITEM ADMIN SIDEBAR + MAIN CONTENT CANVAS */}
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* CANONICAL 19-ITEM ADMIN SIDEBAR */}
          <aside
            aria-label="Admin Primary Navigation"
            className={`${
              mobileSidebarOpen ? 'block' : 'hidden lg:block'
            } w-full lg:w-72 rounded-3xl bg-white border border-[#fbeaec] shadow-[0_4px_16px_rgba(244,143,177,0.12)] p-5 shrink-0 self-start animate-fade-in font-['Quicksand']`}
          >
            <div className="px-3 py-2 text-[11px] font-bold uppercase tracking-wider text-[#964261] flex items-center justify-between">
              <span>Operations Console</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#fff0f2] border border-[#f5e4e7] text-[#534247]">
                19 Tracks
              </span>
            </div>

            {/* Hierarchical Canonical Admin Navigation */}
            <nav className="mt-2 space-y-4">
              {Array.from(new Set(CANONICAL_ADMIN_NAV.map((item) => item.group))).map((groupName) => (
                <div key={groupName} className="space-y-1">
                  <span className="px-3 text-[10px] font-bold uppercase tracking-wider text-[#867277]">
                    {groupName}
                  </span>
                  <div className="space-y-1">
                    {CANONICAL_ADMIN_NAV.filter((item) => item.group === groupName).map(
                      ({ label, icon, badge }) => {
                        const isActive = activeNav === label;
                        return (
                          <button
                            key={label}
                            type="button"
                            onClick={() => {
                              setActiveNav(label);
                              setMobileSidebarOpen(false);
                            }}
                            className={`w-full px-3 py-2 rounded-2xl text-left text-xs font-bold flex items-center justify-between transition-all cursor-pointer ${
                              isActive
                                ? 'bg-[#fff0f2] text-[#964261] border border-[#f5e4e7] shadow-xs'
                                : 'text-[#534247] hover:bg-[#fff8f8] hover:text-[#22191b] border border-transparent'
                            }`}
                          >
                            <div className="flex items-center gap-2.5">
                              <span
                                className={`material-symbols-outlined text-[18px] ${
                                  isActive ? 'text-[#f48fb1]' : 'text-[#81d4fa]'
                                }`}
                              >
                                {icon}
                              </span>
                              <span>{label}</span>
                            </div>
                            {badge && (
                              <span
                                className={`px-2 py-0.5 text-[9px] font-bold rounded-full ${
                                  isActive
                                    ? 'bg-[#f48fb1] text-white shadow-2xs'
                                    : 'bg-[#fff0f2] text-[#964261] border border-[#f5e4e7]'
                                }`}
                              >
                                {badge}
                              </span>
                            )}
                          </button>
                        );
                      }
                    )}
                  </div>
                </div>
              ))}
            </nav>

            {/* Platform Accreditation & Diagnostics Box */}
            <div className="mt-6 pt-5 border-t border-[#f5e4e7] space-y-3">
              <div className="p-4 rounded-2xl bg-[#fff8f8] border border-[#fbeaec] space-y-2 text-xs">
                <div className="flex items-center gap-2 text-[#22191b] font-bold">
                  <span className="material-symbols-outlined text-[#a5d6a7] text-[18px]">
                    verified
                  </span>
                  <span>Platform Operations Master</span>
                </div>
                <p className="text-[11px] text-[#534247] font-['Nunito_Sans'] leading-relaxed">
                  Cluster Online • Edge CDN Active • Dual-Verification Ledger at Teacher Theint English.
                </p>
              </div>

              <div className="flex items-center justify-between text-[11px] text-[#534247] px-2 font-medium">
                <span>Portal Build v3.4</span>
                <button
                  type="button"
                  onClick={() => onNavigateScreen?.('PUB-01-HOME')}
                  className="text-[#f48fb1] hover:underline font-bold cursor-pointer"
                >
                  Public View →
                </button>
              </div>
            </div>
          </aside>

          {/* MAIN ADMIN CONTENT CANVAS */}
          <div className="flex-1 w-full space-y-8 animate-fade-in">
            {/* Top Canvas Action Banner */}
            <div className="bg-white rounded-3xl border border-[#fbeaec] p-6 sm:p-8 shadow-[0_4px_16px_rgba(244,143,177,0.12)] flex flex-col sm:flex-row sm:items-center justify-between gap-6">
              <div className="space-y-1">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#fff0f2] text-[#964261] text-xs font-['Quicksand'] font-bold border border-[#f5e4e7]">
                  <span className="material-symbols-outlined text-[16px] text-[#f48fb1]">admin_panel_settings</span>
                  <span>Administrative Operations Master Console</span>
                </div>
                <h1 className="font-['Quicksand'] text-2xl sm:text-3xl font-bold text-[#22191b] mt-1">
                  {activeNav === 'Dashboard' && 'Platform Governance & Operational Queues'}
                  {activeNav === 'One-on-One' && 'One-on-One Operations Control & Negotiation Master'}
                  {activeNav === 'Payments' && 'Payment Verification Ledger & Access Release'}
                  {activeNav === 'Users' && 'Comprehensive User Matrix & Role Authorities'}
                  {activeNav === 'Academic' && 'Academic Curriculum Architecture & Tracks'}
                  {activeNav === 'Courses' && 'Course Catalog & Pricing Tier Authoring'}
                  {activeNav === 'Learning' && 'Formative Practice & Lesson Resource Bank'}
                  {activeNav === 'Enrollments' && 'Learner Enrollment Records & Token Grants'}
                  {activeNav === 'Calendar' && 'Virtual Classroom Timetable & Masterclasses'}
                  {activeNav === 'Content Approval' && 'Curriculum Content Editorial Review Gate'}
                  {activeNav === 'Assessments' && 'Formal Exam Staging & IELTS Band Calibration'}
                  {activeNav === 'Communication' && 'Direct Learner & Faculty Messaging Channels'}
                  {activeNav === 'Notifications' && 'Official Administrative Broadcast Notices'}
                  {activeNav === 'Blog' && 'Academy Insights & English Learning Articles'}
                  {activeNav === 'Homepage' && 'Homepage Content Architecture & Review Staging'}
                  {activeNav === 'Reports' && 'Academy Analytics & Progression Metrics'}
                  {activeNav === 'Audit' && 'Immutable Platform Ledger & Trace Logs'}
                  {activeNav === 'Roles & Permissions' && 'RBAC Role Permissions & Access Control'}
                  {activeNav === 'Settings' && 'Global Academy System Settings'}
                </h1>
                <p className="text-sm text-[#534247]">
                  Platform-level governance, curriculum authoring approvals, financial receipt verifications, and academic standing management.
                </p>
              </div>

              <div className="shrink-0 flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => showToast('Exporting production audit ledger (CSV format)...')}
                  className="btn-tactile-secondary px-5 py-3 text-xs flex items-center gap-2 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[18px]">download</span>
                  <span>Export Ledger</span>
                </button>
                <button
                  type="button"
                  onClick={() => showToast('System Diagnostics: Latency 14ms • DB Healthy • Edge CDN Active')}
                  className="btn-tactile-primary px-5 py-3 text-xs flex items-center gap-2 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[18px]">verified_user</span>
                  <span>Health Check</span>
                </button>
              </div>
            </div>

            {/* 4 HIGH-CONTRAST PASTEL KPI SUMMARY CARDS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 font-['Quicksand']">
              {/* Card 1: Bubblegum Pink Accent */}
              <div className="bg-white rounded-3xl border border-[#fbeaec] p-6 shadow-[0_4px_16px_rgba(244,143,177,0.12)] space-y-2 relative overflow-hidden group hover:translate-y-[-2px] transition-all">
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#f48fb1]" />
                <div className="flex items-center justify-between text-xs font-bold text-[#534247]">
                  <span>Payment Receipts Queue</span>
                  <span className="material-symbols-outlined text-[#f48fb1]">account_balance_wallet</span>
                </div>
                <div className="text-3xl sm:text-4xl font-bold text-[#22191b] pt-1">
                  {paymentSlips.filter((s) => s.status === 'pending').length}
                </div>
                <div className="text-[11px] text-[#964261] font-bold flex items-center gap-1">
                  <span className="inline-block w-2 h-2 rounded-full bg-[#f48fb1]"></span>
                  <span>Awaiting Transfer Verification</span>
                </div>
              </div>

              {/* Card 2: Sky Blue Accent */}
              <div className="bg-white rounded-3xl border border-[#fbeaec] p-6 shadow-[0_4px_16px_rgba(244,143,177,0.12)] space-y-2 relative overflow-hidden group hover:translate-y-[-2px] transition-all">
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#81d4fa]" />
                <div className="flex items-center justify-between text-xs font-bold text-[#534247]">
                  <span>Editorial Gate Drafts</span>
                  <span className="material-symbols-outlined text-[#81d4fa]">menu_book</span>
                </div>
                <div className="text-3xl sm:text-4xl font-bold text-[#22191b] pt-1">
                  {contentSubmissions.filter((c) => c.status === 'pending').length}
                </div>
                <div className="text-[11px] text-[#006685] font-bold flex items-center gap-1">
                  <span className="inline-block w-2 h-2 rounded-full bg-[#81d4fa]"></span>
                  <span>Teacher Submissions Pending Review</span>
                </div>
              </div>

              {/* Card 3: Sunshine Yellow Accent */}
              <div className="bg-white rounded-3xl border border-[#fbeaec] p-6 shadow-[0_4px_16px_rgba(244,143,177,0.12)] space-y-2 relative overflow-hidden group hover:translate-y-[-2px] transition-all">
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#ffe082]" />
                <div className="flex items-center justify-between text-xs font-bold text-[#534247]">
                  <span>1:1 Schedule Confirmations</span>
                  <span className="material-symbols-outlined text-[#dcb236]">event_available</span>
                </div>
                <div className="text-3xl sm:text-4xl font-bold text-[#22191b] pt-1">2</div>
                <div className="text-[11px] text-[#725c06] font-bold flex items-center gap-1">
                  <span className="inline-block w-2 h-2 rounded-full bg-[#ffe082]"></span>
                  <span>Ready for Payment Gateway Unlock</span>
                </div>
              </div>

              {/* Card 4: Meadow Mint Accent */}
              <div className="bg-white rounded-3xl border border-[#fbeaec] p-6 shadow-[0_4px_16px_rgba(244,143,177,0.12)] space-y-2 relative overflow-hidden group hover:translate-y-[-2px] transition-all">
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#a5d6a7]" />
                <div className="flex items-center justify-between text-xs font-bold text-[#534247]">
                  <span>Student Level Decrees</span>
                  <span className="material-symbols-outlined text-[#a5d6a7]">military_tech</span>
                </div>
                <div className="text-3xl sm:text-4xl font-bold text-[#22191b] pt-1">
                  {studentDecrees.length}
                </div>
                <div className="text-[11px] text-[#1b5e20] font-bold flex items-center gap-1">
                  <span className="inline-block w-2 h-2 rounded-full bg-[#a5d6a7]"></span>
                  <span>Placement Determinations Signed</span>
                </div>
              </div>
            </div>

            {/* CONDITIONAL CONTENT VIEW: ONE-ON-ONE, CALENDAR, OR DEFAULT CONSOLE */}
            {activeNav === 'One-on-One' ? (
              <div className="space-y-8 animate-fade-in">
                <AdminOneOnOneView showSpecGuides={showSpecGuides} />
              </div>
            ) : activeNav === 'Calendar' ? (
              <div className="space-y-8 animate-fade-in">
                <SharedCalendarWorkspace
                  role="ADMIN"
                  onNavigateToOneOnOne={() => setActiveNav('One-on-One')}
                  onLaunchMeeting={(sess) => showToast(`Admin joining session monitor for ${sess.title}...`)}
                />
              </div>
            ) : (
              /* DEFAULT MASTER WORKFLOWS: 2-COLUMN OPERATIONAL QUEUES */
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                {/* LEFT COLUMN: High-Throughput Action Queues (7 cols) */}
                <div className="lg:col-span-7 flex flex-col gap-6">
                  {/* Priority Workflow 1: Payment Verification & Enrollment Release */}
                  <div className="bg-white rounded-3xl shadow-[0_4px_16px_rgba(244,143,177,0.12)] border border-[#fbeaec] overflow-hidden flex flex-col">
                    <div className="p-4 sm:p-5 bg-gradient-to-r from-[#fff0f2] to-white border-b border-[#f5e4e7] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div className="flex items-center gap-3">
                        <span className="w-2.5 h-7 rounded-full bg-[#964261] inline-block shrink-0" />
                        <div>
                          <h2 className="font-bold text-base text-[#22191b] font-['Quicksand']">
                            Priority Workflow 1: Payment Verification &amp; Enrollment Release
                          </h2>
                          <p className="text-xs text-[#534247] mt-0.5">
                            Dual-verification gateway before granting authenticated access tokens
                          </p>
                        </div>
                      </div>
                      <span className="self-start sm:self-auto px-3 py-1 rounded-full bg-[#f48fb1]/15 text-[#964261] text-xs font-bold font-['Quicksand'] border border-[#f48fb1]/30">
                        {paymentSlips.filter((s) => s.status === 'pending').length} Actionable Slips
                      </span>
                    </div>

                    {/* Invariant Banner */}
                    <div className="mx-4 sm:mx-5 mt-4 sm:mt-5 p-3.5 rounded-2xl bg-[#fff0f2] border border-[#f5e4e7] flex items-start gap-3 text-xs">
                      <span className="material-symbols-outlined text-[#964261] text-[20px] mt-0.5 shrink-0">
                        rule
                      </span>
                      <div className="flex flex-col">
                        <span className="font-bold text-[#22191b] font-['Quicksand']">
                          Architectural Invariant Enforced
                        </span>
                        <p className="text-[#534247] mt-0.5 leading-relaxed">
                          <span className="font-semibold text-[#964261]">
                            Payment ≠ Enrollment ≠ Access ≠ Progress.
                          </span>{' '}
                          Paid courses strictly require slip verification before creating an enrollment row.
                        </p>
                      </div>
                    </div>

                    {/* Payment Verification Cards */}
                    <div className="p-4 sm:p-5 flex flex-col gap-4">
                      {paymentSlips.map((item) => (
                        <div
                          key={item.id}
                          className={`p-4 sm:p-5 rounded-2xl border flex flex-col gap-3.5 transition-all shadow-xs ${
                            item.status === 'verified'
                              ? 'bg-[#a5d6a7]/15 border-[#a5d6a7]/60'
                              : item.status === 'rejected'
                              ? 'bg-[#ffdad6]/20 border-[#ba1a1a]/30 opacity-70'
                              : 'bg-[#fff9f9] border-[#fbeaec] hover:border-[#f48fb1] hover:shadow-sm'
                          }`}
                        >
                          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                            <div className="flex items-start gap-3.5">
                              <div
                                className={`w-10 h-10 rounded-2xl ${item.avatarBg} text-white flex items-center justify-center font-bold font-['Quicksand'] text-sm shrink-0 shadow-xs`}
                              >
                                {item.avatar}
                              </div>
                              <div className="flex flex-col">
                                <div className="flex items-center gap-2">
                                  <span className="font-bold text-sm text-[#22191b] font-['Quicksand']">
                                    {item.name}
                                  </span>
                                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#f48fb1]/20 text-[#722544] font-['Quicksand']">
                                    {item.type}
                                  </span>
                                </div>
                                <span className="text-xs text-[#534247] mt-0.5">{item.course}</span>
                              </div>
                            </div>

                            <div className="flex flex-col sm:items-end">
                              <span className="text-[10px] text-[#867277] uppercase tracking-wider font-bold font-['Quicksand']">
                                Method &amp; Ref
                              </span>
                              <span className="text-xs text-[#22191b] font-semibold mt-0.5">
                                {item.method} • {item.ref}
                              </span>
                            </div>
                          </div>

                          {/* Detail Preview */}
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5 p-3 rounded-xl bg-white border border-[#f5e4e7] text-xs font-['Quicksand']">
                            <div className="flex items-center gap-2.5 px-2 py-1">
                              <div className="w-8 h-8 rounded-lg bg-[#81d4fa]/20 text-[#005d79] flex items-center justify-center shrink-0">
                                <span className="material-symbols-outlined text-[18px]">
                                  receipt_long
                                </span>
                              </div>
                              <div className="flex flex-col">
                                <span className="text-[10px] text-[#867277] font-semibold">Slip Proof</span>
                                <button
                                  type="button"
                                  onClick={() => setReceiptModal(item)}
                                  className="text-[11px] text-[#964261] hover:text-[#722544] hover:underline font-bold flex items-center gap-1 cursor-pointer text-left"
                                >
                                  <span>View Original Slip</span>
                                  <span className="material-symbols-outlined text-[13px]">
                                    open_in_new
                                  </span>
                                </button>
                              </div>
                            </div>

                            <div className="flex items-center gap-2.5 px-2 py-1">
                              <div className="w-8 h-8 rounded-lg bg-[#ffe082]/30 text-[#725c06] flex items-center justify-center shrink-0">
                                <span className="material-symbols-outlined text-[18px]">
                                  payments
                                </span>
                              </div>
                              <div className="flex flex-col">
                                <span className="text-[10px] text-[#867277] font-semibold">Payable Tier</span>
                                <span className="text-[11px] text-[#22191b] font-bold">
                                  {item.tier}
                                </span>
                              </div>
                            </div>

                            <div className="flex items-center gap-2.5 px-2 py-1">
                              <div className="w-8 h-8 rounded-lg bg-[#f48fb1]/15 text-[#964261] flex items-center justify-center shrink-0">
                                <span className="material-symbols-outlined text-[18px]">
                                  event_repeat
                                </span>
                              </div>
                              <div className="flex flex-col">
                                <span className="text-[10px] text-[#867277] font-semibold">Timestamp</span>
                                <span className="text-[11px] text-[#22191b] font-medium">{item.time}</span>
                              </div>
                            </div>
                          </div>

                          {item.note && (
                            <div className="p-2.5 rounded-xl bg-[#fff0f2] border border-[#f5e4e7] text-xs flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <span className="w-2.5 h-2.5 rounded-full bg-[#f48fb1]" />
                                <span className="text-[#534247]">{item.note}</span>
                              </div>
                              <span className="text-[#964261] font-bold text-[11px] font-['Quicksand']">
                                120,000 MMK
                              </span>
                            </div>
                          )}

                          {/* Action Bar */}
                          <div className="flex flex-wrap items-center justify-between gap-2.5 pt-2 border-t border-[#f5e4e7]">
                            <div className="flex items-center gap-1.5 text-[#534247] text-xs">
                              <span className="material-symbols-outlined text-[16px] text-[#867277]">
                                info
                              </span>
                              <span>
                                {item.status === 'verified'
                                  ? 'Verified & Access Enrolled'
                                  : item.status === 'rejected'
                                  ? 'Rejected / Resubmission Requested'
                                  : 'Requires Admin verification signature'}
                              </span>
                            </div>

                            {item.status === 'pending' ? (
                              <div className="flex items-center gap-2">
                                <button
                                  type="button"
                                  onClick={() => handleRejectPayment(item.id)}
                                  className="h-8 px-3.5 rounded-full bg-[#f5e4e7] hover:bg-[#efdfe1] text-[#22191b] text-xs font-bold font-['Quicksand'] transition-colors flex items-center gap-1.5 cursor-pointer"
                                >
                                  <span className="material-symbols-outlined text-[15px] text-[#ba1a1a]">
                                    cancel
                                  </span>
                                  <span>Reject</span>
                                </button>
                                <button
                                  type="button"
                                  onClick={() => handleVerifyPayment(item.id)}
                                  className="btn-tactile-primary h-8 px-4 text-xs flex items-center gap-1.5 cursor-pointer"
                                >
                                  <span className="material-symbols-outlined text-[16px]">
                                    check_circle
                                  </span>
                                  <span>Verify &amp; Create Enrollment</span>
                                </button>
                              </div>
                            ) : (
                              <span
                                className={`text-xs font-bold font-['Quicksand'] px-3 py-1 rounded-full ${
                                  item.status === 'verified'
                                    ? 'bg-[#a5d6a7]/25 text-[#1b5e20] border border-[#a5d6a7]/50'
                                    : 'bg-[#ffdad6] text-[#ba1a1a] border border-[#ffdad6]'
                                }`}
                              >
                                {item.status === 'verified' ? 'Enrollment Active' : 'Rejected'}
                              </span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Priority Workflow 2: Curriculum Content Governance */}
                  <div className="bg-white rounded-3xl shadow-[0_4px_16px_rgba(244,143,177,0.12)] border border-[#fbeaec] overflow-hidden flex flex-col">
                    <div className="p-4 sm:p-5 bg-gradient-to-r from-[#fff0f2] to-white border-b border-[#f5e4e7] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div className="flex items-center gap-3">
                        <span className="w-2.5 h-7 rounded-full bg-[#006685] inline-block shrink-0" />
                        <div>
                          <h2 className="font-bold text-base text-[#22191b] font-['Quicksand']">
                            Priority Workflow 2: Curriculum Content Governance
                          </h2>
                          <p className="text-xs text-[#534247] mt-0.5">
                            Faculty authoring drafts awaiting Admin staging review
                          </p>
                        </div>
                      </div>
                      <span className="self-start sm:self-auto px-3 py-1 rounded-full bg-[#81d4fa]/20 text-[#005d79] text-xs font-bold font-['Quicksand'] border border-[#81d4fa]/40">
                        Stage Gate Active
                      </span>
                    </div>

                    <div className="p-4 sm:p-5 flex flex-col gap-4">
                      {/* Academic Invariant Indicator */}
                      <div className="p-3.5 rounded-2xl bg-[#fff0f2] border border-[#f5e4e7] flex flex-col gap-1.5 text-xs">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-[#22191b] uppercase tracking-wider font-['Quicksand']">
                            Academic Hierarchy Strictly Enforced
                          </span>
                          <span className="text-[#006685] font-bold font-['Quicksand']">
                            Non-Direct Publishing
                          </span>
                        </div>
                        <p className="text-[#534247] leading-relaxed">
                          <span className="font-semibold text-[#22191b]">
                            Track → Course → Level → Module → Lesson → Learning Item
                          </span>
                          <br />
                          Lifecycle:{' '}
                          <span className="font-semibold text-[#964261]">
                            Teacher Draft → Pending Review → Admin Approve OR Reject → Teacher Revision
                          </span>
                          . Teachers possess no direct production deploy rights.
                        </p>
                      </div>

                      {/* Content Queue List */}
                      <div className="flex flex-col gap-3">
                        {contentSubmissions.map((sub) => (
                          <div
                            key={sub.id}
                            className={`p-4 sm:p-5 rounded-2xl border flex flex-col gap-3.5 transition-all shadow-xs ${
                              sub.status === 'approved'
                                ? 'bg-[#a5d6a7]/15 border-[#a5d6a7]/60'
                                : sub.status === 'revision'
                                ? 'bg-[#ffe082]/20 border-[#ffe082]/70'
                                : 'bg-[#fff9f9] border-[#fbeaec] hover:border-[#f48fb1]'
                            }`}
                          >
                            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                              <div className="flex flex-col">
                                <div className="flex items-center gap-2">
                                  <span className="font-bold text-sm text-[#22191b] font-['Quicksand']">
                                    {sub.title}
                                  </span>
                                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#f48fb1]/20 text-[#722544] font-['Quicksand']">
                                    {sub.badge}
                                  </span>
                                </div>
                                <span className="text-xs text-[#534247] mt-1">
                                  Belongs to:{' '}
                                  <span className="font-semibold text-[#22191b]">
                                    {sub.belongsTo}
                                  </span>
                                </span>
                              </div>

                              <span
                                className={`px-3 py-1 rounded-full text-[10px] font-bold font-['Quicksand'] self-start ${
                                  sub.status === 'approved'
                                    ? 'bg-[#a5d6a7]/30 text-[#1b5e20] border border-[#a5d6a7]/50'
                                    : sub.status === 'revision'
                                    ? 'bg-[#ffe082]/40 text-[#725c06] border border-[#ffe082]'
                                    : 'bg-[#f48fb1]/15 text-[#964261] border border-[#f48fb1]/30'
                                }`}
                              >
                                {sub.status === 'approved'
                                  ? 'Published to Live'
                                  : sub.status === 'revision'
                                  ? 'Revision Requested'
                                  : 'Pending Admin Review'}
                              </span>
                            </div>

                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs py-2.5 px-3 rounded-xl bg-white border border-[#f5e4e7] font-['Quicksand']">
                              <div>
                                <span className="text-[#867277] text-[10px] block font-semibold">Author</span>
                                <span className="text-[#22191b] font-semibold">{sub.author}</span>
                              </div>
                              <div>
                                <span className="text-[#867277] text-[10px] block font-semibold">Submitted</span>
                                <span className="text-[#22191b]">{sub.submitted}</span>
                              </div>
                              <div>
                                <span className="text-[#867277] text-[10px] block font-semibold">Module Scope</span>
                                <span className="text-[#22191b]">{sub.items}</span>
                              </div>
                              <div>
                                <span className="text-[#867277] text-[10px] block font-semibold">Media Check</span>
                                <span className="text-[#22191b]">{sub.audioOrQuiz}</span>
                              </div>
                            </div>

                            <div className="flex flex-wrap items-center justify-end gap-2 pt-2 border-t border-[#f5e4e7]">
                              {sub.status === 'pending' ? (
                                <>
                                  <button
                                    type="button"
                                    onClick={() => handleReturnRevision(sub.id)}
                                    className="h-8 px-3.5 rounded-full bg-[#f5e4e7] hover:bg-[#efdfe1] text-[#22191b] text-xs font-bold font-['Quicksand'] transition-colors flex items-center gap-1.5 cursor-pointer"
                                  >
                                    <span className="material-symbols-outlined text-[15px] text-[#ba1a1a]">
                                      assignment_return
                                    </span>
                                    <span>Return for Revision</span>
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => handleApproveCurriculum(sub.id)}
                                    className="btn-tactile-secondary h-8 px-4 text-xs flex items-center gap-1.5 cursor-pointer"
                                  >
                                    <span className="material-symbols-outlined text-[16px]">
                                      publish
                                    </span>
                                    <span>Review &amp; Approve for Live</span>
                                  </button>
                                </>
                              ) : (
                                <button
                                  type="button"
                                  onClick={() =>
                                    showToast(`Opening inspection drawer for ${sub.title}`)
                                  }
                                  className="h-8 px-3.5 rounded-full bg-[#fff0f2] hover:bg-[#ffe4e9] text-[#964261] border border-[#f5e4e7] text-xs font-bold font-['Quicksand'] flex items-center gap-1.5 cursor-pointer shadow-2xs"
                                >
                                  <span className="material-symbols-outlined text-[16px] text-[#f48fb1]">
                                    visibility
                                  </span>
                                  <span>View Module Staging</span>
                                </button>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* RIGHT COLUMN: Academic Standing & Administrative Gateways (5 cols) */}
                <div className="lg:col-span-5 flex flex-col gap-6">
                  {/* Official Student Level Decrees */}
                  <div className="bg-white rounded-3xl shadow-[0_4px_16px_rgba(244,143,177,0.12)] border border-[#fbeaec] overflow-hidden flex flex-col">
                    <div className="p-4 sm:p-5 bg-gradient-to-r from-[#fff0f2] to-white border-b border-[#f5e4e7] flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="w-2.5 h-7 rounded-full bg-[#964261] inline-block shrink-0" />
                        <div>
                          <h2 className="font-bold text-base text-[#22191b] font-['Quicksand']">
                            Official Student Level Decrees
                          </h2>
                          <p className="text-xs text-[#534247]">Placement Standing Determination</p>
                        </div>
                      </div>
                      <span className="px-3 py-0.5 rounded-full text-[10px] font-bold bg-[#f48fb1]/20 text-[#722544] font-['Quicksand'] border border-[#f48fb1]/30">
                        Admin Authority
                      </span>
                    </div>

                    <div className="p-4 sm:p-5 flex flex-col gap-4">
                      {/* Invariant Highlight Box */}
                      <div className="p-3.5 rounded-2xl bg-[#fff0f2] border border-[#f5e4e7] flex items-start gap-2.5 text-xs">
                        <span className="material-symbols-outlined text-[#964261] text-[18px] mt-0.5 shrink-0">
                          gavel
                        </span>
                        <p className="text-[#22191b] leading-relaxed">
                          <span className="font-bold font-['Quicksand']">Core Invariant:</span> System Suggested Level
                          ≠ Teacher Recommendation ≠ Official Student Level. Only Admin decrees update permanent placement.
                        </p>
                      </div>

                      {/* Learner Decrees */}
                      {studentDecrees.map((learner) => (
                        <div
                          key={learner.id}
                          className="p-4 rounded-2xl bg-[#fff9f9] border border-[#fbeaec] flex flex-col gap-2.5 shadow-xs"
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-sm text-[#22191b] font-['Quicksand']">
                              {learner.name}
                            </span>
                            <span className="text-[11px] font-mono text-[#867277] bg-white px-2 py-0.5 rounded-full border border-[#f5e4e7]">
                              ID: {learner.code}
                            </span>
                          </div>

                          <div className="grid grid-cols-2 gap-2 text-xs mt-1">
                            <div className="p-2.5 rounded-xl bg-white border border-[#f5e4e7]">
                              <span className="text-[#867277] text-[10px] block font-semibold">
                                System Placement
                              </span>
                              <span className="font-bold text-[#22191b] mt-0.5 block font-['Quicksand']">
                                {learner.systemLevel}
                              </span>
                            </div>
                            <div className="p-2.5 rounded-xl bg-white border border-[#f5e4e7]">
                              <span className="text-[#867277] text-[10px] block font-semibold">Teacher Rec</span>
                              <span className="font-bold text-[#964261] mt-0.5 block font-['Quicksand']">
                                {learner.teacherRec}
                              </span>
                            </div>
                          </div>

                          {learner.decreedLevel ? (
                            <div className="mt-1 p-2.5 rounded-xl bg-[#a5d6a7]/20 border border-[#a5d6a7]/60 text-xs font-bold text-[#1b5e20] flex items-center justify-between font-['Quicksand']">
                              <span className="flex items-center gap-1.5">
                                <span className="material-symbols-outlined text-[16px]">
                                  verified
                                </span>
                                <span>Decreed: {learner.decreedLevel}</span>
                              </span>
                              <span className="text-[10px] font-mono text-[#1b5e20] bg-white px-2 py-0.5 rounded-full">Signed</span>
                            </div>
                          ) : (
                            <div className="flex items-center gap-2 mt-1">
                              <button
                                type="button"
                                onClick={() => handleDecreeLevel(learner.id, 'Level 2')}
                                className="flex-1 btn-tactile-primary h-8 px-2 text-xs cursor-pointer"
                              >
                                Decree: Level 2
                              </button>
                              <button
                                type="button"
                                onClick={() => handleDecreeLevel(learner.id, 'Level 1')}
                                className="h-8 px-3.5 rounded-full bg-[#f5e4e7] hover:bg-[#efdfe1] text-[#22191b] text-xs font-bold font-['Quicksand'] transition-colors cursor-pointer"
                              >
                                Level 1
                              </button>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* One-on-One Administrative Oversight */}
                  <div className="bg-white rounded-3xl shadow-[0_4px_16px_rgba(244,143,177,0.12)] border border-[#fbeaec] overflow-hidden flex flex-col">
                    <div className="p-4 sm:p-5 bg-gradient-to-r from-[#fff0f2] to-white border-b border-[#f5e4e7] flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="w-2.5 h-7 rounded-full bg-[#f48fb1] inline-block shrink-0" />
                        <div>
                          <h2 className="font-bold text-base text-[#22191b] font-['Quicksand']">
                            One-on-One Oversight
                          </h2>
                          <p className="text-xs text-[#534247]">Lifecycle &amp; Milestone Controls</p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => setActiveNav('One-on-One')}
                        className="px-3 py-1 rounded-full bg-[#fff0f2] text-[#964261] text-xs font-bold font-['Quicksand'] border border-[#f5e4e7] hover:bg-[#ffe4e9] cursor-pointer"
                      >
                        Open Ops →
                      </button>
                    </div>

                    <div className="p-4 sm:p-5 flex flex-col gap-3.5">
                      <div className="p-3 rounded-2xl bg-[#fff0f2] border border-[#f5e4e7] text-xs flex flex-col gap-1">
                        <span className="font-bold text-[#22191b] font-['Quicksand']">Strict Contract Sequence:</span>
                        <p className="text-[#534247] text-[11px] leading-relaxed">
                          Request → Teacher Selection → Negotiation →{' '}
                          <span className="font-bold text-[#964261]">Schedule Confirmation</span> → Payment → Admin Approval → Actual Start Date → 1-Month Period.
                        </p>
                      </div>

                      <div className="p-4 rounded-2xl bg-[#fff9f9] border-l-4 border-l-[#964261] border-t border-r border-b border-[#fbeaec] flex flex-col gap-2.5 shadow-xs">
                        <div className="flex items-center justify-between">
                          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#ffe082]/30 text-[#725c06] font-['Quicksand'] border border-[#ffe082]">
                            Milestone Pending Payment
                          </span>
                          <span className="text-[11px] text-[#867277] font-semibold">Slot: Mon/Wed 7:00 PM</span>
                        </div>
                        <h3 className="font-bold text-sm text-[#22191b] font-['Quicksand'] mt-0.5">
                          Student Maung Thant × Teacher Theint
                        </h3>
                        <p className="text-xs text-[#534247] leading-relaxed">
                          Schedule confirmed for Student Maung Thant with Teacher Theint. Awaiting student payment upload before enrollment unlock.
                        </p>
                        <div className="pt-2.5 flex items-center justify-between border-t border-[#f5e4e7]">
                          <span className="text-xs text-[#964261] font-bold font-['Quicksand']">
                            Status: Gateway Waiting Slip
                          </span>
                          <button
                            type="button"
                            onClick={() =>
                              showToast('Viewing contract chronology for Student Maung Thant...')
                            }
                            className="h-7 px-3 rounded-full bg-white hover:bg-[#fff0f2] border border-[#f5e4e7] text-[#22191b] text-xs font-bold font-['Quicksand'] transition-colors cursor-pointer shadow-2xs"
                          >
                            Audit History
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Administrative Domain Shortcuts */}
                  <div className="bg-white rounded-3xl shadow-[0_4px_16px_rgba(244,143,177,0.12)] border border-[#fbeaec] overflow-hidden flex flex-col">
                    <div className="p-4 sm:p-5 bg-gradient-to-r from-[#fff0f2] to-white border-b border-[#f5e4e7]">
                      <h2 className="font-bold text-base text-[#22191b] font-['Quicksand']">
                        Administrative Gateways
                      </h2>
                      <p className="text-xs text-[#534247] mt-0.5">
                        Rapid routing to specialized management consoles
                      </p>
                    </div>

                    <div className="p-4 sm:p-5 grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => setActiveNav('Users')}
                        className="p-3.5 rounded-2xl bg-[#fff9f9] hover:bg-[#fff0f2] border border-[#fbeaec] hover:border-[#f48fb1] transition-all flex flex-col gap-2.5 text-left group cursor-pointer shadow-2xs"
                      >
                        <div className="w-9 h-9 rounded-xl bg-white border border-[#f5e4e7] flex items-center justify-center text-[#964261] group-hover:scale-105 transition-transform shadow-xs">
                          <span className="material-symbols-outlined text-[18px]">
                            manage_accounts
                          </span>
                        </div>
                        <div>
                          <span className="font-bold text-xs text-[#22191b] block font-['Quicksand']">
                            Users Matrix
                          </span>
                          <span className="text-[11px] text-[#534247]">
                            Students &amp; Teachers
                          </span>
                        </div>
                      </button>

                      <button
                        type="button"
                        onClick={() => setActiveNav('Assessments')}
                        className="p-3.5 rounded-2xl bg-[#fff9f9] hover:bg-[#fff0f2] border border-[#fbeaec] hover:border-[#81d4fa] transition-all flex flex-col gap-2.5 text-left group cursor-pointer shadow-2xs"
                      >
                        <div className="w-9 h-9 rounded-xl bg-white border border-[#f5e4e7] flex items-center justify-center text-[#006685] group-hover:scale-105 transition-transform shadow-xs">
                          <span className="material-symbols-outlined text-[18px]">grading</span>
                        </div>
                        <div>
                          <span className="font-bold text-xs text-[#22191b] block font-['Quicksand']">
                            Assessments
                          </span>
                          <span className="text-[11px] text-[#534247]">
                            Exams &amp; Rubrics
                          </span>
                        </div>
                      </button>

                      <button
                        type="button"
                        onClick={() => setActiveNav('Audit')}
                        className="p-3.5 rounded-2xl bg-[#fff9f9] hover:bg-[#fff0f2] border border-[#fbeaec] hover:border-[#a5d6a7] transition-all flex flex-col gap-2.5 text-left group cursor-pointer shadow-2xs"
                      >
                        <div className="w-9 h-9 rounded-xl bg-white border border-[#f5e4e7] flex items-center justify-center text-[#2e7d32] group-hover:scale-105 transition-transform shadow-xs">
                          <span className="material-symbols-outlined text-[18px]">
                            shield_with_heart
                          </span>
                        </div>
                        <div>
                          <span className="font-bold text-xs text-[#22191b] block font-['Quicksand']">
                            Audit Ledger
                          </span>
                          <span className="text-[11px] text-[#534247]">
                            Event Records
                          </span>
                        </div>
                      </button>

                      <button
                        type="button"
                        onClick={() => setActiveNav('Content Approval')}
                        className="p-3.5 rounded-2xl bg-[#fff9f9] hover:bg-[#fff0f2] border border-[#fbeaec] hover:border-[#f48fb1] transition-all flex flex-col gap-2.5 text-left group cursor-pointer shadow-2xs"
                      >
                        <div className="w-9 h-9 rounded-xl bg-white border border-[#f5e4e7] flex items-center justify-center text-[#964261] group-hover:scale-105 transition-transform shadow-xs">
                          <span className="material-symbols-outlined text-[18px]">
                            auto_stories
                          </span>
                        </div>
                        <div>
                          <span className="font-bold text-xs text-[#22191b] block font-['Quicksand']">
                            Content Approval
                          </span>
                          <span className="text-[11px] text-[#534247]">
                            Authoring Staging
                          </span>
                        </div>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Slip Proof Inspection Modal */}
      {receiptModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-[#fbeaec] space-y-4 font-['Nunito_Sans'] animate-fade-in">
            <div className="flex items-center justify-between pb-3 border-b border-[#f5e4e7]">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-[#f48fb1]/20 text-[#964261] flex items-center justify-center">
                  <span className="material-symbols-outlined text-[18px]">receipt_long</span>
                </div>
                <h3 className="font-bold text-base text-[#22191b] font-['Quicksand']">
                  Transfer Slip Proof • {receiptModal.ref}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setReceiptModal(null)}
                className="w-8 h-8 rounded-full hover:bg-[#fff0f2] text-[#534247] hover:text-[#22191b] flex items-center justify-center transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <div className="space-y-3 text-xs text-[#534247]">
              {/* Slip simulation graphic card */}
              <div className="p-4 rounded-2xl bg-[#fff9f9] border border-[#fbeaec] space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[11px] text-[#867277] uppercase font-bold">KBZ / Wave Pay Verification</span>
                  <span className="px-2.5 py-0.5 rounded-full bg-[#a5d6a7]/25 text-[#1b5e20] font-bold text-[10px] font-['Quicksand'] border border-[#a5d6a7]/50">
                    AUTHENTIC
                  </span>
                </div>
                <div className="text-center py-2 bg-white rounded-xl border border-[#f5e4e7]">
                  <div className="text-2xl font-bold text-[#964261] font-['Quicksand']">
                    {receiptModal.amount || '45,000 MMK'}
                  </div>
                  <div className="text-[11px] text-[#534247] mt-0.5">
                    Paid to Teacher Theint English Official
                  </div>
                </div>
                <div className="divide-y divide-[#f5e4e7] text-[11px]">
                  <div className="py-2 flex justify-between">
                    <span className="text-[#867277]">Sender Name:</span>
                    <span className="font-bold text-[#22191b] font-['Quicksand']">{receiptModal.name}</span>
                  </div>
                  <div className="py-2 flex justify-between">
                    <span className="text-[#867277]">Target Item:</span>
                    <span className="font-bold text-[#22191b]">{receiptModal.course}</span>
                  </div>
                  <div className="py-2 flex justify-between">
                    <span className="text-[#867277]">Transaction ID:</span>
                    <span className="font-mono text-[#22191b] font-bold">{receiptModal.ref}</span>
                  </div>
                  <div className="py-2 flex justify-between">
                    <span className="text-[#867277]">Date &amp; Time:</span>
                    <span className="text-[#22191b]">{receiptModal.time}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2.5 pt-2">
              <button
                type="button"
                onClick={() => {
                  handleRejectPayment(receiptModal.id);
                  setReceiptModal(null);
                }}
                className="flex-1 py-2.5 rounded-full bg-[#f5e4e7] hover:bg-[#efdfe1] text-[#22191b] font-bold font-['Quicksand'] text-xs transition-colors cursor-pointer"
              >
                Reject Slip
              </button>
              <button
                type="button"
                onClick={() => {
                  handleVerifyPayment(receiptModal.id);
                  setReceiptModal(null);
                }}
                className="flex-1 btn-tactile-primary py-2.5 text-xs cursor-pointer"
              >
                Verify &amp; Enroll
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
