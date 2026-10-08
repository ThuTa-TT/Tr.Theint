import React, { useState } from 'react';
import { CANONICAL_TEACHER_NAV, ScreenId, TeacherNavItem } from '../../../types/navigation';
import { BrandLogo, TR_THEINT_LOGO_URL } from '../../navigation/BrandLogo';
import { TeacherOneOnOneView } from './TeacherOneOnOneView';
import { SharedCalendarWorkspace } from '../../calendar/SharedCalendarWorkspace';

interface TeacherPortalScreenProps {
  onNavigateScreen?: (screenId: ScreenId) => void;
  showSpecGuides?: boolean;
}

interface GradingSubmission {
  id: string;
  student: string;
  avatar: string;
  cohort: string;
  task: string;
  submitted: string;
  targetBand: string;
  status: 'Ready for Grading' | 'In Review' | 'Completed (Band 7.5)' | 'Completed (Band 8.0)';
  score?: number;
  wordCount?: number;
  essaySnippet?: string;
  criteria?: {
    task: number;
    coherence: number;
    lexical: number;
    grammar: number;
  };
}

export const TeacherPortalScreen: React.FC<TeacherPortalScreenProps> = ({
  onNavigateScreen,
  showSpecGuides = false,
}) => {
  const [activeNav, setActiveNav] = useState<TeacherNavItem>('Assessments / Grading');
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Submissions State
  const [submissions, setSubmissions] = useState<GradingSubmission[]>([
    {
      id: 'SUB-904',
      student: 'Aye Chan May',
      avatar: 'AM',
      cohort: 'IELTS Band 7.5+ • Cohort #14',
      task: 'Writing Task 2: Public Transport vs. Road Expansion',
      submitted: '2 hours ago',
      targetBand: 'Band 7.5',
      status: 'Ready for Grading',
      wordCount: 284,
      essaySnippet:
        'In recent years, the dilemma between investing in public mass transit systems and widening urban arterial roads has sparked intense debate among urban planners...',
      criteria: { task: 7.5, coherence: 7.0, lexical: 7.5, grammar: 7.0 },
    },
    {
      id: 'SUB-903',
      student: 'Min Khant Kyaw',
      avatar: 'MK',
      cohort: 'IELTS Band 7.5+ • Cohort #14',
      task: 'Writing Task 1: Global Renewable Energy Bar Chart',
      submitted: '4 hours ago',
      targetBand: 'Band 7.0',
      status: 'Ready for Grading',
      wordCount: 178,
      essaySnippet:
        'The provided bar chart delineates the proportion of electricity generated from renewable sources across five European nations between 2010 and 2022...',
      criteria: { task: 7.0, coherence: 7.0, lexical: 6.5, grammar: 7.0 },
    },
    {
      id: 'SUB-902',
      student: 'Hsu Myat Noe',
      avatar: 'HN',
      cohort: 'Academic Grammar • Cohort #09',
      task: 'Unit 4 Diagnostic: Complex Adverbial & Relative Clauses',
      submitted: 'Yesterday',
      targetBand: 'CEFR B2',
      status: 'In Review',
      wordCount: 220,
      essaySnippet:
        'Although initial findings suggested otherwise, the correlation between syntax mastery and spontaneous speaking fluency remains remarkably robust...',
      criteria: { task: 7.0, coherence: 6.5, lexical: 7.0, grammar: 6.5 },
    },
    {
      id: 'SUB-901',
      student: 'Thura Aung',
      avatar: 'TA',
      cohort: 'Executive Business English • Cohort #06',
      task: 'Stakeholder Proposal Memo & Executive Summary',
      submitted: 'Yesterday',
      targetBand: 'CEFR B2+',
      status: 'Completed (Band 7.5)',
      wordCount: 312,
      essaySnippet:
        'To: Executive Leadership Committee. Subject: Expansion of Cross-Border Trade Facilitation Protocols in Q2...',
      criteria: { task: 8.0, coherence: 7.5, lexical: 7.5, grammar: 7.5 },
    },
    {
      id: 'SUB-900',
      student: 'May Thu',
      avatar: 'MT',
      cohort: 'General English Level 2 • Cohort #08',
      task: 'Speaking Diagnostic: Expressing Opinions Concisely',
      submitted: '3 days ago',
      targetBand: 'Level 2 Fluency',
      status: 'Completed (Band 8.0)',
      wordCount: 195,
      essaySnippet:
        'Teacher Theint, I have recorded the 3-minute oral monologue addressing workplace negotiations using diplomatic modals and softening markers...',
      criteria: { task: 8.0, coherence: 8.0, lexical: 8.0, grammar: 8.0 },
    },
  ]);

  // Rubric Modal State
  const [selectedSubmission, setSelectedSubmission] = useState<GradingSubmission | null>(null);
  const [rubricScores, setRubricScores] = useState({
    task: 7.5,
    coherence: 7.5,
    lexical: 7.0,
    grammar: 7.5,
  });
  const [teacherNotes, setTeacherNotes] = useState('');
  const [voiceNoteRecorded, setVoiceNoteRecorded] = useState(false);

  // Status Filter for Assessments
  const [statusFilter, setStatusFilter] = useState<'All' | 'Pending' | 'Completed'>('All');

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4500);
  };

  const handleOpenRubric = (sub: GradingSubmission) => {
    setSelectedSubmission(sub);
    setRubricScores(sub.criteria || { task: 7.0, coherence: 7.0, lexical: 7.0, grammar: 7.0 });
    setTeacherNotes(
      sub.status.includes('Completed')
        ? 'Excellent lexical cohesion and formal academic tone maintained throughout.'
        : 'Good paragraph development. Pay attention to subject-verb agreement in complex conditional sentences.'
    );
    setVoiceNoteRecorded(false);
  };

  const calculateBandAverage = () => {
    const avg =
      (rubricScores.task + rubricScores.coherence + rubricScores.lexical + rubricScores.grammar) /
      4;
    return Math.round(avg * 2) / 2; // IELTS round to nearest 0.5
  };

  const handleSaveGrading = () => {
    if (!selectedSubmission) return;
    const finalBand = calculateBandAverage();
    setSubmissions((prev) =>
      prev.map((s) =>
        s.id === selectedSubmission.id
          ? {
              ...s,
              status: `Completed (Band ${finalBand.toFixed(1)})` as any,
              criteria: { ...rubricScores },
            }
          : s
      )
    );
    setSelectedSubmission(null);
    showToast(
      `Evaluation published for ${selectedSubmission.student}: Official Band ${finalBand.toFixed(
        1
      )} Decreed with Teacher Remarks.`
    );
  };

  const handleBatchPublish = () => {
    setSubmissions((prev) =>
      prev.map((s) =>
        s.status === 'Ready for Grading' || s.status === 'In Review'
          ? { ...s, status: 'Completed (Band 7.5)' }
          : s
      )
    );
    showToast('Batch Published: 2 Pending Academic Evaluations stamped and returned to learners.');
  };

  const filteredSubmissions = submissions.filter((s) => {
    if (statusFilter === 'Pending') return s.status === 'Ready for Grading' || s.status === 'In Review';
    if (statusFilter === 'Completed') return s.status.includes('Completed');
    return true;
  });

  return (
    <div className="min-h-screen flex flex-col bg-[#fff8f8] text-[#22191b] font-['Nunito_Sans'] antialiased">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed top-24 right-6 z-50 bg-[#22191b] text-white text-xs px-5 py-3.5 rounded-2xl shadow-[0_8px_32px_rgba(244,143,177,0.35)] flex items-center gap-3 border border-[#f48fb1]/30 animate-fade-in font-['Quicksand'] font-bold">
          <span className="material-symbols-outlined text-[#f48fb1] text-[20px]">verified</span>
          <span>{toastMessage}</span>
        </div>
      )}

      <main className="max-w-[1440px] w-full mx-auto px-4 sm:px-6 lg:px-12 py-6 sm:py-8 space-y-8 flex-1 pb-28">
        {/* TOP TEACHER CONSOLE HEADER BAR */}
        <header
          className={`p-4 sm:p-5 rounded-3xl bg-white border border-[#fbeaec] shadow-[0_4px_16px_rgba(244,143,177,0.12)] flex items-center justify-between gap-4 relative transition-all ${
            showSpecGuides ? 'ring-2 ring-dashed ring-[#f48fb1]' : ''
          }`}
        >
          {showSpecGuides && (
            <div className="absolute -top-3 right-6 text-[10px] font-mono bg-[#f48fb1] text-white px-2.5 py-0.5 rounded-full z-50 pointer-events-none shadow-xs font-bold">
              Canonical Teacher Console • Matched to Pastel Rainbow Academy Theme
            </div>
          )}

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setMobileSidebarOpen((prev) => !prev)}
              className="lg:hidden w-10 h-10 rounded-full border border-[#f5e4e7] bg-[#fff8f8] text-[#22191b] flex items-center justify-center cursor-pointer hover:bg-[#fff0f2] transition-colors"
              aria-label="Toggle Teacher Navigation"
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
                  setActiveNav('Assessments / Grading');
                }
              }}
              roleBadge="Faculty Console"
              showSpecGuides={showSpecGuides}
            />
          </div>

          {/* Center: Quick Section Indicator */}
          <div className="hidden md:flex items-center gap-2 text-xs font-['Quicksand'] font-bold">
            <span className="text-[#534247]">Teacher Workspace</span>
            <span className="text-[#f5e4e7]">/</span>
            <span className="px-3 py-1 rounded-full bg-[#fff0f2] text-[#964261] border border-[#f5e4e7] shadow-2xs">
              {activeNav}
            </span>
          </div>

          {/* Right: Quick Action Controls */}
          <div className="flex items-center gap-2.5 font-['Quicksand'] font-bold">
            <button
              type="button"
              onClick={() => setActiveNav('One-on-One')}
              className="hidden sm:inline-flex px-3.5 py-2 rounded-full bg-[#fff0f2] hover:bg-[#ffe4e9] text-[#964261] text-xs transition-colors items-center gap-1.5 cursor-pointer border border-[#f5e4e7] shadow-2xs"
            >
              <span className="material-symbols-outlined text-[16px] text-[#f48fb1]">calendar_month</span>
              <span>1-on-1 Clinics (2)</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveNav('Notifications')}
              className={`px-3.5 py-2 rounded-full text-xs transition-colors flex items-center gap-1.5 cursor-pointer ${
                activeNav === 'Notifications'
                  ? 'bg-[#f48fb1] text-white shadow-xs'
                  : 'text-[#22191b] hover:bg-[#fff0f2] border border-[#f5e4e7] bg-[#fff8f8]'
              }`}
            >
              <span className="material-symbols-outlined text-[16px]">
                notifications
              </span>
              <span className="hidden sm:inline">Alerts</span>
              <span className="px-1.5 py-0.2 text-[10px] font-bold rounded-full bg-[#ffe082] text-[#22191b]">
                5
              </span>
            </button>

            <button
              type="button"
              onClick={() => setActiveNav('Profile')}
              className="flex items-center gap-2 pl-2 pr-3 py-1 rounded-full bg-[#fff8f8] hover:bg-[#fff0f2] border border-[#f5e4e7] transition-all cursor-pointer shadow-2xs group"
              title="Teacher Theint Profile"
            >
              <img
                src={TR_THEINT_LOGO_URL}
                alt="Teacher Theint"
                referrerPolicy="no-referrer"
                className="w-7 h-7 rounded-full object-cover border border-[#f48fb1] shadow-2xs"
              />
              <span className="text-xs text-[#22191b] hidden sm:inline group-hover:text-[#f48fb1] transition-colors">
                Tr. Theint
              </span>
            </button>
          </div>
        </header>

        {/* APPLICATION SHELL: 9-ITEM SIDEBAR + MAIN CONTENT CANVAS */}
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* CANONICAL 9-ITEM TEACHER SIDEBAR */}
          <aside
            aria-label="Teacher Primary Navigation"
            className={`${
              mobileSidebarOpen ? 'block' : 'hidden lg:block'
            } w-full lg:w-72 rounded-3xl bg-white border border-[#fbeaec] shadow-[0_4px_16px_rgba(244,143,177,0.12)] p-5 shrink-0 self-start animate-fade-in font-['Quicksand']`}
          >
            <div className="px-3 py-2 text-[11px] font-bold uppercase tracking-wider text-[#964261] flex items-center justify-between">
              <span>Faculty Portals</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#fff0f2] border border-[#f5e4e7] text-[#534247]">
                9 Tracks
              </span>
            </div>

            <nav className="mt-2 space-y-1.5">
              {CANONICAL_TEACHER_NAV.map(({ label, icon, badge }) => {
                const isActive = activeNav === label;
                return (
                  <button
                    key={label}
                    type="button"
                    onClick={() => {
                      setActiveNav(label);
                      setMobileSidebarOpen(false);
                    }}
                    className={`w-full px-4 py-3 rounded-2xl text-left text-xs font-bold flex items-center justify-between transition-all cursor-pointer ${
                      isActive
                        ? 'bg-[#fff0f2] text-[#964261] border border-[#f5e4e7] shadow-xs'
                        : 'text-[#534247] hover:bg-[#fff8f8] hover:text-[#22191b] border border-transparent'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className={`material-symbols-outlined text-[20px] ${
                          isActive ? 'text-[#f48fb1]' : 'text-[#81d4fa]'
                        }`}
                      >
                        {icon}
                      </span>
                      <span>{label}</span>
                    </div>
                    {badge && (
                      <span
                        className={`px-2 py-0.5 text-[10px] font-bold rounded-full ${
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
              })}
            </nav>

            {/* Academic Credentials Box */}
            <div className="mt-6 pt-5 border-t border-[#f5e4e7] space-y-3">
              <div className="p-4 rounded-2xl bg-[#fff8f8] border border-[#fbeaec] space-y-2 text-xs">
                <div className="flex items-center gap-2 text-[#22191b] font-bold">
                  <span className="material-symbols-outlined text-[#a5d6a7] text-[18px]">
                    verified
                  </span>
                  <span>Faculty Accreditation</span>
                </div>
                <p className="text-[11px] text-[#534247] font-['Nunito_Sans'] leading-relaxed">
                  MA TESOL • Cambridge CELTA Certified • Academic Director at Teacher Theint English Academy.
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

          {/* MAIN TEACHER CONTENT CANVAS */}
          <div className="flex-1 w-full space-y-8 animate-fade-in">
            {/* Top Canvas Action Banner */}
            <div className="bg-white rounded-3xl border border-[#fbeaec] p-6 sm:p-8 shadow-[0_4px_16px_rgba(244,143,177,0.12)] flex flex-col sm:flex-row sm:items-center justify-between gap-6">
              <div className="space-y-1">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#fff0f2] text-[#964261] text-xs font-['Quicksand'] font-bold border border-[#f5e4e7]">
                  <span className="material-symbols-outlined text-[16px] text-[#f48fb1]">school</span>
                  <span>Teacher Theint Academic Workspace</span>
                </div>
                <h1 className="font-['Quicksand'] text-2xl sm:text-3xl font-bold text-[#22191b] mt-1">
                  {activeNav === 'Assessments / Grading' && 'IELTS & CEFR Writing Evaluation Queue'}
                  {activeNav === 'Dashboard' && 'Teacher Academic Overview & Quick Actions'}
                  {activeNav === 'Calendar' && 'Virtual Classroom Timetable & Masterclasses'}
                  {activeNav === 'Content' && 'Academic Curriculum Architecture & Modules'}
                  {activeNav === 'My Students' && 'Enrolled Learner Directory & Progress Decrees'}
                  {activeNav === 'One-on-One' && 'One-on-One Academic Clinics & Office Hours'}
                  {activeNav === 'My Courses' && 'Formative Homework Bank & Practice Tasks'}
                  {activeNav === 'Notifications' && 'Faculty Noticeboard & Official Administrative Alerts'}
                  {activeNav === 'Profile' && 'Teacher Theint Faculty Credentials & Academic Record'}
                </h1>
                <p className="text-sm text-[#534247]">
                  Continuous academic assessment, structured grading rubrics, and personalized language guidance.
                </p>
              </div>

              <div className="shrink-0 flex items-center gap-3">
                {activeNav === 'Assessments / Grading' && (
                  <button
                    type="button"
                    onClick={handleBatchPublish}
                    className="btn-tactile-primary px-6 py-3 text-xs flex items-center gap-2 cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[18px]">publish</span>
                    <span>Publish Graded Feedback Batch</span>
                  </button>
                )}
                {activeNav === 'Calendar' && (
                  <button
                    type="button"
                    onClick={() => showToast('Launching Live Zoom Classroom Room #14...')}
                    className="btn-tactile-primary px-6 py-3 text-xs flex items-center gap-2 cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[18px]">videocam</span>
                    <span>Start Live Clinic Room</span>
                  </button>
                )}
                {activeNav === 'One-on-One' && (
                  <button
                    type="button"
                    onClick={() => showToast('Next Office Hour clinic slot opened for booking.')}
                    className="btn-tactile-secondary px-6 py-3 text-xs flex items-center gap-2 cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[18px]">add</span>
                    <span>Open Office Hours Slot</span>
                  </button>
                )}
              </div>
            </div>

            {/* 4 HIGH-CONTRAST PASTEL KPI SUMMARY CARDS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 font-['Quicksand']">
              {/* Card 1: Bubblegum Pink Accent */}
              <div className="bg-white rounded-3xl border border-[#fbeaec] p-6 shadow-[0_4px_16px_rgba(244,143,177,0.12)] space-y-2 relative overflow-hidden group hover:translate-y-[-2px] transition-all">
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#f48fb1]" />
                <div className="flex items-center justify-between text-xs font-bold text-[#534247]">
                  <span>Pending Essays to Grade</span>
                  <span className="material-symbols-outlined text-[#f48fb1]">edit_note</span>
                </div>
                <div className="text-3xl sm:text-4xl font-bold text-[#22191b] pt-1">
                  {submissions.filter((s) => s.status !== 'Completed (Band 7.5)' && s.status !== 'Completed (Band 8.0)').length}
                </div>
                <div className="text-[11px] text-[#964261] font-bold flex items-center gap-1">
                  <span className="inline-block w-2 h-2 rounded-full bg-[#f48fb1]"></span>
                  <span>SLA Target: Within 24 Hours</span>
                </div>
              </div>

              {/* Card 2: Sky Blue Accent */}
              <div className="bg-white rounded-3xl border border-[#fbeaec] p-6 shadow-[0_4px_16px_rgba(244,143,177,0.12)] space-y-2 relative overflow-hidden group hover:translate-y-[-2px] transition-all">
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#81d4fa]" />
                <div className="flex items-center justify-between text-xs font-bold text-[#534247]">
                  <span>Active Enrolled Students</span>
                  <span className="material-symbols-outlined text-[#81d4fa]">group</span>
                </div>
                <div className="text-3xl sm:text-4xl font-bold text-[#22191b] pt-1">128</div>
                <div className="text-[11px] text-[#006685] font-bold flex items-center gap-1">
                  <span className="inline-block w-2 h-2 rounded-full bg-[#81d4fa]"></span>
                  <span>Across 4 Active Cohorts</span>
                </div>
              </div>

              {/* Card 3: Sunshine Yellow Accent */}
              <div className="bg-white rounded-3xl border border-[#fbeaec] p-6 shadow-[0_4px_16px_rgba(244,143,177,0.12)] space-y-2 relative overflow-hidden group hover:translate-y-[-2px] transition-all">
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#ffe082]" />
                <div className="flex items-center justify-between text-xs font-bold text-[#534247]">
                  <span>Today's 1-on-1 Clinics</span>
                  <span className="material-symbols-outlined text-[#dcb236]">support_agent</span>
                </div>
                <div className="text-3xl sm:text-4xl font-bold text-[#22191b] pt-1">2</div>
                <div className="text-[11px] text-[#725c06] font-bold flex items-center gap-1">
                  <span className="inline-block w-2 h-2 rounded-full bg-[#ffe082]"></span>
                  <span>4:00 PM &amp; 5:00 PM MMT</span>
                </div>
              </div>

              {/* Card 4: Soft Mint Accent */}
              <div className="bg-white rounded-3xl border border-[#fbeaec] p-6 shadow-[0_4px_16px_rgba(244,143,177,0.12)] space-y-2 relative overflow-hidden group hover:translate-y-[-2px] transition-all">
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#a5d6a7]" />
                <div className="flex items-center justify-between text-xs font-bold text-[#534247]">
                  <span>Cohort Avg. Band Score</span>
                  <span className="material-symbols-outlined text-[#1b5e20]">auto_graph</span>
                </div>
                <div className="text-3xl sm:text-4xl font-bold text-[#22191b] pt-1">7.4</div>
                <div className="text-[11px] text-[#1b5e20] font-bold flex items-center gap-1">
                  <span className="inline-block w-2 h-2 rounded-full bg-[#a5d6a7]"></span>
                  <span>+0.6 Band Improvement</span>
                </div>
              </div>
            </div>

            {/* TAB VIEW 1: ASSESSMENTS / GRADING */}
            {activeNav === 'Assessments / Grading' && (
              <div className="bg-white rounded-3xl border border-[#fbeaec] overflow-hidden shadow-[0_4px_16px_rgba(244,143,177,0.12)] space-y-4">
                <div className="p-6 sm:p-7 border-b border-[#f5e4e7] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h2 className="font-['Quicksand'] text-xl font-bold text-[#22191b]">
                      Student Assessment Submissions
                    </h2>
                    <p className="text-xs text-[#534247] mt-0.5">
                      Review essay tasks, evaluate against IELTS/CEFR rubrics, and record voice notes.
                    </p>
                  </div>

                  <div className="flex items-center gap-2 font-['Quicksand'] font-bold text-xs">
                    {(['All', 'Pending', 'Completed'] as const).map((tab) => (
                      <button
                        key={tab}
                        type="button"
                        onClick={() => setStatusFilter(tab)}
                        className={`px-4 py-1.5 rounded-full transition-all cursor-pointer ${
                          statusFilter === tab
                            ? 'bg-[#f48fb1] text-white shadow-xs'
                            : 'bg-[#fff8f8] text-[#534247] hover:bg-[#fff0f2] border border-[#f5e4e7]'
                        }`}
                      >
                        {tab}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-[#f5e4e7] bg-[#fff8f8] text-[11px] font-['Quicksand'] font-bold uppercase tracking-wider text-[#534247]">
                        <th className="py-4 px-6">Learner</th>
                        <th className="py-4 px-6">Assessment Task</th>
                        <th className="py-4 px-6">Target Band</th>
                        <th className="py-4 px-6">Status</th>
                        <th className="py-4 px-6 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#f5e4e7] text-xs">
                      {filteredSubmissions.map((row) => (
                        <tr key={row.id} className="hover:bg-[#fff8f8] transition-colors">
                          <td className="py-4 px-6">
                            <div className="flex items-center gap-3">
                              <div className="w-9 h-9 rounded-full bg-[#fff0f2] text-[#964261] border border-[#f5e4e7] flex items-center justify-center font-['Quicksand'] font-bold text-xs shadow-2xs">
                                {row.avatar}
                              </div>
                              <div>
                                <div className="font-['Quicksand'] font-bold text-[#22191b] text-sm">
                                  {row.student}
                                </div>
                                <div className="text-[11px] text-[#534247]">{row.cohort}</div>
                              </div>
                            </div>
                          </td>
                          <td className="py-4 px-6 max-w-md">
                            <div className="font-['Quicksand'] font-bold text-[#22191b]">
                              {row.task}
                            </div>
                            <div className="text-[11px] text-[#534247] truncate">
                              {row.essaySnippet}
                            </div>
                            <div className="text-[10px] text-[#964261] font-medium mt-0.5">
                              Submitted {row.submitted} • {row.wordCount} words
                            </div>
                          </td>
                          <td className="py-4 px-6">
                            <span className="px-3 py-1 rounded-full bg-[#fff0f2] text-[#964261] border border-[#f5e4e7] text-[11px] font-['Quicksand'] font-bold shadow-2xs inline-block">
                              {row.targetBand}
                            </span>
                          </td>
                          <td className="py-4 px-6">
                            <span
                              className={`px-3 py-1 rounded-full text-[11px] font-['Quicksand'] font-bold inline-block shadow-2xs ${
                                row.status.includes('Completed')
                                  ? 'bg-[#e8f5e9] text-[#1b5e20] border border-[#c8e6c9]'
                                  : row.status === 'In Review'
                                  ? 'bg-[#eef8ff] text-[#006685] border border-[#bee9ff]'
                                  : 'bg-[#fff0f2] text-[#964261] border border-[#f5e4e7]'
                              }`}
                            >
                              {row.status}
                            </span>
                          </td>
                          <td className="py-4 px-6 text-right">
                            <button
                              type="button"
                              onClick={() => handleOpenRubric(row)}
                              className={`px-4 py-2 rounded-full font-['Quicksand'] font-bold text-xs transition-all cursor-pointer ${
                                row.status.includes('Completed')
                                  ? 'bg-[#fff8f8] text-[#534247] border border-[#f5e4e7] hover:bg-[#fff0f2]'
                                  : 'btn-tactile-primary'
                              }`}
                            >
                              {row.status.includes('Completed') ? 'Review Rubric' : 'Grade Rubric'}
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* TAB VIEW 2: CALENDAR / LIVE CLASSES */}
            {activeNav === 'Calendar' && (
              <div className="space-y-6">
                <SharedCalendarWorkspace
                  role="TEACHER"
                  teacherId="TCH-001"
                  onNavigateToOneOnOne={() => setActiveNav('One-on-One')}
                  onLaunchMeeting={(sess) => showToast(`Launching Virtual Classroom for ${sess.title}...`)}
                />
              </div>
            )}

            {/* TAB VIEW 3: CURRICULUM & CONTENT */}
            {activeNav === 'Content' && (
              <div className="bg-white rounded-3xl border border-[#fbeaec] p-6 sm:p-8 shadow-[0_4px_16px_rgba(244,143,177,0.12)] space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#f5e4e7]">
                  <div>
                    <h2 className="font-['Quicksand'] text-xl font-bold text-[#22191b]">
                      Teacher Theint Curriculum Registry
                    </h2>
                    <p className="text-xs text-[#534247] mt-1">
                      Published modules and active draft content submitted to the Admin Master Console.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => showToast('Drafting new Module 5: Formal Written Inquiries...')}
                    className="btn-tactile-primary px-5 py-2.5 text-xs flex items-center gap-2 cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[18px]">add_circle</span>
                    <span>Submit New Module</span>
                  </button>
                </div>

                <div className="space-y-4">
                  {[
                    {
                      title: 'Practical Speaking Essentials (Level 2)',
                      modules: '4 Modules • 24 Lessons • 24 Pronunciation Models',
                      status: 'Production Live',
                      badgeColor: 'bg-[#e8f5e9] text-[#1b5e20] border-[#c8e6c9]',
                    },
                    {
                      title: 'Academic Grammar & Sentence Architecture',
                      modules: '5 Modules • 30 Lessons • Diagnostic Auto-Exercises',
                      status: 'Production Live',
                      badgeColor: 'bg-[#e8f5e9] text-[#1b5e20] border-[#c8e6c9]',
                    },
                    {
                      title: 'Everyday Spoken English Essentials (Free Direct Access)',
                      modules: '2 Modules • 10 Lessons • Instant Enrollment Bypass',
                      status: 'Production Live',
                      badgeColor: 'bg-[#eef8ff] text-[#006685] border-[#bee9ff]',
                    },
                    {
                      title: 'Module 4: Business Telephoning & Stakeholder Communication',
                      modules: '6 Lessons • 14 Audio Artifacts • Drafted by Tr. Theint',
                      status: 'Pending Admin Decree',
                      badgeColor: 'bg-[#fff0f2] text-[#964261] border-[#f5e4e7]',
                    },
                  ].map((curr, idx) => (
                    <div
                      key={idx}
                      className="p-5 rounded-2xl bg-[#fff8f8] border border-[#fbeaec] flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-2xs font-['Quicksand']"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-sm text-[#22191b]">{curr.title}</span>
                          <span
                            className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${curr.badgeColor}`}
                          >
                            {curr.status}
                          </span>
                        </div>
                        <p className="text-xs text-[#534247] font-['Nunito_Sans']">
                          {curr.modules}
                        </p>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => showToast(`Opened curriculum tree for ${curr.title}`)}
                          className="px-4 py-1.5 rounded-full bg-white text-[#22191b] border border-[#f5e4e7] hover:bg-[#fff0f2] text-xs font-bold transition-colors cursor-pointer"
                        >
                          Inspect Outline
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB VIEW 4: MY STUDENTS */}
            {activeNav === 'My Students' && (
              <div className="bg-white rounded-3xl border border-[#fbeaec] p-6 sm:p-8 shadow-[0_4px_16px_rgba(244,143,177,0.12)] space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#f5e4e7]">
                  <div>
                    <h2 className="font-['Quicksand'] text-xl font-bold text-[#22191b]">
                      Active Enrolled Learners
                    </h2>
                    <p className="text-xs text-[#534247] mt-1">
                      Direct faculty overview of students under Teacher Theint mentorship.
                    </p>
                  </div>
                  <span className="text-xs font-['Quicksand'] font-bold px-3.5 py-1.5 rounded-full bg-[#fff0f2] text-[#964261] border border-[#f5e4e7]">
                    128 Students Active
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-['Quicksand']">
                  {[
                    {
                      name: 'Daw Thuzar',
                      avatar: 'DT',
                      track: 'Practical Speaking Essentials',
                      level: 'Confirmed Level 2',
                      progress: 68,
                    },
                    {
                      name: 'Ko Min Thu',
                      avatar: 'KM',
                      track: 'Executive Business English (1 Month)',
                      level: 'CEFR B2+',
                      progress: 42,
                    },
                    {
                      name: 'Aye Chan May',
                      avatar: 'AM',
                      track: 'IELTS Band 7.5+ Masterclass',
                      level: 'Band 7.5 Candidate',
                      progress: 85,
                    },
                    {
                      name: 'May Thu',
                      avatar: 'MT',
                      track: 'Everyday Spoken English Essentials',
                      level: 'Level 2 Fluency',
                      progress: 92,
                    },
                  ].map((stu, i) => (
                    <div
                      key={i}
                      className="p-5 rounded-2xl bg-[#fff8f8] border border-[#fbeaec] flex items-center justify-between gap-4 shadow-2xs"
                    >
                      <div className="flex items-center gap-3.5">
                        <div className="w-10 h-10 rounded-full bg-[#f48fb1] text-white flex items-center justify-center font-bold text-xs ring-2 ring-[#ffd9e2]">
                          {stu.avatar}
                        </div>
                        <div>
                          <div className="font-bold text-sm text-[#22191b]">{stu.name}</div>
                          <div className="text-[11px] text-[#534247] font-['Nunito_Sans']">
                            {stu.track}
                          </div>
                          <div className="text-[10px] text-[#964261] font-bold mt-0.5">
                            {stu.level} • {stu.progress}% Completed
                          </div>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => showToast(`Academic Record viewed for ${stu.name}.`)}
                        className="px-3.5 py-1.5 rounded-full bg-white text-xs font-bold border border-[#f5e4e7] hover:bg-[#fff0f2] text-[#22191b] cursor-pointer"
                      >
                        Profile
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB VIEW 5: ONE-ON-ONE */}
            {activeNav === 'One-on-One' && (
              <TeacherOneOnOneView
                teacherId="tr-theint"
                teacherName="Teacher Theint"
                showSpecGuides={showSpecGuides}
              />
            )}

            {/* TAB VIEW 6: MY COURSES & ASSIGNMENT BANK */}
            {activeNav === 'My Courses' && (
              <div className="bg-white rounded-3xl border border-[#fbeaec] p-6 sm:p-8 shadow-[0_4px_16px_rgba(244,143,177,0.12)] space-y-6 font-['Quicksand']">
                <div className="flex items-center justify-between pb-4 border-b border-[#f5e4e7]">
                  <div>
                    <h2 className="text-xl font-bold text-[#22191b]">Formative Assignment Bank</h2>
                    <p className="text-xs text-[#534247] mt-1 font-['Nunito_Sans']">
                      Coursework tasks, speaking audio prompts, and writing assignments managed across 7 tracks.
                    </p>
                  </div>
                </div>

                <div className="space-y-3.5">
                  {[
                    {
                      title: 'Writing Task 2: Public Transport vs. Road Expansion',
                      track: 'IELTS Band 7.5+',
                      due: 'Every Tuesday',
                      submissions: '14 Submitted / 2 Pending Grading',
                    },
                    {
                      title: 'Situational Dialogue: Expressing Opinions Concisely',
                      track: 'General English Level 2',
                      due: 'Continuous',
                      submissions: '28 Submitted / All Auto-Checked',
                    },
                    {
                      title: 'Unit 4 Diagnostic: Complex Adverbial Clauses',
                      track: 'Academic Grammar',
                      due: 'End of Module 4',
                      submissions: '19 Submitted / 1 Pending Review',
                    },
                  ].map((asg, idx) => (
                    <div
                      key={idx}
                      className="p-5 rounded-2xl bg-[#fff8f8] border border-[#fbeaec] flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-2xs"
                    >
                      <div className="space-y-1">
                        <div className="font-bold text-sm text-[#22191b]">{asg.title}</div>
                        <div className="text-xs text-[#534247] font-['Nunito_Sans']">
                          Track: {asg.track} • Due: {asg.due}
                        </div>
                        <div className="text-[11px] text-[#f48fb1] font-bold">{asg.submissions}</div>
                      </div>
                      <button
                        type="button"
                        onClick={() => showToast(`Opened assignment details for ${asg.title}`)}
                        className="px-4 py-2 rounded-full bg-white text-xs font-bold border border-[#f5e4e7] hover:bg-[#fff0f2] text-[#22191b] cursor-pointer"
                      >
                        Inspect Submissions
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB VIEW 7: DASHBOARD & FEEDBACK */}
            {activeNav === 'Dashboard' && (
              <div className="bg-white rounded-3xl border border-[#fbeaec] p-6 sm:p-8 shadow-[0_4px_16px_rgba(244,143,177,0.12)] space-y-6 font-['Quicksand']">
                <div className="flex items-center justify-between pb-4 border-b border-[#f5e4e7]">
                  <div>
                    <h2 className="text-xl font-bold text-[#22191b]">Personalized Feedback Desk</h2>
                    <p className="text-xs text-[#534247] mt-1 font-['Nunito_Sans']">
                      Audio voice note responses and qualitative comments sent directly to students.
                    </p>
                  </div>
                </div>

                <div className="p-6 rounded-2xl bg-[#fff8f8] border border-[#fbeaec] space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm text-[#22191b]">Quick Audio Feedback Recorder</span>
                    <span className="text-xs text-[#964261] font-bold">Encouraging Tone Required</span>
                  </div>
                  <p className="text-xs text-[#534247] font-['Nunito_Sans'] leading-relaxed">
                    Record voice remarks (up to 3 minutes) addressing pronunciation nuances, syllable stress, and positive encouragement for student academic portfolios.
                  </p>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => showToast('Recording microphone active. Speak encouraging remarks...')}
                      className="btn-tactile-primary px-5 py-2.5 text-xs flex items-center gap-2 cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-[18px]">mic</span>
                      <span>Record Audio Note</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => showToast('Sample Teacher Theint audio comment playback ready.')}
                      className="px-4 py-2.5 rounded-full bg-white text-xs font-bold border border-[#f5e4e7] hover:bg-[#fff0f2] text-[#22191b] cursor-pointer flex items-center gap-1.5"
                    >
                      <span className="material-symbols-outlined text-[16px] text-[#f48fb1]">play_circle</span>
                      <span>Play Sample Model (0:48)</span>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* TAB VIEW 8: NOTIFICATIONS */}
            {activeNav === 'Notifications' && (
              <div className="bg-white rounded-3xl border border-[#fbeaec] p-6 sm:p-8 shadow-[0_4px_16px_rgba(244,143,177,0.12)] space-y-4 font-['Quicksand']">
                <div className="flex items-center justify-between pb-4 border-b border-[#f5e4e7]">
                  <h2 className="text-xl font-bold text-[#22191b]">Faculty Academic Alerts</h2>
                  <span className="text-xs font-bold px-3 py-1 rounded-full bg-[#fff0f2] text-[#964261] border border-[#f5e4e7]">
                    5 Unread Alerts
                  </span>
                </div>

                <div className="space-y-3">
                  {[
                    {
                      icon: 'upload_file',
                      color: 'text-[#f48fb1]',
                      title: 'New Writing Task 2 Submission: Aye Chan May',
                      time: '2 hours ago',
                      desc: 'Cohort #14 student uploaded essay on Public Transport vs. Road Expansion.',
                    },
                    {
                      icon: 'verified',
                      color: 'text-[#81d4fa]',
                      title: 'Admin Verification Decree Signed',
                      time: '5 hours ago',
                      desc: 'Student Daw Thuzar confirmed for Level 2 cohort after payment verification.',
                    },
                    {
                      icon: 'calendar_today',
                      color: 'text-[#ffe082]',
                      title: 'Tomorrow 1-on-1 Office Hours Reminder',
                      time: 'Yesterday',
                      desc: 'Scheduled clinic at 7:00 PM MMT with Daw Thuzar confirmed.',
                    },
                  ].map((notif, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-2xl bg-[#fff8f8] border border-[#fbeaec] flex items-start gap-3.5 shadow-2xs"
                    >
                      <span className={`material-symbols-outlined text-[24px] ${notif.color} shrink-0 mt-0.5`}>
                        {notif.icon}
                      </span>
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-sm text-[#22191b]">{notif.title}</span>
                          <span className="text-[10px] text-[#534247]">{notif.time}</span>
                        </div>
                        <p className="text-xs text-[#534247] font-['Nunito_Sans']">{notif.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB VIEW 9: PROFILE */}
            {activeNav === 'Profile' && (
              <div className="bg-white rounded-3xl border border-[#fbeaec] p-6 sm:p-10 shadow-[0_4px_16px_rgba(244,143,177,0.12)] space-y-8 font-['Quicksand']">
                <div className="flex flex-col md:flex-row items-center gap-6 pb-6 border-b border-[#f5e4e7]">
                  <img
                    src={TR_THEINT_LOGO_URL}
                    alt="Teacher Theint"
                    referrerPolicy="no-referrer"
                    className="w-24 h-24 rounded-full object-cover border-4 border-[#f48fb1] shadow-md bg-white shrink-0"
                  />
                  <div className="space-y-1 text-center md:text-left">
                    <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
                      <h2 className="text-2xl font-bold text-[#22191b]">Teacher Theint</h2>
                      <span className="px-3 py-0.5 rounded-full bg-[#fff0f2] text-[#964261] border border-[#f5e4e7] text-xs font-bold">
                        Academic Director &amp; Lead Faculty
                      </span>
                    </div>
                    <p className="text-xs text-[#534247] font-['Nunito_Sans']">
                      MA in TESOL (Teaching English to Speakers of Other Languages) • Cambridge CELTA Qualified
                    </p>
                    <p className="text-xs text-[#964261] font-bold">
                      Teacher Theint English Academy • Over 8,500 Myanmar Learners Mentored
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-5 rounded-2xl bg-[#fff8f8] border border-[#fbeaec] space-y-2">
                    <h4 className="font-bold text-sm text-[#22191b] flex items-center gap-2">
                      <span className="material-symbols-outlined text-[#f48fb1] text-[18px]">verified</span>
                      <span>Faculty Accreditation &amp; Credentials</span>
                    </h4>
                    <ul className="text-xs text-[#534247] font-['Nunito_Sans'] space-y-1.5 list-disc list-inside">
                      <li>MA in Applied Linguistics &amp; TESOL</li>
                      <li>Cambridge CELTA Pass A (Certificate in English Language Teaching to Adults)</li>
                      <li>IELTS Academic Band 8.5 Master Instructor</li>
                      <li>Certified English Language Curriculum Designer</li>
                    </ul>
                  </div>

                  <div className="p-5 rounded-2xl bg-[#fff8f8] border border-[#fbeaec] space-y-2">
                    <h4 className="font-bold text-sm text-[#22191b] flex items-center gap-2">
                      <span className="material-symbols-outlined text-[#81d4fa] text-[18px]">schedule</span>
                      <span>Faculty Office Hours Schedule</span>
                    </h4>
                    <p className="text-xs text-[#534247] font-['Nunito_Sans'] leading-relaxed">
                      Regular clinic hours: Monday to Friday, 4:00 PM – 8:00 PM (MMT).
                      All one-on-one sessions are conducted with digital video recording and individualized written feedback debriefs.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* RUBRIC GRADING MODAL */}
      {selectedSubmission && (
        <div className="fixed inset-0 bg-[#22191b]/40 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-[0_16px_48px_rgba(244,143,177,0.25)] border border-[#fbeaec] space-y-6 max-h-[90vh] overflow-y-auto animate-fade-in font-['Quicksand']">
            <div className="flex items-center justify-between pb-4 border-b border-[#f5e4e7]">
              <div>
                <span className="text-[11px] font-bold text-[#f48fb1] uppercase tracking-wider">
                  IELTS / CEFR Academic Rubric
                </span>
                <h3 className="font-bold text-lg text-[#22191b]">
                  Grading: {selectedSubmission.student}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedSubmission(null)}
                className="w-9 h-9 rounded-full border border-[#f5e4e7] bg-[#fff8f8] text-[#534247] hover:text-[#22191b] flex items-center justify-center cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>

            {/* Essay Snippet Box */}
            <div className="p-4 rounded-2xl bg-[#fff8f8] border border-[#fbeaec] space-y-2 text-xs">
              <div className="flex items-center justify-between font-bold text-[#22191b]">
                <span>{selectedSubmission.task}</span>
                <span className="text-[#964261]">{selectedSubmission.wordCount} words</span>
              </div>
              <p className="font-['Nunito_Sans'] text-[#534247] italic leading-relaxed">
                "{selectedSubmission.essaySnippet}"
              </p>
            </div>

            {/* Rubric Criteria Sliders */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-bold text-sm text-[#22191b]">Evaluation Criteria (Band 1.0 – 9.0)</span>
                <span className="text-sm font-bold px-3 py-0.5 rounded-full bg-[#f48fb1] text-white shadow-2xs">
                  Overall Band: {calculateBandAverage().toFixed(1)}
                </span>
              </div>

              {[
                { key: 'task' as const, label: 'Task Achievement / Response', desc: 'Addresses all parts of the prompt with well-developed ideas' },
                { key: 'coherence' as const, label: 'Coherence & Cohesion', desc: 'Logical sequencing, paragraphing, and natural linkers' },
                { key: 'lexical' as const, label: 'Lexical Resource', desc: 'Precision of academic vocabulary and collocation awareness' },
                { key: 'grammar' as const, label: 'Grammatical Range & Accuracy', desc: 'Variety of complex structures and syntactic control' },
              ].map(({ key, label, desc }) => (
                <div key={key} className="p-3.5 rounded-2xl bg-[#fff8f8] border border-[#fbeaec] space-y-1.5 text-xs">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-bold text-[#22191b]">{label}</span>
                      <span className="text-[11px] text-[#534247] block font-['Nunito_Sans']">{desc}</span>
                    </div>
                    <span className="font-bold text-sm text-[#f48fb1] px-2.5 py-0.5 rounded-lg bg-white border border-[#f5e4e7]">
                      {rubricScores[key].toFixed(1)}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="5.0"
                    max="9.0"
                    step="0.5"
                    value={rubricScores[key]}
                    onChange={(e) =>
                      setRubricScores({ ...rubricScores, [key]: parseFloat(e.target.value) })
                    }
                    className="w-full accent-[#f48fb1] cursor-pointer"
                  />
                </div>
              ))}
            </div>

            {/* Teacher Qualitative Feedback */}
            <div className="space-y-2 text-xs">
              <label className="font-bold text-[#22191b] block">
                Instructor Detailed Remarks &amp; Corrections
              </label>
              <textarea
                rows={3}
                value={teacherNotes}
                onChange={(e) => setTeacherNotes(e.target.value)}
                placeholder="Provide constructive feedback, grammatical highlights, and recommended next exercises..."
                className="w-full p-3.5 rounded-2xl border border-[#f5e4e7] bg-[#fff8f8] font-['Nunito_Sans'] text-xs text-[#22191b] focus:outline-none focus:ring-2 focus:ring-[#f48fb1]"
              />
            </div>

            {/* Audio Voice Note Simulation */}
            <div className="p-3.5 rounded-2xl bg-[#fff8f8] border border-[#fbeaec] flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#f48fb1]">mic</span>
                <span className="font-bold text-[#22191b]">
                  {voiceNoteRecorded ? 'Voice Note Attached (1:12)' : 'Optional Voice Comment'}
                </span>
              </div>
              <button
                type="button"
                onClick={() => {
                  setVoiceNoteRecorded(!voiceNoteRecorded);
                  showToast(voiceNoteRecorded ? 'Voice note removed.' : 'Voice note recorded successfully!');
                }}
                className="px-3 py-1 rounded-full bg-white border border-[#f5e4e7] text-[#964261] font-bold hover:bg-[#fff0f2] cursor-pointer text-xs"
              >
                {voiceNoteRecorded ? 'Re-record' : 'Record Voice'}
              </button>
            </div>

            {/* Modal Actions */}
            <div className="flex items-center gap-3 pt-4 border-t border-[#f5e4e7]">
              <button
                type="button"
                onClick={() => setSelectedSubmission(null)}
                className="flex-1 py-3 rounded-full bg-[#fff0f2] text-[#964261] font-bold text-xs hover:bg-[#ffe4e9] transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSaveGrading}
                className="flex-1 btn-tactile-primary py-3 text-xs cursor-pointer"
              >
                Publish Official Band Decree
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
