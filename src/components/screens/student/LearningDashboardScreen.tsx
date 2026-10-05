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
    <div className="flex flex-col w-full space-y-6">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-8 z-50 animate-bounce">
          <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-inverse-surface text-inverse-on-surface shadow-2xl">
            <span className="material-symbols-outlined text-secondary-fixed text-[20px]">info</span>
            <span className="font-label-md text-label-md text-xs">{toastMessage}</span>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 1. TOP QA STATE PREVIEW BAR                                               */}
      {/* ========================================================================= */}
      <aside
        aria-label="QA Testing Bar"
        className="w-full bg-surface-container rounded-xl p-3 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-3 border border-outline-variant/30"
      >
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-primary text-on-primary font-label-sm text-label-sm text-[10px] font-bold">
            QA
          </span>
          <span className="font-label-md text-label-md uppercase tracking-wider text-on-surface-variant font-bold text-xs">
            STU-LEARN-01 Canonical Inspection Control
          </span>
        </div>

        <div aria-label="Testing state switchers" className="flex flex-wrap items-center gap-1.5" role="toolbar">
          <button
            type="button"
            onClick={() => handleStateChange('default')}
            className={`px-2.5 py-1 rounded text-xs font-semibold transition-colors cursor-pointer ${
              qaState === 'default'
                ? 'bg-primary text-on-primary shadow-sm font-bold'
                : 'bg-surface-container-lowest text-on-surface-variant hover:text-on-surface'
            }`}
          >
            1. Resume Active
          </button>
          <button
            type="button"
            onClick={() => handleStateChange('m1-expanded')}
            className={`px-2.5 py-1 rounded text-xs font-semibold transition-colors cursor-pointer ${
              qaState === 'm1-expanded'
                ? 'bg-primary text-on-primary shadow-sm font-bold'
                : 'bg-surface-container-lowest text-on-surface-variant hover:text-on-surface'
            }`}
          >
            2. Mod 01 Open
          </button>
          <button
            type="button"
            onClick={() => handleStateChange('collapsed')}
            className={`px-2.5 py-1 rounded text-xs font-semibold transition-colors cursor-pointer ${
              qaState === 'collapsed'
                ? 'bg-primary text-on-primary shadow-sm font-bold'
                : 'bg-surface-container-lowest text-on-surface-variant hover:text-on-surface'
            }`}
          >
            3. All Collapsed
          </button>
          <button
            type="button"
            onClick={() => handleStateChange('skeleton')}
            className={`px-2.5 py-1 rounded text-xs font-semibold transition-colors cursor-pointer ${
              qaState === 'skeleton'
                ? 'bg-primary text-on-primary shadow-sm font-bold'
                : 'bg-surface-container-lowest text-on-surface-variant hover:text-on-surface'
            }`}
          >
            4. Skeleton
          </button>
          <button
            type="button"
            onClick={() => handleStateChange('empty')}
            className={`px-2.5 py-1 rounded text-xs font-semibold transition-colors cursor-pointer ${
              qaState === 'empty'
                ? 'bg-primary text-on-primary shadow-sm font-bold'
                : 'bg-surface-container-lowest text-on-surface-variant hover:text-on-surface'
            }`}
          >
            5. Empty
          </button>
          <button
            type="button"
            onClick={() => handleStateChange('error')}
            className={`px-2.5 py-1 rounded text-xs font-semibold transition-colors cursor-pointer ${
              qaState === 'error'
                ? 'bg-primary text-on-primary shadow-sm font-bold'
                : 'bg-surface-container-lowest text-on-surface-variant hover:text-on-surface'
            }`}
          >
            6. Not Found
          </button>
        </div>
      </aside>

      {/* ========================================================================= */}
      {/* 2. COURSE CONTEXT & BREADCRUMBS                                           */}
      {/* ========================================================================= */}
      <section className="flex flex-col gap-3 bg-surface-container-lowest p-4 rounded-xl border border-outline-variant/30 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <nav aria-label="Breadcrumbs" className="flex flex-wrap items-center gap-2 font-label-md text-label-md text-on-surface-variant text-xs">
            <button
              type="button"
              onClick={() => onNavigateScreen('PUB-02-COURSES')}
              className="hover:text-primary transition-colors cursor-pointer font-medium"
            >
              My Courses
            </button>
            <span className="text-outline">/</span>
            <span className="text-on-surface-variant">General English Track</span>
            <span className="text-outline">/</span>
            <button
              type="button"
              onClick={() => onNavigateScreen('PUB-03-COURSE-DETAIL')}
              className="text-on-surface font-medium truncate max-w-xs md:max-w-md hover:text-primary transition-colors cursor-pointer"
            >
              Essential English Grammar Mastery
            </button>
            <span className="text-outline">/</span>
            <span className="text-primary font-bold">Learning Dashboard</span>
          </nav>

          <button
            type="button"
            onClick={() => onNavigateScreen('STU-FREE-01')}
            className="inline-flex items-center gap-1.5 font-label-md text-label-md text-primary hover:text-on-primary-fixed-variant transition-colors font-bold text-xs cursor-pointer"
          >
            <span className="material-symbols-outlined text-[16px]">arrow_back</span>
            <span>Back to Direct Access Gateway</span>
          </button>
        </div>

        {/* Status Badges Bar */}
        <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-outline-variant/20">
          <span className="px-2.5 py-1 rounded-sm bg-surface-container-high text-on-surface font-label-sm text-label-sm text-xs">
            Track: General English
          </span>
          <span className="px-2.5 py-1 rounded-sm bg-tertiary-fixed text-on-tertiary-fixed font-label-sm text-label-sm text-xs">
            CEFR A1–A2 (Foundational)
          </span>
          <span className="px-2.5 py-1 rounded-sm bg-surface-container-low text-primary font-label-sm text-label-sm font-bold flex items-center gap-1 text-xs">
            <span className="material-symbols-outlined text-[14px]">lock_open</span>
            100% Free Open-Access
          </span>
          <span className="px-2.5 py-1 rounded-sm bg-surface-container-highest text-tertiary font-label-sm text-label-sm flex items-center gap-1 text-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
            Syllabus Status: Published
          </span>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* ERROR STATE CONTAINER (Shown via QA)                                      */}
      {/* ========================================================================= */}
      {qaState === 'error' && (
        <div className="w-full p-12 bg-surface-container-lowest rounded-2xl shadow-sm text-center flex flex-col items-center justify-center my-8 border border-outline-variant/30" id="state-error">
          <div className="w-14 h-14 rounded-full bg-error-container text-error flex items-center justify-center mb-4">
            <span className="material-symbols-outlined text-3xl">error_outline</span>
          </div>
          <h3 className="font-headline-lg text-headline-lg text-on-surface mb-2 font-serif text-2xl">
            Curriculum Resource Not Found
          </h3>
          <p className="font-body-md text-body-md text-on-surface-variant max-w-md mx-auto mb-6 text-sm">
            The requested course routing identifier does not correspond to an active published syllabus. Check your offline cache or track assignment.
          </p>
          <button
            type="button"
            onClick={() => handleStateChange('default')}
            className="px-5 py-2.5 rounded-lg bg-primary text-on-primary font-label-md text-label-md font-semibold hover:bg-on-primary-fixed-variant transition-colors shadow-sm text-xs cursor-pointer"
          >
            Return to Active Dashboard
          </button>
        </div>
      )}

      {/* ========================================================================= */}
      {/* EMPTY STATE CONTAINER (Shown via QA)                                      */}
      {/* ========================================================================= */}
      {qaState === 'empty' && (
        <div className="w-full p-12 bg-surface-container-lowest rounded-2xl shadow-sm text-center flex flex-col items-center justify-center my-8 border border-outline-variant/30" id="state-empty">
          <div className="w-14 h-14 rounded-full bg-surface-container-high text-on-surface-variant flex items-center justify-center mb-4">
            <span className="material-symbols-outlined text-3xl">menu_book</span>
          </div>
          <h3 className="font-headline-lg text-headline-lg text-on-surface mb-2 font-serif text-2xl">
            Curriculum Under Preparation
          </h3>
          <p className="font-body-md text-body-md text-on-surface-variant max-w-md mx-auto mb-6 text-sm">
            Modules for this sequence are currently being synced with the open-access academic server. No learning items registered in this slice.
          </p>
          <button
            type="button"
            onClick={() => handleStateChange('default')}
            className="px-5 py-2.5 rounded-lg bg-surface-container-high text-on-surface font-label-md text-label-md font-semibold hover:bg-surface-container-highest transition-colors text-xs cursor-pointer"
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
          <div className="h-44 bg-surface-container rounded-2xl w-full"></div>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8 space-y-4">
              <div className="h-10 bg-surface-container rounded-lg w-1/3"></div>
              <div className="h-28 bg-surface-container rounded-xl w-full"></div>
              <div className="h-28 bg-surface-container rounded-xl w-full"></div>
              <div className="h-28 bg-surface-container rounded-xl w-full"></div>
            </div>
            <div className="lg:col-span-4 space-y-4">
              <div className="h-48 bg-surface-container rounded-xl w-full"></div>
              <div className="h-40 bg-surface-container rounded-xl w-full"></div>
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
          <section className="relative overflow-hidden rounded-2xl bg-surface-container-low p-6 md:p-8 shadow-sm border border-outline-variant/30">
            <div className="absolute -right-8 -bottom-8 w-64 h-64 rounded-full bg-primary-fixed opacity-40 blur-2xl pointer-events-none"></div>

            <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div className="space-y-3 max-w-2xl">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-primary animate-ping"></span>
                  <span className="font-label-sm text-label-sm uppercase tracking-wider text-primary font-bold text-xs">
                    Current Learning Position: Module 01
                  </span>
                  <span className="text-outline">/</span>
                  <span className="font-label-sm text-label-sm text-tertiary text-xs">Foundations</span>
                </div>

                <h1 className="font-headline-xl text-headline-xl text-on-surface leading-tight text-2xl sm:text-3xl font-serif">
                  Lesson 1.1 — Parts of Speech &amp; Categorization
                </h1>

                <div className="flex flex-wrap items-center gap-4 text-on-surface-variant font-body-sm text-body-sm text-xs">
                  <span className="inline-flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[18px] text-primary">play_circle</span>
                    14 Mins Lecture
                  </span>
                  <span className="text-outline">•</span>
                  <span className="inline-flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[18px] text-secondary">fact_check</span>
                    15 Item Instant Auto-Drill
                  </span>
                  <span className="text-outline">•</span>
                  <span className="inline-flex items-center gap-1.5 text-on-surface font-semibold">
                    <span className="material-symbols-outlined text-[16px] text-primary">verified</span>
                    Status: Ready to Launch
                  </span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row lg:flex-col gap-3 min-w-[240px]">
                <button
                  type="button"
                  onClick={() => onNavigateScreen('STU-LESSON-01')}
                  className="px-6 py-3.5 rounded-lg bg-primary text-on-primary font-label-md text-label-md font-bold hover:bg-on-primary-fixed-variant transition-all shadow-md flex items-center justify-center gap-2 text-center group text-xs cursor-pointer"
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
                    className="flex-1 px-3 py-2 rounded-lg bg-surface-container-lowest text-on-surface font-label-sm text-label-sm hover:bg-surface-container-high transition-colors shadow-sm text-center truncate text-xs cursor-pointer border border-outline-variant/30"
                  >
                    Notes (PDF)
                  </button>
                  <a
                    href="#syllabus-container"
                    className="flex-1 px-3 py-2 rounded-lg bg-surface-container-lowest text-on-surface-variant font-label-sm text-label-sm hover:bg-surface-container-high hover:text-on-surface transition-colors shadow-sm text-center truncate text-xs border border-outline-variant/30"
                  >
                    Syllabus Index
                  </a>
                </div>
              </div>
            </div>

            {/* Quick Progress Pill Tracker */}
            <div className="mt-6 pt-4 border-t border-outline-variant/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3 font-label-sm text-label-sm text-on-surface-variant text-xs">
              <div className="flex items-center gap-3">
                <div className="w-36 h-2 rounded-full bg-surface-container overflow-hidden">
                  <div className="w-[8%] h-full bg-primary rounded-full"></div>
                </div>
                <span>
                  Overall Course Progress: <strong className="text-on-surface">1 of 24 Lessons Initiated</strong>
                </span>
              </div>
              <span className="text-tertiary">Decoupled from payment • Free Open-Access</span>
            </div>
          </section>

          {/* 4. TWO-COLUMN DASHBOARD WORKSPACE */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start" id="syllabus-container">
            {/* LEFT MAIN COLUMN: SYLLABUS & CURRICULUM NAVIGATION */}
            <main className="lg:col-span-8 flex flex-col gap-6">
              {/* Syllabus Header with Controls */}
              <div className="flex flex-wrap items-center justify-between gap-4 bg-surface-container-lowest p-4 rounded-xl shadow-sm border border-outline-variant/30">
                <div>
                  <h2 className="font-headline-sm text-headline-sm text-on-surface font-bold text-base sm:text-lg">
                    Course Modules &amp; Learning Sequence
                  </h2>
                  <p className="font-body-sm text-body-sm text-on-surface-variant text-xs">
                    Structured sequence covering 4 core modules and 24 auto-assessed units.
                  </p>
                </div>
                <div className="inline-flex items-center gap-2">
                  <button
                    type="button"
                    onClick={expandAll}
                    className="px-3 py-1.5 rounded-lg bg-surface-container text-on-surface font-label-sm text-label-sm font-semibold hover:bg-surface-container-high transition-colors text-xs cursor-pointer"
                  >
                    Expand All
                  </button>
                  <button
                    type="button"
                    onClick={collapseAll}
                    className="px-3 py-1.5 rounded-lg bg-surface-container text-on-surface font-label-sm text-label-sm font-semibold hover:bg-surface-container-high transition-colors text-xs cursor-pointer"
                  >
                    Collapse All
                  </button>
                </div>
              </div>

              {/* MODULE 01 */}
              <div className="bg-surface-container-lowest rounded-2xl shadow-sm overflow-hidden transition-all duration-200 border border-outline-variant/30">
                <button
                  type="button"
                  onClick={() => toggleModule('01')}
                  className="w-full p-5 text-left bg-surface-container-low hover:bg-surface-container transition-colors flex items-center justify-between gap-4 cursor-pointer"
                >
                  <div className="flex items-start gap-4">
                    <span className="w-9 h-9 rounded-lg bg-primary-fixed text-on-primary-fixed font-label-md text-label-md flex items-center justify-center font-bold shrink-0 text-sm">
                      01
                    </span>
                    <div>
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <span className="font-label-sm text-label-sm px-2 py-0.5 rounded bg-surface-container-lowest text-primary font-bold uppercase tracking-wider text-[10px]">
                          Active Module
                        </span>
                        <span className="font-label-sm text-label-sm text-on-surface-variant text-xs">
                          Foundational CEFR A1
                        </span>
                      </div>
                      <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold text-base">
                        Core Grammatical Foundations
                      </h3>
                      <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5 text-xs">
                        6 Lessons • 6 Auto-Drills • Approx. 95 min total runtime
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <span className="font-label-sm text-label-sm text-primary font-bold hidden sm:inline text-xs">
                      In Progress
                    </span>
                    <span
                      className={`material-symbols-outlined text-on-surface-variant transform transition-transform duration-200 ${
                        expandedModules['01'] ? 'rotate-180' : 'rotate-0'
                      }`}
                    >
                      expand_more
                    </span>
                  </div>
                </button>

                {expandedModules['01'] && (
                  <div className="p-4 md:p-6 flex flex-col gap-3 border-t border-outline-variant/20">
                    {/* Lesson 1.1 (ACTIVE) */}
                    <div className="p-4 rounded-xl bg-surface-container-low/70 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4 border border-primary/20">
                      <div className="space-y-1.5">
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-0.5 rounded text-[10px] bg-primary text-on-primary font-bold uppercase tracking-wide">
                            Next to Learn
                          </span>
                          <span className="font-label-sm text-label-sm font-bold text-primary text-xs">
                            Lesson 1.1
                          </span>
                        </div>
                        <h4 className="font-headline-sm text-headline-sm text-on-surface font-bold text-sm sm:text-base">
                          Parts of Speech &amp; Categorization
                        </h4>
                        <div className="flex flex-wrap items-center gap-3 font-body-sm text-body-sm text-on-surface-variant text-xs">
                          <span className="flex items-center gap-1">
                            <span className="material-symbols-outlined text-[15px] text-primary">play_circle</span>{' '}
                            Video Lecture (14 mins)
                          </span>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            <span className="material-symbols-outlined text-[15px] text-secondary">assignment</span>{' '}
                            Auto-Drill (15 prompts)
                          </span>
                          <span className="px-2 py-0.5 rounded bg-surface-container text-on-surface-variant font-label-sm text-label-sm text-[10px]">
                            100% Auto-Graded
                          </span>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => onNavigateScreen('STU-LESSON-01')}
                        className="px-4 py-2 rounded-lg bg-primary text-on-primary font-label-md text-label-md font-bold hover:bg-on-primary-fixed-variant transition-colors shadow-sm shrink-0 flex items-center justify-center gap-1.5 text-xs cursor-pointer"
                      >
                        <span>Start Lesson</span>
                        <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                      </button>
                    </div>

                    {/* Lesson 1.2 */}
                    <div className="p-4 rounded-xl bg-surface-container-lowest hover:bg-surface-container-low transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm border border-outline-variant/20">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-label-sm text-label-sm font-semibold text-tertiary text-xs">
                            Lesson 1.2
                          </span>
                          <span className="text-outline-variant">•</span>
                          <span className="font-label-sm text-label-sm text-on-surface-variant text-xs">
                            Ready
                          </span>
                        </div>
                        <h4 className="font-headline-sm text-headline-sm text-on-surface text-sm sm:text-base font-semibold">
                          Present Simple vs Present Continuous
                        </h4>
                        <div className="flex flex-wrap items-center gap-3 font-body-sm text-body-sm text-on-surface-variant text-xs">
                          <span>Video Lecture (18 mins)</span>
                          <span>•</span>
                          <span>Auto-Drill: Stative vs Dynamic Verbs (12 items)</span>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => onNavigateScreen('STU-LESSON-01')}
                        className="px-3.5 py-1.5 rounded-lg bg-surface-container text-on-surface font-label-sm text-label-sm font-semibold hover:bg-surface-container-high transition-colors shrink-0 text-xs cursor-pointer"
                      >
                        Open Unit
                      </button>
                    </div>

                    {/* Lesson 1.3 */}
                    <div className="p-4 rounded-xl bg-surface-container-lowest hover:bg-surface-container-low transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm border border-outline-variant/20">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-label-sm text-label-sm font-semibold text-tertiary text-xs">
                            Lesson 1.3
                          </span>
                          <span className="text-outline-variant">•</span>
                          <span className="font-label-sm text-label-sm text-on-surface-variant text-xs">
                            Ready
                          </span>
                        </div>
                        <h4 className="font-headline-sm text-headline-sm text-on-surface text-sm sm:text-base font-semibold">
                          Subject-Verb Agreement &amp; Irregular Verbs
                        </h4>
                        <div className="flex flex-wrap items-center gap-3 font-body-sm text-body-sm text-on-surface-variant text-xs">
                          <span>Video Lecture (20 mins)</span>
                          <span>•</span>
                          <span>Auto-Drill: Agreement Diagnostics (15 items)</span>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => onNavigateScreen('STU-LESSON-01')}
                        className="px-3.5 py-1.5 rounded-lg bg-surface-container text-on-surface font-label-sm text-label-sm font-semibold hover:bg-surface-container-high transition-colors shrink-0 text-xs cursor-pointer"
                      >
                        Open Unit
                      </button>
                    </div>

                    {/* Lesson 1.6 Checkpoint */}
                    <div className="p-4 rounded-xl bg-surface-container-high/60 hover:bg-surface-container-high transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm border border-outline-variant/20">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-0.5 rounded text-[10px] bg-tertiary text-on-tertiary font-bold uppercase tracking-wide">
                            Synthesis Checkpoint
                          </span>
                          <span className="font-label-sm text-label-sm font-semibold text-tertiary text-xs">
                            Lesson 1.6
                          </span>
                        </div>
                        <h4 className="font-headline-sm text-headline-sm text-on-surface font-bold text-sm sm:text-base">
                          Module 1 Synthesis &amp; Comprehensive Diagnostic
                        </h4>
                        <div className="flex flex-wrap items-center gap-3 font-body-sm text-body-sm text-on-surface-variant text-xs">
                          <span>Synthesis Review (12 mins)</span>
                          <span>•</span>
                          <span>Unit Drill (30 questions)</span>
                          <span className="px-2 py-0.5 rounded bg-surface-container-lowest text-primary font-label-sm text-label-sm font-semibold text-[10px]">
                            Benchmark: 80%
                          </span>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => onNavigateScreen('STU-EX-01')}
                        className="px-3.5 py-1.5 rounded-lg bg-surface-container-lowest text-on-surface font-label-sm text-label-sm font-semibold hover:bg-surface-container transition-colors shrink-0 text-xs cursor-pointer"
                      >
                        Review Checkpoint
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* MODULE 02 */}
              <div className="bg-surface-container-lowest rounded-2xl shadow-sm overflow-hidden transition-all duration-200 border border-outline-variant/30">
                <button
                  type="button"
                  onClick={() => toggleModule('02')}
                  className="w-full p-5 text-left bg-surface-container-lowest hover:bg-surface-container-low transition-colors flex items-center justify-between gap-4 cursor-pointer"
                >
                  <div className="flex items-start gap-4">
                    <span className="w-9 h-9 rounded-lg bg-surface-container text-on-surface font-label-md text-label-md flex items-center justify-center font-bold shrink-0 text-sm">
                      02
                    </span>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-label-sm text-label-sm text-on-surface-variant text-xs">
                          Pre-Intermediate CEFR A2
                        </span>
                      </div>
                      <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold text-base">
                        Tense Systems &amp; Narrative Structures
                      </h3>
                      <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5 text-xs">
                        6 Lessons • 6 Auto-Drills • Approx. 110 min runtime
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <span className="font-label-sm text-label-sm text-on-surface-variant hidden sm:inline text-xs">
                      Available
                    </span>
                    <span
                      className={`material-symbols-outlined text-on-surface-variant transition-transform duration-200 ${
                        expandedModules['02'] ? 'rotate-180' : 'rotate-0'
                      }`}
                    >
                      expand_more
                    </span>
                  </div>
                </button>

                {expandedModules['02'] && (
                  <div className="p-4 md:p-6 flex flex-col gap-3 bg-surface-container-low/30 border-t border-outline-variant/20">
                    <div className="p-3 bg-surface-container-lowest rounded-xl shadow-sm flex items-center justify-between">
                      <div>
                        <p className="font-label-sm text-label-sm text-tertiary text-xs">Lesson 2.1</p>
                        <p className="font-body-md text-body-md text-on-surface font-semibold text-xs sm:text-sm">
                          Past Simple vs Past Continuous in Narratives
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => onNavigateScreen('STU-LESSON-01')}
                        className="px-3 py-1 rounded bg-surface-container text-on-surface font-label-sm text-label-sm hover:bg-surface-container-high text-xs cursor-pointer"
                      >
                        Inspect
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* MODULE 03 */}
              <div className="bg-surface-container-lowest rounded-2xl shadow-sm overflow-hidden transition-all duration-200 border border-outline-variant/30">
                <button
                  type="button"
                  onClick={() => toggleModule('03')}
                  className="w-full p-5 text-left bg-surface-container-lowest hover:bg-surface-container-low transition-colors flex items-center justify-between gap-4 cursor-pointer"
                >
                  <div className="flex items-start gap-4">
                    <span className="w-9 h-9 rounded-lg bg-surface-container text-on-surface font-label-md text-label-md flex items-center justify-center font-bold shrink-0 text-sm">
                      03
                    </span>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-label-sm text-label-sm text-on-surface-variant text-xs">
                          Core CEFR A2
                        </span>
                      </div>
                      <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold text-base">
                        Modal Verbs &amp; Question Formations
                      </h3>
                      <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5 text-xs">
                        6 Lessons • 6 Auto-Drills • Approx. 90 min runtime
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <span className="font-label-sm text-label-sm text-on-surface-variant hidden sm:inline text-xs">
                      Available
                    </span>
                    <span
                      className={`material-symbols-outlined text-on-surface-variant transition-transform duration-200 ${
                        expandedModules['03'] ? 'rotate-180' : 'rotate-0'
                      }`}
                    >
                      expand_more
                    </span>
                  </div>
                </button>
              </div>

              {/* MODULE 04 */}
              <div className="bg-surface-container-lowest rounded-2xl shadow-sm overflow-hidden transition-all duration-200 border border-outline-variant/30">
                <button
                  type="button"
                  onClick={() => toggleModule('04')}
                  className="w-full p-5 text-left bg-surface-container-lowest hover:bg-surface-container-low transition-colors flex items-center justify-between gap-4 cursor-pointer"
                >
                  <div className="flex items-start gap-4">
                    <span className="w-9 h-9 rounded-lg bg-surface-container text-on-surface font-label-md text-label-md flex items-center justify-center font-bold shrink-0 text-sm">
                      04
                    </span>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-label-sm text-label-sm text-on-surface-variant text-xs">
                          Bridging CEFR A2+
                        </span>
                      </div>
                      <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold text-base">
                        Compound Sentence Construction &amp; Cohesion
                      </h3>
                      <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5 text-xs">
                        6 Lessons • 6 Auto-Drills • Approx. 105 min runtime
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <span className="font-label-sm text-label-sm text-on-surface-variant hidden sm:inline text-xs">
                      Available
                    </span>
                    <span
                      className={`material-symbols-outlined text-on-surface-variant transition-transform duration-200 ${
                        expandedModules['04'] ? 'rotate-180' : 'rotate-0'
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
              <section className="bg-surface-container-lowest rounded-2xl p-6 shadow-sm border border-outline-variant/30">
                <div className="flex items-center gap-2 mb-4">
                  <span className="material-symbols-outlined text-primary text-[22px]">policy</span>
                  <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold text-sm sm:text-base">
                    Academic Invariants
                  </h3>
                </div>
                <div className="space-y-4 text-xs">
                  <div className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-surface-container-high text-primary flex items-center justify-center shrink-0 mt-0.5">
                      <span className="material-symbols-outlined text-[14px]">check</span>
                    </span>
                    <div>
                      <h4 className="font-label-md text-label-md text-on-surface font-bold">
                        Zero Financial Enrollment
                      </h4>
                      <p className="font-body-sm text-body-sm text-on-surface-variant text-[11px] leading-relaxed">
                        Open-access academic standard. Zero payment slip verification, zero checkout gates, or administrative holding periods.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-surface-container-high text-primary flex items-center justify-center shrink-0 mt-0.5">
                      <span className="material-symbols-outlined text-[14px]">bolt</span>
                    </span>
                    <div>
                      <h4 className="font-label-md text-label-md text-on-surface font-bold">
                        100% Instant Auto-Graded
                      </h4>
                      <p className="font-body-sm text-body-sm text-on-surface-variant text-[11px] leading-relaxed">
                        Standard auto-drills evaluate instantaneously via client-deterministic keys. No delayed manual grading queues.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-surface-container-high text-primary flex items-center justify-center shrink-0 mt-0.5">
                      <span className="material-symbols-outlined text-[14px]">sync</span>
                    </span>
                    <div>
                      <h4 className="font-label-md text-label-md text-on-surface font-bold">
                        Progress Decoupled from Access
                      </h4>
                      <p className="font-body-sm text-body-sm text-on-surface-variant text-[11px] leading-relaxed">
                        Learning position and diagnostics are tracked locally and independently from any commercial membership.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* CARD 2: Pedagogical Hierarchy Representation */}
              <section className="bg-surface-container-lowest rounded-2xl p-6 shadow-sm border border-outline-variant/30">
                <div className="flex items-center gap-2 mb-4">
                  <span className="material-symbols-outlined text-secondary text-[22px]">account_tree</span>
                  <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold text-sm sm:text-base">
                    Curriculum Structure
                  </h3>
                </div>
                <p className="font-body-sm text-body-sm text-on-surface-variant mb-4 text-xs">
                  Level positioning is strictly enclosed within Course architecture:
                </p>
                <div className="bg-surface-container-low p-4 rounded-xl space-y-2.5 font-label-sm text-label-sm text-xs border border-outline-variant/20">
                  <div className="flex items-center gap-2 text-on-surface font-bold">
                    <span className="w-2 h-2 rounded-full bg-primary"></span>
                    Track: General English
                  </div>
                  <div className="pl-4 border-l border-outline-variant/60 flex items-center gap-2 text-on-surface font-semibold">
                    <span className="material-symbols-outlined text-[14px] text-primary">subdirectory_arrow_right</span>
                    Course: Essential English Grammar Mastery
                  </div>
                  <div className="pl-8 border-l border-outline-variant/60 flex items-center gap-2 text-tertiary">
                    <span className="material-symbols-outlined text-[14px] text-secondary">subdirectory_arrow_right</span>
                    Level: CEFR A1 Beginner – A2 Elementary
                  </div>
                  <div className="pl-12 border-l border-outline-variant/60 flex items-center gap-2 text-on-surface-variant">
                    <span className="material-symbols-outlined text-[14px] text-outline">subdirectory_arrow_right</span>
                    4 Modules (24 Lessons • 48 Drill Units)
                  </div>
                </div>
                <div className="mt-4 pt-3 border-t border-outline-variant/30 flex items-center justify-between text-on-surface-variant font-label-sm text-label-sm text-xs">
                  <span>Syllabus Version</span>
                  <span className="font-mono text-on-surface font-medium">v2.4 (2025 Standard)</span>
                </div>
              </section>

              {/* CARD 3: Learning Support & Integrity */}
              <section className="bg-surface-container-lowest rounded-2xl p-6 shadow-sm border border-outline-variant/30">
                <div className="flex items-center gap-2 mb-3">
                  <span className="material-symbols-outlined text-tertiary text-[22px]">support_agent</span>
                  <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold text-sm sm:text-base">
                    Learning Integrity &amp; Tools
                  </h3>
                </div>
                <p className="font-body-sm text-body-sm text-on-surface-variant mb-4 text-xs">
                  Curriculum tools designed for autonomous study:
                </p>
                <ul className="space-y-2.5 font-label-md text-label-md text-xs">
                  <li>
                    <button
                      type="button"
                      onClick={() => showToast('Loading Grammar Discussion Forum Guidelines...')}
                      className="text-left w-full flex items-center justify-between text-on-surface hover:text-primary transition-colors cursor-pointer p-2 rounded-lg hover:bg-surface-container-low"
                    >
                      <span className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-[18px] text-primary">forum</span>
                        Discussion Guidelines
                      </span>
                      <span className="material-symbols-outlined text-[16px]">chevron_right</span>
                    </button>
                  </li>
                  <li>
                    <button
                      type="button"
                      onClick={() => showToast('Syncing offline vocabulary flashcards...')}
                      className="text-left w-full flex items-center justify-between text-on-surface hover:text-primary transition-colors cursor-pointer p-2 rounded-lg hover:bg-surface-container-low"
                    >
                      <span className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-[18px] text-secondary">style</span>
                        Unit Flashcard Decks
                      </span>
                      <span className="material-symbols-outlined text-[16px]">chevron_right</span>
                    </button>
                  </li>
                  <li>
                    <button
                      type="button"
                      onClick={() => showToast('Local browser storage cache refreshed.')}
                      className="text-left w-full flex items-center justify-between text-on-surface hover:text-primary transition-colors cursor-pointer p-2 rounded-lg hover:bg-surface-container-low"
                    >
                      <span className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-[18px] text-tertiary">cleaning_services</span>
                        Recover Local Progress Cache
                      </span>
                      <span className="material-symbols-outlined text-[16px]">chevron_right</span>
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
