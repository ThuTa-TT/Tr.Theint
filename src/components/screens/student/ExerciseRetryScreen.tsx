import React, { useState } from 'react';
import { ScreenId } from '../../../types/navigation';

interface ExerciseRetryScreenProps {
  onNavigateScreen: (screenId: ScreenId) => void;
}

type QAState = 'targeted' | 'full' | 'summary';

export const ExerciseRetryScreen: React.FC<ExerciseRetryScreenProps> = ({
  onNavigateScreen,
}) => {
  const [qaState, setQaState] = useState<QAState>('targeted');
  const [selectedScope, setSelectedScope] = useState<'targeted' | 'full'>('targeted');
  const [enableInstantHints, setEnableInstantHints] = useState<boolean>(true);
  const [enableBurmeseNotes, setEnableBurmeseNotes] = useState<boolean>(true);
  const [shuffleOrder, setShuffleOrder] = useState<boolean>(false);

  const handleLaunchPractice = () => {
    onNavigateScreen('STU-EX-01');
  };

  return (
    <div className="flex flex-col w-full space-y-6">
      {/* ========================================================================= */}
      {/* QA STATE PREVIEW BAR                                                      */}
      {/* ========================================================================= */}
      <aside
        aria-label="Developer Inspection Toolbar"
        className="w-full bg-[#FCFAF9] text-[#2D2529] px-4 py-2.5 rounded-xl shadow-xs border border-[#E9DDE1]"
      >
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-[#B75E78] text-white text-[10px] font-bold">
              <span className="material-symbols-outlined text-[13px]">tune</span>
            </span>
            <span className="uppercase tracking-wider text-[#766A70] font-bold text-[11px]">
              QA STATE PREVIEW <span className="text-[#B75E78]">(STU-EX-03 Retry Handler Control)</span>
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-1.5 text-xs">
            <button
              type="button"
              onClick={() => {
                setQaState('targeted');
                setSelectedScope('targeted');
              }}
              className={`px-3 py-1 rounded text-xs font-semibold transition-colors cursor-pointer ${
                qaState === 'targeted'
                  ? 'bg-[#B75E78] text-white font-bold shadow-xs'
                  : 'bg-white text-[#766A70] border border-[#E9DDE1] hover:bg-[#F7F1F3]'
              }`}
            >
              1. Targeted Remediation (2 Prompts)
            </button>
            <button
              type="button"
              onClick={() => {
                setQaState('full');
                setSelectedScope('full');
              }}
              className={`px-3 py-1 rounded text-xs font-semibold transition-colors cursor-pointer ${
                qaState === 'full'
                  ? 'bg-[#B75E78] text-white font-bold shadow-xs'
                  : 'bg-white text-[#766A70] border border-[#E9DDE1] hover:bg-[#F7F1F3]'
              }`}
            >
              2. Full 15-Item Re-Assessment
            </button>
            <button
              type="button"
              onClick={() => onNavigateScreen('STU-EX-02')}
              className="px-3 py-1 rounded text-xs font-semibold bg-white border border-[#E9DDE1] text-[#2D2529] hover:bg-[#F7F1F3] transition-colors cursor-pointer flex items-center gap-1"
            >
              <span className="material-symbols-outlined text-[14px]">arrow_back</span>
              <span>Back to STU-EX-02 Results</span>
            </button>
          </div>
        </div>
      </aside>

      {/* ========================================================================= */}
      {/* PATHCRUMB & NAVIGATION BAR                                                */}
      {/* ========================================================================= */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 bg-white p-4 rounded-xl border border-[#E9DDE1] shadow-xs">
        <nav
          aria-label="Breadcrumbs"
          className="flex items-center flex-wrap gap-1.5 text-xs text-[#766A70]"
        >
          <button
            type="button"
            onClick={() => onNavigateScreen('PUB-02-COURSES')}
            className="hover:text-[#B75E78] transition-colors cursor-pointer"
          >
            Courses
          </button>
          <span className="text-[#E9DDE1]">/</span>
          <button
            type="button"
            onClick={() => onNavigateScreen('PUB-03-COURSE-DETAIL')}
            className="hover:text-[#B75E78] transition-colors cursor-pointer"
          >
            Essential Grammar
          </button>
          <span className="text-[#E9DDE1]">/</span>
          <button
            type="button"
            onClick={() => onNavigateScreen('STU-LEARN-01')}
            className="hover:text-[#B75E78] transition-colors cursor-pointer"
          >
            Module 01
          </button>
          <span className="text-[#E9DDE1]">/</span>
          <button
            type="button"
            onClick={() => onNavigateScreen('STU-EX-02')}
            className="hover:text-[#B75E78] transition-colors cursor-pointer"
          >
            Debrief Results
          </button>
          <span className="text-[#E9DDE1]">/</span>
          <span className="text-[#B75E78] font-bold">Practice Scope Configuration</span>
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => onNavigateScreen('STU-EX-02')}
            className="inline-flex items-center gap-1 text-xs font-bold text-[#766A70] hover:text-[#2D2529] cursor-pointer"
          >
            <span className="material-symbols-outlined text-[16px]">arrow_back</span>
            <span>Return to Results</span>
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* MAIN RETRY CONFIGURATION WORKSPACE                                        */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Scope Selector & Mode Parameters (8 Cols) */}
        <div className="lg:col-span-8 space-y-6">
          <section className="bg-white rounded-2xl p-6 sm:p-8 border border-[#E9DDE1] shadow-xs space-y-6">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-[#F3DDE3] text-[#B75E78] text-[10px] font-bold uppercase tracking-wider">
                  Non-Punitive Practice Mode
                </span>
                <span className="text-xs text-[#766A70]">Highest score retained</span>
              </div>
              <h1 className="font-serif text-2xl sm:text-3xl text-[#2D2529] font-bold">
                Configure Practice Scope
              </h1>
              <p className="text-xs sm:text-sm text-[#766A70]">
                Select whether to reinforce exclusively the concepts you missed, or re-attempt the entire 15-prompt diagnostic battery.
              </p>
            </div>

            {/* Scope Cards */}
            <div className="space-y-3">
              <span className="text-xs font-bold text-[#2D2529] uppercase tracking-wider block">
                Select Practice Cohort
              </span>

              {/* Option A: Targeted Remediation (Recommended) */}
              <div
                onClick={() => setSelectedScope('targeted')}
                className={`p-5 rounded-2xl border transition-all cursor-pointer flex items-start gap-4 ${
                  selectedScope === 'targeted'
                    ? 'border-[#B75E78] bg-[#FDF7F9] shadow-xs ring-1 ring-[#B75E78]'
                    : 'border-[#E9DDE1] bg-white hover:border-[#B75E78]/40'
                }`}
              >
                <div className="pt-0.5">
                  <span
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      selectedScope === 'targeted'
                        ? 'border-[#B75E78] bg-[#B75E78]'
                        : 'border-[#766A70] bg-white'
                    }`}
                  >
                    {selectedScope === 'targeted' && (
                      <span className="w-2 h-2 rounded-full bg-white"></span>
                    )}
                  </span>
                </div>

                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm text-[#2D2529] flex items-center gap-2">
                      <span>Targeted Remediation Mode (2 Prompts)</span>
                      <span className="px-2 py-0.5 rounded bg-[#6F9D83] text-white text-[10px] font-bold">
                        Recommended
                      </span>
                    </span>
                    <span className="text-xs font-bold text-[#B75E78]">~2 Mins</span>
                  </div>
                  <p className="text-xs text-[#766A70] leading-relaxed">
                    Practice only the 2 items you missed in the previous attempt (Prompt #8 &quot;hardly&quot; and Prompt #11 &quot;fast&quot;). Eliminates repetitive drills on mastered categories.
                  </p>
                  <div className="pt-2 flex flex-wrap gap-1.5 text-[11px] text-[#766A70]">
                    <span className="px-2 py-0.5 rounded bg-white border border-[#E9DDE1]">
                      • Adverbs of Manner &amp; Degree
                    </span>
                    <span className="px-2 py-0.5 rounded bg-white border border-[#E9DDE1]">
                      • Adverb vs Adjective Differentiation
                    </span>
                  </div>
                </div>
              </div>

              {/* Option B: Full Battery Re-Assessment */}
              <div
                onClick={() => setSelectedScope('full')}
                className={`p-5 rounded-2xl border transition-all cursor-pointer flex items-start gap-4 ${
                  selectedScope === 'full'
                    ? 'border-[#B75E78] bg-[#FDF7F9] shadow-xs ring-1 ring-[#B75E78]'
                    : 'border-[#E9DDE1] bg-white hover:border-[#B75E78]/40'
                }`}
              >
                <div className="pt-0.5">
                  <span
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      selectedScope === 'full'
                        ? 'border-[#B75E78] bg-[#B75E78]'
                        : 'border-[#766A70] bg-white'
                    }`}
                  >
                    {selectedScope === 'full' && (
                      <span className="w-2 h-2 rounded-full bg-white"></span>
                    )}
                  </span>
                </div>

                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm text-[#2D2529]">
                      Comprehensive Battery (Full 15 Prompts)
                    </span>
                    <span className="text-xs font-bold text-[#766A70]">~10 Mins</span>
                  </div>
                  <p className="text-xs text-[#766A70] leading-relaxed">
                    Retake the complete set of 15 diagnostic questions across all 8 parts of speech. Ideal if you wish to verify speed and reach 100% mastery.
                  </p>
                </div>
              </div>
            </div>

            {/* Practice Parameters Toggles */}
            <div className="space-y-3 pt-3 border-t border-[#E9DDE1]">
              <span className="text-xs font-bold text-[#2D2529] uppercase tracking-wider block">
                Assistance &amp; Pacing Settings
              </span>

              <div className="space-y-2 text-xs">
                <label className="flex items-center justify-between p-3.5 rounded-xl bg-[#FCFAF9] border border-[#E9DDE1] cursor-pointer hover:bg-[#F7F1F3]">
                  <div className="space-y-0.5">
                    <span className="font-bold text-[#2D2529] block">
                      Enable Instant Hints &amp; Clues
                    </span>
                    <span className="text-[#766A70] text-[11px] block">
                      Allows toggling syntactic clues before selecting an option
                    </span>
                  </div>
                  <input
                    type="checkbox"
                    checked={enableInstantHints}
                    onChange={(e) => setEnableInstantHints(e.target.checked)}
                    className="w-4 h-4 accent-[#B75E78] rounded cursor-pointer"
                  />
                </label>

                <label className="flex items-center justify-between p-3.5 rounded-xl bg-[#FCFAF9] border border-[#E9DDE1] cursor-pointer hover:bg-[#F7F1F3]">
                  <div className="space-y-0.5">
                    <span className="font-bold text-[#2D2529] block">
                      Burmese Language Pedagogical Glosses (မြန်မာပြန်)
                    </span>
                    <span className="text-[#766A70] text-[11px] block">
                      Display Burmese grammatical explanations alongside English rules
                    </span>
                  </div>
                  <input
                    type="checkbox"
                    checked={enableBurmeseNotes}
                    onChange={(e) => setEnableBurmeseNotes(e.target.checked)}
                    className="w-4 h-4 accent-[#B75E78] rounded cursor-pointer"
                  />
                </label>

                <label className="flex items-center justify-between p-3.5 rounded-xl bg-[#FCFAF9] border border-[#E9DDE1] cursor-pointer hover:bg-[#F7F1F3]">
                  <div className="space-y-0.5">
                    <span className="font-bold text-[#2D2529] block">
                      Shuffle Prompt Presentation Order
                    </span>
                    <span className="text-[#766A70] text-[11px] block">
                      Presents questions in randomized sequence to verify true conceptual mastery
                    </span>
                  </div>
                  <input
                    type="checkbox"
                    checked={shuffleOrder}
                    onChange={(e) => setShuffleOrder(e.target.checked)}
                    className="w-4 h-4 accent-[#B75E78] rounded cursor-pointer"
                  />
                </label>
              </div>
            </div>

            {/* Launch Buttons */}
            <div className="pt-4 border-t border-[#E9DDE1] flex flex-wrap items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => onNavigateScreen('STU-EX-02')}
                className="text-xs text-[#766A70] hover:text-[#2D2529] font-bold cursor-pointer"
              >
                Cancel and return to Score Debrief
              </button>

              <button
                type="button"
                onClick={handleLaunchPractice}
                className="px-6 py-3 rounded-lg bg-[#B75E78] hover:bg-[#93415a] text-white font-bold text-xs shadow-xs transition-colors flex items-center gap-2 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">play_circle</span>
                <span>
                  Launch {selectedScope === 'targeted' ? 'Targeted Drill (2 Items)' : 'Full 15-Item Battery'}
                </span>
              </button>
            </div>
          </section>
        </div>

        {/* Right Column: Baseline Score Memory & Retention (4 Cols) */}
        <div className="lg:col-span-4 space-y-6">
          {/* Baseline Memory Card */}
          <div className="bg-white rounded-2xl p-6 border border-[#E9DDE1] shadow-xs space-y-4">
            <h3 className="font-bold text-sm text-[#2D2529] flex items-center gap-2">
              <span className="material-symbols-outlined text-[#B75E78] text-[20px]">
                bookmark_added
              </span>
              <span>Baseline Memory Retention</span>
            </h3>

            <div className="p-4 rounded-xl bg-[#FCFAF9] border border-[#E9DDE1] space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-[#766A70]">Previous Attempt Score:</span>
                <span className="font-bold text-[#6F9D83]">86.7% (13/15)</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#766A70]">Required Benchmark:</span>
                <span className="font-bold text-[#2D2529]">80.0%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#766A70]">Benchmark Status:</span>
                <span className="px-2 py-0.5 rounded bg-[#F1F7F4] text-[#6F9D83] font-bold text-[10px]">
                  PASSED
                </span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-[#FDF7F9] border border-[#D8899D]/30 space-y-1 text-xs">
              <span className="font-bold text-[#B75E78] flex items-center gap-1">
                <span className="material-symbols-outlined text-[16px]">verified</span>
                Non-Punitive Invariant:
              </span>
              <p className="text-[#766A70] leading-relaxed text-[11px]">
                Under Teacher Theint&apos;s academic standard, practice retries can only augment your diagnostic mastery. Your highest recorded score (86.7%) is permanently indexed and cannot be diminished by practice runs.
              </p>
            </div>
          </div>

          {/* Quick Route Shortcuts */}
          <div className="bg-[#FCFAF9] rounded-2xl p-6 border border-[#E9DDE1] space-y-3 text-xs">
            <span className="text-[10px] text-[#766A70] uppercase font-bold tracking-wider block">
              Navigation Dispatches
            </span>
            <div className="space-y-2">
              <button
                type="button"
                onClick={() => onNavigateScreen('STU-LESSON-01')}
                className="w-full p-3 rounded-lg bg-white border border-[#E9DDE1] hover:bg-[#F7F1F3] text-[#2D2529] font-bold text-left transition-colors flex items-center justify-between cursor-pointer"
              >
                <span>Rewatch Lesson 1.1 Video Lecture</span>
                <span className="material-symbols-outlined text-[16px] text-[#B75E78]">play_circle</span>
              </button>

              <button
                type="button"
                onClick={() => onNavigateScreen('STU-LEARN-01')}
                className="w-full p-3 rounded-lg bg-white border border-[#E9DDE1] hover:bg-[#F7F1F3] text-[#2D2529] font-bold text-left transition-colors flex items-center justify-between cursor-pointer"
              >
                <span>Return to Syllabus Dashboard</span>
                <span className="material-symbols-outlined text-[16px] text-[#B75E78]">dashboard</span>
              </button>

              <button
                type="button"
                onClick={() => onNavigateScreen('STU-FREE-01')}
                className="w-full p-3 rounded-lg bg-white border border-[#E9DDE1] hover:bg-[#F7F1F3] text-[#2D2529] font-bold text-left transition-colors flex items-center justify-between cursor-pointer"
              >
                <span>Free Access Direct Gateway</span>
                <span className="material-symbols-outlined text-[16px] text-[#B75E78]">lock_open</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
