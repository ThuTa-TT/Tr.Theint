import React, { useState } from 'react';
import { LanguageCode, ScreenId } from '../../../types/navigation';
import { PublicNavbar } from '../../navigation/PublicNavbar';
import { CourseDetailPage } from './CourseDetailPage';
import { TR_THEINT_LOGO_URL } from '../../navigation/BrandLogo';

interface HomePagePhase3Props {
  language: LanguageCode;
  onLanguageChange: (lang: LanguageCode) => void;
  onNavigateScreen: (screenId: ScreenId) => void;
  showSpecGuides?: boolean;
}

type Phase3View = 'home' | 'course' | 'auth' | 'states';
type AuthSubTab = 'login' | 'register';

export const HomePagePhase3: React.FC<HomePagePhase3Props> = ({
  language,
  onLanguageChange,
  onNavigateScreen,
  showSpecGuides = false,
}) => {
  const [activeView, setActiveView] = useState<Phase3View>('home');
  const [authTab, setAuthTab] = useState<AuthSubTab>('login');
  const [freeAccessToastVisible, setFreeAccessToastVisible] = useState(false);

  const switchView = (viewName: Phase3View, subParam?: AuthSubTab) => {
    if (viewName === 'course') {
      onNavigateScreen('PUB-03-COURSE-DETAIL');
      return;
    }
    setActiveView(viewName);
    if (viewName === 'auth' && subParam) {
      setAuthTab(subParam);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleAuthTab = (tab: AuthSubTab) => {
    setAuthTab(tab);
  };

  const triggerImmediateFreeAccess = () => {
    setFreeAccessToastVisible(true);
    setTimeout(() => {
      setFreeAccessToastVisible(false);
    }, 4000);
  };

  return (
    <div className="bg-[#fff8f8] min-h-screen text-[#22191b] font-['Nunito_Sans'] antialiased selection:bg-[#ffd9e2] selection:text-[#722544] pb-24">
      {/* Main Container (1440px Grid) */}
      <main className="max-w-[1440px] mx-auto px-6 lg:px-12 py-8 space-y-12">
        {/* SECTION 1: CANONICAL MAIN PUBLIC NAVBAR */}
        <PublicNavbar
          variant="card"
          activeNav="Home"
          language={language}
          onLanguageChange={onLanguageChange}
          onNavigateScreen={onNavigateScreen}
          showSpecGuides={showSpecGuides}
        />

        {/* ========================================================= */}
        {/* VIEW 1: FULL 10-SECTION PUBLIC HOMEPAGE                   */}
        {/* ========================================================= */}
        {activeView === 'home' && (
          <div className="space-y-16" id="view-home">

            {/* SECTION 2: CLIENT CONTEXT / HERO (Tactile Soft-Pastel Modernism) */}
            <section className="relative overflow-hidden rounded-3xl bg-white border border-[#fbeaec] p-8 lg:p-14 shadow-[0_4px_24px_rgba(244,143,177,0.14)]">
              {/* Cheerful Pastel Ambient Highlights */}
              <div className="absolute -top-24 -right-24 w-80 h-80 rounded-full bg-[#ffd9e2]/40 blur-3xl pointer-events-none" />
              <div className="absolute -bottom-24 -left-24 w-80 h-80 rounded-full bg-[#bee9ff]/30 blur-3xl pointer-events-none" />

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10">
                <div className="lg:col-span-7 space-y-6">
                  <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#fff0f2] border border-[#f5e4e7] text-[#964261] text-xs font-['Quicksand'] font-bold shadow-2xs">
                    <span className="material-symbols-outlined text-[16px] text-[#f48fb1]">auto_stories</span>
                    <span>Pastel Rainbow Academy • Encouraging &amp; Joyful English</span>
                  </div>
                  <div className="space-y-3">
                    <p className="text-xs font-['Quicksand'] font-bold tracking-wider text-[#f48fb1] uppercase">
                      What can I learn? • Which course should I choose?
                    </p>
                    <h1 className="font-['Quicksand'] font-bold text-3xl sm:text-4xl lg:text-5xl text-[#22191b] leading-[1.15] tracking-tight">
                      Structured English Learning Built for Real, Joyful Progress.
                    </h1>
                  </div>
                  <p className="text-base text-[#534247] max-w-xl leading-relaxed">
                    Find the right learning track for your personal, academic, or professional
                    journey. From essential foundation skills to advanced situational communication,
                    discover clearly organized courses guided step-by-step with warm pedagogy.
                  </p>
                  <div className="flex flex-wrap gap-4 pt-2">
                    <a
                      className="btn-tactile-primary px-8 py-3.5 text-sm inline-flex items-center gap-2"
                      href="#discover-categories"
                    >
                      <span>Explore Learning Targets</span>
                      <span className="material-symbols-outlined text-[18px]">arrow_downward</span>
                    </a>
                    <a
                      className="btn-tactile-secondary px-8 py-3.5 text-sm inline-flex items-center gap-2"
                      href="#free-content"
                    >
                      <span>View Free Starter Content</span>
                      <span className="material-symbols-outlined text-[18px]">play_circle</span>
                    </a>
                  </div>
                  {/* Educational Pillars */}
                  <div className="grid grid-cols-3 gap-4 pt-4 border-t border-[#f5e4e7]">
                    <div className="p-3.5 rounded-2xl bg-[#fff8f8] border border-[#fbeaec] shadow-2xs">
                      <span className="material-symbols-outlined text-[#f48fb1] mb-1 text-[22px]">
                        account_tree
                      </span>
                      <p className="text-xs font-['Quicksand'] font-bold text-[#22191b]">Clear Pathways</p>
                      <p className="text-[11px] text-[#534247]">Step-by-step progression</p>
                    </div>
                    <div className="p-3.5 rounded-2xl bg-[#fff8f8] border border-[#fbeaec] shadow-2xs">
                      <span className="material-symbols-outlined text-[#81d4fa] mb-1 text-[22px]">
                        mic
                      </span>
                      <p className="text-xs font-['Quicksand'] font-bold text-[#22191b]">Practical Speaking</p>
                      <p className="text-[11px] text-[#534247]">Direct verbal practice</p>
                    </div>
                    <div className="p-3.5 rounded-2xl bg-[#fff8f8] border border-[#fbeaec] shadow-2xs">
                      <span className="material-symbols-outlined text-[#ffe082] mb-1 text-[22px]">
                        forum
                      </span>
                      <p className="text-xs font-['Quicksand'] font-bold text-[#22191b]">One-on-One Support</p>
                      <p className="text-[11px] text-[#534247]">Instructor guidance</p>
                    </div>
                  </div>
                </div>

                {/* Academic Hierarchy Diagram Card: Track -> Course -> Level -> Module -> Lesson -> Learning Item */}
                <div className="lg:col-span-5 relative">
                  <div className="p-6 sm:p-7 rounded-3xl bg-[#fff0f2] border border-[#f5e4e7] shadow-sm space-y-4">
                    <div className="flex items-center justify-between pb-3 border-b border-[#f5e4e7]">
                      <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-[#f48fb1] shadow-[0_2px_0px_#d87395]"></span>
                        <p className="text-xs font-['Quicksand'] font-bold text-[#22191b]">
                          Curriculum Hierarchy Architecture
                        </p>
                      </div>
                      <span className="px-3 py-1 rounded-full bg-white text-[#534247] text-[10px] font-['Quicksand'] font-bold border border-[#f5e4e7] shadow-2xs">
                        Core Spec
                      </span>
                    </div>
                    <div className="space-y-2.5 text-xs font-['Quicksand']">
                      <div className="p-3.5 rounded-2xl bg-white border border-[#fbeaec] shadow-xs flex items-center justify-between">
                        <div>
                          <p className="text-[10px] font-bold text-[#f48fb1] uppercase">
                            1. Track
                          </p>
                          <p className="font-bold text-[#22191b]">
                            Professional Communication Track
                          </p>
                        </div>
                        <span className="material-symbols-outlined text-[#f48fb1] text-[20px]">
                          account_tree
                        </span>
                      </div>
                      <div className="ml-4 p-3.5 rounded-2xl bg-white border border-[#fbeaec] shadow-xs flex items-center justify-between">
                        <div>
                          <p className="text-[10px] font-bold text-[#006685] uppercase">
                            2. Course
                          </p>
                          <p className="font-bold text-[#22191b]">
                            Business Communication Essentials
                          </p>
                        </div>
                        <span className="material-symbols-outlined text-[#81d4fa] text-[20px]">
                          business_center
                        </span>
                      </div>
                      {/* Strictly scoped Level in Course */}
                      <div className="ml-8 p-3.5 rounded-2xl bg-[#ffd9e2] border-2 border-[#f48fb1] shadow-xs flex items-center justify-between">
                        <div>
                          <p className="text-[10px] font-bold text-[#964261] uppercase">
                            3. Level (Strictly Inside Course)
                          </p>
                          <p className="font-bold text-[#22191b]">
                            Level 2: Intermediate Workplace
                          </p>
                        </div>
                        <span className="material-symbols-outlined text-[#964261] text-[20px]">
                          stacked_bar_chart
                        </span>
                      </div>
                      <div className="ml-12 p-3.5 rounded-2xl bg-white border border-[#fbeaec] shadow-xs flex items-center justify-between">
                        <div>
                          <p className="text-[10px] font-bold text-[#725c06] uppercase">
                            4. Module &amp; 5. Lesson &amp; 6. Learning Item
                          </p>
                          <p className="font-bold text-[#22191b]">
                            Module 1 &gt; Lesson 2: Email Etiquette
                          </p>
                          <span className="text-[11px] text-[#534247] font-['Nunito_Sans'] font-normal">
                            Items: Video Lecture • Practice Drill • Audio Task
                          </span>
                        </div>
                        <span className="material-symbols-outlined text-[#a5d6a7] text-[20px]">
                          play_circle
                        </span>
                      </div>
                    </div>
                    <div className="p-3 rounded-2xl bg-white border border-[#f5e4e7] text-[#534247] text-[11px] font-['Quicksand'] font-bold flex items-center gap-2">
                      <span className="material-symbols-outlined text-[#f48fb1] text-[18px]">
                        verified
                      </span>
                      <span>Architectural Rule: Level is strictly scoped inside Course.</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 3: WHAT YOU CAN LEARN (7 Approved Targets) */}
            <section className="space-y-8" id="discover-categories">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                  <span className="text-xs font-['Quicksand'] font-bold text-[#f48fb1] uppercase tracking-wider">
                    Curriculum Breadth
                  </span>
                  <h2 className="font-['Quicksand'] font-bold text-2xl lg:text-3xl text-[#22191b] mt-1">
                    What You Can Learn
                  </h2>
                  <p className="text-sm text-[#534247] mt-2 max-w-2xl leading-relaxed">
                    Explore the 7 core learning categories supported on the Teacher Theint English
                    platform, structured for learners at distinct life and career stages.
                  </p>
                </div>
                <div>
                  <span className="px-4 py-1.5 rounded-full bg-[#fff0f2] border border-[#f5e4e7] text-[#964261] text-xs font-['Quicksand'] font-bold shadow-2xs">
                    7 Approved Learning Targets
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {/* 1. Kids */}
                <div className="rounded-3xl bg-white border border-[#fbeaec] p-6 shadow-[0_4px_16px_rgba(244,143,177,0.12)] hover:shadow-[0_8px_24px_rgba(244,143,177,0.22)] hover:-translate-y-1 transition-all flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="w-12 h-12 rounded-2xl bg-[#ffd9e2] flex items-center justify-center text-[#964261] shadow-2xs">
                      <span className="material-symbols-outlined text-2xl">child_care</span>
                    </div>
                    <h3 className="font-['Quicksand'] font-bold text-lg text-[#22191b]">1. Kids</h3>
                    <div className="space-y-1">
                      <p className="text-[11px] font-['Quicksand'] font-bold text-[#f48fb1] uppercase">
                        Target Learner
                      </p>
                      <p className="text-xs text-[#534247]">
                        Young learners developing early linguistic habits
                      </p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-[11px] font-['Quicksand'] font-bold text-[#964261] uppercase">
                        Learning Purpose
                      </p>
                      <p className="text-xs text-[#22191b]">
                        Foundational phonics, positive speaking confidence, and age-calibrated
                        reading drills.
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    className="mt-6 w-full py-2.5 rounded-full bg-[#fff0f2] hover:bg-[#ffd9e2] text-[#964261] border border-[#f5e4e7] text-xs font-['Quicksand'] font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs"
                    onClick={() => switchView('course')}
                  >
                    <span>View Kids Courses</span>
                    <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                  </button>
                </div>

                {/* 2. School English */}
                <div className="rounded-3xl bg-white border border-[#fbeaec] p-6 shadow-[0_4px_16px_rgba(244,143,177,0.12)] hover:shadow-[0_8px_24px_rgba(244,143,177,0.22)] hover:-translate-y-1 transition-all flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="w-12 h-12 rounded-2xl bg-[#bee9ff] flex items-center justify-center text-[#006685] shadow-2xs">
                      <span className="material-symbols-outlined text-2xl">school</span>
                    </div>
                    <h3 className="font-['Quicksand'] font-bold text-lg text-[#22191b]">2. School English</h3>
                    <div className="space-y-1">
                      <p className="text-[11px] font-['Quicksand'] font-bold text-[#006685] uppercase">
                        Target Learner
                      </p>
                      <p className="text-xs text-[#534247]">
                        Primary, middle, and high school academic students
                      </p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-[11px] font-['Quicksand'] font-bold text-[#725c06] uppercase">
                        Learning Purpose
                      </p>
                      <p className="text-xs text-[#22191b]">
                        Academic grammar mastery, reading comprehension, exam prep, and formal
                        writing structure.
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    className="mt-6 w-full py-2.5 rounded-full bg-[#e1f5fe] hover:bg-[#bee9ff] text-[#006685] border border-[#b3e5fc] text-xs font-['Quicksand'] font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs"
                    onClick={() => switchView('course')}
                  >
                    <span>View School Courses</span>
                    <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                  </button>
                </div>

                {/* 3. General English */}
                <div className="rounded-3xl bg-white border border-[#fbeaec] p-6 shadow-[0_4px_16px_rgba(244,143,177,0.12)] hover:shadow-[0_8px_24px_rgba(244,143,177,0.22)] hover:-translate-y-1 transition-all flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="w-12 h-12 rounded-2xl bg-[#ffe083] flex items-center justify-center text-[#725c06] shadow-2xs">
                      <span className="material-symbols-outlined text-2xl">language</span>
                    </div>
                    <h3 className="font-['Quicksand'] font-bold text-lg text-[#22191b]">3. General English</h3>
                    <div className="space-y-1">
                      <p className="text-[11px] font-['Quicksand'] font-bold text-[#725c06] uppercase">
                        Target Learner
                      </p>
                      <p className="text-xs text-[#534247]">
                        Adult learners strengthening core communication
                      </p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-[11px] font-['Quicksand'] font-bold text-[#964261] uppercase">
                        Learning Purpose
                      </p>
                      <p className="text-xs text-[#22191b]">
                        Comprehensive grammar, listening retention, vocabulary enrichment, and
                        conversational ease.
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    className="mt-6 w-full py-2.5 rounded-full bg-[#fff9c4] hover:bg-[#ffe082] text-[#725c06] border border-[#fff176] text-xs font-['Quicksand'] font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs"
                    onClick={() => switchView('course')}
                  >
                    <span>View General Courses</span>
                    <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                  </button>
                </div>

                {/* 4. Business English */}
                <div className="rounded-3xl bg-white border border-[#fbeaec] p-6 shadow-[0_4px_16px_rgba(244,143,177,0.12)] hover:shadow-[0_8px_24px_rgba(244,143,177,0.22)] hover:-translate-y-1 transition-all flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="w-12 h-12 rounded-2xl bg-[#ffd9e2] flex items-center justify-center text-[#964261] shadow-2xs">
                      <span className="material-symbols-outlined text-2xl">business_center</span>
                    </div>
                    <h3 className="font-['Quicksand'] font-bold text-lg text-[#22191b]">4. Business English</h3>
                    <div className="space-y-1">
                      <p className="text-[11px] font-['Quicksand'] font-bold text-[#964261] uppercase">
                        Target Learner
                      </p>
                      <p className="text-xs text-[#534247]">
                        Working professionals, team leads, and managers
                      </p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-[11px] font-['Quicksand'] font-bold text-[#006685] uppercase">
                        Learning Purpose
                      </p>
                      <p className="text-xs text-[#22191b]">
                        Formal workplace correspondence, meeting contributions, presentations, and
                        executive dialogue.
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    className="mt-6 w-full py-2.5 rounded-full bg-[#fff0f2] hover:bg-[#ffd9e2] text-[#964261] border border-[#f5e4e7] text-xs font-['Quicksand'] font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs"
                    onClick={() => switchView('course')}
                  >
                    <span>View Business Courses</span>
                    <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                  </button>
                </div>

                {/* 5. Daily Conversation */}
                <div className="rounded-3xl bg-white border border-[#fbeaec] p-6 shadow-[0_4px_16px_rgba(244,143,177,0.12)] hover:shadow-[0_8px_24px_rgba(244,143,177,0.22)] hover:-translate-y-1 transition-all flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="w-12 h-12 rounded-2xl bg-[#c8e6c9] flex items-center justify-center text-[#1b5e20] shadow-2xs">
                      <span className="material-symbols-outlined text-2xl">forum</span>
                    </div>
                    <h3 className="font-['Quicksand'] font-bold text-lg text-[#22191b]">5. Daily Conversation</h3>
                    <div className="space-y-1">
                      <p className="text-[11px] font-['Quicksand'] font-bold text-[#1b5e20] uppercase">
                        Target Learner
                      </p>
                      <p className="text-xs text-[#534247]">
                        Learners seeking natural, everyday spoken fluency
                      </p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-[11px] font-['Quicksand'] font-bold text-[#964261] uppercase">
                        Learning Purpose
                      </p>
                      <p className="text-xs text-[#22191b]">
                        Spontaneous speaking exercises, social phrasing, travel dialogue, and
                        accent clarity.
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    className="mt-6 w-full py-2.5 rounded-full bg-[#e8f5e9] hover:bg-[#c8e6c9] text-[#1b5e20] border border-[#c8e6c9] text-xs font-['Quicksand'] font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs"
                    onClick={() => switchView('course')}
                  >
                    <span>View Conversation Courses</span>
                    <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                  </button>
                </div>

                {/* 6. Hotel English */}
                <div className="rounded-3xl bg-white border border-[#fbeaec] p-6 shadow-[0_4px_16px_rgba(244,143,177,0.12)] hover:shadow-[0_8px_24px_rgba(244,143,177,0.22)] hover:-translate-y-1 transition-all flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="w-12 h-12 rounded-2xl bg-[#bee9ff] flex items-center justify-center text-[#006685] shadow-2xs">
                      <span className="material-symbols-outlined text-2xl">hotel</span>
                    </div>
                    <h3 className="font-['Quicksand'] font-bold text-lg text-[#22191b]">6. Hotel English</h3>
                    <div className="space-y-1">
                      <p className="text-[11px] font-['Quicksand'] font-bold text-[#006685] uppercase">
                        Target Learner
                      </p>
                      <p className="text-xs text-[#534247]">
                        Hospitality professionals, front desk, and service staff
                      </p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-[11px] font-['Quicksand'] font-bold text-[#725c06] uppercase">
                        Learning Purpose
                      </p>
                      <p className="text-xs text-[#22191b]">
                        Guest check-in dialogue, courteous service vocabulary, polite
                        problem-solving, and telephone manners.
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    className="mt-6 w-full py-2.5 rounded-full bg-[#e1f5fe] hover:bg-[#bee9ff] text-[#006685] border border-[#b3e5fc] text-xs font-['Quicksand'] font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs"
                    onClick={() => switchView('course')}
                  >
                    <span>View Hotel Courses</span>
                    <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                  </button>
                </div>

                {/* 7. Interview English */}
                <div className="rounded-3xl bg-white border border-[#fbeaec] p-6 shadow-[0_4px_16px_rgba(244,143,177,0.12)] hover:shadow-[0_8px_24px_rgba(244,143,177,0.22)] hover:-translate-y-1 transition-all flex flex-col justify-between md:col-span-2 lg:col-span-1">
                  <div className="space-y-3">
                    <div className="w-12 h-12 rounded-2xl bg-[#ffe083] flex items-center justify-center text-[#725c06] shadow-2xs">
                      <span className="material-symbols-outlined text-2xl">psychology_alt</span>
                    </div>
                    <h3 className="font-['Quicksand'] font-bold text-lg text-[#22191b]">7. Interview English</h3>
                    <div className="space-y-1">
                      <p className="text-[11px] font-['Quicksand'] font-bold text-[#725c06] uppercase">
                        Target Learner
                      </p>
                      <p className="text-xs text-[#534247]">
                        Job candidates preparing for employment interviews
                      </p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-[11px] font-['Quicksand'] font-bold text-[#964261] uppercase">
                        Learning Purpose
                      </p>
                      <p className="text-xs text-[#22191b]">
                        Structured response formulation, self-introduction, behavioral questions,
                        and professional tone.
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    className="mt-6 w-full py-2.5 rounded-full bg-[#fff9c4] hover:bg-[#ffe082] text-[#725c06] border border-[#fff176] text-xs font-['Quicksand'] font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs"
                    onClick={() => switchView('course')}
                  >
                    <span>View Interview Courses</span>
                    <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                  </button>
                </div>
              </div>
            </section>

            {/* SECTION 4: FEATURED COURSES */}
            <section className="space-y-8" id="featured-courses">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                  <span className="text-xs font-['Quicksand'] font-bold text-[#f48fb1] uppercase tracking-wider">
                    Curriculum Selection
                  </span>
                  <h2 className="font-['Quicksand'] font-bold text-2xl lg:text-3xl text-[#22191b] mt-1">
                    Featured Courses
                  </h2>
                  <p className="text-sm text-[#534247] mt-2 max-w-2xl leading-relaxed">
                    Review course structures and syllabuses to determine which level fits your
                    current learning stage.
                  </p>
                </div>
                <div>
                  <span className="px-4 py-1.5 rounded-full bg-[#fff0f2] border border-[#f5e4e7] text-[#964261] text-xs font-['Quicksand'] font-bold shadow-2xs">
                    [Sample Course Catalog / Demo Data]
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Sample Course Card 1: Free Starter */}
                <div className="rounded-3xl bg-white border border-[#fbeaec] p-6 sm:p-7 shadow-[0_4px_16px_rgba(244,143,177,0.12)] hover:shadow-[0_8px_24px_rgba(244,143,177,0.22)] hover:-translate-y-1 transition-all flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="px-3 py-1 rounded-full bg-[#fff0f2] border border-[#f5e4e7] text-[#964261] text-[11px] font-['Quicksand'] font-bold">
                        Level 1: Starter (Inside Course)
                      </span>
                      <span className="text-xs font-['Quicksand'] font-bold text-[#1b5e20] bg-[#e8f5e9] px-2.5 py-0.5 rounded-full border border-[#c8e6c9]">
                        FREE
                      </span>
                    </div>
                    <div>
                      <span className="text-[11px] font-['Quicksand'] font-bold text-[#534247] uppercase">
                        Learning Target: General English
                      </span>
                      <h3 className="font-['Quicksand'] font-bold text-lg text-[#22191b] mt-0.5">
                        Foundation English Phonics &amp; Core Vocabulary
                      </h3>
                    </div>
                    <p className="text-xs text-[#534247] leading-relaxed">
                      Introduction to standard English pronunciation symbols, common word patterns,
                      and foundational sentence construction.
                    </p>
                    <div className="flex items-center gap-4 text-xs text-[#534247] pt-2 border-t border-[#f5e4e7]">
                      <span className="flex items-center gap-1 font-['Quicksand'] font-bold">
                        <span className="material-symbols-outlined text-[16px] text-[#f48fb1]">folder</span> 4
                        Modules
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1 font-['Quicksand'] font-bold">
                        <span className="material-symbols-outlined text-[16px] text-[#81d4fa]">play_lesson</span>{' '}
                        12 Lessons
                      </span>
                    </div>
                  </div>
                  <div className="mt-6 pt-4 space-y-2 border-t border-[#f5e4e7]">
                    <button
                      type="button"
                      className="btn-tactile-secondary w-full py-2.5 text-xs flex items-center justify-center gap-2 cursor-pointer"
                      onClick={() => switchView('course')}
                    >
                      <span className="material-symbols-outlined text-[16px]">menu_book</span>
                      <span>View Course Outline</span>
                    </button>
                    <p className="text-center text-[10px] text-[#534247]">
                      Sample Course (Pricing TBD / Admin Managed)
                    </p>
                  </div>
                </div>

                {/* Sample Course Card 2: Paid Business Track */}
                <div className="rounded-3xl bg-white border border-[#fbeaec] p-6 sm:p-7 shadow-[0_4px_16px_rgba(244,143,177,0.12)] hover:shadow-[0_8px_24px_rgba(244,143,177,0.22)] hover:-translate-y-1 transition-all flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="px-3 py-1 rounded-full bg-[#ffd9e2] text-[#964261] text-[11px] font-['Quicksand'] font-bold border border-[#f48fb1]/40">
                        Level 2: Intermediate (Inside Course)
                      </span>
                      <span className="text-xs font-['Quicksand'] font-bold text-[#964261] bg-[#fff0f2] px-2.5 py-0.5 rounded-full border border-[#f5e4e7]">
                        PAID COURSE
                      </span>
                    </div>
                    <div>
                      <span className="text-[11px] font-['Quicksand'] font-bold text-[#534247] uppercase">
                        Learning Target: Business English
                      </span>
                      <h3 className="font-['Quicksand'] font-bold text-lg text-[#22191b] mt-0.5">
                        Workplace Correspondence &amp; Meeting Skills
                      </h3>
                    </div>
                    <p className="text-xs text-[#534247] leading-relaxed">
                      Practical instruction on drafting concise emails, phrasing requests
                      professionally, and participating in meetings with clarity.
                    </p>
                    <div className="flex items-center gap-4 text-xs text-[#534247] pt-2 border-t border-[#f5e4e7]">
                      <span className="flex items-center gap-1 font-['Quicksand'] font-bold">
                        <span className="material-symbols-outlined text-[16px] text-[#f48fb1]">folder</span> 6
                        Modules
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1 font-['Quicksand'] font-bold">
                        <span className="material-symbols-outlined text-[16px] text-[#81d4fa]">play_lesson</span>{' '}
                        20 Lessons
                      </span>
                    </div>
                  </div>
                  <div className="mt-6 pt-4 space-y-2 border-t border-[#f5e4e7]">
                    <button
                      type="button"
                      className="btn-tactile-secondary w-full py-2.5 text-xs flex items-center justify-center gap-2 cursor-pointer"
                      onClick={() => switchView('course')}
                    >
                      <span className="material-symbols-outlined text-[16px]">menu_book</span>
                      <span>View Course Outline</span>
                    </button>
                    <p className="text-center text-[10px] text-[#534247]">
                      Sample Course (Pricing TBD / Admin Managed)
                    </p>
                  </div>
                </div>

                {/* Sample Course Card 3: Paid Interview Track */}
                <div className="rounded-3xl bg-white border border-[#fbeaec] p-6 sm:p-7 shadow-[0_4px_16px_rgba(244,143,177,0.12)] hover:shadow-[0_8px_24px_rgba(244,143,177,0.22)] hover:-translate-y-1 transition-all flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="px-3 py-1 rounded-full bg-[#fff0f2] border border-[#f5e4e7] text-[#22191b] text-[11px] font-['Quicksand'] font-bold">
                        Level 2: Intermediate (Inside Course)
                      </span>
                      <span className="text-xs font-['Quicksand'] font-bold text-[#964261] bg-[#fff0f2] px-2.5 py-0.5 rounded-full border border-[#f5e4e7]">
                        PAID COURSE
                      </span>
                    </div>
                    <div>
                      <span className="text-[11px] font-['Quicksand'] font-bold text-[#534247] uppercase">
                        Learning Target: Interview English
                      </span>
                      <h3 className="font-['Quicksand'] font-bold text-lg text-[#22191b] mt-0.5">
                        Structured Interview Practice &amp; Questions
                      </h3>
                    </div>
                    <p className="text-xs text-[#534247] leading-relaxed">
                      Step-by-step guidance on structuring self-introductions, answering standard
                      interview inquiries, and verbal confidence.
                    </p>
                    <div className="flex items-center gap-4 text-xs text-[#534247] pt-2 border-t border-[#f5e4e7]">
                      <span className="flex items-center gap-1 font-['Quicksand'] font-bold">
                        <span className="material-symbols-outlined text-[16px] text-[#f48fb1]">folder</span> 5
                        Modules
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1 font-['Quicksand'] font-bold">
                        <span className="material-symbols-outlined text-[16px] text-[#81d4fa]">play_lesson</span>{' '}
                        15 Lessons
                      </span>
                    </div>
                  </div>
                  <div className="mt-6 pt-4 space-y-2 border-t border-[#f5e4e7]">
                    <button
                      type="button"
                      className="btn-tactile-secondary w-full py-2.5 text-xs flex items-center justify-center gap-2 cursor-pointer"
                      onClick={() => switchView('course')}
                    >
                      <span className="material-symbols-outlined text-[16px]">menu_book</span>
                      <span>View Course Outline</span>
                    </button>
                    <p className="text-center text-[10px] text-[#534247]">
                      Sample Course (Pricing TBD / Admin Managed)
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 5: FREE COURSE CONTENT */}
            <section
              className="rounded-3xl bg-[#fff0f2] border border-[#f5e4e7] p-8 lg:p-12 shadow-sm"
              id="free-content"
            >
              <div className="max-w-3xl space-y-3">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-[#f5e4e7] text-[#964261] text-xs font-['Quicksand'] font-bold shadow-2xs">
                  <span className="material-symbols-outlined text-[16px] text-[#a5d6a7]">lock_open</span>
                  <span>Free Course Policy</span>
                </div>
                <h2 className="font-['Quicksand'] font-bold text-2xl lg:text-3xl text-[#22191b]">
                  Free Starter Modules
                </h2>
                <p className="text-sm text-[#534247] leading-relaxed">
                  Sample open modules are accessible immediately for preview. Under platform rules,
                  exploring free course material grants instant direct access without generating an
                  enrollment transaction record.
                </p>
              </div>
              <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 sm:p-7 rounded-3xl bg-white border border-[#fbeaec] shadow-[0_4px_16px_rgba(244,143,177,0.12)] hover:shadow-[0_8px_24px_rgba(244,143,177,0.22)] hover:-translate-y-1 transition-all flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="px-3 py-1 rounded-full bg-[#fff0f2] text-[#964261] text-[11px] font-['Quicksand'] font-bold border border-[#f5e4e7]">
                        Sample Open Lesson 01
                      </span>
                      <span className="text-[11px] text-[#1b5e20] bg-[#e8f5e9] px-2.5 py-0.5 rounded-full border border-[#c8e6c9] font-['Quicksand'] font-bold">
                        No Enrollment Record Created
                      </span>
                    </div>
                    <h3 className="font-['Quicksand'] font-bold text-lg text-[#22191b]">
                      Foundation Vowel Clarity &amp; Articulation
                    </h3>
                    <p className="text-xs text-[#534247] leading-relaxed">
                      Explore short and long vowel sound contrasts with guided model audio
                      recordings and printable pronunciation practice sheets.
                    </p>
                  </div>
                  <div className="mt-6 flex items-center justify-between border-t border-[#f5e4e7] pt-4">
                    <span className="text-xs text-[#534247] font-['Quicksand'] font-bold">Duration: ~20 mins</span>
                    <button
                      type="button"
                      className="btn-tactile-mint px-5 py-2.5 text-xs flex items-center gap-1.5 cursor-pointer"
                      onClick={triggerImmediateFreeAccess}
                    >
                      <span className="material-symbols-outlined text-[16px]">play_arrow</span>
                      <span>Open Lesson Now</span>
                    </button>
                  </div>
                </div>
                <div className="p-6 sm:p-7 rounded-3xl bg-white border border-[#fbeaec] shadow-[0_4px_16px_rgba(244,143,177,0.12)] hover:shadow-[0_8px_24px_rgba(244,143,177,0.22)] hover:-translate-y-1 transition-all flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="px-3 py-1 rounded-full bg-[#fff0f2] text-[#964261] text-[11px] font-['Quicksand'] font-bold border border-[#f5e4e7]">
                        Sample Open Lesson 02
                      </span>
                      <span className="text-[11px] text-[#1b5e20] bg-[#e8f5e9] px-2.5 py-0.5 rounded-full border border-[#c8e6c9] font-['Quicksand'] font-bold">
                        No Enrollment Record Created
                      </span>
                    </div>
                    <h3 className="font-['Quicksand'] font-bold text-lg text-[#22191b]">
                      Everyday Workplace Greetings &amp; Introductions
                    </h3>
                    <p className="text-xs text-[#534247] leading-relaxed">
                      Review standard phrasing for greetings, acknowledging questions, and polite
                      conversational turn-taking in everyday team settings.
                    </p>
                  </div>
                  <div className="mt-6 flex items-center justify-between border-t border-[#f5e4e7] pt-4">
                    <span className="text-xs text-[#534247] font-['Quicksand'] font-bold">Duration: ~25 mins</span>
                    <button
                      type="button"
                      className="btn-tactile-mint px-5 py-2.5 text-xs flex items-center gap-1.5 cursor-pointer"
                      onClick={triggerImmediateFreeAccess}
                    >
                      <span className="material-symbols-outlined text-[16px]">play_arrow</span>
                      <span>Open Lesson Now</span>
                    </button>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 6: COURSE PROMOTION / ADVERTISEMENT */}
            <section
              className="rounded-3xl bg-[#fff0f2] border border-[#f5e4e7] p-8 lg:p-12 shadow-sm relative overflow-hidden"
              id="course-promotion"
            >
              <div className="flex items-center justify-between pb-4 border-b border-[#f5e4e7]">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-[#f5e4e7] text-[#964261] text-xs font-['Quicksand'] font-bold shadow-2xs">
                  <span className="material-symbols-outlined text-[16px] text-[#f48fb1]">campaign</span>
                  <span>Platform Announcement Slot</span>
                </div>
                <span className="px-3 py-1 rounded-full bg-white text-[#534247] text-[11px] font-['Quicksand'] font-bold border border-[#f5e4e7] shadow-2xs">
                  [Demo Promotion / Structural Placeholder]
                </span>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-6">
                <div className="lg:col-span-8 space-y-4">
                  <h2 className="font-['Quicksand'] font-bold text-2xl lg:text-3xl text-[#22191b]">
                    Upcoming Course Schedule &amp; Structured Cohort Openings
                  </h2>
                  <p className="text-sm text-[#534247] leading-relaxed">
                    Announcements regarding new course schedules, specialized speaking practice
                    sessions, and cohort registrations will be displayed in this promotional area by
                    platform administrators.
                  </p>
                  <div className="flex flex-wrap items-center gap-6 pt-2 text-xs text-[#22191b] font-['Quicksand'] font-bold">
                    <span className="flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-[#f48fb1] text-[18px]">
                        calendar_today
                      </span>{' '}
                      Schedule: Admin Managed
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-[#81d4fa] text-[18px]">
                        group
                      </span>{' '}
                      Capacity: Controlled Batch
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-[#a5d6a7] text-[18px]">
                        assignment
                      </span>{' '}
                      Syllabus: 7 Core Pathways
                    </span>
                  </div>
                </div>
                <div className="lg:col-span-4 flex lg:justify-end">
                  <div className="p-6 sm:p-7 rounded-3xl bg-white border border-[#fbeaec] shadow-[0_4px_16px_rgba(244,143,177,0.12)] text-center space-y-3 w-full max-w-xs">
                    <span className="text-[11px] text-[#534247] font-['Quicksand'] font-bold uppercase">
                      Pricing &amp; Enrollment
                    </span>
                    <p className="font-['Quicksand'] font-bold text-lg text-[#22191b]">Tuition Managed by Admin</p>
                    <p className="text-xs text-[#534247]">
                      Sample promo component layout for campaign broadcasts.
                    </p>
                    <button
                      type="button"
                      className="btn-tactile-primary w-full py-3 text-xs cursor-pointer"
                      onClick={() => switchView('course')}
                    >
                      Browse Course Catalog
                    </button>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 7: REVIEWS / SOCIAL PROOF */}
            <section className="space-y-8" id="social-proof">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                  <span className="text-xs font-['Quicksand'] font-bold text-[#f48fb1] uppercase tracking-wider">
                    Learner Perspectives
                  </span>
                  <h2 className="font-['Quicksand'] font-bold text-2xl lg:text-3xl text-[#22191b] mt-1">
                    Student Feedback Component
                  </h2>
                  <p className="text-sm text-[#534247] mt-2 leading-relaxed">
                    Structured display layouts for verified course feedback and community discussion
                    snippets.
                  </p>
                </div>
                <div>
                  <span className="px-4 py-1.5 rounded-full bg-[#fff0f2] border border-[#f5e4e7] text-[#964261] text-xs font-['Quicksand'] font-bold shadow-2xs">
                    [Demo Reviews / Sample Layout Structure]
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Demo Card 1 */}
                <div className="p-6 sm:p-7 rounded-3xl bg-white border border-[#fbeaec] shadow-[0_4px_16px_rgba(244,143,177,0.12)] hover:shadow-[0_8px_24px_rgba(244,143,177,0.22)] hover:-translate-y-1 transition-all space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-[#ffe082]">
                      <span className="material-symbols-outlined text-[18px] text-[#ffe082]">star</span>
                      <span className="material-symbols-outlined text-[18px] text-[#ffe082]">star</span>
                      <span className="material-symbols-outlined text-[18px] text-[#ffe082]">star</span>
                      <span className="material-symbols-outlined text-[18px] text-[#ffe082]">star</span>
                      <span className="material-symbols-outlined text-[18px] text-[#ffe082]">star</span>
                    </div>
                    <span className="text-[10px] text-[#534247] uppercase font-['Quicksand'] font-bold">
                      [Demo Review Component]
                    </span>
                  </div>
                  <p className="text-xs text-[#22191b] italic leading-relaxed">
                    “The systematic module progression and lesson tasks helped me structure my
                    weekly speaking practice with consistent clarity.”
                  </p>
                  <div className="pt-3 border-t border-[#f5e4e7] flex items-center justify-between font-['Quicksand']">
                    <div>
                      <p className="text-xs font-bold text-[#22191b]">
                        Sample Learner Note (Placeholder)
                      </p>
                      <p className="text-[11px] text-[#534247]">Enrolled Course Student</p>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-[#fff0f2] text-[#964261] text-[10px] font-bold border border-[#f5e4e7]">
                      Verified Feedback
                    </span>
                  </div>
                </div>

                {/* Demo Card 2 (Social Snippet Layout) */}
                <div className="p-6 sm:p-7 rounded-3xl bg-white border border-[#fbeaec] shadow-[0_4px_16px_rgba(244,143,177,0.12)] hover:shadow-[0_8px_24px_rgba(244,143,177,0.22)] hover:-translate-y-1 transition-all space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] text-[#534247] flex items-center gap-1 font-['Quicksand'] font-bold">
                      <span className="material-symbols-outlined text-[#81d4fa] text-[16px]">
                        chat_bubble_outline
                      </span>
                      <span>Social Discussion (Sample Layout)</span>
                    </span>
                    <span className="text-[10px] text-[#534247] uppercase font-['Quicksand'] font-bold">
                      [Demo UI Card]
                    </span>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-[#fff8f8] border border-[#fbeaec] space-y-1">
                    <p className="text-xs font-['Quicksand'] font-bold text-[#22191b]">
                      Demo Social Comment (Sample Layout)
                    </p>
                    <p className="text-xs text-[#534247]">
                      “The step-by-step interview answering template provided in the practice module
                      was clear and easy to follow.”
                    </p>
                  </div>
                  <div className="pt-3 border-t border-[#f5e4e7] flex items-center justify-between font-['Quicksand']">
                    <div>
                      <p className="text-xs font-bold text-[#22191b]">Sample Community Voice</p>
                      <p className="text-[11px] text-[#534247]">Interview English Module</p>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-[#e1f5fe] text-[#006685] text-[10px] font-bold border border-[#b3e5fc]">
                      Demo Entry
                    </span>
                  </div>
                </div>

                {/* Demo Card 3 */}
                <div className="p-6 sm:p-7 rounded-3xl bg-white border border-[#fbeaec] shadow-[0_4px_16px_rgba(244,143,177,0.12)] hover:shadow-[0_8px_24px_rgba(244,143,177,0.22)] hover:-translate-y-1 transition-all space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-[#ffe082]">
                      <span className="material-symbols-outlined text-[18px] text-[#ffe082]">star</span>
                      <span className="material-symbols-outlined text-[18px] text-[#ffe082]">star</span>
                      <span className="material-symbols-outlined text-[18px] text-[#ffe082]">star</span>
                      <span className="material-symbols-outlined text-[18px] text-[#ffe082]">star</span>
                      <span className="material-symbols-outlined text-[18px] text-[#ffe082]">star</span>
                    </div>
                    <span className="text-[10px] text-[#534247] uppercase font-['Quicksand'] font-bold">
                      [Demo Review Component]
                    </span>
                  </div>
                  <p className="text-xs text-[#22191b] italic leading-relaxed">
                    “The workplace dialogue drills and customer inquiry scenarios gave our service
                    staff practical expressions to use immediately.”
                  </p>
                  <div className="pt-3 border-t border-[#f5e4e7] flex items-center justify-between font-['Quicksand']">
                    <div>
                      <p className="text-xs font-bold text-[#22191b]">
                        Sample Learner Note (Placeholder)
                      </p>
                      <p className="text-[11px] text-[#534247]">Hotel English Module</p>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-[#e8f5e9] text-[#1b5e20] text-[10px] font-bold border border-[#c8e6c9]">
                      Verified Feedback
                    </span>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 8: ABOUT / PLATFORM INFORMATION */}
            <section
              className="rounded-3xl bg-white border border-[#fbeaec] p-8 lg:p-12 shadow-[0_4px_16px_rgba(244,143,177,0.12)]"
              id="about-section"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
                <div className="lg:col-span-5 space-y-4">
                  <div className="p-6 rounded-3xl bg-[#fff0f2] border border-[#f5e4e7] space-y-4 text-center shadow-xs">
                    <img
                      src={TR_THEINT_LOGO_URL}
                      alt="Teacher Theint English"
                      referrerPolicy="no-referrer"
                      className="w-20 h-20 mx-auto rounded-full object-cover border-2 border-[#f48fb1] shadow-[0_2px_8px_rgba(244,143,177,0.25)] bg-white"
                    />
                    <div>
                      <h3 className="font-['Quicksand'] font-bold text-lg text-[#22191b]">
                        Teacher Theint English
                      </h3>
                      <p className="text-xs text-[#534247] font-medium">
                        English Teaching &amp; Learning Platform
                      </p>
                    </div>
                    <div className="p-4 rounded-2xl bg-white border border-[#fbeaec] text-left space-y-2.5 text-xs font-['Quicksand'] font-bold shadow-2xs">
                      <div className="flex items-center gap-2.5 text-[#22191b]">
                        <span className="material-symbols-outlined text-[#f48fb1] text-[18px]">
                          menu_book
                        </span>
                        <span>Structured Academic Curriculum</span>
                      </div>
                      <div className="flex items-center gap-2.5 text-[#22191b]">
                        <span className="material-symbols-outlined text-[#81d4fa] text-[18px]">
                          category
                        </span>
                        <span>7 Approved Target Pathways</span>
                      </div>
                      <div className="flex items-center gap-2.5 text-[#22191b]">
                        <span className="material-symbols-outlined text-[#a5d6a7] text-[18px]">
                          record_voice_over
                        </span>
                        <span>Instructor-Guided Speaking &amp; Listening</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="lg:col-span-7 space-y-5">
                  <div className="space-y-1">
                    <span className="px-3.5 py-1 rounded-full bg-[#fff0f2] border border-[#f5e4e7] text-[#964261] text-xs font-['Quicksand'] font-bold inline-block shadow-2xs">
                      Platform Overview
                    </span>
                    <h2 className="font-['Quicksand'] font-bold text-2xl lg:text-3xl text-[#22191b] pt-1">
                      Clear, Structured English Learning for Practical Fluency.
                    </h2>
                  </div>
                  <p className="text-sm text-[#534247] leading-relaxed">
                    Teacher Theint English is an educational platform dedicated to delivering
                    structured English language courses. The curriculum focuses on building clear
                    grammar comprehension, natural pronunciation, and confident spoken communication
                    across seven tailored pathways: Kids, School English, General English, Business
                    English, Daily Conversation, Hotel English, and Interview English.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    <div className="p-5 rounded-2xl bg-[#fff8f8] border border-[#fbeaec] shadow-2xs">
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className="material-symbols-outlined text-[#f48fb1] text-[18px]">rate_review</span>
                        <p className="text-xs font-['Quicksand'] font-bold text-[#22191b]">One-on-One Feedback</p>
                      </div>
                      <p className="text-xs text-[#534247] leading-relaxed">
                        Assignments and speaking practice receive structured evaluation from
                        instructors to guide individual progress.
                      </p>
                    </div>
                    <div className="p-5 rounded-2xl bg-[#fff8f8] border border-[#fbeaec] shadow-2xs">
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className="material-symbols-outlined text-[#81d4fa] text-[18px]">school</span>
                        <p className="text-xs font-['Quicksand'] font-bold text-[#22191b]">Contextual Lessons</p>
                      </div>
                      <p className="text-xs text-[#534247] leading-relaxed">
                        Concepts are taught through relevant situations and applied drills rather
                        than abstract lists.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 9: BLOG / SOCIAL */}
            <section className="space-y-8" id="blog-social">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                  <span className="px-3.5 py-1 rounded-full bg-[#fff0f2] border border-[#f5e4e7] text-[#964261] text-xs font-['Quicksand'] font-bold inline-block shadow-2xs">
                    Educational Articles
                  </span>
                  <h2 className="font-['Quicksand'] font-bold text-2xl lg:text-3xl text-[#22191b] mt-2">
                    Learning Guides &amp; Insights
                  </h2>
                  <p className="text-sm text-[#534247] mt-1.5 leading-relaxed">
                    Practical language articles, grammar tips, and study strategies prepared by our
                    instructional team.
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <a
                    className="px-4 py-2 rounded-full bg-white border border-[#fbeaec] hover:bg-[#fff0f2] text-[#22191b] text-xs font-['Quicksand'] font-bold transition-all flex items-center gap-2 shadow-2xs hover:shadow-xs"
                    href="https://facebook.com"
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <span className="material-symbols-outlined text-[16px] text-[#81d4fa]">share</span>
                    <span>Facebook</span>
                  </a>
                  <a
                    className="px-4 py-2 rounded-full bg-white border border-[#fbeaec] hover:bg-[#fff0f2] text-[#22191b] text-xs font-['Quicksand'] font-bold transition-all flex items-center gap-2 shadow-2xs hover:shadow-xs"
                    href="https://tiktok.com"
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <span className="material-symbols-outlined text-[16px] text-[#f48fb1]">smart_display</span>
                    <span>TikTok</span>
                  </a>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <article className="p-6 sm:p-7 rounded-3xl bg-white border border-[#fbeaec] shadow-[0_4px_16px_rgba(244,143,177,0.12)] hover:shadow-[0_8px_24px_rgba(244,143,177,0.22)] hover:-translate-y-1 transition-all flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="px-3 py-1 rounded-full bg-[#fff0f2] text-[#964261] text-[11px] font-['Quicksand'] font-bold border border-[#f5e4e7]">
                        Grammar Guide
                      </span>
                      <span className="text-[10px] text-[#534247] font-['Quicksand'] font-bold">[Sample Article]</span>
                    </div>
                    <h3
                      onClick={() => onNavigateScreen('PUB-04-BLOG')}
                      className="font-['Quicksand'] font-bold text-lg text-[#22191b] hover:text-[#f48fb1] transition-colors cursor-pointer"
                    >
                      Common Preposition Usages in Spoken English
                    </h3>
                    <p className="text-xs text-[#534247] leading-relaxed">
                      An overview of frequent preposition pairings (such as at, in, on, and to) and
                      practical mental frameworks to choose correctly in conversation.
                    </p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-[#f5e4e7] flex items-center justify-between text-xs text-[#534247]">
                    <span className="font-medium">Editorial Team • 5 min read</span>
                    <button
                      type="button"
                      onClick={() => onNavigateScreen('PUB-04-BLOG')}
                      className="text-[#f48fb1] hover:text-[#d87395] font-['Quicksand'] font-bold cursor-pointer flex items-center gap-1"
                    >
                      <span>Read Guide</span>
                      <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                    </button>
                  </div>
                </article>

                <article className="p-6 sm:p-7 rounded-3xl bg-white border border-[#fbeaec] shadow-[0_4px_16px_rgba(244,143,177,0.12)] hover:shadow-[0_8px_24px_rgba(244,143,177,0.22)] hover:-translate-y-1 transition-all flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="px-3 py-1 rounded-full bg-[#fff0f2] text-[#964261] text-[11px] font-['Quicksand'] font-bold border border-[#f5e4e7]">
                        Speaking Strategies
                      </span>
                      <span className="text-[10px] text-[#534247] font-['Quicksand'] font-bold">[Sample Article]</span>
                    </div>
                    <h3
                      onClick={() => onNavigateScreen('PUB-04-BLOG')}
                      className="font-['Quicksand'] font-bold text-lg text-[#22191b] hover:text-[#f48fb1] transition-colors cursor-pointer"
                    >
                      Structuring Concise Spoken Answers in Professional Settings
                    </h3>
                    <p className="text-xs text-[#534247] leading-relaxed">
                      Techniques to organize spoken answers clearly, preventing rambling while
                      keeping responses balanced and professional.
                    </p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-[#f5e4e7] flex items-center justify-between text-xs text-[#534247]">
                    <span className="font-medium">Editorial Team • 6 min read</span>
                    <button
                      type="button"
                      onClick={() => onNavigateScreen('PUB-04-BLOG')}
                      className="text-[#f48fb1] hover:text-[#d87395] font-['Quicksand'] font-bold cursor-pointer flex items-center gap-1"
                    >
                      <span>Read Guide</span>
                      <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                    </button>
                  </div>
                </article>
              </div>
            </section>

            {/* SECTION 10: PUBLIC FOOTER */}
            <footer className="rounded-3xl bg-white border border-[#fbeaec] p-8 lg:p-12 shadow-[0_4px_16px_rgba(244,143,177,0.12)] space-y-10">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
                <div className="lg:col-span-2 space-y-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={TR_THEINT_LOGO_URL}
                      alt="Teacher Theint English"
                      referrerPolicy="no-referrer"
                      className="w-10 h-10 rounded-full object-cover border border-[#f5e4e7] shadow-xs bg-white"
                    />
                    <div>
                      <span className="font-['Quicksand'] font-bold text-base text-[#22191b] block">
                        Teacher Theint English
                      </span>
                      <span className="text-[11px] text-[#534247] block">
                        English Teaching &amp; Learning Platform
                      </span>
                    </div>
                  </div>
                  <p className="text-xs text-[#534247] leading-relaxed max-w-sm">
                    Structured English language education platform supporting young learners,
                    students, and professionals through disciplined, practical curriculums.
                  </p>
                  <div className="pt-2 text-xs text-[#534247] flex items-center gap-2">
                    <span className="material-symbols-outlined text-[16px] text-[#f48fb1]">mail</span>
                    <span>Contact &amp; Inquiries: info@teachertheint.edu</span>
                  </div>
                </div>
                <div className="space-y-3">
                  <p className="text-xs font-['Quicksand'] font-bold text-[#22191b] uppercase tracking-wider">
                    Learning Targets
                  </p>
                  <ul className="space-y-2 text-xs text-[#534247]">
                    <li>
                      <a className="hover:text-[#f48fb1] transition-colors" href="#discover-categories">
                        Kids
                      </a>
                    </li>
                    <li>
                      <a className="hover:text-[#f48fb1] transition-colors" href="#discover-categories">
                        School English
                      </a>
                    </li>
                    <li>
                      <a className="hover:text-[#f48fb1] transition-colors" href="#discover-categories">
                        General English
                      </a>
                    </li>
                    <li>
                      <a className="hover:text-[#f48fb1] transition-colors" href="#discover-categories">
                        Business English
                      </a>
                    </li>
                    <li>
                      <a className="hover:text-[#f48fb1] transition-colors" href="#discover-categories">
                        Daily Conversation
                      </a>
                    </li>
                    <li>
                      <a className="hover:text-[#f48fb1] transition-colors" href="#discover-categories">
                        Hotel English
                      </a>
                    </li>
                    <li>
                      <a className="hover:text-[#f48fb1] transition-colors" href="#discover-categories">
                        Interview English
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="space-y-3">
                  <p className="text-xs font-['Quicksand'] font-bold text-[#22191b] uppercase tracking-wider">
                    Resources
                  </p>
                  <ul className="space-y-2 text-xs text-[#534247]">
                    <li>
                      <a className="hover:text-[#f48fb1] transition-colors" href="#free-content">
                        Free Starter Modules
                      </a>
                    </li>
                    <li>
                      <a className="hover:text-[#f48fb1] transition-colors" href="#blog-social">
                        Grammar Guides
                      </a>
                    </li>
                    <li>
                      <a className="hover:text-[#f48fb1] transition-colors" href="#blog-social">
                        Speaking Study Tips
                      </a>
                    </li>
                    <li>
                      <a className="hover:text-[#f48fb1] transition-colors" href="#featured-courses">
                        Course Catalog
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="space-y-3">
                  <p className="text-xs font-['Quicksand'] font-bold text-[#22191b] uppercase tracking-wider">
                    Legal &amp; Policy
                  </p>
                  <ul className="space-y-2 text-xs text-[#534247]">
                    <li>
                      <a className="hover:text-[#f48fb1] transition-colors" href="#view-home">
                        Terms of Service
                      </a>
                    </li>
                    <li>
                      <a className="hover:text-[#f48fb1] transition-colors" href="#view-home">
                        Privacy Policy
                      </a>
                    </li>
                    <li>
                      <a className="hover:text-[#f48fb1] transition-colors" href="#view-home">
                        Payment &amp; Refund Policy
                      </a>
                    </li>
                    <li>
                      <a className="hover:text-[#f48fb1] transition-colors" href="#view-home">
                        Platform Guidelines
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="pt-6 border-t border-[#f5e4e7] flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#534247]">
                <p>© 2025 Teacher Theint English. All rights reserved.</p>
                <div className="flex items-center gap-4">
                  <span className="inline-flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#a5d6a7]"></span> WCAG AA Contrast
                    Calibrated
                  </span>
                  <span>•</span>
                  <span>Strict Hierarchy: Level Inside Course</span>
                </div>
              </div>
            </footer>
          </div>
        )}

        {/* ========================================================= */}
        {/* VIEW 2: COURSES LISTING & COURSE DETAIL VIEW              */}
        {/* ========================================================= */}
        {activeView === 'course' && (
          <div className="space-y-10 animate-fade-in" id="view-course">
            {/* View Top Bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-white border border-[#fbeaec] shadow-2xs">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#fff0f2] hover:bg-[#ffe4e9] text-[#964261] text-xs font-['Quicksand'] font-bold transition-colors cursor-pointer border border-[#f5e4e7]"
                  onClick={() => switchView('home')}
                >
                  <span className="material-symbols-outlined text-[16px]">arrow_back</span>
                  <span>Return to Homepage</span>
                </button>
                <span className="text-xs text-[#534247]">
                  Course Catalog &gt; Course Detail Demonstration
                </span>
              </div>
              <span className="px-3 py-1 rounded-full bg-[#fff0f2] text-[#964261] border border-[#f5e4e7] text-[11px] font-['Quicksand'] font-bold">
                Strict Rule: Level Scoped Inside Course
              </span>
            </div>

            {/* Course Header Card */}
            <div className="p-8 rounded-3xl bg-white border border-[#fbeaec] shadow-[0_4px_16px_rgba(244,143,177,0.12)] space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-3 py-1 rounded-full bg-[#fff0f2] border border-[#f5e4e7] text-[#534247] text-xs font-['Quicksand'] font-bold">
                    Track: Career Communication
                  </span>
                  <span className="px-3 py-1 rounded-full bg-[#fff0f2] text-[#964261] border border-[#f5e4e7] text-xs font-['Quicksand'] font-bold">
                    Target: Business English
                  </span>
                  <span className="px-3 py-1 rounded-full bg-[#e8f5e9] text-[#1b5e20] text-xs font-['Quicksand'] font-bold border border-[#c8e6c9]">
                    Structure: 6 Modules • 20 Lessons
                  </span>
                </div>
                <span className="text-xs text-[#534247] font-semibold">
                  [Sample Course Outline / Admin Managed]
                </span>
              </div>
              <div className="space-y-2">
                <h1 className="font-['Quicksand'] font-bold text-3xl text-[#22191b]">
                  Workplace Correspondence &amp; Meeting Skills
                </h1>
                <p className="text-sm text-[#534247] max-w-3xl leading-relaxed">
                  A structured course providing step-by-step guidance on writing concise emails,
                  phrasing verbal requests, and engaging effectively in team discussions.
                </p>
              </div>
              {/* LEVEL STRICTLY INSIDE COURSE CALLOUT */}
              <div className="p-5 rounded-2xl bg-[#fff8f8] border border-[#fbeaec] space-y-2 shadow-2xs">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#f48fb1] text-[20px]">
                      stacked_bar_chart
                    </span>
                    <span className="text-xs font-['Quicksand'] font-bold text-[#f48fb1] uppercase">
                      Assigned Level (Scoped Strictly Inside This Course)
                    </span>
                  </div>
                  <span className="text-xs font-['Quicksand'] font-bold px-3 py-0.5 rounded-full bg-white border border-[#f5e4e7] text-[#22191b]">
                    Level 2: Intermediate
                  </span>
                </div>
                <p className="text-xs text-[#534247] leading-relaxed">
                  This level focuses on building functional vocabulary for routine business
                  scenarios. Architectural note: Levels have no independent existence outside their
                  enclosing Course.
                </p>
              </div>
            </div>

            {/* Main Syllabus Section & Purchase Sidebar */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <div className="lg:col-span-8 space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="font-['Quicksand'] font-bold text-xl text-[#22191b]">
                    Course Syllabus &amp; Learning Breakdown
                  </h2>
                  <span className="text-xs text-[#534247]">Module &gt; Lesson &gt; Learning Item</span>
                </div>

                {/* Module 1 */}
                <div className="rounded-3xl bg-white border border-[#fbeaec] shadow-[0_4px_16px_rgba(244,143,177,0.12)] p-6 space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-[#f5e4e7]">
                    <div>
                      <span className="text-[11px] font-['Quicksand'] font-bold text-[#f48fb1] uppercase">
                        Module 1
                      </span>
                      <h3 className="font-['Quicksand'] font-bold text-base text-[#22191b]">
                        Professional Written Inquiries
                      </h3>
                    </div>
                    <span className="text-xs text-[#534247] font-medium">3 Lessons • 7 Items</span>
                  </div>
                  <div className="space-y-3 pl-2">
                    <div className="p-4 rounded-2xl bg-[#fff8f8] border border-[#fbeaec] space-y-2 shadow-2xs">
                      <div className="flex items-center justify-between">
                        <p className="text-xs font-['Quicksand'] font-bold text-[#22191b]">
                          Lesson 1.1: Standard Email Openings &amp; Tone Setting
                        </p>
                        <span className="px-2.5 py-0.5 rounded-full bg-[#e8f5e9] text-[#1b5e20] text-[10px] font-['Quicksand'] font-bold border border-[#c8e6c9]">
                          Open Preview
                        </span>
                      </div>
                      <p className="text-[11px] text-[#534247]">
                        Learning items included in this lesson:
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs text-[#534247] pt-1 font-['Quicksand'] font-bold">
                        <div className="flex items-center gap-1.5">
                          <span className="material-symbols-outlined text-[16px] text-[#f48fb1]">
                            play_circle
                          </span>{' '}
                          Video Lecture
                        </div>
                        <div className="flex items-center gap-1.5">
                          <span className="material-symbols-outlined text-[16px] text-[#81d4fa]">
                            article
                          </span>{' '}
                          Vocabulary Sheet
                        </div>
                        <div className="flex items-center gap-1.5">
                          <span className="material-symbols-outlined text-[16px] text-[#a5d6a7]">
                            quiz
                          </span>{' '}
                          Practice Exercise
                        </div>
                      </div>
                    </div>

                    <div className="p-4 rounded-2xl bg-[#fff8f8] border border-[#fbeaec] space-y-2 shadow-2xs">
                      <div className="flex items-center justify-between">
                        <p className="text-xs font-['Quicksand'] font-bold text-[#22191b]">
                          Lesson 1.2: Clarifying Timelines &amp; Dependencies
                        </p>
                        <span className="text-[10px] text-[#534247] font-['Quicksand'] font-bold flex items-center gap-1">
                          <span className="material-symbols-outlined text-[14px] text-[#f48fb1]">lock</span> Course
                          Enrollees
                        </span>
                      </div>
                      <p className="text-[11px] text-[#534247]">
                        Learning items included in this lesson:
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#534247] pt-1 font-['Quicksand'] font-bold">
                        <div className="flex items-center gap-1.5">
                          <span className="material-symbols-outlined text-[16px] text-[#f48fb1]">
                            play_circle
                          </span>{' '}
                          Video Lecture (20 mins)
                        </div>
                        <div className="flex items-center gap-1.5">
                          <span className="material-symbols-outlined text-[16px] text-[#81d4fa]">
                            assignment
                          </span>{' '}
                          Written Assignment
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Module 2 */}
                <div className="rounded-3xl bg-white border border-[#fbeaec] shadow-[0_4px_16px_rgba(244,143,177,0.12)] p-6 space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-[#f5e4e7]">
                    <div>
                      <span className="text-[11px] font-['Quicksand'] font-bold text-[#f48fb1] uppercase">
                        Module 2
                      </span>
                      <h3 className="font-['Quicksand'] font-bold text-base text-[#22191b]">
                        Verbal Updates in Meetings
                      </h3>
                    </div>
                    <span className="text-xs text-[#534247] font-medium">3 Lessons • 6 Items</span>
                  </div>
                  <div className="space-y-3 pl-2">
                    <div className="p-4 rounded-2xl bg-[#fff8f8] border border-[#fbeaec] space-y-2 shadow-2xs">
                      <div className="flex items-center justify-between">
                        <p className="text-xs font-['Quicksand'] font-bold text-[#22191b]">
                          Lesson 2.1: Structuring a Brief Status Report
                        </p>
                        <span className="text-[10px] text-[#534247] font-['Quicksand'] font-bold flex items-center gap-1">
                          <span className="material-symbols-outlined text-[14px] text-[#f48fb1]">lock</span> Course
                          Enrollees
                        </span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#534247] pt-1 font-['Quicksand'] font-bold">
                        <div className="flex items-center gap-1.5">
                          <span className="material-symbols-outlined text-[16px] text-[#f48fb1]">
                            play_circle
                          </span>{' '}
                          Video Lecture (18 mins)
                        </div>
                        <div className="flex items-center gap-1.5">
                          <span className="material-symbols-outlined text-[16px] text-[#a5d6a7]">
                            mic
                          </span>{' '}
                          Audio Task (One-on-One Feedback)
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Course Enrollment Action Card */}
              <div className="lg:col-span-4 space-y-6">
                <div className="p-6 rounded-3xl bg-white border border-[#fbeaec] shadow-[0_4px_16px_rgba(244,143,177,0.12)] space-y-6 sticky top-24">
                  <div className="space-y-1">
                    <span className="text-[11px] font-['Quicksand'] font-bold text-[#f48fb1] uppercase tracking-wider">
                      Course Status
                    </span>
                    <p className="font-['Quicksand'] font-bold text-lg text-[#22191b]">Paid Course (Pricing TBD)</p>
                    <p className="text-xs text-[#534247]">
                      Pricing and cohort schedules managed directly by platform admin.
                    </p>
                  </div>
                  <div className="space-y-3 text-xs text-[#22191b] border-t border-b border-[#f5e4e7] py-4">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-[#f48fb1] text-[18px]">
                        check_circle
                      </span>
                      <span>Access to all 6 modules &amp; lesson items</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-[#f48fb1] text-[18px]">
                        check_circle
                      </span>
                      <span>Audio task evaluation with One-on-One feedback</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-[#f48fb1] text-[18px]">
                        check_circle
                      </span>
                      <span>Printable practice templates &amp; audio models</span>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <button
                      type="button"
                      className="w-full btn-tactile-primary py-3 text-xs flex items-center justify-center gap-2 cursor-pointer"
                      onClick={() => onNavigateScreen('AUTH-02-REGISTER')}
                    >
                      <span className="material-symbols-outlined text-[18px]">how_to_reg</span>
                      <span>Register to Enroll</span>
                    </button>
                    <button
                      type="button"
                      className="w-full py-2.5 rounded-full bg-[#fff0f2] hover:bg-[#ffe4e9] text-[#964261] text-xs font-['Quicksand'] font-bold transition-colors flex items-center justify-center gap-2 cursor-pointer border border-[#f5e4e7]"
                      onClick={triggerImmediateFreeAccess}
                    >
                      <span className="material-symbols-outlined text-[18px]">play_circle</span>
                      <span>Preview Free Lesson 1.1</span>
                    </button>
                    <p className="text-center text-[10px] text-[#534247]">
                      Free lessons open instantly without enrollment record.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* VIEW 3: AUTHENTICATION (Login & Student Register ONLY)    */}
        {/* ========================================================= */}
        {activeView === 'auth' && (
          <div className="space-y-8" id="view-auth">
            <div className="max-w-xl mx-auto space-y-6">
              <div className="text-center space-y-2">
                <span className="px-3.5 py-1 rounded-full bg-[#fff0f2] border border-[#f5e4e7] text-[#964261] text-xs font-['Quicksand'] font-bold inline-block shadow-2xs">
                  Student Access
                </span>
                <h2 className="font-['Quicksand'] font-bold text-3xl text-[#22191b]">
                  Student Portal Authentication
                </h2>
                <p className="text-xs text-[#534247]">
                  Clean credentials access for enrolled and new learners.
                </p>
              </div>
              {/* Institutional Staff Boundary Notice */}
              <div className="p-4 rounded-2xl bg-[#fff0f2] border border-[#f5e4e7] text-xs text-[#534247] flex items-start gap-3 shadow-2xs">
                <span className="material-symbols-outlined text-[#f48fb1] text-[22px] shrink-0">
                  info
                </span>
                <div>
                  <span className="font-['Quicksand'] font-bold text-[#22191b]">
                    Teacher &amp; Administrator Account Policy:
                  </span>
                  <span>
                    {' '}
                    Instructor and staff accounts are strictly managed and provisioned by the
                    platform Administrator. There is no public self-registration for Teacher or
                    Admin roles.
                  </span>
                </div>
              </div>

              {/* Switcher: Log In vs Student Register */}
              <div className="p-1.5 rounded-full bg-[#fff0f2] border border-[#f5e4e7] flex text-center text-xs font-['Quicksand'] font-bold">
                <button
                  type="button"
                  onClick={() => toggleAuthTab('login')}
                  className={
                    authTab === 'login'
                      ? 'flex-1 py-2.5 rounded-full bg-white text-[#964261] shadow-xs transition-all font-bold cursor-pointer'
                      : 'flex-1 py-2.5 rounded-full text-[#534247] hover:text-[#22191b] transition-all font-semibold cursor-pointer'
                  }
                >
                  Student Log In
                </button>
                <button
                  type="button"
                  onClick={() => toggleAuthTab('register')}
                  className={
                    authTab === 'register'
                      ? 'flex-1 py-2.5 rounded-full bg-white text-[#964261] shadow-xs transition-all font-bold cursor-pointer'
                      : 'flex-1 py-2.5 rounded-full text-[#534247] hover:text-[#22191b] transition-all font-semibold cursor-pointer'
                  }
                >
                  New Student Registration
                </button>
              </div>

              {/* Login Form Card */}
              {authTab === 'login' && (
                <div className="p-8 rounded-3xl bg-white border border-[#fbeaec] shadow-[0_4px_16px_rgba(244,143,177,0.14)] space-y-5">
                  <div className="space-y-1">
                    <h3 className="font-['Quicksand'] font-bold text-lg text-[#22191b]">
                      Sign In to Your Student Account
                    </h3>
                    <p className="text-xs text-[#534247]">
                      Enter your registered email address or mobile phone number.
                    </p>
                  </div>
                  <form
                    className="space-y-4"
                    onSubmit={(e) => {
                      e.preventDefault();
                      onNavigateScreen('STU-01-PORTAL');
                    }}
                  >
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-['Quicksand'] font-bold text-[#22191b] uppercase">
                        Email or Mobile Phone
                      </label>
                      <input
                        className="w-full px-4 py-3 rounded-full border border-[#f5e4e7] bg-[#fff8f8] text-xs text-[#22191b] placeholder:text-[#867277] focus:outline-none focus:ring-2 focus:ring-[#f48fb1]"
                        placeholder="e.g. learner@example.com or 09xxxxxxxxx"
                        type="text"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between">
                        <label className="text-[11px] font-['Quicksand'] font-bold text-[#22191b] uppercase">
                          Password
                        </label>
                        <button
                          type="button"
                          onClick={() => onNavigateScreen('AUTH-03-VERIFY-EMAIL')}
                          className="text-[11px] text-[#f48fb1] font-['Quicksand'] font-bold hover:underline cursor-pointer"
                        >
                          Forgot password?
                        </button>
                      </div>
                      <input
                        className="w-full px-4 py-3 rounded-full border border-[#f5e4e7] bg-[#fff8f8] text-xs text-[#22191b] placeholder:text-[#867277] focus:outline-none focus:ring-2 focus:ring-[#f48fb1]"
                        placeholder="Enter your password"
                        type="password"
                      />
                    </div>
                    <button
                      type="submit"
                      className="btn-tactile-primary w-full py-3.5 text-sm cursor-pointer mt-2"
                    >
                      Sign In
                    </button>
                  </form>
                </div>
              )}

              {/* Register Form Card: STRICT FIELDS: Email, Phone, Password, Confirm Password ONLY */}
              {authTab === 'register' && (
                <div className="p-8 rounded-3xl bg-white border border-[#fbeaec] shadow-[0_4px_16px_rgba(244,143,177,0.14)] space-y-5">
                  <div className="space-y-1">
                    <h3 className="font-['Quicksand'] font-bold text-lg text-[#22191b]">Create Student Account</h3>
                    <p className="text-xs text-[#534247]">
                      Register as a student. All other platform roles are admin-provisioned.
                    </p>
                  </div>
                  <form
                    className="space-y-4"
                    onSubmit={(e) => {
                      e.preventDefault();
                      onNavigateScreen('AUTH-03-VERIFY-EMAIL');
                    }}
                  >
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-['Quicksand'] font-bold text-[#22191b] uppercase">
                        Email Address
                      </label>
                      <input
                        className="w-full px-4 py-3 rounded-full border border-[#f5e4e7] bg-[#fff8f8] text-xs text-[#22191b] placeholder:text-[#867277] focus:outline-none focus:ring-2 focus:ring-[#f48fb1]"
                        placeholder="learner@example.com"
                        required
                        type="email"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-['Quicksand'] font-bold text-[#22191b] uppercase">
                        Phone Number
                      </label>
                      <input
                        className="w-full px-4 py-3 rounded-full border border-[#f5e4e7] bg-[#fff8f8] text-xs text-[#22191b] placeholder:text-[#867277] focus:outline-none focus:ring-2 focus:ring-[#f48fb1]"
                        placeholder="09xxxxxxxxx"
                        required
                        type="tel"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-['Quicksand'] font-bold text-[#22191b] uppercase">
                        Password
                      </label>
                      <input
                        className="w-full px-4 py-3 rounded-full border border-[#f5e4e7] bg-[#fff8f8] text-xs text-[#22191b] placeholder:text-[#867277] focus:outline-none focus:ring-2 focus:ring-[#f48fb1]"
                        placeholder="Create a secure password"
                        required
                        type="password"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-['Quicksand'] font-bold text-[#22191b] uppercase">
                        Confirm Password
                      </label>
                      <input
                        className="w-full px-4 py-3 rounded-full border border-[#f5e4e7] bg-[#fff8f8] text-xs text-[#22191b] placeholder:text-[#867277] focus:outline-none focus:ring-2 focus:ring-[#f48fb1]"
                        placeholder="Re-enter password"
                        required
                        type="password"
                      />
                    </div>
                    <button
                      type="submit"
                      className="btn-tactile-primary w-full py-3.5 text-sm cursor-pointer mt-2"
                    >
                      Complete Student Registration
                    </button>
                  </form>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* VIEW 4: PUBLIC SYSTEM STATES                              */}
        {/* ========================================================= */}
        {activeView === 'states' && (
          <div className="space-y-10" id="view-states">
            <div>
              <span className="px-3.5 py-1 rounded-full bg-[#fff0f2] border border-[#f5e4e7] text-[#964261] text-xs font-['Quicksand'] font-bold inline-block shadow-2xs">
                Error &amp; Fallback Specifications
              </span>
              <h2 className="font-['Quicksand'] font-bold text-2xl lg:text-3xl text-[#22191b] mt-2">
                Public System State Handling
              </h2>
              <p className="text-xs text-[#534247] mt-1.5 leading-relaxed">
                Explicit visual differentiation between authentication failure, role authorization
                limits, missing resources, data fetching, and zero search matches.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* 1. 401 Unauthenticated State */}
              <div className="p-6 sm:p-7 rounded-3xl bg-white border border-[#fbeaec] shadow-[0_4px_16px_rgba(244,143,177,0.12)] flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <div className="w-12 h-12 rounded-2xl bg-[#fffde7] border border-[#ffe082] text-[#dcb236] flex items-center justify-center shadow-xs">
                    <span className="material-symbols-outlined text-2xl text-[#dcb236]">lock</span>
                  </div>
                  <div>
                    <span className="text-[11px] font-['Quicksand'] font-bold text-[#dcb236] uppercase tracking-wider">
                      HTTP 401
                    </span>
                    <h3 className="font-['Quicksand'] font-bold text-base text-[#22191b]">Authentication Required</h3>
                  </div>
                  <p className="text-xs text-[#534247] leading-relaxed">
                    You must be logged in as a registered student to access this learning resource
                    or lesson feedback item.
                  </p>
                </div>
                <button
                  type="button"
                  className="btn-tactile-secondary w-full py-2.5 text-xs cursor-pointer"
                  onClick={() => onNavigateScreen('AUTH-01-LOGIN')}
                >
                  Log In to Continue
                </button>
              </div>

              {/* 2. 403 Forbidden State */}
              <div className="p-6 sm:p-7 rounded-3xl bg-white border border-[#fbeaec] shadow-[0_4px_16px_rgba(244,143,177,0.12)] flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <div className="w-12 h-12 rounded-2xl bg-[#ffdad6] text-[#ba1a1a] flex items-center justify-center shadow-xs">
                    <span className="material-symbols-outlined text-2xl">gpp_bad</span>
                  </div>
                  <div>
                    <span className="text-[11px] font-['Quicksand'] font-bold text-[#ba1a1a] uppercase tracking-wider">
                      HTTP 403
                    </span>
                    <h3 className="font-['Quicksand'] font-bold text-base text-[#22191b]">Access Forbidden</h3>
                  </div>
                  <p className="text-xs text-[#534247] leading-relaxed">
                    Your current account does not have authorization to view this area. Teaching,
                    grading, and administrative consoles are restricted to authorized personnel.
                  </p>
                </div>
                <button
                  type="button"
                  className="w-full py-2.5 rounded-full bg-[#fff0f2] hover:bg-[#ffe4e9] text-[#964261] text-xs font-['Quicksand'] font-bold transition-all shadow-xs cursor-pointer"
                  onClick={() => switchView('home')}
                >
                  Return to Public Homepage
                </button>
              </div>

              {/* 3. 404 Not Found State */}
              <div className="p-6 sm:p-7 rounded-3xl bg-white border border-[#fbeaec] shadow-[0_4px_16px_rgba(244,143,177,0.12)] flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <div className="w-12 h-12 rounded-2xl bg-[#fff0f2] border border-[#f5e4e7] text-[#f48fb1] flex items-center justify-center shadow-xs">
                    <span className="material-symbols-outlined text-2xl">search_off</span>
                  </div>
                  <div>
                    <span className="text-[11px] font-['Quicksand'] font-bold text-[#f48fb1] uppercase tracking-wider">
                      HTTP 404
                    </span>
                    <h3 className="font-['Quicksand'] font-bold text-base text-[#22191b]">Resource Not Located</h3>
                  </div>
                  <p className="text-xs text-[#534247] leading-relaxed">
                    The curriculum item, lesson, or article you requested does not exist or may
                    have been reorganized within a course.
                  </p>
                </div>
                <button
                  type="button"
                  className="btn-tactile-primary w-full py-2.5 text-xs cursor-pointer"
                  onClick={() => switchView('home')}
                >
                  Back to Course Index
                </button>
              </div>

              {/* 4. Skeleton Loading State */}
              <div className="p-6 sm:p-7 rounded-3xl bg-white border border-[#fbeaec] shadow-[0_4px_16px_rgba(244,143,177,0.12)] space-y-4">
                <div className="flex items-center justify-between pb-2 border-b border-[#f5e4e7]">
                  <span className="text-[11px] font-['Quicksand'] font-bold text-[#f48fb1] uppercase tracking-wider">
                    Loading Skeleton State
                  </span>
                  <span className="text-[10px] text-[#534247] font-medium">Simulated Content Fetch</span>
                </div>
                <div className="space-y-3 animate-pulse">
                  <div className="h-4 w-1/3 rounded-full bg-[#f5e4e7]"></div>
                  <div className="h-6 w-3/4 rounded-full bg-[#ffd9e2]"></div>
                  <div className="h-3 w-full rounded-full bg-[#fff0f2]"></div>
                  <div className="h-3 w-5/6 rounded-full bg-[#fff0f2]"></div>
                  <div className="space-y-2 pt-2">
                    <div className="h-10 w-full rounded-2xl bg-[#fff0f2]"></div>
                    <div className="h-10 w-full rounded-2xl bg-[#fff0f2]"></div>
                  </div>
                </div>
              </div>

              {/* 5. Empty Search Results State */}
              <div className="p-6 sm:p-7 rounded-3xl bg-white border border-[#fbeaec] shadow-[0_4px_16px_rgba(244,143,177,0.12)] flex flex-col justify-between space-y-4 md:col-span-2 lg:col-span-2">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-[#eef8ff] border border-[#81d4fa]/30 text-[#006685] flex items-center justify-center shrink-0 shadow-xs">
                    <span className="material-symbols-outlined text-3xl text-[#006685]">find_in_page</span>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-['Quicksand'] font-bold text-[#f48fb1] uppercase tracking-wider">
                        Catalog Search State
                      </span>
                      <span className="px-3 py-0.5 rounded-full bg-[#fff0f2] text-[10px] font-['Quicksand'] font-bold text-[#964261]">
                        0 Query Results
                      </span>
                    </div>
                    <h3 className="font-['Quicksand'] font-bold text-lg text-[#22191b]">
                      No Courses Matching Current Filters
                    </h3>
                    <p className="text-xs text-[#534247] leading-relaxed">
                      No syllabus matched your query filter. Try selecting one of the 7 approved
                      learning pathways or clear keywords to view all course listings.
                    </p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-3 pt-3 border-t border-[#f5e4e7]">
                  <button
                    type="button"
                    className="px-4 py-2 rounded-full bg-[#fff0f2] hover:bg-[#ffe4e9] text-[#964261] text-xs font-['Quicksand'] font-bold transition-all shadow-xs cursor-pointer"
                    onClick={() => switchView('home')}
                  >
                    Reset Filters
                  </button>
                  <button
                    type="button"
                    className="btn-tactile-secondary px-5 py-2 text-xs cursor-pointer"
                    onClick={() => switchView('course')}
                  >
                    Browse All Pathways
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Notification Toast: Demonstrates Free Course Rule (Immediate Access, NO Enrollment Record) */}
        <div
          className={`fixed bottom-20 right-8 z-50 transform transition-all duration-300 pointer-events-none ${
            freeAccessToastVisible ? 'translate-y-0 opacity-100' : 'translate-y-24 opacity-0'
          }`}
          id="toast-free-access"
        >
          <div className="p-4 rounded-2xl bg-white border border-[#fbeaec] shadow-[0_8px_30px_rgba(244,143,177,0.25)] flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#a5d6a7] flex items-center justify-center text-[#1e3a20] shadow-xs">
              <span className="material-symbols-outlined text-[20px]">lock_open</span>
            </div>
            <div>
              <p className="text-xs font-['Quicksand'] font-bold text-[#22191b]">Free Lesson Opened Instantly</p>
              <p className="text-[11px] text-[#534247]">
                Immediate access granted. Under platform rules, zero enrollment record is created.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
