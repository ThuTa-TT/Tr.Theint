import React, { useState } from 'react';
import { LanguageCode, PublicNavItem, ScreenId } from '../../../types/navigation';
import { PublicNavbar } from '../../navigation/PublicNavbar';
import { HomePagePhase3 } from './HomePagePhase3';
import { CourseCatalogPage } from './CourseCatalogPage';
import { CourseDetailPage } from './CourseDetailPage';
import { CourseStructurePreview } from './CourseStructurePreview';
import { FreeDirectEntryScreen } from '../student/FreeDirectEntryScreen';
import { LearningDashboardScreen } from '../student/LearningDashboardScreen';
import { LessonPlayerScreen } from '../student/LessonPlayerScreen';
import { AutoGradedExerciseScreen } from '../student/AutoGradedExerciseScreen';
import { ExerciseResultScreen } from '../student/ExerciseResultScreen';
import { ExerciseRetryScreen } from '../student/ExerciseRetryScreen';
import { TR_THEINT_LOGO_URL } from '../../navigation/BrandLogo';

interface PublicScreenProps {
  screenId: ScreenId;
  language: LanguageCode;
  onLanguageChange: (lang: LanguageCode) => void;
  onNavigateScreen: (screenId: ScreenId) => void;
  showSpecGuides?: boolean;
}

const COURSES_DATA = [
  {
    id: 'foundation-phonics',
    title: 'Foundation English Phonics & Core Vocabulary',
    target: 'General English',
    level: 'Level 1: Starter (Inside Course)',
    structure: '4 Modules • 12 Lessons',
    type: 'FREE',
    summary:
      'Introduction to standard English pronunciation symbols, common word patterns, and foundational sentence construction.',
  },
  {
    id: 'workplace-correspondence',
    title: 'Workplace Correspondence & Meeting Skills',
    target: 'Business English',
    level: 'Level 2: Intermediate (Inside Course)',
    structure: '6 Modules • 20 Lessons',
    type: 'PAID COURSE',
    summary:
      'Practical instruction on drafting concise emails, phrasing requests professionally, and participating in meetings with clarity.',
  },
  {
    id: 'interview-practice',
    title: 'Structured Interview Practice & Questions',
    target: 'Interview English',
    level: 'Level 2: Intermediate (Inside Course)',
    structure: '5 Modules • 15 Lessons',
    type: 'PAID COURSE',
    summary:
      'Step-by-step guidance on structuring self-introductions, answering standard interview inquiries, and verbal confidence.',
  },
  {
    id: 'kids-phonics',
    title: 'Young Learners Phonics & Speaking Confidence',
    target: 'Kids',
    level: 'Level 1: Starter (Inside Course)',
    structure: '4 Modules • 16 Lessons',
    type: 'PAID COURSE',
    summary:
      'Foundational phonics, positive speaking confidence, and age-calibrated reading drills for young learners.',
  },
  {
    id: 'school-grammar',
    title: 'Academic Grammar Mastery & Reading Comprehension',
    target: 'School English',
    level: 'Level 2: Intermediate (Inside Course)',
    structure: '6 Modules • 18 Lessons',
    type: 'PAID COURSE',
    summary:
      'Academic grammar mastery, reading comprehension, exam preparation, and formal writing structure for school students.',
  },
  {
    id: 'hotel-hospitality',
    title: 'Hospitality Front Desk & Guest Service English',
    target: 'Hotel English',
    level: 'Level 2: Intermediate (Inside Course)',
    structure: '5 Modules • 14 Lessons',
    type: 'PAID COURSE',
    summary:
      'Guest check-in dialogue, courteous service vocabulary, polite problem-solving, and telephone manners.',
  },
];

const BLOG_ARTICLES = [
  {
    id: 'b1',
    category: 'Grammar Guide',
    readTime: '5 min read',
    title: 'Common Preposition Usages in Spoken English',
    excerpt:
      'An overview of frequent preposition pairings (such as at, in, on, and to) and practical mental frameworks to choose correctly in conversation.',
  },
  {
    id: 'b2',
    category: 'Speaking Strategies',
    readTime: '6 min read',
    title: 'Structuring Concise Spoken Answers in Professional Settings',
    excerpt:
      'Techniques to organize spoken answers clearly, preventing rambling while keeping responses balanced and professional.',
  },
  {
    id: 'b3',
    category: 'Business English',
    readTime: '5 min read',
    title: 'Drafting Clear Workplace Emails & Clarifying Timelines',
    excerpt:
      'Step-by-step frameworks for professional written inquiries, polite follow-ups, and clear action items.',
  },
  {
    id: 'b4',
    category: 'Pronunciation',
    readTime: '4 min read',
    title: 'Foundation Vowel Clarity & Articulation Drills',
    excerpt:
      'Explore short and long vowel sound contrasts with guided model audio practices for natural spoken clarity.',
  },
];

export const PublicScreens: React.FC<PublicScreenProps> = ({
  screenId,
  language,
  onLanguageChange,
  onNavigateScreen,
  showSpecGuides = false,
}) => {
  const [selectedTarget, setSelectedTarget] = useState<string>('All Targets');

  // Render exact attached HTML Phase 3 Public Experience for Home Page
  if (screenId === 'PUB-01-HOME') {
    return (
      <HomePagePhase3
        language={language}
        onLanguageChange={onLanguageChange}
        onNavigateScreen={onNavigateScreen}
        showSpecGuides={showSpecGuides}
      />
    );
  }

  const activeNavMap: Record<string, PublicNavItem> = {
    'PUB-02-COURSES': 'Course',
    'PUB-03-COURSE-DETAIL': 'Course',
    'STU-COURSE-03-STRUCTURE': 'Course',
    'STU-FREE-01': 'Course',
    'STU-LEARN-01': 'Course',
    'STU-LESSON-01': 'Course',
    'STU-EX-01': 'Course',
    'STU-PLACE-02': 'Course',
    'STU-EX-02': 'Course',
    'STU-EX-03': 'Course',
    'PUB-04-BLOG': 'Blog',
    'PUB-05-ABOUT': 'About',
  };

  const activeNav = activeNavMap[screenId] || 'Course';

  const filteredCourses =
    selectedTarget === 'All Targets'
      ? COURSES_DATA
      : COURSES_DATA.filter((c) => c.target === selectedTarget);

  return (
    <div className="min-h-screen flex flex-col bg-[#fff8f8] text-[#22191b] font-['Nunito_Sans']">
      <main className="max-w-[1440px] w-full mx-auto px-6 lg:px-12 py-8 space-y-12 flex-1 pb-24">
        {/* Canonical Home Page Navbar Reference (Matching Section 1 of Attached Home Page) */}
        <PublicNavbar
          variant="card"
          activeNav={activeNav}
          language={language}
          onLanguageChange={onLanguageChange}
          onNavigateScreen={onNavigateScreen}
          showSpecGuides={showSpecGuides}
        />

        {screenId === 'PUB-02-COURSES' && (
          <CourseCatalogPage onNavigateScreen={onNavigateScreen} />
        )}

        {screenId === 'PUB-03-COURSE-DETAIL' && (
          <CourseDetailPage onNavigateScreen={onNavigateScreen} />
        )}

        {screenId === 'STU-COURSE-03-STRUCTURE' && (
          <CourseStructurePreview
            onBackToCourseDetail={() => onNavigateScreen('PUB-03-COURSE-DETAIL')}
            onNavigateScreen={onNavigateScreen}
          />
        )}

        {screenId === 'STU-FREE-01' && (
          <FreeDirectEntryScreen onNavigateScreen={onNavigateScreen} />
        )}

        {screenId === 'STU-LEARN-01' && (
          <LearningDashboardScreen onNavigateScreen={onNavigateScreen} />
        )}

        {screenId === 'STU-LESSON-01' && (
          <LessonPlayerScreen onNavigateScreen={onNavigateScreen} />
        )}

        {(screenId === 'STU-EX-01' || screenId === 'STU-PLACE-02') && (
          <AutoGradedExerciseScreen onNavigateScreen={onNavigateScreen} />
        )}

        {screenId === 'STU-EX-02' && (
          <ExerciseResultScreen onNavigateScreen={onNavigateScreen} />
        )}

        {screenId === 'STU-EX-03' && (
          <ExerciseRetryScreen onNavigateScreen={onNavigateScreen} />
        )}

        {screenId === 'PUB-04-BLOG' && (
          <div className="space-y-8 animate-fade-in">
            <div className="rounded-3xl bg-white border border-[#fbeaec] p-8 shadow-[0_4px_16px_rgba(244,143,177,0.12)]">
              <span className="text-xs font-['Quicksand'] font-bold text-[#f48fb1] uppercase tracking-wider">
                Educational Articles
              </span>
              <h1 className="font-['Quicksand'] font-bold text-3xl text-[#22191b] mt-1">
                Learning Guides &amp; Insights
              </h1>
              <p className="text-sm text-[#534247] mt-2">
                Practical language articles, grammar tips, and study strategies prepared by our
                instructional team.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {BLOG_ARTICLES.map((article) => (
                <article
                  key={article.id}
                  className="p-6 rounded-3xl bg-white border border-[#fbeaec] shadow-[0_4px_16px_rgba(244,143,177,0.10)] hover:shadow-[0_8px_24px_rgba(244,143,177,0.18)] transition-all flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="px-3 py-1 rounded-full bg-[#fff0f2] text-[#964261] border border-[#f5e4e7] text-[11px] font-['Quicksand'] font-bold">
                        {article.category}
                      </span>
                      <span className="text-[10px] text-[#534247] font-medium">[Sample Article]</span>
                    </div>
                    <h2 className="font-['Quicksand'] font-bold text-base text-[#22191b]">{article.title}</h2>
                    <p className="text-xs text-[#534247] leading-relaxed">{article.excerpt}</p>
                  </div>
                  <div className="pt-6 mt-6 border-t border-[#f5e4e7] flex items-center justify-between text-xs text-[#534247]">
                    <span>Editorial Team • {article.readTime}</span>
                    <span className="text-[#f48fb1] font-['Quicksand'] font-bold hover:text-[#d87395] cursor-pointer inline-flex items-center gap-1">
                      <span>Read Guide</span>
                      <span className="material-symbols-outlined text-[15px]">arrow_forward</span>
                    </span>
                  </div>
                </article>
              ))}
            </div>
          </div>
        )}

        {screenId === 'PUB-05-ABOUT' && (
          <section className="rounded-3xl bg-white border border-[#fbeaec] p-8 lg:p-12 shadow-[0_4px_16px_rgba(244,143,177,0.12)] animate-fade-in">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              <div className="lg:col-span-5 space-y-4">
                <div className="p-6 rounded-3xl bg-[#fff8f8] border border-[#fbeaec] space-y-4 text-center shadow-2xs">
                  <img
                    src={TR_THEINT_LOGO_URL}
                    alt="Teacher Theint English"
                    referrerPolicy="no-referrer"
                    className="w-24 h-24 mx-auto rounded-full object-cover border-4 border-[#f48fb1] shadow-md bg-white"
                  />
                  <div>
                    <h2 className="font-['Quicksand'] font-bold text-lg text-[#22191b]">Teacher Theint English</h2>
                    <p className="text-xs text-[#534247] font-medium">
                      English Teaching &amp; Learning Platform
                    </p>
                  </div>
                  <div className="p-4 rounded-2xl bg-white border border-[#fbeaec] text-left space-y-2.5 text-xs font-['Quicksand'] font-bold">
                    <div className="flex items-center gap-2 text-[#22191b]">
                      <span className="material-symbols-outlined text-[#f48fb1] text-[18px]">
                        menu_book
                      </span>
                      <span>Structured Academic Curriculum</span>
                    </div>
                    <div className="flex items-center gap-2 text-[#22191b]">
                      <span className="material-symbols-outlined text-[#81d4fa] text-[18px]">
                        category
                      </span>
                      <span>7 Approved Target Pathways</span>
                    </div>
                    <div className="flex items-center gap-2 text-[#22191b]">
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
                  <span className="text-xs font-['Quicksand'] font-bold text-[#f48fb1] uppercase tracking-wider">
                    Platform Overview
                  </span>
                  <h1 className="font-['Quicksand'] font-bold text-2xl lg:text-3xl text-[#22191b]">
                    Clear, Structured English Learning for Practical Fluency.
                  </h1>
                </div>
                <p className="text-sm text-[#534247] leading-relaxed">
                  Teacher Theint English is an educational platform dedicated to delivering
                  structured English language courses. The curriculum focuses on building clear
                  grammar comprehension, natural pronunciation, and confident spoken communication
                  across seven tailored pathways: Kids, School English, General English, Business
                  English, Daily Conversation, Hotel English, and Interview English.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="p-5 rounded-2xl bg-[#fff8f8] border border-[#fbeaec] shadow-2xs space-y-1">
                    <p className="text-xs font-['Quicksand'] font-bold text-[#22191b]">One-on-One Feedback</p>
                    <p className="text-xs text-[#534247] leading-relaxed">
                      Assignments and speaking practice receive structured evaluation from
                      instructors to guide individual progress.
                    </p>
                  </div>
                  <div className="p-5 rounded-2xl bg-[#fff8f8] border border-[#fbeaec] shadow-2xs space-y-1">
                    <p className="text-xs font-['Quicksand'] font-bold text-[#22191b]">Contextual Lessons</p>
                    <p className="text-xs text-[#534247] leading-relaxed">
                      Concepts are taught through relevant situations and applied drills rather than
                      abstract lists.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}
      </main>
    </div>
  );
};
