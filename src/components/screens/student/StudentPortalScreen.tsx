import React, { useState } from 'react';
import { ScreenId, StudentNavItem } from '../../../types/navigation';

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

  const sidebarNavItems: { label: StudentNavItem; icon: string; badge?: string }[] = [
    { label: 'Home', icon: 'home' },
    { label: 'Courses', icon: 'menu_book' },
    { label: 'My Courses', icon: 'folder_shared' },
    { label: 'Assessments', icon: 'assignment' },
    { label: 'Progress', icon: 'trending_up' },
    { label: 'One-on-One', icon: 'person_pin' },
    { label: 'Calendar', icon: 'calendar_today' },
    { label: 'Notifications', icon: 'notifications', badge: 'dot' },
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
    <div className="flex min-h-screen w-full bg-[#FCFAF9] text-[#2D2529] antialiased">
      {/* Mobile Drawer Backdrop */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() => setMobileMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* PERSISTENT APPROVED 240px DESKTOP SIDEBAR */}
      <aside
        className={`fixed md:sticky top-0 z-50 md:z-30 w-60 shrink-0 bg-white border-r border-[#E9DDE1] flex flex-col justify-between h-screen px-4 py-6 transition-transform duration-200 ${
          mobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <div className="flex flex-col gap-6">
          {/* Brand Header */}
          <div className="flex items-center justify-between px-2">
            <button
              type="button"
              onClick={() => onNavigateScreen?.('PUB-01-HOME')}
              className="flex items-center gap-2.5 text-left cursor-pointer group"
            >
              <div className="w-8 h-8 rounded-md bg-[#FBF2F4] border border-[#F1DCE2] flex items-center justify-center font-bold text-xs text-[#D8899D] tracking-wide group-hover:bg-[#F3DDE3] transition-colors">
                TE
              </div>
              <div className="flex items-center gap-1.5 min-w-0">
                <span className="font-semibold text-sm tracking-tight text-[#2D2529] truncate group-hover:text-[#D8899D] transition-colors">
                  Teacher Theint
                </span>
                <span
                  className="w-1.5 h-1.5 rounded-full bg-[#D8899D] shrink-0"
                  title="Active Academy"
                />
              </div>
            </button>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="md:hidden text-[#766A70] hover:text-[#2D2529] p-1 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>
          </div>

          {/* Strict 9 Approved Navigation Items */}
          <nav aria-label="Student Navigation" className="flex flex-col gap-1">
            {sidebarNavItems.map(({ label, icon, badge }) => {
              const isActive = activeNav === label;
              return (
                <button
                  key={label}
                  type="button"
                  onClick={() => handleNavClick(label)}
                  className={`flex items-center justify-between px-3 py-2.5 rounded-md text-sm font-medium transition-colors cursor-pointer text-left ${
                    isActive
                      ? 'bg-[#FBF2F4] text-[#D8899D] border border-[#F1DCE2]/60'
                      : 'text-[#766A70] hover:text-[#2D2529] hover:bg-[#F6F2F3] border border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`material-symbols-outlined ${
                        isActive ? 'text-[#D8899D]' : ''
                      }`}
                    >
                      {icon}
                    </span>
                    <span>{label}</span>
                  </div>
                  {badge === 'dot' && (
                    <span className="w-1.5 h-1.5 rounded-full bg-[#D8899D]" />
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Student Profile Chip (Single Role, Immutable) */}
        <div className="pt-4 border-t border-[#E9DDE1]">
          <div className="flex items-center gap-3 px-2 py-1.5 rounded-lg bg-[#F6F2F3]/60">
            <div className="w-8 h-8 rounded-full bg-[#FBF2F4] border border-[#F1DCE2] text-[#D8899D] flex items-center justify-center text-xs font-semibold shrink-0">
              S
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-semibold text-[#2D2529] truncate">
                Student Account
              </p>
              <span className="inline-block text-[11px] text-[#766A70] leading-none">
                Learner
              </span>
            </div>
          </div>
        </div>
      </aside>

      {/* PRIMARY MAIN WORKSPACE */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* TOPBAR (64px Clean, Focused Header) */}
        <header className="h-16 px-6 sm:px-8 border-b border-[#E9DDE1] bg-white flex items-center justify-between sticky top-0 z-20">
          <div className="flex items-center gap-3">
            {/* Mobile Hamburger Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="md:hidden text-[#2D2529] p-1 rounded-md hover:bg-[#F6F2F3] cursor-pointer"
              aria-label="Open menu"
            >
              <span className="material-symbols-outlined text-[22px]">menu</span>
            </button>

            <h1 className="text-sm font-semibold text-[#2D2529]">
              {activeNav === 'Home' ? 'Home' : activeNav}
            </h1>
            <span className="text-[#E9DDE1]">•</span>
            <span className="text-xs text-[#766A70]">Student Learning Portal</span>

            {onNavigateScreen && (
              <button
                type="button"
                onClick={() => onNavigateScreen('PUB-01-HOME')}
                className="hidden lg:inline-flex items-center gap-1 ml-4 px-2 py-0.5 rounded text-[11px] font-semibold text-[#D8899D] hover:bg-[#FBF2F4] border border-[#F1DCE2] transition-colors cursor-pointer"
                title="Return to Public Website"
              >
                <span className="material-symbols-outlined text-[13px]">arrow_back</span>
                <span>Public Site</span>
              </button>
            )}
          </div>

          <div className="flex items-center gap-3 sm:gap-5">
            {/* Official Student Level Minimal Badge */}
            <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full bg-[#F6F2F3] border border-[#E9DDE1] text-xs">
              <span className="material-symbols-outlined text-[#D8899D] text-[16px]">
                verified
              </span>
              <span className="text-[#766A70]">Official Level:</span>
              <span className="font-semibold text-[#2D2529]">
                Level 2 – Intermediate
              </span>
            </div>

            {/* Notification Trigger with Dropdown */}
            <div className="relative">
              <button
                type="button"
                aria-label="Notifications"
                onClick={() => setNotificationDropdownOpen((prev) => !prev)}
                className="relative p-2 rounded-md text-[#766A70] hover:text-[#2D2529] hover:bg-[#F6F2F3] transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined text-[20px]">
                  notifications
                </span>
                <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#D8899D] border-2 border-white" />
              </button>

              {notificationDropdownOpen && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setNotificationDropdownOpen(false)}
                    aria-hidden="true"
                  />
                  <div className="absolute right-0 top-full mt-2 w-72 sm:w-80 bg-white rounded-xl shadow-xl border border-[#E9DDE1] p-4 z-50 text-xs space-y-3 animate-fade-in">
                    <div className="flex items-center justify-between pb-2 border-b border-[#E9DDE1]">
                      <span className="font-bold text-sm text-[#2D2529]">
                        Academic Notices
                      </span>
                      <span className="px-2 py-0.5 rounded-full bg-[#FBF2F4] text-[#D8899D] text-[10px] font-bold">
                        1 New
                      </span>
                    </div>
                    <div className="p-2.5 rounded-lg bg-[#FCFAF9] border border-[#E9DDE1] space-y-1">
                      <div className="font-semibold text-[#2D2529]">
                        Formal Evaluation Scheduled
                      </div>
                      <p className="text-[11px] text-[#766A70]">
                        Oral & Practical Assessment ready for Module 3.
                      </p>
                      <span className="text-[10px] text-[#D8899D] font-bold block pt-1">
                        Upcoming • Saturday
                      </span>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Avatar */}
            <div className="w-8 h-8 rounded-full bg-[#D8899D] text-white flex items-center justify-center text-xs font-semibold shadow-xs">
              S
            </div>
          </div>
        </header>

        {/* Spec Guides indicator if enabled */}
        {showSpecGuides && (
          <div className="bg-[#D8899D] text-white text-[11px] font-mono py-1 px-8 flex items-center justify-between">
            <span>Approved Student Portal Template • 240px Sidebar • Single Next Step Architecture</span>
            <span className="opacity-80">STU-01-PORTAL</span>
          </div>
        )}

        {/* PAGE CONTENT AREA: Generous Spacing, Calm Architecture */}
        <main className="flex-1 p-6 sm:p-8 lg:p-10 max-w-5xl mx-auto w-full space-y-8">
          {/* Page Header */}
          <div className="space-y-1">
            <h2 className="text-2xl font-bold tracking-tight text-[#2D2529]">
              Welcome back
            </h2>
            <p className="text-sm text-[#766A70]">
              Continue your active English coursework.
            </p>
          </div>

          {/* PRIMARY FOCUS HERO CARD: Single Next Academic Step */}
          <div className="bg-white rounded-xl border border-[#E9DDE1] p-6 sm:p-8 shadow-[0_1px_3px_rgba(45,37,41,0.04),0_1px_2px_rgba(45,37,41,0.02)] space-y-6">
            {/* Hierarchy Path */}
            <div className="flex flex-wrap items-center gap-2 text-xs text-[#766A70] pb-4 border-b border-[#E9DDE1]">
              <span className="font-medium text-[#2D2529]">
                General Communication
              </span>
              <span>›</span>
              <span className="font-medium text-[#2D2529]">
                Practical Speaking Essentials
              </span>
              <span>›</span>
              <span className="px-2 py-0.5 rounded bg-[#FBF2F4] text-[#D8899D] font-semibold text-[11px]">
                Level 2
              </span>
              <span>›</span>
              <span>Module 3</span>
              <span>›</span>
              <span className="text-[#2D2529] font-medium">Lesson 2</span>
            </div>

            {/* Primary Focus Content */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="space-y-2 max-w-2xl">
                <span className="text-xs font-semibold uppercase tracking-wider text-[#D8899D]">
                  Current Lesson
                </span>
                <h3 className="text-xl font-bold text-[#2D2529]">
                  Module 3: Situational Dialogue — Lesson 2: Expressing Opinions Concisely
                </h3>
                <p className="text-sm text-[#766A70] leading-relaxed">
                  Learn natural turn-taking phrases, diplomatic mitigation markers, and how to
                  state professional viewpoints without hesitation.
                </p>
                <div className="pt-2 flex items-center gap-2 text-xs text-[#766A70]">
                  <span className="inline-block w-2 h-2 rounded-full bg-[#D8899D]" />
                  <span>In Progress • Practice exercise ready</span>
                </div>
              </div>

              {/* Single Primary CTA */}
              <div className="shrink-0">
                <button
                  type="button"
                  onClick={() => onNavigateScreen?.('STU-LESSON-01')}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-[#D8899D] hover:bg-[#C7758A] text-white font-semibold text-sm transition-all shadow-xs cursor-pointer"
                >
                  <span>Continue Lesson</span>
                  <span className="material-symbols-outlined text-[18px]">
                    arrow_forward
                  </span>
                </button>
              </div>
            </div>
          </div>

          {/* SECONDARY FOCUSED CARDS: Clean 2-Column Relaxed Grid (Max 2 cards) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Card 1: Upcoming One-on-One Session */}
            <div className="bg-white rounded-xl border border-[#E9DDE1] p-6 shadow-[0_1px_3px_rgba(45,37,41,0.04),0_1px_2px_rgba(45,37,41,0.02)] flex flex-col justify-between space-y-5">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#766A70]">
                    One-on-One Mentorship
                  </span>
                  <span className="material-symbols-outlined text-[#D8899D]">
                    calendar_today
                  </span>
                </div>
                <h4 className="text-base font-bold text-[#2D2529]">
                  Upcoming Mentorship Session
                </h4>
                <p className="text-sm text-[#766A70] leading-relaxed">
                  Confirmed session with{' '}
                  <strong className="text-[#2D2529] font-semibold">Teacher Theint</strong>.
                </p>
                <div className="p-3.5 rounded-lg bg-[#F6F2F3] border border-[#E9DDE1]/60 space-y-1 text-xs">
                  <div className="flex items-center gap-2 text-[#2D2529] font-medium">
                    <span className="material-symbols-outlined text-[16px] text-[#766A70]">
                      schedule
                    </span>
                    <span>Scheduled Session (Viewer's Local Time)</span>
                  </div>
                  <p className="text-[#766A70] pl-6">
                    Review of speaking practice and pragmatic intonation patterns.
                  </p>
                </div>
              </div>
              <div className="pt-2 border-t border-[#E9DDE1] flex items-center justify-between">
                <span className="text-xs text-[#766A70]">Assigned Teacher Review</span>
                <button
                  type="button"
                  onClick={() => setMentorshipModalOpen(true)}
                  className="text-xs font-semibold text-[#D8899D] hover:text-[#C7758A] inline-flex items-center gap-1 transition-colors cursor-pointer"
                >
                  <span>View Details</span>
                  <span className="material-symbols-outlined text-[14px]">
                    arrow_forward
                  </span>
                </button>
              </div>
            </div>

            {/* Card 2: Recent Academic Notice */}
            <div className="bg-white rounded-xl border border-[#E9DDE1] p-6 shadow-[0_1px_3px_rgba(45,37,41,0.04),0_1px_2px_rgba(45,37,41,0.02)] flex flex-col justify-between space-y-5">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#766A70]">
                    Academic Notice
                  </span>
                  <span className="material-symbols-outlined text-[#D8899D]">
                    notifications
                  </span>
                </div>
                <h4 className="text-base font-bold text-[#2D2529]">
                  Formal Evaluation Scheduled
                </h4>
                <p className="text-sm text-[#766A70] leading-relaxed">
                  Your upcoming level evaluation has been coordinated with the academic administration.
                </p>
                <div className="p-3.5 rounded-lg bg-[#F6F2F3] border border-[#E9DDE1]/60 space-y-1 text-xs">
                  <div className="flex items-center gap-2 text-[#2D2529] font-medium">
                    <span className="material-symbols-outlined text-[16px] text-[#766A70]">
                      assignment_turned_in
                    </span>
                    <span>Oral &amp; Practical Assessment</span>
                  </div>
                  <p className="text-[#766A70] pl-6">
                    Please ensure Module 3 exercises are submitted prior to review.
                  </p>
                </div>
              </div>
              <div className="pt-2 border-t border-[#E9DDE1] flex items-center justify-between">
                <span className="text-xs text-[#766A70]">Academic Record</span>
                <button
                  type="button"
                  onClick={() => onNavigateScreen?.('STU-EX-01')}
                  className="text-xs font-semibold text-[#D8899D] hover:text-[#C7758A] inline-flex items-center gap-1 transition-colors cursor-pointer"
                >
                  <span>View Assessment Details</span>
                  <span className="material-symbols-outlined text-[14px]">
                    arrow_forward
                  </span>
                </button>
              </div>
            </div>
          </div>

          {/* Mentorship Detail Modal */}
          {mentorshipModalOpen && (
            <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
              <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-[#E9DDE1] space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-[#E9DDE1]">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#D8899D]">calendar_today</span>
                    <h3 className="font-bold text-base text-[#2D2529]">Mentorship Session Details</h3>
                  </div>
                  <button
                    type="button"
                    onClick={() => setMentorshipModalOpen(false)}
                    className="text-[#766A70] hover:text-[#2D2529] cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[20px]">close</span>
                  </button>
                </div>
                <div className="space-y-3 text-xs text-[#766A70]">
                  <div className="p-3 rounded-lg bg-[#FCFAF9] border border-[#E9DDE1] space-y-1.5">
                    <div className="font-semibold text-sm text-[#2D2529]">Mentor: Teacher Theint</div>
                    <div>Curriculum Focus: Natural turn-taking & pragmatic intonation</div>
                    <div>Time: Tomorrow, 7:00 PM – 7:45 PM (Myanmar Time)</div>
                    <div className="text-[#D8899D] font-bold">Status: Confirmed • Live Room Active 10 min prior</div>
                  </div>
                  <p>Please prepare your notes from Module 3 Lesson 2 exercises before joining the session.</p>
                </div>
                <button
                  type="button"
                  onClick={() => setMentorshipModalOpen(false)}
                  className="w-full py-2.5 rounded-lg bg-[#D8899D] hover:bg-[#C7758A] text-white font-bold text-xs transition-colors cursor-pointer"
                >
                  Done
                </button>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};
