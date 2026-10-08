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
    <div className="flex flex-col w-full space-y-6 font-['Nunito_Sans']">
      {/* ========================================================================= */}
      {/* QA STATE PREVIEW BAR                                                      */}
      {/* ========================================================================= */}
      <aside
        aria-label="Developer Inspection Toolbar"
        className="w-full bg-white text-[#22191b] px-5 py-3 rounded-2xl shadow-sm border border-[#fbeaec]"
      >
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-3 font-['Quicksand']">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-[#f48fb1] text-white text-[11px] font-bold shadow-2xs">
              <span className="material-symbols-outlined text-[14px]">tune</span>
            </span>
            <span className="uppercase tracking-wider text-[#534247] font-bold text-[11px]">
              QA STATE PREVIEW <span className="text-[#f48fb1]">(STU-EX-03 Retry Handler Control)</span>
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2 text-xs font-bold">
            <button
              type="button"
              onClick={() => {
                setQaState('targeted');
                setSelectedScope('targeted');
              }}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                qaState === 'targeted'
                  ? 'bg-[#f48fb1] text-white shadow-2xs'
                  : 'bg-[#fff8f8] text-[#534247] border border-[#f5e4e7] hover:bg-[#fff0f2]'
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
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                qaState === 'full'
                  ? 'bg-[#f48fb1] text-white shadow-2xs'
                  : 'bg-[#fff8f8] text-[#534247] border border-[#f5e4e7] hover:bg-[#fff0f2]'
              }`}
            >
              2. Full 15-Item Re-Assessment
            </button>
            <button
              type="button"
              onClick={() => onNavigateScreen('STU-EX-02')}
              className="px-3.5 py-1.5 rounded-full text-xs font-bold bg-[#fff0f2] text-[#964261] border border-[#f5e4e7] hover:bg-[#ffe4e9] transition-all cursor-pointer shadow-2xs flex items-center gap-1"
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
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 bg-white p-4 sm:p-5 rounded-2xl border border-[#fbeaec] shadow-sm">
        <nav
          aria-label="Breadcrumbs"
          className="flex items-center flex-wrap gap-2 text-xs text-[#534247] font-['Quicksand'] font-bold"
        >
          <button
            type="button"
            onClick={() => onNavigateScreen('PUB-02-COURSES')}
            className="hover:text-[#f48fb1] transition-colors cursor-pointer"
          >
            Courses
          </button>
          <span className="text-[#f5e4e7]">/</span>
          <button
            type="button"
            onClick={() => onNavigateScreen('PUB-03-COURSE-DETAIL')}
            className="hover:text-[#f48fb1] transition-colors cursor-pointer"
          >
            Essential Grammar
          </button>
          <span className="text-[#f5e4e7]">/</span>
          <button
            type="button"
            onClick={() => onNavigateScreen('STU-LEARN-01')}
            className="hover:text-[#f48fb1] transition-colors cursor-pointer"
          >
            Module 01
          </button>
          <span className="text-[#f5e4e7]">/</span>
          <button
            type="button"
            onClick={() => onNavigateScreen('STU-EX-02')}
            className="hover:text-[#f48fb1] transition-colors cursor-pointer"
          >
            Debrief Results
          </button>
          <span className="text-[#f5e4e7]">/</span>
          <span className="text-[#f48fb1]">Practice Scope Configuration</span>
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => onNavigateScreen('STU-EX-02')}
            className="inline-flex items-center gap-1.5 text-xs font-['Quicksand'] font-bold text-[#534247] hover:text-[#22191b] cursor-pointer"
          >
            <span className="material-symbols-outlined text-[16px]">arrow_back</span>
            <span>Return to Results</span>
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* MAIN RETRY CONFIGURATION WORKSPACE                                        */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 font-['Quicksand']">
        {/* Left Column: Scope Selector & Mode Parameters (8 Cols) */}
        <div className="lg:col-span-8 space-y-6">
          <section className="bg-white rounded-3xl p-6 sm:p-8 border border-[#fbeaec] shadow-[0_4px_16px_rgba(244,143,177,0.12)] space-y-6">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-[#fff0f2] text-[#964261] border border-[#f5e4e7] text-[10px] font-bold uppercase tracking-wider">
                  Non-Punitive Practice Mode
                </span>
                <span className="text-xs text-[#534247]">Highest score retained</span>
              </div>
              <h1 className="text-2xl sm:text-3xl text-[#22191b] font-bold">
                Configure Practice Scope
              </h1>
              <p className="text-xs sm:text-sm text-[#534247] font-['Nunito_Sans']">
                Select whether to reinforce exclusively the concepts you missed, or re-attempt the entire 15-prompt diagnostic battery.
              </p>
            </div>

            {/* Scope Cards */}
            <div className="space-y-3">
              <span className="text-xs font-bold text-[#22191b] uppercase tracking-wider block">
                Select Practice Cohort
              </span>

              {/* Option A: Targeted Remediation (Recommended) */}
              <div
                onClick={() => setSelectedScope('targeted')}
                className={`p-5 rounded-3xl border transition-all cursor-pointer flex items-start gap-4 ${
                  selectedScope === 'targeted'
                    ? 'border-[#f48fb1] bg-[#fff8f8] shadow-sm ring-2 ring-[#ffd9e2]'
                    : 'border-[#fbeaec] bg-white hover:border-[#f48fb1]/50'
                }`}
              >
                <div className="pt-0.5">
                  <span
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      selectedScope === 'targeted'
                        ? 'border-[#f48fb1] bg-[#f48fb1]'
                        : 'border-[#d8c1c6] bg-white'
                    }`}
                  >
                    {selectedScope === 'targeted' && (
                      <span className="w-2 h-2 rounded-full bg-white"></span>
                    )}
                  </span>
                </div>

                <div className="flex-1 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm text-[#22191b] flex items-center gap-2">
                      <span>Targeted Remediation Mode (2 Prompts)</span>
                      <span className="px-2.5 py-0.5 rounded-full bg-[#e8f5e9] text-[#1b5e20] text-[10px] font-bold border border-[#c8e6c9]">
                        Recommended
                      </span>
                    </span>
                    <span className="text-xs font-bold text-[#f48fb1]">~2 Mins</span>
                  </div>
                  <p className="text-xs text-[#534247] font-['Nunito_Sans'] leading-relaxed">
                    Practice only the 2 items you missed in the previous attempt (Prompt #8 &quot;hardly&quot; and Prompt #11 &quot;fast&quot;). Eliminates repetitive drills on mastered categories.
                  </p>
                  <div className="pt-1 flex flex-wrap gap-2 text-[11px] text-[#534247]">
                    <span className="px-3 py-1 rounded-full bg-white border border-[#f5e4e7] shadow-2xs">
                      • Adverbs of Manner &amp; Degree
                    </span>
                    <span className="px-3 py-1 rounded-full bg-white border border-[#f5e4e7] shadow-2xs">
                      • Adverb vs Adjective Differentiation
                    </span>
                  </div>
                </div>
              </div>

              {/* Option B: Full Battery Re-Assessment */}
              <div
                onClick={() => setSelectedScope('full')}
                className={`p-5 rounded-3xl border transition-all cursor-pointer flex items-start gap-4 ${
                  selectedScope === 'full'
                    ? 'border-[#f48fb1] bg-[#fff8f8] shadow-sm ring-2 ring-[#ffd9e2]'
                    : 'border-[#fbeaec] bg-white hover:border-[#f48fb1]/50'
                }`}
              >
                <div className="pt-0.5">
                  <span
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      selectedScope === 'full'
                        ? 'border-[#f48fb1] bg-[#f48fb1]'
                        : 'border-[#d8c1c6] bg-white'
                    }`}
                  >
                    {selectedScope === 'full' && (
                      <span className="w-2 h-2 rounded-full bg-white"></span>
                    )}
                  </span>
                </div>

                <div className="flex-1 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm text-[#22191b]">
                      Comprehensive Battery (Full 15 Prompts)
                    </span>
                    <span className="text-xs font-bold text-[#534247]">~10 Mins</span>
                  </div>
                  <p className="text-xs text-[#534247] font-['Nunito_Sans'] leading-relaxed">
                    Retake the complete set of 15 diagnostic questions across all 8 parts of speech. Ideal if you wish to verify speed and reach 100% mastery.
                  </p>
                </div>
              </div>
            </div>

            {/* Practice Parameters Toggles */}
            <div className="space-y-3 pt-3 border-t border-[#f5e4e7]">
              <span className="text-xs font-bold text-[#22191b] uppercase tracking-wider block">
                Assistance &amp; Pacing Settings
              </span>

              <div className="space-y-2 text-xs">
                <label className="flex items-center justify-between p-4 rounded-2xl bg-[#fff8f8] border border-[#fbeaec] cursor-pointer hover:bg-[#fff0f2] transition-colors">
                  <div className="space-y-0.5">
                    <span className="font-bold text-[#22191b] block">
                      Enable Instant Hints &amp; Clues
                    </span>
                    <span className="text-[#534247] text-[11px] block font-['Nunito_Sans']">
                      Allows toggling syntactic clues before selecting an option
                    </span>
                  </div>
                  <input
                    type="checkbox"
                    checked={enableInstantHints}
                    onChange={(e) => setEnableInstantHints(e.target.checked)}
                    className="w-4 h-4 accent-[#f48fb1] rounded cursor-pointer"
                  />
                </label>

                <label className="flex items-center justify-between p-4 rounded-2xl bg-[#fff8f8] border border-[#fbeaec] cursor-pointer hover:bg-[#fff0f2] transition-colors">
                  <div className="space-y-0.5">
                    <span className="font-bold text-[#22191b] block">
                      Burmese Language Pedagogical Glosses (မြန်မာပြန်)
                    </span>
                    <span className="text-[#534247] text-[11px] block font-['Nunito_Sans']">
                      Display Burmese grammatical explanations alongside English rules
                    </span>
                  </div>
                  <input
                    type="checkbox"
                    checked={enableBurmeseNotes}
                    onChange={(e) => setEnableBurmeseNotes(e.target.checked)}
                    className="w-4 h-4 accent-[#f48fb1] rounded cursor-pointer"
                  />
                </label>

                <label className="flex items-center justify-between p-4 rounded-2xl bg-[#fff8f8] border border-[#fbeaec] cursor-pointer hover:bg-[#fff0f2] transition-colors">
                  <div className="space-y-0.5">
                    <span className="font-bold text-[#22191b] block">
                      Shuffle Prompt Presentation Order
                    </span>
                    <span className="text-[#534247] text-[11px] block font-['Nunito_Sans']">
                      Presents questions in randomized sequence to verify true conceptual mastery
                    </span>
                  </div>
                  <input
                    type="checkbox"
                    checked={shuffleOrder}
                    onChange={(e) => setShuffleOrder(e.target.checked)}
                    className="w-4 h-4 accent-[#f48fb1] rounded cursor-pointer"
                  />
                </label>
              </div>
            </div>

            {/* Launch Buttons */}
            <div className="pt-4 border-t border-[#f5e4e7] flex flex-wrap items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => onNavigateScreen('STU-EX-02')}
                className="text-xs text-[#534247] hover:text-[#22191b] font-bold cursor-pointer"
              >
                Cancel and return to Score Debrief
              </button>

              <button
                type="button"
                onClick={handleLaunchPractice}
                className="btn-tactile-primary px-7 py-3 text-xs flex items-center gap-2 cursor-pointer"
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
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#fbeaec] shadow-[0_4px_16px_rgba(244,143,177,0.12)] space-y-4">
            <h3 className="font-bold text-sm text-[#22191b] flex items-center gap-2">
              <span className="material-symbols-outlined text-[#f48fb1] text-[20px]">
                bookmark_added
              </span>
              <span>Baseline Memory Retention</span>
            </h3>

            <div className="p-4 rounded-2xl bg-[#fff8f8] border border-[#fbeaec] space-y-2.5 text-xs shadow-2xs">
              <div className="flex items-center justify-between">
                <span className="text-[#534247]">Previous Attempt Score:</span>
                <span className="font-bold text-[#1b5e20]">86.7% (13/15)</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#534247]">Required Benchmark:</span>
                <span className="font-bold text-[#22191b]">80.0%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#534247]">Benchmark Status:</span>
                <span className="px-2.5 py-0.5 rounded-full bg-[#e8f5e9] text-[#1b5e20] font-bold text-[10px] border border-[#c8e6c9]">
                  PASSED
                </span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-[#fff0f2] border border-[#fbeaec] space-y-1 text-xs">
              <span className="font-bold text-[#964261] flex items-center gap-1">
                <span className="material-symbols-outlined text-[16px]">verified</span>
                Non-Punitive Invariant:
              </span>
              <p className="text-[#534247] font-['Nunito_Sans'] leading-relaxed text-[11px]">
                Under Teacher Theint&apos;s academic standard, practice retries can only augment your diagnostic mastery. Your highest recorded score (86.7%) is permanently indexed and cannot be diminished by practice runs.
              </p>
            </div>
          </div>

          {/* Quick Route Shortcuts */}
          <div className="bg-[#fff8f8] rounded-3xl p-6 border border-[#fbeaec] space-y-3.5 text-xs">
            <span className="text-[11px] text-[#534247] uppercase font-bold tracking-wider block">
              Navigation Dispatches
            </span>
            <div className="space-y-2">
              <button
                type="button"
                onClick={() => onNavigateScreen('STU-LESSON-01')}
                className="w-full p-3.5 rounded-2xl bg-white border border-[#f5e4e7] hover:bg-[#fff0f2] text-[#22191b] font-bold text-left transition-colors flex items-center justify-between cursor-pointer shadow-2xs"
              >
                <span>Rewatch Lesson 1.1 Video Lecture</span>
                <span className="material-symbols-outlined text-[16px] text-[#f48fb1]">play_circle</span>
              </button>

              <button
                type="button"
                onClick={() => onNavigateScreen('STU-LEARN-01')}
                className="w-full p-3.5 rounded-2xl bg-white border border-[#f5e4e7] hover:bg-[#fff0f2] text-[#22191b] font-bold text-left transition-colors flex items-center justify-between cursor-pointer shadow-2xs"
              >
                <span>Return to Syllabus Dashboard</span>
                <span className="material-symbols-outlined text-[16px] text-[#81d4fa]">dashboard</span>
              </button>

              <button
                type="button"
                onClick={() => onNavigateScreen('STU-FREE-01')}
                className="w-full p-3.5 rounded-2xl bg-white border border-[#f5e4e7] hover:bg-[#fff0f2] text-[#22191b] font-bold text-left transition-colors flex items-center justify-between cursor-pointer shadow-2xs"
              >
                <span>Free Access Direct Gateway</span>
                <span className="material-symbols-outlined text-[16px] text-[#a5d6a7]">lock_open</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
