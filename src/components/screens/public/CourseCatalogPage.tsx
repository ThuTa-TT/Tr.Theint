import React, { useState, useMemo } from 'react';
import { ScreenId } from '../../../types/navigation';
import { TR_THEINT_LOGO_URL } from '../../navigation/BrandLogo';

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
    <div className="flex flex-col w-full space-y-10 font-['Nunito_Sans']">
      {/* Toast Notification for Free Course Instant Access */}
      {toastMessage && (
        <div className="fixed bottom-24 right-8 z-50 animate-bounce">
          <div className="p-4 rounded-2xl bg-white border border-[#fbeaec] shadow-[0_8px_30px_rgba(244,143,177,0.25)] flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#81d4fa] flex items-center justify-center text-[#22191b] shadow-xs">
              <span className="material-symbols-outlined text-[18px]">lock_open</span>
            </div>
            <div>
              <p className="text-xs font-bold text-[#22191b] font-['Quicksand']">{toastMessage}</p>
              <p className="text-[11px] text-[#534247]">
                Immediate instant access granted under Teacher Theint Academy rules.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Discovery Context Banner */}
      <section className="w-full bg-[#fff0f2] py-8 sm:py-10 px-6 sm:px-10 rounded-3xl border border-[#fbeaec] shadow-[0_4px_20px_rgba(244,143,177,0.08)]">
        <div className="max-w-7xl mx-auto flex flex-col gap-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="max-w-3xl flex flex-col gap-2">
              <div className="inline-flex items-center gap-2 self-start px-3.5 py-1 rounded-full bg-white text-[#964261] border border-[#f5e4e7] text-xs font-['Quicksand'] font-bold shadow-2xs">
                <span
                  className="material-symbols-outlined text-[16px] text-[#f48fb1]"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  auto_stories
                </span>
                Academic Curriculum Standard
              </div>
              <h1 className="font-['Quicksand'] font-bold text-[#22191b] tracking-tight text-3xl sm:text-4xl lg:text-[42px]">
                Explore English Courses
              </h1>
              <p className="text-[#534247] max-w-2xl text-[15px] sm:text-base leading-relaxed">
                Discover structured academic tracks and level-based curricula designed by Teacher Theint
                English Academy. Master real-world communicative fluency with guided progressions.
              </p>
            </div>

            {/* QA State Switcher Demonstration Hub */}
            <div className="flex flex-col items-start md:items-end gap-2 bg-white p-3 rounded-2xl shadow-sm border border-[#fbeaec]">
              <span className="font-['Quicksand'] font-bold text-[#964261] uppercase tracking-wider px-2 text-[11px]">
                Audit QA State Mock
              </span>
              <div className="inline-flex items-center bg-[#fff8f8] p-1 rounded-full gap-1 border border-[#f5e4e7]">
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
                      className={`px-3 py-1 rounded-full font-['Quicksand'] font-bold transition-all text-xs cursor-pointer ${
                        isActive
                          ? 'bg-[#f48fb1] text-white shadow-2xs'
                          : 'text-[#534247] hover:text-[#22191b]'
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
          <div className="bg-white p-5 sm:p-6 rounded-3xl shadow-[0_4px_16px_rgba(244,143,177,0.06)] flex flex-col gap-5 border border-[#fbeaec]">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
              {/* Keyword Search */}
              <div className="lg:col-span-6 relative">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[#f48fb1] text-[20px]">
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
                  className="w-full pl-11 pr-4 py-2.5 rounded-full bg-[#fff8f8] text-[#22191b] placeholder:text-[#534247]/60 focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#f48fb1]/40 transition-all border border-[#f5e4e7] text-sm"
                />
              </div>

              {/* Access Type Toggle */}
              <div className="lg:col-span-4 flex items-center gap-1 bg-[#fff0f2] p-1 rounded-full border border-[#fbeaec]">
                {(
                  [
                    { key: 'all', label: 'All Access' },
                    { key: 'free', label: 'Free (Instant)' },
                    { key: 'paid', label: 'Paid Tuition' },
                  ] as const
                ).map(({ key, label }) => {
                  const isActive = currentAccess === key;
                  return (
                    <button
                      key={key}
                      type="button"
                      onClick={() => handleAccessChange(key)}
                      className={`flex-1 py-1.5 text-center rounded-full font-['Quicksand'] font-bold transition-all text-xs cursor-pointer ${
                        isActive
                          ? 'bg-[#f48fb1] text-white shadow-2xs'
                          : 'text-[#534247] hover:text-[#22191b]'
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
                  className="w-full lg:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-full bg-[#fff8f8] hover:bg-[#fff0f2] text-[#534247] hover:text-[#964261] font-['Quicksand'] font-bold border border-[#f5e4e7] transition-colors text-xs cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[16px]">restart_alt</span>
                  Reset Filters
                </button>
              </div>
            </div>

            {/* Track Hierarchy Carousel/Tab Selector */}
            <div className="flex flex-col gap-2 pt-1 border-t border-[#fbeaec]">
              <span className="font-['Quicksand'] font-bold text-[#534247] uppercase tracking-wider text-[11px]">
                Approved Academic Tracks
              </span>
              <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
                {TRACKS_LIST.map((track) => {
                  const isSelected = currentTrack === track;
                  return (
                    <button
                      key={track}
                      type="button"
                      onClick={() => handleTrackChange(track)}
                      className={`px-4 py-1.5 rounded-full font-['Quicksand'] font-bold whitespace-nowrap transition-all text-xs cursor-pointer ${
                        isSelected
                          ? 'bg-[#f48fb1] text-white shadow-2xs'
                          : 'bg-[#fff8f8] text-[#534247] hover:bg-[#fff0f2] hover:text-[#22191b] border border-[#f5e4e7]'
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
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <span className="material-symbols-outlined text-[#f48fb1] text-[22px]">menu_book</span>
            <span className="font-['Quicksand'] font-bold text-[#22191b] text-base sm:text-lg">
              Showing {filteredCourses.length} published courses
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2 text-xs font-['Quicksand'] font-bold">
            <span className="text-[#534247] uppercase tracking-wider text-[11px] mr-1">
              Active:
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#81d4fa]/20 text-[#005d79] border border-[#81d4fa]/30">
              <span>Track: {currentTrack}</span>
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#fff0f2] text-[#964261] border border-[#f5e4e7]">
              <span>
                Access:{' '}
                {currentAccess === 'all'
                  ? 'All'
                  : currentAccess === 'free'
                  ? 'Free (Instant Access)'
                  : 'Paid Tuition'}
              </span>
            </span>
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#a5d6a7]/20 text-[#2e6830] border border-[#a5d6a7]/30">
              <span
                className="material-symbols-outlined text-[14px] text-[#2e6830]"
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {[1, 2, 3].map((idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-3xl p-6 flex flex-col gap-4 animate-pulse border border-[#fbeaec]"
                >
                  <div className="h-48 bg-[#fff0f2] rounded-2xl w-full"></div>
                  <div className="h-6 bg-[#fff0f2] rounded-md w-3/4"></div>
                  <div className="h-4 bg-[#fff0f2] rounded w-full"></div>
                  <div className="h-4 bg-[#fff0f2] rounded w-2/3"></div>
                  <div className="h-11 bg-[#fff0f2] rounded-full w-full mt-auto"></div>
                </div>
              ))}
            </div>
          )}

          {/* Empty State */}
          {(qaState === 'empty' || (qaState === 'populated' && filteredCourses.length === 0)) && (
            <div className="flex flex-col items-center justify-center text-center p-12 sm:p-16 bg-white rounded-3xl shadow-[0_4px_20px_rgba(244,143,177,0.08)] my-6 border border-[#fbeaec]">
              <div className="w-16 h-16 rounded-full bg-[#fff0f2] flex items-center justify-center text-[#f48fb1] mb-4">
                <span className="material-symbols-outlined text-[32px]">manage_search</span>
              </div>
              <h3 className="font-['Quicksand'] font-bold text-[#22191b] mb-2 text-2xl">
                No matching courses found
              </h3>
              <p className="text-[#534247] max-w-md mb-6 text-sm">
                We could not find published courses matching your criteria. Try adjusting your track filter
                or search keyword.
              </p>
              <button
                type="button"
                onClick={resetAllFilters}
                className="btn-tactile-primary px-6 py-2.5 rounded-full text-xs font-['Quicksand'] font-bold cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">refresh</span>
                <span>Reset all filters</span>
              </button>
            </div>
          )}

          {/* Populated Course Grid (3-column layout) */}
          {qaState !== 'skeleton' && filteredCourses.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {filteredCourses.map((course) => (
                <article
                  key={course.id}
                  className="course-card flex flex-col bg-white rounded-3xl shadow-[0_4px_20px_rgba(244,143,177,0.1)] hover:shadow-[0_12px_32px_rgba(244,143,177,0.2)] hover:-translate-y-1.5 transition-all duration-300 overflow-hidden group border border-[#fbeaec]"
                >
                  <div className="relative h-52 w-full overflow-hidden bg-[#fff0f2]">
                    <img
                      src={course.image}
                      alt={course.imageAlt}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                      <span className="px-3 py-1 rounded-full bg-white/95 backdrop-blur text-[#964261] font-['Quicksand'] font-bold uppercase tracking-wider text-[11px] shadow-xs border border-[#f5e4e7]">
                        {course.track}
                      </span>
                    </div>

                    {course.access === 'free' && (
                      <div className="absolute top-3 right-3">
                        <span className="px-3 py-1 rounded-full bg-[#81d4fa] text-[#22191b] font-['Quicksand'] font-bold uppercase tracking-wide flex items-center gap-1 shadow-xs text-[11px]">
                          <span className="material-symbols-outlined text-[14px]">lock_open</span> Free
                          Access
                        </span>
                      </div>
                    )}

                    <div className="absolute bottom-3 left-3 right-3">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#22191b]/85 backdrop-blur text-white font-['Quicksand'] font-bold text-[11px]">
                        <span className="material-symbols-outlined text-[14px] text-[#ffe082]">
                          stairs
                        </span>
                        {course.level}
                      </span>
                    </div>
                  </div>

                  <div className="p-6 flex flex-col flex-1 justify-between gap-5">
                    <div className="flex flex-col gap-2">
                      <h2 className="font-['Quicksand'] font-bold text-[#22191b] group-hover:text-[#f48fb1] transition-colors text-lg line-clamp-2 leading-snug">
                        {course.title}
                      </h2>
                      <p className="text-[#534247] line-clamp-3 text-xs leading-relaxed">
                        {course.description}
                      </p>
                    </div>

                    <div className="flex flex-col gap-4 pt-1">
                      <div className="flex items-center gap-2 text-[#534247] font-['Quicksand'] font-bold bg-[#fff8f8] px-3 py-2 rounded-2xl text-xs border border-[#f5e4e7]">
                        <span className="material-symbols-outlined text-[16px] text-[#f48fb1]">
                          view_timeline
                        </span>
                        <span>{course.structure}</span>
                      </div>

                      <div className="flex items-center justify-between gap-3 pt-3 border-t border-[#fbeaec]">
                        <div className="flex flex-col">
                          <span className="text-[#534247] uppercase font-['Quicksand'] font-bold tracking-wide text-[10px]">
                            {course.access === 'free' ? 'Course Access' : 'One-time tuition'}
                          </span>
                          <span
                            className={`font-['Quicksand'] font-bold text-base ${
                              course.access === 'free' ? 'text-[#006685]' : 'text-[#964261]'
                            }`}
                          >
                            {course.tuition}
                          </span>
                        </div>

                        {course.access === 'free' ? (
                          <button
                            type="button"
                            onClick={() => onNavigateScreen('PUB-03-COURSE-DETAIL')}
                            className="btn-tactile-secondary px-4 py-2 rounded-full font-['Quicksand'] font-bold text-xs inline-flex items-center gap-1.5 cursor-pointer"
                          >
                            <span>Start Learning</span>
                            <span className="material-symbols-outlined text-[16px]">play_circle</span>
                          </button>
                        ) : (
                          <button
                            type="button"
                            onClick={() => onNavigateScreen('PUB-03-COURSE-DETAIL')}
                            className="btn-tactile-primary px-4 py-2 rounded-full font-['Quicksand'] font-bold text-xs inline-flex items-center gap-1.5 cursor-pointer"
                          >
                            <span>Explore Course</span>
                            <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
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
      <section className="w-full bg-[#fff0f2]/60 py-10 px-6 sm:px-10 rounded-3xl border border-[#fbeaec]">
        <div className="max-w-7xl mx-auto flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <span className="font-['Quicksand'] font-bold uppercase tracking-wider text-[#964261] text-xs">
              Curricular Architecture
            </span>
            <h2 className="font-['Quicksand'] font-bold text-[#22191b] text-2xl sm:text-3xl">
              Which track and course should you choose?
            </h2>
            <p className="text-[#534247] max-w-3xl text-sm leading-relaxed">
              At Teacher Theint English Academy, all curricula follow a strict academic governance system:{' '}
              <span className="font-bold text-[#22191b]">
                Track → Course → Level → Module → Lesson → Learning Item
              </span>
              .
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* Guidance Item 1 */}
            <div className="p-6 rounded-3xl bg-white shadow-[0_4px_16px_rgba(244,143,177,0.06)] flex flex-col gap-3 border border-[#fbeaec]">
              <div className="w-11 h-11 rounded-2xl bg-[#81d4fa]/20 flex items-center justify-center text-[#006685]">
                <span className="material-symbols-outlined text-[24px]">chat_bubble_outline</span>
              </div>
              <h3 className="font-['Quicksand'] font-bold text-[#22191b] text-base">
                Immediate Speaking Confidence
              </h3>
              <p className="text-[#534247] text-xs leading-relaxed">
                Choose our <span className="font-bold text-[#964261]">Daily Conversation</span> or{' '}
                <span className="font-bold text-[#964261]">General English</span> tracks. Start with free
                foundation modules to build spoken fluency without delay.
              </p>
            </div>

            {/* Guidance Item 2 */}
            <div className="p-6 rounded-3xl bg-white shadow-[0_4px_16px_rgba(244,143,177,0.06)] flex flex-col gap-3 border border-[#fbeaec]">
              <div className="w-11 h-11 rounded-2xl bg-[#ffe082]/30 flex items-center justify-center text-[#725c06]">
                <span className="material-symbols-outlined text-[24px]">work_outline</span>
              </div>
              <h3 className="font-['Quicksand'] font-bold text-[#22191b] text-base">
                Career Mobility &amp; Corporate Fluency
              </h3>
              <p className="text-[#534247] text-xs leading-relaxed">
                Select <span className="font-bold text-[#964261]">Business English</span>,{' '}
                <span className="font-bold text-[#964261]">Hotel English</span>, or{' '}
                <span className="font-bold text-[#964261]">Interview English</span> for structured
                professional scenarios.
              </p>
            </div>

            {/* Guidance Item 3 */}
            <div className="p-6 rounded-3xl bg-white shadow-[0_4px_16px_rgba(244,143,177,0.06)] flex flex-col gap-3 border border-[#fbeaec]">
              <div className="w-11 h-11 rounded-2xl bg-[#a5d6a7]/20 flex items-center justify-center text-[#2e6830]">
                <span className="material-symbols-outlined text-[24px]">verified_user</span>
              </div>
              <h3 className="font-['Quicksand'] font-bold text-[#22191b] text-base">
                Zero-Risk Free Courses
              </h3>
              <p className="text-[#534247] text-xs leading-relaxed">
                Free courses do not require payment or student enrollment approval. Immediate instant
                access is provided upon clicking &apos;Start Learning&apos;.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Academic Governance Notice Sub-Panel */}
      <section className="w-full">
        <div className="max-w-7xl mx-auto rounded-3xl bg-white p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 border border-[#fbeaec] shadow-[0_4px_16px_rgba(244,143,177,0.08)]">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#fff0f2] flex-shrink-0 flex items-center justify-center text-[#f48fb1]">
              <span className="material-symbols-outlined text-[26px]">gavel</span>
            </div>
            <div className="flex flex-col">
              <h4 className="font-['Quicksand'] font-bold text-[#22191b] text-base">
                Institutional Quality Assurance Framework
              </h4>
              <p className="text-[#534247] max-w-2xl text-xs leading-relaxed">
                Course publications adhere strictly to verified academic standards. Content items are
                authored by faculty, reviewed through stage-gate quality checks, and structured logically
                inside validated pedagogical modules.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-shrink-0">
            <span className="inline-flex items-center gap-1.5 font-['Quicksand'] font-bold text-[#725c06] bg-[#ffe082]/20 border border-[#ffe082]/40 px-3.5 py-1.5 rounded-full text-xs shadow-2xs">
              <span className="material-symbols-outlined text-[16px] text-[#725c06]">policy</span>
              Stage-Gate Verified
            </span>
          </div>
        </div>
      </section>

      {/* Academy Footer */}
      <footer className="w-full bg-[#fff0f2] mt-6 rounded-3xl p-8 sm:p-12 border border-[#fbeaec] shadow-[0_4px_20px_rgba(244,143,177,0.06)]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            <div className="lg:col-span-2 flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <img
                  src={TR_THEINT_LOGO_URL}
                  alt="Teacher Theint English"
                  referrerPolicy="no-referrer"
                  className="w-10 h-10 rounded-full object-cover border-2 border-[#f48fb1] bg-white shadow-xs"
                />
                <span className="font-['Quicksand'] font-bold text-[#22191b] text-lg">
                  Teacher Theint English Academy
                </span>
              </div>
              <p className="text-[#534247] max-w-sm text-xs leading-relaxed">
                An elevated academic sanctuary dedicated to communicative fluency, IELTS mastery, and
                professional English discourse for ambitious learners across Myanmar and worldwide.
              </p>
              <div className="text-[#534247]/80 text-[11px] font-medium">
                Licensed Higher ESL Curriculum Standard • Yangon &amp; Remote
              </div>
            </div>

            <div className="flex flex-col gap-2 text-xs">
              <span className="font-['Quicksand'] font-bold uppercase tracking-wider text-[#964261] mb-1 text-[11px]">
                Academic Tracks
              </span>
              <button
                type="button"
                onClick={() => handleTrackChange('General English')}
                className="text-left text-[#534247] hover:text-[#f48fb1] transition-colors cursor-pointer"
              >
                General Communicative English
              </button>
              <button
                type="button"
                onClick={() => handleTrackChange('Business English')}
                className="text-left text-[#534247] hover:text-[#f48fb1] transition-colors cursor-pointer"
              >
                Corporate &amp; Business Fluency
              </button>
              <button
                type="button"
                onClick={() => handleTrackChange('Daily Conversation')}
                className="text-left text-[#534247] hover:text-[#f48fb1] transition-colors cursor-pointer"
              >
                Daily Spoken Conversation
              </button>
              <button
                type="button"
                onClick={() => handleTrackChange('Interview English')}
                className="text-left text-[#534247] hover:text-[#f48fb1] transition-colors cursor-pointer"
              >
                Job Interview Confidence
              </button>
              <button
                type="button"
                onClick={() => handleTrackChange('School')}
                className="text-left text-[#534247] hover:text-[#f48fb1] transition-colors cursor-pointer"
              >
                Young Scholars &amp; School
              </button>
            </div>

            <div className="flex flex-col gap-2 text-xs">
              <span className="font-['Quicksand'] font-bold uppercase tracking-wider text-[#964261] mb-1 text-[11px]">
                Academy &amp; Media
              </span>
              <button
                type="button"
                onClick={() => onNavigateScreen('PUB-05-ABOUT')}
                className="text-left text-[#534247] hover:text-[#f48fb1] transition-colors cursor-pointer"
              >
                Our Faculty &amp; Ethos
              </button>
              <button
                type="button"
                onClick={() => onNavigateScreen('PUB-04-BLOG')}
                className="text-left text-[#534247] hover:text-[#f48fb1] transition-colors cursor-pointer"
              >
                English Journal &amp; Grammar Blog
              </button>
              <button
                type="button"
                onClick={() => onNavigateScreen('PUB-03-COURSE-DETAIL')}
                className="text-left text-[#534247] hover:text-[#f48fb1] transition-colors cursor-pointer"
              >
                Placement Diagnostics &amp; Syllabus
              </button>
              <button
                type="button"
                onClick={() => onNavigateScreen('PUB-05-ABOUT')}
                className="text-left text-[#534247] hover:text-[#f48fb1] transition-colors cursor-pointer"
              >
                Accreditations &amp; Certificates
              </button>
            </div>

            <div className="flex flex-col gap-2 text-xs">
              <span className="font-['Quicksand'] font-bold uppercase tracking-wider text-[#964261] mb-1 text-[11px]">
                Legal &amp; Notices
              </span>
              <span className="text-[#534247]">Institutional Notice</span>
              <span className="text-[#534247]">Academic Integrity Policy</span>
              <span className="text-[#534247]">Terms of Enrollment</span>
              <span className="text-[#534247]">Privacy Framework</span>
            </div>
          </div>

          <div className="mt-8 pt-6 flex flex-col md:flex-row items-center justify-between gap-4 border-t border-[#fbeaec] text-xs text-[#534247]">
            <p>© 2025 Teacher Theint English Academy. All academic rights reserved.</p>
            <div className="flex items-center gap-4 font-['Quicksand'] font-bold">
              <span className="flex items-center gap-1.5 text-[#964261]">
                <span className="material-symbols-outlined text-[16px] text-[#f48fb1]">verified</span>
                Certified Teaching Standard
              </span>
              <span className="flex items-center gap-1.5 text-[#534247]">
                <span className="material-symbols-outlined text-[16px] text-[#81d4fa]">language</span>
                Yangon • Global Online Cohorts
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
