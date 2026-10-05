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
    <div className="flex flex-col w-full space-y-6">
      {/* ========================================================================= */}
      {/* QA STATE PREVIEW BAR                                                      */}
      {/* ========================================================================= */}
      <aside
        aria-label="QA Inspection Control"
        className="w-full bg-surface-container-high px-margin py-space-xs rounded-xl shadow-sm border border-outline-variant/30"
      >
        <div className="max-w-7xl mx-auto flex flex-col xl:flex-row xl:items-center justify-between gap-space-xs">
          <div className="flex items-center gap-space-xs">
            <span className="inline-flex items-center justify-center w-6 h-6 rounded bg-primary text-on-primary">
              <span className="material-symbols-outlined text-[16px]">bug_report</span>
            </span>
            <div className="flex flex-col sm:flex-row sm:items-center gap-x-space-xs">
              <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface font-bold text-[11px]">
                QA State Preview
              </span>
              <span className="hidden sm:inline text-outline text-[12px]">•</span>
              <span className="font-body-sm text-body-sm text-on-surface-variant text-xs">
                STU-COURSE-03 Canonical Inspection Control (Mock Only)
              </span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-space-2xs">
            <button
              type="button"
              onClick={() => handleStateChange('default')}
              className={`px-space-xs py-1 rounded font-label-sm text-label-sm text-xs transition-colors cursor-pointer ${
                qaState === 'default'
                  ? 'bg-primary text-on-primary shadow-sm font-bold'
                  : 'bg-surface-container-lowest text-on-surface hover:bg-surface-container'
              }`}
            >
              State 1: Expanded
            </button>
            <button
              type="button"
              onClick={() => handleStateChange('collapsed')}
              className={`px-space-xs py-1 rounded font-label-sm text-label-sm text-xs transition-colors cursor-pointer ${
                qaState === 'collapsed'
                  ? 'bg-primary text-on-primary shadow-sm font-bold'
                  : 'bg-surface-container-lowest text-on-surface hover:bg-surface-container'
              }`}
            >
              State 2: Collapsed
            </button>
            <button
              type="button"
              onClick={() => handleStateChange('skeleton')}
              className={`px-space-xs py-1 rounded font-label-sm text-label-sm text-xs transition-colors cursor-pointer ${
                qaState === 'skeleton'
                  ? 'bg-primary text-on-primary shadow-sm font-bold'
                  : 'bg-surface-container-lowest text-on-surface hover:bg-surface-container'
              }`}
            >
              State 3: Loading Skeleton
            </button>
            <button
              type="button"
              onClick={() => handleStateChange('empty')}
              className={`px-space-xs py-1 rounded font-label-sm text-label-sm text-xs transition-colors cursor-pointer ${
                qaState === 'empty'
                  ? 'bg-primary text-on-primary shadow-sm font-bold'
                  : 'bg-surface-container-lowest text-on-surface hover:bg-surface-container'
              }`}
            >
              State 4: Empty Structure
            </button>
            <button
              type="button"
              onClick={() => handleStateChange('error')}
              className={`px-space-xs py-1 rounded font-label-sm text-label-sm text-xs transition-colors cursor-pointer ${
                qaState === 'error'
                  ? 'bg-primary text-on-primary shadow-sm font-bold'
                  : 'bg-surface-container-lowest text-on-surface hover:bg-surface-container'
              }`}
            >
              State 5: Error / 404
            </button>
          </div>
          <span className="font-body-sm text-[11px] text-tertiary">
            Inspection only: zero writes to enrollment or ledger.
          </span>
        </div>
      </aside>

      {/* ========================================================================= */}
      {/* NAVIGATION / CONTEXTUAL BREADCRUMB AREA                                   */}
      {/* ========================================================================= */}
      <section className="w-full bg-surface-container-low py-space-sm px-margin rounded-xl border border-outline-variant/30">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-space-sm">
          <nav
            aria-label="Breadcrumb"
            className="flex flex-wrap items-center gap-space-2xs font-body-sm text-body-sm text-on-surface-variant text-xs"
          >
            <button
              type="button"
              onClick={() => onNavigateScreen('PUB-02-COURSES')}
              className="hover:text-primary transition-colors cursor-pointer flex items-center gap-1"
            >
              <span className="material-symbols-outlined text-[15px]">menu_book</span>
              <span>Courses</span>
            </button>
            <span className="material-symbols-outlined text-[14px] text-outline">chevron_right</span>
            <span className="text-tertiary">General English Track</span>
            <span className="material-symbols-outlined text-[14px] text-outline">chevron_right</span>
            <button
              type="button"
              onClick={onBackToCourseDetail}
              className="font-semibold text-on-surface hover:text-primary transition-colors cursor-pointer"
            >
              Essential English Grammar Mastery
            </button>
            <span className="material-symbols-outlined text-[14px] text-outline">chevron_right</span>
            <span className="text-primary font-bold">Structure Preview</span>
          </nav>

          <div className="flex items-center gap-space-xs">
            <button
              type="button"
              onClick={onBackToCourseDetail}
              className="inline-flex items-center gap-space-2xs px-space-sm py-space-2xs rounded-lg bg-surface-container-lowest text-on-surface font-label-md text-label-md hover:bg-surface-container transition-colors shadow-sm text-xs font-semibold cursor-pointer border border-outline-variant/30"
            >
              <span className="material-symbols-outlined text-[18px] text-primary">arrow_back</span>
              <span>Back to Course Detail</span>
            </button>
            <button
              type="button"
              onClick={() => onNavigateScreen('PUB-02-COURSES')}
              className="inline-flex items-center gap-space-2xs px-space-sm py-space-2xs rounded-lg bg-surface-container-high text-on-surface-variant font-label-md text-label-md hover:text-on-surface transition-colors text-xs font-semibold cursor-pointer"
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
      <header className="w-full bg-surface-container-lowest py-space-xl px-margin rounded-2xl shadow-sm border border-outline-variant/30">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-xl items-start">
            <div className="lg:col-span-8 flex flex-col gap-space-sm">
              <div className="flex flex-wrap items-center gap-space-xs">
                <span className="px-space-xs py-1 rounded bg-secondary-fixed text-on-secondary-fixed font-label-sm text-label-sm uppercase tracking-wider font-bold text-[11px]">
                  General English Track
                </span>
                <span className="px-space-xs py-1 rounded bg-tertiary-fixed text-on-tertiary-fixed font-label-sm text-label-sm text-[11px] font-semibold">
                  Level: A1 Beginner to A2 Elementary
                </span>
                <span className="px-space-xs py-1 rounded bg-surface-container-highest text-primary font-label-sm text-label-sm font-bold flex items-center gap-1 text-[11px]">
                  <span className="w-2 h-2 rounded-full bg-primary inline-block"></span>
                  PUBLISHED SYLLABUS PREVIEW
                </span>
              </div>

              <div className="flex flex-col gap-space-2xs">
                <h1 className="font-headline-xl text-headline-xl text-on-surface font-semibold tracking-tight text-3xl sm:text-4xl font-serif">
                  Course Curriculum &amp; Structure Preview
                </h1>
                <p className="font-body-lg text-body-lg text-on-surface-variant max-w-3xl text-sm sm:text-base leading-relaxed">
                  Essential English Grammar Mastery follows a rigorous CEFR-aligned progression. Explore the full sequence of structured modules, high-definition concept lectures, and self-validating auto-drills prior to enrollment.
                </p>
              </div>

              {/* Structural Hierarchy Breadcrumb Map */}
              <div className="mt-space-xs p-space-sm rounded-xl bg-surface-container flex flex-wrap items-center gap-y-space-xs gap-x-space-sm font-body-sm text-body-sm text-on-surface-variant text-xs">
                <span className="font-label-sm text-label-sm uppercase tracking-widest text-primary font-bold text-[10px]">
                  Pedagogical Tree:
                </span>
                <span className="flex items-center gap-1 font-semibold text-on-surface">
                  <span className="material-symbols-outlined text-[16px] text-primary">route</span> Track
                </span>
                <span className="material-symbols-outlined text-[14px] text-outline">arrow_forward</span>
                <span className="flex items-center gap-1 font-semibold text-on-surface">
                  <span className="material-symbols-outlined text-[16px] text-primary">auto_stories</span> Course
                </span>
                <span className="material-symbols-outlined text-[14px] text-outline">arrow_forward</span>
                <span className="flex items-center gap-1 font-semibold text-on-surface">
                  <span className="material-symbols-outlined text-[16px] text-primary">grade</span> Level (A1-A2)
                </span>
                <span className="material-symbols-outlined text-[14px] text-outline">arrow_forward</span>
                <span className="flex items-center gap-1 text-on-surface">
                  <span className="material-symbols-outlined text-[16px] text-primary">view_timeline</span> 4 Modules
                </span>
                <span className="material-symbols-outlined text-[14px] text-outline">arrow_forward</span>
                <span className="flex items-center gap-1 text-on-surface">
                  <span className="material-symbols-outlined text-[16px] text-primary">assignment</span> 24 Lessons
                </span>
                <span className="material-symbols-outlined text-[14px] text-outline">arrow_forward</span>
                <span className="flex items-center gap-1 text-primary font-bold">
                  <span className="material-symbols-outlined text-[16px]">video_library</span> 48 Learning Units
                </span>
              </div>
            </div>

            {/* Metric Badges & Lock State Visual Card */}
            <div className="lg:col-span-4 w-full">
              <div className="rounded-xl p-space-md bg-surface-container-low shadow-sm flex flex-col gap-space-sm border border-outline-variant/30">
                <div className="flex items-center justify-between">
                  <span className="font-label-md text-label-md uppercase tracking-wider text-on-surface-variant font-bold text-xs">
                    Scope Parameters
                  </span>
                  <span className="px-space-xs py-0.5 rounded bg-surface-container-high text-primary font-label-sm text-label-sm font-semibold text-[10px]">
                    Strict Sandbox
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-space-xs text-center py-space-xs">
                  <div className="p-space-xs rounded-lg bg-surface-container-lowest border border-outline-variant/20">
                    <span className="font-headline-md text-headline-md text-primary font-bold block text-xl">4</span>
                    <span className="font-label-sm text-label-sm text-on-surface-variant text-[11px]">Modules</span>
                  </div>
                  <div className="p-space-xs rounded-lg bg-surface-container-lowest border border-outline-variant/20">
                    <span className="font-headline-md text-headline-md text-on-surface font-bold block text-xl">24</span>
                    <span className="font-label-sm text-label-sm text-on-surface-variant text-[11px]">Lessons</span>
                  </div>
                  <div className="p-space-xs rounded-lg bg-surface-container-lowest border border-outline-variant/20">
                    <span className="font-headline-md text-headline-md text-secondary font-bold block text-xl">24</span>
                    <span className="font-label-sm text-label-sm text-on-surface-variant text-[11px]">Auto-Drills</span>
                  </div>
                </div>
                <div className="p-space-xs rounded-lg bg-surface-container-high flex items-center gap-space-xs">
                  <span className="material-symbols-outlined text-primary text-[20px] shrink-0">lock</span>
                  <p className="font-body-sm text-[12px] leading-tight text-on-surface-variant">
                    <strong className="text-on-surface font-semibold">Preview Boundary Guard Active:</strong> All instructional video streams and evaluation questionnaires are locked until verified class matriculation.
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
        <section className="flex flex-col gap-space-md w-full animate-pulse py-8" id="qa-skeleton-view">
          <div className="h-14 bg-surface-container-high rounded-xl w-full"></div>
          <div className="h-44 bg-surface-container-high rounded-xl w-full"></div>
          <div className="h-44 bg-surface-container-high rounded-xl w-full"></div>
          <div className="h-44 bg-surface-container-high rounded-xl w-full"></div>
        </section>
      )}

      {/* ========================================================================= */}
      {/* DYNAMIC STATE CONTAINER: VIEW 4 (EMPTY STRUCTURE STATE)                   */}
      {/* ========================================================================= */}
      {qaState === 'empty' && (
        <section
          className="flex flex-col items-center justify-center text-center p-space-3xl rounded-2xl bg-surface-container-lowest shadow-sm gap-space-md border border-outline-variant/30 my-8"
          id="qa-empty-view"
        >
          <div className="w-16 h-16 rounded-full bg-surface-container-high flex items-center justify-center text-tertiary">
            <span className="material-symbols-outlined text-[36px]">pending_actions</span>
          </div>
          <div className="flex flex-col gap-1 max-w-md">
            <h2 className="font-headline-lg text-headline-lg text-on-surface font-semibold text-2xl font-serif">
              Syllabus Curriculum Pending Release
            </h2>
            <p className="font-body-md text-body-md text-on-surface-variant text-sm">
              Essential English Grammar Mastery has been formally scheduled. The instructional team is validating module learning units and auto-drills.
            </p>
          </div>
          <button
            type="button"
            onClick={onBackToCourseDetail}
            className="px-space-md py-space-xs rounded-lg bg-primary text-on-primary font-label-md text-label-md hover:bg-primary-container transition-colors shadow-sm text-xs font-bold cursor-pointer"
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
          className="flex flex-col items-center justify-center text-center p-space-3xl rounded-2xl bg-surface-container-lowest shadow-sm gap-space-md border border-outline-variant/30 my-8"
          id="qa-error-view"
        >
          <div className="w-16 h-16 rounded-full bg-error-container text-error flex items-center justify-center">
            <span className="material-symbols-outlined text-[36px]">error</span>
          </div>
          <div className="flex flex-col gap-1 max-w-md">
            <span className="font-label-sm text-label-sm uppercase tracking-wider text-error font-bold text-xs">
              404 Syllabus Entity Not Found
            </span>
            <h2 className="font-headline-lg text-headline-lg text-on-surface font-semibold text-2xl font-serif">
              Curriculum Data Unavailable
            </h2>
            <p className="font-body-md text-body-md text-on-surface-variant text-sm">
              The requested course structure path{' '}
              <code className="px-1.5 py-0.5 rounded bg-surface-container font-mono text-[12px]">
                /courses/grammar-mastery/structure
              </code>{' '}
              could not be reconciled against our active course index.
            </p>
          </div>
          <div className="flex items-center gap-space-xs">
            <button
              type="button"
              onClick={() => handleStateChange('default')}
              className="px-space-md py-space-xs rounded-lg bg-surface-container text-on-surface font-label-md text-label-md hover:bg-surface-container-high transition-colors text-xs font-semibold cursor-pointer"
            >
              Reset QA Mock
            </button>
            <button
              type="button"
              onClick={() => onNavigateScreen('PUB-02-COURSES')}
              className="px-space-md py-space-xs rounded-lg bg-primary text-on-primary font-label-md text-label-md hover:bg-primary-container transition-colors shadow-sm text-xs font-bold cursor-pointer"
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
        <section className="flex flex-col gap-space-md w-full" id="qa-state-content">
          {/* Syllabus Control & Filter Bar */}
          <div className="w-full p-space-sm rounded-xl bg-surface-container-lowest shadow-sm flex flex-col md:flex-row items-center justify-between gap-space-sm border border-outline-variant/30">
            <div className="relative w-full md:w-96">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-[20px]">
                search
              </span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search lessons, grammatical themes, or auto-drills..."
                className="w-full h-10 pl-10 pr-4 rounded-lg bg-surface-container-high text-on-surface font-body-md text-body-md placeholder:text-outline focus:outline-none focus:bg-surface-container text-xs"
              />
            </div>

            <div className="flex items-center justify-between md:justify-end gap-space-sm w-full md:w-auto">
              <span className="font-body-sm text-body-sm text-tertiary text-xs" id="syllabus-counter-tag">
                {searchQuery.trim()
                  ? `Found ${totalVisibleLessons} matching lessons/units`
                  : 'Showing all 4 Modules • 24 Instructional Units'}
              </span>
              <div className="flex items-center gap-space-2xs">
                <button
                  type="button"
                  onClick={() => setAllModules(true)}
                  className="px-space-xs py-1.5 rounded-lg bg-surface-container text-on-surface font-label-sm text-label-sm hover:bg-surface-container-high transition-colors text-xs font-medium cursor-pointer"
                >
                  Expand All
                </button>
                <button
                  type="button"
                  onClick={() => setAllModules(false)}
                  className="px-space-xs py-1.5 rounded-lg bg-surface-container text-on-surface font-label-sm text-label-sm hover:bg-surface-container-high transition-colors text-xs font-medium cursor-pointer"
                >
                  Collapse All
                </button>
              </div>
            </div>
          </div>

          {/* Curriculum Hierarchy Module Tree */}
          <div className="flex flex-col gap-space-md w-full" id="modules-list">
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
                  className="module-card rounded-2xl bg-surface-container-lowest shadow-sm overflow-hidden transition-all duration-200 border border-outline-variant/30"
                >
                  {/* Module Header / Trigger */}
                  <header
                    onClick={() => toggleModule(mod.id)}
                    className="w-full p-space-md bg-surface-container-low hover:bg-surface-container cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-space-sm transition-colors select-none"
                  >
                    <div className="flex items-start sm:items-center gap-space-sm">
                      <div
                        className={`w-12 h-12 rounded-xl ${mod.color} flex flex-col items-center justify-center shrink-0 shadow-sm`}
                      >
                        <span className="font-label-sm text-[10px] tracking-widest uppercase">MOD</span>
                        <span className="font-headline-md text-headline-md font-bold leading-none text-base">
                          {mod.num}
                        </span>
                      </div>
                      <div className="flex flex-col">
                        <div className="flex flex-wrap items-center gap-space-2xs">
                          <h2 className="font-headline-md text-headline-md text-on-surface font-semibold text-base sm:text-lg">
                            {mod.title}
                          </h2>
                          <span className="px-2 py-0.5 rounded bg-surface-container-highest text-on-surface-variant font-label-sm text-[11px] font-bold">
                            {mod.tag}
                          </span>
                        </div>
                        <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5 text-xs">
                          {mod.desc}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-space-md shrink-0">
                      <div className="text-right hidden sm:block">
                        <span className="font-label-sm text-label-sm text-primary font-bold block text-xs">
                          {mod.meta}
                        </span>
                        <span className="font-body-sm text-[12px] text-tertiary">{mod.runtime}</span>
                      </div>
                      <div className="w-8 h-8 rounded-full bg-surface-container-high flex items-center justify-center text-on-surface">
                        <span
                          className={`material-symbols-outlined text-[20px] transition-transform duration-200 ${
                            isExpanded ? 'rotate-180' : 'rotate-0'
                          }`}
                        >
                          expand_more
                        </span>
                      </div>
                    </div>
                  </header>

                  {/* Module Body: Lessons Accordion Item */}
                  {isExpanded && (
                    <div className="module-content p-space-md flex flex-col gap-space-sm border-t border-outline-variant/20">
                      {filteredLessons.map((lesson) => (
                        <div
                          key={lesson.num}
                          className={`lesson-item p-space-sm rounded-xl transition-colors border border-outline-variant/20 ${
                            lesson.isMilestone
                              ? 'bg-secondary-fixed/30 hover:bg-secondary-fixed/50'
                              : 'bg-surface-container hover:bg-surface-container-high'
                          }`}
                        >
                          <div className="flex flex-col md:flex-row md:items-center justify-between gap-space-xs mb-space-xs">
                            <div className="flex items-center gap-space-xs">
                              <span
                                className={`w-7 h-7 rounded-md flex items-center justify-center font-label-sm text-label-sm font-bold text-xs ${
                                  lesson.isMilestone
                                    ? 'bg-primary text-on-primary'
                                    : 'bg-secondary-fixed text-on-secondary-fixed'
                                }`}
                              >
                                {lesson.num}
                              </span>
                              <h3
                                className={`font-headline-sm text-headline-sm text-on-surface text-sm sm:text-base ${
                                  lesson.isMilestone ? 'font-bold' : 'font-semibold'
                                }`}
                              >
                                {lesson.title}
                              </h3>
                            </div>
                            <span
                              className={`font-label-sm text-[11px] ${
                                lesson.isMilestone
                                  ? 'px-2 py-0.5 rounded bg-primary/10 text-primary font-bold'
                                  : 'text-tertiary'
                              }`}
                            >
                              {lesson.sub}
                            </span>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-space-xs mt-space-2xs">
                            {/* Item 1: Video */}
                            <div className="p-space-xs rounded-lg bg-surface-container-lowest flex items-center justify-between gap-space-xs border border-outline-variant/20">
                              <div className="flex items-center gap-space-xs">
                                <span className="w-8 h-8 rounded bg-surface-container-high text-primary flex items-center justify-center shrink-0">
                                  <span className="material-symbols-outlined text-[18px]">play_circle</span>
                                </span>
                                <div className="flex flex-col min-w-0">
                                  <span className="font-label-md text-label-md text-on-surface font-medium truncate text-xs">
                                    {lesson.lecture}
                                  </span>
                                  <span className="font-body-sm text-[11px] text-tertiary">
                                    {lesson.lectureTime}
                                  </span>
                                </div>
                              </div>
                              <span className="px-space-2xs py-0.5 rounded bg-surface-container text-tertiary font-label-sm text-[10px] tracking-wider uppercase font-bold shrink-0">
                                Preview Only
                              </span>
                            </div>

                            {/* Item 2: Auto-Drill */}
                            <div className="p-space-xs rounded-lg bg-surface-container-lowest flex items-center justify-between gap-space-xs border border-outline-variant/20">
                              <div className="flex items-center gap-space-xs">
                                <span className="w-8 h-8 rounded bg-surface-container-high text-secondary flex items-center justify-center shrink-0">
                                  <span className="material-symbols-outlined text-[18px]">
                                    {lesson.isMilestone ? 'verified' : 'fact_check'}
                                  </span>
                                </span>
                                <div className="flex flex-col min-w-0">
                                  <span className="font-label-md text-label-md text-on-surface font-medium truncate text-xs">
                                    {lesson.drill}
                                  </span>
                                  <span className="font-body-sm text-[11px] text-tertiary">
                                    {lesson.drillMeta}
                                  </span>
                                </div>
                              </div>
                              <span
                                className={`px-space-2xs py-0.5 rounded font-label-sm text-[10px] tracking-wider uppercase font-bold shrink-0 ${
                                  lesson.isMilestone
                                    ? 'bg-primary text-on-primary'
                                    : 'bg-surface-container text-tertiary'
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
      <section className="rounded-2xl p-space-lg bg-surface-container-low shadow-sm flex flex-col md:flex-row items-start justify-between gap-space-lg border border-outline-variant/30">
        <div className="flex items-start gap-space-sm max-w-3xl">
          <div className="w-10 h-10 rounded-lg bg-secondary text-on-secondary flex items-center justify-center shrink-0 shadow-sm">
            <span className="material-symbols-outlined text-[24px]">gavel</span>
          </div>
          <div className="flex flex-col gap-space-2xs">
            <h3 className="font-headline-md text-headline-md text-on-surface font-semibold text-lg font-serif">
              Curriculum Preview Governance &amp; Access Boundary
            </h3>
            <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed text-xs sm:text-sm">
              This preview screen reflects the approved academic syllabus for{' '}
              <strong className="text-on-surface font-semibold">Essential English Grammar Mastery</strong>.
              Video lectures, interactive exercise answer forms, submission processing, and progress completion tracking remain strictly locked until enrollment is authorized. Ordinary exercises are 100% auto-graded once unlocked.
            </p>
          </div>
        </div>

        <div className="shrink-0 w-full md:w-auto">
          <button
            type="button"
            onClick={onBackToCourseDetail}
            className="w-full md:w-auto inline-flex items-center justify-center gap-space-xs px-space-lg py-space-sm rounded-lg bg-primary hover:bg-primary-container text-on-primary font-label-lg text-label-lg transition-colors shadow-md text-xs font-bold cursor-pointer"
          >
            <span>Return to Course Detail to Enroll</span>
            <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
          </button>
        </div>
      </section>
    </div>
  );
};
