import React, { useState } from 'react';
import { CANONICAL_STUDENT_NAV, StudentNavItem } from '../../types/navigation';

interface StudentNavbarProps {
  activeItem: StudentNavItem;
  onSelectItem: (item: StudentNavItem) => void;
  showSpecGuides?: boolean;
}

export const StudentNavbar: React.FC<StudentNavbarProps> = ({
  activeItem,
  onSelectItem,
  showSpecGuides = false,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const primaryItems = CANONICAL_STUDENT_NAV.slice(0, 7);

  return (
    <header
      className={`p-4 rounded-xl bg-white border border-[#E9DDE1] shadow-sm flex flex-col gap-3 relative z-40 ${
        showSpecGuides ? 'outline-1 outline-dashed outline-[#B75E78]' : ''
      }`}
    >
      {showSpecGuides && (
        <div className="absolute -top-2.5 right-4 text-[10px] font-mono bg-[#B75E78] text-white px-2 py-0.5 rounded-sm z-50 pointer-events-none">
          Normalized Student Navbar • Canonical 9-Item Student Architecture • Matched to Main Public Navbar
        </div>
      )}

      <div className="w-full flex items-center justify-between gap-4">
        {/* Left: Canonical TE Brand Logo Lockup */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={() => onSelectItem('Home')}
            className="w-10 h-10 rounded-lg bg-[#F3DDE3] flex items-center justify-center font-bold text-base text-[#B75E78] shadow-sm cursor-pointer"
          >
            TE
          </button>
          <div>
            <button
              type="button"
              onClick={() => onSelectItem('Home')}
              className="font-bold text-base text-[#2D2529] tracking-tight block hover:text-[#B75E78] transition-colors text-left cursor-pointer"
            >
              Teacher Theint English
            </button>
            <span className="text-xs text-[#766A70] block">
              English Teaching &amp; Learning Platform
            </span>
          </div>
        </div>

        {/* Center: Canonical Student Primary Navigation (Home, Courses, My Courses, Assessments, Progress, One-on-One, Calendar) */}
        <nav
          aria-label="Student Application Navigation"
          className="hidden xl:flex items-center gap-5"
        >
          {primaryItems.map(({ label, badge }) => {
            const isActive = activeItem === label;
            return (
              <button
                key={label}
                type="button"
                onClick={() => onSelectItem(label)}
                className={`text-sm font-semibold transition-colors flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'text-[#B75E78] hover:text-[#93415a]'
                    : 'text-[#2D2529] hover:text-[#B75E78]'
                }`}
              >
                <span>{label}</span>
                {badge && (
                  <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-[#F3DDE3] text-[#B75E78]">
                    {badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Right: Student Profile & Notifications Cluster */}
        <div className="hidden xl:flex items-center gap-3 shrink-0">
          {/* Notification Bell Button */}
          <button
            type="button"
            onClick={() => onSelectItem('Notifications')}
            className={`relative w-10 h-10 rounded-full flex items-center justify-center transition-all cursor-pointer ${
              activeItem === 'Notifications'
                ? 'bg-[#F3DDE3] text-[#B75E78] ring-2 ring-[#B75E78]/30'
                : 'text-[#534246] hover:text-[#B75E78] hover:bg-[#F7F1F3]'
            }`}
            aria-label="Student Notifications"
          >
            <span className="material-symbols-outlined text-[22px]">notifications</span>
            <span className="absolute top-2 right-2 w-2.5 h-2.5 rounded-full bg-[#B75E78] ring-2 ring-white"></span>
          </button>

          {/* Round Profile Avatar & Student Name */}
          <button
            type="button"
            onClick={() => onSelectItem('Profile')}
            className={`flex items-center gap-2.5 pl-1.5 pr-3.5 py-1 rounded-full border transition-all cursor-pointer shadow-2xs group ${
              activeItem === 'Profile'
                ? 'bg-[#F3DDE3] border-[#D8899D]'
                : 'bg-[#FCFAF9] hover:bg-[#F7F1F3] border-[#E9DDE1]'
            }`}
          >
            <div className="relative">
              <div className="w-8 h-8 rounded-full bg-[#B75E78] text-white flex items-center justify-center text-xs font-bold shadow-xs shrink-0 ring-2 ring-[#F3DDE3]">
                MT
              </div>
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-1.5 ring-white"></span>
            </div>
            <div className="flex flex-col text-left leading-tight">
              <span className="font-bold text-xs text-[#2D2529] group-hover:text-[#B75E78] transition-colors">
                May Thu
              </span>
              <span className="text-[10px] text-[#8d4a5c] font-semibold">
                IELTS Scholar
              </span>
            </div>
            <span className="material-symbols-outlined text-[16px] text-[#766A70]">
              expand_more
            </span>
          </button>
        </div>

        {/* Tablet / Mobile Trigger */}
        <div className="flex xl:hidden items-center gap-2">
          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="w-9 h-9 rounded-sm border border-[#E9DDE1] bg-[#FCFAF9] text-[#2D2529] flex items-center justify-center"
            aria-label="Toggle Student Menu"
          >
            <span className="material-symbols-outlined text-[18px]">
              {mobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </div>

      {/* Responsive Mobile/Tablet Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden pt-3 border-t border-[#E9DDE1] grid grid-cols-1 sm:grid-cols-2 gap-2">
          {CANONICAL_STUDENT_NAV.map(({ label, icon, badge }) => {
            const isActive = activeItem === label;
            return (
              <button
                key={label}
                type="button"
                onClick={() => {
                  onSelectItem(label);
                  setMobileMenuOpen(false);
                }}
                className={`px-3 py-2 rounded-sm text-left text-xs font-bold flex items-center justify-between ${
                  isActive
                    ? 'bg-[#F3DDE3] text-[#B75E78]'
                    : 'bg-[#FCFAF9] text-[#2D2529] hover:bg-[#F7F1F3]'
                }`}
              >
                <span className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[16px] text-[#B75E78]">
                    {icon}
                  </span>
                  <span>{label}</span>
                </span>
                {badge && (
                  <span className="px-2 py-0.5 rounded-full bg-white text-[#B75E78] text-[10px]">
                    {badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
};
