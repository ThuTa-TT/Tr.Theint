import React, { useState } from 'react';
import {
  CANONICAL_PUBLIC_NAV,
  LanguageCode,
  PublicNavItem,
  ScreenId,
} from '../../types/navigation';

interface PublicNavbarProps {
  activeNav?: PublicNavItem | null;
  activeAuth?: 'Login' | 'Register' | 'Email Verification' | null;
  language: LanguageCode;
  onLanguageChange: (lang: LanguageCode) => void;
  onNavigateScreen: (screenId: ScreenId) => void;
  showSpecGuides?: boolean;
  variant?: 'card' | 'header';
  initialLoggedIn?: boolean;
}

const NAV_SCREEN_MAP: Record<PublicNavItem, ScreenId> = {
  Home: 'PUB-01-HOME',
  Course: 'PUB-02-COURSES',
  Courses: 'PUB-02-COURSES',
  Blog: 'PUB-04-BLOG',
  About: 'PUB-05-ABOUT',
};

export const PublicNavbar: React.FC<PublicNavbarProps> = ({
  activeNav = null,
  activeAuth = null,
  language,
  onLanguageChange,
  onNavigateScreen,
  showSpecGuides = false,
  variant = 'header',
  initialLoggedIn = true, // Default to true as user requested to see logged in state
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(initialLoggedIn);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  const notifications = [
    {
      id: 1,
      title: 'Diagnostic Evaluation Completed',
      desc: 'Item 14 Participial Syntax recorded with 86.7% score.',
      time: '5 mins ago',
      unread: true,
      icon: 'fact_check',
    },
    {
      id: 2,
      title: 'Module 02 Access Unlocked',
      desc: 'Tense Systems & Narrative Structures is now ready to study.',
      time: '1 hour ago',
      unread: true,
      icon: 'lock_open',
    },
    {
      id: 3,
      title: 'One-on-One Session Reminder',
      desc: 'Oral discourse review with Teacher Theint tomorrow at 7:00 PM.',
      time: '3 hours ago',
      unread: false,
      icon: 'event',
    },
  ];

  return (
    <header
      className={
        variant === 'card'
          ? `h-20 px-6 sm:px-8 rounded-2xl lg:rounded-full bg-white/95 backdrop-blur-md border border-[#fbeaec] shadow-[0_4px_16px_rgba(244,143,177,0.14)] flex items-center justify-between relative z-50 ${
              showSpecGuides ? 'outline-2 outline-dashed outline-[#f48fb1]' : ''
            }`
          : `sticky top-0 z-50 h-20 bg-white/95 backdrop-blur-md border-b border-[#fbeaec] shadow-[0_4px_16px_rgba(244,143,177,0.08)] relative flex items-center ${
              showSpecGuides ? 'outline-2 outline-dashed outline-[#f48fb1]' : ''
            }`
      }
    >
      {showSpecGuides && (
        <div className="absolute -top-2.5 right-4 text-[10px] font-['Quicksand'] font-bold bg-[#f48fb1] text-white px-2.5 py-0.5 rounded-full z-50 pointer-events-none shadow-xs">
          Pastel Rainbow Academy Navbar • TT Logo • EN|MM Pill • {isLoggedIn ? 'Student Logged In' : 'Guest CTAs'}
        </div>
      )}

      <div
        className={
          variant === 'card'
            ? 'w-full flex items-center justify-between'
            : 'max-w-[1440px] w-full mx-auto px-6 lg:px-12 flex items-center justify-between'
        }
      >
        {/* Left: Canonical Tr Theint Brand Logo Lockup */}
        <div className="flex items-center gap-3.5">
          <button
            type="button"
            onClick={() => onNavigateScreen('PUB-01-HOME')}
            className="w-11 h-11 rounded-full overflow-hidden shadow-xs border-2 border-[#ffd9e2] cursor-pointer shrink-0 hover:scale-105 transition-transform"
          >
            <img
              src="/src/assets/images/tr_theint_logo_1791300639189.jpg"
              alt="Teacher Theint English"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </button>
          <div>
            <button
              type="button"
              onClick={() => onNavigateScreen('PUB-01-HOME')}
              className="font-['Quicksand'] font-bold text-base text-[#22191b] tracking-tight block hover:text-[#f48fb1] transition-colors text-left cursor-pointer"
            >
              Teacher Theint English
            </button>
            <span className="text-xs font-['Nunito_Sans'] text-[#534247] block">
              English Teaching &amp; Learning Platform
            </span>
          </div>
        </div>

        {/* Center: Canonical Public Navigation Links */}
        <nav
          aria-label="Main Public Navigation"
          className="hidden md:flex items-center gap-8 font-['Quicksand']"
        >
          {CANONICAL_PUBLIC_NAV.map((item) => {
            const isActive =
              activeNav === item ||
              (item === 'Course' && activeNav === 'Courses') ||
              (item === 'Courses' && activeNav === 'Course');
            return (
              <button
                key={item}
                type="button"
                onClick={() => onNavigateScreen(NAV_SCREEN_MAP[item])}
                className={`relative py-1.5 px-1 text-sm font-bold transition-all cursor-pointer ${
                  isActive
                    ? 'text-[#964261] after:absolute after:bottom-0 after:left-1 after:right-1 after:h-1 after:bg-[#f48fb1] after:rounded-full'
                    : 'text-[#22191b] hover:text-[#f48fb1]'
                }`}
              >
                {item}
              </button>
            );
          })}
        </nav>

        {/* Right Section: Language Pill + Auth State (Logged In vs Logged Out) */}
        <div className="flex items-center gap-3 font-['Quicksand']">
          {/* Quick Simulation Mode Toggle Pill */}
          <button
            type="button"
            onClick={() => {
              setIsLoggedIn((prev) => !prev);
              setNotificationsOpen(false);
              setProfileDropdownOpen(false);
            }}
            title="Click to toggle between Logged In and Guest header states"
            className="hidden lg:inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-[#fff0f2] hover:bg-[#fbeaec] text-[#534247] border border-[#f5e4e7] transition-all cursor-pointer"
          >
            <span
              className={`w-2 h-2 rounded-full ${
                isLoggedIn ? 'bg-[#a5d6a7]' : 'bg-[#ffe082]'
              }`}
            ></span>
            <span>{isLoggedIn ? 'Status: Logged In' : 'Status: Guest'}</span>
            <span className="material-symbols-outlined text-[13px] text-[#f48fb1]">
              swap_horiz
            </span>
          </button>

          {/* Language Switcher Pill (EN | MM) */}
          <div className="flex items-center rounded-full bg-[#fff0f2] border border-[#f5e4e7] p-1 text-xs font-bold shadow-2xs">
            <button
              type="button"
              onClick={() => onLanguageChange('EN')}
              className={`px-3 py-1 rounded-full transition-all cursor-pointer ${
                language === 'EN'
                  ? 'bg-[#f48fb1] text-white shadow-[0_2px_0px_#d87395]'
                  : 'text-[#534247] hover:text-[#22191b]'
              }`}
            >
              EN
            </button>
            <button
              type="button"
              onClick={() => onLanguageChange('MM')}
              className={`px-3 py-1 rounded-full transition-all cursor-pointer ${
                language === 'MM'
                  ? 'bg-[#f48fb1] text-white shadow-[0_2px_0px_#d87395]'
                  : 'text-[#534247] hover:text-[#22191b]'
              }`}
            >
              MM
            </button>
          </div>

          {/* ================================================================= */}
          {/* CONDITIONAL AUTH CLUSTER: LOGGED IN vs LOGGED OUT                 */}
          {/* ================================================================= */}
          {isLoggedIn ? (
            /* LOGGED IN STUDENT STATE: Notification Bell + Round Profile Avatar */
            <div className="flex items-center gap-2.5 relative z-50">
              {/* Notification Bell Button */}
              <div className="relative z-50">
                <button
                  type="button"
                  aria-label="Student Notifications"
                  onClick={() => {
                    setNotificationsOpen((prev) => !prev);
                    setProfileDropdownOpen(false);
                  }}
                  className={`relative w-10 h-10 rounded-full flex items-center justify-center transition-all cursor-pointer ${
                    notificationsOpen
                      ? 'bg-[#ffd9e2] text-[#964261] ring-2 ring-[#f48fb1]/40'
                      : 'text-[#534247] hover:text-[#964261] hover:bg-[#fff0f2]'
                  }`}
                >
                  <span className="material-symbols-outlined text-[22px]">
                    notifications
                  </span>
                  {/* Unread indicator dot */}
                  <span className="absolute top-2 right-2 w-2.5 h-2.5 rounded-full bg-[#f48fb1] ring-2 ring-white"></span>
                </button>

                {/* Notifications Popover Dropdown */}
                {notificationsOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-40"
                      onClick={() => setNotificationsOpen(false)}
                      aria-hidden="true"
                    />
                    <div className="absolute right-0 top-full mt-2 w-80 sm:w-96 bg-white rounded-3xl shadow-[0_8px_30px_rgba(244,143,177,0.22)] border border-[#fbeaec] p-4 z-50 animate-fade-in text-xs space-y-3 font-['Nunito_Sans']">
                      <div className="flex items-center justify-between pb-2 border-b border-[#f5e4e7]">
                        <div className="flex items-center gap-1.5 font-['Quicksand']">
                          <span className="font-bold text-sm text-[#22191b]">
                            Notifications
                          </span>
                          <span className="px-2.5 py-0.5 rounded-full bg-[#ffd9e2] text-[#964261] text-[10px] font-bold">
                            2 New
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={() => setNotificationsOpen(false)}
                          className="text-[#534247] hover:text-[#22191b] cursor-pointer"
                        >
                          <span className="material-symbols-outlined text-[16px]">close</span>
                        </button>
                      </div>

                      <div className="space-y-2">
                        {notifications.map((item) => (
                          <div
                            key={item.id}
                            className={`p-3 rounded-2xl border flex items-start gap-3 transition-colors ${
                              item.unread
                                ? 'bg-[#fff8f8] border-[#f48fb1]/40'
                                : 'bg-white border-[#f5e4e7]'
                            }`}
                          >
                            <div
                              className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                                item.unread
                                  ? 'bg-[#ffd9e2] text-[#964261]'
                                  : 'bg-[#fff0f2] text-[#534247]'
                              }`}
                            >
                              <span className="material-symbols-outlined text-[16px]">
                                {item.icon}
                              </span>
                            </div>
                            <div className="flex-1 space-y-0.5">
                              <span className="font-bold font-['Quicksand'] text-[#22191b] block">
                                {item.title}
                              </span>
                              <p className="text-[#534247] text-[11px] leading-relaxed">
                                {item.desc}
                              </p>
                              <span className="text-[10px] text-[#f48fb1] font-bold block pt-0.5">
                                {item.time}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>

                      <button
                        type="button"
                        onClick={() => {
                          setNotificationsOpen(false);
                          onNavigateScreen('STU-01-PORTAL');
                        }}
                        className="w-full py-2.5 rounded-full bg-[#fff0f2] hover:bg-[#ffe4e9] text-[#964261] font-['Quicksand'] font-bold text-center block transition-colors cursor-pointer border border-[#f5e4e7] text-xs"
                      >
                        View All Notifications in Student Portal
                      </button>
                    </div>
                  </>
                )}
              </div>

              {/* Round Profile Avatar & Identity Lockup */}
              <div className="relative z-50">
                <button
                  type="button"
                  onClick={() => {
                    setProfileDropdownOpen((prev) => !prev);
                    setNotificationsOpen(false);
                  }}
                  className="flex items-center gap-2.5 pl-1.5 pr-3 py-1 rounded-full bg-[#fff8f8] hover:bg-[#fff0f2] border border-[#f5e4e7] transition-all cursor-pointer shadow-2xs group"
                >
                  {/* Round Avatar with Photo/Initials */}
                  <div className="relative">
                    <div className="w-8 h-8 rounded-full bg-[#f48fb1] text-white flex items-center justify-center text-xs font-['Quicksand'] font-bold shadow-xs shrink-0 ring-2 ring-[#ffd9e2]">
                      MT
                    </div>
                    {/* Active online green dot */}
                    <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-1.5 ring-white"></span>
                  </div>

                  {/* Student Name & Track Subtitle */}
                  <div className="hidden sm:flex flex-col text-left leading-tight font-['Quicksand']">
                    <span className="font-bold text-xs text-[#22191b] group-hover:text-[#f48fb1] transition-colors">
                      May Thu
                    </span>
                    <span className="text-[10px] text-[#964261] font-bold">
                      IELTS Scholar
                    </span>
                  </div>

                  <span className="material-symbols-outlined text-[16px] text-[#534247] group-hover:text-[#22191b] transition-transform">
                    {profileDropdownOpen ? 'expand_less' : 'expand_more'}
                  </span>
                </button>

                {/* Profile Floating Dropdown Menu */}
                {profileDropdownOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-40"
                      onClick={() => setProfileDropdownOpen(false)}
                      aria-hidden="true"
                    />
                    <div className="absolute right-0 top-full mt-2 w-64 sm:w-72 bg-white rounded-3xl shadow-[0_8px_30px_rgba(244,143,177,0.22)] border border-[#fbeaec] p-4 z-50 animate-fade-in text-xs space-y-3 font-['Nunito_Sans']">
                      <div className="flex items-center gap-3 pb-3 border-b border-[#f5e4e7]">
                        <div className="w-10 h-10 rounded-full bg-[#f48fb1] text-white flex items-center justify-center font-bold text-sm shadow-[0_2px_0px_#d87395] font-['Quicksand']">
                          MT
                        </div>
                        <div>
                          <span className="font-bold font-['Quicksand'] text-sm text-[#22191b] block">
                            May Thu
                          </span>
                          <span className="text-[11px] text-[#534247] block">
                            maythu.scholar@gmail.com
                          </span>
                          <span className="px-2.5 py-0.5 rounded-full bg-[#ffd9e2] text-[#964261] text-[9px] font-bold mt-1 inline-block font-['Quicksand']">
                            TTE-2024-8841 • Intensive
                          </span>
                        </div>
                      </div>

                      {/* Quick Navigation Items */}
                      <div className="space-y-1 font-['Quicksand'] font-bold">
                        <button
                          type="button"
                          onClick={() => {
                            setProfileDropdownOpen(false);
                            onNavigateScreen('STU-01-PORTAL');
                          }}
                          className="w-full p-2.5 rounded-2xl hover:bg-[#fff0f2] text-[#22191b] text-left flex items-center gap-2 cursor-pointer transition-colors"
                        >
                          <span className="material-symbols-outlined text-[18px] text-[#f48fb1]">
                            dashboard
                          </span>
                          <span>Dashboard (Student Portal)</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            setProfileDropdownOpen(false);
                            onNavigateScreen('STU-LEARN-01');
                          }}
                          className="w-full p-2.5 rounded-2xl hover:bg-[#fff0f2] text-[#22191b] text-left flex items-center gap-2 cursor-pointer transition-colors"
                        >
                          <span className="material-symbols-outlined text-[18px] text-[#81d4fa]">
                            school
                          </span>
                          <span>My Courses &amp; Learning Hub</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            setProfileDropdownOpen(false);
                            onNavigateScreen('STU-EX-01');
                          }}
                          className="w-full p-2.5 rounded-2xl hover:bg-[#fff0f2] text-[#22191b] text-left flex items-center gap-2 cursor-pointer transition-colors"
                        >
                          <span className="material-symbols-outlined text-[18px] text-[#ffe082]">
                            assignment_turned_in
                          </span>
                          <span>Diagnostic Assessments</span>
                        </button>
                      </div>

                      {/* Log Out Option (Switches to Guest State) */}
                      <div className="pt-2 border-t border-[#f5e4e7]">
                        <button
                          type="button"
                          onClick={() => {
                            setIsLoggedIn(false);
                            setProfileDropdownOpen(false);
                          }}
                          className="w-full p-2 rounded-2xl text-red-600 hover:bg-red-50 font-bold text-left flex items-center justify-between cursor-pointer font-['Quicksand']"
                        >
                          <span>Log Out (Switch to Guest)</span>
                          <span className="material-symbols-outlined text-[18px]">
                            logout
                          </span>
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          ) : (
            /* LOGGED OUT GUEST STATE: Log In & Register CTAs */
            <div className="flex items-center gap-2.5">
              <button
                type="button"
                onClick={() => {
                  setIsLoggedIn(true);
                }}
                className={`hidden sm:inline-flex items-center justify-center h-10 px-5 rounded-full text-xs font-['Quicksand'] font-bold transition-all cursor-pointer ${
                  activeAuth === 'Login'
                    ? 'bg-[#ffd9e2] text-[#964261] border border-[#f48fb1]'
                    : 'text-[#22191b] hover:bg-[#fff0f2] border-2 border-[#fbeaec]'
                }`}
              >
                Log In
              </button>

              <button
                type="button"
                onClick={() => {
                  setIsLoggedIn(true);
                }}
                className="btn-tactile-primary hidden sm:inline-flex items-center justify-center h-10 px-6 text-xs"
              >
                Register
              </button>
            </div>
          )}

          {/* Mobile Menu Trigger */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="md:hidden w-10 h-10 rounded-full border border-[#f5e4e7] bg-[#fff8f8] text-[#22191b] flex items-center justify-center cursor-pointer"
            aria-label="Toggle Mobile Menu"
          >
            <span className="material-symbols-outlined text-[20px]">
              {mobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-20 left-0 right-0 border-t border-[#fbeaec] bg-white px-6 py-4 shadow-xl z-50 space-y-4 animate-fade-in font-['Quicksand']">
          <div className="flex flex-col space-y-2">
            {CANONICAL_PUBLIC_NAV.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => {
                  onNavigateScreen(NAV_SCREEN_MAP[item]);
                  setMobileMenuOpen(false);
                }}
                className={`text-left py-2 text-sm font-bold ${
                  activeNav === item ||
                  (item === 'Course' && activeNav === 'Courses') ||
                  (item === 'Courses' && activeNav === 'Course')
                    ? 'text-[#f48fb1]'
                    : 'text-[#22191b] hover:text-[#f48fb1]'
                }`}
              >
                {item}
              </button>
            ))}
          </div>

          {/* Mobile Auth State Display */}
          <div className="pt-3 border-t border-[#f5e4e7] space-y-2">
            {isLoggedIn ? (
              <div className="p-3.5 rounded-2xl bg-[#fff8f8] border border-[#fbeaec] flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-[#f48fb1] text-white flex items-center justify-center font-bold text-xs ring-2 ring-[#ffd9e2]">
                    MT
                  </div>
                  <div>
                    <span className="font-bold text-xs text-[#22191b] block">
                      May Thu (IELTS Scholar)
                    </span>
                    <span className="text-[10px] text-[#534247]">Logged In Student</span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setIsLoggedIn(false)}
                  className="px-2.5 py-1 text-xs text-red-600 hover:bg-red-50 rounded-full font-bold cursor-pointer"
                >
                  Log Out
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setIsLoggedIn(true);
                    setMobileMenuOpen(false);
                  }}
                  className="flex-1 py-2.5 rounded-full bg-[#fff0f2] text-[#964261] border border-[#f5e4e7] text-xs font-bold text-center"
                >
                  Log In
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsLoggedIn(true);
                    setMobileMenuOpen(false);
                  }}
                  className="flex-1 btn-tactile-primary py-2.5 text-xs text-center"
                >
                  Register
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
