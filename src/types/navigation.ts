export type ScreenCategory = 'PUBLIC' | 'AUTH' | 'STUDENT' | 'TEACHER' | 'ADMIN';

export type PublicNavItem = 'Home' | 'Course' | 'Courses' | 'Blog' | 'About';

export type AuthScreenType = 'Login' | 'Register' | 'Email Verification';

export type StudentNavItem =
  | 'Home'
  | 'Courses'
  | 'My Courses'
  | 'Assessments'
  | 'Progress'
  | 'One-on-One'
  | 'Calendar'
  | 'Notifications'
  | 'Profile';

export type TeacherNavItem =
  | 'Dashboard'
  | 'Calendar'
  | 'My Students'
  | 'My Courses'
  | 'Content'
  | 'Assessments / Grading'
  | 'One-on-One'
  | 'Notifications'
  | 'Profile';

export type AdminNavItem =
  | 'Dashboard'
  | 'Users'
  | 'Academic'
  | 'Courses'
  | 'Learning'
  | 'Assessments'
  | 'Payments'
  | 'Enrollments'
  | 'One-on-One'
  | 'Calendar'
  | 'Content Approval'
  | 'Communication'
  | 'Notifications'
  | 'Blog'
  | 'Homepage'
  | 'Reports'
  | 'Audit'
  | 'Roles & Permissions'
  | 'Settings';

export type ScreenId =
  | 'PUB-01-HOME'
  | 'PUB-02-COURSES'
  | 'PUB-03-COURSE-DETAIL'
  | 'STU-COURSE-03-STRUCTURE'
  | 'STU-FREE-01'
  | 'STU-LEARN-01'
  | 'STU-LESSON-01'
  | 'STU-EX-01'
  | 'STU-PLACE-02'
  | 'STU-EX-02'
  | 'STU-EX-03'
  | 'PUB-04-BLOG'
  | 'PUB-05-ABOUT'
  | 'AUTH-01-LOGIN'
  | 'AUTH-02-REGISTER'
  | 'AUTH-03-VERIFY-EMAIL'
  | 'STU-01-PORTAL'
  | 'TEA-01-PORTAL'
  | 'ADM-01-PORTAL';

export type LanguageCode = 'EN' | 'MM';

export interface ScreenAuditInfo {
  id: ScreenId;
  code: string;
  title: string;
  subtitle: string;
  category: ScreenCategory;
  isReference?: boolean;
  activeNavLabel: string;
  previousViolation: string;
  appliedCorrection: string;
}

export const CANONICAL_PUBLIC_NAV: PublicNavItem[] = [
  'Home',
  'Course',
  'Blog',
  'About',
];

export const CANONICAL_STUDENT_NAV: { label: StudentNavItem; icon: string; badge?: string }[] = [
  { label: 'Home', icon: 'home' },
  { label: 'Courses', icon: 'menu_book' },
  { label: 'My Courses', icon: 'school' },
  { label: 'Assessments', icon: 'quiz', badge: '1 Due' },
  { label: 'Progress', icon: 'monitoring' },
  { label: 'One-on-One', icon: 'video_camera_front' },
  { label: 'Calendar', icon: 'calendar_month' },
  { label: 'Notifications', icon: 'notifications', badge: '3' },
  { label: 'Profile', icon: 'person' },
];

export const CANONICAL_TEACHER_NAV: { label: TeacherNavItem; icon: string; badge?: string }[] = [
  { label: 'Dashboard', icon: 'space_dashboard' },
  { label: 'Calendar', icon: 'calendar_month' },
  { label: 'My Students', icon: 'groups' },
  { label: 'My Courses', icon: 'auto_stories' },
  { label: 'Content', icon: 'folder_Managed' },
  { label: 'Assessments / Grading', icon: 'fact_check', badge: '14' },
  { label: 'One-on-One', icon: 'duo', badge: '2 Today' },
  { label: 'Notifications', icon: 'notifications', badge: '5' },
  { label: 'Profile', icon: 'account_circle' },
];

export const CANONICAL_ADMIN_NAV: { label: AdminNavItem; icon: string; group: string; badge?: string }[] = [
  { label: 'Dashboard', icon: 'dashboard', group: 'Overview' },
  { label: 'Users', icon: 'manage_accounts', group: 'Core Management' },
  { label: 'Academic', icon: 'account_balance', group: 'Core Management' },
  { label: 'Courses', icon: 'library_books', group: 'Core Management' },
  { label: 'Learning', icon: 'cast_for_education', group: 'Core Management' },
  { label: 'Assessments', icon: 'assignment_turned_in', group: 'Core Management' },
  { label: 'Payments', icon: 'payments', group: 'Operations & Finance', badge: '8 Pending' },
  { label: 'Enrollments', icon: 'how_to_reg', group: 'Operations & Finance', badge: '5' },
  { label: 'One-on-One', icon: 'record_voice_over', group: 'Operations & Finance' },
  { label: 'Calendar', icon: 'event_note', group: 'Operations & Finance' },
  { label: 'Content Approval', icon: 'verified', group: 'Governance & Content', badge: '4' },
  { label: 'Communication', icon: 'forum', group: 'Governance & Content' },
  { label: 'Notifications', icon: 'notifications_active', group: 'Governance & Content' },
  { label: 'Blog', icon: 'article', group: 'Governance & Content' },
  { label: 'Homepage', icon: 'web', group: 'Governance & Content' },
  { label: 'Reports', icon: 'bar_chart', group: 'System & Security' },
  { label: 'Audit', icon: 'policy', group: 'System & Security' },
  { label: 'Roles & Permissions', icon: 'admin_panel_settings', group: 'System & Security' },
  { label: 'Settings', icon: 'settings', group: 'System & Security' },
];

export const SCREEN_INVENTORY: ScreenAuditInfo[] = [
  {
    id: 'PUB-01-HOME',
    code: 'Screen 01 • Reference',
    title: 'Home Page (10-Section Public IA)',
    subtitle: 'Canonical Visual Reference Navbar',
    category: 'PUBLIC',
    isReference: true,
    activeNavLabel: 'Home',
    previousViolation: 'Approved Visual Reference — Canonical h-20 header, brand lockup, 4 public links, Language selector, Login & Register CTAs.',
    appliedCorrection: 'Locked as the Master Visual Reference (80px height, #FFFFFF/95 surface, #E9DDE1 border, #D8899D/#B75E78/#F3DDE3 accents).',
  },
  {
    id: 'PUB-02-COURSES',
    code: 'Screen 02 • Public',
    title: 'Public Course Catalog',
    subtitle: 'CEFR A1–C2 & IELTS Programs Directory',
    category: 'PUBLIC',
    activeNavLabel: 'Courses',
    previousViolation: 'Had inconsistent header height (h-16), mismatched search bar inside navbar, and missing Language selector & Register button.',
    appliedCorrection: 'Aligned 1:1 with Home Page Navbar: h-20 height, canonical [Home, Courses, Blog, About] links with Courses active state, Language selector, Login & Register.',
  },
  {
    id: 'PUB-03-COURSE-DETAIL',
    code: 'Screen 03 • Public',
    title: 'Course Detail & Curriculum',
    subtitle: 'Essential English Grammar Mastery',
    category: 'PUBLIC',
    activeNavLabel: 'Courses',
    previousViolation: 'Displayed student portal links (My Courses, Assessments) and custom dark pink header bar on a public marketing screen.',
    appliedCorrection: 'Replaced with canonical Public Navbar matching Home Page reference; Courses marked active; page breadcrumb moved cleanly into content canvas.',
  },
  {
    id: 'STU-COURSE-03-STRUCTURE',
    code: 'Screen 03-B • Student/Public',
    title: 'Student Course Structure Preview',
    subtitle: 'Course Curriculum & Structure Preview',
    category: 'PUBLIC',
    activeNavLabel: 'Courses',
    previousViolation: 'Structure preview was missing a direct linked route from Course Detail and had no breadcrumb hierarchy.',
    appliedCorrection: 'Linked directly from "Review Syllabus Preview"; aligned with Home Page Navbar; features full 4 modules, QA inspection states, and return-to-enroll actions.',
  },
  {
    id: 'STU-FREE-01',
    code: 'Screen STU-FREE-01',
    title: 'Free Course Learning Direct Entry',
    subtitle: 'Free Access Gateway & Billboard',
    category: 'STUDENT',
    activeNavLabel: 'Courses',
    previousViolation: 'Free course direct access entry was decoupled from navigation without fastlane gateway route.',
    appliedCorrection: 'Integrated step-by-step entry gateway from "Start Learning Now" with zero financial delays and instant stream unlocking.',
  },
  {
    id: 'STU-LEARN-01',
    code: 'Screen STU-LEARN-01',
    title: 'Learning Dashboard & Syllabus Hub',
    subtitle: 'Active Learning Position & Sequence',
    category: 'STUDENT',
    activeNavLabel: 'Courses',
    previousViolation: 'Missing canonical open-access learning dashboard with persistent lesson navigation.',
    appliedCorrection: 'Built interactive 4-module learning dashboard with resume hero, progress indicators, and instant unit launchers.',
  },
  {
    id: 'STU-LESSON-01',
    code: 'Screen STU-LESSON-01',
    title: 'Lesson Player & Video Workspace',
    subtitle: 'Instructional Video & 8 Parts of Speech Table',
    category: 'STUDENT',
    activeNavLabel: 'Courses',
    previousViolation: 'Lesson player had no standardized media layout and missing pedagogical transcript notes.',
    appliedCorrection: 'Equipped with custom 1080p player, timeline scrubbing, 8 parts of speech gloss table, and direct auto-drill launcher.',
  },
  {
    id: 'STU-EX-01',
    code: 'Screen STU-EX-01',
    title: 'Auto-Graded Exercise Workspace',
    subtitle: 'Interactive Diagnostic Auto-Drill (Prompt 3 of 15)',
    category: 'STUDENT',
    activeNavLabel: 'Courses',
    previousViolation: 'Exercise workspace lacked deterministic client-side evaluation and prompt trajectory grid.',
    appliedCorrection: 'Implemented instantaneous auto-evaluation with grammar rule feedback, 15-prompt visual grid, and debrief transition.',
  },
  {
    id: 'STU-PLACE-02',
    code: 'Screen STU-PLACE-02',
    title: 'Placement Diagnostic Examination',
    subtitle: 'Continuous Syntactic & Oral Discourse Diagnostic (SEC-PLA-04)',
    category: 'STUDENT',
    activeNavLabel: 'Courses',
    previousViolation: 'Diagnostic examination lacked standardized timer parameters, 50-item question matrix, acoustic listening task, and submission locks.',
    appliedCorrection: 'Crafted 1:1 with Stitch design: 60m session timer, 50-item navigation matrix, Item 14 participial syntax MCQ, Item 41 listening player, and submission modals.',
  },
  {
    id: 'STU-EX-02',
    code: 'Screen STU-EX-02',
    title: 'Exercise Result Screen',
    subtitle: 'Diagnostic Debrief & Pedagogical Analysis',
    category: 'STUDENT',
    activeNavLabel: 'Courses',
    previousViolation: 'Result screen had no category-level accuracy analysis or error remediation notes.',
    appliedCorrection: 'Crafted 4-metric score cockpit, 7-category performance matrix, Burmese error notes, and retry dispatch actions.',
  },
  {
    id: 'STU-EX-03',
    code: 'Screen STU-EX-03',
    title: 'Exercise Retry State Handler',
    subtitle: 'Practice Scope Configuration & Baseline Summary',
    category: 'STUDENT',
    activeNavLabel: 'Courses',
    previousViolation: 'Retry was punitive and lacked targeted scope remediation options.',
    appliedCorrection: 'Engineered non-punitive practice mode with full (15) vs targeted (2) scope selector and baseline memory retention.',
  },
  {
    id: 'PUB-04-BLOG',
    code: 'Screen 04 • Public',
    title: 'Public Blog & Study Guides',
    subtitle: 'Editorial Articles & Bilingual Grammar Notes',
    category: 'PUBLIC',
    activeNavLabel: 'Blog',
    previousViolation: 'Used standalone editorial topbar with different logo typography, missing About link, and non-standard pill buttons.',
    appliedCorrection: 'Normalized to exact Home Page Navbar lockup, spacing, 10px radius buttons, Language selector, and Blog active indicator.',
  },
  {
    id: 'PUB-05-ABOUT',
    code: 'Screen 05 • Public',
    title: 'About Teacher Theint',
    subtitle: 'Credentials, Methodology & Student Outcomes',
    category: 'PUBLIC',
    activeNavLabel: 'About',
    previousViolation: 'Had oversized header padding, missing Login link, and off-palette rose background fill in navigation.',
    appliedCorrection: 'Corrected to canonical Home Page Navbar with #FFFFFF surface, #E9DDE1 border, and About active state.',
  },
  {
    id: 'AUTH-01-LOGIN',
    code: 'Screen 06 • Auth',
    title: 'Login Screen',
    subtitle: 'Unauthenticated Account Sign-In',
    category: 'AUTH',
    activeNavLabel: 'Login',
    previousViolation: 'Prematurely displayed authenticated Student links (Dashboard, Assessments) in header before sign-in.',
    appliedCorrection: 'Removed all authenticated role navigation; applied normalized Public/Auth Header matching Home Page Navbar geometry with Login active state.',
  },
  {
    id: 'AUTH-02-REGISTER',
    code: 'Screen 07 • Auth',
    title: 'Register Screen',
    subtitle: 'New Student Account Registration',
    category: 'AUTH',
    activeNavLabel: 'Register',
    previousViolation: 'Had minimal floating back button instead of consistent brand header and lacked Language selector (EN/MM).',
    appliedCorrection: 'Applied normalized Home Page Navbar visual treatment with canonical Public/Auth links, Language toggle, and active Register CTA.',
  },
  {
    id: 'AUTH-03-VERIFY-EMAIL',
    code: 'Screen 08 • Auth',
    title: 'Email Verification (OTP)',
    subtitle: '6-Digit Security Code Confirmation',
    category: 'AUTH',
    activeNavLabel: 'Email Verification',
    previousViolation: 'Leaked authenticated Student profile avatar and notification bell prior to completing email verification.',
    appliedCorrection: 'Stripped unverified session chrome; restored clean unauthenticated Auth Header aligned with Home Page Navbar visual language.',
  },
  {
    id: 'STU-01-PORTAL',
    code: 'Screen 09 • Student',
    title: 'Student Learning Portal',
    subtitle: '9-Item Canonical Student Architecture',
    category: 'STUDENT',
    activeNavLabel: 'My Courses',
    previousViolation: 'Mixed public marketing links (Blog, About) with incomplete student links and lacked canonical One-on-One & Progress items.',
    appliedCorrection: 'Enforced exact 9-item Student navigation [Home, Courses, My Courses, Assessments, Progress, One-on-One, Calendar, Notifications, Profile] with Home Page Navbar visual DNA.',
  },
  {
    id: 'TEA-01-PORTAL',
    code: 'Screen 10 • Teacher',
    title: 'Teacher Academic Portal',
    subtitle: '9-Item Canonical Teacher Architecture',
    category: 'TEACHER',
    activeNavLabel: 'Assessments / Grading',
    previousViolation: 'Included "View As Student" role switcher and mismatched dark header bar conflicting with Teacher Theint Design System.',
    appliedCorrection: 'Preserved Teacher application shell with exact 9 canonical items, removed role-switching, and normalized header/sidebar to Home Page visual reference.',
  },
  {
    id: 'ADM-01-PORTAL',
    code: 'Screen 11 • Admin',
    title: 'Admin Operations Console',
    subtitle: '19-Item Canonical Admin Architecture',
    category: 'ADMIN',
    activeNavLabel: 'Payments',
    previousViolation: 'Used generic SaaS slate topbar and omitted canonical Homepage, Content Approval, and Audit navigation items.',
    appliedCorrection: 'Preserved Admin sidebar + topbar shell with all 19 canonical Admin items and normalized header height (h-20), logo lockup, and #E9DDE1 borders.',
  },
];
