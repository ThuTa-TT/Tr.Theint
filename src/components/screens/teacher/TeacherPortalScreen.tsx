import React, { useState } from 'react';
import { CANONICAL_TEACHER_NAV, TeacherNavItem } from '../../../types/navigation';
import { BrandLogo } from '../../navigation/BrandLogo';

interface TeacherPortalScreenProps {
  showSpecGuides?: boolean;
}

const GRADING_QUEUE = [
  {
    id: 'SUB-904',
    student: 'Aye Chan May',
    cohort: 'IELTS Band 7.5+ • Cohort #14',
    task: 'Writing Task 2: Public Transport vs. Road Expansion',
    submitted: '2 hours ago',
    targetBand: 'Band 7.5',
    status: 'Ready for Grading',
  },
  {
    id: 'SUB-903',
    student: 'Min Khant Kyaw',
    cohort: 'IELTS Band 7.5+ • Cohort #14',
    task: 'Writing Task 1: Global Renewable Energy Bar Chart',
    submitted: '4 hours ago',
    targetBand: 'Band 7.0',
    status: 'Ready for Grading',
  },
  {
    id: 'SUB-902',
    student: 'Hsu Myat Noe',
    cohort: 'Academic Grammar • Cohort #09',
    task: 'Unit 4 Diagnostic: Complex Adverbial & Relative Clauses',
    submitted: 'Yesterday',
    targetBand: 'CEFR B2',
    status: 'In Review',
  },
  {
    id: 'SUB-901',
    student: 'Thura Aung',
    cohort: 'Executive Business English • Cohort #06',
    task: 'Stakeholder Proposal Memo & Executive Summary',
    submitted: 'Yesterday',
    targetBand: 'CEFR B2+',
    status: 'Completed (Band 7.5)',
  },
];

export const TeacherPortalScreen: React.FC<TeacherPortalScreenProps> = ({
  showSpecGuides = false,
}) => {
  const [activeNav, setActiveNav] = useState<TeacherNavItem>('Assessments / Grading');
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-[#FCFAF9] text-[#2D2529]">
      <main className="max-w-[1440px] w-full mx-auto px-6 lg:px-12 py-8 space-y-8 flex-1 pb-28">
        {/* Normalized Teacher Top Header Bar aligned with Main Public Navbar reference */}
        <header
          className={`p-4 rounded-xl bg-white border border-[#E9DDE1] shadow-sm flex items-center justify-between gap-4 relative ${
            showSpecGuides ? 'outline-1 outline-dashed outline-[#B75E78]' : ''
          }`}
        >
          {showSpecGuides && (
            <div className="absolute -top-2.5 right-4 text-[10px] font-mono bg-[#B75E78] text-white px-2 py-0.5 rounded-sm z-50 pointer-events-none">
              Normalized Teacher Header • Canonical 9-Item Teacher Nav • Matched to Main Navbar
            </div>
          )}

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setMobileSidebarOpen((prev) => !prev)}
              className="lg:hidden w-9 h-9 rounded-sm border border-[#E9DDE1] bg-[#FCFAF9] text-[#2D2529] flex items-center justify-center"
              aria-label="Toggle Teacher Sidebar"
            >
              <span className="material-symbols-outlined text-[18px]">
                {mobileSidebarOpen ? 'close' : 'menu'}
              </span>
            </button>

            <BrandLogo
              onClick={() => setActiveNav('Dashboard')}
              showSpecGuides={showSpecGuides}
            />
          </div>

          {/* Center: Quick Topbar Context / Active Section Indicator */}
          <div className="hidden md:flex items-center gap-2 text-sm">
            <span className="text-[#766A70] font-semibold">Teacher Workspace</span>
            <span className="text-[#E9DDE1]">/</span>
            <span className="text-[#B75E78] font-bold">{activeNav}</span>
          </div>

          {/* Right: Canonical Teacher Utility Actions (Notifications, Profile) */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setActiveNav('One-on-One')}
              className="hidden sm:inline-flex px-3.5 py-1.5 rounded-sm bg-[#F7F1F3] hover:bg-[#E9DDE1] text-[#2D2529] text-xs font-bold transition-colors items-center gap-1.5 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px] text-[#B75E78]">duo</span>
              <span>One-on-One (2)</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveNav('Notifications')}
              className={`px-3.5 py-1.5 rounded-sm text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer ${
                activeNav === 'Notifications'
                  ? 'bg-[#F3DDE3] text-[#B75E78] border border-[#D8899D]'
                  : 'text-[#2D2529] hover:bg-[#F7F1F3] border border-[#E9DDE1]'
              }`}
            >
              <span className="material-symbols-outlined text-[16px] text-[#B75E78]">
                notifications
              </span>
              <span className="hidden sm:inline">Notifications</span>
              <span className="px-1.5 py-0.2 text-[10px] font-bold rounded-full bg-[#B75E78] text-white">
                5
              </span>
            </button>

            <button
              type="button"
              onClick={() => setActiveNav('Profile')}
              className={`px-4 py-1.5 rounded-sm text-xs font-bold shadow-sm transition-all flex items-center gap-1.5 cursor-pointer ${
                activeNav === 'Profile'
                  ? 'bg-[#93415a] text-white ring-2 ring-[#F3DDE3]'
                  : 'bg-[#B75E78] hover:bg-[#93415a] text-white'
              }`}
            >
              <span>Profile</span>
            </button>
          </div>
        </header>

        {/* Teacher Application Shell: Canonical 9-Item Sidebar + Main Content */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Canonical 9-Item Teacher Sidebar */}
          <aside
            aria-label="Teacher Primary Navigation"
            className={`${
              mobileSidebarOpen ? 'block' : 'hidden lg:block'
            } w-full lg:w-64 rounded-xl bg-white border border-[#E9DDE1] shadow-sm p-4 shrink-0 self-start`}
          >
          <div className="px-3 py-2 text-[10.5px] font-bold uppercase tracking-[0.16em] text-[#9B8F94]">
            Teacher Navigation (9)
          </div>
          <nav className="mt-1 space-y-1">
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
                  className={`w-full px-3.5 py-2.5 rounded-xl text-left text-[13.5px] flex items-center justify-between transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#F3DDE3]/60 text-[#B75E78] font-semibold border border-[#D8899D]/40'
                      : 'text-[#766A70] font-medium hover:bg-[#F7F1F3] hover:text-[#2D2529] border border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span
                      className={`material-symbols-outlined text-[19px] ${
                        isActive ? 'text-[#B75E78]' : 'text-[#9B8F94]'
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
                          ? 'bg-[#B75E78] text-white'
                          : 'bg-[#F3DDE3] text-[#B75E78]'
                      }`}
                    >
                      {badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </aside>

          {/* Main Teacher Content Canvas */}
          <div className="flex-1 space-y-6">
            <div className="bg-[#FFFFFF] rounded-2xl border border-[#E9DDE1] p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#B75E78]">
                Teacher Theint Academic Workspace • {activeNav}
              </div>
              <h1 className="font-serif-editorial text-2xl sm:text-3xl font-semibold text-[#2D2529] mt-1">
                {activeNav === 'Assessments / Grading'
                  ? 'IELTS & CEFR Writing Evaluation Queue'
                  : `Teacher ${activeNav} Management`}
              </h1>
            </div>
            <button
              type="button"
              className="h-10 px-4 rounded-lg bg-[#D8899D] hover:bg-[#B75E78] text-white text-[13px] font-semibold shadow-2xs transition-all cursor-pointer"
            >
              Publish Graded Feedback Batch
            </button>
          </div>

          {/* KPI Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-[#FFFFFF] rounded-xl border border-[#E9DDE1] p-5">
              <div className="text-[12px] font-medium text-[#766A70]">Pending Essays to Grade</div>
              <div className="font-serif-editorial text-3xl font-bold text-[#B75E78] mt-1">14</div>
              <div className="text-[11px] text-[#9B8F94] mt-1">SLA Target: Within 24 Hours</div>
            </div>
            <div className="bg-[#FFFFFF] rounded-xl border border-[#E9DDE1] p-5">
              <div className="text-[12px] font-medium text-[#766A70]">Active Enrolled Students</div>
              <div className="font-serif-editorial text-3xl font-bold text-[#2D2529] mt-1">128</div>
              <div className="text-[11px] text-[#9B8F94] mt-1">Across 4 Active Cohorts</div>
            </div>
            <div className="bg-[#FFFFFF] rounded-xl border border-[#E9DDE1] p-5">
              <div className="text-[12px] font-medium text-[#766A70]">Today&apos;s 1-on-1 Clinics</div>
              <div className="font-serif-editorial text-3xl font-bold text-[#2D2529] mt-1">2</div>
              <div className="text-[11px] text-[#9B8F94] mt-1">4:00 PM &amp; 5:00 PM MMT</div>
            </div>
            <div className="bg-[#FFFFFF] rounded-xl border border-[#E9DDE1] p-5">
              <div className="text-[12px] font-medium text-[#766A70]">Cohort Avg. Band Score</div>
              <div className="font-serif-editorial text-3xl font-bold text-[#2D2529] mt-1">7.4</div>
              <div className="text-[11px] text-[#B75E78] font-semibold mt-1">
                +0.6 Band Improvement
              </div>
            </div>
          </div>

          {/* Submissions Table */}
          <div className="bg-[#FFFFFF] rounded-2xl border border-[#E9DDE1] overflow-hidden">
            <div className="px-6 py-4 border-b border-[#E9DDE1] flex items-center justify-between">
              <h2 className="font-serif-editorial text-xl font-semibold text-[#2D2529]">
                Student Assessment Submissions
              </h2>
              <span className="text-[12px] text-[#766A70] font-medium">
                Showing 4 recent submissions
              </span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-[#E9DDE1] bg-[#FCFAF9] text-[11px] font-bold uppercase tracking-wider text-[#766A70]">
                    <th className="py-3.5 px-6">Student</th>
                    <th className="py-3.5 px-6">Assessment Task</th>
                    <th className="py-3.5 px-6">Target</th>
                    <th className="py-3.5 px-6">Status</th>
                    <th className="py-3.5 px-6 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E9DDE1] text-[13.5px]">
                  {GRADING_QUEUE.map((row) => (
                    <tr key={row.id} className="hover:bg-[#FCFAF9]">
                      <td className="py-4 px-6">
                        <div className="font-semibold text-[#2D2529]">{row.student}</div>
                        <div className="text-[12px] text-[#766A70]">{row.cohort}</div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="font-medium text-[#2D2529]">{row.task}</div>
                        <div className="text-[12px] text-[#9B8F94]">Submitted {row.submitted}</div>
                      </td>
                      <td className="py-4 px-6">
                        <span className="px-2.5 py-1 rounded-md bg-[#F7F1F3] text-[#2D2529] text-[12px] font-semibold">
                          {row.targetBand}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <span className="px-2.5 py-1 rounded-md bg-[#F3DDE3]/70 text-[#B75E78] text-[12px] font-semibold">
                          {row.status}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-right">
                        <button
                          type="button"
                          className="h-9 px-3.5 rounded-lg border border-[#E9DDE1] bg-[#FFFFFF] hover:bg-[#F3DDE3]/50 text-[12.5px] font-semibold text-[#B75E78] cursor-pointer"
                        >
                          Open Rubric
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          </div>
        </div>
      </main>
    </div>
  );
};
