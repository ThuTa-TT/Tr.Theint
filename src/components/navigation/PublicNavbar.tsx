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
          ? `h-20 px-6 sm:px-8 rounded-xl bg-white/95 backdrop-blur-md border border-[#E9DDE1] shadow-sm flex items-center justify-between relative z-50 ${
              showSpecGuides ? 'outline-1 outline-dashed outline-[#B75E78]' : ''
            }`
          : `sticky top-0 z-50 h-20 bg-white/95 backdrop-blur-md border-b border-[#E9DDE1] shadow-sm relative flex items-center ${
              showSpecGuides ? 'outline-1 outline-dashed outline-[#B75E78]' : ''
            }`
      }
    >
      {showSpecGuides && (
        <div className="absolute -top-2.5 right-4 text-[10px] font-mono bg-[#B75E78] text-white px-2 py-0.5 rounded-sm z-50 pointer-events-none">
          Approved Home Page Navbar Reference • TT Logo • EN|MM Pill • {isLoggedIn ? 'Student Logged In' : 'Guest CTAs'}
        </div>
      )}

      <div
        className={
          variant === 'card'
            ? 'w-full flex items-center justify-between'
            : 'max-w-[1440px] w-full mx-auto px-6 lg:px-12 flex items-center justify-between'
        }
      >
        {/* Left: Canonical TT Brand Logo Lockup */}
        <div className="flex items-center gap-3.5">
          <button
            type="button"
            onClick={() => onNavigateScreen('PUB-01-HOME')}
            className="w-10 h-10 rounded-lg bg-[#F3DDE3] flex items-center justify-center font-bold text-base text-[#B75E78] shadow-sm cursor-pointer shrink-0"
          >
            TT
          </button>
          <div>
            <button
              type="button"
              onClick={() => onNavigateScreen('PUB-01-HOME')}
              className="font-bold text-base text-[#2D2529] tracking-tight block hover:text-[#B75E78] transition-colors text-left cursor-pointer"
            >
              Teacher Theint English
            </button>
            <span className="text-xs text-[#766A70] block">
              English Teaching &amp; Learning Platform
            </span>
          </div>
        </div>

        {/* Center: Canonical Public Navigation Links */}
        <nav
          aria-label="Main Public Navigation"
          className="hidden md:flex items-center gap-7"
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
                className={`relative py-1 text-sm font-semibold transition-colors cursor-pointer ${
                  isActive
                    ? 'text-[#B75E78] font-bold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#B75E78] after:rounded-full'
                    : 'text-[#2D2529] hover:text-[#B75E78]'
                }`}
              >
                {item}
              </button>
            );
          })}
        </nav>

        {/* Right Section: Language Pill + Auth State (Logged In vs Logged Out) */}
        <div className="flex items-center gap-3">
          {/* Quick Simulation Mode Toggle Pill */}
          <button
            type="button"
            onClick={() => {
              setIsLoggedIn((prev) => !prev);
              setNotificationsOpen(false);
              setProfileDropdownOpen(false);
            }}
            title="Click to toggle between Logged In and Guest header states"
            className="hidden lg:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-[#F7F1F3] hover:bg-[#E9DDE1] text-[#766A70] border border-[#E9DDE1] transition-all cursor-pointer"
          >
            <span
              className={`w-2 h-2 rounded-full ${
                isLoggedIn ? 'bg-emerald-500' : 'bg-amber-400'
              }`}
            ></span>
            <span>{isLoggedIn ? 'Status: Logged In' : 'Status: Guest'}</span>
            <span className="material-symbols-outlined text-[13px] text-[#B75E78]">
              swap_horiz
            </span>
          </button>

          {/* Language Switcher Pill (EN | MM) */}
          <div className="flex items-center rounded-full bg-[#F7F1F3] border border-[#E9DDE1] p-1 text-xs font-semibold shadow-2xs">
            <button
              type="button"
              onClick={() => onLanguageChange('EN')}
              className={`px-3 py-1 rounded-full transition-colors cursor-pointer ${
                language === 'EN'
                  ? 'bg-[#B75E78] text-white shadow-xs'
                  : 'text-[#766A70] hover:text-[#2D2529]'
              }`}
            >
              EN
            </button>
            <button
              type="button"
              onClick={() => onLanguageChange('MM')}
              className={`px-3 py-1 rounded-full transition-colors cursor-pointer ${
                language === 'MM'
                  ? 'bg-[#B75E78] text-white shadow-xs'
                  : 'text-[#766A70] hover:text-[#2D2529]'
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
                      ? 'bg-[#F3DDE3] text-[#B75E78] ring-2 ring-[#B75E78]/30'
                      : 'text-[#534246] hover:text-[#B75E78] hover:bg-[#F7F1F3]'
                  }`}
                >
                  <span className="material-symbols-outlined text-[22px]">
                    notifications
                  </span>
                  {/* Unread indicator dot */}
                  <span className="absolute top-2 right-2 w-2.5 h-2.5 rounded-full bg-[#B75E78] ring-2 ring-white"></span>
                </button>

                {/* Notifications Popover Dropdown */}
                {notificationsOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-40"
                      onClick={() => setNotificationsOpen(false)}
                      aria-hidden="true"
                    />
                    <div className="absolute right-0 top-full mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-[#E9DDE1] p-4 z-50 animate-fade-in text-xs space-y-3">
                      <div className="flex items-center justify-between pb-2 border-b border-[#E9DDE1]">
                        <div className="flex items-center gap-1.5">
                          <span className="font-bold text-sm text-[#2D2529]">
                            Notifications
                          </span>
                          <span className="px-2 py-0.5 rounded-full bg-[#F3DDE3] text-[#B75E78] text-[10px] font-bold">
                            2 New
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={() => setNotificationsOpen(false)}
                          className="text-[#766A70] hover:text-[#2D2529] cursor-pointer"
                        >
                          <span className="material-symbols-outlined text-[16px]">close</span>
                        </button>
                      </div>

                      <div className="space-y-2">
                        {notifications.map((item) => (
                          <div
                            key={item.id}
                            className={`p-3 rounded-xl border flex items-start gap-3 transition-colors ${
                              item.unread
                                ? 'bg-[#FCFAF9] border-[#D8899D]/40'
                                : 'bg-white border-[#E9DDE1]'
                            }`}
                          >
                            <div
                              className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
                                item.unread
                                  ? 'bg-[#F3DDE3] text-[#B75E78]'
                                  : 'bg-[#F7F1F3] text-[#766A70]'
                              }`}
                            >
                              <span className="material-symbols-outlined text-[16px]">
                                {item.icon}
                              </span>
                            </div>
                            <div className="flex-1 space-y-0.5">
                              <span className="font-bold text-[#2D2529] block">
                                {item.title}
                              </span>
                              <p className="text-[#766A70] text-[11px] leading-relaxed">
                                {item.desc}
                              </p>
                              <span className="text-[10px] text-[#B75E78] font-semibold block pt-0.5">
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
                        className="w-full py-2 rounded-lg bg-[#F7F1F3] hover:bg-[#E9DDE1] text-[#2D2529] font-bold text-center block transition-colors cursor-pointer"
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
                  className="flex items-center gap-2.5 pl-1.5 pr-3 py-1 rounded-full bg-[#FCFAF9] hover:bg-[#F7F1F3] border border-[#E9DDE1] transition-all cursor-pointer shadow-2xs group"
                >
                  {/* Round Avatar with Photo/Initials */}
                  <div className="relative">
                    <div className="w-8 h-8 rounded-full bg-[#B75E78] text-white flex items-center justify-center text-xs font-bold shadow-xs shrink-0 ring-2 ring-[#F3DDE3]">
                      MT
                    </div>
                    {/* Active online green dot */}
                    <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-1.5 ring-white"></span>
                  </div>

                  {/* Student Name & Track Subtitle */}
                  <div className="hidden sm:flex flex-col text-left leading-tight">
                    <span className="font-bold text-xs text-[#2D2529] group-hover:text-[#B75E78] transition-colors">
                      May Thu
                    </span>
                    <span className="text-[10px] text-[#8d4a5c] font-semibold">
                      IELTS Scholar
                    </span>
                  </div>

                  <span className="material-symbols-outlined text-[16px] text-[#766A70] group-hover:text-[#2D2529] transition-transform">
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
                    <div className="absolute right-0 top-full mt-2 w-64 sm:w-72 bg-white rounded-2xl shadow-2xl border border-[#E9DDE1] p-4 z-50 animate-fade-in text-xs space-y-3">
                      <div className="flex items-center gap-3 pb-3 border-b border-[#E9DDE1]">
                        <div className="w-10 h-10 rounded-full bg-[#B75E78] text-white flex items-center justify-center font-bold text-sm ring-2 ring-[#F3DDE3]">
                          MT
                        </div>
                        <div>
                          <span className="font-bold text-sm text-[#2D2529] block">
                            May Thu
                          </span>
                          <span className="text-[11px] text-[#766A70] block">
                            maythu.scholar@gmail.com
                          </span>
                          <span className="px-2 py-0.5 rounded-full bg-[#F3DDE3] text-[#B75E78] text-[9px] font-bold mt-1 inline-block">
                            TTE-2024-8841 • Intensive
                          </span>
                        </div>
                      </div>

                      <div className="space-y-1">
                        <button
                          type="button"
                          onClick={() => {
                            setProfileDropdownOpen(false);
                            onNavigateScreen('STU-01-PORTAL');
                          }}
                          className="w-full p-2.5 rounded-lg hover:bg-[#F7F1F3] text-[#2D2529] font-semibold text-left flex items-center gap-2 cursor-pointer"
                        >
                          <span className="material-symbols-outlined text-[18px] text-[#B75E78]">
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
                          className="w-full p-2.5 rounded-lg hover:bg-[#F7F1F3] text-[#2D2529] font-semibold text-left flex items-center gap-2 cursor-pointer"
                        >
                          <span className="material-symbols-outlined text-[18px] text-[#B75E78]">
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
                          className="w-full p-2.5 rounded-lg hover:bg-[#F7F1F3] text-[#2D2529] font-semibold text-left flex items-center gap-2 cursor-pointer"
                        >
                          <span className="material-symbols-outlined text-[18px] text-[#B75E78]">
                            assignment_turned_in
                          </span>
                          <span>Diagnostic Assessments</span>
                        </button>
                      </div>

                      {/* Log Out Option (Switches to Guest State) */}
                      <div className="pt-2 border-t border-[#E9DDE1]">
                        <button
                          type="button"
                          onClick={() => {
                            setIsLoggedIn(false);
                            setProfileDropdownOpen(false);
                          }}
                          className="w-full p-2 rounded-lg text-red-600 hover:bg-red-50 font-bold text-left flex items-center justify-between cursor-pointer"
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
                  // If user clicks Log In, they can switch to logged in state or open login
                  setIsLoggedIn(true);
                }}
                className={`hidden sm:inline-flex items-center justify-center h-10 px-4 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                  activeAuth === 'Login'
                    ? 'bg-[#F3DDE3] text-[#B75E78] border border-[#D8899D]'
                    : 'text-[#2D2529] hover:bg-[#F7F1F3] border border-[#E9DDE1]'
                }`}
              >
                Log In
              </button>

              <button
                type="button"
                onClick={() => {
                  setIsLoggedIn(true);
                }}
                className={`hidden sm:inline-flex items-center justify-center h-10 px-5 rounded-lg text-white text-xs font-bold shadow-sm transition-all cursor-pointer ${
                  activeAuth === 'Register'
                    ? 'bg-[#93415a] ring-2 ring-[#F3DDE3]'
                    : 'bg-[#B75E78] hover:bg-[#93415a]'
                }`}
              >
                Register
              </button>
            </div>
          )}

          {/* Mobile Menu Trigger */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="md:hidden w-10 h-10 rounded-lg border border-[#E9DDE1] bg-[#FCFAF9] text-[#2D2529] flex items-center justify-center cursor-pointer"
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
        <div className="md:hidden absolute top-20 left-0 right-0 border-t border-[#E9DDE1] bg-white px-6 py-4 shadow-xl z-50 space-y-4 animate-fade-in">
          <div className="flex flex-col space-y-2">
            {CANONICAL_PUBLIC_NAV.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => {
                  onNavigateScreen(NAV_SCREEN_MAP[item]);
                  setMobileMenuOpen(false);
                }}
                className={`text-left py-2 text-sm font-semibold ${
                  activeNav === item ? 'text-[#B75E78] font-bold' : 'text-[#2D2529]'
                }`}
              >
                {item}
              </button>
            ))}
          </div>

          {/* Mobile Auth State Display */}
          <div className="pt-3 border-t border-[#E9DDE1] space-y-2">
            {isLoggedIn ? (
              <div className="p-3 rounded-xl bg-[#FCFAF9] border border-[#E9DDE1] flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-[#B75E78] text-white flex items-center justify-center font-bold text-xs">
                    MT
                  </div>
                  <div>
                    <span className="font-bold text-xs text-[#2D2529] block">
                      May Thu (IELTS Scholar)
                    </span>
                    <span className="text-[10px] text-[#766A70]">Logged In Student</span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setIsLoggedIn(false)}
                  className="px-2.5 py-1 text-xs text-red-600 hover:bg-red-50 rounded font-semibold cursor-pointer"
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
                  className="flex-1 py-2.5 rounded-lg bg-[#F7F1F3] text-[#2D2529] text-xs font-bold text-center"
                >
                  Log In
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsLoggedIn(true);
                    setMobileMenuOpen(false);
                  }}
                  className="flex-1 py-2.5 rounded-lg bg-[#B75E78] text-white text-xs font-bold text-center"
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
