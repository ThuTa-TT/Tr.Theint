import React, { useState } from 'react';
import { ScreenId } from '../../../types/navigation';

interface LearningDashboardScreenProps {
  onNavigateScreen: (screenId: ScreenId) => void;
}

type QAState = 'default' | 'm1-expanded' | 'collapsed' | 'skeleton' | 'empty' | 'error';

export const LearningDashboardScreen: React.FC<LearningDashboardScreenProps> = ({
  onNavigateScreen,
}) => {
  const [qaState, setQaState] = useState<QAState>('default');
  const [expandedModules, setExpandedModules] = useState<Record<string, boolean>>({
    '01': true,
    '02': false,
    '03': false,
    '04': false,
  });
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const toggleModule = (id: string) => {
    setExpandedModules((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const expandAll = () => {
    setExpandedModules({ '01': true, '02': true, '03': true, '04': true });
    showToast('All syllabus modules expanded');
  };

  const collapseAll = () => {
    setExpandedModules({ '01': false, '02': false, '03': false, '04': false });
    showToast('All syllabus modules collapsed');
  };

  const handleStateChange = (state: QAState) => {
    setQaState(state);
    if (state === 'default' || state === 'm1-expanded') {
      setExpandedModules({ '01': true, '02': false, '03': false, '04': false });
    } else if (state === 'collapsed') {
      collapseAll();
    }
  };

  return (
    <div className="flex flex-col w-full space-y-6 font-['Nunito_Sans']">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-8 z-50 animate-bounce">
          <div className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-[#22191b] text-white shadow-2xl font-['Quicksand'] font-bold text-xs border border-[#f48fb1]/40">
            <span className="material-symbols-outlined text-[#81d4fa] text-[20px]">info</span>
            <span>{toastMessage}</span>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 1. TOP QA STATE PREVIEW BAR                                               */}
      {/* ========================================================================= */}
      <aside
        aria-label="QA Testing Bar"
        className="w-full bg-white rounded-2xl p-3.5 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-3 border border-[#fbeaec]"
      >
        <div className="flex items-center gap-2.5 font-['Quicksand'] font-bold">
          <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-[#f48fb1] text-white text-[10px] font-bold shadow-2xs">
            QA
          </span>
          <span className="uppercase tracking-wider text-[#534247] text-xs">
            STU-LEARN-01 Canonical Inspection Control
          </span>
        </div>

        <div aria-label="Testing state switchers" className="flex flex-wrap items-center gap-1.5 font-['Quicksand'] font-bold" role="toolbar">
          <button
            type="button"
            onClick={() => handleStateChange('default')}
            className={`px-3 py-1.5 rounded-full text-xs transition-colors cursor-pointer ${
              qaState === 'default'
                ? 'bg-[#f48fb1] text-white shadow-2xs font-bold'
                : 'bg-[#fff8f8] text-[#534247] hover:bg-[#fff0f2] border border-[#f5e4e7]'
            }`}
          >
            1. Resume Active
          </button>
          <button
            type="button"
            onClick={() => handleStateChange('m1-expanded')}
            className={`px-3 py-1.5 rounded-full text-xs transition-colors cursor-pointer ${
              qaState === 'm1-expanded'
                ? 'bg-[#f48fb1] text-white shadow-2xs font-bold'
                : 'bg-[#fff8f8] text-[#534247] hover:bg-[#fff0f2] border border-[#f5e4e7]'
            }`}
          >
            2. Mod 01 Open
          </button>
          <button
            type="button"
            onClick={() => handleStateChange('collapsed')}
            className={`px-3 py-1.5 rounded-full text-xs transition-colors cursor-pointer ${
              qaState === 'collapsed'
                ? 'bg-[#f48fb1] text-white shadow-2xs font-bold'
                : 'bg-[#fff8f8] text-[#534247] hover:bg-[#fff0f2] border border-[#f5e4e7]'
            }`}
          >
            3. All Collapsed
          </button>
          <button
            type="button"
            onClick={() => handleStateChange('skeleton')}
            className={`px-3 py-1.5 rounded-full text-xs transition-colors cursor-pointer ${
              qaState === 'skeleton'
                ? 'bg-[#f48fb1] text-white shadow-2xs font-bold'
                : 'bg-[#fff8f8] text-[#534247] hover:bg-[#fff0f2] border border-[#f5e4e7]'
            }`}
          >
            4. Skeleton
          </button>
          <button
            type="button"
            onClick={() => handleStateChange('empty')}
            className={`px-3 py-1.5 rounded-full text-xs transition-colors cursor-pointer ${
              qaState === 'empty'
                ? 'bg-[#f48fb1] text-white shadow-2xs font-bold'
                : 'bg-[#fff8f8] text-[#534247] hover:bg-[#fff0f2] border border-[#f5e4e7]'
            }`}
          >
            5. Empty
          </button>
          <button
            type="button"
            onClick={() => handleStateChange('error')}
            className={`px-3 py-1.5 rounded-full text-xs transition-colors cursor-pointer ${
              qaState === 'error'
                ? 'bg-[#f48fb1] text-white shadow-2xs font-bold'
                : 'bg-[#fff8f8] text-[#534247] hover:bg-[#fff0f2] border border-[#f5e4e7]'
            }`}
          >
            6. Not Found
          </button>
        </div>
      </aside>

      {/* ========================================================================= */}
      {/* 2. COURSE CONTEXT & BREADCRUMBS                                           */}
      {/* ========================================================================= */}
      <section className="flex flex-col gap-3 bg-[#fff0f2] p-4 rounded-2xl border border-[#fbeaec]">
        <div className="flex flex-wrap items-center justify-between gap-4 font-['Quicksand'] font-bold text-xs">
          <nav aria-label="Breadcrumbs" className="flex flex-wrap items-center gap-2 text-[#534247]">
            <button
              type="button"
              onClick={() => onNavigateScreen('PUB-02-COURSES')}
              className="hover:text-[#f48fb1] transition-colors cursor-pointer"
            >
              My Courses
            </button>
            <span className="text-[#d8c1c6]">/</span>
            <span className="text-[#006685]">General English Track</span>
            <span className="text-[#d8c1c6]">/</span>
            <button
              type="button"
              onClick={() => onNavigateScreen('PUB-03-COURSE-DETAIL')}
              className="text-[#22191b] font-bold truncate max-w-xs md:max-w-md hover:text-[#f48fb1] transition-colors cursor-pointer"
            >
              Essential English Grammar Mastery
            </button>
            <span className="text-[#d8c1c6]">/</span>
            <span className="text-[#964261] font-bold">Learning Dashboard</span>
          </nav>

          <button
            type="button"
            onClick={() => onNavigateScreen('STU-FREE-01')}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white text-[#964261] hover:bg-[#fff8f8] border border-[#f5e4e7] transition-colors font-bold text-xs cursor-pointer shadow-2xs"
          >
            <span className="material-symbols-outlined text-[16px]">arrow_back</span>
            <span>Back to Direct Access Gateway</span>
          </button>
        </div>

        {/* Status Badges Bar */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-[#fbeaec] font-['Quicksand'] font-bold text-xs">
          <span className="px-3 py-1 rounded-full bg-white text-[#006685] border border-[#81d4fa]/30">
            Track: General English
          </span>
          <span className="px-3 py-1 rounded-full bg-[#ffe082]/30 text-[#725c06] border border-[#ffe082]/40">
            CEFR A1–A2 (Foundational)
          </span>
          <span className="px-3 py-1 rounded-full bg-[#a5d6a7]/20 text-[#2e6830] border border-[#a5d6a7]/30 flex items-center gap-1">
            <span className="material-symbols-outlined text-[14px]">lock_open</span>
            100% Free Open-Access
          </span>
          <span className="px-3 py-1 rounded-full bg-[#fff8f8] text-[#964261] border border-[#f5e4e7] flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#f48fb1] animate-pulse"></span>
            Syllabus Status: Published
          </span>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* ERROR STATE CONTAINER (Shown via QA)                                      */}
      {/* ========================================================================= */}
      {qaState === 'error' && (
        <div className="w-full p-12 bg-white rounded-3xl shadow-[0_4px_20px_rgba(244,143,177,0.08)] text-center flex flex-col items-center justify-center my-6 border border-[#fbeaec]" id="state-error">
          <div className="w-14 h-14 rounded-full bg-[#ffdad6] text-[#ba1a1a] flex items-center justify-center mb-4">
            <span className="material-symbols-outlined text-3xl">error_outline</span>
          </div>
          <h3 className="font-['Quicksand'] font-bold text-[#22191b] mb-2 text-2xl">
            Curriculum Resource Not Found
          </h3>
          <p className="text-[#534247] max-w-md mx-auto mb-6 text-sm">
            The requested course routing identifier does not correspond to an active published syllabus. Check your offline cache or track assignment.
          </p>
          <button
            type="button"
            onClick={() => handleStateChange('default')}
            className="btn-tactile-primary px-6 py-2.5 rounded-full text-xs font-['Quicksand'] font-bold cursor-pointer"
          >
            Return to Active Dashboard
          </button>
        </div>
      )}

      {/* ========================================================================= */}
      {/* EMPTY STATE CONTAINER (Shown via QA)                                      */}
      {/* ========================================================================= */}
      {qaState === 'empty' && (
        <div className="w-full p-12 bg-white rounded-3xl shadow-[0_4px_20px_rgba(244,143,177,0.08)] text-center flex flex-col items-center justify-center my-6 border border-[#fbeaec]" id="state-empty">
          <div className="w-14 h-14 rounded-full bg-[#fff0f2] text-[#f48fb1] flex items-center justify-center mb-4">
            <span className="material-symbols-outlined text-3xl">menu_book</span>
          </div>
          <h3 className="font-['Quicksand'] font-bold text-[#22191b] mb-2 text-2xl">
            Curriculum Under Preparation
          </h3>
          <p className="text-[#534247] max-w-md mx-auto mb-6 text-sm">
            Modules for this sequence are currently being synced with the open-access academic server. No learning items registered in this slice.
          </p>
          <button
            type="button"
            onClick={() => handleStateChange('default')}
            className="btn-tactile-primary px-6 py-2.5 rounded-full text-xs font-['Quicksand'] font-bold cursor-pointer"
          >
            Reload Course Index
          </button>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SKELETON STATE CONTAINER (Shown via QA)                                   */}
      {/* ========================================================================= */}
      {qaState === 'skeleton' && (
        <div className="w-full space-y-8 animate-pulse my-4" id="state-skeleton">
          <div className="h-44 bg-white rounded-3xl w-full border border-[#fbeaec]"></div>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8 space-y-4">
              <div className="h-10 bg-white rounded-2xl w-1/3 border border-[#fbeaec]"></div>
              <div className="h-28 bg-white rounded-3xl w-full border border-[#fbeaec]"></div>
              <div className="h-28 bg-white rounded-3xl w-full border border-[#fbeaec]"></div>
              <div className="h-28 bg-white rounded-3xl w-full border border-[#fbeaec]"></div>
            </div>
            <div className="lg:col-span-4 space-y-4">
              <div className="h-48 bg-white rounded-3xl w-full border border-[#fbeaec]"></div>
              <div className="h-40 bg-white rounded-3xl w-full border border-[#fbeaec]"></div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MAIN OPERATIONAL VIEW                                                     */}
      {/* ========================================================================= */}
      {qaState !== 'error' && qaState !== 'empty' && qaState !== 'skeleton' && (
        <div className="flex flex-col w-full gap-8" id="state-normal">
          {/* 3. ACTIVE LEARNING HERO / RESUME BANNER */}
          <section className="relative overflow-hidden rounded-3xl bg-white p-6 md:p-8 shadow-[0_4px_20px_rgba(244,143,177,0.1)] border border-[#fbeaec]">
            <div className="absolute -right-8 -bottom-8 w-64 h-64 rounded-full bg-[#81d4fa]/20 blur-2xl pointer-events-none"></div>

            <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div className="space-y-3 max-w-2xl">
                <div className="flex items-center gap-2 font-['Quicksand'] font-bold text-xs">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#f48fb1] animate-ping"></span>
                  <span className="uppercase tracking-wider text-[#964261]">
                    Current Learning Position: Module 01
                  </span>
                  <span className="text-[#d8c1c6]">/</span>
                  <span className="text-[#006685]">Foundations</span>
                </div>

                <h1 className="font-['Quicksand'] font-bold text-[#22191b] leading-tight text-2xl sm:text-3xl">
                  Lesson 1.1 — Parts of Speech &amp; Categorization
                </h1>

                <div className="flex flex-wrap items-center gap-4 text-[#534247] text-xs">
                  <span className="inline-flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[18px] text-[#f48fb1]">play_circle</span>
                    14 Mins Lecture
                  </span>
                  <span className="text-[#d8c1c6]">•</span>
                  <span className="inline-flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[18px] text-[#006685]">fact_check</span>
                    15 Item Instant Auto-Drill
                  </span>
                  <span className="text-[#d8c1c6]">•</span>
                  <span className="inline-flex items-center gap-1.5 text-[#2e6830] font-['Quicksand'] font-bold">
                    <span className="material-symbols-outlined text-[16px]">verified</span>
                    Status: Ready to Launch
                  </span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row lg:flex-col gap-3 min-w-[240px] font-['Quicksand'] font-bold">
                <button
                  type="button"
                  onClick={() => onNavigateScreen('STU-LESSON-01')}
                  className="btn-tactile-primary px-6 py-3.5 rounded-full flex items-center justify-center gap-2 text-center group text-xs cursor-pointer"
                >
                  <span>Continue Learning: Launch Lesson 1.1</span>
                  <span className="material-symbols-outlined text-[18px] transition-transform group-hover:translate-x-1">
                    arrow_forward
                  </span>
                </button>

                <div className="flex items-center justify-between gap-2">
                  <button
                    type="button"
                    onClick={() => showToast('Downloading Lecture 1.1 Reference PDF...')}
                    className="flex-1 px-3 py-2 rounded-full bg-[#fff8f8] text-[#22191b] hover:bg-[#fff0f2] hover:text-[#964261] transition-colors shadow-2xs text-center truncate text-xs cursor-pointer border border-[#f5e4e7]"
                  >
                    Notes (PDF)
                  </button>
                  <a
                    href="#syllabus-container"
                    className="flex-1 px-3 py-2 rounded-full bg-[#fff8f8] text-[#534247] hover:bg-[#fff0f2] hover:text-[#22191b] transition-colors shadow-2xs text-center truncate text-xs border border-[#f5e4e7]"
                  >
                    Syllabus Index
                  </a>
                </div>
              </div>
            </div>

            {/* Quick Progress Pill Tracker */}
            <div className="mt-6 pt-4 border-t border-[#fbeaec] flex flex-col sm:flex-row sm:items-center justify-between gap-3 font-['Quicksand'] font-bold text-xs text-[#534247]">
              <div className="flex items-center gap-3">
                <div className="w-36 h-2 rounded-full bg-[#fff0f2] overflow-hidden border border-[#fbeaec]">
                  <div className="w-[8%] h-full bg-[#f48fb1] rounded-full"></div>
                </div>
                <span>
                  Overall Course Progress: <strong className="text-[#22191b]">1 of 24 Lessons Initiated</strong>
                </span>
              </div>
              <span className="text-[#725c06]">Decoupled from payment • Free Open-Access</span>
            </div>
          </section>

          {/* 4. TWO-COLUMN DASHBOARD WORKSPACE */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start" id="syllabus-container">
            {/* LEFT MAIN COLUMN: SYLLABUS & CURRICULUM NAVIGATION */}
            <main className="lg:col-span-8 flex flex-col gap-6">
              {/* Syllabus Header with Controls */}
              <div className="flex flex-wrap items-center justify-between gap-4 bg-white p-5 rounded-3xl shadow-[0_4px_16px_rgba(244,143,177,0.06)] border border-[#fbeaec]">
                <div>
                  <h2 className="font-['Quicksand'] font-bold text-[#22191b] text-base sm:text-lg">
                    Course Modules &amp; Learning Sequence
                  </h2>
                  <p className="text-[#534247] text-xs">
                    Structured sequence covering 4 core modules and 24 auto-assessed units.
                  </p>
                </div>
                <div className="inline-flex items-center gap-2 font-['Quicksand'] font-bold">
                  <button
                    type="button"
                    onClick={expandAll}
                    className="px-4 py-1.5 rounded-full bg-[#fff8f8] text-[#534247] hover:bg-[#fff0f2] hover:text-[#964261] border border-[#f5e4e7] transition-colors text-xs cursor-pointer"
                  >
                    Expand All
                  </button>
                  <button
                    type="button"
                    onClick={collapseAll}
                    className="px-4 py-1.5 rounded-full bg-[#fff8f8] text-[#534247] hover:bg-[#fff0f2] hover:text-[#964261] border border-[#f5e4e7] transition-colors text-xs cursor-pointer"
                  >
                    Collapse All
                  </button>
                </div>
              </div>

              {/* MODULE 01 */}
              <div className="bg-white rounded-3xl shadow-[0_4px_20px_rgba(244,143,177,0.08)] overflow-hidden transition-all duration-200 border border-[#fbeaec]">
                <button
                  type="button"
                  onClick={() => toggleModule('01')}
                  className="w-full p-5 text-left bg-[#fff0f2]/70 hover:bg-[#fff0f2] transition-colors flex items-center justify-between gap-4 cursor-pointer"
                >
                  <div className="flex items-start gap-4">
                    <span className="w-10 h-10 rounded-2xl bg-[#f48fb1] text-white font-['Quicksand'] font-bold flex items-center justify-center shrink-0 text-sm shadow-xs">
                      01
                    </span>
                    <div>
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <span className="font-['Quicksand'] font-bold text-[10px] px-2.5 py-0.5 rounded-full bg-white text-[#964261] border border-[#f5e4e7] uppercase tracking-wider shadow-2xs">
                          Active Module
                        </span>
                        <span className="font-['Quicksand'] font-bold text-[#534247] text-xs">
                          Foundational CEFR A1
                        </span>
                      </div>
                      <h3 className="font-['Quicksand'] font-bold text-[#22191b] text-base">
                        Core Grammatical Foundations
                      </h3>
                      <p className="text-[#534247] mt-0.5 text-xs">
                        6 Lessons • 6 Auto-Drills • Approx. 95 min total runtime
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 shrink-0 font-['Quicksand'] font-bold">
                    <span className="text-[#964261] hidden sm:inline text-xs">
                      In Progress
                    </span>
                    <span
                      className={`material-symbols-outlined text-[#534247] transform transition-transform duration-200 ${
                        expandedModules['01'] ? 'rotate-180 text-[#f48fb1]' : 'rotate-0'
                      }`}
                    >
                      expand_more
                    </span>
                  </div>
                </button>

                {expandedModules['01'] && (
                  <div className="p-5 sm:p-6 flex flex-col gap-3 border-t border-[#fbeaec]">
                    {/* Lesson 1.1 (ACTIVE) */}
                    <div className="p-4 rounded-2xl bg-[#fff0f2]/80 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4 border border-[#f48fb1]/40">
                      <div className="space-y-1.5">
                        <div className="flex items-center gap-2 font-['Quicksand'] font-bold">
                          <span className="px-2.5 py-0.5 rounded-full text-[10px] bg-[#f48fb1] text-white uppercase tracking-wide shadow-2xs">
                            Next to Learn
                          </span>
                          <span className="text-[#964261] text-xs">
                            Lesson 1.1
                          </span>
                        </div>
                        <h4 className="font-['Quicksand'] font-bold text-[#22191b] text-sm sm:text-base">
                          Parts of Speech &amp; Categorization
                        </h4>
                        <div className="flex flex-wrap items-center gap-3 text-[#534247] text-xs">
                          <span className="flex items-center gap-1">
                            <span className="material-symbols-outlined text-[15px] text-[#f48fb1]">play_circle</span>{' '}
                            Video Lecture (14 mins)
                          </span>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            <span className="material-symbols-outlined text-[15px] text-[#006685]">assignment</span>{' '}
                            Auto-Drill (15 prompts)
                          </span>
                          <span className="px-2.5 py-0.5 rounded-full bg-white text-[#2e6830] font-['Quicksand'] font-bold text-[10px] border border-[#a5d6a7]/40">
                            100% Auto-Graded
                          </span>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => onNavigateScreen('STU-LESSON-01')}
                        className="btn-tactile-primary px-5 py-2.5 rounded-full font-['Quicksand'] font-bold shrink-0 flex items-center justify-center gap-1.5 text-xs cursor-pointer"
                      >
                        <span>Start Lesson</span>
                        <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                      </button>
                    </div>

                    {/* Lesson 1.2 */}
                    <div className="p-4 rounded-2xl bg-[#fff8f8] hover:bg-[#fff0f2] transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4 border border-[#f5e4e7]">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 font-['Quicksand'] font-bold">
                          <span className="text-[#725c06] text-xs">
                            Lesson 1.2
                          </span>
                          <span className="text-[#d8c1c6]">•</span>
                          <span className="text-[#534247] text-xs">
                            Ready
                          </span>
                        </div>
                        <h4 className="font-['Quicksand'] font-bold text-[#22191b] text-sm sm:text-base">
                          Present Simple vs Present Continuous
                        </h4>
                        <div className="flex flex-wrap items-center gap-3 text-[#534247] text-xs">
                          <span>Video Lecture (18 mins)</span>
                          <span>•</span>
                          <span>Auto-Drill: Stative vs Dynamic Verbs (12 items)</span>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => onNavigateScreen('STU-LESSON-01')}
                        className="px-4 py-2 rounded-full bg-white text-[#22191b] font-['Quicksand'] font-bold hover:bg-[#fff0f2] hover:text-[#964261] border border-[#f5e4e7] transition-colors shrink-0 text-xs cursor-pointer shadow-2xs"
                      >
                        Open Unit
                      </button>
                    </div>

                    {/* Lesson 1.3 */}
                    <div className="p-4 rounded-2xl bg-[#fff8f8] hover:bg-[#fff0f2] transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4 border border-[#f5e4e7]">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 font-['Quicksand'] font-bold">
                          <span className="text-[#725c06] text-xs">
                            Lesson 1.3
                          </span>
                          <span className="text-[#d8c1c6]">•</span>
                          <span className="text-[#534247] text-xs">
                            Ready
                          </span>
                        </div>
                        <h4 className="font-['Quicksand'] font-bold text-[#22191b] text-sm sm:text-base">
                          Subject-Verb Agreement &amp; Irregular Verbs
                        </h4>
                        <div className="flex flex-wrap items-center gap-3 text-[#534247] text-xs">
                          <span>Video Lecture (20 mins)</span>
                          <span>•</span>
                          <span>Auto-Drill: Agreement Diagnostics (15 items)</span>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => onNavigateScreen('STU-LESSON-01')}
                        className="px-4 py-2 rounded-full bg-white text-[#22191b] font-['Quicksand'] font-bold hover:bg-[#fff0f2] hover:text-[#964261] border border-[#f5e4e7] transition-colors shrink-0 text-xs cursor-pointer shadow-2xs"
                      >
                        Open Unit
                      </button>
                    </div>

                    {/* Lesson 1.6 Checkpoint */}
                    <div className="p-4 rounded-2xl bg-[#81d4fa]/15 hover:bg-[#81d4fa]/25 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4 border border-[#81d4fa]/30">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 font-['Quicksand'] font-bold">
                          <span className="px-2.5 py-0.5 rounded-full text-[10px] bg-[#006685] text-white uppercase tracking-wide">
                            Synthesis Checkpoint
                          </span>
                          <span className="text-[#006685] text-xs">
                            Lesson 1.6
                          </span>
                        </div>
                        <h4 className="font-['Quicksand'] font-bold text-[#22191b] text-sm sm:text-base">
                          Module 1 Synthesis &amp; Comprehensive Diagnostic
                        </h4>
                        <div className="flex flex-wrap items-center gap-3 text-[#534247] text-xs">
                          <span>Synthesis Review (12 mins)</span>
                          <span>•</span>
                          <span>Unit Drill (30 questions)</span>
                          <span className="px-2.5 py-0.5 rounded-full bg-white text-[#964261] font-['Quicksand'] font-bold text-[10px] border border-[#f5e4e7]">
                            Benchmark: 80%
                          </span>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => onNavigateScreen('STU-EX-01')}
                        className="px-4 py-2 rounded-full bg-white text-[#006685] font-['Quicksand'] font-bold hover:bg-[#81d4fa]/20 transition-colors shrink-0 text-xs cursor-pointer border border-[#81d4fa]/40 shadow-2xs"
                      >
                        Review Checkpoint
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* MODULE 02 */}
              <div className="bg-white rounded-3xl shadow-[0_4px_20px_rgba(244,143,177,0.08)] overflow-hidden transition-all duration-200 border border-[#fbeaec]">
                <button
                  type="button"
                  onClick={() => toggleModule('02')}
                  className="w-full p-5 text-left bg-white hover:bg-[#fff0f2] transition-colors flex items-center justify-between gap-4 cursor-pointer"
                >
                  <div className="flex items-start gap-4">
                    <span className="w-10 h-10 rounded-2xl bg-[#fff0f2] text-[#534247] font-['Quicksand'] font-bold flex items-center justify-center shrink-0 text-sm border border-[#fbeaec]">
                      02
                    </span>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-['Quicksand'] font-bold text-[#534247] text-xs">
                          Pre-Intermediate CEFR A2
                        </span>
                      </div>
                      <h3 className="font-['Quicksand'] font-bold text-[#22191b] text-base">
                        Tense Systems &amp; Narrative Structures
                      </h3>
                      <p className="text-[#534247] mt-0.5 text-xs">
                        6 Lessons • 6 Auto-Drills • Approx. 110 min runtime
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 shrink-0 font-['Quicksand'] font-bold">
                    <span className="text-[#534247] hidden sm:inline text-xs">
                      Available
                    </span>
                    <span
                      className={`material-symbols-outlined text-[#534247] transition-transform duration-200 ${
                        expandedModules['02'] ? 'rotate-180 text-[#f48fb1]' : 'rotate-0'
                      }`}
                    >
                      expand_more
                    </span>
                  </div>
                </button>

                {expandedModules['02'] && (
                  <div className="p-5 flex flex-col gap-3 bg-[#fff8f8] border-t border-[#fbeaec]">
                    <div className="p-4 bg-white rounded-2xl shadow-2xs border border-[#fbeaec] flex items-center justify-between">
                      <div>
                        <p className="font-['Quicksand'] font-bold text-[#725c06] text-xs">Lesson 2.1</p>
                        <p className="font-['Quicksand'] font-bold text-[#22191b] text-xs sm:text-sm">
                          Past Simple vs Past Continuous in Narratives
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => onNavigateScreen('STU-LESSON-01')}
                        className="px-4 py-1.5 rounded-full bg-[#fff0f2] text-[#964261] font-['Quicksand'] font-bold hover:bg-[#fbeaec] text-xs cursor-pointer border border-[#fbeaec]"
                      >
                        Inspect
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* MODULE 03 */}
              <div className="bg-white rounded-3xl shadow-[0_4px_20px_rgba(244,143,177,0.08)] overflow-hidden transition-all duration-200 border border-[#fbeaec]">
                <button
                  type="button"
                  onClick={() => toggleModule('03')}
                  className="w-full p-5 text-left bg-white hover:bg-[#fff0f2] transition-colors flex items-center justify-between gap-4 cursor-pointer"
                >
                  <div className="flex items-start gap-4">
                    <span className="w-10 h-10 rounded-2xl bg-[#fff0f2] text-[#534247] font-['Quicksand'] font-bold flex items-center justify-center shrink-0 text-sm border border-[#fbeaec]">
                      03
                    </span>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-['Quicksand'] font-bold text-[#534247] text-xs">
                          Core CEFR A2
                        </span>
                      </div>
                      <h3 className="font-['Quicksand'] font-bold text-[#22191b] text-base">
                        Modal Verbs &amp; Question Formations
                      </h3>
                      <p className="text-[#534247] mt-0.5 text-xs">
                        6 Lessons • 6 Auto-Drills • Approx. 90 min runtime
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 shrink-0 font-['Quicksand'] font-bold">
                    <span className="text-[#534247] hidden sm:inline text-xs">
                      Available
                    </span>
                    <span
                      className={`material-symbols-outlined text-[#534247] transition-transform duration-200 ${
                        expandedModules['03'] ? 'rotate-180 text-[#f48fb1]' : 'rotate-0'
                      }`}
                    >
                      expand_more
                    </span>
                  </div>
                </button>
              </div>

              {/* MODULE 04 */}
              <div className="bg-white rounded-3xl shadow-[0_4px_20px_rgba(244,143,177,0.08)] overflow-hidden transition-all duration-200 border border-[#fbeaec]">
                <button
                  type="button"
                  onClick={() => toggleModule('04')}
                  className="w-full p-5 text-left bg-white hover:bg-[#fff0f2] transition-colors flex items-center justify-between gap-4 cursor-pointer"
                >
                  <div className="flex items-start gap-4">
                    <span className="w-10 h-10 rounded-2xl bg-[#fff0f2] text-[#534247] font-['Quicksand'] font-bold flex items-center justify-center shrink-0 text-sm border border-[#fbeaec]">
                      04
                    </span>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-['Quicksand'] font-bold text-[#534247] text-xs">
                          Bridging CEFR A2+
                        </span>
                      </div>
                      <h3 className="font-['Quicksand'] font-bold text-[#22191b] text-base">
                        Compound Sentence Construction &amp; Cohesion
                      </h3>
                      <p className="text-[#534247] mt-0.5 text-xs">
                        6 Lessons • 6 Auto-Drills • Approx. 105 min runtime
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 shrink-0 font-['Quicksand'] font-bold">
                    <span className="text-[#534247] hidden sm:inline text-xs">
                      Available
                    </span>
                    <span
                      className={`material-symbols-outlined text-[#534247] transition-transform duration-200 ${
                        expandedModules['04'] ? 'rotate-180 text-[#f48fb1]' : 'rotate-0'
                      }`}
                    >
                      expand_more
                    </span>
                  </div>
                </button>
              </div>
            </main>

            {/* RIGHT COLUMN: METADATA & INVARIANTS */}
            <aside aria-label="Course Metadata and Invariants" className="lg:col-span-4 flex flex-col gap-6">
              {/* CARD 1: Academic Learning Invariants */}
              <section className="bg-white rounded-3xl p-6 shadow-[0_4px_20px_rgba(244,143,177,0.08)] border border-[#fbeaec]">
                <div className="flex items-center gap-2 mb-4">
                  <span className="material-symbols-outlined text-[#f48fb1] text-[22px]">policy</span>
                  <h3 className="font-['Quicksand'] font-bold text-[#22191b] text-sm sm:text-base">
                    Academic Invariants
                  </h3>
                </div>
                <div className="space-y-4 text-xs">
                  <div className="flex items-start gap-3">
                    <span className="w-7 h-7 rounded-full bg-[#a5d6a7]/20 text-[#2e6830] flex items-center justify-center shrink-0 mt-0.5">
                      <span className="material-symbols-outlined text-[15px]">check</span>
                    </span>
                    <div>
                      <h4 className="font-['Quicksand'] font-bold text-[#22191b]">
                        Zero Financial Enrollment
                      </h4>
                      <p className="text-[#534247] text-[11px] leading-relaxed mt-0.5">
                        Open-access academic standard. Zero payment slip verification, zero checkout gates, or administrative holding periods.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <span className="w-7 h-7 rounded-full bg-[#81d4fa]/20 text-[#006685] flex items-center justify-center shrink-0 mt-0.5">
                      <span className="material-symbols-outlined text-[15px]">bolt</span>
                    </span>
                    <div>
                      <h4 className="font-['Quicksand'] font-bold text-[#22191b]">
                        100% Instant Auto-Graded
                      </h4>
                      <p className="text-[#534247] text-[11px] leading-relaxed mt-0.5">
                        Standard auto-drills evaluate instantaneously via client-deterministic keys. No delayed manual grading queues.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <span className="w-7 h-7 rounded-full bg-[#ffe082]/30 text-[#725c06] flex items-center justify-center shrink-0 mt-0.5">
                      <span className="material-symbols-outlined text-[15px]">sync</span>
                    </span>
                    <div>
                      <h4 className="font-['Quicksand'] font-bold text-[#22191b]">
                        Progress Decoupled from Access
                      </h4>
                      <p className="text-[#534247] text-[11px] leading-relaxed mt-0.5">
                        Learning position and diagnostics are tracked locally and independently from any commercial membership.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* CARD 2: Pedagogical Hierarchy Representation */}
              <section className="bg-white rounded-3xl p-6 shadow-[0_4px_20px_rgba(244,143,177,0.08)] border border-[#fbeaec]">
                <div className="flex items-center gap-2 mb-4">
                  <span className="material-symbols-outlined text-[#006685] text-[22px]">account_tree</span>
                  <h3 className="font-['Quicksand'] font-bold text-[#22191b] text-sm sm:text-base">
                    Curriculum Structure
                  </h3>
                </div>
                <p className="text-[#534247] mb-3 text-xs">
                  Level positioning is strictly enclosed within Course architecture:
                </p>
                <div className="bg-[#fff0f2] p-4 rounded-2xl space-y-2.5 font-['Quicksand'] font-bold text-xs border border-[#fbeaec]">
                  <div className="flex items-center gap-2 text-[#22191b]">
                    <span className="w-2 h-2 rounded-full bg-[#f48fb1]"></span>
                    Track: General English
                  </div>
                  <div className="pl-4 border-l-2 border-[#f48fb1]/40 flex items-center gap-2 text-[#22191b]">
                    <span className="material-symbols-outlined text-[14px] text-[#f48fb1]">subdirectory_arrow_right</span>
                    Course: Essential English Grammar Mastery
                  </div>
                  <div className="pl-8 border-l-2 border-[#81d4fa]/50 flex items-center gap-2 text-[#006685]">
                    <span className="material-symbols-outlined text-[14px]">subdirectory_arrow_right</span>
                    Level: CEFR A1 Beginner – A2 Elementary
                  </div>
                  <div className="pl-12 border-l-2 border-[#a5d6a7]/60 flex items-center gap-2 text-[#534247]">
                    <span className="material-symbols-outlined text-[14px] text-[#a5d6a7]">subdirectory_arrow_right</span>
                    4 Modules (24 Lessons • 48 Drill Units)
                  </div>
                </div>
                <div className="mt-4 pt-3 border-t border-[#fbeaec] flex items-center justify-between text-[#534247] font-['Quicksand'] font-bold text-xs">
                  <span>Syllabus Version</span>
                  <span className="font-mono text-[#22191b]">v2.4 (2025 Standard)</span>
                </div>
              </section>

              {/* CARD 3: Learning Support & Integrity */}
              <section className="bg-white rounded-3xl p-6 shadow-[0_4px_20px_rgba(244,143,177,0.08)] border border-[#fbeaec]">
                <div className="flex items-center gap-2 mb-3">
                  <span className="material-symbols-outlined text-[#725c06] text-[22px]">support_agent</span>
                  <h3 className="font-['Quicksand'] font-bold text-[#22191b] text-sm sm:text-base">
                    Learning Integrity &amp; Tools
                  </h3>
                </div>
                <p className="text-[#534247] mb-3 text-xs">
                  Curriculum tools designed for autonomous study:
                </p>
                <ul className="space-y-2 text-xs font-['Quicksand'] font-bold">
                  <li>
                    <button
                      type="button"
                      onClick={() => showToast('Loading Grammar Discussion Forum Guidelines...')}
                      className="text-left w-full flex items-center justify-between text-[#22191b] hover:text-[#f48fb1] transition-colors cursor-pointer p-2.5 rounded-2xl hover:bg-[#fff0f2]"
                    >
                      <span className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-[18px] text-[#f48fb1]">forum</span>
                        Discussion Guidelines
                      </span>
                      <span className="material-symbols-outlined text-[16px] text-[#d8c1c6]">chevron_right</span>
                    </button>
                  </li>
                  <li>
                    <button
                      type="button"
                      onClick={() => showToast('Syncing offline vocabulary flashcards...')}
                      className="text-left w-full flex items-center justify-between text-[#22191b] hover:text-[#f48fb1] transition-colors cursor-pointer p-2.5 rounded-2xl hover:bg-[#fff0f2]"
                    >
                      <span className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-[18px] text-[#006685]">style</span>
                        Unit Flashcard Decks
                      </span>
                      <span className="material-symbols-outlined text-[16px] text-[#d8c1c6]">chevron_right</span>
                    </button>
                  </li>
                  <li>
                    <button
                      type="button"
                      onClick={() => showToast('Local browser storage cache refreshed.')}
                      className="text-left w-full flex items-center justify-between text-[#22191b] hover:text-[#f48fb1] transition-colors cursor-pointer p-2.5 rounded-2xl hover:bg-[#fff0f2]"
                    >
                      <span className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-[18px] text-[#725c06]">cleaning_services</span>
                        Recover Local Progress Cache
                      </span>
                      <span className="material-symbols-outlined text-[16px] text-[#d8c1c6]">chevron_right</span>
                    </button>
                  </li>
                </ul>
              </section>
            </aside>
          </div>
        </div>
      )}
    </div>
  );
};
