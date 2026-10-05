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
    <div className="flex flex-col w-full space-y-6">
      {/* ========================================================================= */}
      {/* QA CANONICAL INSPECTION CONTROL STRIP                                     */}
      {/* ========================================================================= */}
      <div className="rounded-xl bg-surface-container p-4 shadow-sm border border-outline-variant/30">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-xl">tune</span>
            <span className="font-label-sm text-label-sm text-on-surface uppercase tracking-wider font-bold text-xs">
              QA STU-LESSON-01 Canonical Inspection Control
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-1.5" id="qa-inspection-controls">
            <button
              type="button"
              onClick={() => handleStateChange('playing')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                lessonState === 'playing'
                  ? 'bg-primary text-on-primary shadow-sm font-bold'
                  : 'bg-surface-container-lowest text-on-surface-variant hover:text-on-surface'
              }`}
            >
              1. Default Video Playing
            </button>
            <button
              type="button"
              onClick={() => handleStateChange('paused')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                lessonState === 'paused'
                  ? 'bg-primary text-on-primary shadow-sm font-bold'
                  : 'bg-surface-container-lowest text-on-surface-variant hover:text-on-surface'
              }`}
            >
              2. Video Paused &amp; Notes Active
            </button>
            <button
              type="button"
              onClick={() => handleStateChange('completed')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                lessonState === 'completed'
                  ? 'bg-primary text-on-primary shadow-sm font-bold'
                  : 'bg-surface-container-lowest text-on-surface-variant hover:text-on-surface'
              }`}
            >
              3. Lecture Completed (Threshold Met)
            </button>
            <button
              type="button"
              onClick={() => handleStateChange('loading')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                lessonState === 'loading'
                  ? 'bg-primary text-on-primary shadow-sm font-bold'
                  : 'bg-surface-container-lowest text-on-surface-variant hover:text-on-surface'
              }`}
            >
              4. Loading Skeleton
            </button>
            <button
              type="button"
              onClick={() => handleStateChange('guard')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                lessonState === 'guard'
                  ? 'bg-primary text-on-primary shadow-sm font-bold'
                  : 'bg-surface-container-lowest text-on-surface-variant hover:text-on-surface'
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
      <section className="rounded-xl bg-surface-container-lowest p-5 shadow-sm border border-outline-variant/30">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <button
                type="button"
                onClick={() => onNavigateScreen('STU-LEARN-01')}
                className="inline-flex items-center gap-1 text-primary hover:text-primary-container font-label-md text-label-md transition-colors font-bold cursor-pointer"
              >
                <span className="material-symbols-outlined text-base">arrow_back</span>
                <span>Back to Syllabus Hub</span>
              </button>
              <span className="text-outline-variant">•</span>
              <span className="px-2.5 py-0.5 rounded-full bg-surface-container text-on-surface-variant font-label-sm text-label-sm">
                Track: General English • CEFR A1–A2 • 100% Free Open-Access
              </span>
            </div>

            <div className="flex flex-wrap items-baseline gap-3">
              <h1 className="font-headline-md text-headline-md text-on-surface tracking-tight text-xl sm:text-2xl font-bold font-serif">
                Module 01 / Lesson 1.1 — Parts of Speech &amp; Categorization
              </h1>
              <span className="text-label-md font-label-md text-outline text-xs">
                Essential English Grammar Mastery
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-surface-container-low text-on-surface text-xs">
              <span
                className={`material-symbols-outlined text-primary text-base ${
                  isPlaying ? 'animate-pulse' : ''
                }`}
              >
                {lessonState === 'completed'
                  ? 'check_circle'
                  : isPlaying
                  ? 'play_circle'
                  : 'pause_circle'}
              </span>
              <span className="font-label-sm text-label-sm font-semibold">
                {lessonState === 'completed'
                  ? 'Video Lecture • Completed • Proceed to Drill'
                  : isPlaying
                  ? 'Video Lecture • 14 Mins • Status: In Progress'
                  : 'Video Lecture • Paused at 04:15'}
              </span>
            </div>

            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-container text-secondary text-label-sm font-label-sm text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-secondary"></span>
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
              <div className="w-full aspect-video rounded-2xl bg-surface-container"></div>
              <div className="h-8 w-2/3 bg-surface-container rounded-lg"></div>
              <div className="h-32 bg-surface-container rounded-2xl"></div>
            </div>
            <div className="lg:col-span-4 space-y-4">
              <div className="h-64 bg-surface-container rounded-2xl"></div>
              <div className="h-40 bg-surface-container rounded-2xl"></div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* GUARD STATE                                                               */}
      {/* ========================================================================= */}
      {lessonState === 'guard' && (
        <div
          className="rounded-2xl bg-surface-container-lowest p-12 text-center shadow-sm border border-outline-variant/30 my-8 max-w-md mx-auto"
          id="guard-state-container"
        >
          <div className="w-16 h-16 rounded-full bg-surface-container mx-auto flex items-center justify-center text-primary mb-4 shadow-sm">
            <span className="material-symbols-outlined text-3xl">lock_clock</span>
          </div>
          <h2 className="font-headline-md text-headline-md text-on-surface font-bold text-xl font-serif mb-2">
            Lesson Node Temporarily Inactive
          </h2>
          <p className="font-body-md text-body-md text-on-surface-variant text-xs sm:text-sm mb-6 leading-relaxed">
            This canonical lecture is currently undergoing syllabus restructuring or scheduled content verification. No enrollment fee or commercial status is required.
          </p>
          <button
            type="button"
            onClick={() => handleStateChange('playing')}
            className="px-5 py-2.5 rounded-lg bg-primary text-on-primary font-label-lg text-label-lg hover:bg-primary-container transition-colors shadow-sm text-xs font-bold cursor-pointer"
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
            <div className="rounded-2xl bg-surface-container-lowest overflow-hidden shadow-sm flex flex-col border border-outline-variant/30">
              <div className="relative w-full aspect-video bg-[#21191d] flex flex-col justify-between p-4 group select-none overflow-hidden">
                <div className="absolute inset-0 opacity-25 bg-gradient-to-br from-primary via-surface-tint to-inverse-surface"></div>

                {/* Presentation Stage Overlay */}
                <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6">
                  <div className="max-w-xl space-y-3">
                    <span className="inline-block px-3 py-1 rounded-full bg-white/20 text-white backdrop-blur-sm text-label-sm font-label-sm uppercase tracking-wider text-[11px] font-bold">
                      Teacher Theint English • Academic Lecture
                    </span>
                    <h2 className="font-headline-lg text-headline-lg text-white tracking-normal font-serif text-2xl sm:text-3xl font-bold">
                      Parts of Speech &amp; Categorization
                    </h2>
                    <p className="font-body-md text-body-md text-white/80 max-w-lg mx-auto text-xs sm:text-sm">
                      Nouns, Verbs, Auxiliaries, Adjectives, Adverbs, Prepositions, Conjunctions &amp; Structural Syntax
                    </p>
                  </div>

                  {/* Central Play/Pause Watermark Button */}
                  <button
                    type="button"
                    onClick={toggleVideoPlayback}
                    className="mt-4 w-16 h-16 rounded-full bg-primary/90 hover:bg-primary text-on-primary flex items-center justify-center shadow-lg hover:scale-105 transition-all backdrop-blur-sm cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-3xl">
                      {isPlaying ? 'pause' : 'play_arrow'}
                    </span>
                  </button>
                </div>

                {/* Controls Layer */}
                <div className="relative z-20 w-full pt-4 bg-gradient-to-t from-black/90 via-black/50 to-transparent rounded-lg px-2 pb-1">
                  {/* Timeline Seek Bar */}
                  <div
                    onClick={handleSeek}
                    className="relative w-full h-2 bg-white/30 rounded-full cursor-pointer mb-3"
                  >
                    <div
                      className="absolute left-0 top-0 bottom-0 bg-primary rounded-full transition-all duration-300"
                      style={{ width: `${progressPercent}%` }}
                    ></div>
                    <div
                      className="absolute top-1/2 -translate-y-1/2 w-3.5 h-3.5 rounded-full bg-white shadow-md transition-all duration-150"
                      style={{ left: `calc(${progressPercent}% - 7px)` }}
                    ></div>
                  </div>

                  {/* Bottom Video Control Actions */}
                  <div className="flex items-center justify-between text-white font-label-md text-label-md text-xs">
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={toggleVideoPlayback}
                        className="hover:text-primary-fixed transition-colors flex items-center cursor-pointer"
                      >
                        <span className="material-symbols-outlined text-2xl">
                          {isPlaying ? 'pause' : 'play_arrow'}
                        </span>
                      </button>

                      <div className="flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-xl">volume_up</span>
                        <div className="w-16 h-1.5 bg-white/40 rounded-full relative">
                          <div className="w-3/4 h-full bg-white rounded-full"></div>
                        </div>
                      </div>

                      <span className="font-label-sm text-label-sm text-white/80 tracking-wider">
                        {currentTimecode}
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="px-2 py-0.5 rounded text-[10px] bg-white/20 text-white font-bold">
                        1080p HD
                      </span>
                      <span className="font-bold text-xs">1.0x</span>
                      <span className="material-symbols-outlined text-xl cursor-pointer">fullscreen</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Progress Track Status Notification Bar */}
              <div className="px-6 py-3.5 bg-surface-container-low flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-t border-outline-variant/20 text-xs">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-secondary text-lg">
                    {lessonState === 'completed' ? 'check_circle' : 'timelapse'}
                  </span>
                  <span className="font-label-md text-label-md text-on-surface font-semibold">
                    {lessonState === 'completed'
                      ? 'Lesson Completion Status: Lecture Completed (Threshold Verified)'
                      : isPlaying
                      ? 'Lesson Completion Status: In Progress (Lecture watch threshold pending completion)'
                      : 'Lesson Completion Status: Paused at 04:15'}
                  </span>
                </div>
                <span className="font-label-sm text-label-sm text-on-surface-variant">
                  Watch Threshold Target: Continuous Segment Validation
                </span>
              </div>
            </div>

            {/* Tabbed Navigation Bar */}
            <div className="rounded-xl bg-surface-container-lowest p-2 shadow-sm flex items-center gap-1 border border-outline-variant/30 text-xs">
              <button
                type="button"
                onClick={() => setActiveTab('notes')}
                className={`flex-1 py-2.5 px-4 rounded-lg font-bold text-center transition-all cursor-pointer ${
                  activeTab === 'notes'
                    ? 'bg-primary text-on-primary shadow-sm'
                    : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container'
                }`}
              >
                Lesson Notes &amp; Transcript
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('syllabus')}
                className={`flex-1 py-2.5 px-4 rounded-lg font-bold text-center transition-all cursor-pointer ${
                  activeTab === 'syllabus'
                    ? 'bg-primary text-on-primary shadow-sm'
                    : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container'
                }`}
              >
                Syllabus Outline
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('invariants')}
                className={`flex-1 py-2.5 px-4 rounded-lg font-bold text-center transition-all cursor-pointer ${
                  activeTab === 'invariants'
                    ? 'bg-primary text-on-primary shadow-sm'
                    : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container'
                }`}
              >
                Academic Invariants
              </button>
            </div>

            {/* TAB PANEL 1: NOTES & TRANSCRIPT */}
            {activeTab === 'notes' && (
              <div className="space-y-6" id="panel-notes">
                {/* 8 Parts of Speech Academic Table */}
                <div className="rounded-2xl bg-surface-container-lowest p-6 shadow-sm space-y-5 border border-outline-variant/30">
                  <div className="flex items-center justify-between">
                    <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold text-base sm:text-lg">
                      Core Concept: The Eight Parts of Speech (ဝါစင်္ဂ ၈ မျိုး)
                    </h3>
                    <span className="px-2.5 py-1 rounded bg-surface-container text-primary font-label-sm text-label-sm text-xs font-bold">
                      Lecture Core Unit
                    </span>
                  </div>
                  <p className="font-body-md text-body-md text-on-surface-variant text-xs sm:text-sm leading-relaxed">
                    Every word in the English language performs a designated structural duty inside an independent or dependent clause. Categorization is determined strictly by syntactic function, not mere superficial spelling.
                  </p>

                  <div className="overflow-x-auto rounded-xl bg-surface-container-low p-1 border border-outline-variant/20">
                    <table className="w-full text-left border-collapse text-xs">
                      <thead>
                        <tr className="bg-surface-container text-on-surface-variant font-label-sm text-label-sm uppercase tracking-wider text-[11px] font-bold">
                          <th className="py-3 px-4">Part of Speech</th>
                          <th className="py-3 px-4">Syntactic Function</th>
                          <th className="py-3 px-4">Academic Example</th>
                          <th className="py-3 px-4">Burmese Gloss (အဓိပ္ပာယ်ဖွင့်ဆိုချက်)</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-surface-container-highest/60 font-body-sm text-body-sm text-on-surface">
                        <tr className="hover:bg-surface-container-lowest/50 transition-colors">
                          <td className="py-3 px-4 font-bold text-primary">1. Noun</td>
                          <td className="py-3 px-4">Identifies person, place, entity, or abstraction</td>
                          <td className="py-3 px-4 italic font-sans">
                            <span className="font-bold text-secondary">Theint</span> teaches daily.
                          </td>
                          <td className="py-3 px-4 text-on-surface-variant">နာမ် (ပုဂ္ဂိုလ်၊ နေရာ၊ အရာဝတ္ထု)</td>
                        </tr>
                        <tr className="hover:bg-surface-container-lowest/50 transition-colors">
                          <td className="py-3 px-4 font-bold text-primary">2. Pronoun</td>
                          <td className="py-3 px-4">Substitutes for an antecedent noun</td>
                          <td className="py-3 px-4 italic font-sans">
                            <span className="font-bold text-secondary">She</span> explains clearly.
                          </td>
                          <td className="py-3 px-4 text-on-surface-variant">နာမ်စား (နာမ်အစားထိုးစကားလုံး)</td>
                        </tr>
                        <tr className="hover:bg-surface-container-lowest/50 transition-colors">
                          <td className="py-3 px-4 font-bold text-primary">3. Verb</td>
                          <td className="py-3 px-4">Expresses dynamic action, state, or copular link</td>
                          <td className="py-3 px-4 italic font-sans">
                            Students <span className="font-bold text-secondary">understand</span> syntax.
                          </td>
                          <td className="py-3 px-4 text-on-surface-variant">ကြိယာ (လုပ်ဆောင်မှု သို့မဟုတ် အခြေအနေ)</td>
                        </tr>
                        <tr className="hover:bg-surface-container-lowest/50 transition-colors">
                          <td className="py-3 px-4 font-bold text-primary">4. Adjective</td>
                          <td className="py-3 px-4">Qualifies or delimits a noun or pronoun</td>
                          <td className="py-3 px-4 italic font-sans">
                            She offers <span className="font-bold text-secondary">rigorous</span> drills.
                          </td>
                          <td className="py-3 px-4 text-on-surface-variant">နာမဝိသေသန (နာမ်ကို အထူးပြုစကားလုံး)</td>
                        </tr>
                        <tr className="hover:bg-surface-container-lowest/50 transition-colors">
                          <td className="py-3 px-4 font-bold text-primary">5. Adverb</td>
                          <td className="py-3 px-4">Modifies verbs, adjectives, or fellow adverbs</td>
                          <td className="py-3 px-4 italic font-sans">
                            He writes <span className="font-bold text-secondary">exceptionally</span> well.
                          </td>
                          <td className="py-3 px-4 text-on-surface-variant">ကြိယာဝိသေသန (ကြိယာ/နာမဝိသေသနကို အထူးပြု)</td>
                        </tr>
                        <tr className="hover:bg-surface-container-lowest/50 transition-colors">
                          <td className="py-3 px-4 font-bold text-primary">6. Preposition</td>
                          <td className="py-3 px-4">Shows spatial, temporal, or logical relationship</td>
                          <td className="py-3 px-4 italic font-sans">
                            Knowledge resides <span className="font-bold text-secondary">in</span> practice.
                          </td>
                          <td className="py-3 px-4 text-on-surface-variant">ဝိဘတ် (တည်နေရာ/အချိန် ဆက်စပ်စကားလုံး)</td>
                        </tr>
                        <tr className="hover:bg-surface-container-lowest/50 transition-colors">
                          <td className="py-3 px-4 font-bold text-primary">7. Conjunction</td>
                          <td className="py-3 px-4">Connects words, phrases, or clauses</td>
                          <td className="py-3 px-4 italic font-sans">
                            Listen <span className="font-bold text-secondary">and</span> reproduce correctly.
                          </td>
                          <td className="py-3 px-4 text-on-surface-variant">စကားစပ် (ဝါကျ သို့မဟုတ် စကားစု ဆက်စပ်စကားလုံး)</td>
                        </tr>
                        <tr className="hover:bg-surface-container-lowest/50 transition-colors">
                          <td className="py-3 px-4 font-bold text-primary">8. Interjection</td>
                          <td className="py-3 px-4">Expresses abrupt affective reaction</td>
                          <td className="py-3 px-4 italic font-sans">
                            <span className="font-bold text-secondary">Aha!</span> The pattern is clear.
                          </td>
                          <td className="py-3 px-4 text-on-surface-variant">အာမေဍိတ် (စိတ်လှုပ်ရှားမှုပြ စကားလုံး)</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* PDF Reference Card */}
                <div className="rounded-2xl bg-surface-container-lowest p-5 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4 border border-outline-variant/30">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-surface-container flex items-center justify-center text-primary shrink-0">
                      <span className="material-symbols-outlined text-2xl">picture_as_pdf</span>
                    </div>
                    <div>
                      <h4 className="font-headline-sm text-headline-sm text-on-surface font-bold text-sm">
                        Official Lecture Summary Notes
                      </h4>
                      <p className="font-body-sm text-body-sm text-on-surface-variant text-xs">
                        Document Code: TTE-M01-L01-NOTES.pdf • Comprehensive Syntax Matrix &amp; Gloss
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    className="px-4 py-2 rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface font-label-md text-label-md transition-colors flex items-center gap-2 text-xs font-semibold cursor-pointer shrink-0"
                  >
                    <span className="material-symbols-outlined text-base">visibility</span>
                    <span>Launch In-App Reader</span>
                  </button>
                </div>

                {/* Downstream Exercise Teaser & Dispatch Card */}
                <div className="rounded-2xl bg-surface-container-high p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6 border border-outline-variant/30">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-full bg-primary text-on-primary font-label-sm text-label-sm uppercase tracking-wide text-[10px] font-bold">
                        Up Next: Diagnostic Auto-Drill
                      </span>
                      <span className="font-label-sm text-label-sm text-secondary font-semibold text-xs">
                        15 Prompts
                      </span>
                    </div>
                    <h3 className="font-headline-sm text-headline-sm text-on-surface font-serif text-lg font-bold">
                      Instant Auto-Drill: Categorization Benchmarking
                    </h3>
                    <p className="font-body-md text-body-md text-on-surface-variant max-w-xl text-xs sm:text-sm">
                      100% automated diagnostic evaluation on Parts of Speech categorization. No manual teacher queue or scheduling required. Instant analytical feedback on completion.
                    </p>
                  </div>

                  <div className="flex-shrink-0">
                    <button
                      type="button"
                      onClick={() => onNavigateScreen('STU-EX-01')}
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary hover:bg-primary-container text-on-primary font-label-lg text-label-lg shadow-md transition-all group text-xs font-bold cursor-pointer"
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
              <div className="rounded-2xl bg-surface-container-lowest p-6 shadow-sm space-y-4 border border-outline-variant/30 text-xs">
                <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold text-base">
                  Curricular Structure: Essential English Grammar
                </h3>
                <p className="font-body-md text-body-md text-on-surface-variant">
                  Complete outline of Module 01 foundational topics and diagnostic gates.
                </p>
                <div className="space-y-2 pt-2">
                  <div className="p-3 rounded-lg bg-surface-container-low flex justify-between items-center border border-primary/20">
                    <span className="font-bold text-primary">Lesson 1.1: Parts of Speech &amp; Categorization</span>
                    <span className="text-[11px] font-bold text-secondary">Active Session</span>
                  </div>
                  <div className="p-3 rounded-lg bg-surface-container-lowest flex justify-between items-center text-on-surface-variant border border-outline-variant/20">
                    <span>Lesson 1.2: Present Simple vs Present Continuous</span>
                    <span>Scheduled (18m)</span>
                  </div>
                  <div className="p-3 rounded-lg bg-surface-container-lowest flex justify-between items-center text-on-surface-variant border border-outline-variant/20">
                    <span>Lesson 1.3: Subject-Verb Agreement &amp; Irregular Verbs</span>
                    <span>Scheduled (20m)</span>
                  </div>
                </div>
              </div>
            )}

            {/* TAB PANEL 3: ACADEMIC INVARIANTS */}
            {activeTab === 'invariants' && (
              <div className="rounded-2xl bg-surface-container-lowest p-6 shadow-sm space-y-4 border border-outline-variant/30 text-xs">
                <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold text-base">
                  System Governance &amp; Pedagogical Principles
                </h3>
                <div className="space-y-3 font-body-md text-body-md text-on-surface-variant leading-relaxed">
                  <div className="p-4 rounded-xl bg-surface-container-low border border-outline-variant/20">
                    <strong className="text-on-surface block mb-1">Decoupled Enrollment Architecture</strong>
                    This open-access course operates completely independently from paid tutoring batches. Access to video lectures and automated drills is unconditional.
                  </div>
                  <div className="p-4 rounded-xl bg-surface-container-low border border-outline-variant/20">
                    <strong className="text-on-surface block mb-1">Instant Algorithmic Evaluation</strong>
                    All student evaluations use deterministic rubric parsing without human grading bottlenecks.
                  </div>
                </div>
              </div>
            )}
          </section>

          {/* RIGHT COLUMN: Contextual Learning Sidebar (~32%) */}
          <aside className="lg:col-span-4 flex flex-col space-y-6">
            {/* Course Progress Card */}
            <div className="rounded-2xl bg-surface-container-lowest p-5 shadow-sm space-y-3 border border-outline-variant/30 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider font-bold text-[10px]">
                  Overall Trajectory
                </span>
                <span className="font-label-md text-label-md text-primary font-bold">
                  1 of 24 Lessons Initiated
                </span>
              </div>
              <div className="w-full h-2 rounded-full bg-surface-container overflow-hidden">
                <div className="h-full bg-primary rounded-full" style={{ width: '4.16%' }}></div>
              </div>
              <p className="font-body-sm text-body-sm text-outline text-[11px]">
                Pacing: Self-directed. Complete each auto-drill to unlock downstream checkpoints.
              </p>
            </div>

            {/* Module & Lesson Drawer */}
            <div className="rounded-2xl bg-surface-container-lowest p-5 shadow-sm space-y-4 border border-outline-variant/30 text-xs">
              <div className="flex items-center justify-between">
                <div>
                  <span className="font-label-sm text-label-sm text-primary uppercase tracking-wider font-bold text-[10px]">
                    Active Unit
                  </span>
                  <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold text-sm mt-0.5">
                    Module 01: Core Foundations
                  </h3>
                </div>
                <span className="material-symbols-outlined text-outline">folder_open</span>
              </div>

              <div className="space-y-2">
                {/* Lesson 1.1: CURRENT */}
                <div className="p-3.5 rounded-xl bg-surface-container border-l-4 border-primary space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-label-sm text-label-sm text-primary font-bold">
                      Lesson 1.1 • Current
                    </span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-primary text-on-primary">
                      14 mins
                    </span>
                  </div>
                  <h4 className="font-label-md text-label-md text-on-surface font-semibold text-xs">
                    Parts of Speech &amp; Categorization
                  </h4>
                  <div className="flex items-center gap-1.5 text-secondary font-semibold text-[11px] pt-1">
                    <span className="material-symbols-outlined text-sm">play_arrow</span>
                    <span>Playing in workspace</span>
                  </div>
                </div>

                {/* Lesson 1.2: UPCOMING */}
                <div className="p-3.5 rounded-xl bg-surface-container-lowest hover:bg-surface-container-low transition-colors space-y-1 border border-outline-variant/20">
                  <div className="flex items-center justify-between text-outline text-[11px]">
                    <span>Lesson 1.2</span>
                    <span>18 mins</span>
                  </div>
                  <h4 className="font-label-md text-label-md text-on-surface text-xs font-medium">
                    Present Simple vs Present Continuous
                  </h4>
                  <span className="text-[10px] text-outline block">Upcoming Lecture</span>
                </div>

                {/* Lesson 1.6: CHECKPOINT */}
                <div className="p-3.5 rounded-xl bg-surface-container-low space-y-1 border border-outline-variant/20">
                  <div className="flex items-center justify-between text-primary font-bold text-[11px]">
                    <span className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-sm">verified</span>
                      Checkpoint 1.6
                    </span>
                    <span>Benchmark 80%</span>
                  </div>
                  <h4 className="font-label-md text-label-md text-on-surface font-semibold text-xs">
                    Module 1 Synthesis &amp; Diagnostic
                  </h4>
                  <button
                    type="button"
                    onClick={() => onNavigateScreen('STU-EX-01')}
                    className="text-[11px] text-primary font-bold hover:underline cursor-pointer block text-left"
                  >
                    Open Diagnostic Drill →
                  </button>
                </div>
              </div>

              {/* Next Module Peeker */}
              <div className="pt-3 border-t border-surface-container-highest flex items-center justify-between text-on-surface-variant text-xs">
                <div>
                  <span className="text-outline text-[10px] block font-bold uppercase">Next Stage</span>
                  <span className="font-medium text-on-surface">Module 02: Tense Systems &amp; Narrative</span>
                </div>
                <span className="px-2 py-0.5 rounded text-[10px] bg-surface-container font-semibold">
                  6 Lessons
                </span>
              </div>
            </div>

            {/* Academic Invariants Architecture Card */}
            <div className="rounded-2xl bg-surface-container-low p-5 space-y-4 border border-outline-variant/30 text-xs">
              <div className="flex items-center gap-2 text-primary font-bold">
                <span className="material-symbols-outlined text-lg">policy</span>
                <h4 className="uppercase tracking-wider text-[11px]">Academic Invariants</h4>
              </div>
              <ul className="space-y-3 font-body-sm text-body-sm text-on-surface-variant">
                <li className="flex items-start gap-2.5">
                  <span className="material-symbols-outlined text-primary text-base mt-0.5">check_circle</span>
                  <div>
                    <strong className="text-on-surface font-semibold block">Decoupled Enrollment</strong>
                    Published Free Course open-access. No payment, credit card, or bank slip verification required.
                  </div>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="material-symbols-outlined text-primary text-base mt-0.5">check_circle</span>
                  <div>
                    <strong className="text-on-surface font-semibold block">Instant Auto-Graded Drills</strong>
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
