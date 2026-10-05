import React, { useState } from 'react';
import { AdminNavItem, CANONICAL_ADMIN_NAV } from '../../../types/navigation';
import { BrandLogo } from '../../navigation/BrandLogo';

interface AdminPortalScreenProps {
  showSpecGuides?: boolean;
}

const PAYMENT_VERIFICATIONS = [
  {
    id: 'PAY-4412',
    student: 'Nandar Linn',
    course: 'IELTS Academic Band 7.5+ Mastery',
    method: 'KBZPay Transfer',
    amount: '380,000 MMK',
    submitted: '18 mins ago',
    status: 'Pending Verification',
  },
  {
    id: 'PAY-4411',
    student: 'Kyaw Swar Hein',
    course: 'Academic Grammar & Sentence Architecture',
    method: 'WavePay',
    amount: '260,000 MMK',
    submitted: '45 mins ago',
    status: 'Pending Verification',
  },
  {
    id: 'PAY-4410',
    student: 'May Thu Aung',
    course: 'Bespoke 1-on-1 Coaching (12 Sessions)',
    method: 'AYA Mobile Banking',
    amount: '650,000 MMK',
    submitted: '2 hours ago',
    status: 'Verified & Enrolled',
  },
  {
    id: 'PAY-4409',
    student: 'Zin Mar Oo',
    course: 'Confident Spoken English Clinic',
    method: 'KBZPay Transfer',
    amount: '310,000 MMK',
    submitted: '3 hours ago',
    status: 'Verified & Enrolled',
  },
];

export const AdminPortalScreen: React.FC<AdminPortalScreenProps> = ({
  showSpecGuides = false,
}) => {
  const [activeNav, setActiveNav] = useState<AdminNavItem>('Payments');
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-[#FCFAF9] text-[#2D2529]">
      <main className="max-w-[1440px] w-full mx-auto px-6 lg:px-12 py-8 space-y-8 flex-1 pb-28">
        {/* Normalized Admin Top Header Bar aligned with Main Public Navbar reference */}
        <header
          className={`p-4 rounded-xl bg-white border border-[#E9DDE1] shadow-sm flex items-center justify-between gap-4 relative ${
            showSpecGuides ? 'outline-1 outline-dashed outline-[#B75E78]' : ''
          }`}
        >
          {showSpecGuides && (
            <div className="absolute -top-2.5 right-4 text-[10px] font-mono bg-[#B75E78] text-white px-2 py-0.5 rounded-sm z-50 pointer-events-none">
              Normalized Admin Header • Canonical 19-Item Admin Nav • Matched to Main Navbar
            </div>
          )}

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setMobileSidebarOpen((prev) => !prev)}
              className="lg:hidden w-9 h-9 rounded-sm border border-[#E9DDE1] bg-[#FCFAF9] text-[#2D2529] flex items-center justify-center"
              aria-label="Toggle Admin Sidebar"
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

          {/* Center: Active Admin Module Context */}
          <div className="hidden md:flex items-center gap-2 text-sm">
            <span className="text-[#766A70] font-semibold">Admin Console</span>
            <span className="text-[#E9DDE1]">/</span>
            <span className="text-[#B75E78] font-bold">{activeNav}</span>
          </div>

          {/* Right: Canonical Admin Utility Actions (Content Approval, Notifications, Settings) */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setActiveNav('Content Approval')}
              className="hidden sm:inline-flex px-3.5 py-1.5 rounded-sm bg-[#F7F1F3] hover:bg-[#E9DDE1] text-[#2D2529] text-xs font-bold transition-colors items-center gap-1.5 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px] text-[#B75E78]">
                verified
              </span>
              <span>Content Approval (4)</span>
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
            </button>

            <button
              type="button"
              onClick={() => setActiveNav('Settings')}
              className={`px-4 py-1.5 rounded-sm text-xs font-bold shadow-sm transition-all flex items-center gap-1.5 cursor-pointer ${
                activeNav === 'Settings'
                  ? 'bg-[#93415a] text-white ring-2 ring-[#F3DDE3]'
                  : 'bg-[#B75E78] hover:bg-[#93415a] text-white'
              }`}
            >
              <span>Settings</span>
            </button>
          </div>
        </header>

        {/* Admin Application Shell: Canonical 19-Item Sidebar + Main Content */}
        <div className="flex flex-col lg:flex-row gap-8">
          <aside
            aria-label="Admin Primary Navigation"
            className={`${
              mobileSidebarOpen ? 'block' : 'hidden lg:block'
            } w-full lg:w-68 rounded-xl bg-white border border-[#E9DDE1] shadow-sm p-4 shrink-0 self-start`}
          >
          <div className="px-3 py-1.5 text-[10.5px] font-bold uppercase tracking-[0.16em] text-[#9B8F94]">
            Admin Navigation (19 Canonical)
          </div>

          <nav className="mt-1 space-y-0.5">
            {CANONICAL_ADMIN_NAV.map(({ label, icon, badge }) => {
              const isActive = activeNav === label;
              return (
                <button
                  key={label}
                  type="button"
                  onClick={() => {
                    setActiveNav(label);
                    setMobileSidebarOpen(false);
                  }}
                  className={`w-full px-3 py-2 rounded-xl text-left text-[13px] flex items-center justify-between transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#F3DDE3]/60 text-[#B75E78] font-semibold border border-[#D8899D]/40'
                      : 'text-[#766A70] font-medium hover:bg-[#F7F1F3] hover:text-[#2D2529] border border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span
                      className={`material-symbols-outlined text-[18px] ${
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

          {/* Main Admin Content Canvas */}
          <div className="flex-1 space-y-6">
            <div className="bg-[#FFFFFF] rounded-2xl border border-[#E9DDE1] p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#B75E78]">
                Teacher Theint Operations • {activeNav}
              </div>
              <h1 className="font-serif-editorial text-2xl sm:text-3xl font-semibold text-[#2D2529] mt-1">
                {activeNav === 'Payments'
                  ? 'Tuition Payment & Enrollment Verification'
                  : `Admin ${activeNav} Control Center`}
              </h1>
            </div>
            <div className="flex items-center gap-2.5">
              <button
                type="button"
                onClick={() => setActiveNav('Audit')}
                className="h-10 px-4 rounded-lg border border-[#E9DDE1] bg-[#FCFAF9] hover:bg-[#F7F1F3] text-[13px] font-semibold text-[#2D2529] cursor-pointer"
              >
                View Audit Log
              </button>
              <button
                type="button"
                className="h-10 px-4 rounded-lg bg-[#D8899D] hover:bg-[#B75E78] text-white text-[13px] font-semibold shadow-2xs transition-all cursor-pointer"
              >
                Approve Verified Receipts
              </button>
            </div>
          </div>

          {/* Admin KPIs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-[#FFFFFF] rounded-xl border border-[#E9DDE1] p-5">
              <div className="text-[12px] font-medium text-[#766A70]">Pending Payment Receipts</div>
              <div className="font-serif-editorial text-3xl font-bold text-[#B75E78] mt-1">8</div>
              <div className="text-[11px] text-[#9B8F94] mt-1">KBZPay / WavePay / AYA</div>
            </div>
            <div className="bg-[#FFFFFF] rounded-xl border border-[#E9DDE1] p-5">
              <div className="text-[12px] font-medium text-[#766A70]">Active Enrollments</div>
              <div className="font-serif-editorial text-3xl font-bold text-[#2D2529] mt-1">412</div>
              <div className="text-[11px] text-[#9B8F94] mt-1">October Academic Term</div>
            </div>
            <div className="bg-[#FFFFFF] rounded-xl border border-[#E9DDE1] p-5">
              <div className="text-[12px] font-medium text-[#766A70]">Content Approval Queue</div>
              <div className="font-serif-editorial text-3xl font-bold text-[#2D2529] mt-1">4</div>
              <div className="text-[11px] text-[#9B8F94] mt-1">2 Blog Posts • 2 Lesson PDFs</div>
            </div>
            <div className="bg-[#FFFFFF] rounded-xl border border-[#E9DDE1] p-5">
              <div className="text-[12px] font-medium text-[#766A70]">System Security Audit</div>
              <div className="font-serif-editorial text-3xl font-bold text-[#2D2529] mt-1">100%</div>
              <div className="text-[11px] text-[#B75E78] font-semibold mt-1">
                One Account = One Primary Role
              </div>
            </div>
          </div>

          {/* Payment Verification Table */}
          <div className="bg-[#FFFFFF] rounded-2xl border border-[#E9DDE1] overflow-hidden">
            <div className="px-6 py-4 border-b border-[#E9DDE1] flex items-center justify-between">
              <h2 className="font-serif-editorial text-xl font-semibold text-[#2D2529]">
                Recent Student Tuition Submissions
              </h2>
              <span className="text-[12px] text-[#766A70] font-medium">
                Real-time Receipt Verification Queue
              </span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-[#E9DDE1] bg-[#FCFAF9] text-[11px] font-bold uppercase tracking-wider text-[#766A70]">
                    <th className="py-3.5 px-6">Receipt ID &amp; Student</th>
                    <th className="py-3.5 px-6">Program</th>
                    <th className="py-3.5 px-6">Payment Channel</th>
                    <th className="py-3.5 px-6">Amount</th>
                    <th className="py-3.5 px-6">Status</th>
                    <th className="py-3.5 px-6 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E9DDE1] text-[13.5px]">
                  {PAYMENT_VERIFICATIONS.map((item) => (
                    <tr key={item.id} className="hover:bg-[#FCFAF9]">
                      <td className="py-4 px-6">
                        <div className="font-semibold text-[#2D2529]">{item.student}</div>
                        <div className="text-[12px] text-[#9B8F94]">
                          {item.id} • {item.submitted}
                        </div>
                      </td>
                      <td className="py-4 px-6 font-medium text-[#2D2529]">{item.course}</td>
                      <td className="py-4 px-6 text-[#766A70]">{item.method}</td>
                      <td className="py-4 px-6 font-semibold text-[#2D2529]">{item.amount}</td>
                      <td className="py-4 px-6">
                        <span className="px-2.5 py-1 rounded-md bg-[#F3DDE3]/70 text-[#B75E78] text-[12px] font-semibold">
                          {item.status}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-right">
                        <button
                          type="button"
                          className="h-9 px-3.5 rounded-lg border border-[#E9DDE1] bg-[#FFFFFF] hover:bg-[#F3DDE3]/50 text-[12.5px] font-semibold text-[#B75E78] cursor-pointer"
                        >
                          Verify Receipt
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
