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
    <div className="flex flex-col w-full space-y-6">
      {/* ========================================================================= */}
      {/* QA STATE PREVIEW BAR                                                      */}
      {/* ========================================================================= */}
      <aside
        aria-label="Developer Inspection Toolbar"
        className="w-full bg-surface-container text-on-surface px-margin py-space-xs rounded-xl shadow-sm border border-outline-variant/30"
      >
        <div className="max-w-7xl mx-auto flex flex-col xl:flex-row items-start xl:items-center justify-between gap-space-xs">
          <div className="flex items-center gap-space-xs">
            <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-primary text-on-primary font-label-sm text-label-sm">
              <span className="material-symbols-outlined text-[14px]">tune</span>
            </span>
            <span className="font-label-sm text-label-sm tracking-wider uppercase text-on-surface-variant font-bold text-[11px]">
              QA STATE PREVIEW <span className="text-primary font-semibold">(STU-FREE-01 Canonical Inspection Control)</span>
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-space-2xs text-label-sm font-label-sm">
            <button
              type="button"
              onClick={() => setQaState('ready')}
              className={`px-space-xs py-1 rounded text-xs transition-colors cursor-pointer ${
                qaState === 'ready'
                  ? 'bg-primary text-on-primary font-bold shadow-sm'
                  : 'bg-surface-container-high text-on-surface hover:bg-surface-container-highest'
              }`}
            >
              1. Direct Access Ready
            </button>
            <button
              type="button"
              onClick={() => setQaState('dispatching')}
              className={`px-space-xs py-1 rounded text-xs transition-colors cursor-pointer ${
                qaState === 'dispatching'
                  ? 'bg-primary text-on-primary font-bold shadow-sm'
                  : 'bg-surface-container-high text-on-surface hover:bg-surface-container-highest'
              }`}
            >
              2. Session Dispatching
            </button>
            <button
              type="button"
              onClick={() => setQaState('skeleton')}
              className={`px-space-xs py-1 rounded text-xs transition-colors cursor-pointer ${
                qaState === 'skeleton'
                  ? 'bg-primary text-on-primary font-bold shadow-sm'
                  : 'bg-surface-container-high text-on-surface hover:bg-surface-container-highest'
              }`}
            >
              3. Skeleton Gateway
            </button>
            <button
              type="button"
              onClick={() => setQaState('guest')}
              className={`px-space-xs py-1 rounded text-xs transition-colors cursor-pointer ${
                qaState === 'guest'
                  ? 'bg-primary text-on-primary font-bold shadow-sm'
                  : 'bg-surface-container-high text-on-surface hover:bg-surface-container-highest'
              }`}
            >
              4. Guest Challenge
            </button>
            <button
              type="button"
              onClick={() => setQaState('error')}
              className={`px-space-xs py-1 rounded text-xs transition-colors cursor-pointer ${
                qaState === 'error'
                  ? 'bg-primary text-on-primary font-bold shadow-sm'
                  : 'bg-surface-container-high text-on-surface hover:bg-surface-container-highest'
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
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-space-sm bg-surface-container-lowest p-4 rounded-xl border border-outline-variant/30 shadow-sm">
        <nav
          aria-label="Breadcrumbs"
          className="flex items-center flex-wrap gap-space-2xs font-label-md text-label-md text-on-surface-variant text-xs"
        >
          <button
            type="button"
            onClick={() => onNavigateScreen('PUB-02-COURSES')}
            className="hover:text-primary transition-colors cursor-pointer"
          >
            Courses
          </button>
          <span className="material-symbols-outlined text-[16px] text-outline">chevron_right</span>
          <span className="text-on-surface-variant">General English Track</span>
          <span className="material-symbols-outlined text-[16px] text-outline">chevron_right</span>
          <button
            type="button"
            onClick={() => onNavigateScreen('PUB-03-COURSE-DETAIL')}
            className="text-on-surface font-semibold truncate max-w-xs md:max-w-sm hover:text-primary transition-colors cursor-pointer"
          >
            Essential English Grammar Mastery
          </button>
          <span className="material-symbols-outlined text-[16px] text-outline">chevron_right</span>
          <span className="text-primary font-bold">Free Access Gateway</span>
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => onNavigateScreen('STU-COURSE-03-STRUCTURE')}
            className="inline-flex items-center gap-space-2xs font-label-lg text-label-lg text-primary hover:text-primary-container transition-colors text-xs font-bold cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">arrow_back</span>
            <span>Back to Course Structure Preview</span>
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* STATE 2: SESSION DISPATCHING VIEW                                         */}
      {/* ========================================================================= */}
      {qaState === 'dispatching' && (
        <div className="flex flex-col items-center justify-center py-space-3xl px-margin bg-surface-container-lowest rounded-2xl shadow-md text-center max-w-2xl mx-auto w-full border border-outline-variant/30 my-8">
          <div className="w-16 h-16 rounded-full bg-secondary-fixed text-primary flex items-center justify-center mb-space-md animate-spin shadow-sm">
            <span className="material-symbols-outlined text-[32px]">sync</span>
          </div>
          <span className="font-label-sm text-label-sm uppercase tracking-widest text-primary font-bold text-xs">
            Session Gateway
          </span>
          <h2 className="font-headline-xl text-headline-xl text-on-surface mt-1 text-2xl sm:text-3xl font-serif">
            Initializing Free Study Classroom...
          </h2>
          <p className="font-body-md text-body-md text-on-surface-variant max-w-md mt-space-xs mb-space-lg text-xs sm:text-sm">
            Establishing direct stream player session for Lesson 1.1. Zero payment records created. Unlocking local auto-drill memory index.
          </p>
          <div className="w-full max-w-sm bg-surface-container-high h-2.5 rounded-full overflow-hidden mb-space-md">
            <div className="bg-primary h-full rounded-full animate-pulse w-3/4"></div>
          </div>
          <button
            type="button"
            onClick={() => setQaState('ready')}
            className="font-label-md text-label-md text-on-surface-variant hover:text-primary transition-colors text-xs cursor-pointer"
          >
            Cancel and return to Gateway summary
          </button>
        </div>
      )}

      {/* ========================================================================= */}
      {/* STATE 3: SKELETON / LOADING GATEWAY                                       */}
      {/* ========================================================================= */}
      {qaState === 'skeleton' && (
        <div className="flex flex-col gap-space-lg w-full animate-pulse py-8">
          <div className="bg-surface-container rounded-xl h-72 w-full p-space-xl flex flex-col justify-between">
            <div className="flex gap-2">
              <div className="h-6 w-28 bg-surface-container-highest rounded"></div>
              <div className="h-6 w-36 bg-surface-container-highest rounded"></div>
              <div className="h-6 w-32 bg-surface-container-highest rounded"></div>
            </div>
            <div className="flex flex-col gap-3">
              <div className="h-10 w-2/3 bg-surface-container-highest rounded"></div>
              <div className="h-5 w-4/5 bg-surface-container-highest rounded"></div>
            </div>
            <div className="h-12 w-64 bg-surface-container-highest rounded"></div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg">
            <div className="lg:col-span-8 bg-surface-container rounded-xl h-96 p-space-lg flex flex-col justify-between">
              <div className="h-6 w-48 bg-surface-container-highest rounded"></div>
              <div className="h-56 w-full bg-surface-container-highest rounded-lg"></div>
              <div className="h-6 w-3/4 bg-surface-container-highest rounded"></div>
            </div>
            <div className="lg:col-span-4 bg-surface-container rounded-xl h-96 p-space-lg flex flex-col gap-4">
              <div className="h-6 w-32 bg-surface-container-highest rounded"></div>
              <div className="h-20 w-full bg-surface-container-highest rounded"></div>
              <div className="h-20 w-full bg-surface-container-highest rounded"></div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* STATE 4: UNAUTHENTICATED GUEST CHALLENGE                                   */}
      {/* ========================================================================= */}
      {qaState === 'guest' && (
        <div className="flex flex-col items-center justify-center py-space-3xl px-margin bg-surface-container-lowest rounded-2xl shadow-md text-center max-w-2xl mx-auto w-full border border-outline-variant/30 my-8">
          <div className="w-16 h-16 rounded-full bg-surface-container-high text-primary flex items-center justify-center mb-space-md shadow-sm">
            <span className="material-symbols-outlined text-[32px]">lock</span>
          </div>
          <span className="font-label-sm text-label-sm uppercase tracking-widest text-on-surface-variant font-bold text-xs">
            Sign-in Recommended
          </span>
          <h2 className="font-headline-xl text-headline-xl text-on-surface mt-1 text-2xl sm:text-3xl font-serif">
            Save Your Free Course Progress
          </h2>
          <p className="font-body-md text-body-md text-on-surface-variant max-w-md mt-space-xs mb-space-lg text-xs sm:text-sm">
            This open-access course is completely free. Please log in or create a basic student account so your auto-drill benchmarks and video completion state can be preserved across devices.
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-space-xs w-full max-w-xs">
            <button
              type="button"
              onClick={() => onNavigateScreen('AUTH-01-LOGIN')}
              className="w-full py-2.5 px-space-md bg-primary text-on-primary rounded-lg font-label-lg text-label-lg font-bold hover:bg-primary-container text-center transition-colors text-xs cursor-pointer shadow-sm"
            >
              Log In &amp; Continue
            </button>
            <button
              type="button"
              onClick={() => onNavigateScreen('AUTH-02-REGISTER')}
              className="w-full py-2.5 px-space-md bg-surface-container-high text-on-surface rounded-lg font-label-lg text-label-lg font-bold hover:bg-surface-container-highest text-center transition-colors text-xs cursor-pointer"
            >
              Create Free Account
            </button>
          </div>
          <div className="mt-space-lg pt-space-md">
            <button
              type="button"
              onClick={() => setQaState('ready')}
              className="font-label-sm text-label-sm text-on-surface-variant hover:text-primary transition-colors inline-flex items-center gap-1 text-xs cursor-pointer"
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
        <div className="flex flex-col items-center justify-center py-space-3xl px-margin bg-surface-container-lowest rounded-2xl shadow-md text-center max-w-2xl mx-auto w-full border border-outline-variant/30 my-8">
          <div className="w-16 h-16 rounded-full bg-error-container text-error flex items-center justify-center mb-space-md shadow-sm">
            <span className="material-symbols-outlined text-[32px]">report_problem</span>
          </div>
          <span className="font-label-sm text-label-sm uppercase tracking-widest text-error font-bold text-xs">
            Curriculum Notice
          </span>
          <h2 className="font-headline-xl text-headline-xl text-on-surface mt-1 text-2xl sm:text-3xl font-serif">
            Course In Maintenance Mode
          </h2>
          <p className="font-body-md text-body-md text-on-surface-variant max-w-md mt-space-xs mb-space-lg text-xs sm:text-sm">
            Essential English Grammar Mastery is currently undergoing scheduled curriculum re-indexing. Direct stream links are temporarily cycling. Please try again in a few moments.
          </p>
          <div className="flex items-center gap-space-xs">
            <button
              type="button"
              onClick={() => setQaState('ready')}
              className="px-space-md py-space-xs bg-primary text-on-primary rounded-lg font-label-lg text-label-lg font-bold hover:bg-primary-container transition-colors text-xs cursor-pointer shadow-sm"
            >
              Retry Access
            </button>
            <button
              type="button"
              onClick={() => onNavigateScreen('PUB-02-COURSES')}
              className="px-space-md py-space-xs bg-surface-container-high text-on-surface rounded-lg font-label-lg text-label-lg hover:bg-surface-container-highest transition-colors text-xs font-semibold cursor-pointer"
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
        <div className="flex flex-col gap-space-xl">
          <section className="relative bg-surface-container-lowest rounded-2xl shadow-sm overflow-hidden p-space-xl border border-outline-variant/30">
            {/* Ambient Decorative Accent */}
            <div
              aria-hidden="true"
              className="absolute -top-24 -right-24 w-80 h-80 rounded-full bg-secondary-fixed opacity-40 blur-3xl pointer-events-none"
            ></div>
            <div
              aria-hidden="true"
              className="absolute bottom-0 right-1/3 w-60 h-60 rounded-full bg-tertiary-fixed opacity-30 blur-2xl pointer-events-none"
            ></div>

            <div className="relative z-10 flex flex-col gap-space-lg">
              {/* Badges Cluster */}
              <div className="flex flex-wrap items-center gap-space-xs">
                <span className="inline-flex items-center gap-1.5 px-space-xs py-1 rounded-md bg-secondary-fixed text-on-secondary-fixed font-label-md text-label-md font-bold text-xs">
                  <span className="material-symbols-outlined text-[16px]">menu_book</span>
                  General English Track
                </span>
                <span className="inline-flex items-center gap-1.5 px-space-xs py-1 rounded-md bg-surface-container text-on-surface-variant font-label-md text-label-md text-xs">
                  <span className="material-symbols-outlined text-[16px]">signal_cellular_alt</span>
                  Level: A1 Beginner to A2 Elementary
                </span>
                <span className="inline-flex items-center gap-1.5 px-space-xs py-1 rounded-md bg-primary-fixed text-on-primary-fixed font-label-md text-label-md font-bold text-xs">
                  <span className="material-symbols-outlined text-[16px]">lock_open</span>
                  100% Free Public Curriculum
                </span>
                <span className="inline-flex items-center gap-1.5 px-space-xs py-1 rounded-md bg-surface-container-high text-on-surface-variant font-label-sm text-label-sm text-xs">
                  <span className="material-symbols-outlined text-[14px]">bolt</span>
                  Zero-Friction Fastlane
                </span>
              </div>

              {/* Editorial Headline */}
              <div className="flex flex-col gap-space-xs max-w-4xl">
                <h1 className="font-headline-display text-headline-display text-on-surface leading-tight text-3xl sm:text-4xl font-serif">
                  Direct Access Authorized: Essential English Grammar Mastery
                </h1>
                <p className="font-body-xl text-body-xl text-on-surface-variant text-sm sm:text-base leading-relaxed">
                  Published open-access academic curriculum for ambitious learners. Zero enrollment fees, no payment verification required, and instant direct access into the learning environment.
                </p>
              </div>

              {/* Academic Architecture Bento Strip */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-space-xs bg-surface-container-low p-space-md rounded-xl border border-outline-variant/20">
                <div className="flex flex-col">
                  <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant text-[10px] font-bold">
                    Track
                  </span>
                  <span className="font-label-lg text-label-lg text-on-surface font-semibold text-xs sm:text-sm">
                    General English
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant text-[10px] font-bold">
                    Course Tier
                  </span>
                  <span className="font-label-lg text-label-lg text-on-surface font-semibold text-xs sm:text-sm">
                    Core Foundations
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant text-[10px] font-bold">
                    Target Level
                  </span>
                  <span className="font-label-lg text-label-lg text-primary font-bold text-xs sm:text-sm">
                    CEFR A1–A2
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant text-[10px] font-bold">
                    Modules
                  </span>
                  <span className="font-label-lg text-label-lg text-on-surface font-semibold text-xs sm:text-sm">
                    4 Structured
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant text-[10px] font-bold">
                    Lessons
                  </span>
                  <span className="font-label-lg text-label-lg text-on-surface font-semibold text-xs sm:text-sm">
                    24 Lectures
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant text-[10px] font-bold">
                    Practice Units
                  </span>
                  <span className="font-label-lg text-label-lg text-secondary font-bold text-xs sm:text-sm">
                    48 Auto-Drills
                  </span>
                </div>
              </div>

              {/* Academic Policy Invariant Guard Box */}
              <div className="flex items-start gap-space-md bg-surface-container p-space-md rounded-xl border border-outline-variant/30">
                <div className="w-10 h-10 rounded-lg bg-surface-container-highest text-primary flex items-center justify-center shrink-0 shadow-sm">
                  <span className="material-symbols-outlined text-[24px]">verified_user</span>
                </div>
                <div className="flex flex-col gap-1 text-on-surface">
                  <span className="font-label-lg text-label-lg font-bold text-sm">
                    Academic Open Access Guarantee
                  </span>
                  <p className="font-body-md text-body-md text-on-surface-variant text-xs sm:text-sm leading-relaxed">
                    This course is published under the Teacher Theint English open-access standard. Immediate entry is unlocked without commercial registration or ledger creation. Lecture progress, comprehension benchmarks, and auto-drill scores are preserved automatically to your browser session and linked student profile.
                  </p>
                </div>
              </div>

              {/* Action Buttons Cluster */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-space-sm pt-space-xs">
                <button
                  type="button"
                  onClick={handleLaunchLesson}
                  className="inline-flex items-center justify-center gap-space-xs px-space-lg py-space-sm rounded-lg bg-primary hover:bg-primary-container text-on-primary font-label-lg text-label-lg font-bold shadow-md transition-all group text-xs sm:text-sm cursor-pointer"
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
                  className="inline-flex items-center justify-center gap-space-xs px-space-md py-space-sm rounded-lg bg-surface-container-high text-on-surface font-label-lg text-label-lg hover:bg-surface-container-highest transition-colors text-xs font-semibold cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[18px]">account_tree</span>
                  <span>Explore Full Syllabus &amp; Modules</span>
                </button>

                <button
                  type="button"
                  onClick={() => onNavigateScreen('STU-LEARN-01')}
                  className="inline-flex items-center justify-center gap-space-xs px-space-md py-space-sm rounded-lg bg-surface-container-low text-primary font-label-lg text-label-lg hover:bg-surface-container transition-colors text-xs font-semibold cursor-pointer border border-primary/20"
                >
                  <span className="material-symbols-outlined text-[18px]">dashboard</span>
                  <span>Open Learning Dashboard</span>
                </button>
              </div>
            </div>
          </section>

          {/* Two-Column Interactive Details */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg">
            {/* Left Column: Starting Unit Spotlight (8 Cols) */}
            <section className="lg:col-span-8 bg-surface-container-lowest rounded-2xl shadow-sm p-space-xl flex flex-col gap-space-lg border border-outline-variant/30">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-space-xs">
                  <span className="w-8 h-8 rounded-full bg-secondary-fixed text-on-secondary-fixed flex items-center justify-center font-bold text-label-sm text-xs">
                    01
                  </span>
                  <div>
                    <span className="font-label-sm text-label-sm uppercase tracking-widest text-on-surface-variant block text-[10px]">
                      Current Dispatch Unit
                    </span>
                    <h2 className="font-headline-md text-headline-md text-on-surface text-base sm:text-lg font-bold">
                      Module 01: Core Grammatical Foundations
                    </h2>
                  </div>
                </div>
                <span className="inline-flex items-center gap-1 font-label-sm text-label-sm px-2.5 py-1 rounded bg-surface-container text-on-surface-variant text-[11px]">
                  <span className="material-symbols-outlined text-[14px]">schedule</span> 14 Mins Lecture
                </span>
              </div>

              {/* Video & Lesson Preview Panel */}
              <div className="relative w-full rounded-xl overflow-hidden bg-surface-container-high aspect-video max-h-80 flex items-center justify-center group border border-outline-variant/30">
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                  style={{
                    backgroundImage:
                      "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAxnYhLwuUXMxwGYLy6n8RxJPTn8tnSUszU59g0XjNsJBQnk28zoP96OdjjIvKSdLT51SBtkqoJ6wg5ovZ2FeBrPhUTnizOaMNi8HtgaK4MBFtotGfqQA_P_qd14ERecDb34sJ5XzO3-ZZtrtZTD91pp9TECsKkGxdCBeJ60TpiXUPMPO9nPmLzj40tl6QLADRBqBZGO_Vs1fS-RVzPuFIQSxK6_TYc2_qgVzSZyZ4')",
                  }}
                ></div>
                <div className="absolute inset-0 bg-inverse-surface/40 backdrop-blur-[2px]"></div>

                <div className="relative z-10 flex flex-col items-center gap-space-xs text-center px-space-md">
                  <button
                    type="button"
                    onClick={handleLaunchLesson}
                    className="w-16 h-16 rounded-full bg-primary text-on-primary flex items-center justify-center shadow-xl hover:scale-110 hover:bg-primary-container transition-all cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[36px] ml-1">play_arrow</span>
                  </button>
                  <div className="text-surface-bright">
                    <span className="font-headline-sm text-headline-sm block drop-shadow-sm font-bold text-sm sm:text-base text-white">
                      Lesson 1.1 — Parts of Speech &amp; Categorization
                    </span>
                    <span className="font-label-md text-label-md opacity-90 text-xs text-white/80">
                      First stream segment begins at timestamp 00:00
                    </span>
                  </div>
                </div>

                <div className="absolute bottom-space-sm left-space-sm px-space-xs py-1 rounded bg-surface/90 backdrop-blur-md text-on-surface font-label-sm text-label-sm flex items-center gap-1 text-[11px]">
                  <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                  High Definition 1080p Public Stream Unlocked
                </div>
              </div>

              {/* Lesson Item Micro Breakdown */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-md pt-space-xs">
                <div className="flex items-start gap-space-xs p-space-sm rounded-xl bg-surface-container-low border border-outline-variant/20">
                  <span className="material-symbols-outlined text-primary text-[24px]">videocam</span>
                  <div className="flex flex-col">
                    <span className="font-label-md text-label-md font-bold text-on-surface text-xs sm:text-sm">
                      Video Concept Lecture
                    </span>
                    <p className="font-body-sm text-body-sm text-on-surface-variant text-xs">
                      High-yield conceptual walkthrough of nouns, verbs, auxiliaries, adjectives, and functional word order.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-space-xs p-space-sm rounded-xl bg-surface-container-low border border-outline-variant/20">
                  <span className="material-symbols-outlined text-secondary text-[24px]">quiz</span>
                  <div className="flex flex-col">
                    <span className="font-label-md text-label-md font-bold text-on-surface text-xs sm:text-sm">
                      Instant Auto-Drill (15 Prompts)
                    </span>
                    <p className="font-body-sm text-body-sm text-on-surface-variant text-xs">
                      100% automated instantaneous evaluation with grammar rule cross-references. No manual queues.
                    </p>
                  </div>
                </div>
              </div>

              {/* Direct Lesson Step Link */}
              <div className="flex items-center justify-between pt-space-xs border-t border-outline-variant/20">
                <span className="font-body-sm text-body-sm text-on-surface-variant text-xs">
                  No prerequisites required. Suitable for independent study.
                </span>
                <button
                  type="button"
                  onClick={handleLaunchLesson}
                  className="font-label-lg text-label-lg text-primary font-bold hover:underline inline-flex items-center gap-1 text-xs cursor-pointer"
                >
                  <span>Jump straight to Lesson 1.1 video lecture</span>
                  <span className="material-symbols-outlined text-[16px]">chevron_right</span>
                </button>
              </div>
            </section>

            {/* Right Column: Invariants & Diagnostics Overview (4 Cols) */}
            <div className="lg:col-span-4 flex flex-col gap-space-md">
              {/* Auto-Grading & Progress Standard Card */}
              <div className="bg-surface-container-lowest rounded-2xl shadow-sm p-space-lg flex flex-col gap-space-md border border-outline-variant/30">
                <div className="flex items-center gap-space-xs">
                  <span className="material-symbols-outlined text-primary text-[22px]">speed</span>
                  <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold text-sm sm:text-base">
                    Academic Invariants
                  </h3>
                </div>

                <div className="flex flex-col gap-space-sm text-xs">
                  <div className="flex items-start gap-space-xs">
                    <span className="material-symbols-outlined text-secondary text-[18px] shrink-0 mt-0.5">
                      check_circle
                    </span>
                    <div className="flex flex-col">
                      <span className="font-label-md text-label-md text-on-surface font-semibold">
                        Instant Browser Streaming
                      </span>
                      <p className="font-body-sm text-body-sm text-on-surface-variant text-[11px]">
                        Zero buffering gate. Access directly within web client without third-party plugins.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-space-xs">
                    <span className="material-symbols-outlined text-secondary text-[18px] shrink-0 mt-0.5">
                      check_circle
                    </span>
                    <div className="flex flex-col">
                      <span className="font-label-md text-label-md text-on-surface font-semibold">
                        100% Automated Feedback
                      </span>
                      <p className="font-body-sm text-body-sm text-on-surface-variant text-[11px]">
                        Immediate rule validation upon answering each diagnostic sentence prompt.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-space-xs">
                    <span className="material-symbols-outlined text-secondary text-[18px] shrink-0 mt-0.5">
                      check_circle
                    </span>
                    <div className="flex flex-col">
                      <span className="font-label-md text-label-md text-on-surface font-semibold">
                        No Financial Ledger Entry
                      </span>
                      <p className="font-body-sm text-body-sm text-on-surface-variant text-[11px]">
                        Zero payment verification, zero slips, no pending admin approval hold.
                      </p>
                    </div>
                  </div>
                </div>

                {/* SVG Ring Chart Benchmark */}
                <div className="bg-surface-container-low rounded-xl p-space-sm flex items-center justify-between gap-space-xs mt-space-2xs border border-outline-variant/20">
                  <div className="flex flex-col">
                    <span className="font-label-sm text-label-sm text-on-surface-variant uppercase text-[10px] font-bold">
                      Benchmark Target
                    </span>
                    <span className="font-headline-md text-headline-md text-primary font-bold text-lg">
                      80% Pass
                    </span>
                    <span className="font-body-sm text-body-sm text-on-surface-variant text-[11px]">
                      Auto-unlocks Module 02
                    </span>
                  </div>

                  <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 36 36">
                    <path
                      className="text-surface-container-high"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3.5"
                    ></path>
                    <path
                      className="text-primary"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="currentColor"
                      strokeDasharray="80, 100"
                      strokeLinecap="round"
                      strokeWidth="3.5"
                    ></path>
                    <text
                      className="text-[8px] font-bold fill-current text-on-surface text-anchor-middle"
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
              <div className="bg-surface-container-lowest rounded-2xl shadow-sm p-space-lg flex flex-col gap-space-xs border border-outline-variant/30">
                <h4 className="font-label-lg text-label-lg font-bold text-on-surface text-xs sm:text-sm">
                  Curriculum Flow
                </h4>
                <ol className="flex flex-col gap-space-xs font-body-sm text-body-sm text-on-surface-variant text-xs mt-1">
                  <li className="flex items-center gap-space-xs font-semibold text-primary">
                    <span className="w-5 h-5 rounded-full bg-primary text-on-primary text-[10px] font-bold flex items-center justify-center">
                      1
                    </span>
                    <span>Module 1: Parts of Speech (Open)</span>
                  </li>
                  <li className="flex items-center gap-space-xs text-on-surface">
                    <span className="w-5 h-5 rounded-full bg-surface-container-high text-on-surface text-[10px] font-bold flex items-center justify-center">
                      2
                    </span>
                    <span>Module 2: Present &amp; Past Tenses</span>
                  </li>
                  <li className="flex items-center gap-space-xs text-on-surface">
                    <span className="w-5 h-5 rounded-full bg-surface-container-high text-on-surface text-[10px] font-bold flex items-center justify-center">
                      3
                    </span>
                    <span>Module 3: Sentence Formulation</span>
                  </li>
                  <li className="flex items-center gap-space-xs text-on-surface">
                    <span className="w-5 h-5 rounded-full bg-surface-container-high text-on-surface text-[10px] font-bold flex items-center justify-center">
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
