/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Teacher Theint English — Admin One-on-One Dedicated Operational Console Component
 * 
 * ROLE CONTEXT:
 * Admin is the workflow owner and central operational authority.
 * Admin RESPONSIBILITIES:
 * 1. View incoming One-on-One requests.
 * 2. Select/assign an appropriate Teacher from available faculty (Admin-only).
 * 3. Manage schedule negotiation and confirm weekly schedule slots.
 * 4. Review payment submission (KBZ Pay / Wave Pay) and approve/reject slips.
 * 5. Establish actual start date (dynamic 1-calendar-month calculation).
 * 6. Monitor active recurring classes across all students.
 * 7. Handle cancellation and reschedule requests with preserved audit history.
 */

import React, { useState, useEffect } from 'react';
import {
  OneOnOneArrangement,
  OneOnOneWorkflowStatus,
  AVAILABLE_TEACHERS,
  AvailableTeacher,
  RecurringSlot,
} from '../../../types/oneOnOne';
import { oneOnOneStore } from '../../../types/oneOnOneStore';

interface AdminOneOnOneViewProps {
  showSpecGuides?: boolean;
}

export const AdminOneOnOneView: React.FC<AdminOneOnOneViewProps> = ({
  showSpecGuides = false,
}) => {
  const [arrangements, setArrangements] = useState<OneOnOneArrangement[]>([]);
  const [filterStatus, setFilterStatus] = useState<string>('ALL');
  const [selectedArrangement, setSelectedArrangement] = useState<OneOnOneArrangement | null>(null);

  // Modal States
  const [assignTeacherModalOpen, setAssignTeacherModalOpen] = useState(false);
  const [selectedTeacherId, setSelectedTeacherId] = useState<string>(AVAILABLE_TEACHERS[0].id);
  const [proposedDaysInput, setProposedDaysInput] = useState<string>('Monday & Wednesday');
  const [proposedTimeInput, setProposedTimeInput] = useState<string>('07:00 PM – 08:00 PM');

  const [paymentReviewModalArrangement, setPaymentReviewModalArrangement] = useState<OneOnOneArrangement | null>(null);
  const [actualStartDateInput, setActualStartDateInput] = useState<string>(
    new Date().toISOString().split('T')[0]
  );
  const [rejectionReasonInput, setRejectionReasonInput] = useState<string>('');

  const [rescheduleDecisionArrangement, setRescheduleDecisionArrangement] = useState<OneOnOneArrangement | null>(null);
  const [cancellationDecisionArrangement, setCancellationDecisionArrangement] = useState<OneOnOneArrangement | null>(null);

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3800);
  };

  useEffect(() => {
    const update = () => {
      const all = oneOnOneStore.getAll();
      setArrangements(all);
      if (!selectedArrangement && all.length > 0) {
        setSelectedArrangement(all[0]);
      } else if (selectedArrangement) {
        const refreshed = all.find((a) => a.id === selectedArrangement.id);
        if (refreshed) setSelectedArrangement(refreshed);
      }
    };
    update();
    return oneOnOneStore.subscribe(update);
  }, [selectedArrangement]);

  const filtered = arrangements.filter((a) => {
    if (filterStatus === 'ALL') return true;
    if (filterStatus === 'ACTION_NEEDED') {
      return (
        a.status === 'REQUEST_SUBMITTED' ||
        a.status === 'ADMIN_HANDLING' ||
        a.status === 'PAYMENT_PENDING' ||
        a.status === 'RESCHEDULE_REQUESTED' ||
        a.status === 'CANCELLATION_REQUESTED'
      );
    }
    if (filterStatus === 'ACTIVE') return a.status === 'TEACHING_ACTIVE';
    if (filterStatus === 'CONFIRMED') return a.status === 'SCHEDULE_CONFIRMED';
    return true;
  });

  // Action: Admin Assigns Teacher
  const handleConfirmTeacherAssignment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedArrangement) return;
    const teacher = AVAILABLE_TEACHERS.find((t) => t.id === selectedTeacherId);
    if (!teacher) return;

    oneOnOneStore.adminAssignTeacher(
      selectedArrangement.id,
      {
        id: teacher.id,
        name: teacher.name,
        avatar: teacher.avatar,
        bio: `${teacher.title} • ${teacher.experience}`,
        specialty: teacher.specialty,
      },
      {
        dayOfWeek: proposedDaysInput,
        timeSlot: proposedTimeInput,
        durationMinutes: 60,
      }
    );

    setAssignTeacherModalOpen(false);
    showToast(`Assigned ${teacher.name} to ${selectedArrangement.studentName}. Schedule negotiation opened.`);
  };

  // Action: Admin Approves Payment Slip
  const handleApprovePaymentSlip = () => {
    if (!paymentReviewModalArrangement) return;
    oneOnOneStore.adminApprovePayment(
      paymentReviewModalArrangement.id,
      actualStartDateInput
    );
    setPaymentReviewModalArrangement(null);
    showToast(`Payment approved! Actual Start Date recorded as ${actualStartDateInput}. 1-Month Teaching Period Active.`);
  };

  // Action: Admin Rejects Payment Slip
  const handleRejectPaymentSlip = () => {
    if (!paymentReviewModalArrangement) return;
    if (!rejectionReasonInput.trim()) {
      showToast('Please provide a reason for rejecting the transfer slip.');
      return;
    }
    oneOnOneStore.adminRejectPayment(
      paymentReviewModalArrangement.id,
      rejectionReasonInput.trim()
    );
    setPaymentReviewModalArrangement(null);
    setRejectionReasonInput('');
    showToast('Payment slip marked as rejected. Requested resubmission from learner.');
  };

  // Action: Admin Decides Reschedule Request
  const handleApproveReschedule = (approved: boolean) => {
    if (!rescheduleDecisionArrangement) return;
    oneOnOneStore.adminDecideReschedule(
      rescheduleDecisionArrangement.id,
      approved,
      approved
        ? {
            dayOfWeek: rescheduleDecisionArrangement.requestedNewSchedule?.split('•')[0]?.trim() || 'Updated Slot',
            timeSlot: rescheduleDecisionArrangement.requestedNewSchedule?.split('•')[1]?.trim() || '07:00 PM – 08:00 PM',
            durationMinutes: 60,
          }
        : undefined
    );
    setRescheduleDecisionArrangement(null);
    showToast(approved ? 'Reschedule request approved. Updated schedule active.' : 'Reschedule request declined.');
  };

  // Action: Admin Decides Cancellation Request
  const handleApproveCancellation = (approved: boolean) => {
    if (!cancellationDecisionArrangement) return;
    oneOnOneStore.adminDecideCancellation(
      cancellationDecisionArrangement.id,
      approved
    );
    setCancellationDecisionArrangement(null);
    showToast(approved ? 'Cancellation approved. Arrangement concluded with preserved audit history.' : 'Cancellation declined. Arrangement kept active.');
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

      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#f5e4e7]">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#fff0f2] border border-[#f5e4e7] text-xs text-[#964261] font-['Quicksand'] font-bold shadow-2xs">
            <span className="material-symbols-outlined text-[16px] text-[#f48fb1]">person_pin</span>
            <span>Operations &amp; Governance Center</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-['Quicksand'] font-bold tracking-tight text-[#22191b] pt-1">
            One-on-One Administrative Oversight Console
          </h2>
          <p className="text-sm text-[#534247]">
            Lifecycle authority: Faculty assignments, schedule negotiations, payment verification, and 1-month period monitoring.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 font-['Quicksand'] font-bold text-xs">
          <button
            type="button"
            onClick={() => setFilterStatus('ALL')}
            className={`px-3.5 py-1.5 rounded-full transition-all cursor-pointer ${
              filterStatus === 'ALL'
                ? 'bg-[#964261] text-white shadow-xs'
                : 'bg-white text-[#534247] hover:bg-[#fff0f2] border border-[#f5e4e7]'
            }`}
          >
            All ({arrangements.length})
          </button>
          <button
            type="button"
            onClick={() => setFilterStatus('ACTION_NEEDED')}
            className={`px-3.5 py-1.5 rounded-full transition-all cursor-pointer ${
              filterStatus === 'ACTION_NEEDED'
                ? 'bg-[#964261] text-white shadow-xs'
                : 'bg-white text-[#ba1a1a] hover:bg-[#ffdad6]/40 border border-[#f5e4e7]'
            }`}
          >
            Action Needed ({arrangements.filter((a) => a.status === 'REQUEST_SUBMITTED' || a.status === 'PAYMENT_PENDING' || a.status === 'RESCHEDULE_REQUESTED').length})
          </button>
          <button
            type="button"
            onClick={() => setFilterStatus('ACTIVE')}
            className={`px-3.5 py-1.5 rounded-full transition-all cursor-pointer ${
              filterStatus === 'ACTIVE'
                ? 'bg-[#964261] text-white shadow-xs'
                : 'bg-white text-[#1b5e20] hover:bg-[#a5d6a7]/20 border border-[#f5e4e7]'
            }`}
          >
            Active 1-Month ({arrangements.filter((a) => a.status === 'TEACHING_ACTIVE').length})
          </button>
        </div>
      </div>

      {/* Admin Architectural Invariant Badge */}
      <div className="p-4 rounded-3xl bg-gradient-to-r from-[#fff0f2] to-white border border-[#d8c1c6]/70 flex items-start gap-3.5 shadow-2xs">
        <div className="w-10 h-10 rounded-2xl bg-[#964261] text-white flex items-center justify-center shrink-0 shadow-xs">
          <span className="material-symbols-outlined text-[20px]">gavel</span>
        </div>
        <div className="text-xs space-y-1">
          <span className="font-bold font-['Quicksand'] text-[#22191b] block">
            Core Authority Invariant: Admin Owns the One-on-One Workflow
          </span>
          <p className="text-[#534247] leading-relaxed">
            <span className="font-semibold text-[#964261]">Request → Teacher Assignment → Schedule Negotiation → Schedule Confirmed → Payment → Actual Start Date → 1 Calendar Month.</span>{' '}
            Students cannot book teachers independently. Payment is unlocked only after schedule confirmation. Payment does not create course enrollment.
          </p>
        </div>
      </div>

      {/* Main Two-Column Console Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Arrangements Queue Registry (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex items-center justify-between px-1">
            <span className="font-['Quicksand'] font-bold text-xs uppercase tracking-wider text-[#867277]">
              Arrangements Registry ({filtered.length})
            </span>
            <span className="text-xs text-[#867277]">Sort: Newest First</span>
          </div>

          <div className="space-y-3">
            {filtered.map((item) => {
              const isSelected = selectedArrangement?.id === item.id;
              return (
                <div
                  key={item.id}
                  onClick={() => setSelectedArrangement(item)}
                  className={`p-4 rounded-3xl border transition-all cursor-pointer shadow-2xs ${
                    isSelected
                      ? 'bg-white border-[#f48fb1] ring-2 ring-[#f48fb1]/30 shadow-sm'
                      : 'bg-white border-[#f5e4e7] hover:bg-[#fff9f9]'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-2xl bg-[#964261] text-white flex items-center justify-center font-['Quicksand'] font-bold text-sm shadow-xs shrink-0">
                        {item.studentAvatar}
                      </div>
                      <div className="min-w-0">
                        <span className="font-['Quicksand'] font-bold text-sm text-[#22191b] block truncate">
                          {item.studentName}
                        </span>
                        <span className="text-[11px] text-[#534247] block truncate">
                          {item.studentLevel} • #{item.code}
                        </span>
                      </div>
                    </div>

                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-['Quicksand'] font-bold shrink-0 ${
                        item.status === 'REQUEST_SUBMITTED'
                          ? 'bg-[#ffe082]/40 text-[#725c06] border border-[#ffe082]'
                          : item.status === 'PAYMENT_PENDING'
                          ? 'bg-[#81d4fa]/25 text-[#005d79] border border-[#81d4fa]'
                          : item.status === 'TEACHING_ACTIVE'
                          ? 'bg-[#a5d6a7]/25 text-[#1b5e20] border border-[#a5d6a7]'
                          : 'bg-[#fff0f2] text-[#964261]'
                      }`}
                    >
                      {item.status.replace('_', ' ')}
                    </span>
                  </div>

                  <p className="mt-2 text-[11px] text-[#534247] line-clamp-1 font-['Nunito_Sans']">
                    Goal: {item.learningGoal}
                  </p>

                  <div className="mt-3 pt-2.5 border-t border-[#f5e4e7] flex items-center justify-between text-[11px]">
                    <span className="text-[#867277]">
                      Faculty: <strong className="text-[#22191b]">{item.assignedTeacherName || 'Unassigned'}</strong>
                    </span>
                    <span className="font-semibold text-[#964261] font-['Quicksand']">
                      {item.paymentAmountMmK.toLocaleString()} MMK
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Arrangement Operational Inspector & Action Matrix (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {selectedArrangement ? (
            <div className="space-y-6">
              {/* Main Inspector Card */}
              <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#fbeaec] shadow-sm space-y-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#f5e4e7]">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-[#964261] text-white flex items-center justify-center font-['Quicksand'] font-bold text-base shadow-xs">
                      {selectedArrangement.studentAvatar}
                    </div>
                    <div>
                      <h3 className="font-['Quicksand'] font-bold text-lg text-[#22191b]">
                        {selectedArrangement.studentName} • #{selectedArrangement.code}
                      </h3>
                      <p className="text-xs text-[#534247]">
                        Learner ID: {selectedArrangement.studentId} • Standing: <strong className="text-[#964261]">{selectedArrangement.studentLevel}</strong>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-[#867277] bg-[#fff8f8] px-3 py-1 rounded-full border border-[#f5e4e7]">
                      Status: {selectedArrangement.status}
                    </span>
                  </div>
                </div>

                {/* Student Request Requirements Brief */}
                <div className="p-4 rounded-2xl bg-[#fff8f8] border border-[#fbeaec] space-y-3 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-['Quicksand'] font-bold text-[#22191b] uppercase tracking-wider text-[11px]">
                      Student Request Specification
                    </span>
                    <span className="text-[11px] text-[#867277]">
                      Submitted: {new Date(selectedArrangement.submittedAt).toLocaleString()}
                    </span>
                  </div>

                  <div className="space-y-1">
                    <span className="font-bold text-[#22191b]">Primary Goal:</span>
                    <p className="text-[#534247]">{selectedArrangement.learningGoal}</p>
                  </div>

                  <div className="space-y-1">
                    <span className="font-bold text-[#22191b]">Specific Needs:</span>
                    <p className="text-[#534247]">{selectedArrangement.learningNeeds || 'None specified.'}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-3 pt-1 border-t border-[#fbeaec]">
                    <div>
                      <span className="text-[#867277] block text-[10px] font-bold uppercase">Preferred Days</span>
                      <span className="font-bold text-[#22191b] font-['Quicksand']">{selectedArrangement.preferredDays}</span>
                    </div>
                    <div>
                      <span className="text-[#867277] block text-[10px] font-bold uppercase">Preferred Time Slot</span>
                      <span className="font-bold text-[#22191b] font-['Quicksand']">{selectedArrangement.preferredTimeRange}</span>
                    </div>
                  </div>
                </div>

                {/* ACTION GATEWAYS BASED ON LIFECYCLE */}
                {/* 1. If Request Unassigned -> Assign Teacher Button */}
                {(selectedArrangement.status === 'REQUEST_SUBMITTED' ||
                  selectedArrangement.status === 'ADMIN_HANDLING') && (
                  <div className="p-4 rounded-2xl bg-[#fff0f2] border border-[#f48fb1]/60 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <span className="font-['Quicksand'] font-bold text-sm text-[#964261] block">
                          Step 1: Faculty Assignment Required
                        </span>
                        <p className="text-xs text-[#534247]">
                          Select qualified faculty from the academic roster and propose recurring weekly slots.
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          setProposedDaysInput(selectedArrangement.preferredDays);
                          setProposedTimeInput(selectedArrangement.preferredTimeRange);
                          setAssignTeacherModalOpen(true);
                        }}
                        className="btn-tactile-primary px-5 py-2.5 text-xs font-['Quicksand'] font-bold flex items-center gap-2 cursor-pointer shadow-sm"
                      >
                        <span className="material-symbols-outlined text-[16px]">person_add</span>
                        <span>Assign Faculty</span>
                      </button>
                    </div>
                  </div>
                )}

                {/* 2. If Payment Pending -> Verify Bank Slip Button */}
                {selectedArrangement.status === 'PAYMENT_PENDING' && (
                  <div className="p-4 rounded-2xl bg-[#fffdf5] border border-[#ffe082] space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <span className="font-['Quicksand'] font-bold text-sm text-[#725c06] block">
                          Step 2: Bank Transfer Slip Verification
                        </span>
                        <p className="text-xs text-[#534247]">
                          Learner uploaded payment reference ({selectedArrangement.paymentTxRef}). Review proof and decree start date.
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => setPaymentReviewModalArrangement(selectedArrangement)}
                        className="btn-tactile-primary px-5 py-2.5 text-xs font-['Quicksand'] font-bold flex items-center gap-2 cursor-pointer shadow-sm"
                      >
                        <span className="material-symbols-outlined text-[16px]">receipt_long</span>
                        <span>Review Payment Slip</span>
                      </button>
                    </div>
                  </div>
                )}

                {/* 3. If Reschedule Requested -> Reschedule Decision Button */}
                {selectedArrangement.status === 'RESCHEDULE_REQUESTED' && (
                  <div className="p-4 rounded-2xl bg-[#81d4fa]/15 border border-[#81d4fa] space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <span className="font-['Quicksand'] font-bold text-sm text-[#006685] block">
                          Action: Reschedule Request Pending Decision
                        </span>
                        <p className="text-xs text-[#534247]">
                          Learner requested new slot: <strong>{selectedArrangement.requestedNewSchedule}</strong>. Reason: {selectedArrangement.rescheduleReason}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => setRescheduleDecisionArrangement(selectedArrangement)}
                        className="btn-tactile-primary px-5 py-2 text-xs font-['Quicksand'] font-bold cursor-pointer shadow-xs"
                      >
                        Review Reschedule
                      </button>
                    </div>
                  </div>
                )}

                {/* 4. If Cancellation Requested -> Cancellation Decision Button */}
                {selectedArrangement.status === 'CANCELLATION_REQUESTED' && (
                  <div className="p-4 rounded-2xl bg-[#ffdad6]/20 border border-[#ba1a1a]/40 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <span className="font-['Quicksand'] font-bold text-sm text-[#ba1a1a] block">
                          Action: Cancellation Request Pending Decision
                        </span>
                        <p className="text-xs text-[#534247]">
                          Reason: {selectedArrangement.cancellationReason}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => setCancellationDecisionArrangement(selectedArrangement)}
                        className="px-5 py-2 rounded-full bg-[#ba1a1a] hover:bg-[#961212] text-white text-xs font-['Quicksand'] font-bold cursor-pointer shadow-xs"
                      >
                        Review Cancellation
                      </button>
                    </div>
                  </div>
                )}

                {/* Active Assignment Dossier Details */}
                {selectedArrangement.assignedTeacherName && (
                  <div className="p-4 rounded-2xl bg-white border border-[#d8c1c6]/70 space-y-3 text-xs">
                    <div className="flex items-center justify-between pb-2 border-b border-[#f5e4e7]">
                      <span className="font-['Quicksand'] font-bold text-[#22191b] uppercase tracking-wider text-[11px]">
                        Faculty &amp; Schedule Details
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full bg-[#a5d6a7]/25 text-[#1b5e20] font-bold text-[10px]">
                        Assigned
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <span className="text-[#867277] text-[10px] uppercase font-bold block">Assigned Faculty</span>
                        <span className="font-['Quicksand'] font-bold text-sm text-[#22191b] block mt-0.5">
                          {selectedArrangement.assignedTeacherName}
                        </span>
                        <span className="text-[#534247] text-[11px]">{selectedArrangement.assignedTeacherSpecialty}</span>
                      </div>

                      <div>
                        <span className="text-[#867277] text-[10px] uppercase font-bold block">Confirmed Schedule</span>
                        <span className="font-['Quicksand'] font-bold text-sm text-[#22191b] block mt-0.5">
                          {selectedArrangement.confirmedSchedule?.dayOfWeek || selectedArrangement.preferredDays}
                        </span>
                        <span className="text-[#534247] text-[11px]">
                          {selectedArrangement.confirmedSchedule?.timeSlot || selectedArrangement.preferredTimeRange}
                        </span>
                      </div>
                    </div>

                    {selectedArrangement.actualStartDate && (
                      <div className="pt-2 border-t border-[#f5e4e7] flex items-center justify-between text-[11px]">
                        <span>
                          <strong>Actual Start Date:</strong> {selectedArrangement.actualStartDate}
                        </span>
                        <span>
                          <strong>1-Month Period Ends:</strong> {selectedArrangement.endDate}
                        </span>
                      </div>
                    )}
                  </div>
                )}

                {/* Audit & Schedule History */}
                <div className="space-y-2 pt-2 border-t border-[#f5e4e7]">
                  <span className="font-['Quicksand'] font-bold text-xs uppercase tracking-wider text-[#867277] block">
                    Preserved Operational Audit Log
                  </span>
                  <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                    {selectedArrangement.scheduleHistory.map((h, i) => (
                      <div key={i} className="p-3 rounded-xl bg-[#fff9f9] border border-[#f5e4e7] text-xs">
                        <div className="flex justify-between font-['Quicksand'] font-bold text-[#964261]">
                          <span>{h.changedBy}</span>
                          <span className="text-[10px] text-[#867277]">{new Date(h.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                        </div>
                        <p className="text-[11px] text-[#22191b] mt-0.5">{h.summary}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-3xl p-12 text-center text-xs text-[#534247] border border-[#fbeaec]">
              Select an arrangement from the registry to inspect operations.
            </div>
          )}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* MODAL: ADMIN ASSIGNS TEACHER                                              */}
      {/* ========================================================================= */}
      {assignTeacherModalOpen && selectedArrangement && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-7 shadow-2xl border border-[#d8c1c6]/80 space-y-4 font-['Nunito_Sans']">
            <div className="flex items-center justify-between pb-3 border-b border-[#f5e4e7]">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#964261]">person_add</span>
                <h3 className="font-['Quicksand'] font-bold text-base text-[#22191b]">
                  Assign Faculty &amp; Propose Slots
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setAssignTeacherModalOpen(false)}
                className="w-8 h-8 rounded-full hover:bg-[#fff0f2] text-[#534247] flex items-center justify-center cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>

            <p className="text-xs text-[#534247]">
              Student: <strong>{selectedArrangement.studentName}</strong> ({selectedArrangement.studentLevel})<br />
              Requested: {selectedArrangement.preferredDays} • {selectedArrangement.preferredTimeRange}
            </p>

            <form onSubmit={handleConfirmTeacherAssignment} className="space-y-4 text-xs">
              <div className="space-y-2">
                <label className="font-['Quicksand'] font-bold text-[#22191b] block">
                  Select Certified Faculty
                </label>
                <div className="space-y-2">
                  {AVAILABLE_TEACHERS.map((teacher) => {
                    const isSelected = selectedTeacherId === teacher.id;
                    return (
                      <div
                        key={teacher.id}
                        onClick={() => setSelectedTeacherId(teacher.id)}
                        className={`p-3.5 rounded-2xl border flex items-center justify-between gap-3 cursor-pointer transition-all ${
                          isSelected
                            ? 'bg-[#fff0f2] border-[#f48fb1] ring-2 ring-[#f48fb1]/30 shadow-xs'
                            : 'bg-[#fff8f8] border-[#fbeaec] hover:bg-white'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-[#964261] text-white flex items-center justify-center font-['Quicksand'] font-bold text-sm shadow-xs shrink-0">
                            {teacher.avatar}
                          </div>
                          <div>
                            <span className="font-['Quicksand'] font-bold text-xs text-[#22191b] block">
                              {teacher.name}
                            </span>
                            <span className="text-[11px] text-[#534247] block">
                              {teacher.specialty}
                            </span>
                          </div>
                        </div>

                        <span className="text-[11px] text-[#867277] shrink-0 font-medium">
                          {teacher.activeOneOnOneCount} Active
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Proposed Schedule Days & Times */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-['Quicksand'] font-bold text-[#22191b] block">
                    Proposed Days
                  </label>
                  <input
                    type="text"
                    value={proposedDaysInput}
                    onChange={(e) => setProposedDaysInput(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl bg-[#fff8f8] border border-[#fbeaec] text-xs text-[#22191b]"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-['Quicksand'] font-bold text-[#22191b] block">
                    Proposed Time (Local)
                  </label>
                  <input
                    type="text"
                    value={proposedTimeInput}
                    onChange={(e) => setProposedTimeInput(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl bg-[#fff8f8] border border-[#fbeaec] text-xs text-[#22191b]"
                  />
                </div>
              </div>

              <div className="pt-2 flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setAssignTeacherModalOpen(false)}
                  className="px-4 py-2 rounded-full bg-[#f5e4e7] hover:bg-[#efdfe1] text-[#22191b] font-['Quicksand'] font-bold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-tactile-primary px-6 py-2 rounded-full font-['Quicksand'] font-bold cursor-pointer shadow-xs"
                >
                  Confirm Assignment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL: ADMIN REVIEWS PAYMENT SLIP                                         */}
      {/* ========================================================================= */}
      {paymentReviewModalArrangement && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-7 shadow-2xl border border-[#d8c1c6]/80 space-y-4 font-['Nunito_Sans']">
            <div className="flex items-center justify-between pb-3 border-b border-[#f5e4e7]">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#964261]">verified</span>
                <h3 className="font-['Quicksand'] font-bold text-base text-[#22191b]">
                  Payment Slip Verification &amp; Start Date
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setPaymentReviewModalArrangement(null)}
                className="w-8 h-8 rounded-full hover:bg-[#fff0f2] text-[#534247] flex items-center justify-center cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>

            {/* Slip Evidence Mock Card */}
            <div className="p-4 rounded-2xl bg-[#fff8f8] border border-[#fbeaec] space-y-2 text-xs">
              <div className="flex justify-between font-['Quicksand'] font-bold">
                <span className="text-[#867277]">Learner Name:</span>
                <span className="text-[#22191b]">{paymentReviewModalArrangement.studentName}</span>
              </div>
              <div className="flex justify-between font-['Quicksand'] font-bold">
                <span className="text-[#867277]">Payment Channel:</span>
                <span className="text-[#964261]">{paymentReviewModalArrangement.paymentMethod || 'KBZ Pay'}</span>
              </div>
              <div className="flex justify-between font-['Quicksand'] font-bold">
                <span className="text-[#867277]">Reference / TxID:</span>
                <span className="font-mono text-[#22191b]">{paymentReviewModalArrangement.paymentTxRef}</span>
              </div>
              <div className="flex justify-between font-['Quicksand'] font-bold pt-1 border-t border-[#fbeaec]">
                <span className="text-[#867277]">Tuition Cleared:</span>
                <span className="text-base text-[#1b5e20]">
                  {paymentReviewModalArrangement.paymentAmountMmK.toLocaleString()} MMK
                </span>
              </div>
            </div>

            {/* Actual Start Date Selector */}
            <div className="space-y-1.5 text-xs">
              <label className="font-['Quicksand'] font-bold text-[#22191b] block">
                Official Actual Start Date (Locks 1-Calendar-Month Window) *
              </label>
              <input
                type="date"
                value={actualStartDateInput}
                onChange={(e) => setActualStartDateInput(e.target.value)}
                className="w-full px-4 py-2 rounded-xl bg-[#fff8f8] border border-[#fbeaec] text-xs font-['Quicksand'] text-[#22191b]"
              />
              <span className="text-[11px] text-[#534247]">
                The 1-month period runs dynamically from this date to exactly 1 calendar month later.
              </span>
            </div>

            {/* Optional Rejection Reason */}
            <div className="space-y-1.5 text-xs">
              <label className="font-['Quicksand'] font-bold text-[#867277] block">
                Rejection Reason (If proof is invalid / unclear)
              </label>
              <input
                type="text"
                value={rejectionReasonInput}
                onChange={(e) => setRejectionReasonInput(e.target.value)}
                placeholder="e.g. Unreadable transfer screenshot, incorrect receiver account"
                className="w-full px-3.5 py-2 rounded-xl bg-[#fff8f8] border border-[#fbeaec] text-xs text-[#22191b]"
              />
            </div>

            <div className="pt-2 flex items-center justify-end gap-2.5">
              <button
                type="button"
                onClick={handleRejectPaymentSlip}
                className="px-4 py-2 rounded-full bg-[#f5e4e7] hover:bg-[#ffdad6] text-[#ba1a1a] font-['Quicksand'] font-bold text-xs cursor-pointer"
              >
                Reject Slip
              </button>
              <button
                type="button"
                onClick={handleApprovePaymentSlip}
                className="btn-tactile-primary px-6 py-2 rounded-full font-['Quicksand'] font-bold text-xs cursor-pointer shadow-sm"
              >
                Approve &amp; Activate 1-Month Period
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL: RESCHEDULE DECISION                                                */}
      {/* ========================================================================= */}
      {rescheduleDecisionArrangement && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-[#d8c1c6]/80 space-y-4 font-['Nunito_Sans']">
            <h3 className="font-['Quicksand'] font-bold text-base text-[#22191b]">
              Reschedule Request Decision
            </h3>
            <p className="text-xs text-[#534247]">
              Student <strong>{rescheduleDecisionArrangement.studentName}</strong> requested change to:
              <span className="font-bold text-[#22191b] block mt-1">
                {rescheduleDecisionArrangement.requestedNewSchedule}
              </span>
              Reason: {rescheduleDecisionArrangement.rescheduleReason}
            </p>
            <div className="pt-3 flex justify-end gap-2 text-xs font-['Quicksand'] font-bold">
              <button
                type="button"
                onClick={() => handleApproveReschedule(false)}
                className="px-4 py-2 rounded-full bg-[#f5e4e7] text-[#534247] cursor-pointer"
              >
                Decline
              </button>
              <button
                type="button"
                onClick={() => handleApproveReschedule(true)}
                className="btn-tactile-primary px-5 py-2 cursor-pointer shadow-xs"
              >
                Approve Reschedule
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL: CANCELLATION DECISION                                              */}
      {/* ========================================================================= */}
      {cancellationDecisionArrangement && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-[#d8c1c6]/80 space-y-4 font-['Nunito_Sans']">
            <h3 className="font-['Quicksand'] font-bold text-base text-[#22191b]">
              Cancellation Request Decision
            </h3>
            <p className="text-xs text-[#534247]">
              Student <strong>{cancellationDecisionArrangement.studentName}</strong> submitted cancellation:
              <span className="text-[#ba1a1a] block mt-1">
                Reason: {cancellationDecisionArrangement.cancellationReason}
              </span>
            </p>
            <div className="pt-3 flex justify-end gap-2 text-xs font-['Quicksand'] font-bold">
              <button
                type="button"
                onClick={() => handleApproveCancellation(false)}
                className="px-4 py-2 rounded-full bg-[#f5e4e7] text-[#534247] cursor-pointer"
              >
                Decline
              </button>
              <button
                type="button"
                onClick={() => handleApproveCancellation(true)}
                className="px-5 py-2 rounded-full bg-[#ba1a1a] hover:bg-[#961212] text-white cursor-pointer shadow-xs"
              >
                Approve Cancellation
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
