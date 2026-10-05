import React, { useState } from 'react';
import { LanguageCode, ScreenId } from '../../../types/navigation';
import { PublicNavbar } from '../../navigation/PublicNavbar';
import { CourseDetailPage } from './CourseDetailPage';

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
    <div className="bg-[#FCFAF9] min-h-screen text-[#2D2529] antialiased selection:bg-[#F3DDE3] selection:text-[#B75E78] pb-24">
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
          <div className="space-y-20" id="view-home">

            {/* SECTION 2: CLIENT CONTEXT / HERO (Educational, answering 'What can I learn?' -> 'Which course should I choose?') */}
            <section className="relative overflow-hidden rounded-xl bg-white border border-[#E9DDE1] p-8 lg:p-14 shadow-sm">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
                <div className="lg:col-span-7 space-y-6">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F7F1F3] border border-[#E9DDE1] text-[#B75E78] text-xs font-semibold">
                    <span className="material-symbols-outlined text-[16px]">menu_book</span>
                    <span>Educational Guidance &amp; Clear Learning Pathways</span>
                  </div>
                  <div className="space-y-3">
                    <p className="text-xs font-bold tracking-wider text-[#B75E78] uppercase">
                      What can I learn? • Which course should I choose?
                    </p>
                    <h1 className="font-serif text-3xl lg:text-4xl text-[#2D2529] leading-tight">
                      Structured English Learning Built for Real Practical Progress.
                    </h1>
                  </div>
                  <p className="text-base text-[#766A70] max-w-xl leading-relaxed">
                    Find the right learning track for your personal, academic, or professional
                    journey. From essential foundation skills to advanced situational communication,
                    discover clearly organized courses guided step-by-step.
                  </p>
                  <div className="flex flex-wrap gap-4 pt-2">
                    <a
                      className="px-6 py-3 rounded-sm bg-[#B75E78] hover:bg-[#93415a] text-white text-sm font-bold shadow-sm transition-all inline-flex items-center gap-2"
                      href="#discover-categories"
                    >
                      <span>Explore Learning Targets</span>
                      <span className="material-symbols-outlined text-[18px]">arrow_downward</span>
                    </a>
                    <a
                      className="px-6 py-3 rounded-sm bg-[#F7F1F3] hover:bg-[#E9DDE1] text-[#2D2529] text-sm font-bold transition-colors inline-flex items-center gap-2"
                      href="#free-content"
                    >
                      <span>View Free Starter Content</span>
                      <span className="material-symbols-outlined text-[18px]">play_circle</span>
                    </a>
                  </div>
                  {/* Educational Pillars */}
                  <div className="grid grid-cols-3 gap-4 pt-4 border-t border-[#E9DDE1]">
                    <div className="p-3 rounded-sm bg-[#FCFAF9] border border-[#E9DDE1]">
                      <span className="material-symbols-outlined text-[#B75E78] mb-1 text-[20px]">
                        account_tree
                      </span>
                      <p className="text-xs font-bold text-[#2D2529]">Clear Pathways</p>
                      <p className="text-[11px] text-[#766A70]">Step-by-step progression</p>
                    </div>
                    <div className="p-3 rounded-sm bg-[#FCFAF9] border border-[#E9DDE1]">
                      <span className="material-symbols-outlined text-[#B75E78] mb-1 text-[20px]">
                        mic
                      </span>
                      <p className="text-xs font-bold text-[#2D2529]">Practical Speaking</p>
                      <p className="text-[11px] text-[#766A70]">Direct verbal practice</p>
                    </div>
                    <div className="p-3 rounded-sm bg-[#FCFAF9] border border-[#E9DDE1]">
                      <span className="material-symbols-outlined text-[#B75E78] mb-1 text-[20px]">
                        forum
                      </span>
                      <p className="text-xs font-bold text-[#2D2529]">One-on-One Support</p>
                      <p className="text-[11px] text-[#766A70]">Instructor guidance</p>
                    </div>
                  </div>
                </div>

                {/* Academic Hierarchy Diagram Card: Track -> Course -> Level -> Module -> Lesson -> Learning Item */}
                <div className="lg:col-span-5 relative">
                  <div className="p-6 rounded-xl bg-[#F7F1F3] border border-[#E9DDE1] shadow-sm space-y-4">
                    <div className="flex items-center justify-between pb-3 border-b border-[#E9DDE1]">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#B75E78]"></span>
                        <p className="text-xs font-bold text-[#2D2529]">
                          Curriculum Hierarchy Architecture
                        </p>
                      </div>
                      <span className="px-2 py-0.5 rounded-full bg-white text-[#766A70] text-[10px] font-semibold border border-[#E9DDE1]">
                        Core Spec
                      </span>
                    </div>
                    <div className="space-y-2.5 text-xs">
                      <div className="p-3 rounded-sm bg-white border border-[#E9DDE1] shadow-xs flex items-center justify-between">
                        <div>
                          <p className="text-[10px] font-bold text-[#B75E78] uppercase">
                            1. Track
                          </p>
                          <p className="font-bold text-[#2D2529]">
                            Professional Communication Track
                          </p>
                        </div>
                        <span className="material-symbols-outlined text-[#B75E78] text-[18px]">
                          account_tree
                        </span>
                      </div>
                      <div className="ml-4 p-3 rounded-sm bg-white border border-[#E9DDE1] shadow-xs flex items-center justify-between">
                        <div>
                          <p className="text-[10px] font-bold text-[#8d4a5c] uppercase">
                            2. Course
                          </p>
                          <p className="font-bold text-[#2D2529]">
                            Business Communication Essentials
                          </p>
                        </div>
                        <span className="material-symbols-outlined text-[#8d4a5c] text-[18px]">
                          business_center
                        </span>
                      </div>
                      {/* Strictly scoped Level in Course */}
                      <div className="ml-8 p-3 rounded-sm bg-[#F3DDE3] border border-[#D8899D] shadow-xs flex items-center justify-between">
                        <div>
                          <p className="text-[10px] font-bold text-[#B75E78] uppercase">
                            3. Level (Strictly Inside Course)
                          </p>
                          <p className="font-bold text-[#2D2529]">
                            Level 2: Intermediate Workplace
                          </p>
                        </div>
                        <span className="material-symbols-outlined text-[#B75E78] text-[18px]">
                          stacked_bar_chart
                        </span>
                      </div>
                      <div className="ml-12 p-3 rounded-sm bg-white border border-[#E9DDE1] shadow-xs flex items-center justify-between">
                        <div>
                          <p className="text-[10px] font-bold text-[#766A70] uppercase">
                            4. Module &amp; 5. Lesson &amp; 6. Learning Item
                          </p>
                          <p className="font-medium text-[#2D2529]">
                            Module 1 &gt; Lesson 2: Email Etiquette
                          </p>
                          <span className="text-[11px] text-[#766A70]">
                            Items: Video Lecture • Practice Drill • Audio Task
                          </span>
                        </div>
                        <span className="material-symbols-outlined text-[#B75E78] text-[18px]">
                          play_circle
                        </span>
                      </div>
                    </div>
                    <div className="p-2.5 rounded-sm bg-white border border-[#E9DDE1] text-[#766A70] text-[11px] flex items-center gap-2">
                      <span className="material-symbols-outlined text-[#B75E78] text-[16px]">
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
                  <span className="text-xs font-bold text-[#B75E78] uppercase tracking-wider">
                    Curriculum Breadth
                  </span>
                  <h2 className="font-serif text-2xl lg:text-3xl text-[#2D2529] mt-1">
                    What You Can Learn
                  </h2>
                  <p className="text-sm text-[#766A70] mt-2 max-w-2xl">
                    Explore the 7 core learning categories supported on the Teacher Theint English
                    platform, structured for learners at distinct life and career stages.
                  </p>
                </div>
                <div className="text-xs font-semibold text-[#766A70]">
                  <span>7 Approved Learning Targets</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {/* 1. Kids */}
                <div className="rounded-xl bg-white border border-[#E9DDE1] p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="w-12 h-12 rounded-lg bg-[#F3DDE3] flex items-center justify-center text-[#B75E78]">
                      <span className="material-symbols-outlined text-2xl">child_care</span>
                    </div>
                    <h3 className="font-bold text-base text-[#2D2529]">1. Kids</h3>
                    <div className="space-y-1">
                      <p className="text-[11px] font-bold text-[#B75E78] uppercase">
                        Target Learner
                      </p>
                      <p className="text-xs text-[#766A70]">
                        Young learners developing early linguistic habits
                      </p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-[11px] font-bold text-[#8d4a5c] uppercase">
                        Learning Purpose
                      </p>
                      <p className="text-xs text-[#2D2529]">
                        Foundational phonics, positive speaking confidence, and age-calibrated
                        reading drills.
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    className="mt-6 w-full py-2.5 rounded-sm bg-[#F7F1F3] hover:bg-[#E9DDE1] text-[#2D2529] text-xs font-bold transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                    onClick={() => switchView('course')}
                  >
                    <span>View Kids Courses</span>
                    <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                  </button>
                </div>

                {/* 2. School English */}
                <div className="rounded-xl bg-white border border-[#E9DDE1] p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="w-12 h-12 rounded-lg bg-[#F3DDE3] flex items-center justify-center text-[#B75E78]">
                      <span className="material-symbols-outlined text-2xl">school</span>
                    </div>
                    <h3 className="font-bold text-base text-[#2D2529]">2. School English</h3>
                    <div className="space-y-1">
                      <p className="text-[11px] font-bold text-[#B75E78] uppercase">
                        Target Learner
                      </p>
                      <p className="text-xs text-[#766A70]">
                        Primary, middle, and high school academic students
                      </p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-[11px] font-bold text-[#8d4a5c] uppercase">
                        Learning Purpose
                      </p>
                      <p className="text-xs text-[#2D2529]">
                        Academic grammar mastery, reading comprehension, exam prep, and formal
                        writing structure.
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    className="mt-6 w-full py-2.5 rounded-sm bg-[#F7F1F3] hover:bg-[#E9DDE1] text-[#2D2529] text-xs font-bold transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                    onClick={() => switchView('course')}
                  >
                    <span>View School Courses</span>
                    <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                  </button>
                </div>

                {/* 3. General English */}
                <div className="rounded-xl bg-white border border-[#E9DDE1] p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="w-12 h-12 rounded-lg bg-[#F3DDE3] flex items-center justify-center text-[#B75E78]">
                      <span className="material-symbols-outlined text-2xl">language</span>
                    </div>
                    <h3 className="font-bold text-base text-[#2D2529]">3. General English</h3>
                    <div className="space-y-1">
                      <p className="text-[11px] font-bold text-[#B75E78] uppercase">
                        Target Learner
                      </p>
                      <p className="text-xs text-[#766A70]">
                        Adult learners strengthening core communication
                      </p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-[11px] font-bold text-[#8d4a5c] uppercase">
                        Learning Purpose
                      </p>
                      <p className="text-xs text-[#2D2529]">
                        Comprehensive grammar, listening retention, vocabulary enrichment, and
                        conversational ease.
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    className="mt-6 w-full py-2.5 rounded-sm bg-[#F7F1F3] hover:bg-[#E9DDE1] text-[#2D2529] text-xs font-bold transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                    onClick={() => switchView('course')}
                  >
                    <span>View General Courses</span>
                    <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                  </button>
                </div>

                {/* 4. Business English */}
                <div className="rounded-xl bg-white border border-[#E9DDE1] p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="w-12 h-12 rounded-lg bg-[#F3DDE3] flex items-center justify-center text-[#B75E78]">
                      <span className="material-symbols-outlined text-2xl">business_center</span>
                    </div>
                    <h3 className="font-bold text-base text-[#2D2529]">4. Business English</h3>
                    <div className="space-y-1">
                      <p className="text-[11px] font-bold text-[#B75E78] uppercase">
                        Target Learner
                      </p>
                      <p className="text-xs text-[#766A70]">
                        Working professionals, team leads, and managers
                      </p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-[11px] font-bold text-[#8d4a5c] uppercase">
                        Learning Purpose
                      </p>
                      <p className="text-xs text-[#2D2529]">
                        Formal workplace correspondence, meeting contributions, presentations, and
                        executive dialogue.
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    className="mt-6 w-full py-2.5 rounded-sm bg-[#F7F1F3] hover:bg-[#E9DDE1] text-[#2D2529] text-xs font-bold transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                    onClick={() => switchView('course')}
                  >
                    <span>View Business Courses</span>
                    <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                  </button>
                </div>

                {/* 5. Daily Conversation */}
                <div className="rounded-xl bg-white border border-[#E9DDE1] p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="w-12 h-12 rounded-lg bg-[#F3DDE3] flex items-center justify-center text-[#B75E78]">
                      <span className="material-symbols-outlined text-2xl">forum</span>
                    </div>
                    <h3 className="font-bold text-base text-[#2D2529]">5. Daily Conversation</h3>
                    <div className="space-y-1">
                      <p className="text-[11px] font-bold text-[#B75E78] uppercase">
                        Target Learner
                      </p>
                      <p className="text-xs text-[#766A70]">
                        Learners seeking natural, everyday spoken fluency
                      </p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-[11px] font-bold text-[#8d4a5c] uppercase">
                        Learning Purpose
                      </p>
                      <p className="text-xs text-[#2D2529]">
                        Spontaneous speaking exercises, social phrasing, travel dialogue, and
                        accent clarity.
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    className="mt-6 w-full py-2.5 rounded-sm bg-[#F7F1F3] hover:bg-[#E9DDE1] text-[#2D2529] text-xs font-bold transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                    onClick={() => switchView('course')}
                  >
                    <span>View Conversation Courses</span>
                    <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                  </button>
                </div>

                {/* 6. Hotel English */}
                <div className="rounded-xl bg-white border border-[#E9DDE1] p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="w-12 h-12 rounded-lg bg-[#F3DDE3] flex items-center justify-center text-[#B75E78]">
                      <span className="material-symbols-outlined text-2xl">hotel</span>
                    </div>
                    <h3 className="font-bold text-base text-[#2D2529]">6. Hotel English</h3>
                    <div className="space-y-1">
                      <p className="text-[11px] font-bold text-[#B75E78] uppercase">
                        Target Learner
                      </p>
                      <p className="text-xs text-[#766A70]">
                        Hospitality professionals, front desk, and service staff
                      </p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-[11px] font-bold text-[#8d4a5c] uppercase">
                        Learning Purpose
                      </p>
                      <p className="text-xs text-[#2D2529]">
                        Guest check-in dialogue, courteous service vocabulary, polite
                        problem-solving, and telephone manners.
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    className="mt-6 w-full py-2.5 rounded-sm bg-[#F7F1F3] hover:bg-[#E9DDE1] text-[#2D2529] text-xs font-bold transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                    onClick={() => switchView('course')}
                  >
                    <span>View Hotel Courses</span>
                    <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                  </button>
                </div>

                {/* 7. Interview English */}
                <div className="rounded-xl bg-white border border-[#E9DDE1] p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between md:col-span-2 lg:col-span-1">
                  <div className="space-y-3">
                    <div className="w-12 h-12 rounded-lg bg-[#F3DDE3] flex items-center justify-center text-[#B75E78]">
                      <span className="material-symbols-outlined text-2xl">psychology_alt</span>
                    </div>
                    <h3 className="font-bold text-base text-[#2D2529]">7. Interview English</h3>
                    <div className="space-y-1">
                      <p className="text-[11px] font-bold text-[#B75E78] uppercase">
                        Target Learner
                      </p>
                      <p className="text-xs text-[#766A70]">
                        Job candidates preparing for employment interviews
                      </p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-[11px] font-bold text-[#8d4a5c] uppercase">
                        Learning Purpose
                      </p>
                      <p className="text-xs text-[#2D2529]">
                        Structured response formulation, self-introduction, behavioral questions,
                        and professional tone.
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    className="mt-6 w-full py-2.5 rounded-sm bg-[#F7F1F3] hover:bg-[#E9DDE1] text-[#2D2529] text-xs font-bold transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
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
                  <span className="text-xs font-bold text-[#B75E78] uppercase tracking-wider">
                    Curriculum Selection
                  </span>
                  <h2 className="font-serif text-2xl lg:text-3xl text-[#2D2529] mt-1">
                    Featured Courses
                  </h2>
                  <p className="text-sm text-[#766A70] mt-2 max-w-2xl">
                    Review course structures and syllabuses to determine which level fits your
                    current learning stage.
                  </p>
                </div>
                <div>
                  <span className="px-3 py-1 rounded-full bg-[#F7F1F3] border border-[#E9DDE1] text-[#766A70] text-xs font-semibold">
                    [Sample Course Catalog / Demo Data]
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Sample Course Card 1: Free Starter */}
                <div className="rounded-xl bg-white border border-[#E9DDE1] p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-1 rounded-sm bg-[#F7F1F3] border border-[#E9DDE1] text-[#B75E78] text-[11px] font-bold">
                        Level 1: Starter (Inside Course)
                      </span>
                      <span className="text-xs font-bold text-[#6F9D83] bg-[#F1F7F4] px-2 py-0.5 rounded-full border border-[#6F9D83]/20">
                        FREE
                      </span>
                    </div>
                    <div>
                      <span className="text-[11px] font-bold text-[#766A70] uppercase">
                        Learning Target: General English
                      </span>
                      <h3 className="font-bold text-base text-[#2D2529] mt-0.5">
                        Foundation English Phonics &amp; Core Vocabulary
                      </h3>
                    </div>
                    <p className="text-xs text-[#766A70] leading-relaxed">
                      Introduction to standard English pronunciation symbols, common word patterns,
                      and foundational sentence construction.
                    </p>
                    <div className="flex items-center gap-4 text-xs text-[#766A70] pt-2 border-t border-[#E9DDE1]">
                      <span className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-[16px]">folder</span> 4
                        Modules
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-[16px]">play_lesson</span>{' '}
                        12 Lessons
                      </span>
                    </div>
                  </div>
                  <div className="mt-6 pt-4 space-y-2 border-t border-[#E9DDE1]">
                    <button
                      type="button"
                      className="w-full py-2.5 rounded-sm bg-[#F7F1F3] hover:bg-[#E9DDE1] text-[#2D2529] text-xs font-bold transition-colors flex items-center justify-center gap-2 cursor-pointer"
                      onClick={() => switchView('course')}
                    >
                      <span className="material-symbols-outlined text-[16px]">menu_book</span>
                      <span>View Course Outline</span>
                    </button>
                    <p className="text-center text-[10px] text-[#766A70]">
                      Sample Course (Pricing TBD / Admin Managed)
                    </p>
                  </div>
                </div>

                {/* Sample Course Card 2: Paid Business Track */}
                <div className="rounded-xl bg-white border border-[#E9DDE1] p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-1 rounded-sm bg-[#F3DDE3] text-[#B75E78] text-[11px] font-bold">
                        Level 2: Intermediate (Inside Course)
                      </span>
                      <span className="text-xs font-bold text-[#B75E78] bg-[#F7F1F3] px-2 py-0.5 rounded-full border border-[#E9DDE1]">
                        PAID COURSE
                      </span>
                    </div>
                    <div>
                      <span className="text-[11px] font-bold text-[#766A70] uppercase">
                        Learning Target: Business English
                      </span>
                      <h3 className="font-bold text-base text-[#2D2529] mt-0.5">
                        Workplace Correspondence &amp; Meeting Skills
                      </h3>
                    </div>
                    <p className="text-xs text-[#766A70] leading-relaxed">
                      Practical instruction on drafting concise emails, phrasing requests
                      professionally, and participating in meetings with clarity.
                    </p>
                    <div className="flex items-center gap-4 text-xs text-[#766A70] pt-2 border-t border-[#E9DDE1]">
                      <span className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-[16px]">folder</span> 6
                        Modules
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-[16px]">play_lesson</span>{' '}
                        20 Lessons
                      </span>
                    </div>
                  </div>
                  <div className="mt-6 pt-4 space-y-2 border-t border-[#E9DDE1]">
                    <button
                      type="button"
                      className="w-full py-2.5 rounded-sm bg-[#F7F1F3] hover:bg-[#E9DDE1] text-[#2D2529] text-xs font-bold transition-colors flex items-center justify-center gap-2 cursor-pointer"
                      onClick={() => switchView('course')}
                    >
                      <span className="material-symbols-outlined text-[16px]">menu_book</span>
                      <span>View Course Outline</span>
                    </button>
                    <p className="text-center text-[10px] text-[#766A70]">
                      Sample Course (Pricing TBD / Admin Managed)
                    </p>
                  </div>
                </div>

                {/* Sample Course Card 3: Paid Interview Track */}
                <div className="rounded-xl bg-white border border-[#E9DDE1] p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-1 rounded-sm bg-[#F7F1F3] border border-[#E9DDE1] text-[#2D2529] text-[11px] font-bold">
                        Level 2: Intermediate (Inside Course)
                      </span>
                      <span className="text-xs font-bold text-[#B75E78] bg-[#F7F1F3] px-2 py-0.5 rounded-full border border-[#E9DDE1]">
                        PAID COURSE
                      </span>
                    </div>
                    <div>
                      <span className="text-[11px] font-bold text-[#766A70] uppercase">
                        Learning Target: Interview English
                      </span>
                      <h3 className="font-bold text-base text-[#2D2529] mt-0.5">
                        Structured Interview Practice &amp; Questions
                      </h3>
                    </div>
                    <p className="text-xs text-[#766A70] leading-relaxed">
                      Step-by-step guidance on structuring self-introductions, answering standard
                      interview inquiries, and verbal confidence.
                    </p>
                    <div className="flex items-center gap-4 text-xs text-[#766A70] pt-2 border-t border-[#E9DDE1]">
                      <span className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-[16px]">folder</span> 5
                        Modules
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-[16px]">play_lesson</span>{' '}
                        15 Lessons
                      </span>
                    </div>
                  </div>
                  <div className="mt-6 pt-4 space-y-2 border-t border-[#E9DDE1]">
                    <button
                      type="button"
                      className="w-full py-2.5 rounded-sm bg-[#F7F1F3] hover:bg-[#E9DDE1] text-[#2D2529] text-xs font-bold transition-colors flex items-center justify-center gap-2 cursor-pointer"
                      onClick={() => switchView('course')}
                    >
                      <span className="material-symbols-outlined text-[16px]">menu_book</span>
                      <span>View Course Outline</span>
                    </button>
                    <p className="text-center text-[10px] text-[#766A70]">
                      Sample Course (Pricing TBD / Admin Managed)
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 5: FREE COURSE CONTENT */}
            <section
              className="rounded-xl bg-[#FCFAF9] border border-[#E9DDE1] p-8 lg:p-12 shadow-sm"
              id="free-content"
            >
              <div className="max-w-3xl space-y-3">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#E9DDE1] text-[#B75E78] text-xs font-semibold">
                  <span className="material-symbols-outlined text-[16px]">lock_open</span>
                  <span>Free Course Policy</span>
                </div>
                <h2 className="font-serif text-2xl lg:text-3xl text-[#2D2529]">
                  Free Starter Modules
                </h2>
                <p className="text-sm text-[#766A70] leading-relaxed">
                  Sample open modules are accessible immediately for preview. Under platform rules,
                  exploring free course material grants instant direct access without generating an
                  enrollment transaction record.
                </p>
              </div>
              <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 rounded-xl bg-white border border-[#E9DDE1] shadow-sm flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="px-2 py-0.5 rounded-full bg-[#F7F1F3] text-[#B75E78] text-[11px] font-semibold">
                        Sample Open Lesson 01
                      </span>
                      <span className="text-[11px] text-[#6F9D83] font-bold">
                        No Enrollment Record Created
                      </span>
                    </div>
                    <h3 className="font-bold text-base text-[#2D2529]">
                      Foundation Vowel Clarity &amp; Articulation
                    </h3>
                    <p className="text-xs text-[#766A70] leading-relaxed">
                      Explore short and long vowel sound contrasts with guided model audio
                      recordings and printable pronunciation practice sheets.
                    </p>
                  </div>
                  <div className="mt-6 flex items-center justify-between border-t border-[#E9DDE1] pt-4">
                    <span className="text-xs text-[#766A70]">Duration: ~20 mins</span>
                    <button
                      type="button"
                      className="px-4 py-2 rounded-sm bg-[#B75E78] hover:bg-[#93415a] text-white text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
                      onClick={triggerImmediateFreeAccess}
                    >
                      <span className="material-symbols-outlined text-[16px]">play_arrow</span>
                      <span>Open Lesson Now</span>
                    </button>
                  </div>
                </div>
                <div className="p-6 rounded-xl bg-white border border-[#E9DDE1] shadow-sm flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="px-2 py-0.5 rounded-full bg-[#F7F1F3] text-[#B75E78] text-[11px] font-semibold">
                        Sample Open Lesson 02
                      </span>
                      <span className="text-[11px] text-[#6F9D83] font-bold">
                        No Enrollment Record Created
                      </span>
                    </div>
                    <h3 className="font-bold text-base text-[#2D2529]">
                      Everyday Workplace Greetings &amp; Introductions
                    </h3>
                    <p className="text-xs text-[#766A70] leading-relaxed">
                      Review standard phrasing for greetings, acknowledging questions, and polite
                      conversational turn-taking in everyday team settings.
                    </p>
                  </div>
                  <div className="mt-6 flex items-center justify-between border-t border-[#E9DDE1] pt-4">
                    <span className="text-xs text-[#766A70]">Duration: ~25 mins</span>
                    <button
                      type="button"
                      className="px-4 py-2 rounded-sm bg-[#B75E78] hover:bg-[#93415a] text-white text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
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
              className="rounded-xl bg-[#F7F1F3] border border-[#E9DDE1] p-8 lg:p-12 shadow-sm relative overflow-hidden"
              id="course-promotion"
            >
              <div className="flex items-center justify-between pb-4 border-b border-[#E9DDE1]">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#E9DDE1] text-[#B75E78] text-xs font-semibold">
                  <span className="material-symbols-outlined text-[16px]">campaign</span>
                  <span>Platform Announcement Slot</span>
                </div>
                <span className="px-2.5 py-0.5 rounded-full bg-white text-[#766A70] text-[11px] font-bold border border-[#E9DDE1]">
                  [Demo Promotion / Structural Placeholder]
                </span>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-6">
                <div className="lg:col-span-8 space-y-4">
                  <h2 className="font-serif text-2xl lg:text-3xl text-[#2D2529]">
                    Upcoming Course Schedule &amp; Structured Cohort Openings
                  </h2>
                  <p className="text-sm text-[#766A70] leading-relaxed">
                    Announcements regarding new course schedules, specialized speaking practice
                    sessions, and cohort registrations will be displayed in this promotional area by
                    platform administrators.
                  </p>
                  <div className="flex flex-wrap items-center gap-6 pt-2 text-xs text-[#2D2529]">
                    <span className="flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-[#B75E78] text-[18px]">
                        calendar_today
                      </span>{' '}
                      Schedule: Admin Managed
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-[#B75E78] text-[18px]">
                        group
                      </span>{' '}
                      Capacity: Controlled Batch
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-[#B75E78] text-[18px]">
                        assignment
                      </span>{' '}
                      Syllabus: 7 Core Pathways
                    </span>
                  </div>
                </div>
                <div className="lg:col-span-4 flex lg:justify-end">
                  <div className="p-6 rounded-xl bg-white border border-[#E9DDE1] shadow-sm text-center space-y-3 w-full max-w-xs">
                    <span className="text-[11px] text-[#766A70] font-bold uppercase">
                      Pricing &amp; Enrollment
                    </span>
                    <p className="font-bold text-lg text-[#2D2529]">Tuition Managed by Admin</p>
                    <p className="text-xs text-[#766A70]">
                      Sample promo component layout for campaign broadcasts.
                    </p>
                    <button
                      type="button"
                      className="w-full py-2.5 rounded-sm bg-[#B75E78] hover:bg-[#93415a] text-white text-xs font-bold shadow-sm transition-all cursor-pointer"
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
                  <span className="text-xs font-bold text-[#B75E78] uppercase tracking-wider">
                    Learner Perspectives
                  </span>
                  <h2 className="font-serif text-2xl lg:text-3xl text-[#2D2529] mt-1">
                    Student Feedback Component
                  </h2>
                  <p className="text-sm text-[#766A70] mt-2">
                    Structured display layouts for verified course feedback and community discussion
                    snippets.
                  </p>
                </div>
                <div>
                  <span className="px-3 py-1 rounded-full bg-[#F7F1F3] border border-[#E9DDE1] text-[#766A70] text-xs font-semibold">
                    [Demo Reviews / Sample Layout Structure]
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Demo Card 1 */}
                <div className="p-6 rounded-xl bg-white border border-[#E9DDE1] shadow-sm space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-[#B75E78]">
                      <span className="material-symbols-outlined text-[18px]">star</span>
                      <span className="material-symbols-outlined text-[18px]">star</span>
                      <span className="material-symbols-outlined text-[18px]">star</span>
                      <span className="material-symbols-outlined text-[18px]">star</span>
                      <span className="material-symbols-outlined text-[18px]">star</span>
                    </div>
                    <span className="text-[10px] text-[#766A70] uppercase font-bold">
                      [Demo Review Component]
                    </span>
                  </div>
                  <p className="text-xs text-[#2D2529] italic leading-relaxed">
                    “The systematic module progression and lesson tasks helped me structure my
                    weekly speaking practice with consistent clarity.”
                  </p>
                  <div className="pt-2 border-t border-[#E9DDE1] flex items-center justify-between">
                    <div>
                      <p className="text-xs font-bold text-[#2D2529]">
                        Sample Learner Note (Placeholder)
                      </p>
                      <p className="text-[11px] text-[#766A70]">Enrolled Course Student</p>
                    </div>
                    <span className="px-2 py-0.5 rounded-full bg-[#F7F1F3] text-[#B75E78] text-[10px] font-semibold">
                      Verified Feedback
                    </span>
                  </div>
                </div>

                {/* Demo Card 2 (Social Snippet Layout) */}
                <div className="p-6 rounded-xl bg-white border border-[#E9DDE1] shadow-sm space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] text-[#766A70] flex items-center gap-1">
                      <span className="material-symbols-outlined text-[#B75E78] text-[16px]">
                        chat_bubble_outline
                      </span>
                      <span>Social Discussion (Sample Layout)</span>
                    </span>
                    <span className="text-[10px] text-[#766A70] uppercase font-bold">
                      [Demo UI Card]
                    </span>
                  </div>
                  <div className="p-3 rounded-sm bg-[#FCFAF9] border border-[#E9DDE1] space-y-1">
                    <p className="text-xs font-bold text-[#2D2529]">
                      Demo Social Comment (Sample Layout)
                    </p>
                    <p className="text-xs text-[#766A70]">
                      “The step-by-step interview answering template provided in the practice module
                      was clear and easy to follow.”
                    </p>
                  </div>
                  <div className="pt-2 border-t border-[#E9DDE1] flex items-center justify-between">
                    <div>
                      <p className="text-xs font-bold text-[#2D2529]">Sample Community Voice</p>
                      <p className="text-[11px] text-[#766A70]">Interview English Module</p>
                    </div>
                    <span className="px-2 py-0.5 rounded-full bg-[#F7F1F3] text-[#B75E78] text-[10px] font-semibold">
                      Demo Entry
                    </span>
                  </div>
                </div>

                {/* Demo Card 3 */}
                <div className="p-6 rounded-xl bg-white border border-[#E9DDE1] shadow-sm space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-[#B75E78]">
                      <span className="material-symbols-outlined text-[18px]">star</span>
                      <span className="material-symbols-outlined text-[18px]">star</span>
                      <span className="material-symbols-outlined text-[18px]">star</span>
                      <span className="material-symbols-outlined text-[18px]">star</span>
                      <span className="material-symbols-outlined text-[18px]">star</span>
                    </div>
                    <span className="text-[10px] text-[#766A70] uppercase font-bold">
                      [Demo Review Component]
                    </span>
                  </div>
                  <p className="text-xs text-[#2D2529] italic leading-relaxed">
                    “The workplace dialogue drills and customer inquiry scenarios gave our service
                    staff practical expressions to use immediately.”
                  </p>
                  <div className="pt-2 border-t border-[#E9DDE1] flex items-center justify-between">
                    <div>
                      <p className="text-xs font-bold text-[#2D2529]">
                        Sample Learner Note (Placeholder)
                      </p>
                      <p className="text-[11px] text-[#766A70]">Hotel English Module</p>
                    </div>
                    <span className="px-2 py-0.5 rounded-full bg-[#F7F1F3] text-[#B75E78] text-[10px] font-semibold">
                      Verified Feedback
                    </span>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 8: ABOUT / PLATFORM INFORMATION */}
            <section
              className="rounded-xl bg-white border border-[#E9DDE1] p-8 lg:p-12 shadow-sm"
              id="about-section"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
                <div className="lg:col-span-5 space-y-4">
                  <div className="p-6 rounded-xl bg-[#F7F1F3] border border-[#E9DDE1] space-y-4 text-center">
                    <div className="w-20 h-20 mx-auto rounded-full bg-[#F3DDE3] border border-[#E9DDE1] flex items-center justify-center font-bold text-xl text-[#B75E78] shadow-sm">
                      TE
                    </div>
                    <div>
                      <h3 className="font-bold text-base text-[#2D2529]">
                        Teacher Theint English
                      </h3>
                      <p className="text-xs text-[#766A70]">
                        English Teaching &amp; Learning Platform
                      </p>
                    </div>
                    <div className="p-3 rounded-sm bg-white border border-[#E9DDE1] text-left space-y-2 text-xs">
                      <div className="flex items-center gap-2 text-[#2D2529]">
                        <span className="material-symbols-outlined text-[#B75E78] text-[16px]">
                          menu_book
                        </span>
                        <span>Structured Academic Curriculum</span>
                      </div>
                      <div className="flex items-center gap-2 text-[#2D2529]">
                        <span className="material-symbols-outlined text-[#B75E78] text-[16px]">
                          category
                        </span>
                        <span>7 Approved Target Pathways</span>
                      </div>
                      <div className="flex items-center gap-2 text-[#2D2529]">
                        <span className="material-symbols-outlined text-[#B75E78] text-[16px]">
                          record_voice_over
                        </span>
                        <span>Instructor-Guided Speaking &amp; Listening</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="lg:col-span-7 space-y-5">
                  <div className="space-y-1">
                    <span className="text-xs font-bold text-[#B75E78] uppercase tracking-wider">
                      Platform Overview
                    </span>
                    <h2 className="font-serif text-2xl lg:text-3xl text-[#2D2529]">
                      Clear, Structured English Learning for Practical Fluency.
                    </h2>
                  </div>
                  <p className="text-sm text-[#766A70] leading-relaxed">
                    Teacher Theint English is an educational platform dedicated to delivering
                    structured English language courses. The curriculum focuses on building clear
                    grammar comprehension, natural pronunciation, and confident spoken communication
                    across seven tailored pathways: Kids, School English, General English, Business
                    English, Daily Conversation, Hotel English, and Interview English.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    <div className="p-4 rounded-sm bg-[#FCFAF9] border border-[#E9DDE1]">
                      <p className="text-xs font-bold text-[#2D2529]">One-on-One Feedback</p>
                      <p className="text-xs text-[#766A70] mt-1">
                        Assignments and speaking practice receive structured evaluation from
                        instructors to guide individual progress.
                      </p>
                    </div>
                    <div className="p-4 rounded-sm bg-[#FCFAF9] border border-[#E9DDE1]">
                      <p className="text-xs font-bold text-[#2D2529]">Contextual Lessons</p>
                      <p className="text-xs text-[#766A70] mt-1">
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
                  <span className="text-xs font-bold text-[#B75E78] uppercase tracking-wider">
                    Educational Articles
                  </span>
                  <h2 className="font-serif text-2xl lg:text-3xl text-[#2D2529] mt-1">
                    Learning Guides &amp; Insights
                  </h2>
                  <p className="text-sm text-[#766A70] mt-2">
                    Practical language articles, grammar tips, and study strategies prepared by our
                    instructional team.
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <a
                    className="px-3 py-1.5 rounded-sm bg-white border border-[#E9DDE1] hover:bg-[#F7F1F3] text-[#2D2529] text-xs font-semibold transition-colors flex items-center gap-1.5"
                    href="https://facebook.com"
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <span className="material-symbols-outlined text-[16px]">share</span>
                    <span>Facebook</span>
                  </a>
                  <a
                    className="px-3 py-1.5 rounded-sm bg-white border border-[#E9DDE1] hover:bg-[#F7F1F3] text-[#2D2529] text-xs font-semibold transition-colors flex items-center gap-1.5"
                    href="https://tiktok.com"
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <span className="material-symbols-outlined text-[16px]">smart_display</span>
                    <span>TikTok</span>
                  </a>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <article className="p-6 rounded-xl bg-white border border-[#E9DDE1] shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-0.5 rounded-full bg-[#F7F1F3] text-[#B75E78] text-[11px] font-semibold">
                        Grammar Guide
                      </span>
                      <span className="text-[10px] text-[#766A70]">[Sample Article]</span>
                    </div>
                    <h3
                      onClick={() => onNavigateScreen('PUB-04-BLOG')}
                      className="font-bold text-base text-[#2D2529] hover:text-[#B75E78] transition-colors cursor-pointer"
                    >
                      Common Preposition Usages in Spoken English
                    </h3>
                    <p className="text-xs text-[#766A70] leading-relaxed">
                      An overview of frequent preposition pairings (such as at, in, on, and to) and
                      practical mental frameworks to choose correctly in conversation.
                    </p>
                  </div>
                  <div className="pt-6 border-t border-[#E9DDE1] flex items-center justify-between text-xs text-[#766A70]">
                    <span>Editorial Team • 5 min read</span>
                    <button
                      type="button"
                      onClick={() => onNavigateScreen('PUB-04-BLOG')}
                      className="text-[#B75E78] font-bold cursor-pointer"
                    >
                      Read Guide →
                    </button>
                  </div>
                </article>

                <article className="p-6 rounded-xl bg-white border border-[#E9DDE1] shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-0.5 rounded-full bg-[#F7F1F3] text-[#B75E78] text-[11px] font-semibold">
                        Speaking Strategies
                      </span>
                      <span className="text-[10px] text-[#766A70]">[Sample Article]</span>
                    </div>
                    <h3
                      onClick={() => onNavigateScreen('PUB-04-BLOG')}
                      className="font-bold text-base text-[#2D2529] hover:text-[#B75E78] transition-colors cursor-pointer"
                    >
                      Structuring Concise Spoken Answers in Professional Settings
                    </h3>
                    <p className="text-xs text-[#766A70] leading-relaxed">
                      Techniques to organize spoken answers clearly, preventing rambling while
                      keeping responses balanced and professional.
                    </p>
                  </div>
                  <div className="pt-6 border-t border-[#E9DDE1] flex items-center justify-between text-xs text-[#766A70]">
                    <span>Editorial Team • 6 min read</span>
                    <button
                      type="button"
                      onClick={() => onNavigateScreen('PUB-04-BLOG')}
                      className="text-[#B75E78] font-bold cursor-pointer"
                    >
                      Read Guide →
                    </button>
                  </div>
                </article>
              </div>
            </section>

            {/* SECTION 10: PUBLIC FOOTER */}
            <footer className="rounded-xl bg-white border border-[#E9DDE1] p-8 lg:p-12 shadow-sm space-y-10">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
                <div className="lg:col-span-2 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-sm bg-[#F3DDE3] flex items-center justify-center font-bold text-xs text-[#B75E78]">
                      TE
                    </div>
                    <span className="font-bold text-base text-[#2D2529]">
                      Teacher Theint English
                    </span>
                  </div>
                  <p className="text-xs text-[#766A70] leading-relaxed max-w-sm">
                    Structured English language education platform supporting young learners,
                    students, and professionals through disciplined, practical curriculums.
                  </p>
                  <div className="pt-2 text-xs text-[#766A70]">
                    <span>Contact &amp; Inquiries: info@teachertheint.edu</span>
                  </div>
                </div>
                <div className="space-y-3">
                  <p className="text-xs font-bold text-[#2D2529] uppercase tracking-wider">
                    Learning Targets
                  </p>
                  <ul className="space-y-2 text-xs text-[#766A70]">
                    <li>
                      <a className="hover:text-[#B75E78] transition-colors" href="#discover-categories">
                        Kids
                      </a>
                    </li>
                    <li>
                      <a className="hover:text-[#B75E78] transition-colors" href="#discover-categories">
                        School English
                      </a>
                    </li>
                    <li>
                      <a className="hover:text-[#B75E78] transition-colors" href="#discover-categories">
                        General English
                      </a>
                    </li>
                    <li>
                      <a className="hover:text-[#B75E78] transition-colors" href="#discover-categories">
                        Business English
                      </a>
                    </li>
                    <li>
                      <a className="hover:text-[#B75E78] transition-colors" href="#discover-categories">
                        Daily Conversation
                      </a>
                    </li>
                    <li>
                      <a className="hover:text-[#B75E78] transition-colors" href="#discover-categories">
                        Hotel English
                      </a>
                    </li>
                    <li>
                      <a className="hover:text-[#B75E78] transition-colors" href="#discover-categories">
                        Interview English
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="space-y-3">
                  <p className="text-xs font-bold text-[#2D2529] uppercase tracking-wider">
                    Resources
                  </p>
                  <ul className="space-y-2 text-xs text-[#766A70]">
                    <li>
                      <a className="hover:text-[#B75E78] transition-colors" href="#free-content">
                        Free Starter Modules
                      </a>
                    </li>
                    <li>
                      <a className="hover:text-[#B75E78] transition-colors" href="#blog-social">
                        Grammar Guides
                      </a>
                    </li>
                    <li>
                      <a className="hover:text-[#B75E78] transition-colors" href="#blog-social">
                        Speaking Study Tips
                      </a>
                    </li>
                    <li>
                      <a className="hover:text-[#B75E78] transition-colors" href="#featured-courses">
                        Course Catalog
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="space-y-3">
                  <p className="text-xs font-bold text-[#2D2529] uppercase tracking-wider">
                    Legal &amp; Policy
                  </p>
                  <ul className="space-y-2 text-xs text-[#766A70]">
                    <li>
                      <a className="hover:text-[#B75E78] transition-colors" href="#view-home">
                        Terms of Service
                      </a>
                    </li>
                    <li>
                      <a className="hover:text-[#B75E78] transition-colors" href="#view-home">
                        Privacy Policy
                      </a>
                    </li>
                    <li>
                      <a className="hover:text-[#B75E78] transition-colors" href="#view-home">
                        Payment &amp; Refund Policy
                      </a>
                    </li>
                    <li>
                      <a className="hover:text-[#B75E78] transition-colors" href="#view-home">
                        Platform Guidelines
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="pt-6 border-t border-[#E9DDE1] flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#766A70]">
                <p>© 2025 Teacher Theint English. All rights reserved.</p>
                <div className="flex items-center gap-4">
                  <span className="inline-flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#6F9D83]"></span> WCAG AA Contrast
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
          <div className="space-y-10" id="view-course">
            {/* View Top Bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl bg-white border border-[#E9DDE1]">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-sm bg-[#F7F1F3] hover:bg-[#E9DDE1] text-[#2D2529] text-xs font-bold transition-colors cursor-pointer"
                  onClick={() => switchView('home')}
                >
                  <span className="material-symbols-outlined text-[16px]">arrow_back</span>
                  <span>Return to Homepage</span>
                </button>
                <span className="text-xs text-[#766A70]">
                  Course Catalog &gt; Course Detail Demonstration
                </span>
              </div>
              <span className="px-2.5 py-0.5 rounded-full bg-[#F3DDE3] text-[#B75E78] text-[11px] font-bold">
                Strict Rule: Level Scoped Inside Course
              </span>
            </div>

            {/* Course Header Card */}
            <div className="p-8 rounded-xl bg-white border border-[#E9DDE1] shadow-sm space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-2.5 py-1 rounded-sm bg-[#F7F1F3] border border-[#E9DDE1] text-[#766A70] text-xs font-bold uppercase">
                    Track: Career Communication
                  </span>
                  <span className="px-2.5 py-1 rounded-sm bg-[#F3DDE3] text-[#B75E78] text-xs font-bold">
                    Target: Business English
                  </span>
                  <span className="px-2.5 py-1 rounded-sm bg-[#F1F7F4] text-[#6F9D83] text-xs font-bold border border-[#6F9D83]/20">
                    Structure: 6 Modules • 20 Lessons
                  </span>
                </div>
                <span className="text-xs text-[#766A70] font-semibold">
                  [Sample Course Outline / Admin Managed]
                </span>
              </div>
              <div className="space-y-2">
                <h1 className="font-serif text-3xl text-[#2D2529]">
                  Workplace Correspondence &amp; Meeting Skills
                </h1>
                <p className="text-sm text-[#766A70] max-w-3xl leading-relaxed">
                  A structured course providing step-by-step guidance on writing concise emails,
                  phrasing verbal requests, and engaging effectively in team discussions.
                </p>
              </div>
              {/* LEVEL STRICTLY INSIDE COURSE CALLOUT */}
              <div className="p-5 rounded-lg bg-[#FCFAF9] border-2 border-[#D8899D]/40 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#B75E78] text-[20px]">
                      stacked_bar_chart
                    </span>
                    <span className="text-xs font-bold text-[#B75E78] uppercase">
                      Assigned Level (Scoped Strictly Inside This Course)
                    </span>
                  </div>
                  <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-white border border-[#E9DDE1] text-[#2D2529]">
                    Level 2: Intermediate
                  </span>
                </div>
                <p className="text-xs text-[#766A70] leading-relaxed">
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
                  <h2 className="font-serif text-xl text-[#2D2529]">
                    Course Syllabus &amp; Learning Breakdown
                  </h2>
                  <span className="text-xs text-[#766A70]">Module &gt; Lesson &gt; Learning Item</span>
                </div>

                {/* Module 1 */}
                <div className="rounded-xl bg-white border border-[#E9DDE1] shadow-sm p-6 space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-[#E9DDE1]">
                    <div>
                      <span className="text-[11px] font-bold text-[#B75E78] uppercase">
                        Module 1
                      </span>
                      <h3 className="font-bold text-base text-[#2D2529]">
                        Professional Written Inquiries
                      </h3>
                    </div>
                    <span className="text-xs text-[#766A70]">3 Lessons • 7 Items</span>
                  </div>
                  <div className="space-y-3 pl-2">
                    <div className="p-4 rounded-sm bg-[#FCFAF9] border border-[#E9DDE1] space-y-2">
                      <div className="flex items-center justify-between">
                        <p className="text-xs font-bold text-[#2D2529]">
                          Lesson 1.1: Standard Email Openings &amp; Tone Setting
                        </p>
                        <span className="px-2 py-0.5 rounded-full bg-[#F1F7F4] text-[#6F9D83] text-[10px] font-bold">
                          Open Preview
                        </span>
                      </div>
                      <p className="text-[11px] text-[#766A70]">
                        Learning items included in this lesson:
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs text-[#766A70] pt-1">
                        <div className="flex items-center gap-1.5">
                          <span className="material-symbols-outlined text-[16px] text-[#B75E78]">
                            play_circle
                          </span>{' '}
                          Video Lecture
                        </div>
                        <div className="flex items-center gap-1.5">
                          <span className="material-symbols-outlined text-[16px] text-[#B75E78]">
                            article
                          </span>{' '}
                          Vocabulary Sheet
                        </div>
                        <div className="flex items-center gap-1.5">
                          <span className="material-symbols-outlined text-[16px] text-[#B75E78]">
                            quiz
                          </span>{' '}
                          Practice Exercise
                        </div>
                      </div>
                    </div>

                    <div className="p-4 rounded-sm bg-[#FCFAF9] border border-[#E9DDE1] space-y-2">
                      <div className="flex items-center justify-between">
                        <p className="text-xs font-bold text-[#2D2529]">
                          Lesson 1.2: Clarifying Timelines &amp; Dependencies
                        </p>
                        <span className="text-[10px] text-[#766A70] flex items-center gap-1">
                          <span className="material-symbols-outlined text-[14px]">lock</span> Course
                          Enrollees
                        </span>
                      </div>
                      <p className="text-[11px] text-[#766A70]">
                        Learning items included in this lesson:
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#766A70] pt-1">
                        <div className="flex items-center gap-1.5">
                          <span className="material-symbols-outlined text-[16px] text-[#766A70]">
                            play_circle
                          </span>{' '}
                          Video Lecture (20 mins)
                        </div>
                        <div className="flex items-center gap-1.5">
                          <span className="material-symbols-outlined text-[16px] text-[#766A70]">
                            assignment
                          </span>{' '}
                          Written Assignment
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Module 2 */}
                <div className="rounded-xl bg-white border border-[#E9DDE1] shadow-sm p-6 space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-[#E9DDE1]">
                    <div>
                      <span className="text-[11px] font-bold text-[#B75E78] uppercase">
                        Module 2
                      </span>
                      <h3 className="font-bold text-base text-[#2D2529]">
                        Verbal Updates in Meetings
                      </h3>
                    </div>
                    <span className="text-xs text-[#766A70]">3 Lessons • 6 Items</span>
                  </div>
                  <div className="space-y-3 pl-2">
                    <div className="p-4 rounded-sm bg-[#FCFAF9] border border-[#E9DDE1] space-y-2">
                      <div className="flex items-center justify-between">
                        <p className="text-xs font-bold text-[#2D2529]">
                          Lesson 2.1: Structuring a Brief Status Report
                        </p>
                        <span className="text-[10px] text-[#766A70] flex items-center gap-1">
                          <span className="material-symbols-outlined text-[14px]">lock</span> Course
                          Enrollees
                        </span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#766A70] pt-1">
                        <div className="flex items-center gap-1.5">
                          <span className="material-symbols-outlined text-[16px] text-[#766A70]">
                            play_circle
                          </span>{' '}
                          Video Lecture (18 mins)
                        </div>
                        <div className="flex items-center gap-1.5">
                          <span className="material-symbols-outlined text-[16px] text-[#766A70]">
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
                <div className="p-6 rounded-xl bg-white border border-[#E9DDE1] shadow-sm space-y-6 sticky top-24">
                  <div className="space-y-1">
                    <span className="text-[11px] font-bold text-[#766A70] uppercase">
                      Course Status
                    </span>
                    <p className="font-bold text-lg text-[#2D2529]">Paid Course (Pricing TBD)</p>
                    <p className="text-xs text-[#766A70]">
                      Pricing and cohort schedules managed directly by platform admin.
                    </p>
                  </div>
                  <div className="space-y-3 text-xs text-[#2D2529] border-t border-b border-[#E9DDE1] py-4">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-[#B75E78] text-[18px]">
                        check_circle
                      </span>
                      <span>Access to all 6 modules &amp; lesson items</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-[#B75E78] text-[18px]">
                        check_circle
                      </span>
                      <span>Audio task evaluation with One-on-One feedback</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-[#B75E78] text-[18px]">
                        check_circle
                      </span>
                      <span>Printable practice templates &amp; audio models</span>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <button
                      type="button"
                      className="w-full py-3 rounded-sm bg-[#B75E78] hover:bg-[#93415a] text-white text-xs font-bold shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
                      onClick={() => onNavigateScreen('AUTH-02-REGISTER')}
                    >
                      <span className="material-symbols-outlined text-[18px]">how_to_reg</span>
                      <span>Register to Enroll</span>
                    </button>
                    <button
                      type="button"
                      className="w-full py-2.5 rounded-sm bg-[#F7F1F3] hover:bg-[#E9DDE1] text-[#2D2529] text-xs font-bold transition-colors flex items-center justify-center gap-2 cursor-pointer"
                      onClick={triggerImmediateFreeAccess}
                    >
                      <span className="material-symbols-outlined text-[18px]">play_circle</span>
                      <span>Preview Free Lesson 1.1</span>
                    </button>
                    <p className="text-center text-[10px] text-[#766A70]">
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
                <span className="text-xs font-bold text-[#B75E78] uppercase tracking-wider">
                  Student Access
                </span>
                <h2 className="font-serif text-3xl text-[#2D2529]">
                  Student Portal Authentication
                </h2>
                <p className="text-xs text-[#766A70]">
                  Clean credentials access for enrolled and new learners.
                </p>
              </div>
              {/* Institutional Staff Boundary Notice */}
              <div className="p-4 rounded-lg bg-[#F7F1F3] border border-[#E9DDE1] text-xs text-[#766A70] flex items-start gap-3">
                <span className="material-symbols-outlined text-[#B75E78] text-[20px] shrink-0">
                  info
                </span>
                <div>
                  <span className="font-bold text-[#2D2529]">
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
              <div className="p-1 rounded-lg bg-[#F7F1F3] border border-[#E9DDE1] flex text-center text-xs font-bold">
                <button
                  type="button"
                  onClick={() => toggleAuthTab('login')}
                  className={
                    authTab === 'login'
                      ? 'flex-1 py-2 rounded-sm bg-white text-[#2D2529] shadow-sm transition-all font-bold cursor-pointer'
                      : 'flex-1 py-2 rounded-sm text-[#766A70] hover:text-[#2D2529] transition-all font-medium cursor-pointer'
                  }
                >
                  Student Log In
                </button>
                <button
                  type="button"
                  onClick={() => toggleAuthTab('register')}
                  className={
                    authTab === 'register'
                      ? 'flex-1 py-2 rounded-sm bg-white text-[#2D2529] shadow-sm transition-all font-bold cursor-pointer'
                      : 'flex-1 py-2 rounded-sm text-[#766A70] hover:text-[#2D2529] transition-all font-medium cursor-pointer'
                  }
                >
                  New Student Registration
                </button>
              </div>

              {/* Login Form Card */}
              {authTab === 'login' && (
                <div className="p-8 rounded-xl bg-white border border-[#E9DDE1] shadow-sm space-y-5">
                  <div className="space-y-1">
                    <h3 className="font-bold text-base text-[#2D2529]">
                      Sign In to Your Student Account
                    </h3>
                    <p className="text-xs text-[#766A70]">
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
                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-[#2D2529] uppercase">
                        Email or Mobile Phone
                      </label>
                      <input
                        className="w-full px-3.5 py-2.5 rounded-sm border border-[#E9DDE1] text-xs text-[#2D2529] placeholder:text-[#9B8F94] focus:outline-none focus:ring-2 focus:ring-[#D8899D]"
                        placeholder="e.g. learner@example.com or 09xxxxxxxxx"
                        type="text"
                      />
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center justify-between">
                        <label className="text-[11px] font-bold text-[#2D2529] uppercase">
                          Password
                        </label>
                        <button
                          type="button"
                          onClick={() => onNavigateScreen('AUTH-03-VERIFY-EMAIL')}
                          className="text-[11px] text-[#B75E78] font-semibold hover:underline cursor-pointer"
                        >
                          Forgot password?
                        </button>
                      </div>
                      <input
                        className="w-full px-3.5 py-2.5 rounded-sm border border-[#E9DDE1] text-xs text-[#2D2529] placeholder:text-[#9B8F94] focus:outline-none focus:ring-2 focus:ring-[#D8899D]"
                        placeholder="Enter your password"
                        type="password"
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full py-3 rounded-sm bg-[#B75E78] hover:bg-[#93415a] text-white text-xs font-bold shadow-sm transition-all cursor-pointer"
                    >
                      Sign In
                    </button>
                  </form>
                </div>
              )}

              {/* Register Form Card: STRICT FIELDS: Email, Phone, Password, Confirm Password ONLY */}
              {authTab === 'register' && (
                <div className="p-8 rounded-xl bg-white border border-[#E9DDE1] shadow-sm space-y-5">
                  <div className="space-y-1">
                    <h3 className="font-bold text-base text-[#2D2529]">Create Student Account</h3>
                    <p className="text-xs text-[#766A70]">
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
                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-[#2D2529] uppercase">
                        Email Address
                      </label>
                      <input
                        className="w-full px-3.5 py-2.5 rounded-sm border border-[#E9DDE1] text-xs text-[#2D2529] placeholder:text-[#9B8F94] focus:outline-none focus:ring-2 focus:ring-[#D8899D]"
                        placeholder="learner@example.com"
                        required
                        type="email"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-[#2D2529] uppercase">
                        Phone Number
                      </label>
                      <input
                        className="w-full px-3.5 py-2.5 rounded-sm border border-[#E9DDE1] text-xs text-[#2D2529] placeholder:text-[#9B8F94] focus:outline-none focus:ring-2 focus:ring-[#D8899D]"
                        placeholder="09xxxxxxxxx"
                        required
                        type="tel"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-[#2D2529] uppercase">
                        Password
                      </label>
                      <input
                        className="w-full px-3.5 py-2.5 rounded-sm border border-[#E9DDE1] text-xs text-[#2D2529] placeholder:text-[#9B8F94] focus:outline-none focus:ring-2 focus:ring-[#D8899D]"
                        placeholder="Create a secure password"
                        required
                        type="password"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-[#2D2529] uppercase">
                        Confirm Password
                      </label>
                      <input
                        className="w-full px-3.5 py-2.5 rounded-sm border border-[#E9DDE1] text-xs text-[#2D2529] placeholder:text-[#9B8F94] focus:outline-none focus:ring-2 focus:ring-[#D8899D]"
                        placeholder="Re-enter password"
                        required
                        type="password"
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full py-3 rounded-sm bg-[#B75E78] hover:bg-[#93415a] text-white text-xs font-bold shadow-sm transition-all cursor-pointer"
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
              <span className="text-xs font-bold text-[#B75E78] uppercase tracking-wider">
                Error &amp; Fallback Specifications
              </span>
              <h2 className="font-serif text-2xl lg:text-3xl text-[#2D2529] mt-1">
                Public System State Handling
              </h2>
              <p className="text-xs text-[#766A70] mt-1">
                Explicit visual differentiation between authentication failure, role authorization
                limits, missing resources, data fetching, and zero search matches.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* 1. 401 Unauthenticated State */}
              <div className="p-6 rounded-xl bg-white border border-[#E9DDE1] shadow-sm flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <div className="w-12 h-12 rounded-lg bg-[#FAF5EE] border border-[#C49352]/20 text-[#C49352] flex items-center justify-center">
                    <span className="material-symbols-outlined text-2xl">lock</span>
                  </div>
                  <div>
                    <span className="text-[11px] font-bold text-[#C49352] uppercase">
                      HTTP 401
                    </span>
                    <h3 className="font-bold text-base text-[#2D2529]">Authentication Required</h3>
                  </div>
                  <p className="text-xs text-[#766A70] leading-relaxed">
                    You must be logged in as a registered student to access this learning resource
                    or lesson feedback item.
                  </p>
                </div>
                <button
                  type="button"
                  className="w-full py-2.5 rounded-sm bg-[#F7F1F3] hover:bg-[#E9DDE1] text-[#2D2529] text-xs font-bold transition-colors cursor-pointer"
                  onClick={() => onNavigateScreen('AUTH-01-LOGIN')}
                >
                  Log In to Continue
                </button>
              </div>

              {/* 2. 403 Forbidden State */}
              <div className="p-6 rounded-xl bg-white border border-[#E9DDE1] shadow-sm flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <div className="w-12 h-12 rounded-lg bg-[#ffdad6] text-[#ba1a1a] flex items-center justify-center">
                    <span className="material-symbols-outlined text-2xl">gpp_bad</span>
                  </div>
                  <div>
                    <span className="text-[11px] font-bold text-[#ba1a1a] uppercase">
                      HTTP 403
                    </span>
                    <h3 className="font-bold text-base text-[#2D2529]">Access Forbidden</h3>
                  </div>
                  <p className="text-xs text-[#766A70] leading-relaxed">
                    Your current account does not have authorization to view this area. Teaching,
                    grading, and administrative consoles are restricted to authorized personnel.
                  </p>
                </div>
                <button
                  type="button"
                  className="w-full py-2.5 rounded-sm bg-[#F7F1F3] hover:bg-[#E9DDE1] text-[#2D2529] text-xs font-bold transition-colors cursor-pointer"
                  onClick={() => switchView('home')}
                >
                  Return to Public Homepage
                </button>
              </div>

              {/* 3. 404 Not Found State */}
              <div className="p-6 rounded-xl bg-white border border-[#E9DDE1] shadow-sm flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <div className="w-12 h-12 rounded-lg bg-[#F7F1F3] border border-[#E9DDE1] text-[#766A70] flex items-center justify-center">
                    <span className="material-symbols-outlined text-2xl">search_off</span>
                  </div>
                  <div>
                    <span className="text-[11px] font-bold text-[#766A70] uppercase">
                      HTTP 404
                    </span>
                    <h3 className="font-bold text-base text-[#2D2529]">Resource Not Located</h3>
                  </div>
                  <p className="text-xs text-[#766A70] leading-relaxed">
                    The curriculum item, lesson, or article you requested does not exist or may
                    have been reorganized within a course.
                  </p>
                </div>
                <button
                  type="button"
                  className="w-full py-2.5 rounded-sm bg-[#B75E78] hover:bg-[#93415a] text-white text-xs font-bold transition-all cursor-pointer"
                  onClick={() => switchView('home')}
                >
                  Back to Course Index
                </button>
              </div>

              {/* 4. Skeleton Loading State */}
              <div className="p-6 rounded-xl bg-white border border-[#E9DDE1] shadow-sm space-y-4">
                <div className="flex items-center justify-between pb-1 border-b border-[#E9DDE1]">
                  <span className="text-[11px] font-bold text-[#B75E78] uppercase">
                    Loading Skeleton State
                  </span>
                  <span className="text-[10px] text-[#766A70]">Simulated Content Fetch</span>
                </div>
                <div className="space-y-3 animate-pulse">
                  <div className="h-4 w-1/3 rounded-sm bg-[#E9DDE1]"></div>
                  <div className="h-6 w-3/4 rounded-sm bg-[#F3DDE3]"></div>
                  <div className="h-3 w-full rounded-sm bg-[#F7F1F3]"></div>
                  <div className="h-3 w-5/6 rounded-sm bg-[#F7F1F3]"></div>
                  <div className="space-y-2 pt-2">
                    <div className="h-10 w-full rounded-sm bg-[#F7F1F3]"></div>
                    <div className="h-10 w-full rounded-sm bg-[#F7F1F3]"></div>
                  </div>
                </div>
              </div>

              {/* 5. Empty Search Results State */}
              <div className="p-6 rounded-xl bg-white border border-[#E9DDE1] shadow-sm flex flex-col justify-between space-y-4 md:col-span-2 lg:col-span-2">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-[#F7F1F3] border border-[#E9DDE1] text-[#766A70] flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-2xl">find_in_page</span>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-bold text-[#B75E78] uppercase">
                        Catalog Search State
                      </span>
                      <span className="px-2 py-0.5 rounded-full bg-[#F7F1F3] text-[10px] font-semibold text-[#766A70]">
                        0 Query Results
                      </span>
                    </div>
                    <h3 className="font-bold text-base text-[#2D2529]">
                      No Courses Matching Current Filters
                    </h3>
                    <p className="text-xs text-[#766A70] leading-relaxed">
                      No syllabus matched your query filter. Try selecting one of the 7 approved
                      learning pathways or clear keywords to view all course listings.
                    </p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 pt-2 border-t border-[#E9DDE1]">
                  <button
                    type="button"
                    className="px-3 py-1.5 rounded-sm bg-[#F7F1F3] hover:bg-[#E9DDE1] text-[#2D2529] text-xs font-bold transition-colors cursor-pointer"
                    onClick={() => switchView('home')}
                  >
                    Reset Filters
                  </button>
                  <button
                    type="button"
                    className="px-3 py-1.5 rounded-sm bg-white border border-[#E9DDE1] hover:bg-[#F7F1F3] text-[#2D2529] text-xs font-bold transition-colors cursor-pointer"
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
          <div className="p-4 rounded-xl bg-white border border-[#E9DDE1] shadow-xl flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#6F9D83] flex items-center justify-center text-white">
              <span className="material-symbols-outlined text-[18px]">lock_open</span>
            </div>
            <div>
              <p className="text-xs font-bold text-[#2D2529]">Free Lesson Opened Instantly</p>
              <p className="text-[11px] text-[#766A70]">
                Immediate access granted. Under platform rules, zero enrollment record is created.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
