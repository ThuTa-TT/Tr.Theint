import React, { useState } from 'react';
import { ScreenId } from '../../../types/navigation';

interface CourseStructurePreviewProps {
  onBackToCourseDetail: () => void;
  onNavigateScreen: (screenId: ScreenId) => void;
}

type QAState = 'default' | 'collapsed' | 'skeleton' | 'empty' | 'error';

export const CourseStructurePreview: React.FC<CourseStructurePreviewProps> = ({
  onBackToCourseDetail,
  onNavigateScreen,
}) => {
  const [qaState, setQaState] = useState<QAState>('default');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedModules, setExpandedModules] = useState<Record<string, boolean>>({
    mod1: true,
    mod2: true,
    mod3: true,
    mod4: true,
  });

  const toggleModule = (id: string) => {
    setExpandedModules((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const setAllModules = (expand: boolean) => {
    setExpandedModules({
      mod1: expand,
      mod2: expand,
      mod3: expand,
      mod4: expand,
    });
  };

  const handleStateChange = (state: QAState) => {
    setQaState(state);
    if (state === 'default') {
      setAllModules(true);
    } else if (state === 'collapsed') {
      setAllModules(false);
    }
  };

  const matchesSearch = (text: string) => {
    if (!searchQuery.trim()) return true;
    return text.toLowerCase().includes(searchQuery.toLowerCase().trim());
  };

  // Lesson data for filter matching & counting
  const modulesData = [
    {
      id: 'mod1',
      num: '01',
      title: 'Core Grammatical Foundations',
      tag: 'Foundational CEFR A1',
      desc: 'Parts of speech taxonomy, agreement paradigms, determiners, and baseline syntax structures.',
      meta: '6 Lessons • 6 Auto-Drills',
      runtime: 'Approx. 95 min lecture runtime',
      color: 'bg-primary text-on-primary',
      lessons: [
        {
          num: '1.1',
          title: 'Parts of Speech & Categorization',
          sub: 'Lesson Index #01 • Foundational Concept',
          lecture: 'Concept Lecture: The 8 Parts of Speech',
          lectureTime: 'Video Lecture • 14 mins runtime',
          drill: 'Auto-Drill: Part of Speech Identification',
          drillMeta: 'Auto-Graded Diagnostic • 15 Verification Prompts',
        },
        {
          num: '1.2',
          title: 'Present Simple vs Present Continuous',
          sub: 'Lesson Index #02 • Habitual vs Dynamic Forms',
          lecture: 'Video Lecture: Habitual Actions vs Current States',
          lectureTime: 'Video Lecture • 18 mins runtime',
          drill: 'Auto-Drill: Stative vs Dynamic Verbs',
          drillMeta: 'Auto-Graded Diagnostic • 20 Real-time items',
        },
        {
          num: '1.3',
          title: 'Subject-Verb Agreement & Irregular Verbs',
          sub: 'Lesson Index #03 • Core Syntactic Alignment',
          lecture: 'Video Lecture: Collective Nouns & Third-Person Singular',
          lectureTime: 'Video Lecture • 20 mins runtime',
          drill: 'Auto-Drill: Agreement Diagnostics',
          drillMeta: 'Auto-Graded Diagnostic • Instant Syntax Checks',
        },
        {
          num: '1.4',
          title: 'Nouns, Quantifiers & Articles (a, an, the)',
          sub: 'Lesson Index #04 • Determiner Systems',
          lecture: 'Video Lecture: Countable vs Uncountable Syntax',
          lectureTime: 'Video Lecture • 16 mins runtime',
          drill: 'Auto-Drill: Definite vs Indefinite Determiners',
          drillMeta: 'Auto-Graded Diagnostic • Contextual Fillers',
        },
        {
          num: '1.5',
          title: 'Pronoun Cases & Reflexives',
          sub: 'Lesson Index #05 • Case Inflection',
          lecture: 'Video Lecture: Subjective, Objective & Possessive',
          lectureTime: 'Video Lecture • 15 mins runtime',
          drill: 'Auto-Drill: Pronoun Reference Accuracy',
          drillMeta: 'Auto-Graded Diagnostic • Parsing Sentences',
        },
        {
          num: '1.6',
          title: 'Module 1 Synthesis & Checkpoint Review',
          sub: 'Module Milestone',
          isMilestone: true,
          lecture: 'Video Lecture: Unit 1 Grammatical Integration',
          lectureTime: 'Synthesis Video • 12 mins runtime',
          drill: 'Comprehensive Unit 1 Drill (Auto-Graded)',
          drillMeta: '30 Questions • Benchmark Threshold 80%',
        },
      ],
    },
    {
      id: 'mod2',
      num: '02',
      title: 'Tense Systems & Narrative Structures',
      tag: 'Chronology Core',
      desc: 'Past Simple, Past Continuous, Present Perfect mechanics, time markers, and storytelling coherence.',
      meta: '6 Lessons • 6 Auto-Drills',
      runtime: 'Approx. 110 min lecture runtime',
      color: 'bg-secondary text-on-secondary',
      lessons: [
        {
          num: '2.1',
          title: 'Past Simple: Regular & Common Irregular Conjugations',
          sub: 'Lesson Index #07',
          lecture: 'Lecture: Past Historical Narratives (17 min)',
          lectureTime: 'Video Lecture • 17 mins runtime',
          drill: 'Auto-Drill: Irregular Past Verb Rapid Recall',
          drillMeta: 'Auto-Graded Diagnostic • Rapid Recall',
        },
        {
          num: '2.2',
          title: 'Past Continuous & Interrupted Actions',
          sub: 'Lesson Index #08',
          lecture: 'Lecture: When vs While Clauses (19 min)',
          lectureTime: 'Video Lecture • 19 mins runtime',
          drill: 'Auto-Drill: Simultaneous vs Interrupted Clauses',
          drillMeta: 'Auto-Graded Diagnostic • Clause Rules',
        },
        {
          num: '2.3',
          title: 'Present Perfect: Life Experiences & Unspecified Time',
          sub: 'Lesson Index #09',
          lecture: 'Lecture: Ever, Never, and Participial Adjectives (21 min)',
          lectureTime: 'Video Lecture • 21 mins runtime',
          drill: 'Auto-Drill: Past Simple vs Present Perfect Contrasts',
          drillMeta: 'Auto-Graded Diagnostic • Contrast Drills',
        },
        {
          num: '2.4',
          title: 'Time Adverbials: Since, For, Already, Yet',
          sub: 'Lesson Index #10',
          lecture: 'Lecture: Duration Boundaries & Placement (15 min)',
          lectureTime: 'Video Lecture • 15 mins runtime',
          drill: 'Auto-Drill: Adverbial Placement Diagnostic',
          drillMeta: 'Auto-Graded Diagnostic • Placement Rules',
        },
        {
          num: '2.5',
          title: 'Narrative Linking & Sequential Storytelling',
          sub: 'Lesson Index #11',
          lecture: 'Lecture: First, Then, Suddenly, In the End (16 min)',
          lectureTime: 'Video Lecture • 16 mins runtime',
          drill: 'Auto-Drill: Story Paragraph Reordering',
          drillMeta: 'Auto-Graded Diagnostic • Sequence Logic',
        },
        {
          num: '2.6',
          title: 'Module 2 Checkpoint: Narrative Mastery Assessment',
          sub: 'Module Milestone',
          isMilestone: true,
          lecture: 'Lecture: Integrated Story Arc Synthesis (14 min)',
          lectureTime: 'Synthesis Video • 14 mins runtime',
          drill: 'Auto-Drill: 30-Item Tense Discriminator Test',
          drillMeta: '30 Questions • Pass Criteria Threshold',
        },
      ],
    },
    {
      id: 'mod3',
      num: '03',
      title: 'Modal Verbs & Question Formations',
      tag: 'Functional Discourse',
      desc: 'Modal nuance, auxiliary inversion, tag interrogatives, and polite conversational inquiries.',
      meta: '6 Lessons • 6 Auto-Drills',
      runtime: 'Approx. 90 min lecture runtime',
      color: 'bg-tertiary text-on-tertiary',
      lessons: [
        {
          num: '3.1',
          title: 'Ability & Permission: Can, Could, Be Able To',
          sub: 'Lesson Index #13',
          lecture: 'Lecture: Modals in Everyday Social Discourse (16 min)',
          lectureTime: 'Video Lecture • 16 mins runtime',
          drill: 'Auto-Drill: Permission Registers & Nuances',
          drillMeta: 'Auto-Graded Diagnostic • Nuance Checks',
        },
        {
          num: '3.2',
          title: 'Obligation & Advice: Must, Have to, Should',
          sub: 'Lesson Index #14',
          lecture: 'Lecture: Internal vs External Obligation (18 min)',
          lectureTime: 'Video Lecture • 18 mins runtime',
          drill: 'Auto-Drill: Necessity vs Recommendation Validation',
          drillMeta: 'Auto-Graded Diagnostic • Social Registers',
        },
        {
          num: '3.3',
          title: 'Inversion Questions & Auxiliary Word Order',
          sub: 'Lesson Index #15',
          lecture: 'Lecture: Do/Does/Did Fronting Patterns (15 min)',
          lectureTime: 'Video Lecture • 15 mins runtime',
          drill: 'Auto-Drill: Word Order Scrambled Question Fixes',
          drillMeta: 'Auto-Graded Diagnostic • Syntax Reordering',
        },
        {
          num: '3.4',
          title: 'Question Tags & Intonation Patterns',
          sub: 'Lesson Index #16',
          lecture: 'Lecture: Polarity Matching in Tag Inquiries (14 min)',
          lectureTime: 'Video Lecture • 14 mins runtime',
          drill: 'Auto-Drill: Tag Matching Drills',
          drillMeta: 'Auto-Graded Diagnostic • Tag Polarity',
        },
        {
          num: '3.5',
          title: 'Indirect Inquiries & Courteous Requests',
          sub: 'Lesson Index #17',
          lecture: 'Lecture: "Could you tell me if..." Formula (16 min)',
          lectureTime: 'Video Lecture • 16 mins runtime',
          drill: 'Auto-Drill: Statement Order in Embedded Questions',
          drillMeta: 'Auto-Graded Diagnostic • Embedded Rules',
        },
        {
          num: '3.6',
          title: 'Module 3 Milestone Review: Interrogative Synthesis',
          sub: 'Module Milestone',
          isMilestone: true,
          lecture: 'Lecture: Dialogic Speech Strategy (11 min)',
          lectureTime: 'Synthesis Video • 11 mins runtime',
          drill: 'Auto-Drill: Modals & Questions Benchmark',
          drillMeta: 'Benchmark Threshold 80%',
        },
      ],
    },
    {
      id: 'mod4',
      num: '04',
      title: 'Compound Sentence Construction & Cohesion',
      tag: 'Structural Integration',
      desc: 'FANBOYS coordination, complex subordinate clauses, relative pronouns, and capstone validation.',
      meta: '6 Lessons • 6 Auto-Drills',
      runtime: 'Approx. 105 min lecture runtime',
      color: 'bg-primary-container text-on-primary-container',
      lessons: [
        {
          num: '4.1',
          title: 'Coordinating Conjunctions: The FANBOYS Architecture',
          sub: 'Lesson Index #19',
          lecture: 'Lecture: Comma Splices vs True Compounds (18 min)',
          lectureTime: 'Video Lecture • 18 mins runtime',
          drill: 'Auto-Drill: Comma Splice Detection & Resolution',
          drillMeta: 'Auto-Graded Diagnostic • Connector Rules',
        },
        {
          num: '4.2',
          title: 'Subordinating Clauses: Because, Although, Unless',
          sub: 'Lesson Index #20',
          lecture: 'Lecture: Dependent Clauses & Concessions (16 min)',
          lectureTime: 'Video Lecture • 16 mins runtime',
          drill: 'Auto-Drill: Subordinate Connector Matching',
          drillMeta: 'Auto-Graded Diagnostic • Dependent Clauses',
        },
        {
          num: '4.3',
          title: 'Relative Pronouns: Who, Which, That, Where',
          sub: 'Lesson Index #21',
          lecture: 'Lecture: Defining vs Non-Defining Clauses (17 min)',
          lectureTime: 'Video Lecture • 17 mins runtime',
          drill: 'Auto-Drill: Relative Clause Merging',
          drillMeta: 'Auto-Graded Diagnostic • Clause Merging',
        },
        {
          num: '4.4',
          title: 'Capstone Academic Diagnostic & Exit Assessment',
          sub: 'CEFR A2 Exit Capstone',
          isMilestone: true,
          lecture: 'Capstone Briefing: Structural Synthesis (20 min)',
          lectureTime: 'Synthesis Video • 20 mins runtime',
          drill: '50-Question Master Grammar Validation Drill',
          drillMeta: 'Certificate Guard • Benchmark 85%',
        },
      ],
    },
  ];

  const totalVisibleLessons = modulesData.reduce((acc, m) => {
    const matching = m.lessons.filter(
      (l) => matchesSearch(l.title) || matchesSearch(l.lecture) || matchesSearch(l.drill)
    );
    return acc + matching.length;
  }, 0);

  return (
    <div className="flex flex-col w-full space-y-6 font-['Nunito_Sans']">
      {/* ========================================================================= */}
      {/* QA STATE PREVIEW BAR                                                      */}
      {/* ========================================================================= */}
      <aside
        aria-label="QA Inspection Control"
        className="w-full bg-white px-5 py-3 rounded-2xl shadow-sm border border-[#fbeaec]"
      >
        <div className="max-w-7xl mx-auto flex flex-col xl:flex-row xl:items-center justify-between gap-3 font-['Quicksand']">
          <div className="flex items-center gap-2.5">
            <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-[#f48fb1] text-white shadow-2xs">
              <span className="material-symbols-outlined text-[16px]">bug_report</span>
            </span>
            <div className="flex flex-col sm:flex-row sm:items-center gap-x-2">
              <span className="uppercase tracking-wider text-[#22191b] font-bold text-[11px]">
                QA State Preview
              </span>
              <span className="hidden sm:inline text-[#d8c1c6] text-[12px]">•</span>
              <span className="text-[#534247] text-xs">
                STU-COURSE-03 Canonical Inspection Control (Mock Only)
              </span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-1.5 font-bold">
            <button
              type="button"
              onClick={() => handleStateChange('default')}
              className={`px-3.5 py-1.5 rounded-full text-xs transition-colors cursor-pointer ${
                qaState === 'default'
                  ? 'bg-[#f48fb1] text-white shadow-2xs font-bold'
                  : 'bg-[#fff8f8] text-[#534247] hover:bg-[#fff0f2] border border-[#f5e4e7]'
              }`}
            >
              State 1: Expanded
            </button>
            <button
              type="button"
              onClick={() => handleStateChange('collapsed')}
              className={`px-3.5 py-1.5 rounded-full text-xs transition-colors cursor-pointer ${
                qaState === 'collapsed'
                  ? 'bg-[#f48fb1] text-white shadow-2xs font-bold'
                  : 'bg-[#fff8f8] text-[#534247] hover:bg-[#fff0f2] border border-[#f5e4e7]'
              }`}
            >
              State 2: Collapsed
            </button>
            <button
              type="button"
              onClick={() => handleStateChange('skeleton')}
              className={`px-3.5 py-1.5 rounded-full text-xs transition-colors cursor-pointer ${
                qaState === 'skeleton'
                  ? 'bg-[#f48fb1] text-white shadow-2xs font-bold'
                  : 'bg-[#fff8f8] text-[#534247] hover:bg-[#fff0f2] border border-[#f5e4e7]'
              }`}
            >
              State 3: Loading Skeleton
            </button>
            <button
              type="button"
              onClick={() => handleStateChange('empty')}
              className={`px-3.5 py-1.5 rounded-full text-xs transition-colors cursor-pointer ${
                qaState === 'empty'
                  ? 'bg-[#f48fb1] text-white shadow-2xs font-bold'
                  : 'bg-[#fff8f8] text-[#534247] hover:bg-[#fff0f2] border border-[#f5e4e7]'
              }`}
            >
              State 4: Empty Structure
            </button>
            <button
              type="button"
              onClick={() => handleStateChange('error')}
              className={`px-3.5 py-1.5 rounded-full text-xs transition-colors cursor-pointer ${
                qaState === 'error'
                  ? 'bg-[#f48fb1] text-white shadow-2xs font-bold'
                  : 'bg-[#fff8f8] text-[#534247] hover:bg-[#fff0f2] border border-[#f5e4e7]'
              }`}
            >
              State 5: Error / 404
            </button>
          </div>
          <span className="text-[11px] text-[#725c06] font-medium">
            Inspection only: zero writes to enrollment or ledger.
          </span>
        </div>
      </aside>

      {/* ========================================================================= */}
      {/* NAVIGATION / CONTEXTUAL BREADCRUMB AREA                                   */}
      {/* ========================================================================= */}
      <section className="w-full bg-[#fff0f2] py-3.5 px-6 rounded-2xl border border-[#fbeaec]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4 font-['Quicksand'] font-bold">
          <nav
            aria-label="Breadcrumb"
            className="flex flex-wrap items-center gap-2 text-xs text-[#534247]"
          >
            <button
              type="button"
              onClick={() => onNavigateScreen('PUB-02-COURSES')}
              className="hover:text-[#f48fb1] transition-colors cursor-pointer flex items-center gap-1"
            >
              <span className="material-symbols-outlined text-[16px]">menu_book</span>
              <span>Courses</span>
            </button>
            <span className="material-symbols-outlined text-[14px] text-[#d8c1c6]">chevron_right</span>
            <span className="text-[#006685]">General English Track</span>
            <span className="material-symbols-outlined text-[14px] text-[#d8c1c6]">chevron_right</span>
            <button
              type="button"
              onClick={onBackToCourseDetail}
              className="text-[#22191b] hover:text-[#f48fb1] transition-colors cursor-pointer"
            >
              Essential English Grammar Mastery
            </button>
            <span className="material-symbols-outlined text-[14px] text-[#d8c1c6]">chevron_right</span>
            <span className="text-[#964261] font-bold">Structure Preview</span>
          </nav>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onBackToCourseDetail}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white text-[#22191b] hover:bg-[#fff8f8] hover:text-[#964261] transition-colors shadow-2xs text-xs font-bold cursor-pointer border border-[#f5e4e7]"
            >
              <span className="material-symbols-outlined text-[18px] text-[#f48fb1]">arrow_back</span>
              <span>Back to Course Detail</span>
            </button>
            <button
              type="button"
              onClick={() => onNavigateScreen('PUB-02-COURSES')}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#fff8f8] text-[#534247] hover:text-[#22191b] hover:bg-white transition-colors text-xs font-bold cursor-pointer border border-[#f5e4e7]"
            >
              <span className="material-symbols-outlined text-[18px]">menu_book</span>
              <span>Course Catalog</span>
            </button>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* COURSE & LEVEL IDENTITY HEADER                                            */}
      {/* ========================================================================= */}
      <header className="w-full bg-white p-6 sm:p-8 rounded-3xl shadow-[0_4px_20px_rgba(244,143,177,0.1)] border border-[#fbeaec]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-8 flex flex-col gap-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-[#81d4fa]/20 text-[#005d79] border border-[#81d4fa]/30 font-['Quicksand'] uppercase tracking-wider font-bold text-[11px]">
                  General English Track
                </span>
                <span className="px-3 py-1 rounded-full bg-[#ffe082]/30 text-[#725c06] border border-[#ffe082]/40 font-['Quicksand'] text-[11px] font-bold">
                  Level: A1 Beginner to A2 Elementary
                </span>
                <span className="px-3 py-1 rounded-full bg-[#fff0f2] text-[#964261] border border-[#f5e4e7] font-['Quicksand'] font-bold flex items-center gap-1.5 text-[11px]">
                  <span className="w-2 h-2 rounded-full bg-[#f48fb1] inline-block animate-pulse"></span>
                  PUBLISHED SYLLABUS PREVIEW
                </span>
              </div>

              <div className="flex flex-col gap-2">
                <h1 className="font-['Quicksand'] font-bold text-[#22191b] tracking-tight text-3xl sm:text-4xl">
                  Course Curriculum &amp; Structure Preview
                </h1>
                <p className="text-[#534247] max-w-3xl text-sm sm:text-base leading-relaxed">
                  Essential English Grammar Mastery follows a rigorous CEFR-aligned progression. Explore the full sequence of structured modules, high-definition concept lectures, and self-validating auto-drills prior to enrollment.
                </p>
              </div>

              {/* Structural Hierarchy Breadcrumb Map */}
              <div className="mt-2 p-4 rounded-2xl bg-[#fff0f2] flex flex-wrap items-center gap-y-2 gap-x-3 text-xs border border-[#fbeaec]">
                <span className="font-['Quicksand'] uppercase tracking-widest text-[#964261] font-bold text-[10px]">
                  Pedagogical Tree:
                </span>
                <span className="flex items-center gap-1 font-bold text-[#22191b]">
                  <span className="material-symbols-outlined text-[16px] text-[#f48fb1]">route</span> Track
                </span>
                <span className="material-symbols-outlined text-[14px] text-[#d8c1c6]">arrow_forward</span>
                <span className="flex items-center gap-1 font-bold text-[#22191b]">
                  <span className="material-symbols-outlined text-[16px] text-[#f48fb1]">auto_stories</span> Course
                </span>
                <span className="material-symbols-outlined text-[14px] text-[#d8c1c6]">arrow_forward</span>
                <span className="flex items-center gap-1 font-bold text-[#22191b]">
                  <span className="material-symbols-outlined text-[16px] text-[#f48fb1]">grade</span> Level (A1-A2)
                </span>
                <span className="material-symbols-outlined text-[14px] text-[#d8c1c6]">arrow_forward</span>
                <span className="flex items-center gap-1 text-[#534247]">
                  <span className="material-symbols-outlined text-[16px] text-[#81d4fa]">view_timeline</span> 4 Modules
                </span>
                <span className="material-symbols-outlined text-[14px] text-[#d8c1c6]">arrow_forward</span>
                <span className="flex items-center gap-1 text-[#534247]">
                  <span className="material-symbols-outlined text-[16px] text-[#81d4fa]">assignment</span> 24 Lessons
                </span>
                <span className="material-symbols-outlined text-[14px] text-[#d8c1c6]">arrow_forward</span>
                <span className="flex items-center gap-1 text-[#964261] font-['Quicksand'] font-bold">
                  <span className="material-symbols-outlined text-[16px] text-[#f48fb1]">video_library</span> 48 Learning Units
                </span>
              </div>
            </div>

            {/* Metric Badges & Lock State Visual Card */}
            <div className="lg:col-span-4 w-full">
              <div className="rounded-3xl p-5 bg-[#fff0f2] shadow-sm flex flex-col gap-4 border border-[#fbeaec]">
                <div className="flex items-center justify-between">
                  <span className="font-['Quicksand'] font-bold uppercase tracking-wider text-[#534247] text-xs">
                    Scope Parameters
                  </span>
                  <span className="px-3 py-1 rounded-full bg-white text-[#964261] border border-[#f5e4e7] font-['Quicksand'] font-bold text-[10px]">
                    Strict Sandbox
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-2.5 text-center py-1">
                  <div className="p-3 rounded-2xl bg-white border border-[#fbeaec] shadow-2xs">
                    <span className="font-['Quicksand'] font-bold text-[#964261] block text-xl">4</span>
                    <span className="font-['Quicksand'] font-bold text-[#534247] text-[11px]">Modules</span>
                  </div>
                  <div className="p-3 rounded-2xl bg-white border border-[#fbeaec] shadow-2xs">
                    <span className="font-['Quicksand'] font-bold text-[#22191b] block text-xl">24</span>
                    <span className="font-['Quicksand'] font-bold text-[#534247] text-[11px]">Lessons</span>
                  </div>
                  <div className="p-3 rounded-2xl bg-white border border-[#fbeaec] shadow-2xs">
                    <span className="font-['Quicksand'] font-bold text-[#006685] block text-xl">24</span>
                    <span className="font-['Quicksand'] font-bold text-[#534247] text-[11px]">Auto-Drills</span>
                  </div>
                </div>
                <div className="p-3 rounded-2xl bg-white flex items-center gap-3 border border-[#fbeaec]">
                  <span className="material-symbols-outlined text-[#f48fb1] text-[22px] shrink-0">lock</span>
                  <p className="text-[12px] leading-tight text-[#534247]">
                    <strong className="text-[#22191b] font-bold">Preview Boundary Guard Active:</strong> All instructional video streams and evaluation questionnaires are locked until verified class matriculation.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* ========================================================================= */}
      {/* DYNAMIC STATE CONTAINER: VIEW 3 (LOADING SKELETON)                        */}
      {/* ========================================================================= */}
      {qaState === 'skeleton' && (
        <section className="flex flex-col gap-4 w-full animate-pulse py-8" id="qa-skeleton-view">
          <div className="h-14 bg-white rounded-2xl w-full border border-[#fbeaec]"></div>
          <div className="h-44 bg-white rounded-3xl w-full border border-[#fbeaec]"></div>
          <div className="h-44 bg-white rounded-3xl w-full border border-[#fbeaec]"></div>
          <div className="h-44 bg-white rounded-3xl w-full border border-[#fbeaec]"></div>
        </section>
      )}

      {/* ========================================================================= */}
      {/* DYNAMIC STATE CONTAINER: VIEW 4 (EMPTY STRUCTURE STATE)                   */}
      {/* ========================================================================= */}
      {qaState === 'empty' && (
        <section
          className="flex flex-col items-center justify-center text-center p-12 sm:p-16 rounded-3xl bg-white shadow-[0_4px_20px_rgba(244,143,177,0.08)] gap-4 border border-[#fbeaec] my-6"
          id="qa-empty-view"
        >
          <div className="w-16 h-16 rounded-full bg-[#fff0f2] flex items-center justify-center text-[#725c06]">
            <span className="material-symbols-outlined text-[36px]">pending_actions</span>
          </div>
          <div className="flex flex-col gap-2 max-w-md">
            <h2 className="font-['Quicksand'] font-bold text-[#22191b] text-2xl">
              Syllabus Curriculum Pending Release
            </h2>
            <p className="text-[#534247] text-sm">
              Essential English Grammar Mastery has been formally scheduled. The instructional team is validating module learning units and auto-drills.
            </p>
          </div>
          <button
            type="button"
            onClick={onBackToCourseDetail}
            className="btn-tactile-primary px-6 py-2.5 rounded-full text-xs font-['Quicksand'] font-bold cursor-pointer"
          >
            Return to Course Information
          </button>
        </section>
      )}

      {/* ========================================================================= */}
      {/* DYNAMIC STATE CONTAINER: VIEW 5 (ERROR / 404 STATE)                       */}
      {/* ========================================================================= */}
      {qaState === 'error' && (
        <section
          className="flex flex-col items-center justify-center text-center p-12 sm:p-16 rounded-3xl bg-white shadow-[0_4px_20px_rgba(244,143,177,0.08)] gap-4 border border-[#fbeaec] my-6"
          id="qa-error-view"
        >
          <div className="w-16 h-16 rounded-full bg-[#ffdad6] text-[#ba1a1a] flex items-center justify-center">
            <span className="material-symbols-outlined text-[36px]">error</span>
          </div>
          <div className="flex flex-col gap-2 max-w-md">
            <span className="font-['Quicksand'] uppercase tracking-wider text-[#ba1a1a] font-bold text-xs">
              404 Syllabus Entity Not Found
            </span>
            <h2 className="font-['Quicksand'] font-bold text-[#22191b] text-2xl">
              Curriculum Data Unavailable
            </h2>
            <p className="text-[#534247] text-sm">
              The requested course structure path{' '}
              <code className="px-2 py-0.5 rounded-full bg-[#fff0f2] font-mono text-[12px] text-[#964261]">
                /courses/grammar-mastery/structure
              </code>{' '}
              could not be reconciled against our active course index.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => handleStateChange('default')}
              className="px-5 py-2.5 rounded-full bg-[#fff0f2] text-[#22191b] font-['Quicksand'] font-bold hover:bg-[#fbeaec] transition-colors text-xs cursor-pointer border border-[#fbeaec]"
            >
              Reset QA Mock
            </button>
            <button
              type="button"
              onClick={() => onNavigateScreen('PUB-02-COURSES')}
              className="btn-tactile-primary px-6 py-2.5 rounded-full text-xs font-['Quicksand'] font-bold cursor-pointer"
            >
              View All Courses
            </button>
          </div>
        </section>
      )}

      {/* ========================================================================= */}
      {/* DYNAMIC STATE CONTAINER: VIEW 1 & 2 (FULL SYLLABUS: EXPANDED / COLLAPSED) */}
      {/* ========================================================================= */}
      {(qaState === 'default' || qaState === 'collapsed') && (
        <section className="flex flex-col gap-5 w-full" id="qa-state-content">
          {/* Syllabus Control & Filter Bar */}
          <div className="w-full p-4 rounded-3xl bg-white shadow-[0_4px_16px_rgba(244,143,177,0.06)] flex flex-col md:flex-row items-center justify-between gap-4 border border-[#fbeaec]">
            <div className="relative w-full md:w-96">
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[#f48fb1] text-[20px]">
                search
              </span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search lessons, grammatical themes, or auto-drills..."
                className="w-full h-11 pl-11 pr-4 rounded-full bg-[#fff8f8] text-[#22191b] placeholder:text-[#534247]/60 focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#f48fb1]/40 border border-[#f5e4e7] text-xs"
              />
            </div>

            <div className="flex items-center justify-between md:justify-end gap-3 w-full md:w-auto font-['Quicksand'] font-bold">
              <span className="text-xs text-[#534247]" id="syllabus-counter-tag">
                {searchQuery.trim()
                  ? `Found ${totalVisibleLessons} matching lessons/units`
                  : 'Showing all 4 Modules • 24 Instructional Units'}
              </span>
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => setAllModules(true)}
                  className="px-3.5 py-1.5 rounded-full bg-[#fff8f8] text-[#534247] hover:bg-[#fff0f2] hover:text-[#964261] border border-[#f5e4e7] transition-colors text-xs cursor-pointer"
                >
                  Expand All
                </button>
                <button
                  type="button"
                  onClick={() => setAllModules(false)}
                  className="px-3.5 py-1.5 rounded-full bg-[#fff8f8] text-[#534247] hover:bg-[#fff0f2] hover:text-[#964261] border border-[#f5e4e7] transition-colors text-xs cursor-pointer"
                >
                  Collapse All
                </button>
              </div>
            </div>
          </div>

          {/* Curriculum Hierarchy Module Tree */}
          <div className="flex flex-col gap-5 w-full" id="modules-list">
            {modulesData.map((mod) => {
              const isExpanded = expandedModules[mod.id];
              const filteredLessons = mod.lessons.filter(
                (l) => matchesSearch(l.title) || matchesSearch(l.lecture) || matchesSearch(l.drill)
              );

              if (filteredLessons.length === 0 && searchQuery.trim()) {
                return null;
              }

              return (
                <article
                  key={mod.id}
                  className="module-card rounded-3xl bg-white shadow-[0_4px_20px_rgba(244,143,177,0.08)] overflow-hidden transition-all duration-200 border border-[#fbeaec]"
                >
                  {/* Module Header / Trigger */}
                  <header
                    onClick={() => toggleModule(mod.id)}
                    className="w-full p-5 sm:p-6 bg-[#fff0f2]/70 hover:bg-[#fff0f2] cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-colors select-none"
                  >
                    <div className="flex items-start sm:items-center gap-4">
                      <div className="w-13 h-13 rounded-2xl bg-[#f48fb1] text-white flex flex-col items-center justify-center shrink-0 shadow-xs">
                        <span className="font-['Quicksand'] font-bold text-[9px] tracking-widest uppercase">MOD</span>
                        <span className="font-['Quicksand'] font-bold leading-none text-base">
                          {mod.num}
                        </span>
                      </div>
                      <div className="flex flex-col">
                        <div className="flex flex-wrap items-center gap-2">
                          <h2 className="font-['Quicksand'] font-bold text-[#22191b] text-base sm:text-lg">
                            {mod.title}
                          </h2>
                          <span className="px-3 py-0.5 rounded-full bg-white text-[#964261] border border-[#f5e4e7] font-['Quicksand'] font-bold text-[11px] shadow-2xs">
                            {mod.tag}
                          </span>
                        </div>
                        <p className="text-[#534247] mt-1 text-xs">
                          {mod.desc}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 shrink-0 font-['Quicksand'] font-bold">
                      <div className="text-right hidden sm:block">
                        <span className="text-[#964261] font-bold block text-xs">
                          {mod.meta}
                        </span>
                        <span className="text-[12px] text-[#534247] font-medium">{mod.runtime}</span>
                      </div>
                      <div className="w-9 h-9 rounded-full bg-white border border-[#f5e4e7] flex items-center justify-center text-[#22191b] shadow-2xs">
                        <span
                          className={`material-symbols-outlined text-[20px] transition-transform duration-200 ${
                            isExpanded ? 'rotate-180 text-[#f48fb1]' : 'rotate-0'
                          }`}
                        >
                          expand_more
                        </span>
                      </div>
                    </div>
                  </header>

                  {/* Module Body: Lessons Accordion Item */}
                  {isExpanded && (
                    <div className="module-content p-5 sm:p-6 flex flex-col gap-4 border-t border-[#fbeaec]">
                      {filteredLessons.map((lesson) => (
                        <div
                          key={lesson.num}
                          className={`lesson-item p-4 rounded-2xl transition-colors border ${
                            lesson.isMilestone
                              ? 'bg-[#81d4fa]/15 border-[#81d4fa]/30'
                              : 'bg-[#fff8f8] hover:bg-[#fff0f2]/60 border-[#f5e4e7]'
                          }`}
                        >
                          <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-3">
                            <div className="flex items-center gap-2.5">
                              <span
                                className={`w-7 h-7 rounded-full flex items-center justify-center font-['Quicksand'] font-bold text-xs ${
                                  lesson.isMilestone
                                    ? 'bg-[#006685] text-white shadow-xs'
                                    : 'bg-[#f48fb1] text-white shadow-xs'
                                }`}
                              >
                                {lesson.num}
                              </span>
                              <h3
                                className={`font-['Quicksand'] font-bold text-[#22191b] text-sm sm:text-base ${
                                  lesson.isMilestone ? 'font-bold' : ''
                                }`}
                              >
                                {lesson.title}
                              </h3>
                            </div>
                            <span
                              className={`font-['Quicksand'] font-bold text-[11px] ${
                                lesson.isMilestone
                                  ? 'px-3 py-0.5 rounded-full bg-[#81d4fa] text-[#005d79]'
                                  : 'text-[#534247]'
                              }`}
                            >
                              {lesson.sub}
                            </span>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-1">
                            {/* Item 1: Video */}
                            <div className="p-3 rounded-2xl bg-white flex items-center justify-between gap-3 border border-[#fbeaec] shadow-2xs">
                              <div className="flex items-center gap-3 min-w-0">
                                <span className="w-8 h-8 rounded-full bg-[#fff0f2] text-[#f48fb1] flex items-center justify-center shrink-0">
                                  <span className="material-symbols-outlined text-[18px]">play_circle</span>
                                </span>
                                <div className="flex flex-col min-w-0">
                                  <span className="font-['Quicksand'] font-bold text-[#22191b] truncate text-xs">
                                    {lesson.lecture}
                                  </span>
                                  <span className="text-[11px] text-[#534247]">
                                    {lesson.lectureTime}
                                  </span>
                                </div>
                              </div>
                              <span className="px-2.5 py-1 rounded-full bg-[#fff0f2] text-[#964261] font-['Quicksand'] text-[10px] tracking-wider uppercase font-bold shrink-0">
                                Preview Only
                              </span>
                            </div>

                            {/* Item 2: Auto-Drill */}
                            <div className="p-3 rounded-2xl bg-white flex items-center justify-between gap-3 border border-[#fbeaec] shadow-2xs">
                              <div className="flex items-center gap-3 min-w-0">
                                <span className="w-8 h-8 rounded-full bg-[#a5d6a7]/20 text-[#2e6830] flex items-center justify-center shrink-0">
                                  <span className="material-symbols-outlined text-[18px]">
                                    {lesson.isMilestone ? 'verified' : 'fact_check'}
                                  </span>
                                </span>
                                <div className="flex flex-col min-w-0">
                                  <span className="font-['Quicksand'] font-bold text-[#22191b] truncate text-xs">
                                    {lesson.drill}
                                  </span>
                                  <span className="text-[11px] text-[#534247]">
                                    {lesson.drillMeta}
                                  </span>
                                </div>
                              </div>
                              <span
                                className={`px-2.5 py-1 rounded-full font-['Quicksand'] text-[10px] tracking-wider uppercase font-bold shrink-0 ${
                                  lesson.isMilestone
                                    ? 'bg-[#a5d6a7] text-[#2e6830]'
                                    : 'bg-[#fff8f8] text-[#534247] border border-[#f5e4e7]'
                                }`}
                              >
                                {lesson.isMilestone ? 'Pass Criteria' : 'Locked Drill'}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </article>
              );
            })}
          </div>
        </section>
      )}

      {/* ========================================================================= */}
      {/* STRICT BOUNDARY NOTICES & GOVERNANCE GUARD                                */}
      {/* ========================================================================= */}
      <section className="rounded-3xl p-6 sm:p-8 bg-white shadow-[0_4px_20px_rgba(244,143,177,0.1)] flex flex-col md:flex-row items-start justify-between gap-6 border border-[#fbeaec]">
        <div className="flex items-start gap-4 max-w-3xl">
          <div className="w-12 h-12 rounded-2xl bg-[#81d4fa]/20 text-[#006685] flex items-center justify-center shrink-0 shadow-2xs">
            <span className="material-symbols-outlined text-[26px]">gavel</span>
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="font-['Quicksand'] font-bold text-[#22191b] text-lg">
              Curriculum Preview Governance &amp; Access Boundary
            </h3>
            <p className="text-[#534247] leading-relaxed text-xs sm:text-sm">
              This preview screen reflects the approved academic syllabus for{' '}
              <strong className="text-[#22191b] font-bold">Essential English Grammar Mastery</strong>.
              Video lectures, interactive exercise answer forms, submission processing, and progress completion tracking remain strictly locked until enrollment is authorized. Ordinary exercises are 100% auto-graded once unlocked.
            </p>
          </div>
        </div>

        <div className="shrink-0 w-full md:w-auto">
          <button
            type="button"
            onClick={onBackToCourseDetail}
            className="w-full md:w-auto btn-tactile-primary px-6 py-3 rounded-full text-xs font-['Quicksand'] font-bold cursor-pointer inline-flex items-center justify-center gap-2"
          >
            <span>Return to Course Detail to Enroll</span>
            <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
          </button>
        </div>
      </section>
    </div>
  );
};
