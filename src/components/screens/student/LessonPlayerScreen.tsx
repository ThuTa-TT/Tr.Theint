import React, { useState } from 'react';
import { ScreenId } from '../../../types/navigation';

interface LessonPlayerScreenProps {
  onNavigateScreen: (screenId: ScreenId) => void;
}

type LessonState = 'playing' | 'paused' | 'completed' | 'loading' | 'guard';
type ActiveTab = 'notes' | 'syllabus' | 'invariants';

export const LessonPlayerScreen: React.FC<LessonPlayerScreenProps> = ({
  onNavigateScreen,
}) => {
  const [lessonState, setLessonState] = useState<LessonState>('playing');
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<ActiveTab>('notes');
  const [progressPercent, setProgressPercent] = useState<number>(30.3);
  const [currentTimecode, setCurrentTimecode] = useState<string>('04:15 / 14:00');

  const handleStateChange = (state: LessonState) => {
    setLessonState(state);
    if (state === 'playing') {
      setIsPlaying(true);
      setProgressPercent(30.3);
      setCurrentTimecode('04:15 / 14:00');
    } else if (state === 'paused') {
      setIsPlaying(false);
      setProgressPercent(30.3);
      setCurrentTimecode('04:15 / 14:00');
    } else if (state === 'completed') {
      setIsPlaying(false);
      setProgressPercent(100);
      setCurrentTimecode('14:00 / 14:00');
    }
  };

  const toggleVideoPlayback = () => {
    if (isPlaying) {
      handleStateChange('paused');
    } else {
      handleStateChange('playing');
    }
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (clickX / rect.width) * 100));
    setProgressPercent(percentage);
    const totalSec = 14 * 60;
    const currentSec = Math.floor((percentage / 100) * totalSec);
    const m = Math.floor(currentSec / 60).toString().padStart(2, '0');
    const s = (currentSec % 60).toString().padStart(2, '0');
    setCurrentTimecode(`${m}:${s} / 14:00`);
  };

  return (
    <div className="flex flex-col w-full space-y-6 font-['Nunito_Sans']">
      {/* ========================================================================= */}
      {/* QA CANONICAL INSPECTION CONTROL STRIP                                     */}
      {/* ========================================================================= */}
      <div className="rounded-2xl bg-white/95 p-4 shadow-sm border border-[#f48fb1]/30">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#fff0f2] flex items-center justify-center text-[#964261]">
              <span className="material-symbols-outlined text-lg">tune</span>
            </div>
            <span className="font-['Quicksand'] uppercase tracking-wider font-bold text-xs text-[#22191b]">
              QA STU-LESSON-01 Canonical Inspection Control
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-1.5" id="qa-inspection-controls">
            <button
              type="button"
              onClick={() => handleStateChange('playing')}
              className={`px-3 py-1.5 rounded-full text-xs font-['Quicksand'] font-bold transition-all cursor-pointer ${
                lessonState === 'playing'
                  ? 'bg-[#f48fb1] text-white shadow-sm border-b-2 border-[#d87395]'
                  : 'bg-[#fff0f2] text-[#534247] hover:bg-[#fbeaec] hover:text-[#22191b]'
              }`}
            >
              1. Default Video Playing
            </button>
            <button
              type="button"
              onClick={() => handleStateChange('paused')}
              className={`px-3 py-1.5 rounded-full text-xs font-['Quicksand'] font-bold transition-all cursor-pointer ${
                lessonState === 'paused'
                  ? 'bg-[#f48fb1] text-white shadow-sm border-b-2 border-[#d87395]'
                  : 'bg-[#fff0f2] text-[#534247] hover:bg-[#fbeaec] hover:text-[#22191b]'
              }`}
            >
              2. Video Paused &amp; Notes Active
            </button>
            <button
              type="button"
              onClick={() => handleStateChange('completed')}
              className={`px-3 py-1.5 rounded-full text-xs font-['Quicksand'] font-bold transition-all cursor-pointer ${
                lessonState === 'completed'
                  ? 'bg-[#a5d6a7] text-[#22191b] shadow-sm border-b-2 border-[#81c784]'
                  : 'bg-[#fff0f2] text-[#534247] hover:bg-[#fbeaec] hover:text-[#22191b]'
              }`}
            >
              3. Lecture Completed (Threshold Met)
            </button>
            <button
              type="button"
              onClick={() => handleStateChange('loading')}
              className={`px-3 py-1.5 rounded-full text-xs font-['Quicksand'] font-bold transition-all cursor-pointer ${
                lessonState === 'loading'
                  ? 'bg-[#81d4fa] text-[#004d61] shadow-sm border-b-2 border-[#4fc3f7]'
                  : 'bg-[#fff0f2] text-[#534247] hover:bg-[#fbeaec] hover:text-[#22191b]'
              }`}
            >
              4. Loading Skeleton
            </button>
            <button
              type="button"
              onClick={() => handleStateChange('guard')}
              className={`px-3 py-1.5 rounded-full text-xs font-['Quicksand'] font-bold transition-all cursor-pointer ${
                lessonState === 'guard'
                  ? 'bg-[#ffe082] text-[#503f00] shadow-sm border-b-2 border-[#ffd54f]'
                  : 'bg-[#fff0f2] text-[#534247] hover:bg-[#fbeaec] hover:text-[#22191b]'
              }`}
            >
              5. Content Unavailable / Guard
            </button>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* PRIMARY TOP LEARNING CONTEXT HEADER                                       */}
      {/* ========================================================================= */}
      <section className="rounded-3xl bg-white p-6 shadow-sm border border-[#f48fb1]/20">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <button
                type="button"
                onClick={() => onNavigateScreen('STU-LEARN-01')}
                className="inline-flex items-center gap-1.5 text-[#964261] hover:text-[#722544] font-['Quicksand'] font-bold transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined text-base">arrow_back</span>
                <span>Back to Syllabus Hub</span>
              </button>
              <span className="text-[#d8c1c6]">•</span>
              <span className="px-3 py-1 rounded-full bg-[#fff0f2] text-[#722544] font-['Quicksand'] font-bold text-xs border border-[#f48fb1]/30">
                Track: General English • CEFR A1–A2 • 100% Free Open-Access
              </span>
            </div>

            <div className="flex flex-wrap items-baseline gap-3">
              <h1 className="font-['Quicksand'] text-[#22191b] tracking-tight text-xl sm:text-2xl font-bold">
                Module 01 / Lesson 1.1 — Parts of Speech &amp; Categorization
              </h1>
              <span className="font-['Quicksand'] text-[#867277] text-xs font-semibold">
                Essential English Grammar Mastery
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#fff0f2] text-[#22191b] text-xs border border-[#f48fb1]/20">
              <span
                className={`material-symbols-outlined text-[#964261] text-base ${
                  isPlaying ? 'animate-pulse' : ''
                }`}
              >
                {lessonState === 'completed'
                  ? 'check_circle'
                  : isPlaying
                  ? 'play_circle'
                  : 'pause_circle'}
              </span>
              <span className="font-['Quicksand'] font-bold">
                {lessonState === 'completed'
                  ? 'Video Lecture • Completed • Proceed to Drill'
                  : isPlaying
                  ? 'Video Lecture • 14 Mins • Status: In Progress'
                  : 'Video Lecture • Paused at 04:15'}
              </span>
            </div>

            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#81d4fa]/20 text-[#005d79] font-['Quicksand'] text-xs font-bold border border-[#81d4fa]/40">
              <span className="w-2 h-2 rounded-full bg-[#006685]"></span>
              Decoupled Open-Access
            </span>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SKELETON STATE                                                            */}
      {/* ========================================================================= */}
      {lessonState === 'loading' && (
        <div className="space-y-6 animate-pulse py-8" id="skeleton-state-container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-8 space-y-4">
              <div className="w-full aspect-video rounded-3xl bg-[#fbeaec]"></div>
              <div className="h-8 w-2/3 bg-[#fbeaec] rounded-2xl"></div>
              <div className="h-32 bg-[#fbeaec] rounded-3xl"></div>
            </div>
            <div className="lg:col-span-4 space-y-4">
              <div className="h-64 bg-[#fbeaec] rounded-3xl"></div>
              <div className="h-40 bg-[#fbeaec] rounded-3xl"></div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* GUARD STATE                                                               */}
      {/* ========================================================================= */}
      {lessonState === 'guard' && (
        <div
          className="rounded-3xl bg-white p-12 text-center shadow-sm border border-[#f48fb1]/30 my-8 max-w-md mx-auto"
          id="guard-state-container"
        >
          <div className="w-16 h-16 rounded-full bg-[#fff0f2] mx-auto flex items-center justify-center text-[#964261] mb-4 shadow-sm border border-[#f48fb1]/30">
            <span className="material-symbols-outlined text-3xl">lock_clock</span>
          </div>
          <h2 className="font-['Quicksand'] text-[#22191b] font-bold text-xl mb-2">
            Lesson Node Temporarily Inactive
          </h2>
          <p className="text-[#534247] text-xs sm:text-sm mb-6 leading-relaxed">
            This canonical lecture is currently undergoing syllabus restructuring or scheduled content verification. No enrollment fee or commercial status is required.
          </p>
          <button
            type="button"
            onClick={() => handleStateChange('playing')}
            className="px-6 py-2.5 rounded-full bg-[#f48fb1] hover:bg-[#d87395] text-white font-['Quicksand'] font-bold transition-all shadow-md border-b-2 border-[#d87395] active:translate-y-0.5 text-xs cursor-pointer"
          >
            Return to Active Lecture
          </button>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MAIN WORKSPACE CONTAINER (Playing / Paused / Completed)                   */}
      {/* ========================================================================= */}
      {lessonState !== 'loading' && lessonState !== 'guard' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start" id="main-workspace-container">
          {/* LEFT COLUMN: Main Learning Surface (~68%) */}
          <section className="lg:col-span-8 flex flex-col space-y-6">
            {/* Video Player Viewport Container */}
            <div className="rounded-3xl bg-white overflow-hidden shadow-sm flex flex-col border border-[#f48fb1]/30">
              <div className="relative w-full aspect-video bg-[#21191d] flex flex-col justify-between p-4 group select-none overflow-hidden">
                <div className="absolute inset-0 opacity-30 bg-gradient-to-br from-[#964261] via-[#f48fb1] to-[#21191d]"></div>

                {/* Presentation Stage Overlay */}
                <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6">
                  <div className="max-w-xl space-y-3">
                    <span className="inline-block px-3.5 py-1 rounded-full bg-white/20 text-white backdrop-blur-sm font-['Quicksand'] uppercase tracking-wider text-[11px] font-bold border border-white/30">
                      Teacher Theint English • Academic Lecture
                    </span>
                    <h2 className="font-['Quicksand'] text-white tracking-normal text-2xl sm:text-3xl font-bold">
                      Parts of Speech &amp; Categorization
                    </h2>
                    <p className="text-white/85 max-w-lg mx-auto text-xs sm:text-sm">
                      Nouns, Verbs, Auxiliaries, Adjectives, Adverbs, Prepositions, Conjunctions &amp; Structural Syntax
                    </p>
                  </div>

                  {/* Central Play/Pause Watermark Button */}
                  <button
                    type="button"
                    onClick={toggleVideoPlayback}
                    className="mt-4 w-16 h-16 rounded-full bg-[#f48fb1] hover:bg-[#d87395] text-white flex items-center justify-center shadow-lg hover:scale-105 active:scale-95 transition-all border-2 border-white/40 cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-3xl">
                      {isPlaying ? 'pause' : 'play_arrow'}
                    </span>
                  </button>
                </div>

                {/* Controls Layer */}
                <div className="relative z-20 w-full pt-4 bg-gradient-to-t from-black/90 via-black/50 to-transparent rounded-2xl px-3 pb-1">
                  {/* Timeline Seek Bar */}
                  <div
                    onClick={handleSeek}
                    className="relative w-full h-2 bg-white/30 rounded-full cursor-pointer mb-3 overflow-visible"
                  >
                    <div
                      className="absolute left-0 top-0 bottom-0 bg-gradient-to-r from-[#ffe082] via-[#81d4fa] to-[#f48fb1] rounded-full transition-all duration-300"
                      style={{ width: `${progressPercent}%` }}
                    ></div>
                    <div
                      className="absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-white shadow-md border-2 border-[#f48fb1] transition-all duration-150"
                      style={{ left: `calc(${progressPercent}% - 8px)` }}
                    ></div>
                  </div>

                  {/* Bottom Video Control Actions */}
                  <div className="flex items-center justify-between text-white font-['Quicksand'] text-xs font-bold">
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={toggleVideoPlayback}
                        className="hover:text-[#f48fb1] transition-colors flex items-center cursor-pointer"
                      >
                        <span className="material-symbols-outlined text-2xl">
                          {isPlaying ? 'pause' : 'play_arrow'}
                        </span>
                      </button>

                      <div className="flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-xl">volume_up</span>
                        <div className="w-16 h-1.5 bg-white/40 rounded-full relative overflow-hidden">
                          <div className="w-3/4 h-full bg-[#81d4fa] rounded-full"></div>
                        </div>
                      </div>

                      <span className="text-white/80 tracking-wider">
                        {currentTimecode}
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="px-2 py-0.5 rounded-full text-[10px] bg-white/20 text-white font-bold">
                        1080p HD
                      </span>
                      <span className="font-bold text-xs">1.0x</span>
                      <span className="material-symbols-outlined text-xl cursor-pointer hover:text-[#f48fb1]">fullscreen</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Progress Track Status Notification Bar */}
              <div className="px-6 py-3.5 bg-[#fff0f2] flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-t border-[#f48fb1]/20 text-xs">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#006685] text-lg">
                    {lessonState === 'completed' ? 'check_circle' : 'timelapse'}
                  </span>
                  <span className="text-[#22191b] font-['Quicksand'] font-bold">
                    {lessonState === 'completed'
                      ? 'Lesson Completion Status: Lecture Completed (Threshold Verified)'
                      : isPlaying
                      ? 'Lesson Completion Status: In Progress (Lecture watch threshold pending completion)'
                      : 'Lesson Completion Status: Paused at 04:15'}
                  </span>
                </div>
                <span className="text-[#534247] font-semibold">
                  Watch Threshold Target: Continuous Segment Validation
                </span>
              </div>
            </div>

            {/* Tabbed Navigation Bar */}
            <div className="rounded-2xl bg-white p-1.5 shadow-sm flex items-center gap-1 border border-[#f48fb1]/30 text-xs">
              <button
                type="button"
                onClick={() => setActiveTab('notes')}
                className={`flex-1 py-2.5 px-4 rounded-xl font-['Quicksand'] font-bold text-center transition-all cursor-pointer ${
                  activeTab === 'notes'
                    ? 'bg-[#f48fb1] text-white shadow-sm'
                    : 'text-[#534247] hover:text-[#22191b] hover:bg-[#fff0f2]'
                }`}
              >
                Lesson Notes &amp; Transcript
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('syllabus')}
                className={`flex-1 py-2.5 px-4 rounded-xl font-['Quicksand'] font-bold text-center transition-all cursor-pointer ${
                  activeTab === 'syllabus'
                    ? 'bg-[#f48fb1] text-white shadow-sm'
                    : 'text-[#534247] hover:text-[#22191b] hover:bg-[#fff0f2]'
                }`}
              >
                Syllabus Outline
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('invariants')}
                className={`flex-1 py-2.5 px-4 rounded-xl font-['Quicksand'] font-bold text-center transition-all cursor-pointer ${
                  activeTab === 'invariants'
                    ? 'bg-[#f48fb1] text-white shadow-sm'
                    : 'text-[#534247] hover:text-[#22191b] hover:bg-[#fff0f2]'
                }`}
              >
                Academic Invariants
              </button>
            </div>

            {/* TAB PANEL 1: NOTES & TRANSCRIPT */}
            {activeTab === 'notes' && (
              <div className="space-y-6" id="panel-notes">
                {/* 8 Parts of Speech Academic Table */}
                <div className="rounded-3xl bg-white p-6 shadow-sm space-y-5 border border-[#f48fb1]/30">
                  <div className="flex items-center justify-between">
                    <h3 className="font-['Quicksand'] text-[#22191b] font-bold text-base sm:text-lg">
                      Core Concept: The Eight Parts of Speech (ဝါစင်္ဂ ၈ မျိုး)
                    </h3>
                    <span className="px-3 py-1 rounded-full bg-[#fff0f2] text-[#964261] font-['Quicksand'] text-xs font-bold border border-[#f48fb1]/30">
                      Lecture Core Unit
                    </span>
                  </div>
                  <p className="text-[#534247] text-xs sm:text-sm leading-relaxed">
                    Every word in the English language performs a designated structural duty inside an independent or dependent clause. Categorization is determined strictly by syntactic function, not mere superficial spelling.
                  </p>

                  <div className="overflow-x-auto rounded-2xl bg-[#fff8f8] p-1 border border-[#f48fb1]/20">
                    <table className="w-full text-left border-collapse text-xs">
                      <thead>
                        <tr className="bg-[#fff0f2] text-[#534247] font-['Quicksand'] uppercase tracking-wider text-[11px] font-bold">
                          <th className="py-3 px-4 rounded-l-xl">Part of Speech</th>
                          <th className="py-3 px-4">Syntactic Function</th>
                          <th className="py-3 px-4">Academic Example</th>
                          <th className="py-3 px-4 rounded-r-xl">Burmese Gloss (အဓိပ္ပာယ်ဖွင့်ဆိုချက်)</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#f5e4e7] text-[#22191b]">
                        <tr className="hover:bg-white transition-colors">
                          <td className="py-3 px-4 font-bold text-[#964261]">1. Noun</td>
                          <td className="py-3 px-4">Identifies person, place, entity, or abstraction</td>
                          <td className="py-3 px-4 italic font-sans">
                            <span className="font-bold text-[#006685]">Theint</span> teaches daily.
                          </td>
                          <td className="py-3 px-4 text-[#534247]">နာမ် (ပုဂ္ဂိုလ်၊ နေရာ၊ အရာဝတ္ထု)</td>
                        </tr>
                        <tr className="hover:bg-white transition-colors">
                          <td className="py-3 px-4 font-bold text-[#964261]">2. Pronoun</td>
                          <td className="py-3 px-4">Substitutes for an antecedent noun</td>
                          <td className="py-3 px-4 italic font-sans">
                            <span className="font-bold text-[#006685]">She</span> explains clearly.
                          </td>
                          <td className="py-3 px-4 text-[#534247]">နာမ်စား (နာမ်အစားထိုးစကားလုံး)</td>
                        </tr>
                        <tr className="hover:bg-white transition-colors">
                          <td className="py-3 px-4 font-bold text-[#964261]">3. Verb</td>
                          <td className="py-3 px-4">Expresses dynamic action, state, or copular link</td>
                          <td className="py-3 px-4 italic font-sans">
                            Students <span className="font-bold text-[#006685]">understand</span> syntax.
                          </td>
                          <td className="py-3 px-4 text-[#534247]">ကြိယာ (လုပ်ဆောင်မှု သို့မဟုတ် အခြေအနေ)</td>
                        </tr>
                        <tr className="hover:bg-white transition-colors">
                          <td className="py-3 px-4 font-bold text-[#964261]">4. Adjective</td>
                          <td className="py-3 px-4">Qualifies or delimits a noun or pronoun</td>
                          <td className="py-3 px-4 italic font-sans">
                            She offers <span className="font-bold text-[#006685]">rigorous</span> drills.
                          </td>
                          <td className="py-3 px-4 text-[#534247]">နာမဝိသေသန (နာမ်ကို အထူးပြုစကားလုံး)</td>
                        </tr>
                        <tr className="hover:bg-white transition-colors">
                          <td className="py-3 px-4 font-bold text-[#964261]">5. Adverb</td>
                          <td className="py-3 px-4">Modifies verbs, adjectives, or fellow adverbs</td>
                          <td className="py-3 px-4 italic font-sans">
                            He writes <span className="font-bold text-[#006685]">exceptionally</span> well.
                          </td>
                          <td className="py-3 px-4 text-[#534247]">ကြိယာဝိသေသန (ကြိယာ/နာမဝိသေသနကို အထူးပြု)</td>
                        </tr>
                        <tr className="hover:bg-white transition-colors">
                          <td className="py-3 px-4 font-bold text-[#964261]">6. Preposition</td>
                          <td className="py-3 px-4">Shows spatial, temporal, or logical relationship</td>
                          <td className="py-3 px-4 italic font-sans">
                            Knowledge resides <span className="font-bold text-[#006685]">in</span> practice.
                          </td>
                          <td className="py-3 px-4 text-[#534247]">ဝိဘတ် (တည်နေရာ/အချိန် ဆက်စပ်စကားလုံး)</td>
                        </tr>
                        <tr className="hover:bg-white transition-colors">
                          <td className="py-3 px-4 font-bold text-[#964261]">7. Conjunction</td>
                          <td className="py-3 px-4">Connects words, phrases, or clauses</td>
                          <td className="py-3 px-4 italic font-sans">
                            Listen <span className="font-bold text-[#006685]">and</span> reproduce correctly.
                          </td>
                          <td className="py-3 px-4 text-[#534247]">စကားစပ် (ဝါကျ သို့မဟုတ် စကားစု ဆက်စပ်စကားလုံး)</td>
                        </tr>
                        <tr className="hover:bg-white transition-colors">
                          <td className="py-3 px-4 font-bold text-[#964261]">8. Interjection</td>
                          <td className="py-3 px-4">Expresses abrupt affective reaction</td>
                          <td className="py-3 px-4 italic font-sans">
                            <span className="font-bold text-[#006685]">Aha!</span> The pattern is clear.
                          </td>
                          <td className="py-3 px-4 text-[#534247]">အာမေဍိတ် (စိတ်လှုပ်ရှားမှုပြ စကားလုံး)</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* PDF Reference Card */}
                <div className="rounded-3xl bg-white p-5 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4 border border-[#f48fb1]/30">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-[#fff0f2] flex items-center justify-center text-[#964261] shrink-0 border border-[#f48fb1]/30">
                      <span className="material-symbols-outlined text-2xl">picture_as_pdf</span>
                    </div>
                    <div>
                      <h4 className="font-['Quicksand'] text-[#22191b] font-bold text-sm">
                        Official Lecture Summary Notes
                      </h4>
                      <p className="text-[#534247] text-xs">
                        Document Code: TTE-M01-L01-NOTES.pdf • Comprehensive Syntax Matrix &amp; Gloss
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    className="px-4 py-2 rounded-full bg-[#fff0f2] hover:bg-[#fbeaec] text-[#964261] font-['Quicksand'] font-bold transition-colors flex items-center gap-2 text-xs border border-[#f48fb1]/30 cursor-pointer shrink-0"
                  >
                    <span className="material-symbols-outlined text-base">visibility</span>
                    <span>Launch In-App Reader</span>
                  </button>
                </div>

                {/* Downstream Exercise Teaser & Dispatch Card */}
                <div className="rounded-3xl bg-gradient-to-r from-[#fff0f2] via-[#fff8f8] to-[#fbeaec] p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6 border border-[#f48fb1]/30">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="px-3 py-0.5 rounded-full bg-[#f48fb1] text-white font-['Quicksand'] uppercase tracking-wide text-[10px] font-bold">
                        Up Next: Diagnostic Auto-Drill
                      </span>
                      <span className="font-['Quicksand'] text-[#006685] font-bold text-xs">
                        15 Prompts
                      </span>
                    </div>
                    <h3 className="font-['Quicksand'] text-[#22191b] text-lg font-bold">
                      Instant Auto-Drill: Categorization Benchmarking
                    </h3>
                    <p className="text-[#534247] max-w-xl text-xs sm:text-sm">
                      100% automated diagnostic evaluation on Parts of Speech categorization. No manual teacher queue or scheduling required. Instant analytical feedback on completion.
                    </p>
                  </div>

                  <div className="flex-shrink-0">
                    <button
                      type="button"
                      onClick={() => onNavigateScreen('STU-EX-01')}
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#f48fb1] hover:bg-[#d87395] text-white font-['Quicksand'] font-bold shadow-md transition-all group text-xs border-b-2 border-[#d87395] active:translate-y-0.5 cursor-pointer"
                    >
                      <span>Start Auto-Drill</span>
                      <span className="material-symbols-outlined text-lg group-hover:translate-x-1 transition-transform">
                        arrow_forward
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* TAB PANEL 2: SYLLABUS OUTLINE */}
            {activeTab === 'syllabus' && (
              <div className="rounded-3xl bg-white p-6 shadow-sm space-y-4 border border-[#f48fb1]/30 text-xs">
                <h3 className="font-['Quicksand'] text-[#22191b] font-bold text-base">
                  Curricular Structure: Essential English Grammar
                </h3>
                <p className="text-[#534247]">
                  Complete outline of Module 01 foundational topics and diagnostic gates.
                </p>
                <div className="space-y-2 pt-2">
                  <div className="p-3.5 rounded-2xl bg-[#fff0f2] flex justify-between items-center border border-[#f48fb1]/40">
                    <span className="font-['Quicksand'] font-bold text-[#964261]">Lesson 1.1: Parts of Speech &amp; Categorization</span>
                    <span className="text-[11px] font-['Quicksand'] font-bold text-[#006685] bg-[#81d4fa]/20 px-2.5 py-0.5 rounded-full">Active Session</span>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-white flex justify-between items-center text-[#534247] border border-[#f48fb1]/20">
                    <span>Lesson 1.2: Present Simple vs Present Continuous</span>
                    <span>Scheduled (18m)</span>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-white flex justify-between items-center text-[#534247] border border-[#f48fb1]/20">
                    <span>Lesson 1.3: Subject-Verb Agreement &amp; Irregular Verbs</span>
                    <span>Scheduled (20m)</span>
                  </div>
                </div>
              </div>
            )}

            {/* TAB PANEL 3: ACADEMIC INVARIANTS */}
            {activeTab === 'invariants' && (
              <div className="rounded-3xl bg-white p-6 shadow-sm space-y-4 border border-[#f48fb1]/30 text-xs">
                <h3 className="font-['Quicksand'] text-[#22191b] font-bold text-base">
                  System Governance &amp; Pedagogical Principles
                </h3>
                <div className="space-y-3 text-[#534247] leading-relaxed">
                  <div className="p-4 rounded-2xl bg-[#fff0f2] border border-[#f48fb1]/20">
                    <strong className="text-[#22191b] font-['Quicksand'] block mb-1">Decoupled Enrollment Architecture</strong>
                    This open-access course operates completely independently from paid tutoring batches. Access to video lectures and automated drills is unconditional.
                  </div>
                  <div className="p-4 rounded-2xl bg-[#fff0f2] border border-[#f48fb1]/20">
                    <strong className="text-[#22191b] font-['Quicksand'] block mb-1">Instant Algorithmic Evaluation</strong>
                    All student evaluations use deterministic rubric parsing without human grading bottlenecks.
                  </div>
                </div>
              </div>
            )}
          </section>

          {/* RIGHT COLUMN: Contextual Learning Sidebar (~32%) */}
          <aside className="lg:col-span-4 flex flex-col space-y-6">
            {/* Course Progress Card */}
            <div className="rounded-3xl bg-white p-5 shadow-sm space-y-3 border border-[#f48fb1]/30 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-['Quicksand'] text-[#534247] uppercase tracking-wider font-bold text-[10px]">
                  Overall Trajectory
                </span>
                <span className="font-['Quicksand'] text-[#964261] font-bold">
                  1 of 24 Lessons Initiated
                </span>
              </div>
              <div className="w-full h-2 rounded-full bg-[#fbeaec] overflow-hidden">
                <div className="h-full bg-gradient-to-r from-[#ffe082] via-[#81d4fa] to-[#f48fb1] rounded-full" style={{ width: '4.16%' }}></div>
              </div>
              <p className="text-[#867277] text-[11px]">
                Pacing: Self-directed. Complete each auto-drill to unlock downstream checkpoints.
              </p>
            </div>

            {/* Module & Lesson Drawer */}
            <div className="rounded-3xl bg-white p-5 shadow-sm space-y-4 border border-[#f48fb1]/30 text-xs">
              <div className="flex items-center justify-between">
                <div>
                  <span className="font-['Quicksand'] text-[#964261] uppercase tracking-wider font-bold text-[10px]">
                    Active Unit
                  </span>
                  <h3 className="font-['Quicksand'] text-[#22191b] font-bold text-sm mt-0.5">
                    Module 01: Core Foundations
                  </h3>
                </div>
                <span className="material-symbols-outlined text-[#867277]">folder_open</span>
              </div>

              <div className="space-y-2">
                {/* Lesson 1.1: CURRENT */}
                <div className="p-3.5 rounded-2xl bg-[#fff0f2] border-l-4 border-[#f48fb1] space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-['Quicksand'] text-[#964261] font-bold">
                      Lesson 1.1 • Current
                    </span>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#f48fb1] text-white">
                      14 mins
                    </span>
                  </div>
                  <h4 className="font-['Quicksand'] text-[#22191b] font-bold text-xs">
                    Parts of Speech &amp; Categorization
                  </h4>
                  <div className="flex items-center gap-1.5 text-[#006685] font-semibold text-[11px] pt-1">
                    <span className="material-symbols-outlined text-sm">play_arrow</span>
                    <span>Playing in workspace</span>
                  </div>
                </div>

                {/* Lesson 1.2: UPCOMING */}
                <div className="p-3.5 rounded-2xl bg-white hover:bg-[#fff0f2] transition-colors space-y-1 border border-[#f48fb1]/20">
                  <div className="flex items-center justify-between text-[#867277] text-[11px]">
                    <span className="font-['Quicksand'] font-semibold">Lesson 1.2</span>
                    <span>18 mins</span>
                  </div>
                  <h4 className="text-[#22191b] text-xs font-semibold">
                    Present Simple vs Present Continuous
                  </h4>
                  <span className="text-[10px] text-[#867277] block">Upcoming Lecture</span>
                </div>

                {/* Lesson 1.6: CHECKPOINT */}
                <div className="p-3.5 rounded-2xl bg-[#fff0f2]/60 space-y-1 border border-[#f48fb1]/20">
                  <div className="flex items-center justify-between text-[#964261] font-bold text-[11px]">
                    <span className="flex items-center gap-1 font-['Quicksand']">
                      <span className="material-symbols-outlined text-sm text-[#a5d6a7]">verified</span>
                      Checkpoint 1.6
                    </span>
                    <span className="bg-[#a5d6a7]/30 text-[#1b5e20] px-2 py-0.5 rounded-full text-[10px]">Benchmark 80%</span>
                  </div>
                  <h4 className="text-[#22191b] font-semibold text-xs">
                    Module 1 Synthesis &amp; Diagnostic
                  </h4>
                  <button
                    type="button"
                    onClick={() => onNavigateScreen('STU-EX-01')}
                    className="text-[11px] text-[#964261] font-['Quicksand'] font-bold hover:underline cursor-pointer block text-left"
                  >
                    Open Diagnostic Drill →
                  </button>
                </div>
              </div>

              {/* Next Module Peeker */}
              <div className="pt-3 border-t border-[#f48fb1]/20 flex items-center justify-between text-[#534247] text-xs">
                <div>
                  <span className="text-[#867277] text-[10px] block font-bold uppercase font-['Quicksand']">Next Stage</span>
                  <span className="font-semibold text-[#22191b]">Module 02: Tense Systems &amp; Narrative</span>
                </div>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] bg-[#fff0f2] text-[#964261] font-bold">
                  6 Lessons
                </span>
              </div>
            </div>

            {/* Academic Invariants Architecture Card */}
            <div className="rounded-3xl bg-white p-5 space-y-4 border border-[#f48fb1]/30 text-xs shadow-sm">
              <div className="flex items-center gap-2 text-[#964261] font-bold">
                <span className="material-symbols-outlined text-lg">policy</span>
                <h4 className="font-['Quicksand'] uppercase tracking-wider text-[11px]">Academic Invariants</h4>
              </div>
              <ul className="space-y-3 text-[#534247]">
                <li className="flex items-start gap-2.5">
                  <span className="material-symbols-outlined text-[#a5d6a7] text-base mt-0.5">check_circle</span>
                  <div>
                    <strong className="text-[#22191b] font-['Quicksand'] font-bold block">Decoupled Enrollment</strong>
                    Published Free Course open-access. No payment, credit card, or bank slip verification required.
                  </div>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="material-symbols-outlined text-[#a5d6a7] text-base mt-0.5">check_circle</span>
                  <div>
                    <strong className="text-[#22191b] font-['Quicksand'] font-bold block">Instant Auto-Graded Drills</strong>
                    Downstream practice drills are 100% auto-graded by deterministic heuristics. No manual instructor queue.
                  </div>
                </li>
              </ul>
            </div>
          </aside>
        </div>
      )}
    </div>
  );
};
