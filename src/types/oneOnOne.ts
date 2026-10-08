/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Teacher Theint English — One-on-One Core Workflow Types & Unified State Store
 * 
 * CANONICAL FLOW:
 * Request -> Admin Handling -> Admin Teacher Assignment -> Schedule Negotiation ->
 * Schedule Confirmation -> Payment -> Admin Payment Approval -> Actual Start Date ->
 * One-Month Teaching Period -> Recurring Classes
 * 
 * BUSINESS INVARIANTS:
 * 1. Student NEVER directly selects the Teacher (Admin-only assignment).
 * 2. Payment NEVER enabled before SCHEDULE_CONFIRMED.
 * 3. Payment != Enrollment != Access != Progress (One-on-One is NOT course enrollment).
 * 4. Actual Start Date dynamic: exactly 1 calendar month from actual start date (not hardcoded 30 days).
 * 5. Cancellation & Reschedule requests are request-based with Admin review and preserved history.
 * 6. Viewer-local time display: Datetimes formatted locally.
 */

export type OneOnOneWorkflowStatus =
  | 'REQUEST_SUBMITTED'      // Student submitted request; waiting for Admin
  | 'ADMIN_HANDLING'         // Admin opened request and evaluating faculty availability
  | 'TEACHER_ASSIGNED'       // Admin assigned Teacher; ready for schedule negotiation
  | 'SCHEDULE_NEGOTIATION'   // Schedule proposed; Student/Teacher negotiating
  | 'SCHEDULE_CONFIRMED'     // Schedule accepted & confirmed; payment unlocked
  | 'PAYMENT_PENDING'        // Student submitted payment slip; awaiting Admin review
  | 'PAYMENT_REJECTED'       // Admin rejected slip; resubmission needed
  | 'PAYMENT_APPROVED'       // Admin approved payment; arrangement active
  | 'TEACHING_ACTIVE'        // Actual start date reached / ongoing 1-month period
  | 'RESCHEDULE_REQUESTED'   // Reschedule requested by student/teacher; awaiting Admin
  | 'CANCELLATION_REQUESTED' // Cancellation requested; awaiting Admin
  | 'CANCELLED'              // Admin approved cancellation (history preserved)
  | 'COMPLETED';             // 1-month teaching period concluded

export type PaymentMethodType = 'KBZ Pay' | 'Wave Pay';

export interface RecurringSlot {
  dayOfWeek: string; // e.g., 'Monday & Wednesday'
  timeSlot: string;  // e.g., '07:00 PM – 08:00 PM'
  durationMinutes: number;
}

export interface RecurringClassSession {
  id: string;
  sessionNumber: number;
  dateStr: string;     // Viewer-local date
  timeStr: string;     // Viewer-local time
  status: 'UPCOMING' | 'COMPLETED' | 'RESCHEDULED' | 'CANCELLED';
  lessonTopic: string;
}

export interface OneOnOneScheduleHistoryEntry {
  timestamp: string;
  changedBy: string;
  summary: string;
  previousSchedule: string;
  newSchedule: string;
}

export interface OneOnOneArrangement {
  id: string;
  code: string; // e.g. 'OOO-2026-089'
  
  // Student Context
  studentId: string;
  studentName: string;
  studentAvatar: string;
  studentLevel: string; // Decreed Level, e.g. 'Level 2'
  
  // Request Context
  learningGoal: string;
  learningNeeds: string;
  preferredDays: string;
  preferredTimeRange: string;
  studentNotes?: string;
  submittedAt: string; // ISO
  
  // Workflow State
  status: OneOnOneWorkflowStatus;
  
  // Teacher Assignment (Admin-Selected ONLY)
  assignedTeacherId?: string;
  assignedTeacherName?: string;
  assignedTeacherAvatar?: string;
  assignedTeacherBio?: string;
  assignedTeacherSpecialty?: string;
  assignedAt?: string;
  
  // Schedule Negotiation & Confirmation
  proposedSchedule?: RecurringSlot;
  confirmedSchedule?: RecurringSlot;
  scheduleConfirmedAt?: string;
  scheduleHistory: OneOnOneScheduleHistoryEntry[];
  
  // Shared Payment Engine (Payment != Enrollment)
  paymentAmountMmK: number;
  paymentMethod?: PaymentMethodType;
  paymentAccountNo?: string;
  paymentTxRef?: string;
  paymentSlipUrl?: string;
  paymentSubmittedAt?: string;
  paymentReviewedAt?: string;
  paymentRejectionReason?: string;
  
  // Actual Start Date & 1-Month Period (Dynamic calendar month calculation)
  actualStartDate?: string; // YYYY-MM-DD
  endDate?: string;         // Exactly 1 calendar month later
  
  // Recurring Classes
  sessions: RecurringClassSession[];
  
  // Request-based Reschedule / Cancellation
  rescheduleReason?: string;
  requestedNewSchedule?: string;
  cancellationReason?: string;
  cancellationRequestedAt?: string;
  cancellationAdminDecision?: 'APPROVED' | 'REJECTED';
}

export interface AvailableTeacher {
  id: string;
  name: string;
  avatar: string;
  title: string;
  specialty: string;
  experience: string;
  activeOneOnOneCount: number;
  availableDays: string;
}

// Canonical Seed Teachers
export const AVAILABLE_TEACHERS: AvailableTeacher[] = [
  {
    id: 'tr-theint',
    name: 'Teacher Theint (Head Faculty)',
    avatar: 'TT',
    title: 'Founder & Principal Instructor',
    specialty: 'Executive Speaking, IELTS Oral Mastery & Intonation',
    experience: '8+ Years Teaching',
    activeOneOnOneCount: 4,
    availableDays: 'Mon, Wed, Fri (Evenings)',
  },
  {
    id: 'tr-thiri',
    name: 'Teacher Thiri',
    avatar: 'TS',
    title: 'Senior ESL Faculty',
    specialty: 'Practical Speaking Essentials & Pronunciation Diagnostics',
    experience: '5+ Years Teaching',
    activeOneOnOneCount: 3,
    availableDays: 'Tue, Thu, Sat (Afternoons & Evenings)',
  },
  {
    id: 'tr-kyaw',
    name: 'Teacher Kyaw Zin',
    avatar: 'KZ',
    title: 'Academic IELTS Specialist',
    specialty: 'Grammar Syntax for Professional Writers & Academic Lexicon',
    experience: '6+ Years Teaching',
    activeOneOnOneCount: 2,
    availableDays: 'Mon, Tue, Thu (Mornings & Evenings)',
  },
];

// Initial Canonical Arrangements Demonstration State
export const INITIAL_ONE_ON_ONE_ARRANGEMENTS: OneOnOneArrangement[] = [
  // 1. Primary Live Active One-on-One for Current Student (Maung Thuta)
  {
    id: 'ooo-001',
    code: 'OOO-2026-001',
    studentId: 'STU-9921',
    studentName: 'Maung Thuta',
    studentAvatar: 'MT',
    studentLevel: 'Level 2 (Decreed)',
    learningGoal: 'IELTS Band 7.5 Speaking & Executive Business Meetings',
    learningNeeds: 'Needs pragmatic intonation correction and mitigation phrasing in real-time presentations.',
    preferredDays: 'Monday & Wednesday',
    preferredTimeRange: '07:00 PM – 08:00 PM (Local Time)',
    studentNotes: 'Available on desktop. Completed Diagnostic Exam SEC-PLA-04 with Band 6.5 baseline.',
    submittedAt: '2026-10-01T10:00:00Z',
    status: 'TEACHING_ACTIVE',
    
    // Assigned by Admin
    assignedTeacherId: 'tr-theint',
    assignedTeacherName: 'Teacher Theint (Head Faculty)',
    assignedTeacherAvatar: 'TT',
    assignedTeacherBio: 'Founder & Principal Instructor with Cambridge CELTA. Specializes in executive vocal nuance.',
    assignedTeacherSpecialty: 'Executive Speaking & IELTS Oral Mastery',
    assignedAt: '2026-10-02T04:30:00Z',
    
    confirmedSchedule: {
      dayOfWeek: 'Monday & Wednesday',
      timeSlot: '07:00 PM – 08:00 PM (Local Time)',
      durationMinutes: 60,
    },
    scheduleConfirmedAt: '2026-10-03T09:15:00Z',
    scheduleHistory: [
      {
        timestamp: '2026-10-02T14:00:00Z',
        changedBy: 'Admin Operation',
        summary: 'Initial schedule negotiation proposed for Mon/Wed 07:00 PM.',
        previousSchedule: 'Preferred: Monday & Wednesday',
        newSchedule: 'Proposed: Mon/Wed 07:00 PM – 08:00 PM',
      },
      {
        timestamp: '2026-10-03T09:15:00Z',
        changedBy: 'Student & Teacher Confirmation',
        summary: 'Schedule finalized and locked for payment unlocking.',
        previousSchedule: 'Proposed: Mon/Wed 07:00 PM – 08:00 PM',
        newSchedule: 'CONFIRMED: Mon/Wed 07:00 PM – 08:00 PM',
      },
    ],
    
    paymentAmountMmK: 120000,
    paymentMethod: 'KBZ Pay',
    paymentAccountNo: '09-420-112-998 (Teacher Theint Official Academy)',
    paymentTxRef: 'KBZ-88392104-TT',
    paymentSlipUrl: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=600&auto=format&fit=crop&q=80',
    paymentSubmittedAt: '2026-10-03T11:00:00Z',
    paymentReviewedAt: '2026-10-04T02:00:00Z',
    
    // Dynamic 1-Month Period: Oct 05 -> Nov 05
    actualStartDate: '2026-10-05',
    endDate: '2026-11-05',
    
    sessions: [
      {
        id: 'sess-1',
        sessionNumber: 1,
        dateStr: 'Oct 06, 2026 (Mon)',
        timeStr: '07:00 PM – 08:00 PM',
        status: 'COMPLETED',
        lessonTopic: 'Diagnostic Intonation & Pitch Contour Analysis',
      },
      {
        id: 'sess-2',
        sessionNumber: 2,
        dateStr: 'Oct 08, 2026 (Wed)',
        timeStr: '07:00 PM – 08:00 PM',
        status: 'UPCOMING',
        lessonTopic: 'Executive Turn-Taking & Diplomatic Mitigation in Meetings',
      },
      {
        id: 'sess-3',
        sessionNumber: 3,
        dateStr: 'Oct 13, 2026 (Mon)',
        timeStr: '07:00 PM – 08:00 PM',
        status: 'UPCOMING',
        lessonTopic: 'Fluency Trajectories & Coherence Linkers (IELTS Part 2 Drill)',
      },
      {
        id: 'sess-4',
        sessionNumber: 4,
        dateStr: 'Oct 15, 2026 (Wed)',
        timeStr: '07:00 PM – 08:00 PM',
        status: 'UPCOMING',
        lessonTopic: 'Lexical Precision for High-Stakes Stakeholder Dialogue',
      },
      {
        id: 'sess-5',
        sessionNumber: 5,
        dateStr: 'Oct 20, 2026 (Mon)',
        timeStr: '07:00 PM – 08:00 PM',
        status: 'UPCOMING',
        lessonTopic: 'Mid-Month Oral Progress Check & Recorded Monologue Review',
      },
      {
        id: 'sess-6',
        sessionNumber: 6,
        dateStr: 'Oct 22, 2026 (Wed)',
        timeStr: '07:00 PM – 08:00 PM',
        status: 'UPCOMING',
        lessonTopic: 'Complex Hypothetical Structures & Spontaneous Argumentation',
      },
      {
        id: 'sess-7',
        sessionNumber: 7,
        dateStr: 'Oct 27, 2026 (Mon)',
        timeStr: '07:00 PM – 08:00 PM',
        status: 'UPCOMING',
        lessonTopic: 'Real-World Negotiation Simulation & Accent Neutralization',
      },
      {
        id: 'sess-8',
        sessionNumber: 8,
        dateStr: 'Oct 29, 2026 (Wed)',
        timeStr: '07:00 PM – 08:00 PM',
        status: 'UPCOMING',
        lessonTopic: 'Comprehensive Oral Exit Benchmark & Next-Period Advisory',
      },
    ],
  },
  
  // 2. Arrangement at Schedule Confirmation awaiting Payment
  {
    id: 'ooo-002',
    code: 'OOO-2026-002',
    studentId: 'STU-8841',
    studentName: 'Daw Thuzar',
    studentAvatar: 'DT',
    studentLevel: 'Level 3 (Decreed)',
    learningGoal: 'Diplomatic English for Regional Conferences',
    learningNeeds: 'Needs confidence in Q&A address and academic lexicon phrasing.',
    preferredDays: 'Tuesday & Thursday',
    preferredTimeRange: '08:00 PM – 09:00 PM',
    submittedAt: '2026-10-04T12:00:00Z',
    status: 'SCHEDULE_CONFIRMED',
    
    assignedTeacherId: 'tr-theint',
    assignedTeacherName: 'Teacher Theint (Head Faculty)',
    assignedTeacherAvatar: 'TT',
    assignedTeacherBio: 'Founder & Principal Instructor with Cambridge CELTA.',
    assignedTeacherSpecialty: 'Executive Speaking & IELTS Oral Mastery',
    assignedAt: '2026-10-05T06:00:00Z',
    
    confirmedSchedule: {
      dayOfWeek: 'Tuesday & Thursday',
      timeSlot: '08:00 PM – 09:00 PM (Local Time)',
      durationMinutes: 60,
    },
    scheduleConfirmedAt: '2026-10-06T15:30:00Z',
    scheduleHistory: [
      {
        timestamp: '2026-10-05T08:00:00Z',
        changedBy: 'Admin Operation',
        summary: 'Assigned Teacher Theint and opened negotiation for Tue/Thu 8 PM slot.',
        previousSchedule: 'Requested: Tue/Thu Evening',
        newSchedule: 'Proposed: Tue/Thu 08:00 PM – 09:00 PM',
      },
      {
        timestamp: '2026-10-06T15:30:00Z',
        changedBy: 'Student Acceptance',
        summary: 'Daw Thuzar confirmed proposed time. Payment action unlocked.',
        previousSchedule: 'Proposed: Tue/Thu 08:00 PM – 09:00 PM',
        newSchedule: 'CONFIRMED: Tue/Thu 08:00 PM – 09:00 PM',
      },
    ],
    
    paymentAmountMmK: 120000,
    sessions: [],
  },
  
  // 3. Arrangement with Payment Pending Admin Review
  {
    id: 'ooo-003',
    code: 'OOO-2026-003',
    studentId: 'STU-7729',
    studentName: 'Ko Min Thu',
    studentAvatar: 'KM',
    studentLevel: 'Level 1 (Decreed)',
    learningGoal: 'A2 to B1 Speaking Essentials',
    learningNeeds: 'Grammar confidence and eliminating hesitation during short responses.',
    preferredDays: 'Friday & Saturday',
    preferredTimeRange: '06:00 PM – 07:00 PM',
    submittedAt: '2026-10-03T08:30:00Z',
    status: 'PAYMENT_PENDING',
    
    assignedTeacherId: 'tr-thiri',
    assignedTeacherName: 'Teacher Thiri',
    assignedTeacherAvatar: 'TS',
    assignedTeacherBio: 'Senior ESL Faculty specializing in pronunciation diagnostics.',
    assignedTeacherSpecialty: 'Practical Speaking Essentials',
    assignedAt: '2026-10-04T05:00:00Z',
    
    confirmedSchedule: {
      dayOfWeek: 'Friday & Saturday',
      timeSlot: '06:00 PM – 07:00 PM (Local Time)',
      durationMinutes: 60,
    },
    scheduleConfirmedAt: '2026-10-05T11:00:00Z',
    scheduleHistory: [
      {
        timestamp: '2026-10-04T05:00:00Z',
        changedBy: 'Admin Operation',
        summary: 'Assigned Teacher Thiri for weekend speaking clinics.',
        previousSchedule: 'None',
        newSchedule: 'Fri/Sat 06:00 PM',
      },
    ],
    
    paymentAmountMmK: 100000,
    paymentMethod: 'Wave Pay',
    paymentAccountNo: '09-798-223-110 (Teacher Theint English Accounts)',
    paymentTxRef: 'WAVE-99210-TT7',
    paymentSlipUrl: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=600&auto=format&fit=crop&q=80',
    paymentSubmittedAt: '2026-10-07T08:00:00Z',
    sessions: [],
  },
  
  // 4. Arrangement Freshly Submitted (Awaiting Admin Handling & Teacher Assignment)
  {
    id: 'ooo-004',
    code: 'OOO-2026-004',
    studentId: 'STU-6512',
    studentName: 'Hsu Myat Noe',
    studentAvatar: 'HM',
    studentLevel: 'Level 2 (Decreed)',
    learningGoal: 'Medical Professional English for UK Clinical Assessment',
    learningNeeds: 'Patient-facing dialogues, clinical history taking, empathetic register.',
    preferredDays: 'Sunday Morning / Afternoon',
    preferredTimeRange: '10:00 AM – 12:00 PM',
    studentNotes: 'Working as physician in Yangon. Prefer weekend slot.',
    submittedAt: '2026-10-08T03:15:00Z',
    status: 'REQUEST_SUBMITTED',
    paymentAmountMmK: 120000,
    scheduleHistory: [],
    sessions: [],
  },
];
