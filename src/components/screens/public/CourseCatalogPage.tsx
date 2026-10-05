import React, { useState, useMemo } from 'react';
import { ScreenId } from '../../../types/navigation';

interface CourseItem {
  id: string;
  title: string;
  track: string;
  access: 'free' | 'paid';
  level: string;
  structure: string;
  tuition: string;
  description: string;
  image: string;
  imageAlt: string;
}

const COURSES_CATALOG: CourseItem[] = [
  {
    id: 'course-1',
    title: 'Essential English Grammar Mastery',
    track: 'General English',
    access: 'paid',
    level: 'Level: A1 Beginner to A2 Elementary',
    structure: '4 Modules • 24 Lessons • 24 Auto-Exercises',
    tuition: '45,000 MMK',
    description:
      'Build a rock-solid foundation in English grammar, sentence structures, and everyday syntax with guided video lessons and auto-graded drills.',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDUgCuk5tg8GGSk5Kfyy_Rb6CvaUPS46FteZlB-Uwyhb60cqvc4K-KIN4W6rA3BkKZzoVBiGLXrVwP1SYG4zPVgq9Xwhn8GJy5DOifhmP8xfckazVnnrKlOT06Vpz5nxAocRg845YAx6Wa5ltOrG2ZDT4EwDG62SuhSjaA8DOX6861spFcfwAZFjP0sVBVgJPcgC4B2sopDD70qn5x1y7LWh7sl9tYRhs4OJ8nLZ3o',
    imageAlt:
      'A clean academic desk with classical leather-bound grammar books, an open notebook with elegant English handwritten syntax exercises, and a warm ceramic coffee cup.',
  },
  {
    id: 'course-2',
    title: 'Everyday Spoken English Essentials',
    track: 'Daily Conversation',
    access: 'free',
    level: 'Level: All Levels Foundation',
    structure: '2 Modules • 10 Lessons • Free Direct Access',
    tuition: 'FREE ACCESS',
    description:
      'Learn practical spoken expressions, daily situational dialogues, and confidence-building conversation patterns. Direct immediate entry with zero enrollment record delay.',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCbSJMT7mLq3xR8p09toWbbd5KUYXEfVbHrmbAHAw7hkBK_bmhj44yIsC6I9vZWl851xpPQDdIT7W0B6kBZQuE4XERugsTNiXe98Njxqa5U8uucN7wufdp6-f06Clyuml4KFuqf7__a0rANl9qUeM2CYmFHoTa66n_MBlxBB_T88hDqhGRJvCNcimdTqNg6M_i3BT3te205-AOs_tEZcYwI89J3-rzO1tJEIktve_8',
    imageAlt:
      'Two diverse university students engaging in an animated spoken English dialogue across an outdoor wooden campus courtyard.',
  },
  {
    id: 'course-3',
    title: 'Professional Workplace Communication',
    track: 'Business English',
    access: 'paid',
    level: 'Level: B1 Intermediate',
    structure: '5 Modules • 30 Lessons • Auto-Graded Exercises',
    tuition: '65,000 MMK',
    description:
      'Master formal email writing, meeting participation, and executive presentation phrasing for corporate environments.',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAMlRXFjfY8hXO8kEAC6KrVTPnFWkDDOqsvaLEctRWcFgx-I1td2sAO7NA-N3wsMkWWhKejxI6y-mSCncwtpDZzn8OnrLHfW7R_08TuhYqU8wJExPKaBLVS3pYeoh9D4zuwIR5KySf2XYrsl2M2GT2wgSxAmJqL-5vdSIAijs6AF2SazTFjmso8Z6C5PnsJho1pm5o9Vy8t1hUEg9h2lsagGZUsF5hWH64MQLdXD1w',
    imageAlt:
      'An executive conference room table with tablet showing structured business analytics graphs and English executive email draft on screen.',
  },
  {
    id: 'course-4',
    title: 'Job Interview Confidence & Pitching',
    track: 'Interview English',
    access: 'paid',
    level: 'Level: B1 to B2 Upper Intermediate',
    structure: '3 Modules • 15 Lessons • Mock Prompts',
    tuition: '50,000 MMK',
    description:
      'Prepare structured answers for common behavioral questions, CV presentation, and English job interviews with executive guidance.',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBDq3zjY-dgI7Imwws3_dnt5uKnapSzwu-IKmrZK6Ey3xyKeH7OMnccMopmTRWJa35TZCI_alvhKzW5zNTBjgtGn0w4LEkK6SO_PO6EWX2qIEtkzwC_mZoihn7r1VFr2CD6adpgj3-6IMop1j_giY85b7vqhRVO4v_wR035JwrSqFDYTUfo_cE_y-2cVszIgfQ-MQnhokjIloUwK4Vju--kdVyJZsbkGDPPkUtviic',
    imageAlt:
      'A poised professional candidate sitting in an interview setting with formal resume on wooden desk.',
  },
  {
    id: 'course-5',
    title: 'Academic Vocabulary & Reading Primer',
    track: 'School',
    access: 'free',
    level: 'Level: School Intermediate',
    structure: '2 Modules • 8 Lessons • Free Direct Access',
    tuition: 'FREE ACCESS',
    description:
      'Expand essential academic vocabulary, reading comprehension techniques, and sentence analysis for students preparing for high exams.',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuB0jYuTs_dJiK9zKybMN3LLQXKUyQQbPJ8PGKoaDFo8yUfsEbrgpwzemIDZEaU_xmmQ8PKSS-V-lpt0hEmObx4421PCJDDOelfMHeH7OmHwt_U8OA9W8ziDsdJHOIRg7aSMwx0mp-RuUQfwKYRXZUfAK4MCE8Q3f7PSYdMRraAz8bns0zQUaehrntCjQ5rWNfDhOqg-MwV49Il9y8FpeuHlcpl17aTKtP9Lhw_Fjag',
    imageAlt:
      'An organized secondary school student study corner with grammar textbooks and annotated worksheets.',
  },
  {
    id: 'course-6',
    title: 'Hospitality & Guest Relations English',
    track: 'Hotel English',
    access: 'paid',
    level: 'Level: A2 to B1',
    structure: '4 Modules • 20 Lessons • Situational Drills',
    tuition: '55,000 MMK',
    description:
      'Specialized language skills for hotel reception, guest reservations, concierge services, and dining hospitality etiquette.',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAYDDywewbtQFPvNbSxkrT0P_lmyq8pkOCQnGidGq84Bbs4DGpVDLrbR214400mGc84bfJnRBZIo9OqU4S50M4_Oop1_2Fhwf1ucHnplx1lnEKbMGohv5LbWCMD9Tx-zdObEdHiglTXekTgqtxoy1Rhfur74hORE5hktt-Ntyce3wAzeMyvnj1YC4qWsQ7RM7C2Z7cTVx8ZQA86ZEg1mH31aNPAABFqDH7sy6pcax8',
    imageAlt:
      'An elegant boutique hotel front reception desk in Yangon with warm brass counter bell and concierge directory.',
  },
];

const TRACKS_LIST = [
  'All',
  'Kids',
  'School',
  'General English',
  'Business English',
  'Daily Conversation',
  'Hotel English',
  'Interview English',
];

interface CourseCatalogPageProps {
  onNavigateScreen: (screenId: ScreenId) => void;
}

export const CourseCatalogPage: React.FC<CourseCatalogPageProps> = ({ onNavigateScreen }) => {
  const [currentTrack, setCurrentTrack] = useState<string>('All');
  const [currentAccess, setCurrentAccess] = useState<'all' | 'free' | 'paid'>('all');
  const [currentSearch, setCurrentSearch] = useState<string>('');
  const [qaState, setQaState] = useState<'populated' | 'skeleton' | 'empty' | 'filtered'>('populated');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleTriggerToast = (title: string, msg: string) => {
    setToastMessage(`${title} — ${msg}`);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  const handleTrackChange = (track: string) => {
    setCurrentTrack(track);
    if (qaState !== 'populated' && qaState !== 'filtered') {
      setQaState('populated');
    }
  };

  const handleAccessChange = (access: 'all' | 'free' | 'paid') => {
    setCurrentAccess(access);
    if (qaState !== 'populated' && qaState !== 'filtered') {
      setQaState('populated');
    }
  };

  const resetAllFilters = () => {
    setCurrentTrack('All');
    setCurrentAccess('all');
    setCurrentSearch('');
    setQaState('populated');
  };

  const handleQaStateChange = (state: 'populated' | 'skeleton' | 'empty' | 'filtered') => {
    setQaState(state);
    if (state === 'populated') {
      resetAllFilters();
    } else if (state === 'filtered') {
      setCurrentTrack('Business English');
      setCurrentAccess('paid');
      setCurrentSearch('');
    }
  };

  const filteredCourses = useMemo(() => {
    if (qaState === 'empty') return [];
    if (qaState === 'skeleton') return [];

    return COURSES_CATALOG.filter((course) => {
      const trackMatches = currentTrack === 'All' || course.track === currentTrack;
      const accessMatches = currentAccess === 'all' || course.access === currentAccess;
      const term = currentSearch.toLowerCase().trim();
      const searchMatches =
        !term ||
        course.title.toLowerCase().includes(term) ||
        course.description.toLowerCase().includes(term) ||
        course.track.toLowerCase().includes(term);

      return trackMatches && accessMatches && searchMatches;
    });
  }, [currentTrack, currentAccess, currentSearch, qaState]);

  return (
    <div className="flex flex-col w-full space-y-10">
      {/* Toast Notification for Free Course Instant Access */}
      {toastMessage && (
        <div className="fixed bottom-24 right-8 z-50 animate-bounce">
          <div className="p-4 rounded-xl bg-surface-container-lowest border border-outline-variant shadow-xl flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-on-secondary">
              <span className="material-symbols-outlined text-[18px]">lock_open</span>
            </div>
            <div>
              <p className="text-xs font-bold text-on-surface">{toastMessage}</p>
              <p className="text-[11px] text-on-surface-variant">
                Immediate instant access granted under Teacher Theint Academy rules.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Discovery Context Banner */}
      <section className="w-full bg-surface-container-low/60 py-space-xl px-margin rounded-2xl border border-outline-variant/40">
        <div className="max-w-7xl mx-auto flex flex-col gap-space-lg">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-md">
            <div className="max-w-3xl flex flex-col gap-space-2xs">
              <div className="inline-flex items-center gap-space-xs self-start px-space-xs py-space-2xs rounded-full bg-secondary-fixed text-on-secondary-fixed text-label-sm font-label-sm uppercase tracking-wider">
                <span
                  className="material-symbols-outlined text-[16px] text-primary"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  auto_stories
                </span>
                Academic Curriculum Standard
              </div>
              <h1 className="font-headline-display text-headline-display text-on-surface tracking-tight text-3xl sm:text-4xl lg:text-[44px]">
                Explore English Courses
              </h1>
              <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl text-[15px] sm:text-base">
                Discover structured academic tracks and level-based curricula designed by Teacher Theint
                English Academy. Master real-world communicative fluency with guided progressions.
              </p>
            </div>

            {/* QA State Switcher Demonstration Hub */}
            <div className="flex flex-col items-start md:items-end gap-space-2xs bg-surface-container-lowest p-space-xs rounded-xl shadow-sm border border-outline-variant/30">
              <span className="font-label-sm text-label-sm text-tertiary uppercase tracking-wider px-space-xs text-[11px]">
                Audit QA State Mock
              </span>
              <div className="inline-flex items-center bg-surface-container-high p-space-2xs rounded-lg gap-space-2xs">
                {(
                  [
                    { key: 'populated', label: 'Populated' },
                    { key: 'skeleton', label: 'Skeleton' },
                    { key: 'empty', label: 'Empty State' },
                    { key: 'filtered', label: 'Filtered QA' },
                  ] as const
                ).map(({ key, label }) => {
                  const isActive = qaState === key;
                  return (
                    <button
                      key={key}
                      type="button"
                      onClick={() => handleQaStateChange(key)}
                      className={`px-space-xs py-space-2xs rounded font-label-md text-label-md transition-all text-xs cursor-pointer ${
                        isActive
                          ? 'bg-surface-container-lowest text-primary shadow-sm font-semibold'
                          : 'text-on-surface-variant hover:text-on-surface'
                      }`}
                    >
                      {label}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Dual Search & Comprehensive Filter Engine */}
          <div className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm flex flex-col gap-space-md border border-outline-variant/30">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-sm items-center">
              {/* Keyword Search */}
              <div className="lg:col-span-6 relative">
                <span className="material-symbols-outlined absolute left-space-sm top-1/2 -translate-y-1/2 text-tertiary text-[20px]">
                  search
                </span>
                <input
                  type="text"
                  value={currentSearch}
                  onChange={(e) => {
                    setCurrentSearch(e.target.value);
                    if (qaState !== 'populated') setQaState('populated');
                  }}
                  placeholder="Search courses by topic, track or skill..."
                  className="w-full pl-11 pr-space-md py-space-xs rounded-lg bg-surface-container-low text-on-surface font-body-md text-body-md placeholder:text-outline focus:outline-none focus:bg-surface-container-lowest transition-colors border border-outline-variant/30"
                />
              </div>

              {/* Access Type Toggle */}
              <div className="lg:col-span-4 flex items-center gap-space-2xs bg-surface-container-low p-1 rounded-lg border border-outline-variant/30">
                {(
                  [
                    { key: 'all', label: 'All Access' },
                    { key: 'free', label: 'Free (Zero-Enroll)' },
                    { key: 'paid', label: 'Paid Tuition' },
                  ] as const
                ).map(({ key, label }) => {
                  const isActive = currentAccess === key;
                  return (
                    <button
                      key={key}
                      type="button"
                      onClick={() => handleAccessChange(key)}
                      className={`flex-1 py-space-2xs text-center rounded font-label-md text-label-md transition-all text-xs cursor-pointer ${
                        isActive
                          ? 'bg-surface-container-lowest text-primary shadow-sm font-semibold'
                          : 'text-on-surface-variant hover:text-on-surface'
                      }`}
                    >
                      {label}
                    </button>
                  );
                })}
              </div>

              {/* Reset Filter Button */}
              <div className="lg:col-span-2 flex justify-end">
                <button
                  type="button"
                  onClick={resetAllFilters}
                  className="w-full lg:w-auto inline-flex items-center justify-center gap-space-2xs px-space-sm py-space-xs rounded-lg bg-surface-container-high hover:bg-surface-variant text-on-surface-variant font-label-md text-label-md transition-colors text-xs cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[18px]">restart_alt</span>
                  Reset Filters
                </button>
              </div>
            </div>

            {/* Track Hierarchy Carousel/Tab Selector */}
            <div className="flex flex-col gap-space-2xs pt-1">
              <span className="font-label-sm text-label-sm text-tertiary uppercase tracking-wider text-[11px]">
                Approved Academic Tracks
              </span>
              <div className="flex items-center gap-space-xs overflow-x-auto pb-space-2xs no-scrollbar">
                {TRACKS_LIST.map((track) => {
                  const isSelected = currentTrack === track;
                  return (
                    <button
                      key={track}
                      type="button"
                      onClick={() => handleTrackChange(track)}
                      className={`px-space-sm py-space-2xs rounded-lg font-label-md text-label-md whitespace-nowrap transition-all text-xs cursor-pointer ${
                        isSelected
                          ? 'bg-primary text-on-primary font-semibold shadow-xs'
                          : 'bg-surface-container text-on-surface-variant hover:bg-surface-variant'
                      }`}
                    >
                      {track === 'All' ? 'All Tracks' : track}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Active Results & Filter Chips */}
      <section className="w-full">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-space-sm">
          <div className="flex items-center gap-space-xs">
            <span className="material-symbols-outlined text-primary text-[20px]">menu_book</span>
            <span className="font-headline-sm text-headline-sm text-on-surface font-semibold text-base sm:text-lg">
              Showing {filteredCourses.length} published courses
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-space-2xs text-xs">
            <span className="font-label-sm text-label-sm text-tertiary uppercase tracking-wider mr-space-2xs">
              Active:
            </span>
            <span className="inline-flex items-center gap-space-2xs px-space-xs py-space-2xs rounded-md bg-secondary-fixed text-on-secondary-fixed font-label-md text-label-md font-semibold">
              <span>Track: {currentTrack}</span>
            </span>
            <span className="inline-flex items-center gap-space-2xs px-space-xs py-space-2xs rounded-md bg-surface-container text-on-surface-variant font-label-md text-label-md">
              <span>
                Access:{' '}
                {currentAccess === 'all'
                  ? 'All'
                  : currentAccess === 'free'
                  ? 'Free (Immediate Access)'
                  : 'Paid Tuition'}
              </span>
            </span>
            <span className="inline-flex items-center gap-space-2xs px-space-xs py-space-2xs rounded-md bg-surface-container-high text-tertiary font-label-md text-label-md">
              <span
                className="material-symbols-outlined text-[14px] text-primary"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                check_circle
              </span>
              Status: Published
            </span>
          </div>
        </div>
      </section>

      {/* Course Grid Content Section */}
      <section className="w-full min-h-[460px]">
        <div className="max-w-7xl mx-auto">
          {/* Skeleton State */}
          {qaState === 'skeleton' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-space-lg">
              {[1, 2, 3].map((idx) => (
                <div
                  key={idx}
                  className="bg-surface-container-lowest rounded-xl p-space-md flex flex-col gap-space-md animate-pulse border border-outline-variant/30"
                >
                  <div className="h-44 bg-surface-container-high rounded-lg w-full"></div>
                  <div className="h-6 bg-surface-container-high rounded w-3/4"></div>
                  <div className="h-4 bg-surface-container-high rounded w-full"></div>
                  <div className="h-4 bg-surface-container-high rounded w-2/3"></div>
                  <div className="h-10 bg-surface-container-high rounded-lg w-full mt-auto"></div>
                </div>
              ))}
            </div>
          )}

          {/* Empty State */}
          {(qaState === 'empty' || (qaState === 'populated' && filteredCourses.length === 0)) && (
            <div className="flex flex-col items-center justify-center text-center p-space-3xl bg-surface-container-lowest rounded-2xl shadow-sm my-space-md border border-outline-variant/30">
              <div className="w-16 h-16 rounded-full bg-surface-container-high flex items-center justify-center text-primary mb-space-sm">
                <span className="material-symbols-outlined text-[32px]">manage_search</span>
              </div>
              <h3 className="font-headline-lg text-headline-lg text-on-surface mb-space-2xs text-2xl font-serif">
                No matching courses found
              </h3>
              <p className="font-body-md text-body-md text-on-surface-variant max-w-md mb-space-md text-sm">
                We could not find published courses matching your criteria. Try adjusting your track filter
                or search keyword.
              </p>
              <button
                type="button"
                onClick={resetAllFilters}
                className="inline-flex items-center gap-space-2xs px-space-md py-space-xs rounded-lg bg-primary text-on-primary font-label-lg text-label-lg hover:bg-primary-container transition-colors shadow-sm text-sm cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">refresh</span>
                Reset all filters
              </button>
            </div>
          )}

          {/* Populated Course Grid (3-column layout) */}
          {qaState !== 'skeleton' && filteredCourses.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-space-lg">
              {filteredCourses.map((course) => (
                <article
                  key={course.id}
                  className="course-card flex flex-col bg-surface-container-lowest rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden group border border-outline-variant/30"
                >
                  <div className="relative h-48 w-full overflow-hidden bg-surface-container">
                    <img
                      src={course.image}
                      alt={course.imageAlt}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-space-xs left-space-xs flex flex-wrap gap-space-2xs">
                      <span className="px-space-xs py-space-2xs rounded bg-surface-container-lowest/90 backdrop-blur text-primary font-label-sm text-label-sm uppercase tracking-wider font-bold text-[10px]">
                        {course.track}
                      </span>
                    </div>

                    {course.access === 'free' && (
                      <div className="absolute top-space-xs right-space-xs">
                        <span className="px-space-xs py-space-2xs rounded bg-secondary-fixed text-on-secondary-fixed font-label-sm text-label-sm font-bold uppercase tracking-wide flex items-center gap-1 shadow-sm text-[10px]">
                          <span className="material-symbols-outlined text-[14px]">lock_open</span> Free
                          Access
                        </span>
                      </div>
                    )}

                    <div className="absolute bottom-space-xs left-space-xs right-space-xs">
                      <span className="inline-flex items-center gap-space-2xs px-space-xs py-space-2xs rounded bg-inverse-surface/85 backdrop-blur text-inverse-on-surface font-label-sm text-label-sm font-medium text-[11px]">
                        <span className="material-symbols-outlined text-[14px] text-primary-fixed">
                          stairs
                        </span>
                        {course.level}
                      </span>
                    </div>
                  </div>

                  <div className="p-space-md flex flex-col flex-1 justify-between gap-space-md">
                    <div className="flex flex-col gap-space-xs">
                      <h2 className="font-headline-md text-headline-md text-on-surface group-hover:text-primary transition-colors text-xl font-serif">
                        {course.title}
                      </h2>
                      <p className="font-body-md text-body-md text-on-surface-variant line-clamp-3 text-xs leading-relaxed">
                        {course.description}
                      </p>
                    </div>

                    <div className="flex flex-col gap-space-sm pt-space-xs">
                      <div className="flex items-center gap-space-xs text-on-surface-variant font-label-md text-label-md bg-surface-container-low px-space-xs py-space-2xs rounded-lg text-xs">
                        <span className="material-symbols-outlined text-[16px] text-primary">
                          view_timeline
                        </span>
                        <span>{course.structure}</span>
                      </div>

                      <div className="flex items-center justify-between gap-space-sm pt-space-xs border-t border-outline-variant/30">
                        <div className="flex flex-col">
                          <span className="font-label-sm text-label-sm text-tertiary uppercase tracking-wide text-[10px]">
                            {course.access === 'free' ? 'Course Access' : 'One-time tuition'}
                          </span>
                          <span
                            className={`font-headline-sm text-headline-sm font-bold text-base ${
                              course.access === 'free' ? 'text-secondary' : 'text-primary'
                            }`}
                          >
                            {course.tuition}
                          </span>
                        </div>

                        {course.access === 'free' ? (
                          <button
                            type="button"
                            onClick={() => onNavigateScreen('PUB-03-COURSE-DETAIL')}
                            className="inline-flex items-center gap-space-2xs px-space-sm py-space-xs rounded-lg bg-secondary text-on-secondary font-label-lg text-label-lg hover:bg-secondary/90 transition-colors shadow-sm text-xs font-semibold cursor-pointer"
                          >
                            <span>Start Learning</span>
                            <span className="material-symbols-outlined text-[18px]">play_circle</span>
                          </button>
                        ) : (
                          <button
                            type="button"
                            onClick={() => onNavigateScreen('PUB-03-COURSE-DETAIL')}
                            className="inline-flex items-center gap-space-2xs px-space-sm py-space-xs rounded-lg bg-primary text-on-primary font-label-lg text-label-lg hover:bg-primary-container transition-colors shadow-sm text-xs font-semibold cursor-pointer"
                          >
                            <span>Explore Course</span>
                            <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Educational Path Guidance Matrix (Answering 'Which course should I choose?') */}
      <section className="w-full bg-surface-container-low/40 py-space-2xl px-margin rounded-2xl border border-outline-variant/30">
        <div className="max-w-7xl mx-auto flex flex-col gap-space-lg">
          <div className="flex flex-col gap-space-2xs">
            <span className="font-label-sm text-label-sm uppercase tracking-wider text-primary font-bold text-xs">
              Curricular Architecture
            </span>
            <h2 className="font-headline-xl text-headline-xl text-on-surface text-2xl sm:text-3xl font-serif">
              Which track and course should you choose?
            </h2>
            <p className="font-body-md text-body-md text-on-surface-variant max-w-3xl text-sm leading-relaxed">
              At Teacher Theint English Academy, all curricula follow a strict academic governance system:{' '}
              <span className="font-semibold text-on-surface">
                Track → Course → Level → Module → Lesson → Learning Item
              </span>
              .
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-space-md">
            {/* Guidance Item 1 */}
            <div className="p-space-md rounded-xl bg-surface-container-lowest shadow-sm flex flex-col gap-space-xs border border-outline-variant/30">
              <div className="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center text-primary">
                <span className="material-symbols-outlined text-[24px]">chat_bubble_outline</span>
              </div>
              <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold text-base">
                Immediate Speaking Confidence
              </h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant text-xs leading-relaxed">
                Choose our <span className="font-semibold text-primary">Daily Conversation</span> or{' '}
                <span className="font-semibold text-primary">General English</span> tracks. Start with free
                foundation modules to build spoken fluency without delay.
              </p>
            </div>

            {/* Guidance Item 2 */}
            <div className="p-space-md rounded-xl bg-surface-container-lowest shadow-sm flex flex-col gap-space-xs border border-outline-variant/30">
              <div className="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center text-primary">
                <span className="material-symbols-outlined text-[24px]">work_outline</span>
              </div>
              <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold text-base">
                Career Mobility &amp; Corporate Fluency
              </h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant text-xs leading-relaxed">
                Select <span className="font-semibold text-primary">Business English</span>,{' '}
                <span className="font-semibold text-primary">Hotel English</span>, or{' '}
                <span className="font-semibold text-primary">Interview English</span> for structured
                professional scenarios.
              </p>
            </div>

            {/* Guidance Item 3 */}
            <div className="p-space-md rounded-xl bg-surface-container-lowest shadow-sm flex flex-col gap-space-xs border border-outline-variant/30">
              <div className="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center text-primary">
                <span className="material-symbols-outlined text-[24px]">verified_user</span>
              </div>
              <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold text-base">
                Zero-Risk Free Courses
              </h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant text-xs leading-relaxed">
                Free courses do not require payment or student enrollment approval. Immediate instant
                access is provided upon clicking &apos;Start Learning&apos;.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Academic Governance Notice Sub-Panel */}
      <section className="w-full">
        <div className="max-w-7xl mx-auto rounded-xl bg-surface-container-high/60 p-space-md flex flex-col md:flex-row items-center justify-between gap-space-md border border-outline-variant/30">
          <div className="flex items-center gap-space-md">
            <div className="w-12 h-12 rounded-full bg-surface-container-lowest flex-shrink-0 flex items-center justify-center text-primary shadow-sm">
              <span className="material-symbols-outlined text-[26px]">gavel</span>
            </div>
            <div className="flex flex-col">
              <h4 className="font-headline-sm text-headline-sm text-on-surface font-semibold text-base">
                Institutional Quality Assurance Framework
              </h4>
              <p className="font-body-sm text-body-sm text-on-surface-variant max-w-2xl text-xs leading-relaxed">
                Course publications adhere strictly to verified academic standards. Content items are
                authored by faculty, reviewed through stage-gate quality checks, and structured logically
                inside validated pedagogical modules.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-space-xs flex-shrink-0">
            <span className="inline-flex items-center gap-space-2xs text-label-sm font-label-sm text-tertiary bg-surface-container-lowest px-space-sm py-space-2xs rounded-lg shadow-sm text-xs font-semibold">
              <span className="material-symbols-outlined text-[16px] text-primary">policy</span>
              Stage-Gate Verified
            </span>
          </div>
        </div>
      </section>

      {/* Academy Footer */}
      <footer className="w-full bg-surface-container-low shadow-[0_-1px_6px_rgba(0,0,0,0.02)] mt-space-3xl rounded-2xl p-space-lg border border-outline-variant/30">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-space-xl">
            <div className="lg:col-span-2 flex flex-col gap-space-sm">
              <div className="flex items-center gap-space-xs">
                <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-on-primary">
                  <span className="material-symbols-outlined text-[20px]">school</span>
                </div>
                <span className="font-headline-md text-headline-md text-primary font-bold text-lg font-serif">
                  Teacher Theint English Academy
                </span>
              </div>
              <p className="font-body-md text-body-md text-on-surface-variant max-w-sm text-xs leading-relaxed">
                An elevated academic sanctuary dedicated to communicative fluency, IELTS mastery, and
                professional English discourse for ambitious learners across Myanmar and worldwide.
              </p>
              <div className="font-label-sm text-label-sm text-on-surface-variant/80 pt-space-xs text-[11px]">
                Licensed Higher ESL Curriculum Standard • Yangon &amp; Remote
              </div>
            </div>

            <div className="flex flex-col gap-space-xs text-xs">
              <span className="font-label-md text-label-md uppercase tracking-wider text-primary font-bold mb-space-xs text-[11px]">
                Academic Tracks
              </span>
              <button
                type="button"
                onClick={() => handleTrackChange('General English')}
                className="text-left text-on-surface-variant hover:text-primary transition-colors cursor-pointer"
              >
                General Communicative English
              </button>
              <button
                type="button"
                onClick={() => handleTrackChange('Business English')}
                className="text-left text-on-surface-variant hover:text-primary transition-colors cursor-pointer"
              >
                Corporate &amp; Business Fluency
              </button>
              <button
                type="button"
                onClick={() => handleTrackChange('Daily Conversation')}
                className="text-left text-on-surface-variant hover:text-primary transition-colors cursor-pointer"
              >
                Daily Spoken Conversation
              </button>
              <button
                type="button"
                onClick={() => handleTrackChange('Interview English')}
                className="text-left text-on-surface-variant hover:text-primary transition-colors cursor-pointer"
              >
                Job Interview Confidence
              </button>
              <button
                type="button"
                onClick={() => handleTrackChange('School')}
                className="text-left text-on-surface-variant hover:text-primary transition-colors cursor-pointer"
              >
                Young Scholars &amp; School
              </button>
            </div>

            <div className="flex flex-col gap-space-xs text-xs">
              <span className="font-label-md text-label-md uppercase tracking-wider text-primary font-bold mb-space-xs text-[11px]">
                Academy &amp; Media
              </span>
              <button
                type="button"
                onClick={() => onNavigateScreen('PUB-05-ABOUT')}
                className="text-left text-on-surface-variant hover:text-primary transition-colors cursor-pointer"
              >
                Our Faculty &amp; Ethos
              </button>
              <button
                type="button"
                onClick={() => onNavigateScreen('PUB-04-BLOG')}
                className="text-left text-on-surface-variant hover:text-primary transition-colors cursor-pointer"
              >
                English Journal &amp; Grammar Blog
              </button>
              <button
                type="button"
                onClick={() => onNavigateScreen('PUB-03-COURSE-DETAIL')}
                className="text-left text-on-surface-variant hover:text-primary transition-colors cursor-pointer"
              >
                Placement Diagnostics &amp; Syllabus
              </button>
              <button
                type="button"
                onClick={() => onNavigateScreen('PUB-05-ABOUT')}
                className="text-left text-on-surface-variant hover:text-primary transition-colors cursor-pointer"
              >
                Accreditations &amp; Certificates
              </button>
            </div>

            <div className="flex flex-col gap-space-xs text-xs">
              <span className="font-label-md text-label-md uppercase tracking-wider text-primary font-bold mb-space-xs text-[11px]">
                Legal &amp; Notices
              </span>
              <span className="text-on-surface-variant">Institutional Notice</span>
              <span className="text-on-surface-variant">Academic Integrity Policy</span>
              <span className="text-on-surface-variant">Terms of Enrollment</span>
              <span className="text-on-surface-variant">Privacy Framework</span>
            </div>
          </div>

          <div className="mt-space-2xl pt-space-md flex flex-col md:flex-row items-center justify-between gap-space-sm border-t border-outline-variant/30 text-xs text-on-surface-variant">
            <p>© 2025 Teacher Theint English Academy. All academic rights reserved.</p>
            <div className="flex items-center gap-space-md">
              <span className="flex items-center gap-space-2xs">
                <span className="material-symbols-outlined text-[16px] text-primary">verified</span>
                Certified Teaching Standard
              </span>
              <span className="flex items-center gap-space-2xs">
                <span className="material-symbols-outlined text-[16px] text-primary">language</span>
                Yangon • Global Online Cohorts
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
