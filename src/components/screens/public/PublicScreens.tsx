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
    'PUB-02-COURSES': 'Courses',
    'PUB-03-COURSE-DETAIL': 'Courses',
    'STU-COURSE-03-STRUCTURE': 'Courses',
    'STU-FREE-01': 'Courses',
    'STU-LEARN-01': 'Courses',
    'STU-LESSON-01': 'Courses',
    'STU-EX-01': 'Courses',
    'STU-PLACE-02': 'Courses',
    'STU-EX-02': 'Courses',
    'STU-EX-03': 'Courses',
    'PUB-04-BLOG': 'Blog',
    'PUB-05-ABOUT': 'About',
  };

  const activeNav = activeNavMap[screenId] || 'Courses';

  const filteredCourses =
    selectedTarget === 'All Targets'
      ? COURSES_DATA
      : COURSES_DATA.filter((c) => c.target === selectedTarget);

  return (
    <div className="min-h-screen flex flex-col bg-[#FCFAF9] text-[#2D2529]">
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
          <div className="space-y-8">
            <div className="rounded-xl bg-white border border-[#E9DDE1] p-8 shadow-sm">
              <span className="text-xs font-bold text-[#B75E78] uppercase tracking-wider">
                Educational Articles
              </span>
              <h1 className="font-serif text-3xl text-[#2D2529] mt-1">
                Learning Guides &amp; Insights
              </h1>
              <p className="text-sm text-[#766A70] mt-2">
                Practical language articles, grammar tips, and study strategies prepared by our
                instructional team.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {BLOG_ARTICLES.map((article) => (
                <article
                  key={article.id}
                  className="p-6 rounded-xl bg-white border border-[#E9DDE1] shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-0.5 rounded-full bg-[#F7F1F3] text-[#B75E78] text-[11px] font-semibold">
                        {article.category}
                      </span>
                      <span className="text-[10px] text-[#766A70]">[Sample Article]</span>
                    </div>
                    <h2 className="font-bold text-base text-[#2D2529]">{article.title}</h2>
                    <p className="text-xs text-[#766A70] leading-relaxed">{article.excerpt}</p>
                  </div>
                  <div className="pt-6 mt-6 border-t border-[#E9DDE1] flex items-center justify-between text-xs text-[#766A70]">
                    <span>Editorial Team • {article.readTime}</span>
                    <span className="text-[#B75E78] font-bold">Read Guide →</span>
                  </div>
                </article>
              ))}
            </div>
          </div>
        )}

        {screenId === 'PUB-05-ABOUT' && (
          <section className="rounded-xl bg-white border border-[#E9DDE1] p-8 lg:p-12 shadow-sm">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              <div className="lg:col-span-5 space-y-4">
                <div className="p-6 rounded-xl bg-[#F7F1F3] border border-[#E9DDE1] space-y-4 text-center">
                  <div className="w-20 h-20 mx-auto rounded-full bg-[#F3DDE3] border border-[#E9DDE1] flex items-center justify-center font-bold text-xl text-[#B75E78] shadow-sm">
                    TE
                  </div>
                  <div>
                    <h2 className="font-bold text-base text-[#2D2529]">Teacher Theint English</h2>
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
                  <h1 className="font-serif text-2xl lg:text-3xl text-[#2D2529]">
                    Clear, Structured English Learning for Practical Fluency.
                  </h1>
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
