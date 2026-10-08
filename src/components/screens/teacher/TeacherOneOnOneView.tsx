/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Teacher Theint English — Teacher One-on-One Dedicated Workspace Component
 * 
 * ROLE CONTEXT:
 * Teacher receives One-on-One assignments from Admin.
 * Teacher DOES NOT:
 * - Self-register for One-on-One
 * - Select students from a public marketplace
 * - Approve student payments or create contracts independently
 * - Override Admin assignment
 * 
 * Teacher MAY:
 * - View assigned students and learning needs context
 * - View confirmed recurring schedule & 1-month period
 * - View upcoming recurring classes
 * - Check reschedule/cancellation updates
 */

import React, { useState, useEffect } from 'react';
import {
  OneOnOneArrangement,
  RecurringClassSession,
} from '../../../types/oneOnOne';
import { oneOnOneStore } from '../../../types/oneOnOneStore';

interface TeacherOneOnOneViewProps {
  teacherId?: string;
  teacherName?: string;
  showSpecGuides?: boolean;
}

export const TeacherOneOnOneView: React.FC<TeacherOneOnOneViewProps> = ({
  teacherId = 'tr-theint',
  teacherName = 'Teacher Theint',
  showSpecGuides = false,
}) => {
  const [arrangements, setArrangements] = useState<OneOnOneArrangement[]>([]);
  const [selectedArrangement, setSelectedArrangement] = useState<OneOnOneArrangement | null>(null);
  const [sessionDetailModal, setSessionDetailModal] = useState<RecurringClassSession | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  useEffect(() => {
    const update = () => {
      const assigned = oneOnOneStore.getForTeacher(teacherId);
      setArrangements(assigned);
      if (!selectedArrangement && assigned.length > 0) {
        setSelectedArrangement(assigned[0]);
      } else if (selectedArrangement) {
        const refreshed = assigned.find((a) => a.id === selectedArrangement.id);
        if (refreshed) setSelectedArrangement(refreshed);
      }
    };
    update();
    return oneOnOneStore.subscribe(update);
  }, [teacherId, selectedArrangement]);

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
            <span className="material-symbols-outlined text-[16px] text-[#f48fb1]">duo</span>
            <span>Faculty One-on-One Console</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-['Quicksand'] font-bold tracking-tight text-[#22191b] pt-1">
            Assigned One-on-One Students &amp; Clinics
          </h2>
          <p className="text-sm text-[#534247]">
            Active student rosters assigned by Academic Administration with confirmed recurring schedules and lesson records.
          </p>
        </div>

        <div className="flex items-center gap-2 font-['Quicksand'] font-bold text-xs">
          <span className="px-3.5 py-1.5 rounded-full bg-white border border-[#f5e4e7] text-[#22191b] shadow-2xs">
            {arrangements.length} Assigned Students
          </span>
          <span className="px-3 py-1.5 rounded-full bg-[#a5d6a7]/20 text-[#1b5e20] border border-[#a5d6a7]/40">
            Teaching Active
          </span>
        </div>
      </div>

      {/* Teacher Role Boundary Invariant Banner */}
      <div className="p-4 rounded-3xl bg-[#fff9f9] border border-[#d8c1c6]/70 flex items-start gap-3.5 shadow-2xs">
        <div className="w-10 h-10 rounded-2xl bg-[#006685]/15 text-[#006685] flex items-center justify-center shrink-0">
          <span className="material-symbols-outlined text-[20px]">verified_user</span>
        </div>
        <div className="text-xs space-y-1">
          <span className="font-bold font-['Quicksand'] text-[#22191b] block">
            Academic Governance Notice: Admin-Assigned Caseload
          </span>
          <p className="text-[#534247] leading-relaxed">
            Faculty members receive verified student rosters following Admin schedule confirmation and payment approval. Teachers do not negotiate commercial contracts or self-select students from marketplaces.
          </p>
        </div>
      </div>

      {/* Main Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Assigned Students Roster (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="flex items-center justify-between px-1">
            <span className="font-['Quicksand'] font-bold text-xs uppercase tracking-wider text-[#867277]">
              Assigned Learner Roster
            </span>
            <span className="text-xs text-[#867277]">{arrangements.length} Total</span>
          </div>

          <div className="space-y-3">
            {arrangements.map((item) => {
              const isSelected = selectedArrangement?.id === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setSelectedArrangement(item)}
                  className={`w-full p-4 rounded-3xl border text-left transition-all cursor-pointer shadow-2xs ${
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
                        item.status === 'TEACHING_ACTIVE'
                          ? 'bg-[#a5d6a7]/25 text-[#1b5e20]'
                          : 'bg-[#ffe082]/30 text-[#725c06]'
                      }`}
                    >
                      {item.status === 'TEACHING_ACTIVE' ? 'Active' : 'Pending Payment'}
                    </span>
                  </div>

                  <div className="mt-3 pt-2.5 border-t border-[#f5e4e7] flex items-center justify-between text-[11px] text-[#534247]">
                    <span className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-[14px] text-[#964261]">calendar_month</span>
                      <span>{item.confirmedSchedule?.dayOfWeek || item.preferredDays}</span>
                    </span>
                    <span className="font-semibold text-[#22191b]">
                      {item.confirmedSchedule?.timeSlot ? item.confirmedSchedule.timeSlot.split('–')[0] : 'TBD'}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Column: Selected Student Full Teaching Dossier & Recurring Sessions (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          {selectedArrangement ? (
            <div className="space-y-6">
              {/* Top Dossier Card */}
              <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#fbeaec] shadow-sm space-y-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#f5e4e7]">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-[#964261] text-white flex items-center justify-center font-['Quicksand'] font-bold text-base shadow-xs">
                      {selectedArrangement.studentAvatar}
                    </div>
                    <div>
                      <h3 className="font-['Quicksand'] font-bold text-lg text-[#22191b]">
                        {selectedArrangement.studentName}
                      </h3>
                      <p className="text-xs text-[#534247]">
                        Learner ID: {selectedArrangement.studentId} • Decreed Standing: <strong className="text-[#964261]">{selectedArrangement.studentLevel}</strong>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full text-xs font-['Quicksand'] font-bold bg-[#a5d6a7]/25 text-[#1b5e20] border border-[#a5d6a7]/50">
                      1-Month Period Active
                    </span>
                  </div>
                </div>

                {/* Pedagogical Objectives Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-['Quicksand']">
                  <div className="p-4 rounded-2xl bg-[#fff8f8] border border-[#fbeaec] space-y-1">
                    <span className="text-[10px] text-[#867277] uppercase font-bold tracking-wider">
                      Primary Target Goal
                    </span>
                    <p className="font-bold text-sm text-[#22191b]">
                      {selectedArrangement.learningGoal}
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#fff8f8] border border-[#fbeaec] space-y-1">
                    <span className="text-[10px] text-[#867277] uppercase font-bold tracking-wider">
                      Identified Needs &amp; Problem Areas
                    </span>
                    <p className="text-[#534247] font-['Nunito_Sans']">
                      {selectedArrangement.learningNeeds}
                    </p>
                  </div>
                </div>

                {/* Confirmed Schedule & Timeline Metrics */}
                <div className="p-4 rounded-2xl bg-white border border-[#d8c1c6]/70 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  <div>
                    <span className="text-[10px] text-[#867277] uppercase font-bold block">Recurring Schedule</span>
                    <span className="font-bold text-[#22191b] font-['Quicksand'] mt-0.5 block">
                      {selectedArrangement.confirmedSchedule?.dayOfWeek}
                    </span>
                    <span className="text-[11px] text-[#534247]">
                      {selectedArrangement.confirmedSchedule?.timeSlot}
                    </span>
                  </div>

                  <div>
                    <span className="text-[10px] text-[#867277] uppercase font-bold block">1-Month Window</span>
                    <span className="font-bold text-[#22191b] font-['Quicksand'] mt-0.5 block">
                      {selectedArrangement.actualStartDate || 'Oct 05, 2026'}
                    </span>
                    <span className="text-[11px] text-[#534247]">
                      to {selectedArrangement.endDate || 'Nov 05, 2026'}
                    </span>
                  </div>

                  <div>
                    <span className="text-[10px] text-[#867277] uppercase font-bold block">Admin Approval</span>
                    <span className="font-bold text-[#1b5e20] font-['Quicksand'] mt-0.5 block">
                      Verified &amp; Paid
                    </span>
                    <span className="text-[11px] text-[#867277] font-mono">
                      Ref: {selectedArrangement.paymentTxRef || 'Cleared'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Recurring Clinics Table */}
              <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#fbeaec] shadow-sm space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-[#f5e4e7]">
                  <div>
                    <h4 className="font-['Quicksand'] font-bold text-base text-[#22191b]">
                      Upcoming &amp; Past Clinics (8 Sessions)
                    </h4>
                    <p className="text-xs text-[#534247]">
                      Click any session to open pedagogical preparation notes and oral assessment rubric.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => showToast('Teacher Clinic Room ready. Live link shared with learner.')}
                    className="btn-tactile-primary px-4 py-2 text-xs cursor-pointer shadow-xs"
                  >
                    Launch Next Clinic
                  </button>
                </div>

                <div className="divide-y divide-[#f5e4e7] border border-[#f5e4e7] rounded-2xl overflow-hidden">
                  {selectedArrangement.sessions.map((sess) => (
                    <div
                      key={sess.id}
                      onClick={() => setSessionDetailModal(sess)}
                      className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-[#fff9f9] transition-colors cursor-pointer text-xs"
                    >
                      <div className="flex items-start gap-3.5">
                        <span
                          className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold font-['Quicksand'] shrink-0 ${
                            sess.status === 'COMPLETED'
                              ? 'bg-[#a5d6a7]/30 text-[#1b5e20]'
                              : 'bg-[#964261] text-white'
                          }`}
                        >
                          {sess.sessionNumber}
                        </span>
                        <div className="space-y-0.5">
                          <span className="font-['Quicksand'] font-bold text-sm text-[#22191b] block">
                            {sess.lessonTopic}
                          </span>
                          <span className="text-[11px] text-[#534247]">
                            {sess.dateStr} • {sess.timeStr}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 self-end sm:self-center">
                        <span
                          className={`px-2.5 py-0.5 rounded-full text-[10px] font-['Quicksand'] font-bold ${
                            sess.status === 'COMPLETED'
                              ? 'bg-[#a5d6a7]/20 text-[#1b5e20]'
                              : 'bg-[#fff0f2] text-[#964261]'
                          }`}
                        >
                          {sess.status === 'COMPLETED' ? 'Completed' : 'Scheduled'}
                        </span>
                        <span className="material-symbols-outlined text-[16px] text-[#867277]">
                          chevron_right
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-3xl p-12 text-center text-xs text-[#534247] border border-[#fbeaec]">
              Select a student from the roster to view teaching dossier.
            </div>
          )}
        </div>
      </div>

      {/* Session Detail Modal */}
      {sessionDetailModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-[#d8c1c6]/80 space-y-4 font-['Nunito_Sans']">
            <div className="flex items-center justify-between pb-3 border-b border-[#f5e4e7]">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#964261]">school</span>
                <h3 className="font-['Quicksand'] font-bold text-base text-[#22191b]">
                  Clinic #{sessionDetailModal.sessionNumber} Syllabus Brief
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSessionDetailModal(null)}
                className="w-8 h-8 rounded-full hover:bg-[#fff0f2] text-[#534247] flex items-center justify-center cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>

            <div className="p-4 rounded-2xl bg-[#fff0f2] border border-[#f5e4e7] space-y-1 text-xs">
              <span className="font-['Quicksand'] font-bold text-[#22191b] block">
                {sessionDetailModal.lessonTopic}
              </span>
              <p className="text-[11px] text-[#534247]">
                Scheduled for {sessionDetailModal.dateStr} at {sessionDetailModal.timeStr}.
              </p>
            </div>

            <div className="space-y-2 text-xs text-[#534247]">
              <span className="font-['Quicksand'] font-bold text-[#22191b] block">Pedagogical Checklist:</span>
              <ul className="list-disc list-inside space-y-1 text-[11px]">
                <li>Review recording of student prompt drill from Diagnostic Exam.</li>
                <li>Evaluate pitch contour and natural rise-fall in statements.</li>
                <li>Assign 3 conversational mitigation drills for next meeting.</li>
              </ul>
            </div>

            <button
              type="button"
              onClick={() => {
                showToast(`Clinic #${sessionDetailModal.sessionNumber} remarks stamped.`);
                setSessionDetailModal(null);
              }}
              className="w-full btn-tactile-primary py-2.5 text-xs font-['Quicksand'] font-bold cursor-pointer"
            >
              Done &amp; Close Brief
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
