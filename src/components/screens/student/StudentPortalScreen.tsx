import React, { useState } from 'react';
import { ScreenId, StudentNavItem } from '../../../types/navigation';
import { StudentOneOnOneView } from './StudentOneOnOneView';
import { BrandLogo, TR_THEINT_LOGO_URL } from '../../navigation/BrandLogo';

interface StudentPortalScreenProps {
  onNavigateScreen?: (screenId: ScreenId) => void;
  showSpecGuides?: boolean;
}

export const StudentPortalScreen: React.FC<StudentPortalScreenProps> = ({
  onNavigateScreen,
  showSpecGuides = false,
}) => {
  const [activeNav, setActiveNav] = useState<StudentNavItem>('Home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mentorshipModalOpen, setMentorshipModalOpen] = useState(false);
  const [notificationDropdownOpen, setNotificationDropdownOpen] = useState(false);
  const [editProfileModalOpen, setEditProfileModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4500);
  };

  // Editable student state
  const [studentInfo, setStudentInfo] = useState({
    name: 'May Thu (Aye Chan May)',
    id: 'TTE-2024-8841',
    email: 'maythu.scholar@gmail.com',
    phone: '+95 9 798 123 456',
    level: 'Level 2 – Intermediate',
    track: 'CEFR B2 → C1 Track (IELTS Academic Band 7.5+ Mastery)',
    cohort: 'Cohort #14 (Weekend Intensive)',
    enrollDate: 'January 15, 2024',
    city: 'Yangon, Myanmar',
  });

  const sidebarNavItems: { label: StudentNavItem; icon: string; badge?: string }[] = [
    { label: 'Home', icon: 'home' },
    { label: 'Courses', icon: 'menu_book' },
    { label: 'My Courses', icon: 'folder_shared' },
    { label: 'Assessments', icon: 'assignment' },
    { label: 'Progress', icon: 'trending_up' },
    { label: 'One-on-One', icon: 'person_pin' },
    { label: 'Calendar', icon: 'calendar_today' },
    { label: 'Notifications', icon: 'notifications', badge: '1' },
    { label: 'Profile', icon: 'person' },
  ];

  const handleNavClick = (item: StudentNavItem) => {
    setActiveNav(item);
    setMobileMenuOpen(false);
    if (item === 'Courses' && onNavigateScreen) {
      onNavigateScreen('PUB-02-COURSES');
    } else if (item === 'Assessments' && onNavigateScreen) {
      onNavigateScreen('STU-EX-01');
    }
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
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-xs z-40 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      <main className="max-w-[1440px] w-full mx-auto px-4 sm:px-6 lg:px-12 py-6 sm:py-8 space-y-8 flex-1 pb-28">
        {/* TOP STUDENT CONSOLE HEADER BAR (Identical to TeacherPortalScreen) */}
        <header
          className={`p-4 sm:p-5 rounded-3xl bg-white border border-[#fbeaec] shadow-[0_4px_16px_rgba(244,143,177,0.12)] flex items-center justify-between gap-4 relative transition-all ${
            showSpecGuides ? 'ring-2 ring-dashed ring-[#f48fb1]' : ''
          }`}
        >
          {showSpecGuides && (
            <div className="absolute -top-3 right-6 text-[10px] font-mono bg-[#f48fb1] text-white px-2.5 py-0.5 rounded-full z-50 pointer-events-none shadow-xs font-bold">
              Canonical Student Learning Portal • Matched to Pastel Rainbow Academy Theme
            </div>
          )}

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              className="lg:hidden w-10 h-10 rounded-full border border-[#f5e4e7] bg-[#fff8f8] text-[#22191b] flex items-center justify-center cursor-pointer hover:bg-[#fff0f2] transition-colors"
              aria-label="Toggle Student Navigation"
            >
              <span className="material-symbols-outlined text-[20px]">
                {mobileMenuOpen ? 'close' : 'menu'}
              </span>
            </button>

            <BrandLogo
              onClick={() => {
                if (onNavigateScreen) {
                  onNavigateScreen('PUB-01-HOME');
                } else {
                  setActiveNav('Home');
                }
              }}
              roleBadge="Student Portal"
              showSpecGuides={showSpecGuides}
            />
          </div>

          {/* Center: Quick Section Indicator */}
          <div className="hidden md:flex items-center gap-2 text-xs font-['Quicksand'] font-bold">
            <span className="text-[#534247]">Student Learning Portal</span>
            <span className="text-[#f5e4e7]">/</span>
            <span className="px-3 py-1 rounded-full bg-[#fff0f2] text-[#964261] border border-[#f5e4e7] shadow-2xs">
              {activeNav}
            </span>
          </div>

          {/* Right: Quick Action Controls */}
          <div className="flex items-center gap-2.5 font-['Quicksand'] font-bold">
            {/* 1-on-1 Mentorship Quick Link */}
            <button
              type="button"
              onClick={() => handleNavClick('One-on-One')}
              className="hidden sm:inline-flex px-3.5 py-2 rounded-full bg-[#fff0f2] hover:bg-[#ffe4e9] text-[#964261] text-xs transition-colors items-center gap-1.5 cursor-pointer border border-[#f5e4e7] shadow-2xs"
            >
              <span className="material-symbols-outlined text-[16px] text-[#f48fb1]">calendar_month</span>
              <span>1-on-1 Mentorship</span>
            </button>

            {/* Official Level Minimal Badge */}
            <div className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#fff8f8] border border-[#f5e4e7] text-xs shadow-2xs text-[#534247]">
              <span className="material-symbols-outlined text-[#a5d6a7] text-[16px]">verified</span>
              <span>Level: <strong className="text-[#22191b]">Level 2</strong></span>
            </div>

            {/* Notifications Button */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setNotificationDropdownOpen((prev) => !prev)}
                className={`px-3.5 py-2 rounded-full text-xs transition-colors flex items-center gap-1.5 cursor-pointer ${
                  notificationDropdownOpen || activeNav === 'Notifications'
                    ? 'bg-[#f48fb1] text-white shadow-xs'
                    : 'text-[#22191b] hover:bg-[#fff0f2] border border-[#f5e4e7] bg-[#fff8f8]'
                }`}
                title="Academic Notifications"
              >
                <span className="material-symbols-outlined text-[16px]">
                  notifications
                </span>
                <span className="hidden sm:inline">Alerts</span>
                <span className="px-1.5 py-0.2 text-[10px] font-bold rounded-full bg-[#ffe082] text-[#22191b]">
                  1
                </span>
              </button>

              {notificationDropdownOpen && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setNotificationDropdownOpen(false)}
                    aria-hidden="true"
                  />
                  <div className="absolute right-0 top-full mt-2 w-72 sm:w-80 bg-white rounded-3xl shadow-[0_8px_30px_rgba(244,143,177,0.22)] border border-[#fbeaec] p-5 z-50 text-xs space-y-3 animate-fade-in font-['Quicksand']">
                    <div className="flex items-center justify-between pb-2 border-b border-[#f5e4e7]">
                      <span className="font-bold text-sm text-[#22191b]">
                        Academic Notices
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full bg-[#fff0f2] text-[#964261] text-[10px] font-bold border border-[#f5e4e7]">
                        1 New
                      </span>
                    </div>
                    <div className="p-3.5 rounded-2xl bg-[#fff8f8] border border-[#fbeaec] space-y-1">
                      <div className="font-bold text-[#22191b]">
                        Formal Evaluation Scheduled
                      </div>
                      <p className="text-[11px] text-[#534247] font-['Nunito_Sans']">
                        Oral &amp; Practical Assessment ready for Module 3 with Teacher Theint.
                      </p>
                      <span className="text-[10px] text-[#f48fb1] font-bold block pt-1">
                        Upcoming • Saturday 7:00 PM
                      </span>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Profile Avatar Quick Action */}
            <button
              type="button"
              onClick={() => setActiveNav('Profile')}
              className={`flex items-center gap-2 pl-2 pr-3 py-1 rounded-full border transition-all cursor-pointer shadow-2xs group ${
                activeNav === 'Profile'
                  ? 'bg-[#fff0f2] border-[#f48fb1] text-[#964261]'
                  : 'bg-[#fff8f8] hover:bg-[#fff0f2] border-[#f5e4e7] text-[#22191b]'
              }`}
              title="Student Profile"
            >
              <div className="w-7 h-7 rounded-full bg-[#f48fb1] text-white flex items-center justify-center text-[11px] font-bold shadow-2xs">
                MT
              </div>
              <span className="text-xs hidden sm:inline group-hover:text-[#f48fb1] transition-colors">
                May Thu
              </span>
            </button>
          </div>
        </header>

        {/* APPLICATION SHELL: 9-ITEM STUDENT SIDEBAR + MAIN CONTENT CANVAS */}
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* CANONICAL 9-ITEM STUDENT SIDEBAR */}
          <aside
            aria-label="Student Primary Navigation"
            className={`${
              mobileMenuOpen ? 'block' : 'hidden lg:block'
            } w-full lg:w-72 rounded-3xl bg-white border border-[#fbeaec] shadow-[0_4px_16px_rgba(244,143,177,0.12)] p-5 shrink-0 self-start animate-fade-in font-['Quicksand']`}
          >
            <div className="px-3 py-2 text-[11px] font-bold uppercase tracking-wider text-[#964261] flex items-center justify-between">
              <span>Student Portals</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#fff0f2] border border-[#f5e4e7] text-[#534247]">
                9 Tracks
              </span>
            </div>

            <nav className="mt-2 space-y-1.5">
              {sidebarNavItems.map(({ label, icon, badge }) => {
                const isActive = activeNav === label;
                return (
                  <button
                    key={label}
                    type="button"
                    onClick={() => handleNavClick(label)}
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

            {/* Student Learner Accreditation Box */}
            <div className="mt-6 pt-5 border-t border-[#f5e4e7] space-y-3">
              <div className="p-4 rounded-2xl bg-[#fff8f8] border border-[#fbeaec] space-y-2 text-xs">
                <div className="flex items-center gap-2 text-[#22191b] font-bold">
                  <span className="material-symbols-outlined text-[#a5d6a7] text-[18px]">
                    verified
                  </span>
                  <span>Student Accreditation</span>
                </div>
                <p className="text-[11px] text-[#534247] font-['Nunito_Sans'] leading-relaxed">
                  May Thu • {studentInfo.id} • Cambridge CEFR B2 Track at Teacher Theint English Academy.
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

          {/* MAIN STUDENT CONTENT CANVAS */}
          <div className="flex-1 w-full space-y-8 animate-fade-in">
            {/* Top Canvas Action Banner */}
            <div className="bg-white rounded-3xl border border-[#fbeaec] p-6 sm:p-8 shadow-[0_4px_16px_rgba(244,143,177,0.12)] flex flex-col sm:flex-row sm:items-center justify-between gap-6">
              <div className="space-y-1">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#fff0f2] text-[#964261] text-xs font-['Quicksand'] font-bold border border-[#f5e4e7]">
                  <span className="material-symbols-outlined text-[16px] text-[#f48fb1]">school</span>
                  <span>Teacher Theint Student Learning Portal</span>
                </div>
                <h1 className="font-['Quicksand'] text-2xl sm:text-3xl font-bold text-[#22191b] mt-1">
                  {activeNav === 'Home' && 'Welcome back, May Thu'}
                  {activeNav === 'Profile' && 'Student Profile & Academic Credentials'}
                  {activeNav === 'One-on-One' && 'One-on-One Mentorship Workspace & Scheduling'}
                  {activeNav === 'Courses' && 'English Course Catalog & Enrollment Paths'}
                  {activeNav === 'My Courses' && 'My Active Enrolled Coursework & Lessons'}
                  {activeNav === 'Assessments' && 'Continuous Evaluation & Placement Decrees'}
                  {activeNav === 'Progress' && 'CEFR Language Milestones & Attendance'}
                  {activeNav === 'Calendar' && 'Virtual Classroom Timetable & Masterclasses'}
                  {activeNav === 'Notifications' && 'Official Academic Notices & Feedback Decrees'}
                </h1>
                <p className="text-sm text-[#534247]">
                  Continuous academic assessment, structured lessons, and personalized language guidance with Teacher Theint.
                </p>
              </div>

              <div className="shrink-0 flex items-center gap-3">
                {activeNav === 'Profile' ? (
                  <button
                    type="button"
                    onClick={() => setEditProfileModalOpen(true)}
                    className="btn-tactile-secondary px-6 py-3 text-xs flex items-center gap-2 cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[18px]">edit</span>
                    <span>Edit Profile Data</span>
                  </button>
                ) : activeNav === 'One-on-One' ? (
                  <button
                    type="button"
                    onClick={() => setMentorshipModalOpen(true)}
                    className="btn-tactile-secondary px-6 py-3 text-xs flex items-center gap-2 cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[18px]">event</span>
                    <span>Next Session Details</span>
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => onNavigateScreen?.('STU-LESSON-01')}
                    className="btn-tactile-primary px-6 py-3 text-xs flex items-center gap-2 cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[18px]">play_circle</span>
                    <span>Continue Next Lesson</span>
                  </button>
                )}
              </div>
            </div>

            {/* 4 HIGH-CONTRAST PASTEL KPI SUMMARY CARDS (Matching Teacher Academic Portal) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 font-['Quicksand']">
              {/* Card 1: Bubblegum Pink Accent */}
              <div className="bg-white rounded-3xl border border-[#fbeaec] p-6 shadow-[0_4px_16px_rgba(244,143,177,0.12)] space-y-2 relative overflow-hidden group hover:translate-y-[-2px] transition-all">
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#f48fb1]" />
                <div className="flex items-center justify-between text-xs font-bold text-[#534247]">
                  <span>Current Progress</span>
                  <span className="material-symbols-outlined text-[#f48fb1]">trending_up</span>
                </div>
                <div className="text-3xl sm:text-4xl font-bold text-[#22191b] pt-1">
                  Level 2
                </div>
                <div className="text-[11px] text-[#964261] font-bold flex items-center gap-1">
                  <span className="inline-block w-2 h-2 rounded-full bg-[#f48fb1]"></span>
                  <span>Module 3: Situational Dialogue (48%)</span>
                </div>
              </div>

              {/* Card 2: Sky Blue Accent */}
              <div className="bg-white rounded-3xl border border-[#fbeaec] p-6 shadow-[0_4px_16px_rgba(244,143,177,0.12)] space-y-2 relative overflow-hidden group hover:translate-y-[-2px] transition-all">
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#81d4fa]" />
                <div className="flex items-center justify-between text-xs font-bold text-[#534247]">
                  <span>Enrolled Courses</span>
                  <span className="material-symbols-outlined text-[#81d4fa]">auto_stories</span>
                </div>
                <div className="text-3xl sm:text-4xl font-bold text-[#22191b] pt-1">
                  3 Courses
                </div>
                <div className="text-[11px] text-[#006685] font-bold flex items-center gap-1">
                  <span className="inline-block w-2 h-2 rounded-full bg-[#81d4fa]"></span>
                  <span>2 Active Tracks • 1 Certificate Eligible</span>
                </div>
              </div>

              {/* Card 3: Sunshine Yellow Accent */}
              <div className="bg-white rounded-3xl border border-[#fbeaec] p-6 shadow-[0_4px_16px_rgba(244,143,177,0.12)] space-y-2 relative overflow-hidden group hover:translate-y-[-2px] transition-all">
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#ffe082]" />
                <div className="flex items-center justify-between text-xs font-bold text-[#534247]">
                  <span>1:1 Mentorship</span>
                  <span className="material-symbols-outlined text-[#dcb236]">support_agent</span>
                </div>
                <div className="text-3xl sm:text-4xl font-bold text-[#22191b] pt-1">
                  4.5 hrs
                </div>
                <div className="text-[11px] text-[#725c06] font-bold flex items-center gap-1">
                  <span className="inline-block w-2 h-2 rounded-full bg-[#ffe082]"></span>
                  <span>Next: Tomorrow 7:00 PM with Tr. Theint</span>
                </div>
              </div>

              {/* Card 4: Meadow Mint Accent */}
              <div className="bg-white rounded-3xl border border-[#fbeaec] p-6 shadow-[0_4px_16px_rgba(244,143,177,0.12)] space-y-2 relative overflow-hidden group hover:translate-y-[-2px] transition-all">
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#a5d6a7]" />
                <div className="flex items-center justify-between text-xs font-bold text-[#534247]">
                  <span>Exercises Cleared</span>
                  <span className="material-symbols-outlined text-[#a5d6a7]">verified</span>
                </div>
                <div className="text-3xl sm:text-4xl font-bold text-[#22191b] pt-1">
                  14 / 16
                </div>
                <div className="text-[11px] text-[#1b5e20] font-bold flex items-center gap-1">
                  <span className="inline-block w-2 h-2 rounded-full bg-[#a5d6a7]"></span>
                  <span>92% Accuracy • Target Band 7.5+</span>
                </div>
              </div>
            </div>

            {/* TAB CONTENT: Profile, One-on-One, or Default Home Views */}
            {activeNav === 'Profile' ? (
              /* VIEW A: STUDENT PROFILE INFORMATION VIEW */
              <div className="space-y-8 animate-fade-in">
                {/* Official Student Card */}
                <div className="bg-white rounded-3xl border border-[#fbeaec] p-6 sm:p-8 shadow-[0_4px_16px_rgba(244,143,177,0.12)] space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#f5e4e7]">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-3xl bg-[#fff0f2] border-2 border-[#f48fb1] text-[#964261] flex items-center justify-center font-['Quicksand'] font-bold text-2xl shadow-xs">
                        MT
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-['Quicksand'] text-xl font-bold text-[#22191b]">
                            {studentInfo.name}
                          </h3>
                          <span className="px-2.5 py-0.5 rounded-full bg-[#e8f5e9] text-[#1b5e20] text-[11px] font-bold border border-[#c8e6c9]">
                            Active Learner
                          </span>
                        </div>
                        <p className="text-xs text-[#534247] font-medium mt-0.5">
                          ID: <span className="font-mono text-[#22191b] font-bold">{studentInfo.id}</span> • Joined {studentInfo.enrollDate}
                        </p>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => setEditProfileModalOpen(true)}
                      className="btn-tactile-secondary px-4 py-2 text-xs flex items-center gap-1.5 cursor-pointer self-start sm:self-auto"
                    >
                      <span className="material-symbols-outlined text-[16px]">edit</span>
                      <span>Edit Profile</span>
                    </button>
                  </div>

                  {/* Info Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs font-['Quicksand']">
                    <div className="p-4 rounded-2xl bg-[#fff8f8] border border-[#fbeaec] space-y-1 shadow-2xs">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-[#964261]">
                        Official Level
                      </span>
                      <div className="text-sm font-bold text-[#22191b]">{studentInfo.level}</div>
                      <p className="text-[11px] text-[#534247] font-['Nunito_Sans']">Verified by Placement Test</p>
                    </div>

                    <div className="p-4 rounded-2xl bg-[#fff8f8] border border-[#fbeaec] space-y-1 shadow-2xs">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-[#964261]">
                        Assigned Cohort
                      </span>
                      <div className="text-sm font-bold text-[#22191b]">{studentInfo.cohort}</div>
                      <p className="text-[11px] text-[#534247] font-['Nunito_Sans']">Live Zoom sessions</p>
                    </div>

                    <div className="p-4 rounded-2xl bg-[#fff8f8] border border-[#fbeaec] space-y-1 shadow-2xs">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-[#964261]">
                        Email Address
                      </span>
                      <div className="text-sm font-bold text-[#22191b] truncate">{studentInfo.email}</div>
                      <p className="text-[11px] text-[#534247] font-['Nunito_Sans']">Verified for decrees</p>
                    </div>

                    <div className="p-4 rounded-2xl bg-[#fff8f8] border border-[#fbeaec] space-y-1 shadow-2xs">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-[#964261]">
                        Location
                      </span>
                      <div className="text-sm font-bold text-[#22191b]">{studentInfo.city}</div>
                      <p className="text-[11px] text-[#534247] font-['Nunito_Sans']">Myanmar Standard Time (GMT+6:30)</p>
                    </div>
                  </div>
                </div>

                {/* Two-Column Enrolled Courses & Academic Standing */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Card 1: Active Enrolled Courses */}
                  <div className="bg-white rounded-3xl border border-[#fbeaec] p-6 sm:p-7 shadow-[0_4px_16px_rgba(244,143,177,0.12)] space-y-5">
                    <div className="flex items-center justify-between pb-3 border-b border-[#f5e4e7]">
                      <h4 className="font-['Quicksand'] font-bold text-base text-[#22191b] flex items-center gap-2">
                        <span className="material-symbols-outlined text-[20px] text-[#f48fb1]">
                          auto_stories
                        </span>
                        <span>Enrolled Coursework</span>
                      </h4>
                      <span className="text-xs text-[#534247] font-['Quicksand'] font-bold px-3 py-1 rounded-full bg-[#fff0f2] border border-[#f5e4e7]">
                        2 Active Tracks
                      </span>
                    </div>

                    <div className="space-y-4">
                      <div className="p-4 rounded-2xl bg-[#fff8f8] border border-[#fbeaec] space-y-2.5 shadow-2xs">
                        <div className="flex items-center justify-between">
                          <span className="font-['Quicksand'] font-bold text-xs text-[#22191b]">
                            Practical Speaking Essentials (Level 2)
                          </span>
                          <span className="text-[10px] font-['Quicksand'] font-bold px-2.5 py-0.5 rounded-full bg-[#fff0f2] text-[#964261] border border-[#f5e4e7]">
                            In Progress
                          </span>
                        </div>
                        <p className="text-[11px] text-[#534247]">
                          Current Module 3: Situational Dialogue (Lesson 2 Opinion Mastery)
                        </p>
                        <div className="w-full h-2 rounded-full bg-[#fff0f2] overflow-hidden">
                          <div className="h-full w-[48%] rounded-full bg-[#f48fb1]" />
                        </div>
                      </div>

                      <div className="p-4 rounded-2xl bg-[#fff8f8] border border-[#fbeaec] space-y-2.5 shadow-2xs">
                        <div className="flex items-center justify-between">
                          <span className="font-['Quicksand'] font-bold text-xs text-[#22191b]">
                            Academic Grammar &amp; Sentence Architecture
                          </span>
                          <span className="text-[10px] font-['Quicksand'] font-bold px-2.5 py-0.5 rounded-full bg-[#e8f5e9] text-[#1b5e20] border border-[#c8e6c9]">
                            92% Complete
                          </span>
                        </div>
                        <p className="text-[11px] text-[#534247]">
                          Completed 22 of 24 lessons • Certificate eligible upon final test
                        </p>
                        <div className="w-full h-2 rounded-full bg-[#fff0f2] overflow-hidden">
                          <div className="h-full w-[92%] rounded-full bg-[#a5d6a7]" />
                        </div>
                      </div>

                      <div className="p-4 rounded-2xl bg-[#fff8f8] border border-[#fbeaec] space-y-2.5 shadow-2xs">
                        <div className="flex items-center justify-between">
                          <span className="font-['Quicksand'] font-bold text-xs text-[#22191b]">
                            Everyday Spoken English Essentials
                          </span>
                          <span className="text-[10px] font-['Quicksand'] font-bold px-2.5 py-0.5 rounded-full bg-[#eef8ff] text-[#006685] border border-[#bee9ff]">
                            Direct Free
                          </span>
                        </div>
                        <p className="text-[11px] text-[#534247]">
                          Completed all foundational pronunciation drills.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Card 2: Academic Standing & Administration Decrees */}
                  <div className="bg-white rounded-3xl border border-[#fbeaec] p-6 sm:p-7 shadow-[0_4px_16px_rgba(244,143,177,0.12)] space-y-5">
                    <div className="flex items-center justify-between pb-3 border-b border-[#f5e4e7]">
                      <h4 className="font-['Quicksand'] font-bold text-base text-[#22191b] flex items-center gap-2">
                        <span className="material-symbols-outlined text-[20px] text-[#f48fb1]">
                          military_tech
                        </span>
                        <span>Official Decrees &amp; Faculty</span>
                      </h4>
                      <span className="text-xs text-[#534247] font-['Quicksand'] font-bold px-3 py-1 rounded-full bg-[#fff0f2] border border-[#f5e4e7]">
                        Admin Verified
                      </span>
                    </div>

                    <div className="space-y-3.5 text-xs font-['Quicksand']">
                      <div className="p-4 rounded-2xl bg-[#fff8f8] border border-[#fbeaec] space-y-1 shadow-2xs">
                        <div className="flex items-center justify-between font-bold text-[#22191b]">
                          <span>Placement Determination</span>
                          <span className="text-[#1b5e20] font-bold">Confirmed Level 2</span>
                        </div>
                        <p className="text-[11px] text-[#534247] font-['Nunito_Sans']">
                          System: Level 2 • Teacher Theint Rec: Level 2 • Admin Decree signed.
                        </p>
                      </div>

                      <div className="p-4 rounded-2xl bg-[#fff8f8] border border-[#fbeaec] space-y-1 shadow-2xs">
                        <div className="flex items-center justify-between font-bold text-[#22191b]">
                          <span>Primary Assigned Faculty</span>
                          <span className="text-[#f48fb1] font-bold">Teacher Theint</span>
                        </div>
                        <p className="text-[11px] text-[#534247] font-['Nunito_Sans']">
                          Next One-on-One Clinic: Confirmed tomorrow at 7:00 PM MMT.
                        </p>
                      </div>

                      <div className="p-4 rounded-2xl bg-[#fff8f8] border border-[#fbeaec] space-y-1 shadow-2xs">
                        <div className="flex items-center justify-between font-bold text-[#22191b]">
                          <span>Target Goal &amp; Milestone</span>
                          <span className="text-[#22191b] font-bold">IELTS Band 7.5+</span>
                        </div>
                        <p className="text-[11px] text-[#534247] font-['Nunito_Sans']">
                          Estimated examination readiness target: Q1 2025.
                        </p>
                      </div>

                      <div className="pt-2 flex items-center justify-between">
                        <span className="text-[11px] text-[#534247] font-['Nunito_Sans']">
                          Need assistance with coursework?
                        </span>
                        <button
                          type="button"
                          onClick={() => handleNavClick('One-on-One')}
                          className="text-xs font-bold text-[#f48fb1] hover:text-[#d87395] hover:underline cursor-pointer flex items-center gap-1"
                        >
                          <span>Book 1-on-1 Office Hours</span>
                          <span className="material-symbols-outlined text-[15px]">arrow_forward</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : activeNav === 'One-on-One' ? (
              /* VIEW B: CANONICAL STUDENT ONE-ON-ONE WORKSPACE */
              <div className="space-y-8 animate-fade-in">
                <StudentOneOnOneView
                  studentId={studentInfo.id}
                  studentName={studentInfo.name}
                  studentLevel={studentInfo.level}
                  showSpecGuides={showSpecGuides}
                />
              </div>
            ) : (
              /* VIEW C: DEFAULT STUDENT PORTAL HOME */
              <div className="space-y-8 animate-fade-in">
                {/* PRIMARY FOCUS HERO CARD: Single Next Academic Step */}
                <div className="bg-white rounded-3xl border border-[#fbeaec] p-6 sm:p-8 shadow-[0_4px_16px_rgba(244,143,177,0.12)] space-y-6">
                  {/* Hierarchy Path */}
                  <div className="flex flex-wrap items-center gap-2 text-xs text-[#534247] pb-4 border-b border-[#f5e4e7] font-['Quicksand']">
                    <span className="font-bold text-[#22191b]">
                      General Communication
                    </span>
                    <span>›</span>
                    <span className="font-bold text-[#22191b]">
                      Practical Speaking Essentials
                    </span>
                    <span>›</span>
                    <span className="px-2.5 py-0.5 rounded-full bg-[#fff0f2] text-[#964261] font-bold text-[11px] border border-[#f5e4e7]">
                      Level 2
                    </span>
                    <span>›</span>
                    <span>Module 3</span>
                    <span>›</span>
                    <span className="text-[#22191b] font-bold">Lesson 2</span>
                  </div>

                  {/* Primary Focus Content */}
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="space-y-2 max-w-2xl">
                      <span className="inline-block px-3 py-1 rounded-full bg-[#fff0f2] border border-[#f5e4e7] text-xs font-['Quicksand'] font-bold text-[#964261] shadow-2xs">
                        Current Lesson
                      </span>
                      <h3 className="text-xl font-['Quicksand'] font-bold text-[#22191b]">
                        Module 3: Situational Dialogue — Lesson 2: Expressing Opinions Concisely
                      </h3>
                      <p className="text-sm text-[#534247] leading-relaxed">
                        Learn natural turn-taking phrases, diplomatic mitigation markers, and how to
                        state professional viewpoints without hesitation.
                      </p>
                      <div className="pt-2 flex items-center gap-2 text-xs text-[#534247] font-['Quicksand'] font-bold">
                        <span className="inline-block w-2.5 h-2.5 rounded-full bg-[#f48fb1] shadow-xs" />
                        <span>In Progress • Practice exercise ready</span>
                      </div>
                    </div>

                    {/* Single Primary CTA */}
                    <div className="shrink-0">
                      <button
                        type="button"
                        onClick={() => onNavigateScreen?.('STU-LESSON-01')}
                        className="btn-tactile-primary px-7 py-3 text-xs flex items-center gap-2 cursor-pointer"
                      >
                        <span>Continue Lesson</span>
                        <span className="material-symbols-outlined text-[18px]">
                          arrow_forward
                        </span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* SECONDARY FOCUSED CARDS: Clean 2-Column Relaxed Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Card 1: Upcoming One-on-One Session */}
                  <div className="bg-white rounded-3xl border border-[#fbeaec] p-6 sm:p-7 shadow-[0_4px_16px_rgba(244,143,177,0.12)] flex flex-col justify-between space-y-5">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-['Quicksand'] font-bold uppercase tracking-wider text-[#964261]">
                          One-on-One Mentorship
                        </span>
                        <span className="material-symbols-outlined text-[#f48fb1]">
                          calendar_today
                        </span>
                      </div>
                      <h4 className="text-base font-['Quicksand'] font-bold text-[#22191b]">
                        Upcoming Mentorship Session
                      </h4>
                      <p className="text-sm text-[#534247] leading-relaxed">
                        Confirmed session with{' '}
                        <strong className="text-[#22191b] font-bold">Teacher Theint</strong>.
                      </p>
                      <div className="p-4 rounded-2xl bg-[#fff8f8] border border-[#fbeaec] space-y-1 text-xs">
                        <div className="flex items-center gap-2 text-[#22191b] font-['Quicksand'] font-bold">
                          <span className="material-symbols-outlined text-[16px] text-[#f48fb1]">
                            schedule
                          </span>
                          <span>Tomorrow, 7:00 PM – 7:45 PM (Myanmar Time)</span>
                        </div>
                        <p className="text-[#534247] pl-6 font-['Nunito_Sans']">
                          Review of speaking practice and pragmatic intonation patterns.
                        </p>
                      </div>
                    </div>
                    <div className="pt-3 border-t border-[#f5e4e7] flex items-center justify-between">
                      <span className="text-xs text-[#534247] font-medium">Assigned Teacher Review</span>
                      <button
                        type="button"
                        onClick={() => setActiveNav('One-on-One')}
                        className="text-xs font-['Quicksand'] font-bold text-[#f48fb1] hover:text-[#d87395] inline-flex items-center gap-1 transition-colors cursor-pointer"
                      >
                        <span>Open One-on-One Workspace</span>
                        <span className="material-symbols-outlined text-[15px]">
                          arrow_forward
                        </span>
                      </button>
                    </div>
                  </div>

                  {/* Card 2: Recent Academic Notice */}
                  <div className="bg-white rounded-3xl border border-[#fbeaec] p-6 sm:p-7 shadow-[0_4px_16px_rgba(244,143,177,0.12)] flex flex-col justify-between space-y-5">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-['Quicksand'] font-bold uppercase tracking-wider text-[#006685]">
                          Academic Notice
                        </span>
                        <span className="material-symbols-outlined text-[#81d4fa]">
                          notifications
                        </span>
                      </div>
                      <h4 className="text-base font-['Quicksand'] font-bold text-[#22191b]">
                        Formal Evaluation Scheduled
                      </h4>
                      <p className="text-sm text-[#534247] leading-relaxed">
                        Your upcoming level evaluation has been coordinated with the academic
                        administration.
                      </p>
                      <div className="p-4 rounded-2xl bg-[#fff8f8] border border-[#fbeaec] space-y-1 text-xs">
                        <div className="flex items-center gap-2 text-[#22191b] font-['Quicksand'] font-bold">
                          <span className="material-symbols-outlined text-[16px] text-[#81d4fa]">
                            assignment_turned_in
                          </span>
                          <span>Oral &amp; Practical Assessment</span>
                        </div>
                        <p className="text-[#534247] pl-6 font-['Nunito_Sans']">
                          Please ensure Module 3 exercises are submitted prior to review.
                        </p>
                      </div>
                    </div>
                    <div className="pt-3 border-t border-[#f5e4e7] flex items-center justify-between">
                      <span className="text-xs text-[#534247] font-medium">Academic Record</span>
                      <button
                        type="button"
                        onClick={() => onNavigateScreen?.('STU-EX-01')}
                        className="text-xs font-['Quicksand'] font-bold text-[#006685] hover:text-[#005d79] inline-flex items-center gap-1 transition-colors cursor-pointer"
                      >
                        <span>View Assessment Details</span>
                        <span className="material-symbols-outlined text-[15px]">
                          arrow_forward
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Edit Profile Modal */}
      {editProfileModalOpen && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-7 shadow-[0_8px_32px_rgba(244,143,177,0.22)] border border-[#fbeaec] space-y-5 animate-fade-in">
            <div className="flex items-center justify-between pb-3 border-b border-[#f5e4e7]">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#f48fb1]">manage_accounts</span>
                <h3 className="font-['Quicksand'] font-bold text-base text-[#22191b]">Edit Student Information</h3>
              </div>
              <button
                type="button"
                onClick={() => setEditProfileModalOpen(false)}
                className="text-[#534247] hover:text-[#22191b] cursor-pointer"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <div className="space-y-3.5 text-xs font-['Quicksand'] font-bold">
              <div>
                <label className="text-[#22191b] block mb-1">Full Name</label>
                <input
                  type="text"
                  value={studentInfo.name}
                  onChange={(e) => setStudentInfo({ ...studentInfo, name: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-full border border-[#f5e4e7] bg-[#fff8f8] text-xs font-['Nunito_Sans'] font-normal text-[#22191b] focus:outline-none focus:ring-2 focus:ring-[#f48fb1]"
                />
              </div>

              <div>
                <label className="text-[#22191b] block mb-1">Email Address</label>
                <input
                  type="email"
                  value={studentInfo.email}
                  onChange={(e) => setStudentInfo({ ...studentInfo, email: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-full border border-[#f5e4e7] bg-[#fff8f8] text-xs font-['Nunito_Sans'] font-normal text-[#22191b] focus:outline-none focus:ring-2 focus:ring-[#f48fb1]"
                />
              </div>

              <div>
                <label className="text-[#22191b] block mb-1">Phone Number</label>
                <input
                  type="text"
                  value={studentInfo.phone}
                  onChange={(e) => setStudentInfo({ ...studentInfo, phone: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-full border border-[#f5e4e7] bg-[#fff8f8] text-xs font-['Nunito_Sans'] font-normal text-[#22191b] focus:outline-none focus:ring-2 focus:ring-[#f48fb1]"
                />
              </div>

              <div>
                <label className="text-[#22191b] block mb-1">Location</label>
                <input
                  type="text"
                  value={studentInfo.city}
                  onChange={(e) => setStudentInfo({ ...studentInfo, city: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-full border border-[#f5e4e7] bg-[#fff8f8] text-xs font-['Nunito_Sans'] font-normal text-[#22191b] focus:outline-none focus:ring-2 focus:ring-[#f48fb1]"
                />
              </div>
            </div>

            <div className="flex items-center gap-3 pt-3 border-t border-[#f5e4e7]">
              <button
                type="button"
                onClick={() => setEditProfileModalOpen(false)}
                className="flex-1 py-2.5 rounded-full bg-[#fff0f2] hover:bg-[#ffe4e9] text-[#964261] font-['Quicksand'] font-bold text-xs transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  setEditProfileModalOpen(false);
                  showToast('Student credentials updated successfully.');
                }}
                className="flex-1 btn-tactile-primary py-2.5 text-xs cursor-pointer"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Mentorship Detail Modal */}
      {mentorshipModalOpen && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-7 shadow-[0_8px_32px_rgba(244,143,177,0.22)] border border-[#fbeaec] space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#f5e4e7]">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#f48fb1]">calendar_today</span>
                <h3 className="font-['Quicksand'] font-bold text-base text-[#22191b]">Mentorship Session Details</h3>
              </div>
              <button
                type="button"
                onClick={() => setMentorshipModalOpen(false)}
                className="text-[#534247] hover:text-[#22191b] cursor-pointer"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>
            <div className="space-y-3 text-xs text-[#534247]">
              <div className="p-4 rounded-2xl bg-[#fff8f8] border border-[#fbeaec] space-y-1.5 font-['Quicksand']">
                <div className="font-bold text-sm text-[#22191b]">Mentor: Teacher Theint</div>
                <div className="font-medium text-[#534247]">Curriculum Focus: Natural turn-taking &amp; pragmatic intonation</div>
                <div className="font-medium text-[#534247]">Time: Tomorrow, 7:00 PM – 7:45 PM (Myanmar Time)</div>
                <div className="text-[#f48fb1] font-bold">
                  Status: Confirmed • Live Room Active 10 min prior
                </div>
              </div>
              <p className="font-['Nunito_Sans']">
                Please prepare your notes from Module 3 Lesson 2 exercises before joining the
                session.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setMentorshipModalOpen(false)}
              className="w-full btn-tactile-primary py-2.5 text-xs cursor-pointer"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
