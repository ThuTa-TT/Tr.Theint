import React, { useState } from 'react';
import { ScreenId } from '../../../types/navigation';

interface CourseDetailPageProps {
  onNavigateScreen: (screenId: ScreenId) => void;
  initialState?: DetailState;
}

export type DetailState = 'paid' | 'free' | 'loading' | '404';

export const CourseDetailPage: React.FC<CourseDetailPageProps> = ({
  onNavigateScreen,
  initialState = 'paid',
}) => {
  const [screenState, setScreenState] = useState<DetailState>(initialState);
  const [expandedModules, setExpandedModules] = useState<Record<string, boolean>>({
    mod1: true,
    mod2: true,
    mod3: false,
    mod4: false,
  });
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [paymentSubmitted, setPaymentSubmitted] = useState(false);
  const [tranId, setTranId] = useState('');
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<'kpay' | 'wave' | 'bank'>('kpay');
  const [activePreviewVideo, setActivePreviewVideo] = useState<{ title: string; duration: string } | null>(null);

  const toggleModule = (id: string) => {
    setExpandedModules((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const toggleAllModules = (expand: boolean) => {
    setExpandedModules({
      mod1: expand,
      mod2: expand,
      mod3: expand,
      mod4: expand,
    });
  };

  const handleTriggerToast = (title: string, msg: string) => {
    setToastMessage(`${title} — ${msg}`);
    setTimeout(() => {
      setToastMessage(null);
    }, 4500);
  };

  const handleStartFreeCourse = () => {
    onNavigateScreen('STU-FREE-01');
  };

  const isPaid = screenState === 'paid';
  const isFree = screenState === 'free';
  const isLoading = screenState === 'loading';
  const is404 = screenState === '404';

  return (
    <div className="flex flex-col w-full space-y-6">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-24 right-8 z-50 animate-bounce max-w-md">
          <div className="p-4 rounded-xl bg-white border border-[#fbeaec] shadow-2xl flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#a5d6a7] flex items-center justify-center text-white shrink-0 shadow-sm">
              <span className="material-symbols-outlined text-[20px]">lock_open</span>
            </div>
            <div>
              <p className="text-xs font-bold text-[#22191b]">{toastMessage}</p>
              <p className="text-[11px] text-[#534247]">
                Teacher Theint Academy Rule: Free course access granted with zero enrollment delay.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* QA STATE SIMULATION BANNER (Canonical State Switcher: A, B, C, D)         */}
      {/* ========================================================================= */}
      <div className="w-full bg-white border-2 border-[#f48fb1]/40 p-4 rounded-2xl shadow-sm">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#ffd9e2] flex items-center justify-center text-[#f48fb1]">
              <span className="material-symbols-outlined text-[20px]">rule_settings</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-xs uppercase tracking-wider text-[#f48fb1]">
                  Screen State Switcher
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#fff0f2] text-[#534247]">
                  STU-COURSE-02 Prototype
                </span>
              </div>
              <p className="text-xs text-[#534247]">
                Select any of the 4 course detail states specified in the Screen Inventory:
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => setScreenState('paid')}
              className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                isPaid
                  ? 'bg-[#f48fb1] text-white shadow-md'
                  : 'bg-[#fff0f2] text-[#22191b] hover:bg-[#fbeaec]'
              }`}
            >
              <span className="material-symbols-outlined text-[16px]">payments</span>
              <span>State A: Paid Course (45,000 MMK)</span>
            </button>

            <button
              type="button"
              onClick={() => setScreenState('free')}
              className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                isFree
                  ? 'bg-[#f48fb1] text-white shadow-md'
                  : 'bg-[#fff0f2] text-[#22191b] hover:bg-[#fbeaec]'
              }`}
            >
              <span className="material-symbols-outlined text-[16px]">lock_open</span>
              <span>State B: Free Course (Direct Access)</span>
            </button>

            <button
              type="button"
              onClick={() => setScreenState('loading')}
              className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                isLoading
                  ? 'bg-[#f48fb1] text-white shadow-md'
                  : 'bg-[#fff0f2] text-[#22191b] hover:bg-[#fbeaec]'
              }`}
            >
              <span className="material-symbols-outlined text-[16px]">hourglass_empty</span>
              <span>State C: Loading Skeleton</span>
            </button>

            <button
              type="button"
              onClick={() => setScreenState('404')}
              className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                is404
                  ? 'bg-[#f48fb1] text-white shadow-md'
                  : 'bg-[#fff0f2] text-[#22191b] hover:bg-[#fbeaec]'
              }`}
            >
              <span className="material-symbols-outlined text-[16px]">error_outline</span>
              <span>State D: 404 (Not Found)</span>
            </button>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* BREADCRUMB & BACK ACTION BAR                                              */}
      {/* ========================================================================= */}
      <div className="w-full bg-white rounded-xl shadow-sm border border-[#fbeaec]">
        <div className="max-w-7xl mx-auto px-6 py-3.5 flex flex-wrap items-center justify-between gap-4">
          <nav aria-label="Academic Breadcrumb" className="flex items-center flex-wrap gap-2 text-xs text-[#534247]">
            <button
              type="button"
              onClick={() => onNavigateScreen('PUB-02-COURSES')}
              className="hover:text-[#f48fb1] transition-colors flex items-center gap-1 cursor-pointer font-medium"
            >
              <span className="material-symbols-outlined text-[16px]">menu_book</span>
              <span>Courses</span>
            </button>
            <span className="text-[#fbeaec]">/</span>
            <span className="text-[#534247]">
              {isFree ? 'Daily Conversation Track' : is404 ? 'Academic Registry' : 'General English Track'}
            </span>
            <span className="text-[#fbeaec]">/</span>
            <span className="font-bold text-[#22191b]">
              {isFree
                ? 'Everyday Spoken English Essentials'
                : is404
                ? 'Curricular Entity Missing'
                : 'Essential English Grammar Mastery'}
            </span>
          </nav>

          <button
            type="button"
            onClick={() => onNavigateScreen('PUB-02-COURSES')}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#f48fb1] hover:text-[#d87395] transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">arrow_back</span>
            <span>Return to Course Catalog</span>
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* STATE C: SKELETON LOADER CONTAINER                                        */}
      {/* ========================================================================= */}
      {isLoading && (
        <div className="w-full max-w-7xl mx-auto space-y-8" id="view-skeleton">
          {/* Skeleton Notice Banner */}
          <div className="p-4 rounded-xl bg-[#fff0f2] border border-[#fbeaec] flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 border-2 border-[#f48fb1] border-t-transparent rounded-full animate-spin"></div>
              <div>
                <p className="text-xs font-bold text-[#22191b]">
                  State C Active: Retrieving Course Curriculum &amp; Accreditation Records...
                </p>
                <p className="text-[11px] text-[#534247]">
                  Pulsing wireframe displays structured placeholder slots during asynchronous network fetch.
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setScreenState('paid')}
              className="px-3 py-1.5 rounded-lg bg-white border border-[#fbeaec] text-xs font-bold text-[#f48fb1] hover:bg-[#ffd9e2] transition-colors cursor-pointer"
            >
              Switch to State A (Paid)
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-pulse">
            {/* Left Hero Skeleton */}
            <div className="lg:col-span-8 flex flex-col gap-5">
              <div className="p-8 rounded-2xl bg-white border border-[#fbeaec] space-y-6">
                <div className="flex gap-2">
                  <div className="h-6 w-36 bg-[#fff0f2] rounded-md"></div>
                  <div className="h-6 w-44 bg-[#fff0f2] rounded-md"></div>
                </div>
                <div className="h-10 w-3/4 bg-[#fff0f2] rounded-lg"></div>
                <div className="h-5 w-1/2 bg-[#fff0f2] rounded-md"></div>
                <div className="space-y-2">
                  <div className="h-4 w-full bg-[#fff0f2] rounded"></div>
                  <div className="h-4 w-5/6 bg-[#fff0f2] rounded"></div>
                  <div className="h-4 w-2/3 bg-[#fff0f2] rounded"></div>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-[#fbeaec]">
                  <div className="h-16 bg-[#fff0f2] rounded-lg"></div>
                  <div className="h-16 bg-[#fff0f2] rounded-lg"></div>
                  <div className="h-16 bg-[#fff0f2] rounded-lg"></div>
                  <div className="h-16 bg-[#fff0f2] rounded-lg"></div>
                </div>
              </div>

              {/* Objectives Skeleton */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="h-32 bg-white rounded-xl border border-[#fbeaec] p-4"></div>
                <div className="h-32 bg-white rounded-xl border border-[#fbeaec] p-4"></div>
                <div className="h-32 bg-white rounded-xl border border-[#fbeaec] p-4"></div>
                <div className="h-32 bg-white rounded-xl border border-[#fbeaec] p-4"></div>
              </div>

              {/* Modules Accordion Skeleton */}
              <div className="space-y-3">
                <div className="h-16 bg-white rounded-xl border border-[#fbeaec]"></div>
                <div className="h-16 bg-white rounded-xl border border-[#fbeaec]"></div>
                <div className="h-16 bg-white rounded-xl border border-[#fbeaec]"></div>
              </div>
            </div>

            {/* Right Sticky Card Skeleton */}
            <div className="lg:col-span-4 flex flex-col gap-4">
              <div className="p-6 rounded-2xl bg-white border border-[#fbeaec] space-y-6">
                <div className="h-6 w-24 bg-[#fff0f2] rounded"></div>
                <div className="h-10 w-40 bg-[#fff0f2] rounded-lg"></div>
                <div className="space-y-3 pt-4 border-t border-[#fbeaec]">
                  <div className="h-4 w-full bg-[#fff0f2] rounded"></div>
                  <div className="h-4 w-5/6 bg-[#fff0f2] rounded"></div>
                  <div className="h-4 w-3/4 bg-[#fff0f2] rounded"></div>
                </div>
                <div className="h-12 w-full bg-[#fff0f2] rounded-lg"></div>
                <div className="h-10 w-full bg-[#fff0f2] rounded-lg"></div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* STATE D: NOT FOUND CONTAINER (HTTP 404)                                    */}
      {/* ========================================================================= */}
      {is404 && (
        <div className="w-full max-w-4xl mx-auto py-12 text-center" id="view-404">
          <div className="bg-white p-10 sm:p-14 rounded-2xl shadow-sm flex flex-col items-center border border-[#fbeaec]">
            <div className="w-20 h-20 rounded-full bg-[#ffd9e2] flex items-center justify-center text-[#f48fb1] mb-6 shadow-sm">
              <span className="material-symbols-outlined text-[42px]">menu_book</span>
            </div>

            <span className="text-xs uppercase tracking-widest text-[#f48fb1] font-bold mb-2">
              HTTP 404 • Curricular Entity Missing
            </span>

            <h1 className="font-serif text-3xl sm:text-4xl text-[#22191b] mb-3">
              Published Course Not Found
            </h1>

            <p className="text-sm text-[#534247] max-w-md mx-auto mb-8 leading-relaxed">
              The requested academic syllabus may be unpublished, archived, or undergoing formal
              curriculum revision by Teacher Theint Academic Board.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => onNavigateScreen('PUB-02-COURSES')}
                className="px-6 py-3 bg-[#f48fb1] text-white rounded-lg text-xs font-bold shadow-sm hover:bg-[#d87395] transition-all cursor-pointer flex items-center gap-2"
              >
                <span className="material-symbols-outlined text-[18px]">arrow_back</span>
                <span>Browse Active Courses</span>
              </button>

              <button
                type="button"
                onClick={() => setScreenState('paid')}
                className="px-5 py-3 bg-[#fff0f2] text-[#22191b] rounded-lg text-xs font-bold hover:bg-[#fbeaec] transition-colors cursor-pointer"
              >
                View State A (Paid Course)
              </button>

              <button
                type="button"
                onClick={() => setScreenState('free')}
                className="px-5 py-3 bg-[#fff0f2] text-[#22191b] rounded-lg text-xs font-bold hover:bg-[#fbeaec] transition-colors cursor-pointer"
              >
                View State B (Free Course)
              </button>
            </div>

            <div className="mt-8 pt-6 border-t border-[#fbeaec] w-full text-xs text-[#534247]">
              <span>Need help finding a syllabus? Contact Academic Affairs: academic@teachertheint.edu</span>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* PRIMARY COURSE CONTENT VIEW (STATE A: PAID & STATE B: FREE)                */}
      {/* ========================================================================= */}
      {!isLoading && !is404 && (
        <div className="w-full space-y-10" id="view-content">
          {/* HERO HEADER SECTION */}
          <div className="w-full bg-white p-8 lg:p-10 shadow-sm rounded-2xl border border-[#fbeaec]">
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
                {/* Course Hero Left Column */}
                <div className="lg:col-span-8 flex flex-col gap-6">
                  {/* Badges & Academic Hierarchy Indicators */}
                  <div className="flex flex-wrap items-center gap-2.5">
                    <span className="px-3 py-1 rounded-sm bg-[#fff0f2] border border-[#fbeaec] text-[#f48fb1] text-xs font-bold uppercase tracking-wider">
                      {isFree ? 'Daily Conversation Track' : 'General English Track'}
                    </span>

                    <span className="px-3 py-1 rounded-sm bg-[#ffd9e2] text-[#f48fb1] text-xs font-semibold flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-[16px]">layers</span>
                      <span>
                        {isFree ? 'Level: All Levels Foundation' : 'Level: A1 Beginner to A2 Elementary'}
                      </span>
                    </span>

                    <span className="px-3 py-1 rounded-sm bg-[#F1F7F4] text-[#a5d6a7] text-xs font-bold flex items-center gap-1.5 border border-[#a5d6a7]/20">
                      <span className="material-symbols-outlined text-[15px]">verified</span>
                      <span>{isFree ? 'FREE PREVIEW SYLLABUS' : 'PUBLISHED SYLLABUS'}</span>
                    </span>
                  </div>

                  {/* Course Title */}
                  <div className="space-y-2">
                    <h1 className="font-serif text-3xl sm:text-4xl text-[#22191b] leading-tight">
                      {isFree
                        ? 'Everyday Spoken English Essentials'
                        : 'Essential English Grammar Mastery'}
                    </h1>
                    <div className="flex items-center flex-wrap gap-2 text-xs text-[#534247]">
                      <span className="flex items-center gap-1 font-bold text-[#f48fb1]">
                        <span className="material-symbols-outlined text-[18px]">verified</span>
                        Teacher Theint Faculty
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-[16px]">schedule</span>
                        {isFree ? 'Approx. 6 Contact Hours' : 'Approx. 12 Contact Hours'}
                      </span>
                      <span>•</span>
                      <span>Bilingual Instruction (EN / MM Clarifications)</span>
                    </div>
                  </div>

                  {/* Summary */}
                  <p className="text-sm sm:text-base text-[#534247] leading-relaxed max-w-3xl">
                    {isFree
                      ? 'Learn practical spoken expressions, daily situational dialogues, and confidence-building conversation patterns. Direct immediate entry with zero enrollment record delay.'
                      : 'Build a rock-solid foundation in English grammar, sentence structures, and everyday syntax with guided video lectures and rigorous auto-graded drills authored by Teacher Theint. Designed to eliminate grammatical hesitation before progressing to intermediate conversation.'}
                  </p>

                  {/* Institutional Structural Metadata Bar */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-xl bg-[#fff8f8] border border-[#fbeaec]">
                    <div className="flex flex-col">
                      <span className="text-[10px] text-[#534247] uppercase tracking-wider font-bold">
                        Curriculum Structure
                      </span>
                      <span className="font-bold text-sm sm:text-base text-[#22191b] flex items-center gap-1.5 mt-1">
                        <span className="material-symbols-outlined text-[18px] text-[#f48fb1]">folder_open</span>
                        {isFree ? '2 Modules' : '4 Modules'}
                      </span>
                    </div>

                    <div className="flex flex-col">
                      <span className="text-[10px] text-[#534247] uppercase tracking-wider font-bold">
                        Classroom Units
                      </span>
                      <span className="font-bold text-sm sm:text-base text-[#22191b] flex items-center gap-1.5 mt-1">
                        <span className="material-symbols-outlined text-[18px] text-[#f48fb1]">play_lesson</span>
                        {isFree ? '10 Lessons' : '24 Lessons'}
                      </span>
                    </div>

                    <div className="flex flex-col">
                      <span className="text-[10px] text-[#534247] uppercase tracking-wider font-bold">
                        Self-Assessment
                      </span>
                      <span className="font-bold text-sm sm:text-base text-[#22191b] flex items-center gap-1.5 mt-1">
                        <span className="material-symbols-outlined text-[18px] text-[#f48fb1]">fact_check</span>
                        {isFree ? '10 Auto-Drills' : '24 Auto-Drills'}
                      </span>
                    </div>

                    <div className="flex flex-col">
                      <span className="text-[10px] text-[#534247] uppercase tracking-wider font-bold">
                        Academic Pace
                      </span>
                      <span className="font-bold text-sm sm:text-base text-[#22191b] flex items-center gap-1.5 mt-1">
                        <span className="material-symbols-outlined text-[18px] text-[#f48fb1]">all_inclusive</span>
                        {isFree ? 'Immediate Access' : 'Lifetime Access'}
                      </span>
                    </div>
                  </div>

                  {/* Curricular Architecture Clarification Note */}
                  <div className="flex items-start gap-3 p-3.5 rounded-lg bg-[#fff0f2] text-[#22191b] border border-[#fbeaec]">
                    <span className="material-symbols-outlined text-[20px] text-[#f48fb1] shrink-0 mt-0.5">
                      account_tree
                    </span>
                    <p className="text-xs leading-relaxed text-[#534247]">
                      <strong className="text-[#22191b]">Academy Canonical Hierarchy:</strong> Track (
                      <span className="font-semibold text-[#f48fb1]">
                        {isFree ? 'Daily Conversation' : 'General English'}
                      </span>
                      ) → Course (
                      <span className="font-semibold text-[#f48fb1]">
                        {isFree ? 'Everyday Spoken English' : 'Essential Grammar'}
                      </span>
                      ) → Level (
                      <span className="font-semibold text-[#f48fb1]">
                        {isFree ? 'All Levels' : 'A1 to A2 Elementary'}
                      </span>
                      ) → Modules → Lessons → Learning Items (Video | Auto-Exercise).
                    </p>
                  </div>
                </div>

                {/* Course Hero Right Column / Commercial Enrollment Box */}
                <div className="lg:col-span-4 w-full">
                  <div className="sticky top-28 bg-white rounded-2xl p-6 shadow-md flex flex-col gap-5 border border-[#fbeaec]">
                    {/* Tuition Status Badge & Pricing Display */}
                    <div className="flex flex-col gap-2 p-4 rounded-xl bg-[#fff8f8] border border-[#fbeaec]">
                      <div className="flex items-center justify-between">
                        <span
                          className={`px-2.5 py-0.5 rounded font-bold uppercase text-[10px] tracking-wider ${
                            isFree
                              ? 'bg-[#F1F7F4] text-[#a5d6a7] border border-[#a5d6a7]/20'
                              : 'bg-[#f48fb1] text-white'
                          }`}
                        >
                          {isFree ? 'FREE ACCESS' : 'PAID TUITION'}
                        </span>
                        <span className="text-xs text-[#534247] flex items-center gap-1">
                          <span className="material-symbols-outlined text-[15px] text-[#f48fb1]">
                            {isFree ? 'lock_open' : 'lock'}
                          </span>
                          Institutional Standard
                        </span>
                      </div>

                      <div className="mt-1">
                        <span className="text-[11px] text-[#534247] block uppercase tracking-wide font-bold">
                          {isFree ? 'Course Access' : 'Tuition Fee'}
                        </span>
                        <div className="flex items-baseline gap-2 mt-0.5">
                          <span className="font-serif text-2xl sm:text-3xl text-[#22191b] font-bold">
                            {isFree ? 'FREE ACCESS' : '45,000 MMK'}
                          </span>
                          <span className="text-xs text-[#534247]">
                            {isFree ? 'Zero tuition required' : 'One-time payment'}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Academy Value Propositions */}
                    <div className="flex flex-col gap-2.5 text-xs text-[#22191b]">
                      <div className="flex items-start gap-2.5">
                        <span className="material-symbols-outlined text-[18px] text-[#f48fb1] shrink-0 mt-0.5">
                          check_circle
                        </span>
                        <span>
                          {isFree
                            ? 'Immediate direct access to all preview modules with zero delay'
                            : 'Direct full syllabus access to all 4 modules upon enrollment approval'}
                        </span>
                      </div>

                      <div className="flex items-start gap-2.5">
                        <span className="material-symbols-outlined text-[18px] text-[#f48fb1] shrink-0 mt-0.5">
                          play_circle
                        </span>
                        <span>
                          {isFree ? '10 High-definition video lectures' : '24 High-definition video lectures'}{' '}
                          by Teacher Theint
                        </span>
                      </div>

                      <div className="flex items-start gap-2.5">
                        <span className="material-symbols-outlined text-[18px] text-[#f48fb1] shrink-0 mt-0.5">
                          task_alt
                        </span>
                        <span>100% Instant auto-graded exercises with step-by-step rationale</span>
                      </div>

                      <div className="flex items-start gap-2.5">
                        <span className="material-symbols-outlined text-[18px] text-[#f48fb1] shrink-0 mt-0.5">
                          workspace_premium
                        </span>
                        <span>Verified Academy Level Completion Certificate upon final check</span>
                      </div>
                    </div>

                    {/* Primary CTA Action Button */}
                    <div className="flex flex-col gap-2.5 pt-2">
                      {isFree ? (
                        <button
                          type="button"
                          onClick={handleStartFreeCourse}
                          className="w-full py-3 px-4 bg-[#a5d6a7] hover:bg-[#5e8670] text-white rounded-lg text-xs font-bold flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer"
                        >
                          <span>Start Learning Now</span>
                          <span className="material-symbols-outlined text-[18px]">play_circle</span>
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={() => setIsPaymentModalOpen(true)}
                          className="w-full py-3 px-4 bg-[#f48fb1] hover:bg-[#d87395] text-white rounded-lg text-xs font-bold flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer"
                        >
                          <span>Purchase Course</span>
                          <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                        </button>
                      )}

                      <button
                        type="button"
                        onClick={() => onNavigateScreen('STU-COURSE-03-STRUCTURE')}
                        className="w-full py-2.5 px-4 bg-[#fff0f2] hover:bg-[#fbeaec] text-[#22191b] rounded-lg text-xs font-bold text-center transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                      >
                        <span className="material-symbols-outlined text-[16px] text-[#f48fb1]">preview</span>
                        <span>Review Syllabus Preview</span>
                      </button>
                    </div>

                    {/* Access Semantics Governance Notice */}
                    <div className="p-3 rounded-lg bg-[#fff8f8] text-[#534247] text-[11px] leading-relaxed flex items-start gap-2 border border-[#fbeaec]">
                      <span className="material-symbols-outlined text-[16px] text-[#f48fb1] shrink-0 mt-0.5">
                        info
                      </span>
                      <span>
                        {isFree
                          ? 'Free tier provides immediate direct access. No payment submission or finance verification queue required.'
                          : 'Payment submission requires finance team verification before enrollment is stamped and classroom content unlocks.'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ACTIVE PREVIEW VIDEO BANNER (Triggered on free start or lesson preview) */}
          {activePreviewVideo && (
            <div className="p-6 rounded-2xl bg-white border-2 border-[#a5d6a7] shadow-md space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-[#a5d6a7] animate-ping"></span>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#a5d6a7]">
                    Active Video Lecture Player Preview
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setActivePreviewVideo(null)}
                  className="text-xs font-bold text-[#534247] hover:text-[#22191b]"
                >
                  Close Player ✕
                </button>
              </div>

              <div className="aspect-video w-full rounded-xl bg-[#22191b] text-white flex flex-col items-center justify-center relative overflow-hidden">
                <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white mb-3 cursor-pointer hover:scale-105 transition-transform">
                  <span className="material-symbols-outlined text-[36px]">play_arrow</span>
                </div>
                <p className="font-bold text-sm sm:text-base px-4 text-center">
                  {activePreviewVideo.title}
                </p>
                <p className="text-xs text-white/70 mt-1">
                  Teacher Theint English Academy • {activePreviewVideo.duration} • 1080p HD
                </p>
                <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs text-white/80">
                  <span>00:00 / {activePreviewVideo.duration}</span>
                  <span className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-[16px]">hd</span>
                    Auto-Graded Drill Attached
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* SECTION 1: CURRICULAR OBJECTIVES & COMPETENCIES */}
          <section className="flex flex-col gap-6">
            <div className="flex flex-col">
              <span className="text-xs uppercase tracking-wider text-[#f48fb1] font-bold">
                Academic Outcomes
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl text-[#22191b] mt-1">
                Curricular Objectives &amp; Competencies
              </h2>
              <p className="text-sm text-[#534247] max-w-2xl mt-1">
                Upon successful completion of this syllabus tier, students will have mastered these core
                linguistic standards:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
              {isFree ? (
                <>
                  <div className="bg-white p-6 rounded-xl shadow-sm flex flex-col gap-3 border border-[#fbeaec]">
                    <div className="w-10 h-10 rounded-lg bg-[#ffd9e2] flex items-center justify-center text-[#f48fb1]">
                      <span className="material-symbols-outlined text-[22px]">record_voice_over</span>
                    </div>
                    <h3 className="font-bold text-base text-[#22191b]">
                      Immediate Verbal Confidence
                    </h3>
                    <p className="text-xs text-[#534247] leading-relaxed">
                      Eliminate hesitation in daily greeting rituals, basic social inquiries, and self-introductions in both casual and semi-formal contexts.
                    </p>
                  </div>

                  <div className="bg-white p-6 rounded-xl shadow-sm flex flex-col gap-3 border border-[#fbeaec]">
                    <div className="w-10 h-10 rounded-lg bg-[#ffd9e2] flex items-center justify-center text-[#f48fb1]">
                      <span className="material-symbols-outlined text-[22px]">forum</span>
                    </div>
                    <h3 className="font-bold text-base text-[#22191b]">
                      Situational Dialogue Mastery
                    </h3>
                    <p className="text-xs text-[#534247] leading-relaxed">
                      Handle routine situations including dining out, asking for directions, making simple requests, and polite responses with natural cadence.
                    </p>
                  </div>

                  <div className="bg-white p-6 rounded-xl shadow-sm flex flex-col gap-3 border border-[#fbeaec]">
                    <div className="w-10 h-10 rounded-lg bg-[#ffd9e2] flex items-center justify-center text-[#f48fb1]">
                      <span className="material-symbols-outlined text-[22px]">hearing</span>
                    </div>
                    <h3 className="font-bold text-base text-[#22191b]">
                      Active Listening &amp; Response
                    </h3>
                    <p className="text-xs text-[#534247] leading-relaxed">
                      Recognize fast native contractions and everyday phrasing without getting lost or requiring frequent repetition.
                    </p>
                  </div>

                  <div className="bg-white p-6 rounded-xl shadow-sm flex flex-col gap-3 border border-[#fbeaec]">
                    <div className="w-10 h-10 rounded-lg bg-[#ffd9e2] flex items-center justify-center text-[#f48fb1]">
                      <span className="material-symbols-outlined text-[22px]">trending_up</span>
                    </div>
                    <h3 className="font-bold text-base text-[#22191b]">
                      Foundation for General English
                    </h3>
                    <p className="text-xs text-[#534247] leading-relaxed">
                      Seamless transition path into formal CEFR A1-A2 grammar masterclasses and speaking workshops.
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <div className="bg-white p-6 rounded-xl shadow-sm flex flex-col gap-3 border border-[#fbeaec]">
                    <div className="w-10 h-10 rounded-lg bg-[#ffd9e2] flex items-center justify-center text-[#f48fb1]">
                      <span className="material-symbols-outlined text-[22px]">spellcheck</span>
                    </div>
                    <h3 className="font-bold text-base text-[#22191b]">
                      Parts of Speech &amp; Agreement
                    </h3>
                    <p className="text-xs text-[#534247] leading-relaxed">
                      Master nouns, pronouns, auxiliary verbs, and strict subject-verb agreement conventions
                      across singular and plural modalities.
                    </p>
                  </div>

                  <div className="bg-white p-6 rounded-xl shadow-sm flex flex-col gap-3 border border-[#fbeaec]">
                    <div className="w-10 h-10 rounded-lg bg-[#ffd9e2] flex items-center justify-center text-[#f48fb1]">
                      <span className="material-symbols-outlined text-[22px]">history_edu</span>
                    </div>
                    <h3 className="font-bold text-base text-[#22191b]">
                      Chronological Tense Systems
                    </h3>
                    <p className="text-xs text-[#534247] leading-relaxed">
                      Differentiate precisely between simple, continuous, and perfect tenses to describe
                      timelines without ambiguity.
                    </p>
                  </div>

                  <div className="bg-white p-6 rounded-xl shadow-sm flex flex-col gap-3 border border-[#fbeaec]">
                    <div className="w-10 h-10 rounded-lg bg-[#ffd9e2] flex items-center justify-center text-[#f48fb1]">
                      <span className="material-symbols-outlined text-[22px]">checklist_rtl</span>
                    </div>
                    <h3 className="font-bold text-base text-[#22191b]">
                      Instant Self-Assessment
                    </h3>
                    <p className="text-xs text-[#534247] leading-relaxed">
                      Test every grammar rule immediately through machine-graded drills that pinpoint
                      grammatical traps and clarify rules.
                    </p>
                  </div>

                  <div className="bg-white p-6 rounded-xl shadow-sm flex flex-col gap-3 border border-[#fbeaec]">
                    <div className="w-10 h-10 rounded-lg bg-[#ffd9e2] flex items-center justify-center text-[#f48fb1]">
                      <span className="material-symbols-outlined text-[22px]">trending_up</span>
                    </div>
                    <h3 className="font-bold text-base text-[#22191b]">
                      Pre-Intermediate Readiness
                    </h3>
                    <p className="text-xs text-[#534247] leading-relaxed">
                      Acquire syntactic dexterity required to progress cleanly into B1 Spoken Fluency and
                      IELTS Foundation writing cohorts.
                    </p>
                  </div>
                </>
              )}
            </div>
          </section>

          {/* SECTION 2: COURSE STRUCTURE & CURRICULUM PREVIEW */}
          <section className="flex flex-col gap-6" id="curriculum-preview">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div className="flex flex-col">
                <span className="text-xs uppercase tracking-wider text-[#f48fb1] font-bold">
                  Curriculum Breakdown
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl text-[#22191b] mt-1">
                  Syllabus Structure &amp; Learning Units
                </h2>
                <p className="text-sm text-[#534247] max-w-2xl mt-1">
                  {isFree
                    ? 'Free syllabus preview: Direct access to all units. Video lectures and validation drills are ready to explore.'
                    : 'Curriculum is preview-only prior to enrolled authentication. Each lesson contains instructional video lectures and auto-graded validation drills.'}
                </p>
              </div>

              <div className="flex items-center gap-2 text-xs">
                <button
                  type="button"
                  onClick={() => toggleAllModules(true)}
                  className="px-3 py-1.5 rounded bg-[#fff0f2] hover:bg-[#fbeaec] text-[#22191b] font-medium transition-colors cursor-pointer"
                >
                  Expand All
                </button>
                <button
                  type="button"
                  onClick={() => toggleAllModules(false)}
                  className="px-3 py-1.5 rounded bg-[#fff0f2] hover:bg-[#fbeaec] text-[#22191b] font-medium transition-colors cursor-pointer"
                >
                  Collapse All
                </button>
              </div>
            </div>

            {/* NESTED LEVEL CONTAINER */}
            <div className="p-6 rounded-2xl bg-white shadow-sm flex flex-col gap-6 border border-[#fbeaec]">
              {/* Level Heading */}
              <div className="flex flex-wrap items-center justify-between gap-4 pb-4 bg-[#fff8f8] p-4 rounded-xl border border-[#fbeaec]">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-[#f48fb1] text-white flex items-center justify-center font-bold text-xs">
                    {isFree ? 'ALL' : 'A1-2'}
                  </div>
                  <div>
                    <span className="font-bold text-sm sm:text-base text-[#22191b] block">
                      {isFree
                        ? 'Level Scope: All Levels Foundation'
                        : 'Level Scope: A1 Beginner to A2 Elementary'}
                    </span>
                    <span className="text-[11px] text-[#534247]">
                      Foundational Tier • CEFR Standardized Competency
                    </span>
                  </div>
                </div>
                <div className="text-xs text-[#534247] flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[16px] text-[#f48fb1]">analytics</span>
                  <span>{isFree ? '2 Modules • 10 Lessons' : '4 Modules • 24 Lessons'}</span>
                </div>
              </div>

              {/* MODULE ACCORDION LIST */}
              <div className="flex flex-col gap-3">
                {/* MODULE 01 */}
                <div className="rounded-xl bg-[#fff8f8] overflow-hidden transition-all border border-[#fbeaec]">
                  <button
                    type="button"
                    onClick={() => toggleModule('mod1')}
                    className="w-full p-4 sm:p-5 flex items-center justify-between text-left hover:bg-[#fff0f2] transition-colors cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#ffd9e2] text-[#f48fb1] flex items-center justify-center font-bold text-xs">
                        01
                      </div>
                      <div>
                        <span className="font-bold text-sm sm:text-base text-[#22191b] block">
                          {isFree
                            ? 'Module 01: Situational Greeting & Daily Life Dialogues'
                            : 'Module 01: Core Grammatical Foundations'}
                        </span>
                        <span className="text-[11px] text-[#534247]">
                          {isFree
                            ? '5 Lessons • 5 Auto-Graded Exercises • Free Direct Access'
                            : '6 Lessons • 6 Auto-Graded Exercises • Total ~2.5 hrs'}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="hidden sm:inline-block px-2.5 py-0.5 rounded text-[10px] bg-white border border-[#fbeaec] text-[#534247]">
                        {isFree ? 'Spoken Essentials' : 'Foundations'}
                      </span>
                      <span
                        className={`material-symbols-outlined text-[#f48fb1] text-[24px] transform transition-transform ${
                          expandedModules.mod1 ? 'rotate-180' : 'rotate-0'
                        }`}
                      >
                        expand_more
                      </span>
                    </div>
                  </button>

                  {expandedModules.mod1 && (
                    <div className="p-4 sm:p-5 bg-white flex flex-col gap-3 border-t border-[#fbeaec]">
                      {/* Lesson 1.1 */}
                      <div className="p-3.5 rounded-lg bg-[#fff8f8] flex flex-col sm:flex-row sm:items-center justify-between gap-3 border border-[#fbeaec]">
                        <div className="flex items-start gap-3">
                          <span className="material-symbols-outlined text-[20px] text-[#f48fb1] mt-0.5">
                            menu_book
                          </span>
                          <div>
                            <span className="font-bold text-xs sm:text-sm text-[#22191b] block">
                              {isFree
                                ? 'Lesson 1.1: Common Casual & Formal Greeting Etiquette'
                                : 'Lesson 1.1: Parts of Speech, Proper Nouns & Determiners'}
                            </span>
                            <span className="text-xs text-[#534247]">
                              {isFree
                                ? 'Mastering confidence in opening spoken interactions naturally.'
                                : 'Categorizing linguistic building blocks and article usage (a, an, the).'}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 shrink-0 self-start sm:self-center text-xs">
                          <button
                            type="button"
                            onClick={() =>
                              setActivePreviewVideo({
                                title: isFree
                                  ? 'Lesson 1.1: Common Casual & Formal Greeting Etiquette'
                                  : 'Lesson 1.1: Parts of Speech, Proper Nouns & Determiners',
                                duration: '14 min',
                              })
                            }
                            className="px-2.5 py-1 rounded bg-[#ffd9e2] text-[#f48fb1] text-[11px] font-bold flex items-center gap-1 hover:bg-[#f48fb1] hover:text-white transition-colors cursor-pointer"
                          >
                            <span className="material-symbols-outlined text-[14px]">videocam</span> Video (14 min)
                          </button>
                          <span className="px-2.5 py-1 rounded bg-[#F1F7F4] text-[#a5d6a7] text-[11px] font-bold flex items-center gap-1 border border-[#a5d6a7]/20">
                            <span className="material-symbols-outlined text-[14px]">fact_check</span> Auto-Drill
                          </span>
                        </div>
                      </div>

                      {/* Lesson 1.2 */}
                      <div className="p-3.5 rounded-lg bg-[#fff8f8] flex flex-col sm:flex-row sm:items-center justify-between gap-3 border border-[#fbeaec]">
                        <div className="flex items-start gap-3">
                          <span className="material-symbols-outlined text-[20px] text-[#f48fb1] mt-0.5">
                            menu_book
                          </span>
                          <div>
                            <span className="font-bold text-xs sm:text-sm text-[#22191b] block">
                              {isFree
                                ? 'Lesson 1.2: Asking for Directions & Navigating Places'
                                : 'Lesson 1.2: Present Simple vs Present Continuous in Daily Context'}
                            </span>
                            <span className="text-xs text-[#534247]">
                              {isFree
                                ? 'Step-by-step practical expressions for directions and landmarks.'
                                : 'Habitual routines versus current temporary actions and state verbs.'}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 shrink-0 self-start sm:self-center text-xs">
                          <button
                            type="button"
                            onClick={() =>
                              setActivePreviewVideo({
                                title: isFree
                                  ? 'Lesson 1.2: Asking for Directions & Navigating Places'
                                  : 'Lesson 1.2: Present Simple vs Present Continuous in Daily Context',
                                duration: '18 min',
                              })
                            }
                            className="px-2.5 py-1 rounded bg-[#ffd9e2] text-[#f48fb1] text-[11px] font-bold flex items-center gap-1 hover:bg-[#f48fb1] hover:text-white transition-colors cursor-pointer"
                          >
                            <span className="material-symbols-outlined text-[14px]">videocam</span> Video (18 min)
                          </button>
                          <span className="px-2.5 py-1 rounded bg-[#F1F7F4] text-[#a5d6a7] text-[11px] font-bold flex items-center gap-1 border border-[#a5d6a7]/20">
                            <span className="material-symbols-outlined text-[14px]">fact_check</span> Auto-Drill
                          </span>
                        </div>
                      </div>

                      {/* Lesson 1.3 */}
                      <div className="p-3.5 rounded-lg bg-[#fff8f8] flex flex-col sm:flex-row sm:items-center justify-between gap-3 border border-[#fbeaec]">
                        <div className="flex items-start gap-3">
                          <span className="material-symbols-outlined text-[20px] text-[#f48fb1] mt-0.5">
                            menu_book
                          </span>
                          <div>
                            <span className="font-bold text-xs sm:text-sm text-[#22191b] block">
                              {isFree
                                ? 'Lesson 1.3: Ordering Food & Casual Conversations'
                                : 'Lesson 1.3: Subject-Verb Agreement & Irregular Verbs'}
                            </span>
                            <span className="text-xs text-[#534247]">
                              {isFree
                                ? 'Polite ordering phrases, requesting checks, and small talk.'
                                : 'Tackling plural exceptions, collective subjects, and 50 essential irregulars.'}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 shrink-0 self-start sm:self-center text-xs">
                          <button
                            type="button"
                            onClick={() =>
                              setActivePreviewVideo({
                                title: isFree
                                  ? 'Lesson 1.3: Ordering Food & Casual Conversations'
                                  : 'Lesson 1.3: Subject-Verb Agreement & Irregular Verbs',
                                duration: '20 min',
                              })
                            }
                            className="px-2.5 py-1 rounded bg-[#ffd9e2] text-[#f48fb1] text-[11px] font-bold flex items-center gap-1 hover:bg-[#f48fb1] hover:text-white transition-colors cursor-pointer"
                          >
                            <span className="material-symbols-outlined text-[14px]">videocam</span> Video (20 min)
                          </button>
                          <span className="px-2.5 py-1 rounded bg-[#F1F7F4] text-[#a5d6a7] text-[11px] font-bold flex items-center gap-1 border border-[#a5d6a7]/20">
                            <span className="material-symbols-outlined text-[14px]">fact_check</span> Auto-Drill
                          </span>
                        </div>
                      </div>

                      <div className="p-2.5 bg-[#fff0f2] text-[#534247] rounded-lg text-center text-xs">
                        {isFree
                          ? '+ 2 additional lessons: Polite Requests, Daily Routine Vocabulary, and Unit 1 Mastery Check.'
                          : '+ 3 additional lessons: Pronoun Cases, Quantifiers (Much/Many/Some), and Unit 1 Mastery Check.'}
                      </div>
                    </div>
                  )}
                </div>

                {/* MODULE 02 */}
                <div className="rounded-xl bg-[#fff8f8] overflow-hidden transition-all border border-[#fbeaec]">
                  <button
                    type="button"
                    onClick={() => toggleModule('mod2')}
                    className="w-full p-4 sm:p-5 flex items-center justify-between text-left hover:bg-[#fff0f2] transition-colors cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#ffd9e2] text-[#f48fb1] flex items-center justify-center font-bold text-xs">
                        02
                      </div>
                      <div>
                        <span className="font-bold text-sm sm:text-base text-[#22191b] block">
                          {isFree
                            ? 'Module 02: Confidence Building & Expressing Opinions'
                            : 'Module 02: Tense Systems & Narrative Structures'}
                        </span>
                        <span className="text-[11px] text-[#534247]">
                          {isFree
                            ? '5 Lessons • 5 Auto-Graded Exercises • Free Direct Access'
                            : '6 Lessons • 6 Auto-Graded Exercises • Total ~3 hrs'}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="hidden sm:inline-block px-2.5 py-0.5 rounded text-[10px] bg-white border border-[#fbeaec] text-[#534247]">
                        {isFree ? 'Spoken Fluency' : 'Narrative Core'}
                      </span>
                      <span
                        className={`material-symbols-outlined text-[#f48fb1] text-[24px] transform transition-transform ${
                          expandedModules.mod2 ? 'rotate-180' : 'rotate-0'
                        }`}
                      >
                        expand_more
                      </span>
                    </div>
                  </button>

                  {expandedModules.mod2 && (
                    <div className="p-4 sm:p-5 bg-white flex flex-col gap-3 border-t border-[#fbeaec]">
                      <div className="p-3.5 rounded-lg bg-[#fff8f8] flex flex-col sm:flex-row sm:items-center justify-between gap-3 border border-[#fbeaec]">
                        <div className="flex items-start gap-3">
                          <span className="material-symbols-outlined text-[20px] text-[#f48fb1] mt-0.5">
                            menu_book
                          </span>
                          <div>
                            <span className="font-bold text-xs sm:text-sm text-[#22191b] block">
                              {isFree
                                ? 'Lesson 2.1: Sharing Daily Routine & Expressing Likes/Dislikes'
                                : 'Lesson 2.1: Past Simple & Past Continuous Narratives'}
                            </span>
                            <span className="text-xs text-[#534247]">
                              {isFree
                                ? 'Expressing genuine preference patterns and conversational anecdotes.'
                                : 'Crafting sequential background actions using when and while.'}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 shrink-0 self-start sm:self-center text-xs">
                          <button
                            type="button"
                            onClick={() =>
                              setActivePreviewVideo({
                                title: isFree
                                  ? 'Lesson 2.1: Sharing Daily Routine & Expressing Likes/Dislikes'
                                  : 'Lesson 2.1: Past Simple & Past Continuous Narratives',
                                duration: '19 min',
                              })
                            }
                            className="px-2.5 py-1 rounded bg-[#ffd9e2] text-[#f48fb1] text-[11px] font-bold flex items-center gap-1 hover:bg-[#f48fb1] hover:text-white transition-colors cursor-pointer"
                          >
                            <span className="material-symbols-outlined text-[14px]">videocam</span> Video (19 min)
                          </button>
                          <span className="px-2.5 py-1 rounded bg-[#F1F7F4] text-[#a5d6a7] text-[11px] font-bold flex items-center gap-1 border border-[#a5d6a7]/20">
                            <span className="material-symbols-outlined text-[14px]">fact_check</span> Auto-Drill
                          </span>
                        </div>
                      </div>

                      <div className="p-2.5 bg-[#fff0f2] text-[#534247] rounded-lg text-center text-xs">
                        {isFree
                          ? '+ 4 additional lessons on Telephone Expressions, Polite Inquiries, and Course Completion Check.'
                          : '+ 4 additional lessons on Future Forms (Will vs Going To) and Time Clauses.'}
                      </div>
                    </div>
                  )}
                </div>

                {/* MODULE 03 (Paid Tier Only) */}
                {!isFree && (
                  <div className="rounded-xl bg-[#fff8f8] overflow-hidden transition-all border border-[#fbeaec]">
                    <button
                      type="button"
                      onClick={() => toggleModule('mod3')}
                      className="w-full p-4 sm:p-5 flex items-center justify-between text-left hover:bg-[#fff0f2] transition-colors cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-[#ffd9e2] text-[#f48fb1] flex items-center justify-center font-bold text-xs">
                          03
                        </div>
                        <div>
                          <span className="font-bold text-sm sm:text-base text-[#22191b] block">
                            Module 03: Modal Verbs, Prepositions &amp; Question Formations
                          </span>
                          <span className="text-[11px] text-[#534247]">
                            6 Lessons • 6 Auto-Graded Exercises • Total ~2.5 hrs
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="hidden sm:inline-block px-2.5 py-0.5 rounded text-[10px] bg-white border border-[#fbeaec] text-[#534247]">
                          Functional
                        </span>
                        <span
                          className={`material-symbols-outlined text-[#f48fb1] text-[24px] transform transition-transform ${
                            expandedModules.mod3 ? 'rotate-180' : 'rotate-0'
                          }`}
                        >
                          expand_more
                        </span>
                      </div>
                    </button>

                    {expandedModules.mod3 && (
                      <div className="p-4 sm:p-5 bg-white flex flex-col gap-3 border-t border-[#fbeaec]">
                        <div className="p-3.5 rounded-lg bg-[#fff8f8] flex flex-col sm:flex-row sm:items-center justify-between gap-3 border border-[#fbeaec]">
                          <div className="flex items-start gap-3">
                            <span className="material-symbols-outlined text-[20px] text-[#f48fb1] mt-0.5">
                              menu_book
                            </span>
                            <div>
                              <span className="font-bold text-xs sm:text-sm text-[#22191b] block">
                                Lesson 3.1: Modals of Ability, Permission &amp; Obligation
                              </span>
                              <span className="text-xs text-[#534247]">
                                Nuanced distinctions between Can, Could, Must, and Have to.
                              </span>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 shrink-0 self-start sm:self-center text-xs">
                            <span className="px-2.5 py-1 rounded bg-[#ffd9e2] text-[#f48fb1] text-[11px] font-bold flex items-center gap-1">
                              <span className="material-symbols-outlined text-[14px]">videocam</span> Video (16 min)
                            </span>
                            <span className="px-2.5 py-1 rounded bg-[#F1F7F4] text-[#a5d6a7] text-[11px] font-bold flex items-center gap-1 border border-[#a5d6a7]/20">
                              <span className="material-symbols-outlined text-[14px]">fact_check</span> Auto-Drill
                            </span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* MODULE 04 (Paid Tier Only) */}
                {!isFree && (
                  <div className="rounded-xl bg-[#fff8f8] overflow-hidden transition-all border border-[#fbeaec]">
                    <button
                      type="button"
                      onClick={() => toggleModule('mod4')}
                      className="w-full p-4 sm:p-5 flex items-center justify-between text-left hover:bg-[#fff0f2] transition-colors cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-[#ffd9e2] text-[#f48fb1] flex items-center justify-center font-bold text-xs">
                          04
                        </div>
                        <div>
                          <span className="font-bold text-sm sm:text-base text-[#22191b] block">
                            Module 04: Compound Sentence Construction &amp; Syntax Review
                          </span>
                          <span className="text-[11px] text-[#534247]">
                            6 Lessons • 6 Auto-Graded Exercises • Capstone Drill
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="hidden sm:inline-block px-2.5 py-0.5 rounded text-[10px] bg-white border border-[#fbeaec] text-[#534247]">
                          Integration
                        </span>
                        <span
                          className={`material-symbols-outlined text-[#f48fb1] text-[24px] transform transition-transform ${
                            expandedModules.mod4 ? 'rotate-180' : 'rotate-0'
                          }`}
                        >
                          expand_more
                        </span>
                      </div>
                    </button>

                    {expandedModules.mod4 && (
                      <div className="p-4 sm:p-5 bg-white flex flex-col gap-3 border-t border-[#fbeaec]">
                        <div className="p-3.5 rounded-lg bg-[#fff8f8] flex flex-col sm:flex-row sm:items-center justify-between gap-3 border border-[#fbeaec]">
                          <div className="flex items-start gap-3">
                            <span className="material-symbols-outlined text-[20px] text-[#f48fb1] mt-0.5">
                              menu_book
                            </span>
                            <div>
                              <span className="font-bold text-xs sm:text-sm text-[#22191b] block">
                                Lesson 4.1: Coordinating Conjunctions &amp; Compound Clauses
                              </span>
                              <span className="text-xs text-[#534247]">
                                FANBOYS connectors, comma splices, and cohesive structure.
                              </span>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 shrink-0 self-start sm:self-center text-xs">
                            <span className="px-2.5 py-1 rounded bg-[#ffd9e2] text-[#f48fb1] text-[11px] font-bold flex items-center gap-1">
                              <span className="material-symbols-outlined text-[14px]">videocam</span> Video (21 min)
                            </span>
                            <span className="px-2.5 py-1 rounded bg-[#F1F7F4] text-[#a5d6a7] text-[11px] font-bold flex items-center gap-1 border border-[#a5d6a7]/20">
                              <span className="material-symbols-outlined text-[14px]">fact_check</span> Auto-Drill
                            </span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Preview-Only Guard Disclaimer */}
              <div className="p-3.5 rounded-xl bg-[#fff8f8] flex items-center gap-3 text-[#534247] border border-[#fbeaec]">
                <span className="material-symbols-outlined text-[#f48fb1] text-[20px]">visibility</span>
                <span className="text-xs">
                  <strong>Preview Boundary Enforced:</strong>{' '}
                  {isFree
                    ? 'All 10 lesson units are open for immediate self-paced learning without registration.'
                    : 'Video streams and auto-drills are previewed above; full interactive graded submission unlocks upon verified tuition enrollment.'}
                </span>
              </div>
            </div>
          </section>

          {/* SECTION 3: INSTITUTIONAL PEDAGOGY & QUALITY ASSURANCE */}
          <section className="p-8 rounded-2xl bg-white shadow-sm flex flex-col md:flex-row items-center gap-8 border border-[#fbeaec]">
            <div className="w-20 h-20 rounded-2xl bg-[#ffd9e2] flex items-center justify-center text-[#f48fb1] shrink-0 shadow-sm">
              <span className="material-symbols-outlined text-[42px]">school</span>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-xs uppercase tracking-wider text-[#f48fb1] font-bold">
                  Academic Standards
                </span>
                <span className="px-2 py-0.5 rounded bg-[#fff0f2] text-[#22191b] text-[11px] font-semibold">
                  Curriculum Board Approved
                </span>
              </div>
              <h3 className="font-serif text-xl sm:text-2xl text-[#22191b]">
                Direct Faculty Authorship &amp; Instant Pedagogical Feedback
              </h3>
              <p className="text-xs sm:text-sm text-[#534247] leading-relaxed">
                All modules in this course are authored by Teacher Theint, combining Cambridge English
                Teaching Framework foundations with localized instructional examples for Myanmar
                learners. Ordinary exercises are 100% auto-graded with immediate explanation feedback,
                allowing self-paced refinement without artificial scheduling bottlenecks.
              </p>
              <div className="flex flex-wrap items-center gap-5 pt-2 text-xs text-[#534247]">
                <span className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[18px] text-[#f48fb1]">verified_user</span>
                  Licensed ESL Syllabus
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[18px] text-[#f48fb1]">speed</span>
                  Zero Delay Drill Evaluation
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[18px] text-[#f48fb1]">psychology</span>
                  Active Recall Design
                </span>
              </div>
            </div>
          </section>

          {/* MOBILE STICKY BOTTOM ACTION BAR */}
          <div className="lg:hidden sticky bottom-14 left-0 w-full bg-white shadow-[0_-4px_20px_rgba(0,0,0,0.08)] py-3 px-6 z-40 rounded-t-2xl border-t border-[#fbeaec]">
            <div className="flex items-center justify-between gap-4">
              <div className="flex flex-col">
                <span className="text-[10px] text-[#534247] uppercase font-bold">
                  {isFree ? 'Course Access' : 'Tuition Fee'}
                </span>
                <span className="font-serif text-[#22191b] font-bold text-base">
                  {isFree ? 'FREE ACCESS' : '45,000 MMK'}
                </span>
              </div>
              {isFree ? (
                <button
                  type="button"
                  onClick={handleStartFreeCourse}
                  className="px-5 py-2.5 bg-[#a5d6a7] hover:bg-[#5e8670] text-white rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-sm transition-colors cursor-pointer"
                >
                  <span>Start Learning</span>
                  <span className="material-symbols-outlined text-[18px]">play_circle</span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => setIsPaymentModalOpen(true)}
                  className="px-5 py-2.5 bg-[#f48fb1] hover:bg-[#d87395] text-white rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-sm transition-colors cursor-pointer"
                >
                  <span>Purchase Course</span>
                  <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* INTERACTIVE PAYMENT & ENROLLMENT MODAL (State A Paid Course Flow)          */}
      {/* ========================================================================= */}
      {isPaymentModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-[#fbeaec] space-y-6 relative max-h-[90vh] overflow-y-auto">
            <button
              type="button"
              onClick={() => {
                setIsPaymentModalOpen(false);
                setPaymentSubmitted(false);
              }}
              className="absolute top-5 right-5 text-gray-400 hover:text-gray-600 cursor-pointer text-sm font-bold"
            >
              ✕
            </button>

            {!paymentSubmitted ? (
              <>
                <div className="space-y-1">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#f48fb1]">
                    Tuition Payment Verification Flow
                  </span>
                  <h3 className="font-serif text-2xl text-[#22191b]">
                    Enroll: Essential English Grammar Mastery
                  </h3>
                  <p className="text-xs text-[#534247]">
                    Tuition Fee: <strong className="text-[#f48fb1] text-sm">45,000 MMK</strong> (One-time payment for lifetime access)
                  </p>
                </div>

                {/* Payment Methods */}
                <div className="space-y-3">
                  <label className="text-xs font-bold text-[#22191b] block">Select Payment Method:</label>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      type="button"
                      onClick={() => setSelectedPaymentMethod('kpay')}
                      className={`p-3 rounded-xl border text-center text-xs font-bold cursor-pointer transition-all ${
                        selectedPaymentMethod === 'kpay'
                          ? 'border-[#f48fb1] bg-[#ffd9e2] text-[#f48fb1]'
                          : 'border-[#fbeaec] bg-[#fff8f8] text-[#22191b] hover:bg-[#fff0f2]'
                      }`}
                    >
                      <div className="w-6 h-6 mx-auto rounded-full bg-[#1877F2] text-white flex items-center justify-center text-[10px] mb-1 font-bold">
                        K
                      </div>
                      KBZPay
                    </button>

                    <button
                      type="button"
                      onClick={() => setSelectedPaymentMethod('wave')}
                      className={`p-3 rounded-xl border text-center text-xs font-bold cursor-pointer transition-all ${
                        selectedPaymentMethod === 'wave'
                          ? 'border-[#f48fb1] bg-[#ffd9e2] text-[#f48fb1]'
                          : 'border-[#fbeaec] bg-[#fff8f8] text-[#22191b] hover:bg-[#fff0f2]'
                      }`}
                    >
                      <div className="w-6 h-6 mx-auto rounded-full bg-[#FFDF00] text-black flex items-center justify-center text-[10px] mb-1 font-bold">
                        W
                      </div>
                      WavePay
                    </button>

                    <button
                      type="button"
                      onClick={() => setSelectedPaymentMethod('bank')}
                      className={`p-3 rounded-xl border text-center text-xs font-bold cursor-pointer transition-all ${
                        selectedPaymentMethod === 'bank'
                          ? 'border-[#f48fb1] bg-[#ffd9e2] text-[#f48fb1]'
                          : 'border-[#fbeaec] bg-[#fff8f8] text-[#22191b] hover:bg-[#fff0f2]'
                      }`}
                    >
                      <div className="w-6 h-6 mx-auto rounded-full bg-[#22191b] text-white flex items-center justify-center text-[10px] mb-1 font-bold">
                        B
                      </div>
                      Bank Transfer
                    </button>
                  </div>
                </div>

                {/* Account Details Box */}
                <div className="p-4 rounded-xl bg-[#fff8f8] border border-[#fbeaec] space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-[#534247]">Account Name:</span>
                    <strong className="text-[#22191b]">Teacher Theint English Academy</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#534247]">Account Number:</span>
                    <strong className="text-[#f48fb1] font-mono text-sm">
                      {selectedPaymentMethod === 'kpay'
                        ? '09 798 123 456'
                        : selectedPaymentMethod === 'wave'
                        ? '09 798 123 456'
                        : '001 234 567 890 (AYA Bank)'}
                    </strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#534247]">Exact Amount:</span>
                    <strong className="text-[#22191b]">45,000 MMK</strong>
                  </div>
                </div>

                {/* Transfer Slip / Reference Form */}
                <div className="space-y-3">
                  <div>
                    <label className="text-xs font-bold text-[#22191b] block mb-1">
                      Transaction ID / Reference Number:
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. 2025100198427189"
                      value={tranId}
                      onChange={(e) => setTranId(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-[#fbeaec] bg-white text-xs text-[#22191b] focus:outline-none focus:border-[#f48fb1]"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-[#22191b] block mb-1">
                      Attach Payment Receipt Screenshot:
                    </label>
                    <div className="border-2 border-dashed border-[#fbeaec] rounded-xl p-4 text-center cursor-pointer hover:border-[#f48fb1] transition-colors">
                      <span className="material-symbols-outlined text-[28px] text-[#f48fb1] block mb-1">
                        upload_file
                      </span>
                      <p className="text-xs font-bold text-[#22191b]">Click to attach slip (PNG, JPG)</p>
                      <p className="text-[10px] text-[#534247]">Max size 5MB • Receipt image with date &amp; amount</p>
                    </div>
                  </div>
                </div>

                {/* Institutional Notice */}
                <div className="p-3 rounded-lg bg-[#fff0f2] text-[11px] text-[#534247] leading-relaxed">
                  <strong>Access Semantics Governance:</strong> Payment submission enters the Finance Verification Queue. Enrollment token and classroom content will unlock upon admin finance confirmation.
                </div>

                {/* Submit Button */}
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setIsPaymentModalOpen(false)}
                    className="w-1/3 py-2.5 rounded-lg border border-[#fbeaec] text-xs font-bold text-[#534247] hover:bg-[#fff0f2] cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentSubmitted(true)}
                    className="w-2/3 py-2.5 rounded-lg bg-[#f48fb1] hover:bg-[#d87395] text-white text-xs font-bold shadow-md transition-all cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <span className="material-symbols-outlined text-[16px]">verified</span>
                    <span>Submit Payment Verification</span>
                  </button>
                </div>
              </>
            ) : (
              <div className="text-center py-6 space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#F1F7F4] border-2 border-[#a5d6a7] flex items-center justify-center text-[#a5d6a7] mx-auto">
                  <span className="material-symbols-outlined text-[36px]">check</span>
                </div>
                <h4 className="font-serif text-2xl text-[#22191b]">Payment Slip Submitted!</h4>
                <p className="text-xs text-[#534247] max-w-sm mx-auto leading-relaxed">
                  Your payment receipt for <strong className="text-[#22191b]">Essential English Grammar Mastery (45,000 MMK)</strong> has been logged to the Finance Queue (Ref: #PAY-2025-0842).
                </p>
                <div className="p-4 rounded-xl bg-[#fff8f8] border border-[#fbeaec] text-xs text-left space-y-1.5 max-w-sm mx-auto">
                  <div className="flex justify-between">
                    <span className="text-[#534247]">Status:</span>
                    <span className="font-bold text-[#f48fb1]">Pending Finance Approval</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#534247]">Verification Time:</span>
                    <span className="font-bold text-[#22191b]">Within 1 to 3 hours</span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setIsPaymentModalOpen(false);
                    setPaymentSubmitted(false);
                    handleTriggerToast(
                      'Payment Logged',
                      'Queue ref #PAY-2025-0842 registered. Access will activate upon confirmation.'
                    );
                  }}
                  className="px-6 py-2.5 rounded-lg bg-[#f48fb1] text-white text-xs font-bold cursor-pointer"
                >
                  Done
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
