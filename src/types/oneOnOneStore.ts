/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Shared Unified One-on-One State Manager
 * Emits live updates across Student, Teacher, and Admin views in real-time.
 */

import {
  OneOnOneArrangement,
  INITIAL_ONE_ON_ONE_ARRANGEMENTS,
  OneOnOneWorkflowStatus,
  RecurringSlot,
  PaymentMethodType,
} from './oneOnOne';

type Listener = (arrangements: OneOnOneArrangement[]) => void;

class OneOnOneStore {
  private arrangements: OneOnOneArrangement[] = [...INITIAL_ONE_ON_ONE_ARRANGEMENTS];
  private listeners: Set<Listener> = new Set();

  public getAll(): OneOnOneArrangement[] {
    return this.arrangements;
  }

  public getById(id: string): OneOnOneArrangement | undefined {
    return this.arrangements.find((a) => a.id === id);
  }

  public getForStudent(studentId: string): OneOnOneArrangement[] {
    return this.arrangements.filter((a) => a.studentId === studentId);
  }

  public getForTeacher(teacherId: string): OneOnOneArrangement[] {
    return this.arrangements.filter((a) => a.assignedTeacherId === teacherId);
  }

  public subscribe(listener: Listener): () => void {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }

  private notify() {
    this.listeners.forEach((fn) => fn([...this.arrangements]));
  }

  // 1. Student Submits One-on-One Request (No teacher self-selection)
  public submitRequest(params: {
    studentId: string;
    studentName: string;
    studentAvatar: string;
    studentLevel: string;
    learningGoal: string;
    learningNeeds: string;
    preferredDays: string;
    preferredTimeRange: string;
    studentNotes?: string;
  }): OneOnOneArrangement {
    const newId = `ooo-${Date.now()}`;
    const newCode = `OOO-2026-0${Math.floor(Math.random() * 90 + 10)}`;
    const newArrangement: OneOnOneArrangement = {
      id: newId,
      code: newCode,
      studentId: params.studentId,
      studentName: params.studentName,
      studentAvatar: params.studentAvatar,
      studentLevel: params.studentLevel,
      learningGoal: params.learningGoal,
      learningNeeds: params.learningNeeds,
      preferredDays: params.preferredDays,
      preferredTimeRange: params.preferredTimeRange,
      studentNotes: params.studentNotes,
      submittedAt: new Date().toISOString(),
      status: 'REQUEST_SUBMITTED',
      paymentAmountMmK: 120000,
      scheduleHistory: [
        {
          timestamp: new Date().toISOString(),
          changedBy: 'Student Request Submission',
          summary: `Request submitted for ${params.preferredDays} (${params.preferredTimeRange})`,
          previousSchedule: 'None',
          newSchedule: `${params.preferredDays} • ${params.preferredTimeRange}`,
        },
      ],
      sessions: [],
    };

    this.arrangements = [newArrangement, ...this.arrangements];
    this.notify();
    return newArrangement;
  }

  // 2. Admin Assigns Teacher (Admin-ONLY action)
  public adminAssignTeacher(
    arrangementId: string,
    teacher: {
      id: string;
      name: string;
      avatar: string;
      bio: string;
      specialty: string;
    },
    proposedSlot?: RecurringSlot
  ) {
    this.arrangements = this.arrangements.map((a) => {
      if (a.id !== arrangementId) return a;
      const historyEntry = {
        timestamp: new Date().toISOString(),
        changedBy: 'Admin Faculty Assignment',
        summary: `Admin assigned ${teacher.name} to arrangement. Negotiation initiated.`,
        previousSchedule: a.confirmedSchedule ? a.confirmedSchedule.dayOfWeek : 'Unassigned',
        newSchedule: proposedSlot ? `${proposedSlot.dayOfWeek} ${proposedSlot.timeSlot}` : 'Pending Negotiation',
      };
      return {
        ...a,
        status: 'SCHEDULE_NEGOTIATION' as OneOnOneWorkflowStatus,
        assignedTeacherId: teacher.id,
        assignedTeacherName: teacher.name,
        assignedTeacherAvatar: teacher.avatar,
        assignedTeacherBio: teacher.bio,
        assignedTeacherSpecialty: teacher.specialty,
        assignedAt: new Date().toISOString(),
        proposedSchedule: proposedSlot || {
          dayOfWeek: a.preferredDays,
          timeSlot: a.preferredTimeRange,
          durationMinutes: 60,
        },
        scheduleHistory: [...a.scheduleHistory, historyEntry],
      };
    });
    this.notify();
  }

  // 3. Schedule Negotiation -> Schedule Confirmation
  public confirmSchedule(arrangementId: string, slot: RecurringSlot, confirmedBy: string) {
    this.arrangements = this.arrangements.map((a) => {
      if (a.id !== arrangementId) return a;
      const historyEntry = {
        timestamp: new Date().toISOString(),
        changedBy: confirmedBy,
        summary: `Schedule confirmed for ${slot.dayOfWeek} at ${slot.timeSlot}. Payment action unlocked.`,
        previousSchedule: a.proposedSchedule ? `${a.proposedSchedule.dayOfWeek} ${a.proposedSchedule.timeSlot}` : 'None',
        newSchedule: `CONFIRMED: ${slot.dayOfWeek} • ${slot.timeSlot}`,
      };
      return {
        ...a,
        status: 'SCHEDULE_CONFIRMED' as OneOnOneWorkflowStatus,
        confirmedSchedule: slot,
        scheduleConfirmedAt: new Date().toISOString(),
        scheduleHistory: [...a.scheduleHistory, historyEntry],
      };
    });
    this.notify();
  }

  // 4. Student Submits Payment (Payment != Enrollment)
  public submitPayment(
    arrangementId: string,
    method: PaymentMethodType,
    txRef: string,
    slipUrl?: string
  ) {
    this.arrangements = this.arrangements.map((a) => {
      if (a.id !== arrangementId) return a;
      return {
        ...a,
        status: 'PAYMENT_PENDING' as OneOnOneWorkflowStatus,
        paymentMethod: method,
        paymentTxRef: txRef,
        paymentSlipUrl: slipUrl || 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=600&auto=format&fit=crop&q=80',
        paymentSubmittedAt: new Date().toISOString(),
        paymentAccountNo: method === 'KBZ Pay' ? '09-420-112-998' : '09-798-223-110',
      };
    });
    this.notify();
  }

  // 5. Admin Approves Payment -> Computes Dynamic 1-Month Period & Generates Recurring Classes
  public adminApprovePayment(arrangementId: string, actualStartDateStr?: string) {
    const today = new Date();
    const startDateObj = actualStartDateStr ? new Date(actualStartDateStr) : today;
    
    // Exactly 1 calendar month later (not fixed 30 days)
    const endDateObj = new Date(startDateObj);
    endDateObj.setMonth(endDateObj.getMonth() + 1);

    const formattedStart = startDateObj.toISOString().split('T')[0];
    const formattedEnd = endDateObj.toISOString().split('T')[0];

    this.arrangements = this.arrangements.map((a) => {
      if (a.id !== arrangementId) return a;

      // Generate 8 recurring classes spanning the 1 calendar month
      const generatedSessions = a.sessions.length > 0 ? a.sessions : [
        {
          id: `sess-${Date.now()}-1`,
          sessionNumber: 1,
          dateStr: `${startDateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric', weekday: 'short' })}`,
          timeStr: a.confirmedSchedule?.timeSlot || '07:00 PM – 08:00 PM',
          status: 'UPCOMING' as const,
          lessonTopic: 'Diagnostic Assessment & Individual Linguistic Objective Setting',
        },
        {
          id: `sess-${Date.now()}-2`,
          sessionNumber: 2,
          dateStr: 'Week 1 Session 2',
          timeStr: a.confirmedSchedule?.timeSlot || '07:00 PM – 08:00 PM',
          status: 'UPCOMING' as const,
          lessonTopic: 'Syntactic Mastery & Spoken Lexical Density Drills',
        },
        {
          id: `sess-${Date.now()}-3`,
          sessionNumber: 3,
          dateStr: 'Week 2 Session 1',
          timeStr: a.confirmedSchedule?.timeSlot || '07:00 PM – 08:00 PM',
          status: 'UPCOMING' as const,
          lessonTopic: 'Pragmatic Turn-Taking & Diplomatic Mitigation',
        },
        {
          id: `sess-${Date.now()}-4`,
          sessionNumber: 4,
          dateStr: 'Week 2 Session 2',
          timeStr: a.confirmedSchedule?.timeSlot || '07:00 PM – 08:00 PM',
          status: 'UPCOMING' as const,
          lessonTopic: 'Fluency Flow & Linking Devices in Extended Monologue',
        },
        {
          id: `sess-${Date.now()}-5`,
          sessionNumber: 5,
          dateStr: 'Week 3 Session 1',
          timeStr: a.confirmedSchedule?.timeSlot || '07:00 PM – 08:00 PM',
          status: 'UPCOMING' as const,
          lessonTopic: 'Mid-Month Formative Review & Accent Intonation Check',
        },
        {
          id: `sess-${Date.now()}-6`,
          sessionNumber: 6,
          dateStr: 'Week 3 Session 2',
          timeStr: a.confirmedSchedule?.timeSlot || '07:00 PM – 08:00 PM',
          status: 'UPCOMING' as const,
          lessonTopic: 'Spontaneous Argumentation & Professional Rebuttal',
        },
        {
          id: `sess-${Date.now()}-7`,
          sessionNumber: 7,
          dateStr: 'Week 4 Session 1',
          timeStr: a.confirmedSchedule?.timeSlot || '07:00 PM – 08:00 PM',
          status: 'UPCOMING' as const,
          lessonTopic: 'High-Stakes Presentation Simulation & Live Feedback',
        },
        {
          id: `sess-${Date.now()}-8`,
          sessionNumber: 8,
          dateStr: 'Week 4 Session 2',
          timeStr: a.confirmedSchedule?.timeSlot || '07:00 PM – 08:00 PM',
          status: 'UPCOMING' as const,
          lessonTopic: 'Comprehensive Oral Post-Benchmark & Month Conclusion Report',
        },
      ];

      return {
        ...a,
        status: 'TEACHING_ACTIVE' as OneOnOneWorkflowStatus,
        paymentReviewedAt: new Date().toISOString(),
        actualStartDate: formattedStart,
        endDate: formattedEnd,
        sessions: generatedSessions,
      };
    });
    this.notify();
  }

  // 6. Admin Rejects Payment Slip
  public adminRejectPayment(arrangementId: string, reason: string) {
    this.arrangements = this.arrangements.map((a) => {
      if (a.id !== arrangementId) return a;
      return {
        ...a,
        status: 'PAYMENT_REJECTED' as OneOnOneWorkflowStatus,
        paymentReviewedAt: new Date().toISOString(),
        paymentRejectionReason: reason,
      };
    });
    this.notify();
  }

  // 7. Reschedule Request Flow (Request -> Admin Decision)
  public requestReschedule(arrangementId: string, requestedSlotStr: string, reason: string) {
    this.arrangements = this.arrangements.map((a) => {
      if (a.id !== arrangementId) return a;
      const historyEntry = {
        timestamp: new Date().toISOString(),
        changedBy: 'Student Reschedule Request',
        summary: `Reschedule requested to ${requestedSlotStr}. Reason: ${reason}`,
        previousSchedule: a.confirmedSchedule ? `${a.confirmedSchedule.dayOfWeek} ${a.confirmedSchedule.timeSlot}` : 'None',
        newSchedule: `Pending Admin Approval: ${requestedSlotStr}`,
      };
      return {
        ...a,
        status: 'RESCHEDULE_REQUESTED' as OneOnOneWorkflowStatus,
        rescheduleReason: reason,
        requestedNewSchedule: requestedSlotStr,
        scheduleHistory: [...a.scheduleHistory, historyEntry],
      };
    });
    this.notify();
  }

  public adminDecideReschedule(arrangementId: string, approved: boolean, updatedSlot?: RecurringSlot) {
    this.arrangements = this.arrangements.map((a) => {
      if (a.id !== arrangementId) return a;
      const historyEntry = {
        timestamp: new Date().toISOString(),
        changedBy: 'Admin Decision on Reschedule',
        summary: approved
          ? `Admin approved reschedule. New schedule active.`
          : `Admin declined reschedule request. Previous schedule retained.`,
        previousSchedule: a.confirmedSchedule ? `${a.confirmedSchedule.dayOfWeek} ${a.confirmedSchedule.timeSlot}` : 'None',
        newSchedule: approved && updatedSlot ? `${updatedSlot.dayOfWeek} ${updatedSlot.timeSlot}` : `${a.confirmedSchedule?.dayOfWeek} ${a.confirmedSchedule?.timeSlot}`,
      };
      return {
        ...a,
        status: 'TEACHING_ACTIVE' as OneOnOneWorkflowStatus,
        confirmedSchedule: approved && updatedSlot ? updatedSlot : a.confirmedSchedule,
        scheduleHistory: [...a.scheduleHistory, historyEntry],
      };
    });
    this.notify();
  }

  // 8. Cancellation Request Flow (Request -> Admin Decision, History preserved)
  public requestCancellation(arrangementId: string, reason: string) {
    this.arrangements = this.arrangements.map((a) => {
      if (a.id !== arrangementId) return a;
      return {
        ...a,
        status: 'CANCELLATION_REQUESTED' as OneOnOneWorkflowStatus,
        cancellationReason: reason,
        cancellationRequestedAt: new Date().toISOString(),
      };
    });
    this.notify();
  }

  public adminDecideCancellation(arrangementId: string, approveCancellation: boolean) {
    this.arrangements = this.arrangements.map((a) => {
      if (a.id !== arrangementId) return a;
      return {
        ...a,
        status: (approveCancellation ? 'CANCELLED' : 'TEACHING_ACTIVE') as OneOnOneWorkflowStatus,
        cancellationAdminDecision: approveCancellation ? 'APPROVED' : 'REJECTED',
      };
    });
    this.notify();
  }
}

export const oneOnOneStore = new OneOnOneStore();
