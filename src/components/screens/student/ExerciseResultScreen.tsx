import React, { useState } from 'react';
import { ScreenId } from '../../../types/navigation';

interface ExerciseResultScreenProps {
  onNavigateScreen: (screenId: ScreenId) => void;
}

type QAState = 'passed' | 'review' | 'skeleton';

export const ExerciseResultScreen: React.FC<ExerciseResultScreenProps> = ({
  onNavigateScreen,
}) => {
  const [qaState, setQaState] = useState<QAState>('passed');
  const [expandedError, setExpandedError] = useState<number | null>(1);

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
              QA STATE PREVIEW <span className="text-[#f48fb1]">(STU-EX-02 Result Analysis Control)</span>
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2 text-xs font-bold">
            <button
              type="button"
              onClick={() => setQaState('passed')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                qaState === 'passed'
                  ? 'bg-[#f48fb1] text-white shadow-2xs'
                  : 'bg-[#fff8f8] text-[#534247] border border-[#f5e4e7] hover:bg-[#fff0f2]'
              }`}
            >
              1. Benchmark Passed (86.7%)
            </button>
            <button
              type="button"
              onClick={() => setQaState('review')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                qaState === 'review'
                  ? 'bg-[#f48fb1] text-white shadow-2xs'
                  : 'bg-[#fff8f8] text-[#534247] border border-[#f5e4e7] hover:bg-[#fff0f2]'
              }`}
            >
              2. Error Remediation Focus
            </button>
            <button
              type="button"
              onClick={() => onNavigateScreen('STU-EX-03')}
              className="px-3.5 py-1.5 rounded-full text-xs font-bold bg-[#fff0f2] text-[#964261] border border-[#f5e4e7] hover:bg-[#ffe4e9] transition-all cursor-pointer shadow-2xs flex items-center gap-1"
            >
              <span>Jump to Retry Handler</span>
              <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
            </button>
          </div>
        </div>
      </aside>

      {/* ========================================================================= */}
      {/* PATHCRUMB & SCREEN HEADER                                                 */}
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
            onClick={() => onNavigateScreen('STU-EX-01')}
            className="hover:text-[#f48fb1] transition-colors cursor-pointer"
          >
            Auto-Drill 1.1
          </button>
          <span className="text-[#f5e4e7]">/</span>
          <span className="text-[#f48fb1]">Diagnostic Debrief &amp; Result</span>
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => onNavigateScreen('STU-EX-01')}
            className="inline-flex items-center gap-1.5 text-xs font-['Quicksand'] font-bold text-[#534247] hover:text-[#22191b] cursor-pointer"
          >
            <span className="material-symbols-outlined text-[16px]">arrow_back</span>
            <span>Return to Drill Workspace</span>
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 4-METRIC SCORE COCKPIT HERO                                               */}
      {/* ========================================================================= */}
      <section className="bg-white rounded-3xl p-6 sm:p-8 border border-[#fbeaec] shadow-[0_4px_16px_rgba(244,143,177,0.12)] space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-[#f5e4e7]">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-[#e8f5e9] text-[#1b5e20] font-['Quicksand'] font-bold text-xs flex items-center gap-1 border border-[#c8e6c9]">
                <span className="material-symbols-outlined text-[16px]">check_circle</span>
                Academic Benchmark Achieved
              </span>
              <span className="text-xs text-[#534247]">Module 01 Diagnostic Checkpoint</span>
            </div>
            <h1 className="font-['Quicksand'] text-3xl sm:text-4xl text-[#22191b] font-bold">
              Diagnostic Debrief: 86.7% Score
            </h1>
            <p className="text-xs sm:text-sm text-[#534247] max-w-2xl leading-relaxed">
              Congratulations! You answered 13 out of 15 diagnostic prompts correctly, satisfying the 80% passing threshold for the Eight Parts of Speech foundational unit.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => onNavigateScreen('STU-EX-03')}
              className="btn-tactile-primary px-6 py-3 text-xs flex items-center gap-2 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">replay</span>
              <span>Configure Practice &amp; Retry</span>
            </button>
            <button
              type="button"
              onClick={() => onNavigateScreen('STU-LEARN-01')}
              className="px-5 py-3 rounded-full bg-[#fff0f2] border border-[#f5e4e7] hover:bg-[#ffe4e9] text-[#964261] font-['Quicksand'] font-bold text-xs transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <span>Continue to Syllabus Hub</span>
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </button>
          </div>
        </div>

        {/* 4 COCKPIT METRICS */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 font-['Quicksand']">
          <div className="p-5 rounded-2xl bg-[#fff8f8] border border-[#fbeaec] space-y-1 shadow-2xs">
            <span className="text-[10px] text-[#534247] uppercase font-bold tracking-wider">
              Diagnostic Accuracy
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl sm:text-3xl font-bold text-[#1b5e20]">
                86.7%
              </span>
              <span className="text-xs text-[#534247]">13 / 15 correct</span>
            </div>
            <span className="text-[11px] text-[#1b5e20] font-bold block pt-1">
              ✓ 6.7% above benchmark
            </span>
          </div>

          <div className="p-5 rounded-2xl bg-[#fff8f8] border border-[#fbeaec] space-y-1 shadow-2xs">
            <span className="text-[10px] text-[#534247] uppercase font-bold tracking-wider">
              Time Elapsed
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl sm:text-3xl font-bold text-[#22191b]">
                06:42
              </span>
              <span className="text-xs text-[#534247]">min:sec</span>
            </div>
            <span className="text-[11px] text-[#534247] block pt-1 font-medium">
              Avg 26.8s per prompt
            </span>
          </div>

          <div className="p-5 rounded-2xl bg-[#fff8f8] border border-[#fbeaec] space-y-1 shadow-2xs">
            <span className="text-[10px] text-[#534247] uppercase font-bold tracking-wider">
              Proficiency Rating
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl sm:text-3xl font-bold text-[#f48fb1]">
                CEFR A2
              </span>
              <span className="text-xs text-[#534247]">Competent</span>
            </div>
            <span className="text-[11px] text-[#534247] block pt-1 font-medium">
              Syntactic alignment verified
            </span>
          </div>

          <div className="p-5 rounded-2xl bg-[#fff8f8] border border-[#fbeaec] space-y-1 shadow-2xs">
            <span className="text-[10px] text-[#534247] uppercase font-bold tracking-wider">
              Downstream Status
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl sm:text-3xl font-bold text-[#006685]">
                Unlocked
              </span>
              <span className="text-xs text-[#534247]">Lesson 1.2</span>
            </div>
            <span className="text-[11px] text-[#006685] font-bold block pt-1">
              Direct progression active
            </span>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 7-CATEGORY PERFORMANCE MATRIX & ERROR REMEDIATION                         */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 font-['Quicksand']">
        {/* Left Column: 7 Categories Matrix (7 Cols) */}
        <section className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-7 border border-[#fbeaec] shadow-[0_4px_16px_rgba(244,143,177,0.12)] space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-[#f5e4e7]">
            <h2 className="font-bold text-base text-[#22191b] flex items-center gap-2">
              <span className="material-symbols-outlined text-[#f48fb1] text-[20px]">category</span>
              <span>7-Category Syntactic Performance Matrix</span>
            </h2>
            <span className="text-xs text-[#964261] font-bold px-2.5 py-0.5 rounded-full bg-[#fff0f2] border border-[#f5e4e7]">
              2 flagged
            </span>
          </div>

          <div className="space-y-3">
            {[
              { name: '1. Nouns & Subject Complements', score: '3/3', pct: 100, pass: true },
              { name: '2. Verbs & Finite Predicates', score: '3/3', pct: 100, pass: true },
              { name: '3. Adverbs of Manner & Degree', score: '2/3', pct: 67, pass: false, flagged: true },
              { name: '4. Adjectives & Quantifiers', score: '2/3', pct: 67, pass: false, flagged: true },
              { name: '5. Pronoun Antecedent Agreement', score: '2/2', pct: 100, pass: true },
              { name: '6. Prepositions & Locative Phrases', score: '1/1', pct: 100, pass: true },
              { name: '7. Conjunctions & Clause Links', score: '1/1', pct: 100, pass: true },
            ].map((cat, idx) => (
              <div
                key={idx}
                className={`p-4 rounded-2xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs shadow-2xs ${
                  cat.flagged
                    ? 'border-amber-200 bg-amber-50/60'
                    : 'border-[#fbeaec] bg-[#fff8f8]'
                }`}
              >
                <div className="space-y-1.5 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-[#22191b]">{cat.name}</span>
                    {cat.flagged && (
                      <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 text-[10px] font-bold">
                        Remediation Needed
                      </span>
                    )}
                  </div>
                  <div className="w-full max-w-md bg-white h-2 rounded-full overflow-hidden border border-[#f5e4e7]">
                    <div
                      className={`h-full rounded-full ${
                        cat.pass ? 'bg-[#a5d6a7]' : 'bg-[#ffe082]'
                      }`}
                      style={{ width: `${cat.pct}%` }}
                    ></div>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <span className="font-bold text-[#22191b]">{cat.score}</span>
                  <span
                    className={`font-bold ${
                      cat.pass ? 'text-[#1b5e20]' : 'text-amber-800'
                    }`}
                  >
                    {cat.pct}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Right Column: Burmese Error Remediation Notes (5 Cols) */}
        <section className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-7 border border-[#fbeaec] shadow-[0_4px_16px_rgba(244,143,177,0.12)] space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-[#f5e4e7]">
            <h2 className="font-bold text-base text-[#22191b] flex items-center gap-2">
              <span className="material-symbols-outlined text-[#f48fb1] text-[20px]">
                psychology
              </span>
              <span>Pedagogical Error Remediation</span>
            </h2>
            <span className="text-xs text-[#964261] font-bold px-2.5 py-0.5 rounded-full bg-[#fff0f2] border border-[#f5e4e7]">
              2 Flagged
            </span>
          </div>

          <div className="space-y-4 text-xs font-['Quicksand']">
            {/* Flagged Item 1 */}
            <div className="p-4 rounded-2xl border border-amber-200 bg-amber-50/50 space-y-2.5 shadow-2xs">
              <div className="flex items-center justify-between">
                <span className="font-bold text-[#22191b]">
                  Prompt #8: &quot;hardly&quot; in negative polarity
                </span>
                <span className="px-2 py-0.5 rounded-full bg-red-100 text-red-700 text-[10px] font-bold">
                  Selected: Adjective
                </span>
              </div>
              <p className="text-[#534247] font-['Nunito_Sans']">
                Sentence: <em>&quot;He hardly arrived before the lecture commenced.&quot;</em>
              </p>
              <div className="p-3 rounded-xl bg-white border border-amber-200/60 text-[#22191b] space-y-1">
                <span className="font-bold text-[#f48fb1] block">မြန်မာပြန်ရှင်းလင်းချက်:</span>
                <p className="leading-relaxed text-[11px] text-[#534247] font-['Nunito_Sans']">
                  &quot;hardly&quot; သည် &quot;ခဲယဉ်းသော&quot; ဟု အဓိပ္ပာယ်ရသော နာမဝိသေသန မဟုတ်ဘဲ &quot;မ...သလောက်ပင်&quot; ဟု ကြိယာကို အထူးပြုသော အငြင်းသဘောဆောင် ကြိယာဝိသေသန (Adverb of Degree) ဖြစ်ပါသည်။
                </p>
              </div>
            </div>

            {/* Flagged Item 2 */}
            <div className="p-4 rounded-2xl border border-amber-200 bg-amber-50/50 space-y-2.5 shadow-2xs">
              <div className="flex items-center justify-between">
                <span className="font-bold text-[#22191b]">
                  Prompt #11: &quot;fast&quot; functioning as adverb vs adjective
                </span>
                <span className="px-2 py-0.5 rounded-full bg-red-100 text-red-700 text-[10px] font-bold">
                  Selected: Adjective
                </span>
              </div>
              <p className="text-[#534247] font-['Nunito_Sans']">
                Sentence: <em>&quot;The express train travels remarkably fast.&quot;</em>
              </p>
              <div className="p-3 rounded-xl bg-white border border-amber-200/60 text-[#22191b] space-y-1">
                <span className="font-bold text-[#f48fb1] block">မြန်မာပြန်ရှင်းလင်းချက်:</span>
                <p className="leading-relaxed text-[11px] text-[#534247] font-['Nunito_Sans']">
                  &quot;fast&quot; သည် စာလုံးပေါင်းတူသော်လည်း ဤနေရာတွင် &quot;travels&quot; (ကြိယာ) ကို အထူးပြုနေသောကြောင့် Adverb of Manner ဖြစ်ပါသည်။ &quot;fastly&quot; ဟူသော စကားလုံး အင်္ဂလိပ်သဒ္ဒါတွင် မရှိပါ။
                </p>
              </div>
            </div>

            {/* Targeted Action */}
            <div className="pt-2">
              <button
                type="button"
                onClick={() => onNavigateScreen('STU-EX-03')}
                className="w-full btn-tactile-primary py-3 text-xs cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Retry Only 2 Flagged Prompts</span>
                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
