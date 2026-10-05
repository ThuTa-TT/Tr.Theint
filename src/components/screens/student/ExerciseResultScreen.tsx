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
              QA STATE PREVIEW <span className="text-[#B75E78]">(STU-EX-02 Result Analysis Control)</span>
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-1.5 text-xs">
            <button
              type="button"
              onClick={() => setQaState('passed')}
              className={`px-3 py-1 rounded text-xs font-semibold transition-colors cursor-pointer ${
                qaState === 'passed'
                  ? 'bg-[#B75E78] text-white font-bold shadow-xs'
                  : 'bg-white text-[#766A70] border border-[#E9DDE1] hover:bg-[#F7F1F3]'
              }`}
            >
              1. Benchmark Passed (86.7%)
            </button>
            <button
              type="button"
              onClick={() => setQaState('review')}
              className={`px-3 py-1 rounded text-xs font-semibold transition-colors cursor-pointer ${
                qaState === 'review'
                  ? 'bg-[#B75E78] text-white font-bold shadow-xs'
                  : 'bg-white text-[#766A70] border border-[#E9DDE1] hover:bg-[#F7F1F3]'
              }`}
            >
              2. Error Remediation Focus
            </button>
            <button
              type="button"
              onClick={() => onNavigateScreen('STU-EX-03')}
              className="px-3 py-1 rounded text-xs font-semibold bg-[#B75E78] text-white hover:bg-[#93415a] transition-colors cursor-pointer shadow-xs flex items-center gap-1"
            >
              <span>Jump to STU-EX-03 Retry Handler</span>
              <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
            </button>
          </div>
        </div>
      </aside>

      {/* ========================================================================= */}
      {/* PATHCRUMB & SCREEN HEADER                                                 */}
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
            onClick={() => onNavigateScreen('STU-EX-01')}
            className="hover:text-[#B75E78] transition-colors cursor-pointer"
          >
            Auto-Drill 1.1
          </button>
          <span className="text-[#E9DDE1]">/</span>
          <span className="text-[#B75E78] font-bold">Diagnostic Debrief &amp; Result</span>
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => onNavigateScreen('STU-EX-01')}
            className="inline-flex items-center gap-1 text-xs font-bold text-[#766A70] hover:text-[#2D2529] cursor-pointer"
          >
            <span className="material-symbols-outlined text-[16px]">arrow_back</span>
            <span>Return to Drill Workspace</span>
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 4-METRIC SCORE COCKPIT HERO                                               */}
      {/* ========================================================================= */}
      <section className="bg-white rounded-2xl p-6 sm:p-8 border border-[#E9DDE1] shadow-xs space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-[#E9DDE1]">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-[#F1F7F4] text-[#6F9D83] font-bold text-xs flex items-center gap-1">
                <span className="material-symbols-outlined text-[16px]">check_circle</span>
                Academic Benchmark Achieved
              </span>
              <span className="text-xs text-[#766A70]">Module 01 Diagnostic Checkpoint</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl text-[#2D2529] font-bold">
              Diagnostic Debrief: 86.7% Score
            </h1>
            <p className="text-xs sm:text-sm text-[#766A70] max-w-2xl leading-relaxed">
              Congratulations! You answered 13 out of 15 diagnostic prompts correctly, satisfying the 80% passing threshold for the Eight Parts of Speech foundational unit.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => onNavigateScreen('STU-EX-03')}
              className="px-5 py-3 rounded-lg bg-[#B75E78] hover:bg-[#93415a] text-white font-bold text-xs shadow-xs transition-colors flex items-center gap-2 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">replay</span>
              <span>Configure Practice &amp; Retry (STU-EX-03)</span>
            </button>
            <button
              type="button"
              onClick={() => onNavigateScreen('STU-LEARN-01')}
              className="px-5 py-3 rounded-lg bg-[#FCFAF9] border border-[#E9DDE1] hover:bg-[#F7F1F3] text-[#2D2529] font-bold text-xs transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <span>Continue to Syllabus Hub</span>
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </button>
          </div>
        </div>

        {/* 4 COCKPIT METRICS */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 rounded-xl bg-[#FCFAF9] border border-[#E9DDE1] space-y-1">
            <span className="text-[10px] text-[#766A70] uppercase font-bold tracking-wider">
              Diagnostic Accuracy
            </span>
            <div className="flex items-baseline gap-2">
              <span className="font-serif text-2xl sm:text-3xl font-bold text-[#6F9D83]">
                86.7%
              </span>
              <span className="text-xs text-[#766A70]">13 / 15 correct</span>
            </div>
            <span className="text-[11px] text-[#6F9D83] font-bold block pt-1">
              ✓ 6.7% above benchmark
            </span>
          </div>

          <div className="p-4 rounded-xl bg-[#FCFAF9] border border-[#E9DDE1] space-y-1">
            <span className="text-[10px] text-[#766A70] uppercase font-bold tracking-wider">
              Time Elapsed
            </span>
            <div className="flex items-baseline gap-2">
              <span className="font-serif text-2xl sm:text-3xl font-bold text-[#2D2529]">
                06:42
              </span>
              <span className="text-xs text-[#766A70]">min:sec</span>
            </div>
            <span className="text-[11px] text-[#766A70] block pt-1">
              Avg 26.8s per prompt
            </span>
          </div>

          <div className="p-4 rounded-xl bg-[#FCFAF9] border border-[#E9DDE1] space-y-1">
            <span className="text-[10px] text-[#766A70] uppercase font-bold tracking-wider">
              Proficiency Rating
            </span>
            <div className="flex items-baseline gap-2">
              <span className="font-serif text-2xl sm:text-3xl font-bold text-[#B75E78]">
                CEFR A2
              </span>
              <span className="text-xs text-[#766A70]">Competent</span>
            </div>
            <span className="text-[11px] text-[#766A70] block pt-1">
              Syntactic alignment verified
            </span>
          </div>

          <div className="p-4 rounded-xl bg-[#FCFAF9] border border-[#E9DDE1] space-y-1">
            <span className="text-[10px] text-[#766A70] uppercase font-bold tracking-wider">
              Downstream Status
            </span>
            <div className="flex items-baseline gap-2">
              <span className="font-serif text-2xl sm:text-3xl font-bold text-[#6F9D83]">
                Unlocked
              </span>
              <span className="text-xs text-[#766A70]">Lesson 1.2</span>
            </div>
            <span className="text-[11px] text-[#6F9D83] font-bold block pt-1">
              Direct progression active
            </span>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 7-CATEGORY PERFORMANCE MATRIX                                             */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: 7 Categories Matrix (7 Cols) */}
        <section className="lg:col-span-7 bg-white rounded-2xl p-6 border border-[#E9DDE1] shadow-xs space-y-5">
          <div className="flex items-center justify-between">
            <h2 className="font-bold text-base text-[#2D2529] flex items-center gap-2">
              <span className="material-symbols-outlined text-[#B75E78] text-[20px]">category</span>
              <span>7-Category Syntactic Performance Matrix</span>
            </h2>
            <span className="text-xs text-[#766A70]">2 categories flagged</span>
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
                className={`p-3.5 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs ${
                  cat.flagged
                    ? 'border-amber-200 bg-amber-50/50'
                    : 'border-[#E9DDE1] bg-[#FCFAF9]'
                }`}
              >
                <div className="space-y-1 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-[#2D2529]">{cat.name}</span>
                    {cat.flagged && (
                      <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-800 text-[10px] font-bold">
                        Targeted Remediation
                      </span>
                    )}
                  </div>
                  <div className="w-full max-w-md bg-white h-1.5 rounded-full overflow-hidden border border-[#E9DDE1]">
                    <div
                      className={`h-full rounded-full ${
                        cat.pass ? 'bg-[#6F9D83]' : 'bg-amber-500'
                      }`}
                      style={{ width: `${cat.pct}%` }}
                    ></div>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <span className="font-bold text-[#2D2529]">{cat.score}</span>
                  <span
                    className={`font-bold ${
                      cat.pass ? 'text-[#6F9D83]' : 'text-amber-700'
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
        <section className="lg:col-span-5 bg-white rounded-2xl p-6 border border-[#E9DDE1] shadow-xs space-y-5">
          <div className="flex items-center justify-between">
            <h2 className="font-bold text-base text-[#2D2529] flex items-center gap-2">
              <span className="material-symbols-outlined text-[#B75E78] text-[20px]">
                psychology
              </span>
              <span>Pedagogical Error Remediation</span>
            </h2>
            <span className="text-xs text-[#B75E78] font-bold">2 Prompts Flagged</span>
          </div>

          <div className="space-y-4 text-xs">
            {/* Flagged Item 1 */}
            <div className="p-4 rounded-xl border border-amber-200 bg-amber-50/40 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-[#2D2529]">
                  Prompt #8: &quot;hardly&quot; in negative polarity
                </span>
                <span className="px-2 py-0.5 rounded bg-red-100 text-red-700 text-[10px] font-bold">
                  Incorrect Selection: Adjective
                </span>
              </div>
              <p className="text-[#766A70]">
                Sentence: <em>&quot;He hardly arrived before the lecture commenced.&quot;</em>
              </p>
              <div className="p-2.5 rounded-lg bg-white border border-amber-200/60 text-[#2D2529] space-y-1">
                <span className="font-bold text-[#B75E78] block">မြန်မာပြန်ရှင်းလင်းချက်:</span>
                <p className="leading-relaxed text-[11px] text-[#766A70]">
                  &quot;hardly&quot; သည် &quot;ခဲယဉ်းသော&quot; ဟု အဓိပ္ပာယ်ရသော နာမဝိသေသန မဟုတ်ဘဲ &quot;မ...သလောက်ပင်&quot; ဟု ကြိယာကို အထူးပြုသော အငြင်းသဘောဆောင် ကြိယာဝိသေသန (Adverb of Degree) ဖြစ်ပါသည်။
                </p>
              </div>
            </div>

            {/* Flagged Item 2 */}
            <div className="p-4 rounded-xl border border-amber-200 bg-amber-50/40 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-[#2D2529]">
                  Prompt #11: &quot;fast&quot; functioning as adverb vs adjective
                </span>
                <span className="px-2 py-0.5 rounded bg-red-100 text-red-700 text-[10px] font-bold">
                  Incorrect Selection: Adjective
                </span>
              </div>
              <p className="text-[#766A70]">
                Sentence: <em>&quot;The express train travels remarkably fast.&quot;</em>
              </p>
              <div className="p-2.5 rounded-lg bg-white border border-amber-200/60 text-[#2D2529] space-y-1">
                <span className="font-bold text-[#B75E78] block">မြန်မာပြန်ရှင်းလင်းချက်:</span>
                <p className="leading-relaxed text-[11px] text-[#766A70]">
                  &quot;fast&quot; သည် စာလုံးပေါင်းတူသော်လည်း ဤနေရာတွင် &quot;travels&quot; (ကြိယာ) ကို အထူးပြုနေသောကြောင့် Adverb of Manner ဖြစ်ပါသည်။ &quot;fastly&quot; ဟူသော စကားလုံး အင်္ဂလိပ်သဒ္ဒါတွင် မရှိပါ။
                </p>
              </div>
            </div>

            {/* Targeted Action */}
            <div className="pt-2">
              <button
                type="button"
                onClick={() => onNavigateScreen('STU-EX-03')}
                className="w-full py-3 rounded-lg bg-[#B75E78] hover:bg-[#93415a] text-white font-bold text-center transition-colors shadow-xs cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Retry Only 2 Flagged Prompts (STU-EX-03)</span>
                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
