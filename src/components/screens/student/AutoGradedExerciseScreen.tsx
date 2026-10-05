import React, { useState } from 'react';
import { ScreenId } from '../../../types/navigation';

interface AutoGradedExerciseScreenProps {
  onNavigateScreen: (screenId: ScreenId) => void;
}

type QAState = 'unanswered' | 'selected' | 'listening';

export const AutoGradedExerciseScreen: React.FC<AutoGradedExerciseScreenProps> = ({
  onNavigateScreen,
}) => {
  const [qaState, setQaState] = useState<QAState>('selected');
  const [selectedOption, setSelectedOption] = useState<string>('opt-b');
  const [activeQuestion, setActiveQuestion] = useState<number>(14);
  const [isExitModalOpen, setIsExitModalOpen] = useState<boolean>(false);
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState<boolean>(false);
  const [audioPlaying, setAudioPlaying] = useState<boolean>(false);
  const [audioProgress, setAudioProgress] = useState<number>(17);
  const [audioTime, setAudioTime] = useState<string>('00:18');
  const [listeningSelectedOption, setListeningSelectedOption] = useState<string>('');

  const handleSelectOption = (optId: string) => {
    setSelectedOption(optId);
  };

  const clearSelection = () => {
    setSelectedOption('');
  };

  const handleQAStateChange = (state: QAState) => {
    setQaState(state);
    if (state === 'unanswered') {
      clearSelection();
      setActiveQuestion(14);
    } else if (state === 'selected') {
      setSelectedOption('opt-b');
      setActiveQuestion(14);
    } else if (state === 'listening') {
      setActiveQuestion(41);
    }
  };

  const toggleAudio = () => {
    if (!audioPlaying) {
      setAudioPlaying(true);
      setAudioProgress(45);
      setAudioTime('00:48');
    } else {
      setAudioPlaying(false);
      setAudioProgress(17);
      setAudioTime('00:18');
    }
  };

  const executeFinalSubmission = () => {
    setIsSubmitModalOpen(false);
    onNavigateScreen('STU-EX-02');
  };

  return (
    <div className="flex flex-col w-full space-y-6">
      {/* ========================================================================= */}
      {/* QA Inspection Controller Ribbon                                           */}
      {/* ========================================================================= */}
      <aside
        aria-label="QA Inspection Controller"
        className="w-full bg-[#f3e4ea] text-[#21191d] px-4 sm:px-6 py-2.5 rounded-xl shadow-xs border border-[#d8c1c5]/40"
      >
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center gap-1.5 bg-[#93415a] text-white px-2.5 py-1 rounded text-[11px] font-bold uppercase tracking-wider">
              <span className="material-symbols-outlined text-[14px]">tune</span>
              <span>QA Controller</span>
            </div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#8d4a5c]">
              STU-PLACE-02 / STU-EX-01 • Canonical: /placement-test/start
            </span>
            <span className="bg-white text-[#93415a] px-2.5 py-1 rounded text-[11px] font-bold shadow-2xs">
              Lifecycle: IN_PROGRESS
            </span>
            <span className="bg-white text-[#68585d] px-2.5 py-1 rounded text-[11px] font-bold shadow-2xs">
              Authority: System ≠ Advisory ≠ Official
            </span>
          </div>

          {/* State Simulation Controls */}
          <div
            aria-label="Assessment QA State Selectors"
            className="flex flex-wrap items-center gap-1.5"
            role="toolbar"
          >
            <button
              id="qa-btn-unanswered"
              onClick={() => handleQAStateChange('unanswered')}
              type="button"
              className={`px-3 py-1 rounded text-xs font-semibold transition-colors cursor-pointer ${
                qaState === 'unanswered'
                  ? 'bg-[#93415a] text-white font-bold shadow-xs'
                  : 'bg-white text-[#534246] hover:text-[#93415a] border border-[#d8c1c5]/40'
              }`}
            >
              1. Q14 (Unanswered)
            </button>
            <button
              id="qa-btn-selected"
              onClick={() => handleQAStateChange('selected')}
              type="button"
              className={`px-3 py-1 rounded text-xs font-semibold transition-colors cursor-pointer ${
                qaState === 'selected'
                  ? 'bg-[#93415a] text-white font-bold shadow-xs'
                  : 'bg-white text-[#534246] hover:text-[#93415a] border border-[#d8c1c5]/40'
              }`}
            >
              2. Q14 (Selected Demo)
            </button>
            <button
              id="qa-btn-listening"
              onClick={() => handleQAStateChange('listening')}
              type="button"
              className={`px-3 py-1 rounded text-xs font-semibold transition-colors cursor-pointer ${
                qaState === 'listening'
                  ? 'bg-[#93415a] text-white font-bold shadow-xs'
                  : 'bg-white text-[#534246] hover:text-[#93415a] border border-[#d8c1c5]/40'
              }`}
            >
              3. Listening Task Item
            </button>
            <button
              id="qa-btn-modal"
              onClick={() => setIsSubmitModalOpen(true)}
              type="button"
              className="px-3 py-1 rounded bg-white text-[#8d4a5c] hover:bg-[#ffd9e0] text-xs font-semibold transition-colors cursor-pointer border border-[#d8c1c5]/40"
            >
              4. Final Submission Modal
            </button>
          </div>
        </div>
      </aside>

      {/* ========================================================================= */}
      {/* Focused Examination Sub-Bar                                               */}
      {/* ========================================================================= */}
      <section
        aria-label="Exam Session Parameters"
        className="w-full bg-white rounded-2xl shadow-xs border border-[#d8c1c5]/30 p-4 sm:p-5"
      >
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          {/* Title & Protocol */}
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-[#f3e4ea] flex items-center justify-center text-[#93415a] shrink-0 shadow-2xs">
              <span className="material-symbols-outlined text-[24px]">assignment_turned_in</span>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <h1 className="font-serif text-xl sm:text-2xl text-[#21191d] font-bold leading-tight">
                  General Academic Diagnostic
                </h1>
                <span className="bg-[#f3e4ea] text-[#93415a] px-2 py-0.5 rounded text-[11px] font-bold uppercase tracking-wide">
                  SEC-PLA-04
                </span>
              </div>
              <span className="text-xs text-[#534246]">
                Continuous Syntactic, Lexical &amp; Oral Discourse Evaluation
              </span>
            </div>
          </div>

          {/* Center Timer Pill */}
          <div className="flex items-center justify-center">
            <div className="inline-flex items-center gap-2.5 bg-[#f9eaef] px-4 py-2 rounded-full shadow-inner border border-[#d8c1c5]/40">
              <span className="material-symbols-outlined text-[#93415a] text-[20px] animate-pulse">
                timer
              </span>
              <div className="flex items-baseline gap-1.5">
                <span className="font-serif text-lg text-[#21191d] font-bold tracking-tight" id="session-timer">
                  42:15
                </span>
                <span className="text-[11px] text-[#534246] uppercase tracking-wider font-semibold">
                  Remaining (60m Window)
                </span>
              </div>
            </div>
          </div>

          {/* Student Badge & Safe Exit */}
          <div className="flex items-center gap-3 justify-end">
            <div className="hidden sm:flex flex-col text-right">
              <span className="text-xs font-semibold text-[#21191d]">Su Myat Noe</span>
              <span className="text-[11px] text-[#8d4a5c]">TTE-2024-8841 • Intensive</span>
            </div>
            <button
              onClick={() => setIsExitModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#f3e4ea] hover:bg-[#f9eaef] text-[#534246] text-xs font-semibold transition-colors cursor-pointer shadow-2xs"
              type="button"
            >
              <span className="material-symbols-outlined text-[18px]">pause_circle</span>
              <span>Save &amp; Pause</span>
            </button>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* Assessment Progress Track Bar                                             */}
      {/* ========================================================================= */}
      <section
        aria-label="Diagnostic Progress Indicator"
        className="w-full bg-[#FCFAF9] p-3.5 rounded-xl border border-[#d8c1c5]/30 shadow-2xs"
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs gap-1.5 mb-2">
            <div className="flex items-center gap-2">
              <span className="font-bold text-[#93415a]">
                Question {activeQuestion} of 50 Diagnostic Items
              </span>
              <span className="text-[#867276]">•</span>
              <span className="text-[#534246]">
                28% Completed (13 Answered, 37 Pending)
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-[#8d4a5c] font-semibold text-xs">
              <span className="material-symbols-outlined text-[16px]">account_tree</span>
              <span>Section II: Syntactic Reasoning &amp; Complex Clause Analysis</span>
            </div>
          </div>
          {/* Track bar */}
          <div className="w-full h-2 rounded-full bg-[#eddfe4] overflow-hidden">
            <div
              className="h-full bg-[#93415a] transition-all duration-500 rounded-full"
              style={{ width: `${(activeQuestion / 50) * 100}%` }}
            ></div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* Main Diagnostic Workspace (2 Columns)                                     */}
      {/* ========================================================================= */}
      <div className="w-full max-w-7xl mx-auto flex-1">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Primary Question Column (Approx 70%) */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            {/* Standard Written MCQ Stimulus & Task */}
            {qaState !== 'listening' && (
              <article
                className="bg-white rounded-2xl shadow-xs p-6 sm:p-8 flex flex-col gap-6 border border-[#d8c1c5]/30"
                id="diagnostic-stimulus-card"
              >
                {/* Stimulus Metadata Header */}
                <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-[#eddfe4]/60">
                  <div className="flex items-center gap-2">
                    <span className="bg-[#b05973] text-white px-2.5 py-0.5 rounded font-bold text-[11px] uppercase tracking-wide">
                      Item 14
                    </span>
                    <span className="text-[11px] font-bold text-[#534246] uppercase tracking-wider">
                      Single-Select Syntactic Diagnostic
                    </span>
                  </div>
                  <div className="inline-flex items-center gap-1 text-[#8d4a5c] text-[11px] font-bold bg-[#f9eaef] px-2.5 py-0.5 rounded">
                    <span className="material-symbols-outlined text-[14px]">balance</span>
                    <span>Weight: 2.0 Academic Points</span>
                  </div>
                </div>

                {/* Academic Source / Literature Excerpt Box */}
                <div className="bg-[#fff0f5] rounded-xl p-5 sm:p-6 flex flex-col gap-2.5 border border-[#d8c1c5]/30">
                  <div className="flex items-center gap-1.5 text-[#534246] text-[11px] uppercase tracking-wide font-bold">
                    <span className="material-symbols-outlined text-[16px] text-[#93415a]">menu_book</span>
                    <span>Academic Literature Passage • Socio-Economic Geography (Yangon &amp; Regional Metropolises, 2023)</span>
                  </div>
                  <blockquote className="font-serif text-lg sm:text-xl text-[#21191d] leading-relaxed pl-2 italic">
                    “Despite the accelerated rate of urban densification across Southeast Asian secondary capitals, the structural integration of informal municipal transit arteries remains profoundly fragmented, thereby{' '}
                    <span className="inline-block px-2 py-0.5 mx-1 bg-[#eddfe4] rounded text-[#93415a] font-bold not-italic underline decoration-[#93415a] decoration-2 underline-offset-4">
                      ________
                    </span>{' '}
                    standard municipal zoning frameworks.”
                  </blockquote>
                </div>

                {/* Question Prompt Directives */}
                <div className="space-y-1">
                  <h2 className="font-serif text-base sm:text-lg font-bold text-[#21191d]">
                    Instructional Directive
                  </h2>
                  <p className="text-xs sm:text-sm text-[#534246] leading-relaxed">
                    Select the grammatical and lexical completion that correctly maintains subordinate clause coherence, non-finite participial logic, and formal academic register:
                  </p>
                </div>

                {/* Interactive MCQ Choices Form */}
                <fieldset aria-label="Syntactic Options" className="space-y-2.5">
                  <legend className="sr-only">Diagnostic multiple choice options for Item 14</legend>

                  {/* Option A (Distractor) */}
                  <label
                    id="label-opt-a"
                    onClick={() => handleSelectOption('opt-a')}
                    className={`flex items-start gap-4 p-4 rounded-xl cursor-pointer transition-all border ${
                      selectedOption === 'opt-a'
                        ? 'bg-[#ffd9e0]/40 border-[#93415a] shadow-xs'
                        : 'bg-white hover:bg-[#fff0f5] border-[#d8c1c5]/40 shadow-2xs'
                    }`}
                  >
                    <input
                      className="mt-1 w-4 h-4 text-[#93415a] focus:ring-[#93415a] accent-[#93415a]"
                      id="opt-a"
                      name="item-14-choice"
                      type="radio"
                      value="A"
                      checked={selectedOption === 'opt-a'}
                      onChange={() => handleSelectOption('opt-a')}
                    />
                    <div className="flex-1 flex flex-col">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-xs sm:text-sm text-[#21191d]">
                          A. subverting inadvertently the integrity of
                        </span>
                        <span className="text-[10px] text-[#867276] uppercase tracking-wider font-semibold">
                          Distractor 1
                        </span>
                      </div>
                      <span className="text-xs text-[#534246] mt-1">
                        Syntactic word order error; post-verbal adverb placement impedes natural clause cadence.
                      </span>
                    </div>
                  </label>

                  {/* Option B (Selected / Key) */}
                  <label
                    id="label-opt-b"
                    onClick={() => handleSelectOption('opt-b')}
                    className={`flex items-start gap-4 p-4 rounded-xl cursor-pointer transition-all border ${
                      selectedOption === 'opt-b'
                        ? 'bg-[#ffd9e0]/40 border-[#93415a] shadow-md ring-1 ring-[#93415a]/40'
                        : 'bg-white hover:bg-[#fff0f5] border-[#d8c1c5]/40 shadow-2xs'
                    }`}
                  >
                    <input
                      className="mt-1 w-4 h-4 text-[#93415a] focus:ring-[#93415a] accent-[#93415a]"
                      id="opt-b"
                      name="item-14-choice"
                      type="radio"
                      value="B"
                      checked={selectedOption === 'opt-b'}
                      onChange={() => handleSelectOption('opt-b')}
                    />
                    <div className="flex-1 flex flex-col">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-xs sm:text-sm text-[#21191d]">
                          B. undermining the procedural efficacy of
                        </span>
                        <span className="bg-[#93415a] text-white text-[10px] font-bold px-2 py-0.5 rounded">
                          Selected Response
                        </span>
                      </div>
                      <span className="text-xs text-[#534246] mt-1 leading-relaxed">
                        Accurate complex non-finite participial phrase governing a nominal clause complement with elevated register.
                      </span>
                    </div>
                  </label>

                  {/* Option C (Distractor) */}
                  <label
                    id="label-opt-c"
                    onClick={() => handleSelectOption('opt-c')}
                    className={`flex items-start gap-4 p-4 rounded-xl cursor-pointer transition-all border ${
                      selectedOption === 'opt-c'
                        ? 'bg-[#ffd9e0]/40 border-[#93415a] shadow-xs'
                        : 'bg-white hover:bg-[#fff0f5] border-[#d8c1c5]/40 shadow-2xs'
                    }`}
                  >
                    <input
                      className="mt-1 w-4 h-4 text-[#93415a] focus:ring-[#93415a] accent-[#93415a]"
                      id="opt-c"
                      name="item-14-choice"
                      type="radio"
                      value="C"
                      checked={selectedOption === 'opt-c'}
                      onChange={() => handleSelectOption('opt-c')}
                    />
                    <div className="flex-1 flex flex-col">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-xs sm:text-sm text-[#21191d]">
                          C. which are resulting in complications towards
                        </span>
                        <span className="text-[10px] text-[#867276] uppercase tracking-wider font-semibold">
                          Distractor 2
                        </span>
                      </div>
                      <span className="text-xs text-[#534246] mt-1">
                        Faulty relative pronoun anchor following ‘thereby’ and awkward prepositional collocation.
                      </span>
                    </div>
                  </label>

                  {/* Option D (Distractor) */}
                  <label
                    id="label-opt-d"
                    onClick={() => handleSelectOption('opt-d')}
                    className={`flex items-start gap-4 p-4 rounded-xl cursor-pointer transition-all border ${
                      selectedOption === 'opt-d'
                        ? 'bg-[#ffd9e0]/40 border-[#93415a] shadow-xs'
                        : 'bg-white hover:bg-[#fff0f5] border-[#d8c1c5]/40 shadow-2xs'
                    }`}
                  >
                    <input
                      className="mt-1 w-4 h-4 text-[#93415a] focus:ring-[#93415a] accent-[#93415a]"
                      id="opt-d"
                      name="item-14-choice"
                      type="radio"
                      value="D"
                      checked={selectedOption === 'opt-d'}
                      onChange={() => handleSelectOption('opt-d')}
                    />
                    <div className="flex-1 flex flex-col">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-xs sm:text-sm text-[#21191d]">
                          D. to have been disassociated from
                        </span>
                        <span className="text-[10px] text-[#867276] uppercase tracking-wider font-semibold">
                          Distractor 3
                        </span>
                      </div>
                      <span className="text-xs text-[#534246] mt-1">
                        Unwarranted perfect passive infinitive aspect causing temporal discordance with the introductory clause.
                      </span>
                    </div>
                  </label>
                </fieldset>

                {/* Action Footbar */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-[#eddfe4]/60">
                  <button
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg bg-[#f3e4ea] hover:bg-[#f9eaef] text-[#21191d] text-xs font-bold transition-colors shadow-2xs cursor-pointer"
                    type="button"
                    onClick={() => setActiveQuestion(13)}
                  >
                    <span className="material-symbols-outlined text-[18px]">arrow_back</span>
                    <span>Previous Item (Item 13)</span>
                  </button>

                  <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
                    <button
                      className="px-3.5 py-2 rounded-lg text-[#534246] hover:text-[#93415a] text-xs font-semibold transition-colors cursor-pointer"
                      onClick={clearSelection}
                      type="button"
                    >
                      Clear Selection
                    </button>
                    <button
                      className="inline-flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-lg bg-[#93415a] hover:bg-[#b05973] text-white text-xs font-bold transition-all shadow-sm cursor-pointer"
                      type="button"
                      onClick={() => {
                        if (activeQuestion < 50) setActiveQuestion((prev) => prev + 1);
                      }}
                    >
                      <span>Next Diagnostic Item (Item 15)</span>
                      <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                    </button>
                  </div>
                </div>
              </article>
            )}

            {/* Listening Simulation Task Box (QA State 3) */}
            {qaState === 'listening' && (
              <article
                className="bg-white rounded-2xl shadow-xs p-6 sm:p-8 flex flex-col gap-6 border border-[#d8c1c5]/30 animate-fade-in"
                id="listening-task-card"
              >
                <div className="flex items-center justify-between pb-2 border-b border-[#eddfe4]/60">
                  <div className="flex items-center gap-2">
                    <span className="bg-[#8d4a5c] text-white px-2.5 py-0.5 rounded font-bold text-[11px] uppercase">
                      Item 41
                    </span>
                    <span className="text-[11px] font-bold text-[#534246] uppercase tracking-wider">
                      Acoustic Comprehension &amp; Phonetic Discrimination
                    </span>
                  </div>
                  <span className="text-[11px] font-bold text-[#8d4a5c] bg-[#ffd9e0] px-2.5 py-0.5 rounded">
                    Section IV
                  </span>
                </div>

                <div className="bg-[#fff0f5] p-5 rounded-xl flex flex-col gap-3 border border-[#d8c1c5]/30">
                  <span className="text-xs font-bold text-[#21191d]">
                    Audio Track Diagnostic: Oxbridge Seminar on Phonology (UK Received Pronunciation)
                  </span>

                  {/* Simulated Audio Player */}
                  <div className="flex items-center gap-3 bg-white p-3 rounded-xl shadow-2xs border border-[#d8c1c5]/30">
                    <button
                      className="w-10 h-10 rounded-full bg-[#93415a] text-white flex items-center justify-center hover:bg-[#b05973] transition-colors shadow-xs cursor-pointer shrink-0"
                      id="audio-play-toggle"
                      onClick={toggleAudio}
                      type="button"
                    >
                      <span className="material-symbols-outlined text-[20px]" id="audio-icon">
                        {audioPlaying ? 'pause' : 'play_arrow'}
                      </span>
                    </button>
                    <div className="flex-1 flex flex-col gap-1">
                      <div className="flex justify-between text-[11px] text-[#534246] font-semibold">
                        <span id="audio-current-time">{audioTime}</span>
                        <span>01:45</span>
                      </div>
                      <div className="w-full bg-[#f3e4ea] h-2 rounded-full overflow-hidden">
                        <div
                          className="bg-[#8d4a5c] h-full rounded-full transition-all duration-300"
                          id="audio-progress-bar"
                          style={{ width: `${audioProgress}%` }}
                        ></div>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5 text-[#534246] pr-2 shrink-0">
                      <span className="material-symbols-outlined text-[18px]">volume_up</span>
                      <span className="text-xs font-bold">1.0x</span>
                    </div>
                  </div>
                  <p className="text-[11px] text-[#534246] italic">
                    Note: Audio track can only be played a maximum of twice in this placement calibration block.
                  </p>
                </div>

                <div className="space-y-1">
                  <h2 className="font-serif text-base sm:text-lg font-bold text-[#21191d]">
                    Acoustic Ingestion Question
                  </h2>
                  <p className="text-xs sm:text-sm text-[#534246]">
                    According to the lecturer, what rhetorical purpose does the rising inflection serve in the speaker&apos;s second thesis point?
                  </p>
                </div>

                <div className="space-y-2.5">
                  <label
                    onClick={() => setListeningSelectedOption('L1')}
                    className={`flex items-center gap-3 p-4 rounded-xl cursor-pointer transition-colors border ${
                      listeningSelectedOption === 'L1'
                        ? 'bg-[#ffd9e0]/40 border-[#93415a]'
                        : 'bg-[#fff0f5] hover:bg-[#f9eaef] border-[#d8c1c5]/30'
                    }`}
                  >
                    <input
                      className="w-4 h-4 text-[#93415a] focus:ring-[#93415a] accent-[#93415a]"
                      name="listening-opt"
                      type="radio"
                      checked={listeningSelectedOption === 'L1'}
                      onChange={() => setListeningSelectedOption('L1')}
                    />
                    <span className="text-xs sm:text-sm text-[#21191d]">
                      Signaling tentative hypotheses pending empirical verification.
                    </span>
                  </label>
                  <label
                    onClick={() => setListeningSelectedOption('L2')}
                    className={`flex items-center gap-3 p-4 rounded-xl cursor-pointer transition-colors border ${
                      listeningSelectedOption === 'L2'
                        ? 'bg-[#ffd9e0]/40 border-[#93415a]'
                        : 'bg-[#fff0f5] hover:bg-[#f9eaef] border-[#d8c1c5]/30'
                    }`}
                  >
                    <input
                      className="w-4 h-4 text-[#93415a] focus:ring-[#93415a] accent-[#93415a]"
                      name="listening-opt"
                      type="radio"
                      checked={listeningSelectedOption === 'L2'}
                      onChange={() => setListeningSelectedOption('L2')}
                    />
                    <span className="text-xs sm:text-sm text-[#21191d]">
                      Challenging the premise set forward by the opposing debater.
                    </span>
                  </label>
                </div>
              </article>
            )}

            {/* Academic Assessment Notice Banner */}
            <aside
              aria-label="Governance and Proctor Notice"
              className="bg-[#f9eaef] p-5 rounded-2xl flex items-start gap-4 shadow-2xs border border-[#d8c1c5]/30"
            >
              <span className="material-symbols-outlined text-[#8d4a5c] text-[24px] shrink-0 mt-0.5">
                policy
              </span>
              <div className="flex flex-col gap-1 text-xs">
                <span className="font-bold text-sm text-[#21191d]">
                  Academic Integrity &amp; Calibration Rules
                </span>
                <p className="text-[#534246] leading-relaxed">
                  Every submission is analyzed against the Cambridge / CEFR syntactical rubric. If your connection interrupts, progress is continually synchronized with Teacher Theint’s cloud repository. Avoid browser reloads.
                </p>
              </div>
            </aside>
          </div>

          {/* Right Column: Diagnostic Navigator Panel (Approx 30%) */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            <aside
              aria-label="Diagnostic Question Grid"
              className="bg-white rounded-2xl shadow-xs p-5 sm:p-6 flex flex-col gap-5 border border-[#d8c1c5]/30"
            >
              {/* Panel Header */}
              <div className="flex items-center justify-between pb-2 border-b border-[#eddfe4]/60">
                <div>
                  <h2 className="font-serif text-lg font-bold text-[#21191d]">
                    Diagnostic Navigator
                  </h2>
                  <span className="text-xs text-[#534246]">50 Calibrated Questions</span>
                </div>
                <div className="w-8 h-8 rounded-full bg-[#f9eaef] flex items-center justify-center text-[#93415a] text-xs font-bold shadow-2xs">
                  {activeQuestion}/50
                </div>
              </div>

              {/* Color Coding Legend */}
              <div className="grid grid-cols-3 gap-2 text-[11px] font-bold p-2.5 bg-[#fff0f5] rounded-xl border border-[#d8c1c5]/30">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#93415a] inline-block shrink-0"></span>
                  <span className="text-[#534246]">Answered (13)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#fea9be] inline-block shrink-0"></span>
                  <span className="text-[#21191d]">Current ({activeQuestion})</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#f3e4ea] inline-block shrink-0 border border-[#d8c1c5]/50"></span>
                  <span className="text-[#534246]">Pending (36)</span>
                </div>
              </div>

              {/* Grid of 50 Diagnostic Item Buttons (5 rows of 10) */}
              <div
                aria-label="Question Navigation Matrix"
                className="grid grid-cols-10 gap-1.5"
                role="region"
              >
                {Array.from({ length: 50 }).map((_, idx) => {
                  const num = idx + 1;
                  const isCurrent = num === activeQuestion;
                  const isAnswered = num <= 13;

                  let btnStyle =
                    'bg-[#f3e4ea] text-[#534246] hover:bg-[#eddfe4]';
                  if (isAnswered) {
                    btnStyle = 'bg-[#93415a] text-white hover:opacity-90';
                  }
                  if (isCurrent) {
                    btnStyle =
                      'bg-[#fea9be] text-[#7a3a4d] font-bold shadow-xs scale-105 ring-2 ring-[#93415a]/30';
                  }

                  return (
                    <button
                      key={num}
                      type="button"
                      onClick={() => {
                        setActiveQuestion(num);
                        if (num >= 41) {
                          setQaState('listening');
                        } else {
                          setQaState('selected');
                        }
                      }}
                      className={`h-8 rounded text-[11px] font-semibold flex items-center justify-center transition-all cursor-pointer ${btnStyle}`}
                      title={`Question ${num}${isAnswered ? ' (Answered)' : isCurrent ? ' (Current)' : ' (Pending)'}`}
                    >
                      {num}
                    </button>
                  );
                })}
              </div>

              {/* Section Breakdown Tracker */}
              <div className="space-y-2.5 pt-2 border-t border-[#eddfe4]/60">
                <h3 className="text-[11px] font-bold uppercase tracking-wider text-[#8d4a5c]">
                  Curricular Domain Breakdown
                </h3>

                <div className="p-2.5 rounded-xl bg-[#fff0f5] flex flex-col gap-1.5 text-xs border border-[#d8c1c5]/20">
                  <div className="flex justify-between items-center">
                    <span className="text-[#21191d] font-medium">I. Lexical Resource &amp; Collocation</span>
                    <span className="text-[#93415a] font-bold">10/10</span>
                  </div>
                  <div className="w-full bg-[#eddfe4] h-1.5 rounded-full overflow-hidden">
                    <div className="bg-[#93415a] h-full rounded-full" style={{ width: '100%' }}></div>
                  </div>
                </div>

                <div className="p-2.5 rounded-xl bg-[#f3e4ea] flex flex-col gap-1.5 text-xs border border-[#d8c1c5]/30">
                  <div className="flex justify-between items-center">
                    <span className="text-[#21191d] font-bold">II. Syntactic Reasoning &amp; Clauses</span>
                    <span className="text-[#93415a] font-bold">4/15 Active</span>
                  </div>
                  <div className="w-full bg-[#eddfe4] h-1.5 rounded-full overflow-hidden">
                    <div className="bg-[#93415a] h-full rounded-full" style={{ width: '27%' }}></div>
                  </div>
                </div>

                <div className="p-2.5 rounded-xl bg-[#fff0f5] flex flex-col gap-1.5 text-xs opacity-75 border border-[#d8c1c5]/20">
                  <div className="flex justify-between items-center">
                    <span className="text-[#534246]">III. Discourse Synthesis &amp; Cohesion</span>
                    <span className="text-[#534246]">0/15</span>
                  </div>
                  <div className="w-full bg-[#eddfe4] h-1.5 rounded-full overflow-hidden">
                    <div className="bg-[#93415a] h-full rounded-full" style={{ width: '0%' }}></div>
                  </div>
                </div>

                <div className="p-2.5 rounded-xl bg-[#fff0f5] flex flex-col gap-1.5 text-xs opacity-75 border border-[#d8c1c5]/20">
                  <div className="flex justify-between items-center">
                    <span className="text-[#534246]">IV. Acoustic &amp; Oral Phonology</span>
                    <span className="text-[#534246]">0/10</span>
                  </div>
                  <div className="w-full bg-[#eddfe4] h-1.5 rounded-full overflow-hidden">
                    <div className="bg-[#93415a] h-full rounded-full" style={{ width: '0%' }}></div>
                  </div>
                </div>
              </div>

              {/* Submission Action Module */}
              <div className="bg-[#f3e4ea] rounded-xl p-4 flex flex-col gap-3 mt-1 border border-[#d8c1c5]/40">
                <div className="flex items-start gap-2 text-xs text-[#534246]">
                  <span className="material-symbols-outlined text-[18px] text-[#8d4a5c] shrink-0 mt-0.5">
                    lock_clock
                  </span>
                  <p className="leading-relaxed">
                    Submitting will advance your status to <strong className="text-[#21191d]">SUBMITTED</strong> for automated algorithmic calibration and advisory faculty appraisal.
                  </p>
                </div>
                <button
                  className="w-full py-2.5 px-4 rounded-lg bg-[#93415a] hover:bg-[#b05973] text-white font-bold text-xs transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer"
                  onClick={() => setIsSubmitModalOpen(true)}
                  type="button"
                >
                  <span className="material-symbols-outlined text-[18px]">verified</span>
                  <span>Submit Placement Assessment</span>
                </button>
              </div>
            </aside>

            {/* Institutional Diagnostic Notice Card */}
            <div className="bg-[#fff0f5] rounded-2xl p-5 text-xs text-[#534246] flex flex-col gap-1.5 shadow-2xs border border-[#d8c1c5]/30">
              <span className="text-[11px] font-bold uppercase tracking-wide text-[#8d4a5c]">
                Diagnostic Footnote • Protocol SEC-PLA-04
              </span>
              <p className="leading-relaxed">
                Placement is an optional diagnostic indicator. Submitting does not produce a binding official level until administrative decree. Ordinary course exercises and formal exams remain completely decoupled.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* Exit / Save Modal Overlay                                                 */}
      {/* ========================================================================= */}
      {isExitModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-[#362e32]/40 backdrop-blur-xs flex items-center justify-center p-4 animate-fade-in"
          id="modal-exit-backdrop"
        >
          <div className="bg-white rounded-2xl max-w-md w-full p-6 sm:p-8 shadow-2xl flex flex-col gap-4 border border-[#d8c1c5]/40">
            <div className="w-12 h-12 rounded-full bg-[#f9eaef] flex items-center justify-center text-[#8d4a5c] shadow-2xs">
              <span className="material-symbols-outlined text-[28px]">pause_circle</span>
            </div>
            <div>
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#21191d]">
                Pause &amp; Exit Assessment?
              </h3>
              <p className="text-xs sm:text-sm text-[#534246] mt-2 leading-relaxed">
                Your current responses (including Item {activeQuestion}) are securely cached in the academy cloud. Your remaining time (42:15) will be preserved for 7 calendar days under student enrollment ID TTE-2024-8841.
              </p>
            </div>
            <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#eddfe4]/60">
              <button
                className="px-4 py-2 rounded-lg bg-[#f3e4ea] hover:bg-[#eddfe4] text-[#21191d] text-xs font-bold transition-colors cursor-pointer"
                onClick={() => setIsExitModalOpen(false)}
                type="button"
              >
                Resume Assessment
              </button>
              <button
                className="px-4 py-2 rounded-lg bg-[#8d4a5c] hover:bg-[#7a3a4d] text-white text-xs font-bold transition-colors shadow-xs cursor-pointer"
                onClick={() => {
                  setIsExitModalOpen(false);
                  onNavigateScreen('STU-LEARN-01');
                }}
                type="button"
              >
                Confirm Safe Pause
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* Submission Confirmation Modal                                             */}
      {/* ========================================================================= */}
      {isSubmitModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-[#362e32]/40 backdrop-blur-xs flex items-center justify-center p-4 animate-fade-in"
          id="modal-submit-backdrop"
        >
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl flex flex-col gap-4 border border-[#d8c1c5]/40">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-full bg-[#f9eaef] flex items-center justify-center text-[#93415a] shrink-0 shadow-2xs">
                <span className="material-symbols-outlined text-[28px]">notification_important</span>
              </div>
              <div>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#21191d]">
                  Confirm Assessment Submission?
                </h3>
                <span className="text-[11px] font-bold text-[#8d4a5c] uppercase tracking-wider">
                  Protocol SEC-PLA-04 Calibration Lock
                </span>
              </div>
            </div>

            <div className="bg-[#fff0f5] p-4 rounded-xl flex flex-col gap-2 text-xs text-[#534246] border border-[#d8c1c5]/30">
              <div className="flex justify-between text-[#21191d] font-bold">
                <span>Items Attempted:</span>
                <span className="text-[#93415a]">14 of 50</span>
              </div>
              <div className="flex justify-between text-[#8d4a5c] font-bold">
                <span>Unanswered Diagnostic Items:</span>
                <span>36 remaining</span>
              </div>
              <p className="mt-1 text-[11px] leading-relaxed">
                Once submitted, answers cannot be edited and your session will transition to <strong className="text-[#21191d]">SUBMITTED</strong> for automated evaluation and advisory faculty appraisal. Final Official Level is decreed solely by Academic Administration.
              </p>
            </div>

            <div className="flex flex-col-reverse sm:flex-row items-center justify-end gap-3 pt-3 border-t border-[#eddfe4]/60">
              <button
                className="w-full sm:w-auto px-4 py-2 rounded-lg bg-[#f3e4ea] hover:bg-[#eddfe4] text-[#21191d] text-xs font-bold transition-colors cursor-pointer"
                onClick={() => setIsSubmitModalOpen(false)}
                type="button"
              >
                Return to Assessment
              </button>
              <button
                className="w-full sm:w-auto px-5 py-2.5 rounded-lg bg-[#93415a] hover:bg-[#b05973] text-white text-xs font-bold transition-all shadow-sm cursor-pointer"
                onClick={executeFinalSubmission}
                type="button"
              >
                Confirm &amp; Submit Diagnostic
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
