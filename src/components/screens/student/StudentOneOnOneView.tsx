/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Teacher Theint English — Student One-on-One Dedicated Workspace Component
 * 
 * WORKFLOW FIDELITY:
 * 1. Step 1: Overview & Guidelines (NOT a marketplace, no teacher selection).
 * 2. Step 2: Request Submission (learning goals, preferred days & time).
 * 3. Step 3: Status Tracking & Schedule Negotiation.
 * 4. Step 4: Schedule Confirmed -> Payment Submission (Payment != Course Enrollment).
 * 5. Step 5: Active One-Month Teaching Period (Dynamic calendar month, recurring classes,
 *    cancellation & reschedule request actions with preserved history).
 */

import React, { useState, useEffect } from 'react';
import {
  OneOnOneArrangement,
  OneOnOneWorkflowStatus,
  RecurringSlot,
  PaymentMethodType,
} from '../../../types/oneOnOne';
import { oneOnOneStore } from '../../../types/oneOnOneStore';

interface StudentOneOnOneViewProps {
  studentId?: string;
  studentName?: string;
  studentLevel?: string;
  onOpenMentorshipModal?: () => void;
  showSpecGuides?: boolean;
}

export const StudentOneOnOneView: React.FC<StudentOneOnOneViewProps> = ({
  studentId = 'STU-9921',
  studentName = 'Maung Thuta',
  studentLevel = 'Level 2',
  showSpecGuides = false,
}) => {
  const [arrangements, setArrangements] = useState<OneOnOneArrangement[]>([]);
  const [activeTab, setActiveTab] = useState<'ACTIVE' | 'REQUEST_FORM' | 'HISTORY'>('ACTIVE');
  
  // Request Form State
  const [learningGoal, setLearningGoal] = useState('');
  const [learningNeeds, setLearningNeeds] = useState('');
  const [preferredDays, setPreferredDays] = useState('Monday & Wednesday');
  const [preferredTimeRange, setPreferredTimeRange] = useState('07:00 PM – 08:00 PM');
  const [studentNotes, setStudentNotes] = useState('');
  const [submittingRequest, setSubmittingRequest] = useState(false);

  // Payment Form State (for when status === SCHEDULE_CONFIRMED)
  const [paymentModalArrangement, setPaymentModalArrangement] = useState<OneOnOneArrangement | null>(null);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<PaymentMethodType>('KBZ Pay');
  const [paymentTxRef, setPaymentTxRef] = useState('');

  // Reschedule / Cancellation Modals
  const [rescheduleModalArrangement, setRescheduleModalArrangement] = useState<OneOnOneArrangement | null>(null);
  const [rescheduleSlotInput, setRescheduleSlotInput] = useState('Tuesday & Thursday • 07:00 PM – 08:00 PM');
  const [rescheduleReasonInput, setRescheduleReasonInput] = useState('');

  const [cancellationModalArrangement, setCancellationModalArrangement] = useState<OneOnOneArrangement | null>(null);
  const [cancellationReasonInput, setCancellationReasonInput] = useState('');

  // Toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3800);
  };

  useEffect(() => {
    const update = () => {
      setArrangements(oneOnOneStore.getForStudent(studentId));
    };
    update();
    return oneOnOneStore.subscribe(update);
  }, [studentId]);

  const activeArrangement = arrangements.find(
    (a) => a.status !== 'CANCELLED' && a.status !== 'COMPLETED'
  );

  const handleSubmitRequest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!learningGoal.trim()) {
      showToast('Please describe your primary learning goal.');
      return;
    }
    setSubmittingRequest(true);
    setTimeout(() => {
      oneOnOneStore.submitRequest({
        studentId,
        studentName,
        studentAvatar: 'MT',
        studentLevel,
        learningGoal,
        learningNeeds,
        preferredDays,
        preferredTimeRange,
        studentNotes,
      });
      setSubmittingRequest(false);
      setActiveTab('ACTIVE');
      setLearningGoal('');
      setLearningNeeds('');
      setStudentNotes('');
      showToast('One-on-One Request successfully submitted! Admin is reviewing faculty assignment.');
    }, 400);
  };

  const handleStudentAcceptSchedule = (arrangementId: string, slot: RecurringSlot) => {
    oneOnOneStore.confirmSchedule(arrangementId, slot, 'Student Confirmation');
    showToast('Schedule confirmed! Shared payment gateway unlocked.');
  };

  const handleSubmitPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!paymentModalArrangement) return;
    if (!paymentTxRef.trim()) {
      showToast('Please enter the transaction reference number from your bank app.');
      return;
    }
    oneOnOneStore.submitPayment(
      paymentModalArrangement.id,
      selectedPaymentMethod,
      paymentTxRef.trim()
    );
    setPaymentModalArrangement(null);
    setPaymentTxRef('');
    showToast('Payment submitted! Admin is verifying transfer slip.');
  };

  const handleSendRescheduleRequest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!rescheduleModalArrangement) return;
    if (!rescheduleReasonInput.trim()) {
      showToast('Please specify the reason for the reschedule request.');
      return;
    }
    oneOnOneStore.requestReschedule(
      rescheduleModalArrangement.id,
      rescheduleSlotInput,
      rescheduleReasonInput
    );
    setRescheduleModalArrangement(null);
    setRescheduleReasonInput('');
    showToast('Reschedule request submitted to Admin for operational review.');
  };

  const handleSendCancellationRequest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!cancellationModalArrangement) return;
    if (!cancellationReasonInput.trim()) {
      showToast('Please provide reason for cancellation.');
      return;
    }
    oneOnOneStore.requestCancellation(
      cancellationModalArrangement.id,
      cancellationReasonInput
    );
    setCancellationModalArrangement(null);
    setCancellationReasonInput('');
    showToast('Cancellation request submitted to Admin. History is preserved.');
  };

  // Helper status badge renderer
  const renderStatusBadge = (status: OneOnOneWorkflowStatus) => {
    switch (status) {
      case 'REQUEST_SUBMITTED':
        return (
          <span className="px-3 py-1 rounded-full text-xs font-['Quicksand'] font-bold bg-[#ffe082]/30 text-[#725c06] border border-[#ffe082]">
            Request Submitted • Awaiting Admin
          </span>
        );
      case 'ADMIN_HANDLING':
        return (
          <span className="px-3 py-1 rounded-full text-xs font-['Quicksand'] font-bold bg-[#81d4fa]/20 text-[#005d79] border border-[#81d4fa]">
            Admin Reviewing Faculty Availability
          </span>
        );
      case 'TEACHER_ASSIGNED':
      case 'SCHEDULE_NEGOTIATION':
        return (
          <span className="px-3 py-1 rounded-full text-xs font-['Quicksand'] font-bold bg-[#f48fb1]/20 text-[#722544] border border-[#f48fb1]/40">
            Teacher Assigned • Schedule Negotiation
          </span>
        );
      case 'SCHEDULE_CONFIRMED':
        return (
          <span className="px-3 py-1 rounded-full text-xs font-['Quicksand'] font-bold bg-[#ffe082]/40 text-[#503f00] border border-[#ffe082] animate-pulse">
            Schedule Confirmed • Payment Required
          </span>
        );
      case 'PAYMENT_PENDING':
        return (
          <span className="px-3 py-1 rounded-full text-xs font-['Quicksand'] font-bold bg-[#ffe082]/30 text-[#725c06] border border-[#ffe082]">
            Payment Slip Submitted • Admin Reviewing
          </span>
        );
      case 'PAYMENT_REJECTED':
        return (
          <span className="px-3 py-1 rounded-full text-xs font-['Quicksand'] font-bold bg-[#ffdad6] text-[#ba1a1a] border border-[#ffdad6]">
            Payment Slip Rejected • Resubmission Needed
          </span>
        );
      case 'PAYMENT_APPROVED':
      case 'TEACHING_ACTIVE':
        return (
          <span className="px-3 py-1 rounded-full text-xs font-['Quicksand'] font-bold bg-[#a5d6a7]/30 text-[#1b5e20] border border-[#a5d6a7]/60">
            Active 1-Month Teaching Period
          </span>
        );
      case 'RESCHEDULE_REQUESTED':
        return (
          <span className="px-3 py-1 rounded-full text-xs font-['Quicksand'] font-bold bg-[#81d4fa]/20 text-[#005d79] border border-[#81d4fa]">
            Reschedule Under Admin Review
          </span>
        );
      case 'CANCELLATION_REQUESTED':
        return (
          <span className="px-3 py-1 rounded-full text-xs font-['Quicksand'] font-bold bg-[#ffdad6] text-[#ba1a1a] border border-[#ba1a1a]/30">
            Cancellation Under Admin Review
          </span>
        );
      case 'CANCELLED':
        return (
          <span className="px-3 py-1 rounded-full text-xs font-['Quicksand'] font-bold bg-[#f5e4e7] text-[#534247] border border-[#d8c1c6]">
            Arrangement Concluded / Cancelled
          </span>
        );
      case 'COMPLETED':
        return (
          <span className="px-3 py-1 rounded-full text-xs font-['Quicksand'] font-bold bg-[#a5d6a7]/20 text-[#1b5e20] border border-[#a5d6a7]">
            1-Month Period Concluded
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-8 animate-fade-in font-['Nunito_Sans']">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 bg-[#22191b] text-white text-xs px-4 py-3 rounded-2xl shadow-[0_8px_24px_rgba(244,143,177,0.35)] flex items-center gap-2.5 border border-[#f48fb1]/30 animate-fade-in font-['Quicksand'] font-bold">
          <span className="material-symbols-outlined text-[#f48fb1] text-[18px]">verified</span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#f5e4e7]">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#fff0f2] border border-[#f5e4e7] text-xs text-[#964261] font-['Quicksand'] font-bold shadow-2xs">
            <span className="material-symbols-outlined text-[16px] text-[#f48fb1]">person_pin</span>
            <span>Personalized English Mentorship</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-['Quicksand'] font-bold tracking-tight text-[#22191b] pt-1">
            One-on-One Teaching &amp; Coaching
          </h2>
          <p className="text-sm text-[#534247]">
            Structured 1-month intensive oral diagnostics and executive clinics assigned by Teacher Theint Academic Administration.
          </p>
        </div>

        {/* Tab Controls */}
        <div className="flex items-center gap-2 font-['Quicksand'] font-bold text-xs self-start sm:self-auto">
          <button
            type="button"
            onClick={() => setActiveTab('ACTIVE')}
            className={`px-4 py-2 rounded-full transition-all cursor-pointer ${
              activeTab === 'ACTIVE'
                ? 'bg-[#964261] text-white shadow-xs'
                : 'bg-white text-[#534247] hover:bg-[#fff0f2] border border-[#f5e4e7]'
            }`}
          >
            Current Arrangement
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('REQUEST_FORM')}
            className={`px-4 py-2 rounded-full transition-all cursor-pointer ${
              activeTab === 'REQUEST_FORM'
                ? 'bg-[#964261] text-white shadow-xs'
                : 'bg-white text-[#534247] hover:bg-[#fff0f2] border border-[#f5e4e7]'
            }`}
          >
            + Request One-on-One
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('HISTORY')}
            className={`px-4 py-2 rounded-full transition-all cursor-pointer ${
              activeTab === 'HISTORY'
                ? 'bg-[#964261] text-white shadow-xs'
                : 'bg-white text-[#534247] hover:bg-[#fff0f2] border border-[#f5e4e7]'
            }`}
          >
            History &amp; Logs
          </button>
        </div>
      </div>

      {/* Architectural Rule Callout: Invariant Enforced */}
      <div className="p-4 rounded-3xl bg-gradient-to-r from-[#fff0f2] to-white border border-[#d8c1c6]/70 shadow-2xs flex items-start gap-3.5">
        <div className="w-10 h-10 rounded-2xl bg-[#f48fb1]/20 text-[#964261] flex items-center justify-center shrink-0">
          <span className="material-symbols-outlined text-[20px]">account_balance</span>
        </div>
        <div className="text-xs space-y-1">
          <span className="font-bold font-['Quicksand'] text-[#22191b] block">
            Approved Governance Policy: No Student-Direct Marketplace Selection
          </span>
          <p className="text-[#534247] leading-relaxed">
            Faculty assignments are determined strictly by Academic Administration based on diagnostic placement level and pedagogical focus.
            <strong className="text-[#964261] ml-1">Payment ≠ Course Enrollment:</strong> One-on-One tuition unlocks live teacher clinics for exactly 1 calendar month from the actual start date.
          </p>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* TAB 1: ACTIVE ARRANGEMENT VIEW                                            */}
      {/* ========================================================================= */}
      {activeTab === 'ACTIVE' && (
        <div className="space-y-6">
          {!activeArrangement ? (
            /* Empty State */
            <div className="bg-white rounded-3xl p-8 sm:p-12 border border-[#fbeaec] shadow-[0_4px_16px_rgba(244,143,177,0.08)] text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#fff0f2] text-[#f48fb1] flex items-center justify-center mx-auto shadow-xs">
                <span className="material-symbols-outlined text-[32px]">record_voice_over</span>
              </div>
              <div className="space-y-1 max-w-md mx-auto">
                <h3 className="text-lg font-['Quicksand'] font-bold text-[#22191b]">
                  No Active One-on-One Arrangement
                </h3>
                <p className="text-xs text-[#534247]">
                  You currently have no ongoing One-on-One teaching period. Submit a request to receive tailored faculty coaching for your specific learning goals.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setActiveTab('REQUEST_FORM')}
                className="btn-tactile-primary px-6 py-2.5 text-xs inline-flex items-center gap-2 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[16px]">add_circle</span>
                <span>Submit One-on-One Request</span>
              </button>
            </div>
          ) : (
            /* Full Arrangement Workspace */
            <div className="space-y-6">
              {/* Progress & Milestone Stepper */}
              <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#fbeaec] shadow-sm space-y-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#f5e4e7]">
                  <div className="flex items-center gap-3">
                    <span className="font-['Quicksand'] font-bold text-base text-[#22191b]">
                      Arrangement #{activeArrangement.code}
                    </span>
                    <span className="text-xs text-[#867277] font-mono">
                      (Submitted: {new Date(activeArrangement.submittedAt).toLocaleDateString()})
                    </span>
                  </div>
                  <div>{renderStatusBadge(activeArrangement.status)}</div>
                </div>

                {/* 5-Step Visual Progression Track */}
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 pt-2 text-center text-xs font-['Quicksand']">
                  {/* Step 1: Request */}
                  <div className="p-3 rounded-2xl bg-[#a5d6a7]/20 border border-[#a5d6a7]/50 text-[#1b5e20] space-y-1">
                    <div className="flex items-center justify-center">
                      <span className="material-symbols-outlined text-[18px]">check_circle</span>
                    </div>
                    <span className="font-bold block">1. Request</span>
                    <span className="text-[10px] opacity-80">Submitted</span>
                  </div>

                  {/* Step 2: Teacher Assignment */}
                  <div
                    className={`p-3 rounded-2xl border space-y-1 ${
                      activeArrangement.assignedTeacherName
                        ? 'bg-[#a5d6a7]/20 border-[#a5d6a7]/50 text-[#1b5e20]'
                        : 'bg-[#fff0f2] border-[#f5e4e7] text-[#964261]'
                    }`}
                  >
                    <div className="flex items-center justify-center">
                      <span className="material-symbols-outlined text-[18px]">
                        {activeArrangement.assignedTeacherName ? 'check_circle' : 'pending'}
                      </span>
                    </div>
                    <span className="font-bold block">2. Faculty</span>
                    <span className="text-[10px] opacity-80">
                      {activeArrangement.assignedTeacherName ? 'Admin Assigned' : 'Evaluating'}
                    </span>
                  </div>

                  {/* Step 3: Schedule Confirmation */}
                  <div
                    className={`p-3 rounded-2xl border space-y-1 ${
                      activeArrangement.confirmedSchedule
                        ? 'bg-[#a5d6a7]/20 border-[#a5d6a7]/50 text-[#1b5e20]'
                        : activeArrangement.status === 'SCHEDULE_NEGOTIATION'
                        ? 'bg-[#ffe082]/30 border-[#ffe082] text-[#725c06]'
                        : 'bg-[#fff8f8] border-[#fbeaec] text-[#867277]'
                    }`}
                  >
                    <div className="flex items-center justify-center">
                      <span className="material-symbols-outlined text-[18px]">
                        {activeArrangement.confirmedSchedule ? 'check_circle' : 'schedule'}
                      </span>
                    </div>
                    <span className="font-bold block">3. Schedule</span>
                    <span className="text-[10px] opacity-80">
                      {activeArrangement.confirmedSchedule ? 'Confirmed' : 'Negotiating'}
                    </span>
                  </div>

                  {/* Step 4: Payment Review */}
                  <div
                    className={`p-3 rounded-2xl border space-y-1 ${
                      activeArrangement.status === 'TEACHING_ACTIVE' ||
                      activeArrangement.status === 'PAYMENT_APPROVED'
                        ? 'bg-[#a5d6a7]/20 border-[#a5d6a7]/50 text-[#1b5e20]'
                        : activeArrangement.status === 'PAYMENT_PENDING'
                        ? 'bg-[#ffe082]/30 border-[#ffe082] text-[#725c06]'
                        : 'bg-[#fff8f8] border-[#fbeaec] text-[#867277]'
                    }`}
                  >
                    <div className="flex items-center justify-center">
                      <span className="material-symbols-outlined text-[18px]">
                        {activeArrangement.status === 'TEACHING_ACTIVE'
                          ? 'check_circle'
                          : 'payments'}
                      </span>
                    </div>
                    <span className="font-bold block">4. Payment</span>
                    <span className="text-[10px] opacity-80">
                      {activeArrangement.status === 'TEACHING_ACTIVE'
                        ? 'Approved'
                        : activeArrangement.status === 'PAYMENT_PENDING'
                        ? 'Pending Slip'
                        : 'Locked'}
                    </span>
                  </div>

                  {/* Step 5: Active 1-Month Period */}
                  <div
                    className={`p-3 rounded-2xl border space-y-1 ${
                      activeArrangement.status === 'TEACHING_ACTIVE'
                        ? 'bg-[#a5d6a7]/25 border-[#a5d6a7] text-[#1b5e20] shadow-2xs'
                        : 'bg-[#fff8f8] border-[#fbeaec] text-[#867277]'
                    }`}
                  >
                    <div className="flex items-center justify-center">
                      <span className="material-symbols-outlined text-[18px]">
                        {activeArrangement.status === 'TEACHING_ACTIVE'
                          ? 'celebration'
                          : 'lock'}
                      </span>
                    </div>
                    <span className="font-bold block">5. Teaching</span>
                    <span className="text-[10px] opacity-80">
                      {activeArrangement.status === 'TEACHING_ACTIVE' ? '1-Month Live' : 'Waiting Unlock'}
                    </span>
                  </div>
                </div>
              </div>

              {/* STAGE A: Schedule Negotiation Card (If Teacher Assigned & awaiting confirmation) */}
              {activeArrangement.status === 'SCHEDULE_NEGOTIATION' && activeArrangement.proposedSchedule && (
                <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#ffe082] shadow-sm space-y-4 bg-gradient-to-br from-[#fffdf5] to-white">
                  <div className="flex items-center justify-between pb-3 border-b border-[#ffe082]/40">
                    <div className="flex items-center gap-2.5">
                      <span className="material-symbols-outlined text-[#725c06]">event_upcoming</span>
                      <h3 className="font-['Quicksand'] font-bold text-base text-[#22191b]">
                        Proposed Schedule Awaiting Your Confirmation
                      </h3>
                    </div>
                    <span className="px-3 py-0.5 rounded-full bg-[#ffe082] text-[#503f00] text-xs font-['Quicksand'] font-bold">
                      Action Required
                    </span>
                  </div>

                  <p className="text-xs text-[#534247]">
                    Admin and faculty <strong>{activeArrangement.assignedTeacherName}</strong> have proposed the following recurring weekly slots based on your preferred times:
                  </p>

                  <div className="p-4 rounded-2xl bg-white border border-[#d8c1c6]/70 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-[#81d4fa]/20 text-[#005d79] flex items-center justify-center font-bold">
                        <span className="material-symbols-outlined text-[20px]">calendar_month</span>
                      </div>
                      <div>
                        <span className="font-['Quicksand'] font-bold text-sm text-[#22191b] block">
                          {activeArrangement.proposedSchedule.dayOfWeek}
                        </span>
                        <span className="text-xs text-[#534247]">
                          {activeArrangement.proposedSchedule.timeSlot} • {activeArrangement.proposedSchedule.durationMinutes} min / session
                        </span>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() =>
                        handleStudentAcceptSchedule(
                          activeArrangement.id,
                          activeArrangement.proposedSchedule!
                        )
                      }
                      className="btn-tactile-primary px-5 py-2 text-xs cursor-pointer shadow-xs"
                    >
                      Accept &amp; Confirm Schedule
                    </button>
                  </div>
                </div>
              )}

              {/* STAGE B: Schedule Confirmed & Payment Action Required */}
              {activeArrangement.status === 'SCHEDULE_CONFIRMED' && (
                <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#f48fb1] shadow-sm space-y-4 bg-gradient-to-br from-[#fff9f9] to-white">
                  <div className="flex items-center justify-between pb-3 border-b border-[#f5e4e7]">
                    <div className="flex items-center gap-2.5">
                      <span className="material-symbols-outlined text-[#964261]">payments</span>
                      <h3 className="font-['Quicksand'] font-bold text-base text-[#22191b]">
                        Schedule Confirmed • Ready for Tuition Payment
                      </h3>
                    </div>
                    <span className="px-3 py-0.5 rounded-full bg-[#f48fb1]/20 text-[#722544] text-xs font-['Quicksand'] font-bold animate-pulse">
                      Payment Unlocked
                    </span>
                  </div>

                  <p className="text-xs text-[#534247]">
                    Your recurring slots with <strong>{activeArrangement.assignedTeacherName}</strong> are officially locked:
                    <span className="font-bold text-[#22191b] ml-1">
                      {activeArrangement.confirmedSchedule?.dayOfWeek} at {activeArrangement.confirmedSchedule?.timeSlot}
                    </span>
                    . Please submit your transfer receipt to initiate Admin verification.
                  </p>

                  <div className="p-4 rounded-2xl bg-white border border-[#d8c1c6]/70 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <span className="text-xs text-[#867277] font-semibold block">Total 1-Month Tuition:</span>
                      <span className="text-xl font-['Quicksand'] font-bold text-[#964261]">
                        {activeArrangement.paymentAmountMmK.toLocaleString()} MMK
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => setPaymentModalArrangement(activeArrangement)}
                      className="btn-tactile-primary px-6 py-2.5 text-xs flex items-center gap-2 cursor-pointer shadow-sm"
                    >
                      <span className="material-symbols-outlined text-[16px]">receipt_long</span>
                      <span>Submit Bank Transfer Slip</span>
                    </button>
                  </div>
                </div>
              )}

              {/* STAGE C: Payment Pending Review */}
              {activeArrangement.status === 'PAYMENT_PENDING' && (
                <div className="bg-white rounded-3xl p-6 border border-[#ffe082] shadow-2xs space-y-2 bg-[#fffdf5]">
                  <div className="flex items-center gap-2 font-['Quicksand'] font-bold text-sm text-[#725c06]">
                    <span className="material-symbols-outlined text-[18px]">hourglass_top</span>
                    <span>Payment Verification In Progress</span>
                  </div>
                  <p className="text-xs text-[#534247] leading-relaxed">
                    Transfer reference <span className="font-mono font-bold text-[#22191b]">{activeArrangement.paymentTxRef}</span> ({activeArrangement.paymentMethod}) submitted on {new Date(activeArrangement.paymentSubmittedAt || '').toLocaleDateString()}. Admin verifies bank slips in real-time. Your actual start date will be decreed immediately upon verification.
                  </p>
                </div>
              )}

              {/* STAGE D: ACTIVE 1-MONTH PERIOD — Classes & Teacher Card */}
              {activeArrangement.status === 'TEACHING_ACTIVE' && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                  {/* Left Column: Faculty & 1-Month Period Specification (5 cols) */}
                  <div className="lg:col-span-5 space-y-6">
                    {/* Faculty Profile Card */}
                    <div className="bg-white rounded-3xl p-6 border border-[#fbeaec] shadow-sm space-y-4">
                      <div className="flex items-center justify-between pb-3 border-b border-[#f5e4e7]">
                        <span className="font-['Quicksand'] font-bold text-xs uppercase tracking-wider text-[#867277]">
                          Assigned Faculty
                        </span>
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-['Quicksand'] font-bold bg-[#a5d6a7]/20 text-[#1b5e20] border border-[#a5d6a7]/50">
                          Active Assigned
                        </span>
                      </div>

                      <div className="flex items-start gap-4">
                        <div className="w-14 h-14 rounded-2xl bg-[#964261] text-white flex items-center justify-center font-['Quicksand'] font-bold text-lg shrink-0 shadow-xs">
                          {activeArrangement.assignedTeacherAvatar || 'TT'}
                        </div>
                        <div className="space-y-1">
                          <h4 className="font-['Quicksand'] font-bold text-base text-[#22191b]">
                            {activeArrangement.assignedTeacherName}
                          </h4>
                          <p className="text-xs text-[#964261] font-semibold">
                            {activeArrangement.assignedTeacherSpecialty}
                          </p>
                          <p className="text-[11px] text-[#534247] pt-1">
                            {activeArrangement.assignedTeacherBio}
                          </p>
                        </div>
                      </div>

                      {/* Schedule Summary */}
                      <div className="p-3.5 rounded-2xl bg-[#fff8f8] border border-[#fbeaec] text-xs space-y-1.5 font-['Quicksand']">
                        <div className="flex justify-between">
                          <span className="text-[#867277]">Confirmed Days:</span>
                          <span className="font-bold text-[#22191b]">
                            {activeArrangement.confirmedSchedule?.dayOfWeek}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-[#867277]">Time Slot:</span>
                          <span className="font-bold text-[#22191b]">
                            {activeArrangement.confirmedSchedule?.timeSlot}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-[#867277]">Duration:</span>
                          <span className="font-bold text-[#22191b]">60 Minutes / Session</span>
                        </div>
                      </div>
                    </div>

                    {/* Dynamic 1-Month Period Card */}
                    <div className="bg-white rounded-3xl p-6 border border-[#fbeaec] shadow-sm space-y-4">
                      <div className="flex items-center justify-between pb-3 border-b border-[#f5e4e7]">
                        <span className="font-['Quicksand'] font-bold text-xs uppercase tracking-wider text-[#867277]">
                          Teaching Period Duration
                        </span>
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-['Quicksand'] font-bold bg-[#81d4fa]/20 text-[#005d79]">
                          1 Calendar Month
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-3 text-xs font-['Quicksand']">
                        <div className="p-3 rounded-2xl bg-[#fff9f9] border border-[#f5e4e7] space-y-0.5">
                          <span className="text-[10px] text-[#867277] uppercase font-bold">Actual Start Date</span>
                          <span className="text-sm font-bold text-[#22191b] block">
                            {activeArrangement.actualStartDate || 'Oct 05, 2026'}
                          </span>
                        </div>
                        <div className="p-3 rounded-2xl bg-[#fff9f9] border border-[#f5e4e7] space-y-0.5">
                          <span className="text-[10px] text-[#867277] uppercase font-bold">Concludes On</span>
                          <span className="text-sm font-bold text-[#22191b] block">
                            {activeArrangement.endDate || 'Nov 05, 2026'}
                          </span>
                        </div>
                      </div>

                      {/* Request Reschedule / Cancel Triggers */}
                      <div className="pt-2 flex items-center justify-between gap-2 text-xs font-['Quicksand'] font-bold">
                        <button
                          type="button"
                          onClick={() => setRescheduleModalArrangement(activeArrangement)}
                          className="flex-1 py-2 rounded-full bg-[#f5e4e7] hover:bg-[#efdfe1] text-[#22191b] transition-colors cursor-pointer text-center"
                        >
                          Request Reschedule
                        </button>
                        <button
                          type="button"
                          onClick={() => setCancellationModalArrangement(activeArrangement)}
                          className="py-2 px-3 rounded-full hover:bg-[#ffdad6]/40 text-[#ba1a1a] transition-colors cursor-pointer text-center"
                        >
                          Cancel Period
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Recurring Classes Matrix (7 cols) */}
                  <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-7 border border-[#fbeaec] shadow-sm space-y-4">
                    <div className="flex items-center justify-between pb-3 border-b border-[#f5e4e7]">
                      <div>
                        <h3 className="font-['Quicksand'] font-bold text-base text-[#22191b]">
                          Recurring Class Schedule (8 Clinics)
                        </h3>
                        <p className="text-xs text-[#534247] mt-0.5">
                          Viewer-local calendar appointments synced with Teacher Theint platform schedule.
                        </p>
                      </div>
                      <span className="px-3 py-1 rounded-full bg-[#fff0f2] text-[#964261] text-xs font-['Quicksand'] font-bold border border-[#f5e4e7]">
                        {activeArrangement.sessions.filter((s) => s.status === 'COMPLETED').length} / {activeArrangement.sessions.length} Completed
                      </span>
                    </div>

                    <div className="space-y-3">
                      {activeArrangement.sessions.map((session) => (
                        <div
                          key={session.id}
                          className={`p-4 rounded-2xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                            session.status === 'COMPLETED'
                              ? 'bg-[#f5e4e7]/20 border-[#d8c1c6]/50 opacity-75'
                              : session.sessionNumber === 2
                              ? 'bg-[#fff0f2] border-[#f48fb1]/60 shadow-xs'
                              : 'bg-white border-[#f5e4e7] hover:border-[#f48fb1]/40'
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            <div
                              className={`w-9 h-9 rounded-xl flex items-center justify-center font-['Quicksand'] font-bold text-xs shrink-0 ${
                                session.status === 'COMPLETED'
                                  ? 'bg-[#a5d6a7]/30 text-[#1b5e20]'
                                  : 'bg-[#964261] text-white shadow-xs'
                              }`}
                            >
                              #{session.sessionNumber}
                            </div>
                            <div className="space-y-0.5">
                              <span className="font-['Quicksand'] font-bold text-xs text-[#22191b] block">
                                {session.lessonTopic}
                              </span>
                              <div className="flex items-center gap-2 text-[11px] text-[#534247]">
                                <span className="font-semibold">{session.dateStr}</span>
                                <span>•</span>
                                <span>{session.timeStr}</span>
                              </div>
                            </div>
                          </div>

                          <div className="self-end sm:self-center shrink-0">
                            {session.status === 'COMPLETED' ? (
                              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-['Quicksand'] font-bold bg-[#a5d6a7]/20 text-[#1b5e20]">
                                Attended
                              </span>
                            ) : session.sessionNumber === 2 ? (
                              <button
                                type="button"
                                onClick={() => showToast('Entering Live Coaching Room with Teacher Theint... (10 min prior unlock)')}
                                className="btn-tactile-primary px-4 py-1.5 text-xs font-['Quicksand'] cursor-pointer shadow-xs"
                              >
                                Join Session
                              </button>
                            ) : (
                              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-['Quicksand'] font-bold bg-[#f5e4e7] text-[#534247]">
                                Upcoming
                              </span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 2: SUBMIT ONE-ON-ONE REQUEST FORM                                     */}
      {/* ========================================================================= */}
      {activeTab === 'REQUEST_FORM' && (
        <div className="max-w-3xl mx-auto bg-white rounded-3xl p-6 sm:p-9 border border-[#fbeaec] shadow-sm space-y-6">
          <div className="border-b border-[#f5e4e7] pb-4 space-y-1">
            <h3 className="text-xl font-['Quicksand'] font-bold text-[#22191b]">
              Submit New One-on-One Teaching Request
            </h3>
            <p className="text-xs text-[#534247]">
              Provide your objective and target availability. Academic Administration will evaluate faculty matching and propose confirmed weekly slots.
            </p>
          </div>

          <form onSubmit={handleSubmitRequest} className="space-y-5 text-xs">
            {/* Student Decreed Level Info */}
            <div className="p-3.5 rounded-2xl bg-[#fff0f2] border border-[#f5e4e7] flex items-center justify-between">
              <div>
                <span className="text-[11px] text-[#867277] block font-semibold">Learner Identity &amp; Standing:</span>
                <span className="font-['Quicksand'] font-bold text-sm text-[#22191b]">
                  {studentName} ({studentId}) • Official Standing: {studentLevel}
                </span>
              </div>
              <span className="px-2.5 py-0.5 rounded-full bg-white text-[#964261] text-[10px] font-bold border border-[#f5e4e7]">
                Verified
              </span>
            </div>

            {/* Learning Goal */}
            <div className="space-y-1.5">
              <label className="font-['Quicksand'] font-bold text-[#22191b] block">
                Primary Learning Goal *
              </label>
              <input
                type="text"
                required
                value={learningGoal}
                onChange={(e) => setLearningGoal(e.target.value)}
                placeholder="e.g. IELTS Speaking 7.5 Oral Diagnostics, Executive Business Meetings"
                className="w-full px-4 py-2.5 rounded-2xl bg-[#fff8f8] border border-[#fbeaec] text-xs focus:outline-none focus:ring-2 focus:ring-[#f48fb1]/50 text-[#22191b]"
              />
            </div>

            {/* Specific Learning Needs */}
            <div className="space-y-1.5">
              <label className="font-['Quicksand'] font-bold text-[#22191b] block">
                Specific Learning Needs &amp; Problem Areas
              </label>
              <textarea
                rows={3}
                value={learningNeeds}
                onChange={(e) => setLearningNeeds(e.target.value)}
                placeholder="Describe pronunciation habits, syntactic hesitation, or conversational turn-taking issues..."
                className="w-full px-4 py-2.5 rounded-2xl bg-[#fff8f8] border border-[#fbeaec] text-xs focus:outline-none focus:ring-2 focus:ring-[#f48fb1]/50 text-[#22191b]"
              />
            </div>

            {/* Preferred Days & Times (Grid) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="font-['Quicksand'] font-bold text-[#22191b] block">
                  Preferred Days
                </label>
                <select
                  value={preferredDays}
                  onChange={(e) => setPreferredDays(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-2xl bg-[#fff8f8] border border-[#fbeaec] text-xs text-[#22191b] focus:outline-none focus:ring-2 focus:ring-[#f48fb1]/50"
                >
                  <option value="Monday & Wednesday">Monday &amp; Wednesday</option>
                  <option value="Tuesday & Thursday">Tuesday &amp; Thursday</option>
                  <option value="Friday & Saturday">Friday &amp; Saturday</option>
                  <option value="Saturday & Sunday">Saturday &amp; Sunday (Weekend)</option>
                  <option value="Flexible Weekday">Flexible Weekday Evenings</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="font-['Quicksand'] font-bold text-[#22191b] block">
                  Preferred Time Range (Local Time)
                </label>
                <select
                  value={preferredTimeRange}
                  onChange={(e) => setPreferredTimeRange(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-2xl bg-[#fff8f8] border border-[#fbeaec] text-xs text-[#22191b] focus:outline-none focus:ring-2 focus:ring-[#f48fb1]/50"
                >
                  <option value="07:00 PM – 08:00 PM">07:00 PM – 08:00 PM</option>
                  <option value="08:00 PM – 09:00 PM">08:00 PM – 09:00 PM</option>
                  <option value="06:00 PM – 07:00 PM">06:00 PM – 07:00 PM</option>
                  <option value="10:00 AM – 11:00 AM">10:00 AM – 11:00 AM (Morning)</option>
                  <option value="02:00 PM – 03:00 PM">02:00 PM – 03:00 PM (Afternoon)</option>
                </select>
              </div>
            </div>

            {/* Additional Student Notes */}
            <div className="space-y-1.5">
              <label className="font-['Quicksand'] font-bold text-[#22191b] block">
                Additional Notes for Admin
              </label>
              <input
                type="text"
                value={studentNotes}
                onChange={(e) => setStudentNotes(e.target.value)}
                placeholder="e.g. Taking official IELTS in December, prefer intensive oral pace"
                className="w-full px-4 py-2.5 rounded-2xl bg-[#fff8f8] border border-[#fbeaec] text-xs focus:outline-none focus:ring-2 focus:ring-[#f48fb1]/50 text-[#22191b]"
              />
            </div>

            <div className="pt-4 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setActiveTab('ACTIVE')}
                className="px-5 py-2.5 rounded-full bg-[#f5e4e7] hover:bg-[#efdfe1] text-[#22191b] font-['Quicksand'] font-bold transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={submittingRequest}
                className="btn-tactile-primary px-7 py-2.5 font-['Quicksand'] text-xs flex items-center gap-2 cursor-pointer shadow-sm"
              >
                <span className="material-symbols-outlined text-[16px]">send</span>
                <span>{submittingRequest ? 'Submitting...' : 'Submit One-on-One Request'}</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 3: SCHEDULE HISTORY & ARCHIVE (Preserves all past records)             */}
      {/* ========================================================================= */}
      {activeTab === 'HISTORY' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#fbeaec] shadow-sm space-y-6">
          <div className="border-b border-[#f5e4e7] pb-3 space-y-1">
            <h3 className="font-['Quicksand'] font-bold text-base text-[#22191b]">
              One-on-One Audit Log &amp; Historical Trajectory
            </h3>
            <p className="text-xs text-[#534247]">
              Immutable schedule changes, admin assignment stamps, and payment confirmations.
            </p>
          </div>

          {activeArrangement?.scheduleHistory && activeArrangement.scheduleHistory.length > 0 ? (
            <div className="space-y-3">
              {activeArrangement.scheduleHistory.map((h, i) => (
                <div
                  key={i}
                  className="p-4 rounded-2xl bg-[#fff9f9] border border-[#f5e4e7] text-xs space-y-1"
                >
                  <div className="flex items-center justify-between font-['Quicksand']">
                    <span className="font-bold text-[#964261]">{h.changedBy}</span>
                    <span className="text-[#867277]">{new Date(h.timestamp).toLocaleString()}</span>
                  </div>
                  <p className="text-[#22191b] font-medium">{h.summary}</p>
                  <div className="pt-1 flex items-center gap-2 text-[11px] text-[#534247] font-mono">
                    <span className="line-through">{h.previousSchedule}</span>
                    <span>→</span>
                    <span className="font-bold text-[#1b5e20]">{h.newSchedule}</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-xs text-[#534247]">
              No historical events recorded for current session.
            </div>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL: SUBMIT PAYMENT SLIP                                                */}
      {/* ========================================================================= */}
      {paymentModalArrangement && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-7 shadow-2xl border border-[#d8c1c6]/80 space-y-4 font-['Nunito_Sans']">
            <div className="flex items-center justify-between pb-3 border-b border-[#f5e4e7]">
              <div className="flex items-center gap-2.5">
                <span className="material-symbols-outlined text-[#964261]">receipt_long</span>
                <h3 className="font-['Quicksand'] font-bold text-base text-[#22191b]">
                  Tuition Payment Submission
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setPaymentModalArrangement(null)}
                className="w-8 h-8 rounded-full hover:bg-[#fff0f2] text-[#534247] flex items-center justify-center cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>

            <div className="p-4 rounded-2xl bg-[#fff0f2] border border-[#f5e4e7] space-y-1.5 text-xs">
              <div className="flex justify-between font-['Quicksand'] font-bold">
                <span className="text-[#867277]">Payable Item:</span>
                <span className="text-[#22191b]">1-Month One-on-One Mentorship</span>
              </div>
              <div className="flex justify-between font-['Quicksand'] font-bold">
                <span className="text-[#867277]">Assigned Faculty:</span>
                <span className="text-[#964261]">{paymentModalArrangement.assignedTeacherName}</span>
              </div>
              <div className="flex justify-between font-['Quicksand'] font-bold pt-1 border-t border-[#f5e4e7]">
                <span className="text-[#867277]">Payable Amount:</span>
                <span className="text-base text-[#964261]">
                  {paymentModalArrangement.paymentAmountMmK.toLocaleString()} MMK
                </span>
              </div>
            </div>

            <form onSubmit={handleSubmitPayment} className="space-y-4 text-xs">
              {/* Payment Method Selector */}
              <div className="space-y-1.5">
                <label className="font-['Quicksand'] font-bold text-[#22191b] block">
                  Select Official Payment Channel
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setSelectedPaymentMethod('KBZ Pay')}
                    className={`p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                      selectedPaymentMethod === 'KBZ Pay'
                        ? 'bg-[#81d4fa]/20 border-[#006685] ring-2 ring-[#006685]/30'
                        : 'bg-[#fff8f8] border-[#fbeaec]'
                    }`}
                  >
                    <span className="font-['Quicksand'] font-bold text-xs text-[#006685] block">
                      KBZ Pay
                    </span>
                    <span className="text-[11px] text-[#534247]">09-420-112-998</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSelectedPaymentMethod('Wave Pay')}
                    className={`p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                      selectedPaymentMethod === 'Wave Pay'
                        ? 'bg-[#ffe082]/30 border-[#725c06] ring-2 ring-[#725c06]/30'
                        : 'bg-[#fff8f8] border-[#fbeaec]'
                    }`}
                  >
                    <span className="font-['Quicksand'] font-bold text-xs text-[#725c06] block">
                      Wave Pay
                    </span>
                    <span className="text-[11px] text-[#534247]">09-798-223-110</span>
                  </button>
                </div>
              </div>

              {/* Transaction Ref Number */}
              <div className="space-y-1.5">
                <label className="font-['Quicksand'] font-bold text-[#22191b] block">
                  Bank Transaction / Slip Reference No. *
                </label>
                <input
                  type="text"
                  required
                  value={paymentTxRef}
                  onChange={(e) => setPaymentTxRef(e.target.value)}
                  placeholder="e.g. KBZ-89210-9981 or Wave TxID"
                  className="w-full px-4 py-2.5 rounded-2xl bg-[#fff8f8] border border-[#fbeaec] text-xs focus:outline-none focus:ring-2 focus:ring-[#f48fb1]/50 text-[#22191b] font-mono"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setPaymentModalArrangement(null)}
                  className="px-4 py-2 rounded-full bg-[#f5e4e7] hover:bg-[#efdfe1] text-[#22191b] font-['Quicksand'] font-bold transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-tactile-primary px-6 py-2 rounded-full font-['Quicksand'] font-bold text-xs cursor-pointer shadow-xs"
                >
                  Confirm &amp; Submit Slip
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL: RESCHEDULE REQUEST                                                 */}
      {/* ========================================================================= */}
      {rescheduleModalArrangement && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-[#d8c1c6]/80 space-y-4 font-['Nunito_Sans']">
            <div className="flex items-center justify-between pb-3 border-b border-[#f5e4e7]">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#006685]">update</span>
                <h3 className="font-['Quicksand'] font-bold text-base text-[#22191b]">
                  Request Schedule Modification
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setRescheduleModalArrangement(null)}
                className="w-8 h-8 rounded-full hover:bg-[#fff0f2] text-[#534247] flex items-center justify-center cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>

            <p className="text-xs text-[#534247]">
              Reschedule requests are audited and reviewed by Admin to safeguard faculty availability.
            </p>

            <form onSubmit={handleSendRescheduleRequest} className="space-y-4 text-xs">
              <div className="space-y-1.5">
                <label className="font-['Quicksand'] font-bold text-[#22191b] block">
                  Proposed New Days &amp; Time
                </label>
                <input
                  type="text"
                  required
                  value={rescheduleSlotInput}
                  onChange={(e) => setRescheduleSlotInput(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-2xl bg-[#fff8f8] border border-[#fbeaec] text-xs text-[#22191b]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-['Quicksand'] font-bold text-[#22191b] block">
                  Reason for Adjustment *
                </label>
                <textarea
                  rows={3}
                  required
                  value={rescheduleReasonInput}
                  onChange={(e) => setRescheduleReasonInput(e.target.value)}
                  placeholder="e.g. Schedule conflict with evening office project, need weekend morning slots"
                  className="w-full px-4 py-2.5 rounded-2xl bg-[#fff8f8] border border-[#fbeaec] text-xs text-[#22191b]"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setRescheduleModalArrangement(null)}
                  className="px-4 py-2 rounded-full bg-[#f5e4e7] hover:bg-[#efdfe1] text-[#22191b] font-['Quicksand'] font-bold cursor-pointer"
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="btn-tactile-primary px-5 py-2 rounded-full font-['Quicksand'] font-bold cursor-pointer"
                >
                  Submit Reschedule Request
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL: CANCELLATION REQUEST                                               */}
      {/* ========================================================================= */}
      {cancellationModalArrangement && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-[#d8c1c6]/80 space-y-4 font-['Nunito_Sans']">
            <div className="flex items-center justify-between pb-3 border-b border-[#f5e4e7]">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#ba1a1a]">cancel</span>
                <h3 className="font-['Quicksand'] font-bold text-base text-[#22191b]">
                  Request Period Cancellation
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setCancellationModalArrangement(null)}
                className="w-8 h-8 rounded-full hover:bg-[#fff0f2] text-[#534247] flex items-center justify-center cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>

            <p className="text-xs text-[#534247]">
              One-on-One arrangements are preserved historically. Cancellation requests must be verified by Admin.
            </p>

            <form onSubmit={handleSendCancellationRequest} className="space-y-4 text-xs">
              <div className="space-y-1.5">
                <label className="font-['Quicksand'] font-bold text-[#22191b] block">
                  Cancellation Reason *
                </label>
                <textarea
                  rows={3}
                  required
                  value={cancellationReasonInput}
                  onChange={(e) => setCancellationReasonInput(e.target.value)}
                  placeholder="Provide context regarding cancellation..."
                  className="w-full px-4 py-2.5 rounded-2xl bg-[#fff8f8] border border-[#fbeaec] text-xs text-[#22191b]"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setCancellationModalArrangement(null)}
                  className="px-4 py-2 rounded-full bg-[#f5e4e7] hover:bg-[#efdfe1] text-[#22191b] font-['Quicksand'] font-bold cursor-pointer"
                >
                  Keep Active
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-full bg-[#ba1a1a] hover:bg-[#961212] text-white font-['Quicksand'] font-bold cursor-pointer shadow-xs"
                >
                  Submit Cancellation Request
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
