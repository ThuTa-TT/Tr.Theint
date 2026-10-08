import React, { useState } from 'react';
import { SCREEN_INVENTORY, ScreenId } from '../../types/navigation';

interface StitchScreenDockProps {
  currentScreen: ScreenId;
  onSelectScreen: (screenId: ScreenId) => void;
  showSpecGuides: boolean;
  onToggleSpecGuides: () => void;
}

export const StitchScreenDock: React.FC<StitchScreenDockProps> = ({
  currentScreen,
  onSelectScreen,
  showSpecGuides,
  onToggleSpecGuides,
}) => {
  const [minimized, setMinimized] = useState(false);
  const [auditModalOpen, setAuditModalOpen] = useState(false);

  const activeMeta =
    SCREEN_INVENTORY.find((s) => s.id === currentScreen) || SCREEN_INVENTORY[0];

  if (minimized) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <button
          type="button"
          onClick={() => setMinimized(false)}
          className="h-10 px-4 rounded-full bg-[#f48fb1] text-white text-[12px] font-['Quicksand'] font-bold shadow-[0_4px_12px_rgba(244,143,177,0.4)] flex items-center gap-2 hover:bg-[#d87395] transition-colors cursor-pointer"
        >
          <span className="material-symbols-outlined text-[16px]">layers</span>
          <span>Screen Switcher ({activeMeta.code})</span>
        </button>
      </div>
    );
  }

  return (
    <>
      {/* Audit Comparison Drawer / Modal */}
      {auditModalOpen && (
        <div className="fixed inset-0 z-50 bg-[#22191b]/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#FFFFFF] rounded-3xl border border-[#fbeaec] max-w-4xl w-full max-h-[82vh] flex flex-col shadow-[0_16px_48px_rgba(244,143,177,0.25)] overflow-hidden">
            <div className="px-6 py-4 border-b border-[#f5e4e7] flex items-center justify-between bg-[#fff8f8]">
              <div>
                <div className="text-[11px] font-['Quicksand'] font-bold uppercase tracking-wider text-[#f48fb1]">
                  Teacher Theint English • Master Consistency Audit
                </div>
                <h2 className="font-['Quicksand'] text-2xl font-bold text-[#22191b]">
                  Selected Screens → Home Page Navigation System Alignment
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setAuditModalOpen(false)}
                className="w-9 h-9 rounded-full border border-[#f5e4e7] bg-[#FFFFFF] text-[#534247] hover:text-[#22191b] flex items-center justify-center cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-4">
              <div className="p-4 rounded-2xl bg-[#fff0f2] border border-[#fbeaec] text-[13px] text-[#22191b] flex flex-wrap items-center justify-between gap-3">
                <div>
                  <span className="font-['Quicksand'] font-bold text-[#f48fb1]">Canonical Visual Reference:</span>{' '}
                  Pastel Rainbow Academy Design (`h-20` / 80px height • `#FFFFFF` surface • `#fbeaec` border • Official Teacher Theint logo • `Quicksand` &amp; `Nunito Sans` typography).
                </div>
                <span className="px-3 py-1 rounded-full bg-[#f48fb1] text-white text-[11px] font-['Quicksand'] font-bold shadow-2xs">
                  {SCREEN_INVENTORY.length} / {SCREEN_INVENTORY.length} Screens Aligned
                </span>
              </div>

              <div className="divide-y divide-[#f5e4e7] border border-[#fbeaec] rounded-2xl overflow-hidden">
                {SCREEN_INVENTORY.map((scr) => {
                  const isCurrent = scr.id === currentScreen;
                  return (
                    <div
                      key={scr.id}
                      className={`p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 ${
                        isCurrent ? 'bg-[#fff0f2]' : 'bg-[#FFFFFF]'
                      }`}
                    >
                      <div className="space-y-1 max-w-2xl">
                        <div className="flex items-center gap-2">
                          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-['Quicksand'] font-bold uppercase bg-[#fff8f8] text-[#964261] border border-[#f5e4e7]">
                            {scr.code}
                          </span>
                          <span className="font-['Quicksand'] font-bold text-[14px] text-[#22191b]">
                            {scr.title}
                          </span>
                        </div>
                        <p className="text-[12px] text-[#534247]">
                          <strong className="text-[#22191b]">Previous Issue:</strong>{' '}
                          {scr.previousViolation}
                        </p>
                        <p className="text-[12px] text-[#f48fb1] font-medium">
                          <strong>Correction Applied:</strong> {scr.appliedCorrection}
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={() => {
                          onSelectScreen(scr.id);
                          setAuditModalOpen(false);
                        }}
                        className={`h-9 px-4 rounded-full text-[12px] font-['Quicksand'] font-bold shrink-0 cursor-pointer ${
                          isCurrent
                            ? 'btn-tactile-primary'
                            : 'bg-[#fff8f8] text-[#22191b] border border-[#f5e4e7] hover:bg-[#fff0f2]'
                        }`}
                      >
                        {isCurrent ? 'Currently Viewing' : 'Inspect Screen'}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Floating Stitch Screen Inspector Bar */}
      <div className="fixed bottom-3 inset-x-0 z-40 px-3 pointer-events-none">
        <div className="max-w-[1240px] mx-auto bg-[#22191b]/95 backdrop-blur-md text-white rounded-2xl border border-white/10 px-3.5 py-2.5 shadow-2xl pointer-events-auto flex flex-col gap-2">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-2">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-[#f48fb1] text-white text-[10px] font-['Quicksand'] font-bold uppercase tracking-wider">
                {activeMeta.isReference ? 'Reference Navbar' : 'Corrected Navbar'}
              </span>
              <span className="text-[12.5px] font-['Quicksand'] font-bold text-white">
                {activeMeta.code}: {activeMeta.title}
              </span>
              <span className="hidden lg:inline text-[11.5px] text-pink-200/80">
                — {activeMeta.appliedCorrection}
              </span>
            </div>

            <div className="flex items-center gap-1.5 font-['Quicksand'] font-bold">
              <button
                type="button"
                onClick={onToggleSpecGuides}
                className={`h-7 px-2.5 rounded-full text-[11px] flex items-center gap-1 transition-colors cursor-pointer ${
                  showSpecGuides
                    ? 'bg-[#f48fb1] text-white shadow-2xs'
                    : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                <span className="material-symbols-outlined text-[14px]">straighten</span>
                <span>{showSpecGuides ? 'Hide Spec Guides' : 'Navbar Spec Guides'}</span>
              </button>

              <button
                type="button"
                onClick={() => setAuditModalOpen(true)}
                className="h-7 px-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-[11px] flex items-center gap-1 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[14px]">fact_check</span>
                <span>Consistency Audit ({SCREEN_INVENTORY.length})</span>
              </button>

              <button
                type="button"
                onClick={() => setMinimized(true)}
                title="Minimize Stitch Dock"
                className="h-7 w-7 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center cursor-pointer"
              >
                <span className="material-symbols-outlined text-[15px]">expand_more</span>
              </button>
            </div>
          </div>

          {/* Screen Selector Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-0.5 font-['Quicksand']">
            {SCREEN_INVENTORY.map((scr) => {
              const isSelected = scr.id === currentScreen;
              return (
                <button
                  key={scr.id}
                  type="button"
                  onClick={() => onSelectScreen(scr.id)}
                  className={`h-7 px-3 rounded-full text-[11.5px] font-bold whitespace-nowrap flex items-center gap-1.5 transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#f48fb1] text-white shadow-xs'
                      : 'bg-white/5 text-white/80 hover:bg-white/15 hover:text-white'
                  }`}
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      scr.category === 'PUBLIC'
                        ? 'bg-[#81d4fa]'
                        : scr.category === 'AUTH'
                        ? 'bg-[#ffe082]'
                        : 'bg-[#a5d6a7]'
                    }`}
                  />
                  <span>{scr.title.replace(' (10-Section Public IA)', '')}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};
