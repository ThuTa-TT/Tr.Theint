import React, { useState } from 'react';
import { ScreenId } from '../../../types/navigation';

interface FreeDirectEntryScreenProps {
  onNavigateScreen: (screenId: ScreenId) => void;
}

type QAState = 'ready' | 'dispatching' | 'skeleton' | 'guest' | 'error';

export const FreeDirectEntryScreen: React.FC<FreeDirectEntryScreenProps> = ({
  onNavigateScreen,
}) => {
  const [qaState, setQaState] = useState<QAState>('ready');

  const handleLaunchLesson = () => {
    setQaState('dispatching');
    setTimeout(() => {
      onNavigateScreen('STU-LESSON-01');
    }, 1200);
  };

  return (
    <div className="flex flex-col w-full space-y-6 font-['Nunito_Sans']">
      {/* ========================================================================= */}
      {/* QA STATE PREVIEW BAR                                                      */}
      {/* ========================================================================= */}
      <aside
        aria-label="Developer Inspection Toolbar"
        className="w-full bg-white text-[#22191b] px-5 py-3 rounded-2xl shadow-sm border border-[#fbeaec]"
      >
        <div className="max-w-7xl mx-auto flex flex-col xl:flex-row items-start xl:items-center justify-between gap-3 font-['Quicksand'] font-bold">
          <div className="flex items-center gap-2.5">
            <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-[#f48fb1] text-white shadow-2xs">
              <span className="material-symbols-outlined text-[15px]">tune</span>
            </span>
            <span className="tracking-wider uppercase text-[#534247] text-[11px]">
              QA STATE PREVIEW <span className="text-[#964261]">(STU-FREE-01 Canonical Inspection Control)</span>
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-1.5 text-xs">
            <button
              type="button"
              onClick={() => setQaState('ready')}
              className={`px-3.5 py-1.5 rounded-full transition-colors cursor-pointer ${
                qaState === 'ready'
                  ? 'bg-[#f48fb1] text-white shadow-2xs font-bold'
                  : 'bg-[#fff8f8] text-[#534247] hover:bg-[#fff0f2] border border-[#f5e4e7]'
              }`}
            >
              1. Direct Access Ready
            </button>
            <button
              type="button"
              onClick={() => setQaState('dispatching')}
              className={`px-3.5 py-1.5 rounded-full transition-colors cursor-pointer ${
                qaState === 'dispatching'
                  ? 'bg-[#f48fb1] text-white shadow-2xs font-bold'
                  : 'bg-[#fff8f8] text-[#534247] hover:bg-[#fff0f2] border border-[#f5e4e7]'
              }`}
            >
              2. Session Dispatching
            </button>
            <button
              type="button"
              onClick={() => setQaState('skeleton')}
              className={`px-3.5 py-1.5 rounded-full transition-colors cursor-pointer ${
                qaState === 'skeleton'
                  ? 'bg-[#f48fb1] text-white shadow-2xs font-bold'
                  : 'bg-[#fff8f8] text-[#534247] hover:bg-[#fff0f2] border border-[#f5e4e7]'
              }`}
            >
              3. Skeleton Gateway
            </button>
            <button
              type="button"
              onClick={() => setQaState('guest')}
              className={`px-3.5 py-1.5 rounded-full transition-colors cursor-pointer ${
                qaState === 'guest'
                  ? 'bg-[#f48fb1] text-white shadow-2xs font-bold'
                  : 'bg-[#fff8f8] text-[#534247] hover:bg-[#fff0f2] border border-[#f5e4e7]'
              }`}
            >
              4. Guest Challenge
            </button>
            <button
              type="button"
              onClick={() => setQaState('error')}
              className={`px-3.5 py-1.5 rounded-full transition-colors cursor-pointer ${
                qaState === 'error'
                  ? 'bg-[#f48fb1] text-white shadow-2xs font-bold'
                  : 'bg-[#fff8f8] text-[#534247] hover:bg-[#fff0f2] border border-[#f5e4e7]'
              }`}
            >
              5. Error / Notice
            </button>
          </div>
        </div>
      </aside>

      {/* ========================================================================= */}
      {/* TOP NAVIGATION & PATHCRUMB                                                */}
      {/* ========================================================================= */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 bg-[#fff0f2] p-4 rounded-2xl border border-[#fbeaec] font-['Quicksand'] font-bold text-xs">
        <nav
          aria-label="Breadcrumbs"
          className="flex items-center flex-wrap gap-2 text-[#534247]"
        >
          <button
            type="button"
            onClick={() => onNavigateScreen('PUB-02-COURSES')}
            className="hover:text-[#f48fb1] transition-colors cursor-pointer"
          >
            Courses
          </button>
          <span className="material-symbols-outlined text-[16px] text-[#d8c1c6]">chevron_right</span>
          <span className="text-[#006685]">General English Track</span>
          <span className="material-symbols-outlined text-[16px] text-[#d8c1c6]">chevron_right</span>
          <button
            type="button"
            onClick={() => onNavigateScreen('PUB-03-COURSE-DETAIL')}
            className="text-[#22191b] font-bold truncate max-w-xs md:max-w-sm hover:text-[#f48fb1] transition-colors cursor-pointer"
          >
            Essential English Grammar Mastery
          </button>
          <span className="material-symbols-outlined text-[16px] text-[#d8c1c6]">chevron_right</span>
          <span className="text-[#964261] font-bold">Free Access Gateway</span>
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => onNavigateScreen('STU-COURSE-03-STRUCTURE')}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white text-[#964261] hover:bg-[#fff8f8] border border-[#f5e4e7] transition-colors text-xs font-bold cursor-pointer shadow-2xs"
          >
            <span className="material-symbols-outlined text-[18px] text-[#f48fb1]">arrow_back</span>
            <span>Back to Course Structure Preview</span>
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* STATE 2: SESSION DISPATCHING VIEW                                         */}
      {/* ========================================================================= */}
      {qaState === 'dispatching' && (
        <div className="flex flex-col items-center justify-center py-12 px-6 bg-white rounded-3xl shadow-[0_4px_20px_rgba(244,143,177,0.1)] text-center max-w-2xl mx-auto w-full border border-[#fbeaec] my-8">
          <div className="w-16 h-16 rounded-full bg-[#fff0f2] text-[#f48fb1] flex items-center justify-center mb-4 animate-spin shadow-xs">
            <span className="material-symbols-outlined text-[32px]">sync</span>
          </div>
          <span className="font-['Quicksand'] font-bold uppercase tracking-widest text-[#964261] text-xs">
            Session Gateway
          </span>
          <h2 className="font-['Quicksand'] font-bold text-[#22191b] mt-1 text-2xl sm:text-3xl">
            Initializing Free Study Classroom...
          </h2>
          <p className="text-[#534247] max-w-md mt-2 mb-6 text-xs sm:text-sm">
            Establishing direct stream player session for Lesson 1.1. Zero payment records created. Unlocking local auto-drill memory index.
          </p>
          <div className="w-full max-w-sm bg-[#fff0f2] h-3 rounded-full overflow-hidden mb-5 border border-[#fbeaec]">
            <div className="bg-[#f48fb1] h-full rounded-full animate-pulse w-3/4"></div>
          </div>
          <button
            type="button"
            onClick={() => setQaState('ready')}
            className="text-[#534247] hover:text-[#f48fb1] font-['Quicksand'] font-bold transition-colors text-xs cursor-pointer"
          >
            Cancel and return to Gateway summary
          </button>
        </div>
      )}

      {/* ========================================================================= */}
      {/* STATE 3: SKELETON / LOADING GATEWAY                                       */}
      {/* ========================================================================= */}
      {qaState === 'skeleton' && (
        <div className="flex flex-col gap-6 w-full animate-pulse py-8">
          <div className="bg-white rounded-3xl h-72 w-full p-8 flex flex-col justify-between border border-[#fbeaec]">
            <div className="flex gap-2">
              <div className="h-6 w-28 bg-[#fff0f2] rounded-full"></div>
              <div className="h-6 w-36 bg-[#fff0f2] rounded-full"></div>
              <div className="h-6 w-32 bg-[#fff0f2] rounded-full"></div>
            </div>
            <div className="flex flex-col gap-3">
              <div className="h-10 w-2/3 bg-[#fff0f2] rounded-2xl"></div>
              <div className="h-5 w-4/5 bg-[#fff0f2] rounded-xl"></div>
            </div>
            <div className="h-12 w-64 bg-[#fff0f2] rounded-full"></div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-8 bg-white rounded-3xl h-96 p-6 flex flex-col justify-between border border-[#fbeaec]">
              <div className="h-6 w-48 bg-[#fff0f2] rounded-full"></div>
              <div className="h-56 w-full bg-[#fff0f2] rounded-2xl"></div>
              <div className="h-6 w-3/4 bg-[#fff0f2] rounded-full"></div>
            </div>
            <div className="lg:col-span-4 bg-white rounded-3xl h-96 p-6 flex flex-col gap-4 border border-[#fbeaec]">
              <div className="h-6 w-32 bg-[#fff0f2] rounded-full"></div>
              <div className="h-20 w-full bg-[#fff0f2] rounded-2xl"></div>
              <div className="h-20 w-full bg-[#fff0f2] rounded-2xl"></div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* STATE 4: UNAUTHENTICATED GUEST CHALLENGE                                   */}
      {/* ========================================================================= */}
      {qaState === 'guest' && (
        <div className="flex flex-col items-center justify-center py-12 px-6 bg-white rounded-3xl shadow-[0_4px_20px_rgba(244,143,177,0.1)] text-center max-w-2xl mx-auto w-full border border-[#fbeaec] my-8 font-['Nunito_Sans']">
          <div className="w-16 h-16 rounded-full bg-[#fff0f2] text-[#f48fb1] flex items-center justify-center mb-4 shadow-2xs">
            <span className="material-symbols-outlined text-[32px]">lock</span>
          </div>
          <span className="font-['Quicksand'] font-bold uppercase tracking-widest text-[#534247] text-xs">
            Sign-in Recommended
          </span>
          <h2 className="font-['Quicksand'] font-bold text-[#22191b] mt-1 text-2xl sm:text-3xl">
            Save Your Free Course Progress
          </h2>
          <p className="text-[#534247] max-w-md mt-2 mb-6 text-xs sm:text-sm">
            This open-access course is completely free. Please log in or create a basic student account so your auto-drill benchmarks and video completion state can be preserved across devices.
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full max-w-xs font-['Quicksand'] font-bold">
            <button
              type="button"
              onClick={() => onNavigateScreen('AUTH-01-LOGIN')}
              className="w-full btn-tactile-primary py-2.5 px-4 rounded-full text-xs cursor-pointer"
            >
              Log In &amp; Continue
            </button>
            <button
              type="button"
              onClick={() => onNavigateScreen('AUTH-02-REGISTER')}
              className="w-full btn-tactile-secondary py-2.5 px-4 rounded-full text-xs cursor-pointer"
            >
              Create Free Account
            </button>
          </div>
          <div className="mt-6 pt-4">
            <button
              type="button"
              onClick={() => setQaState('ready')}
              className="text-[#534247] hover:text-[#f48fb1] font-['Quicksand'] font-bold transition-colors inline-flex items-center gap-1.5 text-xs cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">visibility</span>
              Continue as Guest (without cloud sync)
            </button>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* STATE 5: ERROR / UNAVAILABLE NOTICE                                       */}
      {/* ========================================================================= */}
      {qaState === 'error' && (
        <div className="flex flex-col items-center justify-center py-12 px-6 bg-white rounded-3xl shadow-[0_4px_20px_rgba(244,143,177,0.1)] text-center max-w-2xl mx-auto w-full border border-[#fbeaec] my-8">
          <div className="w-16 h-16 rounded-full bg-[#ffdad6] text-[#ba1a1a] flex items-center justify-center mb-4 shadow-2xs">
            <span className="material-symbols-outlined text-[32px]">report_problem</span>
          </div>
          <span className="font-['Quicksand'] font-bold uppercase tracking-widest text-[#ba1a1a] text-xs">
            Curriculum Notice
          </span>
          <h2 className="font-['Quicksand'] font-bold text-[#22191b] mt-1 text-2xl sm:text-3xl">
            Course In Maintenance Mode
          </h2>
          <p className="text-[#534247] max-w-md mt-2 mb-6 text-xs sm:text-sm">
            Essential English Grammar Mastery is currently undergoing scheduled curriculum re-indexing. Direct stream links are temporarily cycling. Please try again in a few moments.
          </p>
          <div className="flex items-center gap-3 font-['Quicksand'] font-bold">
            <button
              type="button"
              onClick={() => setQaState('ready')}
              className="btn-tactile-primary px-6 py-2.5 rounded-full text-xs cursor-pointer"
            >
              Retry Access
            </button>
            <button
              type="button"
              onClick={() => onNavigateScreen('PUB-02-COURSES')}
              className="px-5 py-2.5 rounded-full bg-[#fff0f2] text-[#22191b] hover:bg-[#fbeaec] transition-colors text-xs cursor-pointer border border-[#fbeaec]"
            >
              Browse Catalog
            </button>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* STATE 1: PRIMARY ACCESS RESOLUTION BILLBOARD CARD                         */}
      {/* ========================================================================= */}
      {qaState === 'ready' && (
        <div className="flex flex-col gap-8">
          <section className="relative bg-white rounded-3xl shadow-[0_4px_20px_rgba(244,143,177,0.1)] overflow-hidden p-6 sm:p-10 border border-[#fbeaec]">
            {/* Ambient Decorative Accent */}
            <div
              aria-hidden="true"
              className="absolute -top-24 -right-24 w-80 h-80 rounded-full bg-[#81d4fa]/30 blur-3xl pointer-events-none"
            ></div>
            <div
              aria-hidden="true"
              className="absolute bottom-0 right-1/3 w-60 h-60 rounded-full bg-[#ffe082]/30 blur-2xl pointer-events-none"
            ></div>

            <div className="relative z-10 flex flex-col gap-6">
              {/* Badges Cluster */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#81d4fa]/20 text-[#005d79] border border-[#81d4fa]/30 font-['Quicksand'] font-bold text-xs">
                  <span className="material-symbols-outlined text-[16px]">menu_book</span>
                  General English Track
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#ffe082]/30 text-[#725c06] border border-[#ffe082]/40 font-['Quicksand'] font-bold text-xs">
                  <span className="material-symbols-outlined text-[16px]">signal_cellular_alt</span>
                  Level: A1 Beginner to A2 Elementary
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#a5d6a7]/20 text-[#2e6830] border border-[#a5d6a7]/30 font-['Quicksand'] font-bold text-xs">
                  <span className="material-symbols-outlined text-[16px]">lock_open</span>
                  100% Free Public Curriculum
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#fff0f2] text-[#964261] border border-[#f5e4e7] font-['Quicksand'] font-bold text-xs">
                  <span className="material-symbols-outlined text-[14px] text-[#f48fb1]">bolt</span>
                  Zero-Friction Fastlane
                </span>
              </div>

              {/* Editorial Headline */}
              <div className="flex flex-col gap-2 max-w-4xl">
                <h1 className="font-['Quicksand'] font-bold text-[#22191b] leading-tight text-3xl sm:text-4xl">
                  Direct Access Authorized: Essential English Grammar Mastery
                </h1>
                <p className="text-[#534247] text-sm sm:text-base leading-relaxed">
                  Published open-access academic curriculum for ambitious learners. Zero enrollment fees, no payment verification required, and instant direct access into the learning environment.
                </p>
              </div>

              {/* Academic Architecture Bento Strip */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 bg-[#fff0f2] p-4 rounded-2xl border border-[#fbeaec]">
                <div className="flex flex-col">
                  <span className="font-['Quicksand'] font-bold uppercase tracking-wider text-[#534247] text-[10px]">
                    Track
                  </span>
                  <span className="font-['Quicksand'] font-bold text-[#22191b] text-xs sm:text-sm">
                    General English
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="font-['Quicksand'] font-bold uppercase tracking-wider text-[#534247] text-[10px]">
                    Course Tier
                  </span>
                  <span className="font-['Quicksand'] font-bold text-[#22191b] text-xs sm:text-sm">
                    Core Foundations
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="font-['Quicksand'] font-bold uppercase tracking-wider text-[#534247] text-[10px]">
                    Target Level
                  </span>
                  <span className="font-['Quicksand'] font-bold text-[#964261] text-xs sm:text-sm">
                    CEFR A1–A2
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="font-['Quicksand'] font-bold uppercase tracking-wider text-[#534247] text-[10px]">
                    Modules
                  </span>
                  <span className="font-['Quicksand'] font-bold text-[#22191b] text-xs sm:text-sm">
                    4 Structured
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="font-['Quicksand'] font-bold uppercase tracking-wider text-[#534247] text-[10px]">
                    Lessons
                  </span>
                  <span className="font-['Quicksand'] font-bold text-[#22191b] text-xs sm:text-sm">
                    24 Lectures
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="font-['Quicksand'] font-bold uppercase tracking-wider text-[#534247] text-[10px]">
                    Practice Units
                  </span>
                  <span className="font-['Quicksand'] font-bold text-[#006685] text-xs sm:text-sm">
                    48 Auto-Drills
                  </span>
                </div>
              </div>

              {/* Academic Policy Invariant Guard Box */}
              <div className="flex items-start gap-3 bg-[#fff8f8] p-4 rounded-2xl border border-[#f5e4e7]">
                <div className="w-10 h-10 rounded-full bg-[#a5d6a7]/20 text-[#2e6830] flex items-center justify-center shrink-0 shadow-2xs">
                  <span className="material-symbols-outlined text-[24px]">verified_user</span>
                </div>
                <div className="flex flex-col gap-1 text-[#22191b]">
                  <span className="font-['Quicksand'] font-bold text-sm">
                    Academic Open Access Guarantee
                  </span>
                  <p className="text-[#534247] text-xs sm:text-sm leading-relaxed">
                    This course is published under the Teacher Theint English open-access standard. Immediate entry is unlocked without commercial registration or ledger creation. Lecture progress, comprehension benchmarks, and auto-drill scores are preserved automatically to your browser session and linked student profile.
                  </p>
                </div>
              </div>

              {/* Action Buttons Cluster */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2 font-['Quicksand'] font-bold">
                <button
                  type="button"
                  onClick={handleLaunchLesson}
                  className="btn-tactile-primary px-6 py-3 rounded-full text-xs sm:text-sm cursor-pointer inline-flex items-center justify-center gap-2 group"
                >
                  <span className="material-symbols-outlined text-[20px] group-hover:rotate-12 transition-transform">
                    play_circle
                  </span>
                  <span>Launch Module 01: Foundations &amp; Lesson 1.1</span>
                  <span className="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform">
                    arrow_forward
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => onNavigateScreen('STU-COURSE-03-STRUCTURE')}
                  className="btn-tactile-secondary px-5 py-3 rounded-full text-xs font-bold cursor-pointer inline-flex items-center justify-center gap-1.5"
                >
                  <span className="material-symbols-outlined text-[18px]">account_tree</span>
                  <span>Explore Full Syllabus &amp; Modules</span>
                </button>

                <button
                  type="button"
                  onClick={() => onNavigateScreen('STU-LEARN-01')}
                  className="inline-flex items-center justify-center gap-1.5 px-5 py-3 rounded-full bg-white text-[#964261] hover:bg-[#fff0f2] transition-colors text-xs font-bold cursor-pointer border border-[#f5e4e7] shadow-2xs"
                >
                  <span className="material-symbols-outlined text-[18px]">dashboard</span>
                  <span>Open Learning Dashboard</span>
                </button>
              </div>
            </div>
          </section>

          {/* Two-Column Interactive Details */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left Column: Starting Unit Spotlight (8 Cols) */}
            <section className="lg:col-span-8 bg-white rounded-3xl shadow-[0_4px_20px_rgba(244,143,177,0.08)] p-6 sm:p-8 flex flex-col gap-6 border border-[#fbeaec]">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="w-9 h-9 rounded-full bg-[#f48fb1] text-white flex items-center justify-center font-bold font-['Quicksand'] text-xs shadow-xs">
                    01
                  </span>
                  <div>
                    <span className="font-['Quicksand'] font-bold uppercase tracking-widest text-[#534247] block text-[10px]">
                      Current Dispatch Unit
                    </span>
                    <h2 className="font-['Quicksand'] font-bold text-[#22191b] text-base sm:text-lg">
                      Module 01: Core Grammatical Foundations
                    </h2>
                  </div>
                </div>
                <span className="inline-flex items-center gap-1 font-['Quicksand'] font-bold text-xs px-3 py-1 rounded-full bg-[#fff0f2] text-[#964261] border border-[#f5e4e7]">
                  <span className="material-symbols-outlined text-[14px]">schedule</span> 14 Mins Lecture
                </span>
              </div>

              {/* Video & Lesson Preview Panel */}
              <div className="relative w-full rounded-2xl overflow-hidden bg-[#fff0f2] aspect-video max-h-80 flex items-center justify-center group border border-[#fbeaec]">
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                  style={{
                    backgroundImage:
                      "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAxnYhLwuUXMxwGYLy6n8RxJPTn8tnSUszU59g0XjNsJBQnk28zoP96OdjjIvKSdLT51SBtkqoJ6wg5ovZ2FeBrPhUTnizOaMNi8HtgaK4MBFtotGfqQA_P_qd14ERecDb34sJ5XzO3-ZZtrtZTD91pp9TECsKkGxdCBeJ60TpiXUPMPO9nPmLzj40tl6QLADRBqBZGO_Vs1fS-RVzPuFIQSxK6_TYc2_qgVzSZyZ4')",
                  }}
                ></div>
                <div className="absolute inset-0 bg-[#22191b]/45 backdrop-blur-[2px]"></div>

                <div className="relative z-10 flex flex-col items-center gap-3 text-center px-6">
                  <button
                    type="button"
                    onClick={handleLaunchLesson}
                    className="w-16 h-16 rounded-full bg-[#f48fb1] text-white flex items-center justify-center shadow-xl hover:scale-110 hover:bg-[#d87395] transition-all cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[36px] ml-1">play_arrow</span>
                  </button>
                  <div>
                    <span className="font-['Quicksand'] font-bold block drop-shadow-sm text-sm sm:text-base text-white">
                      Lesson 1.1 — Parts of Speech &amp; Categorization
                    </span>
                    <span className="text-xs text-white/80 font-medium">
                      First stream segment begins at timestamp 00:00
                    </span>
                  </div>
                </div>

                <div className="absolute bottom-3 left-3 px-3 py-1 rounded-full bg-white/95 backdrop-blur-md text-[#22191b] font-['Quicksand'] font-bold flex items-center gap-1.5 text-[11px] shadow-xs border border-[#f5e4e7]">
                  <span className="w-2 h-2 rounded-full bg-[#a5d6a7] animate-pulse"></span>
                  High Definition 1080p Public Stream Unlocked
                </div>
              </div>

              {/* Lesson Item Micro Breakdown */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                <div className="flex items-start gap-3 p-4 rounded-2xl bg-[#fff8f8] border border-[#f5e4e7]">
                  <span className="material-symbols-outlined text-[#f48fb1] text-[24px]">videocam</span>
                  <div className="flex flex-col">
                    <span className="font-['Quicksand'] font-bold text-[#22191b] text-xs sm:text-sm">
                      Video Concept Lecture
                    </span>
                    <p className="text-[#534247] text-xs mt-0.5">
                      High-yield conceptual walkthrough of nouns, verbs, auxiliaries, adjectives, and functional word order.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 rounded-2xl bg-[#fff8f8] border border-[#f5e4e7]">
                  <span className="material-symbols-outlined text-[#006685] text-[24px]">quiz</span>
                  <div className="flex flex-col">
                    <span className="font-['Quicksand'] font-bold text-[#22191b] text-xs sm:text-sm">
                      Instant Auto-Drill (15 Prompts)
                    </span>
                    <p className="text-[#534247] text-xs mt-0.5">
                      100% automated instantaneous evaluation with grammar rule cross-references. No manual queues.
                    </p>
                  </div>
                </div>
              </div>

              {/* Direct Lesson Step Link */}
              <div className="flex items-center justify-between pt-3 border-t border-[#fbeaec]">
                <span className="text-[#534247] text-xs">
                  No prerequisites required. Suitable for independent study.
                </span>
                <button
                  type="button"
                  onClick={handleLaunchLesson}
                  className="font-['Quicksand'] font-bold text-[#964261] hover:text-[#f48fb1] inline-flex items-center gap-1 text-xs cursor-pointer"
                >
                  <span>Jump straight to Lesson 1.1 video lecture</span>
                  <span className="material-symbols-outlined text-[16px]">chevron_right</span>
                </button>
              </div>
            </section>

            {/* Right Column: Invariants & Diagnostics Overview (4 Cols) */}
            <div className="lg:col-span-4 flex flex-col gap-5">
              {/* Auto-Grading & Progress Standard Card */}
              <div className="bg-white rounded-3xl shadow-[0_4px_20px_rgba(244,143,177,0.08)] p-6 flex flex-col gap-4 border border-[#fbeaec]">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#f48fb1] text-[22px]">speed</span>
                  <h3 className="font-['Quicksand'] font-bold text-[#22191b] text-sm sm:text-base">
                    Academic Invariants
                  </h3>
                </div>

                <div className="flex flex-col gap-3 text-xs">
                  <div className="flex items-start gap-2.5">
                    <span className="material-symbols-outlined text-[#2e6830] text-[18px] shrink-0 mt-0.5">
                      check_circle
                    </span>
                    <div className="flex flex-col">
                      <span className="font-['Quicksand'] font-bold text-[#22191b]">
                        Instant Browser Streaming
                      </span>
                      <p className="text-[#534247] text-[11px]">
                        Zero buffering gate. Access directly within web client without third-party plugins.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <span className="material-symbols-outlined text-[#2e6830] text-[18px] shrink-0 mt-0.5">
                      check_circle
                    </span>
                    <div className="flex flex-col">
                      <span className="font-['Quicksand'] font-bold text-[#22191b]">
                        100% Automated Feedback
                      </span>
                      <p className="text-[#534247] text-[11px]">
                        Immediate rule validation upon answering each diagnostic sentence prompt.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <span className="material-symbols-outlined text-[#2e6830] text-[18px] shrink-0 mt-0.5">
                      check_circle
                    </span>
                    <div className="flex flex-col">
                      <span className="font-['Quicksand'] font-bold text-[#22191b]">
                        No Financial Ledger Entry
                      </span>
                      <p className="text-[#534247] text-[11px]">
                        Zero payment verification, zero slips, no pending admin approval hold.
                      </p>
                    </div>
                  </div>
                </div>

                {/* SVG Ring Chart Benchmark */}
                <div className="bg-[#fff0f2] rounded-2xl p-4 flex items-center justify-between gap-3 mt-1 border border-[#fbeaec]">
                  <div className="flex flex-col font-['Quicksand']">
                    <span className="text-[#534247] uppercase text-[10px] font-bold">
                      Benchmark Target
                    </span>
                    <span className="font-bold text-[#964261] text-lg">
                      80% Pass
                    </span>
                    <span className="text-[#534247] text-[11px] font-medium font-['Nunito_Sans']">
                      Auto-unlocks Module 02
                    </span>
                  </div>

                  <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 36 36">
                    <path
                      className="text-[#f5e4e7]"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3.5"
                    ></path>
                    <path
                      className="text-[#f48fb1]"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="currentColor"
                      strokeDasharray="80, 100"
                      strokeLinecap="round"
                      strokeWidth="3.5"
                    ></path>
                    <text
                      className="text-[8px] font-bold fill-current text-[#22191b] font-['Quicksand'] text-anchor-middle"
                      textAnchor="middle"
                      transform="rotate(90 18 18)"
                      x="18"
                      y="20.5"
                    >
                      80%
                    </text>
                  </svg>
                </div>
              </div>

              {/* Course Roadmap Preview Mini-Card */}
              <div className="bg-white rounded-3xl shadow-[0_4px_20px_rgba(244,143,177,0.08)] p-6 flex flex-col gap-3 border border-[#fbeaec]">
                <h4 className="font-['Quicksand'] font-bold text-[#22191b] text-xs sm:text-sm">
                  Curriculum Flow
                </h4>
                <ol className="flex flex-col gap-2.5 text-xs">
                  <li className="flex items-center gap-2.5 font-['Quicksand'] font-bold text-[#964261]">
                    <span className="w-6 h-6 rounded-full bg-[#f48fb1] text-white text-[10px] font-bold flex items-center justify-center shadow-xs">
                      1
                    </span>
                    <span>Module 1: Parts of Speech (Open)</span>
                  </li>
                  <li className="flex items-center gap-2.5 text-[#534247] font-['Quicksand'] font-bold">
                    <span className="w-6 h-6 rounded-full bg-[#fff0f2] text-[#534247] text-[10px] font-bold flex items-center justify-center border border-[#fbeaec]">
                      2
                    </span>
                    <span>Module 2: Present &amp; Past Tenses</span>
                  </li>
                  <li className="flex items-center gap-2.5 text-[#534247] font-['Quicksand'] font-bold">
                    <span className="w-6 h-6 rounded-full bg-[#fff0f2] text-[#534247] text-[10px] font-bold flex items-center justify-center border border-[#fbeaec]">
                      3
                    </span>
                    <span>Module 3: Sentence Formulation</span>
                  </li>
                  <li className="flex items-center gap-2.5 text-[#534247] font-['Quicksand'] font-bold">
                    <span className="w-6 h-6 rounded-full bg-[#fff0f2] text-[#534247] text-[10px] font-bold flex items-center justify-center border border-[#fbeaec]">
                      4
                    </span>
                    <span>Module 4: Everyday Conversation Patterns</span>
                  </li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
