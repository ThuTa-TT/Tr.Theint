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
      className={`p-4 px-6 rounded-2xl lg:rounded-full bg-white/95 backdrop-blur-md border border-[#fbeaec] shadow-[0_4px_16px_rgba(244,143,177,0.12)] flex flex-col gap-3 relative z-40 ${
        showSpecGuides ? 'outline-1 outline-dashed outline-[#f48fb1]' : ''
      }`}
    >
      {showSpecGuides && (
        <div className="absolute -top-2.5 right-6 text-[10px] font-mono bg-[#f48fb1] text-white px-2 py-0.5 rounded-full z-50 pointer-events-none shadow-xs">
          Normalized Student Navbar • Canonical 9-Item Student Architecture
        </div>
      )}

      <div className="w-full flex items-center justify-between gap-4 font-['Quicksand']">
        {/* Left: Canonical TE Brand Logo Lockup */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={() => onSelectItem('Home')}
            className="w-10 h-10 rounded-full overflow-hidden border-2 border-[#f48fb1] shadow-xs cursor-pointer hover:scale-105 transition-transform shrink-0 bg-white"
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
              onClick={() => onSelectItem('Home')}
              className="font-bold text-base text-[#22191b] tracking-tight block hover:text-[#f48fb1] transition-colors text-left cursor-pointer"
            >
              Teacher Theint English
            </button>
            <span className="text-xs text-[#534247] font-['Nunito_Sans'] block">
              English Teaching &amp; Learning Platform
            </span>
          </div>
        </div>

        {/* Center: Canonical Student Primary Navigation */}
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
                className={`text-sm font-bold transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer px-3 py-1.5 rounded-full ${
                  isActive
                    ? 'text-[#964261] bg-[#fff0f2] shadow-2xs'
                    : 'text-[#22191b] hover:text-[#f48fb1] hover:bg-[#fff0f2]/60'
                }`}
              >
                <span>{label}</span>
                {badge && (
                  <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-[#ffd9e2] text-[#964261]">
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
                ? 'bg-[#fff0f2] text-[#964261] ring-2 ring-[#f48fb1]/40'
                : 'text-[#534247] hover:text-[#f48fb1] hover:bg-[#fff0f2]'
            }`}
            aria-label="Student Notifications"
          >
            <span className="material-symbols-outlined text-[22px]">notifications</span>
            <span className="absolute top-2 right-2 w-2.5 h-2.5 rounded-full bg-[#f48fb1] ring-2 ring-white shadow-xs"></span>
          </button>

          {/* Round Profile Avatar & Student Name */}
          <button
            type="button"
            onClick={() => onSelectItem('Profile')}
            className={`flex items-center gap-2.5 pl-1.5 pr-3.5 py-1 rounded-full border transition-all cursor-pointer shadow-2xs group ${
              activeItem === 'Profile'
                ? 'bg-[#fff0f2] border-[#f48fb1] ring-2 ring-[#f48fb1]/30'
                : 'bg-[#fff8f8] hover:bg-[#fff0f2] border-[#fbeaec]'
            }`}
          >
            <div className="relative">
              <div className="w-8 h-8 rounded-full bg-[#f48fb1] text-white flex items-center justify-center text-xs font-bold shadow-xs shrink-0 ring-2 ring-[#ffd9e2]">
                MT
              </div>
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-1.5 ring-white"></span>
            </div>
            <div className="flex flex-col text-left leading-tight">
              <span className="font-bold text-xs text-[#22191b] group-hover:text-[#f48fb1] transition-colors">
                May Thu
              </span>
              <span className="text-[10px] text-[#964261] font-semibold">
                IELTS Scholar
              </span>
            </div>
            <span className="material-symbols-outlined text-[16px] text-[#534247]">
              expand_more
            </span>
          </button>
        </div>

        {/* Tablet / Mobile Trigger */}
        <div className="flex xl:hidden items-center gap-2">
          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="w-10 h-10 rounded-full border border-[#fbeaec] bg-[#fff8f8] text-[#22191b] flex items-center justify-center cursor-pointer hover:bg-[#fff0f2]"
            aria-label="Toggle Student Menu"
          >
            <span className="material-symbols-outlined text-[20px]">
              {mobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </div>

      {/* Responsive Mobile/Tablet Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden pt-3 border-t border-[#f5e4e7] grid grid-cols-1 sm:grid-cols-2 gap-2 font-['Quicksand']">
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
                className={`px-3.5 py-2.5 rounded-full text-left text-xs font-bold flex items-center justify-between transition-all ${
                  isActive
                    ? 'bg-[#fff0f2] text-[#964261] border border-[#f5e4e7]'
                    : 'bg-[#fff8f8] text-[#22191b] hover:bg-[#fff0f2]'
                }`}
              >
                <span className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[18px] text-[#f48fb1]">
                    {icon}
                  </span>
                  <span>{label}</span>
                </span>
                {badge && (
                  <span className="px-2 py-0.5 rounded-full bg-[#ffd9e2] text-[#964261] text-[10px] font-bold">
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
