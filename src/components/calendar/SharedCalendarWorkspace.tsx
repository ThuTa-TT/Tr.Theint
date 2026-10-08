import React, { useState, useMemo } from 'react';
import {
  CalendarSession,
  CalendarViewMode,
  INITIAL_CALENDAR_SESSIONS,
  ALL_TEACHERS,
  SessionType,
} from '../../types/calendar';

interface SharedCalendarWorkspaceProps {
  role: 'ADMIN' | 'TEACHER';
  teacherId?: string; // If role === 'TEACHER', lock to this teacher ID (default 'TCH-001')
  onNavigateToOneOnOne?: () => void;
  onLaunchMeeting?: (session: CalendarSession) => void;
}

export const SharedCalendarWorkspace: React.FC<SharedCalendarWorkspaceProps> = ({
  role,
  teacherId = 'TCH-001',
  onNavigateToOneOnOne,
  onLaunchMeeting,
}) => {
  // Master sessions state
  const [sessions, setSessions] = useState<CalendarSession[]>(INITIAL_CALENDAR_SESSIONS);
  
  // View controls
  const [viewMode, setViewMode] = useState<CalendarViewMode>('month');
  // Current active date reference - default to October 2026
  const [currentYear, setCurrentYear] = useState<number>(2026);
  const [currentMonth, setCurrentMonth] = useState<number>(9); // 0-indexed: 9 = October
  const [selectedDay, setSelectedDay] = useState<number>(8); // 8th October 2026

  // Filters
  const [selectedTeacherFilter, setSelectedTeacherFilter] = useState<string>(
    role === 'TEACHER' ? teacherId : 'TCH-ALL'
  );
  const [sessionTypeFilter, setSessionTypeFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Modals & Drawers
  const [selectedSessionForDetail, setSelectedSessionForDetail] = useState<CalendarSession | null>(null);
  const [selectedDayForModal, setSelectedDayForModal] = useState<string | null>(null);
  const [dayModalFilter, setDayModalFilter] = useState<'all' | SessionType>('all');
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // New session draft state for Admin or Teacher booking
  const [draftTitle, setDraftTitle] = useState('');
  const [draftType, setDraftType] = useState<SessionType>('group_class');
  const [draftDate, setDraftDate] = useState('2026-10-15');
  const [draftStartTime, setDraftStartTime] = useState('14:00');
  const [draftEndTime, setDraftEndTime] = useState('15:00');
  const [draftTeacherId, setDraftTeacherId] = useState(role === 'TEACHER' ? teacherId : 'TCH-001');
  const [draftStudentName, setDraftStudentName] = useState('');
  const [draftCohortName, setDraftCohortName] = useState('');
  const [draftRoom, setDraftRoom] = useState('Virtual Suite #01');
  const [draftTopic, setDraftTopic] = useState('');

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Filtered sessions based on authorization scope & filters
  const filteredSessions = useMemo(() => {
    return sessions.filter((session) => {
      // Role scope invariant:
      // If TEACHER: ONLY see sessions where teacherId matches their account
      if (role === 'TEACHER') {
        if (session.teacherId !== teacherId) return false;
      } else {
        // ADMIN can see all or filter by specific teacher
        if (selectedTeacherFilter !== 'TCH-ALL' && session.teacherId !== selectedTeacherFilter) {
          return false;
        }
      }

      // Session type filter
      if (sessionTypeFilter !== 'all') {
        if (sessionTypeFilter === 'one_on_one' && !session.isOneOnOne) return false;
        if (sessionTypeFilter === 'group_class' && session.sessionType !== 'group_class') return false;
        if (sessionTypeFilter === 'office_hours' && session.sessionType !== 'office_hours') return false;
      }

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = session.title.toLowerCase().includes(q);
        const matchesTopic = session.lessonTopic.toLowerCase().includes(q);
        const matchesStudent = session.studentName?.toLowerCase().includes(q) || false;
        const matchesCohort = session.cohortName?.toLowerCase().includes(q) || false;
        const matchesTeacher = session.teacherName.toLowerCase().includes(q);
        if (!matchesTitle && !matchesTopic && !matchesStudent && !matchesCohort && !matchesTeacher) {
          return false;
        }
      }

      return true;
    });
  }, [sessions, role, teacherId, selectedTeacherFilter, sessionTypeFilter, searchQuery]);

  // Selected date formatted string
  const selectedDateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(selectedDay).padStart(2, '0')}`;

  // Sessions on the currently selected day
  const sessionsOnSelectedDay = useMemo(() => {
    return filteredSessions.filter((s) => s.date === selectedDateStr);
  }, [filteredSessions, selectedDateStr]);

  // Helper stats for banner
  const todaySessionCount = useMemo(() => {
    return filteredSessions.filter((s) => s.date === '2026-10-08').length;
  }, [filteredSessions]);

  const oneOnOneCount = useMemo(() => {
    return filteredSessions.filter((s) => s.isOneOnOne).length;
  }, [filteredSessions]);

  const groupCohortCount = useMemo(() => {
    return filteredSessions.filter((s) => s.sessionType === 'group_class').length;
  }, [filteredSessions]);

  // Calendar month matrix generator
  // October 2026: Oct 1 is Thursday (index 4 in 0=Sun..6=Sat). Total 31 days.
  const calendarDays = useMemo(() => {
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const firstDayIndex = new Date(currentYear, currentMonth, 1).getDay(); // 0 is Sunday
    
    const days = [];
    // Previous month padding
    const prevMonthDays = new Date(currentYear, currentMonth, 0).getDate();
    for (let i = firstDayIndex - 1; i >= 0; i--) {
      days.push({
        dayNumber: prevMonthDays - i,
        isCurrentMonth: false,
        dateStr: `${currentYear}-${String(currentMonth).padStart(2, '0')}-${String(prevMonthDays - i).padStart(2, '0')}`,
      });
    }

    // Current month days
    for (let i = 1; i <= daysInMonth; i++) {
      days.push({
        dayNumber: i,
        isCurrentMonth: true,
        dateStr: `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`,
      });
    }

    // Trailing padding to make clean 35 or 42 grid cells
    const remaining = (7 - (days.length % 7)) % 7;
    for (let i = 1; i <= remaining; i++) {
      days.push({
        dayNumber: i,
        isCurrentMonth: false,
        dateStr: `${currentYear}-${String(currentMonth + 2).padStart(2, '0')}-${String(i).padStart(2, '0')}`,
      });
    }

    return days;
  }, [currentYear, currentMonth]);

  // Handle month shifts
  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear((y) => y - 1);
    } else {
      setCurrentMonth((m) => m - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear((y) => y + 1);
    } else {
      setCurrentMonth((m) => m + 1);
    }
  };

  // Add session handler
  const handleCreateSession = (e: React.FormEvent) => {
    e.preventDefault();
    if (!draftTitle.trim()) {
      showToast('Please provide a descriptive session title.');
      return;
    }

    const assignedTeacher = ALL_TEACHERS.find((t) => t.id === draftTeacherId) || ALL_TEACHERS[1];

    const newSession: CalendarSession = {
      id: `SES-${Date.now().toString().slice(-4)}`,
      title: draftTitle,
      sessionType: draftType,
      status: 'scheduled',
      date: draftDate,
      startTime: draftStartTime,
      endTime: draftEndTime,
      timeDisplay: `${draftStartTime} – ${draftEndTime} MMT`,
      teacherId: assignedTeacher.id,
      teacherName: assignedTeacher.name,
      teacherAvatar: assignedTeacher.avatar,
      teacherRole: assignedTeacher.role,
      isOneOnOne: draftType === 'one_on_one' || draftType === 'placement_interview',
      studentName: draftStudentName || (draftType === 'one_on_one' ? 'VIP Student' : undefined),
      cohortName: draftCohortName || (draftType === 'group_class' ? 'Classroom Cohort' : undefined),
      meetingRoomId: `ROOM-${Date.now().toString().slice(-6)}`,
      meetingLink: `https://classroom.teachertheint.edu.mm/room/${Date.now().toString().slice(-6)}`,
      lessonTopic: draftTopic || 'Core Pedagogical Module & Practice Drills',
      academicObjective: 'Structured language proficiency outcomes according to CEFR milestones.',
      hasHomeworkAssigned: false,
      classroomNumber: draftRoom,
      lastModifiedBy: role === 'ADMIN' ? 'Admin Master Console' : 'Teacher Theint Faculty',
    };

    setSessions((prev) => [newSession, ...prev]);
    setIsScheduleModalOpen(false);
    setDraftTitle('');
    setDraftTopic('');
    setDraftStudentName('');
    setDraftCohortName('');
    showToast(`Session successfully scheduled for ${newSession.date}!`);
  };

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
  ];

  const handleCopyMeetingLink = (link: string, title: string) => {
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(link);
      showToast(`Classroom link copied for: ${title}`);
    } else {
      showToast(`Room link: ${link}`);
    }
  };

  const modalDateObj = useMemo(() => {
    if (!selectedDayForModal) return null;
    const parts = selectedDayForModal.split('-');
    const y = parseInt(parts[0], 10);
    const m = parseInt(parts[1], 10) - 1;
    const d = parseInt(parts[2], 10);
    const dt = new Date(y, m, d);
    const dayOfWeekName = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][dt.getDay()];
    const monthName = monthNames[m] || 'October';
    return {
      fullFormatted: `${dayOfWeekName}, ${monthName} ${d}, ${y}`,
      dayOfWeekName,
      monthName,
      day: d,
      year: y,
      dateStr: selectedDayForModal,
    };
  }, [selectedDayForModal]);

  const modalDaySessions = useMemo(() => {
    if (!selectedDayForModal) return [];
    const base = filteredSessions.filter((s) => s.date === selectedDayForModal);
    const sorted = [...base].sort((a, b) => a.startTime.localeCompare(b.startTime));
    if (dayModalFilter === 'all') return sorted;
    return sorted.filter((s) => s.sessionType === dayModalFilter);
  }, [filteredSessions, selectedDayForModal, dayModalFilter]);

  const modalAllDayCount = useMemo(() => {
    if (!selectedDayForModal) return 0;
    return filteredSessions.filter((s) => s.date === selectedDayForModal).length;
  }, [filteredSessions, selectedDayForModal]);

  const getSessionBadgeStyle = (type: SessionType) => {
    switch (type) {
      case 'one_on_one':
        return 'bg-[#fff0f2] text-[#964261] border-[#f5e4e7]';
      case 'group_class':
        return 'bg-[#eef8ff] text-[#006685] border-[#bee9ff]';
      case 'placement_interview':
        return 'bg-[#fff8e1] text-[#b78103] border-[#ffe082]';
      case 'office_hours':
        return 'bg-[#f3e5f5] text-[#6a1b9a] border-[#e1bee7]';
      case 'faculty_meeting':
        return 'bg-[#f1f8e9] text-[#33691e] border-[#dcedc8]';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getSessionTypeLabel = (type: SessionType) => {
    switch (type) {
      case 'one_on_one':
        return '1-on-1 Mentorship';
      case 'group_class':
        return 'Cohort Masterclass';
      case 'placement_interview':
        return 'Diagnostic Interview';
      case 'office_hours':
        return 'Faculty Office Hours';
      case 'faculty_meeting':
        return 'Academic Moderation';
      default:
        return type;
    }
  };

  return (
    <div className="space-y-6 font-['Nunito_Sans']">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 animate-bounce">
          <div className="bg-[#22191b] text-white px-5 py-3 rounded-2xl shadow-xl flex items-center gap-3 border border-pink-500/30 font-['Quicksand']">
            <span className="material-symbols-outlined text-[#f48fb1] text-[20px]">
              check_circle
            </span>
            <span className="text-xs font-semibold">{toastMessage}</span>
          </div>
        </div>
      )}

      {/* TOP CALENDAR CONTROL BAR: VIEW SWITCHER, FILTERS, SEARCH, NEW SESSION */}
      <div className="bg-white rounded-3xl border border-[#fbeaec] p-5 sm:p-6 shadow-[0_4px_16px_rgba(244,143,177,0.12)] flex flex-col lg:flex-row lg:items-center justify-between gap-5">
        {/* Left Side: Month / Year Navigation & Quick Badge */}
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2 bg-[#fff8f8] p-1.5 rounded-2xl border border-[#fbeaec]">
            <button
              type="button"
              onClick={handlePrevMonth}
              className="w-9 h-9 rounded-xl flex items-center justify-center text-[#534247] hover:bg-white hover:text-[#22191b] hover:shadow-xs transition-all cursor-pointer"
              title="Previous Month"
            >
              <span className="material-symbols-outlined text-[20px]">chevron_left</span>
            </button>
            <div className="px-3 text-center min-w-[140px]">
              <span className="font-['Quicksand'] font-bold text-base text-[#22191b]">
                {monthNames[currentMonth]} {currentYear}
              </span>
            </div>
            <button
              type="button"
              onClick={handleNextMonth}
              className="w-9 h-9 rounded-xl flex items-center justify-center text-[#534247] hover:bg-white hover:text-[#22191b] hover:shadow-xs transition-all cursor-pointer"
              title="Next Month"
            >
              <span className="material-symbols-outlined text-[20px]">chevron_right</span>
            </button>
          </div>

          <button
            type="button"
            onClick={() => {
              setCurrentYear(2026);
              setCurrentMonth(9);
              setSelectedDay(8);
            }}
            className="px-3.5 py-2 rounded-xl text-xs font-bold font-['Quicksand'] bg-[#fff0f2] text-[#964261] border border-[#f5e4e7] hover:bg-[#ffe3e8] transition-all cursor-pointer"
          >
            Today (Oct 8, 2026)
          </button>

          {/* Role Scope Indicator */}
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#f8f9fa] border border-[#e9dde1] text-xs">
            <span
              className={`w-2 h-2 rounded-full ${
                role === 'ADMIN' ? 'bg-[#964261]' : 'bg-[#006685]'
              }`}
            />
            <span className="font-['Quicksand'] font-bold text-[#534247]">
              {role === 'ADMIN' ? 'Global Operational Roster (All Faculty)' : 'Personal Teaching Roster (Teacher Theint)'}
            </span>
          </div>
        </div>

        {/* Center / Right Side: View Mode Tabs + Action Buttons */}
        <div className="flex flex-wrap items-center gap-3">
          {/* View Mode Buttons (Month / Week / Day / Agenda) */}
          <div className="flex items-center p-1 bg-[#fff8f8] rounded-2xl border border-[#fbeaec]">
            {(['month', 'week', 'day', 'agenda'] as CalendarViewMode[]).map((mode) => (
              <button
                key={mode}
                type="button"
                onClick={() => setViewMode(mode)}
                className={`px-3 py-1.5 text-xs font-['Quicksand'] font-bold rounded-xl capitalize transition-all cursor-pointer ${
                  viewMode === mode
                    ? 'bg-[#964261] text-white shadow-xs'
                    : 'text-[#534247] hover:text-[#22191b] hover:bg-white/80'
                }`}
              >
                {mode}
              </button>
            ))}
          </div>

          {/* New Session Button */}
          <button
            type="button"
            onClick={() => setIsScheduleModalOpen(true)}
            className="btn-tactile-primary px-4 py-2.5 text-xs flex items-center gap-1.5 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">add_circle</span>
            <span>{role === 'ADMIN' ? 'Schedule Session' : 'Add Class / Slot'}</span>
          </button>
        </div>
      </div>

      {/* FILTER & STATS BANNER */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-center">
        {/* Filter controls (8 cols on lg) */}
        <div className="lg:col-span-8 bg-white rounded-3xl border border-[#fbeaec] p-4 sm:p-5 shadow-[0_4px_16px_rgba(244,143,177,0.08)] flex flex-wrap items-center gap-3">
          {/* Search box */}
          <div className="relative flex-1 min-w-[200px]">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[18px] text-[#9b8f94]">
              search
            </span>
            <input
              type="text"
              placeholder="Search by student, cohort, topic, or classroom..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-[#e9dde1] bg-[#fff9f9] text-[#22191b] placeholder-[#9b8f94] focus:outline-none focus:border-[#d8899d] focus:bg-white transition-all font-['Nunito_Sans']"
            />
          </div>

          {/* Admin-only: Faculty filter */}
          {role === 'ADMIN' && (
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold text-[#766a70] uppercase font-['Quicksand']">
                Teacher:
              </span>
              <select
                value={selectedTeacherFilter}
                onChange={(e) => setSelectedTeacherFilter(e.target.value)}
                className="px-3 py-2 text-xs rounded-xl border border-[#e9dde1] bg-[#fff9f9] text-[#22191b] font-['Quicksand'] font-bold focus:outline-none focus:border-[#d8899d] cursor-pointer"
              >
                {ALL_TEACHERS.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.name}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Session type filter */}
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold text-[#766a70] uppercase font-['Quicksand']">
              Type:
            </span>
            <select
              value={sessionTypeFilter}
              onChange={(e) => setSessionTypeFilter(e.target.value)}
              className="px-3 py-2 text-xs rounded-xl border border-[#e9dde1] bg-[#fff9f9] text-[#22191b] font-['Quicksand'] font-bold focus:outline-none focus:border-[#d8899d] cursor-pointer"
            >
              <option value="all">All Sessions</option>
              <option value="one_on_one">1-on-1 Mentorship Only</option>
              <option value="group_class">Group Cohort Classes Only</option>
              <option value="office_hours">Office Hours Only</option>
            </select>
          </div>

          {/* Reset Filters */}
          {(searchQuery || sessionTypeFilter !== 'all' || (role === 'ADMIN' && selectedTeacherFilter !== 'TCH-ALL')) && (
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setSessionTypeFilter('all');
                if (role === 'ADMIN') setSelectedTeacherFilter('TCH-ALL');
              }}
              className="text-xs text-[#964261] font-bold hover:underline font-['Quicksand'] ml-auto"
            >
              Clear Filters
            </button>
          )}
        </div>

        {/* Quick Micro-Stats (4 cols on lg) */}
        <div className="lg:col-span-4 grid grid-cols-3 gap-3 font-['Quicksand']">
          <div className="bg-white rounded-2xl border border-[#fbeaec] p-3 text-center shadow-2xs">
            <div className="text-[10px] font-bold text-[#766a70] uppercase">Today's Total</div>
            <div className="text-xl font-bold text-[#22191b] mt-0.5">{todaySessionCount}</div>
            <div className="text-[9px] text-[#964261] font-bold">Oct 8, 2026</div>
          </div>
          <div className="bg-white rounded-2xl border border-[#fbeaec] p-3 text-center shadow-2xs">
            <div className="text-[10px] font-bold text-[#766a70] uppercase">1-on-1 VIP</div>
            <div className="text-xl font-bold text-[#964261] mt-0.5">{oneOnOneCount}</div>
            <div className="text-[9px] text-[#766a70]">Assigned Slots</div>
          </div>
          <div className="bg-white rounded-2xl border border-[#fbeaec] p-3 text-center shadow-2xs">
            <div className="text-[10px] font-bold text-[#766a70] uppercase">Group Cohorts</div>
            <div className="text-xl font-bold text-[#006685] mt-0.5">{groupCohortCount}</div>
            <div className="text-[9px] text-[#766a70]">Live Suites</div>
          </div>
        </div>
      </div>

      {/* MAIN CALENDAR DISPLAY: VIEW MODE BRANCHING */}
      {viewMode === 'month' && (
        <div className="w-full bg-white rounded-3xl border border-[#fbeaec] p-5 sm:p-7 shadow-[0_4px_16px_rgba(244,143,177,0.12)] space-y-4">
          {/* Month Grid Context Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#f5e4e7]">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-2xl bg-[#fff0f2] text-[#964261] border border-[#f5e4e7] flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[20px]">calendar_month</span>
              </div>
              <div>
                <h3 className="font-['Quicksand'] font-bold text-base text-[#22191b]">
                  {monthNames[currentMonth]} {currentYear} Academic Timetable
                </h3>
                <p className="text-xs text-[#766a70]">
                  Click any date cell to view all scheduled classes, student dossiers, and virtual rooms in the day modal
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-[#fff0f2] text-[#964261] text-xs font-['Quicksand'] font-bold border border-[#f5e4e7]">
                {role === 'ADMIN' ? 'Admin Master Scope' : 'Teacher Theint Academic Scope'}
              </span>
              <span className="px-3 py-1 rounded-full bg-[#f8f9fa] text-[#534247] text-xs font-['Quicksand'] font-bold border border-[#e9dde1]">
                {filteredSessions.length} Total Sessions
              </span>
            </div>
          </div>

          {/* Weekday Headers */}
          <div className="grid grid-cols-7 gap-2 pb-2 text-center font-['Quicksand'] font-bold text-xs text-[#766a70]">
            <div className="text-[#c96a72]">Sun</div>
            <div>Mon</div>
            <div>Tue</div>
            <div>Wed</div>
            <div>Thu</div>
            <div>Fri</div>
            <div>Sat</div>
          </div>

          {/* Calendar Day Cells */}
          <div className="grid grid-cols-7 gap-2 sm:gap-2.5">
            {calendarDays.map((dayItem, idx) => {
              const isSelected = dayItem.isCurrentMonth && dayItem.dayNumber === selectedDay;
              const isToday =
                dayItem.isCurrentMonth &&
                dayItem.dayNumber === 8 &&
                currentMonth === 9 &&
                currentYear === 2026;

              // Find sessions on this day
              const daySessions = filteredSessions.filter((s) => s.date === dayItem.dateStr);

              return (
                <div
                  key={idx}
                  onClick={() => {
                    if (dayItem.isCurrentMonth) {
                      setSelectedDay(dayItem.dayNumber);
                      setSelectedDayForModal(dayItem.dateStr);
                    }
                  }}
                  className={`min-h-[120px] sm:min-h-[136px] p-2 sm:p-2.5 rounded-2xl border flex flex-col justify-between transition-all cursor-pointer group hover:shadow-sm ${
                    isSelected
                      ? 'bg-[#fff0f2] border-[#964261] ring-2 ring-[#f48fb1]/40 shadow-xs'
                      : isToday
                      ? 'bg-[#fffbfb] border-[#f48fb1]/60'
                      : dayItem.isCurrentMonth
                      ? 'bg-white border-[#f5e4e7] hover:border-[#d8899d] hover:bg-[#fffcfc]'
                      : 'bg-[#faf7f8]/50 border-transparent text-[#9b8f94]/40 cursor-default opacity-50'
                  }`}
                >
                  {/* Top Row: Date number & Indicator badge */}
                  <div className="flex items-center justify-between">
                    <span
                      className={`text-xs font-['Quicksand'] font-bold w-6 h-6 rounded-full flex items-center justify-center ${
                        isToday
                          ? 'bg-[#964261] text-white shadow-2xs'
                          : isSelected
                          ? 'text-[#964261] font-extrabold'
                          : dayItem.isCurrentMonth
                          ? 'text-[#22191b]'
                          : 'text-[#9b8f94]'
                      }`}
                    >
                      {dayItem.dayNumber}
                    </span>

                    {daySessions.length > 0 && (
                      <span 
                        title="Click to view all schedule for this day"
                        className="text-[10px] font-bold font-['Quicksand'] px-1.5 py-0.5 rounded-full bg-[#f48fb1]/15 text-[#964261] group-hover:bg-[#964261] group-hover:text-white transition-colors flex items-center gap-1"
                      >
                        <span>{daySessions.length}</span>
                        <span className="material-symbols-outlined text-[10px] hidden sm:inline">open_in_new</span>
                      </span>
                    )}
                  </div>

                  {/* Middle / Bottom: Micro Session Badges - Supports more than 3 classes in a day */}
                  <div className="space-y-1 mt-1.5 overflow-hidden">
                    {daySessions.slice(0, 4).map((s) => (
                      <div
                        key={s.id}
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedDay(dayItem.dayNumber);
                          setSelectedDayForModal(dayItem.dateStr);
                        }}
                        className={`text-[9.5px] font-['Quicksand'] font-bold px-1.5 py-0.5 rounded-lg truncate border cursor-pointer hover:opacity-90 flex items-center justify-between gap-1 transition-all ${getSessionBadgeStyle(
                          s.sessionType
                        )}`}
                        title={`${s.timeDisplay} • ${s.title}`}
                      >
                        <span className="shrink-0 font-mono text-[9px] opacity-85">{s.startTime}</span>
                        <span className="truncate">{s.isOneOnOne ? `1:1 (${s.studentName?.split(' ')[0]})` : s.title}</span>
                      </div>
                    ))}
                    {daySessions.length > 4 && (
                      <div 
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedDay(dayItem.dayNumber);
                          setSelectedDayForModal(dayItem.dateStr);
                        }}
                        className="text-[9px] text-[#964261] font-bold px-1.5 py-0.5 rounded-lg bg-[#fff0f2] hover:bg-[#ffe0e6] border border-[#f5e4e7] flex items-center justify-between cursor-pointer transition-colors"
                      >
                        <span>+{daySessions.length - 4} more</span>
                        <span className="material-symbols-outlined text-[12px]">calendar_view_day</span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* WEEK / DAY VIEW */}
      {(viewMode === 'week' || viewMode === 'day') && (
        <div className="bg-white rounded-3xl border border-[#fbeaec] p-6 shadow-[0_4px_16px_rgba(244,143,177,0.12)] space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#f5e4e7]">
            <div>
              <h3 className="font-['Quicksand'] font-bold text-lg text-[#22191b]">
                {viewMode === 'week' ? 'Weekly Time Grid & Room Allocation' : 'Daily Chronological Schedule'}
              </h3>
              <p className="text-xs text-[#766a70]">
                {viewMode === 'week'
                  ? 'Oct 4 – Oct 10, 2026 Academic Week • Parallel Virtual Classrooms'
                  : `Full timeline schedule for ${monthNames[currentMonth]} ${selectedDay}, ${currentYear}`}
              </p>
            </div>
            <div className="flex items-center gap-2 text-xs font-['Quicksand'] font-bold">
              <span className="px-3 py-1 rounded-full bg-[#fff0f2] text-[#964261] border border-[#f5e4e7]">
                MMT (UTC+06:30)
              </span>
            </div>
          </div>

          {/* Time Slot Columns */}
          <div className="space-y-3">
            {[
              { time: '09:00 AM – 10:30 AM', slotKey: 'morning' },
              { time: '11:00 AM – 12:30 PM', slotKey: 'midday' },
              { time: '02:00 PM – 03:30 PM', slotKey: 'afternoon' },
              { time: '04:00 PM – 05:30 PM', slotKey: 'late_afternoon' },
              { time: '07:00 PM – 08:30 PM', slotKey: 'evening' },
            ].map((slot, sIdx) => {
              // Sessions matching this general hour
              const matching = filteredSessions.filter((s) => {
                if (viewMode === 'day') {
                  if (s.date !== selectedDateStr) return false;
                }
                const hour = parseInt(s.startTime.split(':')[0], 10);
                if (slot.slotKey === 'morning') return hour >= 9 && hour < 11;
                if (slot.slotKey === 'midday') return hour >= 11 && hour < 13;
                if (slot.slotKey === 'afternoon') return hour >= 14 && hour < 16;
                if (slot.slotKey === 'late_afternoon') return hour >= 16 && hour < 18;
                if (slot.slotKey === 'evening') return hour >= 19 && hour <= 21;
                return false;
              });

              return (
                <div
                  key={sIdx}
                  className="grid grid-cols-1 md:grid-cols-12 gap-4 p-4 rounded-2xl bg-[#fffcfc] border border-[#fbeaec]"
                >
                  <div className="md:col-span-3 font-['Quicksand'] font-bold text-xs text-[#964261] flex items-center gap-2">
                    <span className="material-symbols-outlined text-[18px]">schedule</span>
                    <span>{slot.time}</span>
                  </div>

                  <div className="md:col-span-9 space-y-2">
                    {matching.length === 0 ? (
                      <div className="text-xs text-[#9b8f94] italic py-2">
                        No scheduled masterclass or clinic in this time window.
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {matching.map((sess) => (
                          <div
                            key={sess.id}
                            onClick={() => setSelectedSessionForDetail(sess)}
                            className="p-3 rounded-xl bg-white border border-[#f5e4e7] hover:border-[#964261] transition-all cursor-pointer shadow-2xs space-y-1.5"
                          >
                            <div className="flex items-center justify-between text-[10px]">
                              <span
                                className={`font-bold px-2 py-0.5 rounded-full border ${getSessionBadgeStyle(
                                  sess.sessionType
                                )}`}
                              >
                                {getSessionTypeLabel(sess.sessionType)}
                              </span>
                              <span className="font-bold text-[#766a70]">{sess.date}</span>
                            </div>
                            <div className="font-['Quicksand'] font-bold text-xs text-[#22191b] truncate">
                              {sess.title}
                            </div>
                            <div className="text-[11px] text-[#534247] flex items-center justify-between">
                              <span>{sess.classroomNumber}</span>
                              <span className="font-bold text-[#964261]">
                                {sess.isOneOnOne ? sess.studentName : sess.cohortName}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* AGENDA VIEW */}
      {viewMode === 'agenda' && (
        <div className="bg-white rounded-3xl border border-[#fbeaec] p-6 shadow-[0_4px_16px_rgba(244,143,177,0.12)] space-y-4">
          <div className="flex items-center justify-between pb-4 border-b border-[#f5e4e7]">
            <div>
              <h3 className="font-['Quicksand'] font-bold text-lg text-[#22191b]">
                Master Operational Agenda
              </h3>
              <p className="text-xs text-[#766a70]">
                Chronological list of all teaching sessions, room allocations, and instructor assignments
              </p>
            </div>
            <span className="px-3 py-1 rounded-full bg-[#fff0f2] text-[#964261] text-xs font-['Quicksand'] font-bold">
              {filteredSessions.length} Sessions Listed
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#fff8f8] text-[#766a70] font-['Quicksand'] font-bold border-b border-[#f5e4e7]">
                <tr>
                  <th className="py-3 px-4">Date & Time</th>
                  <th className="py-3 px-4">Session Title & Topic</th>
                  <th className="py-3 px-4">Session Type</th>
                  <th className="py-3 px-4">Assigned Teacher</th>
                  <th className="py-3 px-4">Student / Cohort</th>
                  <th className="py-3 px-4">Classroom</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#fbeaec]">
                {filteredSessions.map((row) => (
                  <tr key={row.id} className="hover:bg-[#fff9f9] transition-colors">
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <div className="font-['Quicksand'] font-bold text-[#22191b]">{row.date}</div>
                      <div className="text-[11px] text-[#964261] font-medium">{row.timeDisplay}</div>
                    </td>
                    <td className="py-3.5 px-4 max-w-xs">
                      <div className="font-['Quicksand'] font-bold text-[#22191b] truncate">
                        {row.title}
                      </div>
                      <div className="text-[11px] text-[#534247] truncate">{row.lessonTopic}</div>
                    </td>
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <span
                        className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold border font-['Quicksand'] ${getSessionBadgeStyle(
                          row.sessionType
                        )}`}
                      >
                        {getSessionTypeLabel(row.sessionType)}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-[#f48fb1] text-white flex items-center justify-center text-[10px] font-bold font-['Quicksand']">
                          {row.teacherAvatar}
                        </div>
                        <span className="font-['Quicksand'] font-bold text-[#22191b]">
                          {row.teacherName}
                        </span>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      {row.isOneOnOne ? (
                        <div className="font-['Quicksand'] font-bold text-[#964261]">
                          {row.studentName}
                        </div>
                      ) : (
                        <div className="font-['Quicksand'] font-bold text-[#006685]">
                          {row.cohortName}
                        </div>
                      )}
                    </td>
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <span className="text-[11px] text-[#534247]">{row.classroomNumber}</span>
                    </td>
                    <td className="py-3.5 px-4 text-right whitespace-nowrap">
                      <div className="inline-flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => setSelectedSessionForDetail(row)}
                          className="px-2.5 py-1 rounded-lg border border-[#f5e4e7] bg-white hover:border-[#964261] text-[#534247] hover:text-[#964261] font-bold cursor-pointer transition-all"
                        >
                          View
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            if (onLaunchMeeting) onLaunchMeeting(row);
                            else showToast(`Launching meeting for ${row.title}...`);
                          }}
                          className="px-2.5 py-1 rounded-lg bg-[#964261] hover:bg-[#7b324d] text-white font-bold cursor-pointer transition-all flex items-center gap-1 shadow-2xs"
                        >
                          <span className="material-symbols-outlined text-[14px]">videocam</span>
                          <span>Join</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* MODAL 0: ALL SCHEDULES FOR SELECTED DAY MODAL */}
      {selectedDayForModal && modalDateObj && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/45 backdrop-blur-xs animate-fade-in">
          <div className="bg-white rounded-3xl border border-[#fbeaec] shadow-2xl w-full max-w-4xl max-h-[92vh] flex flex-col overflow-hidden animate-scale-up">
            {/* Modal Header */}
            <div className="p-5 sm:p-6 border-b border-[#f5e4e7] bg-linear-to-r from-[#fff9fa] via-white to-[#fff0f2]/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-start gap-3.5">
                <div className="w-11 h-11 rounded-2xl bg-[#fff0f2] border border-[#f5e4e7] text-[#964261] flex items-center justify-center shrink-0 shadow-2xs">
                  <span className="material-symbols-outlined text-[24px]">calendar_today</span>
                </div>
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-[11px] font-bold font-['Quicksand'] uppercase px-2.5 py-0.5 rounded-full bg-[#f48fb1]/15 text-[#964261]">
                      {modalDateObj.dayOfWeekName} Timetable
                    </span>
                    <span className="text-xs font-bold font-['Quicksand'] text-[#766a70]">
                      {role === 'ADMIN' ? 'Global Academic Schedule' : 'Teacher Theint Academic Portal'}
                    </span>
                  </div>
                  <h3 className="font-['Quicksand'] font-bold text-lg sm:text-xl text-[#22191b] mt-1">
                    {modalDateObj.fullFormatted}
                  </h3>
                  <p className="text-xs text-[#766a70] mt-0.5">
                    {modalAllDayCount} Academic {modalAllDayCount === 1 ? 'Class' : 'Classes'} Scheduled on this day
                  </p>
                </div>
              </div>

              {/* Header Actions */}
              <div className="flex items-center gap-2 sm:self-start">
                <button
                  type="button"
                  onClick={() => {
                    setDraftDate(selectedDayForModal);
                    setIsScheduleModalOpen(true);
                  }}
                  className="btn-tactile-primary px-3.5 py-2 text-xs flex items-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <span className="material-symbols-outlined text-[17px]">add_circle</span>
                  <span>Add Class to This Day</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setSelectedDayForModal(null);
                    setDayModalFilter('all');
                  }}
                  className="w-9 h-9 rounded-full bg-[#fff0f2] text-[#964261] hover:bg-[#ffe0e6] flex items-center justify-center cursor-pointer transition-colors shadow-2xs"
                  aria-label="Close daily timetable modal"
                >
                  <span className="material-symbols-outlined text-[20px]">close</span>
                </button>
              </div>
            </div>

            {/* Quick Filter Bar */}
            <div className="px-5 sm:px-6 py-3 bg-[#fffcfc] border-b border-[#f5e4e7] flex items-center justify-between flex-wrap gap-2 text-xs font-['Quicksand']">
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="text-[11px] font-bold text-[#766a70] mr-1">Filter Type:</span>
                {(
                  [
                    { key: 'all', label: `All Classes (${modalAllDayCount})` },
                    { key: 'one_on_one', label: '1-on-1 Mentorship' },
                    { key: 'group_class', label: 'Group Masterclass' },
                    { key: 'office_hours', label: 'Office Hours' },
                    { key: 'placement_interview', label: 'Diagnostics' },
                  ] as { key: 'all' | SessionType; label: string }[]
                ).map((f) => (
                  <button
                    key={f.key}
                    type="button"
                    onClick={() => setDayModalFilter(f.key)}
                    className={`px-3 py-1 rounded-xl font-bold transition-all cursor-pointer text-xs ${
                      dayModalFilter === f.key
                        ? 'bg-[#964261] text-white shadow-2xs'
                        : 'bg-white border border-[#e9dde1] text-[#534247] hover:bg-[#fff0f2]'
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>

              {dayModalFilter !== 'all' && (
                <button
                  type="button"
                  onClick={() => setDayModalFilter('all')}
                  className="text-xs font-bold text-[#964261] hover:underline"
                >
                  Reset Filter
                </button>
              )}
            </div>

            {/* Modal Body: Complete Chronological Class Schedule */}
            <div className="p-5 sm:p-6 overflow-y-auto flex-1 space-y-4">
              {modalDaySessions.length === 0 ? (
                <div className="py-14 text-center rounded-2xl bg-[#fff9f9] border border-dashed border-[#f5e4e7] space-y-3">
                  <span className="material-symbols-outlined text-[42px] text-[#d8899d]">event_busy</span>
                  <h4 className="text-sm font-bold text-[#22191b] font-['Quicksand']">
                    No classes found matching your current filter for this day.
                  </h4>
                  <p className="text-xs text-[#766a70] max-w-sm mx-auto">
                    There are {modalAllDayCount} total classes scheduled for {modalDateObj.fullFormatted}. Click below to reset filters or schedule a new session.
                  </p>
                  <div className="flex items-center justify-center gap-3 pt-2">
                    {dayModalFilter !== 'all' && (
                      <button
                        type="button"
                        onClick={() => setDayModalFilter('all')}
                        className="btn-tactile-secondary px-4 py-2 text-xs cursor-pointer"
                      >
                        Show All {modalAllDayCount} Classes
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() => {
                        setDraftDate(selectedDayForModal);
                        setIsScheduleModalOpen(true);
                      }}
                      className="btn-tactile-primary px-4 py-2 text-xs flex items-center gap-1 cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-[16px]">add</span>
                      <span>Schedule Class for This Day</span>
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  {modalDaySessions.map((session, sIndex) => (
                    <div
                      key={session.id}
                      className="p-4 sm:p-5 rounded-2xl border border-[#fbeaec] bg-[#fffcfc] hover:bg-white hover:border-[#f48fb1] hover:shadow-md transition-all space-y-4"
                    >
                      {/* Top Row: Time, Format Badge, Room ID, Live Indicator */}
                      <div className="flex flex-wrap items-center justify-between gap-2.5 pb-3 border-b border-[#f5e4e7]">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-['Quicksand'] font-bold text-xs sm:text-sm text-[#964261] px-3 py-1 rounded-xl bg-[#fff0f2] border border-[#f5e4e7] flex items-center gap-1.5">
                            <span className="material-symbols-outlined text-[16px]">schedule</span>
                            <span>{session.timeDisplay}</span>
                          </span>

                          <span
                            className={`text-xs font-['Quicksand'] font-bold px-3 py-1 rounded-xl border ${getSessionBadgeStyle(
                              session.sessionType
                            )}`}
                          >
                            {getSessionTypeLabel(session.sessionType)}
                          </span>

                          <span className="text-xs text-[#534247] px-2.5 py-1 rounded-xl bg-[#f8f9fa] border border-[#e9dde1] flex items-center gap-1 font-['Nunito_Sans']">
                            <span className="material-symbols-outlined text-[15px] text-[#766a70]">meeting_room</span>
                            <span className="font-semibold">{session.classroomNumber}</span>
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-bold font-['Quicksand'] uppercase px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                            <span>Confirmed Slot #{sIndex + 1}</span>
                          </span>
                        </div>
                      </div>

                      {/* Class Title & Course Name */}
                      <div>
                        <h4 className="font-['Quicksand'] font-bold text-base sm:text-lg text-[#22191b] leading-snug">
                          {session.title}
                        </h4>
                        {session.courseTitle && (
                          <p className="text-xs font-semibold text-[#964261] mt-0.5 font-['Quicksand']">
                            Course: {session.courseTitle}
                          </p>
                        )}
                      </div>

                      {/* Stakeholder Details Grid: Teacher and Student / Cohort */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs font-['Quicksand']">
                        {/* Instructor */}
                        <div className="p-3 rounded-xl bg-[#fff9fa] border border-[#fbeaec] flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-[#964261] text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-2xs">
                            {session.teacherAvatar}
                          </div>
                          <div>
                            <span className="text-[10px] font-bold text-[#766a70] uppercase">Assigned Faculty</span>
                            <div className="font-bold text-[#22191b] text-xs">{session.teacherName}</div>
                            <div className="text-[11px] text-[#964261]">{session.teacherRole}</div>
                          </div>
                        </div>

                        {/* Student / Cohort */}
                        <div className="p-3 rounded-xl bg-[#fff9fa] border border-[#fbeaec] flex items-center gap-3">
                          <div
                            className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs shrink-0 shadow-2xs ${
                              session.isOneOnOne
                                ? 'bg-[#f48fb1] text-white'
                                : 'bg-[#006685] text-white'
                            }`}
                          >
                            {session.isOneOnOne ? (
                              session.studentAvatar || 'ST'
                            ) : (
                              <span className="material-symbols-outlined text-[18px]">groups</span>
                            )}
                          </div>
                          <div>
                            <span className="text-[10px] font-bold text-[#766a70] uppercase">
                              {session.isOneOnOne ? '1-on-1 Enrolled Learner' : 'Live Cohort'}
                            </span>
                            <div className="font-bold text-[#22191b] text-xs">
                              {session.isOneOnOne ? session.studentName : session.cohortName}
                            </div>
                            <div className="text-[11px] text-[#534247]">
                              {session.isOneOnOne
                                ? session.studentLevel || session.studentEmail || 'VIP Learner'
                                : `${session.attendeeCount || 20} Registered Students`}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Lesson Topic & Pedagogical Objective */}
                      <div className="p-3.5 rounded-xl bg-white border border-[#fbeaec] space-y-1.5 text-xs">
                        <div className="flex items-start gap-2">
                          <span className="font-['Quicksand'] font-bold text-[#766a70] uppercase text-[10px] shrink-0 mt-0.5">
                            Topic:
                          </span>
                          <span className="font-bold text-[#22191b]">{session.lessonTopic}</span>
                        </div>
                        <div className="flex items-start gap-2 pt-1 border-t border-[#f5e4e7]">
                          <span className="font-['Quicksand'] font-bold text-[#766a70] uppercase text-[10px] shrink-0 mt-0.5">
                            Objective:
                          </span>
                          <span className="text-[#534247] leading-relaxed">{session.academicObjective}</span>
                        </div>
                      </div>

                      {/* Action Bar */}
                      <div className="flex flex-wrap items-center justify-between gap-2.5 pt-2">
                        <div className="flex items-center gap-2">
                          {session.materialsUrl && (
                            <span className="text-[11px] text-[#766a70] flex items-center gap-1 font-['Quicksand'] font-semibold bg-[#f8f9fa] px-2.5 py-1 rounded-lg border border-[#e9dde1]">
                              <span className="material-symbols-outlined text-[15px] text-[#964261]">description</span>
                              <span>{session.materialsUrl}</span>
                            </span>
                          )}
                          {session.hasHomeworkAssigned && (
                            <span className="text-[11px] text-[#b78103] font-['Quicksand'] font-bold bg-[#fff8e1] px-2 py-0.5 rounded-md border border-[#ffe082]">
                              Homework Assigned
                            </span>
                          )}
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => handleCopyMeetingLink(session.meetingLink, session.title)}
                            className="btn-tactile-secondary px-3 py-2 text-xs flex items-center gap-1.5 cursor-pointer"
                            title="Copy classroom meeting link"
                          >
                            <span className="material-symbols-outlined text-[16px]">content_copy</span>
                            <span>Copy Link</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => setSelectedSessionForDetail(session)}
                            className="btn-tactile-secondary px-3 py-2 text-xs flex items-center gap-1.5 cursor-pointer"
                          >
                            <span className="material-symbols-outlined text-[16px]">info</span>
                            <span>View Dossier</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => {
                              if (onLaunchMeeting) {
                                onLaunchMeeting(session);
                              } else {
                                showToast(`Connecting to ${session.classroomNumber} (${session.meetingRoomId})...`);
                              }
                            }}
                            className="btn-tactile-primary px-4 py-2 text-xs flex items-center gap-1.5 cursor-pointer shadow-xs"
                          >
                            <span className="material-symbols-outlined text-[17px]">videocam</span>
                            <span>Join Live Room</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-4 sm:p-5 border-t border-[#f5e4e7] bg-[#fff9fa] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-['Quicksand']">
              <div className="flex items-center gap-2 text-[#766a70]">
                <span className="material-symbols-outlined text-[18px] text-[#964261]">verified</span>
                <span>
                  Showing {modalDaySessions.length} of {modalAllDayCount} academic sessions for {modalDateObj.monthName} {modalDateObj.day}, {modalDateObj.year}
                </span>
              </div>

              <div className="flex items-center gap-2.5">
                <button
                  type="button"
                  onClick={() => {
                    setDraftDate(selectedDayForModal);
                    setIsScheduleModalOpen(true);
                  }}
                  className="btn-tactile-secondary px-3.5 py-2 text-xs flex items-center gap-1 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[16px]">add</span>
                  <span>Schedule Another Class</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setSelectedDayForModal(null);
                    setDayModalFilter('all');
                  }}
                  className="px-4 py-2 rounded-xl bg-white border border-[#e9dde1] text-[#22191b] font-bold hover:bg-[#fff0f2] transition-colors cursor-pointer"
                >
                  Close Modal
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 1: SESSION DETAIL DRAWER */}
      {selectedSessionForDetail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-fade-in">
          <div className="bg-white rounded-3xl border border-[#fbeaec] shadow-2xl w-full max-w-xl p-6 sm:p-7 space-y-5 animate-scale-up">
            {/* Header */}
            <div className="flex items-start justify-between pb-3 border-b border-[#f5e4e7]">
              <div>
                <span
                  className={`inline-block px-3 py-1 rounded-full text-xs font-bold font-['Quicksand'] border mb-2 ${getSessionBadgeStyle(
                    selectedSessionForDetail.sessionType
                  )}`}
                >
                  {getSessionTypeLabel(selectedSessionForDetail.sessionType)}
                </span>
                <h3 className="font-['Quicksand'] font-bold text-xl text-[#22191b] leading-tight">
                  {selectedSessionForDetail.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedSessionForDetail(null)}
                className="w-8 h-8 rounded-full bg-[#fff0f2] text-[#964261] hover:bg-[#ffe0e6] flex items-center justify-center cursor-pointer transition-colors"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>

            {/* Key Grid Details */}
            <div className="grid grid-cols-2 gap-4 text-xs font-['Quicksand']">
              <div className="p-3.5 rounded-2xl bg-[#fff8f8] border border-[#fbeaec] space-y-1">
                <span className="text-[10px] font-bold text-[#766a70] uppercase">Date & Time</span>
                <div className="font-bold text-[#22191b]">{selectedSessionForDetail.date}</div>
                <div className="text-[#964261] font-semibold">
                  {selectedSessionForDetail.timeDisplay}
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#fff8f8] border border-[#fbeaec] space-y-1">
                <span className="text-[10px] font-bold text-[#766a70] uppercase">Classroom Suite</span>
                <div className="font-bold text-[#22191b]">
                  {selectedSessionForDetail.classroomNumber}
                </div>
                <div className="text-[10px] text-[#006685] font-mono">
                  Room ID: {selectedSessionForDetail.meetingRoomId}
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#fff8f8] border border-[#fbeaec] space-y-1">
                <span className="text-[10px] font-bold text-[#766a70] uppercase">Assigned Instructor</span>
                <div className="font-bold text-[#22191b] flex items-center gap-1.5">
                  <span className="w-5 h-5 rounded-full bg-[#f48fb1] text-white flex items-center justify-center text-[10px] font-bold">
                    {selectedSessionForDetail.teacherAvatar}
                  </span>
                  <span>{selectedSessionForDetail.teacherName}</span>
                </div>
                <div className="text-[10px] text-[#534247]">
                  {selectedSessionForDetail.teacherRole}
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#fff8f8] border border-[#fbeaec] space-y-1">
                <span className="text-[10px] font-bold text-[#766a70] uppercase">
                  {selectedSessionForDetail.isOneOnOne ? 'Assigned Student' : 'Cohort Enrollment'}
                </span>
                <div className="font-bold text-[#22191b]">
                  {selectedSessionForDetail.isOneOnOne
                    ? selectedSessionForDetail.studentName
                    : selectedSessionForDetail.cohortName}
                </div>
                <div className="text-[10px] text-[#964261]">
                  {selectedSessionForDetail.isOneOnOne
                    ? selectedSessionForDetail.studentLevel
                    : `${selectedSessionForDetail.attendeeCount} Learners Registered`}
                </div>
              </div>
            </div>

            {/* Academic Topic & Objective */}
            <div className="p-4 rounded-2xl bg-[#fffcfc] border border-[#fbeaec] space-y-2 text-xs">
              <div>
                <span className="font-['Quicksand'] font-bold text-[#766a70] uppercase text-[10px]">
                  Lesson Topic
                </span>
                <p className="font-bold text-[#22191b] mt-0.5">
                  {selectedSessionForDetail.lessonTopic}
                </p>
              </div>
              <div className="pt-2 border-t border-[#f5e4e7]">
                <span className="font-['Quicksand'] font-bold text-[#766a70] uppercase text-[10px]">
                  Pedagogical Objective
                </span>
                <p className="text-[#534247] mt-0.5 leading-relaxed">
                  {selectedSessionForDetail.academicObjective}
                </p>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => {
                  setSelectedSessionForDetail(null);
                  if (onLaunchMeeting) onLaunchMeeting(selectedSessionForDetail);
                  else showToast(`Launching virtual classroom room ${selectedSessionForDetail.meetingRoomId}...`);
                }}
                className="w-full sm:flex-1 btn-tactile-primary py-3 text-xs flex items-center justify-center gap-2 cursor-pointer shadow-sm"
              >
                <span className="material-symbols-outlined text-[18px]">videocam</span>
                <span>Enter Live HD Classroom</span>
              </button>

              {selectedSessionForDetail.isOneOnOne && onNavigateToOneOnOne && (
                <button
                  type="button"
                  onClick={() => {
                    setSelectedSessionForDetail(null);
                    onNavigateToOneOnOne();
                  }}
                  className="w-full sm:w-auto btn-tactile-secondary py-3 px-4 text-xs flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[16px]">support_agent</span>
                  <span>View in 1-on-1 Workspace</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: SCHEDULE NEW SESSION MODAL */}
      {isScheduleModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-fade-in">
          <div className="bg-white rounded-3xl border border-[#fbeaec] shadow-2xl w-full max-w-lg p-6 sm:p-7 space-y-5 animate-scale-up">
            <div className="flex items-center justify-between pb-3 border-b border-[#f5e4e7]">
              <div>
                <h3 className="font-['Quicksand'] font-bold text-lg text-[#22191b]">
                  {role === 'ADMIN' ? 'Schedule Masterclass / Clinic' : 'Add Teaching Session to Timetable'}
                </h3>
                <p className="text-xs text-[#766a70]">
                  Reserve classroom suites, assign instructors, and notify enrolled students.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsScheduleModalOpen(false)}
                className="w-8 h-8 rounded-full bg-[#fff0f2] text-[#964261] hover:bg-[#ffe0e6] flex items-center justify-center cursor-pointer transition-colors"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>

            <form onSubmit={handleCreateSession} className="space-y-4 text-xs font-['Quicksand']">
              <div>
                <label className="block font-bold text-[#22191b] mb-1">Session Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. IELTS Band 7.5+ Writing Clinic: Paragraph Architecture"
                  value={draftTitle}
                  onChange={(e) => setDraftTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#e9dde1] bg-[#fff9f9] text-[#22191b] focus:outline-none focus:border-[#d8899d] focus:bg-white transition-all font-['Nunito_Sans'] text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-[#22191b] mb-1">Session Format</label>
                  <select
                    value={draftType}
                    onChange={(e) => setDraftType(e.target.value as SessionType)}
                    className="w-full px-3 py-2 rounded-xl border border-[#e9dde1] bg-[#fff9f9] text-[#22191b] font-bold focus:outline-none focus:border-[#d8899d]"
                  >
                    <option value="group_class">Group Cohort Masterclass</option>
                    <option value="one_on_one">1-on-1 Personalized Mentorship</option>
                    <option value="office_hours">Office Hours Slot</option>
                    <option value="placement_interview">Diagnostic Interview</option>
                    <option value="faculty_meeting">Faculty Moderation</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-[#22191b] mb-1">Date</label>
                  <input
                    type="date"
                    required
                    value={draftDate}
                    onChange={(e) => setDraftDate(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-[#e9dde1] bg-[#fff9f9] text-[#22191b] font-bold focus:outline-none focus:border-[#d8899d]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-[#22191b] mb-1">Start Time (MMT)</label>
                  <input
                    type="time"
                    required
                    value={draftStartTime}
                    onChange={(e) => setDraftStartTime(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-[#e9dde1] bg-[#fff9f9] text-[#22191b] font-bold focus:outline-none focus:border-[#d8899d]"
                  />
                </div>
                <div>
                  <label className="block font-bold text-[#22191b] mb-1">End Time (MMT)</label>
                  <input
                    type="time"
                    required
                    value={draftEndTime}
                    onChange={(e) => setDraftEndTime(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-[#e9dde1] bg-[#fff9f9] text-[#22191b] font-bold focus:outline-none focus:border-[#d8899d]"
                  />
                </div>
              </div>

              {role === 'ADMIN' && (
                <div>
                  <label className="block font-bold text-[#22191b] mb-1">Assigned Instructor</label>
                  <select
                    value={draftTeacherId}
                    onChange={(e) => setDraftTeacherId(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-[#e9dde1] bg-[#fff9f9] text-[#22191b] font-bold focus:outline-none focus:border-[#d8899d]"
                  >
                    {ALL_TEACHERS.filter((t) => t.id !== 'TCH-ALL').map((t) => (
                      <option key={t.id} value={t.id}>
                        {t.name} ({t.role})
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {draftType === 'one_on_one' ? (
                <div>
                  <label className="block font-bold text-[#22191b] mb-1">Student Name</label>
                  <input
                    type="text"
                    placeholder="e.g. Ko Kyaw Swar Min"
                    value={draftStudentName}
                    onChange={(e) => setDraftStudentName(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-[#e9dde1] bg-[#fff9f9] text-[#22191b] focus:outline-none focus:border-[#d8899d] font-['Nunito_Sans']"
                  />
                </div>
              ) : (
                <div>
                  <label className="block font-bold text-[#22191b] mb-1">Cohort Batch Name</label>
                  <input
                    type="text"
                    placeholder="e.g. Cohort 15 (Batch B)"
                    value={draftCohortName}
                    onChange={(e) => setDraftCohortName(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-[#e9dde1] bg-[#fff9f9] text-[#22191b] focus:outline-none focus:border-[#d8899d] font-['Nunito_Sans']"
                  />
                </div>
              )}

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-[#22191b] mb-1">Virtual Suite</label>
                  <input
                    type="text"
                    value={draftRoom}
                    onChange={(e) => setDraftRoom(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-[#e9dde1] bg-[#fff9f9] text-[#22191b] font-bold focus:outline-none focus:border-[#d8899d]"
                  />
                </div>
                <div>
                  <label className="block font-bold text-[#22191b] mb-1">Lesson Topic</label>
                  <input
                    type="text"
                    placeholder="e.g. Complex Sentence Synthesis"
                    value={draftTopic}
                    onChange={(e) => setDraftTopic(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-[#e9dde1] bg-[#fff9f9] text-[#22191b] focus:outline-none focus:border-[#d8899d]"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#f5e4e7]">
                <button
                  type="button"
                  onClick={() => setIsScheduleModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-[#e9dde1] text-[#534247] font-bold hover:bg-[#fff0f2] cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-tactile-primary px-5 py-2.5 text-xs flex items-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <span className="material-symbols-outlined text-[18px]">calendar_add_on</span>
                  <span>Confirm Schedule</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
